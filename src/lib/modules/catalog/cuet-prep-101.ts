import type { LearningModule } from "@/lib/modules/types";

export const CuetPrep101Module: LearningModule = {
  id: "cuet-prep-101",
  title: "CUET Prep Foundations",
  description: "Prepare for India's CUET with domain practice, language strategy, and test timing.",
  subject: "Exam Prep",
  tags: ["exam-prep", "assessment", "advanced"],
  minAge: 15,
  maxAge: 21,
  moduleVersion: "1.0.0",
  version: "1.0.0",
  difficultyBand: "advanced",
  localeSupport: ["en", "es", "fr", "de", "ar", "hi", "zh", "ja", "ko", "ru"],
  thumbnail: "/placeholders/lesson-robot.svg",
  learningObjectives: [
    "Build structured CUET readiness workflows",
    "Improve speed and accuracy under timed constraints",
    "Use analytics-based revision loops to close weak areas"
  ],
  lessons: [
    {
      id: "cuet-prep-101-l01",
      title: "CUET: CUET Pattern and University Mapping",
      type: "video",
      duration: 11,
      learningAids: [
        { id: "cuet-prep-101-l01-a1", type: "image", title: "Concept Snapshot", content: "Visual summary for CUET: CUET Pattern and University Mapping." },
        { id: "cuet-prep-101-l01-a2", type: "animation", title: "Animated Walkthrough", content: "Step-by-step explanation of CUET: CUET Pattern and University Mapping." }
      ]
    },
    {
      id: "cuet-prep-101-l02",
      title: "CUET: Language Section Scoring Strategy",
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
        { id: "cuet-prep-101-l02-a1", type: "image", title: "Concept Snapshot", content: "Visual summary for CUET: Language Section Scoring Strategy." },
        { id: "cuet-prep-101-l02-a2", type: "animation", title: "Animated Walkthrough", content: "Step-by-step explanation of CUET: Language Section Scoring Strategy." }
      ]
    },
    {
      id: "cuet-prep-101-l03",
      title: "CUET: Domain Subject Prioritization",
      type: "quiz",
      duration: 12,
      questions: [
        {
          id: "cuet-prep-101-l03-q1",
          text: "Which strategy best improves cuet: domain subject prioritization performance?",
          skillId: "cuet-prep-101-skill-strategy",
          options: [
            { id: "a", text: "Set a plan, practice, and review errors" },
            { id: "b", text: "Skip difficult items with no review" },
            { id: "c", text: "Memorize without application" },
            { id: "d", text: "Ignore timing constraints" }
          ],
          correctOptionId: "a"
        },
        {
          id: "cuet-prep-101-l03-q2",
          text: "What should you do after a timed drill?",
          skillId: "cuet-prep-101-skill-review",
          options: [
            { id: "a", text: "Analyze errors and classify root causes" },
            { id: "b", text: "Only record your score" },
            { id: "c", text: "Move on without reflection" },
            { id: "d", text: "Repeat mistakes unchanged" }
          ],
          correctOptionId: "a"
        },
        {
          id: "cuet-prep-101-l03-q3",
          text: "Which habit most improves exam consistency?",
          skillId: "cuet-prep-101-skill-consistency",
          options: [
            { id: "a", text: "Structured weekly cycles with targeted revision" },
            { id: "b", text: "Random topics daily without tracking" },
            { id: "c", text: "Last-minute cramming only" },
            { id: "d", text: "Avoiding full-length practice" }
          ],
          correctOptionId: "a"
        },
        {
          id: "cuet-prep-101-l03-q4",
          text: "What is the best time-management approach during tests?",
          skillId: "cuet-prep-101-skill-time",
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
        { id: "cuet-prep-101-l03-a1", type: "image", title: "Concept Snapshot", content: "Visual summary for CUET: Domain Subject Prioritization." },
        { id: "cuet-prep-101-l03-a2", type: "animation", title: "Animated Walkthrough", content: "Step-by-step explanation of CUET: Domain Subject Prioritization." }
      ]
    },
    {
      id: "cuet-prep-101-l04",
      title: "CUET: General Test Logical Reasoning",
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
        { id: "cuet-prep-101-l04-a1", type: "image", title: "Concept Snapshot", content: "Visual summary for CUET: General Test Logical Reasoning." },
        { id: "cuet-prep-101-l04-a2", type: "animation", title: "Animated Walkthrough", content: "Step-by-step explanation of CUET: General Test Logical Reasoning." }
      ]
    },
    {
      id: "cuet-prep-101-l05",
      title: "CUET: Quantitative Aptitude Drills",
      type: "video",
      duration: 11,
      learningAids: [
        { id: "cuet-prep-101-l05-a1", type: "image", title: "Concept Snapshot", content: "Visual summary for CUET: Quantitative Aptitude Drills." },
        { id: "cuet-prep-101-l05-a2", type: "animation", title: "Animated Walkthrough", content: "Step-by-step explanation of CUET: Quantitative Aptitude Drills." }
      ]
    },
    {
      id: "cuet-prep-101-l06",
      title: "CUET: Current Affairs and GK Workflow",
      type: "quiz",
      duration: 12,
      questions: [
        {
          id: "cuet-prep-101-l06-q1",
          text: "Which strategy best improves cuet: current affairs and gk workflow performance?",
          skillId: "cuet-prep-101-skill-strategy",
          options: [
            { id: "a", text: "Set a plan, practice, and review errors" },
            { id: "b", text: "Skip difficult items with no review" },
            { id: "c", text: "Memorize without application" },
            { id: "d", text: "Ignore timing constraints" }
          ],
          correctOptionId: "a"
        },
        {
          id: "cuet-prep-101-l06-q2",
          text: "What should you do after a timed drill?",
          skillId: "cuet-prep-101-skill-review",
          options: [
            { id: "a", text: "Analyze errors and classify root causes" },
            { id: "b", text: "Only record your score" },
            { id: "c", text: "Move on without reflection" },
            { id: "d", text: "Repeat mistakes unchanged" }
          ],
          correctOptionId: "a"
        },
        {
          id: "cuet-prep-101-l06-q3",
          text: "Which habit most improves exam consistency?",
          skillId: "cuet-prep-101-skill-consistency",
          options: [
            { id: "a", text: "Structured weekly cycles with targeted revision" },
            { id: "b", text: "Random topics daily without tracking" },
            { id: "c", text: "Last-minute cramming only" },
            { id: "d", text: "Avoiding full-length practice" }
          ],
          correctOptionId: "a"
        },
        {
          id: "cuet-prep-101-l06-q4",
          text: "What is the best time-management approach during tests?",
          skillId: "cuet-prep-101-skill-time",
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
        { id: "cuet-prep-101-l06-a1", type: "image", title: "Concept Snapshot", content: "Visual summary for CUET: Current Affairs and GK Workflow." },
        { id: "cuet-prep-101-l06-a2", type: "animation", title: "Animated Walkthrough", content: "Step-by-step explanation of CUET: Current Affairs and GK Workflow." }
      ]
    },
    {
      id: "cuet-prep-101-l07",
      title: "CUET: Mistake Log and Recovery Plan",
      type: "video",
      duration: 11,
      learningAids: [
        { id: "cuet-prep-101-l07-a1", type: "image", title: "Concept Snapshot", content: "Visual summary for CUET: Mistake Log and Recovery Plan." },
        { id: "cuet-prep-101-l07-a2", type: "animation", title: "Animated Walkthrough", content: "Step-by-step explanation of CUET: Mistake Log and Recovery Plan." }
      ]
    },
    {
      id: "cuet-prep-101-l08",
      title: "CUET: Timed Domain Mix Practice",
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
        { id: "cuet-prep-101-l08-a1", type: "image", title: "Concept Snapshot", content: "Visual summary for CUET: Timed Domain Mix Practice." },
        { id: "cuet-prep-101-l08-a2", type: "animation", title: "Animated Walkthrough", content: "Step-by-step explanation of CUET: Timed Domain Mix Practice." }
      ]
    },
    {
      id: "cuet-prep-101-l09",
      title: "CUET: CUET Mock Review Cycle",
      type: "quiz",
      duration: 12,
      questions: [
        {
          id: "cuet-prep-101-l09-q1",
          text: "Which strategy best improves cuet: cuet mock review cycle performance?",
          skillId: "cuet-prep-101-skill-strategy",
          options: [
            { id: "a", text: "Set a plan, practice, and review errors" },
            { id: "b", text: "Skip difficult items with no review" },
            { id: "c", text: "Memorize without application" },
            { id: "d", text: "Ignore timing constraints" }
          ],
          correctOptionId: "a"
        },
        {
          id: "cuet-prep-101-l09-q2",
          text: "What should you do after a timed drill?",
          skillId: "cuet-prep-101-skill-review",
          options: [
            { id: "a", text: "Analyze errors and classify root causes" },
            { id: "b", text: "Only record your score" },
            { id: "c", text: "Move on without reflection" },
            { id: "d", text: "Repeat mistakes unchanged" }
          ],
          correctOptionId: "a"
        },
        {
          id: "cuet-prep-101-l09-q3",
          text: "Which habit most improves exam consistency?",
          skillId: "cuet-prep-101-skill-consistency",
          options: [
            { id: "a", text: "Structured weekly cycles with targeted revision" },
            { id: "b", text: "Random topics daily without tracking" },
            { id: "c", text: "Last-minute cramming only" },
            { id: "d", text: "Avoiding full-length practice" }
          ],
          correctOptionId: "a"
        },
        {
          id: "cuet-prep-101-l09-q4",
          text: "What is the best time-management approach during tests?",
          skillId: "cuet-prep-101-skill-time",
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
        { id: "cuet-prep-101-l09-a1", type: "image", title: "Concept Snapshot", content: "Visual summary for CUET: CUET Mock Review Cycle." },
        { id: "cuet-prep-101-l09-a2", type: "animation", title: "Animated Walkthrough", content: "Step-by-step explanation of CUET: CUET Mock Review Cycle." }
      ]
    },
    {
      id: "cuet-prep-101-l10",
      title: "CUET: Final Revision and Exam-Day Plan",
      type: "quiz",
      duration: 12,
      questions: [
        {
          id: "cuet-prep-101-l10-q1",
          text: "Which strategy best improves cuet: final revision and exam-day plan performance?",
          skillId: "cuet-prep-101-skill-strategy",
          options: [
            { id: "a", text: "Set a plan, practice, and review errors" },
            { id: "b", text: "Skip difficult items with no review" },
            { id: "c", text: "Memorize without application" },
            { id: "d", text: "Ignore timing constraints" }
          ],
          correctOptionId: "a"
        },
        {
          id: "cuet-prep-101-l10-q2",
          text: "What should you do after a timed drill?",
          skillId: "cuet-prep-101-skill-review",
          options: [
            { id: "a", text: "Analyze errors and classify root causes" },
            { id: "b", text: "Only record your score" },
            { id: "c", text: "Move on without reflection" },
            { id: "d", text: "Repeat mistakes unchanged" }
          ],
          correctOptionId: "a"
        },
        {
          id: "cuet-prep-101-l10-q3",
          text: "Which habit most improves exam consistency?",
          skillId: "cuet-prep-101-skill-consistency",
          options: [
            { id: "a", text: "Structured weekly cycles with targeted revision" },
            { id: "b", text: "Random topics daily without tracking" },
            { id: "c", text: "Last-minute cramming only" },
            { id: "d", text: "Avoiding full-length practice" }
          ],
          correctOptionId: "a"
        },
        {
          id: "cuet-prep-101-l10-q4",
          text: "What is the best time-management approach during tests?",
          skillId: "cuet-prep-101-skill-time",
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
        { id: "cuet-prep-101-l10-a1", type: "image", title: "Concept Snapshot", content: "Visual summary for CUET: Final Revision and Exam-Day Plan." },
        { id: "cuet-prep-101-l10-a2", type: "animation", title: "Animated Walkthrough", content: "Step-by-step explanation of CUET: Final Revision and Exam-Day Plan." }
      ]
    }
  ],
};
