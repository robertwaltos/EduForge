import type { LearningModule } from "@/lib/modules/types";

export const IeltsPrep101Module: LearningModule = {
  id: "ielts-prep-101",
  title: "IELTS Prep Foundations",
  description: "Develop IELTS Academic performance across listening, reading, writing, and speaking.",
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
    "Build structured IELTS readiness workflows",
    "Improve speed and accuracy under timed constraints",
    "Use analytics-based revision loops to close weak areas"
  ],
  lessons: [
    {
      id: "ielts-prep-101-l01",
      title: "IELTS: IELTS Band Descriptors and Targets",
      type: "video",
      duration: 11,
      learningAids: [
        { id: "ielts-prep-101-l01-a1", type: "image", title: "Concept Snapshot", content: "Visual summary for IELTS: IELTS Band Descriptors and Targets." },
        { id: "ielts-prep-101-l01-a2", type: "animation", title: "Animated Walkthrough", content: "Step-by-step explanation of IELTS: IELTS Band Descriptors and Targets." }
      ]
    },
    {
      id: "ielts-prep-101-l02",
      title: "IELTS: Listening Section Strategy",
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
        { id: "ielts-prep-101-l02-a1", type: "image", title: "Concept Snapshot", content: "Visual summary for IELTS: Listening Section Strategy." },
        { id: "ielts-prep-101-l02-a2", type: "animation", title: "Animated Walkthrough", content: "Step-by-step explanation of IELTS: Listening Section Strategy." }
      ]
    },
    {
      id: "ielts-prep-101-l03",
      title: "IELTS: Academic Reading Passage Tactics",
      type: "quiz",
      duration: 12,
      questions: [
        {
          id: "ielts-prep-101-l03-q1",
          text: "Which strategy best improves ielts: academic reading passage tactics performance?",
          skillId: "ielts-prep-101-skill-strategy",
          options: [
            { id: "a", text: "Set a plan, practice, and review errors" },
            { id: "b", text: "Skip difficult items with no review" },
            { id: "c", text: "Memorize without application" },
            { id: "d", text: "Ignore timing constraints" }
          ],
          correctOptionId: "a"
        },
        {
          id: "ielts-prep-101-l03-q2",
          text: "What should you do after a timed drill?",
          skillId: "ielts-prep-101-skill-review",
          options: [
            { id: "a", text: "Analyze errors and classify root causes" },
            { id: "b", text: "Only record your score" },
            { id: "c", text: "Move on without reflection" },
            { id: "d", text: "Repeat mistakes unchanged" }
          ],
          correctOptionId: "a"
        },
        {
          id: "ielts-prep-101-l03-q3",
          text: "Which habit most improves exam consistency?",
          skillId: "ielts-prep-101-skill-consistency",
          options: [
            { id: "a", text: "Structured weekly cycles with targeted revision" },
            { id: "b", text: "Random topics daily without tracking" },
            { id: "c", text: "Last-minute cramming only" },
            { id: "d", text: "Avoiding full-length practice" }
          ],
          correctOptionId: "a"
        },
        {
          id: "ielts-prep-101-l03-q4",
          text: "What is the best time-management approach during tests?",
          skillId: "ielts-prep-101-skill-time",
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
        { id: "ielts-prep-101-l03-a1", type: "image", title: "Concept Snapshot", content: "Visual summary for IELTS: Academic Reading Passage Tactics." },
        { id: "ielts-prep-101-l03-a2", type: "animation", title: "Animated Walkthrough", content: "Step-by-step explanation of IELTS: Academic Reading Passage Tactics." }
      ]
    },
    {
      id: "ielts-prep-101-l04",
      title: "IELTS: Writing Task 1 Visual Analysis",
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
        { id: "ielts-prep-101-l04-a1", type: "image", title: "Concept Snapshot", content: "Visual summary for IELTS: Writing Task 1 Visual Analysis." },
        { id: "ielts-prep-101-l04-a2", type: "animation", title: "Animated Walkthrough", content: "Step-by-step explanation of IELTS: Writing Task 1 Visual Analysis." }
      ]
    },
    {
      id: "ielts-prep-101-l05",
      title: "IELTS: Writing Task 2 Argument Strategy",
      type: "video",
      duration: 11,
      learningAids: [
        { id: "ielts-prep-101-l05-a1", type: "image", title: "Concept Snapshot", content: "Visual summary for IELTS: Writing Task 2 Argument Strategy." },
        { id: "ielts-prep-101-l05-a2", type: "animation", title: "Animated Walkthrough", content: "Step-by-step explanation of IELTS: Writing Task 2 Argument Strategy." }
      ]
    },
    {
      id: "ielts-prep-101-l06",
      title: "IELTS: Speaking Part 1 and 2 Fluency",
      type: "quiz",
      duration: 12,
      questions: [
        {
          id: "ielts-prep-101-l06-q1",
          text: "Which strategy best improves ielts: speaking part 1 and 2 fluency performance?",
          skillId: "ielts-prep-101-skill-strategy",
          options: [
            { id: "a", text: "Set a plan, practice, and review errors" },
            { id: "b", text: "Skip difficult items with no review" },
            { id: "c", text: "Memorize without application" },
            { id: "d", text: "Ignore timing constraints" }
          ],
          correctOptionId: "a"
        },
        {
          id: "ielts-prep-101-l06-q2",
          text: "What should you do after a timed drill?",
          skillId: "ielts-prep-101-skill-review",
          options: [
            { id: "a", text: "Analyze errors and classify root causes" },
            { id: "b", text: "Only record your score" },
            { id: "c", text: "Move on without reflection" },
            { id: "d", text: "Repeat mistakes unchanged" }
          ],
          correctOptionId: "a"
        },
        {
          id: "ielts-prep-101-l06-q3",
          text: "Which habit most improves exam consistency?",
          skillId: "ielts-prep-101-skill-consistency",
          options: [
            { id: "a", text: "Structured weekly cycles with targeted revision" },
            { id: "b", text: "Random topics daily without tracking" },
            { id: "c", text: "Last-minute cramming only" },
            { id: "d", text: "Avoiding full-length practice" }
          ],
          correctOptionId: "a"
        },
        {
          id: "ielts-prep-101-l06-q4",
          text: "What is the best time-management approach during tests?",
          skillId: "ielts-prep-101-skill-time",
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
        { id: "ielts-prep-101-l06-a1", type: "image", title: "Concept Snapshot", content: "Visual summary for IELTS: Speaking Part 1 and 2 Fluency." },
        { id: "ielts-prep-101-l06-a2", type: "animation", title: "Animated Walkthrough", content: "Step-by-step explanation of IELTS: Speaking Part 1 and 2 Fluency." }
      ]
    },
    {
      id: "ielts-prep-101-l07",
      title: "IELTS: Speaking Part 3 Depth and Logic",
      type: "video",
      duration: 11,
      learningAids: [
        { id: "ielts-prep-101-l07-a1", type: "image", title: "Concept Snapshot", content: "Visual summary for IELTS: Speaking Part 3 Depth and Logic." },
        { id: "ielts-prep-101-l07-a2", type: "animation", title: "Animated Walkthrough", content: "Step-by-step explanation of IELTS: Speaking Part 3 Depth and Logic." }
      ]
    },
    {
      id: "ielts-prep-101-l08",
      title: "IELTS: Error Patterns and Band Improvement",
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
        { id: "ielts-prep-101-l08-a1", type: "image", title: "Concept Snapshot", content: "Visual summary for IELTS: Error Patterns and Band Improvement." },
        { id: "ielts-prep-101-l08-a2", type: "animation", title: "Animated Walkthrough", content: "Step-by-step explanation of IELTS: Error Patterns and Band Improvement." }
      ]
    },
    {
      id: "ielts-prep-101-l09",
      title: "IELTS: Timed Multi-Skill Drill",
      type: "quiz",
      duration: 12,
      questions: [
        {
          id: "ielts-prep-101-l09-q1",
          text: "Which strategy best improves ielts: timed multi-skill drill performance?",
          skillId: "ielts-prep-101-skill-strategy",
          options: [
            { id: "a", text: "Set a plan, practice, and review errors" },
            { id: "b", text: "Skip difficult items with no review" },
            { id: "c", text: "Memorize without application" },
            { id: "d", text: "Ignore timing constraints" }
          ],
          correctOptionId: "a"
        },
        {
          id: "ielts-prep-101-l09-q2",
          text: "What should you do after a timed drill?",
          skillId: "ielts-prep-101-skill-review",
          options: [
            { id: "a", text: "Analyze errors and classify root causes" },
            { id: "b", text: "Only record your score" },
            { id: "c", text: "Move on without reflection" },
            { id: "d", text: "Repeat mistakes unchanged" }
          ],
          correctOptionId: "a"
        },
        {
          id: "ielts-prep-101-l09-q3",
          text: "Which habit most improves exam consistency?",
          skillId: "ielts-prep-101-skill-consistency",
          options: [
            { id: "a", text: "Structured weekly cycles with targeted revision" },
            { id: "b", text: "Random topics daily without tracking" },
            { id: "c", text: "Last-minute cramming only" },
            { id: "d", text: "Avoiding full-length practice" }
          ],
          correctOptionId: "a"
        },
        {
          id: "ielts-prep-101-l09-q4",
          text: "What is the best time-management approach during tests?",
          skillId: "ielts-prep-101-skill-time",
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
        { id: "ielts-prep-101-l09-a1", type: "image", title: "Concept Snapshot", content: "Visual summary for IELTS: Timed Multi-Skill Drill." },
        { id: "ielts-prep-101-l09-a2", type: "animation", title: "Animated Walkthrough", content: "Step-by-step explanation of IELTS: Timed Multi-Skill Drill." }
      ]
    },
    {
      id: "ielts-prep-101-l10",
      title: "IELTS: Full IELTS Mock and Improvement Plan",
      type: "quiz",
      duration: 12,
      questions: [
        {
          id: "ielts-prep-101-l10-q1",
          text: "Which strategy best improves ielts: full ielts mock and improvement plan performance?",
          skillId: "ielts-prep-101-skill-strategy",
          options: [
            { id: "a", text: "Set a plan, practice, and review errors" },
            { id: "b", text: "Skip difficult items with no review" },
            { id: "c", text: "Memorize without application" },
            { id: "d", text: "Ignore timing constraints" }
          ],
          correctOptionId: "a"
        },
        {
          id: "ielts-prep-101-l10-q2",
          text: "What should you do after a timed drill?",
          skillId: "ielts-prep-101-skill-review",
          options: [
            { id: "a", text: "Analyze errors and classify root causes" },
            { id: "b", text: "Only record your score" },
            { id: "c", text: "Move on without reflection" },
            { id: "d", text: "Repeat mistakes unchanged" }
          ],
          correctOptionId: "a"
        },
        {
          id: "ielts-prep-101-l10-q3",
          text: "Which habit most improves exam consistency?",
          skillId: "ielts-prep-101-skill-consistency",
          options: [
            { id: "a", text: "Structured weekly cycles with targeted revision" },
            { id: "b", text: "Random topics daily without tracking" },
            { id: "c", text: "Last-minute cramming only" },
            { id: "d", text: "Avoiding full-length practice" }
          ],
          correctOptionId: "a"
        },
        {
          id: "ielts-prep-101-l10-q4",
          text: "What is the best time-management approach during tests?",
          skillId: "ielts-prep-101-skill-time",
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
        { id: "ielts-prep-101-l10-a1", type: "image", title: "Concept Snapshot", content: "Visual summary for IELTS: Full IELTS Mock and Improvement Plan." },
        { id: "ielts-prep-101-l10-a2", type: "animation", title: "Animated Walkthrough", content: "Step-by-step explanation of IELTS: Full IELTS Mock and Improvement Plan." }
      ]
    }
  ],
};
