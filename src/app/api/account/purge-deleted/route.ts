import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { toSafeErrorRecord } from "@/lib/logging/safe-error";

/**
 * POST /api/account/purge-deleted
 *
 * Permanently deletes user accounts whose soft-delete grace period has expired.
 * This endpoint should be called by a scheduled cron job (e.g. daily via Vercel
 * Cron, GitHub Actions, or a similar scheduler).
 *
 * Security: Requires a bearer token matching CRON_SECRET env var.
 */
export async function POST(request: Request) {
  const headerStore = await headers();
  const authHeader = headerStore.get("authorization") ?? "";
  const cronSecret = process.env.CRON_SECRET;

  // Guard: require a valid cron secret to prevent unauthorized purges
  if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const admin = createSupabaseAdminClient();

  // List all users — Supabase admin listUsers paginates in batches of 1000
  // For a small/medium app this is fine; scale with cursor pagination if needed
  const { data: listData, error: listError } = await admin.auth.admin.listUsers({
    page: 1,
    perPage: 1000,
  });

  if (listError) {
    console.error("Failed to list users for purge", toSafeErrorRecord(listError));
    return NextResponse.json({ error: "Failed to list users" }, { status: 500 });
  }

  const now = new Date();
  const purged: string[] = [];
  const errors: string[] = [];

  for (const user of listData.users) {
    const meta = user.user_metadata;
    if (!meta?.deleted_at || !meta?.scheduled_purge_at) continue;

    const purgeAt = new Date(meta.scheduled_purge_at as string);
    if (purgeAt > now) continue; // Grace period not yet expired

    // Permanently delete the user
    const { error } = await admin.auth.admin.deleteUser(user.id, false);
    if (error) {
      console.error(`Failed to purge user ${user.id}`, toSafeErrorRecord(error));
      errors.push(user.id);
    } else {
      purged.push(user.id);
    }
  }

  return NextResponse.json({
    purgedCount: purged.length,
    errorCount: errors.length,
    purgedUserIds: purged,
    ...(errors.length > 0 ? { failedUserIds: errors } : {}),
  });
}
