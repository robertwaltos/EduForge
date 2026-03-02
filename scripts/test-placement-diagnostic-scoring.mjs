import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import typescript from "typescript";

const ROOT = process.cwd();
const SCORING_PATH = path.resolve(
  ROOT,
  "src/lib/ai/placement-diagnostic-scoring.ts",
);

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

  const module = { exports: {} };
  const wrapped = new Function(
    "exports",
    "require",
    "module",
    "__filename",
    "__dirname",
    transpiled,
  );

  wrapped(
    module.exports,
    (specifier) => {
      throw new Error(
        `Unexpected runtime dependency "${specifier}" while loading ${path.relative(ROOT, filePath)}.`,
      );
    },
    module,
    filePath,
    path.dirname(filePath),
  );

  return module.exports;
}

function main() {
  const scoringModule = loadTranspiledTsModule(SCORING_PATH);

  const calculatePlacementConfidence = scoringModule.calculatePlacementConfidence;
  const recommendPlacementStage = scoringModule.recommendPlacementStage;
  const normalizePlacementStageId = scoringModule.normalizePlacementStageId;
  const isPlacementStageId = scoringModule.isPlacementStageId;
  const stageIds = scoringModule.PLACEMENT_STAGE_IDS;

  if (typeof calculatePlacementConfidence !== "function") {
    throw new Error("Expected calculatePlacementConfidence export.");
  }
  if (typeof recommendPlacementStage !== "function") {
    throw new Error("Expected recommendPlacementStage export.");
  }
  if (typeof normalizePlacementStageId !== "function") {
    throw new Error("Expected normalizePlacementStageId export.");
  }
  if (typeof isPlacementStageId !== "function") {
    throw new Error("Expected isPlacementStageId export.");
  }
  if (!Array.isArray(stageIds) || stageIds.length !== 6) {
    throw new Error("Expected PLACEMENT_STAGE_IDS to contain 6 stage ids.");
  }

  assert.equal(normalizePlacementStageId("middle"), "middle");
  assert.equal(normalizePlacementStageId("unknown-stage"), "middle");
  assert.equal(isPlacementStageId("high"), true);
  assert.equal(isPlacementStageId("invalid"), false);
  console.log("PASS: stage-id normalization and guards");

  const highSignalConfidence = calculatePlacementConfidence({
    validResponseCount: 12,
    uniqueSkillCount: 10,
    uniqueModuleCount: 6,
    invalidResponseCount: 0,
  });
  const lowSignalConfidence = calculatePlacementConfidence({
    validResponseCount: 5,
    uniqueSkillCount: 1,
    uniqueModuleCount: 1,
    invalidResponseCount: 8,
  });

  assert.ok(highSignalConfidence > lowSignalConfidence, "Expected high signal confidence to be greater.");
  assert.ok(highSignalConfidence <= 0.98 && highSignalConfidence >= 0.2);
  assert.ok(lowSignalConfidence <= 0.98 && lowSignalConfidence >= 0.2);
  console.log("PASS: confidence monotonicity and bounds");

  const promotedStage = recommendPlacementStage({
    startingStageId: "middle",
    score: 0.9,
    confidence: 0.8,
  });
  const demotedStage = recommendPlacementStage({
    startingStageId: "middle",
    score: 0.3,
    confidence: 0.8,
  });
  const lockedStageLowConfidence = recommendPlacementStage({
    startingStageId: "middle",
    score: 0.9,
    confidence: 0.4,
  });
  const topCappedStage = recommendPlacementStage({
    startingStageId: "college",
    score: 0.95,
    confidence: 0.9,
  });
  const bottomCappedStage = recommendPlacementStage({
    startingStageId: "pre-k",
    score: 0.1,
    confidence: 0.9,
  });

  assert.equal(promotedStage, "high");
  assert.equal(demotedStage, "upper-elem");
  assert.equal(lockedStageLowConfidence, "middle");
  assert.equal(topCappedStage, "college");
  assert.equal(bottomCappedStage, "pre-k");
  console.log("PASS: stage recommendation behavior and edge capping");

  console.log("PASS: placement diagnostic scoring contract.");
}

main();
