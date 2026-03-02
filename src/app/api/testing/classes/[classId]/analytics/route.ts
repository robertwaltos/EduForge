import { NextResponse } from "next/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { isMissingTestingTableError } from "@/lib/testing/api-utils";
import { toSafeErrorRecord } from "@/lib/logging/safe-error";
import { resolveVerifiedTeacherClassAccess } from "@/lib/compliance/teacher-access";
import { enforceIpRateLimit } from "@/lib/security/ip-rate-limit";

type AttemptRow = {
  user_id: string;
  exam_id: string;
  score: number | null;
  domain_breakdown: unknown;
  completed_at: string | null;
};

type LearnerSummary = {
  learnerUserId: string;
  attempts: number;
  latestScore: number | null;
  averageScore: number | null;
  latestCompletedAt: string | null;
};

type DomainAggregate = {
  averageScore: number;
  attempts: number;
  weakCount: number;
};

function parseDomainBreakdown(
  value: unknown,
): Record<string, { score: number }> {
  if (!value || typeof value !== "object" || Array.isArray(value)) return {};
  const output: Record<string, { score: number }> = {};
  for (const [domain, rawEntry] of Object.entries(value as Record<string, unknown>)) {
    if (!rawEntry || typeof rawEntry !== "object" || Array.isArray(rawEntry)) continue;
    const entry = rawEntry as Record<string, unknown>;
    const score = Number(entry.score ?? 0);
    if (!Number.isFinite(score)) continue;
    output[domain] = { score };
  }
  return output;
}

function round(value: number) {
  return Math.round(value * 100) / 100;
}

export async function GET(
  request: Request,
  context: { params: Promise<{ classId: string }> },
) {
  const rateLimit = await enforceIpRateLimit(request, "api:testing:classes:analytics:get", {
    max: 45,
    windowMs: 60_000,
  });
  if (!rateLimit.allowed) {
    return NextResponse.json(
      { error: "Too many class analytics requests. Please retry shortly." },
      {
        status: 429,
        headers: { "Retry-After": String(rateLimit.retryAfterSeconds) },
      },
    );
  }

  const { classId } = await context.params;
  const examId = new URL(request.url).searchParams.get("examId");

  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const teacherAccess = await resolveVerifiedTeacherClassAccess({
    userId: user.id,
    classId,
    purpose: "testing_class_analytics",
  });
  if (!teacherAccess.ok) {
    if (teacherAccess.status === 403 || teacherAccess.status === 404 || teacherAccess.status === 503) {
      return NextResponse.json({ error: teacherAccess.error }, { status: teacherAccess.status });
    }
    return NextResponse.json({ error: "Internal server error." }, { status: teacherAccess.status });
  }

  const admin = createSupabaseAdminClient();
  const { data: enrollments, error: enrollmentError } = await admin
    .from("class_enrollments")
    .select("learner_user_id, parent_consent")
    .eq("class_id", classId);

  if (enrollmentError) {
    if (isMissingTestingTableError(enrollmentError)) {
      return NextResponse.json(
        { error: "Testing/classroom tables are not ready. Run Supabase migrations first." },
        { status: 503 },
      );
    }
    console.error("Unexpected API error.", toSafeErrorRecord(enrollmentError));
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }

  const learnerUserIds = (enrollments ?? [])
    .filter((entry) => Boolean(entry.parent_consent))
    .map((entry) => entry.learner_user_id)
    .filter((value): value is string => typeof value === "string" && value.length > 0);

  if (learnerUserIds.length === 0) {
    return NextResponse.json({
      classId: teacherAccess.classId,
      className: teacherAccess.className,
      examId: examId ?? null,
      learnerCount: 0,
      attemptCount: 0,
      aggregateScore: null,
      learnerProgress: [] as LearnerSummary[],
      domainHeatmap: {} as Record<string, DomainAggregate>,
    });
  }

  let attemptsQuery = admin
    .from("testing_exam_attempts")
    .select("user_id, exam_id, score, domain_breakdown, completed_at")
    .in("user_id", learnerUserIds)
    .eq("status", "completed");

  if (examId) {
    attemptsQuery = attemptsQuery.eq("exam_id", examId);
  }

  const { data: attemptsData, error: attemptsError } = await attemptsQuery;
  if (attemptsError) {
    console.error("Unexpected API error.", toSafeErrorRecord(attemptsError));
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }

  const attempts = (attemptsData ?? []) as AttemptRow[];
  const learnerMap = new Map<string, {
    attempts: number;
    scoreTotal: number;
    scoreCount: number;
    latestScore: number | null;
    latestCompletedAt: string | null;
  }>();

  const domainMap = new Map<string, {
    scoreTotal: number;
    attempts: number;
    weakCount: number;
  }>();

  let aggregateScoreTotal = 0;
  let aggregateScoreCount = 0;

  for (const attempt of attempts) {
    const numericScore = attempt.score != null ? Number(attempt.score) : NaN;
    if (Number.isFinite(numericScore)) {
      aggregateScoreTotal += numericScore;
      aggregateScoreCount += 1;
    }

    const learner = learnerMap.get(attempt.user_id) ?? {
      attempts: 0,
      scoreTotal: 0,
      scoreCount: 0,
      latestScore: null,
      latestCompletedAt: null,
    };

    learner.attempts += 1;
    if (Number.isFinite(numericScore)) {
      learner.scoreTotal += numericScore;
      learner.scoreCount += 1;
    }

    if (attempt.completed_at) {
      const currentLatest = learner.latestCompletedAt ? Date.parse(learner.latestCompletedAt) : 0;
      const candidate = Date.parse(attempt.completed_at);
      if (Number.isFinite(candidate) && candidate >= currentLatest) {
        learner.latestCompletedAt = attempt.completed_at;
        learner.latestScore = Number.isFinite(numericScore) ? numericScore : learner.latestScore;
      }
    }

    learnerMap.set(attempt.user_id, learner);

    const breakdown = parseDomainBreakdown(attempt.domain_breakdown);
    for (const [domain, entry] of Object.entries(breakdown)) {
      const domainAgg = domainMap.get(domain) ?? {
        scoreTotal: 0,
        attempts: 0,
        weakCount: 0,
      };
      domainAgg.scoreTotal += entry.score;
      domainAgg.attempts += 1;
      if (entry.score < 70) domainAgg.weakCount += 1;
      domainMap.set(domain, domainAgg);
    }
  }

  const learnerProgress: LearnerSummary[] = Array.from(learnerMap.entries()).map(
    ([learnerUserId, entry]) => ({
      learnerUserId,
      attempts: entry.attempts,
      latestScore: entry.latestScore != null ? round(entry.latestScore) : null,
      averageScore: entry.scoreCount > 0 ? round(entry.scoreTotal / entry.scoreCount) : null,
      latestCompletedAt: entry.latestCompletedAt,
    }),
  ).sort((left, right) => {
    const rightTime = right.latestCompletedAt ? Date.parse(right.latestCompletedAt) : 0;
    const leftTime = left.latestCompletedAt ? Date.parse(left.latestCompletedAt) : 0;
    return rightTime - leftTime;
  });

  const domainHeatmap: Record<string, DomainAggregate> = {};
  for (const [domain, entry] of domainMap.entries()) {
    domainHeatmap[domain] = {
      averageScore: entry.attempts > 0 ? round(entry.scoreTotal / entry.attempts) : 0,
      attempts: entry.attempts,
      weakCount: entry.weakCount,
    };
  }

  return NextResponse.json({
    classId: teacherAccess.classId,
    className: teacherAccess.className,
    examId: examId ?? null,
    learnerCount: learnerUserIds.length,
    attemptCount: attempts.length,
    aggregateScore: aggregateScoreCount > 0 ? round(aggregateScoreTotal / aggregateScoreCount) : null,
    learnerProgress,
    domainHeatmap,
  });
}
