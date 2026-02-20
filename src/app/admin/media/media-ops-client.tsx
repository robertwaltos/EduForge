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

export default function MediaOpsClient({ initialJobs }: { initialJobs: MediaJob[] }) {
  const [jobs, setJobs] = useState(initialJobs);
  const [status, setStatus] = useState("");
  const [promptModules, setPromptModules] = useState<PromptModule[]>([]);
  const [packLoading, setPackLoading] = useState(false);
  const [packModuleId, setPackModuleId] = useState("");
  const [packLessonId, setPackLessonId] = useState("");
  const [packAssetType, setPackAssetType] = useState<MediaJob["asset_type"]>("video");
  const [packQueueLimit, setPackQueueLimit] = useState(50);

  const queuedCount = useMemo(() => jobs.filter((job) => job.status === "queued").length, [jobs]);
  const runningCount = useMemo(() => jobs.filter((job) => job.status === "running").length, [jobs]);
  const selectedPromptModule = useMemo(
    () => promptModules.find((entry) => entry.moduleId === packModuleId) ?? null,
    [packModuleId, promptModules],
  );
  const selectedPromptLesson = useMemo(
    () => selectedPromptModule?.lessons.find((entry) => entry.lessonId === packLessonId) ?? null,
    [packLessonId, selectedPromptModule],
  );

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

  const refreshJobs = async () => {
    const response = await fetch("/api/admin/media/jobs", { method: "GET" });
    const payload = (await response.json().catch(() => ({}))) as { jobs?: MediaJob[]; error?: string };
    if (!response.ok) {
      throw new Error(payload.error ?? "Failed to load jobs.");
    }
    setJobs(payload.jobs ?? []);
  };

  const handleRunQueue = async () => {
    try {
      const result = (await postJson("/api/admin/media/jobs/run", { batchSize: 10 })) as {
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
              className="rounded-md bg-indigo-600 px-3 py-1 text-sm text-white hover:bg-indigo-500"
              onClick={() => void handleRunQueue()}
            >
              Process Queue
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
        <p className="mt-2 text-xs text-zinc-600">
          Queued: {queuedCount} | Running: {runningCount} | Total: {jobs.length}
        </p>
        {status ? <p className="mt-2 text-sm text-indigo-700">{status}</p> : null}

        <div className="mt-4 space-y-3">
          {jobs.map((job) => (
            <article key={job.id} className="rounded-md border border-black/10 p-4">
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="rounded bg-zinc-100 px-2 py-1">{job.asset_type}</span>
                <span className="rounded bg-zinc-100 px-2 py-1">{job.provider}</span>
                <span className="rounded bg-indigo-100 px-2 py-1 text-indigo-800">{job.status}</span>
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
