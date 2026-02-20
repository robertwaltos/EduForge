import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

async function getAdminUserId() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();
  if (authError || !user) return null;

  const { data: profile } = await supabase
    .from("user_profiles")
    .select("is_admin")
    .eq("user_id", user.id)
    .maybeSingle();

  if (!profile?.is_admin) return null;
  return user.id;
}

export async function GET(request: Request) {
  const adminUserId = await getAdminUserId();
  if (!adminUserId) {
    return NextResponse.json({ error: "Admin access required." }, { status: 403 });
  }

  const { searchParams } = new URL(request.url);
  const moduleId = searchParams.get("moduleId")?.trim() ?? "";
  const lessonId = searchParams.get("lessonId")?.trim() ?? "";
  const assetType = searchParams.get("assetType")?.trim() ?? "";
  const status = searchParams.get("status")?.trim() ?? "";
  const rawLimit = Number(searchParams.get("limit") ?? "100");
  const limit = Number.isFinite(rawLimit) ? Math.min(200, Math.max(1, rawLimit)) : 100;

  if (assetType && !["video", "animation", "image"].includes(assetType)) {
    return NextResponse.json({ error: "assetType must be video, animation, or image." }, { status: 400 });
  }
  if (status && !["queued", "running", "completed", "failed", "canceled"].includes(status)) {
    return NextResponse.json({ error: "status must be queued, running, completed, failed, or canceled." }, { status: 400 });
  }

  const admin = createSupabaseAdminClient();
  let query = admin
    .from("media_generation_jobs")
    .select(
      "id, module_id, lesson_id, asset_type, provider, prompt, status, output_url, error, created_at, updated_at, completed_at",
    );

  if (moduleId) {
    query = query.eq("module_id", moduleId);
  }
  if (lessonId) {
    query = query.eq("lesson_id", lessonId);
  }
  if (assetType) {
    query = query.eq("asset_type", assetType);
  }
  if (status) {
    query = query.eq("status", status);
  }

  const { data, error } = await query.order("created_at", { ascending: false }).limit(limit);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ jobs: data ?? [] });
}

export async function POST(request: Request) {
  const adminUserId = await getAdminUserId();
  if (!adminUserId) {
    return NextResponse.json({ error: "Admin access required." }, { status: 403 });
  }

  const body = (await request.json().catch(() => ({}))) as {
    moduleId?: string;
    lessonId?: string;
    assetType?: string;
    provider?: string;
    prompt?: string;
    metadata?: Record<string, unknown>;
  };

  const assetType = String(body.assetType ?? "").trim();
  const prompt = String(body.prompt ?? "").trim();
  const moduleId = body.moduleId ? String(body.moduleId).trim() : "";
  const lessonId = body.lessonId ? String(body.lessonId).trim() : "";
  const provider = body.provider ? String(body.provider).trim() : "seedance";

  if (!["video", "animation", "image"].includes(assetType)) {
    return NextResponse.json({ error: "assetType must be video, animation, or image." }, { status: 400 });
  }
  if (prompt.length < 20) {
    return NextResponse.json({ error: "Prompt must be at least 20 characters." }, { status: 400 });
  }

  const admin = createSupabaseAdminClient();
  if (moduleId && lessonId) {
    const { data: existingJob, error: existingJobError } = await admin
      .from("media_generation_jobs")
      .select("id, status")
      .eq("module_id", moduleId)
      .eq("lesson_id", lessonId)
      .eq("asset_type", assetType)
      .in("status", ["queued", "running", "completed"])
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (existingJobError) {
      return NextResponse.json({ error: existingJobError.message }, { status: 500 });
    }

    if (existingJob) {
      return NextResponse.json({ duplicate: true, job: existingJob });
    }
  }

  const { data, error } = await admin
    .from("media_generation_jobs")
    .insert({
      created_by: adminUserId,
      module_id: moduleId || null,
      lesson_id: lessonId || null,
      asset_type: assetType,
      provider,
      prompt,
      status: "queued",
      metadata: body.metadata ?? {},
    })
    .select("id, status")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ job: data });
}
