"use client";

import Link from "next/link";
import { useCallback, useRef } from "react";
import type { EducationStage } from "@/lib/explorer/scenes";
import { trackExplorerInteraction } from "@/lib/analytics/explorer-events";
import { useI18n } from "@/lib/i18n/provider";
import { motion } from "framer-motion";
import { hapticSuccess } from "@/lib/platform/haptics";

type StageLinkCardProps = {
  stage: EducationStage;
  index: number;
  isRecommended?: boolean;
};

export default function StageLinkCard({ stage, index, isRecommended }: StageLinkCardProps) {
  const cardRef = useRef<HTMLElement>(null);
  const { locale, t } = useI18n();
  const label = locale === "es" ? stage.labelEs : stage.label;
  const description = locale === "es" ? stage.descriptionEs : stage.description;

  const prefersReducedMotion = typeof window !== "undefined"
    ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
    : false;

  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLElement>) => {
    if (prefersReducedMotion) return;
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const tiltX = (y - 0.5) * -10;
    const tiltY = (x - 0.5) * 10;
    el.style.transform = `perspective(800px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(1.02)`;
    el.style.setProperty("--mx", `${x * 100}%`);
    el.style.setProperty("--my", `${y * 100}%`);
  }, [prefersReducedMotion]);

  const handlePointerLeave = useCallback(() => {
    const el = cardRef.current;
    if (!el) return;
    el.style.transform = "";
  }, []);

  const destination = `/explore?stage=${stage.id}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: index * 0.08, type: "spring", stiffness: 200, damping: 20 }}
    >
      <Link
        href={destination}
        aria-label={t("stage_card_aria", {
          label,
          gradeRange: stage.gradeRange,
          ageRange: stage.ageRange,
        })}
        className="ui-focus-ring block rounded-[2.5rem]"
        onClick={() => {
          void hapticSuccess();
          trackExplorerInteraction({
            surface: "lobby",
            action: "world_selected",
            targetTopicId: stage.id,
            destination,
          });
        }}
      >
        <article
          ref={cardRef}
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
          className="group relative flex min-h-[300px] flex-col items-center justify-center overflow-hidden rounded-[2.5rem] p-6 shadow-xl transition-all duration-300 hover:shadow-2xl border-2 border-white/20 dark:border-white/5"
          style={
            {
              background: stage.gradient,
              transition: "transform 250ms cubic-bezier(0.23, 1, 0.32, 1)",
            } as React.CSSProperties
          }
        >
          {/* Spotlight shimmer effect */}
          <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity bg-[radial-gradient(circle_at_var(--mx)_var(--my),rgba(255,255,255,0.4),transparent_40%)]" />

          {isRecommended && (
            <span className="absolute top-4 right-4 z-10 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1 text-xs font-black text-blue-600 shadow-sm backdrop-blur-sm">
              {t("stage_card_recommended")} ✨
            </span>
          )}

          {/* Badge */}
          <div
            className="relative flex items-center justify-center h-28 w-28 rounded-full bg-white/40 dark:bg-black/20 backdrop-blur-sm mb-4 border border-white/30"
          >
            <span className="text-6xl group-hover:scale-125 transition-transform duration-500 ease-out">
              {stage.badge}
            </span>
          </div>

          {/* Label */}
          <span className="relative mt-2 rounded-full border border-zinc-200/50 bg-white/60 px-3 py-0.5 text-[10px] font-black uppercase tracking-widest text-zinc-600 backdrop-blur-md">
            {t("stage_card_position", { current: index + 1, total: 6 })}
          </span>
          <h2 className="relative mt-4 text-center text-2xl font-black italic tracking-tighter text-zinc-900 dark:text-white sm:text-3xl">
            {label}
          </h2>

          {/* Description */}
          <p className="relative mt-2 max-w-[24ch] text-center text-sm font-medium text-zinc-700 dark:text-zinc-200 opacity-80">
            {description}
          </p>

          {/* Grade + Age chips */}
          <div className="relative mt-4 flex items-center gap-3">
            <span
              className="rounded-xl px-3 py-1 text-xs font-black text-white shadow-sm ring-1 ring-white/20"
              style={{ backgroundColor: stage.glowColor }}
            >
              {stage.gradeRange}
            </span>
            <span className="rounded-xl border border-white/30 bg-white/40 px-3 py-1 text-xs font-bold text-zinc-800 backdrop-blur-sm dark:bg-black/30 dark:text-zinc-200">
              {stage.ageRange}
            </span>
          </div>

          {/* Floor Shadow (Fake 3D) */}
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/5 to-transparent pointer-none" />
        </article>
      </Link>
    </motion.div>
  );
}
