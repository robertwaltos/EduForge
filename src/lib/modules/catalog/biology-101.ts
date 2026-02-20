import type { LearningModule } from "@/lib/modules/types";

export const Biology101Module: LearningModule = {
  id: "biology-101",
  title: "Biology Essentials",
  description: "Discover living systems, cells, ecosystems, and the diversity of life.",
  subject: "Biology",
  tags: ["core", "curriculum", "interactive"],
  minAge: 7,
  maxAge: 18,
  moduleVersion: "1.1.0",
  version: "1.1.0",
  learningObjectives: [
    "Understand core concepts in Biology",
    "Apply Ecosystem Thinking strategies through guided practice",
    "Demonstrate mastery with subject-specific quizzes"
  ],
  lessons: [
    {
      id: "biology-101-l01",
      title: "Cells and Life Processes",
      type: "video",
      duration: 10,
      learningAids: [
        { id: "biology-101-l01-a1", type: "image", title: "Concept Poster", content: "A colorful infographic about cells and organs." },
        { id: "biology-101-l01-a2", type: "animation", title: "Warm-up Animation", content: "Short animation introducing Biology vocabulary." }
      ]
    },
    {
      id: "biology-101-l02",
      title: "Body Systems Overview",
      type: "interactive",
      duration: 12,
      metadata: {
        prompts: [
          "Identify one core idea about cells from this lesson.",
          "Explain where organs appears in real life.",
          "Describe one question you still have about living systems."
        ]
      },
      learningAids: [
        { id: "biology-101-l02-a1", type: "practice", title: "Try It Board", content: "Complete a guided activity on organs and write one reflection." }
      ]
    },
    {
      id: "biology-101-l03",
      title: "Checkpoint: Cell Biology",
      type: "quiz",
      duration: 10,
      questions: [
        {
          id: "biology-101-l03-q1",
          text: "Which statement best explains cells in Biology?",
          skillId: "biology-101-skill-core",
          options: [
            { id: "a", text: "It explains cells using evidence from the lesson." },
            { id: "b", text: "It ignores how cells works in practice." },
            { id: "c", text: "It focuses on an unrelated topic outside Biology." },
            { id: "d", text: "It repeats terms without showing meaning." }
          ],
          correctOptionId: "a"
        },
        {
          id: "biology-101-l03-q2",
          text: "What is the best first step when analyzing organs?",
          skillId: "biology-101-skill-process",
          options: [
            { id: "a", text: "Define the goal and examine evidence for organs." },
            { id: "b", text: "Guess quickly without checking evidence." },
            { id: "c", text: "Use data unrelated to organs." },
            { id: "d", text: "Skip the context and jump to a conclusion." }
          ],
          correctOptionId: "a"
        },
        {
          id: "biology-101-l03-q3",
          text: "Which option shows strong reasoning about living systems?",
          skillId: "biology-101-skill-reasoning",
          options: [
            { id: "a", text: "Use examples and verify assumptions step by step." },
            { id: "b", text: "Ignore important details and edge cases." },
            { id: "c", text: "Use assumptions unrelated to living systems." },
            { id: "d", text: "Change the topic when evidence gets hard." }
          ],
          correctOptionId: "a"
        },
        {
          id: "biology-101-l03-q4",
          text: "Why is spaced review useful for Biology mastery?",
          skillId: "biology-101-skill-review",
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
        { id: "biology-101-l03-a1", type: "mnemonic", title: "Memory Tip", content: "Use the phrase Plan, Check, Explain for each question." }
      ]
    },
    {
      id: "biology-101-l04",
      title: "Ecosystems and Food Webs",
      type: "video",
      duration: 11,
      learningAids: [
        { id: "biology-101-l04-a1", type: "image", title: "Worked Example Sheet", content: "Step-by-step visuals for ecosystems scenarios." }
      ]
    },
    {
      id: "biology-101-l05",
      title: "Adaptation and Survival",
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
        { id: "biology-101-l05-a1", type: "animation", title: "Challenge Walkthrough", content: "Animated sequence for solving a ecosystems challenge." }
      ]
    },
    {
      id: "biology-101-l06",
      title: "Checkpoint: Ecosystem Thinking",
      type: "quiz",
      duration: 10,
      questions: [
        {
          id: "biology-101-l06-q1",
          text: "Which statement best explains ecosystems in Biology?",
          skillId: "biology-101-skill-core",
          options: [
            { id: "a", text: "It explains ecosystems using evidence from the lesson." },
            { id: "b", text: "It ignores how ecosystems works in practice." },
            { id: "c", text: "It focuses on an unrelated topic outside Biology." },
            { id: "d", text: "It repeats terms without showing meaning." }
          ],
          correctOptionId: "a"
        },
        {
          id: "biology-101-l06-q2",
          text: "What is the best first step when analyzing adaptation?",
          skillId: "biology-101-skill-process",
          options: [
            { id: "a", text: "Define the goal and examine evidence for adaptation." },
            { id: "b", text: "Guess quickly without checking evidence." },
            { id: "c", text: "Use data unrelated to adaptation." },
            { id: "d", text: "Skip the context and jump to a conclusion." }
          ],
          correctOptionId: "a"
        },
        {
          id: "biology-101-l06-q3",
          text: "Which option shows strong reasoning about living systems?",
          skillId: "biology-101-skill-reasoning",
          options: [
            { id: "a", text: "Use examples and verify assumptions step by step." },
            { id: "b", text: "Ignore important details and edge cases." },
            { id: "c", text: "Use assumptions unrelated to living systems." },
            { id: "d", text: "Change the topic when evidence gets hard." }
          ],
          correctOptionId: "a"
        },
        {
          id: "biology-101-l06-q4",
          text: "Why is spaced review useful for Biology mastery?",
          skillId: "biology-101-skill-review",
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
        { id: "biology-101-l06-a1", type: "mnemonic", title: "Memory Tip", content: "Use the phrase Plan, Check, Explain for each question." }
      ]
    },
    {
      id: "biology-101-l07",
      title: "Genetics Basics",
      type: "video",
      duration: 12,
      learningAids: [
        { id: "biology-101-l07-a1", type: "practice", title: "Project Planner", content: "Template for planning a mini project focused on adaptation." }
      ]
    },
    {
      id: "biology-101-l08",
      title: "Biology Lab Reflection",
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
        { id: "biology-101-l08-a1", type: "mnemonic", title: "Reflection Cycle", content: "Remember Observe, Adjust, Repeat while practicing." }
      ]
    },
    {
      id: "biology-101-l09",
      title: "Review: Biology Concepts",
      type: "quiz",
      duration: 10,
      questions: [
        {
          id: "biology-101-l09-q1",
          text: "Which statement best explains organs in Biology?",
          skillId: "biology-101-skill-core",
          options: [
            { id: "a", text: "It explains organs using evidence from the lesson." },
            { id: "b", text: "It ignores how organs works in practice." },
            { id: "c", text: "It focuses on an unrelated topic outside Biology." },
            { id: "d", text: "It repeats terms without showing meaning." }
          ],
          correctOptionId: "a"
        },
        {
          id: "biology-101-l09-q2",
          text: "What is the best first step when analyzing adaptation?",
          skillId: "biology-101-skill-process",
          options: [
            { id: "a", text: "Define the goal and examine evidence for adaptation." },
            { id: "b", text: "Guess quickly without checking evidence." },
            { id: "c", text: "Use data unrelated to adaptation." },
            { id: "d", text: "Skip the context and jump to a conclusion." }
          ],
          correctOptionId: "a"
        },
        {
          id: "biology-101-l09-q3",
          text: "Which option shows strong reasoning about living systems?",
          skillId: "biology-101-skill-reasoning",
          options: [
            { id: "a", text: "Use examples and verify assumptions step by step." },
            { id: "b", text: "Ignore important details and edge cases." },
            { id: "c", text: "Use assumptions unrelated to living systems." },
            { id: "d", text: "Change the topic when evidence gets hard." }
          ],
          correctOptionId: "a"
        },
        {
          id: "biology-101-l09-q4",
          text: "Why is spaced review useful for Biology mastery?",
          skillId: "biology-101-skill-review",
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
        { id: "biology-101-l09-a1", type: "mnemonic", title: "Memory Tip", content: "Use the phrase Plan, Check, Explain for each question." }
      ]
    },
    {
      id: "biology-101-l10",
      title: "Mastery: Biology",
      type: "quiz",
      duration: 10,
      questions: [
        {
          id: "biology-101-l10-q1",
          text: "Which statement best explains cells in Biology?",
          skillId: "biology-101-skill-core",
          options: [
            { id: "a", text: "It explains cells using evidence from the lesson." },
            { id: "b", text: "It ignores how cells works in practice." },
            { id: "c", text: "It focuses on an unrelated topic outside Biology." },
            { id: "d", text: "It repeats terms without showing meaning." }
          ],
          correctOptionId: "a"
        },
        {
          id: "biology-101-l10-q2",
          text: "What is the best first step when analyzing ecosystems?",
          skillId: "biology-101-skill-process",
          options: [
            { id: "a", text: "Define the goal and examine evidence for ecosystems." },
            { id: "b", text: "Guess quickly without checking evidence." },
            { id: "c", text: "Use data unrelated to ecosystems." },
            { id: "d", text: "Skip the context and jump to a conclusion." }
          ],
          correctOptionId: "a"
        },
        {
          id: "biology-101-l10-q3",
          text: "Which option shows strong reasoning about living systems?",
          skillId: "biology-101-skill-reasoning",
          options: [
            { id: "a", text: "Use examples and verify assumptions step by step." },
            { id: "b", text: "Ignore important details and edge cases." },
            { id: "c", text: "Use assumptions unrelated to living systems." },
            { id: "d", text: "Change the topic when evidence gets hard." }
          ],
          correctOptionId: "a"
        },
        {
          id: "biology-101-l10-q4",
          text: "Why is spaced review useful for Biology mastery?",
          skillId: "biology-101-skill-review",
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
        { id: "biology-101-l10-a1", type: "mnemonic", title: "Memory Tip", content: "Use the phrase Plan, Check, Explain for each question." }
      ]
    }
  ],
};
