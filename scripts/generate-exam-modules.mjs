import fs from "node:fs/promises";
import path from "node:path";

const projectRoot = process.cwd();
const catalogDir = path.join(projectRoot, "src", "lib", "modules", "catalog");

const exams = [
  {
    id: "sat-prep-101",
    constName: "SatPrep101Module",
    title: "SAT Prep Foundations",
    subject: "Exam Prep",
    description: "Build evidence-based reading, writing, and math fluency for the SAT.",
    minAge: 14,
    maxAge: 19,
    difficultyBand: "advanced",
    focus: "SAT readiness",
    strands: ["reading", "writing", "algebra", "timing"],
    lessonTitles: [
      "SAT Structure and Strategy",
      "Reading Evidence Skills",
      "Writing and Language Rules",
      "Algebra and Data Essentials",
      "Advanced Math Problem Solving",
      "Timing and Pacing Practice",
      "Error Analysis Workshop",
      "Section Drill: Reading + Writing",
      "Section Drill: Math",
      "Full SAT Mock and Review",
    ],
  },
  {
    id: "act-prep-101",
    constName: "ActPrep101Module",
    title: "ACT Prep Foundations",
    subject: "Exam Prep",
    description: "Prepare for ACT English, Math, Reading, and Science with targeted drills.",
    minAge: 14,
    maxAge: 19,
    difficultyBand: "advanced",
    focus: "ACT readiness",
    strands: ["english", "math", "reading", "science reasoning"],
    lessonTitles: [
      "ACT Overview and Scoring",
      "English Usage and Rhetoric",
      "Math Core Skill Review",
      "Reading Passage Strategy",
      "Science Reasoning Techniques",
      "Pacing Under Time Limits",
      "Error Log and Recovery",
      "Section Drill: English + Reading",
      "Section Drill: Math + Science",
      "Full ACT Mock and Review",
    ],
  },
  {
    id: "ap-prep-101",
    constName: "ApPrep101Module",
    title: "AP Exam Prep Toolkit",
    subject: "Exam Prep",
    description: "Master AP-style multiple-choice and free-response performance strategies.",
    minAge: 14,
    maxAge: 19,
    difficultyBand: "advanced",
    focus: "AP exam success",
    strands: ["frq planning", "mcq strategy", "evidence", "rubrics"],
    lessonTitles: [
      "AP Exam Formats by Subject",
      "AP Multiple-Choice Strategy",
      "Free-Response Planning",
      "Evidence and Explanation Quality",
      "Scoring Rubric Deep Dive",
      "Time Management in FRQ",
      "Common Pitfalls and Fixes",
      "Practice Set: MCQ",
      "Practice Set: FRQ",
      "Mock AP Session and Reflection",
    ],
  },
  {
    id: "gcse-prep-101",
    constName: "GcsePrep101Module",
    title: "GCSE Prep Foundations",
    subject: "Exam Prep",
    description: "Prepare for GCSE core papers with structured revision and exam technique.",
    minAge: 14,
    maxAge: 18,
    difficultyBand: "advanced",
    focus: "GCSE readiness",
    strands: ["revision planning", "math", "english", "science"],
    lessonTitles: [
      "GCSE Pathway Planning",
      "English Language Techniques",
      "Math Non-Calculator Skills",
      "Math Calculator Skills",
      "Science Command Words",
      "Structured Long Answers",
      "Revision Timetable Execution",
      "Past Paper Strategy",
      "Exam-Day Readiness",
      "Full Mock Cycle and Review",
    ],
  },
  {
    id: "a-level-prep-101",
    constName: "ALevelPrep101Module",
    title: "A-Level Prep Foundations",
    subject: "Exam Prep",
    description: "Strengthen deep content mastery and analytical writing for A-Level exams.",
    minAge: 15,
    maxAge: 19,
    difficultyBand: "advanced",
    focus: "A-Level readiness",
    strands: ["depth mastery", "analysis", "extended response", "synoptic links"],
    lessonTitles: [
      "A-Level Standards and Targets",
      "Knowledge Retrieval Systems",
      "High-Value Topic Prioritization",
      "Analytical Essay Construction",
      "Data and Source Evaluation",
      "Synoptic Question Strategy",
      "Revision Under Time Pressure",
      "Past Paper Mark-Scheme Analysis",
      "Coursework/Practical Integration",
      "Full Mock and Gap Closure",
    ],
  },
  {
    id: "jee-neet-prep-101",
    constName: "JeeNeetPrep101Module",
    title: "JEE / NEET Prep Foundations",
    subject: "Exam Prep",
    description: "Develop high-intensity PCM/PCB practice workflows for JEE and NEET.",
    minAge: 15,
    maxAge: 20,
    difficultyBand: "advanced",
    focus: "JEE and NEET readiness",
    strands: ["physics", "chemistry", "math/biology", "accuracy speed"],
    lessonTitles: [
      "JEE/NEET Pattern and Cutoff Basics",
      "Physics Problem Frameworks",
      "Chemistry Memory + Application",
      "Math Track: Speed and Precision",
      "Biology Track: NCERT Mastery",
      "Question Selection Strategy",
      "Negative Marking Risk Control",
      "Timed Mixed Subject Drill",
      "Mock Test Analysis Loop",
      "Final 60-Day Exam Plan",
    ],
  },
  {
    id: "gaokao-prep-101",
    constName: "GaokaoPrep101Module",
    title: "Gaokao Prep Foundations",
    subject: "Exam Prep",
    description: "Prepare for Gaokao with disciplined study cycles and exam-specific strategy.",
    minAge: 15,
    maxAge: 20,
    difficultyBand: "advanced",
    focus: "Gaokao readiness",
    strands: ["core subjects", "speed", "accuracy", "stress control"],
    lessonTitles: [
      "Gaokao Structure and Planning",
      "Chinese Language Performance",
      "Mathematics Intensive Strategy",
      "English Exam Techniques",
      "Elective Subject Mastery",
      "Speed and Accuracy Training",
      "Error Notebook Method",
      "Past Paper Sequencing",
      "Performance Week Simulation",
      "Final Sprint and Recovery Plan",
    ],
  },
  {
    id: "ib-prep-101",
    constName: "IbPrep101Module",
    title: "IB Diploma Prep Foundations",
    subject: "Exam Prep",
    description: "Build planning, IA/EE workflows, and exam strategy for the IB Diploma Programme.",
    minAge: 15,
    maxAge: 19,
    difficultyBand: "advanced",
    focus: "IB Diploma readiness",
    strands: ["HL/SL planning", "TOK", "extended essay", "internal assessment"],
    lessonTitles: [
      "IB Diploma Structure and Subject Planning",
      "Higher Level and Standard Level Strategy",
      "Theory of Knowledge Reasoning Skills",
      "Extended Essay Research Workflow",
      "Internal Assessment Quality Standards",
      "Command Terms and Markscheme Use",
      "Time Management Across Components",
      "Past Paper Analysis Loop",
      "Exam Session Simulation",
      "Final IB Sprint and Reflection",
    ],
  },
  {
    id: "toefl-prep-101",
    constName: "ToeflPrep101Module",
    title: "TOEFL iBT Prep Foundations",
    subject: "Exam Prep",
    description: "Prepare for TOEFL reading, listening, speaking, and writing with timed skill routines.",
    minAge: 14,
    maxAge: 24,
    difficultyBand: "advanced",
    focus: "TOEFL readiness",
    strands: ["reading", "listening", "speaking", "writing"],
    lessonTitles: [
      "TOEFL Format and Score Goals",
      "Academic Reading Strategy",
      "Listening for Main Ideas and Detail",
      "Integrated Speaking Frameworks",
      "Independent Speaking Clarity",
      "Integrated Writing Structure",
      "Independent Writing Organization",
      "Timing and Note-Taking Systems",
      "Full Section Drill and Review",
      "Mock TOEFL and Gap Closure Plan",
    ],
  },
  {
    id: "ielts-prep-101",
    constName: "IeltsPrep101Module",
    title: "IELTS Prep Foundations",
    subject: "Exam Prep",
    description: "Develop IELTS Academic performance across listening, reading, writing, and speaking.",
    minAge: 14,
    maxAge: 24,
    difficultyBand: "advanced",
    focus: "IELTS readiness",
    strands: ["task response", "coherence", "lexical resource", "fluency"],
    lessonTitles: [
      "IELTS Band Descriptors and Targets",
      "Listening Section Strategy",
      "Academic Reading Passage Tactics",
      "Writing Task 1 Visual Analysis",
      "Writing Task 2 Argument Strategy",
      "Speaking Part 1 and 2 Fluency",
      "Speaking Part 3 Depth and Logic",
      "Error Patterns and Band Improvement",
      "Timed Multi-Skill Drill",
      "Full IELTS Mock and Improvement Plan",
    ],
  },
  {
    id: "cuet-prep-101",
    constName: "CuetPrep101Module",
    title: "CUET Prep Foundations",
    subject: "Exam Prep",
    description: "Prepare for India's CUET with domain practice, language strategy, and test timing.",
    minAge: 15,
    maxAge: 21,
    difficultyBand: "advanced",
    focus: "CUET readiness",
    strands: ["domain subjects", "general test", "language sections", "time control"],
    lessonTitles: [
      "CUET Pattern and University Mapping",
      "Language Section Scoring Strategy",
      "Domain Subject Prioritization",
      "General Test Logical Reasoning",
      "Quantitative Aptitude Drills",
      "Current Affairs and GK Workflow",
      "Mistake Log and Recovery Plan",
      "Timed Domain Mix Practice",
      "CUET Mock Review Cycle",
      "Final Revision and Exam-Day Plan",
    ],
  },
  {
    id: "atar-prep-101",
    constName: "AtarPrep101Module",
    title: "ATAR Prep Foundations",
    subject: "Exam Prep",
    description: "Prepare for ATAR pathways with subject scaling awareness and disciplined revision systems.",
    minAge: 15,
    maxAge: 20,
    difficultyBand: "advanced",
    focus: "ATAR readiness",
    strands: ["subject scaling", "exam technique", "revision cycles", "performance stability"],
    lessonTitles: [
      "ATAR Pathways and Subject Selection",
      "Study Design Interpretation",
      "Exam Technique by Subject Type",
      "ATAR High-Value Topic Prioritization",
      "Timed Response Quality Control",
      "Marking Criteria and Self-Assessment",
      "Revision Cycle Planning",
      "Mock Exam Analytics",
      "Stress and Consistency Routines",
      "Final ATAR Readiness Blueprint",
    ],
  },
];

function slugToFileName(id) {
  return `${id}.ts`;
}

function lessonPrefixFromModuleId(moduleId) {
  const trackKey = String(moduleId).replace(/-prep-.+$/i, "");
  switch (trackKey) {
    case "sat":
      return "SAT";
    case "act":
      return "ACT";
    case "ap":
      return "AP";
    case "toefl":
      return "TOEFL";
    case "ielts":
      return "IELTS";
    case "gcse":
      return "GCSE";
    case "a-level":
      return "A-Level";
    case "ib":
      return "IB";
    case "jee-neet":
      return "JEE/NEET";
    case "cuet":
      return "CUET";
    case "gaokao":
      return "Gaokao";
    case "atar":
      return "ATAR";
    default:
      return trackKey.toUpperCase();
  }
}

function qBlock(moduleId, lessonId, topicText) {
  return `[
        {
          id: "${lessonId}-q1",
          text: "Which strategy best improves ${topicText} performance?",
          skillId: "${moduleId}-skill-strategy",
          options: [
            { id: "a", text: "Set a plan, practice, and review errors" },
            { id: "b", text: "Skip difficult items with no review" },
            { id: "c", text: "Memorize without application" },
            { id: "d", text: "Ignore timing constraints" }
          ],
          correctOptionId: "a"
        },
        {
          id: "${lessonId}-q2",
          text: "What should you do after a timed drill?",
          skillId: "${moduleId}-skill-review",
          options: [
            { id: "a", text: "Analyze errors and classify root causes" },
            { id: "b", text: "Only record your score" },
            { id: "c", text: "Move on without reflection" },
            { id: "d", text: "Repeat mistakes unchanged" }
          ],
          correctOptionId: "a"
        },
        {
          id: "${lessonId}-q3",
          text: "Which habit most improves exam consistency?",
          skillId: "${moduleId}-skill-consistency",
          options: [
            { id: "a", text: "Structured weekly cycles with targeted revision" },
            { id: "b", text: "Random topics daily without tracking" },
            { id: "c", text: "Last-minute cramming only" },
            { id: "d", text: "Avoiding full-length practice" }
          ],
          correctOptionId: "a"
        },
        {
          id: "${lessonId}-q4",
          text: "What is the best time-management approach during tests?",
          skillId: "${moduleId}-skill-time",
          options: [
            { id: "a", text: "Budget time per section and checkpoint progress" },
            { id: "b", text: "Spend most time on first question" },
            { id: "c", text: "Ignore section timing" },
            { id: "d", text: "Answer without reading carefully" }
          ],
          correctOptionId: "a"
        }
      ]`;
}

function makeLesson(moduleId, index, title) {
  const lessonNumber = String(index + 1).padStart(2, "0");
  const lessonId = `${moduleId}-l${lessonNumber}`;
  const isQuiz = (index + 1) % 3 === 0 || index === 9;
  const isInteractive = !isQuiz && (index + 1) % 2 === 0;
  const duration = isQuiz ? 12 : isInteractive ? 14 : 11;
  const prompts = `[
          "Summarize the key strategy in your own words.",
          "Apply it to one sample question.",
          "Write one improvement target for your next session."
        ]`;
  const aids = `[
        { id: "${lessonId}-a1", type: "image", title: "Concept Snapshot", content: "Visual summary for ${title}." },
        { id: "${lessonId}-a2", type: "animation", title: "Animated Walkthrough", content: "Step-by-step explanation of ${title}." }
      ]`;

  if (isQuiz) {
    return `{
      id: "${lessonId}",
      title: "${title}",
      type: "quiz",
      duration: ${duration},
      questions: ${qBlock(moduleId, lessonId, title.toLowerCase())},
      learningAids: ${aids}
    }`;
  }

  if (isInteractive) {
    return `{
      id: "${lessonId}",
      title: "${title}",
      type: "interactive",
      duration: ${duration},
      metadata: {
        prompts: ${prompts}
      },
      learningAids: ${aids}
    }`;
  }

  return `{
      id: "${lessonId}",
      title: "${title}",
      type: "video",
      duration: ${duration},
      learningAids: ${aids}
    }`;
}

function moduleSource(exam) {
  const lessonPrefix = lessonPrefixFromModuleId(exam.id);
  const lessons = exam.lessonTitles
    .map((title, index) => makeLesson(exam.id, index, `${lessonPrefix}: ${title}`))
    .join(",\n    ");

  return `import type { LearningModule } from "@/lib/modules/types";

export const ${exam.constName}: LearningModule = {
  id: "${exam.id}",
  title: "${exam.title}",
  description: "${exam.description}",
  subject: "${exam.subject}",
  tags: ["exam-prep", "assessment", "advanced"],
  minAge: ${exam.minAge},
  maxAge: ${exam.maxAge},
  moduleVersion: "1.0.0",
  version: "1.0.0",
  difficultyBand: "${exam.difficultyBand}",
  localeSupport: ["en", "es", "fr", "de", "ar", "hi", "zh", "ja", "ko", "ru"],
  thumbnail: "/placeholders/lesson-robot.svg",
  learningObjectives: [
    "Build structured ${exam.focus} workflows",
    "Improve speed and accuracy under timed constraints",
    "Use analytics-based revision loops to close weak areas"
  ],
  lessons: [
    ${lessons}
  ],
};
`;
}

async function main() {
  await fs.mkdir(catalogDir, { recursive: true });
  for (const exam of exams) {
    const content = moduleSource(exam);
    const out = path.join(catalogDir, slugToFileName(exam.id));
    await fs.writeFile(out, content, "utf8");
    console.log(`Wrote ${path.relative(projectRoot, out)}`);
  }
}

main();
