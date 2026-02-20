import fs from "node:fs";
import path from "node:path";
import { createHash } from "node:crypto";
import { createClient } from "@supabase/supabase-js";

const envPath = path.resolve(".env");

const REPORT_CONFIG = {
  dsar: {
    select: "id, user_id, request_type, status, details, requested_at, resolved_at",
    orderColumn: "requested_at",
    columns: ["id", "user_id", "request_type", "status", "details", "requested_at", "resolved_at"],
  },
  support: {
    select:
      "id, user_id, subject, description, status, priority, assigned_to, resolution_notes, created_at, updated_at, resolved_at",
    orderColumn: "created_at",
    columns: [
      "id",
      "user_id",
      "subject",
      "description",
      "status",
      "priority",
      "assigned_to",
      "resolution_notes",
      "created_at",
      "updated_at",
      "resolved_at",
    ],
  },
  audit: {
    select: "id, admin_user_id, action_type, target_user_id, metadata, created_at",
    orderColumn: "created_at",
    columns: ["id", "admin_user_id", "action_type", "target_user_id", "metadata", "created_at"],
  },
};

function parseArgs(argv) {
  const args = { apply: false, limit: 25, retryFailed: false, retryLimit: 25 };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--apply") {
      args.apply = true;
      continue;
    }
    if (arg === "--retry-failed") {
      args.retryFailed = true;
      continue;
    }
    if (arg === "--limit") {
      const next = argv[index + 1];
      if (next) {
        const parsed = Number(next);
        if (Number.isFinite(parsed) && parsed > 0) {
          args.limit = Math.min(250, Math.floor(parsed));
        }
        index += 1;
      }
    }
    if (arg === "--retry-limit") {
      const next = argv[index + 1];
      if (next) {
        const parsed = Number(next);
        if (Number.isFinite(parsed) && parsed > 0) {
          args.retryLimit = Math.min(500, Math.floor(parsed));
        }
        index += 1;
      }
    }
  }
  return args;
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

function escapeCell(value) {
  if (value === null || value === undefined) {
    return "";
  }
  const raw = typeof value === "string" ? value : JSON.stringify(value);
  const normalized = raw.replace(/"/g, '""');
  if (/[",\n]/.test(normalized)) {
    return `"${normalized}"`;
  }
  return normalized;
}

function toCsv(rows, columns) {
  const header = columns.join(",");
  const body = rows.map((row) => columns.map((column) => escapeCell(row[column])).join(",")).join("\n");
  return `${header}\n${body}`;
}

async function buildReportCsv(supabase, reportType) {
  const config = REPORT_CONFIG[reportType];
  if (!config) {
    throw new Error(`Unsupported report type: ${reportType}`);
  }

  const table =
    reportType === "dsar" ? "dsar_requests" : reportType === "support" ? "support_tickets" : "admin_action_logs";

  const { data, error } = await supabase
    .from(table)
    .select(config.select)
    .order(config.orderColumn, { ascending: false })
    .limit(5000);

  if (error) {
    throw new Error(`Failed loading ${reportType} rows: ${error.message}`);
  }

  const rows = data ?? [];
  return {
    csvContent: toCsv(rows, config.columns),
    rowCount: rows.length,
  };
}

async function markJob(supabase, jobId, payload, expectedStatus = null) {
  let query = supabase.from("admin_report_jobs").update(payload).eq("id", jobId);
  if (expectedStatus) {
    query = query.eq("status", expectedStatus);
  }
  const { error } = await query;
  if (error) {
    throw new Error(`Failed updating report job ${jobId}: ${error.message}`);
  }
}

async function claimReportJob(supabase, jobId, startedAtIso) {
  const { data, error } = await supabase
    .from("admin_report_jobs")
    .update({
      status: "running",
      started_at: startedAtIso,
      completed_at: null,
      error: null,
    })
    .eq("id", jobId)
    .eq("status", "queued")
    .select("id")
    .maybeSingle();

  if (error) {
    throw new Error(`Failed claiming report job ${jobId}: ${error.message}`);
  }

  return Boolean(data?.id);
}

async function retryFailedJobs(supabase, retryLimit) {
  const { data: failedJobs, error: failedJobsError } = await supabase
    .from("admin_report_jobs")
    .select("id")
    .eq("status", "failed")
    .order("completed_at", { ascending: false })
    .limit(retryLimit);

  if (failedJobsError) {
    throw new Error(`Failed loading failed report jobs for retry: ${failedJobsError.message}`);
  }

  const failedIds = (failedJobs ?? []).map((job) => job.id);
  if (failedIds.length === 0) {
    return 0;
  }

  const nowIso = new Date().toISOString();
  const { error: retryError } = await supabase
    .from("admin_report_jobs")
    .update({
      status: "queued",
      run_after: nowIso,
      started_at: null,
      completed_at: null,
      error: null,
    })
    .in("id", failedIds)
    .eq("status", "failed");

  if (retryError) {
    throw new Error(`Failed retrying failed report jobs: ${retryError.message}`);
  }

  return failedIds.length;
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

  let retried = 0;
  if (options.apply && options.retryFailed) {
    retried = await retryFailedJobs(supabase, options.retryLimit);
  }

  const nowIso = new Date().toISOString();
  const { data: jobs, error: jobsError } = await supabase
    .from("admin_report_jobs")
    .select("id, report_type, requested_by, run_after")
    .eq("status", "queued")
    .lte("run_after", nowIso)
    .order("run_after", { ascending: true })
    .limit(options.limit);

  if (jobsError) {
    throw new Error(`Failed loading queued report jobs: ${jobsError.message}`);
  }

  const dueJobs = jobs ?? [];
  if (dueJobs.length === 0) {
    console.log("No queued admin report jobs ready to run.");
    return;
  }

  if (!options.apply) {
    console.log(`Dry-run: ${dueJobs.length} queued report jobs are ready.`);
    for (const job of dueJobs) {
      console.log(`${job.id} :: ${job.report_type} :: run_after=${job.run_after}`);
    }
    return;
  }

  let processed = 0;
  let claimed = 0;
  let skipped = 0;
  let failed = 0;

  for (const job of dueJobs) {
    const startedAtIso = new Date().toISOString();
    const wasClaimed = await claimReportJob(supabase, job.id, startedAtIso);
    if (!wasClaimed) {
      skipped += 1;
      continue;
    }
    claimed += 1;

    try {
      const { csvContent, rowCount } = await buildReportCsv(supabase, job.report_type);
      const checksum = createHash("sha256").update(csvContent).digest("hex");
      const completedAt = new Date().toISOString();

      const { error: exportError } = await supabase.from("admin_report_exports").insert({
        admin_user_id: job.requested_by,
        report_type: job.report_type,
        format: "csv",
        status: "completed",
        row_count: rowCount,
        checksum_sha256: checksum,
        completed_at: completedAt,
        metadata: {
          generatedAt: completedAt,
          source: "report-jobs-script",
        },
      });

      if (exportError) {
        throw new Error(`Failed writing report export row: ${exportError.message}`);
      }

      await markJob(supabase, job.id, {
        status: "completed",
        completed_at: completedAt,
        error: null,
      }, "running");
      processed += 1;
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error";
      await markJob(supabase, job.id, {
        status: "failed",
        completed_at: new Date().toISOString(),
        error: message,
      }, "running");
      failed += 1;
    }
  }

  console.log(`Retried failed report jobs: ${retried}`);
  console.log(`Claimed report jobs: ${claimed}`);
  console.log(`Skipped (already claimed): ${skipped}`);
  console.log(`Processed report jobs: ${processed}`);
  console.log(`Failed report jobs: ${failed}`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
