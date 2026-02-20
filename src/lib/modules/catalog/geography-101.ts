import type { LearningModule } from "@/lib/modules/types";

export const Geography101Module: LearningModule = {
  id: "geography-101",
  title: "Geography and Maps",
  description: "Learn maps, landforms, climates, regions, and human-environment interaction.",
  subject: "Geography",
  tags: ["core", "curriculum", "interactive"],
  minAge: 7,
  maxAge: 18,
  moduleVersion: "1.1.0",
  version: "1.1.0",
  learningObjectives: [
    "Understand core concepts in Geography",
    "Apply Region Analysis strategies through guided practice",
    "Demonstrate mastery with subject-specific quizzes"
  ],
  lessons: [
    {
      id: "geography-101-l01",
      title: "Map Reading Fundamentals",
      type: "video",
      duration: 10,
      learningAids: [
        { id: "geography-101-l01-a1", type: "image", title: "Concept Poster", content: "A colorful infographic about map skills and landforms." },
        { id: "geography-101-l01-a2", type: "animation", title: "Warm-up Animation", content: "Short animation introducing Geography vocabulary." }
      ]
    },
    {
      id: "geography-101-l02",
      title: "Coordinates and Scale",
      type: "interactive",
      duration: 12,
      metadata: {
        prompts: [
          "Identify one core idea about map skills from this lesson.",
          "Explain where landforms appears in real life.",
          "Describe one question you still have about maps and regions."
        ]
      },
      learningAids: [
        { id: "geography-101-l02-a1", type: "practice", title: "Try It Board", content: "Complete a guided activity on landforms and write one reflection." }
      ]
    },
    {
      id: "geography-101-l03",
      title: "Checkpoint: Map Skills",
      type: "quiz",
      duration: 10,
      questions: [
        {
          id: "geography-101-l03-q1",
          text: "Which statement best explains map skills in Geography?",
          skillId: "geography-101-skill-core",
          options: [
            { id: "a", text: "It explains map skills using evidence from the lesson." },
            { id: "b", text: "It ignores how map skills works in practice." },
            { id: "c", text: "It focuses on an unrelated topic outside Geography." },
            { id: "d", text: "It repeats terms without showing meaning." }
          ],
          correctOptionId: "a"
        },
        {
          id: "geography-101-l03-q2",
          text: "What is the best first step when analyzing landforms?",
          skillId: "geography-101-skill-process",
          options: [
            { id: "a", text: "Define the goal and examine evidence for landforms." },
            { id: "b", text: "Guess quickly without checking evidence." },
            { id: "c", text: "Use data unrelated to landforms." },
            { id: "d", text: "Skip the context and jump to a conclusion." }
          ],
          correctOptionId: "a"
        },
        {
          id: "geography-101-l03-q3",
          text: "Which option shows strong reasoning about maps and regions?",
          skillId: "geography-101-skill-reasoning",
          options: [
            { id: "a", text: "Use examples and verify assumptions step by step." },
            { id: "b", text: "Ignore important details and edge cases." },
            { id: "c", text: "Use assumptions unrelated to maps and regions." },
            { id: "d", text: "Change the topic when evidence gets hard." }
          ],
          correctOptionId: "a"
        },
        {
          id: "geography-101-l03-q4",
          text: "Why is spaced review useful for Geography mastery?",
          skillId: "geography-101-skill-review",
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
        { id: "geography-101-l03-a1", type: "mnemonic", title: "Memory Tip", content: "Use the phrase Plan, Check, Explain for each question." }
      ]
    },
    {
      id: "geography-101-l04",
      title: "Landforms and Waterways",
      type: "video",
      duration: 11,
      learningAids: [
        { id: "geography-101-l04-a1", type: "image", title: "Worked Example Sheet", content: "Step-by-step visuals for climate zones scenarios." }
      ]
    },
    {
      id: "geography-101-l05",
      title: "Climate and Biomes",
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
        { id: "geography-101-l05-a1", type: "animation", title: "Challenge Walkthrough", content: "Animated sequence for solving a climate zones challenge." }
      ]
    },
    {
      id: "geography-101-l06",
      title: "Checkpoint: Region Analysis",
      type: "quiz",
      duration: 10,
      questions: [
        {
          id: "geography-101-l06-q1",
          text: "Which statement best explains climate zones in Geography?",
          skillId: "geography-101-skill-core",
          options: [
            { id: "a", text: "It explains climate zones using evidence from the lesson." },
            { id: "b", text: "It ignores how climate zones works in practice." },
            { id: "c", text: "It focuses on an unrelated topic outside Geography." },
            { id: "d", text: "It repeats terms without showing meaning." }
          ],
          correctOptionId: "a"
        },
        {
          id: "geography-101-l06-q2",
          text: "What is the best first step when analyzing human geography?",
          skillId: "geography-101-skill-process",
          options: [
            { id: "a", text: "Define the goal and examine evidence for human geography." },
            { id: "b", text: "Guess quickly without checking evidence." },
            { id: "c", text: "Use data unrelated to human geography." },
            { id: "d", text: "Skip the context and jump to a conclusion." }
          ],
          correctOptionId: "a"
        },
        {
          id: "geography-101-l06-q3",
          text: "Which option shows strong reasoning about maps and regions?",
          skillId: "geography-101-skill-reasoning",
          options: [
            { id: "a", text: "Use examples and verify assumptions step by step." },
            { id: "b", text: "Ignore important details and edge cases." },
            { id: "c", text: "Use assumptions unrelated to maps and regions." },
            { id: "d", text: "Change the topic when evidence gets hard." }
          ],
          correctOptionId: "a"
        },
        {
          id: "geography-101-l06-q4",
          text: "Why is spaced review useful for Geography mastery?",
          skillId: "geography-101-skill-review",
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
        { id: "geography-101-l06-a1", type: "mnemonic", title: "Memory Tip", content: "Use the phrase Plan, Check, Explain for each question." }
      ]
    },
    {
      id: "geography-101-l07",
      title: "Population and Cities",
      type: "video",
      duration: 12,
      learningAids: [
        { id: "geography-101-l07-a1", type: "practice", title: "Project Planner", content: "Template for planning a mini project focused on human geography." }
      ]
    },
    {
      id: "geography-101-l08",
      title: "Geography Field Notes",
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
        { id: "geography-101-l08-a1", type: "mnemonic", title: "Reflection Cycle", content: "Remember Observe, Adjust, Repeat while practicing." }
      ]
    },
    {
      id: "geography-101-l09",
      title: "Review: Geographic Thinking",
      type: "quiz",
      duration: 10,
      questions: [
        {
          id: "geography-101-l09-q1",
          text: "Which statement best explains landforms in Geography?",
          skillId: "geography-101-skill-core",
          options: [
            { id: "a", text: "It explains landforms using evidence from the lesson." },
            { id: "b", text: "It ignores how landforms works in practice." },
            { id: "c", text: "It focuses on an unrelated topic outside Geography." },
            { id: "d", text: "It repeats terms without showing meaning." }
          ],
          correctOptionId: "a"
        },
        {
          id: "geography-101-l09-q2",
          text: "What is the best first step when analyzing human geography?",
          skillId: "geography-101-skill-process",
          options: [
            { id: "a", text: "Define the goal and examine evidence for human geography." },
            { id: "b", text: "Guess quickly without checking evidence." },
            { id: "c", text: "Use data unrelated to human geography." },
            { id: "d", text: "Skip the context and jump to a conclusion." }
          ],
          correctOptionId: "a"
        },
        {
          id: "geography-101-l09-q3",
          text: "Which option shows strong reasoning about maps and regions?",
          skillId: "geography-101-skill-reasoning",
          options: [
            { id: "a", text: "Use examples and verify assumptions step by step." },
            { id: "b", text: "Ignore important details and edge cases." },
            { id: "c", text: "Use assumptions unrelated to maps and regions." },
            { id: "d", text: "Change the topic when evidence gets hard." }
          ],
          correctOptionId: "a"
        },
        {
          id: "geography-101-l09-q4",
          text: "Why is spaced review useful for Geography mastery?",
          skillId: "geography-101-skill-review",
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
        { id: "geography-101-l09-a1", type: "mnemonic", title: "Memory Tip", content: "Use the phrase Plan, Check, Explain for each question." }
      ]
    },
    {
      id: "geography-101-l10",
      title: "Mastery: Geography",
      type: "quiz",
      duration: 10,
      questions: [
        {
          id: "geography-101-l10-q1",
          text: "Which statement best explains map skills in Geography?",
          skillId: "geography-101-skill-core",
          options: [
            { id: "a", text: "It explains map skills using evidence from the lesson." },
            { id: "b", text: "It ignores how map skills works in practice." },
            { id: "c", text: "It focuses on an unrelated topic outside Geography." },
            { id: "d", text: "It repeats terms without showing meaning." }
          ],
          correctOptionId: "a"
        },
        {
          id: "geography-101-l10-q2",
          text: "What is the best first step when analyzing climate zones?",
          skillId: "geography-101-skill-process",
          options: [
            { id: "a", text: "Define the goal and examine evidence for climate zones." },
            { id: "b", text: "Guess quickly without checking evidence." },
            { id: "c", text: "Use data unrelated to climate zones." },
            { id: "d", text: "Skip the context and jump to a conclusion." }
          ],
          correctOptionId: "a"
        },
        {
          id: "geography-101-l10-q3",
          text: "Which option shows strong reasoning about maps and regions?",
          skillId: "geography-101-skill-reasoning",
          options: [
            { id: "a", text: "Use examples and verify assumptions step by step." },
            { id: "b", text: "Ignore important details and edge cases." },
            { id: "c", text: "Use assumptions unrelated to maps and regions." },
            { id: "d", text: "Change the topic when evidence gets hard." }
          ],
          correctOptionId: "a"
        },
        {
          id: "geography-101-l10-q4",
          text: "Why is spaced review useful for Geography mastery?",
          skillId: "geography-101-skill-review",
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
        { id: "geography-101-l10-a1", type: "mnemonic", title: "Memory Tip", content: "Use the phrase Plan, Check, Explain for each question." }
      ]
    }
  ],
};
