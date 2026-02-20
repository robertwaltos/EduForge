import fs from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";
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
    const root = process.cwd();
    const coveragePath = path.join(root, "public", "CURRICULUM-COVERAGE-REPORT.json");
    const planPath = path.join(root, "public", "CURRICULUM-EXPANSION-PLAN.json");
    const [coverageRaw, planRaw] = await Promise.all([
      fs.readFile(coveragePath, "utf8"),
      fs.readFile(planPath, "utf8").catch(() => "{}"),
    ]);

    const coverage = JSON.parse(coverageRaw);
    const plan = JSON.parse(planRaw);
    return NextResponse.json({ coverage, plan });
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
