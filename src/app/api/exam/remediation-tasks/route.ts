import { NextResponse } from "next/server";
import { z } from "zod";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import {
  buildRemediationTasksFromErrors,
  buildSkillCreditMap,
  type ExamErrorLogRow,
} from "@/lib/exam/remediation-tasking";
import { toSafeErrorRecord } from "@/lib/logging/safe-error";
import { enforceIpRateLimit } from "@/lib/security/ip-rate-limit";

const QuerySchema = z.object({
  limit: z.coerce.number().int().min(1).max(200).default(50),
  includeCompleted: z.boolean().default(false),
  lessonId: z.string().min(1).optional(),
  skillId: z.string().min(1).optional(),
});

const TaskActionSchema = z.object({
  action: z.enum(["complete", "reopen"]).default("complete"),
  taskIds: z.array(z.string().uuid()).min(1).max(200),
  applyMasteryCredit: z.boolean().default(true),
});

type SkillMasteryRow = {
  skill_id: string;
  attempts: number | null;
  correct_attempts: number | null;
};

function parseBooleanParam(value: string | null) {
  if (!value) return undefined;
  const normalized = value.trim().toLowerCase();
  if (normalized === "1" || normalized === "true" || normalized === "yes") return true;
  if (normalized === "0" || normalized === "false" || normalized === "no") return false;
  return undefined;
}

function parseQuery(request: Request) {
  const url = new URL(request.url);
  return QuerySchema.safeParse({
    limit: url.searchParams.get("limit") ?? undefined,
    includeCompleted: parseBooleanParam(url.searchParams.get("includeCompleted")),
    lessonId: url.searchParams.get("lessonId")?.trim() || undefined,
    skillId: url.searchParams.get("skillId")?.trim() || undefined,
  });
}

export async function GET(request: Request) {
  try {
    const rateLimit = await enforceIpRateLimit(request, "api:exam:remediation-tasks:get", {
      max: 45,
      windowMs: 60_000,
    });
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { error: "Too many remediation-task requests. Please retry shortly." },
        { status: 429, headers: { "Retry-After": String(rateLimit.retryAfterSeconds) } },
      );
    }

    const parsedQuery = parseQuery(request);
    if (!parsedQuery.success) {
      return NextResponse.json(
        { error: "Invalid remediation-task query parameters.", details: parsedQuery.error.flatten() },
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

    let errorQuery = supabase
      .from("user_exam_error_logs")
      .select(
        "id,module_id,lesson_id,question_id,skill_id,error_type,question_text,notes,metadata,resolved,resolved_at,created_at,updated_at",
      )
      .eq("user_id", user.id)
      .order("resolved", { ascending: true })
      .order("created_at", { ascending: false })
      .limit(parsedQuery.data.limit);

    if (!parsedQuery.data.includeCompleted) {
      errorQuery = errorQuery.eq("resolved", false);
    }
    if (parsedQuery.data.lessonId) {
      errorQuery = errorQuery.eq("lesson_id", parsedQuery.data.lessonId);
    }
    if (parsedQuery.data.skillId) {
      errorQuery = errorQuery.eq("skill_id", parsedQuery.data.skillId);
    }

    const { data: rows, error: rowsError } = await errorQuery;
    if (rowsError) {
      console.error("[api/exam/remediation-tasks] query failed", toSafeErrorRecord(rowsError));
      return NextResponse.json({ error: "Database error." }, { status: 500 });
    }

    const result = buildRemediationTasksFromErrors((rows ?? []) as ExamErrorLogRow[], {
      includeCompleted: parsedQuery.data.includeCompleted,
      maxItems: parsedQuery.data.limit,
    });

    return NextResponse.json({
      generatedAt: new Date().toISOString(),
      filters: {
        includeCompleted: parsedQuery.data.includeCompleted,
        lessonId: parsedQuery.data.lessonId ?? null,
        skillId: parsedQuery.data.skillId ?? null,
      },
      summary: result.summary,
      tasks: result.tasks,
    });
  } catch (error) {
    console.error("[api/exam/remediation-tasks] unexpected GET error", toSafeErrorRecord(error));
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const rateLimit = await enforceIpRateLimit(request, "api:exam:remediation-tasks:post", {
      max: 30,
      windowMs: 60_000,
    });
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { error: "Too many remediation-task mutations. Please retry shortly." },
        { status: 429, headers: { "Retry-After": String(rateLimit.retryAfterSeconds) } },
      );
    }

    const body = await request.json().catch(() => ({}));
    const parsedBody = TaskActionSchema.safeParse(body);
    if (!parsedBody.success) {
      return NextResponse.json(
        { error: "Invalid remediation-task request body.", details: parsedBody.error.flatten() },
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

    const { data: selectedRows, error: selectedError } = await supabase
      .from("user_exam_error_logs")
      .select(
        "id,module_id,lesson_id,question_id,skill_id,error_type,question_text,notes,metadata,resolved,resolved_at,created_at,updated_at",
      )
      .eq("user_id", user.id)
      .in("id", parsedBody.data.taskIds);

    if (selectedError) {
      console.error("[api/exam/remediation-tasks] selected rows query failed", toSafeErrorRecord(selectedError));
      return NextResponse.json({ error: "Database error." }, { status: 500 });
    }

    const selected = (selectedRows ?? []) as ExamErrorLogRow[];
    if (selected.length === 0) {
      return NextResponse.json({ error: "No matching remediation tasks found." }, { status: 404 });
    }

    const nowIso = new Date().toISOString();
    const shouldComplete = parsedBody.data.action === "complete";
    const nextResolved = shouldComplete;
    const nextResolvedAt = shouldComplete ? nowIso : null;

    const { data: updatedRows, error: updateError } = await supabase
      .from("user_exam_error_logs")
      .update({
        resolved: nextResolved,
        resolved_at: nextResolvedAt,
      })
      .eq("user_id", user.id)
      .in("id", selected.map((row) => row.id))
      .select("id,resolved,resolved_at,skill_id,updated_at");

    if (updateError) {
      console.error("[api/exam/remediation-tasks] update failed", toSafeErrorRecord(updateError));
      return NextResponse.json({ error: "Database error." }, { status: 500 });
    }

    let masteryUpdatesApplied = 0;
    let masteryUpdatedSkillCount = 0;

    if (shouldComplete && parsedBody.data.applyMasteryCredit) {
      const creditsBySkillId = buildSkillCreditMap(selected);
      const creditSkillIds = [...creditsBySkillId.keys()];

      if (creditSkillIds.length > 0) {
        const { data: existingRows, error: existingError } = await supabase
          .from("user_skill_mastery")
          .select("skill_id,attempts,correct_attempts")
          .eq("user_id", user.id)
          .in("skill_id", creditSkillIds);

        if (existingError) {
          console.error("[api/exam/remediation-tasks] mastery query failed", toSafeErrorRecord(existingError));
          return NextResponse.json({ error: "Database error." }, { status: 500 });
        }

        const existingBySkill = new Map(
          ((existingRows ?? []) as SkillMasteryRow[]).map((row) => [row.skill_id, row] as const),
        );

        const upsertRows = creditSkillIds.map((skillId) => {
          const existing = existingBySkill.get(skillId);
          const credit = creditsBySkillId.get(skillId) ?? 0;
          const attempts = Math.max(0, Number(existing?.attempts ?? 0)) + credit;
          const correctAttempts = Math.max(0, Number(existing?.correct_attempts ?? 0)) + credit;
          const masteryLevel = attempts > 0 ? Number((correctAttempts / attempts).toFixed(2)) : 0;

          return {
            user_id: user.id,
            skill_id: skillId,
            attempts,
            correct_attempts: correctAttempts,
            mastery_level: masteryLevel,
          };
        });

        const { error: masteryUpsertError } = await supabase
          .from("user_skill_mastery")
          .upsert(upsertRows, { onConflict: "user_id,skill_id" });

        if (masteryUpsertError) {
          console.error("[api/exam/remediation-tasks] mastery upsert failed", toSafeErrorRecord(masteryUpsertError));
          return NextResponse.json({ error: "Database error." }, { status: 500 });
        }

        masteryUpdatesApplied = upsertRows.reduce((sum, row) => {
          const credit = creditsBySkillId.get(row.skill_id) ?? 0;
          return sum + credit;
        }, 0);
        masteryUpdatedSkillCount = upsertRows.length;
      }
    }

    return NextResponse.json({
      success: true,
      action: parsedBody.data.action,
      requestedTaskCount: parsedBody.data.taskIds.length,
      updatedCount: updatedRows?.length ?? 0,
      masteryCreditApplied: shouldComplete && parsedBody.data.applyMasteryCredit,
      masteryUpdatesApplied,
      masteryUpdatedSkillCount,
      updatedRows: updatedRows ?? [],
    });
  } catch (error) {
    console.error("[api/exam/remediation-tasks] unexpected POST error", toSafeErrorRecord(error));
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}
