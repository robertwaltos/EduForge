import { NextResponse } from "next/server";
import { z } from "zod";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getAllLearningModules } from "@/lib/modules";
import { buildAdaptiveRemediationQueue } from "@/lib/exam/remediation-queue";
import { toSafeErrorRecord } from "@/lib/logging/safe-error";
import { enforceIpRateLimit } from "@/lib/security/ip-rate-limit";

const QuerySchema = z.object({
  limit: z.coerce.number().int().min(1).max(100).default(15),
});

export async function GET(request: Request) {
  try {
    const rateLimit = await enforceIpRateLimit(request, "api:exam:remediation-queue:get", {
      max: 45,
      windowMs: 60_000,
    });

    if (!rateLimit.allowed) {
      return NextResponse.json(
        { error: "Too many remediation-queue requests. Please retry shortly." },
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

    const learningModules = getAllLearningModules();
    const url = new URL(request.url);
    const parsedQuery = QuerySchema.safeParse({
      limit: url.searchParams.get("limit") ?? undefined,
    });
    if (!parsedQuery.success) {
      return NextResponse.json({ error: "Invalid limit query parameter." }, { status: 400 });
    }
    const limit = parsedQuery.data.limit;

    const [progressResult, errorResult, masteryResult] = await Promise.all([
      supabase
        .from("user_learning_progress")
        .select("lesson_id,next_review_at")
        .eq("user_id", user.id),
      supabase
        .from("user_exam_error_logs")
        .select("lesson_id,skill_id,error_type,created_at")
        .eq("user_id", user.id)
        .eq("resolved", false)
        .order("created_at", { ascending: false })
        .limit(1000),
      supabase
        .from("user_skill_mastery")
        .select("skill_id,mastery_level")
        .eq("user_id", user.id),
    ]);

    if (progressResult.error) {
      console.error("Unexpected API error.", toSafeErrorRecord(progressResult.error));
      return NextResponse.json({ error: "Internal server error." }, { status: 500 });
    }
    if (errorResult.error) {
      console.error("Unexpected API error.", toSafeErrorRecord(errorResult.error));
      return NextResponse.json({ error: "Internal server error." }, { status: 500 });
    }
    if (masteryResult.error) {
      console.error("Unexpected API error.", toSafeErrorRecord(masteryResult.error));
      return NextResponse.json({ error: "Internal server error." }, { status: 500 });
    }

    const remediation = buildAdaptiveRemediationQueue({
      learningModules,
      progressRows: progressResult.data ?? [],
      unresolvedErrors: errorResult.data ?? [],
      masteryRows: masteryResult.data ?? [],
      maxItems: limit,
    });

    return NextResponse.json({
      success: true,
      generatedAt: new Date().toISOString(),
      summary: remediation.summary,
      queue: remediation.queue,
    });
  } catch (error) {
    console.error("Unexpected remediation queue error:", toSafeErrorRecord(error));
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
