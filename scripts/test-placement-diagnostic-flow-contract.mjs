import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import typescript from "typescript";

const ROOT = process.cwd();
const CONTRACT_PATH = path.resolve(
  ROOT,
  "src/lib/ai/placement-diagnostic-contract.ts",
);

function readRequiredFile(filePath) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`Missing required file: ${filePath}`);
  }
  return fs.readFileSync(filePath, "utf8");
}

function resolveTsModule(specifier, fromDirectory) {
  const resolveWithExtensions = (basePath) => {
    const candidates = [
      basePath,
      `${basePath}.ts`,
      `${basePath}.tsx`,
      path.join(basePath, "index.ts"),
      path.join(basePath, "index.tsx"),
    ];
    return candidates.find((candidate) => fs.existsSync(candidate)) ?? null;
  };

  if (specifier.startsWith("@/")) {
    const aliasPath = path.resolve(ROOT, "src", specifier.slice(2));
    const resolvedAlias = resolveWithExtensions(aliasPath);
    if (!resolvedAlias) {
      throw new Error(`Unable to resolve aliased import "${specifier}" from "${fromDirectory}".`);
    }
    return resolvedAlias;
  }

  if (specifier.startsWith("./") || specifier.startsWith("../")) {
    const relativePath = path.resolve(fromDirectory, specifier);
    const resolvedRelative = resolveWithExtensions(relativePath);
    if (!resolvedRelative) {
      throw new Error(`Unable to resolve relative import "${specifier}" from "${fromDirectory}".`);
    }
    return resolvedRelative;
  }

  throw new Error(`Unexpected runtime dependency "${specifier}" while loading contract module.`);
}

function loadTranspiledTsModule(filePath, cache = new Map()) {
  const normalizedPath = path.resolve(filePath);
  if (cache.has(normalizedPath)) {
    return cache.get(normalizedPath).exports;
  }

  const source = readRequiredFile(normalizedPath);
  const transpiled = typescript.transpileModule(source, {
    compilerOptions: {
      module: typescript.ModuleKind.CommonJS,
      target: typescript.ScriptTarget.ES2020,
      esModuleInterop: true,
      importsNotUsedAsValues: typescript.ImportsNotUsedAsValues.Remove,
    },
    fileName: normalizedPath,
  }).outputText;

  const cjsModule = { exports: {} };
  cache.set(normalizedPath, cjsModule);

  const wrapped = new Function(
    "exports",
    "require",
    "module",
    "__filename",
    "__dirname",
    transpiled,
  );

  wrapped(
    cjsModule.exports,
    (specifier) => {
      const resolvedPath = resolveTsModule(specifier, path.dirname(normalizedPath));
      return loadTranspiledTsModule(resolvedPath, cache);
    },
    cjsModule,
    normalizedPath,
    path.dirname(normalizedPath),
  );

  return cjsModule.exports;
}

function main() {
  const contract = loadTranspiledTsModule(CONTRACT_PATH);

  const buildPlacementSummary = contract.buildPlacementSummary;
  const buildPlacementOverrideSkillMap = contract.buildPlacementOverrideSkillMap;
  const buildPlacementHistorySummary = contract.buildPlacementHistorySummary;
  const filterPlacementHistoryRows = contract.filterPlacementHistoryRows;

  if (typeof buildPlacementSummary !== "function") {
    throw new Error("Expected buildPlacementSummary export.");
  }
  if (typeof buildPlacementOverrideSkillMap !== "function") {
    throw new Error("Expected buildPlacementOverrideSkillMap export.");
  }
  if (typeof buildPlacementHistorySummary !== "function") {
    throw new Error("Expected buildPlacementHistorySummary export.");
  }
  if (typeof filterPlacementHistoryRows !== "function") {
    throw new Error("Expected filterPlacementHistoryRows export.");
  }

  const submittedAt = "2026-03-02T10:15:00.000Z";
  const profile = {
    gradeLevel: "6",
    ageYears: 11,
    initialAssessmentStatus: "completed",
    updatedAt: submittedAt,
    initialAssessmentData: {
      version: "placement_diagnostic_v1",
      completed_at: submittedAt,
      stage_id: "upper-elem",
      recommended_stage_id: "middle",
      score: 0.8,
      responses: [
        { isCorrect: true },
        { isCorrect: true },
        { isCorrect: true },
        { isCorrect: true },
        { isCorrect: false },
      ],
    },
    aiSkillLevelMap: {
      placement_diagnostic: {
        stage_id: "upper-elem",
        recommended_stage_id: "middle",
        score: 0.8,
        confidence: 0.76,
        completed_at: submittedAt,
      },
      placement_stage_id: "middle",
      placement_confidence: 0.76,
      placement_updated_at: submittedAt,
    },
  };

  const submitSummary = buildPlacementSummary(profile);
  assert.equal(submitSummary.startingStageId, "upper-elem");
  assert.equal(submitSummary.recommendedStageId, "middle");
  assert.equal(submitSummary.confidence, 0.76);
  assert.equal(submitSummary.assessment.score, 0.8);
  assert.equal(submitSummary.assessment.correctCount, 4);
  assert.equal(submitSummary.assessment.responseCount, 5);
  console.log("PASS: submit -> summary consistency");

  const overrideAt = "2026-03-02T12:00:00.000Z";
  const overriddenSkillMap = buildPlacementOverrideSkillMap({
    existingSkillMap: profile.aiSkillLevelMap,
    overrideStageId: "high",
    reason: "Teacher override after interview",
    overrideAtIso: overrideAt,
  });
  const overrideSummary = buildPlacementSummary({
    ...profile,
    updatedAt: overrideAt,
    aiSkillLevelMap: overriddenSkillMap,
  });

  assert.equal(overrideSummary.recommendedStageId, "high");
  assert.equal(overrideSummary.manualOverrideStageId, "high");
  assert.equal(overrideSummary.manualOverrideReason, "Teacher override after interview");
  assert.equal(overrideSummary.manualOverrideAt, overrideAt);
  console.log("PASS: override -> summary override reflection");

  const historyRows = [
    { profile_id: "profile-a", event_type: "manual_override" },
    { profile_id: "profile-a", event_type: "diagnostic_submitted" },
    { profile_id: "profile-b", event_type: "diagnostic_submitted" },
  ];

  const historySummary = buildPlacementHistorySummary(historyRows);
  assert.deepEqual(historySummary, {
    total: 3,
    diagnosticSubmittedCount: 2,
    manualOverrideCount: 1,
  });

  const filteredByProfile = filterPlacementHistoryRows(historyRows, {
    profileId: "profile-a",
    limit: 50,
  });
  assert.equal(filteredByProfile.length, 2);
  assert.ok(filteredByProfile.every((row) => row.profile_id === "profile-a"));

  const filteredByType = filterPlacementHistoryRows(historyRows, {
    eventType: "diagnostic_submitted",
    limit: 50,
  });
  assert.equal(filteredByType.length, 2);
  assert.ok(filteredByType.every((row) => row.event_type === "diagnostic_submitted"));

  const filteredLimited = filterPlacementHistoryRows(historyRows, {
    profileId: "profile-a",
    eventType: "diagnostic_submitted",
    limit: 1,
  });
  assert.equal(filteredLimited.length, 1);
  assert.equal(filteredLimited[0].profile_id, "profile-a");
  assert.equal(filteredLimited[0].event_type, "diagnostic_submitted");
  console.log("PASS: history filtering (profileId/eventType/limit)");

  console.log("PASS: placement diagnostic flow contract.");
}

main();
