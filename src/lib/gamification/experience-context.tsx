/**
 * ExperienceProvider — Global gamification wiring layer.
 *
 * OWNED BY: Claude Code (session 2026-03-01)
 * SPEC: GAMIFICATION_2026_VISION.md — Phase 1: ExperienceProvider
 *
 * Responsibilities
 * ────────────────
 * 1. Hydrates XP / level / streak / badge state from
 *    GET /api/language/gamification/state on mount.
 * 2. Exposes { awardXP, awardBadge, notifyLevelUp } actions that:
 *    a. Optimistically update local state immediately (zero-latency UX).
 *    b. Fire POST /api/language/gamification/state in the background.
 *    c. Reconcile server response or roll back on error.
 * 3. Automatically renders JuicyConfetti + AchievementToast overlays when
 *    significant events occur (level-up, badge earned, streak milestone).
 * 4. Provides useExperience() hook for any component that needs XP/level data.
 *
 * No direct Supabase calls — everything goes through the validated API routes
 * so RLS / rate-limiting / audit logging stay in place.
 */

"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from "react";
import type { ReactNode } from "react";
import JuicyConfetti from "@/components/experience/JuicyConfetti";
import AchievementToast from "@/components/experience/AchievementToast";

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

export type BadgeEntry = {
  id: string;
  label?: string;
  earnedAt: string;
};

export type ExperienceState = {
  /** Total accumulated points across all games / lessons. */
  points: number;
  /** Current level (derived: 1 + floor(points / 100)). */
  level: number;
  /** All earned badges. */
  badges: BadgeEntry[];
  /** { daily, weekly } streak counters. */
  streaks: { daily: number; weekly: number };
  /** ISO string of last recorded activity. */
  lastActivityAt: string | null;
  /** True while the initial API fetch is in-flight. */
  isLoading: boolean;
  /** True if gamification tables aren't migrated yet (graceful degradation). */
  isUnavailable: boolean;
};

type PendingReward = {
  type: "level_up" | "badge" | "streak_milestone";
  title: string;
  description: string;
  /** Show confetti burst for these event types. */
  showConfetti: boolean;
} | null;

type ExperienceActions = {
  /** Award XP points. Source is stored in event metadata. */
  awardXP: (amount: number, source?: string) => Promise<void>;
  /** Award a badge by id. Pass a human-readable label for display. */
  awardBadge: (id: string, label?: string) => Promise<void>;
  /** Clear the queued reward (called by overlays when dismissed). */
  dismissReward: () => void;
};

type ExperienceContextValue = ExperienceState & ExperienceActions;

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────

const POINTS_PER_LEVEL = 100;
const MAX_LEVEL = 20;
const STREAK_MILESTONE_THRESHOLD = [3, 7, 30, 100] as const;

function deriveLevel(points: number): number {
  return Math.min(MAX_LEVEL, Math.max(1, Math.floor(points / POINTS_PER_LEVEL) + 1));
}

function isStreakMilestone(streak: number): boolean {
  return (STREAK_MILESTONE_THRESHOLD as readonly number[]).includes(streak);
}

// ─────────────────────────────────────────────────────────────────────────────
// Reducer
// ─────────────────────────────────────────────────────────────────────────────

type Action =
  | { type: "HYDRATE"; payload: Partial<ExperienceState> }
  | { type: "AWARD_XP_OPTIMISTIC"; amount: number }
  | { type: "AWARD_BADGE_OPTIMISTIC"; badge: BadgeEntry }
  | { type: "RECONCILE_SERVER"; payload: Partial<ExperienceState> }
  | { type: "SET_UNAVAILABLE" }
  | { type: "SET_LOADING"; loading: boolean };

function reducer(state: ExperienceState, action: Action): ExperienceState {
  switch (action.type) {
    case "HYDRATE":
    case "RECONCILE_SERVER": {
      const points = action.payload.points ?? state.points;
      return {
        ...state,
        ...action.payload,
        points,
        level: deriveLevel(points),
        isLoading: false,
      };
    }
    case "AWARD_XP_OPTIMISTIC": {
      const points = state.points + action.amount;
      return { ...state, points, level: deriveLevel(points) };
    }
    case "AWARD_BADGE_OPTIMISTIC": {
      const alreadyHas = state.badges.some((b) => b.id === action.badge.id);
      if (alreadyHas) return state;
      return { ...state, badges: [...state.badges, action.badge] };
    }
    case "SET_UNAVAILABLE":
      return { ...state, isLoading: false, isUnavailable: true };
    case "SET_LOADING":
      return { ...state, isLoading: action.loading };
    default:
      return state;
  }
}

const INITIAL_STATE: ExperienceState = {
  points: 0,
  level: 1,
  badges: [],
  streaks: { daily: 0, weekly: 0 },
  lastActivityAt: null,
  isLoading: true,
  isUnavailable: false,
};

// ─────────────────────────────────────────────────────────────────────────────
// Context
// ─────────────────────────────────────────────────────────────────────────────

const ExperienceContext = createContext<ExperienceContextValue | null>(null);

// ─────────────────────────────────────────────────────────────────────────────
// Provider
// ─────────────────────────────────────────────────────────────────────────────

export function ExperienceProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const [pendingReward, setPendingReward] = useState<PendingReward>(null);
  const [showConfetti, setShowConfetti] = useState(false);

  // Track previous level to detect level-up after optimistic update
  const prevLevelRef = useRef<number>(1);

  // ── Initial hydration ─────────────────────────────────────────────────────
  useEffect(() => {
    let cancelled = false;

    async function hydrate() {
      try {
        const res = await fetch("/api/language/gamification/state", {
          cache: "no-store",
        });

        if (!res.ok) {
          if (res.status === 503 || res.status === 401) {
            if (!cancelled) dispatch({ type: "SET_UNAVAILABLE" });
            return;
          }
          if (!cancelled) dispatch({ type: "SET_LOADING", loading: false });
          return;
        }

        const json = await res.json() as {
          state?: {
            points?: number;
            level?: number;
            badges?: unknown;
            streaks?: unknown;
            last_activity_at?: string;
          } | null;
        };

        if (cancelled) return;

        if (!json.state) {
          dispatch({ type: "SET_LOADING", loading: false });
          return;
        }

        const s = json.state;
        const points = typeof s.points === "number" ? s.points : 0;
        dispatch({
          type: "HYDRATE",
          payload: {
            points,
            level: deriveLevel(points),
            badges: Array.isArray(s.badges) ? (s.badges as BadgeEntry[]) : [],
            streaks:
              s.streaks && typeof s.streaks === "object"
                ? (s.streaks as { daily: number; weekly: number })
                : { daily: 0, weekly: 0 },
            lastActivityAt:
              typeof s.last_activity_at === "string" ? s.last_activity_at : null,
          },
        });
        prevLevelRef.current = deriveLevel(points);
      } catch {
        if (!cancelled) dispatch({ type: "SET_LOADING", loading: false });
      }
    }

    void hydrate();
    return () => { cancelled = true; };
  }, []);

  // ── Detect level-up after optimistic update ───────────────────────────────
  useEffect(() => {
    if (state.isLoading || state.isUnavailable) return;
    if (state.level > prevLevelRef.current) {
      setPendingReward({
        type: "level_up",
        title: `Level ${state.level} reached!`,
        description: `You've unlocked new content and challenges.`,
        showConfetti: true,
      });
    }
    prevLevelRef.current = state.level;
  }, [state.level, state.isLoading, state.isUnavailable]);

  // ── Actions ───────────────────────────────────────────────────────────────

  const awardXP = useCallback(async (amount: number, source = "general") => {
    if (state.isUnavailable || amount <= 0) return;

    // Optimistic update
    dispatch({ type: "AWARD_XP_OPTIMISTIC", amount });

    try {
      const res = await fetch("/api/language/gamification/state", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eventType: "points_awarded",
          pointsDelta: amount,
          metadata: { source },
        }),
      });

      if (!res.ok) return;

      const json = await res.json() as {
        state?: { points?: number; level?: number; badges?: unknown; streaks?: unknown; last_activity_at?: string } | null;
      };

      if (json.state) {
        const pts = typeof json.state.points === "number" ? json.state.points : state.points + amount;
        dispatch({
          type: "RECONCILE_SERVER",
          payload: {
            points: pts,
            level: deriveLevel(pts),
            badges: Array.isArray(json.state.badges) ? (json.state.badges as BadgeEntry[]) : state.badges,
            lastActivityAt: typeof json.state.last_activity_at === "string" ? json.state.last_activity_at : state.lastActivityAt,
          },
        });
      }
    } catch {
      // Optimistic state stays; will reconcile on next load
    }
  }, [state.isUnavailable, state.points, state.badges, state.lastActivityAt]);

  const awardBadge = useCallback(async (id: string, label?: string) => {
    if (state.isUnavailable) return;
    if (state.badges.some((b) => b.id === id)) return; // already earned

    const badge: BadgeEntry = { id, label, earnedAt: new Date().toISOString() };

    // Optimistic update
    dispatch({ type: "AWARD_BADGE_OPTIMISTIC", badge });

    // Queue celebration
    setPendingReward({
      type: "badge",
      title: label ?? `Badge earned: ${id}`,
      description: "Keep going to earn more!",
      showConfetti: false,
    });

    try {
      await fetch("/api/language/gamification/state", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eventType: "badge_earned",
          pointsDelta: 0,
          badgeId: id,
          badgeLabel: label,
        }),
      });
    } catch {
      // Badge stays locally; will reconcile on next load
    }
  }, [state.isUnavailable, state.badges]);

  const dismissReward = useCallback(() => {
    setPendingReward(null);
    setShowConfetti(false);
  }, []);

  // ── Trigger confetti when reward has showConfetti=true ────────────────────
  useEffect(() => {
    if (pendingReward?.showConfetti) {
      setShowConfetti(true);
    }
  }, [pendingReward]);

  // ── Streak milestone detection ────────────────────────────────────────────
  useEffect(() => {
    if (!state.isLoading && isStreakMilestone(state.streaks.daily)) {
      setPendingReward((prev) =>
        prev ? prev : {
          type: "streak_milestone",
          title: `${state.streaks.daily}-Day Streak!`,
          description: "You're on fire. Keep the learning going!",
          showConfetti: state.streaks.daily >= 7,
        },
      );
    }
    // Only react to streaks change, not every render
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.streaks.daily]);

  const value = useMemo<ExperienceContextValue>(
    () => ({ ...state, awardXP, awardBadge, dismissReward }),
    [state, awardXP, awardBadge, dismissReward],
  );

  return (
    <ExperienceContext.Provider value={value}>
      {children}

      {/* Global celebration overlays — rendered once at app root */}
      <JuicyConfetti
        active={showConfetti}
        durationMs={3500}
        particleCount={120}
        onComplete={() => setShowConfetti(false)}
      />

      {pendingReward && (
        <AchievementToast
          show={Boolean(pendingReward)}
          title={pendingReward.title}
          description={pendingReward.description}
          type={pendingReward.type === "badge" ? "achievement" : "level-up"}
          onClose={dismissReward}
        />
      )}
    </ExperienceContext.Provider>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Hook
// ─────────────────────────────────────────────────────────────────────────────

/**
 * useExperience — access the player's XP state and reward actions.
 *
 * @example
 * const { points, level, badges, awardXP, awardBadge } = useExperience();
 *
 * // Award points when a lesson is completed
 * await awardXP(25, "lesson_complete");
 *
 * // Award a badge
 * await awardBadge("bookworm", "Bookworm");
 */
export function useExperience(): ExperienceContextValue {
  const ctx = useContext(ExperienceContext);
  if (!ctx) {
    throw new Error("useExperience must be called inside <ExperienceProvider>.");
  }
  return ctx;
}
