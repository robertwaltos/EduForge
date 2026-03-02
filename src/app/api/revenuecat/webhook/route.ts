import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { createClient } from '@supabase/supabase-js';
import { z } from 'zod';
import { toSafeErrorRecord } from '@/lib/logging/safe-error';
import { serverEnv } from '@/lib/config/env';
import { enforceIpRateLimit } from '@/lib/security/ip-rate-limit';
import { resolveRevenueCatPlanIdFromProductId } from '@/lib/billing/revenuecat-matrix';
import { isWebhookProcessingLockActive } from '@/lib/billing/webhook-processing-lock';

const shouldDebugWebhook = process.env.NODE_ENV !== 'production';
const MAX_REVENUECAT_WEBHOOK_PAYLOAD_BYTES = 512_000;
const MAX_REVENUECAT_APP_USER_ID_LENGTH = 128;
const MAX_REVENUECAT_PRODUCT_ID_LENGTH = 128;
const NON_MUTATING_REVENUECAT_EVENTS = new Set(['SUBSCRIBER_ALIAS']);
const PRODUCT_REQUIRED_REVENUECAT_EVENTS = new Set([
  'INITIAL_PURCHASE',
  'RENEWAL',
  'NON_RENEWING_PURCHASE',
  'PRODUCT_CHANGE',
]);
const timestampMsSchema = z.union([
  z.number().int().nonnegative(),
  z.string().regex(/^\d+$/).transform((value) => Number(value)),
]);

const revenueCatEventSchema = z.object({
  id: z.unknown().optional(),
  type: z.string().min(1),
  app_user_id: z.string().min(1),
  product_id: z.string().optional(),
  period_type: z.string().optional(),
  expiration_at_ms: timestampMsSchema.nullable().optional(),
  purchased_at_ms: timestampMsSchema.nullable().optional(),
  cancel_reason: z.string().nullable().optional(),
  store: z.string().optional(),
  environment: z.string().optional(),
});

const revenueCatWebhookSchema = z.object({
  event: revenueCatEventSchema,
});

type RevenueCatWebhookClaimResult = 'process' | 'duplicate' | 'untracked';

function isMissingTableError(message: string) {
  const lower = message.toLowerCase();
  return lower.includes('could not find the table') || (lower.includes('relation') && lower.includes('does not exist'));
}

function isDuplicateKeyError(code?: string | null) {
  return code === '23505';
}

function rateLimitExceededResponse(retryAfterSeconds: number) {
  return NextResponse.json(
    { error: 'Too many webhook requests. Please retry shortly.' },
    {
      status: 429,
      headers: {
        'Retry-After': String(retryAfterSeconds),
      },
    },
  );
}

function buildRevenueCatEventId(event: z.infer<typeof revenueCatEventSchema>, rawBody: string) {
  if (typeof event.id === 'string' && event.id.trim().length > 0) {
    return `rc:${event.id.trim()}`;
  }
  if (typeof event.id === 'number' && Number.isFinite(event.id)) {
    return `rc:${String(event.id)}`;
  }

  const digest = crypto.createHash('sha256').update(rawBody).digest('hex');
  return `sha256:${digest}`;
}

function toIsoFromEpochMs(value: number | null | undefined, fieldName: string) {
  if (value === null || value === undefined) {
    return null;
  }
  const numericValue = Number(value);
  if (!Number.isFinite(numericValue) || numericValue < 0 || numericValue > 8.64e15) {
    throw new Error(`Invalid ${fieldName} timestamp`);
  }
  return new Date(numericValue).toISOString();
}

/**
 * POST /api/revenuecat/webhook
 *
 * Handles RevenueCat server-side webhook events to keep the
 * Supabase `subscriptions` table in sync with purchase state.
 *
 * RevenueCat Webhook docs:
 * https://www.revenuecat.com/docs/integrations/webhooks
 *
 * Supported event types:
 *  - INITIAL_PURCHASE
 *  - RENEWAL
 *  - CANCELLATION
 *  - UNCANCELLATION
 *  - NON_RENEWING_PURCHASE
 *  - EXPIRATION
 *  - BILLING_ISSUE
 *  - PRODUCT_CHANGE
 *  - SUBSCRIBER_ALIAS
 *
 * Security:
 * 1) Prefer Authorization header verification using the shared value
 *    configured in RevenueCat Dashboard -> Integrations -> Webhooks.
 * 2) Keep legacy X-Revenuecat-Signature HMAC verification as fallback compatibility.
 */

// Lazy factory — avoid creating admin client at module scope (serverless cold start optimization)
function getSupabaseAdmin() {
  const url = serverEnv.NEXT_PUBLIC_SUPABASE_URL;
  const key = serverEnv.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("Missing SUPABASE env vars for RevenueCat webhook");
  return createClient(url, key);
}

function timingSafeEqualText(left: string, right: string): boolean {
  const leftBuffer = Buffer.from(left, 'utf8');
  const rightBuffer = Buffer.from(right, 'utf8');

  if (
    leftBuffer.length === 0
    || rightBuffer.length === 0
    || leftBuffer.length !== rightBuffer.length
  ) {
    return false;
  }

  return crypto.timingSafeEqual(leftBuffer, rightBuffer);
}

/**
 * RevenueCat's current webhook auth model supports a shared Authorization header.
 * Accept exact value match and bearer-token normalized match.
 */
function verifyRevenueCatAuthorizationHeader(
  authorizationHeader: string | null,
  secret: string
): boolean {
  if (!authorizationHeader || !secret) return false;

  const headerRaw = authorizationHeader.trim();
  const secretRaw = secret.trim();
  if (!headerRaw || !secretRaw) return false;

  const stripBearerPrefix = (value: string) => value.replace(/^Bearer\s+/i, '').trim();
  const headerToken = stripBearerPrefix(headerRaw);
  const secretToken = stripBearerPrefix(secretRaw);

  return (
    timingSafeEqualText(headerRaw, secretRaw)
    || timingSafeEqualText(headerToken, secretToken)
  );
}

/**
 * Legacy RevenueCat HMAC signature verification.
 */
function verifyRevenueCatHmacSignature(
  payload: string,
  signature: string | null,
  secret: string
): boolean {
  if (!signature) return false;

  const expectedHex = crypto
    .createHmac('sha256', secret)
    .update(payload)
    .digest('hex');

  try {
    const expected = Buffer.from(expectedHex, 'hex');
    const provided = Buffer.from(signature, 'hex');

    if (
      expected.length === 0
      || provided.length === 0
      || expected.length !== provided.length
    ) {
      return false;
    }

    return crypto.timingSafeEqual(expected, provided);
  } catch {
    return false;
  }
}

async function claimRevenueCatWebhookEvent(
  eventId: string,
  eventType: string,
): Promise<RevenueCatWebhookClaimResult> {
  const supabase = getSupabaseAdmin();
  const { data: existing, error: existingError } = await supabase
    .from('revenuecat_webhook_events')
    .select('event_id, status, attempt_count, updated_at')
    .eq('event_id', eventId)
    .maybeSingle();

  if (existingError) {
    if (isMissingTableError(existingError.message)) {
      return 'untracked';
    }
    throw existingError;
  }

  const now = new Date().toISOString();

  if (!existing) {
    const { error: insertError } = await supabase
      .from('revenuecat_webhook_events')
      .insert({
        event_id: eventId,
        event_type: eventType,
        status: 'processing',
        attempt_count: 1,
        updated_at: now,
      });

    if (!insertError) {
      return 'process';
    }
    if (isMissingTableError(insertError.message)) {
      return 'untracked';
    }
    if (isDuplicateKeyError(insertError.code)) {
      return 'duplicate';
    }
    throw insertError;
  }

  if (existing.status === 'processed') {
    return 'duplicate';
  }
  if (
    existing.status === 'processing' &&
    isWebhookProcessingLockActive({ updatedAtIso: existing.updated_at })
  ) {
    return 'duplicate';
  }

  const nextAttempt = Math.max(1, Number(existing.attempt_count ?? 1) + 1);
  const { data: claimedRow, error: updateError } = await supabase
    .from('revenuecat_webhook_events')
    .update({
      event_type: eventType,
      status: 'processing',
      attempt_count: nextAttempt,
      last_error: null,
      updated_at: now,
    })
    .eq('event_id', eventId)
    .eq('status', existing.status)
    .select('event_id')
    .maybeSingle();

  if (updateError) {
    if (isMissingTableError(updateError.message)) {
      return 'untracked';
    }
    throw updateError;
  }
  if (!claimedRow) {
    return 'duplicate';
  }

  return 'process';
}

async function markRevenueCatWebhookEventStatus(
  eventId: string,
  status: 'processed' | 'failed',
  lastError?: string,
) {
  const supabase = getSupabaseAdmin();
  const now = new Date().toISOString();
  const payload =
    status === 'processed'
      ? {
        status,
        processed_at: now,
        updated_at: now,
        last_error: null,
      }
      : {
        status,
        updated_at: now,
        last_error: (lastError ?? 'Unknown webhook processing error').slice(0, 1000),
      };

  const { error } = await supabase
    .from('revenuecat_webhook_events')
    .update(payload)
    .eq('event_id', eventId);

  if (error && !isMissingTableError(error.message)) {
    console.error('[revenuecat/webhook] Failed to update webhook tracking status.', toSafeErrorRecord(error));
  }
}

function mapEventToStatus(
  event: string
): 'active' | 'trialing' | 'cancelled' | 'expired' | 'billing_issue' {
  switch (event) {
    case 'INITIAL_PURCHASE':
    case 'RENEWAL':
    case 'UNCANCELLATION':
    case 'NON_RENEWING_PURCHASE':
    case 'PRODUCT_CHANGE':
      return 'active';
    case 'CANCELLATION':
      return 'cancelled';
    case 'EXPIRATION':
      return 'expired';
    case 'BILLING_ISSUE':
      return 'billing_issue';
    default:
      return 'active';
  }
}

async function upsertRevenueCatSubscription(
  payload: Record<string, unknown>,
) {
  // Atomic upsert via unique stripe_subscription_id using a deterministic RevenueCat key.
  const upsertResult = await getSupabaseAdmin().from('subscriptions').upsert(payload, {
    onConflict: 'stripe_subscription_id',
  });

  if (upsertResult.error) {
    throw upsertResult.error;
  }
}

export async function POST(request: NextRequest) {
  const rateLimit = await enforceIpRateLimit(request, 'api:billing:revenuecat-webhook', {
    max: 400,
    windowMs: 60_000,
  });
  if (!rateLimit.allowed) {
    return rateLimitExceededResponse(rateLimit.retryAfterSeconds);
  }

  const contentType = request.headers.get('content-type')?.toLowerCase() ?? '';
  if (contentType && !contentType.includes('application/json')) {
    return NextResponse.json({ error: 'Unsupported content type' }, { status: 415 });
  }

  let rawBody: string;

  try {
    rawBody = await request.text();
  } catch {
    return NextResponse.json({ error: 'Failed to read body' }, { status: 400 });
  }

  if (Buffer.byteLength(rawBody, 'utf8') > MAX_REVENUECAT_WEBHOOK_PAYLOAD_BYTES) {
    return NextResponse.json({ error: 'Payload too large' }, { status: 413 });
  }

  // Verify webhook authenticity
  const webhookSecret = serverEnv.REVENUECAT_WEBHOOK_SECRET;
  if (!webhookSecret) {
    console.error('[revenuecat/webhook] REVENUECAT_WEBHOOK_SECRET not set');
    return NextResponse.json(
      { error: 'Server misconfiguration' },
      { status: 500 }
    );
  }

  const authorization = request.headers.get('Authorization');
  const signature = request.headers.get('X-Revenuecat-Signature');
  const hasValidAuthorization = verifyRevenueCatAuthorizationHeader(authorization, webhookSecret);
  const hasValidLegacySignature = verifyRevenueCatHmacSignature(rawBody, signature, webhookSecret);
  if (!hasValidAuthorization && !hasValidLegacySignature) {
    console.warn('[revenuecat/webhook] Invalid webhook authentication - rejecting request');
    return NextResponse.json({ error: 'Invalid webhook authentication' }, { status: 401 });
  }

  let parsedRawBody: unknown;
  try {
    parsedRawBody = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const parsedBody = revenueCatWebhookSchema.safeParse(parsedRawBody);
  if (!parsedBody.success) {
    return NextResponse.json(
      { error: 'Invalid webhook payload', details: parsedBody.error.flatten() },
      { status: 400 },
    );
  }

  const event = parsedBody.data.event;
  const eventType = event.type;
  const supportedEvents = new Set([
    'INITIAL_PURCHASE',
    'RENEWAL',
    'CANCELLATION',
    'UNCANCELLATION',
    'NON_RENEWING_PURCHASE',
    'EXPIRATION',
    'BILLING_ISSUE',
    'PRODUCT_CHANGE',
    'SUBSCRIBER_ALIAS',
  ]);
  if (!supportedEvents.has(eventType)) {
    if (shouldDebugWebhook) {
      console.debug(`[revenuecat/webhook] Skipping unsupported event type ${eventType}`);
    }
    return NextResponse.json({ received: true, skipped: true }, { status: 200 });
  }

  const appUserId = event.app_user_id; // This is the Supabase user ID
  const productId = event.product_id ?? null;
  const periodType = event.period_type ?? null; // 'TRIAL' | 'NORMAL'
  const expirationAtMs = event.expiration_at_ms ?? null;
  const purchasedAtMs = event.purchased_at_ms ?? null;
  const cancelReasonCode = event.cancel_reason ?? null;

  if (!appUserId) {
    console.error('[revenuecat/webhook] Missing app_user_id in event');
    return NextResponse.json({ error: 'Missing app_user_id' }, { status: 400 });
  }
  if (appUserId.length > MAX_REVENUECAT_APP_USER_ID_LENGTH) {
    return NextResponse.json({ error: 'Invalid app_user_id length' }, { status: 400 });
  }
  if (productId && productId.length > MAX_REVENUECAT_PRODUCT_ID_LENGTH) {
    return NextResponse.json({ error: 'Invalid product_id length' }, { status: 400 });
  }
  if (PRODUCT_REQUIRED_REVENUECAT_EVENTS.has(eventType) && !productId) {
    return NextResponse.json({ error: 'Missing product_id for purchase event' }, { status: 400 });
  }

  const newStatus = mapEventToStatus(eventType);
  const isInTrial = periodType === 'TRIAL';
  const willRenew = !['CANCELLATION', 'EXPIRATION'].includes(eventType);
  const cancelAtPeriodEnd = eventType === 'CANCELLATION';

  let expiresAt: string | null;
  let purchasedAt: string;
  try {
    expiresAt = toIsoFromEpochMs(expirationAtMs, 'expiration_at_ms');
    purchasedAt = toIsoFromEpochMs(purchasedAtMs, 'purchased_at_ms') ?? new Date().toISOString();
  } catch {
    return NextResponse.json({ error: 'Invalid webhook timestamp payload' }, { status: 400 });
  }

  // Matrix source of truth: preserve known matrix product IDs as plan_id values.
  const planId = resolveRevenueCatPlanIdFromProductId(productId);
  const providerSubscriptionId = `revenuecat:${appUserId}`;
  const subscriptionPayload = {
    user_id: appUserId,
    provider: 'revenuecat',
    status: newStatus,
    plan_id: planId,
    product_id: productId,
    stripe_subscription_id: providerSubscriptionId,
    stripe_price_id: productId ?? null,
    current_period_start: purchasedAt,
    current_period_end: expiresAt,
    is_in_trial: isInTrial,
    will_renew: willRenew,
    cancel_at_period_end: cancelAtPeriodEnd,
    cancel_reason: cancelReasonCode,
    metadata: {
      revenuecat_event_type: eventType,
      revenuecat_store: (event.store as string | undefined) ?? null,
      revenuecat_environment: (event.environment as string | undefined) ?? null,
    },
    updated_at: new Date().toISOString(),
  };

  const eventId = buildRevenueCatEventId(event, rawBody);
  let claimResult: RevenueCatWebhookClaimResult = 'untracked';

  try {
    claimResult = await claimRevenueCatWebhookEvent(eventId, eventType);
    if (claimResult === 'duplicate') {
      return NextResponse.json({ received: true, duplicate: true }, { status: 200 });
    }

    if (NON_MUTATING_REVENUECAT_EVENTS.has(eventType)) {
      if (claimResult !== 'untracked') {
        await markRevenueCatWebhookEventStatus(eventId, 'processed');
      }

      return NextResponse.json(
        { received: true, duplicate: false, skipped: true, reason: 'non_mutating_event' },
        { status: 200 },
      );
    }

    await upsertRevenueCatSubscription(subscriptionPayload);

    if (claimResult !== 'untracked') {
      await markRevenueCatWebhookEventStatus(eventId, 'processed');
    }

    if (shouldDebugWebhook) {
      console.debug(
        `[revenuecat/webhook] Processed ${eventType} for user ${appUserId} -> status: ${newStatus}`
      );
    }

    return NextResponse.json({ received: true, duplicate: false }, { status: 200 });
  } catch (err) {
    if (claimResult !== 'untracked') {
      await markRevenueCatWebhookEventStatus(
        eventId,
        'failed',
        err instanceof Error ? err.message : 'Unknown error',
      );
    }

    console.error('[revenuecat/webhook] DB upsert error.', toSafeErrorRecord(err));
    // Return 200 to prevent RevenueCat from retrying on our DB errors
    // Log to an error tracking service here if available
    return NextResponse.json(
      { received: true, warning: 'DB update failed - logged for retry' },
      { status: 200 }
    );
  }
}
