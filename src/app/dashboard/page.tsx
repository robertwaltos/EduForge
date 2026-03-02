import Link from "next/link";
import { getAllLearningModules } from "@/lib/modules";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getOnboardingRedirect } from "@/lib/compliance/onboarding";
import SignOutButton from "./sign-out-button";
import RecommendedLesson from "./recommended-lesson";
import AiCoachCard from "./ai-coach-card";
import AiTutorPanel from "./ai-tutor-panel";
import AiWeeklyPlanCard from "./ai-weekly-plan-card";
import AiRemediationWorksheetCard from "./ai-remediation-worksheet-card";
import ModuleCoverImage from "@/app/components/module-cover-image";
import { resolveLanguageUsageEntitlement } from "@/lib/language-learning";
import { toLessonPath } from "@/lib/routing/paths";
import SoftCard from "@/app/components/ui/soft-card";
import { summarizeLanguageProgress } from "@/lib/language-learning/progress-metrics";
import { isSupportedLocale, translate, type Locale } from "@/lib/i18n/translations";
import { formatDate } from "@/lib/i18n/format";
import PageHeader from "@/app/components/page-header";

export const dynamic = "force-dynamic";

function letterGrade(score: number) {
  if (score >= 90) return "A";
  if (score >= 80) return "B";
  if (score >= 70) return "C";
  if (score >= 60) return "D";
  return "F";
}

function achievementLevel(
  score: number,
  t: (key: string, vars?: Record<string, string | number>) => string,
) {
  if (score >= 90) return t("dashboard_achievement_super_star");
  if (score >= 80) return t("dashboard_achievement_trailblazer");
  if (score >= 70) return t("dashboard_achievement_rising_star");
  if (score >= 60) return t("dashboard_achievement_explorer");
  return t("dashboard_achievement_starter");
}

function isMissingTableError(message: string) {
  const lower = message.toLowerCase();
  return lower.includes("could not find the table") || (lower.includes("relation") && lower.includes("does not exist"));
}

function formatRelativeDate(
  value: string | null,
  locale: Locale,
  t: (key: string, vars?: Record<string, string | number>) => string,
) {
  if (!value) return t("dashboard_no_activity_yet");
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return t("dashboard_no_activity_yet");
  return formatDate(date, locale, { month: "short", day: "numeric" });
}

function describeUsageState(
  reason: "eligible" | "plan_no_scored_access" | "quota_exceeded" | "budget_guardrail" | null,
  t: (key: string, vars?: Record<string, string | number>) => string,
) {
  switch (reason) {
    case "eligible":
      return t("dashboard_usage_state_active");
    case "plan_no_scored_access":
      return t("dashboard_usage_state_plan_practice_only");
    case "quota_exceeded":
      return t("dashboard_usage_state_quota_reached");
    case "budget_guardrail":
      return t("dashboard_usage_state_budget_guardrail");
    default:
      return t("dashboard_usage_state_awaiting_telemetry");
  }
}

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const localeCookie = cookieStore.get("koydo.locale")?.value ?? "en";
  const locale: Locale = isSupportedLocale(localeCookie) ? localeCookie : "en";
  const t = (key: string, vars?: Record<string, string | number>) => translate(locale, key, vars);

  const learningModules = getAllLearningModules();
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.auth.getUser();

  if (error || !data.user) {
    redirect("/auth/sign-in");
  }

  const [
    profileResult,
    progressResult,
    masteryResult,
    examErrorResult,
    pronunciationAttemptsResult,
    gamificationStateResult,
    gamificationEventsResult,
  ] = await Promise.all([
    supabase
      .from("user_profiles")
      .select("birth_date, parental_consent_required, parental_consent_status")
      .eq("user_id", data.user.id)
      .maybeSingle(),
    supabase
      .from("user_learning_progress")
      .select("lesson_id, next_review_at")
      .eq("user_id", data.user.id),
    supabase
      .from("user_skill_mastery")
      .select("mastery_level, attempts, correct_attempts")
      .eq("user_id", data.user.id),
    supabase
      .from("user_exam_error_logs")
      .select("id", { head: true, count: "exact" })
      .eq("user_id", data.user.id)
      .eq("resolved", false),
    supabase
      .from("pronunciation_attempts")
      .select("grading_mode, overall_score, created_at")
      .eq("user_id", data.user.id)
      .order("created_at", { ascending: false })
      .limit(100),
    supabase
      .from("gamification_states")
      .select("points, level, badges, quests_completed, last_activity_at")
      .eq("user_id", data.user.id)
      .maybeSingle(),
    supabase
      .from("gamification_events")
      .select("event_type, created_at")
      .eq("user_id", data.user.id)
      .order("created_at", { ascending: false })
      .limit(5),
  ]);

  const profile = profileResult.data;
  const progressData = progressResult.data ?? [];
  const masteryData = masteryResult.data ?? [];
  const openExamErrors = Math.max(0, Number(examErrorResult.count ?? 0));

  const onboardingRedirect = getOnboardingRedirect(profile ?? null);
  if (onboardingRedirect) {
    redirect(onboardingRedirect);
  }

  let usageEntitlement: Awaited<ReturnType<typeof resolveLanguageUsageEntitlement>> | null =
    null;
  let usageEntitlementWarning: string | null = null;

  try {
    usageEntitlement = await resolveLanguageUsageEntitlement(supabase, {
      userId: data.user.id,
    });
  } catch (error) {
    if (
      error instanceof Error &&
      (isMissingTableError(error.message) ||
        error.message.toLowerCase().includes("language_usage_tracking"))
    ) {
      usageEntitlementWarning = t("dashboard_usage_tracking_pending_migration");
    } else {
      usageEntitlementWarning = t("dashboard_usage_tracking_unavailable");
      console.error("Dashboard usage entitlement query failed:", error);
    }
  }

  const languageDataErrors = [
    pronunciationAttemptsResult.error,
    gamificationStateResult.error,
    gamificationEventsResult.error,
  ].filter((error): error is NonNullable<typeof pronunciationAttemptsResult.error> => Boolean(error));
  const hasMissingLanguageTables = languageDataErrors.some((error) =>
    isMissingTableError(error.message),
  );

  if (!hasMissingLanguageTables) {
    for (const error of languageDataErrors) {
      console.error("Dashboard language data query failed:", error);
    }
  }

  const progressMap = new Map(progressData?.map((p) => [p.lesson_id, p]) ?? []);
  const completedLessons = progressMap.size;
  const averageMasteryRaw =
    masteryData.length > 0
      ? masteryData.reduce((acc, row) => acc + Number(row.mastery_level ?? 0), 0) / masteryData.length
      : 0;
  const averageMasteryPercent = Math.round(averageMasteryRaw * 100);
  const grade = letterGrade(averageMasteryPercent);
  const level = achievementLevel(averageMasteryPercent, t);
  const totalAttempts = masteryData.reduce((acc, row) => acc + Number(row.attempts ?? 0), 0);
  const totalCorrect = masteryData.reduce((acc, row) => acc + Number(row.correct_attempts ?? 0), 0);
  const accuracyPercent = totalAttempts > 0 ? Math.round((totalCorrect / totalAttempts) * 100) : 0;
  const starsEarned = completedLessons * 3 + Math.floor(averageMasteryPercent / 10);
  const languageProgress = summarizeLanguageProgress(
    hasMissingLanguageTables ? [] : pronunciationAttemptsResult.data ?? [],
    hasMissingLanguageTables ? null : gamificationStateResult.data ?? null,
  );
  const languageEvents = hasMissingLanguageTables ? [] : gamificationEventsResult.data ?? [];
  const usageLimit = usageEntitlement?.scoredAttemptsLimit ?? 0;
  const usageUsed = usageEntitlement?.scoredAttemptsUsed ?? 0;
  const usagePercent =
    usageLimit > 0 ? Math.min(100, Math.round((usageUsed / usageLimit) * 100)) : 0;
  const usageStateMessage = usageEntitlement
    ? describeUsageState(usageEntitlement.reason, t)
    : usageEntitlementWarning ?? t("dashboard_usage_state_awaiting_telemetry");
  const showUsageUpgradeCta = usageEntitlement?.mode === "practice_only";

  return (
    <main className="mx-auto flex w-full max-w-4xl flex-col gap-6 px-6 py-12 tablet:max-w-5xl tablet:px-8">
      <PageHeader
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: t("dashboard_title") },
        ]}
        title={t("dashboard_title")}
        description={t("dashboard_signed_in_as", { user: data.user.email ?? data.user.id })}
        actions={<SignOutButton />}
      />

      <section className="flex flex-col gap-8">
        <Link href="/experience-hub" className="group relative overflow-hidden bg-indigo-600 rounded-[2rem] p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 transition-transform hover:scale-[1.01] active:scale-[0.99] shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 opacity-50" />
          <div className="absolute -right-20 -top-20 w-64 h-64 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-all" />

          <div className="relative z-10 flex flex-col gap-1 text-center md:text-left">
            <span className="text-xs font-black uppercase tracking-widest text-indigo-200">New Feature</span>
            <h2 className="text-3xl font-black italic tracking-tighter">ENTER EXPERIENCE HUB</h2>
            <p className="text-indigo-100 font-medium">Your progress galaxy, trophies, and companions await!</p>
          </div>

          <div className="relative z-10 bg-white/20 px-8 py-4 rounded-3xl backdrop-blur-md border border-white/30 font-black italic text-xl group-hover:bg-white transition-colors group-hover:text-indigo-600">
            LAUNCH →
          </div>
        </Link>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          <SoftCard as="article" className="border-rose-200 bg-rose-50 p-4 dark:border-rose-800/40 dark:bg-rose-950/30">
            <p className="text-xs uppercase tracking-wide text-zinc-500 dark:text-foreground/60">{t("dashboard_stat_achievement_level")}</p>
            <p className="mt-2 text-3xl font-bold">{level}</p>
            <p className="mt-1 text-xs text-zinc-500 dark:text-foreground/60">{t("dashboard_progress_band", { grade })}</p>
          </SoftCard>
          <SoftCard as="article" className="border-sky-200 bg-sky-50 p-4 dark:border-sky-800/40 dark:bg-sky-950/30">
            <p className="text-xs uppercase tracking-wide text-zinc-500 dark:text-foreground/60">{t("dashboard_stat_mastery_score")}</p>
            <p className="mt-2 text-3xl font-bold">{averageMasteryPercent}%</p>
          </SoftCard>
          <SoftCard as="article" className="border-emerald-200 bg-emerald-50 p-4 dark:border-emerald-800/40 dark:bg-emerald-950/30">
            <p className="text-xs uppercase tracking-wide text-zinc-500 dark:text-foreground/60">{t("dashboard_stat_lessons_completed")}</p>
            <p className="mt-2 text-3xl font-bold">{completedLessons}</p>
          </SoftCard>
          <SoftCard as="article" className="border-amber-200 bg-amber-50 p-4 dark:border-amber-800/40 dark:bg-amber-950/30">
            <p className="text-xs uppercase tracking-wide text-zinc-500 dark:text-foreground/60">{t("dashboard_stat_stars_earned")}</p>
            <p className="mt-2 text-3xl font-bold">{starsEarned}</p>
            <p className="mt-1 text-xs text-zinc-500 dark:text-foreground/60">{t("dashboard_accuracy", { percent: accuracyPercent })}</p>
          </SoftCard>
          <SoftCard as="article" className="border-indigo-200 bg-indigo-50 p-4 dark:border-indigo-800/40 dark:bg-indigo-950/30">
            <p className="text-xs uppercase tracking-wide text-zinc-500 dark:text-foreground/60">{t("dashboard_stat_open_exam_errors")}</p>
            <p className="mt-2 text-3xl font-bold">{openExamErrors}</p>
            <Link href="/exam-prep/error-log" className="mt-1 inline-block text-xs font-medium text-indigo-700 hover:underline">
              {t("dashboard_review_logbook")}
            </Link>
          </SoftCard>
        </div>

        <SoftCard as="section" className="border-cyan-200 bg-cyan-50/70 p-5 dark:border-cyan-800/40 dark:bg-cyan-950/30">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h2 className="text-lg font-semibold text-zinc-900 dark:text-foreground">{t("dashboard_language_progress_title")}</h2>
              <p className="mt-1 text-sm text-zinc-600 dark:text-foreground/70">
                {t("dashboard_language_progress_subtitle")}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Link
                href="/language/speaking-lab"
                className="ui-focus-ring inline-flex min-h-10 items-center rounded-full border border-cyan-200 bg-white px-3 py-1.5 text-xs font-semibold text-cyan-700 hover:bg-cyan-100"
              >
                {t("dashboard_open_speaking_lab")}
              </Link>
              <Link
                href="/modules"
                className="ui-focus-ring inline-flex min-h-10 items-center rounded-full border border-cyan-200 bg-white px-3 py-1.5 text-xs font-semibold text-cyan-700 hover:bg-cyan-100"
              >
                {t("dashboard_practice_modules")}
              </Link>
            </div>
          </div>

          {hasMissingLanguageTables ? (
            <div className="mt-4 rounded-2xl border border-dashed border-cyan-300 bg-white/80 p-4 text-sm text-zinc-600 dark:text-foreground/70">
              {t("dashboard_language_progress_pending_migration")}
            </div>
          ) : (
            <>
              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-2xl border border-cyan-200 bg-white p-3 dark:border-cyan-800/30 dark:bg-surface">
                  <p className="text-xs uppercase tracking-wide text-zinc-500 dark:text-foreground/60">{t("dashboard_stat_avg_pronunciation")}</p>
                  <p className="mt-1 text-2xl font-bold text-zinc-900 dark:text-foreground">
                    {languageProgress.averageScore !== null ? `${Math.round(languageProgress.averageScore)}%` : t("dashboard_not_available_short")}
                  </p>
                  <p className="mt-1 text-xs text-zinc-500">
                    {t("dashboard_graded_attempts", { count: languageProgress.gradedAttempts })}
                  </p>
                </div>
                <div className="rounded-2xl border border-cyan-200 bg-white p-3 dark:border-cyan-800/30 dark:bg-surface">
                  <p className="text-xs uppercase tracking-wide text-zinc-500 dark:text-foreground/60">{t("dashboard_stat_confidence_safe_mode")}</p>
                  <p className="mt-1 text-2xl font-bold text-zinc-900 dark:text-foreground">{languageProgress.practiceOnlyAttempts}</p>
                  <p className="mt-1 text-xs text-zinc-500">{t("dashboard_practice_only_attempts")}</p>
                </div>
                <div className="rounded-2xl border border-cyan-200 bg-white p-3 dark:border-cyan-800/30 dark:bg-surface">
                  <p className="text-xs uppercase tracking-wide text-zinc-500 dark:text-foreground/60">{t("dashboard_stat_gamification")}</p>
                  <p className="mt-1 text-2xl font-bold text-zinc-900 dark:text-foreground">
                    {t("dashboard_level_points", {
                      level: languageProgress.level,
                      points: languageProgress.points,
                    })}
                  </p>
                  <p className="mt-1 text-xs text-zinc-500">
                    {t("dashboard_badges_quests", {
                      badges: languageProgress.badgesCount,
                      quests: languageProgress.questsCompletedCount,
                    })}
                  </p>
                </div>
                <div className="rounded-2xl border border-cyan-200 bg-white p-3 dark:border-cyan-800/30 dark:bg-surface">
                  <p className="text-xs uppercase tracking-wide text-zinc-500 dark:text-foreground/60">{t("dashboard_stat_recent_trend")}</p>
                  <p className="mt-1 text-2xl font-bold text-zinc-900 dark:text-foreground">
                    {languageProgress.recentScoreTrendDelta === null
                      ? t("dashboard_not_available_short")
                      : `${languageProgress.recentScoreTrendDelta > 0 ? "+" : ""}${languageProgress.recentScoreTrendDelta}`}
                  </p>
                  <p className="mt-1 text-xs text-zinc-500">
                    {t("dashboard_last_attempt", {
                      date: formatRelativeDate(languageProgress.latestAttemptAt, locale, t),
                    })}
                  </p>
                </div>
              </div>

              <div className="mt-3 rounded-2xl border border-cyan-200 bg-white p-3 dark:border-cyan-800/30 dark:bg-surface">
                <p className="text-xs uppercase tracking-wide text-zinc-500 dark:text-foreground/60">{t("dashboard_stat_monthly_scored_usage")}</p>
                <p className="mt-1 text-lg font-semibold text-zinc-900 dark:text-foreground">
                  {usageEntitlement
                    ? `${usageEntitlement.scoredAttemptsUsed}/${usageEntitlement.scoredAttemptsLimit}`
                    : t("dashboard_not_available_short")}
                </p>
                {usageEntitlement ? (
                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-zinc-100 dark:bg-surface-muted">
                    <div
                      className="h-full rounded-full bg-cyan-500"
                      style={{ width: `${usagePercent}%` }}
                    />
                  </div>
                ) : null}
                <p className="mt-1 text-xs text-zinc-500">
                  {usageEntitlement
                    ? t("dashboard_remaining_month", {
                      count: usageEntitlement.scoredAttemptsRemaining,
                      plan: usageEntitlement.planName,
                    })
                    : usageEntitlementWarning ?? t("dashboard_usage_state_awaiting_telemetry")}
                </p>
                <p className="mt-1 text-xs text-zinc-500">{usageStateMessage}</p>
                {showUsageUpgradeCta ? (
                  <Link
                    href="/billing/language"
                    className="ui-focus-ring mt-3 inline-flex min-h-10 items-center rounded-full border border-cyan-200 bg-cyan-50 px-3 py-1.5 text-xs font-semibold text-cyan-700 hover:bg-cyan-100"
                  >
                    {t("dashboard_upgrade_language_plan")}
                  </Link>
                ) : (
                  <Link
                    href="/billing/language"
                    className="ui-focus-ring mt-3 inline-flex min-h-10 items-center rounded-full border border-zinc-200 bg-surface-muted px-3 py-1.5 text-xs font-semibold text-zinc-600 hover:bg-zinc-100"
                  >
                    {t("dashboard_view_language_plans")}
                  </Link>
                )}
              </div>

              <div className="mt-4 rounded-2xl border border-cyan-200 bg-white p-4 dark:border-cyan-800/30 dark:bg-surface">
                <p className="text-xs uppercase tracking-wide text-zinc-500">{t("dashboard_recent_language_events")}</p>
                {languageEvents.length === 0 ? (
                  <p className="mt-2 text-sm text-zinc-600 dark:text-foreground/70">{t("dashboard_no_events_yet")}</p>
                ) : (
                  <ul className="mt-2 space-y-1.5 text-sm text-zinc-700">
                    {languageEvents.map((event, index) => (
                      <li key={`${event.event_type}-${event.created_at ?? "none"}-${index}`}>
                        <span className="font-medium">{event.event_type.replaceAll("_", " ")}</span>{" "}
                        <span className="text-zinc-500">({formatRelativeDate(event.created_at, locale, t)})</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </>
          )}
        </SoftCard>

        <RecommendedLesson />
        <AiCoachCard />
        <AiRemediationWorksheetCard />
        <AiWeeklyPlanCard />
        <AiTutorPanel />

        {/* ── Continue Learning — compact recent modules ── */}
        <section>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold">{t("dashboard_learning_path_title")}</h2>
            <Link
              href="/modules"
              className="ui-focus-ring inline-flex items-center gap-1 rounded-full border border-zinc-200 bg-white px-3 py-1.5 text-xs font-semibold text-zinc-600 hover:bg-surface-muted"
            >
              {t("dashboard_view_all_modules")} →
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {learningModules.slice(0, 6).map((learningModule) => {
              const moduleLessons = learningModule.lessons;
              const completedCount = moduleLessons.filter((l) =>
                progressMap.has(l.id),
              ).length;
              const progressPct =
                moduleLessons.length > 0
                  ? Math.round((completedCount / moduleLessons.length) * 100)
                  : 0;
              const nextLesson = moduleLessons.find(
                (l) => !progressMap.has(l.id),
              );

              return (
                <SoftCard
                  key={learningModule.id}
                  as="article"
                  interactive
                  className="border-violet-200 p-5"
                >
                  <ModuleCoverImage
                    moduleId={learningModule.id}
                    moduleTitle={learningModule.title}
                    fallbackSrc={learningModule.thumbnail}
                    className="h-28 w-full rounded-xl border border-violet-100 object-cover"
                  />
                  <h3 className="mt-3 text-sm font-bold text-violet-900 dark:text-violet-200 line-clamp-2">
                    {learningModule.title}
                  </h3>

                  {/* Progress bar */}
                  <div className="mt-2">
                    <div className="flex items-center justify-between text-[11px] text-zinc-500">
                      <span>
                        {completedCount}/{moduleLessons.length} {t("dashboard_lessons_heading").toLowerCase()}
                      </span>
                      <span className="font-semibold">{progressPct}%</span>
                    </div>
                    <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-violet-100">
                      <div
                        className="h-full rounded-full bg-violet-500 transition-all"
                        style={{ width: `${progressPct}%` }}
                      />
                    </div>
                  </div>

                  {/* Next lesson CTA */}
                  {nextLesson ? (
                    <Link
                      href={toLessonPath(nextLesson.id)}
                      className="ui-focus-ring mt-3 inline-flex w-full min-h-10 items-center justify-center rounded-xl border border-violet-200 bg-violet-50 text-xs font-semibold text-violet-700 hover:bg-violet-100"
                    >
                      {t("dashboard_continue_lesson")} →
                    </Link>
                  ) : (
                    <p className="mt-3 text-center text-xs font-semibold text-emerald-600">
                      ✓ {t("dashboard_module_complete")}
                    </p>
                  )}
                </SoftCard>
              );
            })}
          </div>
        </section>
      </section>
    </main>
  );
}
