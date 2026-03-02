import { inferEducationStageId } from "@/lib/explorer/learning-paths";
import {
  normalizePlacementStageId,
  type PlacementStageId,
} from "@/lib/ai/placement-diagnostic-scoring";

export type PlacementHistoryEventType = "diagnostic_submitted" | "manual_override";

export type PlacementHistoryEventLike = {
  profile_id: string;
  event_type: PlacementHistoryEventType;
};

export type PlacementSummaryProfileInput = {
  gradeLevel: string | null;
  ageYears: number | null;
  initialAssessmentStatus: string | null;
  initialAssessmentData: unknown;
  aiSkillLevelMap: unknown;
  updatedAt: string;
};

export type PlacementAssessmentSummary = {
  version: string | null;
  stageId: PlacementStageId | null;
  recommendedStageId: PlacementStageId | null;
  completedAt: string | null;
  responseCount: number;
  correctCount: number;
  score: number | null;
};

export type PlacementSummaryProjection = {
  initialAssessmentStatus: string;
  hasPlacementDiagnostic: boolean;
  inferredStageId: PlacementStageId;
  startingStageId: PlacementStageId;
  recommendedStageId: PlacementStageId;
  confidence: number | null;
  manualOverrideStageId: PlacementStageId | null;
  manualOverrideAt: string | null;
  manualOverrideReason: string | null;
  updatedAt: string;
  assessment: PlacementAssessmentSummary;
};

export function toPlacementRecord(value: unknown): Record<string, unknown> {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return {};
  }
  return value as Record<string, unknown>;
}

export function toPlacementNumber(value: unknown) {
  const numeric = Number(value);
  return Number.isFinite(numeric) ? numeric : null;
}

export function toPlacementString(value: unknown) {
  return typeof value === "string" && value.trim().length > 0 ? value.trim() : null;
}

export function toPlacementStageId(value: unknown): PlacementStageId | null {
  if (typeof value !== "string") return null;
  return normalizePlacementStageId(value);
}

export function summarizePlacementAssessmentData(value: unknown): PlacementAssessmentSummary {
  const record = toPlacementRecord(value);
  const responsesRaw = Array.isArray(record.responses) ? record.responses : [];
  const responseCount = responsesRaw.length;

  let correctCount = 0;
  for (const row of responsesRaw) {
    const rowRecord = toPlacementRecord(row);
    const isCorrect = rowRecord.isCorrect ?? rowRecord.is_correct;
    if (isCorrect === true) {
      correctCount += 1;
    }
  }

  const scoreRaw = toPlacementNumber(record.score);
  const score =
    scoreRaw !== null
      ? Math.max(0, Math.min(1, scoreRaw))
      : responseCount > 0
        ? correctCount / responseCount
        : null;

  return {
    version: toPlacementString(record.version),
    stageId: toPlacementStageId(record.stage_id),
    recommendedStageId: toPlacementStageId(record.recommended_stage_id),
    completedAt: toPlacementString(record.completed_at),
    responseCount,
    correctCount,
    score,
  };
}

export function buildPlacementOverrideSkillMap(input: {
  existingSkillMap: unknown;
  overrideStageId: PlacementStageId;
  reason?: string | null;
  overrideAtIso?: string;
}) {
  const overrideAtIso = input.overrideAtIso ?? new Date().toISOString();
  const existingSkillMap = toPlacementRecord(input.existingSkillMap);
  const existingPlacementDiagnostic = toPlacementRecord(existingSkillMap.placement_diagnostic);

  return {
    ...existingSkillMap,
    placement_diagnostic: {
      ...existingPlacementDiagnostic,
      recommended_stage_id: input.overrideStageId,
      manual_override_stage_id: input.overrideStageId,
      manual_override_reason: input.reason ?? null,
      manual_override_at: overrideAtIso,
    },
    placement_stage_id: input.overrideStageId,
    manual_override_stage_id: input.overrideStageId,
    manual_override_reason: input.reason ?? null,
    manual_override_at: overrideAtIso,
    placement_updated_at: overrideAtIso,
  };
}

export function buildPlacementSummary(profile: PlacementSummaryProfileInput): PlacementSummaryProjection {
  const skillMap = toPlacementRecord(profile.aiSkillLevelMap);
  const placementDiagnostic = toPlacementRecord(skillMap.placement_diagnostic);
  const assessment = summarizePlacementAssessmentData(profile.initialAssessmentData);

  const inferredStageId = normalizePlacementStageId(
    inferEducationStageId({
      age_years: profile.ageYears,
      gradeLevel: profile.gradeLevel,
    }),
  );

  const manualOverrideStageId =
    toPlacementStageId(skillMap.manual_override_stage_id) ??
    toPlacementStageId(placementDiagnostic.manual_override_stage_id);
  const manualOverrideAt =
    toPlacementString(skillMap.manual_override_at) ??
    toPlacementString(placementDiagnostic.manual_override_at);
  const manualOverrideReason =
    toPlacementString(skillMap.manual_override_reason) ??
    toPlacementString(placementDiagnostic.manual_override_reason);

  const recommendedStageId =
    manualOverrideStageId ??
    toPlacementStageId(placementDiagnostic.recommended_stage_id) ??
    toPlacementStageId(skillMap.placement_stage_id) ??
    assessment.recommendedStageId ??
    inferredStageId;

  const startingStageId =
    toPlacementStageId(placementDiagnostic.stage_id) ??
    assessment.stageId ??
    inferredStageId;

  const confidence =
    toPlacementNumber(placementDiagnostic.confidence) ??
    toPlacementNumber(skillMap.placement_confidence);

  const hasPlacementDiagnostic = Boolean(
    manualOverrideStageId ||
    placementDiagnostic.recommended_stage_id ||
    placementDiagnostic.stage_id ||
    skillMap.placement_stage_id,
  );

  return {
    initialAssessmentStatus: profile.initialAssessmentStatus ?? "pending",
    hasPlacementDiagnostic,
    inferredStageId,
    startingStageId,
    recommendedStageId,
    confidence,
    manualOverrideStageId,
    manualOverrideAt,
    manualOverrideReason,
    updatedAt:
      toPlacementString(skillMap.placement_updated_at) ??
      manualOverrideAt ??
      assessment.completedAt ??
      profile.updatedAt,
    assessment,
  };
}

export function buildPlacementHistorySummary(events: PlacementHistoryEventLike[]) {
  return events.reduce(
    (accumulator, row) => {
      accumulator.total += 1;
      if (row.event_type === "diagnostic_submitted") {
        accumulator.diagnosticSubmittedCount += 1;
      } else if (row.event_type === "manual_override") {
        accumulator.manualOverrideCount += 1;
      }
      return accumulator;
    },
    { total: 0, diagnosticSubmittedCount: 0, manualOverrideCount: 0 },
  );
}

export function filterPlacementHistoryRows<T extends PlacementHistoryEventLike>(
  rows: T[],
  filters: {
    profileId?: string;
    eventType?: PlacementHistoryEventType;
    limit: number;
  },
) {
  let filtered = rows;
  if (filters.profileId) {
    filtered = filtered.filter((row) => row.profile_id === filters.profileId);
  }
  if (filters.eventType) {
    filtered = filtered.filter((row) => row.event_type === filters.eventType);
  }
  return filtered.slice(0, filters.limit);
}
