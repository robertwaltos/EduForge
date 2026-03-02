#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();

const CHECKS = [
  {
    file: "src/app/api/stripe/webhook/route.ts",
    mustInclude: [
      "MAX_STRIPE_WEBHOOK_PAYLOAD_BYTES",
      "STRIPE_WEBHOOK_SIGNATURE_TOLERANCE_SECONDS",
      "isWebhookProcessingLockActive",
      "claimWebhookEvent",
      'if (process.env.NODE_ENV === "production" && !event.livemode)',
    ],
  },
  {
    file: "src/app/api/revenuecat/webhook/route.ts",
    mustInclude: [
      "MAX_REVENUECAT_WEBHOOK_PAYLOAD_BYTES",
      "NON_MUTATING_REVENUECAT_EVENTS",
      "PRODUCT_REQUIRED_REVENUECAT_EVENTS",
      "isWebhookProcessingLockActive",
      "claimRevenueCatWebhookEvent",
      "Invalid webhook authentication",
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

  process.stdout.write("Billing webhook hardening coverage check\n");
  process.stdout.write(`Checked: ${CHECKS.length}\n`);

  if (failures.length > 0) {
    process.stdout.write(`FAIL: ${failures.length} route(s) missing hardening markers.\n`);
    for (const failure of failures) {
      process.stdout.write(` - ${failure}\n`);
    }
    process.exit(1);
  }

  process.stdout.write("PASS: Billing webhook hardening markers are present.\n");
}

main();
