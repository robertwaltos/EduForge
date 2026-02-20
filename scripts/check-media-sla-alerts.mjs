import fs from "node:fs";
import path from "node:path";
import { createClient } from "@supabase/supabase-js";

const envPath = path.resolve(".env");

function parseArgs(argv) {
  return {
    apply: argv.includes("--apply"),
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

function coerceNumber(value) {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string") {
    const parsed = Number(value);
    if (Number.isFinite(parsed)) return parsed;
  }
  return null;
}

function readNumericSetting(value, fallback) {
  const direct = coerceNumber(value);
  if (direct !== null) return direct;
  if (value && typeof value === "object" && "value" in value) {
    const nested = coerceNumber(value.value);
    if (nested !== null) return nested;
  }
  return fallback;
}

function isMissingMediaJobsTableError(error) {
  return (
    error &&
    typeof error.message === "string" &&
    error.message.includes("Could not find the table 'public.media_generation_jobs'")
  );
}

async function shouldCreateAlert(supabase, category, dedupeWindowHours = 24) {
  const recentWindowIso = new Date(Date.now() - dedupeWindowHours * 60 * 60 * 1000).toISOString();
  const { data, error } = await supabase
    .from("admin_alerts")
    .select("id")
    .eq("category", category)
    .eq("acknowledged", false)
    .gte("created_at", recentWindowIso)
    .limit(1);

  if (error) {
    throw new Error(`Failed checking duplicate alerts for ${category}: ${error.message}`);
  }

  return !data || data.length === 0;
}

async function insertAlert(supabase, payload) {
  const { error } = await supabase.from("admin_alerts").insert(payload);
  if (error) {
    throw new Error(`Failed inserting alert ${payload.category}: ${error.message}`);
  }
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  const envValues = parseEnvFile(envPath);
  const supabaseUrl = readEnvValue(envValues, "NEXT_PUBLIC_SUPABASE_URL", "EXPO_PUBLIC_SUPABASE_URL");
  const serviceRoleKey = readEnvValue(envValues, "SUPABASE_SERVICE_ROLE_KEY");

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL/EXPO_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY.");
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  const { data: mediaSlaSettings, error: settingsError } = await supabase
    .from("app_settings")
    .select("key, value")
    .in("key", [
      "media_queue_sla_stale_hours",
      "media_queue_sla_backlog_limit",
      "media_queue_sla_failure_24h_limit",
    ]);

  if (settingsError) {
    throw new Error(`Unable to read media SLA settings: ${settingsError.message}`);
  }

  const mediaSlaSettingMap = new Map((mediaSlaSettings ?? []).map((row) => [row.key, row.value]));
  const staleHoursThreshold = Math.max(
    1,
    readNumericSetting(mediaSlaSettingMap.get("media_queue_sla_stale_hours"), 6),
  );
  const backlogThreshold = Math.max(
    1,
    readNumericSetting(mediaSlaSettingMap.get("media_queue_sla_backlog_limit"), 30),
  );
  const failure24hThreshold = Math.max(
    1,
    readNumericSetting(mediaSlaSettingMap.get("media_queue_sla_failure_24h_limit"), 20),
  );

  const staleMediaCutoff = new Date(Date.now() - staleHoursThreshold * 60 * 60 * 1000).toISOString();
  const failure24hCutoff = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();

  const [
    queuedOrRunningResult,
    staleMediaResult,
    oldestQueueJobResult,
    failedMedia24hResult,
  ] = await Promise.all([
    supabase
      .from("media_generation_jobs")
      .select("id", { count: "exact", head: true })
      .in("status", ["queued", "running"]),
    supabase
      .from("media_generation_jobs")
      .select("id", { count: "exact", head: true })
      .in("status", ["queued", "running"])
      .lt("created_at", staleMediaCutoff),
    supabase
      .from("media_generation_jobs")
      .select("id, status, created_at")
      .in("status", ["queued", "running"])
      .order("created_at", { ascending: true })
      .limit(1)
      .maybeSingle(),
    supabase
      .from("media_generation_jobs")
      .select("id", { count: "exact", head: true })
      .eq("status", "failed")
      .gte("updated_at", failure24hCutoff),
  ]);

  if (queuedOrRunningResult.error) {
    if (isMissingMediaJobsTableError(queuedOrRunningResult.error)) {
      console.log("media_generation_jobs table is missing. Skipping media SLA checks.");
      return;
    }
    throw new Error(`Failed counting queued/running jobs: ${queuedOrRunningResult.error.message}`);
  }
  if (staleMediaResult.error) {
    if (isMissingMediaJobsTableError(staleMediaResult.error)) {
      console.log("media_generation_jobs table is missing. Skipping media SLA checks.");
      return;
    }
    throw new Error(`Failed counting stale media jobs: ${staleMediaResult.error.message}`);
  }
  if (oldestQueueJobResult.error) {
    if (isMissingMediaJobsTableError(oldestQueueJobResult.error)) {
      console.log("media_generation_jobs table is missing. Skipping media SLA checks.");
      return;
    }
    throw new Error(`Failed loading oldest queued media job: ${oldestQueueJobResult.error.message}`);
  }
  if (failedMedia24hResult.error) {
    if (isMissingMediaJobsTableError(failedMedia24hResult.error)) {
      console.log("media_generation_jobs table is missing. Skipping media SLA checks.");
      return;
    }
    throw new Error(`Failed counting failed media jobs in 24h: ${failedMedia24hResult.error.message}`);
  }

  const queuedOrRunningCount = queuedOrRunningResult.count ?? 0;
  const staleMediaCount = staleMediaResult.count ?? 0;
  const failedMediaCount24h = failedMedia24hResult.count ?? 0;
  const oldestAgeHours = oldestQueueJobResult.data?.created_at
    ? (Date.now() - new Date(oldestQueueJobResult.data.created_at).getTime()) / (60 * 60 * 1000)
    : 0;

  const candidateAlerts = [];
  if (staleMediaCount > 0) {
    candidateAlerts.push({
      severity:
        oldestAgeHours >= staleHoursThreshold * 2 || staleMediaCount >= backlogThreshold ? "critical" : "warning",
      category: "media_queue_stale",
      message: `Detected ${staleMediaCount} media jobs pending/running beyond ${staleHoursThreshold}h SLA.`,
      metadata: {
        staleMediaCount,
        staleMediaCutoff,
        staleHoursThreshold,
        oldestAgeHours: Number(oldestAgeHours.toFixed(2)),
      },
    });
  }

  if (queuedOrRunningCount >= backlogThreshold) {
    candidateAlerts.push({
      severity: queuedOrRunningCount >= backlogThreshold * 2 ? "critical" : "warning",
      category: "media_queue_backlog",
      message: `Media queue backlog is ${queuedOrRunningCount}, above threshold ${backlogThreshold}.`,
      metadata: {
        queuedOrRunningCount,
        backlogThreshold,
      },
    });
  }

  if (failedMediaCount24h >= failure24hThreshold) {
    candidateAlerts.push({
      severity: failedMediaCount24h >= failure24hThreshold * 2 ? "critical" : "warning",
      category: "media_queue_failure_spike",
      message: `Media queue had ${failedMediaCount24h} failures in the last 24h (threshold: ${failure24hThreshold}).`,
      metadata: {
        failedMediaCount24h,
        failure24hCutoff,
        failure24hThreshold,
      },
    });
  }

  const createdCategories = [];
  const skippedCategories = [];
  for (const candidate of candidateAlerts) {
    const shouldCreate = await shouldCreateAlert(supabase, candidate.category);
    if (!shouldCreate) {
      skippedCategories.push(candidate.category);
      continue;
    }

    if (options.apply) {
      await insertAlert(supabase, candidate);
    }
    createdCategories.push(candidate.category);
  }

  console.log(`Mode: ${options.apply ? "apply" : "dry-run"}`);
  console.log(`Queued/running jobs: ${queuedOrRunningCount}`);
  console.log(`Stale jobs: ${staleMediaCount} (threshold hours: ${staleHoursThreshold})`);
  console.log(`Failures in 24h: ${failedMediaCount24h} (threshold: ${failure24hThreshold})`);
  console.log(`Alert candidates: ${candidateAlerts.length}`);
  console.log(`Created alerts: ${createdCategories.length} (${createdCategories.join(", ") || "none"})`);
  console.log(`Skipped (deduped): ${skippedCategories.length} (${skippedCategories.join(", ") || "none"})`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
