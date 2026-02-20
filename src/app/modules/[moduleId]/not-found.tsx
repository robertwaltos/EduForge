import Link from "next/link";
import { getAllLearningModules } from "@/lib/modules";

export default function ModuleNotFound() {
  const modules = getAllLearningModules().slice(0, 12);

  return (
    <main className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-6 py-12">
      <header className="rounded-2xl border border-amber-200 bg-amber-50 p-6">
        <p className="text-xs font-semibold uppercase tracking-wide text-amber-700">Module Not Found</p>
        <h1 className="mt-2 text-2xl font-bold text-zinc-900">That learning module link is unavailable.</h1>
        <p className="mt-2 text-sm text-zinc-700">
          The module may have been renamed or removed. Choose an available module below.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Link href="/modules" className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-medium text-white">
            Browse All Modules
          </Link>
          <Link href="/dashboard" className="rounded-md border border-black/15 px-3 py-2 text-sm hover:bg-black/5">
            Back to Dashboard
          </Link>
        </div>
      </header>

      <section className="rounded-2xl border border-black/10 bg-white p-5">
        <h2 className="text-lg font-semibold text-zinc-900">Available Modules</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {modules.map((learningModule) => (
            <Link
              key={learningModule.id}
              href={`/modules/${learningModule.id}`}
              className="rounded-lg border border-black/10 p-3 text-sm hover:bg-zinc-50"
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-indigo-700">{learningModule.subject}</p>
              <p className="mt-1 font-medium text-zinc-900">{learningModule.title}</p>
              <p className="mt-1 text-xs text-zinc-600">{learningModule.lessons.length} lessons</p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
