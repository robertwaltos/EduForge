import fs from "node:fs/promises";
import path from "node:path";

const projectRoot = process.cwd();
const catalogDir = path.join(projectRoot, "src", "lib", "modules", "catalog");

function parseArgs() {
  const raw = process.argv.slice(2);
  const args = {};
  for (let i = 0; i < raw.length; i += 1) {
    const token = raw[i];
    if (!token.startsWith("--")) continue;
    const key = token.replace(/^--/, "");
    const value = raw[i + 1] && !raw[i + 1].startsWith("--") ? raw[i + 1] : "true";
    args[key] = value;
    if (value !== "true") i += 1;
  }
  return args;
}

function toId(value) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function toConstName(id) {
  const base = id
    .split("-")
    .filter(Boolean)
    .map((part) => part[0].toUpperCase() + part.slice(1))
    .join("");
  return `${base}Module`;
}

function escapeString(value) {
  return String(value).replace(/\\/g, "\\\\").replace(/"/g, '\\"');
}

function buildLesson(moduleId, index, baseTopic) {
  const n = String(index + 1).padStart(2, "0");
  const lessonId = `${moduleId}-l${n}`;
  const isQuiz = (index + 1) % 3 === 0 || index === 9;
  const isInteractive = !isQuiz && (index + 1) % 2 === 0;
  const lessonTitle = isQuiz
    ? `Checkpoint ${Math.ceil((index + 1) / 3)}: ${baseTopic}`
    : isInteractive
      ? `${baseTopic} Practice ${index + 1}`
      : `${baseTopic} Concepts ${index + 1}`;
  const duration = isQuiz ? 10 : isInteractive ? 12 : 9;

  if (isQuiz) {
    return `{
      id: "${lessonId}",
      title: "${lessonTitle}",
      type: "quiz",
      duration: ${duration},
      questions: [
        {
          id: "${lessonId}-q1",
          text: "Which choice best matches the main idea of ${baseTopic}?",
          skillId: "${moduleId}-skill-core",
          options: [
            { id: "a", text: "A complete, evidence-based explanation" },
            { id: "b", text: "An unrelated claim" },
            { id: "c", text: "A random guess" },
            { id: "d", text: "A conflicting idea" }
          ],
          correctOptionId: "a"
        },
        {
          id: "${lessonId}-q2",
          text: "What should a learner do after getting an answer wrong?",
          skillId: "${moduleId}-skill-review",
          options: [
            { id: "a", text: "Review error cause and retry with strategy" },
            { id: "b", text: "Skip all corrections" },
            { id: "c", text: "Memorize only the answer letter" },
            { id: "d", text: "Stop practicing" }
          ],
          correctOptionId: "a"
        }
      ],
      learningAids: [
        { id: "${lessonId}-a1", type: "mnemonic", title: "Memory Cue", content: "Use Plan, Solve, Explain to structure each response." }
      ]
    }`;
  }

  if (isInteractive) {
    return `{
      id: "${lessonId}",
      title: "${lessonTitle}",
      type: "interactive",
      duration: ${duration},
      metadata: {
        prompts: [
          "State the key concept in one sentence.",
          "Apply it to one example.",
          "Explain your improvement step for next time."
        ]
      },
      learningAids: [
        { id: "${lessonId}-a1", type: "practice", title: "Guided Practice", content: "Follow the challenge flow and record your approach." }
      ]
    }`;
  }

  return `{
      id: "${lessonId}",
      title: "${lessonTitle}",
      type: "video",
      duration: ${duration},
      learningAids: [
        { id: "${lessonId}-a1", type: "image", title: "Concept Card", content: "Visual summary for ${baseTopic}." },
        { id: "${lessonId}-a2", type: "animation", title: "Animated Example", content: "Step-by-step walkthrough for ${baseTopic}." }
      ]
    }`;
}

function buildModuleSource({
  id,
  title,
  description,
  subject,
  minAge,
  maxAge,
  difficulty,
  localeSupport,
}) {
  const constName = toConstName(id);
  const escapedTitle = escapeString(title);
  const escapedDescription = escapeString(description);
  const escapedSubject = escapeString(subject);
  const lessons = Array.from({ length: 10 })
    .map((_, index) => buildLesson(id, index, escapedSubject))
    .join(",\n    ");

  const locales = localeSupport
    .split(",")
    .map((entry) => entry.trim())
    .filter(Boolean)
    .map((entry) => `"${escapeString(entry)}"`)
    .join(", ");

  return `import type { LearningModule } from "@/lib/modules/types";

export const ${constName}: LearningModule = {
  id: "${id}",
  title: "${escapedTitle}",
  description: "${escapedDescription}",
  subject: "${escapedSubject}",
  tags: ["curriculum", "interactive"],
  minAge: ${minAge},
  maxAge: ${maxAge},
  moduleVersion: "1.0.0",
  version: "1.0.0",
  difficultyBand: "${difficulty}",
  localeSupport: [${locales}],
  thumbnail: "/placeholders/lesson-robot.svg",
  learningObjectives: [
    "Understand core concepts in ${escapedSubject}",
    "Apply ${escapedSubject} skills through guided practice",
    "Demonstrate mastery through checkpoint quizzes"
  ],
  lessons: [
    ${lessons}
  ],
};
`;
}

async function main() {
  const args = parseArgs();
  const id = toId(args.id);
  const title = String(args.title || "").trim();
  const subject = String(args.subject || "").trim();
  const description = String(args.description || "").trim();

  if (!id || !title || !subject || !description) {
    console.error(
      "Usage: npm run module:new -- --id <id> --title <title> --subject <subject> --description <description> [--minAge 6] [--maxAge 18] [--difficulty beginner] [--locales en,es]",
    );
    process.exit(1);
  }

  const minAge = Number(args.minAge ?? 6);
  const maxAge = Number(args.maxAge ?? 18);
  const difficulty = String(args.difficulty ?? "beginner");
  const localeSupport = String(args.locales ?? "en,es,fr,de,ar,hi,zh,ja,ko,ru");
  const outPath = path.join(catalogDir, `${id}.ts`);

  try {
    await fs.access(outPath);
    console.error(`Module file already exists: ${path.relative(projectRoot, outPath)}`);
    process.exit(1);
  } catch {
    // File does not exist, continue.
  }

  await fs.mkdir(catalogDir, { recursive: true });
  const source = buildModuleSource({
    id,
    title,
    description,
    subject,
    minAge,
    maxAge,
    difficulty,
    localeSupport,
  });
  await fs.writeFile(outPath, source, "utf8");
  console.log(`Created ${path.relative(projectRoot, outPath)}`);
  console.log("Next steps:");
  console.log("1) npm run modules:sync");
  console.log("2) npm run build");
}

main();
