import { NextResponse } from "next/server";
import { z } from "zod";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getAllLearningModules } from "@/lib/modules";
import { buildMasterySkillGraph } from "@/lib/mastery/skill-graph";
import { buildDailyReviewQueue } from "@/lib/mastery/review-queue";
import { enforceIpRateLimit } from "@/lib/security/ip-rate-limit";
import { toSafeErrorRecord } from "@/lib/logging/safe-error";

const QuerySchema = z.object({
  maxItems: z.coerce.number().int().min(1).max(100).default(24),
  includeBlocked: z.boolean().default(true),
});

type ProgressRow = {
  lesson_id: string;
  next_review_at: string | null;
  last_reviewed_at: string | null;
  repetitions: number | null;
  interval: number | null;
  easiness_factor: number | null;
};

type MasteryRow = {
  skill_id: string;
  mastery_level: number | null;
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
    maxItems: url.searchParams.get("maxItems") ?? undefined,
    includeBlocked: parseBooleanParam(url.searchParams.get("includeBlocked")),
  });
}

export async function GET(request: Request) {
  try {
    const rateLimit = await enforceIpRateLimit(request, "api:ai:review-queue:get", {
      max: 45,
      windowMs: 60_000,
    });
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { error: "Too many review-queue requests. Please retry shortly." },
        { status: 429, headers: { "Retry-After": String(rateLimit.retryAfterSeconds) } },
      );
    }

    const parsedQuery = parseQuery(request);
    if (!parsedQuery.success) {
      return NextResponse.json(
        { error: "Invalid review-queue query parameters.", details: parsedQuery.error.flatten() },
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

    const [progressResult, masteryResult] = await Promise.all([
      supabase
        .from("user_learning_progress")
        .select("lesson_id,next_review_at,last_reviewed_at,repetitions,interval,easiness_factor")
        .eq("user_id", user.id),
      supabase
        .from("user_skill_mastery")
        .select("skill_id,mastery_level")
        .eq("user_id", user.id),
    ]);

    if (progressResult.error) {
      console.error("[api/ai/review-queue] progress query failed", toSafeErrorRecord(progressResult.error));
      return NextResponse.json({ error: "Database error." }, { status: 500 });
    }
    if (masteryResult.error) {
      console.error("[api/ai/review-queue] mastery query failed", toSafeErrorRecord(masteryResult.error));
      return NextResponse.json({ error: "Database error." }, { status: 500 });
    }

    const learningModules = getAllLearningModules();
    const skillGraph = buildMasterySkillGraph(learningModules);
    const queueResult = buildDailyReviewQueue({
      learningModules,
      skillGraph,
      progressRows: (progressResult.data ?? []) as ProgressRow[],
      masteryRows: (masteryResult.data ?? []) as MasteryRow[],
      maxItems: parsedQuery.data.maxItems,
      includeBlocked: parsedQuery.data.includeBlocked,
    });

    return NextResponse.json({
      generatedAt: new Date().toISOString(),
      queue: queueResult.queue,
      summary: queueResult.summary,
      graphCoverage: skillGraph.coverage,
      moduleCount: learningModules.length,
      requestedMaxItems: parsedQuery.data.maxItems,
      includeBlocked: parsedQuery.data.includeBlocked,
    });
  } catch (error) {
    console.error("[api/ai/review-queue] unexpected error", toSafeErrorRecord(error));
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}
