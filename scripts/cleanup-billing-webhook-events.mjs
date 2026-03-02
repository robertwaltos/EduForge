#!/usr/bin/env node

import { createClient } from "@supabase/supabase-js";

const WEBHOOK_TABLES = [
  "stripe_webhook_events",
  "revenuecat_webhook_events",
];

const DEFAULT_MAX_AGE_DAYS = 120;
const MIN_MAX_AGE_DAYS = 30;
const DEFAULT_MAX_DELETE_PER_TABLE = 1000;
const MAX_MAX_DELETE_PER_TABLE = 50_000;

function printUsage() {
  console.log("Usage: node scripts/cleanup-billing-webhook-events.mjs [options]");
  console.log("");
  console.log("Options:");
  console.log("  --apply                               Delete rows (default is dry-run)");
  console.log(
    `  --max-age-days <n>                    Minimum event age to target (default ${DEFAULT_MAX_AGE_DAYS}, min ${MIN_MAX_AGE_DAYS})`,
  );
  console.log(
    `  --max-delete-per-table <n>            Maximum rows deleted per table/run (default ${DEFAULT_MAX_DELETE_PER_TABLE}, max ${MAX_MAX_DELETE_PER_TABLE})`,
  );
  console.log("  --include-failed                      Include failed rows in cleanup scope");
  console.log("  --help                                Show this help");
}

function parseInteger(name, value) {
  const parsed = Number.parseInt(String(value), 10);
  if (!Number.isFinite(parsed)) {
    throw new Error(`Invalid ${name}: "${value}"`);
  }
  return parsed;
}

function parseArgs(argv) {
  const options = {
    apply: false,
    maxAgeDays: DEFAULT_MAX_AGE_DAYS,
    maxDeletePerTable: DEFAULT_MAX_DELETE_PER_TABLE,
    includeFailed: false,
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
    if (arg === "--max-delete-per-table") {
      options.maxDeletePerTable = parseInteger("max-delete-per-table", argv[index + 1]);
      index += 1;
      continue;
    }
    if (arg === "--include-failed") {
      options.includeFailed = true;
      continue;
    }
    throw new Error(`Unknown argument: ${arg}`);
  }

  if (options.maxAgeDays < MIN_MAX_AGE_DAYS) {
    throw new Error(`max-age-days must be >= ${MIN_MAX_AGE_DAYS}`);
  }
  if (options.maxDeletePerTable < 1 || options.maxDeletePerTable > MAX_MAX_DELETE_PER_TABLE) {
    throw new Error(`max-delete-per-table must be between 1 and ${MAX_MAX_DELETE_PER_TABLE}`);
  }

  return options;
}

function isMissingTableError(message) {
  const lower = String(message ?? "").toLowerCase();
  return (
    lower.includes("could not find the table")
    || (lower.includes("relation") && lower.includes("does not exist"))
  );
}

function applyFilters(query, cutoffIso, includeFailed) {
  const statuses = includeFailed ? ["processed", "failed"] : ["processed"];
  return query
    .lt("updated_at", cutoffIso)
    .in("status", statuses);
}

async function summarizeTable({ admin, table, cutoffIso, includeFailed }) {
  const { count, error } = await applyFilters(
    admin.from(table).select("event_id", { count: "exact", head: true }),
    cutoffIso,
    includeFailed,
  );

  if (error) {
    if (isMissingTableError(error.message)) {
      return {
        table,
        available: false,
        note: "Table is unavailable via Supabase API.",
        candidateCount: 0,
      };
    }
    throw error;
  }

  return {
    table,
    available: true,
    candidateCount: Number(count ?? 0),
  };
}

async function deleteFromTable({
  admin,
  table,
  cutoffIso,
  includeFailed,
  maxDeletePerTable,
}) {
  const { data: rows, error: fetchError } = await applyFilters(
    admin
      .from(table)
      .select("event_id, updated_at, status")
      .order("updated_at", { ascending: true })
      .limit(maxDeletePerTable),
    cutoffIso,
    includeFailed,
  );

  if (fetchError) {
    throw fetchError;
  }

  const eventIds = (rows ?? [])
    .map((row) => row.event_id)
    .filter((eventId) => typeof eventId === "string" && eventId.length > 0);

  if (eventIds.length === 0) {
    return {
      deletedCount: 0,
      deletedEventIds: [],
    };
  }

  const { error: deleteError } = await admin
    .from(table)
    .delete()
    .in("event_id", eventIds);
  if (deleteError) {
    throw deleteError;
  }

  return {
    deletedCount: eventIds.length,
    deletedEventIds: eventIds,
  };
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

    const summary = {
      mode: options.apply ? "apply" : "dry-run",
      cutoffIso,
      maxAgeDays: options.maxAgeDays,
      maxDeletePerTable: options.maxDeletePerTable,
      includeFailed: options.includeFailed,
      tables: [],
      totals: {
        candidateCount: 0,
        deletedCount: 0,
      },
    };

    for (const table of WEBHOOK_TABLES) {
      const tableSummary = await summarizeTable({
        admin,
        table,
        cutoffIso,
        includeFailed: options.includeFailed,
      });

      const nextTable = {
        table,
        available: tableSummary.available,
        note: tableSummary.note ?? null,
        candidateCount: tableSummary.candidateCount,
        deletedCount: 0,
        truncated: false,
        deletedEventIds: [],
      };

      summary.totals.candidateCount += tableSummary.candidateCount;

      if (options.apply && tableSummary.available && tableSummary.candidateCount > 0) {
        const deletion = await deleteFromTable({
          admin,
          table,
          cutoffIso,
          includeFailed: options.includeFailed,
          maxDeletePerTable: options.maxDeletePerTable,
        });

        nextTable.deletedCount = deletion.deletedCount;
        nextTable.deletedEventIds = deletion.deletedEventIds;
        nextTable.truncated = tableSummary.candidateCount > deletion.deletedCount;
        summary.totals.deletedCount += deletion.deletedCount;
      }

      summary.tables.push(nextTable);
    }

    console.log(JSON.stringify(summary, null, 2));
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error(`cleanup-billing-webhook-events failed: ${message}`);
    process.exitCode = 1;
  }
}

void main();
