import fs from "node:fs";
import path from "node:path";
import { createClient } from "@supabase/supabase-js";

const envPath = path.resolve(".env");

function parseArgs(argv) {
  const options = {
    moduleId: "",
    lessonId: "",
    assetType: "",
    limit: 50,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--module") options.moduleId = String(argv[index + 1] ?? "");
    else if (arg === "--lesson") options.lessonId = String(argv[index + 1] ?? "");
    else if (arg === "--asset") options.assetType = String(argv[index + 1] ?? "");
    else if (arg === "--limit") options.limit = Number(argv[index + 1] ?? 50);
  }

  options.moduleId = options.moduleId.trim();
  options.lessonId = options.lessonId.trim();
  options.assetType = options.assetType.trim();
  options.limit = Number.isFinite(options.limit) ? Math.min(200, Math.max(1, options.limit)) : 50;

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
  if (!value) return "";
  if (["video", "animation", "image"].includes(value)) return value;
  throw new Error(`Invalid asset type "${value}". Use video|animation|image.`);
}

function buildSimulatedOutputUrl(assetType, moduleId, lessonId) {
  if (assetType === "video") {
    const token = [moduleId, lessonId].filter(Boolean).join("-").replace(/[^a-zA-Z0-9_-]/g, "");
    return token ? `/placeholders/video-placeholder.svg?token=${token}` : "/placeholders/video-placeholder.svg";
  }

  if (assetType === "animation") {
    const token = [moduleId, lessonId].filter(Boolean).join("-").replace(/[^a-zA-Z0-9_-]/g, "");
    return token
      ? `/placeholders/animation-placeholder.svg?token=${token}`
      : "/placeholders/animation-placeholder.svg";
  }

  const token = [moduleId, lessonId].filter(Boolean).join("-").replace(/[^a-zA-Z0-9_-]/g, "");
  return token ? `/placeholders/lesson-robot.svg?token=${token}` : "/placeholders/lesson-robot.svg";
}

async function processJob(supabase, job) {
  const runningAt = new Date().toISOString();

  const runningPayload = {
    status: "running",
    error: null,
    metadata: {
      ...(job.metadata ?? {}),
      runner: "media-process-script",
      started_at: runningAt,
    },
  };

  const { error: runningError } = await supabase
    .from("media_generation_jobs")
    .update(runningPayload)
    .eq("id", job.id);

  if (runningError) {
    return { id: job.id, status: "failed", error: runningError.message };
  }

  const completedAt = new Date().toISOString();
  const outputUrl = buildSimulatedOutputUrl(job.asset_type, job.module_id, job.lesson_id);
  const completedPayload = {
    status: "completed",
    output_url: outputUrl,
    error: null,
    completed_at: completedAt,
    metadata: {
      ...(job.metadata ?? {}),
      runner: "media-process-script",
      completed_at: completedAt,
      processed_provider: job.provider || "seedance",
    },
  };

  const { error: completedError } = await supabase
    .from("media_generation_jobs")
    .update(completedPayload)
    .eq("id", job.id);

  if (completedError) {
    await supabase
      .from("media_generation_jobs")
      .update({
        status: "failed",
        error: completedError.message,
        completed_at: completedAt,
        metadata: {
          ...(job.metadata ?? {}),
          runner: "media-process-script",
          failed_at: completedAt,
        },
      })
      .eq("id", job.id);

    return { id: job.id, status: "failed", error: completedError.message };
  }

  return { id: job.id, status: "completed", outputUrl };
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

  const supabase = createClient(supabaseUrl, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  let query = supabase
    .from("media_generation_jobs")
    .select("id, asset_type, module_id, lesson_id, provider, metadata")
    .eq("status", "queued");

  if (options.moduleId) query = query.eq("module_id", options.moduleId);
  if (options.lessonId) query = query.eq("lesson_id", options.lessonId);
  if (assetType) query = query.eq("asset_type", assetType);

  const { data: queuedJobs, error: fetchError } = await query.order("created_at", { ascending: true }).limit(options.limit);
  if (fetchError) {
    throw new Error(`Unable to fetch queued media jobs: ${fetchError.message}`);
  }

  if (!queuedJobs || queuedJobs.length === 0) {
    console.log("No queued media jobs matched the provided filters.");
    return;
  }

  const results = [];
  for (const job of queuedJobs) {
    const result = await processJob(supabase, job);
    results.push(result);
  }

  const completedCount = results.filter((item) => item.status === "completed").length;
  const failedCount = results.filter((item) => item.status === "failed").length;

  console.log(`Processed: ${results.length}`);
  console.log(`Completed: ${completedCount}`);
  console.log(`Failed: ${failedCount}`);

  if (failedCount > 0) {
    console.log("");
    console.log("Failed jobs:");
    for (const failure of results.filter((item) => item.status === "failed")) {
      console.log(`- ${failure.id}: ${failure.error}`);
    }
    process.exitCode = 1;
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
