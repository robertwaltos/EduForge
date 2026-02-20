import fs from "node:fs";
import path from "node:path";
import { createClient } from "@supabase/supabase-js";

const envPath = path.resolve(".env");

function parseArgs(argv) {
  const options = {
    apply: false,
    moduleId: "",
    lessonId: "",
    assetType: "",
    limit: 100,
    maxAgeMinutes: 90,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--apply") options.apply = true;
    else if (arg === "--module") options.moduleId = String(argv[index + 1] ?? "");
    else if (arg === "--lesson") options.lessonId = String(argv[index + 1] ?? "");
    else if (arg === "--asset") options.assetType = String(argv[index + 1] ?? "");
    else if (arg === "--limit") options.limit = Number(argv[index + 1] ?? 100);
    else if (arg === "--max-age-minutes") options.maxAgeMinutes = Number(argv[index + 1] ?? 90);
  }

  options.moduleId = options.moduleId.trim();
  options.lessonId = options.lessonId.trim();
  options.assetType = options.assetType.trim();
  options.limit = Number.isFinite(options.limit) ? Math.min(500, Math.max(1, options.limit)) : 100;
  options.maxAgeMinutes = Number.isFinite(options.maxAgeMinutes)
    ? Math.min(10080, Math.max(5, options.maxAgeMinutes))
    : 90;

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

function scopeKey(row) {
  if (!row.module_id || !row.lesson_id || !row.asset_type) {
    return null;
  }
  return `${row.module_id}::${row.lesson_id}::${row.asset_type}`;
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
  const staleCutoffIso = new Date(Date.now() - options.maxAgeMinutes * 60 * 1000).toISOString();
  const supabase = createClient(supabaseUrl, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  let staleQuery = supabase
    .from("media_generation_jobs")
    .select("id, status, asset_type, module_id, lesson_id, updated_at, metadata")
    .eq("status", "running")
    .lt("updated_at", staleCutoffIso);

  if (options.moduleId) staleQuery = staleQuery.eq("module_id", options.moduleId);
  if (options.lessonId) staleQuery = staleQuery.eq("lesson_id", options.lessonId);
  if (assetType) staleQuery = staleQuery.eq("asset_type", assetType);

  const { data: staleJobs, error: staleError } = await staleQuery
    .order("updated_at", { ascending: true })
    .limit(options.limit);

  if (staleError) {
    throw new Error(`Unable to fetch stale running media jobs: ${staleError.message}`);
  }

  if (!staleJobs || staleJobs.length === 0) {
    console.log("No stale running media jobs matched the provided filters.");
    return;
  }

  let activeQuery = supabase
    .from("media_generation_jobs")
    .select("id, asset_type, module_id, lesson_id")
    .in("status", ["queued", "running"]);

  if (options.moduleId) activeQuery = activeQuery.eq("module_id", options.moduleId);
  if (options.lessonId) activeQuery = activeQuery.eq("lesson_id", options.lessonId);
  if (assetType) activeQuery = activeQuery.eq("asset_type", assetType);

  const { data: activeJobs, error: activeError } = await activeQuery;
  if (activeError) {
    throw new Error(`Unable to fetch active media jobs: ${activeError.message}`);
  }

  const activeByScope = new Map();
  for (const row of activeJobs ?? []) {
    const key = scopeKey(row);
    if (!key) continue;
    activeByScope.set(key, (activeByScope.get(key) ?? 0) + 1);
  }

  console.log(`Stale running jobs: ${staleJobs.length}`);
  console.log(`Cutoff: updated before ${staleCutoffIso}`);
  console.log(`Mode: ${options.apply ? "apply" : "dry-run"}`);

  if (!options.apply) {
    console.log("");
    console.log("Dry-run preview (first 10 jobs):");
    for (const row of staleJobs.slice(0, 10)) {
      const ageMinutes = Math.round((Date.now() - new Date(row.updated_at).getTime()) / 60000);
      console.log(
        `- ${row.id} | ${row.module_id ?? "n/a"} | ${row.lesson_id ?? "n/a"} | ${row.asset_type} | ${ageMinutes}m stale`,
      );
    }
    console.log("");
    console.log('Use "--apply" to reset stale running jobs back to queued.');
    return;
  }

  let requeued = 0;
  let skippedDueToOtherActive = 0;
  let failedUpdates = 0;

  for (const job of staleJobs) {
    const key = scopeKey(job);
    if (key && (activeByScope.get(key) ?? 0) > 1) {
      skippedDueToOtherActive += 1;
      continue;
    }

    const previousStaleRequeueCount = Number((job.metadata ?? {}).stale_requeue_count ?? 0);
    const nowIso = new Date().toISOString();
    const ageMinutes = Math.max(1, Math.round((Date.now() - new Date(job.updated_at).getTime()) / 60000));
    const nextMetadata = {
      ...(job.metadata ?? {}),
      stale_requeue_count: Number.isFinite(previousStaleRequeueCount)
        ? previousStaleRequeueCount + 1
        : 1,
      stale_requeued_at: nowIso,
      stale_requeued_by: "requeue-stale-media-jobs-script",
      stale_requeue_reason: `running job exceeded ${options.maxAgeMinutes} minutes without update`,
      stale_age_minutes: ageMinutes,
    };

    const { error: updateError } = await supabase
      .from("media_generation_jobs")
      .update({
        status: "queued",
        error: `Automatically re-queued after ${ageMinutes} minutes in running state without updates.`,
        metadata: nextMetadata,
      })
      .eq("id", job.id)
      .eq("status", "running");

    if (updateError) {
      failedUpdates += 1;
      continue;
    }

    requeued += 1;
  }

  console.log(`Re-queued stale jobs: ${requeued}`);
  console.log(`Skipped (another active job exists for same scope): ${skippedDueToOtherActive}`);
  console.log(`Failed updates: ${failedUpdates}`);

  if (failedUpdates > 0) {
    process.exitCode = 1;
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
