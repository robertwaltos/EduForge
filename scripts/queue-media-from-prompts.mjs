import fs from "node:fs";
import path from "node:path";
import { createClient } from "@supabase/supabase-js";

const promptPackPath = path.resolve("public/LESSON-MEDIA-PROMPT-PACK.json");
const envPath = path.resolve(".env");

function parseArgs(argv) {
  const options = {
    apply: false,
    asset: "all",
    moduleId: "",
    lessonId: "",
    limit: 200,
    createdBy: "",
  };
  const positional = [];

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--apply") options.apply = true;
    else if (arg === "--asset") options.asset = String(argv[index + 1] ?? "all");
    else if (arg === "--module") options.moduleId = String(argv[index + 1] ?? "");
    else if (arg === "--lesson") options.lessonId = String(argv[index + 1] ?? "");
    else if (arg === "--limit") options.limit = Number(argv[index + 1] ?? 200);
    else if (arg === "--created-by") options.createdBy = String(argv[index + 1] ?? "");
    else if (!arg.startsWith("--")) positional.push(arg);
  }

  if (positional.length > 0 && options.asset === "all") {
    options.asset = positional[0];
  }
  if (positional.length > 1 && Number.isFinite(Number(positional[1])) && options.limit === 200) {
    options.limit = Number(positional[1]);
  }

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

function loadPromptPack() {
  if (!fs.existsSync(promptPackPath)) {
    throw new Error(`Missing ${promptPackPath}. Run "npm run prompts:lesson-media" first.`);
  }
  return JSON.parse(fs.readFileSync(promptPackPath, "utf8"));
}

function resolvePrompt(lesson, assetType) {
  if (assetType === "video") return lesson.prompts.seedanceVideo;
  if (assetType === "animation") return lesson.prompts.seedanceAnimation;
  return lesson.prompts.lessonImage;
}

function assetTypesFromOption(option) {
  if (option === "all") return ["video", "animation", "image"];
  if (["video", "animation", "image"].includes(option)) return [option];
  throw new Error(`Invalid --asset value "${option}". Use video|animation|image|all.`);
}

function flattenCandidates(promptPack, options) {
  const assetTypes = assetTypesFromOption(options.asset);
  const candidates = [];

  for (const moduleEntry of promptPack.modules ?? []) {
    if (options.moduleId && moduleEntry.moduleId !== options.moduleId) continue;
    for (const lesson of moduleEntry.lessons ?? []) {
      if (options.lessonId && lesson.lessonId !== options.lessonId) continue;
      for (const assetType of assetTypes) {
        candidates.push({
          moduleId: moduleEntry.moduleId,
          lessonId: lesson.lessonId,
          assetType,
          provider: "seedance",
          prompt: resolvePrompt(lesson, assetType),
        });
      }
    }
  }

  return candidates.slice(0, Math.max(1, options.limit));
}

function buildKey(moduleId, lessonId, assetType) {
  return `${moduleId}::${lessonId}::${assetType}`;
}

async function resolveCreatedByUserId(supabase, explicitUserId) {
  if (explicitUserId) return explicitUserId;

  const { data, error } = await supabase
    .from("user_profiles")
    .select("user_id")
    .eq("is_admin", true)
    .limit(1)
    .maybeSingle();

  if (error) {
    throw new Error(`Unable to resolve admin user: ${error.message}`);
  }
  if (!data?.user_id) {
    throw new Error(
      'No admin user found. Pass "--created-by <admin-user-uuid>" or create an admin profile first.',
    );
  }
  return data.user_id;
}

async function fetchExistingKeys(supabase, assetTypes) {
  const { data, error } = await supabase
    .from("media_generation_jobs")
    .select("module_id, lesson_id, asset_type, status")
    .in("asset_type", assetTypes)
    .in("status", ["queued", "running", "completed"]);

  if (error) {
    if (error.message.includes("Could not find the table")) {
      throw new Error(
        "Unable to query media_generation_jobs table. Run the latest supabase/schema.sql migrations first.",
      );
    }
    throw new Error(`Unable to query existing media jobs: ${error.message}`);
  }

  const existing = new Set();
  for (const row of data ?? []) {
    if (!row.module_id || !row.lesson_id || !row.asset_type) continue;
    existing.add(buildKey(row.module_id, row.lesson_id, row.asset_type));
  }
  return existing;
}

async function insertRows(supabase, rows) {
  if (rows.length === 0) return;
  const chunkSize = 100;

  for (let index = 0; index < rows.length; index += chunkSize) {
    const batch = rows.slice(index, index + chunkSize);
    const { error } = await supabase.from("media_generation_jobs").insert(batch);
    if (error) {
      throw new Error(`Insert failed: ${error.message}`);
    }
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

  const promptPack = loadPromptPack();
  const candidates = flattenCandidates(promptPack, options);
  const assetTypes = assetTypesFromOption(options.asset);

  if (candidates.length === 0) {
    console.log("No candidates matched the filter criteria.");
    return;
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  let existingKeys;
  try {
    existingKeys = await fetchExistingKeys(supabase, assetTypes);
  } catch (error) {
    if (
      !options.apply &&
      error instanceof Error &&
      error.message.includes("media_generation_jobs table")
    ) {
      console.warn(`[WARN] ${error.message}`);
      console.warn("[WARN] Continuing dry-run with an empty existing-job set.");
      existingKeys = new Set();
    } else {
      throw error;
    }
  }

  const rowsToQueue = [];
  const duplicates = [];

  for (const candidate of candidates) {
    const key = buildKey(candidate.moduleId, candidate.lessonId, candidate.assetType);
    if (existingKeys.has(key)) {
      duplicates.push(candidate);
      continue;
    }
    rowsToQueue.push(candidate);
  }

  console.log(`Candidates scanned: ${candidates.length}`);
  console.log(`Already existing jobs: ${duplicates.length}`);
  console.log(`New queue candidates: ${rowsToQueue.length}`);
  console.log(`Mode: ${options.apply ? "apply" : "dry-run"}`);

  if (!options.apply) {
    console.log("");
    console.log("Dry-run preview (first 10 rows):");
    for (const preview of rowsToQueue.slice(0, 10)) {
      console.log(
        `- ${preview.moduleId} | ${preview.lessonId} | ${preview.assetType} | ${preview.provider}`,
      );
    }
    console.log("");
    console.log('Use "--apply" to write queued jobs to Supabase.');
    return;
  }

  const createdBy = await resolveCreatedByUserId(supabase, options.createdBy);
  const nowIso = new Date().toISOString();
  const insertRowsPayload = rowsToQueue.map((candidate) => ({
    created_by: createdBy,
    module_id: candidate.moduleId,
    lesson_id: candidate.lessonId,
    asset_type: candidate.assetType,
    provider: candidate.provider,
    prompt: candidate.prompt,
    status: "queued",
    metadata: {
      source: "LESSON-MEDIA-PROMPT-PACK",
      queued_at: nowIso,
    },
  }));

  await insertRows(supabase, insertRowsPayload);
  console.log(`Inserted ${insertRowsPayload.length} media_generation_jobs row(s).`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
