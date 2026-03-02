#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();

const ROUTE_GUARDS = [
  {
    file: "src/app/api/ai/tutor/route.ts",
    mustInclude: ["enforceIpRateLimit", "api:ai:tutor:post", "max: 10"],
  },
  {
    file: "src/app/api/progress/route.ts",
    mustInclude: ["enforceIpRateLimit", "api:progress:post", "max: 60"],
  },
  {
    file: "src/app/api/answers/route.ts",
    mustInclude: ["enforceIpRateLimit", "api:answers:post", "max: 60"],
  },
  {
    file: "src/app/api/telemetry/events/route.ts",
    mustInclude: ["enforceIpRateLimit", "api:telemetry:events:post", "max: 60"],
  },
  {
    file: "src/app/api/health/route.ts",
    mustInclude: ["enforceIpRateLimit", "api:health:get", "max: 60"],
  },
  {
    file: "src/app/api/tts/generate/route.ts",
    mustInclude: ["enforceIpRateLimit", "api:tts:generate:post"],
  },
  {
    file: "src/app/api/images/generate/route.ts",
    mustInclude: ["enforceIpRateLimit", "api:images:generate:post"],
  },
  {
    file: "src/app/api/language/translate/route.ts",
    mustInclude: ["enforceIpRateLimit", "api:language:translate:post"],
  },
  {
    file: "src/app/api/language/pronunciation/grade/route.ts",
    mustInclude: ["enforceIpRateLimit", "api:language:pronunciation:grade:post"],
  },
  {
    file: "src/app/api/ai/follow-up/route.ts",
    mustInclude: ["enforceIpRateLimit", "api:ai:follow-up:post"],
  },
  {
    file: "src/app/api/ai/follow-up/backfill/route.ts",
    mustInclude: ["enforceIpRateLimit", "api:ai:follow-up:backfill:post"],
  },
  {
    file: "src/app/api/ai/analyze/route.ts",
    mustInclude: ["enforceIpRateLimit", "api:ai:analyze:post"],
  },
  {
    file: "src/app/api/ai/remediation-worksheet/route.ts",
    mustInclude: ["enforceIpRateLimit", "api:ai:remediation-worksheet:post"],
  },
  {
    file: "src/app/api/ai/remediation-worksheet/progress/route.ts",
    mustInclude: ["enforceIpRateLimit", "api:ai:remediation-worksheet:progress:post"],
  },
  {
    file: "src/app/api/ai/recommendations/route.ts",
    mustInclude: ["enforceIpRateLimit", "api:ai:recommendations:get"],
  },
  {
    file: "src/app/api/ai/review-queue/route.ts",
    mustInclude: ["enforceIpRateLimit", "api:ai:review-queue:get"],
  },
  {
    file: "src/app/api/ai/mastery-map/route.ts",
    mustInclude: ["enforceIpRateLimit", "api:ai:mastery-map:get"],
  },
  {
    file: "src/app/api/ai/placement-diagnostic/route.ts",
    mustInclude: ["enforceIpRateLimit", "api:ai:placement-diagnostic:get", "api:ai:placement-diagnostic:post"],
  },
  {
    file: "src/app/api/ai/placement-diagnostic/summary/route.ts",
    mustInclude: ["enforceIpRateLimit", "api:ai:placement-diagnostic:summary:get"],
  },
  {
    file: "src/app/api/ai/placement-diagnostic/history/route.ts",
    mustInclude: ["enforceIpRateLimit", "api:ai:placement-diagnostic:history:get"],
  },
  {
    file: "src/app/api/ai/study-plan/week/route.ts",
    mustInclude: ["enforceIpRateLimit", "api:ai:study-plan:week:get"],
  },
  {
    file: "src/app/api/exam/remediation-queue/route.ts",
    mustInclude: ["enforceIpRateLimit", "api:exam:remediation-queue:get"],
  },
  {
    file: "src/app/api/exam/remediation-tasks/route.ts",
    mustInclude: ["enforceIpRateLimit", "api:exam:remediation-tasks:get", "api:exam:remediation-tasks:post"],
  },
  {
    file: "src/app/api/exam/error-log/route.ts",
    mustInclude: ["enforceIpRateLimit", "api:exam:error-log:get", "api:exam:error-log:post"],
  },
  {
    file: "src/app/api/exam/error-log/[errorId]/route.ts",
    mustInclude: ["enforceIpRateLimit", "api:exam:error-log:item:patch"],
  },
  {
    file: "src/app/api/exam/error-log/auto-resolve/route.ts",
    mustInclude: ["enforceIpRateLimit", "api:exam:error-log:auto-resolve:get", "api:exam:error-log:auto-resolve:post"],
  },
  {
    file: "src/app/api/support/tickets/route.ts",
    mustInclude: ["enforceIpRateLimit", "api:support:tickets:post"],
  },
  {
    file: "src/app/api/reconciliation/run/route.ts",
    mustInclude: ["enforceIpRateLimit", "api:reconciliation:run:post"],
  },
  {
    file: "src/app/api/testing/exams/[examId]/start/route.ts",
    mustInclude: ["enforceIpRateLimit", "api:testing:exams:start:post"],
  },
  {
    file: "src/app/api/testing/attempts/[attemptId]/submit/route.ts",
    mustInclude: ["enforceIpRateLimit", "api:testing:attempts:submit:post"],
  },
  {
    file: "src/app/api/admin/ai/remediation-usage/route.ts",
    mustInclude: ["enforceIpRateLimit", "api:admin:ai:remediation-usage:get"],
  },
  {
    file: "src/app/api/admin/ai/remediation-usage/timeseries/route.ts",
    mustInclude: ["enforceIpRateLimit", "api:admin:ai:remediation-usage:timeseries:get"],
  },
  {
    file: "src/app/api/admin/ai/remediation-usage/export/route.ts",
    mustInclude: ["enforceIpRateLimit", "api:admin:ai:remediation-usage:export:get"],
  },
  {
    file: "src/app/api/audiobooks/public-domain/route.ts",
    mustInclude: ["enforceIpRateLimit", "api:audiobooks:public-domain:get"],
  },
  {
    file: "src/app/api/audiobooks/catalog/route.ts",
    mustInclude: ["enforceIpRateLimit", "api:audiobooks:catalog:get"],
  },
  {
    file: "src/app/api/audiobooks/chapter-text/route.ts",
    mustInclude: ["enforceIpRateLimit", "api:audiobooks:chapter-text:get"],
  },
  {
    file: "src/app/api/parent/reports/route.ts",
    mustInclude: ["enforceIpRateLimit", "api:parent:reports:get"],
  },
  {
    file: "src/app/api/parent/reports/language/route.ts",
    mustInclude: ["enforceIpRateLimit", "api:parent:reports:language:get"],
  },
  {
    file: "src/app/api/parent/ai-interventions/route.ts",
    mustInclude: ["enforceIpRateLimit", "api:parent:ai-interventions:get"],
  },
  {
    file: "src/app/api/stripe/webhook/route.ts",
    mustInclude: ["enforceIpRateLimit", "api:billing:stripe-webhook:route"],
  },
  {
    file: "src/app/api/revenuecat/webhook/route.ts",
    mustInclude: ["enforceIpRateLimit", "api:billing:revenuecat-webhook"],
  },
  {
    file: "src/app/api/stripe/checkout/route.ts",
    mustInclude: ["enforceIpRateLimit", "api:billing:stripe-checkout"],
  },
  {
    file: "src/app/api/stripe/portal/route.ts",
    mustInclude: ["enforceIpRateLimit", "api:billing:stripe-portal"],
  },
  {
    file: "src/app/api/stripe/checkout/gift/route.ts",
    mustInclude: ["enforceIpRateLimit", "api:stripe:checkout:gift"],
  },
  {
    file: "src/app/api/stripe/checkout/organization/route.ts",
    mustInclude: ["enforceIpRateLimit", "api:stripe:checkout:organization"],
  },
  {
    file: "src/app/api/subscription/status/route.ts",
    mustInclude: ["enforceIpRateLimit", "api:subscription:status:get"],
  },
  {
    file: "src/app/api/testing/classes/[classId]/analytics/route.ts",
    mustInclude: ["enforceIpRateLimit", "api:testing:classes:analytics:get"],
  },
  {
    file: "src/app/api/testing/classes/route.ts",
    mustInclude: [
      "enforceIpRateLimit",
      "api:testing:classes:get",
      "api:testing:classes:post",
    ],
  },
  {
    file: "src/app/api/testing/classes/[classId]/enrollments/route.ts",
    mustInclude: [
      "enforceIpRateLimit",
      "api:testing:classes:enrollments:get",
      "api:testing:classes:enrollments:post",
    ],
  },
  {
    file: "src/app/api/testing/classes/[classId]/assignments/route.ts",
    mustInclude: [
      "enforceIpRateLimit",
      "api:testing:classes:assignments:get",
      "api:testing:classes:assignments:post",
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

  for (const guard of ROUTE_GUARDS) {
    const content = readFile(guard.file);
    if (!content) {
      failures.push(`${guard.file} -> missing file`);
      continue;
    }

    const missing = guard.mustInclude.filter((snippet) => !content.includes(snippet));
    if (missing.length > 0) {
      failures.push(`${guard.file} -> missing: ${missing.join(", ")}`);
    }
  }

  process.stdout.write("API rate-limit coverage check\n");
  process.stdout.write(`Checked: ${ROUTE_GUARDS.length}\n`);

  if (failures.length > 0) {
    process.stdout.write(`FAIL: ${failures.length} route(s) missing required guard markers.\n`);
    for (const failure of failures) {
      process.stdout.write(` - ${failure}\n`);
    }
    process.exit(1);
  }

  process.stdout.write("PASS: All required high-cost routes include rate-limit guards.\n");
}

main();
