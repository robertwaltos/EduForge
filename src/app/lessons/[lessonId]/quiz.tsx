"use client";

import { useEffect, useRef, useState } from "react";
import type { Lesson, Question } from "@/lib/data/curriculum";
import { trackLessonCompleted } from "@/lib/analytics/mixpanel";
import { deleteSyncedProgress, saveOfflineProgress } from "@/lib/offline/progress-db";
import Link from "next/link";

export default function Quiz({ lesson }: { lesson: Lesson & { questions: Question[] } }) {
  const [startTime, setStartTime] = useState(() => Date.now());
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [lastAnswerCorrect, setLastAnswerCorrect] = useState<boolean | null>(null);
  const [progressSyncState, setProgressSyncState] = useState<"idle" | "syncing" | "synced" | "queued">("idle");
  const completionPersistedRef = useRef(false);

  const currentQuestion = lesson.questions[currentQuestionIndex];
  const isQuizFinished = currentQuestionIndex >= lesson.questions.length;
  const scorePercent = lesson.questions.length > 0 ? Math.round((score / lesson.questions.length) * 100) : 0;
  const lessonGrade =
    scorePercent >= 90 ? "A" : scorePercent >= 80 ? "B" : scorePercent >= 70 ? "C" : scorePercent >= 60 ? "D" : "F";

  useEffect(() => {
    if (!isQuizFinished || completionPersistedRef.current) {
      return;
    }

    completionPersistedRef.current = true;
    const completedAt = new Date().toISOString();

    // Track analytics for the whole lesson completion.
    trackLessonCompleted({
      lessonId: lesson.id,
      score,
      timeSpentSeconds: Math.round((Date.now() - startTime) / 1000),
    });

    const syncProgress = async () => {
      setProgressSyncState("syncing");
      try {
        const response = await fetch("/api/progress", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            lessonId: lesson.id,
            scorePercentage: lesson.questions.length > 0 ? score / lesson.questions.length : 0,
          }),
        });

        if (!response.ok) {
          throw new Error(`Progress sync failed: ${response.status}`);
        }

        await deleteSyncedProgress(lesson.id);
        setProgressSyncState("synced");
      } catch (error) {
        console.error("Unable to sync lesson progress online. Saving offline.", error);
        try {
          await saveOfflineProgress({
            lessonId: lesson.id,
            score,
            totalQuestions: lesson.questions.length,
            completedAt,
            synced: false,
          });
        } catch (offlineError) {
          console.error("Unable to save lesson progress offline.", offlineError);
        }
        setProgressSyncState("queued");
      }
    };

    void syncProgress();
  }, [isQuizFinished, lesson.id, lesson.questions.length, score, startTime]);

  const handleOptionSelect = (optionId: string) => {
    if (isAnswered) return;
    setSelectedOptionId(optionId);
  };

  const handleSubmit = async () => {
    if (isAnswered || selectedOptionId === null) return;

    const isCorrect = selectedOptionId === currentQuestion.correctOptionId;
    if (isCorrect) {
      setScore((prev) => prev + 1);
      setStreak((prev) => {
        const next = prev + 1;
        setBestStreak((currentBest) => (next > currentBest ? next : currentBest));
        return next;
      });
    } else {
      setStreak(0);
    }
    setLastAnswerCorrect(isCorrect);
    setIsAnswered(true);

    // Don't wait for the API call to finish to keep the UI snappy
    fetch("/api/answers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        skillId: currentQuestion.skillId,
        isCorrect: isCorrect,
      }),
    }).catch((error) => {
      // In a real app, you might want to handle this error, e.g., by
      // adding the failed request to an offline queue.
      // For now, we just log it.
      console.error("Failed to save answer to server.", error);
    });
  };

  const handleNext = () => {
    setIsAnswered(false);
    setSelectedOptionId(null);
    setLastAnswerCorrect(null);
    setCurrentQuestionIndex((prev) => prev + 1);
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setStreak(0);
    setBestStreak(0);
    setLastAnswerCorrect(null);
    setIsAnswered(false);
    setSelectedOptionId(null);
    setProgressSyncState("idle");
    setStartTime(Date.now());
    completionPersistedRef.current = false;
  };

  const progressPercent = Math.round((currentQuestionIndex / lesson.questions.length) * 100);
  const starsEarned = scorePercent >= 90 ? 3 : scorePercent >= 70 ? 2 : scorePercent >= 45 ? 1 : 0;
  const encouragement =
    scorePercent >= 90
      ? "Amazing work! You completed this adventure with superstar focus."
      : scorePercent >= 70
        ? "Great effort! You are building strong skills every step."
        : "Nice try! Practice one more round to power up your skills.";

  if (isQuizFinished) {
    return (
      <div className="relative overflow-hidden rounded-3xl border border-border bg-surface p-6 shadow-sm sm:p-8">
        <div className="pointer-events-none absolute inset-0 opacity-35">
          <div className="absolute left-6 top-5 h-4 w-4 animate-bounce rounded-full bg-accent" />
          <div className="absolute right-8 top-10 h-3 w-3 animate-ping rounded-full bg-success" />
          <div className="absolute bottom-8 left-16 h-5 w-5 animate-pulse rounded-full bg-warn" />
          <div className="absolute bottom-14 right-12 h-4 w-4 animate-bounce rounded-full bg-danger" />
        </div>
        <div className="relative flex flex-col items-center gap-4 text-center">
          <p className="text-xs font-semibold uppercase tracking-wide text-zinc-600 dark:text-zinc-300">Adventure Complete</p>
          <h2 className="text-3xl font-extrabold">You did it! 🎉</h2>
          <div className="flex items-center gap-2 text-3xl" aria-label={`${starsEarned} stars earned`}>
            {Array.from({ length: 3 }).map((_, index) => (
              <span key={index} className={index < starsEarned ? "" : "opacity-30"}>
                ⭐
              </span>
            ))}
          </div>
          <p className="max-w-xl text-sm text-zinc-700 dark:text-zinc-300">{encouragement}</p>
          <div className="grid w-full max-w-md grid-cols-2 gap-3 text-left">
            <article className="rounded-xl border border-border bg-surface-muted p-3">
              <p className="text-xs uppercase text-zinc-500">Points</p>
              <p className="text-lg font-bold">
                {score} / {lesson.questions.length}
              </p>
            </article>
            <article className="rounded-xl border border-border bg-surface-muted p-3">
              <p className="text-xs uppercase text-zinc-500">Mastery</p>
              <p className="text-lg font-bold">{scorePercent}%</p>
            </article>
            <article className="rounded-xl border border-border bg-surface-muted p-3">
              <p className="text-xs uppercase text-zinc-500">Best Streak</p>
              <p className="text-lg font-bold">{bestStreak}</p>
            </article>
            <article className="rounded-xl border border-border bg-surface-muted p-3">
              <p className="text-xs uppercase text-zinc-500">Badge</p>
              <p className="text-lg font-bold">{starsEarned >= 3 ? "Gold" : starsEarned === 2 ? "Silver" : "Explorer"}</p>
            </article>
          </div>
          <p className="hidden text-xs text-zinc-500" aria-hidden="true">
            Grade: {lessonGrade} ({scorePercent}%)
          </p>
          <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={handleRestart}
              className="rounded-full bg-accent px-6 py-2 text-sm font-semibold text-white transition hover:opacity-90"
            >
              Play Again
            </button>
            <Link href="/dashboard" className="rounded-full border border-border bg-surface-muted px-6 py-2 text-sm font-semibold">
              Next Lesson
            </Link>
          </div>
          {progressSyncState === "syncing" ? (
            <p className="text-xs text-zinc-500">Saving your learning progress...</p>
          ) : null}
          {progressSyncState === "synced" ? (
            <p className="text-xs text-emerald-700 dark:text-emerald-300">Progress saved to your account.</p>
          ) : null}
          {progressSyncState === "queued" ? (
            <p className="text-xs text-amber-700 dark:text-amber-300">
              Progress saved offline and will sync when your connection is restored.
            </p>
          ) : null}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5 rounded-3xl border border-border bg-surface p-4 shadow-sm sm:p-6">
      <div className="rounded-2xl border border-border bg-surface-muted p-4">
        <div className="mb-2 flex items-center justify-between text-sm font-semibold">
          <span>Question {currentQuestionIndex + 1} of {lesson.questions.length}</span>
          <span>{progressPercent}%</span>
        </div>
        <div className="h-3 overflow-hidden rounded-full bg-white/70 dark:bg-black/30">
          <div className="h-full rounded-full bg-accent transition-all" style={{ width: `${progressPercent}%` }} />
        </div>
      </div>

      {isAnswered && lastAnswerCorrect !== null ? (
        <div
          className={`rounded-2xl border p-3 text-sm font-semibold ${lastAnswerCorrect
            ? "border-emerald-300 bg-emerald-50 text-emerald-800 dark:border-emerald-600/40 dark:bg-emerald-900/25 dark:text-emerald-200"
            : "border-amber-300 bg-amber-50 text-amber-800 dark:border-amber-600/40 dark:bg-amber-900/25 dark:text-amber-200"
          }`}
        >
          {lastAnswerCorrect ? "Great job! That is correct. 🌟" : "Nice effort. Let's learn from this one and keep going. 💪"}
        </div>
      ) : null}

      <article className="rounded-2xl border border-border bg-[var(--gradient-hero)] p-5">
        <h2 className="text-xl font-extrabold sm:text-2xl">{currentQuestion.text}</h2>
      </article>

      <div className="grid gap-3 sm:grid-cols-2">
        {currentQuestion.options.map((option) => {
          const isSelected = selectedOptionId === option.id;
          const isCorrect = currentQuestion.correctOptionId === option.id;

          let optionClass =
            "cursor-pointer rounded-2xl border p-4 text-left text-base font-semibold transition sm:p-5 ";
          if (isAnswered) {
            if (isCorrect) {
              optionClass += "border-green-500 bg-green-100 dark:bg-green-900/50";
            } else if (isSelected) {
              optionClass += "border-red-500 bg-red-100 dark:bg-red-900/50";
            } else {
              optionClass += "border-border bg-surface";
            }
          } else if (isSelected) {
            optionClass += "border-accent bg-surface-muted";
          } else {
            optionClass += "border-border bg-surface hover:bg-surface-muted";
          }

          return (
            <button
              key={option.id}
              onClick={() => handleOptionSelect(option.id)}
              disabled={isAnswered}
              className={optionClass}
            >
              <span className="inline-flex items-center gap-2">
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-black/5 text-sm dark:bg-white/10">
                  {option.id.toUpperCase()}
                </span>
                {option.text}
              </span>
            </button>
          );
        })}
      </div>
      <div className="mt-2 flex items-center justify-between rounded-2xl border border-border bg-surface-muted p-3">
        <p className="text-sm font-semibold">
          Score: {score} • Streak: {streak}
        </p>
        {isAnswered ? (
          <button
            onClick={handleNext}
            className="rounded-full bg-accent px-6 py-2 text-sm font-semibold text-white hover:opacity-90"
          >
            Next
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={selectedOptionId === null}
            className="rounded-full bg-accent px-6 py-2 text-sm font-semibold text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Submit
          </button>
        )}
      </div>
    </div>
  );
}
