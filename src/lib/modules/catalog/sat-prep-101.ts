import type { LearningModule } from "@/lib/modules/types";

export const SatPrep101Module: LearningModule = {
  id: "sat-prep-101",
  title: "SAT Prep Foundations",
  description: "Build evidence-based reading, writing, and math fluency for the SAT.",
  subject: "Exam Prep",
  tags: ["exam-prep", "assessment", "advanced"],
  minAge: 14,
  maxAge: 19,
  moduleVersion: "1.0.0",
  version: "1.0.0",
  difficultyBand: "advanced",
  localeSupport: ["en", "es", "fr", "de", "ar", "hi", "zh", "ja", "ko", "ru"],
  thumbnail: "/placeholders/lesson-robot.svg",
  learningObjectives: [
    "Build structured SAT readiness workflows",
    "Improve speed and accuracy under timed constraints",
    "Use analytics-based revision loops to close weak areas"
  ],
  lessons: [
    {
      id: "sat-prep-101-l01",
      title: "SAT: SAT Structure and Strategy",
      type: "video",
      duration: 11,
      learningAids: [
        { id: "sat-prep-101-l01-a1", type: "image", title: "Concept Snapshot", content: "Visual summary for SAT: SAT Structure and Strategy." },
        { id: "sat-prep-101-l01-a2", type: "animation", title: "Animated Walkthrough", content: "Step-by-step explanation of SAT: SAT Structure and Strategy." }
      ]
    },
    {
      id: "sat-prep-101-l02",
      title: "SAT: Reading Evidence Skills",
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
        { id: "sat-prep-101-l02-a1", type: "image", title: "Concept Snapshot", content: "Visual summary for SAT: Reading Evidence Skills." },
        { id: "sat-prep-101-l02-a2", type: "animation", title: "Animated Walkthrough", content: "Step-by-step explanation of SAT: Reading Evidence Skills." }
      ]
    },
    {
      id: "sat-prep-101-l03",
      title: "SAT: Writing and Language Rules",
      type: "quiz",
      duration: 12,
      questions: [
        {
          id: "sat-prep-101-l03-q1",
          text: "Which strategy best improves sat: writing and language rules performance?",
          skillId: "sat-prep-101-skill-strategy",
          options: [
            { id: "a", text: "Set a plan, practice, and review errors" },
            { id: "b", text: "Skip difficult items with no review" },
            { id: "c", text: "Memorize without application" },
            { id: "d", text: "Ignore timing constraints" }
          ],
          correctOptionId: "a"
        },
        {
          id: "sat-prep-101-l03-q2",
          text: "What should you do after a timed drill?",
          skillId: "sat-prep-101-skill-review",
          options: [
            { id: "a", text: "Analyze errors and classify root causes" },
            { id: "b", text: "Only record your score" },
            { id: "c", text: "Move on without reflection" },
            { id: "d", text: "Repeat mistakes unchanged" }
          ],
          correctOptionId: "a"
        },
        {
          id: "sat-prep-101-l03-q3",
          text: "Which habit most improves exam consistency?",
          skillId: "sat-prep-101-skill-consistency",
          options: [
            { id: "a", text: "Structured weekly cycles with targeted revision" },
            { id: "b", text: "Random topics daily without tracking" },
            { id: "c", text: "Last-minute cramming only" },
            { id: "d", text: "Avoiding full-length practice" }
          ],
          correctOptionId: "a"
        },
        {
          id: "sat-prep-101-l03-q4",
          text: "What is the best time-management approach during tests?",
          skillId: "sat-prep-101-skill-time",
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
        { id: "sat-prep-101-l03-a1", type: "image", title: "Concept Snapshot", content: "Visual summary for SAT: Writing and Language Rules." },
        { id: "sat-prep-101-l03-a2", type: "animation", title: "Animated Walkthrough", content: "Step-by-step explanation of SAT: Writing and Language Rules." }
      ]
    },
    {
      id: "sat-prep-101-l04",
      title: "SAT: Algebra and Data Essentials",
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
        { id: "sat-prep-101-l04-a1", type: "image", title: "Concept Snapshot", content: "Visual summary for SAT: Algebra and Data Essentials." },
        { id: "sat-prep-101-l04-a2", type: "animation", title: "Animated Walkthrough", content: "Step-by-step explanation of SAT: Algebra and Data Essentials." }
      ]
    },
    {
      id: "sat-prep-101-l05",
      title: "SAT: Advanced Math Problem Solving",
      type: "video",
      duration: 11,
      learningAids: [
        { id: "sat-prep-101-l05-a1", type: "image", title: "Concept Snapshot", content: "Visual summary for SAT: Advanced Math Problem Solving." },
        { id: "sat-prep-101-l05-a2", type: "animation", title: "Animated Walkthrough", content: "Step-by-step explanation of SAT: Advanced Math Problem Solving." }
      ]
    },
    {
      id: "sat-prep-101-l06",
      title: "SAT: Timing and Pacing Practice",
      type: "quiz",
      duration: 12,
      questions: [
        {
          id: "sat-prep-101-l06-q1",
          text: "Which strategy best improves sat: timing and pacing practice performance?",
          skillId: "sat-prep-101-skill-strategy",
          options: [
            { id: "a", text: "Set a plan, practice, and review errors" },
            { id: "b", text: "Skip difficult items with no review" },
            { id: "c", text: "Memorize without application" },
            { id: "d", text: "Ignore timing constraints" }
          ],
          correctOptionId: "a"
        },
        {
          id: "sat-prep-101-l06-q2",
          text: "What should you do after a timed drill?",
          skillId: "sat-prep-101-skill-review",
          options: [
            { id: "a", text: "Analyze errors and classify root causes" },
            { id: "b", text: "Only record your score" },
            { id: "c", text: "Move on without reflection" },
            { id: "d", text: "Repeat mistakes unchanged" }
          ],
          correctOptionId: "a"
        },
        {
          id: "sat-prep-101-l06-q3",
          text: "Which habit most improves exam consistency?",
          skillId: "sat-prep-101-skill-consistency",
          options: [
            { id: "a", text: "Structured weekly cycles with targeted revision" },
            { id: "b", text: "Random topics daily without tracking" },
            { id: "c", text: "Last-minute cramming only" },
            { id: "d", text: "Avoiding full-length practice" }
          ],
          correctOptionId: "a"
        },
        {
          id: "sat-prep-101-l06-q4",
          text: "What is the best time-management approach during tests?",
          skillId: "sat-prep-101-skill-time",
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
        { id: "sat-prep-101-l06-a1", type: "image", title: "Concept Snapshot", content: "Visual summary for SAT: Timing and Pacing Practice." },
        { id: "sat-prep-101-l06-a2", type: "animation", title: "Animated Walkthrough", content: "Step-by-step explanation of SAT: Timing and Pacing Practice." }
      ]
    },
    {
      id: "sat-prep-101-l07",
      title: "SAT: Error Analysis Workshop",
      type: "video",
      duration: 11,
      learningAids: [
        { id: "sat-prep-101-l07-a1", type: "image", title: "Concept Snapshot", content: "Visual summary for SAT: Error Analysis Workshop." },
        { id: "sat-prep-101-l07-a2", type: "animation", title: "Animated Walkthrough", content: "Step-by-step explanation of SAT: Error Analysis Workshop." }
      ]
    },
    {
      id: "sat-prep-101-l08",
      title: "SAT: Section Drill: Reading + Writing",
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
        { id: "sat-prep-101-l08-a1", type: "image", title: "Concept Snapshot", content: "Visual summary for SAT: Section Drill: Reading + Writing." },
        { id: "sat-prep-101-l08-a2", type: "animation", title: "Animated Walkthrough", content: "Step-by-step explanation of SAT: Section Drill: Reading + Writing." }
      ]
    },
    {
      id: "sat-prep-101-l09",
      title: "SAT: Section Drill: Math",
      type: "quiz",
      duration: 12,
      questions: [
        {
          id: "sat-prep-101-l09-q1",
          text: "Which strategy best improves sat: section drill: math performance?",
          skillId: "sat-prep-101-skill-strategy",
          options: [
            { id: "a", text: "Set a plan, practice, and review errors" },
            { id: "b", text: "Skip difficult items with no review" },
            { id: "c", text: "Memorize without application" },
            { id: "d", text: "Ignore timing constraints" }
          ],
          correctOptionId: "a"
        },
        {
          id: "sat-prep-101-l09-q2",
          text: "What should you do after a timed drill?",
          skillId: "sat-prep-101-skill-review",
          options: [
            { id: "a", text: "Analyze errors and classify root causes" },
            { id: "b", text: "Only record your score" },
            { id: "c", text: "Move on without reflection" },
            { id: "d", text: "Repeat mistakes unchanged" }
          ],
          correctOptionId: "a"
        },
        {
          id: "sat-prep-101-l09-q3",
          text: "Which habit most improves exam consistency?",
          skillId: "sat-prep-101-skill-consistency",
          options: [
            { id: "a", text: "Structured weekly cycles with targeted revision" },
            { id: "b", text: "Random topics daily without tracking" },
            { id: "c", text: "Last-minute cramming only" },
            { id: "d", text: "Avoiding full-length practice" }
          ],
          correctOptionId: "a"
        },
        {
          id: "sat-prep-101-l09-q4",
          text: "What is the best time-management approach during tests?",
          skillId: "sat-prep-101-skill-time",
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
        { id: "sat-prep-101-l09-a1", type: "image", title: "Concept Snapshot", content: "Visual summary for SAT: Section Drill: Math." },
        { id: "sat-prep-101-l09-a2", type: "animation", title: "Animated Walkthrough", content: "Step-by-step explanation of SAT: Section Drill: Math." }
      ]
    },
    {
      id: "sat-prep-101-l10",
      title: "SAT: Full SAT Mock and Review",
      type: "quiz",
      duration: 12,
      questions: [
        {
          id: "sat-prep-101-l10-q1",
          text: "Which strategy best improves sat: full sat mock and review performance?",
          skillId: "sat-prep-101-skill-strategy",
          options: [
            { id: "a", text: "Set a plan, practice, and review errors" },
            { id: "b", text: "Skip difficult items with no review" },
            { id: "c", text: "Memorize without application" },
            { id: "d", text: "Ignore timing constraints" }
          ],
          correctOptionId: "a"
        },
        {
          id: "sat-prep-101-l10-q2",
          text: "What should you do after a timed drill?",
          skillId: "sat-prep-101-skill-review",
          options: [
            { id: "a", text: "Analyze errors and classify root causes" },
            { id: "b", text: "Only record your score" },
            { id: "c", text: "Move on without reflection" },
            { id: "d", text: "Repeat mistakes unchanged" }
          ],
          correctOptionId: "a"
        },
        {
          id: "sat-prep-101-l10-q3",
          text: "Which habit most improves exam consistency?",
          skillId: "sat-prep-101-skill-consistency",
          options: [
            { id: "a", text: "Structured weekly cycles with targeted revision" },
            { id: "b", text: "Random topics daily without tracking" },
            { id: "c", text: "Last-minute cramming only" },
            { id: "d", text: "Avoiding full-length practice" }
          ],
          correctOptionId: "a"
        },
        {
          id: "sat-prep-101-l10-q4",
          text: "What is the best time-management approach during tests?",
          skillId: "sat-prep-101-skill-time",
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
        { id: "sat-prep-101-l10-a1", type: "image", title: "Concept Snapshot", content: "Visual summary for SAT: Full SAT Mock and Review." },
        { id: "sat-prep-101-l10-a2", type: "animation", title: "Animated Walkthrough", content: "Step-by-step explanation of SAT: Full SAT Mock and Review." }
      ]
    }
  ],
};
