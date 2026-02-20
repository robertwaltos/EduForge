import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import ReportsClient from "./reports-client";

export const dynamic = "force-dynamic";

function coerceNumber(value: unknown) {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string") {
    const parsed = Number(value);
    if (Number.isFinite(parsed)) return parsed;
  }
  return null;
}

function readNumericSetting(value: unknown, fallback: number) {
  const direct = coerceNumber(value);
  if (direct !== null) return direct;
  if (value && typeof value === "object" && "value" in value) {
    const nested = coerceNumber((value as { value?: unknown }).value);
    if (nested !== null) return nested;
  }
  return fallback;
}

export default async function AdminReportsPage() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    redirect("/auth/sign-in");
  }

  const { data: profile, error: profileError } = await supabase
    .from("user_profiles")
    .select("is_admin")
    .eq("user_id", user.id)
    .maybeSingle();

  if (profileError || !profile?.is_admin) {
    return (
      <main className="mx-auto flex w-full max-w-4xl flex-col items-center justify-center gap-4 px-6 py-24">
        <h1 className="text-2xl font-semibold">Access Denied</h1>
        <p className="text-sm text-red-600">You must be an administrator to access reports.</p>
      </main>
    );
  }

  const admin = createSupabaseAdminClient();
  const currentTime = new Date();
  const nowIso = currentTime.toISOString();
  const failure24hCutoff = new Date(currentTime.getTime() - 24 * 60 * 60 * 1000).toISOString();

  const [exportHistoryResult, jobsResult, settingsResult] = await Promise.all([
    admin
      .from("admin_report_exports")
      .select("id, report_type, row_count, checksum_sha256, created_at, completed_at")
      .order("created_at", { ascending: false })
      .limit(50),
    admin
      .from("admin_report_jobs")
      .select("id, report_type, status, run_after, created_at, started_at, completed_at, error")
      .order("created_at", { ascending: false })
      .limit(50),
    admin
      .from("app_settings")
      .select("key, value")
      .in("key", [
        "report_queue_sla_stale_hours",
        "report_queue_sla_backlog_limit",
        "report_queue_sla_failure_24h_limit",
      ]),
  ]);

  const settingsMap = new Map((settingsResult.data ?? []).map((entry) => [entry.key, entry.value]));
  const staleHoursThreshold = Math.max(
    1,
    readNumericSetting(settingsMap.get("report_queue_sla_stale_hours"), 6),
  );
  const backlogThreshold = Math.max(
    1,
    readNumericSetting(settingsMap.get("report_queue_sla_backlog_limit"), 15),
  );
  const failure24hThreshold = Math.max(
    1,
    readNumericSetting(settingsMap.get("report_queue_sla_failure_24h_limit"), 10),
  );

  const staleCutoffIso = new Date(currentTime.getTime() - staleHoursThreshold * 60 * 60 * 1000).toISOString();
  const [
    queuedReadyResult,
    runningResult,
    staleQueuedResult,
    staleRunningResult,
    failed24hResult,
  ] = await Promise.all([
    admin
      .from("admin_report_jobs")
      .select("id", { count: "exact", head: true })
      .eq("status", "queued")
      .lte("run_after", nowIso),
    admin
      .from("admin_report_jobs")
      .select("id", { count: "exact", head: true })
      .eq("status", "running"),
    admin
      .from("admin_report_jobs")
      .select("id", { count: "exact", head: true })
      .eq("status", "queued")
      .lt("run_after", staleCutoffIso),
    admin
      .from("admin_report_jobs")
      .select("id", { count: "exact", head: true })
      .eq("status", "running")
      .lt("created_at", staleCutoffIso),
    admin
      .from("admin_report_jobs")
      .select("id", { count: "exact", head: true })
      .eq("status", "failed")
      .gte("completed_at", failure24hCutoff),
  ]);

  const queuedReadyCount = queuedReadyResult.count ?? 0;
  const runningCount = runningResult.count ?? 0;
  const staleCount = (staleQueuedResult.count ?? 0) + (staleRunningResult.count ?? 0);
  const failed24hCount = failed24hResult.count ?? 0;
  const backlogCount = queuedReadyCount + runningCount;
  const slaBreaches = [
    staleCount > 0,
    backlogCount >= backlogThreshold,
    failed24hCount >= failure24hThreshold,
  ].filter(Boolean).length;

  const exportHistory = exportHistoryResult.data ?? [];
  const jobs = jobsResult.data ?? [];

  return (
    <main className="mx-auto flex w-full max-w-4xl flex-col gap-6 px-6 py-12">
      <header>
        <h1 className="text-3xl font-semibold tracking-tight">Admin Reports</h1>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
          Export operational records as CSV for audits, legal workflows, and finance reconciliation.
        </p>
      </header>

      <section className="rounded-lg border border-black/10 bg-white p-5 dark:border-white/15 dark:bg-zinc-900">
        <h2 className="text-lg font-semibold">Queue Health</h2>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
          queued-ready={queuedReadyCount} | running={runningCount} | stale={staleCount}/{staleHoursThreshold}h |
          failed24h={failed24hCount}/{failure24hThreshold} | backlog={backlogCount}/{backlogThreshold}
        </p>
        <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
          SLA status: {slaBreaches === 0 ? "OK" : `${slaBreaches} breach${slaBreaches === 1 ? "" : "es"}`}
        </p>
      </section>

      <section className="rounded-lg border border-black/10 bg-white p-5 dark:border-white/15 dark:bg-zinc-900">
        <ul className="space-y-3">
          <li>
            <a href="/api/admin/reports/dsar" className="text-sm font-medium underline">
              Download DSAR Report (CSV)
            </a>
          </li>
          <li>
            <a href="/api/admin/reports/support" className="text-sm font-medium underline">
              Download Support Tickets Report (CSV)
            </a>
          </li>
          <li>
            <a href="/api/admin/reports/audit" className="text-sm font-medium underline">
              Download Admin Audit Report (CSV)
            </a>
          </li>
        </ul>
      </section>

      <section className="rounded-lg border border-black/10 bg-white p-5 dark:border-white/15 dark:bg-zinc-900">
        <h2 className="text-lg font-semibold">Recent Export History</h2>
        <div className="mt-3 space-y-2">
          {(exportHistory ?? []).map((entry) => (
            <article key={entry.id} className="rounded-md border border-black/10 p-3 text-sm dark:border-white/10">
              <p className="font-medium">
                {entry.report_type} ({entry.row_count} rows)
              </p>
              <p className="text-xs text-zinc-500">
                Created {new Date(entry.created_at).toLocaleString()}
              </p>
              {entry.completed_at ? (
                <p className="text-xs text-zinc-500">
                  Completed {new Date(entry.completed_at).toLocaleString()}
                </p>
              ) : null}
              <p className="mt-1 break-all text-xs text-zinc-500">
                SHA256: {entry.checksum_sha256 ?? "n/a"}
              </p>
            </article>
          ))}
          {exportHistory.length === 0 ? (
            <p className="text-sm text-zinc-500">No export history yet.</p>
          ) : null}
        </div>
      </section>

      <ReportsClient initialJobs={jobs} />
    </main>
  );
}
