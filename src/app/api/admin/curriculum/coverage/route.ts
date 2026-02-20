import { NextResponse } from "next/server";
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

export async function GET() {
  const isAdmin = await assertAdmin();
  if (!isAdmin) {
    return NextResponse.json({ error: "Admin access required." }, { status: 403 });
  }

  try {
    const summary = await loadCurriculumSummary();
    return NextResponse.json({
      generatedAt: summary.generatedAt,
      coverage: {
        generatedAt: summary.reports.coverageGeneratedAt,
        totalLessons: summary.coverage.totalLessons,
        gradeSubjectSummary: summary.coverage.gradeSubjectSummary,
      },
      plan: {
        generatedAt: summary.reports.expansionGeneratedAt,
        targetPerSubjectPerGrade: summary.expansion.targetPerSubjectPerGrade,
        totals: {
          targetRows: summary.expansion.targetRows,
          totalExisting: summary.expansion.totalExisting,
          totalNeeded: summary.expansion.totalNeeded,
          totalUntracked: summary.expansion.totalUntracked,
          completionPercent: summary.expansion.completionPercent,
        },
        targets: summary.expansion.targets,
        untrackedCoverage: summary.expansion.untrackedCoverage,
      },
      quality: {
        generatedAt: summary.reports.qualityGeneratedAt,
        totals: {
          modules: summary.quality.modules,
          lessons: summary.quality.lessons,
          averageScore: summary.quality.averageScore,
          highPriorityModules: summary.quality.highPriorityModules,
          mediumPriorityModules: summary.quality.mediumPriorityModules,
          lowPriorityModules: summary.quality.lowPriorityModules,
          placeholderOptionCount: summary.quality.placeholderOptionCount,
          genericReflectionCount: summary.quality.genericReflectionCount,
        },
        topPriorityModules: summary.quality.topPriorityModules,
      },
      reports: summary.reports,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to load curriculum coverage report.",
      },
      { status: 500 },
    );
  }
}
