export const PLACEMENT_STAGE_IDS = [
  "pre-k",
  "early-elem",
  "upper-elem",
  "middle",
  "high",
  "college",
] as const;

export type PlacementStageId = (typeof PLACEMENT_STAGE_IDS)[number];

const STAGE_INDEX: Record<PlacementStageId, number> = {
  "pre-k": 0,
  "early-elem": 1,
  "upper-elem": 2,
  "middle": 3,
  "high": 4,
  "college": 5,
};

function clamp(value: number, min = 0, max = 1) {
  if (!Number.isFinite(value)) return min;
  return Math.max(min, Math.min(max, value));
}

function round(value: number, digits = 3) {
  const factor = 10 ** digits;
  return Math.round(value * factor) / factor;
}

export function isPlacementStageId(value: string): value is PlacementStageId {
  return PLACEMENT_STAGE_IDS.includes(value as PlacementStageId);
}

export function normalizePlacementStageId(value: string | null | undefined): PlacementStageId {
  if (typeof value !== "string" || value.length === 0) return "middle";
  return isPlacementStageId(value) ? value : "middle";
}

export function calculatePlacementConfidence(input: {
  validResponseCount: number;
  uniqueSkillCount: number;
  uniqueModuleCount: number;
  invalidResponseCount: number;
}) {
  const coverageSignal = clamp(input.validResponseCount / 12);
  const skillSignal = clamp(input.uniqueSkillCount / 10);
  const moduleSignal = clamp(input.uniqueModuleCount / 6);
  const invalidPenalty = Math.min(0.25, input.invalidResponseCount * 0.02);

  const confidenceRaw =
    0.42 +
    (coverageSignal * 0.28) +
    (skillSignal * 0.2) +
    (moduleSignal * 0.15) -
    invalidPenalty;

  return round(clamp(confidenceRaw, 0.2, 0.98), 3);
}

export function recommendPlacementStage(input: {
  startingStageId: PlacementStageId;
  score: number;
  confidence: number;
}): PlacementStageId {
  const currentIndex = STAGE_INDEX[input.startingStageId];
  if (input.confidence < 0.55) {
    return input.startingStageId;
  }

  if (input.score >= 0.85) {
    const index = Math.min(PLACEMENT_STAGE_IDS.length - 1, currentIndex + 1);
    return PLACEMENT_STAGE_IDS[index]!;
  }
  if (input.score <= 0.35) {
    const index = Math.max(0, currentIndex - 1);
    return PLACEMENT_STAGE_IDS[index]!;
  }
  return input.startingStageId;
}

export function toRoundedScore(value: number) {
  return round(value, 3);
}
