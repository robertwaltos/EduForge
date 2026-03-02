import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import typescript from "typescript";

const ROOT = process.cwd();
const MODULE_PATH = path.resolve(ROOT, "src/lib/billing/webhook-processing-lock.ts");
const cjsRequire = createRequire(import.meta.url);

function readRequiredFile(filePath) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`Missing required file: ${filePath}`);
  }
  return fs.readFileSync(filePath, "utf8");
}

function loadTranspiledTsModule(filePath) {
  const source = readRequiredFile(filePath);
  const transpiled = typescript.transpileModule(source, {
    compilerOptions: {
      module: typescript.ModuleKind.CommonJS,
      target: typescript.ScriptTarget.ES2020,
      esModuleInterop: true,
      importsNotUsedAsValues: typescript.ImportsNotUsedAsValues.Remove,
    },
    fileName: filePath,
  }).outputText;

  const cjsModule = { exports: {} };
  const wrapped = new Function(
    "exports",
    "require",
    "module",
    "__filename",
    "__dirname",
    transpiled,
  );
  wrapped(cjsModule.exports, cjsRequire, cjsModule, filePath, path.dirname(filePath));
  return cjsModule.exports;
}

function toIso(nowMs, ageSeconds) {
  return new Date(nowMs - ageSeconds * 1000).toISOString();
}

function main() {
  const contract = loadTranspiledTsModule(MODULE_PATH);
  const isWebhookProcessingLockActive = contract.isWebhookProcessingLockActive;
  const DEFAULT_WEBHOOK_PROCESSING_LOCK_SECONDS = contract.DEFAULT_WEBHOOK_PROCESSING_LOCK_SECONDS;

  if (typeof isWebhookProcessingLockActive !== "function") {
    throw new Error("Expected isWebhookProcessingLockActive export.");
  }
  assert.equal(DEFAULT_WEBHOOK_PROCESSING_LOCK_SECONDS, 120);
  console.log("PASS: default lock duration export");

  const nowMs = Date.parse("2026-03-02T12:00:00.000Z");

  assert.equal(
    isWebhookProcessingLockActive({
      updatedAtIso: toIso(nowMs, 30),
      nowMs,
    }),
    true,
  );
  assert.equal(
    isWebhookProcessingLockActive({
      updatedAtIso: toIso(nowMs, 130),
      nowMs,
    }),
    false,
  );
  console.log("PASS: default lock activity window");

  assert.equal(
    isWebhookProcessingLockActive({
      updatedAtIso: "not-a-date",
      nowMs,
    }),
    false,
  );
  assert.equal(
    isWebhookProcessingLockActive({
      updatedAtIso: new Date(nowMs + 10_000).toISOString(),
      nowMs,
    }),
    false,
  );
  console.log("PASS: invalid and future timestamps");

  assert.equal(
    isWebhookProcessingLockActive({
      updatedAtIso: toIso(nowMs, 9),
      nowMs,
      lockSeconds: 10,
    }),
    true,
  );
  assert.equal(
    isWebhookProcessingLockActive({
      updatedAtIso: toIso(nowMs, 10),
      nowMs,
      lockSeconds: 10,
    }),
    false,
  );
  console.log("PASS: custom lock duration override");

  console.log("PASS: billing webhook processing lock contract.");
}

main();
