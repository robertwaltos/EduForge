import type { LearningModule } from "@/lib/modules/types";

export const BasicMath101Module: LearningModule = {
  id: "basic-math-101",
  title: "Basic Math Foundations",
  description: "Learn number sense, counting, addition, subtraction, and early problem solving.",
  subject: "Math",
  tags: ["core", "curriculum", "interactive"],
  minAge: 7,
  maxAge: 18,
  moduleVersion: "1.1.0",
  version: "1.1.0",
  learningObjectives: [
    "Understand core concepts in Math",
    "Apply Problem Solving strategies through guided practice",
    "Demonstrate mastery with subject-specific quizzes"
  ],
  lessons: [
    {
      id: "basic-math-101-l01",
      title: "Place Value and Number Sense",
      type: "video",
      duration: 10,
      learningAids: [
        { id: "basic-math-101-l01-a1", type: "image", title: "Concept Poster", content: "A colorful infographic about place value and addition." },
        { id: "basic-math-101-l01-a2", type: "animation", title: "Warm-up Animation", content: "Short animation introducing Math vocabulary." }
      ]
    },
    {
      id: "basic-math-101-l02",
      title: "Addition Strategies",
      type: "interactive",
      duration: 12,
      metadata: {
        prompts: [
          "Identify one core idea about place value from this lesson.",
          "Explain where addition appears in real life.",
          "Describe one question you still have about numbers and operations."
        ]
      },
      learningAids: [
        { id: "basic-math-101-l02-a1", type: "practice", title: "Try It Board", content: "Complete a guided activity on addition and write one reflection." }
      ]
    },
    {
      id: "basic-math-101-l03",
      title: "Checkpoint: Number Operations",
      type: "quiz",
      duration: 10,
      questions: [
        {
          id: "basic-math-101-l03-q1",
          text: "Which statement best explains place value in Math?",
          skillId: "basic-math-101-skill-core",
          options: [
            { id: "a", text: "It explains place value using evidence from the lesson." },
            { id: "b", text: "It ignores how place value works in practice." },
            { id: "c", text: "It focuses on an unrelated topic outside Math." },
            { id: "d", text: "It repeats terms without showing meaning." }
          ],
          correctOptionId: "a"
        },
        {
          id: "basic-math-101-l03-q2",
          text: "What is the best first step when analyzing addition?",
          skillId: "basic-math-101-skill-process",
          options: [
            { id: "a", text: "Define the goal and examine evidence for addition." },
            { id: "b", text: "Guess quickly without checking evidence." },
            { id: "c", text: "Use data unrelated to addition." },
            { id: "d", text: "Skip the context and jump to a conclusion." }
          ],
          correctOptionId: "a"
        },
        {
          id: "basic-math-101-l03-q3",
          text: "Which option shows strong reasoning about numbers and operations?",
          skillId: "basic-math-101-skill-reasoning",
          options: [
            { id: "a", text: "Use examples and verify assumptions step by step." },
            { id: "b", text: "Ignore important details and edge cases." },
            { id: "c", text: "Use assumptions unrelated to numbers and operations." },
            { id: "d", text: "Change the topic when evidence gets hard." }
          ],
          correctOptionId: "a"
        },
        {
          id: "basic-math-101-l03-q4",
          text: "Why is spaced review useful for Math mastery?",
          skillId: "basic-math-101-skill-review",
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
        { id: "basic-math-101-l03-a1", type: "mnemonic", title: "Memory Tip", content: "Use the phrase Plan, Check, Explain for each question." }
      ]
    },
    {
      id: "basic-math-101-l04",
      title: "Subtraction Strategies",
      type: "video",
      duration: 11,
      learningAids: [
        { id: "basic-math-101-l04-a1", type: "image", title: "Worked Example Sheet", content: "Step-by-step visuals for subtraction scenarios." }
      ]
    },
    {
      id: "basic-math-101-l05",
      title: "Math Word Problem Methods",
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
        { id: "basic-math-101-l05-a1", type: "animation", title: "Challenge Walkthrough", content: "Animated sequence for solving a subtraction challenge." }
      ]
    },
    {
      id: "basic-math-101-l06",
      title: "Checkpoint: Problem Solving",
      type: "quiz",
      duration: 10,
      questions: [
        {
          id: "basic-math-101-l06-q1",
          text: "Which statement best explains subtraction in Math?",
          skillId: "basic-math-101-skill-core",
          options: [
            { id: "a", text: "It explains subtraction using evidence from the lesson." },
            { id: "b", text: "It ignores how subtraction works in practice." },
            { id: "c", text: "It focuses on an unrelated topic outside Math." },
            { id: "d", text: "It repeats terms without showing meaning." }
          ],
          correctOptionId: "a"
        },
        {
          id: "basic-math-101-l06-q2",
          text: "What is the best first step when analyzing word problems?",
          skillId: "basic-math-101-skill-process",
          options: [
            { id: "a", text: "Define the goal and examine evidence for word problems." },
            { id: "b", text: "Guess quickly without checking evidence." },
            { id: "c", text: "Use data unrelated to word problems." },
            { id: "d", text: "Skip the context and jump to a conclusion." }
          ],
          correctOptionId: "a"
        },
        {
          id: "basic-math-101-l06-q3",
          text: "Which option shows strong reasoning about numbers and operations?",
          skillId: "basic-math-101-skill-reasoning",
          options: [
            { id: "a", text: "Use examples and verify assumptions step by step." },
            { id: "b", text: "Ignore important details and edge cases." },
            { id: "c", text: "Use assumptions unrelated to numbers and operations." },
            { id: "d", text: "Change the topic when evidence gets hard." }
          ],
          correctOptionId: "a"
        },
        {
          id: "basic-math-101-l06-q4",
          text: "Why is spaced review useful for Math mastery?",
          skillId: "basic-math-101-skill-review",
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
        { id: "basic-math-101-l06-a1", type: "mnemonic", title: "Memory Tip", content: "Use the phrase Plan, Check, Explain for each question." }
      ]
    },
    {
      id: "basic-math-101-l07",
      title: "Measurement and Estimation",
      type: "video",
      duration: 12,
      learningAids: [
        { id: "basic-math-101-l07-a1", type: "practice", title: "Project Planner", content: "Template for planning a mini project focused on word problems." }
      ]
    },
    {
      id: "basic-math-101-l08",
      title: "Math Journal Reflection",
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
        { id: "basic-math-101-l08-a1", type: "mnemonic", title: "Reflection Cycle", content: "Remember Observe, Adjust, Repeat while practicing." }
      ]
    },
    {
      id: "basic-math-101-l09",
      title: "Review: Core Math Skills",
      type: "quiz",
      duration: 10,
      questions: [
        {
          id: "basic-math-101-l09-q1",
          text: "Which statement best explains addition in Math?",
          skillId: "basic-math-101-skill-core",
          options: [
            { id: "a", text: "It explains addition using evidence from the lesson." },
            { id: "b", text: "It ignores how addition works in practice." },
            { id: "c", text: "It focuses on an unrelated topic outside Math." },
            { id: "d", text: "It repeats terms without showing meaning." }
          ],
          correctOptionId: "a"
        },
        {
          id: "basic-math-101-l09-q2",
          text: "What is the best first step when analyzing word problems?",
          skillId: "basic-math-101-skill-process",
          options: [
            { id: "a", text: "Define the goal and examine evidence for word problems." },
            { id: "b", text: "Guess quickly without checking evidence." },
            { id: "c", text: "Use data unrelated to word problems." },
            { id: "d", text: "Skip the context and jump to a conclusion." }
          ],
          correctOptionId: "a"
        },
        {
          id: "basic-math-101-l09-q3",
          text: "Which option shows strong reasoning about numbers and operations?",
          skillId: "basic-math-101-skill-reasoning",
          options: [
            { id: "a", text: "Use examples and verify assumptions step by step." },
            { id: "b", text: "Ignore important details and edge cases." },
            { id: "c", text: "Use assumptions unrelated to numbers and operations." },
            { id: "d", text: "Change the topic when evidence gets hard." }
          ],
          correctOptionId: "a"
        },
        {
          id: "basic-math-101-l09-q4",
          text: "Why is spaced review useful for Math mastery?",
          skillId: "basic-math-101-skill-review",
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
        { id: "basic-math-101-l09-a1", type: "mnemonic", title: "Memory Tip", content: "Use the phrase Plan, Check, Explain for each question." }
      ]
    },
    {
      id: "basic-math-101-l10",
      title: "Mastery: Basic Math",
      type: "quiz",
      duration: 10,
      questions: [
        {
          id: "basic-math-101-l10-q1",
          text: "Which statement best explains place value in Math?",
          skillId: "basic-math-101-skill-core",
          options: [
            { id: "a", text: "It explains place value using evidence from the lesson." },
            { id: "b", text: "It ignores how place value works in practice." },
            { id: "c", text: "It focuses on an unrelated topic outside Math." },
            { id: "d", text: "It repeats terms without showing meaning." }
          ],
          correctOptionId: "a"
        },
        {
          id: "basic-math-101-l10-q2",
          text: "What is the best first step when analyzing subtraction?",
          skillId: "basic-math-101-skill-process",
          options: [
            { id: "a", text: "Define the goal and examine evidence for subtraction." },
            { id: "b", text: "Guess quickly without checking evidence." },
            { id: "c", text: "Use data unrelated to subtraction." },
            { id: "d", text: "Skip the context and jump to a conclusion." }
          ],
          correctOptionId: "a"
        },
        {
          id: "basic-math-101-l10-q3",
          text: "Which option shows strong reasoning about numbers and operations?",
          skillId: "basic-math-101-skill-reasoning",
          options: [
            { id: "a", text: "Use examples and verify assumptions step by step." },
            { id: "b", text: "Ignore important details and edge cases." },
            { id: "c", text: "Use assumptions unrelated to numbers and operations." },
            { id: "d", text: "Change the topic when evidence gets hard." }
          ],
          correctOptionId: "a"
        },
        {
          id: "basic-math-101-l10-q4",
          text: "Why is spaced review useful for Math mastery?",
          skillId: "basic-math-101-skill-review",
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
        { id: "basic-math-101-l10-a1", type: "mnemonic", title: "Memory Tip", content: "Use the phrase Plan, Check, Explain for each question." }
      ]
    }
  ],
};
