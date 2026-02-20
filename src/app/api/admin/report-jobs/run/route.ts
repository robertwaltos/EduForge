import { NextResponse } from "next/server";
import { requireAdminForApi } from "@/lib/admin/auth";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { toCsv } from "@/lib/admin/csv";
import { logReportExport } from "@/lib/admin/report-export";

async function buildReportCsv(reportType: string) {
  const admin = createSupabaseAdminClient();

  if (reportType === "dsar") {
    const { data } = await admin
      .from("dsar_requests")
      .select("id, user_id, request_type, status, details, requested_at, resolved_at")
      .order("requested_at", { ascending: false })
      .limit(5000);
    const rows = data ?? [];
    const csv = toCsv(rows, [
      "id",
      "user_id",
      "request_type",
      "status",
      "details",
      "requested_at",
      "resolved_at",
    ]);
    return { csv, rowCount: rows.length };
  }

  if (reportType === "support") {
    const { data } = await admin
      .from("support_tickets")
      .select(
        "id, user_id, subject, description, status, priority, assigned_to, resolution_notes, created_at, updated_at, resolved_at"
      )
      .order("created_at", { ascending: false })
      .limit(5000);
    const rows = data ?? [];
    const csv = toCsv(rows, [
      "id",
      "user_id",
      "subject",
      "description",
      "status",
      "priority",
      "assigned_to",
      "resolution_notes",
      "created_at",
      "updated_at",
      "resolved_at",
    ]);
    return { csv, rowCount: rows.length };
  }

  if (reportType === "audit") {
    const { data } = await admin
      .from("admin_action_logs")
      .select("id, admin_user_id, action_type, target_user_id, metadata, created_at")
      .order("created_at", { ascending: false })
      .limit(5000);
    const rows = data ?? [];
    const csv = toCsv(rows, [
      "id",
      "admin_user_id",
      "action_type",
      "target_user_id",
      "metadata",
      "created_at",
    ]);
    return { csv, rowCount: rows.length };
  }

  throw new Error(`Unsupported report type: ${reportType}`);
}

async function claimReportJob(
  admin: ReturnType<typeof createSupabaseAdminClient>,
  jobId: string,
  startedAtIso: string,
) {
  const { data, error } = await admin
    .from("admin_report_jobs")
    .update({
      status: "running",
      started_at: startedAtIso,
      completed_at: null,
      error: null,
    })
    .eq("id", jobId)
    .eq("status", "queued")
    .select("id")
    .maybeSingle();

  if (error) {
    throw new Error(`Unable to claim report job ${jobId}: ${error.message}`);
  }

  return Boolean(data?.id);
}

export async function POST() {
  const auth = await requireAdminForApi();
  if (!auth.isAuthorized) {
    return auth.response;
  }

  const admin = createSupabaseAdminClient();
  const nowIso = new Date().toISOString();
  const { data: jobs, error } = await admin
    .from("admin_report_jobs")
    .select("id, report_type, requested_by")
    .eq("status", "queued")
    .lte("run_after", nowIso)
    .order("run_after", { ascending: true })
    .limit(10);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  if (!jobs || jobs.length === 0) {
    return NextResponse.json({ success: true, processed: 0, claimed: 0, skipped: 0 });
  }

  let processed = 0;
  let claimed = 0;
  let skipped = 0;
  for (const job of jobs) {
    const startIso = new Date().toISOString();
    const wasClaimed = await claimReportJob(admin, job.id, startIso);
    if (!wasClaimed) {
      skipped += 1;
      continue;
    }
    claimed += 1;

    try {
      const { csv, rowCount } = await buildReportCsv(job.report_type);
      await logReportExport({
        adminUserId: job.requested_by ?? auth.userId,
        reportType: job.report_type,
        csvContent: csv,
        rowCount,
      });
      await admin
        .from("admin_report_jobs")
        .update({
          status: "completed",
          completed_at: new Date().toISOString(),
        })
        .eq("id", job.id)
        .eq("status", "running");
      processed += 1;
    } catch (runError) {
      await admin
        .from("admin_report_jobs")
        .update({
          status: "failed",
          completed_at: new Date().toISOString(),
          error: runError instanceof Error ? runError.message : "Unknown error",
        })
        .eq("id", job.id)
        .eq("status", "running");
    }
  }

  return NextResponse.json({ success: true, processed, claimed, skipped });
}
