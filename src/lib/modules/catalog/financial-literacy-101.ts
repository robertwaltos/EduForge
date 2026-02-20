import type { LearningModule } from "@/lib/modules/types";

export const FinancialLiteracy101Module: LearningModule = {
  id: "financial-literacy-101",
  title: "Financial Literacy Basics",
  description: "Learn saving, budgeting, earning, spending, and responsible money decisions.",
  subject: "Financial Literacy",
  tags: ["core", "curriculum", "interactive"],
  minAge: 7,
  maxAge: 18,
  moduleVersion: "1.1.0",
  version: "1.1.0",
  learningObjectives: [
    "Understand core concepts in Financial Literacy",
    "Apply Smart Spending strategies through guided practice",
    "Demonstrate mastery with subject-specific quizzes"
  ],
  lessons: [
    {
      id: "financial-literacy-101-l01",
      title: "Needs, Wants, and Choices",
      type: "video",
      duration: 10,
      learningAids: [
        { id: "financial-literacy-101-l01-a1", type: "image", title: "Concept Poster", content: "A colorful infographic about budgeting and saving." },
        { id: "financial-literacy-101-l01-a2", type: "animation", title: "Warm-up Animation", content: "Short animation introducing Financial Literacy vocabulary." }
      ]
    },
    {
      id: "financial-literacy-101-l02",
      title: "Budget Planning Basics",
      type: "interactive",
      duration: 12,
      metadata: {
        prompts: [
          "Identify one core idea about budgeting from this lesson.",
          "Explain where saving appears in real life.",
          "Describe one question you still have about money management."
        ]
      },
      learningAids: [
        { id: "financial-literacy-101-l02-a1", type: "practice", title: "Try It Board", content: "Complete a guided activity on saving and write one reflection." }
      ]
    },
    {
      id: "financial-literacy-101-l03",
      title: "Checkpoint: Budget Skills",
      type: "quiz",
      duration: 10,
      questions: [
        {
          id: "financial-literacy-101-l03-q1",
          text: "Which statement best explains budgeting in Financial Literacy?",
          skillId: "financial-literacy-101-skill-core",
          options: [
            { id: "a", text: "It explains budgeting using evidence from the lesson." },
            { id: "b", text: "It ignores how budgeting works in practice." },
            { id: "c", text: "It focuses on an unrelated topic outside Financial Literacy." },
            { id: "d", text: "It repeats terms without showing meaning." }
          ],
          correctOptionId: "a"
        },
        {
          id: "financial-literacy-101-l03-q2",
          text: "What is the best first step when analyzing saving?",
          skillId: "financial-literacy-101-skill-process",
          options: [
            { id: "a", text: "Define the goal and examine evidence for saving." },
            { id: "b", text: "Guess quickly without checking evidence." },
            { id: "c", text: "Use data unrelated to saving." },
            { id: "d", text: "Skip the context and jump to a conclusion." }
          ],
          correctOptionId: "a"
        },
        {
          id: "financial-literacy-101-l03-q3",
          text: "Which option shows strong reasoning about money management?",
          skillId: "financial-literacy-101-skill-reasoning",
          options: [
            { id: "a", text: "Use examples and verify assumptions step by step." },
            { id: "b", text: "Ignore important details and edge cases." },
            { id: "c", text: "Use assumptions unrelated to money management." },
            { id: "d", text: "Change the topic when evidence gets hard." }
          ],
          correctOptionId: "a"
        },
        {
          id: "financial-literacy-101-l03-q4",
          text: "Why is spaced review useful for Financial Literacy mastery?",
          skillId: "financial-literacy-101-skill-review",
          options: [
            { id: "a", text: "It strengthens memory and transfer over time" },
            { id: "b", text: "It creates confusion" },
            { id: "c", text: "It removes key facts" },
            { id: "d", text: "It has no value" }
          ],
          correctOptionId: "a"
        }
      ],
      learningAids: [
        { id: "financial-literacy-101-l03-a1", type: "mnemonic", title: "Memory Tip", content: "Use the phrase Plan, Check, Explain for each question." }
      ]
    },
    {
      id: "financial-literacy-101-l04",
      title: "Saving and Goals",
      type: "video",
      duration: 11,
      learningAids: [
        { id: "financial-literacy-101-l04-a1", type: "image", title: "Worked Example Sheet", content: "Step-by-step visuals for needs vs wants scenarios." }
      ]
    },
    {
      id: "financial-literacy-101-l05",
      title: "Banking and Interest",
      type: "interactive",
      duration: 13,
      metadata: {
        prompts: [
          "Pick one challenge and outline your approach.",
          "Test your approach and record the result.",
          "Revise your approach and explain the change."
        ]
      },
      learningAids: [
        { id: "financial-literacy-101-l05-a1", type: "animation", title: "Challenge Walkthrough", content: "Animated sequence for solving a needs vs wants challenge." }
      ]
    },
    {
      id: "financial-literacy-101-l06",
      title: "Checkpoint: Smart Spending",
      type: "quiz",
      duration: 10,
      questions: [
        {
          id: "financial-literacy-101-l06-q1",
          text: "Which statement best explains needs vs wants in Financial Literacy?",
          skillId: "financial-literacy-101-skill-core",
          options: [
            { id: "a", text: "It explains needs vs wants using evidence from the lesson." },
            { id: "b", text: "It ignores how needs vs wants works in practice." },
            { id: "c", text: "It focuses on an unrelated topic outside Financial Literacy." },
            { id: "d", text: "It repeats terms without showing meaning." }
          ],
          correctOptionId: "a"
        },
        {
          id: "financial-literacy-101-l06-q2",
          text: "What is the best first step when analyzing interest?",
          skillId: "financial-literacy-101-skill-process",
          options: [
            { id: "a", text: "Define the goal and examine evidence for interest." },
            { id: "b", text: "Guess quickly without checking evidence." },
            { id: "c", text: "Use data unrelated to interest." },
            { id: "d", text: "Skip the context and jump to a conclusion." }
          ],
          correctOptionId: "a"
        },
        {
          id: "financial-literacy-101-l06-q3",
          text: "Which option shows strong reasoning about money management?",
          skillId: "financial-literacy-101-skill-reasoning",
          options: [
            { id: "a", text: "Use examples and verify assumptions step by step." },
            { id: "b", text: "Ignore important details and edge cases." },
            { id: "c", text: "Use assumptions unrelated to money management." },
            { id: "d", text: "Change the topic when evidence gets hard." }
          ],
          correctOptionId: "a"
        },
        {
          id: "financial-literacy-101-l06-q4",
          text: "Why is spaced review useful for Financial Literacy mastery?",
          skillId: "financial-literacy-101-skill-review",
          options: [
            { id: "a", text: "It strengthens memory and transfer over time" },
            { id: "b", text: "It creates confusion" },
            { id: "c", text: "It removes key facts" },
            { id: "d", text: "It has no value" }
          ],
          correctOptionId: "a"
        }
      ],
      learningAids: [
        { id: "financial-literacy-101-l06-a1", type: "mnemonic", title: "Memory Tip", content: "Use the phrase Plan, Check, Explain for each question." }
      ]
    },
    {
      id: "financial-literacy-101-l07",
      title: "Income and Work",
      type: "video",
      duration: 12,
      learningAids: [
        { id: "financial-literacy-101-l07-a1", type: "practice", title: "Project Planner", content: "Template for planning a mini project focused on interest." }
      ]
    },
    {
      id: "financial-literacy-101-l08",
      title: "Money Reflection Activity",
      type: "interactive",
      duration: 10,
      metadata: {
        prompts: [
          "What did you learn most clearly?",
          "Where did you struggle and why?",
          "What is your next improvement target?"
        ]
      },
      learningAids: [
        { id: "financial-literacy-101-l08-a1", type: "mnemonic", title: "Reflection Cycle", content: "Remember Observe, Adjust, Repeat while practicing." }
      ]
    },
    {
      id: "financial-literacy-101-l09",
      title: "Review: Finance Habits",
      type: "quiz",
      duration: 10,
      questions: [
        {
          id: "financial-literacy-101-l09-q1",
          text: "Which statement best explains saving in Financial Literacy?",
          skillId: "financial-literacy-101-skill-core",
          options: [
            { id: "a", text: "It explains saving using evidence from the lesson." },
            { id: "b", text: "It ignores how saving works in practice." },
            { id: "c", text: "It focuses on an unrelated topic outside Financial Literacy." },
            { id: "d", text: "It repeats terms without showing meaning." }
          ],
          correctOptionId: "a"
        },
        {
          id: "financial-literacy-101-l09-q2",
          text: "What is the best first step when analyzing interest?",
          skillId: "financial-literacy-101-skill-process",
          options: [
            { id: "a", text: "Define the goal and examine evidence for interest." },
            { id: "b", text: "Guess quickly without checking evidence." },
            { id: "c", text: "Use data unrelated to interest." },
            { id: "d", text: "Skip the context and jump to a conclusion." }
          ],
          correctOptionId: "a"
        },
        {
          id: "financial-literacy-101-l09-q3",
          text: "Which option shows strong reasoning about money management?",
          skillId: "financial-literacy-101-skill-reasoning",
          options: [
            { id: "a", text: "Use examples and verify assumptions step by step." },
            { id: "b", text: "Ignore important details and edge cases." },
            { id: "c", text: "Use assumptions unrelated to money management." },
            { id: "d", text: "Change the topic when evidence gets hard." }
          ],
          correctOptionId: "a"
        },
        {
          id: "financial-literacy-101-l09-q4",
          text: "Why is spaced review useful for Financial Literacy mastery?",
          skillId: "financial-literacy-101-skill-review",
          options: [
            { id: "a", text: "It strengthens memory and transfer over time" },
            { id: "b", text: "It creates confusion" },
            { id: "c", text: "It removes key facts" },
            { id: "d", text: "It has no value" }
          ],
          correctOptionId: "a"
        }
      ],
      learningAids: [
        { id: "financial-literacy-101-l09-a1", type: "mnemonic", title: "Memory Tip", content: "Use the phrase Plan, Check, Explain for each question." }
      ]
    },
    {
      id: "financial-literacy-101-l10",
      title: "Mastery: Financial Literacy",
      type: "quiz",
      duration: 10,
      questions: [
        {
          id: "financial-literacy-101-l10-q1",
          text: "Which statement best explains budgeting in Financial Literacy?",
          skillId: "financial-literacy-101-skill-core",
          options: [
            { id: "a", text: "It explains budgeting using evidence from the lesson." },
            { id: "b", text: "It ignores how budgeting works in practice." },
            { id: "c", text: "It focuses on an unrelated topic outside Financial Literacy." },
            { id: "d", text: "It repeats terms without showing meaning." }
          ],
          correctOptionId: "a"
        },
        {
          id: "financial-literacy-101-l10-q2",
          text: "What is the best first step when analyzing needs vs wants?",
          skillId: "financial-literacy-101-skill-process",
          options: [
            { id: "a", text: "Define the goal and examine evidence for needs vs wants." },
            { id: "b", text: "Guess quickly without checking evidence." },
            { id: "c", text: "Use data unrelated to needs vs wants." },
            { id: "d", text: "Skip the context and jump to a conclusion." }
          ],
          correctOptionId: "a"
        },
        {
          id: "financial-literacy-101-l10-q3",
          text: "Which option shows strong reasoning about money management?",
          skillId: "financial-literacy-101-skill-reasoning",
          options: [
            { id: "a", text: "Use examples and verify assumptions step by step." },
            { id: "b", text: "Ignore important details and edge cases." },
            { id: "c", text: "Use assumptions unrelated to money management." },
            { id: "d", text: "Change the topic when evidence gets hard." }
          ],
          correctOptionId: "a"
        },
        {
          id: "financial-literacy-101-l10-q4",
          text: "Why is spaced review useful for Financial Literacy mastery?",
          skillId: "financial-literacy-101-skill-review",
          options: [
            { id: "a", text: "It strengthens memory and transfer over time" },
            { id: "b", text: "It creates confusion" },
            { id: "c", text: "It removes key facts" },
            { id: "d", text: "It has no value" }
          ],
          correctOptionId: "a"
        }
      ],
      learningAids: [
        { id: "financial-literacy-101-l10-a1", type: "mnemonic", title: "Memory Tip", content: "Use the phrase Plan, Check, Explain for each question." }
      ]
    }
  ],
};
