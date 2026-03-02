#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";

const ROOT = process.cwd();
const LAUNCH_CRITICAL_PATHS = [
  "src/app/page.tsx",
  "src/app/explore/page.tsx",
  "src/app/explore/error.tsx",
  "src/app/explore/not-found.tsx",
  "src/app/explore/loading.tsx",
  "src/app/auth/sign-in/page.tsx",
  "src/app/auth/sign-up/page.tsx",
  "src/app/modules/page.tsx",
  "src/app/billing/checkout/page.tsx",
  "src/app/who-is-learning/page.tsx",
  "src/app/select-profile/page.tsx",
  "src/app/student/onboarding/page.tsx",
  "src/app/parent/dashboard/page.tsx",
  "src/app/parent/reports/page.tsx",
  "src/app/legal/privacy/page.tsx",
  "src/app/legal/terms/page.tsx",
  "src/app/dashboard/page.tsx",
  "src/app/account/settings/page.tsx",
];

function runStep(command, args) {
  const result = spawnSync(command, args, {
    cwd: ROOT,
    stdio: "inherit",
    shell: process.platform === "win32",
    env: process.env,
  });
  return typeof result.status === "number" ? result.status : 1;
}

function sleepMs(ms) {
  const buffer = new SharedArrayBuffer(4);
  const view = new Int32Array(buffer);
  Atomics.wait(view, 0, 0, ms);
}

function quoteShellArg(value) {
  return `"${String(value).replace(/"/g, '\\"')}"`;
}

function parseArgs(argv) {
  const options = {
    envRuntime: "",
    envSourceFile: "",
    strictEnvWarn: false,
  };

  const parseOptionValue = (arg, index) => {
    const equalsIndex = arg.indexOf("=");
    if (equalsIndex >= 0) {
      return { value: arg.slice(equalsIndex + 1).trim(), consumedNext: false };
    }
    const next = argv[index + 1];
    if (!next || next.startsWith("--")) {
      return { value: "", consumedNext: false };
    }
    return { value: next.trim(), consumedNext: true };
  };

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];

    if (arg === "--strict-env-warn") {
      options.strictEnvWarn = true;
      continue;
    }

    if (arg === "--env-runtime" || arg.startsWith("--env-runtime=")) {
      const parsed = parseOptionValue(arg, i);
      if (parsed.value) {
        options.envRuntime = parsed.value;
      }
      if (parsed.consumedNext) {
        i += 1;
      }
      continue;
    }

    if (arg === "--env-source-file" || arg.startsWith("--env-source-file=")) {
      const parsed = parseOptionValue(arg, i);
      if (parsed.value) {
        options.envSourceFile = parsed.value;
      }
      if (parsed.consumedNext) {
        i += 1;
      }
    }
  }

  return options;
}

function runJsonStep(args = []) {
  const tempFilePath = path.join(
    ROOT,
    `.preflight-env-check-${process.pid}-${Date.now()}.json`,
  );
  const scriptPath = path.join(ROOT, "scripts", "check-env.mjs");
  const command = `${quoteShellArg(process.execPath)} ${quoteShellArg(scriptPath)} ${[...args, "--json"].map(quoteShellArg).join(" ")} > ${quoteShellArg(tempFilePath)}`;

  const result = spawnSync(command, {
    cwd: ROOT,
    stdio: "inherit",
    shell: process.platform === "win32",
    env: process.env,
  });

  const exitCode = typeof result.status === "number" ? result.status : 1;
  let stdout = "";
  if (fs.existsSync(tempFilePath)) {
    stdout = fs.readFileSync(tempFilePath, "utf8").trim();
    try {
      fs.unlinkSync(tempFilePath);
    } catch {
      // Best-effort cleanup only; the report parse result is already captured.
    }
  }

  let data = null;
  if (stdout.length > 0) {
    try {
      data = JSON.parse(stdout);
    } catch {
      data = null;
    }
  }

  return {
    exitCode,
    stdout,
    stderr: "",
    data,
    error: result.error ?? null,
  };
}

function evaluateEnvCheck(result, { strictWarn }) {
  if (result.error) {
    return {
      pass: false,
      detail: `check-env process launch failed: ${result.error.message}`,
    };
  }

  if (!result.data || !result.data.totals) {
    return {
      pass: false,
      detail: result.stdout || "Invalid JSON output from scripts/check-env.mjs.",
    };
  }

  const passCount = Number(result.data.totals.pass ?? 0);
  const warnCount = Number(result.data.totals.warn ?? 0);
  const failCount = Number(result.data.totals.fail ?? 0);
  const runtime = String(result.data.runtime?.runtime ?? "unknown");
  const strictWarnTriggered = strictWarn && warnCount > 0;
  const pass = failCount === 0 && !strictWarnTriggered && result.exitCode === 0;
  const strictNote = strictWarn ? " strictWarn=on" : "";

  return {
    pass,
    detail: `pass=${passCount} warn=${warnCount} fail=${failCount} runtime=${runtime}${strictNote}`,
  };
}

function collectFilesRecursively(rootDir, matcher) {
  if (!fs.existsSync(rootDir)) return [];
  const found = [];
  const stack = [rootDir];
  while (stack.length > 0) {
    const current = stack.pop();
    if (!current) continue;
    const entries = fs.readdirSync(current, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(current, entry.name);
      if (entry.isDirectory()) {
        stack.push(fullPath);
        continue;
      }
      if (matcher(fullPath)) {
        found.push(fullPath);
      }
    }
  }
  return found;
}

function findConsoleLogOccurrences() {
  const srcDir = path.join(ROOT, "src");
  const files = collectFilesRecursively(
    srcDir,
    (fullPath) => fullPath.endsWith(".ts") || fullPath.endsWith(".tsx"),
  );
  const hits = [];
  for (const fullPath of files) {
    const rel = path.relative(ROOT, fullPath).replace(/\\/g, "/");
    const content = fs.readFileSync(fullPath, "utf8");
    const lines = content.split(/\r?\n/);
    for (let i = 0; i < lines.length; i += 1) {
      if (lines[i].includes("console.log(")) {
        hits.push(`${rel}:${i + 1}`);
      }
    }
  }
  return hits;
}

function findLaunchCriticalTodoLikeComments() {
  const regex = /\b(TODO|FIXME)\b/i;
  const hits = [];
  for (const relPath of LAUNCH_CRITICAL_PATHS) {
    const fullPath = path.join(ROOT, relPath);
    if (!fs.existsSync(fullPath)) continue;
    const content = fs.readFileSync(fullPath, "utf8");
    const lines = content.split(/\r?\n/);
    for (let i = 0; i < lines.length; i += 1) {
      if (regex.test(lines[i])) {
        hits.push(`${relPath.replace(/\\/g, "/")}:${i + 1}`);
      }
    }
  }
  return hits;
}

function detectVitestAndTests() {
  const hasVitestPkg = fs.existsSync(path.join(ROOT, "node_modules", "vitest"));
  const testFiles = collectFilesRecursively(
    ROOT,
    (fullPath) => {
      const rel = path.relative(ROOT, fullPath).replace(/\\/g, "/");
      if (rel.startsWith("node_modules/")) return false;
      if (rel.startsWith(".next/")) return false;
      return /\.(test|spec)\.(ts|tsx|js|jsx|mjs|cjs)$/.test(rel);
    },
  );
  return {
    hasVitestPkg,
    hasTests: testFiles.length > 0,
    testCount: testFiles.length,
  };
}

function formatSummaryRow(status, name, detail) {
  return `${status.padEnd(6)} | ${name.padEnd(22)} | ${detail}`;
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  const results = [];

  let buildCode = runStep("npm", ["run", "build"]);
  let buildRetried = false;
  if (buildCode !== 0) {
    buildRetried = true;
    process.stdout.write("Build failed on first attempt; retrying once after 2 seconds...\n");
    sleepMs(2000);
    buildCode = runStep("npm", ["run", "build"]);
  }
  results.push({
    name: "next build",
    pass: buildCode === 0,
    detail:
      buildCode === 0
        ? buildRetried
          ? "Build completed successfully on retry."
          : "Build completed successfully."
        : `Exit code ${buildCode}.${buildRetried ? " (retried once)" : ""}`,
  });

  const vitestState = detectVitestAndTests();
  if (vitestState.hasVitestPkg && vitestState.hasTests) {
    const vitestCode = runStep("npx", ["vitest", "run"]);
    results.push({
      name: "vitest run",
      pass: vitestCode === 0,
      detail:
        vitestCode === 0
          ? `Vitest passed (${vitestState.testCount} test file(s) detected).`
          : `Vitest failed with exit code ${vitestCode}.`,
    });
  } else {
    const reason = !vitestState.hasVitestPkg
      ? "vitest dependency not installed."
      : "no test files detected.";
    results.push({
      name: "vitest run",
      pass: true,
      detail: `Skipped (${reason})`,
    });
  }

  if (buildCode === 0) {
    const smokeCode = runStep("node", ["scripts/smoke-test.mjs", "--skip-build"]);
    results.push({
      name: "smoke test",
      pass: smokeCode === 0,
      detail:
        smokeCode === 0
          ? "All launch routes passed smoke test (prebuilt artifact)."
          : `Exit code ${smokeCode}.`,
    });
  } else {
    results.push({
      name: "smoke test",
      pass: true,
      detail: "Skipped because next build failed.",
    });
  }

  const capstoneDefenseCode = runStep("npm", ["run", "curriculum:capstone-defense:check"]);
  results.push({
    name: "capstone defense",
    pass: capstoneDefenseCode === 0,
    detail:
      capstoneDefenseCode === 0
        ? "All capstone modules satisfy defense alignment requirements."
        : `Exit code ${capstoneDefenseCode}.`,
  });
  const envArgs = [];
  if (args.envRuntime) {
    envArgs.push("--runtime", args.envRuntime);
  }
  if (args.envSourceFile) {
    envArgs.push("--source-file", args.envSourceFile);
  }
  if (args.strictEnvWarn) {
    envArgs.push("--fail-on-warn");
  }

  const envCheck = runJsonStep(envArgs);
  const envSummary = evaluateEnvCheck(envCheck, { strictWarn: args.strictEnvWarn });
  results.push({
    name: "env check",
    pass: envSummary.pass,
    detail: envSummary.detail,
  });

  const billingMatrixCode = runStep("npm", ["run", "billing:matrix:validate"]);
  results.push({
    name: "billing matrix",
    pass: billingMatrixCode === 0,
    detail:
      billingMatrixCode === 0
        ? "Pricing spec and RevenueCat matrix are aligned."
        : `Exit code ${billingMatrixCode}.`,
  });

  const revenueCatBlueprintCode = runStep("npm", ["run", "billing:revenuecat:blueprint:check"]);
  results.push({
    name: "rc blueprint drift",
    pass: revenueCatBlueprintCode === 0,
    detail:
      revenueCatBlueprintCode === 0
        ? "Generated RevenueCat blueprint files are synced to pricing matrix."
        : `Exit code ${revenueCatBlueprintCode}.`,
  });

  const apiRateLimitCoverageCode = runStep("npm", ["run", "security:api-rate-limit:check"]);
  results.push({
    name: "api abuse guard",
    pass: apiRateLimitCoverageCode === 0,
    detail:
      apiRateLimitCoverageCode === 0
        ? "High-cost API routes include required rate-limit guards."
        : `Exit code ${apiRateLimitCoverageCode}.`,
  });

  const billingWebhookHardeningCode = runStep("npm", ["run", "security:billing-webhook-hardening:check"]);
  results.push({
    name: "billing webhook guard",
    pass: billingWebhookHardeningCode === 0,
    detail:
      billingWebhookHardeningCode === 0
        ? "Stripe and RevenueCat webhook hardening markers are present."
        : `Exit code ${billingWebhookHardeningCode}.`,
  });

  const consoleLogHits = findConsoleLogOccurrences();
  results.push({
    name: "console.log sweep",
    pass: consoleLogHits.length === 0,
    detail: consoleLogHits.length === 0 ? "No console.log in src/." : `${consoleLogHits.length} hit(s): ${consoleLogHits.slice(0, 10).join(", ")}`,
  });

  const todoHits = findLaunchCriticalTodoLikeComments();
  results.push({
    name: "TODO/FIXME sweep",
    pass: todoHits.length === 0,
    detail: todoHits.length === 0 ? "No TODO/FIXME in launch-critical files." : `${todoHits.length} hit(s): ${todoHits.slice(0, 10).join(", ")}`,
  });

  const passCount = results.filter((entry) => entry.pass).length;
  const failCount = results.length - passCount;

  process.stdout.write("\nPreflight Summary\n");
  process.stdout.write(`${"-".repeat(72)}\n`);
  process.stdout.write(`${formatSummaryRow("Status", "Check", "Detail")}\n`);
  process.stdout.write(`${"-".repeat(72)}\n`);
  for (const entry of results) {
    process.stdout.write(
      `${formatSummaryRow(entry.pass ? "PASS" : "FAIL", entry.name, entry.detail)}\n`,
    );
  }
  process.stdout.write(`${"-".repeat(72)}\n`);
  process.stdout.write(`Result: ${passCount} passed, ${failCount} failed.\n`);

  if (failCount > 0) {
    process.exit(1);
  }
}

main();
