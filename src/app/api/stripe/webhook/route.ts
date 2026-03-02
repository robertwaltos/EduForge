import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { createStripeServerClient } from "@/lib/billing/stripe-client";
import { serverEnv } from "@/lib/config/env";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import {
  recordLanguageExamUnlockPurchase,
  reverseLanguageExamUnlockForRefund,
} from "@/lib/language-learning";
import { toSafeErrorRecord } from "@/lib/logging/safe-error";
import { enforceIpRateLimit } from "@/lib/security/ip-rate-limit";
import {
  centsToFixedCurrencyAmount,
  TESTING_EXAM_UNLOCK_CURRENCY,
  TESTING_EXAM_UNLOCK_PRICE_CENTS,
} from "@/lib/testing/unlock-pricing";
import { isWebhookProcessingLockActive } from "@/lib/billing/webhook-processing-lock";

type WebhookClaimResult = "process" | "duplicate" | "untracked";

const MAX_STRIPE_WEBHOOK_PAYLOAD_BYTES = 1_000_000;
const STRIPE_WEBHOOK_SIGNATURE_TOLERANCE_SECONDS = 300;

function rateLimitExceededResponse(retryAfterSeconds: number) {
  return NextResponse.json(
    { error: "Too many webhook requests. Please retry shortly." },
    {
      status: 429,
      headers: {
        "Retry-After": String(retryAfterSeconds),
      },
    },
  );
}

function toIsoDate(epochSeconds?: number | null) {
  return epochSeconds ? new Date(epochSeconds * 1000).toISOString() : null;
}

function isMissingTableError(message: string) {
  const lower = message.toLowerCase();
  return lower.includes("could not find the table") || (lower.includes("relation") && lower.includes("does not exist"));
}

function isDuplicateKeyError(code?: string | null) {
  return code === "23505";
}

function isMissingColumnError(error: unknown, columnName: string) {
  if (!error || typeof error !== "object") return false;
  const code = "code" in error ? String((error as { code?: unknown }).code ?? "") : "";
  const message = "message" in error ? String((error as { message?: unknown }).message ?? "") : "";
  return code === "42703" || message.toLowerCase().includes(columnName.toLowerCase());
}

async function upsertSubscriptionFromObject(subscription: Stripe.Subscription) {
  const supabase = createSupabaseAdminClient();

  const userId = subscription.metadata?.userId || null;
  const stripePriceId = subscription.items.data[0]?.price?.id ?? null;

  const payload = {
    user_id: userId,
    stripe_customer_id:
      typeof subscription.customer === "string" ? subscription.customer : subscription.customer?.id,
    stripe_subscription_id: subscription.id,
    stripe_price_id: stripePriceId,
    status: subscription.status,
    current_period_start: toIsoDate(subscription.items.data[0]?.current_period_start),
    current_period_end: toIsoDate(subscription.items.data[0]?.current_period_end),
    cancel_at_period_end: subscription.cancel_at_period_end,
    canceled_at: toIsoDate(subscription.canceled_at),
    metadata: subscription.metadata,
  };

  const { error } = await supabase.from("subscriptions").upsert(payload, {
    onConflict: "stripe_subscription_id",
  });

  if (error) {
    throw new Error(error.message);
  }
}

async function claimWebhookEvent(event: Stripe.Event): Promise<WebhookClaimResult> {
  const supabase = createSupabaseAdminClient();
  const { data: existing, error: existingError } = await supabase
    .from("stripe_webhook_events")
    .select("event_id, status, attempt_count, updated_at")
    .eq("event_id", event.id)
    .maybeSingle();

  if (existingError) {
    if (isMissingTableError(existingError.message)) {
      return "untracked";
    }
    throw new Error(existingError.message);
  }

  const now = new Date().toISOString();

  if (!existing) {
    const { error: insertError } = await supabase
      .from("stripe_webhook_events")
      .insert({
        event_id: event.id,
        event_type: event.type,
        status: "processing",
        attempt_count: 1,
        event_created_at: toIsoDate(event.created),
        updated_at: now,
      });

    if (!insertError) {
      return "process";
    }
    if (isMissingTableError(insertError.message)) {
      return "untracked";
    }
    if (isDuplicateKeyError(insertError.code)) {
      return "duplicate";
    }
    throw new Error(insertError.message);
  }

  if (existing.status === "processed") {
    return "duplicate";
  }
  if (
    existing.status === "processing" &&
    isWebhookProcessingLockActive({ updatedAtIso: existing.updated_at })
  ) {
    return "duplicate";
  }

  const nextAttempt = Math.max(1, Number(existing.attempt_count ?? 1) + 1);
  const { data: claimedRow, error: updateError } = await supabase
    .from("stripe_webhook_events")
    .update({
      event_type: event.type,
      status: "processing",
      attempt_count: nextAttempt,
      last_error: null,
      updated_at: now,
    })
    .eq("event_id", event.id)
    .eq("status", existing.status)
    .select("event_id")
    .maybeSingle();

  if (updateError) {
    if (isMissingTableError(updateError.message)) {
      return "untracked";
    }
    throw new Error(updateError.message);
  }
  if (!claimedRow) {
    return "duplicate";
  }

  return "process";
}

async function markWebhookEventStatus(
  eventId: string,
  status: "processed" | "failed",
  lastError?: string,
) {
  const supabase = createSupabaseAdminClient();
  const now = new Date().toISOString();
  const payload =
    status === "processed"
      ? {
          status,
          processed_at: now,
          updated_at: now,
          last_error: null,
        }
      : {
          status,
          updated_at: now,
          last_error: (lastError ?? "Unknown webhook processing error").slice(0, 1000),
        };

  const { error } = await supabase
    .from("stripe_webhook_events")
    .update(payload)
    .eq("event_id", eventId);

  if (error && !isMissingTableError(error.message)) {
    console.error("Failed to update webhook tracking status.", toSafeErrorRecord(error));
  }
}

async function handleCheckoutCompleted(event: Stripe.Event, stripe: Stripe) {
  const session = event.data.object as Stripe.Checkout.Session;

  if (session.mode === "subscription" && session.subscription) {
    const subscriptionId =
      typeof session.subscription === "string" ? session.subscription : session.subscription.id;
    const subscription = await stripe.subscriptions.retrieve(subscriptionId);

    if (session.client_reference_id && !subscription.metadata.userId) {
      await stripe.subscriptions.update(subscription.id, {
        metadata: {
          ...subscription.metadata,
          userId: session.client_reference_id,
        },
      });
    }

    const freshSubscription = await stripe.subscriptions.retrieve(subscription.id);
    await upsertSubscriptionFromObject(freshSubscription);
    return;
  }

  if (session.mode !== "payment") {
    return;
  }

  // Only fulfill entitlements after Stripe marks the checkout as paid.
  if (session.payment_status !== "paid") {
    return;
  }

  const metadata = session.metadata ?? {};
  if (metadata.checkoutType === "gift_membership") {
    await markGiftMembershipPaid(session);
    return;
  }

  if (metadata.checkoutType === "organization_license_purchase") {
    await markOrganizationLicensePurchasePaid(session);
    return;
  }

  if (metadata.checkoutType === "testing_exam_unlock") {
    await markTestingExamUnlockPaid(session);
    return;
  }

  if (metadata.checkoutType !== "language_exam_unlock") {
    return;
  }

  const level = metadata.level;
  if (level !== "beginner" && level !== "intermediate" && level !== "advanced") {
    return;
  }

  const userId = metadata.userId ?? session.client_reference_id ?? null;
  if (!userId || typeof userId !== "string") {
    throw new Error("Missing userId metadata for language exam unlock checkout session.");
  }

  const paymentIntentId =
    typeof session.payment_intent === "string"
      ? session.payment_intent
      : session.payment_intent?.id ?? null;
  if (!paymentIntentId) {
    throw new Error("Missing payment_intent for language exam unlock checkout session.");
  }

  const expectedPriceCents = Number.parseInt(String(metadata.priceCents ?? ""), 10);
  if (!Number.isFinite(expectedPriceCents) || expectedPriceCents <= 0) {
    throw new Error("Missing/invalid priceCents metadata for language exam unlock checkout.");
  }

  const settledAmountCents = typeof session.amount_total === "number" ? Math.max(0, session.amount_total) : 0;
  if (settledAmountCents < expectedPriceCents) {
    throw new Error("Language exam unlock checkout amount below expected minimum.");
  }

  const expectedCurrency = String(metadata.currency ?? "").trim().toUpperCase();
  if (expectedCurrency.length === 3) {
    const settledCurrency = session.currency ? session.currency.toUpperCase() : "";
    if (settledCurrency !== expectedCurrency) {
      throw new Error("Unexpected currency for language exam unlock checkout.");
    }
  }

  const studentProfileIdRaw = metadata.studentProfileId;
  const geoTierRaw = metadata.geoTier;

  const admin = createSupabaseAdminClient();
  await recordLanguageExamUnlockPurchase(admin, {
    userId,
    studentProfileId:
      typeof studentProfileIdRaw === "string" && studentProfileIdRaw.length > 0
        ? studentProfileIdRaw
        : undefined,
    level,
    stripePaymentIntentId: paymentIntentId,
    pricePaidCents: settledAmountCents,
    currency: session.currency ? session.currency.toUpperCase() : undefined,
    provider: "stripe_checkout",
    geoTierOverride:
      geoTierRaw === "tier_1" ||
      geoTierRaw === "tier_2" ||
      geoTierRaw === "tier_3" ||
      geoTierRaw === "tier_4" ||
      geoTierRaw === "tier_5"
        ? geoTierRaw
        : undefined,
    metadata: {
      stripeCheckoutSessionId: session.id,
      checkoutType: metadata.checkoutType,
    },
  });
}

async function markGiftMembershipPaid(session: Stripe.Checkout.Session) {
  const metadata = session.metadata ?? {};
  const giftId = metadata.giftId;
  if (!giftId) {
    throw new Error("Missing giftId metadata for gift membership checkout.");
  }

  const paymentIntentId =
    typeof session.payment_intent === "string"
      ? session.payment_intent
      : session.payment_intent?.id ?? null;
  const nowIso = new Date().toISOString();
  const supabase = createSupabaseAdminClient();
  const { error } = await supabase
    .from("gifted_memberships")
    .update({
      status: "paid",
      stripe_checkout_session_id: session.id,
      stripe_payment_intent_id: paymentIntentId,
      purchased_at: nowIso,
      metadata: {
        source: "stripe_webhook",
        checkoutType: "gift_membership",
        stripeCheckoutSessionId: session.id,
      },
    })
    .eq("id", giftId)
    .in("status", ["checkout_created", "paid"]);

  if (error) {
    throw new Error(error.message);
  }
}

async function markOrganizationLicensePurchasePaid(session: Stripe.Checkout.Session) {
  const metadata = session.metadata ?? {};
  const purchaseId = metadata.purchaseId;
  const organizationId = metadata.organizationId;

  if (!purchaseId || !organizationId) {
    throw new Error("Missing purchase metadata for organization license checkout.");
  }

  const paymentIntentId =
    typeof session.payment_intent === "string"
      ? session.payment_intent
      : session.payment_intent?.id ?? null;
  const invoiceId =
    typeof session.invoice === "string"
      ? session.invoice
      : session.invoice?.id ?? null;

  const totalPaid = typeof session.amount_total === "number" ? Math.max(0, session.amount_total) : null;
  const currency = session.currency ? session.currency.toUpperCase() : "USD";
  const nowIso = new Date().toISOString();

  const supabase = createSupabaseAdminClient();
  const { error } = await supabase
    .from("organization_license_purchases")
    .update({
      status: "paid",
      stripe_checkout_session_id: session.id,
      stripe_payment_intent_id: paymentIntentId,
      stripe_invoice_id: invoiceId,
      purchased_at: nowIso,
      paid_at: nowIso,
      ...(typeof totalPaid === "number" ? { total_price_cents: totalPaid } : {}),
      currency,
      metadata: {
        source: "stripe_webhook",
        checkoutType: "organization_license_purchase",
        stripeCheckoutSessionId: session.id,
      },
    })
    .eq("id", purchaseId)
    .eq("organization_id", organizationId)
    .in("status", ["checkout_created", "paid", "partially_allocated", "fully_allocated"]);

  if (error) {
    throw new Error(error.message);
  }
}

async function markTestingExamUnlockPaid(session: Stripe.Checkout.Session) {
  const metadata = session.metadata ?? {};
  const examId = metadata.examId;
  const userId = metadata.userId ?? session.client_reference_id ?? null;

  if (!examId || !userId || typeof userId !== "string") {
    throw new Error("Missing examId/userId metadata for testing exam unlock checkout.");
  }

  const paymentIntentId =
    typeof session.payment_intent === "string"
      ? session.payment_intent
      : session.payment_intent?.id ?? null;
  if (!paymentIntentId) {
    throw new Error("Missing payment_intent for testing exam unlock checkout session.");
  }

  const settledAmountCents = typeof session.amount_total === "number" ? Math.max(0, session.amount_total) : 0;
  if (settledAmountCents < TESTING_EXAM_UNLOCK_PRICE_CENTS) {
    throw new Error("Testing exam unlock checkout amount below expected minimum.");
  }

  const currency = session.currency ? session.currency.toUpperCase() : TESTING_EXAM_UNLOCK_CURRENCY;
  if (currency !== TESTING_EXAM_UNLOCK_CURRENCY) {
    throw new Error("Unexpected currency for testing exam unlock checkout.");
  }

  const nowIso = new Date().toISOString();
  const supabase = createSupabaseAdminClient();

  const insertWithIdempotency = await supabase
    .from("testing_purchases")
    .insert({
      user_id: userId,
      exam_id: examId,
      amount: centsToFixedCurrencyAmount(settledAmountCents),
      currency,
      status: "completed",
      provider: "stripe_checkout",
      provider_transaction_id: paymentIntentId,
      idempotency_key: `testing_unlock:${paymentIntentId}`,
      metadata: {
        source: "stripe_webhook",
        checkoutType: "testing_exam_unlock",
        stripeCheckoutSessionId: session.id,
      },
      purchased_at: nowIso,
    });

  const insertWithoutIdempotency = async () =>
    supabase
      .from("testing_purchases")
      .insert({
        user_id: userId,
        exam_id: examId,
        amount: centsToFixedCurrencyAmount(settledAmountCents),
        currency,
        status: "completed",
        provider: "stripe_checkout",
        provider_transaction_id: paymentIntentId,
        metadata: {
          source: "stripe_webhook",
          checkoutType: "testing_exam_unlock",
          stripeCheckoutSessionId: session.id,
        },
        purchased_at: nowIso,
      });

  const purchaseInsertError = insertWithIdempotency.error
    && isMissingColumnError(insertWithIdempotency.error, "idempotency_key")
      ? (await insertWithoutIdempotency()).error
      : insertWithIdempotency.error;

  if (purchaseInsertError && !isDuplicateKeyError(purchaseInsertError.code)) {
    throw new Error(purchaseInsertError.message);
  }

  const entitlementWithState = await supabase
    .from("user_exam_entitlements")
    .upsert(
      {
        user_id: userId,
        exam_id: examId,
        entitlement_type: "full",
        state: "completed",
        unlocked_at: nowIso,
      },
      { onConflict: "user_id,exam_id" },
    );

  const entitlementWithoutState = async () =>
    supabase
      .from("user_exam_entitlements")
      .upsert(
        {
          user_id: userId,
          exam_id: examId,
          entitlement_type: "full",
          unlocked_at: nowIso,
        },
        { onConflict: "user_id,exam_id" },
      );

  const entitlementError = entitlementWithState.error
    && isMissingColumnError(entitlementWithState.error, "state")
      ? (await entitlementWithoutState()).error
      : entitlementWithState.error;

  if (entitlementError) {
    throw new Error(entitlementError.message);
  }
}

async function handleCheckoutAsyncPaymentFailed(event: Stripe.Event) {
  const session = event.data.object as Stripe.Checkout.Session;
  const metadata = session.metadata ?? {};

  if (metadata.checkoutType === "gift_membership" && metadata.giftId) {
    const supabase = createSupabaseAdminClient();
    const { error } = await supabase
      .from("gifted_memberships")
      .update({
        status: "canceled",
        metadata: {
          source: "stripe_webhook",
          checkoutType: "gift_membership",
          asyncPaymentFailed: true,
          stripeCheckoutSessionId: session.id,
        },
      })
      .eq("id", metadata.giftId)
      .eq("status", "checkout_created");

    if (error) {
      throw new Error(error.message);
    }
    return;
  }

  if (metadata.checkoutType === "organization_license_purchase" && metadata.purchaseId) {
    const supabase = createSupabaseAdminClient();
    const { error } = await supabase
      .from("organization_license_purchases")
      .update({
        status: "canceled",
        metadata: {
          source: "stripe_webhook",
          checkoutType: "organization_license_purchase",
          asyncPaymentFailed: true,
          stripeCheckoutSessionId: session.id,
        },
      })
      .eq("id", metadata.purchaseId)
      .in("status", ["checkout_created", "invoicing"]);

    if (error) {
      throw new Error(error.message);
    }
  }
}

async function handleChargeRefunded(event: Stripe.Event) {
  const charge = event.data.object as Stripe.Charge;
  const paymentIntentId =
    typeof charge.payment_intent === "string"
      ? charge.payment_intent
      : charge.payment_intent?.id ?? null;
  if (!paymentIntentId) {
    return;
  }

  const refundedAmount = Math.max(0, Number(charge.amount_refunded ?? 0));
  const originalAmount = Math.max(0, Number(charge.amount ?? 0));
  const isFullRefund = originalAmount > 0 && refundedAmount >= originalAmount;

  const admin = createSupabaseAdminClient();
  await reverseLanguageExamUnlockForRefund(admin, {
    stripePaymentIntentId: paymentIntentId,
    refundEventId: event.id,
    refundedAmountCents: refundedAmount,
    isFullRefund,
  });
}

async function handleSubscriptionUpdated(event: Stripe.Event) {
  const subscription = event.data.object as Stripe.Subscription;
  await upsertSubscriptionFromObject(subscription);
}

async function handleSubscriptionDeleted(event: Stripe.Event) {
  const subscription = event.data.object as Stripe.Subscription;
  await upsertSubscriptionFromObject(subscription);
}

async function handleInvoicePaymentFailed(event: Stripe.Event, stripe: Stripe) {
  const invoice = event.data.object as Stripe.Invoice & {
    subscription?: string | Stripe.Subscription | null;
  };
  const subscriptionId =
    typeof invoice.subscription === "string"
      ? invoice.subscription
      : invoice.subscription?.id ?? null;

  if (!subscriptionId) {
    return;
  }

  const subscription = await stripe.subscriptions.retrieve(subscriptionId);
  await upsertSubscriptionFromObject(subscription);
}

export async function POST(request: NextRequest) {
  const rateLimit = await enforceIpRateLimit(request, "api:billing:stripe-webhook:route", {
    max: 500,
    windowMs: 60_000,
  });
  if (!rateLimit.allowed) {
    return rateLimitExceededResponse(rateLimit.retryAfterSeconds);
  }

  if (!serverEnv.STRIPE_SECRET_KEY || !serverEnv.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json(
      { error: "Missing Stripe webhook configuration." },
      { status: 500 },
    );
  }

  const signature = request.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json({ error: "Missing stripe-signature header." }, { status: 400 });
  }

  const payload = await request.text();
  if (!payload) {
    return NextResponse.json({ error: "Missing webhook payload." }, { status: 400 });
  }
  if (Buffer.byteLength(payload, "utf8") > MAX_STRIPE_WEBHOOK_PAYLOAD_BYTES) {
    return NextResponse.json({ error: "Payload too large." }, { status: 413 });
  }
  const stripe = createStripeServerClient(serverEnv.STRIPE_SECRET_KEY);

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      payload,
      signature,
      serverEnv.STRIPE_WEBHOOK_SECRET,
      STRIPE_WEBHOOK_SIGNATURE_TOLERANCE_SECONDS,
    );
  } catch (error) {
    console.error("Stripe webhook signature validation failed.", toSafeErrorRecord(error));
    return NextResponse.json({ error: "Invalid webhook signature." }, { status: 400 });
  }

  if (process.env.NODE_ENV === "production" && !event.livemode) {
    return NextResponse.json(
      { error: "Stripe test-mode events are not accepted in production." },
      { status: 400 },
    );
  }

  let claimResult: WebhookClaimResult = "untracked";

  try {
    claimResult = await claimWebhookEvent(event);
    if (claimResult === "duplicate") {
      return NextResponse.json({ received: true, eventType: event.type, duplicate: true });
    }

    switch (event.type) {
      case "checkout.session.completed":
      case "checkout.session.async_payment_succeeded":
        await handleCheckoutCompleted(event, stripe);
        break;
      case "checkout.session.async_payment_failed":
        await handleCheckoutAsyncPaymentFailed(event);
        break;
      case "customer.subscription.created":
      case "customer.subscription.updated":
        await handleSubscriptionUpdated(event);
        break;
      case "customer.subscription.deleted":
        await handleSubscriptionDeleted(event);
        break;
      case "invoice.payment_failed":
        await handleInvoicePaymentFailed(event, stripe);
        break;
      case "charge.refunded":
        await handleChargeRefunded(event);
        break;
      default:
        console.warn("Stripe webhook event skipped (unhandled type):", event.type);
        break;
    }

    if (claimResult !== "untracked") {
      await markWebhookEventStatus(event.id, "processed");
    }
  } catch (error) {
    if (claimResult !== "untracked") {
      await markWebhookEventStatus(
        event.id,
        "failed",
        error instanceof Error ? error.message : "Unknown error",
      );
    }

    return NextResponse.json(
      {
        error: "Webhook processing failed",
      },
      { status: 500 },
    );
  }

  return NextResponse.json({ received: true, eventType: event.type, duplicate: false });
}



