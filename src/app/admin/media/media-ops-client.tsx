"use client";

import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";

type MediaJob = {
  id: string;
  module_id: string | null;
  lesson_id: string | null;
  asset_type: "video" | "animation" | "image";
  provider: string;
  prompt: string;
  status: "queued" | "running" | "completed" | "failed" | "canceled";
  output_url: string | null;
  error: string | null;
  created_at: string;
  updated_at: string;
  completed_at: string | null;
};

type PromptLesson = {
  lessonId: string;
  lessonTitle: string;
  lessonType: string;
};

type PromptModule = {
  moduleId: string;
  moduleTitle: string;
  lessonCount: number;
  lessons: PromptLesson[];
};

type PromptPack = {
  modules?: PromptModule[];
};

type JobsPagination = {
  total?: number;
  limit?: number;
  offset?: number;
  hasMore?: boolean;
  nextOffset?: number | null;
  previousOffset?: number | null;
};

type JobsResponse = {
  jobs?: MediaJob[];
  error?: string;
  pagination?: JobsPagination;
};

type RetryResponse = {
  scanned?: number;
  retried?: number;
  failedUpdates?: number;
  skippedActive?: number;
  message?: string;
};

type RequeueStaleResponse = {
  scanned?: number;
  requeued?: number;
  skippedDueToOtherActive?: number;
  failedUpdates?: number;
  maxAgeMinutes?: number;
  message?: string;
};

type AssetFilter = "all" | MediaJob["asset_type"];
type StatusFilter = "all" | MediaJob["status"];

type JobsPaginationState = {
  total: number;
  limit: number;
  offset: number;
  hasMore: boolean;
  nextOffset: number | null;
  previousOffset: number | null;
};

async function postJson(url: string, payload: unknown) {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = (await response.json().catch(() => ({}))) as Record<string, unknown>;
  if (!response.ok) {
    throw new Error(typeof data.error === "string" ? data.error : "Request failed.");
  }
  return data;
}

function statusBadgeClass(status: MediaJob["status"]) {
  if (status === "completed") return "bg-emerald-100 text-emerald-800";
  if (status === "failed") return "bg-red-100 text-red-800";
  if (status === "running") return "bg-indigo-100 text-indigo-800";
  if (status === "canceled") return "bg-zinc-200 text-zinc-700";
  return "bg-amber-100 text-amber-800";
}

export default function MediaOpsClient({ initialJobs }: { initialJobs: MediaJob[] }) {
  const [jobs, setJobs] = useState(initialJobs);
  const [status, setStatus] = useState("");
  const [promptModules, setPromptModules] = useState<PromptModule[]>([]);
  const [packLoading, setPackLoading] = useState(false);
  const [packModuleId, setPackModuleId] = useState("");
  const [packLessonId, setPackLessonId] = useState("");
  const [packAssetType, setPackAssetType] = useState<MediaJob["asset_type"]>("video");
  const [packQueueLimit, setPackQueueLimit] = useState(50);
  const [jobsLoading, setJobsLoading] = useState(false);
  const [jobFilterModuleId, setJobFilterModuleId] = useState("");
  const [jobFilterLessonId, setJobFilterLessonId] = useState("");
  const [jobFilterAssetType, setJobFilterAssetType] = useState<AssetFilter>("all");
  const [jobFilterStatus, setJobFilterStatus] = useState<StatusFilter>("all");
  const [jobFilterLimit, setJobFilterLimit] = useState(100);
  const [jobFilterOffset, setJobFilterOffset] = useState(0);
  const [jobRetryIncludeCanceled, setJobRetryIncludeCanceled] = useState(false);
  const [staleRequeueMinutes, setStaleRequeueMinutes] = useState(90);
  const [jobAutoRefresh, setJobAutoRefresh] = useState(true);
  const [jobsLastUpdatedAt, setJobsLastUpdatedAt] = useState<string | null>(null);
  const [isRetryingFiltered, setIsRetryingFiltered] = useState(false);
  const [isRequeueingStale, setIsRequeueingStale] = useState(false);
  const [retryingJobId, setRetryingJobId] = useState<string | null>(null);
  const [jobsPagination, setJobsPagination] = useState<JobsPaginationState>({
    total: initialJobs.length,
    limit: 100,
    offset: 0,
    hasMore: false,
    nextOffset: null,
    previousOffset: null,
  });

  const queuedCount = useMemo(() => jobs.filter((job) => job.status === "queued").length, [jobs]);
  const runningCount = useMemo(() => jobs.filter((job) => job.status === "running").length, [jobs]);
  const completedCount = useMemo(() => jobs.filter((job) => job.status === "completed").length, [jobs]);
  const failedCount = useMemo(() => jobs.filter((job) => job.status === "failed").length, [jobs]);
  const canceledCount = useMemo(() => jobs.filter((job) => job.status === "canceled").length, [jobs]);
  const pageStart = jobsPagination.total === 0 ? 0 : jobsPagination.offset + 1;
  const pageEnd = jobs.length === 0 ? 0 : jobsPagination.offset + jobs.length;
  const selectedPromptModule = useMemo(
    () => promptModules.find((entry) => entry.moduleId === packModuleId) ?? null,
    [packModuleId, promptModules],
  );
  const selectedPromptLesson = useMemo(
    () => selectedPromptModule?.lessons.find((entry) => entry.lessonId === packLessonId) ?? null,
    [packLessonId, selectedPromptModule],
  );
  const selectedJobFilterModule = useMemo(
    () => promptModules.find((entry) => entry.moduleId === jobFilterModuleId) ?? null,
    [jobFilterModuleId, promptModules],
  );

  const refreshJobs = useCallback(async () => {
    setJobsLoading(true);
    try {
      const params = new URLSearchParams({
        limit: String(jobFilterLimit),
        offset: String(jobFilterOffset),
      });
      if (jobFilterModuleId) params.set("moduleId", jobFilterModuleId);
      if (jobFilterLessonId) params.set("lessonId", jobFilterLessonId);
      if (jobFilterAssetType !== "all") params.set("assetType", jobFilterAssetType);
      if (jobFilterStatus !== "all") params.set("status", jobFilterStatus);

      const response = await fetch(`/api/admin/media/jobs?${params.toString()}`, {
        method: "GET",
        cache: "no-store",
      });
      const payload = (await response.json().catch(() => ({}))) as JobsResponse;
      if (!response.ok) {
        throw new Error(payload.error ?? "Failed to load jobs.");
      }
      const nextJobs = payload.jobs ?? [];
      const pagination = payload.pagination ?? {};
      const total = Number.isFinite(Number(pagination.total)) ? Number(pagination.total) : nextJobs.length;
      const limit = Number.isFinite(Number(pagination.limit)) ? Number(pagination.limit) : jobFilterLimit;
      const offset = Number.isFinite(Number(pagination.offset)) ? Number(pagination.offset) : jobFilterOffset;
      const hasMore = Boolean(pagination.hasMore);
      const parsedNextOffset =
        pagination.nextOffset !== undefined && pagination.nextOffset !== null
          ? Number(pagination.nextOffset)
          : null;
      const parsedPreviousOffset =
        pagination.previousOffset !== undefined && pagination.previousOffset !== null
          ? Number(pagination.previousOffset)
          : null;
      const nextOffset = parsedNextOffset !== null && Number.isFinite(parsedNextOffset) ? parsedNextOffset : null;
      const previousOffset =
        parsedPreviousOffset !== null && Number.isFinite(parsedPreviousOffset) ? parsedPreviousOffset : null;

      setJobs(nextJobs);
      setJobsPagination({
        total,
        limit,
        offset,
        hasMore,
        nextOffset,
        previousOffset,
      });
      setJobsLastUpdatedAt(new Date().toISOString());
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Failed to load jobs.");
    } finally {
      setJobsLoading(false);
    }
  }, [jobFilterAssetType, jobFilterLessonId, jobFilterLimit, jobFilterModuleId, jobFilterOffset, jobFilterStatus]);

  const loadPromptPack = useCallback(async () => {
    if (promptModules.length > 0 || packLoading) return;
    setPackLoading(true);
    try {
      const response = await fetch("/api/admin/media/prompt-pack", { method: "GET" });
      const payload = (await response.json().catch(() => ({}))) as PromptPack;
      const modules = Array.isArray(payload.modules) ? payload.modules : [];
      setPromptModules(modules);
      if (modules.length > 0) {
        const firstModule = modules[0];
        setPackModuleId(firstModule.moduleId);
        setPackLessonId(firstModule.lessons[0]?.lessonId ?? "");
      }
    } catch {
      setStatus("Unable to load lesson media prompt pack.");
    } finally {
      setPackLoading(false);
    }
  }, [packLoading, promptModules.length]);

  useEffect(() => {
    void loadPromptPack();
  }, [loadPromptPack]);

  useEffect(() => {
    void refreshJobs();
  }, [refreshJobs]);

  useEffect(() => {
    if (!jobAutoRefresh) return;
    const intervalId = window.setInterval(() => {
      void refreshJobs();
    }, 20000);

    return () => window.clearInterval(intervalId);
  }, [jobAutoRefresh, refreshJobs]);

  const handleQuickQueueFromPromptPack = async () => {
    if (!selectedPromptLesson || !packModuleId || !packLessonId) {
      setStatus("Select module + lesson from prompt pack before queueing.");
      return;
    }

    try {
      const result = (await postJson("/api/admin/media/jobs/queue-from-pack", {
        moduleId: packModuleId || undefined,
        lessonId: packLessonId || undefined,
        assetType: packAssetType,
        limit: 1,
      })) as { queued?: number; skipped?: number };
      setStatus(
        `Prompt-pack queue complete. Queued ${result.queued ?? 0}, skipped ${result.skipped ?? 0}.`,
      );
      await refreshJobs();
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Failed to queue prompt-pack job.");
    }
  };

  const handleBulkQueueFromPromptPack = async () => {
    try {
      const result = (await postJson("/api/admin/media/jobs/queue-from-pack", {
        moduleId: packModuleId || undefined,
        lessonId: packLessonId || undefined,
        assetType: packAssetType,
        limit: packQueueLimit,
      })) as { scanned?: number; queued?: number; skipped?: number };
      setStatus(
        `Prompt-pack bulk queue complete. Scanned ${result.scanned ?? 0}, queued ${result.queued ?? 0}, skipped ${result.skipped ?? 0}.`,
      );
      await refreshJobs();
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Failed to bulk queue prompt-pack jobs.");
    }
  };

  const handleCreateJob = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    try {
      const result = (await postJson("/api/admin/media/jobs", {
        moduleId: form.get("moduleId"),
        lessonId: form.get("lessonId"),
        assetType: form.get("assetType"),
        provider: form.get("provider"),
        prompt: form.get("prompt"),
      })) as { job?: { id: string } };
      setStatus(`Queued media job ${result.job?.id ?? ""}`.trim());
      event.currentTarget.reset();
      await refreshJobs();
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Failed to queue job.");
    }
  };

  const handleRunQueue = async () => {
    try {
      const result = (await postJson("/api/admin/media/jobs/run", {
        batchSize: 10,
        moduleId: jobFilterModuleId || undefined,
        lessonId: jobFilterLessonId || undefined,
        assetType: jobFilterAssetType === "all" ? undefined : jobFilterAssetType,
      })) as {
        processed?: number;
        completed?: number;
        failed?: number;
        message?: string;
      };
      if (result.message) {
        setStatus(result.message);
      } else {
        setStatus(
          `Queue run complete. Processed ${result.processed ?? 0}, completed ${result.completed ?? 0}, failed ${result.failed ?? 0}.`,
        );
      }
      await refreshJobs();
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Failed to run media queue.");
    }
  };

  const handlePreviousPage = () => {
    if (jobsPagination.previousOffset === null) return;
    setJobFilterOffset(jobsPagination.previousOffset);
  };

  const handleNextPage = () => {
    if (jobsPagination.nextOffset === null) return;
    setJobFilterOffset(jobsPagination.nextOffset);
  };

  const handleRetryFiltered = async () => {
    setIsRetryingFiltered(true);
    try {
      const result = (await postJson("/api/admin/media/jobs/retry", {
        moduleId: jobFilterModuleId || undefined,
        lessonId: jobFilterLessonId || undefined,
        assetType: jobFilterAssetType === "all" ? undefined : jobFilterAssetType,
        includeCanceled: jobRetryIncludeCanceled,
        limit: jobFilterLimit,
      })) as RetryResponse;

      if (result.message) {
        setStatus(result.message);
      } else {
        setStatus(
          `Retry complete. Scanned ${result.scanned ?? 0}, retried ${result.retried ?? 0}, skipped active ${result.skippedActive ?? 0}, failed updates ${result.failedUpdates ?? 0}.`,
        );
      }
      await refreshJobs();
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Failed to retry filtered jobs.");
    } finally {
      setIsRetryingFiltered(false);
    }
  };

  const handleRequeueStale = async () => {
    setIsRequeueingStale(true);
    try {
      const result = (await postJson("/api/admin/media/jobs/requeue-stale", {
        moduleId: jobFilterModuleId || undefined,
        lessonId: jobFilterLessonId || undefined,
        assetType: jobFilterAssetType === "all" ? undefined : jobFilterAssetType,
        limit: jobFilterLimit,
        maxAgeMinutes: staleRequeueMinutes,
      })) as RequeueStaleResponse;

      if (result.message) {
        setStatus(result.message);
      } else {
        setStatus(
          `Stale requeue complete. Scanned ${result.scanned ?? 0}, re-queued ${result.requeued ?? 0}, skipped active ${result.skippedDueToOtherActive ?? 0}, failed updates ${result.failedUpdates ?? 0}.`,
        );
      }
      await refreshJobs();
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Failed to requeue stale running jobs.");
    } finally {
      setIsRequeueingStale(false);
    }
  };

  const handleRetryJob = async (jobId: string) => {
    setRetryingJobId(jobId);
    try {
      const result = (await postJson("/api/admin/media/jobs/retry", {
        jobIds: [jobId],
        includeCanceled: true,
      })) as RetryResponse;

      if ((result.retried ?? 0) === 0 && result.message) {
        setStatus(result.message);
      } else {
        setStatus(`Retried job ${jobId}.`);
      }
      await refreshJobs();
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Failed to retry job.");
    } finally {
      setRetryingJobId(null);
    }
  };

  const handleStatusUpdate = async (jobId: string, nextStatus: MediaJob["status"]) => {
    try {
      await postJson(`/api/admin/media/jobs/${jobId}/status`, { status: nextStatus });
      setStatus(`Updated job ${jobId} to ${nextStatus}.`);
      await refreshJobs();
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Failed to update status.");
    }
  };

  return (
    <div className="space-y-6">
      <section className="rounded-lg border border-black/10 bg-white p-5">
        <h2 className="text-lg font-semibold">Queue Media Job</h2>
        <p className="mt-2 text-sm text-zinc-600">
          Queue placeholder-to-production asset generation for lesson videos, animations, and images.
        </p>
        <div className="mt-3 flex flex-wrap gap-3 text-xs">
          <a className="rounded-md border border-black/15 px-2 py-1 hover:bg-black/5" href="/MEDIA-READINESS-REPORT.md" target="_blank" rel="noreferrer">
            Open Media Readiness Report
          </a>
          <a className="rounded-md border border-black/15 px-2 py-1 hover:bg-black/5" href="/LESSON-MEDIA-PROMPT-PACK.md" target="_blank" rel="noreferrer">
            Open Lesson Media Prompt Pack
          </a>
          <a className="rounded-md border border-black/15 px-2 py-1 hover:bg-black/5" href="/AI-MEDIA-PROMPTS.md" target="_blank" rel="noreferrer">
            Open AI Media Prompt Catalog
          </a>
        </div>

        <div className="mt-4 rounded-md border border-black/10 bg-zinc-50 p-4">
          <h3 className="text-sm font-semibold">Quick Queue From Lesson Prompt Pack</h3>
          <p className="mt-1 text-xs text-zinc-600">
            Select a module/lesson and queue a pre-generated Seedance prompt without manual copy/paste.
          </p>
          <div className="mt-3 grid gap-2 md:grid-cols-4">
            <select
              className="rounded-md border border-black/15 px-2 py-2 text-sm"
              value={packModuleId}
              onChange={(event) => {
                const nextModuleId = event.target.value;
                setPackModuleId(nextModuleId);
                if (!nextModuleId) {
                  setPackLessonId("");
                  return;
                }
                const nextModule = promptModules.find((entry) => entry.moduleId === nextModuleId);
                setPackLessonId(nextModule?.lessons[0]?.lessonId ?? "");
              }}
            >
              <option value="">{packLoading ? "Loading modules..." : "All modules"}</option>
              {promptModules.map((moduleEntry) => (
                <option key={moduleEntry.moduleId} value={moduleEntry.moduleId}>
                  {moduleEntry.moduleTitle}
                </option>
              ))}
            </select>
            <select
              className="rounded-md border border-black/15 px-2 py-2 text-sm"
              value={packLessonId}
              onChange={(event) => setPackLessonId(event.target.value)}
            >
              <option value="">{selectedPromptModule ? "All lessons in module" : "All lessons"}</option>
              {(selectedPromptModule?.lessons ?? []).map((lesson) => (
                <option key={lesson.lessonId} value={lesson.lessonId}>
                  {lesson.lessonTitle}
                </option>
              ))}
            </select>
            <select
              className="rounded-md border border-black/15 px-2 py-2 text-sm"
              value={packAssetType}
              onChange={(event) => setPackAssetType(event.target.value as MediaJob["asset_type"])}
            >
              <option value="video">Video Prompt</option>
              <option value="animation">Animation Prompt</option>
              <option value="image">Image Prompt</option>
            </select>
            <button
              type="button"
              className="rounded-md bg-emerald-600 px-3 py-2 text-sm font-medium text-white hover:bg-emerald-500"
              onClick={() => void handleQuickQueueFromPromptPack()}
            >
              Queue One
            </button>
          </div>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <label className="text-xs text-zinc-600">
              Bulk limit
              <input
                type="number"
                min={1}
                max={500}
                value={packQueueLimit}
                onChange={(event) => setPackQueueLimit(Math.max(1, Math.min(500, Number(event.target.value) || 1)))}
                className="ml-2 w-20 rounded border border-black/15 px-2 py-1 text-xs"
              />
            </label>
            <button
              type="button"
              className="rounded-md border border-black/15 px-3 py-1 text-xs hover:bg-black/5"
              onClick={() => void handleBulkQueueFromPromptPack()}
            >
              Bulk Queue From Pack
            </button>
          </div>
        </div>

        <form className="mt-4 grid gap-3 md:grid-cols-2" onSubmit={handleCreateJob}>
          <input name="moduleId" placeholder="Module ID (optional)" className="rounded-md border border-black/15 px-3 py-2 text-sm" />
          <input name="lessonId" placeholder="Lesson ID (optional)" className="rounded-md border border-black/15 px-3 py-2 text-sm" />
          <select name="assetType" className="rounded-md border border-black/15 px-3 py-2 text-sm" defaultValue="video">
            <option value="video">Video</option>
            <option value="animation">Animation</option>
            <option value="image">Image</option>
          </select>
          <input name="provider" defaultValue="seedance" className="rounded-md border border-black/15 px-3 py-2 text-sm" />
          <textarea
            name="prompt"
            required
            minLength={20}
            rows={5}
            placeholder="Describe the media asset to generate..."
            className="rounded-md border border-black/15 px-3 py-2 text-sm md:col-span-2"
          />
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500"
          >
            Queue Job
          </button>
        </form>
      </section>

      <section className="rounded-lg border border-black/10 bg-white p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-lg font-semibold">Media Job Queue</h2>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              className="rounded-md border border-indigo-300 bg-indigo-50 px-3 py-1 text-sm text-indigo-700 hover:bg-indigo-100 disabled:opacity-70"
              onClick={() => void handleRetryFiltered()}
              disabled={isRetryingFiltered}
            >
              {isRetryingFiltered ? "Retrying..." : "Retry Failed (Filtered)"}
            </button>
            <button
              type="button"
              className="rounded-md border border-amber-300 bg-amber-50 px-3 py-1 text-sm text-amber-800 hover:bg-amber-100 disabled:opacity-70"
              onClick={() => void handleRequeueStale()}
              disabled={isRequeueingStale}
            >
              {isRequeueingStale ? "Requeueing..." : "Requeue Stale Running"}
            </button>
            <button
              type="button"
              className="rounded-md bg-indigo-600 px-3 py-1 text-sm text-white hover:bg-indigo-500"
              onClick={() => void handleRunQueue()}
            >
              Process Filtered Queue
            </button>
            <button
              type="button"
              className="rounded-md border border-black/15 px-3 py-1 text-sm hover:bg-black/5"
              onClick={() => void refreshJobs()}
            >
              Refresh
            </button>
          </div>
        </div>
        <div className="mt-3 grid gap-2 md:grid-cols-7">
          <select
            className="rounded-md border border-black/15 px-2 py-2 text-sm"
            value={jobFilterModuleId}
            onChange={(event) => {
              const nextModuleId = event.target.value;
              setJobFilterModuleId(nextModuleId);
              setJobFilterLessonId("");
              setJobFilterOffset(0);
            }}
          >
            <option value="">{packLoading ? "Loading modules..." : "All modules"}</option>
            {promptModules.map((moduleEntry) => (
              <option key={moduleEntry.moduleId} value={moduleEntry.moduleId}>
                {moduleEntry.moduleTitle}
              </option>
            ))}
          </select>
          <select
            className="rounded-md border border-black/15 px-2 py-2 text-sm"
            value={jobFilterLessonId}
            onChange={(event) => {
              setJobFilterLessonId(event.target.value);
              setJobFilterOffset(0);
            }}
          >
            <option value="">{selectedJobFilterModule ? "All lessons in module" : "All lessons"}</option>
            {(selectedJobFilterModule?.lessons ?? []).map((lesson) => (
              <option key={lesson.lessonId} value={lesson.lessonId}>
                {lesson.lessonTitle}
              </option>
            ))}
          </select>
          <select
            className="rounded-md border border-black/15 px-2 py-2 text-sm"
            value={jobFilterAssetType}
            onChange={(event) => {
              setJobFilterAssetType(event.target.value as AssetFilter);
              setJobFilterOffset(0);
            }}
          >
            <option value="all">All asset types</option>
            <option value="video">Video</option>
            <option value="animation">Animation</option>
            <option value="image">Image</option>
          </select>
          <select
            className="rounded-md border border-black/15 px-2 py-2 text-sm"
            value={jobFilterStatus}
            onChange={(event) => {
              setJobFilterStatus(event.target.value as StatusFilter);
              setJobFilterOffset(0);
            }}
          >
            <option value="all">All statuses</option>
            <option value="queued">Queued</option>
            <option value="running">Running</option>
            <option value="completed">Completed</option>
            <option value="failed">Failed</option>
            <option value="canceled">Canceled</option>
          </select>
          <label className="flex items-center gap-2 rounded-md border border-black/15 px-2 py-2 text-sm">
            <span className="text-xs text-zinc-600">Limit</span>
            <input
              type="number"
              min={1}
              max={200}
              value={jobFilterLimit}
              onChange={(event) => {
                setJobFilterLimit(Math.max(1, Math.min(200, Number(event.target.value) || 1)));
                setJobFilterOffset(0);
              }}
              className="w-20 rounded border border-black/15 px-2 py-1 text-xs"
            />
          </label>
          <label className="flex items-center gap-2 rounded-md border border-black/15 px-2 py-2 text-sm">
            <input
              type="checkbox"
              checked={jobRetryIncludeCanceled}
              onChange={(event) => setJobRetryIncludeCanceled(event.target.checked)}
            />
            Retry canceled too
          </label>
          <label className="flex items-center gap-2 rounded-md border border-black/15 px-2 py-2 text-sm">
            <span className="text-xs text-zinc-600">Stale min</span>
            <input
              type="number"
              min={5}
              max={10080}
              value={staleRequeueMinutes}
              onChange={(event) =>
                setStaleRequeueMinutes(Math.max(5, Math.min(10080, Number(event.target.value) || 5)))
              }
              className="w-20 rounded border border-black/15 px-2 py-1 text-xs"
            />
          </label>
          <label className="flex items-center gap-2 rounded-md border border-black/15 px-2 py-2 text-sm">
            <input
              type="checkbox"
              checked={jobAutoRefresh}
              onChange={(event) => setJobAutoRefresh(event.target.checked)}
            />
            Auto-refresh
          </label>
        </div>
        <p className="mt-2 text-xs text-zinc-600">
          {jobsLoading
            ? "Loading jobs..."
            : `Queued: ${queuedCount} | Running: ${runningCount} | Completed: ${completedCount} | Failed: ${failedCount} | Canceled: ${canceledCount} | Total shown: ${jobs.length} of ${jobsPagination.total}`}
          {jobsLastUpdatedAt ? ` | Updated: ${new Date(jobsLastUpdatedAt).toLocaleTimeString()}` : ""}
        </p>
        <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-zinc-600">
          <button
            type="button"
            className="rounded border border-black/15 px-2 py-1 hover:bg-black/5 disabled:opacity-60"
            onClick={handlePreviousPage}
            disabled={jobsLoading || jobsPagination.previousOffset === null}
          >
            Previous
          </button>
          <button
            type="button"
            className="rounded border border-black/15 px-2 py-1 hover:bg-black/5 disabled:opacity-60"
            onClick={handleNextPage}
            disabled={jobsLoading || !jobsPagination.hasMore || jobsPagination.nextOffset === null}
          >
            Next
          </button>
          <span>
            Showing {pageStart}-{pageEnd} of {jobsPagination.total}
          </span>
        </div>
        {status ? <p className="mt-2 text-sm text-indigo-700">{status}</p> : null}

        <div className="mt-4 space-y-3">
          {jobs.map((job) => (
            <article key={job.id} className="rounded-md border border-black/10 p-4">
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="rounded bg-zinc-100 px-2 py-1">{job.asset_type}</span>
                <span className="rounded bg-zinc-100 px-2 py-1">{job.provider}</span>
                <span className={`rounded px-2 py-1 ${statusBadgeClass(job.status)}`}>{job.status}</span>
              </div>
              <p className="mt-2 text-xs text-zinc-500">Job ID: {job.id}</p>
              <p className="mt-1 text-xs text-zinc-500">
                Module: {job.module_id ?? "n/a"} | Lesson: {job.lesson_id ?? "n/a"}
              </p>
              <p className="mt-2 text-sm text-zinc-800 line-clamp-3">{job.prompt}</p>
              {job.output_url ? (
                <a href={job.output_url} target="_blank" rel="noreferrer" className="mt-2 inline-block text-xs underline">
                  Open Output
                </a>
              ) : null}
              {job.error ? <p className="mt-2 text-xs text-red-700">{job.error}</p> : null}
              <div className="mt-3 flex flex-wrap gap-2">
                {(job.status === "failed" || job.status === "canceled") ? (
                  <button
                    className="rounded-md border border-indigo-300 bg-indigo-50 px-2 py-1 text-xs text-indigo-700 hover:bg-indigo-100 disabled:opacity-70"
                    onClick={() => void handleRetryJob(job.id)}
                    type="button"
                    disabled={retryingJobId === job.id}
                  >
                    {retryingJobId === job.id ? "Retrying..." : "Retry"}
                  </button>
                ) : null}
                <button
                  className="rounded-md border border-black/15 px-2 py-1 text-xs hover:bg-black/5"
                  onClick={() => void handleStatusUpdate(job.id, "running")}
                  type="button"
                >
                  Mark Running
                </button>
                <button
                  className="rounded-md border border-black/15 px-2 py-1 text-xs hover:bg-black/5"
                  onClick={() => void handleStatusUpdate(job.id, "completed")}
                  type="button"
                >
                  Mark Completed
                </button>
                <button
                  className="rounded-md border border-black/15 px-2 py-1 text-xs hover:bg-black/5"
                  onClick={() => void handleStatusUpdate(job.id, "failed")}
                  type="button"
                >
                  Mark Failed
                </button>
                <button
                  className="rounded-md border border-black/15 px-2 py-1 text-xs hover:bg-black/5"
                  onClick={() => void handleStatusUpdate(job.id, "canceled")}
                  type="button"
                >
                  Cancel
                </button>
              </div>
            </article>
          ))}
          {jobs.length === 0 ? <p className="text-sm text-zinc-500">No media jobs yet.</p> : null}
        </div>
      </section>
    </div>
  );
}
