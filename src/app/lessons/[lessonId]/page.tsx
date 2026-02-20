import { type Lesson, type Question } from "@/lib/data/curriculum";
import { getLessonByLookupKey } from "@/lib/modules";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import Quiz from "./quiz";
import LessonImage from "./lesson-image";
import InteractiveActivity from "./interactive-activity";
import { buildSeedanceAnimationPrompt, buildSeedanceVideoPrompt } from "@/lib/media/seedance-prompts";
import LessonMediaOps from "./lesson-media-ops";
import VideoLessonPlayer from "./video-lesson-player";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import LessonAnimationPreview from "./lesson-animation-preview";

export default function LessonPage({
  params,
}: {
  params: { lessonId: string } | Promise<{ lessonId: string }>;
}) {
  return <LessonPageContent params={params} />;
}

async function LessonPageContent({
  params,
}: {
  params: { lessonId: string } | Promise<{ lessonId: string }>;
}) {
  const resolvedParams = await Promise.resolve(params);
  const resolvedLesson = getLessonByLookupKey(resolvedParams.lessonId);

  if (!resolvedLesson) {
    notFound();
  }

  const { lesson, learningModule } = resolvedLesson;
  if (resolvedParams.lessonId !== lesson.id) {
    redirect(`/lessons/${lesson.id}`);
  }

  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  let isAdmin = false;
  if (!userError && user) {
    const { data: profile } = await supabase
      .from("user_profiles")
      .select("is_admin")
      .eq("user_id", user.id)
      .maybeSingle();
    isAdmin = Boolean(profile?.is_admin);
  }

  const lessonImagePrompt = `Create a warm, child-friendly educational illustration for a ${learningModule.subject} lesson about ${lesson.title}. Style: clean 2D digital illustration, soft shapes, high readability.`;
  const seedanceVideoPrompt = buildSeedanceVideoPrompt(learningModule, lesson);
  const seedanceAnimationPrompt = buildSeedanceAnimationPrompt(learningModule, lesson);
  const activityPrompts =
    Array.isArray(lesson.metadata?.prompts) && lesson.metadata.prompts.length > 0
      ? lesson.metadata.prompts
      : ["Explore the idea and describe one thing you noticed."];

  const renderContent = () => {
    switch (lesson.type) {
      case "video":
        return (
          <VideoLessonPlayer
            moduleId={learningModule.id}
            lessonId={lesson.id}
            lessonTitle={lesson.title}
            subject={learningModule.subject}
            durationMinutes={lesson.duration}
            learningAids={lesson.learningAids ?? []}
          />
        );
      case "interactive":
        if (lesson.metadata?.route && typeof lesson.metadata.route === "string") {
          return (
            <div className="flex flex-col items-center justify-center gap-4 rounded-lg border border-black/10 bg-zinc-50 p-8">
              <p className="text-center text-sm text-zinc-600">
                This lesson launches a specialized interactive module.
              </p>
              <Link
                href={lesson.metadata.route}
                className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white"
              >
                Open Interactive Module
              </Link>
            </div>
          );
        }

        return (
          <InteractiveActivity lessonId={lesson.id} title={lesson.title} prompts={activityPrompts} />
        );
      case "quiz":
        return lesson.questions && lesson.questions.length > 0 ? (
          <Quiz lesson={lesson as Lesson & { questions: Question[] }} />
        ) : (
          <div className="flex items-center justify-center rounded-lg bg-zinc-100 p-8">
            <p className="text-zinc-500">This quiz is not yet available.</p>
          </div>
        );
      default:
        return <p>Unsupported lesson type.</p>;
    }
  };

  return (
    <main className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-5 py-8 sm:px-6 sm:py-10">
      <header className="overflow-hidden rounded-3xl border border-border bg-[var(--gradient-hero)] p-6 shadow-sm sm:p-8">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 text-sm font-medium text-zinc-700 hover:bg-white"
        >
          <span aria-hidden>🧭</span>
          <span>Back to Dashboard</span>
        </Link>
        <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-zinc-600">
          Adventure Path: {learningModule.subject}
        </p>
        <h1 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
          {lesson.title} ✨
        </h1>
        <p className="mt-2 text-sm font-medium text-zinc-700">
          {lesson.duration} minute activity
        </p>
      </header>

      <section className="rounded-3xl border border-border bg-surface p-4 shadow-sm sm:p-6">
        <LessonImage prompt={lessonImagePrompt} moduleId={learningModule.id} lessonId={lesson.id} />
      </section>

      <section className="rounded-3xl border border-border bg-surface p-4 shadow-sm sm:p-6">{renderContent()}</section>

      {lesson.learningAids && lesson.learningAids.length > 0 ? (
        <section className="rounded-3xl border border-indigo-200 bg-indigo-50 p-4 shadow-sm sm:p-6">
          <h2 className="text-xl font-bold text-indigo-900">Learning Aids</h2>
          <div className="mt-3">
            <LessonAnimationPreview moduleId={learningModule.id} lessonId={lesson.id} />
          </div>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            {lesson.learningAids.map((aid) => (
              <article key={aid.id} className="rounded-xl border border-indigo-200 bg-white p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-indigo-700">{aid.type}</p>
                <h3 className="mt-1 text-sm font-semibold text-zinc-900">{aid.title}</h3>
                <p className="mt-2 text-sm text-zinc-700">{aid.content}</p>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      {isAdmin ? (
        <section className="rounded-3xl border border-amber-200 bg-amber-50 p-4 shadow-sm sm:p-6">
          <h2 className="text-xl font-bold text-amber-900">Seedance 2.0 Production Prompts</h2>
          <p className="mt-1 text-sm text-amber-800">
            Use these placeholders to generate final video and animation assets for this lesson.
          </p>
          <div className="mt-3">
            <LessonMediaOps
              moduleId={learningModule.id}
              lessonId={lesson.id}
              videoPrompt={seedanceVideoPrompt}
              animationPrompt={seedanceAnimationPrompt}
              imagePrompt={lessonImagePrompt}
            />
          </div>
        </section>
      ) : null}
    </main>
  );
}
