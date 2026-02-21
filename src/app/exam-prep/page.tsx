import Link from "next/link";
import { getAllLearningModules } from "@/lib/modules";
import ModuleCoverImage from "@/app/components/module-cover-image";
import { toModulePath } from "@/lib/routing/paths";

export const dynamic = "force-dynamic";

type ExamRegion = "Global" | "US" | "UK" | "India" | "China" | "Australia" | "Other";

const trackMetadata: Record<string, { track: string; region: ExamRegion }> = {
  sat: { track: "SAT", region: "US" },
  act: { track: "ACT", region: "US" },
  ap: { track: "AP", region: "US" },
  toefl: { track: "TOEFL", region: "Global" },
  ielts: { track: "IELTS", region: "Global" },
  gcse: { track: "GCSE", region: "UK" },
  "a-level": { track: "A-Level", region: "UK" },
  ib: { track: "IB Diploma", region: "Global" },
  "jee-neet": { track: "JEE/NEET", region: "India" },
  cuet: { track: "CUET", region: "India" },
  gaokao: { track: "Gaokao", region: "China" },
  atar: { track: "ATAR", region: "Australia" },
};

function getTrackKeyFromModuleId(moduleId: string) {
  const match = moduleId.match(/^(.+?)-prep-/i);
  if (!match) return null;
  return match[1].toLowerCase();
}

function getExamModules() {
  return getAllLearningModules()
    .filter((module) => module.tags?.includes("exam-prep"))
    .map((module) => {
      const trackKey = getTrackKeyFromModuleId(module.id);
      const metadata =
        (trackKey ? trackMetadata[trackKey] : null) ?? {
          track: module.title,
          region: "Other" as ExamRegion,
        };
      return {
        ...module,
        track: metadata.track,
        region: metadata.region,
      };
    })
    .sort(
      (a, b) =>
        a.region.localeCompare(b.region) ||
        a.track.localeCompare(b.track) ||
        a.title.localeCompare(b.title),
    );
}

export default function ExamPrepPage() {
  const examModules = getExamModules();
  const regions: ExamRegion[] = ["Global", "US", "UK", "India", "China", "Australia", "Other"];
  const regionCounts = regions
    .map((region) => ({
      region,
      count: examModules.filter((module) => module.region === region).length,
    }))
    .filter((entry) => entry.count > 0);
  const uniqueTracks = new Set(examModules.map((module) => module.track));

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-12">
      <header className="rounded-2xl border border-indigo-200 bg-gradient-to-r from-sky-50 via-indigo-50 to-amber-50 p-6">
        <p className="text-xs font-semibold uppercase tracking-wide text-indigo-700">Exam Preparation Tracks</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-900">Global Exam Prep Hub</h1>
        <p className="mt-2 max-w-3xl text-sm text-zinc-700">
          Structured pathways for major entrance and high-stakes exams. Each track includes guided lessons,
          interactive practice, quiz checkpoints, and full mock review cycles.
        </p>
        <div className="mt-4 grid gap-2 sm:grid-cols-3">
          <article className="rounded-lg border border-indigo-200 bg-white/80 p-3">
            <p className="text-xs uppercase tracking-wide text-indigo-700">Tracks</p>
            <p className="mt-1 text-2xl font-semibold text-zinc-900">{uniqueTracks.size}</p>
          </article>
          <article className="rounded-lg border border-indigo-200 bg-white/80 p-3">
            <p className="text-xs uppercase tracking-wide text-indigo-700">Modules</p>
            <p className="mt-1 text-2xl font-semibold text-zinc-900">{examModules.length}</p>
          </article>
          <article className="rounded-lg border border-indigo-200 bg-white/80 p-3">
            <p className="text-xs uppercase tracking-wide text-indigo-700">Regions</p>
            <p className="mt-1 text-2xl font-semibold text-zinc-900">{regionCounts.length}</p>
          </article>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {regionCounts.map((entry) => (
            <span
              key={entry.region}
              className="rounded-full border border-indigo-200 bg-white/80 px-3 py-1 text-xs font-medium text-indigo-800"
            >
              {entry.region}: {entry.count}
            </span>
          ))}
        </div>
      </header>

      {regions
        .map((region) => ({
          region,
          modules: examModules.filter((module) => module.region === region),
        }))
        .filter((entry) => entry.modules.length > 0)
        .map((entry) => (
          <section key={entry.region} className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-zinc-900">{entry.region}</h2>
              <p className="text-xs text-zinc-500">{entry.modules.length} track(s)</p>
            </div>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {entry.modules.map((module) => (
                <article key={module.id} className="rounded-xl border border-black/10 bg-white p-5 shadow-sm">
                  <ModuleCoverImage
                    moduleId={module.id}
                    moduleTitle={module.title}
                    fallbackSrc={module.thumbnail}
                    className="h-36 w-full rounded-lg border border-black/5 object-cover"
                  />
                  <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-indigo-700">{module.track}</p>
                  <h3 className="mt-2 text-lg font-semibold text-zinc-900">{module.title}</h3>
                  <p className="mt-2 text-sm text-zinc-700">{module.description}</p>
                  <p className="mt-3 text-xs text-zinc-500">
                    Lessons: {module.lessons.length} | Ages {module.minAge ?? "?"}-{module.maxAge ?? "?"}
                  </p>
                  <div className="mt-4">
                    <Link
                      href={toModulePath(module.id)}
                      className="inline-flex rounded-md border border-indigo-300 bg-indigo-50 px-3 py-2 text-sm font-medium text-indigo-800 hover:bg-indigo-100"
                    >
                      Open Track
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </section>
        ))}

      {examModules.length === 0 ? (
        <p className="rounded-lg border border-amber-300 bg-amber-50 p-4 text-sm text-amber-800">
          No exam-prep tracks are currently registered. Run module generation and sync scripts to add them.
        </p>
      ) : null}
    </main>
  );
}
