import fs from "node:fs";
import path from "node:path";

const reportPath = path.resolve("public/CURRICULUM-COVERAGE-REPORT.json");
const outJson = path.resolve("public/CURRICULUM-EXPANSION-PLAN.json");
const outMd = path.resolve("public/CURRICULUM-EXPANSION-PLAN.md");

const targetPerSubjectPerGrade = 10;

const gradeBands = ["pre-k", "elementary", "middle-school", "high-school"];
const subjects = [
  "language-arts",
  "basic-math",
  "advanced-math",
  "general-science",
  "biology",
  "chemistry",
  "physics",
  "social-studies-us",
  "social-studies-world",
  "world-history",
  "arts",
  "coding",
  "financial-literacy",
  "household-management",
  "farming",
  "astronomy",
  "geography",
  "general-relativity",
];

function toTitle(input) {
  return input
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function loadCoverage() {
  if (!fs.existsSync(reportPath)) {
    throw new Error(
      "Missing public/CURRICULUM-COVERAGE-REPORT.json. Run `npm run curriculum:report` first.",
    );
  }
  return JSON.parse(fs.readFileSync(reportPath, "utf8"));
}

function buildPlan(report) {
  const existing = new Map();
  for (const row of report.gradeSubjectSummary ?? []) {
    const grade = String(row.gradeBand ?? "").toLowerCase();
    const subject = String(row.subject ?? "").toLowerCase();
    existing.set(`${grade}::${subject}`, Number(row.count ?? 0));
  }

  const targets = [];
  let totalExisting = 0;
  let totalNeeded = 0;

  for (const gradeBand of gradeBands) {
    for (const subject of subjects) {
      const key = `${gradeBand}::${subject}`;
      const existingCount = existing.get(key) ?? 0;
      const missingCount = Math.max(0, targetPerSubjectPerGrade - existingCount);
      totalExisting += existingCount;
      totalNeeded += missingCount;
      targets.push({
        gradeBand,
        subject,
        existingCount,
        targetCount: targetPerSubjectPerGrade,
        missingCount,
      });
    }
  }

  targets.sort((a, b) => b.missingCount - a.missingCount || a.gradeBand.localeCompare(b.gradeBand));
  return {
    generatedAt: new Date().toISOString(),
    targetPerSubjectPerGrade,
    totals: {
      targetRows: gradeBands.length * subjects.length,
      totalExisting,
      totalNeeded,
    },
    targets,
  };
}

function renderMarkdown(plan) {
  const lines = [];
  lines.push("# Curriculum Expansion Plan");
  lines.push("");
  lines.push(`Generated: ${plan.generatedAt}`);
  lines.push(`Target lessons per grade+subject: ${plan.targetPerSubjectPerGrade}`);
  lines.push("");
  lines.push(`Current lessons counted across targets: ${plan.totals.totalExisting}`);
  lines.push(`Lessons still needed to hit target: ${plan.totals.totalNeeded}`);
  lines.push("");
  lines.push("## Priority Gaps");
  lines.push("");
  lines.push("| Grade Band | Subject | Existing | Target | Missing |");
  lines.push("|---|---|---:|---:|---:|");
  for (const row of plan.targets) {
    if (row.missingCount <= 0) continue;
    lines.push(
      `| ${toTitle(row.gradeBand)} | ${toTitle(row.subject)} | ${row.existingCount} | ${row.targetCount} | ${row.missingCount} |`,
    );
  }
  lines.push("");
  lines.push("## Execution Notes");
  lines.push("");
  lines.push("- Generate lessons in batches by grade band to simplify QA.");
  lines.push("- Prioritize language arts + math + science first for strongest core coverage.");
  lines.push("- Keep lesson JSON schema consistent for automated module ingestion.");
  lines.push("- Add media generation prompts per lesson and track asset readiness status.");
  lines.push("");
  return lines.join("\n");
}

function main() {
  const coverage = loadCoverage();
  const plan = buildPlan(coverage);
  fs.writeFileSync(outJson, JSON.stringify(plan, null, 2));
  fs.writeFileSync(outMd, renderMarkdown(plan));
  console.log(`Wrote ${outJson}`);
  console.log(`Wrote ${outMd}`);
}

main();
