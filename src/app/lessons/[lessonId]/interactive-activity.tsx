"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { deleteSyncedProgress, saveOfflineProgress } from "@/lib/offline/progress-db";

type InteractiveActivityProps = {
  lessonId: string;
  title: string;
  prompts: string[];
};

type ProgressSyncState = "idle" | "syncing" | "synced" | "queued";

const MIN_RESPONSE_CHARACTERS = 10;
const MIN_INTERACTIVE_SCORE = 0.6;
const MAX_INTERACTIVE_SCORE = 0.95;

export default function InteractiveActivity({ lessonId, title, prompts }: InteractiveActivityProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [responses, setResponses] = useState<string[]>(() => prompts.map(() => ""));
  const [validationMessage, setValidationMessage] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const [syncState, setSyncState] = useState<ProgressSyncState>("idle");
  const [draftHydrated, setDraftHydrated] = useState(false);
  const completionPersistedRef = useRef(false);
  const storageKey = useMemo(() => `interactive-activity:${lessonId}`, [lessonId]);

  const currentPrompt = useMemo(() => prompts[currentIndex] ?? "Try the activity in your own words.", [prompts, currentIndex]);
  const currentResponse = responses[currentIndex] ?? "";

  const answeredCount = useMemo(
    () => responses.filter((entry) => entry.trim().length >= MIN_RESPONSE_CHARACTERS).length,
    [responses],
  );

  const completionScore = useMemo(() => {
    if (prompts.length === 0) {
      return MIN_INTERACTIVE_SCORE;
    }
    const completionRatio = answeredCount / prompts.length;
    return Math.min(
      MAX_INTERACTIVE_SCORE,
      Math.max(MIN_INTERACTIVE_SCORE, completionRatio),
    );
  }, [answeredCount, prompts.length]);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(storageKey);
      if (!raw) {
        return;
      }
      const parsed = JSON.parse(raw) as {
        currentIndex?: number;
        responses?: string[];
        isComplete?: boolean;
      };
      if (Array.isArray(parsed.responses) && parsed.responses.length === prompts.length) {
        setResponses(parsed.responses.map((entry) => String(entry ?? "")));
      }
      if (typeof parsed.currentIndex === "number" && Number.isFinite(parsed.currentIndex)) {
        setCurrentIndex(Math.max(0, Math.min(prompts.length - 1, Math.floor(parsed.currentIndex))));
      }
      if (parsed.isComplete === true) {
        setIsComplete(true);
      }
    } catch {
      // Ignore malformed local drafts.
    } finally {
      setDraftHydrated(true);
    }
  }, [prompts.length, storageKey]);

  useEffect(() => {
    if (!draftHydrated) {
      return;
    }

    if (isComplete) {
      window.localStorage.removeItem(storageKey);
      return;
    }

    const payload = JSON.stringify({
      currentIndex,
      responses,
      isComplete,
      updatedAt: new Date().toISOString(),
    });
    window.localStorage.setItem(storageKey, payload);
  }, [currentIndex, draftHydrated, isComplete, responses, storageKey]);

  const persistCompletion = async (scorePercentage: number) => {
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
          scorePercentage,
        }),
      });

      if (!response.ok) {
        throw new Error(`Progress sync failed: ${response.status}`);
      }

      await deleteSyncedProgress(lessonId);
      setSyncState("synced");
    } catch (error) {
      console.error("Unable to sync interactive lesson progress online. Saving offline.", error);
      try {
        await saveOfflineProgress({
          lessonId,
          score: Math.round(scorePercentage * 10),
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

  const setResponseAtCurrentPrompt = (nextValue: string) => {
    setResponses((previous) => previous.map((entry, index) => (index === currentIndex ? nextValue : entry)));
    if (validationMessage) {
      setValidationMessage("");
    }
  };

  const onNextPrompt = async () => {
    if (currentResponse.trim().length < MIN_RESPONSE_CHARACTERS) {
      setValidationMessage(
        `Please add at least ${MIN_RESPONSE_CHARACTERS} characters before continuing.`,
      );
      return;
    }

    setValidationMessage("");

    if (currentIndex >= prompts.length - 1) {
      setIsComplete(true);
      await persistCompletion(completionScore);
      return;
    }
    setCurrentIndex((prev) => prev + 1);
  };

  const onPreviousPrompt = () => {
    setValidationMessage("");
    setCurrentIndex((previous) => Math.max(0, previous - 1));
  };

  const onRestart = () => {
    setCurrentIndex(0);
    setResponses(prompts.map(() => ""));
    setValidationMessage("");
    setIsComplete(false);
    setSyncState("idle");
    completionPersistedRef.current = false;
    window.localStorage.removeItem(storageKey);
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
          Learner response
        </label>
        <textarea
          id="reflection"
          rows={3}
          value={currentResponse}
          onChange={(event) => setResponseAtCurrentPrompt(event.target.value)}
          className="w-full rounded-md border border-amber-200 bg-white px-3 py-2 text-sm text-zinc-900"
          placeholder="Write your answer for this prompt..."
        />
        {validationMessage ? (
          <p className="text-xs text-amber-700">{validationMessage}</p>
        ) : (
          <p className="text-xs text-zinc-500">
            Add at least {MIN_RESPONSE_CHARACTERS} characters to unlock the next prompt.
          </p>
        )}
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={onPreviousPrompt}
          disabled={currentIndex === 0}
          className="rounded-full border border-amber-300 bg-white px-4 py-2 text-sm font-semibold text-amber-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          Previous
        </button>
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
        <p className="text-xs text-zinc-600">Answered: {answeredCount} / {prompts.length}</p>
      </div>

      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        {prompts.map((prompt, index) => {
          const isAnswered = (responses[index] ?? "").trim().length >= MIN_RESPONSE_CHARACTERS;
          return (
            <article
              key={`${lessonId}-prompt-progress-${index}`}
              className={`rounded-lg border px-3 py-2 text-xs ${
                isAnswered ? "border-emerald-300 bg-emerald-50 text-emerald-800" : "border-amber-200 bg-white text-zinc-700"
              }`}
            >
              <p className="font-semibold">Prompt {index + 1}</p>
              <p className="mt-1 line-clamp-2">{prompt}</p>
              <p className="mt-1">{isAnswered ? "Answered" : "Pending"}</p>
            </article>
          );
        })}
      </div>

      {isComplete ? (
        <div className="mt-3 space-y-2">
          <p className="rounded-md border border-emerald-300 bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-800">
            Great work. You completed this activity.
          </p>
          <p className="text-xs text-zinc-600">
            Activity score saved: {Math.round(completionScore * 100)}%
          </p>
          <div className="rounded-lg border border-amber-200 bg-white p-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-amber-700">Activity Recap</p>
            <div className="mt-2 space-y-2">
              {prompts.map((prompt, index) => (
                <article key={`${lessonId}-recap-${index}`} className="rounded-md border border-amber-100 bg-amber-50/40 p-2">
                  <p className="text-xs font-semibold text-zinc-800">Prompt {index + 1}</p>
                  <p className="mt-1 text-xs text-zinc-700">{prompt}</p>
                  <p className="mt-1 text-xs text-zinc-900">{responses[index]?.trim() || "No response recorded."}</p>
                </article>
              ))}
            </div>
          </div>
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
