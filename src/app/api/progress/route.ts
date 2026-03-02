import { NextResponse } from "next/server";
import { z } from "zod";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { calculateSRS } from "@/lib/srs";
import { toSafeErrorRecord } from "@/lib/logging/safe-error";
import { enforceIpRateLimit } from "@/lib/security/ip-rate-limit";

const progressUpdateSchema = z.object({
  lessonId: z.string(),
  // We'll derive a quality score from the percentage
  scorePercentage: z.number().min(0).max(1),
});

function isMissingAtomicFunctionError(message: string) {
  const lowered = message.toLowerCase();
  return (
    lowered.includes("upsert_user_learning_progress_atomic")
    || lowered.includes("could not find the function")
    || lowered.includes("function public.upsert_user_learning_progress_atomic")
  );
}

export async function POST(request: Request) {
  try {
    const rateLimit = await enforceIpRateLimit(request, "api:progress:post", {
      max: 60,
      windowMs: 60_000,
    });
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { error: "Too many requests" },
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

    const body = await request.json();
    const validation = progressUpdateSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: "Invalid request body", details: validation.error.issues },
        { status: 400 }
      );
    }

    const { lessonId, scorePercentage } = validation.data;

    // Convert percentage to a 0-5 quality score
    const quality = Math.floor(scorePercentage * 5);

    // Prefer atomic DB-side upsert + recalculation under concurrent writes.
    const { data: atomicRows, error: atomicError } = await supabase.rpc(
      "upsert_user_learning_progress_atomic",
      {
        p_user_id: user.id,
        p_lesson_id: lessonId,
        p_quality: quality,
      },
    );

    if (!atomicError) {
      const row = Array.isArray(atomicRows) ? atomicRows[0] : atomicRows;
      if (!row) {
        return NextResponse.json({ error: "Could not save progress" }, { status: 500 });
      }
      const atomicInterval = Number(
        (row as { interval?: number; review_interval?: number | string }).interval
          ?? (row as { interval?: number; review_interval?: number | string }).review_interval,
      );
      return NextResponse.json({
        success: true,
        repetitions: Number((row as { repetitions: number }).repetitions),
        easiness_factor: Number((row as { easiness_factor: number | string }).easiness_factor),
        interval: atomicInterval,
        next_review_at: (row as { next_review_at: string }).next_review_at,
        last_reviewed_at: (row as { last_reviewed_at: string }).last_reviewed_at,
      });
    }

    if (!isMissingAtomicFunctionError(atomicError.message)) {
      console.error("Error upserting user progress atomically:", toSafeErrorRecord(atomicError));
      return NextResponse.json({ error: "Could not save progress" }, { status: 500 });
    }

    // Backward-compatible fallback for environments where migration isn't applied yet.
    const { data: existingProgress, error: fetchError } = await supabase
      .from("user_learning_progress")
      .select("repetitions, easiness_factor, interval")
      .eq("user_id", user.id)
      .eq("lesson_id", lessonId)
      .maybeSingle();

    if (fetchError) {
      console.error("Error fetching user progress:", toSafeErrorRecord(fetchError));
      return NextResponse.json({ error: "Database error" }, { status: 500 });
    }

    const currentSRSData = existingProgress ?? {
      repetitions: 0,
      easiness_factor: 2.5,
      interval: 0,
    };
    const newSRSData = calculateSRS(quality, currentSRSData);

    const { error: upsertError } = await supabase
      .from("user_learning_progress")
      .upsert(
        {
          user_id: user.id,
          lesson_id: lessonId,
          repetitions: newSRSData.repetitions,
          easiness_factor: newSRSData.easiness_factor,
          interval: newSRSData.interval,
          next_review_at: newSRSData.next_review_at.toISOString(),
          last_reviewed_at: new Date().toISOString(),
        },
        { onConflict: "user_id,lesson_id" },
      );

    if (upsertError) {
      console.error("Error upserting user progress (fallback path):", toSafeErrorRecord(upsertError));
      return NextResponse.json({ error: "Could not save progress" }, { status: 500 });
    }

    return NextResponse.json({ success: true, ...newSRSData });
  } catch (err) {
    console.error("Unexpected error in progress route:", toSafeErrorRecord(err));
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
