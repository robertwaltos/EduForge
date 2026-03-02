const DEFAULT_WEBHOOK_PROCESSING_LOCK_SECONDS = 120;

function toEpochMs(value: string | null | undefined) {
  if (typeof value !== "string" || value.trim().length === 0) {
    return null;
  }
  const parsed = Date.parse(value);
  return Number.isFinite(parsed) ? parsed : null;
}

export function isWebhookProcessingLockActive(input: {
  updatedAtIso: string | null | undefined;
  nowMs?: number;
  lockSeconds?: number;
}) {
  const updatedAtMs = toEpochMs(input.updatedAtIso);
  if (updatedAtMs === null) {
    return false;
  }

  const nowMs = Number.isFinite(input.nowMs) ? Number(input.nowMs) : Date.now();
  const lockSeconds = Number.isFinite(input.lockSeconds)
    ? Math.max(1, Number(input.lockSeconds))
    : DEFAULT_WEBHOOK_PROCESSING_LOCK_SECONDS;
  const ageMs = nowMs - updatedAtMs;
  return ageMs >= 0 && ageMs < lockSeconds * 1000;
}

export { DEFAULT_WEBHOOK_PROCESSING_LOCK_SECONDS };
