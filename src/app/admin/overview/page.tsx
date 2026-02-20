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

  const [
    supportCountsResult,
    dsarBacklogResult,
    mediaQueueResult,
    alertsResult,
    approvalsResult,
    currentMonthTokensResult,
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
  ]);

  const supportRows = supportCountsResult.data ?? [];
  const openTickets = supportRows.filter((row) => row.status === "open" || row.status === "in_progress").length;
  const urgentTickets = supportRows.filter((row) => row.priority === "urgent" && (row.status === "open" || row.status === "in_progress")).length;

  const tokens = currentMonthTokensResult.data ?? [];
  const totalCost = tokens.reduce((acc, row) => acc + Number(row.spent_usd ?? 0), 0);
  const activeUsers = new Set(tokens.map((row) => row.user_id)).size;
  const avgCostPerUser = activeUsers > 0 ? totalCost / activeUsers : 0;

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
      subtext: "Queued or running jobs",
      href: "/admin/media",
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
