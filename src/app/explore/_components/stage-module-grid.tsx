import Link from "next/link";
import { cookies } from "next/headers";
import type { EducationStage } from "@/lib/explorer/scenes";
import { getModulesForStage, getStageModuleCounts } from "@/lib/content-gating";
import {
  isSupportedLocale,
  type Locale,
  translate,
} from "@/lib/i18n/translations";
import { toExploreModulePath } from "@/lib/routing/paths";
import ExplorerViewTracker from "./explorer-view-tracker";
import SpeakButton from "./speak-button";

function getSubjectIcon(subject: string): string {
  const key = subject.toLowerCase();
  if (key.includes("math")) return "➗";
  if (key.includes("science") || key.includes("biology") || key.includes("chemistry") || key.includes("physics")) return "🔬";
  if (key.includes("read") || key.includes("language")) return "📖";
  if (key.includes("coding") || key.includes("computer")) return "💻";
  if (key.includes("history") || key.includes("social")) return "🌍";
  if (key.includes("art")) return "🎨";
  if (key.includes("music")) return "🎵";
  return "🧭";
}

function truncate(text: string, max = 120): string {
  return text.length <= max ? text : `${text.slice(0, max - 1).trimEnd()}…`;
}

type StageModuleGridProps = {
  stage: EducationStage;
};

export default async function StageModuleGrid({ stage }: StageModuleGridProps) {
  const cookieStore = await cookies();
  const localeCookie = cookieStore.get("koydo.locale")?.value ?? "en";
  const locale: Locale = isSupportedLocale(localeCookie) ? localeCookie : "en";
  const t = (key: string, vars?: Record<string, string | number>) =>
    translate(locale, key, vars);

  const stageLabel = locale === "es" ? stage.labelEs : stage.label;
  const stageDescription = locale === "es" ? stage.descriptionEs : stage.description;
  const stageNarration = locale === "es" ? stage.narrationEs : stage.narration;
  const modules = getModulesForStage(stage.id);
  const counts = getStageModuleCounts(stage.id);
  const freeModules = modules.filter((m) => m.isFree);
  const premiumModules = modules.filter((m) => !m.isFree);

  return (
    <div className="flex min-h-[calc(100vh-52px)] flex-col">
      <ExplorerViewTracker surface="shared" />

      {/* Stage header */}
      <header
        className="relative overflow-hidden px-4 pb-6 pt-8 sm:pb-8 sm:pt-12"
        style={{ background: stage.gradient }}
      >
        <div
          className="absolute inset-0 bg-gradient-to-b from-transparent to-background/60"
          aria-hidden="true"
        />

        <div className="relative mx-auto max-w-4xl">
          {/* Back link */}
          <Link
            href="/explore"
            className="ui-focus-ring mb-4 inline-flex min-h-11 items-center gap-1.5 rounded-full border border-white/40 bg-white/60 px-3 py-2 text-sm font-semibold text-zinc-700 backdrop-blur-sm transition-colors hover:bg-white/80 border-border/65 dark:bg-surface/40 dark:text-foreground/90 dark:hover:bg-surface/60"
            aria-label={t("stage_grid_back_aria")}
          >
            <span aria-hidden="true">&larr;</span> {t("stage_grid_back_to_levels")}
          </Link>

          <div className="flex items-center gap-4">
            <span className="explore-float text-5xl sm:text-6xl" aria-hidden="true">
              {stage.badge}
            </span>
            <div>
              <h1 className="text-2xl font-extrabold tracking-tight text-zinc-900 dark:text-foreground sm:text-3xl">
                {stageLabel}
              </h1>
              <p className="mt-1 text-sm text-zinc-700 dark:text-foreground/80">
                {stageDescription}
              </p>
              <div className="mt-2 flex flex-wrap items-center gap-2">
                <span
                  className="rounded-full px-2.5 py-0.5 text-xs font-bold text-zinc-900 dark:text-foreground"
                  style={{
                    border: `1.5px solid ${stage.glowColor}`,
                    background: `${stage.glowColor}22`,
                  }}
                >
                  {stage.gradeRange}
                </span>
                <span className="rounded-full border border-zinc-200 bg-white/80 px-2.5 py-0.5 text-xs font-semibold text-zinc-600 backdrop-blur-sm border-border/65 dark:bg-surface-muted/60 dark:text-foreground/80">
                  {stage.ageRange}
                </span>
                <span className="rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 text-xs font-bold text-emerald-700 border-success/55 dark:bg-emerald-950/50 dark:text-emerald-300">
                  {t("stage_grid_free_count", { count: counts.free })}
                </span>
                {counts.premium > 0 && (
                  <span className="rounded-full border border-amber-200 bg-amber-50 px-2.5 py-0.5 text-xs font-bold text-amber-700 border-warn/55 dark:bg-amber-950/50 dark:text-amber-300">
                    {t("stage_grid_premium_count", { count: counts.premium })}
                  </span>
                )}
              </div>
            </div>
            <div className="ml-auto hidden sm:block">
              <SpeakButton text={stageNarration} label={t("common_hear_it")} />
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto w-full max-w-7xl px-4 pb-12 pt-6 sm:px-6">
        {/* Free tier section */}
        {freeModules.length > 0 && (
          <section aria-label={t("stage_grid_free_modules_aria")}>
            <h2 className="mb-4 text-lg font-bold text-zinc-900 dark:text-foreground">
              <span className="mr-2 inline-block rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-bold text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300">
                {t("common_free").toUpperCase()}
              </span>
              {t("stage_grid_start_here")}
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {freeModules.map((mod, i) => (
                <ModuleCard
                  key={mod.id}
                  mod={mod}
                  index={i}
                  stageGlow={stage.glowColor}
                  locale={locale}
                />
              ))}
            </div>
          </section>
        )}

        {/* Premium section */}
        {premiumModules.length > 0 && (
          <section aria-label={t("stage_grid_premium_modules_aria")} className="mt-10">
            <h2 className="mb-4 text-lg font-bold text-zinc-900 dark:text-foreground">
              <span className="mr-2 inline-block rounded-full bg-amber-100 px-2 py-0.5 text-xs font-bold text-amber-700 dark:bg-amber-950/50 dark:text-amber-300">
                {t("common_premium").toUpperCase()}
              </span>
              {t("stage_grid_unlock_more")}
            </h2>
            <p className="mb-2 text-sm text-zinc-500 dark:text-foreground/70">
              {t("stage_grid_subscribe_desc")}
            </p>
            <Link
              href="/billing/checkout"
              className="ui-focus-ring mb-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 px-5 py-2.5 text-sm font-bold text-white shadow-md transition-all hover:brightness-110 hover:shadow-lg"
            >
              {t("stage_grid_unlock_all_cta")} <span aria-hidden="true">→</span>
            </Link>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {premiumModules.map((mod, i) => (
                <ModuleCard
                  key={mod.id}
                  mod={mod}
                  index={i}
                  stageGlow={stage.glowColor}
                  locked
                  locale={locale}
                />
              ))}
            </div>
          </section>
        )}

        {modules.length === 0 && (
          <div className="flex min-h-[40vh] flex-col items-center justify-center text-center">
            <span className="text-5xl" aria-hidden="true">{stage.badge}</span>
            <p className="mt-4 text-lg font-semibold text-zinc-600 dark:text-foreground/80">
              {t("stage_grid_modules_coming_soon", { stage: stageLabel })}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── Module Card ─────────────────────────────────────────────── */

type ModuleCardProps = {
  mod: { id: string; title: string; description: string; subject: string; lessons: { id: string }[]; isFree: boolean };
  index: number;
  stageGlow: string;
  locked?: boolean;
  locale: Locale;
};

function ModuleCard({ mod, index, stageGlow, locked, locale }: ModuleCardProps) {
  const icon = getSubjectIcon(mod.subject);
  const lessonCount = mod.lessons.length;
  const t = (key: string, vars?: Record<string, string | number>) =>
    translate(locale, key, vars);
  const lessonCountLabel =
    lessonCount === 1
      ? t("stage_grid_lesson_count_one", { subject: mod.subject, count: lessonCount })
      : t("stage_grid_lesson_count_other", { subject: mod.subject, count: lessonCount });
  const startModuleAria =
    lessonCount === 1
      ? t("stage_grid_start_module_aria_one", {
          title: mod.title,
          subject: mod.subject,
          count: lessonCount,
        })
      : t("stage_grid_start_module_aria", {
          title: mod.title,
          subject: mod.subject,
          count: lessonCount,
        });

  const card = (
    <article
      className={`explore-scene-enter explore-card-elevated group relative flex flex-col overflow-hidden rounded-2xl border-2 p-5 transition-all duration-200 ${
        locked
          ? "border-zinc-200 opacity-75 border-border/40"
          : "border-white/60 hover:-translate-y-0.5 hover:shadow-lg border-border/40"
      }`}
      style={{ animationDelay: `${index * 60}ms` }}
    >
      {/* Lock overlay for premium */}
      {locked && (
        <div
          className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-1.5 rounded-2xl bg-zinc-900/5 backdrop-blur-[1px] dark:bg-background/20"
          aria-hidden="true"
        >
          <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-zinc-600 shadow-sm dark:bg-surface-muted/90 dark:text-foreground/80">
            <span aria-hidden="true">🔒</span> {t("stage_grid_premium_chip")}
          </span>
          <span className="text-[10px] font-medium text-zinc-500 dark:text-foreground/70">
            {t("stage_grid_premium_tap_to_unlock")}
          </span>
        </div>
      )}

      <div className="flex items-start gap-3">
        <span className="shrink-0 text-2xl" aria-hidden="true">{icon}</span>
        <div className="min-w-0 flex-1">
          <h3 className="text-base font-bold leading-tight text-zinc-900 dark:text-foreground">
            {mod.title}
          </h3>
          <p className="mt-1 text-xs text-zinc-500 dark:text-foreground/70">
            {lessonCountLabel}
          </p>
        </div>
        {mod.isFree && !locked && (
          <span className="shrink-0 rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold uppercase text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300">
            {t("common_free")}
          </span>
        )}
      </div>

      <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-foreground/80">
        {truncate(mod.description)}
      </p>

      {!locked && (
        <div className="mt-auto pt-3">
          <span
            className="inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-bold text-white transition-all group-hover:brightness-110"
            style={{ backgroundColor: stageGlow }}
          >
            {t("stage_grid_start_learning")} <span aria-hidden="true">&rarr;</span>
          </span>
        </div>
      )}
    </article>
  );

  if (locked) {
    return (
      <Link
        href="/billing/checkout"
        className="ui-focus-ring block rounded-2xl"
        aria-label={t("stage_grid_premium_unlock_aria", { title: mod.title })}
      >
        {card}
      </Link>
    );
  }

  return (
    <Link
      href={toExploreModulePath(mod.id)}
      className="ui-focus-ring block rounded-2xl"
      aria-label={startModuleAria}
    >
      {card}
    </Link>
  );
}
