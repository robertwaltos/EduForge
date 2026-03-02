import type { LearningModule, Lesson } from "@/lib/modules/types";

export type SkillGraphEdgeKind = "lesson_sequence" | "explicit_prerequisite";

export type SkillGraphEdge = {
  fromSkillId: string;
  toSkillId: string;
  kind: SkillGraphEdgeKind;
  moduleId: string;
  lessonId: string;
};

export type SkillGraphNode = {
  id: string;
  label: string;
  moduleId: string;
  moduleTitle: string;
  subject: string;
  lessonIds: string[];
  questionCount: number;
  isFallback: boolean;
  prerequisiteSkillIds: string[];
};

export type ModuleSkillSummary = {
  moduleId: string;
  moduleTitle: string;
  subject: string;
  skillIds: string[];
  lessonIds: string[];
  explicitSkillCount: number;
  fallbackSkillCount: number;
};

export type SkillGraphCoverage = {
  totalModules: number;
  modulesWithAnySkills: number;
  modulesWithExplicitSkills: number;
  lessonsWithAnySkills: number;
  lessonsWithExplicitSkills: number;
  moduleExplicitSkillCoveragePercent: number;
};

export type MasterySkillGraph = {
  generatedAt: string;
  moduleCount: number;
  lessonCount: number;
  skillCount: number;
  edgeCount: number;
  coverage: SkillGraphCoverage;
  nodes: SkillGraphNode[];
  edges: SkillGraphEdge[];
  modules: ModuleSkillSummary[];
};

type InternalSkillGraphNode = Omit<SkillGraphNode, "prerequisiteSkillIds"> & {
  prerequisiteSkillIdsSet: Set<string>;
  lessonIdsSet: Set<string>;
};

function slugify(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function normalizeSkillId(value: string) {
  return value.trim();
}

function humanizeSkillId(skillId: string, fallbackLabel: string) {
  const normalized = skillId.trim();
  if (!normalized) return fallbackLabel;

  const tail = normalized.split(/[:/]/g).pop() ?? normalized;
  const stripped = tail
    .replace(/^skill[-_]?/i, "")
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  if (!stripped) return fallbackLabel;

  return stripped.replace(/\b\w/g, (char) => char.toUpperCase());
}

function toStringArray(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value
      .flatMap((entry) => toStringArray(entry))
      .filter((entry) => entry.length > 0);
  }

  if (typeof value === "string") {
    return value
      .split(",")
      .map((entry) => entry.trim())
      .filter((entry) => entry.length > 0);
  }

  return [];
}

function extractExplicitSkillIds(lesson: Lesson) {
  const skillIds = new Set<string>();
  for (const question of lesson.questions ?? []) {
    if (typeof question.skillId !== "string") continue;
    const normalized = normalizeSkillId(question.skillId);
    if (!normalized) continue;
    skillIds.add(normalized);
  }
  return [...skillIds];
}

function extractPrerequisiteSkillIds(lesson: Lesson) {
  const metadataRecord =
    lesson.metadata && typeof lesson.metadata === "object"
      ? (lesson.metadata as Record<string, unknown>)
      : null;
  const externalRecord =
    lesson.external && typeof lesson.external === "object"
      ? (lesson.external as Record<string, unknown>)
      : null;

  const rawValues = [
    metadataRecord?.prerequisites,
    metadataRecord?.prerequisiteSkills,
    metadataRecord?.requiredSkills,
    externalRecord?.prerequisites,
    externalRecord?.prerequisiteSkills,
  ];

  const prerequisiteIds = new Set<string>();
  for (const value of rawValues) {
    for (const entry of toStringArray(value)) {
      const normalized = normalizeSkillId(entry);
      if (!normalized) continue;
      prerequisiteIds.add(normalized);
    }
  }

  return [...prerequisiteIds];
}

function buildFallbackSkillId(moduleId: string, lesson: Lesson) {
  const lessonToken = slugify(lesson.title) || slugify(lesson.id) || "lesson";
  return `${moduleId}:lesson:${lessonToken}`;
}

function toCoveragePercent(count: number, total: number) {
  if (total <= 0) return 0;
  return Math.round((count / total) * 1000) / 10;
}

export function buildMasterySkillGraph(learningModules: LearningModule[]): MasterySkillGraph {
  const nowIso = new Date().toISOString();
  const nodesById = new Map<string, InternalSkillGraphNode>();
  const edges: SkillGraphEdge[] = [];
  const edgeKeys = new Set<string>();
  const moduleSummaries: ModuleSkillSummary[] = [];

  let lessonCount = 0;
  let lessonsWithAnySkills = 0;
  let lessonsWithExplicitSkills = 0;
  let modulesWithAnySkills = 0;
  let modulesWithExplicitSkills = 0;

  const getOrCreateNode = (input: {
    skillId: string;
    fallbackLabel: string;
    moduleId: string;
    moduleTitle: string;
    subject: string;
    lessonId: string;
    questionCount: number;
    isFallback: boolean;
  }) => {
    const existing = nodesById.get(input.skillId);
    if (existing) {
      existing.lessonIdsSet.add(input.lessonId);
      existing.questionCount += input.questionCount;
      if (!input.isFallback) {
        existing.isFallback = false;
      }
      return existing;
    }

    const node: InternalSkillGraphNode = {
      id: input.skillId,
      label: humanizeSkillId(input.skillId, input.fallbackLabel),
      moduleId: input.moduleId,
      moduleTitle: input.moduleTitle,
      subject: input.subject,
      lessonIds: [],
      lessonIdsSet: new Set([input.lessonId]),
      questionCount: input.questionCount,
      isFallback: input.isFallback,
      prerequisiteSkillIdsSet: new Set<string>(),
    };

    nodesById.set(input.skillId, node);
    return node;
  };

  const addEdge = (edge: SkillGraphEdge) => {
    if (!edge.fromSkillId || !edge.toSkillId) return;
    if (edge.fromSkillId === edge.toSkillId) return;

    const key = `${edge.kind}:${edge.fromSkillId}->${edge.toSkillId}:${edge.moduleId}:${edge.lessonId}`;
    if (edgeKeys.has(key)) return;
    edgeKeys.add(key);
    edges.push(edge);

    const targetNode = nodesById.get(edge.toSkillId);
    if (targetNode) {
      targetNode.prerequisiteSkillIdsSet.add(edge.fromSkillId);
    }
  };

  for (const learningModule of learningModules) {
    lessonCount += learningModule.lessons.length;

    const moduleSkillIds = new Set<string>();
    const moduleLessonIds = new Set<string>();
    let explicitSkillCount = 0;
    let fallbackSkillCount = 0;
    let previousLessonSkillIds: string[] = [];

    for (const lesson of learningModule.lessons) {
      moduleLessonIds.add(lesson.id);

      const explicitSkillIds = extractExplicitSkillIds(lesson);
      const lessonSkillIds =
        explicitSkillIds.length > 0
          ? explicitSkillIds
          : [buildFallbackSkillId(learningModule.id, lesson)];

      if (lessonSkillIds.length > 0) {
        lessonsWithAnySkills += 1;
      }
      if (explicitSkillIds.length > 0) {
        lessonsWithExplicitSkills += 1;
      }

      if (explicitSkillIds.length > 0) {
        explicitSkillCount += explicitSkillIds.length;
      } else {
        fallbackSkillCount += 1;
      }

      for (const skillId of lessonSkillIds) {
        const normalizedSkillId = normalizeSkillId(skillId);
        if (!normalizedSkillId) continue;

        const questionCount =
          explicitSkillIds.length > 0
            ? (lesson.questions ?? []).filter((question) => question.skillId === normalizedSkillId).length
            : (lesson.questions ?? []).length;

        getOrCreateNode({
          skillId: normalizedSkillId,
          fallbackLabel: `${lesson.title} Fundamentals`,
          moduleId: learningModule.id,
          moduleTitle: learningModule.title,
          subject: learningModule.subject,
          lessonId: lesson.id,
          questionCount,
          isFallback: explicitSkillIds.length === 0,
        });

        moduleSkillIds.add(normalizedSkillId);
      }

      if (previousLessonSkillIds.length > 0) {
        for (const previousSkillId of previousLessonSkillIds) {
          for (const currentSkillId of lessonSkillIds) {
            addEdge({
              fromSkillId: previousSkillId,
              toSkillId: currentSkillId,
              kind: "lesson_sequence",
              moduleId: learningModule.id,
              lessonId: lesson.id,
            });
          }
        }
      }
      previousLessonSkillIds = lessonSkillIds;

      const prerequisiteSkillIds = extractPrerequisiteSkillIds(lesson);
      if (prerequisiteSkillIds.length > 0) {
        for (const prerequisiteSkillId of prerequisiteSkillIds) {
          const normalizedPrerequisiteSkillId = normalizeSkillId(prerequisiteSkillId);
          if (!normalizedPrerequisiteSkillId) continue;
          for (const lessonSkillId of lessonSkillIds) {
            addEdge({
              fromSkillId: normalizedPrerequisiteSkillId,
              toSkillId: lessonSkillId,
              kind: "explicit_prerequisite",
              moduleId: learningModule.id,
              lessonId: lesson.id,
            });
          }
        }
      }
    }

    if (moduleSkillIds.size > 0) {
      modulesWithAnySkills += 1;
    }
    if (explicitSkillCount > 0) {
      modulesWithExplicitSkills += 1;
    }

    moduleSummaries.push({
      moduleId: learningModule.id,
      moduleTitle: learningModule.title,
      subject: learningModule.subject,
      skillIds: [...moduleSkillIds].sort((left, right) => left.localeCompare(right)),
      lessonIds: [...moduleLessonIds].sort((left, right) => left.localeCompare(right)),
      explicitSkillCount,
      fallbackSkillCount,
    });
  }

  const nodes: SkillGraphNode[] = [...nodesById.values()]
    .map((node) => ({
      id: node.id,
      label: node.label,
      moduleId: node.moduleId,
      moduleTitle: node.moduleTitle,
      subject: node.subject,
      lessonIds: [...node.lessonIdsSet].sort((left, right) => left.localeCompare(right)),
      questionCount: node.questionCount,
      isFallback: node.isFallback,
      prerequisiteSkillIds: [...node.prerequisiteSkillIdsSet].sort((left, right) =>
        left.localeCompare(right),
      ),
    }))
    .sort((left, right) => left.id.localeCompare(right.id));

  edges.sort((left, right) => {
    return (
      left.toSkillId.localeCompare(right.toSkillId) ||
      left.fromSkillId.localeCompare(right.fromSkillId) ||
      left.kind.localeCompare(right.kind) ||
      left.moduleId.localeCompare(right.moduleId) ||
      left.lessonId.localeCompare(right.lessonId)
    );
  });

  moduleSummaries.sort((left, right) => left.moduleId.localeCompare(right.moduleId));

  return {
    generatedAt: nowIso,
    moduleCount: learningModules.length,
    lessonCount,
    skillCount: nodes.length,
    edgeCount: edges.length,
    coverage: {
      totalModules: learningModules.length,
      modulesWithAnySkills,
      modulesWithExplicitSkills,
      lessonsWithAnySkills,
      lessonsWithExplicitSkills,
      moduleExplicitSkillCoveragePercent: toCoveragePercent(
        modulesWithExplicitSkills,
        learningModules.length,
      ),
    },
    nodes,
    edges,
    modules: moduleSummaries,
  };
}
