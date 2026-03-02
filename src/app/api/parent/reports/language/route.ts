import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { getLanguagePlanById, getScoredAttemptLimitForPlan } from "@/lib/language-learning";
import type { LanguagePlanId } from "@/lib/language-learning/pricing";
import {
  summarizeLanguageProgress,
  type GamificationStateSummaryRow,
  type PronunciationAttemptSummaryRow,
} from "@/lib/language-learning/progress-metrics";
import type { StudentProfile } from "@/lib/profiles/types";
import { toSafeErrorRecord } from "@/lib/logging/safe-error";
import { resolveVerifiedParentAccess } from "@/lib/compliance/parent-access";
import { enforceIpRateLimit } from "@/lib/security/ip-rate-limit";

const querySchema = z.object({
  studentProfileId: z.string().uuid().optional(),
  months: z.coerce.number().int().min(1).max(12).optional(),
});

type PronunciationAttemptRow = PronunciationAttemptSummaryRow & {
  student_profile_id: string | null;
  asr_confidence: number | null;
};

type GamificationStateRow = GamificationStateSummaryRow & {
  student_profile_id: string | null;
};

type UsageRow = {
  student_profile_id: string | null;
  month_key: string;
  plan_tier: string | null;
  scored_attempts: number | null;
  practice_attempts: number | null;
  audio_minutes: number | null;
  ai_cost_usd: number | null;
};

function isMissingTableError(message: string) {
  const normalized = message.toLowerCase();
  return (
    normalized.includes("could not find the table") ||
    (normalized.includes("relation") && normalized.includes("does not exist"))
  );
}

function monthKeyFromDate(date: Date) {
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  return `${year}-${month}`;
}

function toFiniteNumber(value: unknown) {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string") {
    const parsed = Number(value);
    if (Number.isFinite(parsed)) return parsed;
  }
  return 0;
}

function buildRecentMonthKeys(months: number) {
  const keys: string[] = [];
  const current = new Date();

  for (let offset = 0; offset < months; offset += 1) {
    const date = new Date(Date.UTC(current.getUTCFullYear(), current.getUTCMonth() - offset, 1));
    keys.push(monthKeyFromDate(date));
  }

  return keys;
}

export async function GET(request: NextRequest) {
  const rateLimit = await enforceIpRateLimit(request, "api:parent:reports:language:get", {
    max: 24,
    windowMs: 60_000,
  });
  if (!rateLimit.allowed) {
    return NextResponse.json(
      { error: "Too many language report requests. Please retry shortly." },
      {
        status: 429,
        headers: { "Retry-After": String(rateLimit.retryAfterSeconds) },
      },
    );
  }

  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const parseResult = querySchema.safeParse({
    studentProfileId: request.nextUrl.searchParams.get("studentProfileId") ?? undefined,
    months: request.nextUrl.searchParams.get("months") ?? undefined,
  });
  if (!parseResult.success) {
    return NextResponse.json(
      { error: "Invalid query parameters.", details: parseResult.error.flatten() },
      { status: 400 },
    );
  }

  const { studentProfileId, months = 6 } = parseResult.data;
  const monthKeys = buildRecentMonthKeys(months);
  const currentMonthKey = monthKeys[0];

  const parentAccess = await resolveVerifiedParentAccess({
    supabase,
    userId: user.id,
    userEmail: user.email,
    purpose: "parent_language_reports",
  });
  if (!parentAccess.ok) {
    if (parentAccess.status === 403) {
      return NextResponse.json({ error: parentAccess.error }, { status: 403 });
    }
    return NextResponse.json({ error: "Internal server error." }, { status: parentAccess.status });
  }

  const childUserIds = parentAccess.childUserIds;
  if (childUserIds.length === 0) {
    return NextResponse.json({
      generatedAt: new Date().toISOString(),
      monthsWindow: months,
      reports: [],
      warnings: [],
    });
  }

  const admin = createSupabaseAdminClient();
  let profilesQuery = admin
    .from("student_profiles")
    .select("id, display_name, grade_level")
    .in("account_id", childUserIds)
    .order("display_name", { ascending: true });
  if (studentProfileId) {
    profilesQuery = profilesQuery.eq("id", studentProfileId);
  }

  const { data: profileRows, error: profileError } = await profilesQuery;
  if (profileError) {
    console.error("Unexpected API error.", toSafeErrorRecord(profileError));
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }

  const profiles = (profileRows ?? []) as StudentProfile[];
  if (profiles.length === 0) {
    if (studentProfileId) {
      return NextResponse.json(
        { error: "Requested student profile is not linked to a verified parent consent." },
        { status: 403 },
      );
    }
    return NextResponse.json({
      generatedAt: new Date().toISOString(),
      monthsWindow: months,
      reports: [],
      warnings: [],
    });
  }

  const profileIds = profiles.map((profile) => profile.id);
  const warnings: string[] = [];

  const [attemptsResult, stateResult, usageResult] = await Promise.all([
    admin
      .from("pronunciation_attempts")
      .select("student_profile_id, grading_mode, overall_score, created_at, asr_confidence")
      .in("student_profile_id", profileIds)
      .order("created_at", { ascending: false })
      .limit(1000),
    admin
      .from("gamification_states")
      .select("student_profile_id, points, level, badges, quests_completed, last_activity_at")
      .in("student_profile_id", profileIds),
    admin
      .from("language_usage_tracking")
      .select(
        "student_profile_id, month_key, plan_tier, scored_attempts, practice_attempts, audio_minutes, ai_cost_usd",
      )
      .in("student_profile_id", profileIds)
      .in("month_key", monthKeys)
      .order("month_key", { ascending: false }),
  ]);

  if (attemptsResult.error && !isMissingTableError(attemptsResult.error.message)) {
    console.error("Unexpected API error.", toSafeErrorRecord(attemptsResult.error));
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
  if (stateResult.error && !isMissingTableError(stateResult.error.message)) {
    console.error("Unexpected API error.", toSafeErrorRecord(stateResult.error));
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
  if (usageResult.error && !isMissingTableError(usageResult.error.message)) {
    console.error("Unexpected API error.", toSafeErrorRecord(usageResult.error));
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }

  if (attemptsResult.error && isMissingTableError(attemptsResult.error.message)) {
    warnings.push("pronunciation_attempts table is not available yet.");
  }
  if (stateResult.error && isMissingTableError(stateResult.error.message)) {
    warnings.push("gamification_states table is not available yet.");
  }
  if (usageResult.error && isMissingTableError(usageResult.error.message)) {
    warnings.push("language_usage_tracking table is not available yet.");
  }

  const attemptsByProfile = new Map<string, PronunciationAttemptRow[]>();
  for (const row of ((attemptsResult.data ?? []) as PronunciationAttemptRow[])) {
    if (!row.student_profile_id) continue;
    const entries = attemptsByProfile.get(row.student_profile_id) ?? [];
    entries.push(row);
    attemptsByProfile.set(row.student_profile_id, entries);
  }

  const stateByProfile = new Map<string, GamificationStateRow>();
  for (const row of ((stateResult.data ?? []) as GamificationStateRow[])) {
    if (!row.student_profile_id) continue;
    stateByProfile.set(row.student_profile_id, row);
  }

  const usageByProfile = new Map<string, UsageRow[]>();
  for (const row of ((usageResult.data ?? []) as UsageRow[])) {
    if (!row.student_profile_id) continue;
    const entries = usageByProfile.get(row.student_profile_id) ?? [];
    entries.push(row);
    usageByProfile.set(row.student_profile_id, entries);
  }

  const reports = profiles.map((profile) => {
    const attempts = attemptsByProfile.get(profile.id) ?? [];
    const state = stateByProfile.get(profile.id) ?? null;
    const usageRows = usageByProfile.get(profile.id) ?? [];
    const progress = summarizeLanguageProgress(
      attempts.map((row) => ({
        grading_mode: row.grading_mode,
        overall_score: row.overall_score,
        created_at: row.created_at,
      })),
      state
        ? {
            points: state.points,
            level: state.level,
            badges: state.badges,
            quests_completed: state.quests_completed,
            last_activity_at: state.last_activity_at,
          }
        : null,
    );

    const usageByMonth = new Map(usageRows.map((row) => [row.month_key, row]));
    const series = monthKeys.map((key) => {
      const row = usageByMonth.get(key);
      const planTier = (row?.plan_tier ?? "core_practice") as LanguagePlanId;
      return {
        monthKey: key,
        planTier,
        scoredAttempts: Math.max(0, Math.round(toFiniteNumber(row?.scored_attempts))),
        practiceAttempts: Math.max(0, Math.round(toFiniteNumber(row?.practice_attempts))),
        audioMinutes: Math.max(0, Number(toFiniteNumber(row?.audio_minutes).toFixed(2))),
        aiCostUsd: Math.max(0, Number(toFiniteNumber(row?.ai_cost_usd).toFixed(4))),
      };
    });

    const currentUsage = series[0] ?? {
      monthKey: currentMonthKey,
      planTier: "core_practice",
      scoredAttempts: 0,
      practiceAttempts: 0,
      audioMinutes: 0,
      aiCostUsd: 0,
    };
    const plan = getLanguagePlanById(currentUsage.planTier);
    const scoredLimit = getScoredAttemptLimitForPlan(plan?.id ?? "core_practice");

    const recentAttempts = attempts.slice(0, 8).map((attempt) => ({
      createdAt: attempt.created_at,
      gradingMode: attempt.grading_mode,
      overallScore:
        attempt.overall_score === null ? null : Number(toFiniteNumber(attempt.overall_score).toFixed(1)),
      asrConfidence:
        attempt.asr_confidence === null
          ? null
          : Number(toFiniteNumber(attempt.asr_confidence).toFixed(3)),
    }));

    return {
      studentProfileId: profile.id,
      displayName: profile.display_name,
      gradeLevel: profile.grade_level,
      progress,
      currentUsage: {
        ...currentUsage,
        planName: plan?.name ?? "Core Practice",
        scoredAttemptsLimit: scoredLimit,
        scoredAttemptsRemaining: Math.max(0, scoredLimit - currentUsage.scoredAttempts),
      },
      usageSeries: series,
      recentAttempts,
    };
  });

  return NextResponse.json({
    generatedAt: new Date().toISOString(),
    monthsWindow: months,
    reports,
    warnings,
  });
}
