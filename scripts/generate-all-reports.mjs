import { spawnSync } from "node:child_process";

const commands = [
  ["node", ["scripts/curriculum-coverage-report.mjs"]],
  ["node", ["scripts/curriculum-expansion-plan.mjs"]],
  ["node", ["scripts/media-readiness-report.mjs"]],
  ["node", ["scripts/appstore-compliance-audit.mjs"]],
];

for (const [cmd, args] of commands) {
  const result = spawnSync(cmd, args, { stdio: "inherit", shell: true });
  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

console.log("All reports refreshed.");
