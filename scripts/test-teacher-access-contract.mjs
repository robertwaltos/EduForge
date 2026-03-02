import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import typescript from "typescript";

const ROOT = process.cwd();
const MODULE_PATH = path.resolve(ROOT, "src/lib/compliance/teacher-access.ts");

function readRequiredFile(filePath) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`Missing required file: ${filePath}`);
  }
  return fs.readFileSync(filePath, "utf8");
}

function loadTranspiledTsModule(filePath, mocks) {
  const source = readRequiredFile(filePath);
  const transpiled = typescript.transpileModule(source, {
    compilerOptions: {
      module: typescript.ModuleKind.CommonJS,
      target: typescript.ScriptTarget.ES2020,
      esModuleInterop: true,
      importsNotUsedAsValues: typescript.ImportsNotUsedAsValues.Remove,
    },
    fileName: filePath,
  }).outputText;

  const cjsModule = { exports: {} };
  const wrapped = new Function(
    "exports",
    "require",
    "module",
    "__filename",
    "__dirname",
    transpiled,
  );

  wrapped(
    cjsModule.exports,
    (specifier) => {
      if (specifier in mocks) return mocks[specifier];
      throw new Error(`Unexpected runtime dependency "${specifier}".`);
    },
    cjsModule,
    filePath,
    path.dirname(filePath),
  );

  return cjsModule.exports;
}

function createMockAdmin(resolver) {
  return {
    from(table) {
      const state = { table, filters: {} };
      const builder = {
        select() {
          return builder;
        },
        eq(column, value) {
          state.filters[column] = value;
          return builder;
        },
        limit() {
          return builder;
        },
        async maybeSingle() {
          const result = await resolver(state);
          return {
            data: result?.data ?? null,
            error: result?.error ?? null,
          };
        },
      };
      return builder;
    },
  };
}

async function runWithResolver(resolver, input) {
  const admin = createMockAdmin(resolver);
  const contract = loadTranspiledTsModule(MODULE_PATH, {
    "@/lib/supabase/admin": { createSupabaseAdminClient: () => admin },
    "@/lib/logging/safe-error": { toSafeErrorRecord: (error) => error },
  });

  const resolveVerifiedTeacherClassAccess = contract.resolveVerifiedTeacherClassAccess;
  if (typeof resolveVerifiedTeacherClassAccess !== "function") {
    throw new Error("Expected resolveVerifiedTeacherClassAccess export.");
  }

  return resolveVerifiedTeacherClassAccess(input);
}

async function main() {
  const contract = loadTranspiledTsModule(MODULE_PATH, {
    "@/lib/supabase/admin": { createSupabaseAdminClient: () => createMockAdmin(async () => ({ data: null, error: null })) },
    "@/lib/logging/safe-error": { toSafeErrorRecord: (error) => error },
  });
  const purposes = contract.TEACHER_ACCESS_PURPOSES;
  assert.ok(Array.isArray(purposes), "Expected TEACHER_ACCESS_PURPOSES array export.");
  assert.ok(purposes.includes("placement_history_teacher_scope"));
  assert.ok(purposes.includes("testing_class_analytics"));
  assert.ok(purposes.includes("testing_class_assignments"));
  assert.ok(purposes.includes("testing_class_enrollments"));
  console.log("PASS: teacher access purpose contract");

  const baseInput = {
    userId: "teacher-1",
    classId: "class-1",
    purpose: "placement_history_teacher_scope",
  };

  const invalidPurposeResult = await runWithResolver(
    async () => ({ data: null, error: null }),
    { ...baseInput, purpose: "invalid-purpose" },
  );
  assert.equal(invalidPurposeResult.ok, false);
  if (!invalidPurposeResult.ok) {
    assert.equal(invalidPurposeResult.status, 500);
    assert.equal(invalidPurposeResult.error, "Invalid teacher data access purpose.");
  }
  console.log("PASS: invalid purpose rejected");

  const missingTablesResult = await runWithResolver(
    async ({ table }) => {
      if (table === "classroom_entities") {
        return { data: null, error: { message: 'relation "classroom_entities" does not exist' } };
      }
      return { data: null, error: null };
    },
    baseInput,
  );
  assert.equal(missingTablesResult.ok, false);
  if (!missingTablesResult.ok) {
    assert.equal(missingTablesResult.status, 503);
  }
  console.log("PASS: missing classroom tables mapped to 503");

  const classNotFoundResult = await runWithResolver(
    async ({ table }) => {
      if (table === "classroom_entities") {
        return { data: null, error: null };
      }
      return { data: null, error: null };
    },
    baseInput,
  );
  assert.equal(classNotFoundResult.ok, false);
  if (!classNotFoundResult.ok) {
    assert.equal(classNotFoundResult.status, 404);
    assert.equal(classNotFoundResult.error, "Classroom not found.");
  }
  console.log("PASS: classroom not found handling");

  const unauthorizedTeacherResult = await runWithResolver(
    async ({ table }) => {
      if (table === "classroom_entities") {
        return { data: { id: "class-1", name: "Alpha", max_size: 30, teacher_user_id: "teacher-2" }, error: null };
      }
      return { data: null, error: null };
    },
    baseInput,
  );
  assert.equal(unauthorizedTeacherResult.ok, false);
  if (!unauthorizedTeacherResult.ok) {
    assert.equal(unauthorizedTeacherResult.status, 403);
  }
  console.log("PASS: unauthorized teacher blocked");

  const classOnlyAccess = await runWithResolver(
    async ({ table }) => {
      if (table === "classroom_entities") {
        return { data: { id: "class-1", name: "Alpha", max_size: 30, teacher_user_id: "teacher-1" }, error: null };
      }
      return { data: null, error: null };
    },
    baseInput,
  );
  assert.equal(classOnlyAccess.ok, true);
  if (classOnlyAccess.ok) {
    assert.equal(classOnlyAccess.className, "Alpha");
    assert.equal(classOnlyAccess.classMaxSize, 30);
    assert.equal(classOnlyAccess.learnerUserId, null);
  }
  console.log("PASS: class-only teacher access");

  const notEnrolledResult = await runWithResolver(
    async ({ table }) => {
      if (table === "classroom_entities") {
        return { data: { id: "class-1", name: "Alpha", max_size: 30, teacher_user_id: "teacher-1" }, error: null };
      }
      if (table === "class_enrollments") {
        return { data: null, error: null };
      }
      return { data: null, error: null };
    },
    { ...baseInput, requiredLearnerUserId: "learner-1" },
  );
  assert.equal(notEnrolledResult.ok, false);
  if (!notEnrolledResult.ok) {
    assert.equal(notEnrolledResult.status, 403);
    assert.equal(notEnrolledResult.error, "Learner is not enrolled in this classroom.");
  }
  console.log("PASS: non-enrolled learner blocked");

  const noConsentResult = await runWithResolver(
    async ({ table }) => {
      if (table === "classroom_entities") {
        return { data: { id: "class-1", name: "Alpha", max_size: 30, teacher_user_id: "teacher-1" }, error: null };
      }
      if (table === "class_enrollments") {
        return { data: { id: "enroll-1", parent_consent: false }, error: null };
      }
      return { data: null, error: null };
    },
    { ...baseInput, requiredLearnerUserId: "learner-1" },
  );
  assert.equal(noConsentResult.ok, false);
  if (!noConsentResult.ok) {
    assert.equal(noConsentResult.status, 403);
    assert.equal(noConsentResult.error, "Parent consent is required for teacher learner access.");
  }
  console.log("PASS: consent gate enforcement");

  const noConsentAllowedResult = await runWithResolver(
    async ({ table, filters }) => {
      if (table === "classroom_entities") {
        return { data: { id: "class-1", name: "Alpha", max_size: 30, teacher_user_id: "teacher-1" }, error: null };
      }
      if (table === "class_enrollments") {
        assert.equal(filters.class_id, "class-1");
        assert.equal(filters.learner_user_id, "learner-1");
        return { data: { id: "enroll-1", parent_consent: false }, error: null };
      }
      return { data: null, error: null };
    },
    {
      ...baseInput,
      requiredLearnerUserId: "learner-1",
      requireParentConsent: false,
    },
  );
  assert.equal(noConsentAllowedResult.ok, true);
  if (noConsentAllowedResult.ok) {
    assert.equal(noConsentAllowedResult.parentConsentVerified, false);
  }
  console.log("PASS: optional consent override contract");

  const consentedResult = await runWithResolver(
    async ({ table }) => {
      if (table === "classroom_entities") {
        return { data: { id: "class-1", name: "Alpha", max_size: 30, teacher_user_id: "teacher-1" }, error: null };
      }
      if (table === "class_enrollments") {
        return { data: { id: "enroll-1", parent_consent: true }, error: null };
      }
      return { data: null, error: null };
    },
    { ...baseInput, requiredLearnerUserId: "learner-1" },
  );
  assert.equal(consentedResult.ok, true);
  if (consentedResult.ok) {
    assert.equal(consentedResult.parentConsentVerified, true);
    assert.equal(consentedResult.learnerUserId, "learner-1");
  }
  console.log("PASS: consented learner access");

  console.log("PASS: teacher access contract.");
}

main();
