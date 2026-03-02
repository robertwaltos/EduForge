import { NextResponse } from "next/server";
import { z } from "zod";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { learningEventTypes } from "@/lib/analytics/learning-events";
import { generateAndStoreFollowupMaterial } from "@/lib/ai/follow-up";
import { generateAndStoreRemediationWorksheet } from "@/lib/ai/remediation-worksheet";
import { toSafeErrorRecord } from "@/lib/logging/safe-error";
import { enforceIpRateLimit } from "@/lib/security/ip-rate-limit";

const eventTypeSchema = z.enum(learningEventTypes);
const payloadValueSchema = z.union([
  z.string(),
  z.number(),
  z.boolean(),
  z.null(),
  z.array(z.union([z.string(), z.number(), z.boolean(), z.null()])),
]);

const learningEventSchema = z.object({
  eventType: eventTypeSchema,
  lessonId: z.string().min(1),
  moduleId: z.string().min(1).optional(),
  eventAt: z.string().datetime().optional(),
  payload: z.record(z.string(), payloadValueSchema).optional(),
});

const telemetryRequestSchema = z.object({
  events: z.array(learningEventSchema).min(1).max(25),
});

export async function POST(request: Request) {
  try {
    const rateLimit = await enforceIpRateLimit(request, "api:telemetry:events:post", {
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

    const body = await request.json().catch(() => ({}));
    const validation = telemetryRequestSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { error: "Invalid request body", details: validation.error.issues },
        { status: 400 },
      );
    }

    const rows = validation.data.events.map((event) => ({
      user_id: user.id,
      module_id: event.moduleId ?? null,
      lesson_id: event.lessonId,
      event_type: event.eventType,
      event_at: event.eventAt ?? new Date().toISOString(),
      payload: event.payload ?? {},
      user_agent: request.headers.get("user-agent") ?? null,
    }));

    const { error: insertError } = await supabase.from("learning_events").insert(rows);
    if (insertError) {
      console.error("Unexpected API error.", toSafeErrorRecord(insertError));
      return NextResponse.json({ error: "Internal server error." }, { status: 500 });
    }

    const completedEvents = validation.data.events.filter((event) => event.eventType === "lesson_completed");
    if (completedEvents.length > 0) {
      const uniqueCompletedEvents = Array.from(
        new Map(
          completedEvents.map((event) => [
            `${event.lessonId}::${event.moduleId ?? ""}`,
            event,
          ]),
        ).values(),
      );

      await Promise.allSettled(
        uniqueCompletedEvents.map((event) =>
          generateAndStoreFollowupMaterial({
            supabase,
            userId: user.id,
            lessonId: event.lessonId,
            moduleId: event.moduleId ?? null,
            completionPayload: event.payload,
            force: false,
            allowOpenAi: true,
          }),
        ),
      );

      await Promise.allSettled(
        uniqueCompletedEvents.map((event) =>
          generateAndStoreRemediationWorksheet({
            supabase,
            userId: user.id,
            lessonId: event.lessonId,
            moduleId: event.moduleId ?? null,
            force: false,
            allowOpenAi: true,
          }),
        ),
      );
    }

    return NextResponse.json({ success: true, inserted: rows.length });
  } catch (error) {
    console.error("Unexpected telemetry ingestion error:", toSafeErrorRecord(error));
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
