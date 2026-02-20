import { NextResponse } from "next/server";
import { z } from "zod";
import { requireAdminForApi } from "@/lib/admin/auth";
import { logAdminAction } from "@/lib/admin/audit";
import { serverEnv } from "@/lib/config/env";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

const runNotificationsSchema = z.object({
  limit: z.number().min(1).max(1000).optional(),
  retryFailed: z.boolean().optional(),
});

function buildEmailHtml({
  severity,
  category,
  message,
  metadata,
}: {
  severity: string;
  category: string;
  message: string;
  metadata: unknown;
}) {
  return [
    `<p><strong>Severity:</strong> ${severity.toUpperCase()}</p>`,
    `<p><strong>Category:</strong> ${category}</p>`,
    `<p>${message}</p>`,
    `<pre>${JSON.stringify(metadata ?? {}, null, 2)}</pre>`,
  ].join("");
}

export async function POST(request: Request) {
  const auth = await requireAdminForApi();
  if (!auth.isAuthorized) {
    return auth.response;
  }

  const rawBody = (await request.json().catch(() => ({}))) as Record<string, unknown>;
  const parsedBody = runNotificationsSchema.safeParse({
    limit: rawBody.limit === undefined ? undefined : Number(rawBody.limit),
    retryFailed: rawBody.retryFailed === undefined ? undefined : Boolean(rawBody.retryFailed),
  });

  if (!parsedBody.success) {
    return NextResponse.json({ error: "Invalid payload", details: parsedBody.error.flatten() }, { status: 400 });
  }

  const limit = parsedBody.data.limit ?? 200;
  const retryFailed = parsedBody.data.retryFailed ?? true;
  const fromEmail = serverEnv.ADMIN_ALERT_FROM_EMAIL ?? serverEnv.PARENT_CONSENT_FROM_EMAIL;
  const resendApiKey = serverEnv.RESEND_API_KEY;

  const admin = createSupabaseAdminClient();
  const statuses = retryFailed ? ["queued", "failed"] : ["queued"];

  const { data: notifications, error: notificationsError } = await admin
    .from("admin_alert_notifications")
    .select("id, alert_id, recipient, channel, status, created_at")
    .in("status", statuses)
    .order("created_at", { ascending: true })
    .limit(limit);

  if (notificationsError) {
    return NextResponse.json({ error: notificationsError.message }, { status: 500 });
  }

  const rows = notifications ?? [];
  if (rows.length === 0) {
    return NextResponse.json({
      success: true,
      scanned: 0,
      sent: 0,
      failed: 0,
      skipped: 0,
      missingAlerts: 0,
      reason: "No queued notifications.",
    });
  }

  if (!fromEmail || !resendApiKey) {
    return NextResponse.json({
      success: true,
      scanned: rows.length,
      sent: 0,
      failed: 0,
      skipped: 0,
      missingAlerts: 0,
      reason: "RESEND_API_KEY or alert from-email is not configured.",
    });
  }

  const uniqueAlertIds = [...new Set(rows.map((row) => row.alert_id))];
  const { data: alerts, error: alertsError } = await admin
    .from("admin_alerts")
    .select("id, severity, category, message, metadata")
    .in("id", uniqueAlertIds);

  if (alertsError) {
    return NextResponse.json({ error: alertsError.message }, { status: 500 });
  }

  const alertMap = new Map((alerts ?? []).map((alert) => [alert.id, alert]));

  let sentCount = 0;
  let failedCount = 0;
  let skippedCount = 0;
  let missingAlertCount = 0;

  for (const row of rows) {
    if (row.channel !== "email") {
      skippedCount += 1;
      continue;
    }

    const alert = alertMap.get(row.alert_id);
    if (!alert) {
      missingAlertCount += 1;
      await admin
        .from("admin_alert_notifications")
        .update({
          status: "failed",
          error: "Missing referenced alert row.",
        })
        .eq("id", row.id);
      continue;
    }

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [row.recipient],
        subject: `[EduForge Alert] ${alert.severity.toUpperCase()} - ${alert.category}`,
        html: buildEmailHtml(alert),
      }),
    });

    if (response.ok) {
      sentCount += 1;
      await admin
        .from("admin_alert_notifications")
        .update({
          status: "sent",
          sent_at: new Date().toISOString(),
          error: null,
        })
        .eq("id", row.id);
    } else {
      failedCount += 1;
      const errorText = (await response.text()).slice(0, 4000);
      await admin
        .from("admin_alert_notifications")
        .update({
          status: "failed",
          error: errorText,
        })
        .eq("id", row.id);
    }
  }

  await logAdminAction({
    adminUserId: auth.userId,
    actionType: "admin_alert_notifications_process",
    metadata: {
      scanned: rows.length,
      sent: sentCount,
      failed: failedCount,
      skipped: skippedCount,
      missingAlerts: missingAlertCount,
      retryFailed,
      limit,
    },
  });

  return NextResponse.json({
    success: true,
    scanned: rows.length,
    sent: sentCount,
    failed: failedCount,
    skipped: skippedCount,
    missingAlerts: missingAlertCount,
    retryFailed,
    limit,
  });
}
