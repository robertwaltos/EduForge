import { NextResponse } from "next/server";
import { z } from "zod";
import { requireAdminForApi } from "@/lib/admin/auth";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { logAdminAction } from "@/lib/admin/audit";

const acknowledgeSchema = z.object({
  alertId: z.string().uuid(),
});

const queueSlaSettingsSchema = z.object({
  staleHours: z.number().min(1).max(168),
  backlogLimit: z.number().min(1).max(10000),
  failure24hLimit: z.number().min(1).max(10000),
  dedupeWindowHours: z.number().min(1).max(168),
  autoResolveHours: z.number().min(1).max(720),
});

const MEDIA_ALERT_SETTING_KEYS = {
  staleHours: "media_queue_sla_stale_hours",
  backlogLimit: "media_queue_sla_backlog_limit",
  failure24hLimit: "media_queue_sla_failure_24h_limit",
  dedupeWindowHours: "media_queue_alert_dedupe_hours",
  autoResolveHours: "media_queue_alert_auto_resolve_hours",
} as const;

const REPORT_ALERT_SETTING_KEYS = {
  staleHours: "report_queue_sla_stale_hours",
  backlogLimit: "report_queue_sla_backlog_limit",
  failure24hLimit: "report_queue_sla_failure_24h_limit",
  dedupeWindowHours: "report_queue_alert_dedupe_hours",
  autoResolveHours: "report_queue_alert_auto_resolve_hours",
} as const;

const MEDIA_DEFAULT_SETTINGS = {
  staleHours: 6,
  backlogLimit: 30,
  failure24hLimit: 20,
  dedupeWindowHours: 24,
  autoResolveHours: 12,
} as const;

const REPORT_DEFAULT_SETTINGS = {
  staleHours: 6,
  backlogLimit: 15,
  failure24hLimit: 10,
  dedupeWindowHours: 24,
  autoResolveHours: 12,
} as const;

type QueueSlaSettings = z.infer<typeof queueSlaSettingsSchema>;

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

function normalizeQueueSlaInput(input: unknown) {
  const record = input && typeof input === "object" ? (input as Record<string, unknown>) : {};
  return {
    staleHours: Number(record.staleHours),
    backlogLimit: Number(record.backlogLimit),
    failure24hLimit: Number(record.failure24hLimit),
    dedupeWindowHours: Number(record.dedupeWindowHours),
    autoResolveHours: Number(record.autoResolveHours),
  };
}

function readQueueSlaSettingsFromMap(
  settingsMap: Map<string, unknown>,
  keys: Record<keyof QueueSlaSettings, string>,
  defaults: QueueSlaSettings,
): QueueSlaSettings {
  return {
    staleHours: readNumericSetting(settingsMap.get(keys.staleHours), defaults.staleHours),
    backlogLimit: readNumericSetting(settingsMap.get(keys.backlogLimit), defaults.backlogLimit),
    failure24hLimit: readNumericSetting(settingsMap.get(keys.failure24hLimit), defaults.failure24hLimit),
    dedupeWindowHours: readNumericSetting(settingsMap.get(keys.dedupeWindowHours), defaults.dedupeWindowHours),
    autoResolveHours: readNumericSetting(settingsMap.get(keys.autoResolveHours), defaults.autoResolveHours),
  };
}

function buildQueueSlaRows(
  settings: QueueSlaSettings,
  keys: Record<keyof QueueSlaSettings, string>,
  userId: string,
  updatedAtIso: string,
) {
  return [
    {
      key: keys.staleHours,
      value: settings.staleHours,
      updated_by: userId,
      updated_at: updatedAtIso,
    },
    {
      key: keys.backlogLimit,
      value: settings.backlogLimit,
      updated_by: userId,
      updated_at: updatedAtIso,
    },
    {
      key: keys.failure24hLimit,
      value: settings.failure24hLimit,
      updated_by: userId,
      updated_at: updatedAtIso,
    },
    {
      key: keys.dedupeWindowHours,
      value: settings.dedupeWindowHours,
      updated_by: userId,
      updated_at: updatedAtIso,
    },
    {
      key: keys.autoResolveHours,
      value: settings.autoResolveHours,
      updated_by: userId,
      updated_at: updatedAtIso,
    },
  ];
}

export async function GET() {
  const auth = await requireAdminForApi();
  if (!auth.isAuthorized) {
    return auth.response;
  }

  const admin = createSupabaseAdminClient();
  const { data, error } = await admin
    .from("admin_alerts")
    .select("id, severity, category, message, metadata, acknowledged, acknowledged_by, acknowledged_at, created_at")
    .order("created_at", { ascending: false })
    .limit(300);

  const { data: settingsData, error: settingsError } = await admin
    .from("app_settings")
    .select("key, value")
    .in("key", [...Object.values(MEDIA_ALERT_SETTING_KEYS), ...Object.values(REPORT_ALERT_SETTING_KEYS)]);

  const [queuedSummary, failedSummary, sentSummary] = await Promise.all([
    admin
      .from("admin_alert_notifications")
      .select("id", { count: "exact", head: true })
      .eq("status", "queued"),
    admin
      .from("admin_alert_notifications")
      .select("id", { count: "exact", head: true })
      .eq("status", "failed"),
    admin
      .from("admin_alert_notifications")
      .select("id", { count: "exact", head: true })
      .eq("status", "sent"),
  ]);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  if (settingsError) {
    return NextResponse.json({ error: settingsError.message }, { status: 500 });
  }
  if (queuedSummary.error || failedSummary.error || sentSummary.error) {
    return NextResponse.json(
      {
        error:
          queuedSummary.error?.message ??
          failedSummary.error?.message ??
          sentSummary.error?.message ??
          "Unable to load notification summary.",
      },
      { status: 500 },
    );
  }

  const settingsMap = new Map((settingsData ?? []).map((entry) => [entry.key, entry.value]));
  const settings = readQueueSlaSettingsFromMap(settingsMap, MEDIA_ALERT_SETTING_KEYS, MEDIA_DEFAULT_SETTINGS);
  const reportSettings = readQueueSlaSettingsFromMap(settingsMap, REPORT_ALERT_SETTING_KEYS, REPORT_DEFAULT_SETTINGS);

  return NextResponse.json({
    alerts: data,
    settings,
    reportSettings,
    notificationSummary: {
      queuedCount: queuedSummary.count ?? 0,
      failedCount: failedSummary.count ?? 0,
      sentCount: sentSummary.count ?? 0,
    },
  });
}

export async function POST(request: Request) {
  const auth = await requireAdminForApi();
  if (!auth.isAuthorized) {
    return auth.response;
  }

  const body = await request.json().catch(() => null);
  const parsed = acknowledgeSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid payload", details: parsed.error.flatten() }, { status: 400 });
  }

  const admin = createSupabaseAdminClient();
  const { error } = await admin
    .from("admin_alerts")
    .update({
      acknowledged: true,
      acknowledged_by: auth.userId,
      acknowledged_at: new Date().toISOString(),
    })
    .eq("id", parsed.data.alertId);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  await logAdminAction({
    adminUserId: auth.userId,
    actionType: "admin_alert_acknowledge",
    metadata: { alertId: parsed.data.alertId },
  });

  return NextResponse.json({ success: true });
}

export async function PATCH(request: Request) {
  const auth = await requireAdminForApi();
  if (!auth.isAuthorized) {
    return auth.response;
  }

  const body = (await request.json().catch(() => null)) as Record<string, unknown> | null;
  if (!body) {
    return NextResponse.json({ error: "Invalid payload." }, { status: 400 });
  }

  const mediaInput = body.media ?? body;
  const parsedMediaSettings = queueSlaSettingsSchema.safeParse(normalizeQueueSlaInput(mediaInput));
  if (!parsedMediaSettings.success) {
    return NextResponse.json(
      { error: "Invalid media settings payload", details: parsedMediaSettings.error.flatten() },
      { status: 400 },
    );
  }

  let parsedReportSettings: QueueSlaSettings | null = null;
  if (body.report !== undefined) {
    const reportParse = queueSlaSettingsSchema.safeParse(normalizeQueueSlaInput(body.report));
    if (!reportParse.success) {
      return NextResponse.json(
        { error: "Invalid report settings payload", details: reportParse.error.flatten() },
        { status: 400 },
      );
    }
    parsedReportSettings = reportParse.data;
  }

  const admin = createSupabaseAdminClient();
  const nowIso = new Date().toISOString();
  const rows = [
    ...buildQueueSlaRows(parsedMediaSettings.data, MEDIA_ALERT_SETTING_KEYS, auth.userId, nowIso),
    ...(parsedReportSettings
      ? buildQueueSlaRows(parsedReportSettings, REPORT_ALERT_SETTING_KEYS, auth.userId, nowIso)
      : []),
  ];

  const { error } = await admin.from("app_settings").upsert(rows, { onConflict: "key" });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  await logAdminAction({
    adminUserId: auth.userId,
    actionType: "admin_alert_settings_update",
    metadata: {
      media: parsedMediaSettings.data,
      report: parsedReportSettings,
    },
  });

  return NextResponse.json({
    success: true,
    settings: parsedMediaSettings.data,
    reportSettings: parsedReportSettings,
  });
}
