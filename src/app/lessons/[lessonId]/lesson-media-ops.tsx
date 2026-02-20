"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

type MediaAssetType = "video" | "animation" | "image";

type PromptEntry = {
  label: string;
  assetType: MediaAssetType;
  provider: string;
  prompt: string;
};

type QueueResponse = {
  error?: string;
  duplicate?: boolean;
  job?: { id: string; status: string };
};

type LessonMediaJob = {
  id: string;
  asset_type: MediaAssetType;
  provider: string;
  status: "queued" | "running" | "completed" | "failed" | "canceled";
  output_url: string | null;
  error: string | null;
  created_at: string;
  updated_at: string;
  completed_at: string | null;
};

type JobsResponse = {
  jobs?: LessonMediaJob[];
  error?: string;
};

type RunResponse = {
  error?: string;
  processed?: number;
  completed?: number;
  failed?: number;
  message?: string;
};

type RetryResponse = {
  error?: string;
  scanned?: number;
  retried?: number;
  failedUpdates?: number;
  message?: string;
};

const ASSET_ORDER: MediaAssetType[] = ["video", "animation", "image"];

async function copyText(value: string) {
  if (typeof navigator === "undefined" || !navigator.clipboard?.writeText) {
    throw new Error("Clipboard is not available in this browser.");
  }
  await navigator.clipboard.writeText(value);
}

function formatTimestamp(value: string | null) {
  if (!value) return "n/a";
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return value;
  return parsed.toLocaleString();
}

function statusBadgeClass(status: LessonMediaJob["status"]) {
  if (status === "completed") return "bg-emerald-100 text-emerald-800";
  if (status === "failed") return "bg-red-100 text-red-800";
  if (status === "running") return "bg-indigo-100 text-indigo-800";
  if (status === "canceled") return "bg-zinc-200 text-zinc-700";
  return "bg-amber-100 text-amber-800";
}

export default function LessonMediaOps({
  moduleId,
  lessonId,
  videoPrompt,
  animationPrompt,
  imagePrompt,
}: {
  moduleId: string;
  lessonId: string;
  videoPrompt: string;
  animationPrompt: string;
  imagePrompt: string;
}) {
  const [actionStatus, setActionStatus] = useState("");
  const [jobsError, setJobsError] = useState("");
  const [jobs, setJobs] = useState<LessonMediaJob[]>([]);
  const [jobsLoading, setJobsLoading] = useState(true);
  const [jobsAccessDenied, setJobsAccessDenied] = useState(false);
  const [lastJobsRefreshAt, setLastJobsRefreshAt] = useState<string | null>(null);
  const [workingAssetType, setWorkingAssetType] = useState<MediaAssetType | null>(null);
  const [isProcessingLessonQueue, setIsProcessingLessonQueue] = useState(false);
  const [retryingAssetType, setRetryingAssetType] = useState<MediaAssetType | null>(null);

  const promptEntries: PromptEntry[] = useMemo(
    () => [
      {
        label: "Video Prompt",
        assetType: "video",
        provider: "seedance",
        prompt: videoPrompt,
      },
      {
        label: "Animation Prompt",
        assetType: "animation",
        provider: "seedance",
        prompt: animationPrompt,
      },
      {
        label: "Image Prompt",
        assetType: "image",
        provider: "imagegen",
        prompt: imagePrompt,
      },
    ],
    [animationPrompt, imagePrompt, videoPrompt],
  );

  const latestJobByAsset = useMemo(() => {
    const map = new Map<MediaAssetType, LessonMediaJob>();
    for (const assetType of ASSET_ORDER) {
      const latestJob = jobs.find((job) => job.asset_type === assetType);
      if (latestJob) {
        map.set(assetType, latestJob);
      }
    }
    return map;
  }, [jobs]);

  const refreshJobs = useCallback(
    async (silent = false) => {
      if (!silent) {
        setJobsLoading(true);
      }
      setJobsError("");

      try {
        const params = new URLSearchParams({
          moduleId,
          lessonId,
          limit: "30",
        });
        const response = await fetch(`/api/admin/media/jobs?${params.toString()}`, {
          method: "GET",
          cache: "no-store",
        });
        const payload = (await response.json().catch(() => ({}))) as JobsResponse;

        if (response.status === 401 || response.status === 403) {
          setJobsAccessDenied(true);
          setJobs([]);
          return;
        }

        if (!response.ok) {
          throw new Error(payload.error ?? "Unable to load lesson media job status.");
        }

        setJobsAccessDenied(false);
        setJobs(Array.isArray(payload.jobs) ? payload.jobs : []);
        setLastJobsRefreshAt(new Date().toISOString());
      } catch (error) {
        setJobsError(error instanceof Error ? error.message : "Unable to load lesson media job status.");
      } finally {
        if (!silent) {
          setJobsLoading(false);
        }
      }
    },
    [lessonId, moduleId],
  );

  useEffect(() => {
    void refreshJobs();
  }, [refreshJobs]);

  useEffect(() => {
    if (jobsAccessDenied) {
      return;
    }

    const intervalId = window.setInterval(() => {
      void refreshJobs(true);
    }, 20000);

    return () => window.clearInterval(intervalId);
  }, [jobsAccessDenied, refreshJobs]);

  const handleCopy = async (entry: PromptEntry) => {
    try {
      await copyText(entry.prompt);
      setActionStatus(`${entry.label} copied.`);
    } catch (error) {
      setActionStatus(error instanceof Error ? error.message : "Unable to copy prompt.");
    }
  };

  const handleQueue = async (entry: PromptEntry) => {
    setWorkingAssetType(entry.assetType);
    setActionStatus("");

    try {
      const response = await fetch("/api/admin/media/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          moduleId,
          lessonId,
          assetType: entry.assetType,
          provider: entry.provider,
          prompt: entry.prompt,
          metadata: {
            source: "lesson-page",
            lessonPath: `/lessons/${lessonId}`,
          },
        }),
      });

      const payload = (await response.json().catch(() => ({}))) as QueueResponse;
      if (!response.ok) {
        throw new Error(payload.error ?? "Failed to queue media job.");
      }

      if (payload.duplicate) {
        setActionStatus(
          `Existing ${entry.assetType} job already queued or completed (job ${payload.job?.id ?? "unknown"}).`,
        );
        await refreshJobs(true);
        return;
      }

      setActionStatus(`Queued ${entry.assetType} media job ${payload.job?.id ?? ""}`.trim());
      await refreshJobs(true);
    } catch (error) {
      setActionStatus(error instanceof Error ? error.message : "Failed to queue media job.");
    } finally {
      setWorkingAssetType(null);
    }
  };

  const handleProcessLessonQueue = async () => {
    setIsProcessingLessonQueue(true);
    setActionStatus("");

    try {
      const response = await fetch("/api/admin/media/jobs/run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          moduleId,
          lessonId,
          batchSize: 10,
        }),
      });
      const payload = (await response.json().catch(() => ({}))) as RunResponse;
      if (!response.ok) {
        throw new Error(payload.error ?? "Failed to process lesson media queue.");
      }

      if (payload.message) {
        setActionStatus(payload.message);
      } else {
        setActionStatus(
          `Lesson queue processed. Processed ${payload.processed ?? 0}, completed ${payload.completed ?? 0}, failed ${payload.failed ?? 0}.`,
        );
      }
      await refreshJobs(true);
    } catch (error) {
      setActionStatus(error instanceof Error ? error.message : "Failed to process lesson media queue.");
    } finally {
      setIsProcessingLessonQueue(false);
    }
  };

  const handleRetryLatestAssetJob = async (assetType: MediaAssetType) => {
    setRetryingAssetType(assetType);
    setActionStatus("");

    try {
      const response = await fetch("/api/admin/media/jobs/retry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          moduleId,
          lessonId,
          assetType,
          includeCanceled: true,
          limit: 1,
        }),
      });

      const payload = (await response.json().catch(() => ({}))) as RetryResponse;
      if (!response.ok) {
        throw new Error(payload.error ?? "Failed to retry media job.");
      }

      if ((payload.retried ?? 0) === 0) {
        setActionStatus(payload.message ?? `No retryable ${assetType} jobs found for this lesson.`);
      } else {
        setActionStatus(
          `Retried ${payload.retried ?? 0} ${assetType} job${(payload.retried ?? 0) === 1 ? "" : "s"} for this lesson.`,
        );
      }

      await refreshJobs(true);
    } catch (error) {
      setActionStatus(error instanceof Error ? error.message : "Failed to retry lesson media job.");
    } finally {
      setRetryingAssetType(null);
    }
  };

  return (
    <div className="space-y-3">
      {promptEntries.map((entry) => {
        const latestJob = latestJobByAsset.get(entry.assetType);

        return (
          <article key={entry.assetType} className="rounded-xl border border-amber-200 bg-white p-4">
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-sm font-semibold text-zinc-900">{entry.label}</h3>
              <span className="rounded-full bg-zinc-100 px-2 py-1 text-[11px] text-zinc-600">{entry.provider}</span>
            </div>
            <p className="mt-2 text-xs text-zinc-700">{entry.prompt}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => void handleCopy(entry)}
                className="rounded-md border border-black/15 px-3 py-1 text-xs hover:bg-black/5"
              >
                Copy Prompt
              </button>
              <button
                type="button"
                disabled={workingAssetType === entry.assetType || jobsAccessDenied}
                onClick={() => void handleQueue(entry)}
                className="rounded-md bg-amber-600 px-3 py-1 text-xs font-medium text-white hover:bg-amber-500 disabled:opacity-70"
                title={jobsAccessDenied ? "Admin access required to queue media jobs." : undefined}
              >
                {workingAssetType === entry.assetType ? "Queueing..." : "Queue Media Job"}
              </button>
              {latestJob && (latestJob.status === "failed" || latestJob.status === "canceled") ? (
                <button
                  type="button"
                  disabled={retryingAssetType === entry.assetType || jobsAccessDenied}
                  onClick={() => void handleRetryLatestAssetJob(entry.assetType)}
                  className="rounded-md border border-indigo-300 bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700 hover:bg-indigo-100 disabled:opacity-70"
                  title={jobsAccessDenied ? "Admin access required to retry media jobs." : undefined}
                >
                  {retryingAssetType === entry.assetType ? "Retrying..." : "Retry Failed Job"}
                </button>
              ) : null}
            </div>
            {latestJob ? (
              <div className="mt-3 rounded-md border border-black/10 bg-zinc-50 p-3 text-[11px]">
                <p className="text-zinc-600">
                  Latest status:{" "}
                  <span className={`rounded px-2 py-0.5 font-semibold ${statusBadgeClass(latestJob.status)}`}>
                    {latestJob.status}
                  </span>
                </p>
                <p className="mt-1 text-zinc-500">Updated: {formatTimestamp(latestJob.updated_at)}</p>
                {latestJob.output_url ? (
                  <a
                    href={latestJob.output_url}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-1 inline-block text-zinc-700 underline"
                  >
                    Open output asset
                  </a>
                ) : null}
                {latestJob.error ? <p className="mt-1 text-red-700">{latestJob.error}</p> : null}
              </div>
            ) : (
              <p className="mt-2 text-[11px] text-zinc-500">No {entry.assetType} job queued yet for this lesson.</p>
            )}
          </article>
        );
      })}
      {actionStatus ? <p className="text-xs text-amber-900">{actionStatus}</p> : null}
      {jobsError ? <p className="text-xs text-red-700">{jobsError}</p> : null}
      {jobsAccessDenied ? (
        <p className="text-[11px] text-zinc-600">
          Sign in as an admin to view lesson queue status and enqueue media jobs.
        </p>
      ) : (
        <div className="flex items-center gap-3 text-[11px] text-zinc-600">
          <span>{jobsLoading ? "Loading lesson queue status..." : `Tracked jobs: ${jobs.length}`}</span>
          <button
            type="button"
            className="rounded border border-black/15 px-2 py-1 hover:bg-black/5"
            onClick={() => void refreshJobs()}
          >
            Refresh Status
          </button>
          <button
            type="button"
            className="rounded border border-black/15 px-2 py-1 hover:bg-black/5 disabled:opacity-70"
            disabled={isProcessingLessonQueue}
            onClick={() => void handleProcessLessonQueue()}
          >
            {isProcessingLessonQueue ? "Processing..." : "Process This Lesson Queue"}
          </button>
          {lastJobsRefreshAt ? <span>Last refresh: {formatTimestamp(lastJobsRefreshAt)}</span> : null}
        </div>
      )}
      <p className="text-[11px] text-zinc-600">
        Queueing requires an authenticated admin account. Non-admin requests are rejected automatically.
      </p>
    </div>
  );
}
