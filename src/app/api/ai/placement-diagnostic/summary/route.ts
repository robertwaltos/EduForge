import { NextResponse } from "next/server";
import { z } from "zod";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { buildPlacementSummary } from "@/lib/ai/placement-diagnostic-contract";
import { enforceIpRateLimit } from "@/lib/security/ip-rate-limit";
import { toSafeErrorRecord } from "@/lib/logging/safe-error";

const QuerySchema = z.object({
  profileId: z.string().uuid().optional(),
});

type StudentProfileRow = {
  id: string;
  display_name: string;
  grade_level: string | null;
  age_years: number | null;
  initial_assessment_status: string | null;
  initial_assessment_data: unknown;
  ai_skill_level_map: unknown;
  updated_at: string;
};

function parseQuery(request: Request) {
  const url = new URL(request.url);
  return QuerySchema.safeParse({
    profileId: url.searchParams.get("profileId") ?? undefined,
  });
}

async function resolveProfile(input: {
  supabase: Awaited<ReturnType<typeof createSupabaseServerClient>>;
  userId: string;
  profileId?: string;
}) {
  const { supabase, userId, profileId } = input;
  if (profileId) {
    const { data, error } = await supabase
      .from("student_profiles")
      .select("id,display_name,grade_level,age_years,initial_assessment_status,initial_assessment_data,ai_skill_level_map,updated_at")
      .eq("account_id", userId)
      .eq("id", profileId)
      .maybeSingle();
    if (error) throw error;
    return (data as StudentProfileRow | null) ?? null;
  }

  const { data, error } = await supabase
    .from("student_profiles")
    .select("id,display_name,grade_level,age_years,initial_assessment_status,initial_assessment_data,ai_skill_level_map,updated_at")
    .eq("account_id", userId)
    .order("updated_at", { ascending: false })
    .limit(1)
    .maybeSingle();
  if (error) throw error;
  return (data as StudentProfileRow | null) ?? null;
}

export async function GET(request: Request) {
  try {
    const rateLimit = await enforceIpRateLimit(request, "api:ai:placement-diagnostic:summary:get", {
      max: 40,
      windowMs: 60_000,
    });
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { error: "Too many placement summary requests. Please retry shortly." },
        { status: 429, headers: { "Retry-After": String(rateLimit.retryAfterSeconds) } },
      );
    }

    const parsedQuery = parseQuery(request);
    if (!parsedQuery.success) {
      return NextResponse.json(
        { error: "Invalid placement summary query parameters.", details: parsedQuery.error.flatten() },
        { status: 400 },
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

    const profile = await resolveProfile({
      supabase,
      userId: user.id,
      profileId: parsedQuery.data.profileId,
    });
    if (!profile) {
      return NextResponse.json({ error: "Student profile not found." }, { status: 404 });
    }

    const summary = buildPlacementSummary({
      gradeLevel: profile.grade_level,
      ageYears: profile.age_years,
      initialAssessmentStatus: profile.initial_assessment_status,
      initialAssessmentData: profile.initial_assessment_data,
      aiSkillLevelMap: profile.ai_skill_level_map,
      updatedAt: profile.updated_at,
    });

    return NextResponse.json({
      generatedAt: new Date().toISOString(),
      profile: {
        id: profile.id,
        displayName: profile.display_name,
        gradeLevel: profile.grade_level,
        ageYears: profile.age_years,
      },
      status: {
        initialAssessmentStatus: summary.initialAssessmentStatus,
        hasPlacementDiagnostic: summary.hasPlacementDiagnostic,
      },
      placement: {
        inferredStageId: summary.inferredStageId,
        startingStageId: summary.startingStageId,
        recommendedStageId: summary.recommendedStageId,
        confidence: summary.confidence,
        manualOverrideStageId: summary.manualOverrideStageId,
        manualOverrideAt: summary.manualOverrideAt,
        manualOverrideReason: summary.manualOverrideReason,
        updatedAt: summary.updatedAt,
      },
      assessment: {
        version: summary.assessment.version,
        completedAt: summary.assessment.completedAt,
        responseCount: summary.assessment.responseCount,
        correctCount: summary.assessment.correctCount,
        score: summary.assessment.score,
      },
    });
  } catch (error) {
    console.error("[api/ai/placement-diagnostic/summary] unexpected error", toSafeErrorRecord(error));
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}
