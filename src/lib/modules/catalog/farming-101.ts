import type { LearningModule } from "@/lib/modules/types";

export const Farming101Module: LearningModule = {
  id: "farming-101",
  title: "Farming and Food Systems",
  description: "Understand soil, crops, seasons, sustainability, and food production basics.",
  subject: "Farming",
  tags: ["core", "curriculum", "interactive"],
  minAge: 7,
  maxAge: 18,
  moduleVersion: "1.1.0",
  version: "1.1.0",
  learningObjectives: [
    "Understand core concepts in Farming",
    "Apply Sustainable Farming strategies through guided practice",
    "Demonstrate mastery with subject-specific quizzes"
  ],
  lessons: [
    {
      id: "farming-101-l01",
      title: "Soil and Plant Needs",
      type: "video",
      duration: 10,
      learningAids: [
        { id: "farming-101-l01-a1", type: "image", title: "Concept Poster", content: "A colorful infographic about soil health and crop cycles." },
        { id: "farming-101-l01-a2", type: "animation", title: "Warm-up Animation", content: "Short animation introducing Farming vocabulary." }
      ]
    },
    {
      id: "farming-101-l02",
      title: "Crop Cycles and Seasons",
      type: "interactive",
      duration: 12,
      metadata: {
        prompts: [
          "Identify one core idea about soil health from this lesson.",
          "Explain where crop cycles appears in real life.",
          "Describe one question you still have about food systems."
        ]
      },
      learningAids: [
        { id: "farming-101-l02-a1", type: "practice", title: "Try It Board", content: "Complete a guided activity on crop cycles and write one reflection." }
      ]
    },
    {
      id: "farming-101-l03",
      title: "Checkpoint: Farming Basics",
      type: "quiz",
      duration: 10,
      questions: [
        {
          id: "farming-101-l03-q1",
          text: "Which statement best explains soil health in Farming?",
          skillId: "farming-101-skill-core",
          options: [
            { id: "a", text: "It explains soil health using evidence from the lesson." },
            { id: "b", text: "It ignores how soil health works in practice." },
            { id: "c", text: "It focuses on an unrelated topic outside Farming." },
            { id: "d", text: "It repeats terms without showing meaning." }
          ],
          correctOptionId: "a"
        },
        {
          id: "farming-101-l03-q2",
          text: "What is the best first step when analyzing crop cycles?",
          skillId: "farming-101-skill-process",
          options: [
            { id: "a", text: "Define the goal and examine evidence for crop cycles." },
            { id: "b", text: "Guess quickly without checking evidence." },
            { id: "c", text: "Use data unrelated to crop cycles." },
            { id: "d", text: "Skip the context and jump to a conclusion." }
          ],
          correctOptionId: "a"
        },
        {
          id: "farming-101-l03-q3",
          text: "Which option shows strong reasoning about food systems?",
          skillId: "farming-101-skill-reasoning",
          options: [
            { id: "a", text: "Use examples and verify assumptions step by step." },
            { id: "b", text: "Ignore important details and edge cases." },
            { id: "c", text: "Use assumptions unrelated to food systems." },
            { id: "d", text: "Change the topic when evidence gets hard." }
          ],
          correctOptionId: "a"
        },
        {
          id: "farming-101-l03-q4",
          text: "Why is spaced review useful for Farming mastery?",
          skillId: "farming-101-skill-review",
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
        { id: "farming-101-l03-a1", type: "mnemonic", title: "Memory Tip", content: "Use the phrase Plan, Check, Explain for each question." }
      ]
    },
    {
      id: "farming-101-l04",
      title: "Water and Irrigation",
      type: "video",
      duration: 11,
      learningAids: [
        { id: "farming-101-l04-a1", type: "image", title: "Worked Example Sheet", content: "Step-by-step visuals for water use scenarios." }
      ]
    },
    {
      id: "farming-101-l05",
      title: "Pests and Plant Health",
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
        { id: "farming-101-l05-a1", type: "animation", title: "Challenge Walkthrough", content: "Animated sequence for solving a water use challenge." }
      ]
    },
    {
      id: "farming-101-l06",
      title: "Checkpoint: Sustainable Farming",
      type: "quiz",
      duration: 10,
      questions: [
        {
          id: "farming-101-l06-q1",
          text: "Which statement best explains water use in Farming?",
          skillId: "farming-101-skill-core",
          options: [
            { id: "a", text: "It explains water use using evidence from the lesson." },
            { id: "b", text: "It ignores how water use works in practice." },
            { id: "c", text: "It focuses on an unrelated topic outside Farming." },
            { id: "d", text: "It repeats terms without showing meaning." }
          ],
          correctOptionId: "a"
        },
        {
          id: "farming-101-l06-q2",
          text: "What is the best first step when analyzing sustainability?",
          skillId: "farming-101-skill-process",
          options: [
            { id: "a", text: "Define the goal and examine evidence for sustainability." },
            { id: "b", text: "Guess quickly without checking evidence." },
            { id: "c", text: "Use data unrelated to sustainability." },
            { id: "d", text: "Skip the context and jump to a conclusion." }
          ],
          correctOptionId: "a"
        },
        {
          id: "farming-101-l06-q3",
          text: "Which option shows strong reasoning about food systems?",
          skillId: "farming-101-skill-reasoning",
          options: [
            { id: "a", text: "Use examples and verify assumptions step by step." },
            { id: "b", text: "Ignore important details and edge cases." },
            { id: "c", text: "Use assumptions unrelated to food systems." },
            { id: "d", text: "Change the topic when evidence gets hard." }
          ],
          correctOptionId: "a"
        },
        {
          id: "farming-101-l06-q4",
          text: "Why is spaced review useful for Farming mastery?",
          skillId: "farming-101-skill-review",
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
        { id: "farming-101-l06-a1", type: "mnemonic", title: "Memory Tip", content: "Use the phrase Plan, Check, Explain for each question." }
      ]
    },
    {
      id: "farming-101-l07",
      title: "Farm to Market Journey",
      type: "video",
      duration: 12,
      learningAids: [
        { id: "farming-101-l07-a1", type: "practice", title: "Project Planner", content: "Template for planning a mini project focused on sustainability." }
      ]
    },
    {
      id: "farming-101-l08",
      title: "Garden Observation Activity",
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
        { id: "farming-101-l08-a1", type: "mnemonic", title: "Reflection Cycle", content: "Remember Observe, Adjust, Repeat while practicing." }
      ]
    },
    {
      id: "farming-101-l09",
      title: "Review: Agriculture Concepts",
      type: "quiz",
      duration: 10,
      questions: [
        {
          id: "farming-101-l09-q1",
          text: "Which statement best explains crop cycles in Farming?",
          skillId: "farming-101-skill-core",
          options: [
            { id: "a", text: "It explains crop cycles using evidence from the lesson." },
            { id: "b", text: "It ignores how crop cycles works in practice." },
            { id: "c", text: "It focuses on an unrelated topic outside Farming." },
            { id: "d", text: "It repeats terms without showing meaning." }
          ],
          correctOptionId: "a"
        },
        {
          id: "farming-101-l09-q2",
          text: "What is the best first step when analyzing sustainability?",
          skillId: "farming-101-skill-process",
          options: [
            { id: "a", text: "Define the goal and examine evidence for sustainability." },
            { id: "b", text: "Guess quickly without checking evidence." },
            { id: "c", text: "Use data unrelated to sustainability." },
            { id: "d", text: "Skip the context and jump to a conclusion." }
          ],
          correctOptionId: "a"
        },
        {
          id: "farming-101-l09-q3",
          text: "Which option shows strong reasoning about food systems?",
          skillId: "farming-101-skill-reasoning",
          options: [
            { id: "a", text: "Use examples and verify assumptions step by step." },
            { id: "b", text: "Ignore important details and edge cases." },
            { id: "c", text: "Use assumptions unrelated to food systems." },
            { id: "d", text: "Change the topic when evidence gets hard." }
          ],
          correctOptionId: "a"
        },
        {
          id: "farming-101-l09-q4",
          text: "Why is spaced review useful for Farming mastery?",
          skillId: "farming-101-skill-review",
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
        { id: "farming-101-l09-a1", type: "mnemonic", title: "Memory Tip", content: "Use the phrase Plan, Check, Explain for each question." }
      ]
    },
    {
      id: "farming-101-l10",
      title: "Mastery: Farming Systems",
      type: "quiz",
      duration: 10,
      questions: [
        {
          id: "farming-101-l10-q1",
          text: "Which statement best explains soil health in Farming?",
          skillId: "farming-101-skill-core",
          options: [
            { id: "a", text: "It explains soil health using evidence from the lesson." },
            { id: "b", text: "It ignores how soil health works in practice." },
            { id: "c", text: "It focuses on an unrelated topic outside Farming." },
            { id: "d", text: "It repeats terms without showing meaning." }
          ],
          correctOptionId: "a"
        },
        {
          id: "farming-101-l10-q2",
          text: "What is the best first step when analyzing water use?",
          skillId: "farming-101-skill-process",
          options: [
            { id: "a", text: "Define the goal and examine evidence for water use." },
            { id: "b", text: "Guess quickly without checking evidence." },
            { id: "c", text: "Use data unrelated to water use." },
            { id: "d", text: "Skip the context and jump to a conclusion." }
          ],
          correctOptionId: "a"
        },
        {
          id: "farming-101-l10-q3",
          text: "Which option shows strong reasoning about food systems?",
          skillId: "farming-101-skill-reasoning",
          options: [
            { id: "a", text: "Use examples and verify assumptions step by step." },
            { id: "b", text: "Ignore important details and edge cases." },
            { id: "c", text: "Use assumptions unrelated to food systems." },
            { id: "d", text: "Change the topic when evidence gets hard." }
          ],
          correctOptionId: "a"
        },
        {
          id: "farming-101-l10-q4",
          text: "Why is spaced review useful for Farming mastery?",
          skillId: "farming-101-skill-review",
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
        { id: "farming-101-l10-a1", type: "mnemonic", title: "Memory Tip", content: "Use the phrase Plan, Check, Explain for each question." }
      ]
    }
  ],
};
