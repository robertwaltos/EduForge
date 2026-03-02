#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();

const CHECKS = [
  {
    file: "src/app/api/testing/exams/[examId]/start/route.ts",
    mustInclude: [
      '.eq("review_status", "approved")',
      '.eq("commercial_use_allowed", true)',
      "LEGAL_ALLOW_LEGACY_TESTING_QUESTION_BANK",
      "Legacy question-bank mode is blocked",
    ],
  },
  {
    file: "src/app/api/testing/attempts/[attemptId]/submit/route.ts",
    mustInclude: [
      '.eq("review_status", "approved")',
      '.eq("commercial_use_allowed", true)',
      "LEGAL_ALLOW_LEGACY_TESTING_QUESTION_BANK",
      "Attempt references restricted or unapproved question content",
    ],
  },
];

function readFile(relPath) {
  const fullPath = path.join(ROOT, relPath);
  if (!fs.existsSync(fullPath)) {
    return null;
  }
  return fs.readFileSync(fullPath, "utf8");
}

function main() {
  const failures = [];

  for (const check of CHECKS) {
    const content = readFile(check.file);
    if (!content) {
      failures.push(`${check.file} -> missing file`);
      continue;
    }

    const missing = check.mustInclude.filter((snippet) => !content.includes(snippet));
    if (missing.length > 0) {
      failures.push(`${check.file} -> missing: ${missing.join(", ")}`);
    }
  }

  process.stdout.write("Testing legal guard coverage check\n");
  process.stdout.write(`Checked: ${CHECKS.length}\n`);

  if (failures.length > 0) {
    process.stdout.write(`FAIL: ${failures.length} route(s) missing legal guard markers.\n`);
    for (const failure of failures) {
      process.stdout.write(` - ${failure}\n`);
    }
    process.exit(1);
  }

  process.stdout.write("PASS: Testing content legal guard markers are present.\n");
}

main();
