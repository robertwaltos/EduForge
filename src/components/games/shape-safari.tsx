import { useCallback, useEffect, useMemo, useReducer, useState } from "react";
import type { GameDifficulty, GameResult, ShapeItem } from "@/lib/games/types";
import { calculateStars } from "@/lib/games/scoring";
import { hapticSuccess, hapticError, hapticCelebration, hapticSelection } from "@/lib/platform/haptics";
import { SHAPE_BANK, getItemsByDifficulty, getRandomItems } from "@/lib/games/content-banks";
import { motion, AnimatePresence } from "framer-motion";
import MascotFriend from "@/components/experience/KoydoMascotFriends";
import JuicyStreak from "@/components/experience/JuicyStreak";
import PhysicalButton from "@/components/experience/PhysicalButton";
import { Star, Trophy, Wind, TreePine, Globe } from "lucide-react";

/* ─── constants ─── */
function roundCount(difficulty: GameDifficulty): number {
  if (difficulty === "easy") return 6;
  if (difficulty === "medium") return 8;
  return 10;
}

/* ─── state ─── */
type State = {
  phase: "ready" | "playing" | "feedback" | "complete";
  items: ShapeItem[];
  round: number;
  score: number;
  streak: number;
  maxRounds: number;
  choices: string[];
  lastCorrect: boolean;
  lastAnswer: string;
  realWorldExample: string;
  startTime: number;
};

type Action =
  | { type: "START"; items: ShapeItem[] }
  | { type: "ANSWER"; answer: string }
  | { type: "NEXT" }
  | { type: "COMPLETE" };

function initState(): State {
  return {
    phase: "ready",
    items: [],
    round: 0,
    score: 0,
    streak: 0,
    maxRounds: 0,
    choices: [],
    lastCorrect: false,
    lastAnswer: "",
    realWorldExample: "",
    startTime: Date.now(),
  };
}

function shuffleChoices(correct: string, pool: ShapeItem[]): string[] {
  const wrongSet = new Set<string>();
  for (const item of pool) {
    if (item.name !== correct) wrongSet.add(item.name);
    if (wrongSet.size >= 3) break;
  }
  const opts = [correct, ...Array.from(wrongSet).slice(0, 3)];
  for (let i = opts.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [opts[i], opts[j]] = [opts[j]!, opts[i]!];
  }
  return opts;
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "START":
      return {
        ...state,
        phase: "playing",
        items: action.items,
        round: 0,
        score: 0,
        streak: 0,
        maxRounds: action.items.length,
        choices: shuffleChoices(action.items[0]!.name, action.items),
        lastCorrect: false,
        lastAnswer: "",
        realWorldExample: "",
        startTime: Date.now(),
      };
    case "ANSWER": {
      const current = state.items[state.round];
      if (!current) return state;
      const correct = action.answer === current.name;
      return {
        ...state,
        phase: "feedback",
        score: correct ? state.score + 1 : state.score,
        streak: correct ? state.streak + 1 : 0,
        lastCorrect: correct,
        lastAnswer: current.name,
        realWorldExample: current.realWorldExample,
      };
    }
    case "NEXT": {
      const nextRound = state.round + 1;
      if (nextRound >= state.maxRounds) {
        return { ...state, phase: "complete" };
      }
      const nextItem = state.items[nextRound];
      return {
        ...state,
        phase: "playing",
        round: nextRound,
        choices: nextItem
          ? shuffleChoices(nextItem.name, state.items)
          : [],
      };
    }
    case "COMPLETE":
      return { ...state, phase: "complete" };
    default:
      return state;
  }
}

/* ─── shape SVG renderer ─── */
function ShapeSVG({ path, name }: { path: string; name: string }) {
  return (
    <motion.svg
      initial={{ scale: 0.8, rotate: -10 }}
      animate={{ scale: 1, rotate: 0 }}
      key={path}
      viewBox="0 0 100 100"
      className="h-40 w-40 drop-shadow-2xl"
      role="img"
      aria-label={`Shape to identify: ${name}`}
    >
      <motion.path
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1, ease: "easeInOut" }}
        d={path}
        fill="none"
        stroke="currentColor"
        strokeWidth="4"
        className="text-emerald-500 dark:text-emerald-400"
      />
    </motion.svg>
  );
}

/* ─── component ─── */
export type ShapeSafariProps = {
  difficulty: GameDifficulty;
  onComplete: (result: GameResult) => void;
};

export function ShapeSafari({ difficulty, onComplete }: ShapeSafariProps) {
  const [state, dispatch] = useReducer(reducer, undefined, initState);
  const [mascotMood, setMascotMood] = useState<"happy" | "thinking" | "cheering" | "sad">("happy");
  const rounds = roundCount(difficulty);

  const selectedItems = useMemo(() => {
    const filtered = getItemsByDifficulty(SHAPE_BANK.items, difficulty);
    return getRandomItems([...filtered], rounds);
  }, [rounds, difficulty]);

  const startGame = useCallback(() => {
    void hapticSelection();
    dispatch({ type: "START", items: selectedItems });
  }, [selectedItems]);

  const handleAnswer = useCallback(
    (answer: string) => {
      if (state.phase !== "playing") return;
      const current = state.items[state.round];
      if (!current) return;
      const correct = answer === current.name;

      if (correct) {
        setMascotMood("cheering");
        void hapticSuccess();
      } else {
        setMascotMood("sad");
        void hapticError();
      }

      dispatch({ type: "ANSWER", answer });
    },
    [state.phase, state.items, state.round],
  );

  const handleNext = useCallback(() => {
    setMascotMood("thinking");
    void hapticSelection();
    dispatch({ type: "NEXT" });
  }, []);

  /* ── fire onComplete ── */
  useEffect(() => {
    if (state.phase === "complete") {
      const stars = calculateStars(state.score, state.maxRounds);
      if (stars === 3) {
        void hapticCelebration();
      }
      onComplete({
        gameType: "shape-safari",
        score: state.score,
        maxScore: state.maxRounds,
        stars,
        timeMs: Date.now() - state.startTime,
        difficulty,
      });
    }
  }, [state.phase, state.score, state.maxRounds, state.startTime, difficulty, onComplete]);

  const current = state.items[state.round] as ShapeItem | undefined;

  /* ─── RENDER ─── */

  if (state.phase === "ready") {
    return (
      <div className="flex min-h-[500px] flex-col items-center justify-center gap-8 rounded-[2.5rem] bg-gradient-to-br from-emerald-500 via-teal-600 to-green-700 p-10 shadow-2xl relative overflow-hidden">
        {/* Animated Background Elements */}
        <motion.div
          animate={{ x: [0, 50, 0], opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute top-10 right-10"
        >
          <Wind className="w-32 h-32 text-white" />
        </motion.div>

        <div className="relative z-10 flex flex-col items-center gap-6">
          <div className="bg-white/20 p-4 rounded-3xl backdrop-blur-md border border-white/30">
            <TreePine className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-4xl font-black tracking-tighter text-white sm:text-5xl italic uppercase">
            Shape <span className="text-emerald-300">Safari</span>
          </h2>
          <p className="max-w-xs text-center text-lg font-medium text-white/90 leading-tight">
            Spot the hidden shapes in nature. Terra will lead the way!
          </p>

          <div className="flex items-center gap-4 py-4">
            <MascotFriend id="terra" mood="happy" size="lg" />
          </div>

          <PhysicalButton
            onClick={startGame}
            className="w-full sm:w-auto h-16 bg-white text-emerald-600 text-xl font-black px-12"
          >
            START SAFARI! 🦁
          </PhysicalButton>

          <span className="text-xs font-black uppercase tracking-widest text-white/50">
            {rounds} Rounds • {difficulty}
          </span>
        </div>
      </div>
    );
  }

  if (state.phase === "complete") {
    const stars = calculateStars(state.score, state.maxRounds);
    const completeMood = stars === 3 ? "cheering" : "happy";
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex min-h-[500px] flex-col items-center justify-center gap-6 rounded-[2.5rem] bg-white p-10 shadow-2xl border-4 border-emerald-100 dark:bg-zinc-900 dark:border-zinc-800"
      >
        <div className="flex gap-2 mb-4">
          {[1, 2, 3].map((s) => (
            <motion.div
              key={s}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: s * 0.2, type: "spring" }}
            >
              <Star
                className={`w-12 h-12 ${s <= stars ? "text-yellow-400 fill-yellow-400" : "text-zinc-200 dark:text-zinc-800"}`}
              />
            </motion.div>
          ))}
        </div>

        <MascotFriend id="terra" mood={completeMood} size="xl" />

        <h2 className="text-4xl font-black text-emerald-900 dark:text-white tracking-tighter italic">
          SHAPE SPOTTER!
        </h2>

        <div className="flex gap-4">
          <div className="bg-emerald-50 dark:bg-white/5 p-4 rounded-3xl text-center min-w-[100px] border border-emerald-100 dark:border-white/10">
            <p className="text-[10px] font-black uppercase text-emerald-400">Score</p>
            <p className="text-3xl font-black text-emerald-600 dark:text-emerald-400">{state.score}/{state.maxRounds}</p>
          </div>
        </div>

        <PhysicalButton
          onClick={startGame}
          className="h-16 bg-emerald-600 text-white text-xl font-black px-12 mt-4"
        >
          PLAY AGAIN
        </PhysicalButton>
      </motion.div>
    );
  }

  return (
    <div className="flex min-h-[550px] flex-col gap-8 rounded-[2.5rem] bg-zinc-50 dark:bg-zinc-950 p-8 shadow-inner relative overflow-hidden">
      {/* HUD */}
      <div className="flex items-center justify-between relative z-10">
        <div className="flex flex-col">
          <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Progress</span>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-black text-zinc-800 dark:text-white">{state.round + 1}</span>
            <div className="h-2 w-32 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
              <motion.div
                animate={{ width: `${((state.round + 1) / state.maxRounds) * 100}%` }}
                className="h-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"
              />
            </div>
          </div>
        </div>

        <JuicyStreak count={state.streak} />

        <div className="bg-white dark:bg-zinc-900 shadow-sm border border-zinc-200 dark:border-zinc-800 rounded-2xl px-4 py-2 flex items-center gap-3">
          <Trophy className="w-5 h-5 text-yellow-500" />
          <span className="text-xl font-black text-zinc-800 dark:text-white">{state.score}</span>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {state.phase === "playing" && current && (
          <motion.div
            key={`play-${state.round}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex-1 flex flex-col items-center justify-center gap-12 relative z-10"
          >
            <div className="flex flex-col items-center gap-6">
              <div className="flex items-center gap-6">
                <motion.div animate={{ rotate: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
                  <MascotFriend id="terra" mood={mascotMood} size="lg" />
                </motion.div>
                <ShapeSVG path={current.svgPath} name={current.name} />
              </div>
              <div className="bg-emerald-100 dark:bg-emerald-900/30 px-6 py-2 rounded-2xl border border-emerald-200 dark:border-emerald-800">
                <p className="text-sm font-bold text-emerald-700 dark:text-emerald-300 uppercase tracking-widest">
                  {current.sides >= 0 ? `I HAVE ${current.sides} SIDES` : "WHO AM I?"}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
              {state.choices.map((name) => (
                <PhysicalButton
                  key={name}
                  onClick={() => handleAnswer(name)}
                  className="h-20 text-xl font-black capitalize bg-white text-zinc-800 dark:bg-zinc-800 dark:text-white"
                >
                  {name}
                </PhysicalButton>
              ))}
            </div>
          </motion.div>
        )}

        {state.phase === "feedback" && (
          <motion.div
            key="feedback"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex-1 flex flex-col items-center justify-center gap-6 relative z-10"
          >
            <div className={`p-8 rounded-[3rem] text-white shadow-2xl flex flex-col items-center gap-4 ${state.lastCorrect ? "bg-emerald-500" : "bg-red-500"
              }`}>
              <span className="text-7xl">{state.lastCorrect ? "✨" : "🧐"}</span>
              <h3 className="text-3xl font-black italic">
                {state.lastCorrect ? "BRILLIANT!" : "ALMOST!"}
              </h3>
              <p className="text-xl font-bold uppercase tracking-tight">
                IT IS A <span className="underline decoration-4">{state.lastAnswer}</span>
              </p>
            </div>

            {state.realWorldExample && (
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="bg-zinc-100 dark:bg-zinc-900 p-6 rounded-3xl border border-zinc-200 dark:border-zinc-800 flex items-center gap-4"
              >
                <Globe className="text-emerald-500 w-8 h-8" />
                <div>
                  <p className="text-[10px] font-black uppercase text-zinc-500">In the wild</p>
                  <p className="text-lg font-bold italic">{state.realWorldExample}</p>
                </div>
              </motion.div>
            )}

            <PhysicalButton
              onClick={handleNext}
              className="h-16 bg-emerald-600 text-white text-xl font-black px-12"
            >
              {state.round + 1 < state.maxRounds ? "NEXT TRACK →" : "SEE REWARDS 🎉"}
            </PhysicalButton>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Ambient background decoration */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-emerald-500 rounded-full blur-[80px]" />
        <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-teal-500 rounded-full blur-[100px]" />
      </div>
    </div>
  );
}
