import type { LearningModule } from "@/lib/modules/types";
import type { MasterySkillGraph } from "@/lib/mastery/skill-graph";

export type ReviewProgressRow = {
  lesson_id: string;
  next_review_at: string | null;
  last_reviewed_at?: string | null;
  repetitions?: number | null;
  interval?: number | null;
  easiness_factor?: number | null;
};

export type ReviewMasteryRow = {
  skill_id: string;
  mastery_level: number | null;
};

export type ReviewQueueItem = {
  lessonId: string;
  lessonTitle: string;
  moduleId: string;
  moduleTitle: string;
  subject: string;
  dueAt: string | null;
  overdueDays: number;
  repetitions: number;
  intervalDays: number;
  easinessFactor: number;
  rawConfidence: number;
  decayedConfidence: number;
  decayPercent: number;
  priorityScore: number;
  blockedByPrerequisites: boolean;
  prerequisiteSkillIds: string[];
  missingPrerequisiteSkillIds: string[];
  suggestedPrerequisiteLessonIds: string[];
  lessonSkillIds: string[];
  reason: string;
};

export type ReviewQueueSummary = {
  dueLessonCount: number;
  queueLength: number;
  blockedLessonCount: number;
  averageDecayPercent: number;
  averageConfidence: number;
  averageDecayedConfidence: number;
  topOverdueLessons: Array<{
    lessonId: string;
    overdueDays: number;
    priorityScore: number;
  }>;
};

export type ReviewQueueResult = {
  queue: ReviewQueueItem[];
  summary: ReviewQueueSummary;
};

type BuildReviewQueueInput = {
  learningModules: LearningModule[];
  skillGraph: MasterySkillGraph;
  progressRows: ReviewProgressRow[];
  masteryRows: ReviewMasteryRow[];
  maxItems?: number;
  includeBlocked?: boolean;
  nowMs?: number;
};

type LessonContext = {
  lessonId: string;
  lessonTitle: string;
  moduleId: string;
  moduleTitle: string;
  subject: string;
};

const DEFAULT_CONFIDENCE = 0.55;
const MIN_PREREQUISITE_MASTERY = 0.6;

function clampScore(value: number, min = 0, max = 1) {
  if (!Number.isFinite(value)) return min;
  return Math.max(min, Math.min(max, value));
}

function round(value: number, digits = 2) {
  const factor = 10 ** digits;
  return Math.round(value * factor) / factor;
}

function toTimestamp(value: string | null | undefined) {
  if (!value) return null;
  const timestamp = new Date(value).getTime();
  return Number.isFinite(timestamp) ? timestamp : null;
}

function isReviewDue(nextReviewAt: string | null | undefined, nowMs: number) {
  const timestamp = toTimestamp(nextReviewAt);
  return timestamp !== null && timestamp <= nowMs;
}

function toOverdueDays(nextReviewAt: string | null | undefined, nowMs: number) {
  const timestamp = toTimestamp(nextReviewAt);
  if (timestamp === null || timestamp >= nowMs) return 0;
  const overdueMs = nowMs - timestamp;
  return Math.max(0, Math.floor(overdueMs / (1000 * 60 * 60 * 24)));
}

function buildLessonContextMap(learningModules: LearningModule[]) {
  const lessonContext = new Map<string, LessonContext>();
  for (const learningModule of learningModules) {
    for (const lesson of learningModule.lessons) {
      lessonContext.set(lesson.id, {
        lessonId: lesson.id,
        lessonTitle: lesson.title,
        moduleId: learningModule.id,
        moduleTitle: learningModule.title,
        subject: learningModule.subject,
      });
    }
  }
  return lessonContext;
}

function buildLessonSkillMaps(skillGraph: MasterySkillGraph) {
  const lessonSkillIds = new Map<string, Set<string>>();
  const prerequisiteSkillIds = new Map<string, Set<string>>();
  const prerequisiteLessonIds = new Map<string, Set<string>>();

  const nodesById = new Map(skillGraph.nodes.map((node) => [node.id, node] as const));
  const skillToLessons = new Map<string, string[]>();

  for (const node of skillGraph.nodes) {
    skillToLessons.set(node.id, node.lessonIds);
    for (const lessonId of node.lessonIds) {
      const lessonSkills = lessonSkillIds.get(lessonId) ?? new Set<string>();
      lessonSkills.add(node.id);
      lessonSkillIds.set(lessonId, lessonSkills);
    }
  }

  for (const [lessonId, skillIds] of lessonSkillIds.entries()) {
    const prerequisites = prerequisiteSkillIds.get(lessonId) ?? new Set<string>();
    const prereqLessons = prerequisiteLessonIds.get(lessonId) ?? new Set<string>();

    for (const skillId of skillIds) {
      const node = nodesById.get(skillId);
      if (!node) continue;
      for (const prerequisiteSkillId of node.prerequisiteSkillIds) {
        prerequisites.add(prerequisiteSkillId);
        const lessonsTeachingPrereq = skillToLessons.get(prerequisiteSkillId) ?? [];
        for (const prerequisiteLessonId of lessonsTeachingPrereq) {
          if (prerequisiteLessonId !== lessonId) {
            prereqLessons.add(prerequisiteLessonId);
          }
        }
      }
    }

    prerequisiteSkillIds.set(lessonId, prerequisites);
    prerequisiteLessonIds.set(lessonId, prereqLessons);
  }

  return {
    lessonSkillIds,
    prerequisiteSkillIds,
    prerequisiteLessonIds,
  };
}

function computeRawConfidence(input: {
  lessonSkillIds: string[];
  masteryBySkill: Map<string, number>;
  easinessFactor: number;
  repetitions: number;
}) {
  const { lessonSkillIds, masteryBySkill, easinessFactor, repetitions } = input;

  if (lessonSkillIds.length === 0) {
    const easinessSignal = clampScore((easinessFactor - 1.3) / 2.4, 0, 1);
    const repetitionSignal = clampScore(repetitions / 8, 0, 1);
    return round((easinessSignal * 0.65) + (repetitionSignal * 0.35));
  }

  const masteryScores = lessonSkillIds
    .map((skillId) => masteryBySkill.get(skillId))
    .filter((value): value is number => Number.isFinite(value));

  if (masteryScores.length === 0) return DEFAULT_CONFIDENCE;
  const averageMastery = masteryScores.reduce((sum, score) => sum + score, 0) / masteryScores.length;
  return round(clampScore(averageMastery));
}

function computeDecayPercent(overdueDays: number, repetitions: number) {
  if (overdueDays <= 0) return 0;

  // Higher repetition lessons decay slower, but never reach zero decay.
  const repetitionProtection = clampScore(repetitions / 12, 0, 0.55);
  const baseDecay = overdueDays * 0.035;
  const adjustedDecay = baseDecay * (1 - repetitionProtection);
  return round(clampScore(adjustedDecay, 0, 0.85));
}

function computePriorityScore(input: {
  overdueDays: number;
  rawConfidence: number;
  decayedConfidence: number;
  repetitions: number;
  blockedByPrerequisites: boolean;
}) {
  const { overdueDays, rawConfidence, decayedConfidence, repetitions, blockedByPrerequisites } = input;

  let score = 0;
  score += Math.min(40, overdueDays * 2.5);
  score += (1 - decayedConfidence) * 35;
  score += (1 - rawConfidence) * 15;

  if (repetitions < 2) score += 4;
  if (blockedByPrerequisites) score -= 8;

  return round(Math.max(0, score));
}

function dependencyAwareSort(queue: ReviewQueueItem[]) {
  const byLessonId = new Map(queue.map((item) => [item.lessonId, item] as const));

  function itemDependsOn(left: ReviewQueueItem, right: ReviewQueueItem) {
    if (left.lessonId === right.lessonId) return false;
    return left.suggestedPrerequisiteLessonIds.includes(right.lessonId);
  }

  return [...queue].sort((left, right) => {
    if (itemDependsOn(left, right)) return 1;
    if (itemDependsOn(right, left)) return -1;
    if (left.blockedByPrerequisites !== right.blockedByPrerequisites) {
      return Number(left.blockedByPrerequisites) - Number(right.blockedByPrerequisites);
    }
    if (right.priorityScore !== left.priorityScore) {
      return right.priorityScore - left.priorityScore;
    }
    return left.lessonTitle.localeCompare(right.lessonTitle);
  }).filter((item) => byLessonId.has(item.lessonId));
}

export function buildDailyReviewQueue({
  learningModules,
  skillGraph,
  progressRows,
  masteryRows,
  maxItems = 24,
  includeBlocked = true,
  nowMs = Date.now(),
}: BuildReviewQueueInput): ReviewQueueResult {
  const lessonContext = buildLessonContextMap(learningModules);
  const { lessonSkillIds, prerequisiteSkillIds, prerequisiteLessonIds } = buildLessonSkillMaps(skillGraph);
  const masteryBySkill = new Map(
    masteryRows.map((row) => [row.skill_id, clampScore(Number(row.mastery_level ?? 0))] as const),
  );

  const dueRows = progressRows.filter((row) => isReviewDue(row.next_review_at, nowMs));
  const queueItems: ReviewQueueItem[] = [];

  for (const row of dueRows) {
    const context = lessonContext.get(row.lesson_id);
    if (!context) continue;

    const lessonSkills = [...(lessonSkillIds.get(row.lesson_id) ?? new Set<string>())];
    const prereqSkills = [...(prerequisiteSkillIds.get(row.lesson_id) ?? new Set<string>())];
    const prereqLessons = [...(prerequisiteLessonIds.get(row.lesson_id) ?? new Set<string>())];

    const missingPrereqSkills = prereqSkills.filter((skillId) => {
      const mastery = masteryBySkill.get(skillId);
      return (mastery ?? 0) < MIN_PREREQUISITE_MASTERY;
    });
    const blockedByPrerequisites = missingPrereqSkills.length > 0;

    const repetitions = Math.max(0, Math.trunc(Number(row.repetitions ?? 0)));
    const intervalDays = Math.max(0, Math.trunc(Number(row.interval ?? 0)));
    const easinessFactor = clampScore(Number(row.easiness_factor ?? 2.5), 1.3, 3.5);

    const overdueDays = toOverdueDays(row.next_review_at, nowMs);
    const rawConfidence = computeRawConfidence({
      lessonSkillIds: lessonSkills,
      masteryBySkill,
      easinessFactor,
      repetitions,
    });
    const decayPercent = computeDecayPercent(overdueDays, repetitions);
    const decayedConfidence = round(rawConfidence * (1 - decayPercent));
    const priorityScore = computePriorityScore({
      overdueDays,
      rawConfidence,
      decayedConfidence,
      repetitions,
      blockedByPrerequisites,
    });

    if (!includeBlocked && blockedByPrerequisites) {
      continue;
    }

    const reasonParts: string[] = [];
    if (overdueDays > 0) {
      reasonParts.push(`overdue ${overdueDays} day${overdueDays === 1 ? "" : "s"}`);
    }
    if (decayPercent > 0) {
      reasonParts.push(`confidence decay ${Math.round(decayPercent * 100)}%`);
    }
    if (blockedByPrerequisites) {
      reasonParts.push(`${missingPrereqSkills.length} missing prerequisite skill${missingPrereqSkills.length === 1 ? "" : "s"}`);
    }
    if (reasonParts.length === 0) {
      reasonParts.push("due for scheduled review");
    }

    queueItems.push({
      lessonId: context.lessonId,
      lessonTitle: context.lessonTitle,
      moduleId: context.moduleId,
      moduleTitle: context.moduleTitle,
      subject: context.subject,
      dueAt: row.next_review_at,
      overdueDays,
      repetitions,
      intervalDays,
      easinessFactor: round(easinessFactor),
      rawConfidence,
      decayedConfidence,
      decayPercent,
      priorityScore,
      blockedByPrerequisites,
      prerequisiteSkillIds: prereqSkills,
      missingPrerequisiteSkillIds: missingPrereqSkills,
      suggestedPrerequisiteLessonIds: prereqLessons,
      lessonSkillIds: lessonSkills,
      reason: reasonParts.join("; "),
    });
  }

  const ordered = dependencyAwareSort(queueItems);
  const clampedMaxItems = Math.max(1, Math.min(100, Math.trunc(maxItems)));
  const queue = ordered.slice(0, clampedMaxItems);

  const blockedLessonCount = queue.filter((item) => item.blockedByPrerequisites).length;
  const averageDecayPercent =
    queue.length > 0
      ? round(queue.reduce((sum, item) => sum + item.decayPercent, 0) / queue.length)
      : 0;
  const averageConfidence =
    queue.length > 0
      ? round(queue.reduce((sum, item) => sum + item.rawConfidence, 0) / queue.length)
      : 0;
  const averageDecayedConfidence =
    queue.length > 0
      ? round(queue.reduce((sum, item) => sum + item.decayedConfidence, 0) / queue.length)
      : 0;

  return {
    queue,
    summary: {
      dueLessonCount: dueRows.length,
      queueLength: queue.length,
      blockedLessonCount,
      averageDecayPercent,
      averageConfidence,
      averageDecayedConfidence,
      topOverdueLessons: [...queue]
        .sort((a, b) => b.overdueDays - a.overdueDays || b.priorityScore - a.priorityScore)
        .slice(0, 5)
        .map((item) => ({
          lessonId: item.lessonId,
          overdueDays: item.overdueDays,
          priorityScore: item.priorityScore,
        })),
    },
  };
}
