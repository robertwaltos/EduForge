import { NextResponse } from "next/server";
import {
  buildCurriculumBacklog,
  curriculumBacklogToCsv,
  summarizeCurriculumBacklog,
} from "@/lib/admin/curriculum-backlog";
import { loadCurriculumSummary } from "@/lib/admin/curriculum-summary";
import { createSupabaseServerClient } from "@/lib/supabase/server";

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

export async function GET(request: Request) {
  const isAdmin = await assertAdmin();
  if (!isAdmin) {
    return NextResponse.json({ error: "Admin access required." }, { status: 403 });
  }

  try {
    const searchParams = new URL(request.url).searchParams;
    const requestedFormat = (searchParams.get("format") ?? "csv").toLowerCase();
    const format = requestedFormat === "json" ? "json" : "csv";
    const requestedLimit = Number(searchParams.get("limit") ?? "500");
    const limit = Number.isFinite(requestedLimit)
      ? Math.max(1, Math.min(2000, Math.floor(requestedLimit)))
      : 500;

    const summary = await loadCurriculumSummary();
    const allItems = buildCurriculumBacklog(summary);
    const items = allItems.slice(0, limit);
    const fullSummary = summarizeCurriculumBacklog(allItems);
    const returnedSummary = summarizeCurriculumBacklog(items);

    if (format === "json") {
      return NextResponse.json({
        generatedAt: new Date().toISOString(),
        sourceGeneratedAt: summary.generatedAt,
        limit,
        totalItems: allItems.length,
        returnedItems: items.length,
        summary: returnedSummary,
        fullSummary,
        items,
      });
    }

    const csv = curriculumBacklogToCsv(items);
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
