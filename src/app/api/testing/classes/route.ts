import { NextResponse } from "next/server";
import { z } from "zod";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { isMissingTestingTableError } from "@/lib/testing/api-utils";
import { toSafeErrorRecord } from "@/lib/logging/safe-error";
import { enforceIpRateLimit } from "@/lib/security/ip-rate-limit";
import { resolveVerifiedTeacherRole } from "@/lib/compliance/teacher-access";

const createClassSchema = z.object({
  name: z.string().min(2).max(120),
  maxSize: z.coerce.number().int().min(1).max(35).optional(),
});

function rateLimitExceededResponse(retryAfterSeconds: number) {
  return NextResponse.json(
    { error: "Too many class requests. Please retry shortly." },
    {
      status: 429,
      headers: {
        "Retry-After": String(retryAfterSeconds),
      },
    },
  );
}

export async function GET(request: Request) {
  const rateLimit = await enforceIpRateLimit(request, "api:testing:classes:get", {
    max: 60,
    windowMs: 60_000,
  });
  if (!rateLimit.allowed) {
    return rateLimitExceededResponse(rateLimit.retryAfterSeconds);
  }

  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const teacherRole = await resolveVerifiedTeacherRole({
    supabase,
    userId: user.id,
    purpose: "testing_classes_get",
  });
  if (!teacherRole.ok) {
    return NextResponse.json({ error: teacherRole.error }, { status: teacherRole.status });
  }

  const admin = createSupabaseAdminClient();
  const { data: classes, error: classesError } = await admin
    .from("classroom_entities")
    .select("id, name, max_size, created_at, updated_at")
    .eq("teacher_user_id", user.id)
    .order("created_at", { ascending: false });

  if (classesError) {
    if (isMissingTestingTableError(classesError)) {
      return NextResponse.json(
        { error: "Testing/classroom tables are not ready. Run Supabase migrations first." },
        { status: 503 },
      );
    }
    console.error("Unexpected API error.", toSafeErrorRecord(classesError));
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }

  const classIds = (classes ?? []).map((entry) => entry.id);
  if (classIds.length === 0) {
    return NextResponse.json({ classes: [] });
  }

  const { data: enrollments, error: enrollmentError } = await admin
    .from("class_enrollments")
    .select("class_id, parent_consent")
    .in("class_id", classIds);

  if (enrollmentError) {
    console.error("Unexpected API error.", toSafeErrorRecord(enrollmentError));
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }

  const countMap = new Map<string, { enrolled: number; consented: number }>();
  for (const enrollment of enrollments ?? []) {
    const value = countMap.get(enrollment.class_id) ?? { enrolled: 0, consented: 0 };
    value.enrolled += 1;
    if (enrollment.parent_consent) value.consented += 1;
    countMap.set(enrollment.class_id, value);
  }

  const payload = (classes ?? []).map((entry) => {
    const counts = countMap.get(entry.id) ?? { enrolled: 0, consented: 0 };
    return {
      id: entry.id,
      name: entry.name,
      maxSize: entry.max_size,
      enrolledCount: counts.enrolled,
      consentedCount: counts.consented,
      createdAt: entry.created_at,
      updatedAt: entry.updated_at,
    };
  });

  return NextResponse.json({ classes: payload });
}

export async function POST(request: Request) {
  const rateLimit = await enforceIpRateLimit(request, "api:testing:classes:post", {
    max: 30,
    windowMs: 5 * 60 * 1000,
  });
  if (!rateLimit.allowed) {
    return rateLimitExceededResponse(rateLimit.retryAfterSeconds);
  }

  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const teacherRole = await resolveVerifiedTeacherRole({
    supabase,
    userId: user.id,
    purpose: "testing_classes_post",
  });
  if (!teacherRole.ok) {
    return NextResponse.json({ error: teacherRole.error }, { status: teacherRole.status });
  }

  const body = await request.json().catch(() => ({}));
  const parsed = createClassSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid payload", details: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const admin = createSupabaseAdminClient();
  const { data, error } = await admin
    .from("classroom_entities")
    .insert({
      teacher_user_id: user.id,
      name: parsed.data.name.trim(),
      max_size: parsed.data.maxSize ?? 35,
    })
    .select("id, name, max_size, created_at, updated_at")
    .single();

  if (error) {
    if (isMissingTestingTableError(error)) {
      return NextResponse.json(
        { error: "Testing/classroom tables are not ready. Run Supabase migrations first." },
        { status: 503 },
      );
    }
    console.error("Unexpected API error.", toSafeErrorRecord(error));
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }

  return NextResponse.json({
    class: {
      id: data.id,
      name: data.name,
      maxSize: data.max_size,
      enrolledCount: 0,
      consentedCount: 0,
      createdAt: data.created_at,
      updatedAt: data.updated_at,
    },
  });
}

