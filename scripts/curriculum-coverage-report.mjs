import fs from "node:fs";
import path from "node:path";

const lessonsDir = path.resolve("src/lib/data/lessons");
const outDir = path.resolve("public");
const outMarkdown = path.join(outDir, "CURRICULUM-COVERAGE-REPORT.md");
const outJson = path.join(outDir, "CURRICULUM-COVERAGE-REPORT.json");

function readLessonFiles() {
  if (!fs.existsSync(lessonsDir)) return [];
  return fs
    .readdirSync(lessonsDir)
    .filter((name) => name.endsWith(".json"))
    .map((name) => ({
      fileName: name,
      fullPath: path.join(lessonsDir, name),
    }));
}

function parseFromFilename(fileName) {
  const base = fileName.replace(/\.json$/i, "");
  const parts = base.split("-");
  if (parts.length < 3) {
    return { gradeBand: "unknown", subject: "unknown", lessonSlug: base };
  }

  let gradeBand = parts[0];
  let subjectStartIndex = 1;
  if (parts[0] === "pre" && parts[1] === "k") {
    gradeBand = "pre-k";
    subjectStartIndex = 2;
  }

  const subject = parts[subjectStartIndex] ?? "unknown";
  const lessonSlug = parts.slice(subjectStartIndex + 1).join("-");
  return { gradeBand, subject, lessonSlug };
}

function titleCase(input) {
  return input
    .replace(/[_-]+/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function generateCoverage() {
  const files = readLessonFiles();
  const rows = [];
  const coverage = new Map();

  for (const file of files) {
    const parsed = parseFromFilename(file.fileName);
    const key = `${parsed.gradeBand}::${parsed.subject}`;
    const current = coverage.get(key) ?? {
      gradeBand: parsed.gradeBand,
      subject: parsed.subject,
      count: 0,
      files: [],
    };
    current.count += 1;
    current.files.push(file.fileName);
    coverage.set(key, current);

    rows.push({
      fileName: file.fileName,
      gradeBand: parsed.gradeBand,
      subject: parsed.subject,
      lessonSlug: parsed.lessonSlug,
    });
  }

  const summary = Array.from(coverage.values()).sort((a, b) => {
    if (a.gradeBand !== b.gradeBand) return a.gradeBand.localeCompare(b.gradeBand);
    return a.subject.localeCompare(b.subject);
  });

  return {
    generatedAt: new Date().toISOString(),
    totalLessons: rows.length,
    gradeSubjectSummary: summary,
    lessons: rows.sort((a, b) => a.fileName.localeCompare(b.fileName)),
  };
}

function toMarkdown(report) {
  const lines = [];
  lines.push("# Curriculum Coverage Report");
  lines.push("");
  lines.push(`Generated: ${report.generatedAt}`);
  lines.push("");
  lines.push(`Total lessons: ${report.totalLessons}`);
  lines.push("");
  lines.push("## Grade x Subject Coverage");
  lines.push("");
  lines.push("| Grade Band | Subject | Lesson Count |");
  lines.push("|---|---|---:|");
  for (const item of report.gradeSubjectSummary) {
    lines.push(
      `| ${titleCase(item.gradeBand)} | ${titleCase(item.subject)} | ${item.count} |`,
    );
  }
  lines.push("");
  lines.push("## Next Expansion Targets");
  lines.push("");
  lines.push("- Add at least 10 lessons for each subject per grade band.");
  lines.push("- Prioritize coverage gaps for middle-school and high-school pathways.");
  lines.push("- Add SAT/ACT and international exam tracks as separate module families.");
  lines.push("");
  return lines.join("\n");
}

function main() {
  const report = generateCoverage();
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(outJson, JSON.stringify(report, null, 2));
  fs.writeFileSync(outMarkdown, toMarkdown(report));
  console.log(`Wrote ${outJson}`);
  console.log(`Wrote ${outMarkdown}`);
}

main();
