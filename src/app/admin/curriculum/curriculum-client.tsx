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
};

type CurriculumSummaryResponse = CurriculumSummary & {
  error?: string;
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
}: {
  initialSummary: CurriculumSummary;
}) {
  const [summary, setSummary] = useState(initialSummary);
  const [summaryLoading, setSummaryLoading] = useState(false);
  const [summaryError, setSummaryError] = useState("");
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [summaryLastUpdatedAt, setSummaryLastUpdatedAt] = useState(initialSummary.generatedAt);

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
    } catch (error) {
      setSummaryError(
        error instanceof Error ? error.message : "Failed to refresh curriculum summary.",
      );
    } finally {
      setSummaryLoading(false);
    }
  }, []);

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
            href="/AI-RESEARCH-AGENT-PROMPTS.md"
            target="_blank"
            rel="noreferrer"
          >
            Open Research Prompt Pack
          </a>
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
