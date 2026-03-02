/**
 * FORGE Tier Gate — Controls which users can access cloud AI services.
 *
 * ┌────────────────────────────────────────────────────────────────────────┐
 * │  RULE: Free-tier users NEVER hit paid APIs (OpenAI, ElevenLabs,      │
 * │  DeepL, Google Translate). They receive ONLY pre-recorded / pre-     │
 * │  seeded content. Cloud AI is reserved for paid subscribers.           │
 * └────────────────────────────────────────────────────────────────────────┘
 *
 * Usage in API routes:
 *
 *   import { requirePaidTier } from "@/lib/forge/tier-gate";
 *
 *   export async function POST(req: Request) {
 *     const gate = await requirePaidTier(req);
 *     if (gate) return gate; // Returns 403 JSON response
 *     // ... proceed with cloud TTS / translation
 *   }
 *
 * Usage in services:
 *
 *   import { canUseCloudAI } from "@/lib/forge/tier-gate";
 *
 *   const allowed = await canUseCloudAI(userId);
 *   if (!allowed) {
 *     // use browser SpeechSynthesis / pre-seeded content instead
 *   }
 */

import { createSupabaseAdminClient } from "@/lib/supabase/admin";

// ── Types ──────────────────────────────────────────────────────────────────

export type TierGateResult = {
  allowed: boolean;
  plan: "free" | "monthly" | "annual";
  reason?: string;
};

// ── Core check ─────────────────────────────────────────────────────────────

/**
 * Check whether a user is allowed to use cloud AI services.
 * Returns true only for users with an active paid subscription.
 *
 * Checks the `subscriptions` table for an active (`status = 'active'`) row.
 * Falls back to false on any error (fail-closed).
 */
export async function canUseCloudAI(userId: string | null | undefined): Promise<boolean> {
  if (!userId) return false;

  try {
    const supabase = createSupabaseAdminClient();
    const { data } = await supabase
      .from("subscriptions")
      .select("status, plan_id")
      .eq("user_id", userId)
      .in("status", ["active", "trialing"])
      .limit(1)
      .maybeSingle();

    return !!data;
  } catch (err) {
    console.warn("[forge/tier-gate] Entitlement check failed, defaulting to free:", err);
    return false;
  }
}

/**
 * Full tier check with plan details.
 */
export async function checkTier(userId: string | null | undefined): Promise<TierGateResult> {
  if (!userId) {
    return { allowed: false, plan: "free", reason: "Not authenticated" };
  }

  try {
    const supabase = createSupabaseAdminClient();
    const { data } = await supabase
      .from("subscriptions")
      .select("status, plan_id")
      .eq("user_id", userId)
      .in("status", ["active", "trialing"])
      .limit(1)
      .maybeSingle();

    if (!data) {
      return { allowed: false, plan: "free", reason: "No active subscription" };
    }

    const plan = data.plan_id?.includes("annual") ? "annual" as const : "monthly" as const;
    return { allowed: true, plan };
  } catch (err) {
    console.warn("[forge/tier-gate] check failed:", err);
    return { allowed: false, plan: "free", reason: "Entitlement check error" };
  }
}

// ── API Route Helpers ──────────────────────────────────────────────────────

/**
 * Extract user ID from a request's auth session.
 * Works with Supabase Auth header-based sessions.
 */
async function getUserIdFromRequest(req: Request): Promise<string | null> {
  try {
    // Check Authorization header for Supabase JWT
    const auth = req.headers.get("authorization");
    if (!auth?.startsWith("Bearer ")) return null;

    const token = auth.slice(7);
    const supabase = createSupabaseAdminClient();
    const { data } = await supabase.auth.getUser(token);
    return data?.user?.id ?? null;
  } catch {
    return null;
  }
}

/**
 * Middleware-style guard for API routes that require a paid subscription.
 * Returns a Response object (403) if the user is free-tier, or null if allowed.
 *
 * Usage:
 *   const gate = await requirePaidTier(req);
 *   if (gate) return gate;
 */
export async function requirePaidTier(req: Request): Promise<Response | null> {
  const userId = await getUserIdFromRequest(req);
  const tier = await checkTier(userId);

  if (tier.allowed) return null;

  return new Response(
    JSON.stringify({
      error: "Premium subscription required",
      code: "TIER_GATE_FREE",
      message:
        "This feature requires a paid subscription. " +
        "Free-tier users can read chapter text and listen to pre-recorded audio, " +
        "but on-demand AI voice generation requires an active plan.",
      plan: tier.plan,
      upgradeUrl: "/pricing",
    }),
    {
      status: 403,
      headers: { "Content-Type": "application/json" },
    },
  );
}

/**
 * Returns whether a specific FORGE capability is available to the user.
 * Capabilities marked `freeTierAllowed: true` in the index are always available.
 * Others require a paid subscription.
 */
export async function canUseCapability(
  capabilityId: string,
  userId: string | null | undefined,
): Promise<boolean> {
  // Lazy import to avoid circular deps
  const { getCapability } = await import("./index");
  const cap = getCapability(capabilityId);

  if (!cap) return false;
  if (cap.freeTierAllowed) return true;
  return canUseCloudAI(userId);
}
