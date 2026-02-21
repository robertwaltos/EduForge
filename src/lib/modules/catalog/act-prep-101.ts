import type { LearningModule } from "@/lib/modules/types";

export const ActPrep101Module: LearningModule = {
  id: "act-prep-101",
  title: "ACT Prep Foundations",
  description: "Prepare for ACT English, Math, Reading, and Science with targeted drills.",
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
    "Build structured ACT readiness workflows",
    "Improve speed and accuracy under timed constraints",
    "Use analytics-based revision loops to close weak areas"
  ],
  lessons: [
    {
      id: "act-prep-101-l01",
      title: "ACT: ACT Overview and Scoring",
      type: "video",
      duration: 11,
      learningAids: [
        { id: "act-prep-101-l01-a1", type: "image", title: "Concept Snapshot", content: "Visual summary for ACT: ACT Overview and Scoring." },
        { id: "act-prep-101-l01-a2", type: "animation", title: "Animated Walkthrough", content: "Step-by-step explanation of ACT: ACT Overview and Scoring." }
      ]
    },
    {
      id: "act-prep-101-l02",
      title: "ACT: English Usage and Rhetoric",
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
        { id: "act-prep-101-l02-a1", type: "image", title: "Concept Snapshot", content: "Visual summary for ACT: English Usage and Rhetoric." },
        { id: "act-prep-101-l02-a2", type: "animation", title: "Animated Walkthrough", content: "Step-by-step explanation of ACT: English Usage and Rhetoric." }
      ]
    },
    {
      id: "act-prep-101-l03",
      title: "ACT: Math Core Skill Review",
      type: "quiz",
      duration: 12,
      questions: [
        {
          id: "act-prep-101-l03-q1",
          text: "Which strategy best improves act: math core skill review performance?",
          skillId: "act-prep-101-skill-strategy",
          options: [
            { id: "a", text: "Set a plan, practice, and review errors" },
            { id: "b", text: "Skip difficult items with no review" },
            { id: "c", text: "Memorize without application" },
            { id: "d", text: "Ignore timing constraints" }
          ],
          correctOptionId: "a"
        },
        {
          id: "act-prep-101-l03-q2",
          text: "What should you do after a timed drill?",
          skillId: "act-prep-101-skill-review",
          options: [
            { id: "a", text: "Analyze errors and classify root causes" },
            { id: "b", text: "Only record your score" },
            { id: "c", text: "Move on without reflection" },
            { id: "d", text: "Repeat mistakes unchanged" }
          ],
          correctOptionId: "a"
        },
        {
          id: "act-prep-101-l03-q3",
          text: "Which habit most improves exam consistency?",
          skillId: "act-prep-101-skill-consistency",
          options: [
            { id: "a", text: "Structured weekly cycles with targeted revision" },
            { id: "b", text: "Random topics daily without tracking" },
            { id: "c", text: "Last-minute cramming only" },
            { id: "d", text: "Avoiding full-length practice" }
          ],
          correctOptionId: "a"
        },
        {
          id: "act-prep-101-l03-q4",
          text: "What is the best time-management approach during tests?",
          skillId: "act-prep-101-skill-time",
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
        { id: "act-prep-101-l03-a1", type: "image", title: "Concept Snapshot", content: "Visual summary for ACT: Math Core Skill Review." },
        { id: "act-prep-101-l03-a2", type: "animation", title: "Animated Walkthrough", content: "Step-by-step explanation of ACT: Math Core Skill Review." }
      ]
    },
    {
      id: "act-prep-101-l04",
      title: "ACT: Reading Passage Strategy",
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
        { id: "act-prep-101-l04-a1", type: "image", title: "Concept Snapshot", content: "Visual summary for ACT: Reading Passage Strategy." },
        { id: "act-prep-101-l04-a2", type: "animation", title: "Animated Walkthrough", content: "Step-by-step explanation of ACT: Reading Passage Strategy." }
      ]
    },
    {
      id: "act-prep-101-l05",
      title: "ACT: Science Reasoning Techniques",
      type: "video",
      duration: 11,
      learningAids: [
        { id: "act-prep-101-l05-a1", type: "image", title: "Concept Snapshot", content: "Visual summary for ACT: Science Reasoning Techniques." },
        { id: "act-prep-101-l05-a2", type: "animation", title: "Animated Walkthrough", content: "Step-by-step explanation of ACT: Science Reasoning Techniques." }
      ]
    },
    {
      id: "act-prep-101-l06",
      title: "ACT: Pacing Under Time Limits",
      type: "quiz",
      duration: 12,
      questions: [
        {
          id: "act-prep-101-l06-q1",
          text: "Which strategy best improves act: pacing under time limits performance?",
          skillId: "act-prep-101-skill-strategy",
          options: [
            { id: "a", text: "Set a plan, practice, and review errors" },
            { id: "b", text: "Skip difficult items with no review" },
            { id: "c", text: "Memorize without application" },
            { id: "d", text: "Ignore timing constraints" }
          ],
          correctOptionId: "a"
        },
        {
          id: "act-prep-101-l06-q2",
          text: "What should you do after a timed drill?",
          skillId: "act-prep-101-skill-review",
          options: [
            { id: "a", text: "Analyze errors and classify root causes" },
            { id: "b", text: "Only record your score" },
            { id: "c", text: "Move on without reflection" },
            { id: "d", text: "Repeat mistakes unchanged" }
          ],
          correctOptionId: "a"
        },
        {
          id: "act-prep-101-l06-q3",
          text: "Which habit most improves exam consistency?",
          skillId: "act-prep-101-skill-consistency",
          options: [
            { id: "a", text: "Structured weekly cycles with targeted revision" },
            { id: "b", text: "Random topics daily without tracking" },
            { id: "c", text: "Last-minute cramming only" },
            { id: "d", text: "Avoiding full-length practice" }
          ],
          correctOptionId: "a"
        },
        {
          id: "act-prep-101-l06-q4",
          text: "What is the best time-management approach during tests?",
          skillId: "act-prep-101-skill-time",
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
        { id: "act-prep-101-l06-a1", type: "image", title: "Concept Snapshot", content: "Visual summary for ACT: Pacing Under Time Limits." },
        { id: "act-prep-101-l06-a2", type: "animation", title: "Animated Walkthrough", content: "Step-by-step explanation of ACT: Pacing Under Time Limits." }
      ]
    },
    {
      id: "act-prep-101-l07",
      title: "ACT: Error Log and Recovery",
      type: "video",
      duration: 11,
      learningAids: [
        { id: "act-prep-101-l07-a1", type: "image", title: "Concept Snapshot", content: "Visual summary for ACT: Error Log and Recovery." },
        { id: "act-prep-101-l07-a2", type: "animation", title: "Animated Walkthrough", content: "Step-by-step explanation of ACT: Error Log and Recovery." }
      ]
    },
    {
      id: "act-prep-101-l08",
      title: "ACT: Section Drill: English + Reading",
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
        { id: "act-prep-101-l08-a1", type: "image", title: "Concept Snapshot", content: "Visual summary for ACT: Section Drill: English + Reading." },
        { id: "act-prep-101-l08-a2", type: "animation", title: "Animated Walkthrough", content: "Step-by-step explanation of ACT: Section Drill: English + Reading." }
      ]
    },
    {
      id: "act-prep-101-l09",
      title: "ACT: Section Drill: Math + Science",
      type: "quiz",
      duration: 12,
      questions: [
        {
          id: "act-prep-101-l09-q1",
          text: "Which strategy best improves act: section drill: math + science performance?",
          skillId: "act-prep-101-skill-strategy",
          options: [
            { id: "a", text: "Set a plan, practice, and review errors" },
            { id: "b", text: "Skip difficult items with no review" },
            { id: "c", text: "Memorize without application" },
            { id: "d", text: "Ignore timing constraints" }
          ],
          correctOptionId: "a"
        },
        {
          id: "act-prep-101-l09-q2",
          text: "What should you do after a timed drill?",
          skillId: "act-prep-101-skill-review",
          options: [
            { id: "a", text: "Analyze errors and classify root causes" },
            { id: "b", text: "Only record your score" },
            { id: "c", text: "Move on without reflection" },
            { id: "d", text: "Repeat mistakes unchanged" }
          ],
          correctOptionId: "a"
        },
        {
          id: "act-prep-101-l09-q3",
          text: "Which habit most improves exam consistency?",
          skillId: "act-prep-101-skill-consistency",
          options: [
            { id: "a", text: "Structured weekly cycles with targeted revision" },
            { id: "b", text: "Random topics daily without tracking" },
            { id: "c", text: "Last-minute cramming only" },
            { id: "d", text: "Avoiding full-length practice" }
          ],
          correctOptionId: "a"
        },
        {
          id: "act-prep-101-l09-q4",
          text: "What is the best time-management approach during tests?",
          skillId: "act-prep-101-skill-time",
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
        { id: "act-prep-101-l09-a1", type: "image", title: "Concept Snapshot", content: "Visual summary for ACT: Section Drill: Math + Science." },
        { id: "act-prep-101-l09-a2", type: "animation", title: "Animated Walkthrough", content: "Step-by-step explanation of ACT: Section Drill: Math + Science." }
      ]
    },
    {
      id: "act-prep-101-l10",
      title: "ACT: Full ACT Mock and Review",
      type: "quiz",
      duration: 12,
      questions: [
        {
          id: "act-prep-101-l10-q1",
          text: "Which strategy best improves act: full act mock and review performance?",
          skillId: "act-prep-101-skill-strategy",
          options: [
            { id: "a", text: "Set a plan, practice, and review errors" },
            { id: "b", text: "Skip difficult items with no review" },
            { id: "c", text: "Memorize without application" },
            { id: "d", text: "Ignore timing constraints" }
          ],
          correctOptionId: "a"
        },
        {
          id: "act-prep-101-l10-q2",
          text: "What should you do after a timed drill?",
          skillId: "act-prep-101-skill-review",
          options: [
            { id: "a", text: "Analyze errors and classify root causes" },
            { id: "b", text: "Only record your score" },
            { id: "c", text: "Move on without reflection" },
            { id: "d", text: "Repeat mistakes unchanged" }
          ],
          correctOptionId: "a"
        },
        {
          id: "act-prep-101-l10-q3",
          text: "Which habit most improves exam consistency?",
          skillId: "act-prep-101-skill-consistency",
          options: [
            { id: "a", text: "Structured weekly cycles with targeted revision" },
            { id: "b", text: "Random topics daily without tracking" },
            { id: "c", text: "Last-minute cramming only" },
            { id: "d", text: "Avoiding full-length practice" }
          ],
          correctOptionId: "a"
        },
        {
          id: "act-prep-101-l10-q4",
          text: "What is the best time-management approach during tests?",
          skillId: "act-prep-101-skill-time",
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
        { id: "act-prep-101-l10-a1", type: "image", title: "Concept Snapshot", content: "Visual summary for ACT: Full ACT Mock and Review." },
        { id: "act-prep-101-l10-a2", type: "animation", title: "Animated Walkthrough", content: "Step-by-step explanation of ACT: Full ACT Mock and Review." }
      ]
    }
  ],
};
