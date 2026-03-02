"use client";

import { useCallback, useEffect, useMemo, useReducer, useRef } from "react";
import type { GameDifficulty, GameResult, LetterItem } from "@/lib/games/types";
import { calculateStars } from "@/lib/games/scoring";
import { hapticSuccess, hapticError, hapticCelebration } from "@/lib/platform/haptics";
import { LETTER_BANK, getRandomItems } from "@/lib/games/content-banks";
import MascotFriend from "@/components/experience/KoydoMascotFriends";
import JuicyConfetti from "@/components/experience/JuicyConfetti";
import JuicyStreak from "@/components/experience/JuicyStreak";
import PhysicalButton from "@/components/experience/PhysicalButton";
import MascotHost from "@/components/experience/MascotHost";
import { motion, AnimatePresence } from "framer-motion";

/* ─── constants ─── */
const ROUNDS_PER_GAME = 10;
const FALLING_LETTERS_COUNT = 6;
const FALL_DURATION_MS: Record<GameDifficulty, number> = {
  easy: 6000,
  medium: 4500,
  hard: 3200,
};

/* ─── helpers ─── */
function getLetterPool(difficulty: GameDifficulty): LetterItem[] {
  const upperOnly = LETTER_BANK.items.filter((l) => l.case === "upper");
  if (difficulty === "easy") return upperOnly.filter((l) => l.letter <= "F");
  if (difficulty === "medium") return upperOnly.filter((l) => l.letter <= "M");
  return upperOnly;
}

function pickRound(
  pool: LetterItem[],
  count: number,
): { target: LetterItem; falling: LetterItem[] } {
  const shuffled = getRandomItems(pool, Math.min(count, pool.length));
  const target = shuffled[0]!;
  // Ensure the target is always among the falling set
  const rest = shuffled.slice(1, count);
  const falling = getRandomItems([target, ...rest], count);
  return { target, falling };
}

/* ─── state machine ─── */
type FallingLetter = LetterItem & {
  lane: number; // 0-based column index
  delayMs: number;
  status: "falling" | "correct" | "wrong" | "idle";
};

type State = {
  phase: "ready" | "playing" | "feedback" | "complete";
  round: number;
  score: number;
  streak: number;
  target: LetterItem | null;
  falling: FallingLetter[];
  feedbackCorrect: boolean | null;
  startTime: number;
  mascotMood: "idle" | "happy" | "thinking" | "sad" | "cheering" | "surprised";
};

type Action =
  | { type: "START" }
  | { type: "SET_ROUND"; target: LetterItem; falling: FallingLetter[] }
  | { type: "TAP"; letterId: string }
  | { type: "TIMEOUT" }
  | { type: "NEXT_ROUND" }
  | { type: "COMPLETE" }
  | { type: "SET_MOOD"; mood: State["mascotMood"] };

function initState(): State {
  return {
    phase: "ready",
    round: 0,
    score: 0,
    streak: 0,
    target: null,
    falling: [],
    feedbackCorrect: null,
    startTime: Date.now(),
    mascotMood: "idle",
  };
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "START":
      return { ...state, phase: "playing", startTime: Date.now(), mascotMood: "happy" };
    case "SET_ROUND":
      return {
        ...state,
        phase: "playing",
        round: state.round + 1,
        target: action.target,
        falling: action.falling,
        feedbackCorrect: null,
        mascotMood: "thinking",
      };
    case "TAP": {
      const isCorrect =
        state.target !== null &&
        state.falling.some(
          (f) =>
            f.id === action.letterId &&
            f.letter === state.target!.letter,
        );
      return {
        ...state,
        phase: "feedback",
        score: isCorrect ? state.score + 1 : state.score,
        streak: isCorrect ? state.streak + 1 : 0,
        feedbackCorrect: isCorrect,
        mascotMood: isCorrect ? "cheering" : "sad",
        falling: state.falling.map((f) =>
          f.id === action.letterId
            ? { ...f, status: isCorrect ? "correct" : "wrong" }
            : f,
        ),
      };
    }
    case "TIMEOUT":
      return { ...state, phase: "feedback", feedbackCorrect: false, mascotMood: "sad", streak: 0 };
    case "NEXT_ROUND":
      return { ...state, phase: "playing", mascotMood: "thinking" };
    case "COMPLETE":
      return { ...state, phase: "complete", mascotMood: "cheering" };
    case "SET_MOOD":
      return { ...state, mascotMood: action.mood };
    default:
      return state;
  }
}

/* ─── component ─── */
export type LetterCatcherProps = {
  difficulty: GameDifficulty;
  onComplete: (result: GameResult) => void;
};

export function LetterCatcher({ difficulty, onComplete }: LetterCatcherProps) {
  const [state, dispatch] = useReducer(reducer, undefined, initState);
  const pool = useMemo(() => getLetterPool(difficulty), [difficulty]);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* ── advance to next round ── */
  const advanceRound = useCallback(() => {
    if (state.round >= ROUNDS_PER_GAME) {
      dispatch({ type: "COMPLETE" });
      return;
    }
    const { target, falling } = pickRound(pool, FALLING_LETTERS_COUNT);
    const mapped: FallingLetter[] = falling.map((l, i) => ({
      ...l,
      lane: i % FALLING_LETTERS_COUNT,
      delayMs: Math.random() * 1200,
      status: "falling" as const,
    }));
    dispatch({ type: "SET_ROUND", target, falling: mapped });
  }, [pool, state.round]);

  /* ── start game ── */
  const startGame = useCallback(() => {
    dispatch({ type: "START" });
  }, []);

  /* kick off first round after START */
  useEffect(() => {
    if (state.phase === "playing" && state.round === 0) {
      advanceRound();
    }
  }, [state.phase, state.round, advanceRound]);

  /* ── auto-advance after feedback ── */
  useEffect(() => {
    if (state.phase === "feedback") {
      timerRef.current = setTimeout(() => {
        if (state.round >= ROUNDS_PER_GAME) {
          dispatch({ type: "COMPLETE" });
        } else {
          dispatch({ type: "NEXT_ROUND" });
          // small delay then advance
          setTimeout(() => advanceRound(), 100);
        }
      }, 1200);
      return () => {
        if (timerRef.current) clearTimeout(timerRef.current);
      };
    }
  }, [state.phase, state.round, advanceRound]);

  /* ── fire onComplete ── */
  useEffect(() => {
    if (state.phase === "complete") {
      const stars = calculateStars(state.score, ROUNDS_PER_GAME);
      if (stars === 3) void hapticCelebration();
      const result: GameResult = {
        gameType: "letter-catcher",
        score: state.score,
        maxScore: ROUNDS_PER_GAME,
        stars,
        timeMs: Date.now() - state.startTime,
        difficulty,
      };

      // Delay fire so user sees the complete screen
      const timer = setTimeout(() => onComplete(result), 4000);
      return () => clearTimeout(timer);
    }
  }, [state.phase, state.score, state.startTime, difficulty, onComplete]);

  /* ── handle tap ── */
  const handleTap = useCallback(
    (letterId: string) => {
      if (state.phase !== "playing") return;
      const tapped = state.falling.find((f) => f.id === letterId);
      if (!tapped) return;
      const isCorrect = tapped.letter === state.target?.letter;
      if (isCorrect) void hapticSuccess();
      else void hapticError();
      dispatch({ type: "TAP", letterId });
    },
    [state.phase, state.falling, state.target],
  );

  /* ─── RENDER ─── */

  /* Ready screen */
  if (state.phase === "ready") {
    return (
      <div className="flex min-h-[420px] flex-col items-center justify-center gap-8 rounded-[3rem] bg-gradient-to-br from-indigo-100 to-sky-200 p-12 shadow-2xl dark:from-indigo-900 dark:to-sky-950 border-4 border-white/50">
        <MascotFriend id="echo" mood="happy" size={160} />
        <div className="text-center space-y-2">
          <h2 className="text-4xl font-black text-sky-900 dark:text-sky-100 italic">
            Letter Catcher
          </h2>
          <p className="max-w-xs text-lg font-medium text-stone-600 dark:text-stone-300">
            Listen to Echo and catch the right letters!
          </p>
        </div>
        <PhysicalButton onClick={startGame} variant="primary" className="px-12 py-6 text-2xl">
          Start Game 🚀
        </PhysicalButton>
      </div>
    );
  }

  /* Complete screen */
  if (state.phase === "complete") {
    const stars = calculateStars(state.score, ROUNDS_PER_GAME);
    return (
      <div className="flex min-h-[420px] flex-col items-center justify-center gap-6 rounded-[3rem] bg-gradient-to-br from-amber-100 to-orange-200 p-12 shadow-2xl dark:from-amber-900 dark:to-orange-950 border-4 border-white/50">
        <JuicyConfetti active={stars === 3} durationMs={4000} />
        <MascotFriend id="echo" mood="cheering" size={180} message={stars === 3 ? "UNSTOPPABLE!" : "Keep soaring!"} />

        <div className="flex gap-2">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: i < stars ? 1 : 0.5, rotate: 0, opacity: i < stars ? 1 : 0.3 }}
              transition={{ delay: i * 0.2, type: "spring" }}
              className="text-6xl"
            >
              ⭐
            </motion.div>
          ))}
        </div>

        <h2 className="text-3xl font-black text-amber-900 dark:text-amber-100">
          Lesson Complete!
        </h2>
        <p className="text-xl font-bold text-stone-700 dark:text-stone-300">
          Total Caught: <span className="text-3xl text-sky-600">{state.score}</span>
        </p>
      </div>
    );
  }

  /* Playing / Feedback screen */
  const fallDuration = FALL_DURATION_MS[difficulty];

  return (
    <MascotHost friendId="echo" initialMood="happy">
      <div className="relative h-[600px] w-full max-w-2xl overflow-hidden rounded-3xl border-4 border-zinc-200 bg-white shadow-xl touch-none">
        <JuicyConfetti active={state.phase === "feedback" && state.feedbackCorrect === true} particleCount={20} durationMs={1000} />

        {/* Interface Bar */}
        <div className="flex items-center justify-between relative z-20">
          <div className="flex items-center gap-4">
            <MascotFriend id="echo" mood={state.mascotMood} size={64} />
            <div className="flex flex-col">
              <span className="text-xs font-black uppercase tracking-widest text-sky-600 opacity-60">Progress</span>
              <span className="text-xl font-black text-stone-800 dark:text-stone-100">
                {state.round}/{ROUNDS_PER_GAME}
              </span>
            </div>
          </div>

          <div className="flex flex-col items-end">
            <JuicyStreak count={state.streak} />
          </div>
        </div>

        {/* Target Prompt */}
        <AnimatePresence mode="wait">
          {state.target && (
            <motion.div
              key={state.target.id}
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              className="text-center bg-white/40 dark:bg-black/20 backdrop-blur-md py-4 rounded-3xl border border-white/20 relative z-20"
            >
              <p className="text-stone-500 font-bold uppercase tracking-tighter text-sm mb-1">Catch the Letter for</p>
              <h3 className="text-4xl font-black text-sky-600 dark:text-sky-300 italic flex items-center justify-center gap-3">
                "{state.target.word}" {state.target.emoji}
              </h3>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Falling letters area */}
        <div
          className="relative flex-1 min-h-[300px] z-10"
          role="group"
          aria-label="Falling letters area"
        >
          {state.falling.map((fl) => {
            const leftPercent = (fl.lane / FALLING_LETTERS_COUNT) * 100 + 5;
            const isCorrectHit = fl.status === "correct";
            const isWrongHit = fl.status === "wrong";

            return (
              <motion.button
                key={fl.id}
                initial={false}
                animate={isCorrectHit ? { scale: 1.5, rotate: 10 } : isWrongHit ? { x: [0, -10, 10, 0] } : {}}
                disabled={state.phase !== "playing"}
                onClick={() => handleTap(fl.id)}
                aria-label={`Letter ${fl.letter}`}
                className={[
                  "absolute flex h-20 w-20 items-center justify-center rounded-3xl text-4xl font-black shadow-xl transition-colors border-b-4",
                  isCorrectHit
                    ? "bg-emerald-400 border-emerald-600 text-white z-50"
                    : isWrongHit
                      ? "bg-red-400 border-red-600 text-white z-50"
                      : "bg-white border-stone-200 text-stone-800 hover:bg-sky-50 dark:bg-stone-800 dark:border-stone-900 dark:text-white",
                ].join(" ")}
                style={{
                  left: `${leftPercent}%`,
                  animation: fl.status === "falling" ? `fall ${fallDuration}ms ${fl.delayMs}ms linear forwards` : undefined,
                  top: fl.status === "falling" ? "-80px" : undefined,
                  visibility: fl.status === "idle" ? "hidden" : "visible"
                }}
              >
                {fl.letter}
              </motion.button>
            );
          })}
        </div>

        {/* Feedback overlay */}
        {state.phase === "feedback" && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/10 rounded-2xl">
            <div className={[
              "rounded-2xl px-8 py-4 text-center shadow-lg transition-all border-2",
              state.feedbackCorrect
                ? "bg-emerald-50 border-emerald-200 animate-in zoom-in"
                : "bg-red-50 border-red-200 animate-in shake"
            ].join(" ")}>
              <p className="text-2xl font-bold text-zinc-900">
                {state.feedbackCorrect ? "Perfect! ✨" : "Oops! Try again"}
              </p>
            </div>
          </div>
        )}

        <style>{`
        @keyframes fall {
          from { top: -80px; transform: rotate(0deg); }
          to   { top: calc(100% + 20px); transform: rotate(15deg); }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-6px); }
          40% { transform: translateX(6px); }
          60% { transform: translateX(-4px); }
          80% { transform: translateX(4px); }
        }
      `}</style>
      </div>
    </MascotHost>
  );
}
