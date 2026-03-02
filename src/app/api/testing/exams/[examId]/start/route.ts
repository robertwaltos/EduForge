import { NextResponse } from "next/server";
import { z } from "zod";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { SupportedTestingLanguage, TestingQuestionPayload } from "@/lib/testing/types";
import { isMissingTestingTableError } from "@/lib/testing/api-utils";
import { toSafeErrorRecord } from "@/lib/logging/safe-error";
import { enforceIpRateLimit } from "@/lib/security/ip-rate-limit";
import { ensureQuestionBankSupply } from "@/lib/testing/question-bank-autogen";

const QUESTION_SELECT_COLUMNS = "id, domain, question_text, question_text_pl, options, options_pl";
const MAX_ON_DEMAND_GENERATION = 48;
const MAX_GENERATION_ROUNDS = 3;
const MAX_GENERATION_BUDGET = 120;
const RECENT_QUESTION_LOOKBACK_DAYS = 14;
const RECENT_QUESTION_MAX_ATTEMPTS = 8;
const LEGACY_TESTING_QBANK_OVERRIDE_ENV = "LEGAL_ALLOW_LEGACY_TESTING_QUESTION_BANK";

const startAttemptSchema = z.object({
  language: z.enum(["en", "pl"]).optional(),
  mode: z.enum(["auto", "sample", "full"]).optional(),
});

type QuestionBankRow = {
  id: string;
  domain: string;
  question_text: string;
  question_text_pl: string | null;
  options: unknown;
  options_pl: unknown;
};

type QuestionBankMode = "governed" | "legacy";

function shouldAllowLegacyTestingQuestionBankMode() {
  if (process.env[LEGACY_TESTING_QBANK_OVERRIDE_ENV] === "1") {
    return true;
  }
  return process.env.NODE_ENV !== "production";
}

function shuffle<T>(items: T[]) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j]!, copy[i]!];
  }
  return copy;
}

function normalizeOptions(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value
    .filter((entry): entry is string => typeof entry === "string")
    .map((entry) => entry.trim())
    .filter((entry) => entry.length > 0);
}

function isMissingColumnError(error: unknown) {
  if (!error || typeof error !== "object") return false;
  const code = "code" in error ? String((error as { code?: unknown }).code ?? "") : "";
  const message = "message" in error ? String((error as { message?: unknown }).message ?? "") : "";
  return code === "42703" || message.toLowerCase().includes("could not find the");
}

async function resolveQuestionBankMode(admin: ReturnType<typeof createSupabaseAdminClient>, examId: string) {
  const governedProbe = await admin
    .from("testing_question_bank")
    .select("id")
    .eq("exam_id", examId)
    .eq("is_active", true)
    .eq("review_status", "approved")
    .eq("commercial_use_allowed", true)
    .limit(1);

  if (!governedProbe.error) {
    return "governed" as const;
  }

  if (isMissingColumnError(governedProbe.error)) {
    return "legacy" as const;
  }

  throw governedProbe.error;
}

async function countEligibleQuestions(
  admin: ReturnType<typeof createSupabaseAdminClient>,
  examId: string,
  mode: QuestionBankMode,
) {
  const baseQuery = admin
    .from("testing_question_bank")
    .select("id", { count: "exact", head: true })
    .eq("exam_id", examId)
    .eq("is_active", true);

  const scopedQuery = mode === "governed"
    ? baseQuery.eq("review_status", "approved").eq("commercial_use_allowed", true)
    : baseQuery;

  const { count, error } = await scopedQuery;

  if (error) {
    throw error;
  }

  return Math.max(0, Number(count ?? 0));
}

async function loadQuestionWindow(params: {
  admin: ReturnType<typeof createSupabaseAdminClient>;
  examId: string;
  mode: QuestionBankMode;
  offset: number;
  limit: number;
}) {
  if (params.limit <= 0) {
    return [] as QuestionBankRow[];
  }

  const baseQuery = params.admin
    .from("testing_question_bank")
    .select(QUESTION_SELECT_COLUMNS)
    .eq("exam_id", params.examId)
    .eq("is_active", true)
    .order("id", { ascending: true })
    .range(params.offset, params.offset + params.limit - 1);

  const scopedQuery = params.mode === "governed"
    ? baseQuery.eq("review_status", "approved").eq("commercial_use_allowed", true)
    : baseQuery;

  const { data, error } = await scopedQuery;

  if (error) {
    throw error;
  }

  return (data ?? []) as QuestionBankRow[];
}

function pickOffset(maxOffset: number, usedOffsets: Set<number>) {
  if (maxOffset <= 0) return 0;

  for (let i = 0; i < 6; i += 1) {
    const candidate = Math.floor(Math.random() * (maxOffset + 1));
    if (!usedOffsets.has(candidate)) {
      return candidate;
    }
  }

  return Math.floor(Math.random() * (maxOffset + 1));
}

async function loadQuestionSample(params: {
  admin: ReturnType<typeof createSupabaseAdminClient>;
  examId: string;
  mode: QuestionBankMode;
  targetCount: number;
  eligibleCount: number;
  excludedQuestionIds: Set<string>;
}) {
  const desiredTarget = Math.max(1, params.targetCount);
  if (params.eligibleCount <= 0) {
    return [] as QuestionBankRow[];
  }

  const poolTarget = Math.min(Math.max(desiredTarget * 2, desiredTarget + 24), 320);
  const windowSize = Math.min(Math.max(desiredTarget * 3, 72), 240);
  const maxOffset = Math.max(0, params.eligibleCount - windowSize);
  const maxPasses = maxOffset > 0 ? 7 : 3;

  const selected = new Map<string, QuestionBankRow>();
  const usedOffsets = new Set<number>();

  const collect = async (ignoreExclusions: boolean) => {
    for (let pass = 0; pass < maxPasses; pass += 1) {
      const offset = pickOffset(maxOffset, usedOffsets);
      usedOffsets.add(offset);
      const rows = await loadQuestionWindow({
        admin: params.admin,
        examId: params.examId,
        mode: params.mode,
        offset,
        limit: windowSize,
      });

      for (const row of shuffle(rows)) {
        if (!ignoreExclusions && params.excludedQuestionIds.has(row.id)) continue;
        if (selected.has(row.id)) continue;
        selected.set(row.id, row);
        if (selected.size >= poolTarget || selected.size >= params.eligibleCount) {
          break;
        }
      }

      if (selected.size >= poolTarget || selected.size >= params.eligibleCount) {
        break;
      }
    }
  };

  await collect(false);
  if (selected.size < desiredTarget && params.excludedQuestionIds.size > 0) {
    await collect(true);
  }

  return shuffle(Array.from(selected.values())).slice(0, desiredTarget);
}

async function loadRecentQuestionIds(params: {
  admin: ReturnType<typeof createSupabaseAdminClient>;
  userId: string;
  examId: string;
}) {
  const cutoff = new Date(
    Date.now() - RECENT_QUESTION_LOOKBACK_DAYS * 24 * 60 * 60 * 1000,
  ).toISOString();

  const { data, error } = await params.admin
    .from("testing_exam_attempts")
    .select("question_ids")
    .eq("user_id", params.userId)
    .eq("exam_id", params.examId)
    .gte("started_at", cutoff)
    .order("started_at", { ascending: false })
    .limit(RECENT_QUESTION_MAX_ATTEMPTS);

  if (error) {
    console.error("Failed to load recent attempt history.", toSafeErrorRecord(error));
    return new Set<string>();
  }

  const ids = new Set<string>();
  for (const row of data ?? []) {
    const values = Array.isArray((row as { question_ids?: unknown }).question_ids)
      ? ((row as { question_ids: unknown[] }).question_ids)
      : [];
    for (const value of values) {
      if (typeof value === "string") {
        ids.add(value);
      }
    }
  }
  return ids;
}

function mergeGenerationMode(
  current: "openai" | "rule_based" | "none",
  incoming: "openai" | "rule_based" | "none",
) {
  if (current === "openai" || incoming === "openai") return "openai";
  if (current === "rule_based" || incoming === "rule_based") return "rule_based";
  return "none";
}

async function replenishQuestionSupply(params: {
  admin: ReturnType<typeof createSupabaseAdminClient>;
  exam: {
    id: string;
    exam_code: string;
    name: string;
    blueprint: unknown;
    version: number;
  };
  mode: QuestionBankMode;
  eligibleCount: number;
  minRequiredCount: number;
  softTargetCount: number;
  allowOpenAi: boolean;
}) {
  let eligibleCount = Math.max(0, Math.floor(params.eligibleCount));
  let onDemandGenerated = 0;
  let generationMode: "openai" | "rule_based" | "none" = "none";

  for (
    let round = 0;
    round < MAX_GENERATION_ROUNDS
      && eligibleCount < params.minRequiredCount
      && onDemandGenerated < MAX_GENERATION_BUDGET;
    round += 1
  ) {
    const budgetRemaining = Math.max(0, MAX_GENERATION_BUDGET - onDemandGenerated);
    if (budgetRemaining <= 0) break;

    const hardDeficit = Math.max(0, params.minRequiredCount - eligibleCount);
    const softDeficit = Math.max(0, params.softTargetCount - eligibleCount);
    const neededCount = Math.min(
      MAX_ON_DEMAND_GENERATION,
      budgetRemaining,
      Math.max(hardDeficit, softDeficit),
    );

    if (neededCount <= 0) break;

    try {
      const generated = await ensureQuestionBankSupply({
        supabase: params.admin,
        exam: {
          id: params.exam.id,
          examCode: params.exam.exam_code,
          name: params.exam.name,
          blueprint: params.exam.blueprint ?? {},
          version: Number(params.exam.version ?? 1) || 1,
        },
        neededCount,
        allowOpenAi: params.allowOpenAi && round === 0,
      });

      onDemandGenerated += generated.inserted;
      generationMode = mergeGenerationMode(generationMode, generated.generationMode);

      if (generated.inserted <= 0) {
        break;
      }

      eligibleCount = await countEligibleQuestions(params.admin, params.exam.id, params.mode);
    } catch (error) {
      console.error("On-demand question generation failed.", toSafeErrorRecord(error));
      break;
    }
  }

  return {
    eligibleCount,
    onDemandGenerated,
    generationMode,
  };
}

export async function POST(
  request: Request,
  context: { params: Promise<{ examId: string }> },
) {
  const rateLimit = await enforceIpRateLimit(request, "api:testing:exams:start:post", {
    max: 25,
    windowMs: 60_000,
  });

  if (!rateLimit.allowed) {
    return NextResponse.json(
      { error: "Too many attempt start requests. Please retry shortly." },
      { status: 429, headers: { "Retry-After": String(rateLimit.retryAfterSeconds) } },
    );
  }

  const { examId } = await context.params;
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json().catch(() => ({}));
  const parsed = startAttemptSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid payload", details: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const language: SupportedTestingLanguage = parsed.data.language ?? "en";
  const requestedMode = parsed.data.mode ?? "auto";
  const admin = createSupabaseAdminClient();

  const { data: exam, error: examError } = await admin
    .from("testing_exams")
    .select("id, exam_code, name, blueprint, version, question_count, timing_minutes, is_active")
    .eq("id", examId)
    .eq("is_active", true)
    .maybeSingle();

  if (examError || !exam) {
    if (isMissingTestingTableError(examError)) {
      return NextResponse.json(
        { error: "Testing database tables are not ready. Run Supabase migrations first." },
        { status: 503 },
      );
    }
    return NextResponse.json({ error: "Exam not found." }, { status: 404 });
  }

  const { data: entitlementRows } = await admin
    .from("user_exam_entitlements")
    .select("id, entitlement_type")
    .eq("user_id", user.id)
    .eq("exam_id", exam.id)
    .limit(1);

  const entitlement = entitlementRows?.[0] ?? null;
  if (!entitlement) {
    await admin.from("user_exam_entitlements").upsert(
      {
        user_id: user.id,
        exam_id: exam.id,
        entitlement_type: "sample",
      },
      { onConflict: "user_id,exam_id" },
    );
  }

  const hasFullEntitlement = entitlement?.entitlement_type === "full";
  const attemptType =
    requestedMode === "sample"
      ? "sample"
      : hasFullEntitlement
        ? "full"
        : "sample";
  const now = new Date();
  const windowStart = new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString();
  const maxAttempts = attemptType === "full" ? 3 : 1;

  const { count: attemptsInWindow } = await admin
    .from("testing_exam_attempts")
    .select("id", { count: "exact", head: true })
    .eq("user_id", user.id)
    .eq("exam_id", exam.id)
    .eq("attempt_type", attemptType)
    .gte("started_at", windowStart);

  if ((attemptsInWindow ?? 0) >= maxAttempts) {
    return NextResponse.json(
      { error: `Daily attempt limit reached for ${attemptType} mode.` },
      { status: 429 },
    );
  }

  const targetCount = attemptType === "sample" ? 10 : Math.max(10, exam.question_count || 60);
  let questionBankMode: QuestionBankMode = "governed";
  let eligibleCount = 0;
  let onDemandGenerated = 0;
  let generationMode: "openai" | "rule_based" | "none" = "none";

  try {
    questionBankMode = await resolveQuestionBankMode(admin, exam.id);
    if (questionBankMode === "legacy" && !shouldAllowLegacyTestingQuestionBankMode()) {
      return NextResponse.json(
        {
          error:
            "Testing question governance columns are missing. Legacy question-bank mode is blocked until migrations are applied.",
        },
        { status: 503 },
      );
    }
    eligibleCount = await countEligibleQuestions(admin, exam.id, questionBankMode);
  } catch (error) {
    if (isMissingTestingTableError(error)) {
      return NextResponse.json(
        { error: "Testing database tables are not ready. Run Supabase migrations first." },
        { status: 503 },
      );
    }
    console.error("Unexpected API error.", toSafeErrorRecord(error));
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }

  const desiredBuffer = attemptType === "full" ? Math.max(targetCount, 40) : Math.max(targetCount, 16);
  const desiredSupplyFloor = targetCount + desiredBuffer;
  if (eligibleCount < targetCount) {
    const refill = await replenishQuestionSupply({
      admin,
      exam,
      mode: questionBankMode,
      eligibleCount,
      minRequiredCount: targetCount,
      softTargetCount: desiredSupplyFloor,
      allowOpenAi: true,
    });
    eligibleCount = refill.eligibleCount;
    onDemandGenerated += refill.onDemandGenerated;
    generationMode = mergeGenerationMode(generationMode, refill.generationMode);
  }

  const excludedQuestionIds = await loadRecentQuestionIds({
    admin,
    userId: user.id,
    examId: exam.id,
  });

  let selected: QuestionBankRow[] = [];
  try {
    selected = await loadQuestionSample({
      admin,
      examId: exam.id,
      mode: questionBankMode,
      targetCount,
      eligibleCount,
      excludedQuestionIds,
    });
  } catch (error) {
    console.error("Unexpected API error.", toSafeErrorRecord(error));
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }

  if (selected.length < targetCount) {
    const refill = await replenishQuestionSupply({
      admin,
      exam,
      mode: questionBankMode,
      eligibleCount,
      minRequiredCount: targetCount,
      softTargetCount: targetCount + 8,
      allowOpenAi: false,
    });

    eligibleCount = refill.eligibleCount;
    onDemandGenerated += refill.onDemandGenerated;
    generationMode = mergeGenerationMode(generationMode, refill.generationMode);

    if (refill.onDemandGenerated > 0) {
      selected = await loadQuestionSample({
        admin,
        examId: exam.id,
        mode: questionBankMode,
        targetCount,
        eligibleCount,
        excludedQuestionIds,
      });
    }
  }

  if (selected.length === 0) {
    return NextResponse.json(
      { error: "No questions available for this exam yet. Please retry shortly while we replenish the bank." },
      { status: 409 },
    );
  }

  const questionIds = selected.map((entry) => entry.id);
  const baseTimingMinutes = Math.max(10, Number(exam.timing_minutes ?? 60) || 60);
  const timingMinutes =
    attemptType === "sample"
      ? Math.min(20, Math.max(8, Math.ceil((selected.length * 1.6))))
      : selected.length >= targetCount
        ? baseTimingMinutes
        : Math.max(20, Math.round((baseTimingMinutes * selected.length) / Math.max(1, targetCount)));

  const { data: attempt, error: attemptError } = await admin
    .from("testing_exam_attempts")
    .insert({
      user_id: user.id,
      exam_id: exam.id,
      attempt_type: attemptType,
      status: "in_progress",
      question_ids: questionIds,
      started_at: now.toISOString(),
    })
    .select("id")
    .single();

  if (attemptError || !attempt) {
    return NextResponse.json({ error: "Failed to start attempt." }, { status: 500 });
  }

  const questions: TestingQuestionPayload[] = selected.map((entry) => {
    const localizedText = language === "pl" && entry.question_text_pl
      ? entry.question_text_pl
      : entry.question_text;
    const localizedOptions = language === "pl" && entry.options_pl
      ? normalizeOptions(entry.options_pl)
      : normalizeOptions(entry.options);
    return {
      id: entry.id,
      domain: entry.domain,
      text: localizedText,
      options: localizedOptions,
    };
  });

  return NextResponse.json({
    attemptId: attempt.id,
    attemptType,
    timingMinutes,
    questions,
    questionSupply: {
      requested: targetCount,
      delivered: questions.length,
      onDemandGenerated,
      generationMode,
    },
  });
}
