import { NextResponse } from "next/server";
import { z } from "zod";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { toSafeErrorRecord } from "@/lib/logging/safe-error";
import { enforceIpRateLimit } from "@/lib/security/ip-rate-limit";

const metadataValueSchema = z.union([
  z.string(),
  z.number(),
  z.boolean(),
  z.null(),
  z.array(z.union([z.string(), z.number(), z.boolean(), z.null()])),
]);

const createErrorLogSchema = z.object({
  moduleId: z.string().min(1).optional(),
  lessonId: z.string().min(1),
  questionId: z.string().min(1),
  skillId: z.string().min(1).optional(),
  errorType: z
    .enum(["incorrect_answer", "timed_out", "strategy_gap", "careless_mistake", "concept_gap"])
    .optional(),
  selectedOptionId: z.string().min(1).optional(),
  correctOptionId: z.string().min(1).optional(),
  questionText: z.string().min(1).optional(),
  notes: z.string().max(4000).optional(),
  metadata: z.record(z.string(), metadataValueSchema).optional(),
});

const QuerySchema = z.object({
  moduleId: z.string().min(1).optional(),
  lessonId: z.string().min(1).optional(),
  unresolved: z.boolean().default(false),
  limit: z.coerce.number().int().min(1).max(200).default(100),
});

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
    moduleId: url.searchParams.get("moduleId")?.trim() || undefined,
    lessonId: url.searchParams.get("lessonId")?.trim() || undefined,
    unresolved: parseBooleanParam(url.searchParams.get("unresolved")),
    limit: url.searchParams.get("limit") ?? undefined,
  });
}

export async function GET(request: Request) {
  try {
    const rateLimit = await enforceIpRateLimit(request, "api:exam:error-log:get", {
      max: 60,
      windowMs: 60_000,
    });
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { error: "Too many error-log requests. Please retry shortly." },
        { status: 429, headers: { "Retry-After": String(rateLimit.retryAfterSeconds) } },
      );
    }

    const parsedQuery = parseQuery(request);
    if (!parsedQuery.success) {
      return NextResponse.json(
        { error: "Invalid error-log query parameters.", details: parsedQuery.error.flatten() },
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

    const moduleId = parsedQuery.data.moduleId ?? null;
    const lessonId = parsedQuery.data.lessonId ?? null;
    const unresolvedOnly = parsedQuery.data.unresolved;
    const limit = parsedQuery.data.limit;

    let query = supabase
      .from("user_exam_error_logs")
      .select(
        "id,user_id,module_id,lesson_id,question_id,skill_id,error_type,selected_option_id,correct_option_id,question_text,notes,resolved,resolved_at,metadata,created_at,updated_at",
      )
      .eq("user_id", user.id)
      .order("resolved", { ascending: true })
      .order("created_at", { ascending: false })
      .limit(limit);

    if (moduleId) {
      query = query.eq("module_id", moduleId);
    }
    if (lessonId) {
      query = query.eq("lesson_id", lessonId);
    }
    if (unresolvedOnly) {
      query = query.eq("resolved", false);
    }

    const [{ data: rows, error: rowsError }, { count: unresolvedCount, error: countError }] = await Promise.all([
      query,
      supabase
        .from("user_exam_error_logs")
        .select("id", { head: true, count: "exact" })
        .eq("user_id", user.id)
        .eq("resolved", false),
    ]);

    if (rowsError) {
      console.error("Unexpected API error.", toSafeErrorRecord(rowsError));
      return NextResponse.json({ error: "Internal server error." }, { status: 500 });
    }
    if (countError) {
      console.error("Unexpected API error.", toSafeErrorRecord(countError));
      return NextResponse.json({ error: "Internal server error." }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      unresolvedCount: unresolvedCount ?? 0,
      total: rows?.length ?? 0,
      rows: rows ?? [],
    });
  } catch (error) {
    console.error("Unexpected exam error log GET error:", toSafeErrorRecord(error));
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const rateLimit = await enforceIpRateLimit(request, "api:exam:error-log:post", {
      max: 60,
      windowMs: 60_000,
    });
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { error: "Too many error-log writes. Please retry shortly." },
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
    const validation = createErrorLogSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { error: "Invalid request body", details: validation.error.issues },
        { status: 400 },
      );
    }

    const payload = validation.data;
    const insertRow = {
      user_id: user.id,
      module_id: payload.moduleId ?? null,
      lesson_id: payload.lessonId,
      question_id: payload.questionId,
      skill_id: payload.skillId ?? null,
      error_type: payload.errorType ?? "incorrect_answer",
      selected_option_id: payload.selectedOptionId ?? null,
      correct_option_id: payload.correctOptionId ?? null,
      question_text: payload.questionText ?? null,
      notes: payload.notes ?? null,
      metadata: payload.metadata ?? {},
    };

    const { data, error } = await supabase
      .from("user_exam_error_logs")
      .insert(insertRow)
      .select("id, created_at")
      .single();

    if (error) {
      console.error("Unexpected API error.", toSafeErrorRecord(error));
      return NextResponse.json({ error: "Internal server error." }, { status: 500 });
    }

    return NextResponse.json({ success: true, row: data });
  } catch (error) {
    console.error("Unexpected exam error log POST error:", toSafeErrorRecord(error));
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

