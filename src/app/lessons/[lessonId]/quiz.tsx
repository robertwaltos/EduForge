"use client";
/* eslint-disable @next/next/no-img-element */

import { useEffect, useMemo, useRef, useState } from "react";
import type { Lesson, Question } from "@/lib/modules/types";
import { trackLessonCompleted } from "@/lib/analytics/mixpanel";
import { trackLearningEvent } from "@/lib/analytics/xapi-lite";
import { deleteSyncedProgress, saveOfflineProgress } from "@/lib/offline/progress-db";
import { maybePromptForRating } from "@/lib/platform/app-rating";
import type { ExamSection } from "@/lib/exam/tracks";
import { getExamTrackProfileByModuleId } from "@/lib/exam/tracks";
import Link from "next/link";

function queueExamErrorLog(payload: {
  moduleId: string;
  lessonId: string;
  questionId: string;
  skillId?: string;
  errorType: "incorrect_answer" | "timed_out" | "strategy_gap" | "careless_mistake" | "concept_gap";
  selectedOptionId?: string;
  correctOptionId?: string;
  questionText?: string;
  metadata?: Record<string, string | number | boolean | null | Array<string | number | boolean | null>>;
}) {
  fetch("/api/exam/error-log", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  }).catch((error) => {
    console.error("Failed to save exam error log item.", error);
  });
}

type DrillMode = "untimed" | "paced" | "section_sprint";

function normalizeForMatch(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function pickBestSectionForLesson(lessonTitle: string, sections: ExamSection[]): ExamSection | null {
  if (sections.length === 0) {
    return null;
  }

  const normalizedTitle = normalizeForMatch(lessonTitle);
  const titleTokens = new Set(normalizedTitle.split(" ").filter((token) => token.length > 2));

  let bestSection: ExamSection | null = null;
  let bestScore = Number.NEGATIVE_INFINITY;

  for (const section of sections) {
    const sectionTitle = normalizeForMatch(section.title);
    const sectionFocus = normalizeForMatch(section.focus);
    const sectionId = normalizeForMatch(section.id);
    const combined = `${sectionTitle} ${sectionFocus} ${sectionId}`;
    const combinedTokens = new Set(combined.split(" ").filter((token) => token.length > 2));

    let score = 0;
    for (const token of titleTokens) {
      if (combinedTokens.has(token)) {
        score += 1;
      }
    }

    if (normalizedTitle.includes(sectionTitle) && sectionTitle.length > 0) {
      score += 4;
    }
    if (normalizedTitle.includes(sectionId) && sectionId.length > 0) {
      score += 3;
    }

    if (score > bestScore) {
      bestScore = score;
      bestSection = section;
    }
  }

  return bestSection ?? sections[0] ?? null;
}

function deriveSectionSprintMinutes(params: {
  section: ExamSection | null;
  questionCount: number;
  fallbackMinutes: number | null;
}) {
  const { section, questionCount, fallbackMinutes } = params;
  if (!section || !section.durationMinutes || section.durationMinutes <= 0) {
    return fallbackMinutes;
  }

  if (!section.questionCount || section.questionCount <= 0) {
    return Math.max(3, Math.round(section.durationMinutes * 0.4));
  }

  const pacePerQuestion = section.durationMinutes / section.questionCount;
  const projectedMinutes = pacePerQuestion * Math.max(questionCount, 1);
  const boundedMinutes = Math.min(Math.max(Math.round(projectedMinutes), 3), section.durationMinutes);

  return boundedMinutes;
}

function formatMinutes(minutes: number | null) {
  if (!minutes || minutes <= 0) return null;
  return `${minutes}m`;
}

export default function Quiz({
  moduleId,
  lesson,
}: {
  moduleId: string;
  lesson: Lesson & { questions: Question[] };
}) {
  const baseTimeLimitMinutes =
    typeof lesson.quizBlueprint?.timeLimitMinutes === "number" && lesson.quizBlueprint.timeLimitMinutes > 0
      ? lesson.quizBlueprint.timeLimitMinutes
      : null;
  const examTrackProfile = useMemo(() => getExamTrackProfileByModuleId(moduleId), [moduleId]);
  const matchedSection = useMemo(
    () => pickBestSectionForLesson(lesson.title, examTrackProfile?.sectionOrder ?? []),
    [examTrackProfile?.sectionOrder, lesson.title],
  );
  const sectionSprintMinutes = useMemo(
    () =>
      deriveSectionSprintMinutes({
        section: matchedSection,
        questionCount: lesson.questions.length,
        fallbackMinutes: baseTimeLimitMinutes,
      }),
    [baseTimeLimitMinutes, lesson.questions.length, matchedSection],
  );
  const isExamDrillLesson = typeof lesson.metadata?.examDrill === "string" && lesson.metadata.examDrill.length > 0;

  const availableDrillModes = useMemo(() => {
    const modes: DrillMode[] = ["untimed"];
    if (baseTimeLimitMinutes) {
      modes.push("paced");
    }
    if (sectionSprintMinutes && sectionSprintMinutes > 0) {
      modes.push("section_sprint");
    }
    return modes;
  }, [baseTimeLimitMinutes, sectionSprintMinutes]);

  const recommendedDrillMode: DrillMode = useMemo(() => {
    if (isExamDrillLesson && availableDrillModes.includes("section_sprint")) {
      return "section_sprint";
    }
    if (availableDrillModes.includes("paced")) {
      return "paced";
    }
    return "untimed";
  }, [availableDrillModes, isExamDrillLesson]);

  const [drillMode, setDrillMode] = useState<DrillMode>(recommendedDrillMode);
  const getTimeLimitForMode = (mode: DrillMode) => {
    if (mode === "paced") {
      return baseTimeLimitMinutes;
    }
    if (mode === "section_sprint") {
      return sectionSprintMinutes;
    }
    return null;
  };
  const activeTimeLimitMinutes = getTimeLimitForMode(drillMode);
  const initialRemainingSeconds = activeTimeLimitMinutes
    ? Math.round(activeTimeLimitMinutes * 60)
    : null;

  const [startTime, setStartTime] = useState(() => Date.now());
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [lastAnswerCorrect, setLastAnswerCorrect] = useState<boolean | null>(null);
  const [remainingSeconds, setRemainingSeconds] = useState<number | null>(() => initialRemainingSeconds);
  const [timedOut, setTimedOut] = useState(false);
  const [progressSyncState, setProgressSyncState] = useState<"idle" | "syncing" | "synced" | "queued">("idle");
  const completionPersistedRef = useRef(false);

  const currentQuestion = lesson.questions[currentQuestionIndex];
  const isQuizFinished = currentQuestionIndex >= lesson.questions.length;
  const scorePercent = lesson.questions.length > 0 ? Math.round((score / lesson.questions.length) * 100) : 0;
  const lessonGrade =
    scorePercent >= 90 ? "A" : scorePercent >= 80 ? "B" : scorePercent >= 70 ? "C" : scorePercent >= 60 ? "D" : "F";

  useEffect(() => {
    setDrillMode(recommendedDrillMode);
  }, [lesson.id, recommendedDrillMode]);

  useEffect(() => {
    void trackLearningEvent({
      eventType: "activity_interacted",
      moduleId,
      lessonId: lesson.id,
      payload: {
        action: "quiz_drill_mode_selected",
        drillMode,
        timeLimitMinutes: activeTimeLimitMinutes ?? 0,
        examDrillLesson: isExamDrillLesson,
      },
    });
  }, [activeTimeLimitMinutes, drillMode, isExamDrillLesson, lesson.id, moduleId]);

  useEffect(() => {
    setRemainingSeconds(initialRemainingSeconds);
    setTimedOut(false);
  }, [initialRemainingSeconds, lesson.id]);

  useEffect(() => {
    if (remainingSeconds === null || isQuizFinished) {
      return;
    }

    const timerId = window.setInterval(() => {
      setRemainingSeconds((previous) => {
        if (previous === null) return previous;
        return Math.max(previous - 1, 0);
      });
    }, 1000);

    return () => window.clearInterval(timerId);
  }, [isQuizFinished, remainingSeconds]);

  useEffect(() => {
    if (remainingSeconds !== 0 || isQuizFinished) {
      return;
    }

    setTimedOut(true);
    setIsAnswered(false);
    setSelectedOptionId(null);
    setShowHint(false);
    setCurrentQuestionIndex(lesson.questions.length);

    void trackLearningEvent({
      eventType: "activity_interacted",
      moduleId,
      lessonId: lesson.id,
      payload: {
        action: "quiz_time_expired",
        drillMode,
        timeLimitMinutes: activeTimeLimitMinutes ?? 0,
        scoreSoFar: score,
        answeredQuestions: currentQuestionIndex,
        totalQuestions: lesson.questions.length,
      },
    });

    queueExamErrorLog({
      moduleId,
      lessonId: lesson.id,
      questionId: `${lesson.id}-timed-out-${Date.now()}`,
      errorType: "timed_out",
      questionText: "Timed quiz attempt expired before all questions were answered.",
      metadata: {
        drillMode,
        timeLimitMinutes: activeTimeLimitMinutes ?? 0,
        scoreSoFar: score,
        answeredQuestions: currentQuestionIndex,
        totalQuestions: lesson.questions.length,
      },
    });
  }, [
    activeTimeLimitMinutes,
    currentQuestionIndex,
    drillMode,
    isQuizFinished,
    lesson.id,
    lesson.questions.length,
    moduleId,
    remainingSeconds,
    score,
  ]);

  useEffect(() => {
    if (!isQuizFinished || completionPersistedRef.current) {
      return;
    }

    completionPersistedRef.current = true;
    const completedAt = new Date().toISOString();
    const timeSpentSeconds = Math.round((Date.now() - startTime) / 1000);

    void trackLearningEvent({
      eventType: "lesson_completed",
      moduleId,
      lessonId: lesson.id,
      payload: {
        score,
        totalQuestions: lesson.questions.length,
        masteryPercentage: scorePercent,
        bestStreak,
        timeSpentSeconds,
        completionSource: "quiz",
        drillMode,
        timeLimitMinutes: activeTimeLimitMinutes ?? 0,
      },
    });

    trackLessonCompleted({
      lessonId: lesson.id,
      score,
      timeSpentSeconds,
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

        // Increment local completion count and maybe prompt for app store review
        const LESSONS_COMPLETED_KEY = "koydo.lessonsCompletedCount";
        const prev = parseInt(localStorage.getItem(LESSONS_COMPLETED_KEY) ?? "0", 10);
        const next = (isNaN(prev) ? 0 : prev) + 1;
        localStorage.setItem(LESSONS_COMPLETED_KEY, next.toString());
        maybePromptForRating(next);
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
  }, [
    activeTimeLimitMinutes,
    bestStreak,
    drillMode,
    isQuizFinished,
    lesson.id,
    lesson.questions.length,
    moduleId,
    score,
    scorePercent,
    startTime,
  ]);

  const formatDrillModeLabel = (mode: DrillMode) => {
    if (mode === "untimed") return "Untimed Review";
    if (mode === "paced") return `Paced Drill${formatMinutes(baseTimeLimitMinutes) ? ` (${formatMinutes(baseTimeLimitMinutes)})` : ""}`;
    return `Section Sprint${formatMinutes(sectionSprintMinutes) ? ` (${formatMinutes(sectionSprintMinutes)})` : ""}`;
  };

  const resetAttempt = (nextMode: DrillMode) => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setStreak(0);
    setBestStreak(0);
    setLastAnswerCorrect(null);
    setIsAnswered(false);
    setShowHint(false);
    setSelectedOptionId(null);
    setProgressSyncState("idle");
    setStartTime(Date.now());
    const nextTimeLimitMinutes = getTimeLimitForMode(nextMode);
    setRemainingSeconds(nextTimeLimitMinutes ? Math.round(nextTimeLimitMinutes * 60) : null);
    setTimedOut(false);
    completionPersistedRef.current = false;
  };

  const handleDrillModeChange = (nextMode: DrillMode) => {
    if (nextMode === drillMode) {
      return;
    }
    setDrillMode(nextMode);
    resetAttempt(nextMode);
  };

  const handleOptionSelect = (optionId: string) => {
    if (isAnswered) return;
    setSelectedOptionId(optionId);
  };

  const handleSubmit = async () => {
    if (isAnswered || selectedOptionId === null) return;

    const questionSkillId =
      typeof currentQuestion.skillId === "string" && currentQuestion.skillId.length > 0
        ? currentQuestion.skillId
        : null;
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

    void trackLearningEvent({
      eventType: "quiz_answered",
      moduleId,
      lessonId: lesson.id,
      payload: {
        questionId: currentQuestion.id,
        skillId: questionSkillId,
        questionIndex: currentQuestionIndex + 1,
        totalQuestions: lesson.questions.length,
        selectedOptionId,
        correctOptionId: currentQuestion.correctOptionId,
        isCorrect,
        drillMode,
        timeLimitMinutes: activeTimeLimitMinutes ?? 0,
      },
    });

    // Don't wait for the API call to finish to keep the UI snappy
    if (questionSkillId) {
      fetch("/api/answers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          skillId: questionSkillId,
          isCorrect: isCorrect,
        }),
      }).catch((error) => {
        // In a real app, you might want to handle this error, e.g., by
        // adding the failed request to an offline queue.
        // For now, we just log it.
        console.error("Failed to save answer to server.", error);
      });
    }

    if (!isCorrect) {
      queueExamErrorLog({
        moduleId,
        lessonId: lesson.id,
        questionId: currentQuestion.id,
        skillId: questionSkillId ?? undefined,
        errorType: "incorrect_answer",
        selectedOptionId,
        correctOptionId: currentQuestion.correctOptionId,
        questionText: currentQuestion.text,
        metadata: {
          drillMode,
          timeLimitMinutes: activeTimeLimitMinutes ?? 0,
          questionIndex: currentQuestionIndex + 1,
          totalQuestions: lesson.questions.length,
        },
      });
    }
  };

  const handleNext = () => {
    setIsAnswered(false);
    setShowHint(false);
    setSelectedOptionId(null);
    setLastAnswerCorrect(null);
    setCurrentQuestionIndex((prev) => prev + 1);
  };

  const handleRestart = () => {
    resetAttempt(drillMode);
  };

  const progressPercent = Math.round((currentQuestionIndex / lesson.questions.length) * 100);
  const starsEarned = scorePercent >= 90 ? 3 : scorePercent >= 70 ? 2 : scorePercent >= 45 ? 1 : 0;
  const encouragement =
    scorePercent >= 90
      ? "Amazing work! You completed this adventure with superstar focus."
      : scorePercent >= 70
        ? "Great effort! You are building strong skills every step."
        : "Nice try! Practice one more round to power up your skills.";
  const formattedRemainingTime =
    remainingSeconds === null
      ? null
      : `${String(Math.floor(remainingSeconds / 60)).padStart(2, "0")}:${String(remainingSeconds % 60).padStart(2, "0")}`;

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
          <p className="text-xs font-semibold uppercase tracking-wide text-zinc-600">Adventure Complete</p>
          <h2 className="text-3xl font-extrabold">You did it! 🎉</h2>
          <div className="flex items-center gap-2 text-3xl" aria-label={`${starsEarned} stars earned`}>
            {Array.from({ length: 3 }).map((_, index) => (
              <span key={index} className={index < starsEarned ? "" : "opacity-30"}>
                ⭐
              </span>
            ))}
          </div>
          {timedOut ? (
            <p className="rounded-xl border border-amber-300 bg-amber-50 px-3 py-2 text-xs font-semibold text-amber-800">
              Time expired before all questions were answered.
            </p>
          ) : null}
          <p className="rounded-xl border border-indigo-200 bg-indigo-50 px-3 py-2 text-xs font-semibold text-indigo-800">
            Mode: {formatDrillModeLabel(drillMode)}
          </p>
          <p className="max-w-xl text-sm text-zinc-700">{encouragement}</p>
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
              className="ui-soft-button ui-focus-ring min-h-11 rounded-full bg-accent px-6 py-2 text-sm font-semibold text-white transition hover:opacity-90"
            >
              Play Again
            </button>
            <Link href="/dashboard" className="ui-soft-button ui-focus-ring inline-flex min-h-11 items-center rounded-full border border-border bg-surface-muted px-6 py-2 text-sm font-semibold">
              Next Lesson
            </Link>
            <Link href="/exam-prep/error-log" className="ui-soft-button ui-focus-ring inline-flex min-h-11 items-center rounded-full border border-border bg-surface-muted px-6 py-2 text-sm font-semibold">
              Review Error Logbook
            </Link>
          </div>
          {progressSyncState === "syncing" ? (
            <p role="status" className="text-xs text-zinc-500">Saving your learning progress...</p>
          ) : null}
          {progressSyncState === "synced" ? (
            <p role="status" className="text-xs text-emerald-700">Progress saved to your account.</p>
          ) : null}
          {progressSyncState === "queued" ? (
            <p role="status" className="text-xs text-amber-700">
              Progress saved offline and will sync when your connection is restored.
            </p>
          ) : null}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5 rounded-3xl border border-border bg-surface p-4 shadow-sm sm:p-6">
      {availableDrillModes.length > 1 || isExamDrillLesson ? (
        <div className="rounded-2xl border border-indigo-200 bg-indigo-50 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-indigo-700">Drill Mode</p>
          <p className="mt-1 text-sm text-indigo-900">
            {isExamDrillLesson
              ? "This quiz is configured as an exam drill. Pick your timing mode."
              : "Pick the timing mode that matches your current goal."}
          </p>
          {matchedSection ? (
            <p className="mt-1 text-xs text-indigo-700">
              Target section: {matchedSection.title}
              {matchedSection.durationMinutes ? ` (${matchedSection.durationMinutes}m)` : ""}
            </p>
          ) : null}
          <div className="mt-3 flex flex-wrap gap-2">
            {availableDrillModes.map((mode) => {
              const selected = mode === drillMode;
              return (
                <button
                  key={mode}
                  type="button"
                  onClick={() => handleDrillModeChange(mode)}
                  className={`ui-soft-button ui-focus-ring min-h-11 rounded-full border px-4 py-2 text-xs font-semibold ${
                    selected
                      ? "border-indigo-400 bg-indigo-600 text-white"
                      : "border-indigo-200 bg-white text-indigo-800 hover:bg-indigo-100"
                  }`}
                >
                  {formatDrillModeLabel(mode)}
                </button>
              );
            })}
          </div>
        </div>
      ) : null}

      <div className="rounded-2xl border border-border bg-surface-muted p-4">
        <div className="mb-2 flex flex-wrap items-center justify-between gap-2 text-sm font-semibold">
          <span>Question {currentQuestionIndex + 1} of {lesson.questions.length}</span>
          <div className="flex items-center gap-3">
            {formattedRemainingTime !== null ? (
              <span className="rounded-full border border-amber-300 bg-amber-50 px-2 py-1 text-xs font-semibold text-amber-800">
                Time {formattedRemainingTime}
              </span>
            ) : null}
            <span>{progressPercent}%</span>
          </div>
        </div>
        <progress
          className="ui-progress ui-progress--accent mt-2 h-3 w-full"
          value={progressPercent}
          max={100}
          aria-label="Quiz progress"
        />
      </div>

      {isAnswered && lastAnswerCorrect !== null ? (
        <div
          role="status"
          aria-live="polite"
          className={`rounded-2xl border p-3 text-sm font-semibold ${lastAnswerCorrect
            ? "border-emerald-300 bg-emerald-50 text-emerald-800"
            : "border-amber-300 bg-amber-50 text-amber-800"
          }`}
        >
          {lastAnswerCorrect ? "Great job! That is correct. 🌟" : "Nice effort. Let's learn from this one and keep going. 💪"}
        </div>
      ) : null}

      {isAnswered && currentQuestion.explanation ? (
        <div className="rounded-2xl border border-sky-300 bg-sky-50 p-3 text-sm text-sky-900">
          <p className="text-xs font-semibold uppercase tracking-wide">Why this answer works</p>
          <p className="mt-1">{currentQuestion.explanation}</p>
        </div>
      ) : null}

      <article className="rounded-2xl border border-border bg-(--gradient-hero) p-5">
        <h2 className="text-xl font-extrabold sm:text-2xl">{currentQuestion.text}</h2>
        {currentQuestion.imageUrl ? (
          <img
            src={currentQuestion.imageUrl}
            alt={currentQuestion.imageAlt ?? `${currentQuestion.text} visual aid`}
            className="mt-3 w-full rounded-xl border border-border bg-surface object-cover"
            loading="lazy"
          />
        ) : null}
      </article>

      {!isAnswered && currentQuestion.hint ? (
        <div className="rounded-2xl border border-amber-300 bg-amber-50 p-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-xs font-semibold uppercase tracking-wide text-amber-800">
              Hint
            </p>
            <button
              type="button"
              onClick={() => setShowHint((previous) => !previous)}
              className="ui-soft-button ui-focus-ring rounded-full border border-amber-300 bg-white px-3 py-1 text-xs font-semibold text-amber-700"
            >
              {showHint ? "Hide Hint" : "Show Hint"}
            </button>
          </div>
          {showHint ? <p className="mt-2 text-sm text-amber-900">{currentQuestion.hint}</p> : null}
        </div>
      ) : null}

      <div className="grid gap-3 sm:grid-cols-2">
        {currentQuestion.options.map((option) => {
          const isSelected = selectedOptionId === option.id;
          const isCorrect = currentQuestion.correctOptionId === option.id;

          let optionClass =
            "lesson-quiz-option ui-focus-ring cursor-pointer rounded-2xl border p-4 text-left text-base font-semibold sm:p-5 ";
          if (isAnswered) {
            if (isCorrect) {
              optionClass += "is-correct border-green-500 bg-green-100";
            } else if (isSelected) {
              optionClass += "is-wrong border-red-500 bg-red-100";
            } else {
              optionClass += "border-border bg-surface";
            }
          } else if (isSelected) {
            optionClass += "is-selected border-accent bg-surface-muted";
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
              <span className="flex items-start gap-2">
                <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-black/5 text-sm">
                  {option.id.toUpperCase()}
                </span>
                <span className="flex-1">
                  <span>{option.text}</span>
                  {option.imageUrl ? (
                    <img
                      src={option.imageUrl}
                      alt={option.imageAlt ?? `Option ${option.id.toUpperCase()} image`}
                      className="mt-2 w-full rounded-lg border border-border bg-surface object-cover"
                      loading="lazy"
                    />
                  ) : null}
                </span>
              </span>
            </button>
          );
        })}
      </div>
      <div className="mt-2 flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-border bg-surface-muted p-3">
        <p className="text-sm font-semibold">
          Score: {score} • Streak: {streak}
        </p>
        {isAnswered ? (
          <button
            onClick={handleNext}
            className="ui-soft-button ui-focus-ring min-h-11 rounded-full bg-accent px-6 py-2 text-sm font-semibold text-white hover:opacity-90"
          >
            Next
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={selectedOptionId === null}
            className="ui-soft-button ui-focus-ring min-h-11 rounded-full bg-accent px-6 py-2 text-sm font-semibold text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Submit
          </button>
        )}
      </div>
    </div>
  );
}
