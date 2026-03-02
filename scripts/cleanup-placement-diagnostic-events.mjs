import { createClient } from "@supabase/supabase-js";

const DEFAULT_MAX_AGE_DAYS = 120;
const DEFAULT_MAX_DELETE = 1000;
const MIN_MAX_AGE_DAYS = 30;
const MAX_MAX_DELETE = 50_000;

function printUsage() {
  console.log("Usage: node scripts/cleanup-placement-diagnostic-events.mjs [options]");
  console.log("");
  console.log("Options:");
  console.log("  --apply                         Delete rows (default is dry-run)");
  console.log(`  --max-age-days <n>              Minimum age of events to target (default ${DEFAULT_MAX_AGE_DAYS}, min ${MIN_MAX_AGE_DAYS})`);
  console.log(`  --max-delete <n>                Maximum rows deleted per run (default ${DEFAULT_MAX_DELETE}, max ${MAX_MAX_DELETE})`);
  console.log("  --user-id <uuid>                Optional filter by learner account user_id");
  console.log("  --profile-id <uuid>             Optional filter by learner profile_id");
  console.log("  --event-type <type>             Optional filter: diagnostic_submitted | manual_override");
  console.log("  --help                          Show this help");
}

function parseInteger(name, value) {
  const parsed = Number.parseInt(String(value), 10);
  if (!Number.isFinite(parsed)) {
    throw new Error(`Invalid ${name}: "${value}"`);
  }
  return parsed;
}

function isUuid(value) {
  return typeof value === "string" && /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
}

function parseArgs(argv) {
  const options = {
    apply: false,
    maxAgeDays: DEFAULT_MAX_AGE_DAYS,
    maxDelete: DEFAULT_MAX_DELETE,
    userId: null,
    profileId: null,
    eventType: null,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--help" || arg === "-h") {
      printUsage();
      process.exit(0);
    }
    if (arg === "--apply") {
      options.apply = true;
      continue;
    }
    if (arg === "--max-age-days") {
      options.maxAgeDays = parseInteger("max-age-days", argv[index + 1]);
      index += 1;
      continue;
    }
    if (arg === "--max-delete") {
      options.maxDelete = parseInteger("max-delete", argv[index + 1]);
      index += 1;
      continue;
    }
    if (arg === "--user-id") {
      options.userId = argv[index + 1] ?? null;
      index += 1;
      continue;
    }
    if (arg === "--profile-id") {
      options.profileId = argv[index + 1] ?? null;
      index += 1;
      continue;
    }
    if (arg === "--event-type") {
      options.eventType = argv[index + 1] ?? null;
      index += 1;
      continue;
    }

    throw new Error(`Unknown argument: ${arg}`);
  }

  if (options.maxAgeDays < MIN_MAX_AGE_DAYS) {
    throw new Error(`max-age-days must be >= ${MIN_MAX_AGE_DAYS}`);
  }
  if (options.maxDelete < 1 || options.maxDelete > MAX_MAX_DELETE) {
    throw new Error(`max-delete must be between 1 and ${MAX_MAX_DELETE}`);
  }
  if (options.userId && !isUuid(options.userId)) {
    throw new Error("user-id must be a valid UUID.");
  }
  if (options.profileId && !isUuid(options.profileId)) {
    throw new Error("profile-id must be a valid UUID.");
  }
  if (options.eventType && options.eventType !== "diagnostic_submitted" && options.eventType !== "manual_override") {
    throw new Error('event-type must be "diagnostic_submitted" or "manual_override".');
  }

  return options;
}

function applyFilters(query, options, cutoffIso) {
  let next = query.lt("created_at", cutoffIso);
  if (options.userId) {
    next = next.eq("user_id", options.userId);
  }
  if (options.profileId) {
    next = next.eq("profile_id", options.profileId);
  }
  if (options.eventType) {
    next = next.eq("event_type", options.eventType);
  }
  return next;
}

async function main() {
  try {
    const options = parseArgs(process.argv.slice(2));

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!supabaseUrl || !serviceRoleKey) {
      throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY environment variable.");
    }

    const admin = createClient(supabaseUrl, serviceRoleKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });

    const cutoffDate = new Date(Date.now() - options.maxAgeDays * 24 * 60 * 60 * 1000);
    const cutoffIso = cutoffDate.toISOString();

    const countQuery = applyFilters(
      admin
        .from("placement_diagnostic_events")
        .select("id", { count: "exact", head: true }),
      options,
      cutoffIso,
    );
    const { count, error: countError } = await countQuery;

    if (countError) {
      throw countError;
    }

    const candidateCount = count ?? 0;
    const summary = {
      mode: options.apply ? "apply" : "dry-run",
      cutoffIso,
      maxAgeDays: options.maxAgeDays,
      maxDelete: options.maxDelete,
      filters: {
        userId: options.userId,
        profileId: options.profileId,
        eventType: options.eventType,
      },
      candidateCount,
      deletedCount: 0,
      truncated: false,
      deletedIds: [],
    };

    if (!options.apply || candidateCount === 0) {
      console.log(JSON.stringify(summary, null, 2));
      return;
    }

    const fetchQuery = applyFilters(
      admin
        .from("placement_diagnostic_events")
        .select("id,created_at")
        .order("created_at", { ascending: true })
        .limit(options.maxDelete),
      options,
      cutoffIso,
    );
    const { data: rows, error: fetchError } = await fetchQuery;

    if (fetchError) {
      throw fetchError;
    }

    const ids = (rows ?? [])
      .map((row) => row.id)
      .filter((id) => typeof id === "string" && id.length > 0);

    if (ids.length === 0) {
      console.log(JSON.stringify(summary, null, 2));
      return;
    }

    const { error: deleteError } = await admin
      .from("placement_diagnostic_events")
      .delete()
      .in("id", ids);
    if (deleteError) {
      throw deleteError;
    }

    summary.deletedCount = ids.length;
    summary.deletedIds = ids;
    summary.truncated = candidateCount > ids.length;
    console.log(JSON.stringify(summary, null, 2));
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error(`cleanup-placement-diagnostic-events failed: ${message}`);
    process.exitCode = 1;
  }
}

void main();
