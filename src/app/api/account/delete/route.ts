import { NextResponse } from "next/server";
import { z } from "zod";
import { toSafeErrorRecord } from "@/lib/logging/safe-error";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { enforceIpRateLimit } from "@/lib/security/ip-rate-limit";

/** Soft-delete grace period in days (GDPR best-practice). */
const DELETION_GRACE_PERIOD_DAYS = 30;

const requestSchema = z.object({
  confirmation: z.literal("DELETE"),
});

export async function POST(request: Request) {
  const rateLimit = await enforceIpRateLimit(request, "api:auth:account-delete", {
    max: 3,
    windowMs: 15 * 60 * 1000,
  });
  if (!rateLimit.allowed) {
    return NextResponse.json(
      { error: "Too many account deletion attempts. Please retry later." },
      {
        status: 429,
        headers: { "Retry-After": String(rateLimit.retryAfterSeconds) },
      },
    );
  }

  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const payload = requestSchema.safeParse(await request.json().catch(() => null));
  if (!payload.success) {
    return NextResponse.json({ error: "Invalid payload." }, { status: 400 });
  }

  const admin = createSupabaseAdminClient();

  // ── Soft-delete: ban the user and mark deletion timestamp ──────────
  // The account will be permanently purged after the grace period via
  // the /api/account/purge-deleted cron endpoint.
  const scheduledPurgeAt = new Date(
    Date.now() + DELETION_GRACE_PERIOD_DAYS * 24 * 60 * 60 * 1000,
  ).toISOString();

  const { error: updateError } = await admin.auth.admin.updateUserById(user.id, {
    ban_duration: "876000h", // ~100 years — effectively permanent ban until purge
    user_metadata: {
      ...user.user_metadata,
      deleted_at: new Date().toISOString(),
      scheduled_purge_at: scheduledPurgeAt,
      deletion_reason: "user_requested",
    },
  });

  if (updateError) {
    console.error("Failed to soft-delete account.", toSafeErrorRecord(updateError));
    return NextResponse.json({ error: "Failed to delete account." }, { status: 500 });
  }

  const { error: signOutError } = await supabase.auth.signOut();
  if (signOutError) {
    console.warn("Account soft-deleted but failed to clear session cookie:", signOutError);
  }

  return NextResponse.json({
    success: true,
    gracePeriodDays: DELETION_GRACE_PERIOD_DAYS,
    scheduledPurgeAt,
  });
}
