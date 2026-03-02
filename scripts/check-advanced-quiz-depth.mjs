#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const catalogDir = path.resolve("src/lib/modules/catalog");
const files = fs.readdirSync(catalogDir).filter((name) => /-(501|601)\.ts$/.test(name));

const violations = [];
let modulesScanned = 0;
let quizzesScanned = 0;
let questionsTotal = 0;
let minQuestions = Number.POSITIVE_INFINITY;
let maxQuestions = 0;

function parseModuleFile(filePath) {
  const text = fs.readFileSync(filePath, "utf8");
  const match = text.match(/export const\s+\w+\s*:\s*LearningModule\s*=\s*(\{[\s\S]*\})\s*;\s*$/);
  if (!match) return null;
  return JSON.parse(match[1]);
}

for (const file of files) {
  const fullPath = path.join(catalogDir, file);
  let moduleData;

  try {
    moduleData = parseModuleFile(fullPath);
  } catch (error) {
    violations.push({
      file,
      reason: `Failed to parse JSON payload: ${error instanceof Error ? error.message : String(error)}`,
    });
    continue;
  }

  if (!moduleData) {
    violations.push({ file, reason: "Could not locate exported module payload." });
    continue;
  }

  modulesScanned += 1;
  const quizzes = (moduleData.lessons ?? []).filter(
    (lesson) => lesson?.type === "quiz" && Array.isArray(lesson.questions),
  );

  if (quizzes.length < 2) {
    violations.push({
      file,
      reason: `Expected at least 2 quiz lessons in advanced module, found ${quizzes.length}.`,
    });
  }

  for (const quiz of quizzes) {
    const count = quiz.questions.length;
    quizzesScanned += 1;
    questionsTotal += count;
    minQuestions = Math.min(minQuestions, count);
    maxQuestions = Math.max(maxQuestions, count);

    if (count < 8) {
      violations.push({
        file,
        reason: `Quiz ${quiz.id ?? "(unknown-id)"} has ${count} questions; expected at least 8.`,
      });
    }
  }
}

const avgQuestions = quizzesScanned > 0 ? (questionsTotal / quizzesScanned).toFixed(2) : "0.00";
if (!Number.isFinite(minQuestions)) minQuestions = 0;

console.log("Advanced Quiz Depth Audit");
console.log("-------------------------");
console.log(`Modules scanned: ${modulesScanned}`);
console.log(`Quizzes scanned: ${quizzesScanned}`);
console.log(`Questions total: ${questionsTotal}`);
console.log(`Questions per quiz (min/avg/max): ${minQuestions}/${avgQuestions}/${maxQuestions}`);

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

console.log("\nAll advanced modules satisfy quiz-depth requirements.");
