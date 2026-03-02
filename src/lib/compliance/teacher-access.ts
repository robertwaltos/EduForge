import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { toSafeErrorRecord } from "@/lib/logging/safe-error";

export const TEACHER_ACCESS_PURPOSES = [
  "placement_history_teacher_scope",
  "testing_class_analytics",
  "testing_class_assignments",
  "testing_class_enrollments",
] as const;

export type TeacherAccessPurpose = (typeof TEACHER_ACCESS_PURPOSES)[number];

const PURPOSE_SET = new Set<string>(TEACHER_ACCESS_PURPOSES);

type TeacherAccessSuccess = {
  ok: true;
  purpose: TeacherAccessPurpose;
  classId: string;
  className: string | null;
  classMaxSize: number | null;
  teacherUserId: string;
  learnerUserId: string | null;
  parentConsentVerified: boolean;
};

type TeacherAccessFailure = {
  ok: false;
  status: number;
  error: string;
};

export type TeacherAccessResult = TeacherAccessSuccess | TeacherAccessFailure;

function isClassroomTableMissingError(message: string | undefined) {
  if (!message) return false;
  const normalized = message.toLowerCase();
  return (
    normalized.includes("classroom_entities") ||
    normalized.includes("class_enrollments") ||
    normalized.includes("testing/classroom")
  );
}

export async function resolveVerifiedTeacherClassAccess(input: {
  userId: string;
  classId: string;
  purpose: TeacherAccessPurpose;
  requiredLearnerUserId?: string | null;
  requireParentConsent?: boolean;
}): Promise<TeacherAccessResult> {
  const {
    userId,
    classId,
    purpose,
    requiredLearnerUserId = null,
    requireParentConsent = true,
  } = input;

  if (!PURPOSE_SET.has(purpose)) {
    return { ok: false, status: 500, error: "Invalid teacher data access purpose." };
  }

  const admin = createSupabaseAdminClient();
  const { data: classRow, error: classError } = await admin
    .from("classroom_entities")
    .select("id,name,max_size,teacher_user_id")
    .eq("id", classId)
    .maybeSingle();

  if (classError) {
    if (isClassroomTableMissingError(classError.message)) {
      return {
        ok: false,
        status: 503,
        error: "Testing/classroom tables are not ready. Run Supabase migrations first.",
      };
    }
    console.error(
      `[compliance/teacher-access] classroom lookup failed (${purpose})`,
      toSafeErrorRecord(classError),
    );
    return { ok: false, status: 500, error: "Database error." };
  }

  if (!classRow) {
    return { ok: false, status: 404, error: "Classroom not found." };
  }
  if (classRow.teacher_user_id !== userId) {
    return { ok: false, status: 403, error: "Teacher is not authorized for this classroom." };
  }

  if (!requiredLearnerUserId) {
    return {
      ok: true,
      purpose,
      classId,
      className: classRow.name ?? null,
      classMaxSize:
        typeof classRow.max_size === "number" && Number.isFinite(classRow.max_size)
          ? classRow.max_size
          : null,
      teacherUserId: userId,
      learnerUserId: null,
      parentConsentVerified: false,
    };
  }

  const { data: enrollmentRow, error: enrollmentError } = await admin
    .from("class_enrollments")
    .select("id,parent_consent")
    .eq("class_id", classId)
    .eq("learner_user_id", requiredLearnerUserId)
    .limit(1)
    .maybeSingle();

  if (enrollmentError) {
    if (isClassroomTableMissingError(enrollmentError.message)) {
      return {
        ok: false,
        status: 503,
        error: "Testing/classroom tables are not ready. Run Supabase migrations first.",
      };
    }
    console.error(
      `[compliance/teacher-access] enrollment lookup failed (${purpose})`,
      toSafeErrorRecord(enrollmentError),
    );
    return { ok: false, status: 500, error: "Database error." };
  }

  if (!enrollmentRow) {
    return { ok: false, status: 403, error: "Learner is not enrolled in this classroom." };
  }

  const hasParentConsent = Boolean(enrollmentRow.parent_consent);
  if (requireParentConsent && !hasParentConsent) {
    return { ok: false, status: 403, error: "Parent consent is required for teacher learner access." };
  }

  return {
    ok: true,
    purpose,
    classId,
    className: classRow.name ?? null,
    classMaxSize:
      typeof classRow.max_size === "number" && Number.isFinite(classRow.max_size)
        ? classRow.max_size
        : null,
    teacherUserId: userId,
    learnerUserId: requiredLearnerUserId,
    parentConsentVerified: hasParentConsent,
  };
}
