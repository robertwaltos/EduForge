"use client";

import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import SoftCard from "@/app/components/ui/soft-card";
import { useI18n } from "@/lib/i18n/provider";
import { sanitizeDisplayName } from "@/lib/security/sanitize-user-text";

type AssessmentQuestion = {
  moduleId: string;
  moduleTitle: string;
  lessonId: string;
  lessonTitle: string;
  subject: string;
  questionId: string;
  questionText: string;
  options: Array<{
    id: string;
    text: string;
  }>;
};

type OnboardingStep = "info" | "assessment" | "saving" | "complete";

type FormData = {
  name: string;
  grade: string;
  age: string;
};

const STEPS: { key: OnboardingStep; labelKey: string }[] = [
  { key: "info", labelKey: "onboarding_step_info" },
  { key: "assessment", labelKey: "onboarding_step_assessment" },
  { key: "saving", labelKey: "onboarding_step_saving" },
  { key: "complete", labelKey: "onboarding_step_complete" },
];

const GRADE_OPTIONS = [
  { value: "K", labelKey: "onboarding_grade_k" },
  { value: "1", labelKey: "onboarding_grade_1" },
  { value: "2", labelKey: "onboarding_grade_2" },
  { value: "3", labelKey: "onboarding_grade_3" },
  { value: "4", labelKey: "onboarding_grade_4" },
  { value: "5", labelKey: "onboarding_grade_5" },
  { value: "6", labelKey: "onboarding_grade_6" },
  { value: "7", labelKey: "onboarding_grade_7" },
  { value: "8", labelKey: "onboarding_grade_8" },
  { value: "9", labelKey: "onboarding_grade_9" },
  { value: "10", labelKey: "onboarding_grade_10" },
  { value: "11", labelKey: "onboarding_grade_11" },
  { value: "12", labelKey: "onboarding_grade_12" },
];

function StepIndicator({
  current,
  t,
}: {
  current: OnboardingStep;
  t: (key: string, vars?: Record<string, string | number>) => string;
}) {
  const currentIndex = STEPS.findIndex((s) => s.key === current);
  return (
    <nav aria-label={t("onboarding_progress_aria")} className="family-step-track mb-8">
      {STEPS.map((s, i) => (
        <div
          key={s.key}
          role="img"
          aria-label={`${t(s.labelKey)}${i < currentIndex ? t("onboarding_step_complete_suffix") : i === currentIndex ? t("onboarding_step_current_suffix") : ""}`}
          className="family-step-dot"
          data-complete={i < currentIndex ? "true" : undefined}
          data-active={i === currentIndex ? "true" : undefined}
        />
      ))}
    </nav>
  );
}

function extractOptionVisual(option: string) {
  const trimmed = option.trim();
  const match = trimmed.match(/^([^\p{L}\p{N}\s]+)\s*(.*)$/u);
  if (!match) {
    return { emoji: null, label: trimmed };
  }

  const emoji = (match[1] ?? "").trim();
  const label = (match[2] ?? "").trim();
  return { emoji: emoji.length > 0 ? emoji : null, label: label.length > 0 ? label : trimmed };
}

function inferInterestPaths(
  selectedOptionTexts: string[],
  grade: string,
  age: number | null,
) {
  const combinedAnswers = selectedOptionTexts.map((entry) => entry.toLowerCase()).join(" ");
  const recommendations = new Set<string>();

  if (combinedAnswers.includes("🌧") || combinedAnswers.includes("weather") || combinedAnswers.includes("ocean")) {
    recommendations.add("meteorology");
  }
  if (combinedAnswers.includes("🌱") || combinedAnswers.includes("tree") || combinedAnswers.includes("plant")) {
    recommendations.add("tree");
    recommendations.add("gardening");
  }
  if (combinedAnswers.includes("circuit") || combinedAnswers.includes("electric")) {
    recommendations.add("electrician-electricity");
  }
  if (combinedAnswers.includes("code") || combinedAnswers.includes("computer")) {
    recommendations.add("coding");
  }

  if ((age !== null && age <= 8) || ["K", "1", "2"].includes(grade)) {
    recommendations.add("numbers");
    recommendations.add("story");
  } else {
    recommendations.add("math-core");
    recommendations.add("science-core");
  }

  return [...recommendations].slice(0, 4);
}

function createDraftProfileId() {
  return crypto.randomUUID();
}

function parseGradeLevel(gradeLevel: string) {
  const normalized = gradeLevel.trim().toLowerCase();
  if (normalized === "pk" || normalized === "pre-k" || normalized === "pre-kinder") return -1;
  if (normalized === "k" || normalized === "kindergarten") return 0;

  const numericMatch = normalized.match(/\d{1,2}/);
  if (!numericMatch) return null;

  const grade = Number(numericMatch[0]);
  return Number.isFinite(grade) ? grade : null;
}

function inferPlacementStageId(input: { gradeLevel: string; ageYears: number | null }) {
  const grade = parseGradeLevel(input.gradeLevel);
  if (grade !== null) {
    if (grade < 0) return "pre-k";
    if (grade <= 2) return "early-elem";
    if (grade <= 5) return "upper-elem";
    if (grade <= 8) return "middle";
    if (grade <= 12) return "high";
    return "college";
  }

  if (typeof input.ageYears === "number" && Number.isFinite(input.ageYears)) {
    if (input.ageYears < 5) return "pre-k";
    if (input.ageYears < 8) return "early-elem";
    if (input.ageYears < 11) return "upper-elem";
    if (input.ageYears < 14) return "middle";
    if (input.ageYears < 18) return "high";
    return "college";
  }

  return "middle";
}

function isAssessmentQuestion(value: unknown): value is AssessmentQuestion {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return false;
  }

  const row = value as Record<string, unknown>;
  if (
    typeof row.moduleId !== "string" ||
    typeof row.moduleTitle !== "string" ||
    typeof row.lessonId !== "string" ||
    typeof row.lessonTitle !== "string" ||
    typeof row.subject !== "string" ||
    typeof row.questionId !== "string" ||
    typeof row.questionText !== "string" ||
    !Array.isArray(row.options)
  ) {
    return false;
  }

  if (row.options.length < 2) {
    return false;
  }

  return row.options.every((option) => {
    if (!option || typeof option !== "object" || Array.isArray(option)) {
      return false;
    }
    const normalized = option as Record<string, unknown>;
    return (
      typeof normalized.id === "string" &&
      normalized.id.length > 0 &&
      typeof normalized.text === "string" &&
      normalized.text.length > 0
    );
  });
}

export default function StudentOnboardingPage() {
  const { t } = useI18n();
  const router = useRouter();

  const [step, setStep] = useState<OnboardingStep>("info");
  const [formData, setFormData] = useState<FormData>({ name: "", grade: "3", age: "" });
  const [questions, setQuestions] = useState<AssessmentQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isLoadingQuestions, setIsLoadingQuestions] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [createdProfileName, setCreatedProfileName] = useState("");
  const learnerProfileIdRef = useRef<string>(createDraftProfileId());

  const currentQuestion = questions[currentQuestionIndex];
  const imageAssistMode = useMemo(() => {
    const gradeKey = formData.grade.trim().toLowerCase();
    const isEarlyGrade = gradeKey === "k" || gradeKey === "1" || gradeKey === "2";
    const parsedAge = formData.age ? Number(formData.age) : null;
    const isEarlyAge = typeof parsedAge === "number" && Number.isFinite(parsedAge) && parsedAge <= 6;
    return isEarlyGrade || isEarlyAge;
  }, [formData.age, formData.grade]);

  const handleInfoSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage("");

    const normalizedName = sanitizeDisplayName(formData.name);
    if (normalizedName.length < 2) {
      setErrorMessage(t("onboarding_error_name"));
      return;
    }

    const parsedAge = formData.age ? Number(formData.age) : null;
    if (parsedAge !== null && (!Number.isInteger(parsedAge) || parsedAge < 3 || parsedAge > 21)) {
      setErrorMessage(t("onboarding_error_age"));
      return;
    }

    setIsLoadingQuestions(true);
    try {
      const stageId = inferPlacementStageId({
        gradeLevel: formData.grade,
        ageYears: parsedAge,
      });
      const query = new URLSearchParams({
        questionCount: "10",
        stageId,
      });
      const response = await fetch(`/api/ai/placement-diagnostic?${query.toString()}`, {
        method: "GET",
        cache: "no-store",
      });
      const payload = await response.json().catch(() => ({})) as {
        questions?: unknown;
        error?: string;
      };

      if (response.status === 401) {
        router.push("/auth/sign-in");
        return;
      }
      if (!response.ok) {
        throw new Error(typeof payload.error === "string" ? payload.error : t("onboarding_error_generate"));
      }

      const generatedQuestions = Array.isArray(payload.questions)
        ? payload.questions.filter(isAssessmentQuestion)
        : [];

      if (!generatedQuestions.length) {
        throw new Error(t("onboarding_error_no_questions"));
      }

      setQuestions(generatedQuestions);
      setCurrentQuestionIndex(0);
      setAnswers({});
      setStep("assessment");
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : t("onboarding_error_generate"));
    } finally {
      setIsLoadingQuestions(false);
    }
  };

  const completeAssessment = async (updatedAnswers: Record<number, string>) => {
    setStep("saving");
    setErrorMessage("");

    try {
      const parsedAge = formData.age ? Number(formData.age) : null;
      const normalizedName = sanitizeDisplayName(formData.name);
      if (normalizedName.length < 2) {
        throw new Error(t("onboarding_error_name"));
      }

      const selectedOptionTexts: string[] = [];
      const responses = questions.flatMap((question, index) => {
        const selectedOptionId = updatedAnswers[index] ?? "";
        if (selectedOptionId.length === 0) {
          return [];
        }
        const selectedOption = question.options.find((option) => option.id === selectedOptionId);
        if (!selectedOption) {
          return [];
        }
        selectedOptionTexts.push(selectedOption.text);
        return [{
          moduleId: question.moduleId,
          lessonId: question.lessonId,
          questionId: question.questionId,
          selectedOptionId,
        }];
      });

      if (responses.length < 5) {
        throw new Error(t("onboarding_error_create"));
      }

      const recommendedPathIds = inferInterestPaths(selectedOptionTexts, formData.grade, parsedAge);
      const stageId = inferPlacementStageId({
        gradeLevel: formData.grade,
        ageYears: parsedAge,
      });

      const response = await fetch("/api/ai/placement-diagnostic", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode: "submit",
          profileId: learnerProfileIdRef.current,
          stageId,
          profile: {
            displayName: normalizedName,
            gradeLevel: formData.grade,
            ageYears: parsedAge,
          },
          interestPathIds: recommendedPathIds,
          responses,
        }),
      });
      const payload = await response.json().catch(() => ({})) as {
        success?: boolean;
        error?: string;
      };

      if (response.status === 401) {
        router.push("/auth/sign-in");
        return;
      }
      if (!response.ok || payload.success !== true) {
        throw new Error(typeof payload.error === "string" ? payload.error : t("onboarding_error_create"));
      }

      setCreatedProfileName(normalizedName);
      setStep("complete");
    } catch (error) {
      setStep("assessment");
      setErrorMessage(error instanceof Error ? error.message : t("onboarding_error_create"));
    }
  };

  const handleAnswerSelect = (optionId: string) => {
    const nextAnswers = { ...answers, [currentQuestionIndex]: optionId };
    setAnswers(nextAnswers);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      return;
    }

    void completeAssessment(nextAnswers);
  };

  const resetFlow = () => {
    setStep("info");
    setFormData({ name: "", grade: "3", age: "" });
    setQuestions([]);
    setCurrentQuestionIndex(0);
    setAnswers({});
    setErrorMessage("");
    setCreatedProfileName("");
    learnerProfileIdRef.current = createDraftProfileId();
  };

  return (
    <main
      className="relative min-h-screen overflow-hidden bg-background px-4 py-10 sm:px-6 sm:py-14"
      aria-labelledby="onboarding-heading"
    >
      <div className="family-ambient-bg" aria-hidden="true" />

      <div className="relative mx-auto w-full max-w-2xl">
        {/* Header */}
        <header className="family-card-enter mb-2 text-center">
          <p className="ui-type-eyebrow text-emerald-700">{t("onboarding_header_eyebrow")}</p>
          <h1 id="onboarding-heading" className="ui-type-display-lg mt-2 text-zinc-900">
            {t("onboarding_heading")}
          </h1>
          <p className="ui-type-body-md mx-auto mt-3 max-w-md text-zinc-600">
            {t("onboarding_subtitle")}
          </p>
        </header>

        {/* Step indicator */}
        <StepIndicator current={step} t={t} />

        {/* Error banner */}
        {errorMessage && (
          <div role="alert" className="family-banner mb-5 rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">
            <p className="flex items-start gap-2.5">
              <span className="mt-0.5 shrink-0 text-base" aria-hidden="true">&#9888;</span>
              <span>{errorMessage}</span>
            </p>
          </div>
        )}

        {/* ── Step 1: Info ── */}
        {step === "info" && (
          <SoftCard as="section" organicCorners className="family-card-enter p-6 sm:p-8" aria-label={t("onboarding_section_info_aria")}>
            <form onSubmit={handleInfoSubmit} className="space-y-5">
              <div>
                <label htmlFor="learner-name" className="mb-1.5 block text-sm font-semibold text-zinc-700">
                  {t("onboarding_label_name")}
                </label>
                <input
                  id="learner-name"
                  required
                  type="text"
                  autoComplete="given-name"
                  value={formData.name}
                  onChange={(event) => setFormData((prev) => ({ ...prev, name: event.target.value }))}
                  className="ui-focus-ring w-full rounded-xl border border-border bg-surface px-3 py-2.5 text-sm"
                  placeholder={t("onboarding_placeholder_name")}
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="learner-grade" className="mb-1.5 block text-sm font-semibold text-zinc-700">
                    {t("onboarding_label_grade")}
                  </label>
                  <select
                    id="learner-grade"
                    value={formData.grade}
                    onChange={(event) => setFormData((prev) => ({ ...prev, grade: event.target.value }))}
                    className="ui-focus-ring w-full rounded-xl border border-border bg-surface px-3 py-2.5 text-sm"
                  >
                    {GRADE_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {t(option.labelKey)}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="learner-age" className="mb-1.5 block text-sm font-semibold text-zinc-700">
                    {t("onboarding_label_age")} <span className="font-normal text-zinc-400">{t("onboarding_optional")}</span>
                  </label>
                  <input
                    id="learner-age"
                    type="number"
                    min={3}
                    max={21}
                    value={formData.age}
                    onChange={(event) => setFormData((prev) => ({ ...prev, age: event.target.value }))}
                    className="ui-focus-ring w-full rounded-xl border border-border bg-surface px-3 py-2.5 text-sm"
                    placeholder={t("onboarding_placeholder_age")}
                  />
                </div>
              </div>

              {/* Single primary CTA, cancel is secondary */}
              <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
                <Link
                  href="/select-profile"
                  className="ui-focus-ring inline-flex min-h-11 items-center justify-center rounded-full border border-zinc-200 bg-surface-muted px-5 py-2 text-sm font-semibold text-zinc-600 transition-colors hover:bg-zinc-100"
                >
                  {t("common_cancel")}
                </Link>
                <button
                  type="submit"
                  disabled={isLoadingQuestions}
                  className="ui-soft-button ui-focus-ring inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-accent px-6 py-2 text-sm font-semibold text-white disabled:opacity-60"
                >
                  {isLoadingQuestions ? (
                    <>
                      <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" aria-hidden="true" />
                      {t("onboarding_preparing")}
                    </>
                  ) : (
                    t("onboarding_continue_to_diagnostic")
                  )}
                </button>
              </div>
            </form>
          </SoftCard>
        )}

        {/* ── Step 2: Assessment ── */}
        {step === "assessment" && currentQuestion && (
          <SoftCard as="section" organicCorners className="family-card-enter p-6 sm:p-8" aria-label={t("onboarding_section_diagnostic_aria")}>
            {/* Question progress bar */}
            <div className="mb-6">
              <div className="mb-2 flex items-center justify-between text-xs font-semibold">
                <span className="text-zinc-500" aria-live="polite">
                  {t("onboarding_question_progress", { current: currentQuestionIndex + 1, total: questions.length })}
                </span>
                <span className="uppercase tracking-wide text-zinc-400">{t("onboarding_diagnostic_label")}</span>
              </div>
              <div
                className="h-1.5 w-full overflow-hidden rounded-full bg-zinc-100"
                role="progressbar"
                aria-valuenow={currentQuestionIndex + 1}
                aria-valuemin={1}
                aria-valuemax={questions.length}
                aria-label={t("onboarding_assessment_progress_aria")}
              >
                <div
                  className="h-full rounded-full bg-emerald-500 transition-all duration-300 ease-out"
                  style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
                />
              </div>
            </div>

            <h2 className="ui-type-heading-lg mb-6 text-zinc-900">{currentQuestion.questionText}</h2>

            <fieldset>
              <legend className="sr-only">{t("onboarding_select_answer_legend")}</legend>
              <div className="space-y-2.5">
                {currentQuestion.options.map((option) => {
                  const isSelected = answers[currentQuestionIndex] === option.id;
                  const visual = extractOptionVisual(option.text);
                  return (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => handleAnswerSelect(option.id)}
                      aria-pressed={isSelected}
                      className={`ui-focus-ring w-full rounded-xl border px-4 py-3 text-left text-sm font-semibold transition-colors ${
                        isSelected
                          ? "border-emerald-400 bg-emerald-50 text-emerald-800"
                          : "border-zinc-200 bg-white text-zinc-700 hover:border-emerald-300 hover:bg-emerald-50/50"
                      }`}
                    >
                      {imageAssistMode ? (
                        <span className="flex items-center gap-3">
                          {visual.emoji ? (
                            <span className="text-2xl leading-none" aria-hidden="true">
                              {visual.emoji}
                            </span>
                          ) : null}
                          <span>{visual.label}</span>
                        </span>
                      ) : (
                        option.text
                      )}
                    </button>
                  );
                })}
              </div>
            </fieldset>

            <div className="mt-6">
              <button
                type="button"
                onClick={() => setCurrentQuestionIndex((prev) => Math.max(0, prev - 1))}
                disabled={currentQuestionIndex === 0}
                className="ui-focus-ring rounded-full border border-zinc-200 bg-surface-muted px-4 py-2 text-sm font-semibold text-zinc-600 transition-colors hover:bg-zinc-100 disabled:opacity-40 disabled:hover:bg-surface-muted"
              >
                {t("onboarding_previous")}
              </button>
            </div>
          </SoftCard>
        )}

        {/* ── Step 3: Saving ── */}
        {step === "saving" && (
          <SoftCard as="section" className="family-card-enter p-10 text-center" aria-label={t("onboarding_section_saving_aria")}>
            <div className="mx-auto mb-5 family-orbit-spinner" role="status" aria-label={t("onboarding_saving_spinner_aria")} />
            <h2 className="ui-type-heading-md text-zinc-900">{t("onboarding_building_plan_title")}</h2>
            <p className="ui-type-body-sm mx-auto mt-2 max-w-xs text-zinc-500">
              {t("onboarding_building_plan_desc")}
            </p>
          </SoftCard>
        )}

        {/* ── Step 4: Complete ── */}
        {step === "complete" && (
          <SoftCard
            as="section"
            organicCorners
            className="family-success-pop border-emerald-200 bg-emerald-50 p-8 text-center"
            aria-label={t("onboarding_section_complete_aria")}
          >
            <div className="mb-3 text-4xl" aria-hidden="true">
              &#10024;
            </div>
            <h2 className="ui-type-heading-lg text-emerald-900">{t("onboarding_profile_ready")}</h2>
            <p className="ui-type-body-sm mx-auto mt-2 max-w-xs text-emerald-800">
              {t("onboarding_profile_ready_desc", {
                name: createdProfileName || t("onboarding_default_learner"),
              })}
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link
                href="/select-profile"
                className="ui-soft-button ui-focus-ring inline-flex min-h-11 items-center justify-center rounded-full bg-emerald-600 px-6 py-2 text-sm font-semibold text-white hover:bg-emerald-500"
              >
                {t("onboarding_choose_learner")}
              </Link>
              <button
                type="button"
                onClick={resetFlow}
                className="ui-focus-ring inline-flex min-h-11 items-center justify-center rounded-full border border-emerald-200 bg-white px-6 py-2 text-sm font-semibold text-emerald-700 transition-colors hover:bg-emerald-100"
              >
                {t("onboarding_add_another")}
              </button>
            </div>
          </SoftCard>
        )}
      </div>
    </main>
  );
}
