import fs from "node:fs";
import path from "node:path";
import { createClient } from "@supabase/supabase-js";

const envPath = path.resolve(".env");
const VALID_STATUSES = ["failed", "canceled"];

function parseArgs(argv) {
  const options = {
    apply: false,
    status: "failed",
    moduleId: "",
    lessonId: "",
    assetType: "",
    limit: 100,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--apply") options.apply = true;
    else if (arg === "--status") options.status = String(argv[index + 1] ?? "failed");
    else if (arg === "--module") options.moduleId = String(argv[index + 1] ?? "");
    else if (arg === "--lesson") options.lessonId = String(argv[index + 1] ?? "");
    else if (arg === "--asset") options.assetType = String(argv[index + 1] ?? "");
    else if (arg === "--limit") options.limit = Number(argv[index + 1] ?? 100);
  }

  options.moduleId = options.moduleId.trim();
  options.lessonId = options.lessonId.trim();
  options.assetType = options.assetType.trim();
  options.limit = Number.isFinite(options.limit) ? Math.min(500, Math.max(1, options.limit)) : 100;

  return options;
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

function normalizeAssetType(value) {
  if (!value || value === "all") return "";
  if (["video", "animation", "image"].includes(value)) return value;
  throw new Error(`Invalid asset type "${value}". Use video|animation|image|all.`);
}

function normalizeStatuses(value) {
  const raw = String(value || "failed")
    .split(",")
    .map((entry) => entry.trim().toLowerCase())
    .filter(Boolean);

  if (raw.length === 0 || raw.includes("all")) {
    return [...VALID_STATUSES];
  }

  const deduped = Array.from(new Set(raw));
  for (const status of deduped) {
    if (!VALID_STATUSES.includes(status)) {
      throw new Error(`Invalid status "${status}". Use failed|canceled|all.`);
    }
  }
  return deduped;
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  const envValues = parseEnvFile(envPath);
  const supabaseUrl = readEnvValue(envValues, "NEXT_PUBLIC_SUPABASE_URL", "EXPO_PUBLIC_SUPABASE_URL");
  const serviceRoleKey = readEnvValue(envValues, "SUPABASE_SERVICE_ROLE_KEY");

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL/EXPO_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY.");
  }

  const assetType = normalizeAssetType(options.assetType);
  const retryStatuses = normalizeStatuses(options.status);

  const supabase = createClient(supabaseUrl, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  let query = supabase
    .from("media_generation_jobs")
    .select("id, status, asset_type, module_id, lesson_id, metadata")
    .in("status", retryStatuses);

  if (options.moduleId) query = query.eq("module_id", options.moduleId);
  if (options.lessonId) query = query.eq("lesson_id", options.lessonId);
  if (assetType) query = query.eq("asset_type", assetType);

  const { data: jobs, error: fetchError } = await query.order("updated_at", { ascending: false }).limit(options.limit);
  if (fetchError) {
    throw new Error(`Unable to fetch retry candidates: ${fetchError.message}`);
  }

  if (!jobs || jobs.length === 0) {
    console.log("No retryable media jobs matched the provided filters.");
    return;
  }

  console.log(`Retry candidates: ${jobs.length}`);
  console.log(`Statuses: ${retryStatuses.join(", ")}`);
  console.log(`Mode: ${options.apply ? "apply" : "dry-run"}`);

  if (!options.apply) {
    console.log("");
    console.log("Dry-run preview (first 10 jobs):");
    for (const row of jobs.slice(0, 10)) {
      console.log(
        `- ${row.id} | ${row.status} -> queued | ${row.module_id ?? "n/a"} | ${row.lesson_id ?? "n/a"} | ${row.asset_type}`,
      );
    }
    console.log("");
    console.log('Use "--apply" to reset selected jobs back to queued.');
    return;
  }

  let retried = 0;
  let failedUpdates = 0;
  for (const job of jobs) {
    const previousRetryCount = Number((job.metadata ?? {}).retry_count ?? 0);
    const nowIso = new Date().toISOString();
    const nextMetadata = {
      ...(job.metadata ?? {}),
      retry_count: Number.isFinite(previousRetryCount) ? previousRetryCount + 1 : 1,
      retried_at: nowIso,
      retried_by: "retry-media-jobs-script",
      previous_status: job.status,
    };

    const { error: updateError } = await supabase
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
    retried += 1;
  }

  console.log(`Retried: ${retried}`);
  console.log(`Failed updates: ${failedUpdates}`);

  if (failedUpdates > 0) {
    process.exitCode = 1;
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
