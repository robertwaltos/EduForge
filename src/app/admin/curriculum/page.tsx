import { redirect } from "next/navigation";
import { loadCurriculumSummary } from "@/lib/admin/curriculum-summary";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import CurriculumClient from "./curriculum-client";

export const dynamic = "force-dynamic";

export default async function AdminCurriculumPage() {
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
        <p className="text-sm text-red-600">You must be an administrator to access curriculum operations.</p>
      </main>
    );
  }

  const initialSummary = await loadCurriculumSummary();

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-12">
      <header>
        <h1 className="text-3xl font-semibold tracking-tight">Curriculum Operations</h1>
        <p className="mt-2 text-sm text-zinc-600">
          Track subject/grade coverage, prioritize missing lessons, and drive curriculum expansion.
        </p>
      </header>

      <CurriculumClient initialSummary={initialSummary} />
    </main>
  );
}
