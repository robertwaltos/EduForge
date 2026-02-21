import type { LearningModule } from "@/lib/modules/types";

export const ToeflPrep101Module: LearningModule = {
  id: "toefl-prep-101",
  title: "TOEFL iBT Prep Foundations",
  description: "Prepare for TOEFL reading, listening, speaking, and writing with timed skill routines.",
  subject: "Exam Prep",
  tags: ["exam-prep", "assessment", "advanced"],
  minAge: 14,
  maxAge: 24,
  moduleVersion: "1.0.0",
  version: "1.0.0",
  difficultyBand: "advanced",
  localeSupport: ["en", "es", "fr", "de", "ar", "hi", "zh", "ja", "ko", "ru"],
  thumbnail: "/placeholders/lesson-robot.svg",
  learningObjectives: [
    "Build structured TOEFL readiness workflows",
    "Improve speed and accuracy under timed constraints",
    "Use analytics-based revision loops to close weak areas"
  ],
  lessons: [
    {
      id: "toefl-prep-101-l01",
      title: "TOEFL: TOEFL Format and Score Goals",
      type: "video",
      duration: 11,
      learningAids: [
        { id: "toefl-prep-101-l01-a1", type: "image", title: "Concept Snapshot", content: "Visual summary for TOEFL: TOEFL Format and Score Goals." },
        { id: "toefl-prep-101-l01-a2", type: "animation", title: "Animated Walkthrough", content: "Step-by-step explanation of TOEFL: TOEFL Format and Score Goals." }
      ]
    },
    {
      id: "toefl-prep-101-l02",
      title: "TOEFL: Academic Reading Strategy",
      type: "interactive",
      duration: 14,
      metadata: {
        prompts: [
          "Summarize the key strategy in your own words.",
          "Apply it to one sample question.",
          "Write one improvement target for your next session."
        ]
      },
      learningAids: [
        { id: "toefl-prep-101-l02-a1", type: "image", title: "Concept Snapshot", content: "Visual summary for TOEFL: Academic Reading Strategy." },
        { id: "toefl-prep-101-l02-a2", type: "animation", title: "Animated Walkthrough", content: "Step-by-step explanation of TOEFL: Academic Reading Strategy." }
      ]
    },
    {
      id: "toefl-prep-101-l03",
      title: "TOEFL: Listening for Main Ideas and Detail",
      type: "quiz",
      duration: 12,
      questions: [
        {
          id: "toefl-prep-101-l03-q1",
          text: "Which strategy best improves toefl: listening for main ideas and detail performance?",
          skillId: "toefl-prep-101-skill-strategy",
          options: [
            { id: "a", text: "Set a plan, practice, and review errors" },
            { id: "b", text: "Skip difficult items with no review" },
            { id: "c", text: "Memorize without application" },
            { id: "d", text: "Ignore timing constraints" }
          ],
          correctOptionId: "a"
        },
        {
          id: "toefl-prep-101-l03-q2",
          text: "What should you do after a timed drill?",
          skillId: "toefl-prep-101-skill-review",
          options: [
            { id: "a", text: "Analyze errors and classify root causes" },
            { id: "b", text: "Only record your score" },
            { id: "c", text: "Move on without reflection" },
            { id: "d", text: "Repeat mistakes unchanged" }
          ],
          correctOptionId: "a"
        },
        {
          id: "toefl-prep-101-l03-q3",
          text: "Which habit most improves exam consistency?",
          skillId: "toefl-prep-101-skill-consistency",
          options: [
            { id: "a", text: "Structured weekly cycles with targeted revision" },
            { id: "b", text: "Random topics daily without tracking" },
            { id: "c", text: "Last-minute cramming only" },
            { id: "d", text: "Avoiding full-length practice" }
          ],
          correctOptionId: "a"
        },
        {
          id: "toefl-prep-101-l03-q4",
          text: "What is the best time-management approach during tests?",
          skillId: "toefl-prep-101-skill-time",
          options: [
            { id: "a", text: "Budget time per section and checkpoint progress" },
            { id: "b", text: "Spend most time on first question" },
            { id: "c", text: "Ignore section timing" },
            { id: "d", text: "Answer without reading carefully" }
          ],
          correctOptionId: "a"
        }
      ],
      learningAids: [
        { id: "toefl-prep-101-l03-a1", type: "image", title: "Concept Snapshot", content: "Visual summary for TOEFL: Listening for Main Ideas and Detail." },
        { id: "toefl-prep-101-l03-a2", type: "animation", title: "Animated Walkthrough", content: "Step-by-step explanation of TOEFL: Listening for Main Ideas and Detail." }
      ]
    },
    {
      id: "toefl-prep-101-l04",
      title: "TOEFL: Integrated Speaking Frameworks",
      type: "interactive",
      duration: 14,
      metadata: {
        prompts: [
          "Summarize the key strategy in your own words.",
          "Apply it to one sample question.",
          "Write one improvement target for your next session."
        ]
      },
      learningAids: [
        { id: "toefl-prep-101-l04-a1", type: "image", title: "Concept Snapshot", content: "Visual summary for TOEFL: Integrated Speaking Frameworks." },
        { id: "toefl-prep-101-l04-a2", type: "animation", title: "Animated Walkthrough", content: "Step-by-step explanation of TOEFL: Integrated Speaking Frameworks." }
      ]
    },
    {
      id: "toefl-prep-101-l05",
      title: "TOEFL: Independent Speaking Clarity",
      type: "video",
      duration: 11,
      learningAids: [
        { id: "toefl-prep-101-l05-a1", type: "image", title: "Concept Snapshot", content: "Visual summary for TOEFL: Independent Speaking Clarity." },
        { id: "toefl-prep-101-l05-a2", type: "animation", title: "Animated Walkthrough", content: "Step-by-step explanation of TOEFL: Independent Speaking Clarity." }
      ]
    },
    {
      id: "toefl-prep-101-l06",
      title: "TOEFL: Integrated Writing Structure",
      type: "quiz",
      duration: 12,
      questions: [
        {
          id: "toefl-prep-101-l06-q1",
          text: "Which strategy best improves toefl: integrated writing structure performance?",
          skillId: "toefl-prep-101-skill-strategy",
          options: [
            { id: "a", text: "Set a plan, practice, and review errors" },
            { id: "b", text: "Skip difficult items with no review" },
            { id: "c", text: "Memorize without application" },
            { id: "d", text: "Ignore timing constraints" }
          ],
          correctOptionId: "a"
        },
        {
          id: "toefl-prep-101-l06-q2",
          text: "What should you do after a timed drill?",
          skillId: "toefl-prep-101-skill-review",
          options: [
            { id: "a", text: "Analyze errors and classify root causes" },
            { id: "b", text: "Only record your score" },
            { id: "c", text: "Move on without reflection" },
            { id: "d", text: "Repeat mistakes unchanged" }
          ],
          correctOptionId: "a"
        },
        {
          id: "toefl-prep-101-l06-q3",
          text: "Which habit most improves exam consistency?",
          skillId: "toefl-prep-101-skill-consistency",
          options: [
            { id: "a", text: "Structured weekly cycles with targeted revision" },
            { id: "b", text: "Random topics daily without tracking" },
            { id: "c", text: "Last-minute cramming only" },
            { id: "d", text: "Avoiding full-length practice" }
          ],
          correctOptionId: "a"
        },
        {
          id: "toefl-prep-101-l06-q4",
          text: "What is the best time-management approach during tests?",
          skillId: "toefl-prep-101-skill-time",
          options: [
            { id: "a", text: "Budget time per section and checkpoint progress" },
            { id: "b", text: "Spend most time on first question" },
            { id: "c", text: "Ignore section timing" },
            { id: "d", text: "Answer without reading carefully" }
          ],
          correctOptionId: "a"
        }
      ],
      learningAids: [
        { id: "toefl-prep-101-l06-a1", type: "image", title: "Concept Snapshot", content: "Visual summary for TOEFL: Integrated Writing Structure." },
        { id: "toefl-prep-101-l06-a2", type: "animation", title: "Animated Walkthrough", content: "Step-by-step explanation of TOEFL: Integrated Writing Structure." }
      ]
    },
    {
      id: "toefl-prep-101-l07",
      title: "TOEFL: Independent Writing Organization",
      type: "video",
      duration: 11,
      learningAids: [
        { id: "toefl-prep-101-l07-a1", type: "image", title: "Concept Snapshot", content: "Visual summary for TOEFL: Independent Writing Organization." },
        { id: "toefl-prep-101-l07-a2", type: "animation", title: "Animated Walkthrough", content: "Step-by-step explanation of TOEFL: Independent Writing Organization." }
      ]
    },
    {
      id: "toefl-prep-101-l08",
      title: "TOEFL: Timing and Note-Taking Systems",
      type: "interactive",
      duration: 14,
      metadata: {
        prompts: [
          "Summarize the key strategy in your own words.",
          "Apply it to one sample question.",
          "Write one improvement target for your next session."
        ]
      },
      learningAids: [
        { id: "toefl-prep-101-l08-a1", type: "image", title: "Concept Snapshot", content: "Visual summary for TOEFL: Timing and Note-Taking Systems." },
        { id: "toefl-prep-101-l08-a2", type: "animation", title: "Animated Walkthrough", content: "Step-by-step explanation of TOEFL: Timing and Note-Taking Systems." }
      ]
    },
    {
      id: "toefl-prep-101-l09",
      title: "TOEFL: Full Section Drill and Review",
      type: "quiz",
      duration: 12,
      questions: [
        {
          id: "toefl-prep-101-l09-q1",
          text: "Which strategy best improves toefl: full section drill and review performance?",
          skillId: "toefl-prep-101-skill-strategy",
          options: [
            { id: "a", text: "Set a plan, practice, and review errors" },
            { id: "b", text: "Skip difficult items with no review" },
            { id: "c", text: "Memorize without application" },
            { id: "d", text: "Ignore timing constraints" }
          ],
          correctOptionId: "a"
        },
        {
          id: "toefl-prep-101-l09-q2",
          text: "What should you do after a timed drill?",
          skillId: "toefl-prep-101-skill-review",
          options: [
            { id: "a", text: "Analyze errors and classify root causes" },
            { id: "b", text: "Only record your score" },
            { id: "c", text: "Move on without reflection" },
            { id: "d", text: "Repeat mistakes unchanged" }
          ],
          correctOptionId: "a"
        },
        {
          id: "toefl-prep-101-l09-q3",
          text: "Which habit most improves exam consistency?",
          skillId: "toefl-prep-101-skill-consistency",
          options: [
            { id: "a", text: "Structured weekly cycles with targeted revision" },
            { id: "b", text: "Random topics daily without tracking" },
            { id: "c", text: "Last-minute cramming only" },
            { id: "d", text: "Avoiding full-length practice" }
          ],
          correctOptionId: "a"
        },
        {
          id: "toefl-prep-101-l09-q4",
          text: "What is the best time-management approach during tests?",
          skillId: "toefl-prep-101-skill-time",
          options: [
            { id: "a", text: "Budget time per section and checkpoint progress" },
            { id: "b", text: "Spend most time on first question" },
            { id: "c", text: "Ignore section timing" },
            { id: "d", text: "Answer without reading carefully" }
          ],
          correctOptionId: "a"
        }
      ],
      learningAids: [
        { id: "toefl-prep-101-l09-a1", type: "image", title: "Concept Snapshot", content: "Visual summary for TOEFL: Full Section Drill and Review." },
        { id: "toefl-prep-101-l09-a2", type: "animation", title: "Animated Walkthrough", content: "Step-by-step explanation of TOEFL: Full Section Drill and Review." }
      ]
    },
    {
      id: "toefl-prep-101-l10",
      title: "TOEFL: Mock TOEFL and Gap Closure Plan",
      type: "quiz",
      duration: 12,
      questions: [
        {
          id: "toefl-prep-101-l10-q1",
          text: "Which strategy best improves toefl: mock toefl and gap closure plan performance?",
          skillId: "toefl-prep-101-skill-strategy",
          options: [
            { id: "a", text: "Set a plan, practice, and review errors" },
            { id: "b", text: "Skip difficult items with no review" },
            { id: "c", text: "Memorize without application" },
            { id: "d", text: "Ignore timing constraints" }
          ],
          correctOptionId: "a"
        },
        {
          id: "toefl-prep-101-l10-q2",
          text: "What should you do after a timed drill?",
          skillId: "toefl-prep-101-skill-review",
          options: [
            { id: "a", text: "Analyze errors and classify root causes" },
            { id: "b", text: "Only record your score" },
            { id: "c", text: "Move on without reflection" },
            { id: "d", text: "Repeat mistakes unchanged" }
          ],
          correctOptionId: "a"
        },
        {
          id: "toefl-prep-101-l10-q3",
          text: "Which habit most improves exam consistency?",
          skillId: "toefl-prep-101-skill-consistency",
          options: [
            { id: "a", text: "Structured weekly cycles with targeted revision" },
            { id: "b", text: "Random topics daily without tracking" },
            { id: "c", text: "Last-minute cramming only" },
            { id: "d", text: "Avoiding full-length practice" }
          ],
          correctOptionId: "a"
        },
        {
          id: "toefl-prep-101-l10-q4",
          text: "What is the best time-management approach during tests?",
          skillId: "toefl-prep-101-skill-time",
          options: [
            { id: "a", text: "Budget time per section and checkpoint progress" },
            { id: "b", text: "Spend most time on first question" },
            { id: "c", text: "Ignore section timing" },
            { id: "d", text: "Answer without reading carefully" }
          ],
          correctOptionId: "a"
        }
      ],
      learningAids: [
        { id: "toefl-prep-101-l10-a1", type: "image", title: "Concept Snapshot", content: "Visual summary for TOEFL: Mock TOEFL and Gap Closure Plan." },
        { id: "toefl-prep-101-l10-a2", type: "animation", title: "Animated Walkthrough", content: "Step-by-step explanation of TOEFL: Mock TOEFL and Gap Closure Plan." }
      ]
    }
  ],
};
