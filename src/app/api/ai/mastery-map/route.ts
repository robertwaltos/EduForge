import { NextResponse } from "next/server";
import { z } from "zod";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getAllLearningModules } from "@/lib/modules";
import { getModulesForStage } from "@/lib/content-gating";
import { inferEducationStageId } from "@/lib/explorer/learning-paths";
import { buildMasterySkillGraph } from "@/lib/mastery/skill-graph";
import { enforceIpRateLimit } from "@/lib/security/ip-rate-limit";
import { toSafeErrorRecord } from "@/lib/logging/safe-error";

const STAGE_IDS = ["pre-k", "early-elem", "upper-elem", "middle", "high", "college"] as const;

const QuerySchema = z.object({
  profileId: z.string().uuid().optional(),
  stageId: z.enum(STAGE_IDS).optional(),
  maxRecommendations: z.coerce.number().int().min(1).max(12).default(6),
  includeGraph: z.boolean().default(false),
});

type StudentProfileRow = {
  id: string;
  display_name: string;
  grade_level: string | null;
  age_years: number | null;
  updated_at: string;
};

type MasteryRow = {
  skill_id: string;
  mastery_level: number | null;
};

type ProgressRow = {
  lesson_id: string;
  next_review_at: string | null;
};

function parseBooleanParam(value: string | null) {
  if (!value) return undefined;
  const normalized = value.trim().toLowerCase();
  if (normalized === "1" || normalized === "true" || normalized === "yes") return true;
  if (normalized === "0" || normalized === "false" || normalized === "no") return false;
  return undefined;
}

function parseQuery(request: Request) {
  const url = new URL(request.url);
  return QuerySchema.safeParse({
    profileId: url.searchParams.get("profileId") ?? undefined,
    stageId: url.searchParams.get("stageId") ?? undefined,
    maxRecommendations: url.searchParams.get("maxRecommendations") ?? undefined,
    includeGraph: parseBooleanParam(url.searchParams.get("includeGraph")),
  });
}

function isReviewDue(nextReviewAt: string | null | undefined, nowMs = Date.now()) {
  if (!nextReviewAt) return false;
  const nextReviewTimestamp = new Date(nextReviewAt).getTime();
  return Number.isFinite(nextReviewTimestamp) && nextReviewTimestamp <= nowMs;
}

function clampMasteryLevel(value: number | null | undefined) {
  const numeric = Number(value ?? 0);
  if (!Number.isFinite(numeric)) return 0;
  return Math.max(0, Math.min(1, numeric));
}

export async function GET(request: Request) {
  try {
    const rateLimit = await enforceIpRateLimit(request, "api:ai:mastery-map:get", {
      max: 30,
      windowMs: 60_000,
    });

    if (!rateLimit.allowed) {
      return NextResponse.json(
        { error: "Too many mastery-map requests. Please retry shortly." },
        { status: 429, headers: { "Retry-After": String(rateLimit.retryAfterSeconds) } },
      );
    }

    const parsedQuery = parseQuery(request);
    if (!parsedQuery.success) {
      return NextResponse.json(
        { error: "Invalid mastery-map query parameters." },
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

    let profile: StudentProfileRow | null = null;
    if (parsedQuery.data.profileId) {
      const { data: profileRow, error: profileError } = await supabase
        .from("student_profiles")
        .select("id,display_name,grade_level,age_years,updated_at")
        .eq("account_id", user.id)
        .eq("id", parsedQuery.data.profileId)
        .maybeSingle();

      if (profileError) {
        console.error("Unable to load mastery-map profile.", toSafeErrorRecord(profileError));
        return NextResponse.json({ error: "Database error." }, { status: 500 });
      }
      if (!profileRow) {
        return NextResponse.json({ error: "Profile not found." }, { status: 404 });
      }

      profile = profileRow as StudentProfileRow;
    } else {
      const { data: profileRow, error: profileError } = await supabase
        .from("student_profiles")
        .select("id,display_name,grade_level,age_years,updated_at")
        .eq("account_id", user.id)
        .order("updated_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (profileError) {
        console.error("Unable to load mastery-map profile.", toSafeErrorRecord(profileError));
        return NextResponse.json({ error: "Database error." }, { status: 500 });
      }

      profile = (profileRow as StudentProfileRow | null) ?? null;
    }

    const [masteryResult, progressResult] = await Promise.all([
      supabase
        .from("user_skill_mastery")
        .select("skill_id,mastery_level")
        .eq("user_id", user.id),
      supabase
        .from("user_learning_progress")
        .select("lesson_id,next_review_at")
        .eq("user_id", user.id),
    ]);

    if (masteryResult.error) {
      console.error("Unable to load mastery rows.", toSafeErrorRecord(masteryResult.error));
      return NextResponse.json({ error: "Database error." }, { status: 500 });
    }
    if (progressResult.error) {
      console.error("Unable to load progress rows.", toSafeErrorRecord(progressResult.error));
      return NextResponse.json({ error: "Database error." }, { status: 500 });
    }

    const allLearningModules = getAllLearningModules();
    const masteryGraph = buildMasterySkillGraph(allLearningModules);
    const moduleSummaryById = new Map(
      masteryGraph.modules.map((summary) => [summary.moduleId, summary] as const),
    );

    const inferredStageId = inferEducationStageId({
      age_years: profile?.age_years,
      gradeLevel: profile?.grade_level,
    });
    const stageId = parsedQuery.data.stageId ?? inferredStageId;
    const stageModules = getModulesForStage(stageId);

    const masteryRows = (masteryResult.data ?? []) as MasteryRow[];
    const progressRows = (progressResult.data ?? []) as ProgressRow[];

    const weakSkills = masteryRows
      .map((row) => ({
        skillId: row.skill_id,
        masteryLevel: clampMasteryLevel(row.mastery_level),
      }))
      .filter((row) => row.masteryLevel < 0.72)
      .sort((left, right) => left.masteryLevel - right.masteryLevel)
      .slice(0, 12);
    const weakSkillSet = new Set(weakSkills.map((row) => row.skillId));

    const completedLessonIds = new Set(progressRows.map((row) => row.lesson_id));
    const dueLessonIds = new Set(
      progressRows.filter((row) => isReviewDue(row.next_review_at)).map((row) => row.lesson_id),
    );

    const recommendations = stageModules
      .map((moduleEntry) => {
        const moduleSummary = moduleSummaryById.get(moduleEntry.id);
        const lessonIds =
          ((moduleSummary?.lessonIds.length ?? 0) > 0)
            ? moduleSummary?.lessonIds ?? []
            : moduleEntry.lessons.map((lesson) => lesson.id);
        const skillIds = moduleSummary?.skillIds ?? [];
        const weakSkillMatches = skillIds.filter((skillId) => weakSkillSet.has(skillId));
        const completedLessonCount = lessonIds.filter((lessonId) => completedLessonIds.has(lessonId)).length;
        const dueLessonCount = lessonIds.filter((lessonId) => dueLessonIds.has(lessonId)).length;
        const progressRatio = lessonIds.length > 0 ? completedLessonCount / lessonIds.length : 0;

        let score = 1;
        const reasons: string[] = [];

        if (weakSkillMatches.length > 0) {
          score += Math.min(18, weakSkillMatches.length * 4);
          reasons.push(
            `${weakSkillMatches.length} weak skill match${weakSkillMatches.length > 1 ? "es" : ""}`,
          );
        }

        if (completedLessonCount === 0) {
          score += 3;
          reasons.push("new module for this learner");
        } else if (progressRatio >= 0.6 && progressRatio < 1) {
          score += 2;
          reasons.push("near completion - convert progress into mastery");
        }

        if (dueLessonCount > 0) {
          score += Math.min(8, dueLessonCount * 2);
          reasons.push(
            `${dueLessonCount} due review lesson${dueLessonCount > 1 ? "s" : ""} inside module`,
          );
        }

        if (moduleEntry.isFree) {
          score += 1;
          reasons.push("available on free tier");
        }

        if (moduleSummary?.explicitSkillCount && moduleSummary.explicitSkillCount > 0) {
          score += 1;
          reasons.push("well-tagged module for adaptive routing");
        }

        return {
          moduleId: moduleEntry.id,
          moduleTitle: moduleEntry.title,
          subject: moduleEntry.subject,
          isFree: moduleEntry.isFree,
          score,
          reasons,
          weakSkillMatches,
          completedLessonCount,
          totalLessonCount: lessonIds.length,
          dueLessonCount,
        };
      })
      .sort((left, right) => {
        if (right.score !== left.score) return right.score - left.score;
        if (left.isFree !== right.isFree) return Number(right.isFree) - Number(left.isFree);
        return left.moduleTitle.localeCompare(right.moduleTitle);
      })
      .slice(0, parsedQuery.data.maxRecommendations);

    const profileSignalCount =
      Number(Boolean(profile?.grade_level)) +
      Number(typeof profile?.age_years === "number" && Number.isFinite(profile.age_years));
    const stageConfidence = parsedQuery.data.stageId
      ? "explicit"
      : profileSignalCount === 2
        ? "high"
        : profileSignalCount === 1
          ? "medium"
          : "low";

    const graphSummary = parsedQuery.data.includeGraph
      ? masteryGraph
      : {
          generatedAt: masteryGraph.generatedAt,
          moduleCount: masteryGraph.moduleCount,
          lessonCount: masteryGraph.lessonCount,
          skillCount: masteryGraph.skillCount,
          edgeCount: masteryGraph.edgeCount,
          coverage: masteryGraph.coverage,
          topSkillsByLessonCoverage: masteryGraph.nodes
            .slice()
            .sort((left, right) => right.lessonIds.length - left.lessonIds.length)
            .slice(0, 12)
            .map((node) => ({
              skillId: node.id,
              label: node.label,
              lessonCount: node.lessonIds.length,
              moduleId: node.moduleId,
            })),
        };

    return NextResponse.json({
      generatedAt: new Date().toISOString(),
      stageRecommendation: {
        stageId,
        confidence: stageConfidence,
        source: parsedQuery.data.stageId ? "query" : profile ? "profile" : "default",
        profile: profile
          ? {
              id: profile.id,
              displayName: profile.display_name,
              gradeLevel: profile.grade_level,
              ageYears: profile.age_years,
            }
          : null,
      },
      weakSkills,
      dueLessonCount: dueLessonIds.size,
      recommendationCount: recommendations.length,
      recommendations,
      stageModuleCount: stageModules.length,
      graph: graphSummary,
    });
  } catch (error) {
    console.error("Unexpected mastery-map route error.", toSafeErrorRecord(error));
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}
