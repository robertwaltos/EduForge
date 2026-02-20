"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { LearningAid } from "@/lib/modules/types";
import { deleteSyncedProgress, saveOfflineProgress } from "@/lib/offline/progress-db";

type VideoLessonPlayerProps = {
  lessonId: string;
  lessonTitle: string;
  subject: string;
  durationMinutes: number;
  learningAids: LearningAid[];
};

type ProgressSyncState = "idle" | "syncing" | "synced" | "queued";

const VIDEO_COMPLETION_SCORE_PERCENTAGE = 0.8;

export default function VideoLessonPlayer({
  lessonId,
  lessonTitle,
  subject,
  durationMinutes,
  learningAids,
}: VideoLessonPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [syncState, setSyncState] = useState<ProgressSyncState>("idle");
  const completionPersistedRef = useRef(false);

  const checkpoints = useMemo(() => {
    const aidCheckpoints = learningAids
      .slice(0, 4)
      .map((aid) => aid.title)
      .filter(Boolean);

    const fallbackCheckpoints = [
      `What this ${subject.toLowerCase()} lesson unlocks`,
      "Core concept walkthrough",
      "Common mistakes and how to avoid them",
      "Quick recap and next action",
    ];

    const labels = aidCheckpoints.length > 0 ? aidCheckpoints : fallbackCheckpoints;
    return labels.map((label, index) => ({
      id: `${lessonId}-checkpoint-${index + 1}`,
      label,
      threshold: Math.round(((index + 1) / labels.length) * 100),
    }));
  }, [learningAids, lessonId, subject]);

  useEffect(() => {
    if (!isPlaying || progress >= 100) {
      return;
    }

    const baseSteps = Math.max(40, durationMinutes * 10);
    const increment = Math.max(1, Math.round(100 / baseSteps));
    const intervalId = window.setInterval(() => {
      setProgress((previous) => Math.min(100, previous + increment));
    }, 500);

    return () => window.clearInterval(intervalId);
  }, [durationMinutes, isPlaying, progress]);

  useEffect(() => {
    if (progress >= 100 && isPlaying) {
      setIsPlaying(false);
    }
  }, [isPlaying, progress]);

  useEffect(() => {
    if (progress < 100 || completionPersistedRef.current) {
      return;
    }

    completionPersistedRef.current = true;

    const persistCompletion = async () => {
      setSyncState("syncing");

      try {
        const response = await fetch("/api/progress", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            lessonId,
            scorePercentage: VIDEO_COMPLETION_SCORE_PERCENTAGE,
          }),
        });

        if (!response.ok) {
          throw new Error(`Progress sync failed: ${response.status}`);
        }

        await deleteSyncedProgress(lessonId);
        setSyncState("synced");
      } catch (error) {
        console.error("Unable to sync video lesson progress online. Saving offline.", error);
        try {
          await saveOfflineProgress({
            lessonId,
            score: Math.round(VIDEO_COMPLETION_SCORE_PERCENTAGE * 10),
            totalQuestions: 10,
            completedAt: new Date().toISOString(),
            synced: false,
          });
        } catch (offlineError) {
          console.error("Unable to save video lesson progress offline.", offlineError);
        }
        setSyncState("queued");
      }
    };

    void persistCompletion();
  }, [lessonId, progress]);

  const restartLesson = () => {
    setProgress(0);
    setIsPlaying(false);
    setSyncState("idle");
    completionPersistedRef.current = false;
  };

  return (
    <section className="space-y-4 rounded-2xl border border-sky-200 bg-sky-50 p-5">
      <header>
        <p className="text-xs font-semibold uppercase tracking-wide text-sky-700">Guided Video Lesson</p>
        <h3 className="mt-1 text-lg font-bold text-zinc-900">{lessonTitle}</h3>
        <p className="mt-1 text-sm text-zinc-700">
          Approximate duration: {durationMinutes} minutes. Use the controls to step through checkpoints.
        </p>
      </header>

      <div className="rounded-xl border border-sky-300 bg-white p-4">
        <div className="flex items-center justify-between text-sm font-semibold text-zinc-700">
          <span>Playback Progress</span>
          <span>{progress}%</span>
        </div>
        <div className="mt-2 h-3 overflow-hidden rounded-full bg-sky-100">
          <div className="h-full rounded-full bg-sky-500 transition-all" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div className="grid gap-2 sm:grid-cols-2">
        {checkpoints.map((checkpoint) => {
          const reached = progress >= checkpoint.threshold;
          return (
            <article
              key={checkpoint.id}
              className={`rounded-xl border p-3 text-sm ${
                reached ? "border-emerald-300 bg-emerald-50 text-emerald-900" : "border-sky-200 bg-white text-zinc-700"
              }`}
            >
              <p className="font-semibold">{checkpoint.label}</p>
              <p className="mt-1 text-xs">{reached ? "Completed" : `Unlocks at ${checkpoint.threshold}%`}</p>
            </article>
          );
        })}
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setIsPlaying((previous) => !previous)}
          disabled={progress >= 100}
          className="rounded-full bg-sky-600 px-4 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isPlaying ? "Pause" : progress === 0 ? "Play Lesson" : "Resume"}
        </button>
        <button
          type="button"
          onClick={restartLesson}
          className="rounded-full border border-sky-300 bg-white px-4 py-2 text-sm font-semibold text-sky-700"
        >
          Restart
        </button>
      </div>

      {progress >= 100 ? (
        <p className="rounded-md border border-emerald-300 bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-800">
          Lesson complete. Great focus.
        </p>
      ) : null}

      {syncState === "syncing" ? <p className="text-xs text-zinc-500">Saving your progress...</p> : null}
      {syncState === "synced" ? (
        <p className="text-xs text-emerald-700 dark:text-emerald-300">Progress saved to your account.</p>
      ) : null}
      {syncState === "queued" ? (
        <p className="text-xs text-amber-700 dark:text-amber-300">
          Progress saved offline and will sync when your connection is restored.
        </p>
      ) : null}
    </section>
  );
}
