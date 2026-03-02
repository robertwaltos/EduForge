export type ExamErrorLogRow = {
  id: string;
  module_id: string | null;
  lesson_id: string;
  question_id: string;
  skill_id: string | null;
  error_type: string | null;
  question_text: string | null;
  notes: string | null;
  metadata: unknown;
  resolved: boolean;
  resolved_at: string | null;
  created_at: string | null;
  updated_at: string | null;
};

export type RemediationTaskPriority = "critical" | "high" | "medium" | "low";
export type RemediationTaskStatus = "open" | "completed";

export type RemediationTask = {
  taskId: string;
  status: RemediationTaskStatus;
  priority: RemediationTaskPriority;
  errorType: string;
  moduleId: string | null;
  lessonId: string;
  questionId: string;
  skillId: string | null;
  questionText: string | null;
  notes: string | null;
  sourceChunkId: string | null;
  sourceChunkIndex: number | null;
  createdAt: string | null;
  updatedAt: string | null;
  completedAt: string | null;
  reason: string;
};

export type RemediationTaskSummary = {
  totalCount: number;
  openCount: number;
  completedCount: number;
  byPriority: Record<RemediationTaskPriority, number>;
  byErrorType: Array<{ errorType: string; count: number }>;
  skillBacklog: Array<{ skillId: string; count: number }>;
};

export type BuildRemediationTasksResult = {
  tasks: RemediationTask[];
  summary: RemediationTaskSummary;
};

type BuildOptions = {
  includeCompleted?: boolean;
  maxItems?: number;
};

type ChunkRef = {
  chunkId: string | null;
  chunkIndex: number | null;
};

const DEFAULT_MAX_ITEMS = 100;

function clampInt(value: number, min: number, max: number) {
  if (!Number.isFinite(value)) return min;
  return Math.max(min, Math.min(max, Math.trunc(value)));
}

function readRecord(value: unknown): Record<string, unknown> | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  return value as Record<string, unknown>;
}

function parseChunkRef(metadata: unknown): ChunkRef {
  const record = readRecord(metadata);
  if (!record) {
    return { chunkId: null, chunkIndex: null };
  }

  const chunkId = typeof record.chunkId === "string" && record.chunkId.trim().length > 0
    ? record.chunkId.trim()
    : null;

  const rawChunkIndex = record.chunkIndex;
  const numericChunkIndex = Number(rawChunkIndex);
  const chunkIndex = Number.isFinite(numericChunkIndex) && numericChunkIndex >= 0
    ? Math.trunc(numericChunkIndex)
    : null;

  return { chunkId, chunkIndex };
}

function toTimestamp(value: string | null | undefined) {
  if (!value) return 0;
  const timestamp = new Date(value).getTime();
  return Number.isFinite(timestamp) ? timestamp : 0;
}

function toPriority(row: ExamErrorLogRow): RemediationTaskPriority {
  if (row.resolved) return "low";

  const errorType = row.error_type ?? "incorrect_answer";
  if (errorType === "timed_out") return "critical";
  if (errorType === "strategy_gap" || errorType === "concept_gap") return "high";
  if (errorType === "careless_mistake") return "medium";
  return "medium";
}

function buildReason(row: ExamErrorLogRow, priority: RemediationTaskPriority) {
  const errorType = row.error_type ?? "incorrect_answer";
  if (row.resolved) {
    return "Completed remediation task from error log.";
  }
  if (priority === "critical" && errorType === "timed_out") {
    return "Timed-out error requires immediate pacing remediation.";
  }
  if (priority === "high" && errorType === "concept_gap") {
    return "Concept gap logged; revisit source lesson chunk and retry.";
  }
  if (priority === "high" && errorType === "strategy_gap") {
    return "Strategy gap logged; targeted remediation drill recommended.";
  }
  if (errorType === "careless_mistake") {
    return "Careless-mistake pattern logged; run a focused accuracy check.";
  }
  return "Wrong-answer remediation task generated from exam error log.";
}

function toTopErrorTypeCounts(counter: Map<string, number>, limit: number) {
  return Array.from(counter.entries())
    .sort((left, right) => right[1] - left[1] || left[0].localeCompare(right[0]))
    .slice(0, limit)
    .map(([errorType, count]) => ({ errorType, count }));
}

function toTopSkillCounts(counter: Map<string, number>, limit: number) {
  return Array.from(counter.entries())
    .sort((left, right) => right[1] - left[1] || left[0].localeCompare(right[0]))
    .slice(0, limit)
    .map(([skillId, count]) => ({ skillId, count }));
}

export function buildRemediationTasksFromErrors(
  rows: ExamErrorLogRow[],
  options: BuildOptions = {},
): BuildRemediationTasksResult {
  const includeCompleted = options.includeCompleted ?? false;
  const maxItems = clampInt(options.maxItems ?? DEFAULT_MAX_ITEMS, 1, 200);

  const priorityCounts: Record<RemediationTaskPriority, number> = {
    critical: 0,
    high: 0,
    medium: 0,
    low: 0,
  };
  const errorTypeCounts = new Map<string, number>();
  const skillCounts = new Map<string, number>();

  const tasks = rows
    .filter((row) => includeCompleted || !row.resolved)
    .map((row) => {
      const priority = toPriority(row);
      const { chunkId, chunkIndex } = parseChunkRef(row.metadata);
      const errorType = row.error_type ?? "incorrect_answer";

      priorityCounts[priority] += 1;
      errorTypeCounts.set(errorType, (errorTypeCounts.get(errorType) ?? 0) + 1);
      if (row.skill_id) {
        skillCounts.set(row.skill_id, (skillCounts.get(row.skill_id) ?? 0) + 1);
      }

      return {
        taskId: row.id,
        status: row.resolved ? "completed" : "open",
        priority,
        errorType,
        moduleId: row.module_id,
        lessonId: row.lesson_id,
        questionId: row.question_id,
        skillId: row.skill_id,
        questionText: row.question_text,
        notes: row.notes,
        sourceChunkId: chunkId,
        sourceChunkIndex: chunkIndex,
        createdAt: row.created_at,
        updatedAt: row.updated_at,
        completedAt: row.resolved_at,
        reason: buildReason(row, priority),
      } satisfies RemediationTask;
    })
    .sort((left, right) => {
      if (left.status !== right.status) {
        return Number(left.status === "completed") - Number(right.status === "completed");
      }

      const priorityOrder: Record<RemediationTaskPriority, number> = {
        critical: 4,
        high: 3,
        medium: 2,
        low: 1,
      };
      if (priorityOrder[left.priority] !== priorityOrder[right.priority]) {
        return priorityOrder[right.priority] - priorityOrder[left.priority];
      }

      return toTimestamp(right.createdAt) - toTimestamp(left.createdAt);
    })
    .slice(0, maxItems);

  const openCount = tasks.filter((task) => task.status === "open").length;
  const completedCount = tasks.length - openCount;

  return {
    tasks,
    summary: {
      totalCount: tasks.length,
      openCount,
      completedCount,
      byPriority: priorityCounts,
      byErrorType: toTopErrorTypeCounts(errorTypeCounts, 8),
      skillBacklog: toTopSkillCounts(skillCounts, 8),
    },
  };
}

export function buildSkillCreditMap(rows: ExamErrorLogRow[]) {
  const creditsBySkillId = new Map<string, number>();

  for (const row of rows) {
    if (row.resolved) continue;
    if (!row.skill_id) continue;
    const skillId = row.skill_id.trim();
    if (!skillId) continue;
    creditsBySkillId.set(skillId, (creditsBySkillId.get(skillId) ?? 0) + 1);
  }

  return creditsBySkillId;
}
