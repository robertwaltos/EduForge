import type { LearningModule } from "@/lib/modules/types";

export const AdvancedMath201Module: LearningModule = {
  id: "advanced-math-201",
  title: "Advanced Math Topics",
  description: "Explore algebraic thinking, functions, probability, and advanced problem solving.",
  subject: "Advanced Math",
  tags: ["core", "curriculum", "interactive"],
  minAge: 7,
  maxAge: 18,
  moduleVersion: "1.1.0",
  version: "1.1.0",
  learningObjectives: [
    "Understand core concepts in Advanced Math",
    "Apply Data Reasoning strategies through guided practice",
    "Demonstrate mastery with subject-specific quizzes"
  ],
  lessons: [
    {
      id: "advanced-math-201-l01",
      title: "Expressions and Equations",
      type: "video",
      duration: 10,
      learningAids: [
        { id: "advanced-math-201-l01-a1", type: "image", title: "Concept Poster", content: "A colorful infographic about expressions and linear functions." },
        { id: "advanced-math-201-l01-a2", type: "animation", title: "Warm-up Animation", content: "Short animation introducing Advanced Math vocabulary." }
      ]
    },
    {
      id: "advanced-math-201-l02",
      title: "Linear Functions and Graphs",
      type: "interactive",
      duration: 12,
      metadata: {
        prompts: [
          "Identify one core idea about expressions from this lesson.",
          "Explain where linear functions appears in real life.",
          "Describe one question you still have about advanced problem solving."
        ]
      },
      learningAids: [
        { id: "advanced-math-201-l02-a1", type: "practice", title: "Try It Board", content: "Complete a guided activity on linear functions and write one reflection." }
      ]
    },
    {
      id: "advanced-math-201-l03",
      title: "Checkpoint: Algebra Skills",
      type: "quiz",
      duration: 10,
      questions: [
        {
          id: "advanced-math-201-l03-q1",
          text: "Which statement best explains expressions in Advanced Math?",
          skillId: "advanced-math-201-skill-core",
          options: [
            { id: "a", text: "It explains expressions using evidence from the lesson." },
            { id: "b", text: "It ignores how expressions works in practice." },
            { id: "c", text: "It focuses on an unrelated topic outside Advanced Math." },
            { id: "d", text: "It repeats terms without showing meaning." }
          ],
          correctOptionId: "a"
        },
        {
          id: "advanced-math-201-l03-q2",
          text: "What is the best first step when analyzing linear functions?",
          skillId: "advanced-math-201-skill-process",
          options: [
            { id: "a", text: "Define the goal and examine evidence for linear functions." },
            { id: "b", text: "Guess quickly without checking evidence." },
            { id: "c", text: "Use data unrelated to linear functions." },
            { id: "d", text: "Skip the context and jump to a conclusion." }
          ],
          correctOptionId: "a"
        },
        {
          id: "advanced-math-201-l03-q3",
          text: "Which option shows strong reasoning about advanced problem solving?",
          skillId: "advanced-math-201-skill-reasoning",
          options: [
            { id: "a", text: "Use examples and verify assumptions step by step." },
            { id: "b", text: "Ignore important details and edge cases." },
            { id: "c", text: "Use assumptions unrelated to advanced problem solving." },
            { id: "d", text: "Change the topic when evidence gets hard." }
          ],
          correctOptionId: "a"
        },
        {
          id: "advanced-math-201-l03-q4",
          text: "Why is spaced review useful for Advanced Math mastery?",
          skillId: "advanced-math-201-skill-review",
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
        { id: "advanced-math-201-l03-a1", type: "mnemonic", title: "Memory Tip", content: "Use the phrase Plan, Check, Explain for each question." }
      ]
    },
    {
      id: "advanced-math-201-l04",
      title: "Systems and Modeling",
      type: "video",
      duration: 11,
      learningAids: [
        { id: "advanced-math-201-l04-a1", type: "image", title: "Worked Example Sheet", content: "Step-by-step visuals for probability scenarios." }
      ]
    },
    {
      id: "advanced-math-201-l05",
      title: "Probability and Statistics",
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
        { id: "advanced-math-201-l05-a1", type: "animation", title: "Challenge Walkthrough", content: "Animated sequence for solving a probability challenge." }
      ]
    },
    {
      id: "advanced-math-201-l06",
      title: "Checkpoint: Data Reasoning",
      type: "quiz",
      duration: 10,
      questions: [
        {
          id: "advanced-math-201-l06-q1",
          text: "Which statement best explains probability in Advanced Math?",
          skillId: "advanced-math-201-skill-core",
          options: [
            { id: "a", text: "It explains probability using evidence from the lesson." },
            { id: "b", text: "It ignores how probability works in practice." },
            { id: "c", text: "It focuses on an unrelated topic outside Advanced Math." },
            { id: "d", text: "It repeats terms without showing meaning." }
          ],
          correctOptionId: "a"
        },
        {
          id: "advanced-math-201-l06-q2",
          text: "What is the best first step when analyzing proof reasoning?",
          skillId: "advanced-math-201-skill-process",
          options: [
            { id: "a", text: "Define the goal and examine evidence for proof reasoning." },
            { id: "b", text: "Guess quickly without checking evidence." },
            { id: "c", text: "Use data unrelated to proof reasoning." },
            { id: "d", text: "Skip the context and jump to a conclusion." }
          ],
          correctOptionId: "a"
        },
        {
          id: "advanced-math-201-l06-q3",
          text: "Which option shows strong reasoning about advanced problem solving?",
          skillId: "advanced-math-201-skill-reasoning",
          options: [
            { id: "a", text: "Use examples and verify assumptions step by step." },
            { id: "b", text: "Ignore important details and edge cases." },
            { id: "c", text: "Use assumptions unrelated to advanced problem solving." },
            { id: "d", text: "Change the topic when evidence gets hard." }
          ],
          correctOptionId: "a"
        },
        {
          id: "advanced-math-201-l06-q4",
          text: "Why is spaced review useful for Advanced Math mastery?",
          skillId: "advanced-math-201-skill-review",
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
        { id: "advanced-math-201-l06-a1", type: "mnemonic", title: "Memory Tip", content: "Use the phrase Plan, Check, Explain for each question." }
      ]
    },
    {
      id: "advanced-math-201-l07",
      title: "Geometric Reasoning",
      type: "video",
      duration: 12,
      learningAids: [
        { id: "advanced-math-201-l07-a1", type: "practice", title: "Project Planner", content: "Template for planning a mini project focused on proof reasoning." }
      ]
    },
    {
      id: "advanced-math-201-l08",
      title: "Proof and Logic Workshop",
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
        { id: "advanced-math-201-l08-a1", type: "mnemonic", title: "Reflection Cycle", content: "Remember Observe, Adjust, Repeat while practicing." }
      ]
    },
    {
      id: "advanced-math-201-l09",
      title: "Review: Advanced Strategies",
      type: "quiz",
      duration: 10,
      questions: [
        {
          id: "advanced-math-201-l09-q1",
          text: "Which statement best explains linear functions in Advanced Math?",
          skillId: "advanced-math-201-skill-core",
          options: [
            { id: "a", text: "It explains linear functions using evidence from the lesson." },
            { id: "b", text: "It ignores how linear functions works in practice." },
            { id: "c", text: "It focuses on an unrelated topic outside Advanced Math." },
            { id: "d", text: "It repeats terms without showing meaning." }
          ],
          correctOptionId: "a"
        },
        {
          id: "advanced-math-201-l09-q2",
          text: "What is the best first step when analyzing proof reasoning?",
          skillId: "advanced-math-201-skill-process",
          options: [
            { id: "a", text: "Define the goal and examine evidence for proof reasoning." },
            { id: "b", text: "Guess quickly without checking evidence." },
            { id: "c", text: "Use data unrelated to proof reasoning." },
            { id: "d", text: "Skip the context and jump to a conclusion." }
          ],
          correctOptionId: "a"
        },
        {
          id: "advanced-math-201-l09-q3",
          text: "Which option shows strong reasoning about advanced problem solving?",
          skillId: "advanced-math-201-skill-reasoning",
          options: [
            { id: "a", text: "Use examples and verify assumptions step by step." },
            { id: "b", text: "Ignore important details and edge cases." },
            { id: "c", text: "Use assumptions unrelated to advanced problem solving." },
            { id: "d", text: "Change the topic when evidence gets hard." }
          ],
          correctOptionId: "a"
        },
        {
          id: "advanced-math-201-l09-q4",
          text: "Why is spaced review useful for Advanced Math mastery?",
          skillId: "advanced-math-201-skill-review",
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
        { id: "advanced-math-201-l09-a1", type: "mnemonic", title: "Memory Tip", content: "Use the phrase Plan, Check, Explain for each question." }
      ]
    },
    {
      id: "advanced-math-201-l10",
      title: "Mastery: Advanced Math",
      type: "quiz",
      duration: 10,
      questions: [
        {
          id: "advanced-math-201-l10-q1",
          text: "Which statement best explains expressions in Advanced Math?",
          skillId: "advanced-math-201-skill-core",
          options: [
            { id: "a", text: "It explains expressions using evidence from the lesson." },
            { id: "b", text: "It ignores how expressions works in practice." },
            { id: "c", text: "It focuses on an unrelated topic outside Advanced Math." },
            { id: "d", text: "It repeats terms without showing meaning." }
          ],
          correctOptionId: "a"
        },
        {
          id: "advanced-math-201-l10-q2",
          text: "What is the best first step when analyzing probability?",
          skillId: "advanced-math-201-skill-process",
          options: [
            { id: "a", text: "Define the goal and examine evidence for probability." },
            { id: "b", text: "Guess quickly without checking evidence." },
            { id: "c", text: "Use data unrelated to probability." },
            { id: "d", text: "Skip the context and jump to a conclusion." }
          ],
          correctOptionId: "a"
        },
        {
          id: "advanced-math-201-l10-q3",
          text: "Which option shows strong reasoning about advanced problem solving?",
          skillId: "advanced-math-201-skill-reasoning",
          options: [
            { id: "a", text: "Use examples and verify assumptions step by step." },
            { id: "b", text: "Ignore important details and edge cases." },
            { id: "c", text: "Use assumptions unrelated to advanced problem solving." },
            { id: "d", text: "Change the topic when evidence gets hard." }
          ],
          correctOptionId: "a"
        },
        {
          id: "advanced-math-201-l10-q4",
          text: "Why is spaced review useful for Advanced Math mastery?",
          skillId: "advanced-math-201-skill-review",
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
        { id: "advanced-math-201-l10-a1", type: "mnemonic", title: "Memory Tip", content: "Use the phrase Plan, Check, Explain for each question." }
      ]
    }
  ],
};
