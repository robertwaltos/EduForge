import fs from "node:fs/promises";
import path from "node:path";
import Link from "next/link";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

function monthKeyFromDate(date: Date) {
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  return `${year}-${month}`;
}

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

function formatAgeFromIso(isoTimestamp: string | null) {
  if (!isoTimestamp) return "n/a";
  const createdAt = new Date(isoTimestamp);
  if (Number.isNaN(createdAt.getTime())) return "n/a";

  const diffMs = Date.now() - createdAt.getTime();
  if (diffMs < 0) return "<1m";

  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  if (diffMinutes < 60) {
    return `${diffMinutes}m`;
  }

  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours < 24) {
    return `${diffHours}h`;
  }

  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays}d`;
}

export default async function AdminOverviewPage() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    redirect("/auth/sign-in");
  }

  const { data: profile } = await supabase
    .from("user_profiles")
    .select("is_admin")
    .eq("user_id", user.id)
    .maybeSingle();

  if (!profile?.is_admin) {
    return (
      <main className="mx-auto flex w-full max-w-4xl flex-col items-center justify-center gap-4 px-6 py-24">
        <h1 className="text-2xl font-semibold">Access Denied</h1>
        <p className="text-sm text-red-600">You must be an administrator to access the overview.</p>
      </main>
    );
  }

  const admin = createSupabaseAdminClient();
  const currentMonth = monthKeyFromDate(new Date());
  const dsarCutoffDate = new Date();
  dsarCutoffDate.setUTCDate(dsarCutoffDate.getUTCDate() - 7);
  const dsarCutoff = dsarCutoffDate.toISOString();
  const mediaDayCutoffDate = new Date();
  mediaDayCutoffDate.setUTCHours(mediaDayCutoffDate.getUTCHours() - 24);
  const mediaDayCutoff = mediaDayCutoffDate.toISOString();
  const projectRoot = process.cwd();
  const qualityReportPath = path.join(projectRoot, "public", "CURRICULUM-QUALITY-REPORT.json");
  const promptPackPath = path.join(projectRoot, "public", "LESSON-MEDIA-PROMPT-PACK.json");

  const [
    supportCountsResult,
    dsarBacklogResult,
    mediaQueueResult,
    mediaCompleted24hResult,
    mediaFailed24hResult,
    mediaOldestQueuedResult,
    alertsResult,
    approvalsResult,
    currentMonthTokensResult,
    mediaSlaSettingsResult,
    qualityReportRaw,
    promptPackRaw,
  ] = await Promise.all([
    admin
      .from("support_tickets")
      .select("status, priority", { count: "exact" }),
    admin
      .from("dsar_requests")
      .select("id", { count: "exact", head: true })
      .in("status", ["pending", "in_progress"])
      .lt("requested_at", dsarCutoff),
    admin
      .from("media_generation_jobs")
      .select("status", { count: "exact" })
      .in("status", ["queued", "running"]),
    admin
      .from("media_generation_jobs")
      .select("id", { count: "exact", head: true })
      .eq("status", "completed")
      .gte("completed_at", mediaDayCutoff),
    admin
      .from("media_generation_jobs")
      .select("id", { count: "exact", head: true })
      .eq("status", "failed")
      .gte("completed_at", mediaDayCutoff),
    admin
      .from("media_generation_jobs")
      .select("created_at")
      .eq("status", "queued")
      .order("created_at", { ascending: true })
      .limit(1)
      .maybeSingle(),
    admin
      .from("admin_alerts")
      .select("id", { count: "exact", head: true })
      .eq("acknowledged", false),
    admin
      .from("admin_approval_requests")
      .select("id", { count: "exact", head: true })
      .eq("status", "pending"),
    admin
      .from("user_tokens")
      .select("user_id, spent_usd")
      .eq("month_key", currentMonth),
    admin
      .from("app_settings")
      .select("key, value")
      .in("key", [
        "media_queue_sla_stale_hours",
        "media_queue_sla_backlog_limit",
        "media_queue_sla_failure_24h_limit",
        "report_queue_sla_stale_hours",
        "report_queue_sla_backlog_limit",
        "report_queue_sla_failure_24h_limit",
      ]),
    fs.readFile(qualityReportPath, "utf8").catch(() => '{"totals":{"averageScore":0,"modules":0}}'),
    fs.readFile(promptPackPath, "utf8").catch(() => '{"totals":{"lessons":0}}'),
  ]);

  const qualityReport = JSON.parse(qualityReportRaw) as {
    totals?: { averageScore?: number; modules?: number };
  };
  const promptPack = JSON.parse(promptPackRaw) as {
    totals?: { lessons?: number };
  };

  const supportRows = supportCountsResult.data ?? [];
  const openTickets = supportRows.filter((row) => row.status === "open" || row.status === "in_progress").length;
  const urgentTickets = supportRows.filter((row) => row.priority === "urgent" && (row.status === "open" || row.status === "in_progress")).length;

  const tokens = currentMonthTokensResult.data ?? [];
  const totalCost = tokens.reduce((acc, row) => acc + Number(row.spent_usd ?? 0), 0);
  const activeUsers = new Set(tokens.map((row) => row.user_id)).size;
  const avgCostPerUser = activeUsers > 0 ? totalCost / activeUsers : 0;
  const oldestQueuedAge = formatAgeFromIso(mediaOldestQueuedResult.data?.created_at ?? null);
  const mediaCompleted24h = mediaCompleted24hResult.count ?? 0;
  const mediaFailed24h = mediaFailed24hResult.count ?? 0;
  const mediaSettingsMap = new Map((mediaSlaSettingsResult.data ?? []).map((row) => [row.key, row.value]));
  const staleHoursThreshold = Math.max(
    1,
    readNumericSetting(mediaSettingsMap.get("media_queue_sla_stale_hours"), 6),
  );
  const backlogThreshold = Math.max(
    1,
    readNumericSetting(mediaSettingsMap.get("media_queue_sla_backlog_limit"), 30),
  );
  const failure24hThreshold = Math.max(
    1,
    readNumericSetting(mediaSettingsMap.get("media_queue_sla_failure_24h_limit"), 20),
  );
  const reportStaleHoursThreshold = Math.max(
    1,
    readNumericSetting(mediaSettingsMap.get("report_queue_sla_stale_hours"), 6),
  );
  const reportBacklogThreshold = Math.max(
    1,
    readNumericSetting(mediaSettingsMap.get("report_queue_sla_backlog_limit"), 15),
  );
  const reportFailure24hThreshold = Math.max(
    1,
    readNumericSetting(mediaSettingsMap.get("report_queue_sla_failure_24h_limit"), 10),
  );
  const staleCutoffDate = new Date();
  staleCutoffDate.setUTCHours(staleCutoffDate.getUTCHours() - staleHoursThreshold);
  const staleCutoffIso = staleCutoffDate.toISOString();
  const { count: mediaStaleCountRaw } = await admin
    .from("media_generation_jobs")
    .select("id", { count: "exact", head: true })
    .in("status", ["queued", "running"])
    .lt("created_at", staleCutoffIso);
  const mediaStaleCount = mediaStaleCountRaw ?? 0;
  const mediaBacklogCount = mediaQueueResult.count ?? 0;
  const slaBreaches = [
    mediaStaleCount > 0,
    mediaBacklogCount >= backlogThreshold,
    mediaFailed24h >= failure24hThreshold,
  ].filter(Boolean).length;
  const mediaSlaSummary = `Stale ${mediaStaleCount}/${staleHoursThreshold}h | backlog ${mediaBacklogCount}/${backlogThreshold} | failed24h ${mediaFailed24h}/${failure24hThreshold}`;

  const reportStaleCutoffDate = new Date();
  reportStaleCutoffDate.setUTCHours(reportStaleCutoffDate.getUTCHours() - reportStaleHoursThreshold);
  const reportStaleCutoffIso = reportStaleCutoffDate.toISOString();
  const [reportQueuedReadyResult, reportRunningResult, reportQueuedStaleResult, reportRunningStaleResult, reportFailed24hResult, reportOldestQueuedReadyResult, reportOldestRunningResult] = await Promise.all([
    admin
      .from("admin_report_jobs")
      .select("id", { count: "exact", head: true })
      .eq("status", "queued")
      .lte("run_after", new Date().toISOString()),
    admin
      .from("admin_report_jobs")
      .select("id", { count: "exact", head: true })
      .eq("status", "running"),
    admin
      .from("admin_report_jobs")
      .select("id", { count: "exact", head: true })
      .eq("status", "queued")
      .lt("run_after", reportStaleCutoffIso),
    admin
      .from("admin_report_jobs")
      .select("id", { count: "exact", head: true })
      .eq("status", "running")
      .lt("created_at", reportStaleCutoffIso),
    admin
      .from("admin_report_jobs")
      .select("id", { count: "exact", head: true })
      .eq("status", "failed")
      .gte("completed_at", mediaDayCutoff),
    admin
      .from("admin_report_jobs")
      .select("run_after")
      .eq("status", "queued")
      .lte("run_after", new Date().toISOString())
      .order("run_after", { ascending: true })
      .limit(1)
      .maybeSingle(),
    admin
      .from("admin_report_jobs")
      .select("started_at, created_at")
      .eq("status", "running")
      .order("created_at", { ascending: true })
      .limit(1)
      .maybeSingle(),
  ]);
  const reportQueuedReadyCount = reportQueuedReadyResult.count ?? 0;
  const reportRunningCount = reportRunningResult.count ?? 0;
  const reportBacklogCount = reportQueuedReadyCount + reportRunningCount;
  const reportQueuedStaleCount = reportQueuedStaleResult.count ?? 0;
  const reportRunningStaleCount = reportRunningStaleResult.count ?? 0;
  const reportStaleCount = reportQueuedStaleCount + reportRunningStaleCount;
  const reportFailed24h = reportFailed24hResult.count ?? 0;
  const oldestReportQueuedAge = formatAgeFromIso(reportOldestQueuedReadyResult.data?.run_after ?? null);
  const oldestReportRunningSource =
    reportOldestRunningResult.data?.started_at ?? reportOldestRunningResult.data?.created_at ?? null;
  const oldestReportRunningAge = formatAgeFromIso(oldestReportRunningSource);
  const reportSlaBreaches = [
    reportStaleCount > 0,
    reportBacklogCount >= reportBacklogThreshold,
    reportFailed24h >= reportFailure24hThreshold,
  ].filter(Boolean).length;
  const reportSlaSummary = `Stale ${reportStaleCount}/${reportStaleHoursThreshold}h | backlog ${reportBacklogCount}/${reportBacklogThreshold} | failed24h ${reportFailed24h}/${reportFailure24hThreshold}`;

  const cards = [
    {
      title: "Open Support Tickets",
      value: String(openTickets),
      subtext: `Urgent: ${urgentTickets}`,
      href: "/admin/operations",
    },
    {
      title: "DSAR Backlog (>7 days)",
      value: String(dsarBacklogResult.count ?? 0),
      subtext: "Pending + in progress",
      href: "/admin/compliance",
    },
    {
      title: "Media Queue Load",
      value: String(mediaQueueResult.count ?? 0),
      subtext: `Queued/running jobs · oldest queued ${oldestQueuedAge}`,
      href: "/admin/media",
    },
    {
      title: "Media Throughput (24h)",
      value: String(mediaCompleted24h),
      subtext: `Completed jobs · failed ${mediaFailed24h}`,
      href: "/admin/media",
    },
    {
      title: "Media SLA Status",
      value: slaBreaches === 0 ? "OK" : `${slaBreaches} breach${slaBreaches === 1 ? "" : "es"}`,
      subtext: mediaSlaSummary,
      href: "/admin/alerts",
    },
    {
      title: "Report Queue Load",
      value: String(reportBacklogCount),
      subtext: `Queued-ready ${reportQueuedReadyCount} · running ${reportRunningCount} · oldest queued ${oldestReportQueuedAge} · oldest running ${oldestReportRunningAge}`,
      href: "/admin/reports",
    },
    {
      title: "Report SLA Status",
      value: reportSlaBreaches === 0 ? "OK" : `${reportSlaBreaches} breach${reportSlaBreaches === 1 ? "" : "es"}`,
      subtext: reportSlaSummary,
      href: "/admin/alerts",
    },
    {
      title: "Unacknowledged Alerts",
      value: String(alertsResult.count ?? 0),
      subtext: "Operational alerts",
      href: "/admin/alerts",
    },
    {
      title: "Pending Approvals",
      value: String(approvalsResult.count ?? 0),
      subtext: "High-impact actions awaiting review",
      href: "/admin/operations",
    },
    {
      title: "Current Month Spend",
      value: `$${totalCost.toFixed(2)}`,
      subtext: `Avg/user: $${avgCostPerUser.toFixed(4)}`,
      href: "/admin/costs",
    },
    {
      title: "Curriculum Quality Score",
      value: String(qualityReport.totals?.averageScore ?? 0),
      subtext: `Across ${qualityReport.totals?.modules ?? 0} modules`,
      href: "/admin/curriculum",
    },
    {
      title: "Lesson Prompt Coverage",
      value: String(promptPack.totals?.lessons ?? 0),
      subtext: "Lessons with generated media prompts",
      href: "/admin/media",
    },
  ];

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-12">
      <header>
        <h1 className="text-3xl font-semibold tracking-tight">Admin Overview</h1>
        <p className="mt-2 text-sm text-zinc-600">
          Operational command center for the current platform state.
        </p>
      </header>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => (
          <Link
            key={card.title}
            href={card.href}
            className="rounded-xl border border-black/10 bg-white p-5 shadow-sm transition hover:shadow"
          >
            <p className="text-xs uppercase tracking-wide text-zinc-500">{card.title}</p>
            <p className="mt-2 text-3xl font-bold text-zinc-900">{card.value}</p>
            <p className="mt-1 text-xs text-zinc-500">{card.subtext}</p>
          </Link>
        ))}
      </section>

      <section className="rounded-xl border border-black/10 bg-white p-5 shadow-sm">
        <h2 className="text-lg font-semibold">Quick Actions</h2>
        <div className="mt-3 flex flex-wrap gap-2 text-sm">
          <Link href="/admin/alerts" className="rounded-md border border-black/15 px-3 py-2 hover:bg-black/5">
            Review Alerts
          </Link>
          <Link href="/admin/media" className="rounded-md border border-black/15 px-3 py-2 hover:bg-black/5">
            Process Media Queue
          </Link>
          <Link href="/admin/compliance" className="rounded-md border border-black/15 px-3 py-2 hover:bg-black/5">
            Review DSAR/Compliance
          </Link>
          <Link href="/admin/reports" className="rounded-md border border-black/15 px-3 py-2 hover:bg-black/5">
            Export Reports
          </Link>
        </div>
      </section>
    </main>
  );
}
