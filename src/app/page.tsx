import type { Metadata } from "next";
import Link from "next/link";
import { cookies } from "next/headers";
import { getAllEducationStages } from "@/lib/explorer/scenes";
import {
  isSupportedLocale,
  type Locale,
  translate,
} from "@/lib/i18n/translations";
import SpeakButton from "@/app/explore/_components/speak-button";

export const metadata: Metadata = {
  title: "Koydo — Learn Anything, Any Age, Any Language",
  description:
    "Free interactive learning for ages 3 to adult. Explore 200+ modules across math, science, coding, and career skills in English and Spanish.",
  openGraph: {
    title: "Koydo — Learn Anything, Any Age, Any Language",
    description:
      "Free interactive learning from Pre-K through College. Start exploring today.",
  },
};

export default async function Home() {
  const cookieStore = await cookies();
  const localeCookie = cookieStore.get("koydo.locale")?.value ?? "en";
  const locale: Locale = isSupportedLocale(localeCookie) ? localeCookie : "en";
  const t = (key: string, vars?: Record<string, string | number>) =>
    translate(locale, key, vars);

  const stages = getAllEducationStages();

  return (
    <div
      className="relative overflow-hidden font-sans text-white"
      style={{ background: "linear-gradient(165deg, #040810 0%, #060d1a 40%, #08101f 70%, #050a14 100%)" }}
    >
      {/* ── Cosmic background layer ── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        {/* Atmospheric depth glows */}
        <div
          className="absolute inset-0"
          style={{
            background: [
              "radial-gradient(ellipse at 72% 55%, rgba(160,100,15,0.32) 0%, transparent 50%)",
              "radial-gradient(ellipse at 28% 20%, rgba(15,35,90,0.55) 0%, transparent 52%)",
              "radial-gradient(ellipse at 85% 12%, rgba(55,15,95,0.38) 0%, transparent 42%)",
              "radial-gradient(ellipse at 68% 88%, rgba(180,120,20,0.2) 0%, transparent 40%)",
              "radial-gradient(ellipse at 15% 78%, rgba(10,25,70,0.4) 0%, transparent 45%)",
            ].join(", "),
          }}
        />
        {/* Star field */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: [
              "radial-gradient(1.5px 1.5px at 5% 8%, rgba(255,255,255,0.9) 0%, transparent 100%)",
              "radial-gradient(1px 1px at 13% 15%, rgba(255,255,255,0.7) 0%, transparent 100%)",
              "radial-gradient(2px 2px at 22% 4%, rgba(255,255,230,0.8) 0%, transparent 100%)",
              "radial-gradient(1px 1px at 33% 12%, rgba(255,255,255,0.6) 0%, transparent 100%)",
              "radial-gradient(1.5px 1.5px at 44% 7%, rgba(255,255,255,0.9) 0%, transparent 100%)",
              "radial-gradient(1px 1px at 52% 18%, rgba(255,255,230,0.7) 0%, transparent 100%)",
              "radial-gradient(2px 2px at 61% 5%, rgba(255,255,255,0.8) 0%, transparent 100%)",
              "radial-gradient(1px 1px at 70% 14%, rgba(255,255,255,0.6) 0%, transparent 100%)",
              "radial-gradient(1.5px 1.5px at 79% 9%, rgba(255,255,230,0.7) 0%, transparent 100%)",
              "radial-gradient(1px 1px at 88% 3%, rgba(255,255,255,0.9) 0%, transparent 100%)",
              "radial-gradient(1px 1px at 95% 16%, rgba(255,255,255,0.6) 0%, transparent 100%)",
              "radial-gradient(2px 2px at 8% 30%, rgba(255,255,255,0.7) 0%, transparent 100%)",
              "radial-gradient(1px 1px at 18% 38%, rgba(255,255,230,0.5) 0%, transparent 100%)",
              "radial-gradient(1.5px 1.5px at 28% 25%, rgba(255,255,255,0.8) 0%, transparent 100%)",
              "radial-gradient(1px 1px at 40% 33%, rgba(255,255,255,0.6) 0%, transparent 100%)",
              "radial-gradient(1px 1px at 48% 28%, rgba(255,255,230,0.7) 0%, transparent 100%)",
              "radial-gradient(2px 2px at 58% 36%, rgba(255,255,255,0.8) 0%, transparent 100%)",
              "radial-gradient(1px 1px at 67% 22%, rgba(255,255,255,0.6) 0%, transparent 100%)",
              "radial-gradient(1.5px 1.5px at 76% 31%, rgba(255,255,230,0.7) 0%, transparent 100%)",
              "radial-gradient(1px 1px at 84% 24%, rgba(255,255,255,0.9) 0%, transparent 100%)",
              "radial-gradient(1px 1px at 93% 38%, rgba(255,255,255,0.6) 0%, transparent 100%)",
              "radial-gradient(1.5px 1.5px at 3% 52%, rgba(255,255,255,0.7) 0%, transparent 100%)",
              "radial-gradient(1px 1px at 20% 58%, rgba(255,255,230,0.5) 0%, transparent 100%)",
              "radial-gradient(1px 1px at 36% 48%, rgba(255,255,255,0.6) 0%, transparent 100%)",
              "radial-gradient(2px 2px at 55% 50%, rgba(255,255,255,0.8) 0%, transparent 100%)",
              "radial-gradient(1px 1px at 73% 45%, rgba(255,255,230,0.6) 0%, transparent 100%)",
              "radial-gradient(1.5px 1.5px at 91% 53%, rgba(255,255,255,0.7) 0%, transparent 100%)",
            ].join(", "),
          }}
        />
      </div>

      {/* ── Hero ── */}
      <section className="relative mx-auto grid min-h-[calc(100svh-72px)] max-w-7xl grid-cols-1 items-center gap-10 px-4 py-16 sm:py-20 lg:grid-cols-2 lg:gap-16 lg:py-28">
        {/* Left — headline + CTA */}
        <div className="flex flex-col">
          <p className="text-[11px] font-extrabold uppercase tracking-[0.26em] text-amber-400">
            {t("home_hero_eyebrow")}
          </p>
          <h1
            className="mt-4 text-4xl font-black leading-[1.07] tracking-[-0.02em] text-white sm:text-5xl lg:text-6xl xl:text-[4.5rem]"
            style={{ fontFamily: "var(--font-display-sans)" }}
          >
            {t("home_hero_title_prefix")}{" "}
            <span
              style={{
                background: "linear-gradient(105deg, #fcd34d 0%, #f59e0b 45%, #d97706 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {t("home_hero_title_highlight")}
            </span>
          </h1>
          <p className="mt-5 max-w-[52ch] text-base leading-relaxed text-slate-300 sm:text-lg">
            {t("home_hero_body")}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="/explore"
              className="inline-flex min-h-[3.5rem] items-center rounded-full px-8 py-3.5 text-base font-bold text-stone-950 shadow-lg shadow-amber-500/30 transition-all duration-200 hover:brightness-110 hover:shadow-xl hover:shadow-amber-500/40 active:scale-95"
              style={{
                background: "linear-gradient(105deg, #fcd34d 0%, #f59e0b 55%, #d97706 100%)",
              }}
            >
              {t("home_hero_cta")}
            </Link>
            <SpeakButton text={t("home_hero_speak_text")} label={t("common_hear_it")} />
          </div>
        </div>

        {/* Right — education stage cards */}
        <div className="relative">
          {/* Warm glow behind the card grid */}
          <div
            className="pointer-events-none absolute -inset-8 rounded-3xl"
            aria-hidden="true"
            style={{
              background: "radial-gradient(ellipse at center, rgba(180,120,15,0.22) 0%, transparent 70%)",
              filter: "blur(28px)",
            }}
          />
          <div
            aria-label={t("home_levels_aria")}
            className="relative grid grid-cols-2 gap-3 sm:gap-4"
          >
            {stages.map((stage, i) => (
              <Link
                key={stage.id}
                href={`/explore?stage=${stage.id}`}
                aria-label={t("home_stage_aria", {
                  label: locale === "es" ? stage.labelEs : stage.label,
                  gradeRange: stage.gradeRange,
                  ageRange: stage.ageRange,
                })}
                className="explore-scene-enter group flex flex-col rounded-2xl border border-white/8 bg-white/5 p-4 backdrop-blur-sm transition-all duration-300 hover:border-amber-400/30 hover:bg-white/10 sm:p-5"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <span className="text-3xl sm:text-4xl" aria-hidden="true">
                  {stage.badge}
                </span>
                <span className="mt-2.5 text-sm font-bold leading-tight text-white sm:text-base">
                  {locale === "es" ? stage.labelEs : stage.label}
                </span>
                <span className="mt-0.5 text-xs text-slate-400">{stage.ageRange}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Education stage navigation strip ── */}
      <div className="relative border-y border-white/8 bg-white/3">
        <div
          className="mx-auto flex max-w-7xl items-center overflow-x-auto px-4 py-3"
          style={{ scrollbarWidth: "none" }}
        >
          {stages.map((stage) => (
            <Link
              key={stage.id}
              href={`/explore?stage=${stage.id}`}
              className="flex-shrink-0 px-4 py-1.5 text-sm font-semibold text-slate-400 transition-colors duration-150 hover:text-amber-400"
            >
              {locale === "es" ? stage.labelEs : stage.label}
            </Link>
          ))}
        </div>
      </div>

      {/* ── Feature highlights ── */}
      <section className="relative mx-auto max-w-7xl px-4 py-16 sm:py-20">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {[
            {
              icon: "🎙️",
              title: t("home_features_hear_title"),
              desc: t("home_features_hear_desc"),
            },
            {
              icon: "🎨",
              title: t("home_features_do_title"),
              desc: t("home_features_do_desc"),
            },
            {
              icon: "🎓",
              title: t("home_features_span_title"),
              desc: t("home_features_span_desc"),
            },
          ].map((feature, i) => (
            <div
              key={i}
              className="rounded-2xl border border-white/8 bg-white/4 p-6 backdrop-blur-sm"
            >
              <span className="text-4xl" aria-hidden="true">
                {feature.icon}
              </span>
              <h3 className="mt-3 text-base font-bold text-white">{feature.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Parent & quick access links ── */}
      <section className="mx-auto max-w-7xl px-4 pb-20">
        <div className="rounded-2xl border border-white/8 bg-white/4 p-5 backdrop-blur-sm sm:p-6">
          <p className="text-sm font-bold text-white">{t("home_parent_links_summary")}</p>
          <p className="mt-1 text-sm text-slate-400">{t("home_parent_links_desc")}</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {[
              { href: "/auth/sign-in", icon: "🔐", label: t("home_quick_sign_in") },
              { href: "/who-is-learning", icon: "🚀", label: t("home_quick_choose_learner") },
              { href: "/parent/dashboard", icon: "👨‍👩‍👧", label: t("home_quick_parent_command_center") },
              { href: "/modules", icon: "📚", label: t("home_quick_module_catalog") },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="inline-flex min-h-11 items-center gap-2.5 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-semibold text-slate-200 transition-colors hover:border-amber-400/30 hover:text-amber-300"
              >
                <span aria-hidden="true">{link.icon}</span>
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
