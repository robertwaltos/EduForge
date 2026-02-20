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

function isMissingTableError(error, tableName) {
  return (
    error &&
    typeof error.message === "string" &&
    error.message.includes(`Could not find the table 'public.${tableName}'`)
  );
}

function isMissingMediaJobsTableError(error) {
  return isMissingTableError(error, "media_generation_jobs");
}

function isMissingReportJobsTableError(error) {
  return isMissingTableError(error, "admin_report_jobs");
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

async function autoResolveAlerts(supabase, category, autoResolveHours, reason, apply) {
  const cutoffIso = new Date(Date.now() - autoResolveHours * 60 * 60 * 1000).toISOString();
  const nowIso = new Date().toISOString();
  const { data, error } = await supabase
    .from("admin_alerts")
    .select("id, metadata")
    .eq("category", category)
    .eq("acknowledged", false)
    .lt("created_at", cutoffIso)
    .limit(100);

  if (error) {
    throw new Error(`Failed loading auto-resolve candidates for ${category}: ${error.message}`);
  }

  if (!data || data.length === 0) {
    return 0;
  }

  if (!apply) {
    return data.length;
  }

  let resolvedCount = 0;
  for (const row of data) {
    const metadata = row.metadata && typeof row.metadata === "object" ? row.metadata : {};
    const { error: updateError } = await supabase
      .from("admin_alerts")
      .update({
        acknowledged: true,
        acknowledged_by: null,
        acknowledged_at: nowIso,
        metadata: {
          ...metadata,
          auto_resolved: true,
          auto_resolved_at: nowIso,
          auto_resolved_reason: reason,
        },
      })
      .eq("id", row.id)
      .eq("acknowledged", false);

    if (!updateError) {
      resolvedCount += 1;
    }
  }

  return resolvedCount;
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
      "media_queue_alert_dedupe_hours",
      "media_queue_alert_auto_resolve_hours",
      "report_queue_sla_stale_hours",
      "report_queue_sla_backlog_limit",
      "report_queue_sla_failure_24h_limit",
      "report_queue_alert_dedupe_hours",
      "report_queue_alert_auto_resolve_hours",
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
  const dedupeWindowHours = Math.max(
    1,
    readNumericSetting(mediaSlaSettingMap.get("media_queue_alert_dedupe_hours"), 24),
  );
  const autoResolveHours = Math.max(
    1,
    readNumericSetting(mediaSlaSettingMap.get("media_queue_alert_auto_resolve_hours"), 12),
  );
  const reportStaleHoursThreshold = Math.max(
    1,
    readNumericSetting(mediaSlaSettingMap.get("report_queue_sla_stale_hours"), 6),
  );
  const reportBacklogThreshold = Math.max(
    1,
    readNumericSetting(mediaSlaSettingMap.get("report_queue_sla_backlog_limit"), 15),
  );
  const reportFailure24hThreshold = Math.max(
    1,
    readNumericSetting(mediaSlaSettingMap.get("report_queue_sla_failure_24h_limit"), 10),
  );
  const reportDedupeWindowHours = Math.max(
    1,
    readNumericSetting(mediaSlaSettingMap.get("report_queue_alert_dedupe_hours"), 24),
  );
  const reportAutoResolveHours = Math.max(
    1,
    readNumericSetting(mediaSlaSettingMap.get("report_queue_alert_auto_resolve_hours"), 12),
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
  const clearCategories = [];
  if (staleMediaCount > 0) {
    candidateAlerts.push({
      severity:
        oldestAgeHours >= staleHoursThreshold * 2 || staleMediaCount >= backlogThreshold ? "critical" : "warning",
      category: "media_queue_stale",
      message: `Detected ${staleMediaCount} media jobs pending/running beyond ${staleHoursThreshold}h SLA.`,
      dedupeWindowHours,
      metadata: {
        staleMediaCount,
        staleMediaCutoff,
        staleHoursThreshold,
        oldestAgeHours: Number(oldestAgeHours.toFixed(2)),
        dedupeWindowHours,
      },
    });
  } else {
    clearCategories.push({
      category: "media_queue_stale",
      reason: "stale queue condition cleared",
      autoResolveHours,
    });
  }

  if (queuedOrRunningCount >= backlogThreshold) {
    candidateAlerts.push({
      severity: queuedOrRunningCount >= backlogThreshold * 2 ? "critical" : "warning",
      category: "media_queue_backlog",
      message: `Media queue backlog is ${queuedOrRunningCount}, above threshold ${backlogThreshold}.`,
      dedupeWindowHours,
      metadata: {
        queuedOrRunningCount,
        backlogThreshold,
        dedupeWindowHours,
      },
    });
  } else {
    clearCategories.push({
      category: "media_queue_backlog",
      reason: "media backlog condition cleared",
      autoResolveHours,
    });
  }

  if (failedMediaCount24h >= failure24hThreshold) {
    candidateAlerts.push({
      severity: failedMediaCount24h >= failure24hThreshold * 2 ? "critical" : "warning",
      category: "media_queue_failure_spike",
      message: `Media queue had ${failedMediaCount24h} failures in the last 24h (threshold: ${failure24hThreshold}).`,
      dedupeWindowHours,
      metadata: {
        failedMediaCount24h,
        failure24hCutoff,
        failure24hThreshold,
        dedupeWindowHours,
      },
    });
  } else {
    clearCategories.push({
      category: "media_queue_failure_spike",
      reason: "media failure spike condition cleared",
      autoResolveHours,
    });
  }

  const reportNowIso = new Date().toISOString();
  const reportStaleCutoff = new Date(Date.now() - reportStaleHoursThreshold * 60 * 60 * 1000).toISOString();
  const reportFailure24hCutoff = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();

  const [
    reportQueuedReadyResult,
    reportRunningResult,
    reportOldestQueuedReadyResult,
    reportOldestRunningResult,
    reportQueuedStaleResult,
    reportRunningStaleResult,
    reportFailed24hResult,
  ] = await Promise.all([
    supabase
      .from("admin_report_jobs")
      .select("id", { count: "exact", head: true })
      .eq("status", "queued")
      .lte("run_after", reportNowIso),
    supabase
      .from("admin_report_jobs")
      .select("id", { count: "exact", head: true })
      .eq("status", "running"),
    supabase
      .from("admin_report_jobs")
      .select("run_after")
      .eq("status", "queued")
      .lte("run_after", reportNowIso)
      .order("run_after", { ascending: true })
      .limit(1)
      .maybeSingle(),
    supabase
      .from("admin_report_jobs")
      .select("started_at, created_at")
      .eq("status", "running")
      .order("created_at", { ascending: true })
      .limit(1)
      .maybeSingle(),
    supabase
      .from("admin_report_jobs")
      .select("id", { count: "exact", head: true })
      .eq("status", "queued")
      .lt("run_after", reportStaleCutoff),
    supabase
      .from("admin_report_jobs")
      .select("id", { count: "exact", head: true })
      .eq("status", "running")
      .lt("created_at", reportStaleCutoff),
    supabase
      .from("admin_report_jobs")
      .select("id", { count: "exact", head: true })
      .eq("status", "failed")
      .gte("completed_at", reportFailure24hCutoff),
  ]);

  let reportQueuedReadyCount = 0;
  let reportRunningCount = 0;
  let reportStaleCount = 0;
  let reportFailedCount24h = 0;
  let reportQueuedStaleCount = 0;
  let reportRunningStaleCount = 0;
  let oldestReportAgeHours = 0;

  const reportQueryErrors = [
    reportQueuedReadyResult.error,
    reportRunningResult.error,
    reportOldestQueuedReadyResult.error,
    reportOldestRunningResult.error,
    reportQueuedStaleResult.error,
    reportRunningStaleResult.error,
    reportFailed24hResult.error,
  ].filter(Boolean);

  const missingReportTable = reportQueryErrors.some((error) => isMissingReportJobsTableError(error));
  if (missingReportTable) {
    console.log("admin_report_jobs table is missing. Skipping report queue SLA checks.");
  } else if (reportQueryErrors.length > 0) {
    const firstError = reportQueryErrors[0];
    throw new Error(`Failed running report queue SLA checks: ${firstError.message}`);
  } else {
    reportQueuedReadyCount = reportQueuedReadyResult.count ?? 0;
    reportRunningCount = reportRunningResult.count ?? 0;
    reportQueuedStaleCount = reportQueuedStaleResult.count ?? 0;
    reportRunningStaleCount = reportRunningStaleResult.count ?? 0;
    reportStaleCount = reportQueuedStaleCount + reportRunningStaleCount;
    reportFailedCount24h = reportFailed24hResult.count ?? 0;

    const oldestQueuedReportAgeHours = reportOldestQueuedReadyResult.data?.run_after
      ? (Date.now() - new Date(reportOldestQueuedReadyResult.data.run_after).getTime()) / (60 * 60 * 1000)
      : 0;
    const oldestRunningReportCreatedAt =
      reportOldestRunningResult.data?.started_at ?? reportOldestRunningResult.data?.created_at ?? null;
    const oldestRunningReportAgeHours = oldestRunningReportCreatedAt
      ? (Date.now() - new Date(oldestRunningReportCreatedAt).getTime()) / (60 * 60 * 1000)
      : 0;
    oldestReportAgeHours = Math.max(oldestQueuedReportAgeHours, oldestRunningReportAgeHours);

    const reportBacklogCount = reportQueuedReadyCount + reportRunningCount;
    if (reportStaleCount > 0) {
      candidateAlerts.push({
        severity:
          oldestReportAgeHours >= reportStaleHoursThreshold * 2 || reportStaleCount >= reportBacklogThreshold
            ? "critical"
            : "warning",
        category: "report_queue_stale",
        message: `Detected ${reportStaleCount} report jobs pending/running beyond ${reportStaleHoursThreshold}h SLA.`,
        dedupeWindowHours: reportDedupeWindowHours,
        metadata: {
          reportStaleCount,
          reportQueuedStaleCount,
          reportRunningStaleCount,
          reportStaleCutoff,
          reportStaleHoursThreshold,
          oldestReportAgeHours: Number(oldestReportAgeHours.toFixed(2)),
          dedupeWindowHours: reportDedupeWindowHours,
        },
      });
    } else {
      clearCategories.push({
        category: "report_queue_stale",
        reason: "report queue stale condition cleared",
        autoResolveHours: reportAutoResolveHours,
      });
    }

    if (reportBacklogCount >= reportBacklogThreshold) {
      candidateAlerts.push({
        severity: reportBacklogCount >= reportBacklogThreshold * 2 ? "critical" : "warning",
        category: "report_queue_backlog",
        message: `Report queue backlog is ${reportBacklogCount}, above threshold ${reportBacklogThreshold}.`,
        dedupeWindowHours: reportDedupeWindowHours,
        metadata: {
          reportBacklogCount,
          reportQueuedReadyCount,
          reportRunningCount,
          reportBacklogThreshold,
          dedupeWindowHours: reportDedupeWindowHours,
        },
      });
    } else {
      clearCategories.push({
        category: "report_queue_backlog",
        reason: "report queue backlog condition cleared",
        autoResolveHours: reportAutoResolveHours,
      });
    }

    if (reportFailedCount24h >= reportFailure24hThreshold) {
      candidateAlerts.push({
        severity: reportFailedCount24h >= reportFailure24hThreshold * 2 ? "critical" : "warning",
        category: "report_queue_failure_spike",
        message: `Report queue had ${reportFailedCount24h} failures in the last 24h (threshold: ${reportFailure24hThreshold}).`,
        dedupeWindowHours: reportDedupeWindowHours,
        metadata: {
          reportFailedCount24h,
          reportFailure24hCutoff,
          reportFailure24hThreshold,
          dedupeWindowHours: reportDedupeWindowHours,
        },
      });
    } else {
      clearCategories.push({
        category: "report_queue_failure_spike",
        reason: "report queue failure spike condition cleared",
        autoResolveHours: reportAutoResolveHours,
      });
    }
  }

  const createdCategories = [];
  const skippedCategories = [];
  for (const candidate of candidateAlerts) {
    const shouldCreate = await shouldCreateAlert(
      supabase,
      candidate.category,
      candidate.dedupeWindowHours ?? dedupeWindowHours,
    );
    if (!shouldCreate) {
      skippedCategories.push(candidate.category);
      continue;
    }

    if (options.apply) {
      await insertAlert(supabase, candidate);
    }
    createdCategories.push(candidate.category);
  }

  const autoResolvedCategories = [];
  const autoResolvedCounts = {};
  for (const clearCategory of clearCategories) {
    const resolvedCount = await autoResolveAlerts(
      supabase,
      clearCategory.category,
      clearCategory.autoResolveHours ?? autoResolveHours,
      clearCategory.reason,
      options.apply,
    );
    if (resolvedCount > 0) {
      autoResolvedCounts[clearCategory.category] = resolvedCount;
      autoResolvedCategories.push(clearCategory.category);
    }
  }

  console.log(`Mode: ${options.apply ? "apply" : "dry-run"}`);
  console.log(`Media dedupe window (hours): ${dedupeWindowHours}`);
  console.log(`Media auto-resolve age (hours): ${autoResolveHours}`);
  console.log(`Media queued/running jobs: ${queuedOrRunningCount}`);
  console.log(`Media stale jobs: ${staleMediaCount} (threshold hours: ${staleHoursThreshold})`);
  console.log(`Media failures in 24h: ${failedMediaCount24h} (threshold: ${failure24hThreshold})`);
  console.log(`Report dedupe window (hours): ${reportDedupeWindowHours}`);
  console.log(`Report auto-resolve age (hours): ${reportAutoResolveHours}`);
  console.log(
    `Report queued/running jobs: ${reportQueuedReadyCount + reportRunningCount} (queued-ready: ${reportQueuedReadyCount}, running: ${reportRunningCount})`,
  );
  console.log(`Report stale jobs: ${reportStaleCount} (threshold hours: ${reportStaleHoursThreshold})`);
  console.log(`Report failures in 24h: ${reportFailedCount24h} (threshold: ${reportFailure24hThreshold})`);
  console.log(`Alert candidates: ${candidateAlerts.length}`);
  console.log(`Created alerts: ${createdCategories.length} (${createdCategories.join(", ") || "none"})`);
  console.log(`Skipped (deduped): ${skippedCategories.length} (${skippedCategories.join(", ") || "none"})`);
  console.log(
    `Auto-resolved alerts: ${autoResolvedCategories.length} (${autoResolvedCategories.join(", ") || "none"})`,
  );
  console.log(`Auto-resolved counts: ${JSON.stringify(autoResolvedCounts)}`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
