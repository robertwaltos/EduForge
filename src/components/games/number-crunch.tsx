import { useCallback, useEffect, useMemo, useReducer, useRef, useState } from "react";
import type { GameDifficulty, GameResult, MathProblem } from "@/lib/games/types";
import { calculateStars } from "@/lib/games/scoring";
import { hapticSuccess, hapticError, hapticCelebration, hapticSelection } from "@/lib/platform/haptics";
import { MATH_PROBLEM_BANK, getItemsByDifficulty, getRandomItems } from "@/lib/games/content-banks";
import { motion, AnimatePresence } from "framer-motion";
import MascotFriend from "@/components/experience/KoydoMascotFriends";
import JuicyStreak from "@/components/experience/JuicyStreak";
import PhysicalButton from "@/components/experience/PhysicalButton";
import { Star, Trophy, Calculator } from "lucide-react";

/* ─── constants ─── */
const ROUNDS_PER_GAME = 10;

/* ─── helpers ─── */
function getProblems(difficulty: GameDifficulty): MathProblem[] {
  const byDifficulty = getItemsByDifficulty(MATH_PROBLEM_BANK, difficulty);
  if (byDifficulty.length >= ROUNDS_PER_GAME) return byDifficulty;
  return [...MATH_PROBLEM_BANK.items];
}

function buildChoices(problem: MathProblem): number[] {
  const choices = [problem.answer, ...problem.wrongOptions];
  for (let i = choices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [choices[i], choices[j]] = [choices[j]!, choices[i]!];
  }
  return choices;
}

function operationEmoji(op: string): string {
  switch (op) {
    case "addition": return "➕";
    case "subtraction": return "➖";
    case "multiplication": return "✖️";
    case "division": return "➗";
    default: return "🔢";
  }
}

/* ─── state ─── */
type ButtonFeedback = {
  [answerId: number]: "correct" | "wrong" | null;
};

type State = {
  phase: "ready" | "playing" | "feedback" | "complete";
  round: number;
  score: number;
  streak: number;
  currentProblem: MathProblem | null;
  choices: number[];
  buttonFeedback: ButtonFeedback;
  startTime: number;
  completedAt: number | null;
};

type Action =
  | { type: "START" }
  | { type: "SET_ROUND"; problem: MathProblem; choices: number[] }
  | { type: "ANSWER"; choice: number }
  | { type: "NEXT_ROUND" }
  | { type: "COMPLETE" };

function initState(): State {
  return {
    phase: "ready",
    round: 0,
    score: 0,
    streak: 0,
    currentProblem: null,
    choices: [],
    buttonFeedback: {},
    startTime: Date.now(),
    completedAt: null,
  };
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "START":
      return { ...state, phase: "playing", startTime: Date.now(), completedAt: null, streak: 0, score: 0, round: 0 };
    case "SET_ROUND":
      return {
        ...state,
        phase: "playing",
        round: state.round + 1,
        currentProblem: action.problem,
        choices: action.choices,
        buttonFeedback: {},
      };
    case "ANSWER": {
      if (!state.currentProblem) return state;
      const correct = action.choice === state.currentProblem.answer;
      const feedback: ButtonFeedback = {};
      for (const c of state.choices) {
        if (c === state.currentProblem.answer) feedback[c] = "correct";
        else if (c === action.choice && !correct) feedback[c] = "wrong";
        else feedback[c] = null;
      }
      return {
        ...state,
        phase: "feedback",
        score: correct ? state.score + 1 : state.score,
        streak: correct ? state.streak + 1 : 0,
        buttonFeedback: feedback,
      };
    }
    case "NEXT_ROUND":
      return { ...state, phase: "playing" };
    case "COMPLETE":
      return { ...state, phase: "complete", completedAt: Date.now() };
    default:
      return state;
  }
}

export type NumberCrunchProps = {
  difficulty: GameDifficulty;
  onComplete: (result: GameResult) => void;
};

export function NumberCrunch({ difficulty, onComplete }: NumberCrunchProps) {
  const [state, dispatch] = useReducer(reducer, undefined, initState);
  const [mascotMood, setMascotMood] = useState<"happy" | "thinking" | "cheering" | "sad">("happy");
  const problemPool = useMemo(() => getProblems(difficulty), [difficulty]);
  const roundProblems = useMemo(
    () => getRandomItems(problemPool, ROUNDS_PER_GAME),
    [problemPool],
  );
  const answeredRef = useRef(false);

  const startGame = useCallback(() => {
    void hapticSelection();
    dispatch({ type: "START" });

    const firstProblem = roundProblems[0];
    if (!firstProblem) {
      dispatch({ type: "COMPLETE" });
      return;
    }

    answeredRef.current = false;
    setMascotMood("thinking");
    dispatch({
      type: "SET_ROUND",
      problem: firstProblem,
      choices: buildChoices(firstProblem),
    });
  }, [roundProblems]);

  const advanceRound = useCallback(() => {
    if (state.round >= ROUNDS_PER_GAME) {
      dispatch({ type: "COMPLETE" });
      return;
    }
    const problem = roundProblems[state.round];
    if (!problem) {
      dispatch({ type: "COMPLETE" });
      return;
    }
    answeredRef.current = false;
    setMascotMood("thinking");
    dispatch({
      type: "SET_ROUND",
      problem,
      choices: buildChoices(problem),
    });
  }, [state.round, roundProblems]);

  const handleAnswer = useCallback(
    (choice: number) => {
      if (state.phase !== "playing" || answeredRef.current) return;
      answeredRef.current = true;
      const correct = choice === state.currentProblem?.answer;

      if (correct) {
        setMascotMood("cheering");
        void hapticSuccess();
      } else {
        setMascotMood("sad");
        void hapticError();
      }

      dispatch({ type: "ANSWER", choice });
    },
    [state.phase, state.currentProblem],
  );

  useEffect(() => {
    if (state.phase === "feedback") {
      const timer = setTimeout(() => {
        if (state.round >= ROUNDS_PER_GAME) {
          dispatch({ type: "COMPLETE" });
        } else {
          dispatch({ type: "NEXT_ROUND" });
          setTimeout(() => advanceRound(), 80);
        }
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [state.phase, state.round, advanceRound]);

  useEffect(() => {
    if (state.phase === "complete") {
      const stars = calculateStars(state.score, ROUNDS_PER_GAME);
      if (stars === 3) {
        void hapticCelebration();
      }
      const completedAt = state.completedAt ?? state.startTime;
      const timeMs = completedAt - state.startTime;
      onComplete({
        gameType: "number-crunch",
        score: state.score,
        maxScore: ROUNDS_PER_GAME,
        stars,
        timeMs,
        difficulty,
      });
    }
  }, [state.phase, state.score, state.startTime, state.completedAt, difficulty, onComplete]);

  if (state.phase === "ready") {
    return (
      <div className="flex min-h-[500px] flex-col items-center justify-center gap-8 rounded-[2.5rem] bg-gradient-to-br from-indigo-500 via-purple-600 to-violet-700 p-10 shadow-2xl relative overflow-hidden">
        {/* Animated Background Orbs */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute -top-20 -left-20 w-64 h-64 bg-white/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 5, repeat: Infinity, delay: 1 }}
          className="absolute -bottom-20 -right-20 w-80 h-80 bg-blue-400/20 rounded-full blur-3xl"
        />

        <div className="relative z-10 flex flex-col items-center gap-6">
          <div className="bg-white/20 p-4 rounded-3xl backdrop-blur-md border border-white/30">
            <Calculator className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-4xl font-black tracking-tighter text-white sm:text-5xl italic uppercase">
            Number <span className="text-blue-300">Crunch</span>
          </h2>
          <p className="max-w-xs text-center text-lg font-medium text-white/90 leading-tight">
            Solve the equations as fast as you can. Spark is waiting to see your math magic!
          </p>

          <div className="flex items-center gap-4 py-4">
            <MascotFriend id="spark" mood="happy" size="lg" />
          </div>

          <PhysicalButton
            onClick={startGame}
            className="w-full sm:w-auto h-16 bg-white text-indigo-600 text-xl font-black px-12"
          >
            CRUNCH NUMBERS! 🚀
          </PhysicalButton>

          <span className="text-xs font-black uppercase tracking-widest text-white/50">
            Level: {difficulty}
          </span>
        </div>
      </div>
    );
  }

  if (state.phase === "complete") {
    const stars = calculateStars(state.score, ROUNDS_PER_GAME);
    const completeMood = stars === 3 ? "cheering" : "happy";
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex min-h-[500px] flex-col items-center justify-center gap-6 rounded-[2.5rem] bg-white p-10 shadow-2xl border-4 border-indigo-100 dark:bg-zinc-900 dark:border-zinc-800"
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

        <MascotFriend id="spark" mood={completeMood} size="xl" />

        <h2 className="text-4xl font-black text-indigo-900 dark:text-white tracking-tighter italic">
          MATH GENIUS!
        </h2>

        <div className="flex gap-4">
          <div className="bg-indigo-50 dark:bg-white/5 p-4 rounded-3xl text-center min-w-[100px] border border-indigo-100 dark:border-white/10">
            <p className="text-[10px] font-black uppercase text-indigo-400">Score</p>
            <p className="text-3xl font-black text-indigo-600 dark:text-indigo-400">{state.score}/{ROUNDS_PER_GAME}</p>
          </div>
          <div className="bg-blue-50 dark:bg-white/5 p-4 rounded-3xl text-center min-w-[100px] border border-blue-100 dark:border-white/10">
            <p className="text-[10px] font-black uppercase text-blue-400">Time</p>
            <p className="text-3xl font-black text-blue-600 dark:text-blue-400">
              {Math.floor(((state.completedAt ?? state.startTime) - state.startTime) / 1000)}s
            </p>
          </div>
        </div>

        <PhysicalButton
          onClick={startGame}
          className="h-16 bg-indigo-600 text-white text-xl font-black px-12 mt-4"
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
            <span className="text-2xl font-black text-zinc-800 dark:text-white">{state.round}</span>
            <div className="h-2 w-32 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
              <motion.div
                animate={{ width: `${(state.round / ROUNDS_PER_GAME) * 100}%` }}
                className="h-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]"
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

      {/* Main Game Area */}
      <div className="flex-1 flex flex-col items-center justify-center gap-12 relative z-10">
        <AnimatePresence mode="wait">
          {state.currentProblem && (
            <motion.div
              key={state.currentProblem.equation}
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 1.1, opacity: 0, y: -20 }}
              className="flex flex-col items-center gap-6"
            >
              <div className="flex items-center gap-4">
                <MascotFriend id="spark" mood={mascotMood} size="lg" />
                <div className="bg-indigo-600 text-white p-3 rounded-2xl shadow-lg">
                  <p className="text-4xl font-black">{operationEmoji(state.currentProblem.operation)}</p>
                </div>
              </div>
              <h3 className="text-7xl sm:text-8xl font-black italic tracking-tighter text-zinc-900 dark:text-white drop-shadow-sm">
                {state.currentProblem.equation}
              </h3>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Answer Choices */}
        <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
          {state.choices.map((choice, i) => {
            const fb = state.buttonFeedback[choice];
            return (
              <PhysicalButton
                key={`${state.round}-${choice}-${i}`}
                onClick={() => handleAnswer(choice)}
                disabled={state.phase === "feedback"}
                className={`h-24 text-4xl font-black ${fb === "correct"
                    ? "bg-emerald-500 text-white shadow-[0_10px_0_#059669]"
                    : fb === "wrong"
                      ? "bg-red-500 text-white shadow-[0_10px_0_#dc2626]"
                      : "bg-white text-zinc-800 dark:bg-zinc-800 dark:text-white"
                  }`}
              >
                {choice}
              </PhysicalButton>
            );
          })}
        </div>
      </div>

      {/* Ambient background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-10 w-4 h-4 rounded-full bg-indigo-500/20 blur-sm" />
        <div className="absolute bottom-20 right-10 w-6 h-6 rounded-full bg-blue-500/10 blur-md" />
      </div>
    </div>
  );
}
