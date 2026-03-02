#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const catalogDir = path.resolve("src/lib/modules/catalog");
const files = fs
  .readdirSync(catalogDir)
  .filter((name) => /^capstone-.*-(501|601)\.ts$/.test(name));

const violations = [];
let modulesScanned = 0;

const summary = {
  hasSimulation: 0,
  hasDefenseQuiz: 0,
  hasDefensePanel: 0,
  hasDebateActivity: 0,
  hasDataAnalysis: 0,
  hasArtifact: 0,
  hasRubric: 0,
};

function parseModuleFile(filePath) {
  const text = fs.readFileSync(filePath, "utf8");
  const match = text.match(/export const\s+\w+\s*:\s*LearningModule\s*=\s*(\{[\s\S]*\})\s*;\s*$/);
  if (!match) return null;
  return JSON.parse(match[1]);
}

function collectStringValues(value) {
  if (typeof value === "string") return [value];
  if (Array.isArray(value)) return value.flatMap((entry) => collectStringValues(entry));
  if (value && typeof value === "object") {
    return Object.values(value).flatMap((entry) => collectStringValues(entry));
  }
  return [];
}

function pushViolation(file, reason) {
  violations.push({ file, reason });
}

for (const file of files) {
  const fullPath = path.join(catalogDir, file);
  let moduleData;

  try {
    moduleData = parseModuleFile(fullPath);
  } catch (error) {
    pushViolation(
      file,
      `Failed to parse JSON payload: ${error instanceof Error ? error.message : String(error)}`,
    );
    continue;
  }

  if (!moduleData) {
    pushViolation(file, "Could not locate exported module payload.");
    continue;
  }

  modulesScanned += 1;

  const lessons = Array.isArray(moduleData.lessons) ? moduleData.lessons : [];
  const textBlob = collectStringValues(moduleData).join(" ").toLowerCase();

  const hasSimulation = lessons.some(
    (lesson) =>
      lesson?.type === "interactive" &&
      /simulation/.test(`${lesson.title ?? ""} ${(lesson.chunks ?? []).map((c) => c?.title ?? "").join(" ")}`.toLowerCase()),
  );
  const hasDefenseQuiz = lessons.some(
    (lesson) => lesson?.type === "quiz" && /defense/.test(String(lesson?.title ?? "").toLowerCase()),
  );
  const hasDefensePanel = lessons.some((lesson) =>
    /defense panel/.test(String(lesson?.title ?? "").toLowerCase()),
  );
  const hasDebateActivity = lessons.some((lesson) =>
    Array.isArray(lesson?.interactiveActivities)
      ? lesson.interactiveActivities.some((activity) =>
          /debate/.test(
            `${activity?.type ?? ""} ${activity?.title ?? ""} ${activity?.description ?? ""}`.toLowerCase(),
          ),
        )
      : false,
  );
  const hasDataAnalysis = /data[- ]analysis/.test(textBlob);
  const hasArtifact = /\bartifact(s)?\b/.test(textBlob);
  const hasRubric = /\brubric\b/.test(textBlob);

  if (hasSimulation) summary.hasSimulation += 1;
  if (hasDefenseQuiz) summary.hasDefenseQuiz += 1;
  if (hasDefensePanel) summary.hasDefensePanel += 1;
  if (hasDebateActivity) summary.hasDebateActivity += 1;
  if (hasDataAnalysis) summary.hasDataAnalysis += 1;
  if (hasArtifact) summary.hasArtifact += 1;
  if (hasRubric) summary.hasRubric += 1;

  if (!hasSimulation) {
    pushViolation(file, "Missing simulation lesson/chunk marker in interactive capstone flow.");
  }
  if (!hasDefenseQuiz) {
    pushViolation(file, "Missing defense-oriented quiz checkpoint.");
  }
  if (!hasDefensePanel) {
    pushViolation(file, "Missing capstone defense panel lesson.");
  }
  if (!hasDebateActivity) {
    pushViolation(file, "Missing debate activity marker (debate_simulator equivalent).");
  }
  if (!hasDataAnalysis) {
    pushViolation(file, "Missing explicit data analysis requirement.");
  }
  if (!hasArtifact) {
    pushViolation(file, "Missing explicit implementation artifact requirement.");
  }
  if (!hasRubric) {
    pushViolation(file, "Missing explicit rubric-based defense requirement.");
  }
}

console.log("Capstone Defense Alignment Audit");
console.log("-------------------------------");
console.log(`Capstone modules scanned: ${modulesScanned}`);
console.log(`Simulation marker coverage: ${summary.hasSimulation}/${modulesScanned}`);
console.log(`Defense quiz coverage: ${summary.hasDefenseQuiz}/${modulesScanned}`);
console.log(`Defense panel coverage: ${summary.hasDefensePanel}/${modulesScanned}`);
console.log(`Debate activity coverage: ${summary.hasDebateActivity}/${modulesScanned}`);
console.log(`Data analysis coverage: ${summary.hasDataAnalysis}/${modulesScanned}`);
console.log(`Artifact coverage: ${summary.hasArtifact}/${modulesScanned}`);
console.log(`Rubric coverage: ${summary.hasRubric}/${modulesScanned}`);

if (violations.length > 0) {
  console.error(`\nViolations detected: ${violations.length}`);
  for (const violation of violations.slice(0, 80)) {
    console.error(`- ${violation.file}: ${violation.reason}`);
  }
  if (violations.length > 80) {
    console.error(`... ${violations.length - 80} more violations omitted`);
  }
  process.exit(1);
}

console.log("\nAll capstone modules satisfy defense alignment requirements.");
