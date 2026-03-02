import { NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { toSafeErrorRecord } from '@/lib/logging/safe-error';
import { serverEnv } from '@/lib/config/env';
import { resolveCadenceFromProductId } from '@/lib/billing/revenuecat-matrix';
import { enforceIpRateLimit } from '@/lib/security/ip-rate-limit';

/**
 * GET /api/subscription/status
 *
 * Returns the current subscription status for the authenticated user.
 * Used by the native app to gate premium features.
 *
 * Response shape:
 * {
 *   active: boolean;
 *   provider: 'revenuecat' | 'stripe' | null;
 *   plan: 'monthly' | 'annual' | 'free';
 *   expiresAt: string | null;   // ISO 8601
 *   isInTrial: boolean;
 *   willRenew: boolean;
 *   managementUrl: string | null;
 * }
 */
function rateLimitExceededResponse(retryAfterSeconds: number) {
  return NextResponse.json(
    { error: 'Too many requests. Please retry shortly.' },
    {
      status: 429,
      headers: {
        'Retry-After': String(retryAfterSeconds),
      },
    },
  );
}

export async function GET(request: Request) {
  try {
    const rateLimit = await enforceIpRateLimit(request, 'api:subscription:status:get', {
      max: 120,
      windowMs: 60 * 1000,
    });
    if (!rateLimit.allowed) {
      return rateLimitExceededResponse(rateLimit.retryAfterSeconds);
    }

    const cookieStore = await cookies();

    const supabase = createServerClient(
      serverEnv.NEXT_PUBLIC_SUPABASE_URL,
      serverEnv.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll();
          },
        },
      }
    );

    // Verify authentication
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Fetch subscription row from Supabase
    const { data: subscription, error: dbError } = await supabase
      .from('subscriptions')
      .select(
        'status, provider, plan_id, current_period_end, is_in_trial, will_renew, cancel_at_period_end'
      )
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (dbError && dbError.code !== 'PGRST116') {
      // PGRST116 = no rows found — that's fine, means free user
      console.error('[subscription/status] DB error.', toSafeErrorRecord(dbError));
      return NextResponse.json(
        { error: 'Database error' },
        { status: 500 }
      );
    }

    // No subscription row → free user
    if (!subscription) {
      return NextResponse.json({
        active: false,
        provider: null,
        plan: 'free',
        expiresAt: null,
        isInTrial: false,
        willRenew: false,
        managementUrl: null,
      });
    }

    const now = new Date();
    const expiresAt = subscription.current_period_end
      ? new Date(subscription.current_period_end)
      : null;

    const isActive =
      (subscription.status === 'active' || subscription.status === 'trialing') &&
      (expiresAt === null || expiresAt > now);

    // Derive management URL based on provider
    let managementUrl: string | null = null;
    if (subscription.provider === 'stripe') {
      managementUrl = `${serverEnv.NEXT_PUBLIC_APP_URL}/settings/billing`;
    } else if (subscription.provider === 'revenuecat') {
      // RevenueCat management is handled natively via the SDK
      managementUrl = null;
    }

    // Normalize plan name
    const plan = isActive
      ? resolveCadenceFromProductId(subscription.plan_id)
      : 'free';

    return NextResponse.json({
      active: isActive,
      provider: subscription.provider ?? null,
      plan,
      expiresAt: expiresAt?.toISOString() ?? null,
      isInTrial: subscription.is_in_trial ?? false,
      willRenew: !(subscription.cancel_at_period_end ?? false),
      managementUrl,
    });
  } catch (err) {
    console.error('[subscription/status] Unexpected error.', toSafeErrorRecord(err));
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

