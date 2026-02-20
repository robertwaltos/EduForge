import { NextResponse } from "next/server";
import { requireAdminForApi } from "@/lib/admin/auth";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

type RequeueRequestBody = {
  moduleId?: string;
  lessonId?: string;
  assetType?: string;
  limit?: number;
  maxAgeMinutes?: number;
};

function normalizeAssetType(value: unknown) {
  if (typeof value !== "string") return "";
  const normalized = value.trim().toLowerCase();
  if (!normalized || normalized === "all") return "";
  if (normalized === "video" || normalized === "animation" || normalized === "image") {
    return normalized;
  }
  return null;
}

function scopeKey(row: { module_id: string | null; lesson_id: string | null; asset_type: string | null }) {
  if (!row.module_id || !row.lesson_id || !row.asset_type) return null;
  return `${row.module_id}::${row.lesson_id}::${row.asset_type}`;
}

export async function POST(request: Request) {
  const auth = await requireAdminForApi();
  if (!auth.isAuthorized) {
    return auth.response;
  }

  const body = (await request.json().catch(() => ({}))) as RequeueRequestBody;
  const moduleId = typeof body.moduleId === "string" ? body.moduleId.trim() : "";
  const lessonId = typeof body.lessonId === "string" ? body.lessonId.trim() : "";
  const assetType = normalizeAssetType(body.assetType);
  const limit = Number.isFinite(Number(body.limit))
    ? Math.min(500, Math.max(1, Number(body.limit)))
    : 100;
  const maxAgeMinutes = Number.isFinite(Number(body.maxAgeMinutes))
    ? Math.min(10080, Math.max(5, Number(body.maxAgeMinutes)))
    : 90;

  if (assetType === null) {
    return NextResponse.json({ error: "assetType must be video, animation, image, or all." }, { status: 400 });
  }

  const staleCutoffIso = new Date(Date.now() - maxAgeMinutes * 60 * 1000).toISOString();
  const admin = createSupabaseAdminClient();

  let staleQuery = admin
    .from("media_generation_jobs")
    .select("id, module_id, lesson_id, asset_type, updated_at, metadata")
    .eq("status", "running")
    .lt("updated_at", staleCutoffIso);

  if (moduleId) staleQuery = staleQuery.eq("module_id", moduleId);
  if (lessonId) staleQuery = staleQuery.eq("lesson_id", lessonId);
  if (assetType) staleQuery = staleQuery.eq("asset_type", assetType);

  const { data: staleJobs, error: staleError } = await staleQuery
    .order("updated_at", { ascending: true })
    .limit(limit);

  if (staleError) {
    return NextResponse.json({ error: staleError.message }, { status: 500 });
  }

  if (!staleJobs || staleJobs.length === 0) {
    return NextResponse.json({
      scanned: 0,
      requeued: 0,
      skippedDueToOtherActive: 0,
      failedUpdates: 0,
      staleCutoff: staleCutoffIso,
      maxAgeMinutes,
      message: "No stale running jobs matched the provided filters.",
    });
  }

  let activeQuery = admin
    .from("media_generation_jobs")
    .select("id, module_id, lesson_id, asset_type")
    .in("status", ["queued", "running"]);

  if (moduleId) activeQuery = activeQuery.eq("module_id", moduleId);
  if (lessonId) activeQuery = activeQuery.eq("lesson_id", lessonId);
  if (assetType) activeQuery = activeQuery.eq("asset_type", assetType);

  const { data: activeRows, error: activeError } = await activeQuery;
  if (activeError) {
    return NextResponse.json({ error: activeError.message }, { status: 500 });
  }

  const activeByScope = new Map<string, number>();
  for (const row of activeRows ?? []) {
    const key = scopeKey(row);
    if (!key) continue;
    activeByScope.set(key, (activeByScope.get(key) ?? 0) + 1);
  }

  let requeued = 0;
  let skippedDueToOtherActive = 0;
  let failedUpdates = 0;

  for (const job of staleJobs) {
    const key = scopeKey(job);
    if (key && (activeByScope.get(key) ?? 0) > 1) {
      skippedDueToOtherActive += 1;
      continue;
    }

    const previousStaleRequeueCount = Number((job.metadata ?? {}).stale_requeue_count ?? 0);
    const nowIso = new Date().toISOString();
    const ageMinutes = Math.max(1, Math.round((Date.now() - new Date(job.updated_at).getTime()) / 60000));
    const nextMetadata = {
      ...(job.metadata ?? {}),
      stale_requeue_count: Number.isFinite(previousStaleRequeueCount)
        ? previousStaleRequeueCount + 1
        : 1,
      stale_requeued_at: nowIso,
      stale_requeued_by: "admin-media-api",
      stale_requeue_reason: `running job exceeded ${maxAgeMinutes} minutes without update`,
      stale_age_minutes: ageMinutes,
    };

    const { error: updateError } = await admin
      .from("media_generation_jobs")
      .update({
        status: "queued",
        error: `Automatically re-queued after ${ageMinutes} minutes in running state without updates.`,
        metadata: nextMetadata,
      })
      .eq("id", job.id)
      .eq("status", "running");

    if (updateError) {
      failedUpdates += 1;
      continue;
    }

    requeued += 1;
  }

  return NextResponse.json({
    scanned: staleJobs.length,
    requeued,
    skippedDueToOtherActive,
    failedUpdates,
    staleCutoff: staleCutoffIso,
    maxAgeMinutes,
  });
}
