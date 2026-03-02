import { NextResponse } from "next/server";
import { z } from "zod";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { isMissingTestingTableError } from "@/lib/testing/api-utils";
import { hashTestingAnswer } from "@/lib/testing/security";
import { buildDiagnosis, type DomainScoreSnapshot } from "@/lib/testing/scoring";
import type { TestingAttemptResultResponse } from "@/lib/testing/types";
import { toSafeErrorRecord } from "@/lib/logging/safe-error";
import { enforceIpRateLimit } from "@/lib/security/ip-rate-limit";

const LEGACY_TESTING_QBANK_OVERRIDE_ENV = "LEGAL_ALLOW_LEGACY_TESTING_QUESTION_BANK";

const submitSchema = z.object({
  answers: z
    .array(
      z.object({
        questionId: z.string().uuid(),
        selected: z.string().min(1).max(1000),
      }),
    )
    .max(5000),
});

type AttemptRow = {
  id: string;
  user_id: string;
  exam_id: string;
  attempt_type: "sample" | "full";
  status: "in_progress" | "completed" | "abandoned";
  question_ids: string[];
  score: number | null;
  domain_breakdown: unknown;
  weakness_diagnosis: unknown;
  completed_at: string | null;
};

type ExamRow = {
  id: string;
  exam_code: string;
  passing_score: number | null;
};

type QuestionRow = {
  id: string;
  domain: string;
  correct_answer_hash: string;
};

type QuestionBankMode = "governed" | "legacy";

function normalizeObjectRecord(
  input: unknown,
): Record<string, { correct: number; total: number; score: number }> {
  if (!input || typeof input !== "object" || Array.isArray(input)) return {};
  const entries = Object.entries(input as Record<string, unknown>);
  const normalized: Record<string, { correct: number; total: number; score: number }> = {};
  for (const [domain, value] of entries) {
    if (!value || typeof value !== "object" || Array.isArray(value)) continue;
    const v = value as Record<string, unknown>;
    normalized[domain] = {
      correct: Number(v.correct ?? 0),
      total: Number(v.total ?? 0),
      score: Number(v.score ?? 0),
    };
  }
  return normalized;
}

function normalizeDiagnosis(
  input: unknown,
): { weakDomains: string[]; remediationModules: string[] } {
  if (!input || typeof input !== "object" || Array.isArray(input)) {
    return { weakDomains: [], remediationModules: [] };
  }
  const value = input as Record<string, unknown>;
  return {
    weakDomains: Array.isArray(value.weakDomains)
      ? value.weakDomains.filter((entry): entry is string => typeof entry === "string")
      : [],
    remediationModules: Array.isArray(value.remediationModules)
      ? value.remediationModules.filter((entry): entry is string => typeof entry === "string")
      : [],
  };
}

function isMissingGovernanceColumnError(error: unknown) {
  if (!error || typeof error !== "object") return false;
  const code = "code" in error ? String((error as { code?: unknown }).code ?? "") : "";
  const message = "message" in error ? String((error as { message?: unknown }).message ?? "") : "";
  return code === "42703" || message.toLowerCase().includes("could not find the");
}

function shouldAllowLegacyTestingQuestionBankMode() {
  if (process.env[LEGACY_TESTING_QBANK_OVERRIDE_ENV] === "1") {
    return true;
  }
  return process.env.NODE_ENV !== "production";
}

async function loadQuestionsForAttempt(params: {
  admin: ReturnType<typeof createSupabaseAdminClient>;
  questionIds: string[];
}) {
  const governed = await params.admin
    .from("testing_question_bank")
    .select("id, domain, correct_answer_hash")
    .in("id", params.questionIds)
    .eq("review_status", "approved")
    .eq("commercial_use_allowed", true);

  if (!governed.error) {
    return {
      mode: "governed" as QuestionBankMode,
      questions: (governed.data ?? []) as QuestionRow[],
    };
  }

  if (!isMissingGovernanceColumnError(governed.error)) {
    throw governed.error;
  }

  if (!shouldAllowLegacyTestingQuestionBankMode()) {
    return {
      mode: "legacy" as QuestionBankMode,
      questions: [] as QuestionRow[],
      blocked: true,
    };
  }

  const legacy = await params.admin
    .from("testing_question_bank")
    .select("id, domain, correct_answer_hash")
    .in("id", params.questionIds);

  if (legacy.error) {
    throw legacy.error;
  }

  return {
    mode: "legacy" as QuestionBankMode,
    questions: (legacy.data ?? []) as QuestionRow[],
    blocked: false,
  };
}

function toResultPayload(
  attempt: AttemptRow,
  exam: ExamRow,
  passThreshold: number,
): TestingAttemptResultResponse {
  const score = Number(attempt.score ?? 0);
  return {
    attemptId: attempt.id,
    examId: attempt.exam_id,
    examCode: exam.exam_code,
    score,
    pass: score >= passThreshold,
    attemptType: attempt.attempt_type,
    domainBreakdown: normalizeObjectRecord(attempt.domain_breakdown),
    diagnosis: normalizeDiagnosis(attempt.weakness_diagnosis),
    completedAt: attempt.completed_at,
  };
}

export async function POST(
  request: Request,
  context: { params: Promise<{ attemptId: string }> },
) {
  const rateLimit = await enforceIpRateLimit(request, "api:testing:attempts:submit:post", {
    max: 30,
    windowMs: 60_000,
  });

  if (!rateLimit.allowed) {
    return NextResponse.json(
      { error: "Too many submit requests. Please retry shortly." },
      { status: 429, headers: { "Retry-After": String(rateLimit.retryAfterSeconds) } },
    );
  }

  const { attemptId } = await context.params;
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json().catch(() => ({}));
  const parsed = submitSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid payload", details: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const admin = createSupabaseAdminClient();
  const { data: attemptData, error: attemptError } = await admin
    .from("testing_exam_attempts")
    .select("id, user_id, exam_id, attempt_type, status, question_ids, score, domain_breakdown, weakness_diagnosis, completed_at")
    .eq("id", attemptId)
    .maybeSingle();

  if (attemptError || !attemptData) {
    if (isMissingTestingTableError(attemptError)) {
      return NextResponse.json(
        { error: "Testing database tables are not ready. Run Supabase migrations first." },
        { status: 503 },
      );
    }
    return NextResponse.json({ error: "Attempt not found." }, { status: 404 });
  }

  const attempt = attemptData as AttemptRow;
  if (attempt.user_id !== user.id) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { data: examData, error: examError } = await admin
    .from("testing_exams")
    .select("id, exam_code, passing_score")
    .eq("id", attempt.exam_id)
    .maybeSingle();

  if (examError || !examData) {
    return NextResponse.json({ error: "Exam not found for attempt." }, { status: 404 });
  }

  const exam = examData as ExamRow;
  const passThreshold = Number(exam.passing_score ?? 70);

  if (attempt.status === "completed") {
    return NextResponse.json(toResultPayload(attempt, exam, passThreshold));
  }

  if (attempt.status !== "in_progress") {
    return NextResponse.json(
      { error: `Attempt is not submit-ready (status: ${attempt.status}).` },
      { status: 409 },
    );
  }

  const questionIds = Array.isArray(attempt.question_ids)
    ? attempt.question_ids.filter((value): value is string => typeof value === "string")
    : [];

  if (questionIds.length === 0) {
    return NextResponse.json({ error: "Attempt has no question set." }, { status: 409 });
  }

  let questionMode: QuestionBankMode = "governed";
  let questions: QuestionRow[] = [];
  try {
    const loaded = await loadQuestionsForAttempt({ admin, questionIds });
    if (loaded.mode === "legacy" && loaded.blocked) {
      return NextResponse.json(
        {
          error:
            "Testing question governance columns are missing. Legacy question-bank mode is blocked until migrations are applied.",
        },
        { status: 503 },
      );
    }
    questionMode = loaded.mode;
    questions = loaded.questions;
  } catch (questionError) {
    console.error("Unexpected API error.", toSafeErrorRecord(questionError));
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }

  if (questions.length === 0) {
    return NextResponse.json({ error: "Questions for this attempt were not found." }, { status: 409 });
  }
  if (questionMode === "governed" && questions.length < questionIds.length) {
    return NextResponse.json(
      {
        error:
          "Attempt references restricted or unapproved question content. Please restart the attempt after question-bank remediation.",
      },
      { status: 409 },
    );
  }

  const answerMap = new Map<string, string>();
  for (const answer of parsed.data.answers) {
    answerMap.set(answer.questionId, answer.selected);
  }

  const domainStats = new Map<string, { correct: number; total: number }>();
  const answerRows: Array<{
    attempt_id: string;
    question_id: string;
    selected_answer: string;
    is_correct: boolean;
  }> = [];

  let correctCount = 0;
  for (const question of questions) {
    const stat = domainStats.get(question.domain) ?? { correct: 0, total: 0 };
    stat.total += 1;

    const selected = answerMap.get(question.id);
    if (selected) {
      const selectedHash = hashTestingAnswer(selected);
      const isCorrect = selectedHash === question.correct_answer_hash;
      if (isCorrect) {
        correctCount += 1;
        stat.correct += 1;
      }
      answerRows.push({
        attempt_id: attempt.id,
        question_id: question.id,
        selected_answer: selected,
        is_correct: isCorrect,
      });
    }

    domainStats.set(question.domain, stat);
  }

  if (answerRows.length > 0) {
    const { error: answersWriteError } = await admin
      .from("testing_attempt_answers")
      .upsert(answerRows, { onConflict: "attempt_id,question_id" });
    if (answersWriteError) {
      console.error("Unexpected API error.", toSafeErrorRecord(answersWriteError));
      return NextResponse.json({ error: "Internal server error." }, { status: 500 });
    }
  }

  const totalQuestions = Math.max(1, questionIds.length);
  const score = Math.round(((correctCount / totalQuestions) * 100) * 100) / 100;

  const domainBreakdown: Record<string, DomainScoreSnapshot> = {};
  for (const [domain, stat] of domainStats.entries()) {
    const domainScore = stat.total > 0
      ? Math.round(((stat.correct / stat.total) * 100) * 100) / 100
      : 0;
    domainBreakdown[domain] = {
      correct: stat.correct,
      total: stat.total,
      score: domainScore,
    };
  }

  const diagnosis = buildDiagnosis(domainBreakdown);
  const completedAt = new Date().toISOString();

  const { data: updatedAttemptData, error: updateError } = await admin
    .from("testing_exam_attempts")
    .update({
      status: "completed",
      score,
      domain_breakdown: domainBreakdown,
      weakness_diagnosis: diagnosis,
      completed_at: completedAt,
    })
    .eq("id", attempt.id)
    .select("id, user_id, exam_id, attempt_type, status, question_ids, score, domain_breakdown, weakness_diagnosis, completed_at")
    .single();

  if (updateError || !updatedAttemptData) {
    return NextResponse.json({ error: "Failed to finalize attempt." }, { status: 500 });
  }

  const updatedAttempt = updatedAttemptData as AttemptRow;
  return NextResponse.json(toResultPayload(updatedAttempt, exam, passThreshold));
}
