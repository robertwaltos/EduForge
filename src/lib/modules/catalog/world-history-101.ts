import type { LearningModule } from "@/lib/modules/types";

export const WorldHistory101Module: LearningModule = {
  id: "world-history-101",
  title: "World History Journey",
  description: "Survey major civilizations, turning points, and global historical connections.",
  subject: "History Worldwide",
  tags: ["core", "curriculum", "interactive"],
  minAge: 7,
  maxAge: 18,
  moduleVersion: "1.1.0",
  version: "1.1.0",
  learningObjectives: [
    "Understand core concepts in History Worldwide",
    "Apply Turning Points strategies through guided practice",
    "Demonstrate mastery with subject-specific quizzes"
  ],
  lessons: [
    {
      id: "world-history-101-l01",
      title: "Ancient Civilizations",
      type: "video",
      duration: 10,
      learningAids: [
        { id: "world-history-101-l01-a1", type: "image", title: "Concept Poster", content: "A colorful infographic about civilizations and timeline." },
        { id: "world-history-101-l01-a2", type: "animation", title: "Warm-up Animation", content: "Short animation introducing History Worldwide vocabulary." }
      ]
    },
    {
      id: "world-history-101-l02",
      title: "Classical Era Connections",
      type: "interactive",
      duration: 12,
      metadata: {
        prompts: [
          "Identify one core idea about civilizations from this lesson.",
          "Explain where timeline appears in real life.",
          "Describe one question you still have about historical thinking."
        ]
      },
      learningAids: [
        { id: "world-history-101-l02-a1", type: "practice", title: "Try It Board", content: "Complete a guided activity on timeline and write one reflection." }
      ]
    },
    {
      id: "world-history-101-l03",
      title: "Checkpoint: Early History",
      type: "quiz",
      duration: 10,
      questions: [
        {
          id: "world-history-101-l03-q1",
          text: "Which statement best explains civilizations in History Worldwide?",
          skillId: "world-history-101-skill-core",
          options: [
            { id: "a", text: "It explains civilizations using evidence from the lesson." },
            { id: "b", text: "It ignores how civilizations works in practice." },
            { id: "c", text: "It focuses on an unrelated topic outside History Worldwide." },
            { id: "d", text: "It repeats terms without showing meaning." }
          ],
          correctOptionId: "a"
        },
        {
          id: "world-history-101-l03-q2",
          text: "What is the best first step when analyzing timeline?",
          skillId: "world-history-101-skill-process",
          options: [
            { id: "a", text: "Define the goal and examine evidence for timeline." },
            { id: "b", text: "Guess quickly without checking evidence." },
            { id: "c", text: "Use data unrelated to timeline." },
            { id: "d", text: "Skip the context and jump to a conclusion." }
          ],
          correctOptionId: "a"
        },
        {
          id: "world-history-101-l03-q3",
          text: "Which option shows strong reasoning about historical thinking?",
          skillId: "world-history-101-skill-reasoning",
          options: [
            { id: "a", text: "Use examples and verify assumptions step by step." },
            { id: "b", text: "Ignore important details and edge cases." },
            { id: "c", text: "Use assumptions unrelated to historical thinking." },
            { id: "d", text: "Change the topic when evidence gets hard." }
          ],
          correctOptionId: "a"
        },
        {
          id: "world-history-101-l03-q4",
          text: "Why is spaced review useful for History Worldwide mastery?",
          skillId: "world-history-101-skill-review",
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
        { id: "world-history-101-l03-a1", type: "mnemonic", title: "Memory Tip", content: "Use the phrase Plan, Check, Explain for each question." }
      ]
    },
    {
      id: "world-history-101-l04",
      title: "Medieval to Early Modern",
      type: "video",
      duration: 11,
      learningAids: [
        { id: "world-history-101-l04-a1", type: "image", title: "Worked Example Sheet", content: "Step-by-step visuals for cause and effect scenarios." }
      ]
    },
    {
      id: "world-history-101-l05",
      title: "Revolutions and Change",
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
        { id: "world-history-101-l05-a1", type: "animation", title: "Challenge Walkthrough", content: "Animated sequence for solving a cause and effect challenge." }
      ]
    },
    {
      id: "world-history-101-l06",
      title: "Checkpoint: Turning Points",
      type: "quiz",
      duration: 10,
      questions: [
        {
          id: "world-history-101-l06-q1",
          text: "Which statement best explains cause and effect in History Worldwide?",
          skillId: "world-history-101-skill-core",
          options: [
            { id: "a", text: "It explains cause and effect using evidence from the lesson." },
            { id: "b", text: "It ignores how cause and effect works in practice." },
            { id: "c", text: "It focuses on an unrelated topic outside History Worldwide." },
            { id: "d", text: "It repeats terms without showing meaning." }
          ],
          correctOptionId: "a"
        },
        {
          id: "world-history-101-l06-q2",
          text: "What is the best first step when analyzing primary sources?",
          skillId: "world-history-101-skill-process",
          options: [
            { id: "a", text: "Define the goal and examine evidence for primary sources." },
            { id: "b", text: "Guess quickly without checking evidence." },
            { id: "c", text: "Use data unrelated to primary sources." },
            { id: "d", text: "Skip the context and jump to a conclusion." }
          ],
          correctOptionId: "a"
        },
        {
          id: "world-history-101-l06-q3",
          text: "Which option shows strong reasoning about historical thinking?",
          skillId: "world-history-101-skill-reasoning",
          options: [
            { id: "a", text: "Use examples and verify assumptions step by step." },
            { id: "b", text: "Ignore important details and edge cases." },
            { id: "c", text: "Use assumptions unrelated to historical thinking." },
            { id: "d", text: "Change the topic when evidence gets hard." }
          ],
          correctOptionId: "a"
        },
        {
          id: "world-history-101-l06-q4",
          text: "Why is spaced review useful for History Worldwide mastery?",
          skillId: "world-history-101-skill-review",
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
        { id: "world-history-101-l06-a1", type: "mnemonic", title: "Memory Tip", content: "Use the phrase Plan, Check, Explain for each question." }
      ]
    },
    {
      id: "world-history-101-l07",
      title: "Modern World Developments",
      type: "video",
      duration: 12,
      learningAids: [
        { id: "world-history-101-l07-a1", type: "practice", title: "Project Planner", content: "Template for planning a mini project focused on primary sources." }
      ]
    },
    {
      id: "world-history-101-l08",
      title: "Source Analysis Activity",
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
        { id: "world-history-101-l08-a1", type: "mnemonic", title: "Reflection Cycle", content: "Remember Observe, Adjust, Repeat while practicing." }
      ]
    },
    {
      id: "world-history-101-l09",
      title: "Review: Historical Patterns",
      type: "quiz",
      duration: 10,
      questions: [
        {
          id: "world-history-101-l09-q1",
          text: "Which statement best explains timeline in History Worldwide?",
          skillId: "world-history-101-skill-core",
          options: [
            { id: "a", text: "It explains timeline using evidence from the lesson." },
            { id: "b", text: "It ignores how timeline works in practice." },
            { id: "c", text: "It focuses on an unrelated topic outside History Worldwide." },
            { id: "d", text: "It repeats terms without showing meaning." }
          ],
          correctOptionId: "a"
        },
        {
          id: "world-history-101-l09-q2",
          text: "What is the best first step when analyzing primary sources?",
          skillId: "world-history-101-skill-process",
          options: [
            { id: "a", text: "Define the goal and examine evidence for primary sources." },
            { id: "b", text: "Guess quickly without checking evidence." },
            { id: "c", text: "Use data unrelated to primary sources." },
            { id: "d", text: "Skip the context and jump to a conclusion." }
          ],
          correctOptionId: "a"
        },
        {
          id: "world-history-101-l09-q3",
          text: "Which option shows strong reasoning about historical thinking?",
          skillId: "world-history-101-skill-reasoning",
          options: [
            { id: "a", text: "Use examples and verify assumptions step by step." },
            { id: "b", text: "Ignore important details and edge cases." },
            { id: "c", text: "Use assumptions unrelated to historical thinking." },
            { id: "d", text: "Change the topic when evidence gets hard." }
          ],
          correctOptionId: "a"
        },
        {
          id: "world-history-101-l09-q4",
          text: "Why is spaced review useful for History Worldwide mastery?",
          skillId: "world-history-101-skill-review",
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
        { id: "world-history-101-l09-a1", type: "mnemonic", title: "Memory Tip", content: "Use the phrase Plan, Check, Explain for each question." }
      ]
    },
    {
      id: "world-history-101-l10",
      title: "Mastery: World History",
      type: "quiz",
      duration: 10,
      questions: [
        {
          id: "world-history-101-l10-q1",
          text: "Which statement best explains civilizations in History Worldwide?",
          skillId: "world-history-101-skill-core",
          options: [
            { id: "a", text: "It explains civilizations using evidence from the lesson." },
            { id: "b", text: "It ignores how civilizations works in practice." },
            { id: "c", text: "It focuses on an unrelated topic outside History Worldwide." },
            { id: "d", text: "It repeats terms without showing meaning." }
          ],
          correctOptionId: "a"
        },
        {
          id: "world-history-101-l10-q2",
          text: "What is the best first step when analyzing cause and effect?",
          skillId: "world-history-101-skill-process",
          options: [
            { id: "a", text: "Define the goal and examine evidence for cause and effect." },
            { id: "b", text: "Guess quickly without checking evidence." },
            { id: "c", text: "Use data unrelated to cause and effect." },
            { id: "d", text: "Skip the context and jump to a conclusion." }
          ],
          correctOptionId: "a"
        },
        {
          id: "world-history-101-l10-q3",
          text: "Which option shows strong reasoning about historical thinking?",
          skillId: "world-history-101-skill-reasoning",
          options: [
            { id: "a", text: "Use examples and verify assumptions step by step." },
            { id: "b", text: "Ignore important details and edge cases." },
            { id: "c", text: "Use assumptions unrelated to historical thinking." },
            { id: "d", text: "Change the topic when evidence gets hard." }
          ],
          correctOptionId: "a"
        },
        {
          id: "world-history-101-l10-q4",
          text: "Why is spaced review useful for History Worldwide mastery?",
          skillId: "world-history-101-skill-review",
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
        { id: "world-history-101-l10-a1", type: "mnemonic", title: "Memory Tip", content: "Use the phrase Plan, Check, Explain for each question." }
      ]
    }
  ],
};
