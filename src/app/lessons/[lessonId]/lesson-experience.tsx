"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import type { InteractiveActivity as LessonInteractiveActivity, Lesson, LessonChunk, Question } from "@/lib/modules/types";
import LessonImage from "./lesson-image";
import LessonFlashcards from "./lesson-flashcards";
import InteractiveActivity from "./interactive-activity";
import TypedInteractiveActivity from "./typed-interactive-activity";
import Quiz from "./quiz";
import VideoLessonPlayer from "./video-lesson-player";
import LessonAnimationPreview from "./lesson-animation-preview";
import LessonMediaOps from "./lesson-media-ops";
import AiFollowupPanel from "./ai-followup-panel";
import AiRemediationWorksheetPanel from "./ai-remediation-worksheet-panel";
import AiLessonTutor from "./ai-lesson-tutor";
import { trackLearningEvent } from "@/lib/analytics/xapi-lite";
import JuicyTabBar from "@/components/experience/JuicyTabBar";
import SoftCard from "@/app/components/ui/soft-card";
import MascotHost from "@/components/experience/MascotHost";
import PhysicalButton from "@/components/experience/PhysicalButton";
import { Sparkles } from "lucide-react";

type LessonTabId = "learn" | "flashcards" | "interactive" | "quiz" | "media";

type LessonExperienceProps = {
  moduleId: string;
  subject: string;
  lesson: Lesson;
  isAdmin: boolean;
  lessonImagePrompt: string;
  seedanceVideoPrompt: string;
  seedanceAnimationPrompt: string;
};

const tabConfig: Array<{ id: LessonTabId; label: string }> = [
  { id: "learn", label: "Learn" },
  { id: "flashcards", label: "Flashcards" },
  { id: "interactive", label: "Interactive" },
  { id: "quiz", label: "Quiz" },
  { id: "media", label: "Media" },
];

function getDefaultTab(lessonType: Lesson["type"]): LessonTabId {
  if (lessonType === "interactive") return "interactive";
  if (lessonType === "quiz") return "quiz";
  return "learn";
}

function normalizeChunks(lesson: Lesson): LessonChunk[] {
  if (Array.isArray(lesson.chunks) && lesson.chunks.length > 0) {
    return lesson.chunks;
  }

  const objectiveChunks =
    Array.isArray(lesson.objectives) && lesson.objectives.length > 0
      ? lesson.objectives.map((objective, index) => ({
        id: `${lesson.id}-objective-chunk-${index + 1}`,
        title: `Objective ${index + 1}`,
        content: objective,
        kind: "concept" as const,
      }))
      : [];

  if (objectiveChunks.length > 0) {
    return objectiveChunks;
  }

  return [
    {
      id: `${lesson.id}-overview`,
      title: "Lesson Overview",
      content: `Work through this lesson and complete each section to build mastery.`,
      kind: "intro",
    },
  ];
}

function formatSkillLabel(skillId: string) {
  return skillId
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function synthesizeInteractiveActivities(
  lesson: Lesson,
  quizQuestions: Question[],
): LessonInteractiveActivity[] {
  if (quizQuestions.length < 3) {
    return [];
  }

  const activities: LessonInteractiveActivity[] = [];
  const matchingQuestions = quizQuestions.slice(0, 6);

  const left = matchingQuestions.map((question, index) => ({
    id: `left-${index + 1}`,
    label: question.text,
  }));

  const right: Array<{ id: string; label: string }> = [];
  const pairs: Array<{ leftId: string; rightId: string }> = [];
  matchingQuestions.forEach((question, index) => {
    const correctOption = question.options.find((option) => option.id === question.correctOptionId);
    if (!correctOption) {
      return;
    }
    const rightId = `right-${index + 1}`;
    right.push({ id: rightId, label: correctOption.text });
    pairs.push({ leftId: `left-${index + 1}`, rightId });
  });

  if (left.length >= 3 && right.length >= 3 && pairs.length >= 3) {
    activities.push({
      id: `${lesson.id}-fallback-matching`,
      type: "matching_pairs",
      title: "Concept Match-Up",
      description: "Match each prompt to the best answer.",
      estimatedMinutes: Math.max(4, Math.min(10, matchingQuestions.length + 2)),
      difficultyLevel: "medium",
      data: {
        left,
        right,
        pairs,
      },
    });
  }

  const skillIds = Array.from(
    new Set(
      matchingQuestions
        .map((question) => question.skillId)
        .filter((skillId): skillId is string => typeof skillId === "string" && skillId.trim().length > 0),
    ),
  );

  if (skillIds.length >= 2) {
    const buckets = skillIds.slice(0, 4).map((skillId, index) => ({
      id: `bucket-${index + 1}`,
      label: formatSkillLabel(skillId),
      skillId,
    }));
    const bucketIdBySkill = new Map(buckets.map((bucket) => [bucket.skillId, bucket.id] as const));
    const items = matchingQuestions
      .map((question, index) => {
        const questionSkillId =
          typeof question.skillId === "string" && question.skillId.length > 0
            ? question.skillId
            : null;
        if (!questionSkillId) {
          return null;
        }
        const bucketId = bucketIdBySkill.get(questionSkillId);
        if (!bucketId) {
          return null;
        }
        const correctOption = question.options.find((option) => option.id === question.correctOptionId);
        const shortPrompt =
          question.text.length > 110 ? `${question.text.slice(0, 107).trimEnd()}...` : question.text;
        return {
          id: `item-${index + 1}`,
          label: `${shortPrompt} -> ${correctOption?.text ?? "Correct answer"}`,
          correctBucketId: bucketId,
        };
      })
      .filter((item): item is { id: string; label: string; correctBucketId: string } => item !== null);

    if (buckets.length >= 2 && items.length >= 3) {
      activities.unshift({
        id: `${lesson.id}-fallback-sorting`,
        type: "sorting_buckets",
        title: "Skill Sort Challenge",
        description: "Sort each solved prompt into the skill bucket it trains.",
        estimatedMinutes: Math.max(4, Math.min(10, items.length + 2)),
        difficultyLevel: "medium",
        data: {
          buckets: buckets.map(({ id, label }) => ({ id, label })),
          items,
        },
      });
    }
  }

  return activities;
}

export default function LessonExperience({
  moduleId,
  subject,
  lesson,
  isAdmin,
  lessonImagePrompt,
  seedanceVideoPrompt,
  seedanceAnimationPrompt,
}: LessonExperienceProps) {
  const [activeTab, setActiveTab] = useState<LessonTabId>(getDefaultTab(lesson.type));
  const chunks = useMemo(() => normalizeChunks(lesson), [lesson]);
  const [activeChunkId, setActiveChunkId] = useState<string>(chunks[0]?.id ?? "");
  const trackedChunksRef = useRef<Set<string>>(new Set());

  const activeChunk = useMemo(
    () => chunks.find((chunk) => chunk.id === activeChunkId) ?? chunks[0] ?? null,
    [activeChunkId, chunks],
  );

  const friendId = useMemo(() => {
    const s = subject.toLowerCase();
    if (s.includes("math") || s.includes("number")) return "spark";
    if (s.includes("read") || s.includes("phonics") || s.includes("letter")) return "echo";
    if (s.includes("art") || s.includes("creative") || s.includes("music") || s.includes("story")) return "luna";
    if (s.includes("science") || s.includes("nature") || s.includes("explore") || s.includes("world")) return "terra";
    return "pixel";
  }, [subject]);

  const interactivePrompts = useMemo(() => {
    const metadataPrompts =
      Array.isArray(lesson.metadata?.prompts) && lesson.metadata.prompts.length > 0
        ? lesson.metadata.prompts.filter((entry): entry is string => typeof entry === "string" && entry.trim().length > 0)
        : [];
    if (metadataPrompts.length > 0) {
      return metadataPrompts;
    }

    if (Array.isArray(lesson.objectives) && lesson.objectives.length > 0) {
      return lesson.objectives;
    }

    return chunks.map((chunk) => chunk.title);
  }, [chunks, lesson.metadata, lesson.objectives]);

  const quizQuestions = useMemo(
    () => (Array.isArray(lesson.questions) ? lesson.questions : []),
    [lesson.questions],
  );
  const hasQuiz = quizQuestions.length > 0;
  const typedActivities = useMemo(() => {
    if (Array.isArray(lesson.interactiveActivities) && lesson.interactiveActivities.length > 0) {
      return lesson.interactiveActivities;
    }
    return synthesizeInteractiveActivities(lesson, quizQuestions);
  }, [lesson, quizQuestions]);
  const hasTypedInteractiveActivities = typedActivities.length > 0;
  const lessonTabs = useMemo(
    () =>
      tabConfig.map((tab) => {
        if (tab.id === "learn") {
          return { ...tab, count: chunks.length };
        }
        if (tab.id === "flashcards") {
          return { ...tab, count: lesson.flashcards?.length ?? 0 };
        }
        if (tab.id === "interactive") {
          return { ...tab, count: hasTypedInteractiveActivities ? typedActivities.length : interactivePrompts.length };
        }
        if (tab.id === "quiz") {
          return { ...tab, count: quizQuestions.length };
        }
        if (tab.id === "media") {
          return { ...tab, count: lesson.learningAids?.length ?? 0 };
        }
        return tab;
      }),
    [chunks.length, hasTypedInteractiveActivities, interactivePrompts.length, lesson.flashcards?.length, lesson.learningAids?.length, quizQuestions.length, typedActivities.length],
  );

  useEffect(() => {
    void trackLearningEvent({
      eventType: "activity_interacted",
      moduleId,
      lessonId: lesson.id,
      payload: {
        action: "tab_opened",
        tab: activeTab,
      },
    });
  }, [activeTab, lesson.id, moduleId]);

  useEffect(() => {
    if (activeTab !== "learn" || !activeChunk) {
      return;
    }
    if (trackedChunksRef.current.has(activeChunk.id)) {
      return;
    }
    trackedChunksRef.current.add(activeChunk.id);
    void trackLearningEvent({
      eventType: "chunk_viewed",
      moduleId,
      lessonId: lesson.id,
      payload: {
        chunkId: activeChunk.id,
        chunkTitle: activeChunk.title,
        source: "lesson-learn-tab",
      },
    });
  }, [activeChunk, activeTab, lesson.id, moduleId]);

  return (
    <MascotHost initialMood="happy" friendId={friendId}>
      <section className="space-y-6">
        <JuicyTabBar
          ariaLabel="Lesson sections"
          value={activeTab}
          tabs={lessonTabs}
          onChange={setActiveTab}
        />

        {activeTab === "learn" ? (
          <div className="lesson-tab-panel space-y-4">
            <SoftCard as="section" className="p-4 sm:p-6">
              <LessonImage prompt={lessonImagePrompt} moduleId={moduleId} lessonId={lesson.id} />
            </SoftCard>

            <section className="grid gap-4 lg:grid-cols-[260px_1fr]">
              <SoftCard as="aside" className="border-sky-200 bg-sky-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-sky-700">Lesson Chunks</p>
                <div className="mt-3 space-y-2">
                  {chunks.map((chunk, index) => {
                    const isSelected = activeChunk?.id === chunk.id;
                    return (
                      <button
                        key={chunk.id}
                        type="button"
                        onClick={() => setActiveChunkId(chunk.id)}
                        className={`ui-focus-ring ui-soft-button w-full min-h-11 rounded-xl border px-3 py-2 text-left text-sm ${isSelected
                          ? "border-sky-300 bg-white text-sky-900"
                          : "border-sky-200 bg-sky-50 text-zinc-700 hover:bg-white"
                          }`}
                      >
                        <p className="text-xs font-semibold uppercase tracking-wide text-sky-700">Chunk {index + 1}</p>
                        <p className="mt-1 font-semibold">{chunk.title}</p>
                      </button>
                    );
                  })}
                </div>
              </SoftCard>

              <SoftCard as="article" className="border-sky-200 p-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-sky-700">
                  {activeChunk?.kind ?? "lesson chunk"}
                </p>
                <h2 className="mt-1 text-2xl font-extrabold text-zinc-900">{activeChunk?.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-zinc-700">{activeChunk?.content}</p>
                {lesson.type === "video" ? (
                  <div className="mt-5">
                    <VideoLessonPlayer
                      moduleId={moduleId}
                      lessonId={lesson.id}
                      lessonTitle={lesson.title}
                      subject={subject}
                      durationMinutes={lesson.duration}
                      learningAids={lesson.learningAids ?? []}
                    />
                  </div>
                ) : null}
              </SoftCard>
            </section>
          </div>
        ) : null}

        {activeTab === "flashcards" ? (
          <LessonFlashcards
            moduleId={moduleId}
            lessonId={lesson.id}
            lessonTitle={lesson.title}
            flashcards={lesson.flashcards}
            objectives={lesson.objectives}
            chunks={chunks}
          />
        ) : null}

        {activeTab === "interactive" ? (
          <div className="lesson-tab-panel space-y-4">
            {typeof lesson.metadata?.route === "string" && lesson.metadata.route.length > 0 ? (
              <SoftCard as="section" className="border-amber-200 bg-amber-50 p-6">
                <p className="text-sm text-amber-900">
                  This lesson includes a specialized interactive route.
                </p>
                <Link href={lesson.metadata.route} className="mt-4 block">
                  <PhysicalButton variant="success" className="w-full">
                    <Sparkles className="h-6 w-6" />
                    Step Into the Activity
                  </PhysicalButton>
                </Link>
              </SoftCard>
            ) : null}
            {hasTypedInteractiveActivities ? (
              <TypedInteractiveActivity
                moduleId={moduleId}
                lessonId={lesson.id}
                lessonTitle={lesson.title}
                activities={typedActivities}
                fallbackPrompts={interactivePrompts}
              />
            ) : (
              <InteractiveActivity
                moduleId={moduleId}
                lessonId={lesson.id}
                title={lesson.title}
                prompts={interactivePrompts}
              />
            )}
          </div>
        ) : null}

        {activeTab === "quiz" ? (
          hasQuiz ? (
            <Quiz moduleId={moduleId} lesson={{ ...lesson, questions: quizQuestions } as Lesson & { questions: Question[] }} />
          ) : (
            <SoftCard as="section" className="border-emerald-200 bg-emerald-50 p-6 text-sm text-emerald-900">
              Quiz content is not available yet for this lesson.
            </SoftCard>
          )
        ) : null}

        {activeTab === "media" ? (
          <SoftCard as="section" className="lesson-tab-panel space-y-4 border-indigo-200 bg-indigo-50 p-4 sm:p-6">
            <h2 className="text-xl font-bold text-indigo-900">Lesson Media</h2>
            <LessonAnimationPreview moduleId={moduleId} lessonId={lesson.id} />

            {Array.isArray(lesson.learningAids) && lesson.learningAids.length > 0 ? (
              <div className="grid gap-3 sm:grid-cols-2">
                {lesson.learningAids.map((aid) => (
                  <SoftCard key={aid.id} as="article" className="border-indigo-200 p-4">
                    <p className="text-xs font-semibold uppercase tracking-wide text-indigo-700">{aid.type}</p>
                    <h3 className="mt-1 text-sm font-semibold text-zinc-900">{aid.title}</h3>
                    <p className="mt-2 text-sm text-zinc-700">{aid.content}</p>
                  </SoftCard>
                ))}
              </div>
            ) : (
              <p className="text-sm text-zinc-700">No lesson aids are attached yet.</p>
            )}

            {isAdmin ? (
              <SoftCard as="section" className="border-amber-200 bg-amber-50 p-4">
                <h3 className="text-lg font-bold text-amber-900">Seedance 2.0 Production Prompts</h3>
                <p className="mt-1 text-sm text-amber-800">
                  Use these placeholders to generate final video and animation assets for this lesson.
                </p>
                <div className="mt-3">
                  <LessonMediaOps
                    moduleId={moduleId}
                    lessonId={lesson.id}
                    videoPrompt={seedanceVideoPrompt}
                    animationPrompt={seedanceAnimationPrompt}
                    imagePrompt={lessonImagePrompt}
                  />
                </div>
              </SoftCard>
            ) : null}
          </SoftCard>
        ) : null}

        <AiFollowupPanel lessonId={lesson.id} moduleId={moduleId} />
        <AiRemediationWorksheetPanel lessonId={lesson.id} moduleId={moduleId} />
        <AiLessonTutor lessonId={lesson.id} lessonTitle={lesson.title} />
      </section>
    </MascotHost>
  );
}
