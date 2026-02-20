import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { appStoreComplianceChecklist } from "@/lib/compliance/app-store-checklist";
import ComplianceAdminClient from "./compliance-admin-client";

export const dynamic = "force-dynamic";

const statusStyle = {
  implemented: "text-emerald-700 dark:text-emerald-300",
  partial: "text-amber-700 dark:text-amber-300",
  pending: "text-red-700 dark:text-red-300",
} as const;

export default async function AdminCompliancePage() {
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
        <p className="text-sm text-red-600">You must be an administrator to view compliance controls.</p>
      </main>
    );
  }

  const admin = createSupabaseAdminClient();
  const { data: dsarRequests } = await admin
    .from("dsar_requests")
    .select("id, user_id, request_type, status, requested_at, resolved_at")
    .order("requested_at", { ascending: false })
    .limit(100);

  return (
    <main className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-6 py-12">
      <header>
        <h1 className="text-3xl font-semibold tracking-tight">App Store Compliance</h1>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
          Operational checklist for App Store and Google Play policy readiness.
        </p>
      </header>

      <section className="rounded-lg border border-black/10 bg-white p-5 dark:border-white/15 dark:bg-zinc-900">
        <div className="mb-4 flex flex-wrap gap-3 text-xs">
          <a className="rounded-md border border-black/15 px-2 py-1 hover:bg-black/5" href="/APPSTORE-COMPLIANCE-AUDIT.md" target="_blank" rel="noreferrer">
            Open Compliance Audit Report
          </a>
          <a className="rounded-md border border-black/15 px-2 py-1 hover:bg-black/5" href="/DB-READINESS-REPORT.md" target="_blank" rel="noreferrer">
            Open DB Readiness Report
          </a>
        </div>
        <ul className="space-y-4">
          {appStoreComplianceChecklist.map((item) => (
            <li key={item.id} className="rounded-md border border-black/10 p-4 dark:border-white/10">
              <div className="flex items-center justify-between gap-4">
                <h2 className="font-semibold">{item.title}</h2>
                <span className={`text-sm font-semibold capitalize ${statusStyle[item.status]}`}>
                  {item.status}
                </span>
              </div>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">{item.rationale}</p>
            </li>
          ))}
        </ul>
      </section>

      <ComplianceAdminClient initialDsarRequests={dsarRequests ?? []} />
    </main>
  );
}
