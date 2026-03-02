import { NextResponse } from "next/server";
import { z } from "zod";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getModulesForStage } from "@/lib/content-gating";
import { inferEducationStageId } from "@/lib/explorer/learning-paths";
import { enforceIpRateLimit } from "@/lib/security/ip-rate-limit";
import { sanitizeDisplayName } from "@/lib/security/sanitize-user-text";
import { toSafeErrorRecord } from "@/lib/logging/safe-error";
import {
  PLACEMENT_STAGE_IDS,
  calculatePlacementConfidence,
  normalizePlacementStageId,
  recommendPlacementStage,
  toRoundedScore,
  type PlacementStageId,
} from "@/lib/ai/placement-diagnostic-scoring";
import { buildPlacementOverrideSkillMap } from "@/lib/ai/placement-diagnostic-contract";

const STAGE_IDS = PLACEMENT_STAGE_IDS;

const QuerySchema = z.object({
  profileId: z.string().uuid().optional(),
  stageId: z.enum(STAGE_IDS).optional(),
  questionCount: z.coerce.number().int().min(5).max(20).default(10),
  includeAnswers: z.boolean().default(false),
});

const SubmitBodySchema = z.object({
  mode: z.literal("submit").optional(),
  profileId: z.string().uuid().optional(),
  stageId: z.enum(STAGE_IDS).optional(),
  profile: z
    .object({
      displayName: z.string().min(2).max(80),
      gradeLevel: z.string().min(1).max(8).optional().nullable(),
      ageYears: z.number().int().min(3).max(21).optional().nullable(),
    })
    .optional(),
  interestPathIds: z.array(z.string().min(1)).max(8).optional(),
  responses: z
    .array(
      z.object({
        moduleId: z.string().min(1),
        lessonId: z.string().min(1),
        questionId: z.string().min(1),
        selectedOptionId: z.string().min(1),
      }),
    )
    .min(5)
    .max(40),
});

const OverrideBodySchema = z.object({
  mode: z.literal("override"),
  profileId: z.string().uuid().optional(),
  overrideStageId: z.enum(STAGE_IDS),
  reason: z.string().max(280).optional(),
});

type StudentProfileRow = {
  id: string;
  display_name: string;
  grade_level: string | null;
  age_years: number | null;
  ai_skill_level_map: unknown;
  initial_assessment_data: unknown;
  updated_at: string;
};

type SkillMasteryRow = {
  skill_id: string;
  attempts: number | null;
  correct_attempts: number | null;
};

type PlacementEventRow = {
  user_id: string;
  profile_id: string;
  event_type: "diagnostic_submitted" | "manual_override";
  stage_id: PlacementStageId;
  recommended_stage_id: PlacementStageId | null;
  confidence: number | null;
  score: number | null;
  metadata: Record<string, unknown>;
};

type PlacementQuestionRecord = {
  moduleId: string;
  moduleTitle: string;
  lessonId: string;
  lessonTitle: string;
  subject: string;
  questionId: string;
  questionText: string;
  options: Array<{ id: string; text: string }>;
  correctOptionId: string;
  skillId: string | null;
};

type PlacementQuestionPayload = Omit<PlacementQuestionRecord, "correctOptionId"> & {
  correctOptionId?: string;
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
    questionCount: url.searchParams.get("questionCount") ?? undefined,
    includeAnswers: parseBooleanParam(url.searchParams.get("includeAnswers")),
  });
}

function toRecord(value: unknown): Record<string, unknown> {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return {};
  }
  return value as Record<string, unknown>;
}

function isPlacementEventsTableMissingError(message: string | undefined) {
  if (!message) return false;
  const normalized = message.toLowerCase();
  return (
    normalized.includes("placement_diagnostic_events") &&
    (
      normalized.includes("does not exist") ||
      normalized.includes("could not find the table") ||
      normalized.includes("relation")
    )
  );
}

async function resolveProfile(input: {
  supabase: Awaited<ReturnType<typeof createSupabaseServerClient>>;
  userId: string;
  profileId?: string;
}): Promise<StudentProfileRow | null> {
  const { supabase, userId, profileId } = input;
  if (profileId) {
    const { data, error } = await supabase
      .from("student_profiles")
      .select("id,display_name,grade_level,age_years,ai_skill_level_map,initial_assessment_data,updated_at")
      .eq("account_id", userId)
      .eq("id", profileId)
      .maybeSingle();
    if (error) {
      throw error;
    }
    return (data as StudentProfileRow | null) ?? null;
  }

  const { data, error } = await supabase
    .from("student_profiles")
    .select("id,display_name,grade_level,age_years,ai_skill_level_map,initial_assessment_data,updated_at")
    .eq("account_id", userId)
    .order("updated_at", { ascending: false })
    .limit(1)
    .maybeSingle();
  if (error) {
    throw error;
  }
  return (data as StudentProfileRow | null) ?? null;
}

async function createProfile(input: {
  supabase: Awaited<ReturnType<typeof createSupabaseServerClient>>;
  userId: string;
  profileId?: string;
  profile: { displayName: string; gradeLevel?: string | null; ageYears?: number | null };
}): Promise<StudentProfileRow> {
  const { supabase, userId, profileId, profile } = input;
  const normalizedName = sanitizeDisplayName(profile.displayName);
  if (normalizedName.length < 2) {
    throw new Error("Invalid profile name.");
  }

  const insertPayload: Record<string, unknown> = {
    account_id: userId,
    display_name: normalizedName,
    grade_level: profile.gradeLevel ?? null,
    age_years: profile.ageYears ?? null,
  };
  if (profileId) {
    insertPayload.id = profileId;
  }

  const { data, error } = await supabase
    .from("student_profiles")
    .insert(insertPayload)
    .select("id,display_name,grade_level,age_years,ai_skill_level_map,initial_assessment_data,updated_at")
    .maybeSingle();

  if (error || !data) {
    throw error ?? new Error("Failed to create profile.");
  }

  return data as StudentProfileRow;
}

async function recordPlacementEvent(input: {
  supabase: Awaited<ReturnType<typeof createSupabaseServerClient>>;
  row: PlacementEventRow;
}) {
  const { supabase, row } = input;
  const { error } = await supabase
    .from("placement_diagnostic_events")
    .insert(row);

  if (!error) return;
  if (isPlacementEventsTableMissingError(error.message)) {
    return;
  }
  console.error("[api/ai/placement-diagnostic] placement event write failed", toSafeErrorRecord(error));
}

function buildStageQuestionPool(stageId: PlacementStageId) {
  const stageModules = getModulesForStage(stageId);
  const perModule = new Map<string, PlacementQuestionRecord[]>();

  for (const stageModule of stageModules) {
    for (const lesson of stageModule.lessons) {
      for (const question of lesson.questions ?? []) {
        const normalizedOptions = (question.options ?? [])
          .filter((option) => typeof option.id === "string" && option.id.length > 0)
          .map((option) => ({ id: option.id, text: option.text }));

        if (normalizedOptions.length < 2) continue;
        if (!normalizedOptions.some((option) => option.id === question.correctOptionId)) continue;

        const entry: PlacementQuestionRecord = {
          moduleId: stageModule.id,
          moduleTitle: stageModule.title,
          lessonId: lesson.id,
          lessonTitle: lesson.title,
          subject: stageModule.subject,
          questionId: question.id,
          questionText: question.text,
          options: normalizedOptions,
          correctOptionId: question.correctOptionId,
          skillId: typeof question.skillId === "string" && question.skillId.length > 0 ? question.skillId : null,
        };

        const list = perModule.get(stageModule.id) ?? [];
        list.push(entry);
        perModule.set(stageModule.id, list);
      }
    }
  }

  const moduleIds = [...perModule.keys()].sort((left, right) => left.localeCompare(right));
  for (const moduleId of moduleIds) {
    const list = perModule.get(moduleId);
    if (!list) continue;
    list.sort((left, right) => left.questionId.localeCompare(right.questionId));
  }

  return { stageModules, perModule, moduleIds };
}

function pickInterleavedQuestions(input: {
  perModule: Map<string, PlacementQuestionRecord[]>;
  moduleIds: string[];
  questionCount: number;
}) {
  const { perModule, moduleIds, questionCount } = input;
  const selected: PlacementQuestionRecord[] = [];
  const cursors = new Map<string, number>();
  for (const moduleId of moduleIds) {
    cursors.set(moduleId, 0);
  }

  let progressed = true;
  while (selected.length < questionCount && progressed) {
    progressed = false;
    for (const moduleId of moduleIds) {
      if (selected.length >= questionCount) break;
      const list = perModule.get(moduleId) ?? [];
      const cursor = cursors.get(moduleId) ?? 0;
      if (cursor >= list.length) continue;
      selected.push(list[cursor]!);
      cursors.set(moduleId, cursor + 1);
      progressed = true;
    }
  }

  return selected;
}

function toPublicQuestion(
  question: PlacementQuestionRecord,
  includeAnswers: boolean,
): PlacementQuestionPayload {
  const payload: PlacementQuestionPayload = {
    moduleId: question.moduleId,
    moduleTitle: question.moduleTitle,
    lessonId: question.lessonId,
    lessonTitle: question.lessonTitle,
    subject: question.subject,
    questionId: question.questionId,
    questionText: question.questionText,
    options: question.options,
    skillId: question.skillId,
  };

  if (includeAnswers) {
    payload.correctOptionId = question.correctOptionId;
  }

  return payload;
}

export async function GET(request: Request) {
  try {
    const rateLimit = await enforceIpRateLimit(request, "api:ai:placement-diagnostic:get", {
      max: 30,
      windowMs: 60_000,
    });
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { error: "Too many placement-diagnostic requests. Please retry shortly." },
        { status: 429, headers: { "Retry-After": String(rateLimit.retryAfterSeconds) } },
      );
    }

    const parsedQuery = parseQuery(request);
    if (!parsedQuery.success) {
      return NextResponse.json(
        { error: "Invalid placement-diagnostic query parameters.", details: parsedQuery.error.flatten() },
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

    const inferredStageId = normalizePlacementStageId(
      inferEducationStageId({
        age_years: profile?.age_years,
        gradeLevel: profile?.grade_level,
      }),
    );
    const stageId = parsedQuery.data.stageId ?? inferredStageId;
    const stagePool = buildStageQuestionPool(stageId);
    const selected = pickInterleavedQuestions({
      perModule: stagePool.perModule,
      moduleIds: stagePool.moduleIds,
      questionCount: parsedQuery.data.questionCount,
    });

    const profileSignalCount =
      Number(Boolean(profile?.grade_level)) +
      Number(typeof profile?.age_years === "number" && Number.isFinite(profile.age_years));

    return NextResponse.json({
      generatedAt: new Date().toISOString(),
      stageRecommendation: {
        stageId,
        confidence:
          parsedQuery.data.stageId
            ? "explicit"
            : profileSignalCount === 2
              ? "high"
              : profileSignalCount === 1
                ? "medium"
                : "low",
        source: parsedQuery.data.stageId ? "query" : profile ? "profile" : "default",
      },
      questionCount: selected.length,
      requestedQuestionCount: parsedQuery.data.questionCount,
      stageModuleCount: stagePool.stageModules.length,
      profile: profile
        ? {
            id: profile.id,
            displayName: profile.display_name,
            gradeLevel: profile.grade_level,
            ageYears: profile.age_years,
          }
        : null,
      questions: selected.map((question) => toPublicQuestion(question, parsedQuery.data.includeAnswers)),
    });
  } catch (error) {
    console.error("[api/ai/placement-diagnostic] unexpected GET error", toSafeErrorRecord(error));
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const rateLimit = await enforceIpRateLimit(request, "api:ai:placement-diagnostic:post", {
      max: 20,
      windowMs: 60_000,
    });
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { error: "Too many placement-diagnostic submissions. Please retry shortly." },
        { status: 429, headers: { "Retry-After": String(rateLimit.retryAfterSeconds) } },
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

    const body = await request.json().catch(() => ({}));

    if (body && typeof body === "object" && (body as Record<string, unknown>).mode === "override") {
      const overrideBody = OverrideBodySchema.safeParse(body);
      if (!overrideBody.success) {
        return NextResponse.json(
          { error: "Invalid placement override payload.", details: overrideBody.error.flatten() },
          { status: 400 },
        );
      }

      const profile = await resolveProfile({
        supabase,
        userId: user.id,
        profileId: overrideBody.data.profileId,
      });
      if (!profile) {
        return NextResponse.json({ error: "Student profile not found." }, { status: 404 });
      }

      const nextSkillMap = buildPlacementOverrideSkillMap({
        existingSkillMap: profile.ai_skill_level_map,
        overrideStageId: overrideBody.data.overrideStageId,
        reason: overrideBody.data.reason ?? null,
      });

      const { error: updateError } = await supabase
        .from("student_profiles")
        .update({
          ai_skill_level_map: nextSkillMap,
        })
        .eq("id", profile.id)
        .eq("account_id", user.id);

      if (updateError) {
        console.error("[api/ai/placement-diagnostic] override update failed", toSafeErrorRecord(updateError));
        return NextResponse.json({ error: "Database error." }, { status: 500 });
      }

      await recordPlacementEvent({
        supabase,
        row: {
          user_id: user.id,
          profile_id: profile.id,
          event_type: "manual_override",
          stage_id: overrideBody.data.overrideStageId,
          recommended_stage_id: overrideBody.data.overrideStageId,
          confidence: null,
          score: null,
          metadata: {
            source: "manual_override",
            reason: overrideBody.data.reason ?? null,
          },
        },
      });

      return NextResponse.json({
        success: true,
        mode: "override",
        profileId: profile.id,
        overrideStageId: overrideBody.data.overrideStageId,
      });
    }

    const submitBody = SubmitBodySchema.safeParse(body);
    if (!submitBody.success) {
      return NextResponse.json(
        { error: "Invalid placement submission payload.", details: submitBody.error.flatten() },
        { status: 400 },
      );
    }

    let profile = await resolveProfile({
      supabase,
      userId: user.id,
      profileId: submitBody.data.profileId,
    });

    if (!profile && submitBody.data.profile) {
      try {
        profile = await createProfile({
          supabase,
          userId: user.id,
          profileId: submitBody.data.profileId,
          profile: {
            displayName: submitBody.data.profile.displayName,
            gradeLevel: submitBody.data.profile.gradeLevel ?? null,
            ageYears: submitBody.data.profile.ageYears ?? null,
          },
        });
      } catch (error) {
        console.error("[api/ai/placement-diagnostic] profile creation failed", toSafeErrorRecord(error));
        return NextResponse.json({ error: "Unable to create student profile." }, { status: 400 });
      }
    }

    if (!profile) {
      return NextResponse.json(
        { error: "Student profile not found. Create a profile before submitting diagnostics." },
        { status: 404 },
      );
    }

    const inferredStageId = normalizePlacementStageId(
      inferEducationStageId({
        age_years: profile.age_years,
        gradeLevel: profile.grade_level,
      }),
    );
    const stageId = submitBody.data.stageId ?? inferredStageId;
    const stagePool = buildStageQuestionPool(stageId);
    const questionLookup = new Map<string, PlacementQuestionRecord>();

    for (const moduleId of stagePool.moduleIds) {
      const questions = stagePool.perModule.get(moduleId) ?? [];
      for (const question of questions) {
        const key = `${question.moduleId}::${question.lessonId}::${question.questionId}`;
        questionLookup.set(key, question);
      }
    }

    const validResponses: Array<{
      moduleId: string;
      lessonId: string;
      questionId: string;
      skillId: string | null;
      selectedOptionId: string;
      correctOptionId: string;
      isCorrect: boolean;
    }> = [];
    const invalidResponses: Array<{ moduleId: string; lessonId: string; questionId: string; reason: string }> = [];

    for (const response of submitBody.data.responses) {
      const key = `${response.moduleId}::${response.lessonId}::${response.questionId}`;
      const sourceQuestion = questionLookup.get(key);
      if (!sourceQuestion) {
        invalidResponses.push({
          moduleId: response.moduleId,
          lessonId: response.lessonId,
          questionId: response.questionId,
          reason: "unknown_question",
        });
        continue;
      }

      const optionExists = sourceQuestion.options.some((option) => option.id === response.selectedOptionId);
      if (!optionExists) {
        invalidResponses.push({
          moduleId: response.moduleId,
          lessonId: response.lessonId,
          questionId: response.questionId,
          reason: "invalid_option",
        });
        continue;
      }

      validResponses.push({
        moduleId: response.moduleId,
        lessonId: response.lessonId,
        questionId: response.questionId,
        skillId: sourceQuestion.skillId,
        selectedOptionId: response.selectedOptionId,
        correctOptionId: sourceQuestion.correctOptionId,
        isCorrect: response.selectedOptionId === sourceQuestion.correctOptionId,
      });
    }

    if (validResponses.length < 5) {
      return NextResponse.json(
        { error: "Not enough valid responses to score placement.", invalidResponses },
        { status: 400 },
      );
    }

    const correctCount = validResponses.filter((row) => row.isCorrect).length;
    const score = validResponses.length > 0 ? correctCount / validResponses.length : 0;
    const uniqueSkillCount = new Set(
      validResponses
        .map((row) => row.skillId)
        .filter((skillId): skillId is string => typeof skillId === "string" && skillId.length > 0),
    ).size;
    const uniqueModuleCount = new Set(validResponses.map((row) => row.moduleId)).size;
    const confidence = calculatePlacementConfidence({
      validResponseCount: validResponses.length,
      uniqueSkillCount,
      uniqueModuleCount,
      invalidResponseCount: invalidResponses.length,
    });
    const recommendedStageId = recommendPlacementStage({
      startingStageId: stageId,
      score,
      confidence,
    });

    const skillAttemptDelta = new Map<string, { attempts: number; correct: number }>();
    for (const response of validResponses) {
      if (!response.skillId) continue;
      const current = skillAttemptDelta.get(response.skillId) ?? { attempts: 0, correct: 0 };
      current.attempts += 1;
      current.correct += Number(response.isCorrect);
      skillAttemptDelta.set(response.skillId, current);
    }

    const skillIds = [...skillAttemptDelta.keys()];
    if (skillIds.length > 0) {
      const { data: existingRows, error: existingError } = await supabase
        .from("user_skill_mastery")
        .select("skill_id,attempts,correct_attempts")
        .eq("user_id", user.id)
        .in("skill_id", skillIds);

      if (existingError) {
        console.error("[api/ai/placement-diagnostic] mastery query failed", toSafeErrorRecord(existingError));
        return NextResponse.json({ error: "Database error." }, { status: 500 });
      }

      const existingMap = new Map(
        ((existingRows ?? []) as SkillMasteryRow[]).map((row) => [row.skill_id, row] as const),
      );

      const masteryUpserts = skillIds.map((skillId) => {
        const delta = skillAttemptDelta.get(skillId)!;
        const existing = existingMap.get(skillId);
        const attempts = Math.max(0, Number(existing?.attempts ?? 0)) + delta.attempts;
        const correctAttempts = Math.max(0, Number(existing?.correct_attempts ?? 0)) + delta.correct;
        const masteryLevel = attempts > 0 ? Number((correctAttempts / attempts).toFixed(2)) : 0;
        return {
          user_id: user.id,
          skill_id: skillId,
          attempts,
          correct_attempts: correctAttempts,
          mastery_level: masteryLevel,
        };
      });

      const { error: masteryUpsertError } = await supabase
        .from("user_skill_mastery")
        .upsert(masteryUpserts, { onConflict: "user_id,skill_id" });

      if (masteryUpsertError) {
        console.error("[api/ai/placement-diagnostic] mastery upsert failed", toSafeErrorRecord(masteryUpsertError));
        return NextResponse.json({ error: "Database error." }, { status: 500 });
      }
    }

    const nowIso = new Date().toISOString();
    const existingSkillMap = toRecord(profile.ai_skill_level_map);
    const nextSkillMap = {
      ...existingSkillMap,
      ...(submitBody.data.interestPathIds && submitBody.data.interestPathIds.length > 0
        ? { recommended_path_ids: submitBody.data.interestPathIds }
        : null),
      placement_diagnostic: {
        stage_id: stageId,
        recommended_stage_id: recommendedStageId,
        score: toRoundedScore(score),
        confidence,
        valid_response_count: validResponses.length,
        invalid_response_count: invalidResponses.length,
        unique_skill_count: uniqueSkillCount,
        unique_module_count: uniqueModuleCount,
        completed_at: nowIso,
      },
      placement_stage_id: recommendedStageId,
      placement_confidence: confidence,
      placement_updated_at: nowIso,
    };

    const assessmentPayload = {
      version: "placement_diagnostic_v1",
      completed_at: nowIso,
      stage_id: stageId,
      recommended_stage_id: recommendedStageId,
      score: toRoundedScore(score),
      confidence,
      responses: validResponses,
      invalid_responses: invalidResponses,
    };

    const { error: profileUpdateError } = await supabase
      .from("student_profiles")
      .update({
        initial_assessment_status: "completed",
        initial_assessment_data: assessmentPayload,
        ai_skill_level_map: nextSkillMap,
      })
      .eq("id", profile.id)
      .eq("account_id", user.id);

    if (profileUpdateError) {
      console.error("[api/ai/placement-diagnostic] profile update failed", toSafeErrorRecord(profileUpdateError));
      return NextResponse.json({ error: "Database error." }, { status: 500 });
    }

    await recordPlacementEvent({
      supabase,
      row: {
        user_id: user.id,
        profile_id: profile.id,
        event_type: "diagnostic_submitted",
        stage_id: stageId,
        recommended_stage_id: recommendedStageId,
        confidence,
        score: toRoundedScore(score),
        metadata: {
          source: "diagnostic_submit",
          valid_response_count: validResponses.length,
          invalid_response_count: invalidResponses.length,
          unique_skill_count: uniqueSkillCount,
          unique_module_count: uniqueModuleCount,
          mastery_skills_updated: skillIds.length,
        },
      },
    });

    return NextResponse.json({
      success: true,
      mode: "submit",
      profileId: profile.id,
      stageId,
      recommendedStageId,
      score: toRoundedScore(score),
      confidence,
      correctCount,
      validResponseCount: validResponses.length,
      invalidResponseCount: invalidResponses.length,
      masterySkillsUpdated: skillIds.length,
      invalidResponses,
    });
  } catch (error) {
    console.error("[api/ai/placement-diagnostic] unexpected POST error", toSafeErrorRecord(error));
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}
