import { NextResponse } from "next/server";
import { z } from "zod";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { toSafeErrorRecord } from "@/lib/logging/safe-error";
import { enforceIpRateLimit } from "@/lib/security/ip-rate-limit";

const ParamsSchema = z.object({
  errorId: z.string().uuid(),
});

const updateErrorLogSchema = z
  .object({
    resolved: z.boolean().optional(),
    notes: z.string().max(4000).nullable().optional(),
    errorType: z
      .enum(["incorrect_answer", "timed_out", "strategy_gap", "careless_mistake", "concept_gap"])
      .optional(),
  })
  .refine(
    (value) =>
      typeof value.resolved === "boolean" ||
      typeof value.notes === "string" ||
      value.notes === null ||
      typeof value.errorType === "string",
    { message: "At least one field is required." },
  );

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ errorId: string }> },
) {
  try {
    const rateLimit = await enforceIpRateLimit(request, "api:exam:error-log:item:patch", {
      max: 45,
      windowMs: 60_000,
    });
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { error: "Too many error-log updates. Please retry shortly." },
        { status: 429, headers: { "Retry-After": String(rateLimit.retryAfterSeconds) } },
      );
    }

    const resolvedParams = await params;
    const parsedParams = ParamsSchema.safeParse({
      errorId: resolvedParams.errorId?.trim(),
    });
    if (!parsedParams.success) {
      return NextResponse.json({ error: "Invalid error id." }, { status: 400 });
    }
    const errorId = parsedParams.data.errorId;

    const supabase = await createSupabaseServerClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json().catch(() => ({}));
    const validation = updateErrorLogSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { error: "Invalid request body", details: validation.error.issues },
        { status: 400 },
      );
    }

    const updateData: {
      resolved?: boolean;
      resolved_at?: string | null;
      notes?: string | null;
      error_type?: string;
    } = {};

    if (typeof validation.data.resolved === "boolean") {
      updateData.resolved = validation.data.resolved;
      updateData.resolved_at = validation.data.resolved ? new Date().toISOString() : null;
    }
    if (validation.data.notes !== undefined) {
      updateData.notes = validation.data.notes;
    }
    if (validation.data.errorType) {
      updateData.error_type = validation.data.errorType;
    }

    const { data, error } = await supabase
      .from("user_exam_error_logs")
      .update(updateData)
      .eq("id", errorId)
      .eq("user_id", user.id)
      .select("id, resolved, resolved_at, notes, error_type, updated_at")
      .maybeSingle();

    if (error) {
      console.error("Unexpected API error.", toSafeErrorRecord(error));
      return NextResponse.json({ error: "Internal server error." }, { status: 500 });
    }
    if (!data) {
      return NextResponse.json({ error: "Error log item not found." }, { status: 404 });
    }

    return NextResponse.json({ success: true, row: data });
  } catch (error) {
    console.error("Unexpected exam error log PATCH error:", toSafeErrorRecord(error));
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

