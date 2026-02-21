import type { LearningModule } from "@/lib/modules/types";

export const AtarPrep101Module: LearningModule = {
  id: "atar-prep-101",
  title: "ATAR Prep Foundations",
  description: "Prepare for ATAR pathways with subject scaling awareness and disciplined revision systems.",
  subject: "Exam Prep",
  tags: ["exam-prep", "assessment", "advanced"],
  minAge: 15,
  maxAge: 20,
  moduleVersion: "1.0.0",
  version: "1.0.0",
  difficultyBand: "advanced",
  localeSupport: ["en", "es", "fr", "de", "ar", "hi", "zh", "ja", "ko", "ru"],
  thumbnail: "/placeholders/lesson-robot.svg",
  learningObjectives: [
    "Build structured ATAR readiness workflows",
    "Improve speed and accuracy under timed constraints",
    "Use analytics-based revision loops to close weak areas"
  ],
  lessons: [
    {
      id: "atar-prep-101-l01",
      title: "ATAR: ATAR Pathways and Subject Selection",
      type: "video",
      duration: 11,
      learningAids: [
        { id: "atar-prep-101-l01-a1", type: "image", title: "Concept Snapshot", content: "Visual summary for ATAR: ATAR Pathways and Subject Selection." },
        { id: "atar-prep-101-l01-a2", type: "animation", title: "Animated Walkthrough", content: "Step-by-step explanation of ATAR: ATAR Pathways and Subject Selection." }
      ]
    },
    {
      id: "atar-prep-101-l02",
      title: "ATAR: Study Design Interpretation",
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
        { id: "atar-prep-101-l02-a1", type: "image", title: "Concept Snapshot", content: "Visual summary for ATAR: Study Design Interpretation." },
        { id: "atar-prep-101-l02-a2", type: "animation", title: "Animated Walkthrough", content: "Step-by-step explanation of ATAR: Study Design Interpretation." }
      ]
    },
    {
      id: "atar-prep-101-l03",
      title: "ATAR: Exam Technique by Subject Type",
      type: "quiz",
      duration: 12,
      questions: [
        {
          id: "atar-prep-101-l03-q1",
          text: "Which strategy best improves atar: exam technique by subject type performance?",
          skillId: "atar-prep-101-skill-strategy",
          options: [
            { id: "a", text: "Set a plan, practice, and review errors" },
            { id: "b", text: "Skip difficult items with no review" },
            { id: "c", text: "Memorize without application" },
            { id: "d", text: "Ignore timing constraints" }
          ],
          correctOptionId: "a"
        },
        {
          id: "atar-prep-101-l03-q2",
          text: "What should you do after a timed drill?",
          skillId: "atar-prep-101-skill-review",
          options: [
            { id: "a", text: "Analyze errors and classify root causes" },
            { id: "b", text: "Only record your score" },
            { id: "c", text: "Move on without reflection" },
            { id: "d", text: "Repeat mistakes unchanged" }
          ],
          correctOptionId: "a"
        },
        {
          id: "atar-prep-101-l03-q3",
          text: "Which habit most improves exam consistency?",
          skillId: "atar-prep-101-skill-consistency",
          options: [
            { id: "a", text: "Structured weekly cycles with targeted revision" },
            { id: "b", text: "Random topics daily without tracking" },
            { id: "c", text: "Last-minute cramming only" },
            { id: "d", text: "Avoiding full-length practice" }
          ],
          correctOptionId: "a"
        },
        {
          id: "atar-prep-101-l03-q4",
          text: "What is the best time-management approach during tests?",
          skillId: "atar-prep-101-skill-time",
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
        { id: "atar-prep-101-l03-a1", type: "image", title: "Concept Snapshot", content: "Visual summary for ATAR: Exam Technique by Subject Type." },
        { id: "atar-prep-101-l03-a2", type: "animation", title: "Animated Walkthrough", content: "Step-by-step explanation of ATAR: Exam Technique by Subject Type." }
      ]
    },
    {
      id: "atar-prep-101-l04",
      title: "ATAR: ATAR High-Value Topic Prioritization",
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
        { id: "atar-prep-101-l04-a1", type: "image", title: "Concept Snapshot", content: "Visual summary for ATAR: ATAR High-Value Topic Prioritization." },
        { id: "atar-prep-101-l04-a2", type: "animation", title: "Animated Walkthrough", content: "Step-by-step explanation of ATAR: ATAR High-Value Topic Prioritization." }
      ]
    },
    {
      id: "atar-prep-101-l05",
      title: "ATAR: Timed Response Quality Control",
      type: "video",
      duration: 11,
      learningAids: [
        { id: "atar-prep-101-l05-a1", type: "image", title: "Concept Snapshot", content: "Visual summary for ATAR: Timed Response Quality Control." },
        { id: "atar-prep-101-l05-a2", type: "animation", title: "Animated Walkthrough", content: "Step-by-step explanation of ATAR: Timed Response Quality Control." }
      ]
    },
    {
      id: "atar-prep-101-l06",
      title: "ATAR: Marking Criteria and Self-Assessment",
      type: "quiz",
      duration: 12,
      questions: [
        {
          id: "atar-prep-101-l06-q1",
          text: "Which strategy best improves atar: marking criteria and self-assessment performance?",
          skillId: "atar-prep-101-skill-strategy",
          options: [
            { id: "a", text: "Set a plan, practice, and review errors" },
            { id: "b", text: "Skip difficult items with no review" },
            { id: "c", text: "Memorize without application" },
            { id: "d", text: "Ignore timing constraints" }
          ],
          correctOptionId: "a"
        },
        {
          id: "atar-prep-101-l06-q2",
          text: "What should you do after a timed drill?",
          skillId: "atar-prep-101-skill-review",
          options: [
            { id: "a", text: "Analyze errors and classify root causes" },
            { id: "b", text: "Only record your score" },
            { id: "c", text: "Move on without reflection" },
            { id: "d", text: "Repeat mistakes unchanged" }
          ],
          correctOptionId: "a"
        },
        {
          id: "atar-prep-101-l06-q3",
          text: "Which habit most improves exam consistency?",
          skillId: "atar-prep-101-skill-consistency",
          options: [
            { id: "a", text: "Structured weekly cycles with targeted revision" },
            { id: "b", text: "Random topics daily without tracking" },
            { id: "c", text: "Last-minute cramming only" },
            { id: "d", text: "Avoiding full-length practice" }
          ],
          correctOptionId: "a"
        },
        {
          id: "atar-prep-101-l06-q4",
          text: "What is the best time-management approach during tests?",
          skillId: "atar-prep-101-skill-time",
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
        { id: "atar-prep-101-l06-a1", type: "image", title: "Concept Snapshot", content: "Visual summary for ATAR: Marking Criteria and Self-Assessment." },
        { id: "atar-prep-101-l06-a2", type: "animation", title: "Animated Walkthrough", content: "Step-by-step explanation of ATAR: Marking Criteria and Self-Assessment." }
      ]
    },
    {
      id: "atar-prep-101-l07",
      title: "ATAR: Revision Cycle Planning",
      type: "video",
      duration: 11,
      learningAids: [
        { id: "atar-prep-101-l07-a1", type: "image", title: "Concept Snapshot", content: "Visual summary for ATAR: Revision Cycle Planning." },
        { id: "atar-prep-101-l07-a2", type: "animation", title: "Animated Walkthrough", content: "Step-by-step explanation of ATAR: Revision Cycle Planning." }
      ]
    },
    {
      id: "atar-prep-101-l08",
      title: "ATAR: Mock Exam Analytics",
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
        { id: "atar-prep-101-l08-a1", type: "image", title: "Concept Snapshot", content: "Visual summary for ATAR: Mock Exam Analytics." },
        { id: "atar-prep-101-l08-a2", type: "animation", title: "Animated Walkthrough", content: "Step-by-step explanation of ATAR: Mock Exam Analytics." }
      ]
    },
    {
      id: "atar-prep-101-l09",
      title: "ATAR: Stress and Consistency Routines",
      type: "quiz",
      duration: 12,
      questions: [
        {
          id: "atar-prep-101-l09-q1",
          text: "Which strategy best improves atar: stress and consistency routines performance?",
          skillId: "atar-prep-101-skill-strategy",
          options: [
            { id: "a", text: "Set a plan, practice, and review errors" },
            { id: "b", text: "Skip difficult items with no review" },
            { id: "c", text: "Memorize without application" },
            { id: "d", text: "Ignore timing constraints" }
          ],
          correctOptionId: "a"
        },
        {
          id: "atar-prep-101-l09-q2",
          text: "What should you do after a timed drill?",
          skillId: "atar-prep-101-skill-review",
          options: [
            { id: "a", text: "Analyze errors and classify root causes" },
            { id: "b", text: "Only record your score" },
            { id: "c", text: "Move on without reflection" },
            { id: "d", text: "Repeat mistakes unchanged" }
          ],
          correctOptionId: "a"
        },
        {
          id: "atar-prep-101-l09-q3",
          text: "Which habit most improves exam consistency?",
          skillId: "atar-prep-101-skill-consistency",
          options: [
            { id: "a", text: "Structured weekly cycles with targeted revision" },
            { id: "b", text: "Random topics daily without tracking" },
            { id: "c", text: "Last-minute cramming only" },
            { id: "d", text: "Avoiding full-length practice" }
          ],
          correctOptionId: "a"
        },
        {
          id: "atar-prep-101-l09-q4",
          text: "What is the best time-management approach during tests?",
          skillId: "atar-prep-101-skill-time",
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
        { id: "atar-prep-101-l09-a1", type: "image", title: "Concept Snapshot", content: "Visual summary for ATAR: Stress and Consistency Routines." },
        { id: "atar-prep-101-l09-a2", type: "animation", title: "Animated Walkthrough", content: "Step-by-step explanation of ATAR: Stress and Consistency Routines." }
      ]
    },
    {
      id: "atar-prep-101-l10",
      title: "ATAR: Final ATAR Readiness Blueprint",
      type: "quiz",
      duration: 12,
      questions: [
        {
          id: "atar-prep-101-l10-q1",
          text: "Which strategy best improves atar: final atar readiness blueprint performance?",
          skillId: "atar-prep-101-skill-strategy",
          options: [
            { id: "a", text: "Set a plan, practice, and review errors" },
            { id: "b", text: "Skip difficult items with no review" },
            { id: "c", text: "Memorize without application" },
            { id: "d", text: "Ignore timing constraints" }
          ],
          correctOptionId: "a"
        },
        {
          id: "atar-prep-101-l10-q2",
          text: "What should you do after a timed drill?",
          skillId: "atar-prep-101-skill-review",
          options: [
            { id: "a", text: "Analyze errors and classify root causes" },
            { id: "b", text: "Only record your score" },
            { id: "c", text: "Move on without reflection" },
            { id: "d", text: "Repeat mistakes unchanged" }
          ],
          correctOptionId: "a"
        },
        {
          id: "atar-prep-101-l10-q3",
          text: "Which habit most improves exam consistency?",
          skillId: "atar-prep-101-skill-consistency",
          options: [
            { id: "a", text: "Structured weekly cycles with targeted revision" },
            { id: "b", text: "Random topics daily without tracking" },
            { id: "c", text: "Last-minute cramming only" },
            { id: "d", text: "Avoiding full-length practice" }
          ],
          correctOptionId: "a"
        },
        {
          id: "atar-prep-101-l10-q4",
          text: "What is the best time-management approach during tests?",
          skillId: "atar-prep-101-skill-time",
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
        { id: "atar-prep-101-l10-a1", type: "image", title: "Concept Snapshot", content: "Visual summary for ATAR: Final ATAR Readiness Blueprint." },
        { id: "atar-prep-101-l10-a2", type: "animation", title: "Animated Walkthrough", content: "Step-by-step explanation of ATAR: Final ATAR Readiness Blueprint." }
      ]
    }
  ],
};
