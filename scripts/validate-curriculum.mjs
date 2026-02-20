import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";

const catalogDir = path.resolve("src/lib/modules/catalog");

function loadModuleFromFile(filePath) {
  const source = fs.readFileSync(filePath, "utf8");
  const exportMatch = source.match(/export const\s+([A-Za-z0-9_]+)\s*:\s*LearningModule\s*=/);
  if (!exportMatch) {
    throw new Error(`Cannot find "export const ...: LearningModule =" in ${filePath}`);
  }

  const exportName = exportMatch[1];
  const transformed = source
    .replace(/^import\s+type\s+\{[^}]+\}\s+from\s+"[^"]+";\s*$/gm, "")
    .replace(
      new RegExp(`export const\\s+${exportName}\\s*:\\s*LearningModule\\s*=`, "m"),
      `const ${exportName} =`,
    )
    .concat(`\nmodule.exports = ${exportName};\n`);

  const context = vm.createContext({ module: { exports: {} }, exports: {} });
  const script = new vm.Script(transformed, { filename: filePath });
  script.runInContext(context);

  return context.module.exports;
}

function loadCatalogModules() {
  if (!fs.existsSync(catalogDir)) return [];

  return fs
    .readdirSync(catalogDir)
    .filter((name) => name.endsWith(".ts"))
    .filter((name) => !name.endsWith(".example.ts"))
    .sort()
    .map((fileName) => {
      const filePath = path.join(catalogDir, fileName);
      return {
        fileName,
        filePath,
        module: loadModuleFromFile(filePath),
      };
    });
}

function pushIssue(target, level, message) {
  target.push({ level, message });
}

function normalizeLookupKey(value) {
  try {
    return decodeURIComponent(String(value ?? "").trim().toLowerCase());
  } catch {
    return String(value ?? "").trim().toLowerCase();
  }
}

function slugify(value) {
  return String(value ?? "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function registerLookupKey({ map, key, owner, label, issues }) {
  if (!key) {
    return;
  }
  const existingOwner = map.get(key);
  if (existingOwner && existingOwner !== owner) {
    pushIssue(
      issues,
      "error",
      `${label} lookup key "${key}" collides with ${existingOwner}.`,
    );
    return;
  }
  map.set(key, owner);
}

function validateModule(moduleEntry, state) {
  const { module: learningModule, fileName } = moduleEntry;
  const issues = [];

  if (!learningModule?.id || typeof learningModule.id !== "string") {
    pushIssue(issues, "error", "Module id is missing or invalid.");
    return issues;
  }

  if (state.moduleIds.has(learningModule.id)) {
    pushIssue(
      issues,
      "error",
      `Duplicate module id "${learningModule.id}" also used in ${state.moduleIds.get(learningModule.id)}.`,
    );
  } else {
    state.moduleIds.set(learningModule.id, fileName);
  }

  const moduleLookupOwner = `module "${learningModule.id}"`;
  registerLookupKey({
    map: state.moduleLookupKeys,
    key: normalizeLookupKey(learningModule.id),
    owner: moduleLookupOwner,
    label: "Module",
    issues,
  });
  registerLookupKey({
    map: state.moduleLookupKeys,
    key: normalizeLookupKey(learningModule.title),
    owner: moduleLookupOwner,
    label: "Module",
    issues,
  });
  registerLookupKey({
    map: state.moduleLookupKeys,
    key: slugify(learningModule.title),
    owner: moduleLookupOwner,
    label: "Module",
    issues,
  });

  if (!Array.isArray(learningModule.lessons) || learningModule.lessons.length === 0) {
    pushIssue(issues, "error", "Module has no lessons.");
    return issues;
  }

  if (
    typeof learningModule.minAge === "number" &&
    typeof learningModule.maxAge === "number" &&
    learningModule.minAge > learningModule.maxAge
  ) {
    pushIssue(issues, "error", `minAge (${learningModule.minAge}) is greater than maxAge (${learningModule.maxAge}).`);
  }

  const lessonIdsInModule = new Set();
  const lessonTypeCounts = { video: 0, interactive: 0, quiz: 0 };
  let lessonsWithAids = 0;

  for (const lesson of learningModule.lessons) {
    if (!lesson?.id || typeof lesson.id !== "string") {
      pushIssue(issues, "error", "Encountered a lesson with missing id.");
      continue;
    }

    if (lessonIdsInModule.has(lesson.id)) {
      pushIssue(issues, "error", `Duplicate lesson id "${lesson.id}" within module.`);
    } else {
      lessonIdsInModule.add(lesson.id);
    }

    if (state.globalLessonIds.has(lesson.id)) {
      pushIssue(
        issues,
        "error",
        `Lesson id "${lesson.id}" is duplicated globally (also in ${state.globalLessonIds.get(lesson.id)}).`,
      );
    } else {
      state.globalLessonIds.set(lesson.id, `${learningModule.id} (${fileName})`);
    }

    const lessonLookupOwner = `lesson "${lesson.id}" in module "${learningModule.id}"`;
    registerLookupKey({
      map: state.lessonLookupKeys,
      key: normalizeLookupKey(lesson.id),
      owner: lessonLookupOwner,
      label: "Lesson",
      issues,
    });
    registerLookupKey({
      map: state.lessonLookupKeys,
      key: normalizeLookupKey(lesson.title),
      owner: lessonLookupOwner,
      label: "Lesson",
      issues,
    });
    registerLookupKey({
      map: state.lessonLookupKeys,
      key: slugify(lesson.title),
      owner: lessonLookupOwner,
      label: "Lesson",
      issues,
    });

    if (!["video", "interactive", "quiz"].includes(lesson.type)) {
      pushIssue(issues, "error", `Lesson "${lesson.id}" has unsupported type "${lesson.type}".`);
    } else {
      lessonTypeCounts[lesson.type] += 1;
    }

    if (typeof lesson.duration !== "number" || lesson.duration <= 0) {
      pushIssue(issues, "error", `Lesson "${lesson.id}" has invalid duration "${lesson.duration}".`);
    }

    if (Array.isArray(lesson.learningAids) && lesson.learningAids.length > 0) {
      lessonsWithAids += 1;
      const aidIds = new Set();
      for (const aid of lesson.learningAids) {
        if (aidIds.has(aid.id)) {
          pushIssue(issues, "error", `Lesson "${lesson.id}" has duplicate learning aid id "${aid.id}".`);
        } else {
          aidIds.add(aid.id);
        }
      }
    }

    if (lesson.type === "quiz") {
      if (!Array.isArray(lesson.questions) || lesson.questions.length < 3) {
        pushIssue(issues, "error", `Quiz lesson "${lesson.id}" must include at least 3 questions.`);
        continue;
      }

      const questionIds = new Set();
      for (const question of lesson.questions) {
        if (questionIds.has(question.id)) {
          pushIssue(issues, "error", `Quiz lesson "${lesson.id}" has duplicate question id "${question.id}".`);
        } else {
          questionIds.add(question.id);
        }

        if (!Array.isArray(question.options) || question.options.length < 3) {
          pushIssue(issues, "error", `Question "${question.id}" in "${lesson.id}" must have at least 3 options.`);
          continue;
        }

        const optionIds = new Set(question.options.map((option) => option.id));
        if (!optionIds.has(question.correctOptionId)) {
          pushIssue(
            issues,
            "error",
            `Question "${question.id}" in "${lesson.id}" has correctOptionId "${question.correctOptionId}" not present in options.`,
          );
        }
      }
    }
  }

  if (lessonTypeCounts.video === 0) {
    pushIssue(issues, "error", "Module must include at least one video lesson.");
  }
  if (lessonTypeCounts.interactive === 0) {
    pushIssue(issues, "error", "Module must include at least one interactive lesson.");
  }
  if (lessonTypeCounts.quiz === 0) {
    pushIssue(issues, "error", "Module must include at least one quiz lesson.");
  }

  const aidCoverage = lessonsWithAids / learningModule.lessons.length;
  if (aidCoverage < 0.5) {
    pushIssue(
      issues,
      "warn",
      `Learning aid coverage is ${(aidCoverage * 100).toFixed(0)}% (recommended at least 50%).`,
    );
  }

  if (!learningModule.learningObjectives || learningModule.learningObjectives.length < 2) {
    pushIssue(issues, "warn", "Module should define at least 2 learning objectives.");
  }

  return issues;
}

function main() {
  const modules = loadCatalogModules();
  const state = {
    moduleIds: new Map(),
    globalLessonIds: new Map(),
    moduleLookupKeys: new Map(),
    lessonLookupKeys: new Map(),
  };

  const byModule = [];
  let errorCount = 0;
  let warnCount = 0;

  for (const moduleEntry of modules) {
    const issues = validateModule(moduleEntry, state);
    for (const issue of issues) {
      if (issue.level === "error") errorCount += 1;
      if (issue.level === "warn") warnCount += 1;
    }
    byModule.push({
      moduleId: moduleEntry.module.id,
      fileName: moduleEntry.fileName,
      issues,
    });
  }

  const modulesWithIssues = byModule.filter((entry) => entry.issues.length > 0);

  console.log(`Validated ${modules.length} module(s).`);
  console.log(`Errors: ${errorCount}`);
  console.log(`Warnings: ${warnCount}`);

  if (modulesWithIssues.length > 0) {
    console.log("");
    console.log("Issue details:");
    for (const entry of modulesWithIssues) {
      console.log(`- ${entry.moduleId} (${entry.fileName})`);
      for (const issue of entry.issues) {
        console.log(`  [${issue.level.toUpperCase()}] ${issue.message}`);
      }
    }
  }

  if (errorCount > 0) {
    process.exitCode = 1;
  }
}

main();
