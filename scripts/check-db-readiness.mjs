import fs from "node:fs";
import path from "node:path";
import { createClient } from "@supabase/supabase-js";

const envPath = path.resolve(".env");
const schemaPath = path.resolve("supabase/schema.sql");
const outJson = path.resolve("public/DB-READINESS-REPORT.json");
const outMd = path.resolve("public/DB-READINESS-REPORT.md");

const requiredTables = [
  "user_profiles",
  "user_tokens",
  "parent_consents",
  "subscriptions",
  "dsar_requests",
  "user_learning_progress",
  "user_skill_mastery",
  "app_settings",
  "admin_action_logs",
  "support_tickets",
  "sales_events",
  "policy_acceptances",
  "admin_alerts",
  "admin_rate_limit_events",
  "admin_report_exports",
  "admin_approval_requests",
  "admin_alert_notifications",
  "admin_report_jobs",
  "media_generation_jobs",
];

function parseArgs(argv) {
  return {
    writeReport: argv.includes("--write-report"),
    noFail: argv.includes("--no-fail"),
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

function readValue(env, key, fallbackKey) {
  if (process.env[key]) return process.env[key];
  if (fallbackKey && process.env[fallbackKey]) return process.env[fallbackKey];
  if (env[key]) return env[key];
  if (fallbackKey && env[fallbackKey]) return env[fallbackKey];
  return "";
}

function isMissingTableError(message) {
  if (!message) return false;
  const lower = message.toLowerCase();
  return lower.includes("could not find the table") || lower.includes("relation") && lower.includes("does not exist");
}

function extractCreateTableSnippet(schemaText, tableName) {
  const pattern = new RegExp(`create table if not exists public\\.${tableName}\\s*\\([\\s\\S]*?\\);`, "i");
  const match = schemaText.match(pattern);
  return match?.[0] ?? "";
}

async function checkTable(supabase, tableName) {
  const { error } = await supabase.from(tableName).select("*", { count: "exact", head: true }).limit(1);
  if (!error) {
    return { table: tableName, status: "present", detail: "Present" };
  }
  if (isMissingTableError(error.message)) {
    return { table: tableName, status: "missing", detail: error.message };
  }
  return { table: tableName, status: "error", detail: error.message };
}

function toMarkdown(report) {
  const lines = [];
  lines.push("# Database Readiness Report");
  lines.push("");
  lines.push(`Generated: ${report.generatedAt}`);
  lines.push(`Supabase host: ${report.supabaseHost ?? "unknown"}`);
  lines.push("");
  lines.push("## Summary");
  lines.push("");
  lines.push(`- Present tables: ${report.totals.present}`);
  lines.push(`- Missing tables: ${report.totals.missing}`);
  lines.push(`- Check errors: ${report.totals.error}`);
  lines.push("");
  lines.push("## Table Status");
  lines.push("");
  lines.push("| Table | Status | Detail |");
  lines.push("|---|---|---|");
  for (const row of report.tables) {
    lines.push(`| ${row.table} | ${row.status} | ${String(row.detail).replace(/\|/g, "\\|")} |`);
  }

  if (report.missingSnippets.length > 0) {
    lines.push("");
    lines.push("## Missing Table SQL Snippets");
    lines.push("");
    lines.push("Run the full `supabase/schema.sql` to ensure constraints, triggers, indexes, and policies are all applied.");
    lines.push("");
    for (const snippet of report.missingSnippets) {
      lines.push(`### ${snippet.table}`);
      lines.push("");
      lines.push("```sql");
      lines.push(snippet.sql);
      lines.push("```");
      lines.push("");
    }
  }

  return lines.join("\n");
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const env = parseEnvFile(envPath);
  const supabaseUrl = readValue(env, "NEXT_PUBLIC_SUPABASE_URL", "EXPO_PUBLIC_SUPABASE_URL");
  const serviceKey = readValue(env, "SUPABASE_SERVICE_ROLE_KEY");

  if (!supabaseUrl || !serviceKey) {
    console.error(
      "Missing NEXT_PUBLIC_SUPABASE_URL/EXPO_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY. Cannot run DB readiness checks.",
    );
    process.exitCode = 1;
    return;
  }

  const supabase = createClient(supabaseUrl, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  const checks = [];
  for (const table of requiredTables) {
    checks.push(await checkTable(supabase, table));
  }

  const totals = {
    present: checks.filter((row) => row.status === "present").length,
    missing: checks.filter((row) => row.status === "missing").length,
    error: checks.filter((row) => row.status === "error").length,
    total: checks.length,
  };

  const schemaText = fs.existsSync(schemaPath) ? fs.readFileSync(schemaPath, "utf8") : "";
  const missingSnippets = checks
    .filter((row) => row.status === "missing")
    .map((row) => ({
      table: row.table,
      sql: extractCreateTableSnippet(schemaText, row.table),
    }))
    .filter((entry) => entry.sql.length > 0);

  const report = {
    generatedAt: new Date().toISOString(),
    supabaseHost: (() => {
      try {
        return new URL(supabaseUrl).host;
      } catch {
        return "";
      }
    })(),
    totals,
    tables: checks,
    missingSnippets,
  };

  console.log("EduForge DB readiness check");
  console.log(`Supabase host: ${report.supabaseHost || "unknown"}`);
  console.log("");
  for (const row of checks) {
    const prefix = row.status === "present" ? "[PASS]" : row.status === "missing" ? "[FAIL]" : "[WARN]";
    console.log(`${prefix} ${row.table} - ${row.detail}`);
  }
  console.log("");
  console.log(
    `Summary: ${totals.present} present / ${totals.missing} missing / ${totals.error} error (total ${totals.total})`,
  );

  if (args.writeReport) {
    fs.mkdirSync(path.dirname(outJson), { recursive: true });
    fs.writeFileSync(outJson, JSON.stringify(report, null, 2));
    fs.writeFileSync(outMd, toMarkdown(report));
    console.log(`Wrote ${outJson}`);
    console.log(`Wrote ${outMd}`);
  }

  if (!args.noFail && (totals.missing > 0 || totals.error > 0)) {
    process.exitCode = 1;
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
