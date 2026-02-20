import fs from "node:fs";
import path from "node:path";
import { createClient } from "@supabase/supabase-js";

const envPath = path.resolve(".env");

function parseArgs(argv) {
  const getArgValue = (name, fallback) => {
    const index = argv.indexOf(name);
    if (index < 0) return fallback;
    const value = argv[index + 1];
    if (!value || value.startsWith("--")) return fallback;
    return value;
  };

  const limitRaw = getArgValue("--limit", "100");
  const parsedLimit = Number(limitRaw);

  return {
    apply: argv.includes("--apply"),
    retryFailed: argv.includes("--retry-failed"),
    limit: Number.isFinite(parsedLimit) ? Math.max(1, Math.min(1000, Math.floor(parsedLimit))) : 100,
  };
}

function parseEnvFile(filePath) {
  if (!fs.existsSync(filePath)) return {};
  const raw = fs.readFileSync(filePath, "utf8");
  const lines = raw.split(/\r?\n/);
  const values = {};

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const equalsIndex = trimmed.indexOf("=");
    if (equalsIndex < 0) continue;
    const key = trimmed.slice(0, equalsIndex).trim();
    const value = trimmed.slice(equalsIndex + 1).trim();
    values[key] = value;
  }

  return values;
}

function readEnvValue(fileValues, key, fallbackKey) {
  if (process.env[key]) return process.env[key];
  if (fallbackKey && process.env[fallbackKey]) return process.env[fallbackKey];
  if (fileValues[key]) return fileValues[key];
  if (fallbackKey && fileValues[fallbackKey]) return fileValues[fallbackKey];
  return "";
}

function buildEmailHtml(alert) {
  return [
    `<p><strong>Severity:</strong> ${alert.severity.toUpperCase()}</p>`,
    `<p><strong>Category:</strong> ${alert.category}</p>`,
    `<p>${alert.message}</p>`,
    `<pre>${JSON.stringify(alert.metadata ?? {}, null, 2)}</pre>`,
  ].join("");
}

async function sendWithResend({ resendApiKey, fromEmail, recipient, alert }) {
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [recipient],
      subject: `[EduForge Alert] ${alert.severity.toUpperCase()} - ${alert.category}`,
      html: buildEmailHtml(alert),
    }),
  });

  if (response.ok) {
    return { ok: true, error: null };
  }

  const errorText = await response.text();
  return { ok: false, error: errorText.slice(0, 4000) };
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  const envValues = parseEnvFile(envPath);
  const supabaseUrl = readEnvValue(envValues, "NEXT_PUBLIC_SUPABASE_URL", "EXPO_PUBLIC_SUPABASE_URL");
  const serviceRoleKey = readEnvValue(envValues, "SUPABASE_SERVICE_ROLE_KEY");
  const resendApiKey = readEnvValue(envValues, "RESEND_API_KEY");
  const fromEmail =
    readEnvValue(envValues, "ADMIN_ALERT_FROM_EMAIL") ||
    readEnvValue(envValues, "PARENT_CONSENT_FROM_EMAIL");

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL/EXPO_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY.");
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  const statuses = options.retryFailed ? ["queued", "failed"] : ["queued"];
  const { data: notifications, error: notificationsError } = await supabase
    .from("admin_alert_notifications")
    .select("id, alert_id, recipient, channel, status, created_at")
    .in("status", statuses)
    .order("created_at", { ascending: true })
    .limit(options.limit);

  if (notificationsError) {
    throw new Error(`Failed loading alert notifications: ${notificationsError.message}`);
  }

  const rows = notifications ?? [];
  if (rows.length === 0) {
    console.log("No queued alert notifications.");
    return;
  }

  const uniqueAlertIds = [...new Set(rows.map((row) => row.alert_id))];
  const { data: alerts, error: alertsError } = await supabase
    .from("admin_alerts")
    .select("id, severity, category, message, metadata")
    .in("id", uniqueAlertIds);

  if (alertsError) {
    throw new Error(`Failed loading alerts for notifications: ${alertsError.message}`);
  }

  const alertMap = new Map((alerts ?? []).map((alert) => [alert.id, alert]));

  if (!resendApiKey || !fromEmail) {
    console.log("RESEND_API_KEY or ADMIN_ALERT_FROM_EMAIL/PARENT_CONSENT_FROM_EMAIL is missing. Skipping send step.");
    console.log(`Pending notifications left untouched: ${rows.length}`);
    return;
  }

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
      if (options.apply) {
        await supabase
          .from("admin_alert_notifications")
          .update({
            status: "failed",
            error: "Missing referenced alert row.",
          })
          .eq("id", row.id);
      }
      continue;
    }

    if (!options.apply) {
      sentCount += 1;
      continue;
    }

    const sendResult = await sendWithResend({
      resendApiKey,
      fromEmail,
      recipient: row.recipient,
      alert,
    });

    if (sendResult.ok) {
      sentCount += 1;
      await supabase
        .from("admin_alert_notifications")
        .update({
          status: "sent",
          sent_at: new Date().toISOString(),
          error: null,
        })
        .eq("id", row.id);
    } else {
      failedCount += 1;
      await supabase
        .from("admin_alert_notifications")
        .update({
          status: "failed",
          error: sendResult.error,
        })
        .eq("id", row.id);
    }
  }

  console.log(`Mode: ${options.apply ? "apply" : "dry-run"}`);
  console.log(`Scanned notifications: ${rows.length}`);
  console.log(`Sent${options.apply ? "" : " (would send)"}: ${sentCount}`);
  console.log(`Failed: ${failedCount}`);
  console.log(`Skipped non-email: ${skippedCount}`);
  console.log(`Missing-alert rows: ${missingAlertCount}`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
