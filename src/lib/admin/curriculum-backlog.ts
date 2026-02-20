import type { CurriculumSummary } from "@/lib/admin/curriculum-summary";

export type CurriculumBacklogWorkstream = "curriculum" | "exam-prep" | "quality";
export type CurriculumBacklogPriority = "high" | "medium" | "low";

export type CurriculumBacklogItem = {
  workstream: CurriculumBacklogWorkstream;
  itemType: "coverage_gap" | "exam_track_gap" | "module_remediation";
  priority: CurriculumBacklogPriority;
  key: string;
  gradeBand: string;
  subject: string;
  moduleId: string;
  moduleTitle: string;
  track: string;
  region: string;
  missingCount: number | null;
  existingCount: number | null;
  targetCount: number | null;
  score: number | null;
  details: string;
};

export type CurriculumBacklogSummary = {
  total: number;
  byWorkstream: Record<CurriculumBacklogWorkstream, number>;
  byPriority: Record<CurriculumBacklogPriority, number>;
};

function priorityWeight(priority: CurriculumBacklogPriority) {
  if (priority === "high") return 0;
  if (priority === "medium") return 1;
  return 2;
}

function csvEscape(value: string) {
  if (value.includes(",") || value.includes("\"") || value.includes("\n")) {
    return `"${value.replaceAll("\"", "\"\"")}"`;
  }
  return value;
}

export function buildCurriculumBacklog(summary: CurriculumSummary): CurriculumBacklogItem[] {
  const items: CurriculumBacklogItem[] = [];

  const coverageRows = summary.expansion.targets
    .filter((row) => row.missingCount > 0)
    .sort((a, b) => b.missingCount - a.missingCount || a.gradeBand.localeCompare(b.gradeBand));
  for (const row of coverageRows) {
    const priority: CurriculumBacklogPriority =
      row.missingCount >= Math.ceil(row.targetCount * 0.8) ? "high" : "medium";
    items.push({
      workstream: "curriculum",
      itemType: "coverage_gap",
      priority,
      key: `${row.gradeBand}::${row.subject}`,
      gradeBand: row.gradeBand,
      subject: row.subject,
      moduleId: "",
      moduleTitle: "",
      track: "",
      region: "",
      missingCount: row.missingCount,
      existingCount: row.existingCount,
      targetCount: row.targetCount,
      score: null,
      details: "Create lessons to close grade/subject coverage gap.",
    });
  }

  for (const missingTrack of summary.examPrep.missingTracks) {
    items.push({
      workstream: "exam-prep",
      itemType: "exam_track_gap",
      priority: "high",
      key: missingTrack.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      gradeBand: "",
      subject: "exam-prep",
      moduleId: "",
      moduleTitle: "",
      track: missingTrack,
      region: "",
      missingCount: 1,
      existingCount: 0,
      targetCount: 1,
      score: null,
      details: `Create full prep track for ${missingTrack}.`,
    });
  }

  const remediationRows = summary.quality.topPriorityModules
    .filter((row) => row.priority === "high" || row.priority === "medium")
    .sort((a, b) => a.score - b.score || a.moduleId.localeCompare(b.moduleId));
  for (const row of remediationRows) {
    const priority = row.priority === "high" ? "high" : "medium";
    items.push({
      workstream: "quality",
      itemType: "module_remediation",
      priority,
      key: row.moduleId,
      gradeBand: "",
      subject: row.subject,
      moduleId: row.moduleId,
      moduleTitle: row.title,
      track: "",
      region: "",
      missingCount: null,
      existingCount: null,
      targetCount: null,
      score: row.score,
      details: row.issues.slice(0, 3).join(" | "),
    });
  }

  return items.sort((a, b) => {
    const priorityCmp = priorityWeight(a.priority) - priorityWeight(b.priority);
    if (priorityCmp !== 0) return priorityCmp;
    if (a.missingCount !== null && b.missingCount !== null) {
      const missingCmp = b.missingCount - a.missingCount;
      if (missingCmp !== 0) return missingCmp;
    }
    if (a.score !== null && b.score !== null) {
      const scoreCmp = a.score - b.score;
      if (scoreCmp !== 0) return scoreCmp;
    }
    return a.key.localeCompare(b.key);
  });
}

export function summarizeCurriculumBacklog(items: CurriculumBacklogItem[]): CurriculumBacklogSummary {
  const summary: CurriculumBacklogSummary = {
    total: items.length,
    byWorkstream: {
      curriculum: 0,
      "exam-prep": 0,
      quality: 0,
    },
    byPriority: {
      high: 0,
      medium: 0,
      low: 0,
    },
  };

  for (const item of items) {
    summary.byWorkstream[item.workstream] += 1;
    summary.byPriority[item.priority] += 1;
  }

  return summary;
}

export function curriculumBacklogToCsv(items: CurriculumBacklogItem[]) {
  const lines = [
    [
      "workstream",
      "item_type",
      "priority",
      "key",
      "grade_band",
      "subject",
      "module_id",
      "module_title",
      "track",
      "region",
      "missing_count",
      "existing_count",
      "target_count",
      "score",
      "details",
    ].join(","),
  ];

  for (const item of items) {
    lines.push(
      [
        item.workstream,
        item.itemType,
        item.priority,
        item.key,
        item.gradeBand,
        item.subject,
        item.moduleId,
        item.moduleTitle,
        item.track,
        item.region,
        item.missingCount === null ? "" : String(item.missingCount),
        item.existingCount === null ? "" : String(item.existingCount),
        item.targetCount === null ? "" : String(item.targetCount),
        item.score === null ? "" : String(item.score),
        item.details,
      ]
        .map((cell) => csvEscape(cell))
        .join(","),
    );
  }

  return lines.join("\n");
}
