import Link from "next/link";
import { getAllLearningModules } from "@/lib/modules";

export default function LessonNotFound() {
  const modules = getAllLearningModules().slice(0, 8);

  return (
    <main className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-6 py-12">
      <header className="rounded-2xl border border-rose-200 bg-rose-50 p-6">
        <p className="text-xs font-semibold uppercase tracking-wide text-rose-700">Lesson Not Found</p>
        <h1 className="mt-2 text-2xl font-bold text-zinc-900">That lesson link is unavailable.</h1>
        <p className="mt-2 text-sm text-zinc-700">
          The lesson may have moved during curriculum updates. Jump back to a valid module or dashboard path.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Link href="/dashboard" className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-medium text-white">
            Go to Dashboard
          </Link>
          <Link href="/modules" className="rounded-md border border-black/15 px-3 py-2 text-sm hover:bg-black/5">
            Browse Modules
          </Link>
        </div>
      </header>

      <section className="rounded-2xl border border-black/10 bg-white p-5">
        <h2 className="text-lg font-semibold text-zinc-900">Start With These Modules</h2>
        <ul className="mt-4 space-y-2">
          {modules.map((learningModule) => (
            <li key={learningModule.id}>
              <Link
                href={`/modules/${learningModule.id}`}
                className="flex items-center justify-between rounded-lg border border-black/10 px-3 py-2 text-sm hover:bg-zinc-50"
              >
                <span className="font-medium text-zinc-900">{learningModule.title}</span>
                <span className="text-xs text-zinc-600">{learningModule.lessons.length} lessons</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
