import fs from "node:fs/promises";
import path from "node:path";

export type CoverageRow = {
  gradeBand: string;
  subject: string;
  count: number;
};

export type PlanRow = {
  gradeBand: string;
  subject: string;
  existingCount: number;
  targetCount: number;
  missingCount: number;
};

export type QualityRow = {
  moduleId: string;
  title: string;
  subject: string;
  score: number;
  priority: string;
  issues: string[];
};

export type CurriculumSummary = {
  generatedAt: string;
  reports: {
    coverageGeneratedAt: string | null;
    expansionGeneratedAt: string | null;
    qualityGeneratedAt: string | null;
    newestGeneratedAt: string | null;
    oldestGeneratedAt: string | null;
    staleAfterHours: number;
    stale: boolean;
  };
  coverage: {
    totalLessons: number;
    gradeSubjectSummary: CoverageRow[];
  };
  expansion: {
    targetPerSubjectPerGrade: number;
    targetRows: number;
    totalExisting: number;
    totalNeeded: number;
    totalUntracked: number;
    completionPercent: number;
    targets: PlanRow[];
    untrackedCoverage: Array<{ gradeBand: string; subject: string; count: number }>;
    missingByGradeBand: Array<{ gradeBand: string; missingCount: number }>;
    missingBySubject: Array<{ subject: string; missingCount: number }>;
  };
  quality: {
    modules: number;
    lessons: number;
    averageScore: number;
    highPriorityModules: number;
    mediumPriorityModules: number;
    lowPriorityModules: number;
    placeholderOptionCount: number;
    genericReflectionCount: number;
    topPriorityModules: QualityRow[];
  };
};

const DEFAULT_COVERAGE = {
  generatedAt: null,
  totalLessons: 0,
  gradeSubjectSummary: [] as CoverageRow[],
};

const DEFAULT_PLAN = {
  generatedAt: null,
  targetPerSubjectPerGrade: 10,
  totals: {
    targetRows: 0,
    totalExisting: 0,
    totalNeeded: 0,
    totalUntracked: 0,
  },
  targets: [] as PlanRow[],
  untrackedCoverage: [] as Array<{ gradeBand: string; subject: string; count: number }>,
};

const DEFAULT_QUALITY = {
  generatedAt: null,
  totals: {
    modules: 0,
    lessons: 0,
    averageScore: 0,
    highPriorityModules: 0,
    mediumPriorityModules: 0,
    lowPriorityModules: 0,
    placeholderOptionCount: 0,
    genericReflectionCount: 0,
  },
  topPriorityModules: [] as QualityRow[],
};

function isFiniteNumber(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value);
}

function parseJson(raw: string | null): unknown {
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function toIsoOrNull(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const timestamp = new Date(value);
  if (Number.isNaN(timestamp.getTime())) return null;
  return timestamp.toISOString();
}

function parseCoverage(value: unknown) {
  if (!value || typeof value !== "object") {
    return DEFAULT_COVERAGE;
  }

  const record = value as Record<string, unknown>;
  const rawRows = Array.isArray(record.gradeSubjectSummary) ? record.gradeSubjectSummary : [];
  const gradeSubjectSummary = rawRows
    .map((row) => {
      if (!row || typeof row !== "object") return null;
      const entry = row as Record<string, unknown>;
      return {
        gradeBand: typeof entry.gradeBand === "string" ? entry.gradeBand : "unknown",
        subject: typeof entry.subject === "string" ? entry.subject : "unknown",
        count: isFiniteNumber(entry.count) ? entry.count : 0,
      };
    })
    .filter((row): row is CoverageRow => row !== null);

  return {
    generatedAt: toIsoOrNull(record.generatedAt),
    totalLessons: isFiniteNumber(record.totalLessons) ? record.totalLessons : 0,
    gradeSubjectSummary,
  };
}

function parsePlan(value: unknown) {
  if (!value || typeof value !== "object") {
    return DEFAULT_PLAN;
  }

  const record = value as Record<string, unknown>;
  const totalsRecord =
    record.totals && typeof record.totals === "object"
      ? (record.totals as Record<string, unknown>)
      : {};
  const rawTargets = Array.isArray(record.targets) ? record.targets : [];
  const rawUntrackedCoverage = Array.isArray(record.untrackedCoverage) ? record.untrackedCoverage : [];
  const targets = rawTargets
    .map((row) => {
      if (!row || typeof row !== "object") return null;
      const entry = row as Record<string, unknown>;
      return {
        gradeBand: typeof entry.gradeBand === "string" ? entry.gradeBand : "unknown",
        subject: typeof entry.subject === "string" ? entry.subject : "unknown",
        existingCount: isFiniteNumber(entry.existingCount) ? entry.existingCount : 0,
        targetCount: isFiniteNumber(entry.targetCount) ? entry.targetCount : 0,
        missingCount: isFiniteNumber(entry.missingCount) ? entry.missingCount : 0,
      };
    })
    .filter((row): row is PlanRow => row !== null);
  const untrackedCoverage = rawUntrackedCoverage
    .map((row) => {
      if (!row || typeof row !== "object") return null;
      const entry = row as Record<string, unknown>;
      return {
        gradeBand: typeof entry.gradeBand === "string" ? entry.gradeBand : "unknown",
        subject: typeof entry.subject === "string" ? entry.subject : "unknown",
        count: isFiniteNumber(entry.count) ? entry.count : 0,
      };
    })
    .filter((row): row is { gradeBand: string; subject: string; count: number } => row !== null);

  return {
    generatedAt: toIsoOrNull(record.generatedAt),
    targetPerSubjectPerGrade: isFiniteNumber(record.targetPerSubjectPerGrade)
      ? record.targetPerSubjectPerGrade
      : 10,
    totals: {
      targetRows: isFiniteNumber(totalsRecord.targetRows) ? totalsRecord.targetRows : 0,
      totalExisting: isFiniteNumber(totalsRecord.totalExisting) ? totalsRecord.totalExisting : 0,
      totalNeeded: isFiniteNumber(totalsRecord.totalNeeded) ? totalsRecord.totalNeeded : 0,
      totalUntracked: isFiniteNumber(totalsRecord.totalUntracked) ? totalsRecord.totalUntracked : 0,
    },
    targets,
    untrackedCoverage,
  };
}

function parseQuality(value: unknown) {
  if (!value || typeof value !== "object") {
    return DEFAULT_QUALITY;
  }

  const record = value as Record<string, unknown>;
  const totalsRecord =
    record.totals && typeof record.totals === "object"
      ? (record.totals as Record<string, unknown>)
      : {};
  const rawTopPriorityModules = Array.isArray(record.topPriorityModules) ? record.topPriorityModules : [];
  const topPriorityModules = rawTopPriorityModules
    .map((row) => {
      if (!row || typeof row !== "object") return null;
      const entry = row as Record<string, unknown>;
      return {
        moduleId: typeof entry.moduleId === "string" ? entry.moduleId : "unknown",
        title: typeof entry.title === "string" ? entry.title : "Untitled module",
        subject: typeof entry.subject === "string" ? entry.subject : "Unknown",
        score: isFiniteNumber(entry.score) ? entry.score : 0,
        priority: typeof entry.priority === "string" ? entry.priority : "unknown",
        issues: Array.isArray(entry.issues) ? entry.issues.filter((issue): issue is string => typeof issue === "string") : [],
      };
    })
    .filter((row): row is QualityRow => row !== null);

  return {
    generatedAt: toIsoOrNull(record.generatedAt),
    totals: {
      modules: isFiniteNumber(totalsRecord.modules) ? totalsRecord.modules : 0,
      lessons: isFiniteNumber(totalsRecord.lessons) ? totalsRecord.lessons : 0,
      averageScore: isFiniteNumber(totalsRecord.averageScore) ? totalsRecord.averageScore : 0,
      highPriorityModules: isFiniteNumber(totalsRecord.highPriorityModules)
        ? totalsRecord.highPriorityModules
        : 0,
      mediumPriorityModules: isFiniteNumber(totalsRecord.mediumPriorityModules)
        ? totalsRecord.mediumPriorityModules
        : 0,
      lowPriorityModules: isFiniteNumber(totalsRecord.lowPriorityModules)
        ? totalsRecord.lowPriorityModules
        : 0,
      placeholderOptionCount: isFiniteNumber(totalsRecord.placeholderOptionCount)
        ? totalsRecord.placeholderOptionCount
        : 0,
      genericReflectionCount: isFiniteNumber(totalsRecord.genericReflectionCount)
        ? totalsRecord.genericReflectionCount
        : 0,
    },
    topPriorityModules,
  };
}

function ageHours(iso: string | null): number | null {
  if (!iso) return null;
  const timestamp = new Date(iso);
  if (Number.isNaN(timestamp.getTime())) return null;
  return (Date.now() - timestamp.getTime()) / 36e5;
}

export async function loadCurriculumSummary(rootDir: string = process.cwd()): Promise<CurriculumSummary> {
  const coveragePath = path.join(rootDir, "public", "CURRICULUM-COVERAGE-REPORT.json");
  const planPath = path.join(rootDir, "public", "CURRICULUM-EXPANSION-PLAN.json");
  const qualityPath = path.join(rootDir, "public", "CURRICULUM-QUALITY-REPORT.json");

  const [coverageRaw, planRaw, qualityRaw] = await Promise.all([
    fs.readFile(coveragePath, "utf8").catch(() => null),
    fs.readFile(planPath, "utf8").catch(() => null),
    fs.readFile(qualityPath, "utf8").catch(() => null),
  ]);

  const coverage = parseCoverage(parseJson(coverageRaw));
  const plan = parsePlan(parseJson(planRaw));
  const quality = parseQuality(parseJson(qualityRaw));

  const totalScope = plan.totals.totalExisting + plan.totals.totalNeeded;
  const completionPercent =
    totalScope > 0 ? Number(((plan.totals.totalExisting / totalScope) * 100).toFixed(2)) : 0;

  const missingByGradeBandMap = new Map<string, number>();
  const missingBySubjectMap = new Map<string, number>();
  for (const row of plan.targets) {
    if (row.missingCount <= 0) continue;
    missingByGradeBandMap.set(
      row.gradeBand,
      (missingByGradeBandMap.get(row.gradeBand) ?? 0) + row.missingCount,
    );
    missingBySubjectMap.set(
      row.subject,
      (missingBySubjectMap.get(row.subject) ?? 0) + row.missingCount,
    );
  }

  const missingByGradeBand = Array.from(missingByGradeBandMap.entries())
    .map(([gradeBand, missingCount]) => ({ gradeBand, missingCount }))
    .sort((a, b) => b.missingCount - a.missingCount || a.gradeBand.localeCompare(b.gradeBand));

  const missingBySubject = Array.from(missingBySubjectMap.entries())
    .map(([subject, missingCount]) => ({ subject, missingCount }))
    .sort((a, b) => b.missingCount - a.missingCount || a.subject.localeCompare(b.subject));

  const timestamps = [coverage.generatedAt, plan.generatedAt, quality.generatedAt].filter(
    (value): value is string => typeof value === "string" && value.length > 0,
  );
  const newestGeneratedAt =
    timestamps.length > 0
      ? timestamps
          .slice()
          .sort((a, b) => new Date(b).getTime() - new Date(a).getTime())[0]
      : null;
  const oldestGeneratedAt =
    timestamps.length > 0
      ? timestamps
          .slice()
          .sort((a, b) => new Date(a).getTime() - new Date(b).getTime())[0]
      : null;

  const staleAfterHours = 24;
  const newestAgeHours = ageHours(newestGeneratedAt);
  const stale = newestAgeHours === null || newestAgeHours > staleAfterHours;

  return {
    generatedAt: new Date().toISOString(),
    reports: {
      coverageGeneratedAt: coverage.generatedAt,
      expansionGeneratedAt: plan.generatedAt,
      qualityGeneratedAt: quality.generatedAt,
      newestGeneratedAt,
      oldestGeneratedAt,
      staleAfterHours,
      stale,
    },
    coverage: {
      totalLessons: coverage.totalLessons,
      gradeSubjectSummary: coverage.gradeSubjectSummary,
    },
    expansion: {
      targetPerSubjectPerGrade: plan.targetPerSubjectPerGrade,
      targetRows: plan.totals.targetRows,
      totalExisting: plan.totals.totalExisting,
      totalNeeded: plan.totals.totalNeeded,
      totalUntracked: plan.totals.totalUntracked,
      completionPercent,
      targets: plan.targets,
      untrackedCoverage: plan.untrackedCoverage,
      missingByGradeBand,
      missingBySubject,
    },
    quality: {
      modules: quality.totals.modules,
      lessons: quality.totals.lessons,
      averageScore: quality.totals.averageScore,
      highPriorityModules: quality.totals.highPriorityModules,
      mediumPriorityModules: quality.totals.mediumPriorityModules,
      lowPriorityModules: quality.totals.lowPriorityModules,
      placeholderOptionCount: quality.totals.placeholderOptionCount,
      genericReflectionCount: quality.totals.genericReflectionCount,
      topPriorityModules: quality.topPriorityModules,
    },
  };
}
