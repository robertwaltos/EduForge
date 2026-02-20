import { NextResponse } from "next/server";
import { z } from "zod";
import { requireAdminForApi } from "@/lib/admin/auth";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { logAdminAction } from "@/lib/admin/audit";

const acknowledgeSchema = z.object({
  alertId: z.string().uuid(),
});

const settingsSchema = z.object({
  staleHours: z.number().min(1).max(168),
  backlogLimit: z.number().min(1).max(10000),
  failure24hLimit: z.number().min(1).max(10000),
});

const ALERT_SETTING_KEYS = {
  staleHours: "media_queue_sla_stale_hours",
  backlogLimit: "media_queue_sla_backlog_limit",
  failure24hLimit: "media_queue_sla_failure_24h_limit",
} as const;

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
  const { data, error } = await admin
    .from("admin_alerts")
    .select("id, severity, category, message, metadata, acknowledged, acknowledged_by, acknowledged_at, created_at")
    .order("created_at", { ascending: false })
    .limit(300);

  const { data: settingsData, error: settingsError } = await admin
    .from("app_settings")
    .select("key, value")
    .in("key", Object.values(ALERT_SETTING_KEYS));

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  if (settingsError) {
    return NextResponse.json({ error: settingsError.message }, { status: 500 });
  }

  const settingsMap = new Map((settingsData ?? []).map((entry) => [entry.key, entry.value]));
  const settings = {
    staleHours: readNumericSetting(settingsMap.get(ALERT_SETTING_KEYS.staleHours), 6),
    backlogLimit: readNumericSetting(settingsMap.get(ALERT_SETTING_KEYS.backlogLimit), 30),
    failure24hLimit: readNumericSetting(settingsMap.get(ALERT_SETTING_KEYS.failure24hLimit), 20),
  };

  return NextResponse.json({ alerts: data, settings });
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

  const parsed = settingsSchema.safeParse({
    staleHours: Number(body.staleHours),
    backlogLimit: Number(body.backlogLimit),
    failure24hLimit: Number(body.failure24hLimit),
  });

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid payload", details: parsed.error.flatten() }, { status: 400 });
  }

  const admin = createSupabaseAdminClient();
  const nowIso = new Date().toISOString();
  const rows = [
    {
      key: ALERT_SETTING_KEYS.staleHours,
      value: parsed.data.staleHours,
      updated_by: auth.userId,
      updated_at: nowIso,
    },
    {
      key: ALERT_SETTING_KEYS.backlogLimit,
      value: parsed.data.backlogLimit,
      updated_by: auth.userId,
      updated_at: nowIso,
    },
    {
      key: ALERT_SETTING_KEYS.failure24hLimit,
      value: parsed.data.failure24hLimit,
      updated_by: auth.userId,
      updated_at: nowIso,
    },
  ];

  const { error } = await admin.from("app_settings").upsert(rows, { onConflict: "key" });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  await logAdminAction({
    adminUserId: auth.userId,
    actionType: "admin_alert_settings_update",
    metadata: {
      staleHours: parsed.data.staleHours,
      backlogLimit: parsed.data.backlogLimit,
      failure24hLimit: parsed.data.failure24hLimit,
    },
  });

  return NextResponse.json({ success: true, settings: parsed.data });
}
