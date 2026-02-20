import { NextResponse } from "next/server";
import { loadCurriculumSummary } from "@/lib/admin/curriculum-summary";
import { createSupabaseServerClient } from "@/lib/supabase/server";

function csvEscape(value: string) {
  if (value.includes(",") || value.includes("\"") || value.includes("\n")) {
    return `"${value.replaceAll("\"", "\"\"")}"`;
  }
  return value;
}

function buildCsv(summary: Awaited<ReturnType<typeof loadCurriculumSummary>>) {
  const lines = [
    [
      "workstream",
      "item_type",
      "priority",
      "key",
      "grade_band",
      "subject",
      "module_id",
      "module_title",
      "track",
      "region",
      "missing_count",
      "existing_count",
      "target_count",
      "score",
      "details",
    ].join(","),
  ];

  const coverageRows = summary.expansion.targets
    .filter((row) => row.missingCount > 0)
    .sort((a, b) => b.missingCount - a.missingCount || a.gradeBand.localeCompare(b.gradeBand));
  for (const row of coverageRows) {
    const priority = row.missingCount >= Math.ceil(row.targetCount * 0.8) ? "high" : "medium";
    lines.push(
      [
        "curriculum",
        "coverage_gap",
        priority,
        `${row.gradeBand}::${row.subject}`,
        row.gradeBand,
        row.subject,
        "",
        "",
        "",
        "",
        String(row.missingCount),
        String(row.existingCount),
        String(row.targetCount),
        "",
        "Create lessons to close grade/subject coverage gap.",
      ]
        .map((cell) => csvEscape(cell))
        .join(","),
    );
  }

  for (const missingTrack of summary.examPrep.missingTracks) {
    lines.push(
      [
        "exam-prep",
        "exam_track_gap",
        "high",
        missingTrack.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        "",
        "exam-prep",
        "",
        "",
        missingTrack,
        "",
        "1",
        "0",
        "1",
        "",
        `Create full prep track for ${missingTrack}.`,
      ]
        .map((cell) => csvEscape(cell))
        .join(","),
    );
  }

  const remediationRows = summary.quality.topPriorityModules
    .filter((row) => row.priority === "high" || row.priority === "medium")
    .sort((a, b) => a.score - b.score || a.moduleId.localeCompare(b.moduleId));
  for (const row of remediationRows) {
    lines.push(
      [
        "quality",
        "module_remediation",
        row.priority,
        row.moduleId,
        "",
        row.subject,
        row.moduleId,
        row.title,
        "",
        "",
        "",
        "",
        "",
        String(row.score),
        row.issues.slice(0, 3).join(" | "),
      ]
        .map((cell) => csvEscape(cell))
        .join(","),
    );
  }

  return lines.join("\n");
}

async function assertAdmin() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();
  if (authError || !user) return false;

  const { data: profile } = await supabase
    .from("user_profiles")
    .select("is_admin")
    .eq("user_id", user.id)
    .maybeSingle();
  return Boolean(profile?.is_admin);
}

export async function GET() {
  const isAdmin = await assertAdmin();
  if (!isAdmin) {
    return NextResponse.json({ error: "Admin access required." }, { status: 403 });
  }

  try {
    const summary = await loadCurriculumSummary();
    const csv = buildCsv(summary);
    const timestamp = new Date().toISOString().slice(0, 10);

    return new NextResponse(csv, {
      status: 200,
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="curriculum-backlog-${timestamp}.csv"`,
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to export curriculum backlog.",
      },
      { status: 500 },
    );
  }
}
