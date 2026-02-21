import type { LearningModule } from "@/lib/modules/types";

export const IbPrep101Module: LearningModule = {
  id: "ib-prep-101",
  title: "IB Diploma Prep Foundations",
  description: "Build planning, IA/EE workflows, and exam strategy for the IB Diploma Programme.",
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
    "Build structured IB Diploma readiness workflows",
    "Improve speed and accuracy under timed constraints",
    "Use analytics-based revision loops to close weak areas"
  ],
  lessons: [
    {
      id: "ib-prep-101-l01",
      title: "IB: IB Diploma Structure and Subject Planning",
      type: "video",
      duration: 11,
      learningAids: [
        { id: "ib-prep-101-l01-a1", type: "image", title: "Concept Snapshot", content: "Visual summary for IB: IB Diploma Structure and Subject Planning." },
        { id: "ib-prep-101-l01-a2", type: "animation", title: "Animated Walkthrough", content: "Step-by-step explanation of IB: IB Diploma Structure and Subject Planning." }
      ]
    },
    {
      id: "ib-prep-101-l02",
      title: "IB: Higher Level and Standard Level Strategy",
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
        { id: "ib-prep-101-l02-a1", type: "image", title: "Concept Snapshot", content: "Visual summary for IB: Higher Level and Standard Level Strategy." },
        { id: "ib-prep-101-l02-a2", type: "animation", title: "Animated Walkthrough", content: "Step-by-step explanation of IB: Higher Level and Standard Level Strategy." }
      ]
    },
    {
      id: "ib-prep-101-l03",
      title: "IB: Theory of Knowledge Reasoning Skills",
      type: "quiz",
      duration: 12,
      questions: [
        {
          id: "ib-prep-101-l03-q1",
          text: "Which strategy best improves ib: theory of knowledge reasoning skills performance?",
          skillId: "ib-prep-101-skill-strategy",
          options: [
            { id: "a", text: "Set a plan, practice, and review errors" },
            { id: "b", text: "Skip difficult items with no review" },
            { id: "c", text: "Memorize without application" },
            { id: "d", text: "Ignore timing constraints" }
          ],
          correctOptionId: "a"
        },
        {
          id: "ib-prep-101-l03-q2",
          text: "What should you do after a timed drill?",
          skillId: "ib-prep-101-skill-review",
          options: [
            { id: "a", text: "Analyze errors and classify root causes" },
            { id: "b", text: "Only record your score" },
            { id: "c", text: "Move on without reflection" },
            { id: "d", text: "Repeat mistakes unchanged" }
          ],
          correctOptionId: "a"
        },
        {
          id: "ib-prep-101-l03-q3",
          text: "Which habit most improves exam consistency?",
          skillId: "ib-prep-101-skill-consistency",
          options: [
            { id: "a", text: "Structured weekly cycles with targeted revision" },
            { id: "b", text: "Random topics daily without tracking" },
            { id: "c", text: "Last-minute cramming only" },
            { id: "d", text: "Avoiding full-length practice" }
          ],
          correctOptionId: "a"
        },
        {
          id: "ib-prep-101-l03-q4",
          text: "What is the best time-management approach during tests?",
          skillId: "ib-prep-101-skill-time",
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
        { id: "ib-prep-101-l03-a1", type: "image", title: "Concept Snapshot", content: "Visual summary for IB: Theory of Knowledge Reasoning Skills." },
        { id: "ib-prep-101-l03-a2", type: "animation", title: "Animated Walkthrough", content: "Step-by-step explanation of IB: Theory of Knowledge Reasoning Skills." }
      ]
    },
    {
      id: "ib-prep-101-l04",
      title: "IB: Extended Essay Research Workflow",
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
        { id: "ib-prep-101-l04-a1", type: "image", title: "Concept Snapshot", content: "Visual summary for IB: Extended Essay Research Workflow." },
        { id: "ib-prep-101-l04-a2", type: "animation", title: "Animated Walkthrough", content: "Step-by-step explanation of IB: Extended Essay Research Workflow." }
      ]
    },
    {
      id: "ib-prep-101-l05",
      title: "IB: Internal Assessment Quality Standards",
      type: "video",
      duration: 11,
      learningAids: [
        { id: "ib-prep-101-l05-a1", type: "image", title: "Concept Snapshot", content: "Visual summary for IB: Internal Assessment Quality Standards." },
        { id: "ib-prep-101-l05-a2", type: "animation", title: "Animated Walkthrough", content: "Step-by-step explanation of IB: Internal Assessment Quality Standards." }
      ]
    },
    {
      id: "ib-prep-101-l06",
      title: "IB: Command Terms and Markscheme Use",
      type: "quiz",
      duration: 12,
      questions: [
        {
          id: "ib-prep-101-l06-q1",
          text: "Which strategy best improves ib: command terms and markscheme use performance?",
          skillId: "ib-prep-101-skill-strategy",
          options: [
            { id: "a", text: "Set a plan, practice, and review errors" },
            { id: "b", text: "Skip difficult items with no review" },
            { id: "c", text: "Memorize without application" },
            { id: "d", text: "Ignore timing constraints" }
          ],
          correctOptionId: "a"
        },
        {
          id: "ib-prep-101-l06-q2",
          text: "What should you do after a timed drill?",
          skillId: "ib-prep-101-skill-review",
          options: [
            { id: "a", text: "Analyze errors and classify root causes" },
            { id: "b", text: "Only record your score" },
            { id: "c", text: "Move on without reflection" },
            { id: "d", text: "Repeat mistakes unchanged" }
          ],
          correctOptionId: "a"
        },
        {
          id: "ib-prep-101-l06-q3",
          text: "Which habit most improves exam consistency?",
          skillId: "ib-prep-101-skill-consistency",
          options: [
            { id: "a", text: "Structured weekly cycles with targeted revision" },
            { id: "b", text: "Random topics daily without tracking" },
            { id: "c", text: "Last-minute cramming only" },
            { id: "d", text: "Avoiding full-length practice" }
          ],
          correctOptionId: "a"
        },
        {
          id: "ib-prep-101-l06-q4",
          text: "What is the best time-management approach during tests?",
          skillId: "ib-prep-101-skill-time",
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
        { id: "ib-prep-101-l06-a1", type: "image", title: "Concept Snapshot", content: "Visual summary for IB: Command Terms and Markscheme Use." },
        { id: "ib-prep-101-l06-a2", type: "animation", title: "Animated Walkthrough", content: "Step-by-step explanation of IB: Command Terms and Markscheme Use." }
      ]
    },
    {
      id: "ib-prep-101-l07",
      title: "IB: Time Management Across Components",
      type: "video",
      duration: 11,
      learningAids: [
        { id: "ib-prep-101-l07-a1", type: "image", title: "Concept Snapshot", content: "Visual summary for IB: Time Management Across Components." },
        { id: "ib-prep-101-l07-a2", type: "animation", title: "Animated Walkthrough", content: "Step-by-step explanation of IB: Time Management Across Components." }
      ]
    },
    {
      id: "ib-prep-101-l08",
      title: "IB: Past Paper Analysis Loop",
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
        { id: "ib-prep-101-l08-a1", type: "image", title: "Concept Snapshot", content: "Visual summary for IB: Past Paper Analysis Loop." },
        { id: "ib-prep-101-l08-a2", type: "animation", title: "Animated Walkthrough", content: "Step-by-step explanation of IB: Past Paper Analysis Loop." }
      ]
    },
    {
      id: "ib-prep-101-l09",
      title: "IB: Exam Session Simulation",
      type: "quiz",
      duration: 12,
      questions: [
        {
          id: "ib-prep-101-l09-q1",
          text: "Which strategy best improves ib: exam session simulation performance?",
          skillId: "ib-prep-101-skill-strategy",
          options: [
            { id: "a", text: "Set a plan, practice, and review errors" },
            { id: "b", text: "Skip difficult items with no review" },
            { id: "c", text: "Memorize without application" },
            { id: "d", text: "Ignore timing constraints" }
          ],
          correctOptionId: "a"
        },
        {
          id: "ib-prep-101-l09-q2",
          text: "What should you do after a timed drill?",
          skillId: "ib-prep-101-skill-review",
          options: [
            { id: "a", text: "Analyze errors and classify root causes" },
            { id: "b", text: "Only record your score" },
            { id: "c", text: "Move on without reflection" },
            { id: "d", text: "Repeat mistakes unchanged" }
          ],
          correctOptionId: "a"
        },
        {
          id: "ib-prep-101-l09-q3",
          text: "Which habit most improves exam consistency?",
          skillId: "ib-prep-101-skill-consistency",
          options: [
            { id: "a", text: "Structured weekly cycles with targeted revision" },
            { id: "b", text: "Random topics daily without tracking" },
            { id: "c", text: "Last-minute cramming only" },
            { id: "d", text: "Avoiding full-length practice" }
          ],
          correctOptionId: "a"
        },
        {
          id: "ib-prep-101-l09-q4",
          text: "What is the best time-management approach during tests?",
          skillId: "ib-prep-101-skill-time",
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
        { id: "ib-prep-101-l09-a1", type: "image", title: "Concept Snapshot", content: "Visual summary for IB: Exam Session Simulation." },
        { id: "ib-prep-101-l09-a2", type: "animation", title: "Animated Walkthrough", content: "Step-by-step explanation of IB: Exam Session Simulation." }
      ]
    },
    {
      id: "ib-prep-101-l10",
      title: "IB: Final IB Sprint and Reflection",
      type: "quiz",
      duration: 12,
      questions: [
        {
          id: "ib-prep-101-l10-q1",
          text: "Which strategy best improves ib: final ib sprint and reflection performance?",
          skillId: "ib-prep-101-skill-strategy",
          options: [
            { id: "a", text: "Set a plan, practice, and review errors" },
            { id: "b", text: "Skip difficult items with no review" },
            { id: "c", text: "Memorize without application" },
            { id: "d", text: "Ignore timing constraints" }
          ],
          correctOptionId: "a"
        },
        {
          id: "ib-prep-101-l10-q2",
          text: "What should you do after a timed drill?",
          skillId: "ib-prep-101-skill-review",
          options: [
            { id: "a", text: "Analyze errors and classify root causes" },
            { id: "b", text: "Only record your score" },
            { id: "c", text: "Move on without reflection" },
            { id: "d", text: "Repeat mistakes unchanged" }
          ],
          correctOptionId: "a"
        },
        {
          id: "ib-prep-101-l10-q3",
          text: "Which habit most improves exam consistency?",
          skillId: "ib-prep-101-skill-consistency",
          options: [
            { id: "a", text: "Structured weekly cycles with targeted revision" },
            { id: "b", text: "Random topics daily without tracking" },
            { id: "c", text: "Last-minute cramming only" },
            { id: "d", text: "Avoiding full-length practice" }
          ],
          correctOptionId: "a"
        },
        {
          id: "ib-prep-101-l10-q4",
          text: "What is the best time-management approach during tests?",
          skillId: "ib-prep-101-skill-time",
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
        { id: "ib-prep-101-l10-a1", type: "image", title: "Concept Snapshot", content: "Visual summary for IB: Final IB Sprint and Reflection." },
        { id: "ib-prep-101-l10-a2", type: "animation", title: "Animated Walkthrough", content: "Step-by-step explanation of IB: Final IB Sprint and Reflection." }
      ]
    }
  ],
};
