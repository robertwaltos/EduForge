import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { toSafeErrorRecord } from "@/lib/logging/safe-error";
import { resolveVerifiedParentAccess } from "@/lib/compliance/parent-access";
import { enforceIpRateLimit } from "@/lib/security/ip-rate-limit";

function toLetterGrade(score: number) {
  if (score >= 90) return "A";
  if (score >= 80) return "B";
  if (score >= 70) return "C";
  if (score >= 60) return "D";
  return "F";
}

export async function GET(request: Request) {
  const rateLimit = await enforceIpRateLimit(request, "api:parent:reports:get", {
    max: 40,
    windowMs: 60_000,
  });
  if (!rateLimit.allowed) {
    return NextResponse.json(
      { error: "Too many parent report requests. Please retry shortly." },
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

  const parentAccess = await resolveVerifiedParentAccess({
    supabase,
    userId: user.id,
    userEmail: user.email,
    purpose: "parent_reports",
  });
  if (!parentAccess.ok) {
    if (parentAccess.status === 403) {
      return NextResponse.json({ error: parentAccess.error }, { status: 403 });
    }
    return NextResponse.json({ error: "Internal server error." }, { status: parentAccess.status });
  }

  const childIds = parentAccess.childUserIds;
  if (childIds.length === 0) {
    return NextResponse.json({ reports: [] });
  }

  const admin = createSupabaseAdminClient();
  const [profilesResult, masteryResult, progressResult] = await Promise.all([
    admin.from("user_profiles").select("user_id, display_name").in("user_id", childIds),
    admin
      .from("user_skill_mastery")
      .select("user_id, mastery_level, attempts, correct_attempts")
      .in("user_id", childIds),
    admin.from("user_learning_progress").select("user_id, lesson_id").in("user_id", childIds),
  ]);

  if (profilesResult.error) {
    console.error("Unexpected API error.", toSafeErrorRecord(profilesResult.error));
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
  if (masteryResult.error) {
    console.error("Unexpected API error.", toSafeErrorRecord(masteryResult.error));
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
  if (progressResult.error) {
    console.error("Unexpected API error.", toSafeErrorRecord(progressResult.error));
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }

  const profileMap = new Map((profilesResult.data ?? []).map((row) => [row.user_id, row.display_name]));
  const masteryByChild = new Map();
  for (const row of masteryResult.data ?? []) {
    const existing = masteryByChild.get(row.user_id) ?? [];
    existing.push(row);
    masteryByChild.set(row.user_id, existing);
  }

  const progressCountByChild = new Map();
  for (const row of progressResult.data ?? []) {
    progressCountByChild.set(row.user_id, (progressCountByChild.get(row.user_id) ?? 0) + 1);
  }

  const reports = childIds.map((childId) => {
    const masteryRows = masteryByChild.get(childId) ?? [];
    const avgMastery =
      masteryRows.length > 0
        ? masteryRows.reduce((acc: number, row: { mastery_level: number | null }) => acc + Number(row.mastery_level ?? 0), 0) /
          masteryRows.length
        : 0;
    const masteryPercent = Math.round(avgMastery * 100);
    const attempts = masteryRows.reduce(
      (acc: number, row: { attempts: number | null }) => acc + Number(row.attempts ?? 0),
      0,
    );
    const correct = masteryRows.reduce(
      (acc: number, row: { correct_attempts: number | null }) => acc + Number(row.correct_attempts ?? 0),
      0,
    );
    const accuracyPercent = attempts > 0 ? Math.round((correct / attempts) * 100) : 0;

    return {
      childUserId: childId,
      childDisplayName: profileMap.get(childId) ?? "Learner",
      lessonsCompleted: progressCountByChild.get(childId) ?? 0,
      masteryPercent,
      accuracyPercent,
      grade: toLetterGrade(masteryPercent),
      totalAttempts: attempts,
      totalCorrect: correct,
    };
  });

  return NextResponse.json({ reports });
}
