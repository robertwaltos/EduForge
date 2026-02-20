"use client";

import { useMemo, useRef, useState } from "react";
import { saveOfflineProgress } from "@/lib/offline/progress-db";

type InteractiveActivityProps = {
  lessonId: string;
  title: string;
  prompts: string[];
};

type ProgressSyncState = "idle" | "syncing" | "synced" | "queued";

const INTERACTIVE_COMPLETION_SCORE_PERCENTAGE = 0.75;

export default function InteractiveActivity({ lessonId, title, prompts }: InteractiveActivityProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [reflection, setReflection] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const [syncState, setSyncState] = useState<ProgressSyncState>("idle");
  const completionPersistedRef = useRef(false);

  const currentPrompt = useMemo(() => prompts[currentIndex] ?? "Try the activity in your own words.", [prompts, currentIndex]);

  const persistCompletion = async () => {
    if (completionPersistedRef.current) return;
    completionPersistedRef.current = true;
    setSyncState("syncing");

    try {
      const response = await fetch("/api/progress", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          lessonId,
          scorePercentage: INTERACTIVE_COMPLETION_SCORE_PERCENTAGE,
        }),
      });

      if (!response.ok) {
        throw new Error(`Progress sync failed: ${response.status}`);
      }

      setSyncState("synced");
    } catch (error) {
      console.error("Unable to sync interactive lesson progress online. Saving offline.", error);
      try {
        await saveOfflineProgress({
          lessonId,
          score: Math.round(INTERACTIVE_COMPLETION_SCORE_PERCENTAGE * 10),
          totalQuestions: 10,
          completedAt: new Date().toISOString(),
          synced: false,
        });
      } catch (offlineError) {
        console.error("Unable to save interactive lesson progress offline.", offlineError);
      }
      setSyncState("queued");
    }
  };

  const onNextPrompt = async () => {
    if (currentIndex >= prompts.length - 1) {
      setIsComplete(true);
      await persistCompletion();
      return;
    }
    setCurrentIndex((prev) => prev + 1);
  };

  const onRestart = () => {
    setCurrentIndex(0);
    setReflection("");
    setIsComplete(false);
    setSyncState("idle");
    completionPersistedRef.current = false;
  };

  return (
    <section className="rounded-2xl border border-amber-200 bg-amber-50 p-4 shadow-sm sm:p-5">
      <p className="text-xs font-semibold uppercase tracking-wide text-amber-700">Interactive Activity</p>
      <h3 className="mt-1 text-lg font-bold text-zinc-900">{title}</h3>
      <article className="mt-3 rounded-xl border border-amber-200 bg-white p-4">
        <p className="text-sm font-semibold text-zinc-800">{currentPrompt}</p>
      </article>

      <div className="mt-4 space-y-2">
        <label className="block text-sm font-medium text-zinc-700" htmlFor="reflection">
          Learner notes
        </label>
        <textarea
          id="reflection"
          rows={3}
          value={reflection}
          onChange={(event) => setReflection(event.target.value)}
          className="w-full rounded-md border border-amber-200 bg-white px-3 py-2 text-sm text-zinc-900"
          placeholder="Write what you discovered..."
        />
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={onNextPrompt}
          className="rounded-full bg-amber-500 px-4 py-2 text-sm font-semibold text-white hover:bg-amber-600"
        >
          {currentIndex >= prompts.length - 1 ? "Finish Activity" : "Next Prompt"}
        </button>
        <p className="text-xs text-zinc-600">
          Prompt {Math.min(currentIndex + 1, prompts.length)} / {prompts.length}
        </p>
      </div>

      {isComplete ? (
        <div className="mt-3 space-y-2">
          <p className="rounded-md border border-emerald-300 bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-800">
            Great work. You completed this activity.
          </p>
          <button
            type="button"
            onClick={onRestart}
            className="rounded-full border border-amber-300 bg-white px-3 py-1 text-xs font-semibold text-amber-700"
          >
            Restart Activity
          </button>
        </div>
      ) : null}
      {syncState === "syncing" ? <p className="mt-2 text-xs text-zinc-500">Saving your progress...</p> : null}
      {syncState === "synced" ? (
        <p className="mt-2 text-xs text-emerald-700 dark:text-emerald-300">Progress saved to your account.</p>
      ) : null}
      {syncState === "queued" ? (
        <p className="mt-2 text-xs text-amber-700 dark:text-amber-300">
          Progress saved offline and will sync when your connection is restored.
        </p>
      ) : null}
    </section>
  );
}
