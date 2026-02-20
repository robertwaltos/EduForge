import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

async function assertAdmin() {
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

  return profile?.is_admin ? user.id : null;
}

function buildSimulatedOutputUrl(assetType: string, moduleId: string | null, lessonId: string | null) {
  const base =
    assetType === "video"
      ? "video-placeholder.svg"
      : assetType === "animation"
        ? "animation-placeholder.svg"
        : "lesson-robot.svg";
  const token = [moduleId, lessonId].filter(Boolean).join("-").replace(/[^a-zA-Z0-9_-]/g, "");
  return token ? `/placeholders/${base}?token=${token}` : `/placeholders/${base}`;
}

export async function POST(request: Request) {
  const adminUserId = await assertAdmin();
  if (!adminUserId) {
    return NextResponse.json({ error: "Admin access required." }, { status: 403 });
  }

  const body = (await request.json().catch(() => ({}))) as {
    batchSize?: number;
    moduleId?: string;
    lessonId?: string;
    assetType?: string;
  };
  const batchSize = Math.min(50, Math.max(1, Number(body.batchSize ?? 10)));
  const moduleId = typeof body.moduleId === "string" ? body.moduleId.trim() : "";
  const lessonId = typeof body.lessonId === "string" ? body.lessonId.trim() : "";
  const assetType = typeof body.assetType === "string" ? body.assetType.trim() : "";

  if (assetType && !["video", "animation", "image"].includes(assetType)) {
    return NextResponse.json({ error: "assetType must be video, animation, or image." }, { status: 400 });
  }

  const admin = createSupabaseAdminClient();
  let query = admin
    .from("media_generation_jobs")
    .select("id, asset_type, module_id, lesson_id")
    .eq("status", "queued");

  if (moduleId) {
    query = query.eq("module_id", moduleId);
  }
  if (lessonId) {
    query = query.eq("lesson_id", lessonId);
  }
  if (assetType) {
    query = query.eq("asset_type", assetType);
  }

  const { data: queuedJobs, error: fetchError } = await query.order("created_at", { ascending: true }).limit(batchSize);

  if (fetchError) {
    return NextResponse.json({ error: fetchError.message }, { status: 500 });
  }

  if (!queuedJobs || queuedJobs.length === 0) {
    return NextResponse.json({
      processed: 0,
      message: "No queued jobs.",
      filters: {
        moduleId: moduleId || null,
        lessonId: lessonId || null,
        assetType: assetType || null,
      },
    });
  }

  const results = [];
  for (const job of queuedJobs) {
    const runningUpdate = await admin
      .from("media_generation_jobs")
      .update({ status: "running", error: null })
      .eq("id", job.id);

    if (runningUpdate.error) {
      results.push({ id: job.id, status: "failed", error: runningUpdate.error.message });
      continue;
    }

    const outputUrl = buildSimulatedOutputUrl(job.asset_type, job.module_id, job.lesson_id);
    const finalUpdate = await admin
      .from("media_generation_jobs")
      .update({
        status: "completed",
        output_url: outputUrl,
        completed_at: new Date().toISOString(),
        metadata: {
          processed_by: adminUserId,
          runner: "simulated-provider",
        },
      })
      .eq("id", job.id);

    if (finalUpdate.error) {
      await admin
        .from("media_generation_jobs")
        .update({
          status: "failed",
          error: finalUpdate.error.message,
          completed_at: new Date().toISOString(),
        })
        .eq("id", job.id);
      results.push({ id: job.id, status: "failed", error: finalUpdate.error.message });
      continue;
    }

    results.push({ id: job.id, status: "completed", outputUrl });
  }

  return NextResponse.json({
    processed: results.length,
    completed: results.filter((item) => item.status === "completed").length,
    failed: results.filter((item) => item.status === "failed").length,
    filters: {
      moduleId: moduleId || null,
      lessonId: lessonId || null,
      assetType: assetType || null,
    },
    results,
  });
}
