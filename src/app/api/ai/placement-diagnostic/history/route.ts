import { NextResponse } from "next/server";
import { z } from "zod";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import {
  buildPlacementHistorySummary,
  type PlacementHistoryEventLike,
} from "@/lib/ai/placement-diagnostic-contract";
import { enforceIpRateLimit } from "@/lib/security/ip-rate-limit";
import { toSafeErrorRecord } from "@/lib/logging/safe-error";
import { resolveVerifiedParentAccess } from "@/lib/compliance/parent-access";
import { resolveVerifiedTeacherClassAccess } from "@/lib/compliance/teacher-access";

const QuerySchema = z.object({
  profileId: z.string().uuid().optional(),
  childUserId: z.string().uuid().optional(),
  classId: z.string().uuid().optional(),
  accessScope: z.enum(["self", "parent", "teacher"]).default("self"),
  eventType: z.enum(["diagnostic_submitted", "manual_override"]).optional(),
  limit: z.coerce.number().int().min(1).max(200).default(50),
});

function parseQuery(request: Request) {
  const url = new URL(request.url);
  return QuerySchema.safeParse({
    profileId: url.searchParams.get("profileId") ?? undefined,
    childUserId: url.searchParams.get("childUserId") ?? undefined,
    classId: url.searchParams.get("classId") ?? undefined,
    accessScope: url.searchParams.get("accessScope") ?? undefined,
    eventType: url.searchParams.get("eventType") ?? undefined,
    limit: url.searchParams.get("limit") ?? undefined,
  });
}

function isPlacementEventsTableMissingError(message: string | undefined) {
  if (!message) return false;
  const normalized = message.toLowerCase();
  return (
    normalized.includes("placement_diagnostic_events") &&
    (
      normalized.includes("does not exist") ||
      normalized.includes("could not find the table") ||
      normalized.includes("relation")
    )
  );
}

export async function GET(request: Request) {
  try {
    const rateLimit = await enforceIpRateLimit(request, "api:ai:placement-diagnostic:history:get", {
      max: 45,
      windowMs: 60_000,
    });
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { error: "Too many placement history requests. Please retry shortly." },
        { status: 429, headers: { "Retry-After": String(rateLimit.retryAfterSeconds) } },
      );
    }

    const parsedQuery = parseQuery(request);
    if (!parsedQuery.success) {
      return NextResponse.json(
        { error: "Invalid placement history query parameters.", details: parsedQuery.error.flatten() },
        { status: 400 },
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

    const accessScope = parsedQuery.data.accessScope;

    let targetUserId = user.id;
    let admin: ReturnType<typeof createSupabaseAdminClient> | null = null;

    if (accessScope === "self") {
      if (parsedQuery.data.childUserId && parsedQuery.data.childUserId !== user.id) {
        return NextResponse.json({ error: "Forbidden cross-account placement history request." }, { status: 403 });
      }
    } else {
      admin = createSupabaseAdminClient();

      let scopedTargetUserId = parsedQuery.data.childUserId ?? null;
      if (parsedQuery.data.profileId) {
        const { data: ownerRow, error: ownerError } = await admin
          .from("student_profiles")
          .select("account_id")
          .eq("id", parsedQuery.data.profileId)
          .maybeSingle();

        if (ownerError) {
          console.error("[api/ai/placement-diagnostic/history] profile-owner query failed", toSafeErrorRecord(ownerError));
          return NextResponse.json({ error: "Database error." }, { status: 500 });
        }
        if (!ownerRow) {
          return NextResponse.json({ error: "Student profile not found." }, { status: 404 });
        }

        if (scopedTargetUserId && scopedTargetUserId !== ownerRow.account_id) {
          return NextResponse.json(
            { error: "profileId and childUserId target different learner accounts." },
            { status: 400 },
          );
        }
        scopedTargetUserId = ownerRow.account_id;
      }

      if (!scopedTargetUserId) {
        return NextResponse.json(
          { error: "Parent/teacher history scope requires childUserId or profileId." },
          { status: 400 },
        );
      }
      targetUserId = scopedTargetUserId;

      if (accessScope === "parent") {
        const parentAccess = await resolveVerifiedParentAccess({
          supabase,
          userId: user.id,
          userEmail: user.email,
          purpose: "placement_history_parent_scope",
          requiredChildUserId: targetUserId,
        });
        if (!parentAccess.ok) {
          if (parentAccess.status === 403) {
            return NextResponse.json({ error: parentAccess.error }, { status: 403 });
          }
          return NextResponse.json({ error: "Database error." }, { status: parentAccess.status });
        }
      }

      if (accessScope === "teacher") {
        const classId = parsedQuery.data.classId;
        if (!classId) {
          return NextResponse.json({ error: "Teacher history scope requires classId." }, { status: 400 });
        }

        const teacherAccess = await resolveVerifiedTeacherClassAccess({
          userId: user.id,
          classId,
          purpose: "placement_history_teacher_scope",
          requiredLearnerUserId: targetUserId,
          requireParentConsent: true,
        });
        if (!teacherAccess.ok) {
          if (teacherAccess.status === 403 || teacherAccess.status === 503) {
            return NextResponse.json({ error: teacherAccess.error }, { status: teacherAccess.status });
          }
          return NextResponse.json({ error: "Database error." }, { status: teacherAccess.status });
        }
      }
    }

    const queryClient = accessScope === "self" ? supabase : admin!;
    let query = queryClient
      .from("placement_diagnostic_events")
      .select("id,profile_id,event_type,stage_id,recommended_stage_id,confidence,score,metadata,created_at")
      .eq("user_id", targetUserId)
      .order("created_at", { ascending: false })
      .limit(parsedQuery.data.limit);

    if (parsedQuery.data.profileId) {
      query = query.eq("profile_id", parsedQuery.data.profileId);
    }
    if (parsedQuery.data.eventType) {
      query = query.eq("event_type", parsedQuery.data.eventType);
    }

    const { data, error } = await query;
    if (error) {
      if (isPlacementEventsTableMissingError(error.message)) {
        return NextResponse.json({
          generatedAt: new Date().toISOString(),
          setupRequired: true,
          message: "Placement diagnostic history storage is not ready. Apply latest Supabase migrations.",
          events: [],
          summary: {
            total: 0,
            diagnosticSubmittedCount: 0,
            manualOverrideCount: 0,
          },
        });
      }
      console.error("[api/ai/placement-diagnostic/history] query failed", toSafeErrorRecord(error));
      return NextResponse.json({ error: "Database error." }, { status: 500 });
    }

    const events = data ?? [];
    const summary = buildPlacementHistorySummary(events as PlacementHistoryEventLike[]);

    return NextResponse.json({
      generatedAt: new Date().toISOString(),
      filters: {
        accessScope,
        childUserId: accessScope === "self" ? null : targetUserId,
        classId: parsedQuery.data.classId ?? null,
        profileId: parsedQuery.data.profileId ?? null,
        eventType: parsedQuery.data.eventType ?? null,
        limit: parsedQuery.data.limit,
      },
      events,
      summary,
    });
  } catch (error) {
    console.error("[api/ai/placement-diagnostic/history] unexpected error", toSafeErrorRecord(error));
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}
