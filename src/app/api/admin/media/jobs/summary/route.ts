import { NextResponse } from "next/server";
import { requireAdminForApi } from "@/lib/admin/auth";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

function coerceNumber(value: unknown) {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string") {
    const parsed = Number(value);
    if (Number.isFinite(parsed)) return parsed;
  }
  return null;
}

function readNumericSetting(value: unknown, fallback: number) {
  const direct = coerceNumber(value);
  if (direct !== null) return direct;
  if (value && typeof value === "object" && "value" in value) {
    const nested = coerceNumber((value as { value?: unknown }).value);
    if (nested !== null) return nested;
  }
  return fallback;
}

export async function GET() {
  const auth = await requireAdminForApi();
  if (!auth.isAuthorized) {
    return auth.response;
  }

  const admin = createSupabaseAdminClient();
  const now = new Date();
  const nowIso = now.toISOString();
  const failure24hCutoff = new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString();

  const { data: settingsRows, error: settingsError } = await admin
    .from("app_settings")
    .select("key, value")
    .in("key", [
      "media_queue_sla_stale_hours",
      "media_queue_sla_backlog_limit",
      "media_queue_sla_failure_24h_limit",
    ]);

  if (settingsError) {
    return NextResponse.json({ error: settingsError.message }, { status: 500 });
  }

  const settingsMap = new Map((settingsRows ?? []).map((entry) => [entry.key, entry.value]));
  const staleHoursThreshold = Math.max(
    1,
    readNumericSetting(settingsMap.get("media_queue_sla_stale_hours"), 6),
  );
  const backlogThreshold = Math.max(
    1,
    readNumericSetting(settingsMap.get("media_queue_sla_backlog_limit"), 30),
  );
  const failure24hThreshold = Math.max(
    1,
    readNumericSetting(settingsMap.get("media_queue_sla_failure_24h_limit"), 20),
  );
  const staleCutoffIso = new Date(now.getTime() - staleHoursThreshold * 60 * 60 * 1000).toISOString();

  const [
    queuedResult,
    runningResult,
    staleQueuedResult,
    staleRunningResult,
    failed24hResult,
    oldestQueuedResult,
  ] = await Promise.all([
    admin
      .from("media_generation_jobs")
      .select("id", { count: "exact", head: true })
      .eq("status", "queued"),
    admin
      .from("media_generation_jobs")
      .select("id", { count: "exact", head: true })
      .eq("status", "running"),
    admin
      .from("media_generation_jobs")
      .select("id", { count: "exact", head: true })
      .eq("status", "queued")
      .lt("created_at", staleCutoffIso),
    admin
      .from("media_generation_jobs")
      .select("id", { count: "exact", head: true })
      .eq("status", "running")
      .lt("updated_at", staleCutoffIso),
    admin
      .from("media_generation_jobs")
      .select("id", { count: "exact", head: true })
      .eq("status", "failed")
      .gte("updated_at", failure24hCutoff),
    admin
      .from("media_generation_jobs")
      .select("created_at")
      .eq("status", "queued")
      .order("created_at", { ascending: true })
      .limit(1)
      .maybeSingle(),
  ]);

  const queryError =
    queuedResult.error ??
    runningResult.error ??
    staleQueuedResult.error ??
    staleRunningResult.error ??
    failed24hResult.error ??
    oldestQueuedResult.error;

  if (queryError) {
    return NextResponse.json({ error: queryError.message }, { status: 500 });
  }

  const queuedCount = queuedResult.count ?? 0;
  const runningCount = runningResult.count ?? 0;
  const backlogCount = queuedCount + runningCount;
  const staleQueuedCount = staleQueuedResult.count ?? 0;
  const staleRunningCount = staleRunningResult.count ?? 0;
  const staleCount = staleQueuedCount + staleRunningCount;
  const failed24hCount = failed24hResult.count ?? 0;
  const slaBreaches = [
    staleCount > 0,
    backlogCount >= backlogThreshold,
    failed24hCount >= failure24hThreshold,
  ].filter(Boolean).length;

  return NextResponse.json({
    generatedAt: nowIso,
    queuedCount,
    runningCount,
    backlogCount,
    staleCount,
    staleQueuedCount,
    staleRunningCount,
    failed24hCount,
    oldestQueuedAt: oldestQueuedResult.data?.created_at ?? null,
    staleCutoffAt: staleCutoffIso,
    staleHoursThreshold,
    backlogThreshold,
    failure24hThreshold,
    slaBreaches,
  });
}
