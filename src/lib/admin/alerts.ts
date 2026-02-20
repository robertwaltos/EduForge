import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { serverEnv } from "@/lib/config/env";

type AlertInput = {
  severity?: "info" | "warning" | "critical";
  category: string;
  message: string;
  metadata?: Record<string, unknown>;
};

export async function createAdminAlert({
  severity = "warning",
  category,
  message,
  metadata = {},
}: AlertInput) {
  try {
    const admin = createSupabaseAdminClient();
    const { data, error } = await admin
      .from("admin_alerts")
      .insert({
      severity,
      category,
      message,
      metadata,
      })
      .select("id")
      .single();

    if (error || !data?.id) {
      throw new Error(error?.message ?? "Failed to create alert row.");
    }

    const emails = (serverEnv.ADMIN_ALERT_EMAILS ?? "")
      .split(",")
      .map((value) => value.trim())
      .filter(Boolean);

    if (emails.length === 0) {
      return;
    }

    const queuedRows = emails.map((recipient) => ({
      alert_id: data.id,
      channel: "email",
      recipient,
      status: "queued",
    }));

    await admin.from("admin_alert_notifications").insert(queuedRows);

    const fromEmail = serverEnv.ADMIN_ALERT_FROM_EMAIL ?? serverEnv.PARENT_CONSENT_FROM_EMAIL;

    if (!serverEnv.RESEND_API_KEY || !fromEmail) {
      return;
    }

    await Promise.all(
      emails.map(async (recipient) => {
        const response = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${serverEnv.RESEND_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: fromEmail,
            to: [recipient],
            subject: `[EduForge Alert] ${severity.toUpperCase()} - ${category}`,
            html: `<p>${message}</p><pre>${JSON.stringify(metadata, null, 2)}</pre>`,
          }),
        });

        if (response.ok) {
          await admin
            .from("admin_alert_notifications")
            .update({
              status: "sent",
              sent_at: new Date().toISOString(),
            })
            .eq("alert_id", data.id)
            .eq("recipient", recipient);
        } else {
          const errText = await response.text();
          await admin
            .from("admin_alert_notifications")
            .update({
              status: "failed",
              error: errText,
            })
            .eq("alert_id", data.id)
            .eq("recipient", recipient);
        }
      })
    );
  } catch (error) {
    console.error("Failed to create admin alert.", error);
  }
}
