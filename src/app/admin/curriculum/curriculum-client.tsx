"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

type CoverageRow = {
  gradeBand: string;
  subject: string;
  count: number;
};

type PlanRow = {
  gradeBand: string;
  subject: string;
  existingCount: number;
  targetCount: number;
  missingCount: number;
};

type QualityRow = {
  moduleId: string;
  title: string;
  subject: string;
  score: number;
  priority: string;
  issues: string[];
};

type CurriculumSummary = {
  generatedAt: string;
  reports: {
    coverageGeneratedAt: string | null;
    expansionGeneratedAt: string | null;
    qualityGeneratedAt: string | null;
    newestGeneratedAt: string | null;
    oldestGeneratedAt: string | null;
    staleAfterHours: number;
    stale: boolean;
  };
  coverage: {
    totalLessons: number;
    gradeSubjectSummary: CoverageRow[];
  };
  expansion: {
    targetPerSubjectPerGrade: number;
    targetRows: number;
    totalExisting: number;
    totalNeeded: number;
    totalUntracked: number;
    completionPercent: number;
    targets: PlanRow[];
    untrackedCoverage: Array<{ gradeBand: string; subject: string; count: number }>;
    missingByGradeBand: Array<{ gradeBand: string; missingCount: number }>;
    missingBySubject: Array<{ subject: string; missingCount: number }>;
  };
  quality: {
    modules: number;
    lessons: number;
    averageScore: number;
    highPriorityModules: number;
    mediumPriorityModules: number;
    lowPriorityModules: number;
    placeholderOptionCount: number;
    genericReflectionCount: number;
    topPriorityModules: QualityRow[];
  };
  examPrep: {
    targetTrackCount: number;
    availableTrackCount: number;
    completionPercent: number;
    totalModules: number;
    totalLessons: number;
    averageScore: number;
    missingTracks: string[];
    tracks: Array<{
      track: string;
      region: string;
      moduleId: string;
      title: string;
      lessonCount: number;
      score: number;
      priority: string;
    }>;
  };
};

type CurriculumSummaryResponse = CurriculumSummary & {
  error?: string;
};

type BacklogWorkstream = "curriculum" | "exam-prep" | "quality";
type BacklogPriority = "high" | "medium" | "low";

type BacklogItem = {
  workstream: BacklogWorkstream;
  itemType: "coverage_gap" | "exam_track_gap" | "module_remediation";
  priority: BacklogPriority;
  key: string;
  gradeBand: string;
  subject: string;
  moduleId: string;
  moduleTitle: string;
  track: string;
  region: string;
  missingCount: number | null;
  existingCount: number | null;
  targetCount: number | null;
  score: number | null;
  details: string;
};

type BacklogSummary = {
  total: number;
  byWorkstream: Record<BacklogWorkstream, number>;
  byPriority: Record<BacklogPriority, number>;
};

type BacklogResponse = {
  error?: string;
  totalItems?: number;
  returnedItems?: number;
  summary?: BacklogSummary;
  items?: BacklogItem[];
};

function titleCase(input: string) {
  return input
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function formatAgeFromIso(isoTimestamp: string | null) {
  if (!isoTimestamp) return "n/a";
  const timestamp = new Date(isoTimestamp);
  if (Number.isNaN(timestamp.getTime())) return "n/a";

  const diffMs = Date.now() - timestamp.getTime();
  if (diffMs < 0) return "<1m";
  const diffMinutes = Math.floor(diffMs / 60000);
  if (diffMinutes < 60) return `${diffMinutes}m`;
  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours < 24) return `${diffHours}h`;
  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays}d`;
}

export default function CurriculumClient({
  initialSummary,
  initialBacklogItems,
  initialBacklogSummary,
}: {
  initialSummary: CurriculumSummary;
  initialBacklogItems: BacklogItem[];
  initialBacklogSummary: BacklogSummary;
}) {
  const [summary, setSummary] = useState(initialSummary);
  const [summaryLoading, setSummaryLoading] = useState(false);
  const [summaryError, setSummaryError] = useState("");
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [summaryLastUpdatedAt, setSummaryLastUpdatedAt] = useState(initialSummary.generatedAt);
  const [backlogItems, setBacklogItems] = useState(initialBacklogItems);
  const [backlogSummary, setBacklogSummary] = useState(initialBacklogSummary);
  const [backlogLoading, setBacklogLoading] = useState(false);
  const [backlogError, setBacklogError] = useState("");
  const [backlogLastUpdatedAt, setBacklogLastUpdatedAt] = useState(initialSummary.generatedAt);
  const [backlogWorkstreamFilter, setBacklogWorkstreamFilter] = useState<"all" | BacklogWorkstream>("all");
  const [backlogPriorityFilter, setBacklogPriorityFilter] = useState<"all" | BacklogPriority>("all");

  const refreshBacklog = useCallback(async () => {
    setBacklogLoading(true);
    try {
      const response = await fetch("/api/admin/curriculum/backlog?format=json&limit=300", {
        method: "GET",
        cache: "no-store",
      });
      const payload = (await response.json().catch(() => ({}))) as BacklogResponse;
      if (!response.ok) {
        throw new Error(payload.error ?? "Failed to refresh curriculum backlog.");
      }
      setBacklogItems(Array.isArray(payload.items) ? payload.items : []);
      setBacklogSummary(
        payload.summary ?? {
          total: 0,
          byWorkstream: { curriculum: 0, "exam-prep": 0, quality: 0 },
          byPriority: { high: 0, medium: 0, low: 0 },
        },
      );
      setBacklogLastUpdatedAt(new Date().toISOString());
      setBacklogError("");
    } catch (error) {
      setBacklogError(error instanceof Error ? error.message : "Failed to refresh curriculum backlog.");
    } finally {
      setBacklogLoading(false);
    }
  }, []);

  const refreshSummary = useCallback(async () => {
    setSummaryLoading(true);
    try {
      const response = await fetch("/api/admin/curriculum/summary", {
        method: "GET",
        cache: "no-store",
      });
      const payload = (await response.json().catch(() => ({}))) as CurriculumSummaryResponse;
      if (!response.ok) {
        throw new Error(payload.error ?? "Failed to refresh curriculum summary.");
      }
      setSummary(payload);
      setSummaryLastUpdatedAt(payload.generatedAt);
      setSummaryError("");
      void refreshBacklog();
    } catch (error) {
      setSummaryError(
        error instanceof Error ? error.message : "Failed to refresh curriculum summary.",
      );
    } finally {
      setSummaryLoading(false);
    }
  }, [refreshBacklog]);

  useEffect(() => {
    if (!autoRefresh) return;
    const interval = window.setInterval(() => {
      void refreshSummary();
    }, 60000);

    return () => window.clearInterval(interval);
  }, [autoRefresh, refreshSummary]);

  const topGaps = useMemo(
    () => summary.expansion.targets.filter((row) => row.missingCount > 0).slice(0, 30),
    [summary.expansion.targets],
  );
  const topQualityIssues = useMemo(
    () => summary.quality.topPriorityModules.slice(0, 20),
    [summary.quality.topPriorityModules],
  );
  const topMissingGradeBands = useMemo(
    () => summary.expansion.missingByGradeBand.slice(0, 6),
    [summary.expansion.missingByGradeBand],
  );
  const topMissingSubjects = useMemo(
    () => summary.expansion.missingBySubject.slice(0, 8),
    [summary.expansion.missingBySubject],
  );
  const topExamTracks = useMemo(() => summary.examPrep.tracks.slice(0, 20), [summary.examPrep.tracks]);
  const filteredBacklogItems = useMemo(
    () =>
      backlogItems
        .filter(
          (item) =>
            (backlogWorkstreamFilter === "all" || item.workstream === backlogWorkstreamFilter) &&
            (backlogPriorityFilter === "all" || item.priority === backlogPriorityFilter),
        )
        .slice(0, 40),
    [backlogItems, backlogPriorityFilter, backlogWorkstreamFilter],
  );
  const backlogCsvHref = useMemo(() => {
    const params = new URLSearchParams();
    if (backlogWorkstreamFilter !== "all") {
      params.set("workstream", backlogWorkstreamFilter);
    }
    if (backlogPriorityFilter !== "all") {
      params.set("priority", backlogPriorityFilter);
    }
    params.set("limit", "1000");
    const query = params.toString();
    return query.length > 0 ? `/api/admin/curriculum/backlog?${query}` : "/api/admin/curriculum/backlog";
  }, [backlogPriorityFilter, backlogWorkstreamFilter]);

  const completionClass =
    summary.expansion.completionPercent >= 60
      ? "border-emerald-200 bg-emerald-50 text-emerald-800"
      : "border-amber-200 bg-amber-50 text-amber-800";
  const qualityClass =
    summary.quality.highPriorityModules === 0
      ? "border-emerald-200 bg-emerald-50 text-emerald-800"
      : "border-red-200 bg-red-50 text-red-800";
  const freshnessClass = summary.reports.stale
    ? "border-red-200 bg-red-50 text-red-800"
    : "border-emerald-200 bg-emerald-50 text-emerald-800";

  return (
    <div className="space-y-6">
      <section className="rounded-lg border border-black/10 bg-white p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold">Coverage Status</h2>
            <p className="mt-2 text-sm text-zinc-600">
              Remaining lessons to reach target coverage:{" "}
              <span className="font-semibold text-zinc-900">{summary.expansion.totalNeeded}</span>
            </p>
          </div>
          <div className="flex items-center gap-2">
            <label className="inline-flex items-center gap-2 rounded-md border border-black/15 px-3 py-1 text-xs">
              <input
                type="checkbox"
                checked={autoRefresh}
                onChange={(event) => setAutoRefresh(event.target.checked)}
              />
              Auto-refresh
            </label>
            <button
              type="button"
              className="rounded-md border border-black/15 px-3 py-1 text-sm hover:bg-black/5 disabled:opacity-70"
              onClick={() => void refreshSummary()}
              disabled={summaryLoading}
            >
              {summaryLoading ? "Refreshing..." : "Refresh"}
            </button>
          </div>
        </div>
        <p className="mt-2 text-xs text-zinc-600">
          {summaryLoading
            ? "Refreshing curriculum summary..."
            : summaryError
              ? summaryError
              : `Last updated ${new Date(summaryLastUpdatedAt).toLocaleTimeString()}`}
        </p>
        <div className="mt-4 flex flex-wrap gap-3 text-sm">
          <a
            className="rounded-md border border-black/15 px-3 py-2 hover:bg-black/5"
            href="/CURRICULUM-COVERAGE-REPORT.md"
            target="_blank"
            rel="noreferrer"
          >
            Open Coverage Report (MD)
          </a>
          <a
            className="rounded-md border border-black/15 px-3 py-2 hover:bg-black/5"
            href="/CURRICULUM-EXPANSION-PLAN.md"
            target="_blank"
            rel="noreferrer"
          >
            Open Expansion Plan (MD)
          </a>
          <a
            className="rounded-md border border-black/15 px-3 py-2 hover:bg-black/5"
            href="/CURRICULUM-QUALITY-REPORT.md"
            target="_blank"
            rel="noreferrer"
          >
            Open Quality Report (MD)
          </a>
          <a
            className="rounded-md border border-black/15 px-3 py-2 hover:bg-black/5"
            href="/EXAM-PREP-COVERAGE-REPORT.md"
            target="_blank"
            rel="noreferrer"
          >
            Open Exam Prep Report (MD)
          </a>
          <a
            className="rounded-md border border-black/15 px-3 py-2 hover:bg-black/5"
            href="/AI-RESEARCH-AGENT-PROMPTS.md"
            target="_blank"
            rel="noreferrer"
          >
            Open Research Prompt Pack
          </a>
          <a
            className="rounded-md border border-black/15 px-3 py-2 hover:bg-black/5"
            href={backlogCsvHref}
            target="_blank"
            rel="noreferrer"
          >
            Export Backlog (Filtered CSV)
          </a>
          <a
            className="rounded-md border border-black/15 px-3 py-2 hover:bg-black/5"
            href="/CURRICULUM-BACKLOG-REPORT.md"
            target="_blank"
            rel="noreferrer"
          >
            Open Backlog Report (MD)
          </a>
          <a
            className="rounded-md border border-black/15 px-3 py-2 hover:bg-black/5"
            href="/api/admin/curriculum/backlog?format=json&limit=1000"
            target="_blank"
            rel="noreferrer"
          >
            Open Backlog JSON
          </a>
        </div>
      </section>

      <section className="rounded-lg border border-black/10 bg-white p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold">Execution Backlog</h2>
            <p className="mt-1 text-xs text-zinc-600">
              {backlogLoading
                ? "Refreshing backlog..."
                : backlogError
                  ? backlogError
                  : `Last updated ${new Date(backlogLastUpdatedAt).toLocaleTimeString()}`}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <select
              value={backlogWorkstreamFilter}
              onChange={(event) =>
                setBacklogWorkstreamFilter(event.target.value as "all" | BacklogWorkstream)
              }
              className="rounded-md border border-black/15 px-2 py-1 text-sm"
            >
              <option value="all">All workstreams</option>
              <option value="curriculum">Curriculum</option>
              <option value="exam-prep">Exam Prep</option>
              <option value="quality">Quality</option>
            </select>
            <select
              value={backlogPriorityFilter}
              onChange={(event) =>
                setBacklogPriorityFilter(event.target.value as "all" | BacklogPriority)
              }
              className="rounded-md border border-black/15 px-2 py-1 text-sm"
            >
              <option value="all">All priorities</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
            <button
              type="button"
              className="rounded-md border border-black/15 px-3 py-1 text-sm hover:bg-black/5 disabled:opacity-70"
              onClick={() => void refreshBacklog()}
              disabled={backlogLoading}
            >
              {backlogLoading ? "Refreshing..." : "Refresh Backlog"}
            </button>
          </div>
        </div>
        <div className="mt-3 grid gap-3 md:grid-cols-5">
          <article className="rounded-md border border-black/10 bg-zinc-50 p-3">
            <p className="text-xs uppercase tracking-wide text-zinc-500">Total items</p>
            <p className="mt-1 text-2xl font-semibold text-zinc-900">{backlogSummary.total}</p>
          </article>
          <article className="rounded-md border border-red-200 bg-red-50 p-3 text-red-800">
            <p className="text-xs uppercase tracking-wide">High priority</p>
            <p className="mt-1 text-2xl font-semibold">{backlogSummary.byPriority.high}</p>
          </article>
          <article className="rounded-md border border-black/10 bg-zinc-50 p-3">
            <p className="text-xs uppercase tracking-wide text-zinc-500">Curriculum gaps</p>
            <p className="mt-1 text-2xl font-semibold text-zinc-900">
              {backlogSummary.byWorkstream.curriculum}
            </p>
          </article>
          <article className="rounded-md border border-black/10 bg-zinc-50 p-3">
            <p className="text-xs uppercase tracking-wide text-zinc-500">Exam-prep gaps</p>
            <p className="mt-1 text-2xl font-semibold text-zinc-900">
              {backlogSummary.byWorkstream["exam-prep"]}
            </p>
          </article>
          <article className="rounded-md border border-black/10 bg-zinc-50 p-3">
            <p className="text-xs uppercase tracking-wide text-zinc-500">Quality fixes</p>
            <p className="mt-1 text-2xl font-semibold text-zinc-900">
              {backlogSummary.byWorkstream.quality}
            </p>
          </article>
        </div>
        <p className="mt-2 text-xs text-zinc-600">
          Showing {filteredBacklogItems.length} of {backlogSummary.total} items for current filters.
        </p>
        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-black/10 text-left">
                <th className="p-2">Workstream</th>
                <th className="p-2">Type</th>
                <th className="p-2">Priority</th>
                <th className="p-2">Key</th>
                <th className="p-2">Gap/Score</th>
                <th className="p-2">Details</th>
              </tr>
            </thead>
            <tbody>
              {filteredBacklogItems.map((item) => (
                <tr key={`${item.workstream}-${item.itemType}-${item.key}`} className="border-b border-black/5">
                  <td className="p-2">{titleCase(item.workstream)}</td>
                  <td className="p-2">{titleCase(item.itemType)}</td>
                  <td className="p-2 uppercase">{item.priority}</td>
                  <td className="p-2">{item.key}</td>
                  <td className="p-2">
                    {item.missingCount !== null
                      ? `${item.missingCount}${item.targetCount !== null ? ` / ${item.targetCount}` : ""}`
                      : item.score !== null
                        ? `${item.score}`
                        : "n/a"}
                  </td>
                  <td className="p-2 text-zinc-600">{item.details}</td>
                </tr>
              ))}
              {filteredBacklogItems.length === 0 ? (
                <tr>
                  <td className="p-2 text-zinc-500" colSpan={6}>
                    No backlog items for this filter.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </section>

      <section className="rounded-lg border border-black/10 bg-white p-5">
        <h2 className="text-lg font-semibold">Program Health</h2>
        <div className="mt-3 grid gap-3 md:grid-cols-3 lg:grid-cols-7">
          <article className="rounded-md border border-black/10 bg-zinc-50 p-3">
            <p className="text-xs uppercase tracking-wide text-zinc-500">Lessons tracked</p>
            <p className="mt-1 text-2xl font-semibold text-zinc-900">{summary.coverage.totalLessons}</p>
          </article>
          <article className={`rounded-md border p-3 ${completionClass}`}>
            <p className="text-xs uppercase tracking-wide">Coverage completion</p>
            <p className="mt-1 text-2xl font-semibold">{summary.expansion.completionPercent}%</p>
            <p className="text-xs">
              existing {summary.expansion.totalExisting} / needed {summary.expansion.totalNeeded}
            </p>
          </article>
          <article className={`rounded-md border p-3 ${qualityClass}`}>
            <p className="text-xs uppercase tracking-wide">High-priority modules</p>
            <p className="mt-1 text-2xl font-semibold">{summary.quality.highPriorityModules}</p>
            <p className="text-xs">avg score {summary.quality.averageScore}</p>
          </article>
          <article className="rounded-md border border-black/10 bg-zinc-50 p-3">
            <p className="text-xs uppercase tracking-wide text-zinc-500">Placeholder options</p>
            <p className="mt-1 text-2xl font-semibold text-zinc-900">
              {summary.quality.placeholderOptionCount}
            </p>
          </article>
          <article className="rounded-md border border-black/10 bg-zinc-50 p-3">
            <p className="text-xs uppercase tracking-wide text-zinc-500">Generic prompts</p>
            <p className="mt-1 text-2xl font-semibold text-zinc-900">
              {summary.quality.genericReflectionCount}
            </p>
          </article>
          <article className="rounded-md border border-black/10 bg-zinc-50 p-3">
            <p className="text-xs uppercase tracking-wide text-zinc-500">Outside matrix</p>
            <p className="mt-1 text-2xl font-semibold text-zinc-900">
              {summary.expansion.totalUntracked}
            </p>
            <p className="text-xs text-zinc-600">Lessons not counted in target grid</p>
          </article>
          <article className={`rounded-md border p-3 ${freshnessClass}`}>
            <p className="text-xs uppercase tracking-wide">Report freshness</p>
            <p className="mt-1 text-2xl font-semibold">{summary.reports.stale ? "STALE" : "FRESH"}</p>
            <p className="text-xs">
              newest {formatAgeFromIso(summary.reports.newestGeneratedAt)} ago
            </p>
          </article>
        </div>
        <p className="mt-2 text-xs text-zinc-600">
          Reports become stale after {summary.reports.staleAfterHours}h. Oldest artifact age:{" "}
          {formatAgeFromIso(summary.reports.oldestGeneratedAt)}.
        </p>
      </section>

      <section className="rounded-lg border border-black/10 bg-white p-5">
        <h2 className="text-lg font-semibold">Exam Prep Readiness</h2>
        <div className="mt-3 grid gap-3 md:grid-cols-5">
          <article className="rounded-md border border-black/10 bg-zinc-50 p-3">
            <p className="text-xs uppercase tracking-wide text-zinc-500">Track coverage</p>
            <p className="mt-1 text-2xl font-semibold text-zinc-900">
              {summary.examPrep.availableTrackCount}/{summary.examPrep.targetTrackCount}
            </p>
            <p className="text-xs text-zinc-600">{summary.examPrep.completionPercent}% of target tracks</p>
          </article>
          <article className="rounded-md border border-black/10 bg-zinc-50 p-3">
            <p className="text-xs uppercase tracking-wide text-zinc-500">Exam modules</p>
            <p className="mt-1 text-2xl font-semibold text-zinc-900">{summary.examPrep.totalModules}</p>
          </article>
          <article className="rounded-md border border-black/10 bg-zinc-50 p-3">
            <p className="text-xs uppercase tracking-wide text-zinc-500">Exam lessons</p>
            <p className="mt-1 text-2xl font-semibold text-zinc-900">{summary.examPrep.totalLessons}</p>
          </article>
          <article className="rounded-md border border-black/10 bg-zinc-50 p-3">
            <p className="text-xs uppercase tracking-wide text-zinc-500">Average score</p>
            <p className="mt-1 text-2xl font-semibold text-zinc-900">{summary.examPrep.averageScore}</p>
          </article>
          <article className="rounded-md border border-black/10 bg-zinc-50 p-3">
            <p className="text-xs uppercase tracking-wide text-zinc-500">Missing tracks</p>
            <p className="mt-1 text-lg font-semibold text-zinc-900">
              {summary.examPrep.missingTracks.length > 0
                ? summary.examPrep.missingTracks.join(", ")
                : "None"}
            </p>
          </article>
        </div>
        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-black/10 text-left">
                <th className="p-2">Track</th>
                <th className="p-2">Region</th>
                <th className="p-2">Module</th>
                <th className="p-2">Lessons</th>
                <th className="p-2">Score</th>
                <th className="p-2">Priority</th>
              </tr>
            </thead>
            <tbody>
              {topExamTracks.map((row) => (
                <tr key={row.moduleId} className="border-b border-black/5">
                  <td className="p-2 font-medium">{row.track}</td>
                  <td className="p-2">{row.region}</td>
                  <td className="p-2">{row.title}</td>
                  <td className="p-2">{row.lessonCount}</td>
                  <td className="p-2">{row.score}</td>
                  <td className="p-2 uppercase">{row.priority}</td>
                </tr>
              ))}
              {topExamTracks.length === 0 ? (
                <tr>
                  <td className="p-2 text-zinc-500" colSpan={6}>
                    No exam-prep modules detected yet.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </section>

      {summary.expansion.untrackedCoverage.length > 0 ? (
        <section className="rounded-lg border border-black/10 bg-white p-5">
          <h2 className="text-lg font-semibold">Coverage Outside Target Matrix</h2>
          <p className="mt-2 text-sm text-zinc-600">
            These lessons exist but are not counted in the current grade+subject planning grid.
          </p>
          <div className="mt-4 overflow-x-auto">
            <table className="min-w-full border-collapse text-sm">
              <thead>
                <tr className="border-b border-black/10 text-left">
                  <th className="p-2">Grade Band</th>
                  <th className="p-2">Subject</th>
                  <th className="p-2">Lessons</th>
                </tr>
              </thead>
              <tbody>
                {summary.expansion.untrackedCoverage.map((row) => (
                  <tr key={`${row.gradeBand}-${row.subject}`} className="border-b border-black/5">
                    <td className="p-2">{titleCase(row.gradeBand)}</td>
                    <td className="p-2">{titleCase(row.subject)}</td>
                    <td className="p-2 font-medium">{row.count}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ) : null}

      <section className="rounded-lg border border-black/10 bg-white p-5">
        <h2 className="text-lg font-semibold">Largest Missing Coverage Areas</h2>
        <div className="mt-3 grid gap-3 md:grid-cols-2">
          <div className="rounded-md border border-black/10 p-3">
            <p className="text-sm font-semibold">By Grade Band</p>
            <div className="mt-2 grid gap-2">
              {topMissingGradeBands.map((entry) => (
                <div key={entry.gradeBand} className="flex items-center justify-between text-sm">
                  <span>{titleCase(entry.gradeBand)}</span>
                  <span className="font-semibold text-amber-700">{entry.missingCount}</span>
                </div>
              ))}
              {topMissingGradeBands.length === 0 ? (
                <p className="text-xs text-zinc-500">No missing coverage detected.</p>
              ) : null}
            </div>
          </div>
          <div className="rounded-md border border-black/10 p-3">
            <p className="text-sm font-semibold">By Subject</p>
            <div className="mt-2 grid gap-2">
              {topMissingSubjects.map((entry) => (
                <div key={entry.subject} className="flex items-center justify-between text-sm">
                  <span>{titleCase(entry.subject)}</span>
                  <span className="font-semibold text-amber-700">{entry.missingCount}</span>
                </div>
              ))}
              {topMissingSubjects.length === 0 ? (
                <p className="text-xs text-zinc-500">No missing coverage detected.</p>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-lg border border-black/10 bg-white p-5">
        <h2 className="text-lg font-semibold">Content Quality and Placeholder Risk</h2>
        <div className="mt-3 grid gap-3 text-sm md:grid-cols-5">
          <div className="rounded-md border border-black/10 p-3">
            <p className="text-zinc-500">Modules scanned</p>
            <p className="mt-1 text-xl font-semibold">{summary.quality.modules}</p>
          </div>
          <div className="rounded-md border border-black/10 p-3">
            <p className="text-zinc-500">Average score</p>
            <p className="mt-1 text-xl font-semibold">{summary.quality.averageScore}</p>
          </div>
          <div className="rounded-md border border-black/10 p-3">
            <p className="text-zinc-500">High priority modules</p>
            <p className="mt-1 text-xl font-semibold text-red-700">
              {summary.quality.highPriorityModules}
            </p>
          </div>
          <div className="rounded-md border border-black/10 p-3">
            <p className="text-zinc-500">Placeholder options</p>
            <p className="mt-1 text-xl font-semibold text-amber-700">
              {summary.quality.placeholderOptionCount}
            </p>
          </div>
          <div className="rounded-md border border-black/10 p-3">
            <p className="text-zinc-500">Generic prompts</p>
            <p className="mt-1 text-xl font-semibold text-amber-700">
              {summary.quality.genericReflectionCount}
            </p>
          </div>
        </div>
        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-black/10 text-left">
                <th className="p-2">Priority</th>
                <th className="p-2">Module</th>
                <th className="p-2">Subject</th>
                <th className="p-2">Score</th>
                <th className="p-2">Top Issue</th>
              </tr>
            </thead>
            <tbody>
              {topQualityIssues.map((row) => (
                <tr key={row.moduleId} className="border-b border-black/5">
                  <td className="p-2 font-medium uppercase">{row.priority}</td>
                  <td className="p-2">{row.title}</td>
                  <td className="p-2">{row.subject}</td>
                  <td className="p-2">{row.score}</td>
                  <td className="p-2 text-zinc-600">{row.issues[0] ?? "No issue"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="rounded-lg border border-black/10 bg-white p-5">
        <h2 className="text-lg font-semibold">Current Grade x Subject Counts</h2>
        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-black/10 text-left">
                <th className="p-2">Grade Band</th>
                <th className="p-2">Subject</th>
                <th className="p-2">Lessons</th>
              </tr>
            </thead>
            <tbody>
              {summary.coverage.gradeSubjectSummary.map((row) => (
                <tr key={`${row.gradeBand}-${row.subject}`} className="border-b border-black/5">
                  <td className="p-2">{titleCase(row.gradeBand)}</td>
                  <td className="p-2">{titleCase(row.subject)}</td>
                  <td className="p-2 font-medium">{row.count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="rounded-lg border border-black/10 bg-white p-5">
        <h2 className="text-lg font-semibold">Top Curriculum Gaps</h2>
        <p className="mt-2 text-sm text-zinc-600">
          Ranked by missing lessons vs target ({summary.expansion.targetPerSubjectPerGrade} per
          grade+subject).
        </p>
        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-black/10 text-left">
                <th className="p-2">Grade Band</th>
                <th className="p-2">Subject</th>
                <th className="p-2">Existing</th>
                <th className="p-2">Target</th>
                <th className="p-2">Missing</th>
              </tr>
            </thead>
            <tbody>
              {topGaps.map((row) => (
                <tr key={`${row.gradeBand}-${row.subject}`} className="border-b border-black/5">
                  <td className="p-2">{titleCase(row.gradeBand)}</td>
                  <td className="p-2">{titleCase(row.subject)}</td>
                  <td className="p-2">{row.existingCount}</td>
                  <td className="p-2">{row.targetCount}</td>
                  <td className="p-2 font-semibold text-amber-700">{row.missingCount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
