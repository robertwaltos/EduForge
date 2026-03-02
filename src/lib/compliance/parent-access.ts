import type { SupabaseClient } from "@supabase/supabase-js";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { toSafeErrorRecord } from "@/lib/logging/safe-error";

export const PARENT_ACCESS_PURPOSES = [
  "parent_digest",
  "parent_reports",
  "parent_language_reports",
  "parent_ai_interventions",
  "placement_history_parent_scope",
] as const;

export type ParentAccessPurpose = (typeof PARENT_ACCESS_PURPOSES)[number];

const PURPOSE_SET = new Set<string>(PARENT_ACCESS_PURPOSES);

type ParentAccessSuccess = {
  ok: true;
  purpose: ParentAccessPurpose;
  parentEmail: string;
  childUserIds: string[];
};

type ParentAccessFailure = {
  ok: false;
  status: number;
  error: string;
};

export type ParentAccessResult = ParentAccessSuccess | ParentAccessFailure;

function toNormalizedEmail(value: string | null | undefined) {
  return (value ?? "").trim().toLowerCase();
}

function uniqueUserIds(values: Array<string | null | undefined>) {
  const seen = new Set<string>();
  for (const value of values) {
    if (typeof value !== "string") continue;
    const normalized = value.trim();
    if (!normalized) continue;
    seen.add(normalized);
  }
  return [...seen];
}

export async function resolveVerifiedParentAccess(input: {
  supabase: SupabaseClient;
  userId: string;
  userEmail?: string | null;
  purpose: ParentAccessPurpose;
  requiredChildUserId?: string | null;
}): Promise<ParentAccessResult> {
  const { supabase, userId, userEmail, purpose, requiredChildUserId } = input;

  if (!PURPOSE_SET.has(purpose)) {
    return { ok: false, status: 500, error: "Invalid parent data access purpose." };
  }

  const { data: parentProfile, error: parentProfileError } = await supabase
    .from("user_profiles")
    .select("is_parent")
    .eq("user_id", userId)
    .maybeSingle();

  if (parentProfileError) {
    console.error(
      `[compliance/parent-access] parent profile lookup failed (${purpose})`,
      toSafeErrorRecord(parentProfileError),
    );
    return { ok: false, status: 500, error: "Database error." };
  }
  if (!parentProfile?.is_parent) {
    return { ok: false, status: 403, error: "Parent role is required for this request." };
  }

  const parentEmail = toNormalizedEmail(userEmail);
  if (!parentEmail) {
    return { ok: false, status: 403, error: "Parent email is required for this request." };
  }

  const admin = createSupabaseAdminClient();
  const { data: consentRows, error: consentError } = await admin
    .from("parent_consents")
    .select("child_user_id")
    .eq("parent_email", parentEmail)
    .eq("status", "verified");

  if (consentError) {
    console.error(
      `[compliance/parent-access] consent lookup failed (${purpose})`,
      toSafeErrorRecord(consentError),
    );
    return { ok: false, status: 500, error: "Database error." };
  }

  const childUserIds = uniqueUserIds((consentRows ?? []).map((row) => row.child_user_id));

  if (requiredChildUserId && !childUserIds.includes(requiredChildUserId)) {
    return { ok: false, status: 403, error: "Parent consent not verified for this learner." };
  }

  return {
    ok: true,
    purpose,
    parentEmail,
    childUserIds,
  };
}
