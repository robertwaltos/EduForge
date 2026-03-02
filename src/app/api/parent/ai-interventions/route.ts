import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { skills } from "@/lib/data/curriculum";
import { toSafeErrorRecord } from "@/lib/logging/safe-error";
import { resolveVerifiedParentAccess } from "@/lib/compliance/parent-access";
import { enforceIpRateLimit } from "@/lib/security/ip-rate-limit";

type InterventionSuggestion = {
  id: string;
  title: string;
  rationale: string;
  actions: string[];
  priority: "high" | "medium" | "low";
};

type MasteryRow = {
  skill_id: string;
  mastery_level: number | null;
};

type ErrorRow = {
  skill_id: string | null;
  error_type: string;
  lesson_id: string;
  created_at: string;
};

type FollowupPack = {
  summary?: string;
  focusSkills?: string[];
};

function isMissingTableError(message: string | undefined, table: string) {
  if (!message) return false;
  const normalized = message.toLowerCase();
  return (
    normalized.includes(table.toLowerCase()) &&
    (normalized.includes("does not exist") ||
      normalized.includes("could not find the table") ||
      normalized.includes("relation"))
  );
}

function toSkillLabel(skillId: string) {
  const fromCatalog = skills.find((skill) => skill.id === skillId)?.name;
  if (fromCatalog) return fromCatalog;
  return skillId
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function buildSuggestions(params: {
  weakSkills: string[];
  unresolvedErrors: ErrorRow[];
  followupPack: FollowupPack | null;
}) {
  const suggestions: InterventionSuggestion[] = [];
  const errorCount = params.unresolvedErrors.length;
  const topWeakSkills = params.weakSkills.slice(0, 3);
  const topErrorSkills = Array.from(
    new Set(
      params.unresolvedErrors
        .map((entry) => entry.skill_id)
        .filter((skillId): skillId is string => typeof skillId === "string" && skillId.trim().length > 0),
    ),
  ).slice(0, 3);

  if (topWeakSkills.length > 0) {
    suggestions.push({
      id: "skill-rebuild",
      title: "Rebuild weak foundational skills",
      rationale: `The lowest-mastery skills are ${topWeakSkills.map(toSkillLabel).join(", ")}.`,
      actions: [
        "Spend 10 minutes per day on one weak skill with short retrieval questions.",
        "After each attempt, ask your child to explain the reasoning out loud.",
        "Track one improvement win each day to reinforce progress.",
      ],
      priority: "high",
    });
  }

  if (errorCount > 0) {
    suggestions.push({
      id: "error-repair",
      title: "Run a mistake-repair loop",
      rationale:
        topErrorSkills.length > 0
          ? `${errorCount} unresolved errors were detected, mostly in ${topErrorSkills.map(toSkillLabel).join(", ")}.`
          : `${errorCount} unresolved errors were detected in recent lessons.`,
      actions: [
        "Pick 2 missed questions and have your child correct them without time pressure.",
        "For each corrected answer, write one rule to avoid the same mistake next time.",
        "Repeat the same question type after a short break to confirm retention.",
      ],
      priority: "high",
    });
  }

  if (params.followupPack?.summary || (params.followupPack?.focusSkills?.length ?? 0) > 0) {
    const focusSkills = (params.followupPack?.focusSkills ?? []).slice(0, 3).map(toSkillLabel);
    suggestions.push({
      id: "followup-alignment",
      title: "Align home practice with AI coach plan",
      rationale: focusSkills.length > 0
        ? `AI coach currently targets ${focusSkills.join(", ")}.`
        : "An AI follow-up plan is available for the latest completed lesson.",
      actions: [
        "Review the AI coach follow-up summary together before homework.",
        "Use AI flashcards for a short 5-minute recap session.",
        "End with one confidence check: child explains what improved today.",
      ],
      priority: "medium",
    });
  }

  if (suggestions.length === 0) {
    suggestions.push({
      id: "maintenance",
      title: "Maintain momentum with light daily review",
      rationale: "No urgent intervention signals were detected right now.",
      actions: [
        "Do one 10-minute mixed review session daily.",
        "Celebrate one mastered concept at the end of each session.",
        "Keep using spaced review lessons to prevent forgetting.",
      ],
      priority: "low",
    });
  }

  return suggestions.slice(0, 4);
}

export async function GET(request: Request) {
  try {
    const rateLimit = await enforceIpRateLimit(request, "api:parent:ai-interventions:get", {
      max: 30,
      windowMs: 60_000,
    });
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { error: "Too many intervention requests. Please retry shortly." },
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
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const parentAccess = await resolveVerifiedParentAccess({
      supabase,
      userId: user.id,
      userEmail: user.email,
      purpose: "parent_ai_interventions",
    });
    if (!parentAccess.ok) {
      if (parentAccess.status === 403) {
        return NextResponse.json({ error: parentAccess.error }, { status: 403 });
      }
      return NextResponse.json({ error: "Internal server error." }, { status: parentAccess.status });
    }

    const admin = createSupabaseAdminClient();
    const targetChildUserId = parentAccess.childUserIds[0];
    if (!targetChildUserId) {
      return NextResponse.json({
        childDisplayName: null,
        suggestions: [] as InterventionSuggestion[],
        message: "No verified child found for this parent profile.",
      });
    }

    const { data: childProfile, error: childError } = await admin
      .from("user_profiles")
      .select("user_id, display_name")
      .eq("user_id", targetChildUserId)
      .maybeSingle();

    if (childError) {
      console.error("Unexpected API error.", toSafeErrorRecord(childError));
      return NextResponse.json({ error: "Internal server error." }, { status: 500 });
    }

    if (!childProfile) {
      return NextResponse.json({
        childDisplayName: null,
        suggestions: [] as InterventionSuggestion[],
        message: "No child account found for this parent profile.",
      });
    }

    const [masteryResult, errorsResult, followupResult] = await Promise.all([
      admin
        .from("user_skill_mastery")
        .select("skill_id, mastery_level")
        .eq("user_id", childProfile.user_id)
        .order("mastery_level", { ascending: true })
        .limit(8),
      admin
        .from("user_exam_error_logs")
        .select("skill_id, error_type, lesson_id, created_at")
        .eq("user_id", childProfile.user_id)
        .eq("resolved", false)
        .order("created_at", { ascending: false })
        .limit(40),
      admin
        .from("ai_followup_materials")
        .select("pack")
        .eq("user_id", childProfile.user_id)
        .eq("status", "completed")
        .order("updated_at", { ascending: false })
        .limit(1)
        .maybeSingle(),
    ]);

    if (masteryResult.error) {
      console.error("Unexpected API error.", toSafeErrorRecord(masteryResult.error));
      return NextResponse.json({ error: "Internal server error." }, { status: 500 });
    }

    if (errorsResult.error && !isMissingTableError(errorsResult.error.message, "user_exam_error_logs")) {
      console.error("Unexpected API error.", toSafeErrorRecord(errorsResult.error));
      return NextResponse.json({ error: "Internal server error." }, { status: 500 });
    }

    if (
      followupResult.error &&
      !isMissingTableError(followupResult.error.message, "ai_followup_materials")
    ) {
      console.error("Unexpected API error.", toSafeErrorRecord(followupResult.error));
      return NextResponse.json({ error: "Internal server error." }, { status: 500 });
    }

    const weakSkills = ((masteryResult.data ?? []) as MasteryRow[])
      .filter((entry) => Number(entry.mastery_level ?? 0) < 0.75)
      .map((entry) => entry.skill_id);
    const unresolvedErrors = (errorsResult.data ?? []) as ErrorRow[];
    const followupPack = (followupResult.data?.pack ?? null) as FollowupPack | null;

    const suggestions = buildSuggestions({
      weakSkills,
      unresolvedErrors,
      followupPack,
    });

    return NextResponse.json({
      childDisplayName: childProfile.display_name ?? "your child",
      unresolvedErrorCount: unresolvedErrors.length,
      weakSkillCount: weakSkills.length,
      suggestions,
    });
  } catch (error) {
    console.error("Unexpected parent AI interventions error:", toSafeErrorRecord(error));
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
