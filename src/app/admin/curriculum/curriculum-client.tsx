"use client";

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

function titleCase(input: string) {
  return input
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export default function CurriculumClient({
  summary,
  planRows,
  totalNeeded,
}: {
  summary: CoverageRow[];
  planRows: PlanRow[];
  totalNeeded: number;
}) {
  const topGaps = planRows.filter((row) => row.missingCount > 0).slice(0, 30);

  return (
    <div className="space-y-6">
      <section className="rounded-lg border border-black/10 bg-white p-5">
        <h2 className="text-lg font-semibold">Coverage Status</h2>
        <p className="mt-2 text-sm text-zinc-600">
          Remaining lessons to reach target coverage: <span className="font-semibold text-zinc-900">{totalNeeded}</span>
        </p>
        <div className="mt-4 flex flex-wrap gap-3 text-sm">
          <a className="rounded-md border border-black/15 px-3 py-2 hover:bg-black/5" href="/CURRICULUM-COVERAGE-REPORT.md" target="_blank" rel="noreferrer">
            Open Coverage Report (MD)
          </a>
          <a className="rounded-md border border-black/15 px-3 py-2 hover:bg-black/5" href="/CURRICULUM-EXPANSION-PLAN.md" target="_blank" rel="noreferrer">
            Open Expansion Plan (MD)
          </a>
          <a className="rounded-md border border-black/15 px-3 py-2 hover:bg-black/5" href="/AI-RESEARCH-AGENT-PROMPTS.md" target="_blank" rel="noreferrer">
            Open Research Prompt Pack
          </a>
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
              {summary.map((row) => (
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
          Ranked by missing lessons vs target (10 per grade+subject by default).
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
