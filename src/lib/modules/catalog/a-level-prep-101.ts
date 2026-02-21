import type { LearningModule } from "@/lib/modules/types";

export const ALevelPrep101Module: LearningModule = {
  id: "a-level-prep-101",
  title: "A-Level Prep Foundations",
  description: "Strengthen deep content mastery and analytical writing for A-Level exams.",
  subject: "Exam Prep",
  tags: ["exam-prep", "assessment", "advanced"],
  minAge: 15,
  maxAge: 19,
  moduleVersion: "1.0.0",
  version: "1.0.0",
  difficultyBand: "advanced",
  localeSupport: ["en", "es", "fr", "de", "ar", "hi", "zh", "ja", "ko", "ru"],
  thumbnail: "/placeholders/lesson-robot.svg",
  learningObjectives: [
    "Build structured A-Level readiness workflows",
    "Improve speed and accuracy under timed constraints",
    "Use analytics-based revision loops to close weak areas"
  ],
  lessons: [
    {
      id: "a-level-prep-101-l01",
      title: "A-Level: A-Level Standards and Targets",
      type: "video",
      duration: 11,
      learningAids: [
        { id: "a-level-prep-101-l01-a1", type: "image", title: "Concept Snapshot", content: "Visual summary for A-Level: A-Level Standards and Targets." },
        { id: "a-level-prep-101-l01-a2", type: "animation", title: "Animated Walkthrough", content: "Step-by-step explanation of A-Level: A-Level Standards and Targets." }
      ]
    },
    {
      id: "a-level-prep-101-l02",
      title: "A-Level: Knowledge Retrieval Systems",
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
        { id: "a-level-prep-101-l02-a1", type: "image", title: "Concept Snapshot", content: "Visual summary for A-Level: Knowledge Retrieval Systems." },
        { id: "a-level-prep-101-l02-a2", type: "animation", title: "Animated Walkthrough", content: "Step-by-step explanation of A-Level: Knowledge Retrieval Systems." }
      ]
    },
    {
      id: "a-level-prep-101-l03",
      title: "A-Level: High-Value Topic Prioritization",
      type: "quiz",
      duration: 12,
      questions: [
        {
          id: "a-level-prep-101-l03-q1",
          text: "Which strategy best improves a-level: high-value topic prioritization performance?",
          skillId: "a-level-prep-101-skill-strategy",
          options: [
            { id: "a", text: "Set a plan, practice, and review errors" },
            { id: "b", text: "Skip difficult items with no review" },
            { id: "c", text: "Memorize without application" },
            { id: "d", text: "Ignore timing constraints" }
          ],
          correctOptionId: "a"
        },
        {
          id: "a-level-prep-101-l03-q2",
          text: "What should you do after a timed drill?",
          skillId: "a-level-prep-101-skill-review",
          options: [
            { id: "a", text: "Analyze errors and classify root causes" },
            { id: "b", text: "Only record your score" },
            { id: "c", text: "Move on without reflection" },
            { id: "d", text: "Repeat mistakes unchanged" }
          ],
          correctOptionId: "a"
        },
        {
          id: "a-level-prep-101-l03-q3",
          text: "Which habit most improves exam consistency?",
          skillId: "a-level-prep-101-skill-consistency",
          options: [
            { id: "a", text: "Structured weekly cycles with targeted revision" },
            { id: "b", text: "Random topics daily without tracking" },
            { id: "c", text: "Last-minute cramming only" },
            { id: "d", text: "Avoiding full-length practice" }
          ],
          correctOptionId: "a"
        },
        {
          id: "a-level-prep-101-l03-q4",
          text: "What is the best time-management approach during tests?",
          skillId: "a-level-prep-101-skill-time",
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
        { id: "a-level-prep-101-l03-a1", type: "image", title: "Concept Snapshot", content: "Visual summary for A-Level: High-Value Topic Prioritization." },
        { id: "a-level-prep-101-l03-a2", type: "animation", title: "Animated Walkthrough", content: "Step-by-step explanation of A-Level: High-Value Topic Prioritization." }
      ]
    },
    {
      id: "a-level-prep-101-l04",
      title: "A-Level: Analytical Essay Construction",
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
        { id: "a-level-prep-101-l04-a1", type: "image", title: "Concept Snapshot", content: "Visual summary for A-Level: Analytical Essay Construction." },
        { id: "a-level-prep-101-l04-a2", type: "animation", title: "Animated Walkthrough", content: "Step-by-step explanation of A-Level: Analytical Essay Construction." }
      ]
    },
    {
      id: "a-level-prep-101-l05",
      title: "A-Level: Data and Source Evaluation",
      type: "video",
      duration: 11,
      learningAids: [
        { id: "a-level-prep-101-l05-a1", type: "image", title: "Concept Snapshot", content: "Visual summary for A-Level: Data and Source Evaluation." },
        { id: "a-level-prep-101-l05-a2", type: "animation", title: "Animated Walkthrough", content: "Step-by-step explanation of A-Level: Data and Source Evaluation." }
      ]
    },
    {
      id: "a-level-prep-101-l06",
      title: "A-Level: Synoptic Question Strategy",
      type: "quiz",
      duration: 12,
      questions: [
        {
          id: "a-level-prep-101-l06-q1",
          text: "Which strategy best improves a-level: synoptic question strategy performance?",
          skillId: "a-level-prep-101-skill-strategy",
          options: [
            { id: "a", text: "Set a plan, practice, and review errors" },
            { id: "b", text: "Skip difficult items with no review" },
            { id: "c", text: "Memorize without application" },
            { id: "d", text: "Ignore timing constraints" }
          ],
          correctOptionId: "a"
        },
        {
          id: "a-level-prep-101-l06-q2",
          text: "What should you do after a timed drill?",
          skillId: "a-level-prep-101-skill-review",
          options: [
            { id: "a", text: "Analyze errors and classify root causes" },
            { id: "b", text: "Only record your score" },
            { id: "c", text: "Move on without reflection" },
            { id: "d", text: "Repeat mistakes unchanged" }
          ],
          correctOptionId: "a"
        },
        {
          id: "a-level-prep-101-l06-q3",
          text: "Which habit most improves exam consistency?",
          skillId: "a-level-prep-101-skill-consistency",
          options: [
            { id: "a", text: "Structured weekly cycles with targeted revision" },
            { id: "b", text: "Random topics daily without tracking" },
            { id: "c", text: "Last-minute cramming only" },
            { id: "d", text: "Avoiding full-length practice" }
          ],
          correctOptionId: "a"
        },
        {
          id: "a-level-prep-101-l06-q4",
          text: "What is the best time-management approach during tests?",
          skillId: "a-level-prep-101-skill-time",
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
        { id: "a-level-prep-101-l06-a1", type: "image", title: "Concept Snapshot", content: "Visual summary for A-Level: Synoptic Question Strategy." },
        { id: "a-level-prep-101-l06-a2", type: "animation", title: "Animated Walkthrough", content: "Step-by-step explanation of A-Level: Synoptic Question Strategy." }
      ]
    },
    {
      id: "a-level-prep-101-l07",
      title: "A-Level: Revision Under Time Pressure",
      type: "video",
      duration: 11,
      learningAids: [
        { id: "a-level-prep-101-l07-a1", type: "image", title: "Concept Snapshot", content: "Visual summary for A-Level: Revision Under Time Pressure." },
        { id: "a-level-prep-101-l07-a2", type: "animation", title: "Animated Walkthrough", content: "Step-by-step explanation of A-Level: Revision Under Time Pressure." }
      ]
    },
    {
      id: "a-level-prep-101-l08",
      title: "A-Level: Past Paper Mark-Scheme Analysis",
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
        { id: "a-level-prep-101-l08-a1", type: "image", title: "Concept Snapshot", content: "Visual summary for A-Level: Past Paper Mark-Scheme Analysis." },
        { id: "a-level-prep-101-l08-a2", type: "animation", title: "Animated Walkthrough", content: "Step-by-step explanation of A-Level: Past Paper Mark-Scheme Analysis." }
      ]
    },
    {
      id: "a-level-prep-101-l09",
      title: "A-Level: Coursework/Practical Integration",
      type: "quiz",
      duration: 12,
      questions: [
        {
          id: "a-level-prep-101-l09-q1",
          text: "Which strategy best improves a-level: coursework/practical integration performance?",
          skillId: "a-level-prep-101-skill-strategy",
          options: [
            { id: "a", text: "Set a plan, practice, and review errors" },
            { id: "b", text: "Skip difficult items with no review" },
            { id: "c", text: "Memorize without application" },
            { id: "d", text: "Ignore timing constraints" }
          ],
          correctOptionId: "a"
        },
        {
          id: "a-level-prep-101-l09-q2",
          text: "What should you do after a timed drill?",
          skillId: "a-level-prep-101-skill-review",
          options: [
            { id: "a", text: "Analyze errors and classify root causes" },
            { id: "b", text: "Only record your score" },
            { id: "c", text: "Move on without reflection" },
            { id: "d", text: "Repeat mistakes unchanged" }
          ],
          correctOptionId: "a"
        },
        {
          id: "a-level-prep-101-l09-q3",
          text: "Which habit most improves exam consistency?",
          skillId: "a-level-prep-101-skill-consistency",
          options: [
            { id: "a", text: "Structured weekly cycles with targeted revision" },
            { id: "b", text: "Random topics daily without tracking" },
            { id: "c", text: "Last-minute cramming only" },
            { id: "d", text: "Avoiding full-length practice" }
          ],
          correctOptionId: "a"
        },
        {
          id: "a-level-prep-101-l09-q4",
          text: "What is the best time-management approach during tests?",
          skillId: "a-level-prep-101-skill-time",
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
        { id: "a-level-prep-101-l09-a1", type: "image", title: "Concept Snapshot", content: "Visual summary for A-Level: Coursework/Practical Integration." },
        { id: "a-level-prep-101-l09-a2", type: "animation", title: "Animated Walkthrough", content: "Step-by-step explanation of A-Level: Coursework/Practical Integration." }
      ]
    },
    {
      id: "a-level-prep-101-l10",
      title: "A-Level: Full Mock and Gap Closure",
      type: "quiz",
      duration: 12,
      questions: [
        {
          id: "a-level-prep-101-l10-q1",
          text: "Which strategy best improves a-level: full mock and gap closure performance?",
          skillId: "a-level-prep-101-skill-strategy",
          options: [
            { id: "a", text: "Set a plan, practice, and review errors" },
            { id: "b", text: "Skip difficult items with no review" },
            { id: "c", text: "Memorize without application" },
            { id: "d", text: "Ignore timing constraints" }
          ],
          correctOptionId: "a"
        },
        {
          id: "a-level-prep-101-l10-q2",
          text: "What should you do after a timed drill?",
          skillId: "a-level-prep-101-skill-review",
          options: [
            { id: "a", text: "Analyze errors and classify root causes" },
            { id: "b", text: "Only record your score" },
            { id: "c", text: "Move on without reflection" },
            { id: "d", text: "Repeat mistakes unchanged" }
          ],
          correctOptionId: "a"
        },
        {
          id: "a-level-prep-101-l10-q3",
          text: "Which habit most improves exam consistency?",
          skillId: "a-level-prep-101-skill-consistency",
          options: [
            { id: "a", text: "Structured weekly cycles with targeted revision" },
            { id: "b", text: "Random topics daily without tracking" },
            { id: "c", text: "Last-minute cramming only" },
            { id: "d", text: "Avoiding full-length practice" }
          ],
          correctOptionId: "a"
        },
        {
          id: "a-level-prep-101-l10-q4",
          text: "What is the best time-management approach during tests?",
          skillId: "a-level-prep-101-skill-time",
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
        { id: "a-level-prep-101-l10-a1", type: "image", title: "Concept Snapshot", content: "Visual summary for A-Level: Full Mock and Gap Closure." },
        { id: "a-level-prep-101-l10-a2", type: "animation", title: "Animated Walkthrough", content: "Step-by-step explanation of A-Level: Full Mock and Gap Closure." }
      ]
    }
  ],
};
