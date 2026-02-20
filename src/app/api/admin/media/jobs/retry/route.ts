import { NextResponse } from "next/server";
import { requireAdminForApi } from "@/lib/admin/auth";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

const ALLOWED_ASSET_TYPES = ["video", "animation", "image"] as const;
const RETRYABLE_STATUSES = ["failed", "canceled"] as const;

type RetryableStatus = (typeof RETRYABLE_STATUSES)[number];

type MediaJobRow = {
  id: string;
  status: RetryableStatus;
  metadata: Record<string, unknown> | null;
};

function isRetryableStatus(status: string): status is RetryableStatus {
  return RETRYABLE_STATUSES.includes(status as RetryableStatus);
}

function parseJobIds(input: unknown) {
  if (!Array.isArray(input)) return [];
  return input
    .map((entry) => String(entry ?? "").trim())
    .filter((entry) => entry.length > 0)
    .slice(0, 200);
}

export async function POST(request: Request) {
  const auth = await requireAdminForApi();
  if (!auth.isAuthorized) {
    return auth.response;
  }

  const body = (await request.json().catch(() => ({}))) as {
    jobIds?: string[];
    moduleId?: string;
    lessonId?: string;
    assetType?: string;
    includeCanceled?: boolean;
    limit?: number;
  };

  const jobIds = parseJobIds(body.jobIds);
  const moduleId = typeof body.moduleId === "string" ? body.moduleId.trim() : "";
  const lessonId = typeof body.lessonId === "string" ? body.lessonId.trim() : "";
  const assetType = typeof body.assetType === "string" ? body.assetType.trim() : "";
  const includeCanceled = Boolean(body.includeCanceled);
  const limit = Math.min(200, Math.max(1, Number(body.limit ?? 50)));

  if (assetType && !ALLOWED_ASSET_TYPES.includes(assetType as (typeof ALLOWED_ASSET_TYPES)[number])) {
    return NextResponse.json({ error: "assetType must be video, animation, or image." }, { status: 400 });
  }

  const statuses = includeCanceled ? [...RETRYABLE_STATUSES] : (["failed"] as RetryableStatus[]);

  const admin = createSupabaseAdminClient();
  let query = admin
    .from("media_generation_jobs")
    .select("id, status, metadata")
    .in("status", statuses);

  if (jobIds.length > 0) {
    query = query.in("id", jobIds);
  } else {
    if (moduleId) {
      query = query.eq("module_id", moduleId);
    }
    if (lessonId) {
      query = query.eq("lesson_id", lessonId);
    }
    if (assetType) {
      query = query.eq("asset_type", assetType);
    }
    query = query.order("updated_at", { ascending: false }).limit(limit);
  }

  const { data, error } = await query;
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const matchingJobs = (data ?? []).filter((row): row is MediaJobRow => {
    return Boolean(row?.id) && isRetryableStatus(String(row.status ?? ""));
  });

  if (matchingJobs.length === 0) {
    return NextResponse.json({
      scanned: 0,
      retried: 0,
      filters: {
        moduleId: moduleId || null,
        lessonId: lessonId || null,
        assetType: assetType || null,
        includeCanceled,
        limit,
      },
      message: "No retryable jobs matched the provided filters.",
    });
  }

  const retriedIds: string[] = [];
  let failedUpdates = 0;

  for (const job of matchingJobs) {
    const previousRetryCount = Number((job.metadata ?? {}).retry_count ?? 0);
    const nextMetadata = {
      ...(job.metadata ?? {}),
      retry_count: Number.isFinite(previousRetryCount) ? previousRetryCount + 1 : 1,
      retried_at: new Date().toISOString(),
      retried_by: auth.userId,
      previous_status: job.status,
    };

    const { error: updateError } = await admin
      .from("media_generation_jobs")
      .update({
        status: "queued",
        error: null,
        output_url: null,
        completed_at: null,
        metadata: nextMetadata,
      })
      .eq("id", job.id);

    if (updateError) {
      failedUpdates += 1;
      continue;
    }

    retriedIds.push(job.id);
  }

  return NextResponse.json({
    scanned: matchingJobs.length,
    retried: retriedIds.length,
    failedUpdates,
    jobIds: retriedIds,
    filters: {
      moduleId: moduleId || null,
      lessonId: lessonId || null,
      assetType: assetType || null,
      includeCanceled,
      limit,
    },
  });
}
