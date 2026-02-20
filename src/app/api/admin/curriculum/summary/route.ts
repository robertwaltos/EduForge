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
    return NextResponse.json(summary);
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to load curriculum summary.",
      },
      { status: 500 },
    );
  }
}
