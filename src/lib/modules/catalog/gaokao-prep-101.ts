import type { LearningModule } from "@/lib/modules/types";

export const GaokaoPrep101Module: LearningModule = {
  id: "gaokao-prep-101",
  title: "Gaokao Prep Foundations",
  description: "Prepare for Gaokao with disciplined study cycles and exam-specific strategy.",
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
    "Build structured Gaokao readiness workflows",
    "Improve speed and accuracy under timed constraints",
    "Use analytics-based revision loops to close weak areas"
  ],
  lessons: [
    {
      id: "gaokao-prep-101-l01",
      title: "Gaokao: Gaokao Structure and Planning",
      type: "video",
      duration: 11,
      learningAids: [
        { id: "gaokao-prep-101-l01-a1", type: "image", title: "Concept Snapshot", content: "Visual summary for Gaokao: Gaokao Structure and Planning." },
        { id: "gaokao-prep-101-l01-a2", type: "animation", title: "Animated Walkthrough", content: "Step-by-step explanation of Gaokao: Gaokao Structure and Planning." }
      ]
    },
    {
      id: "gaokao-prep-101-l02",
      title: "Gaokao: Chinese Language Performance",
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
        { id: "gaokao-prep-101-l02-a1", type: "image", title: "Concept Snapshot", content: "Visual summary for Gaokao: Chinese Language Performance." },
        { id: "gaokao-prep-101-l02-a2", type: "animation", title: "Animated Walkthrough", content: "Step-by-step explanation of Gaokao: Chinese Language Performance." }
      ]
    },
    {
      id: "gaokao-prep-101-l03",
      title: "Gaokao: Mathematics Intensive Strategy",
      type: "quiz",
      duration: 12,
      questions: [
        {
          id: "gaokao-prep-101-l03-q1",
          text: "Which strategy best improves gaokao: mathematics intensive strategy performance?",
          skillId: "gaokao-prep-101-skill-strategy",
          options: [
            { id: "a", text: "Set a plan, practice, and review errors" },
            { id: "b", text: "Skip difficult items with no review" },
            { id: "c", text: "Memorize without application" },
            { id: "d", text: "Ignore timing constraints" }
          ],
          correctOptionId: "a"
        },
        {
          id: "gaokao-prep-101-l03-q2",
          text: "What should you do after a timed drill?",
          skillId: "gaokao-prep-101-skill-review",
          options: [
            { id: "a", text: "Analyze errors and classify root causes" },
            { id: "b", text: "Only record your score" },
            { id: "c", text: "Move on without reflection" },
            { id: "d", text: "Repeat mistakes unchanged" }
          ],
          correctOptionId: "a"
        },
        {
          id: "gaokao-prep-101-l03-q3",
          text: "Which habit most improves exam consistency?",
          skillId: "gaokao-prep-101-skill-consistency",
          options: [
            { id: "a", text: "Structured weekly cycles with targeted revision" },
            { id: "b", text: "Random topics daily without tracking" },
            { id: "c", text: "Last-minute cramming only" },
            { id: "d", text: "Avoiding full-length practice" }
          ],
          correctOptionId: "a"
        },
        {
          id: "gaokao-prep-101-l03-q4",
          text: "What is the best time-management approach during tests?",
          skillId: "gaokao-prep-101-skill-time",
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
        { id: "gaokao-prep-101-l03-a1", type: "image", title: "Concept Snapshot", content: "Visual summary for Gaokao: Mathematics Intensive Strategy." },
        { id: "gaokao-prep-101-l03-a2", type: "animation", title: "Animated Walkthrough", content: "Step-by-step explanation of Gaokao: Mathematics Intensive Strategy." }
      ]
    },
    {
      id: "gaokao-prep-101-l04",
      title: "Gaokao: English Exam Techniques",
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
        { id: "gaokao-prep-101-l04-a1", type: "image", title: "Concept Snapshot", content: "Visual summary for Gaokao: English Exam Techniques." },
        { id: "gaokao-prep-101-l04-a2", type: "animation", title: "Animated Walkthrough", content: "Step-by-step explanation of Gaokao: English Exam Techniques." }
      ]
    },
    {
      id: "gaokao-prep-101-l05",
      title: "Gaokao: Elective Subject Mastery",
      type: "video",
      duration: 11,
      learningAids: [
        { id: "gaokao-prep-101-l05-a1", type: "image", title: "Concept Snapshot", content: "Visual summary for Gaokao: Elective Subject Mastery." },
        { id: "gaokao-prep-101-l05-a2", type: "animation", title: "Animated Walkthrough", content: "Step-by-step explanation of Gaokao: Elective Subject Mastery." }
      ]
    },
    {
      id: "gaokao-prep-101-l06",
      title: "Gaokao: Speed and Accuracy Training",
      type: "quiz",
      duration: 12,
      questions: [
        {
          id: "gaokao-prep-101-l06-q1",
          text: "Which strategy best improves gaokao: speed and accuracy training performance?",
          skillId: "gaokao-prep-101-skill-strategy",
          options: [
            { id: "a", text: "Set a plan, practice, and review errors" },
            { id: "b", text: "Skip difficult items with no review" },
            { id: "c", text: "Memorize without application" },
            { id: "d", text: "Ignore timing constraints" }
          ],
          correctOptionId: "a"
        },
        {
          id: "gaokao-prep-101-l06-q2",
          text: "What should you do after a timed drill?",
          skillId: "gaokao-prep-101-skill-review",
          options: [
            { id: "a", text: "Analyze errors and classify root causes" },
            { id: "b", text: "Only record your score" },
            { id: "c", text: "Move on without reflection" },
            { id: "d", text: "Repeat mistakes unchanged" }
          ],
          correctOptionId: "a"
        },
        {
          id: "gaokao-prep-101-l06-q3",
          text: "Which habit most improves exam consistency?",
          skillId: "gaokao-prep-101-skill-consistency",
          options: [
            { id: "a", text: "Structured weekly cycles with targeted revision" },
            { id: "b", text: "Random topics daily without tracking" },
            { id: "c", text: "Last-minute cramming only" },
            { id: "d", text: "Avoiding full-length practice" }
          ],
          correctOptionId: "a"
        },
        {
          id: "gaokao-prep-101-l06-q4",
          text: "What is the best time-management approach during tests?",
          skillId: "gaokao-prep-101-skill-time",
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
        { id: "gaokao-prep-101-l06-a1", type: "image", title: "Concept Snapshot", content: "Visual summary for Gaokao: Speed and Accuracy Training." },
        { id: "gaokao-prep-101-l06-a2", type: "animation", title: "Animated Walkthrough", content: "Step-by-step explanation of Gaokao: Speed and Accuracy Training." }
      ]
    },
    {
      id: "gaokao-prep-101-l07",
      title: "Gaokao: Error Notebook Method",
      type: "video",
      duration: 11,
      learningAids: [
        { id: "gaokao-prep-101-l07-a1", type: "image", title: "Concept Snapshot", content: "Visual summary for Gaokao: Error Notebook Method." },
        { id: "gaokao-prep-101-l07-a2", type: "animation", title: "Animated Walkthrough", content: "Step-by-step explanation of Gaokao: Error Notebook Method." }
      ]
    },
    {
      id: "gaokao-prep-101-l08",
      title: "Gaokao: Past Paper Sequencing",
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
        { id: "gaokao-prep-101-l08-a1", type: "image", title: "Concept Snapshot", content: "Visual summary for Gaokao: Past Paper Sequencing." },
        { id: "gaokao-prep-101-l08-a2", type: "animation", title: "Animated Walkthrough", content: "Step-by-step explanation of Gaokao: Past Paper Sequencing." }
      ]
    },
    {
      id: "gaokao-prep-101-l09",
      title: "Gaokao: Performance Week Simulation",
      type: "quiz",
      duration: 12,
      questions: [
        {
          id: "gaokao-prep-101-l09-q1",
          text: "Which strategy best improves gaokao: performance week simulation performance?",
          skillId: "gaokao-prep-101-skill-strategy",
          options: [
            { id: "a", text: "Set a plan, practice, and review errors" },
            { id: "b", text: "Skip difficult items with no review" },
            { id: "c", text: "Memorize without application" },
            { id: "d", text: "Ignore timing constraints" }
          ],
          correctOptionId: "a"
        },
        {
          id: "gaokao-prep-101-l09-q2",
          text: "What should you do after a timed drill?",
          skillId: "gaokao-prep-101-skill-review",
          options: [
            { id: "a", text: "Analyze errors and classify root causes" },
            { id: "b", text: "Only record your score" },
            { id: "c", text: "Move on without reflection" },
            { id: "d", text: "Repeat mistakes unchanged" }
          ],
          correctOptionId: "a"
        },
        {
          id: "gaokao-prep-101-l09-q3",
          text: "Which habit most improves exam consistency?",
          skillId: "gaokao-prep-101-skill-consistency",
          options: [
            { id: "a", text: "Structured weekly cycles with targeted revision" },
            { id: "b", text: "Random topics daily without tracking" },
            { id: "c", text: "Last-minute cramming only" },
            { id: "d", text: "Avoiding full-length practice" }
          ],
          correctOptionId: "a"
        },
        {
          id: "gaokao-prep-101-l09-q4",
          text: "What is the best time-management approach during tests?",
          skillId: "gaokao-prep-101-skill-time",
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
        { id: "gaokao-prep-101-l09-a1", type: "image", title: "Concept Snapshot", content: "Visual summary for Gaokao: Performance Week Simulation." },
        { id: "gaokao-prep-101-l09-a2", type: "animation", title: "Animated Walkthrough", content: "Step-by-step explanation of Gaokao: Performance Week Simulation." }
      ]
    },
    {
      id: "gaokao-prep-101-l10",
      title: "Gaokao: Final Sprint and Recovery Plan",
      type: "quiz",
      duration: 12,
      questions: [
        {
          id: "gaokao-prep-101-l10-q1",
          text: "Which strategy best improves gaokao: final sprint and recovery plan performance?",
          skillId: "gaokao-prep-101-skill-strategy",
          options: [
            { id: "a", text: "Set a plan, practice, and review errors" },
            { id: "b", text: "Skip difficult items with no review" },
            { id: "c", text: "Memorize without application" },
            { id: "d", text: "Ignore timing constraints" }
          ],
          correctOptionId: "a"
        },
        {
          id: "gaokao-prep-101-l10-q2",
          text: "What should you do after a timed drill?",
          skillId: "gaokao-prep-101-skill-review",
          options: [
            { id: "a", text: "Analyze errors and classify root causes" },
            { id: "b", text: "Only record your score" },
            { id: "c", text: "Move on without reflection" },
            { id: "d", text: "Repeat mistakes unchanged" }
          ],
          correctOptionId: "a"
        },
        {
          id: "gaokao-prep-101-l10-q3",
          text: "Which habit most improves exam consistency?",
          skillId: "gaokao-prep-101-skill-consistency",
          options: [
            { id: "a", text: "Structured weekly cycles with targeted revision" },
            { id: "b", text: "Random topics daily without tracking" },
            { id: "c", text: "Last-minute cramming only" },
            { id: "d", text: "Avoiding full-length practice" }
          ],
          correctOptionId: "a"
        },
        {
          id: "gaokao-prep-101-l10-q4",
          text: "What is the best time-management approach during tests?",
          skillId: "gaokao-prep-101-skill-time",
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
        { id: "gaokao-prep-101-l10-a1", type: "image", title: "Concept Snapshot", content: "Visual summary for Gaokao: Final Sprint and Recovery Plan." },
        { id: "gaokao-prep-101-l10-a2", type: "animation", title: "Animated Walkthrough", content: "Step-by-step explanation of Gaokao: Final Sprint and Recovery Plan." }
      ]
    }
  ],
};
