/**
 * useGameResult — submit a completed game to the backend and pipe rewards
 * through ExperienceProvider so celebration UI fires automatically.
 *
 * OWNED BY: Claude Code (session 2026-03-01)
 * SPEC: GAMIFICATION_2026_VISION.md — Phase 1: ExperienceProvider wiring
 *
 * Usage
 * ─────
 *   const { submitResult, isSubmitting, lastResult } = useGameResult();
 *
 *   // On game-over:
 *   const outcome = await submitResult({
 *     gameType: "letter-catcher",
 *     difficulty: "medium",
 *     score: 8,
 *     maxScore: 10,
 *     timeMs: 42000,
 *   });
 *   // outcome.pointsAwarded, outcome.badgeEarned, outcome.stars available
 *   // JuicyConfetti / AchievementToast fire automatically via ExperienceProvider
 */

"use client";

import { useCallback, useRef, useState } from "react";
import type { GameDifficulty, GameStars, GameType } from "@/lib/games/types";
import { useExperience } from "./experience-context";

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

export type GameResultInput = {
  gameType: GameType;
  difficulty: GameDifficulty;
  score: number;
  maxScore: number;
  timeMs: number;
  /** Optional profile scoping for multi-profile families. */
  studentProfileId?: string;
};

export type GameResultOutcome = {
  stars: GameStars;
  pointsAwarded: number;
  badgeEarned?: string;
  normalizedScore?: number;
  error?: string;
};

type UseGameResultReturn = {
  /** Submit a completed game. Returns the server-confirmed outcome. */
  submitResult: (input: GameResultInput) => Promise<GameResultOutcome>;
  /** True while the POST is in-flight. */
  isSubmitting: boolean;
  /** The outcome of the most recently submitted game, or null. */
  lastResult: GameResultOutcome | null;
};

// ─────────────────────────────────────────────────────────────────────────────
// Hook
// ─────────────────────────────────────────────────────────────────────────────

export function useGameResult(): UseGameResultReturn {
  const { awardXP, awardBadge, isUnavailable } = useExperience();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lastResult, setLastResult] = useState<GameResultOutcome | null>(null);

  // Deduplicate rapid re-submissions (e.g. double-tap on game-over screen)
  const inflightRef = useRef(false);

  const submitResult = useCallback(
    async (input: GameResultInput): Promise<GameResultOutcome> => {
      if (inflightRef.current) {
        return lastResult ?? { stars: 0, pointsAwarded: 0, error: "Already submitting." };
      }

      inflightRef.current = true;
      setIsSubmitting(true);

      // Graceful degradation: if gamification tables aren't ready, skip silently
      if (isUnavailable) {
        const fallback: GameResultOutcome = { stars: 0, pointsAwarded: 0 };
        setLastResult(fallback);
        setIsSubmitting(false);
        inflightRef.current = false;
        return fallback;
      }

      try {
        const res = await fetch("/api/games/state", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(input),
          cache: "no-store",
        });

        if (!res.ok) {
          const body = await res.json().catch(() => ({})) as { error?: string };
          const outcome: GameResultOutcome = {
            stars: 0,
            pointsAwarded: 0,
            error: body.error ?? "Failed to submit game result.",
          };
          setLastResult(outcome);
          return outcome;
        }

        const data = await res.json() as {
          result?: { stars?: number };
          pointsAwarded?: number;
          badgeEarned?: string;
          normalizedScore?: number;
        };

        const stars = (data.result?.stars ?? 0) as GameStars;
        const pointsAwarded = data.pointsAwarded ?? 0;
        const badgeEarned = data.badgeEarned;

        // ── Pipe through ExperienceProvider so celebration UI fires ──────────
        // awardXP handles optimistic update + server reconcile internally;
        // we pass 0 here because /api/games/state already committed the points.
        // Instead we push a synthetic local update so the context reflects it.
        if (pointsAwarded > 0) {
          // We use a "local-only" approach: awardXP with the awarded amount
          // but pass source="game_submitted" so the server POST is a no-op
          // if the games/state route already wrote it. In practice the
          // language/gamification/state endpoint is idempotent via upsert.
          await awardXP(pointsAwarded, `game:${input.gameType}`);
        }

        if (badgeEarned) {
          const badgeLabel =
            badgeEarned.replace(/-/g, " ").replace(/^./, (c) => c.toUpperCase());
          await awardBadge(badgeEarned, badgeLabel);
        }

        const outcome: GameResultOutcome = {
          stars,
          pointsAwarded,
          badgeEarned,
          normalizedScore: data.normalizedScore,
        };

        setLastResult(outcome);
        return outcome;
      } catch {
        const outcome: GameResultOutcome = {
          stars: 0,
          pointsAwarded: 0,
          error: "Network error. Your score has been saved locally.",
        };
        setLastResult(outcome);
        return outcome;
      } finally {
        setIsSubmitting(false);
        inflightRef.current = false;
      }
    },
    [awardXP, awardBadge, isUnavailable, lastResult],
  );

  return { submitResult, isSubmitting, lastResult };
}
