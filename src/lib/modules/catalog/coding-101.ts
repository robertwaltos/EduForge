import type { LearningModule } from "@/lib/modules/types";

export const Coding101Module: LearningModule = {
  id: "coding-101",
  title: "Coding Foundations",
  description: "Start programming logic, sequencing, debugging, and computational thinking.",
  subject: "Coding",
  tags: ["core", "curriculum", "interactive"],
  minAge: 7,
  maxAge: 18,
  moduleVersion: "1.1.0",
  version: "1.1.0",
  learningObjectives: [
    "Understand core concepts in Coding",
    "Apply Program Flow strategies through guided practice",
    "Demonstrate mastery with subject-specific quizzes"
  ],
  lessons: [
    {
      id: "coding-101-l01",
      title: "Algorithms and Sequence",
      type: "video",
      duration: 10,
      learningAids: [
        { id: "coding-101-l01-a1", type: "image", title: "Concept Poster", content: "A colorful infographic about sequence and conditionals." },
        { id: "coding-101-l01-a2", type: "animation", title: "Warm-up Animation", content: "Short animation introducing Coding vocabulary." }
      ]
    },
    {
      id: "coding-101-l02",
      title: "Conditionals and Decisions",
      type: "interactive",
      duration: 12,
      metadata: {
        prompts: [
          "Identify one core idea about sequence from this lesson.",
          "Explain where conditionals appears in real life.",
          "Describe one question you still have about coding logic."
        ]
      },
      learningAids: [
        { id: "coding-101-l02-a1", type: "practice", title: "Try It Board", content: "Complete a guided activity on conditionals and write one reflection." }
      ]
    },
    {
      id: "coding-101-l03",
      title: "Checkpoint: Logic Basics",
      type: "quiz",
      duration: 10,
      questions: [
        {
          id: "coding-101-l03-q1",
          text: "Which statement best explains sequence in Coding?",
          skillId: "coding-101-skill-core",
          options: [
            { id: "a", text: "It explains sequence using evidence from the lesson." },
            { id: "b", text: "It ignores how sequence works in practice." },
            { id: "c", text: "It focuses on an unrelated topic outside Coding." },
            { id: "d", text: "It repeats terms without showing meaning." }
          ],
          correctOptionId: "a"
        },
        {
          id: "coding-101-l03-q2",
          text: "What is the best first step when analyzing conditionals?",
          skillId: "coding-101-skill-process",
          options: [
            { id: "a", text: "Define the goal and examine evidence for conditionals." },
            { id: "b", text: "Guess quickly without checking evidence." },
            { id: "c", text: "Use data unrelated to conditionals." },
            { id: "d", text: "Skip the context and jump to a conclusion." }
          ],
          correctOptionId: "a"
        },
        {
          id: "coding-101-l03-q3",
          text: "Which option shows strong reasoning about coding logic?",
          skillId: "coding-101-skill-reasoning",
          options: [
            { id: "a", text: "Use examples and verify assumptions step by step." },
            { id: "b", text: "Ignore important details and edge cases." },
            { id: "c", text: "Use assumptions unrelated to coding logic." },
            { id: "d", text: "Change the topic when evidence gets hard." }
          ],
          correctOptionId: "a"
        },
        {
          id: "coding-101-l03-q4",
          text: "Why is spaced review useful for Coding mastery?",
          skillId: "coding-101-skill-review",
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
        { id: "coding-101-l03-a1", type: "mnemonic", title: "Memory Tip", content: "Use the phrase Plan, Check, Explain for each question." }
      ]
    },
    {
      id: "coding-101-l04",
      title: "Loops and Repetition",
      type: "video",
      duration: 11,
      learningAids: [
        { id: "coding-101-l04-a1", type: "image", title: "Worked Example Sheet", content: "Step-by-step visuals for loops scenarios." }
      ]
    },
    {
      id: "coding-101-l05",
      title: "Functions and Reuse",
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
        { id: "coding-101-l05-a1", type: "animation", title: "Challenge Walkthrough", content: "Animated sequence for solving a loops challenge." }
      ]
    },
    {
      id: "coding-101-l06",
      title: "Checkpoint: Program Flow",
      type: "quiz",
      duration: 10,
      questions: [
        {
          id: "coding-101-l06-q1",
          text: "Which statement best explains loops in Coding?",
          skillId: "coding-101-skill-core",
          options: [
            { id: "a", text: "It explains loops using evidence from the lesson." },
            { id: "b", text: "It ignores how loops works in practice." },
            { id: "c", text: "It focuses on an unrelated topic outside Coding." },
            { id: "d", text: "It repeats terms without showing meaning." }
          ],
          correctOptionId: "a"
        },
        {
          id: "coding-101-l06-q2",
          text: "What is the best first step when analyzing debugging?",
          skillId: "coding-101-skill-process",
          options: [
            { id: "a", text: "Define the goal and examine evidence for debugging." },
            { id: "b", text: "Guess quickly without checking evidence." },
            { id: "c", text: "Use data unrelated to debugging." },
            { id: "d", text: "Skip the context and jump to a conclusion." }
          ],
          correctOptionId: "a"
        },
        {
          id: "coding-101-l06-q3",
          text: "Which option shows strong reasoning about coding logic?",
          skillId: "coding-101-skill-reasoning",
          options: [
            { id: "a", text: "Use examples and verify assumptions step by step." },
            { id: "b", text: "Ignore important details and edge cases." },
            { id: "c", text: "Use assumptions unrelated to coding logic." },
            { id: "d", text: "Change the topic when evidence gets hard." }
          ],
          correctOptionId: "a"
        },
        {
          id: "coding-101-l06-q4",
          text: "Why is spaced review useful for Coding mastery?",
          skillId: "coding-101-skill-review",
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
        { id: "coding-101-l06-a1", type: "mnemonic", title: "Memory Tip", content: "Use the phrase Plan, Check, Explain for each question." }
      ]
    },
    {
      id: "coding-101-l07",
      title: "Debugging Strategies",
      type: "video",
      duration: 12,
      learningAids: [
        { id: "coding-101-l07-a1", type: "practice", title: "Project Planner", content: "Template for planning a mini project focused on debugging." }
      ]
    },
    {
      id: "coding-101-l08",
      title: "Mini App Activity",
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
        { id: "coding-101-l08-a1", type: "mnemonic", title: "Reflection Cycle", content: "Remember Observe, Adjust, Repeat while practicing." }
      ]
    },
    {
      id: "coding-101-l09",
      title: "Review: Coding Concepts",
      type: "quiz",
      duration: 10,
      questions: [
        {
          id: "coding-101-l09-q1",
          text: "Which statement best explains conditionals in Coding?",
          skillId: "coding-101-skill-core",
          options: [
            { id: "a", text: "It explains conditionals using evidence from the lesson." },
            { id: "b", text: "It ignores how conditionals works in practice." },
            { id: "c", text: "It focuses on an unrelated topic outside Coding." },
            { id: "d", text: "It repeats terms without showing meaning." }
          ],
          correctOptionId: "a"
        },
        {
          id: "coding-101-l09-q2",
          text: "What is the best first step when analyzing debugging?",
          skillId: "coding-101-skill-process",
          options: [
            { id: "a", text: "Define the goal and examine evidence for debugging." },
            { id: "b", text: "Guess quickly without checking evidence." },
            { id: "c", text: "Use data unrelated to debugging." },
            { id: "d", text: "Skip the context and jump to a conclusion." }
          ],
          correctOptionId: "a"
        },
        {
          id: "coding-101-l09-q3",
          text: "Which option shows strong reasoning about coding logic?",
          skillId: "coding-101-skill-reasoning",
          options: [
            { id: "a", text: "Use examples and verify assumptions step by step." },
            { id: "b", text: "Ignore important details and edge cases." },
            { id: "c", text: "Use assumptions unrelated to coding logic." },
            { id: "d", text: "Change the topic when evidence gets hard." }
          ],
          correctOptionId: "a"
        },
        {
          id: "coding-101-l09-q4",
          text: "Why is spaced review useful for Coding mastery?",
          skillId: "coding-101-skill-review",
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
        { id: "coding-101-l09-a1", type: "mnemonic", title: "Memory Tip", content: "Use the phrase Plan, Check, Explain for each question." }
      ]
    },
    {
      id: "coding-101-l10",
      title: "Mastery: Coding",
      type: "quiz",
      duration: 10,
      questions: [
        {
          id: "coding-101-l10-q1",
          text: "Which statement best explains sequence in Coding?",
          skillId: "coding-101-skill-core",
          options: [
            { id: "a", text: "It explains sequence using evidence from the lesson." },
            { id: "b", text: "It ignores how sequence works in practice." },
            { id: "c", text: "It focuses on an unrelated topic outside Coding." },
            { id: "d", text: "It repeats terms without showing meaning." }
          ],
          correctOptionId: "a"
        },
        {
          id: "coding-101-l10-q2",
          text: "What is the best first step when analyzing loops?",
          skillId: "coding-101-skill-process",
          options: [
            { id: "a", text: "Define the goal and examine evidence for loops." },
            { id: "b", text: "Guess quickly without checking evidence." },
            { id: "c", text: "Use data unrelated to loops." },
            { id: "d", text: "Skip the context and jump to a conclusion." }
          ],
          correctOptionId: "a"
        },
        {
          id: "coding-101-l10-q3",
          text: "Which option shows strong reasoning about coding logic?",
          skillId: "coding-101-skill-reasoning",
          options: [
            { id: "a", text: "Use examples and verify assumptions step by step." },
            { id: "b", text: "Ignore important details and edge cases." },
            { id: "c", text: "Use assumptions unrelated to coding logic." },
            { id: "d", text: "Change the topic when evidence gets hard." }
          ],
          correctOptionId: "a"
        },
        {
          id: "coding-101-l10-q4",
          text: "Why is spaced review useful for Coding mastery?",
          skillId: "coding-101-skill-review",
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
        { id: "coding-101-l10-a1", type: "mnemonic", title: "Memory Tip", content: "Use the phrase Plan, Check, Explain for each question." }
      ]
    }
  ],
};
