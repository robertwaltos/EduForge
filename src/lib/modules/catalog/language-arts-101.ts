import type { LearningModule } from "@/lib/modules/types";

export const LanguageArts101Module: LearningModule = {
  id: "language-arts-101",
  title: "Language Arts Foundations",
  description: "Build reading, writing, speaking, and comprehension skills with age-appropriate practice.",
  subject: "Language Arts",
  tags: ["core", "curriculum", "interactive"],
  minAge: 7,
  maxAge: 18,
  moduleVersion: "1.1.0",
  version: "1.1.0",
  learningObjectives: [
    "Understand core concepts in Language Arts",
    "Apply Writing Basics strategies through guided practice",
    "Demonstrate mastery with subject-specific quizzes"
  ],
  lessons: [
    {
      id: "language-arts-101-l01",
      title: "Reading for Main Idea",
      type: "video",
      duration: 10,
      learningAids: [
        { id: "language-arts-101-l01-a1", type: "image", title: "Concept Poster", content: "A colorful infographic about main idea and context clues." },
        { id: "language-arts-101-l01-a2", type: "animation", title: "Warm-up Animation", content: "Short animation introducing Language Arts vocabulary." }
      ]
    },
    {
      id: "language-arts-101-l02",
      title: "Context Clues and Vocabulary",
      type: "interactive",
      duration: 12,
      metadata: {
        prompts: [
          "Identify one core idea about main idea from this lesson.",
          "Explain where context clues appears in real life.",
          "Describe one question you still have about reading and writing."
        ]
      },
      learningAids: [
        { id: "language-arts-101-l02-a1", type: "practice", title: "Try It Board", content: "Complete a guided activity on context clues and write one reflection." }
      ]
    },
    {
      id: "language-arts-101-l03",
      title: "Checkpoint: Reading Comprehension",
      type: "quiz",
      duration: 10,
      questions: [
        {
          id: "language-arts-101-l03-q1",
          text: "Which statement best explains main idea in Language Arts?",
          skillId: "language-arts-101-skill-core",
          options: [
            { id: "a", text: "It explains main idea using evidence from the lesson." },
            { id: "b", text: "It ignores how main idea works in practice." },
            { id: "c", text: "It focuses on an unrelated topic outside Language Arts." },
            { id: "d", text: "It repeats terms without showing meaning." }
          ],
          correctOptionId: "a"
        },
        {
          id: "language-arts-101-l03-q2",
          text: "What is the best first step when analyzing context clues?",
          skillId: "language-arts-101-skill-process",
          options: [
            { id: "a", text: "Define the goal and examine evidence for context clues." },
            { id: "b", text: "Guess quickly without checking evidence." },
            { id: "c", text: "Use data unrelated to context clues." },
            { id: "d", text: "Skip the context and jump to a conclusion." }
          ],
          correctOptionId: "a"
        },
        {
          id: "language-arts-101-l03-q3",
          text: "Which option shows strong reasoning about reading and writing?",
          skillId: "language-arts-101-skill-reasoning",
          options: [
            { id: "a", text: "Use examples and verify assumptions step by step." },
            { id: "b", text: "Ignore important details and edge cases." },
            { id: "c", text: "Use assumptions unrelated to reading and writing." },
            { id: "d", text: "Change the topic when evidence gets hard." }
          ],
          correctOptionId: "a"
        },
        {
          id: "language-arts-101-l03-q4",
          text: "Why is spaced review useful for Language Arts mastery?",
          skillId: "language-arts-101-skill-review",
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
        { id: "language-arts-101-l03-a1", type: "mnemonic", title: "Memory Tip", content: "Use the phrase Plan, Check, Explain for each question." }
      ]
    },
    {
      id: "language-arts-101-l04",
      title: "Writing Strong Sentences",
      type: "video",
      duration: 11,
      learningAids: [
        { id: "language-arts-101-l04-a1", type: "image", title: "Worked Example Sheet", content: "Step-by-step visuals for paragraph structure scenarios." }
      ]
    },
    {
      id: "language-arts-101-l05",
      title: "Paragraph Building Workshop",
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
        { id: "language-arts-101-l05-a1", type: "animation", title: "Challenge Walkthrough", content: "Animated sequence for solving a paragraph structure challenge." }
      ]
    },
    {
      id: "language-arts-101-l06",
      title: "Checkpoint: Writing Basics",
      type: "quiz",
      duration: 10,
      questions: [
        {
          id: "language-arts-101-l06-q1",
          text: "Which statement best explains paragraph structure in Language Arts?",
          skillId: "language-arts-101-skill-core",
          options: [
            { id: "a", text: "It explains paragraph structure using evidence from the lesson." },
            { id: "b", text: "It ignores how paragraph structure works in practice." },
            { id: "c", text: "It focuses on an unrelated topic outside Language Arts." },
            { id: "d", text: "It repeats terms without showing meaning." }
          ],
          correctOptionId: "a"
        },
        {
          id: "language-arts-101-l06-q2",
          text: "What is the best first step when analyzing revision?",
          skillId: "language-arts-101-skill-process",
          options: [
            { id: "a", text: "Define the goal and examine evidence for revision." },
            { id: "b", text: "Guess quickly without checking evidence." },
            { id: "c", text: "Use data unrelated to revision." },
            { id: "d", text: "Skip the context and jump to a conclusion." }
          ],
          correctOptionId: "a"
        },
        {
          id: "language-arts-101-l06-q3",
          text: "Which option shows strong reasoning about reading and writing?",
          skillId: "language-arts-101-skill-reasoning",
          options: [
            { id: "a", text: "Use examples and verify assumptions step by step." },
            { id: "b", text: "Ignore important details and edge cases." },
            { id: "c", text: "Use assumptions unrelated to reading and writing." },
            { id: "d", text: "Change the topic when evidence gets hard." }
          ],
          correctOptionId: "a"
        },
        {
          id: "language-arts-101-l06-q4",
          text: "Why is spaced review useful for Language Arts mastery?",
          skillId: "language-arts-101-skill-review",
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
        { id: "language-arts-101-l06-a1", type: "mnemonic", title: "Memory Tip", content: "Use the phrase Plan, Check, Explain for each question." }
      ]
    },
    {
      id: "language-arts-101-l07",
      title: "Story Elements and Theme",
      type: "video",
      duration: 12,
      learningAids: [
        { id: "language-arts-101-l07-a1", type: "practice", title: "Project Planner", content: "Template for planning a mini project focused on revision." }
      ]
    },
    {
      id: "language-arts-101-l08",
      title: "Peer Feedback Activity",
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
        { id: "language-arts-101-l08-a1", type: "mnemonic", title: "Reflection Cycle", content: "Remember Observe, Adjust, Repeat while practicing." }
      ]
    },
    {
      id: "language-arts-101-l09",
      title: "Review: Language Skills",
      type: "quiz",
      duration: 10,
      questions: [
        {
          id: "language-arts-101-l09-q1",
          text: "Which statement best explains context clues in Language Arts?",
          skillId: "language-arts-101-skill-core",
          options: [
            { id: "a", text: "It explains context clues using evidence from the lesson." },
            { id: "b", text: "It ignores how context clues works in practice." },
            { id: "c", text: "It focuses on an unrelated topic outside Language Arts." },
            { id: "d", text: "It repeats terms without showing meaning." }
          ],
          correctOptionId: "a"
        },
        {
          id: "language-arts-101-l09-q2",
          text: "What is the best first step when analyzing revision?",
          skillId: "language-arts-101-skill-process",
          options: [
            { id: "a", text: "Define the goal and examine evidence for revision." },
            { id: "b", text: "Guess quickly without checking evidence." },
            { id: "c", text: "Use data unrelated to revision." },
            { id: "d", text: "Skip the context and jump to a conclusion." }
          ],
          correctOptionId: "a"
        },
        {
          id: "language-arts-101-l09-q3",
          text: "Which option shows strong reasoning about reading and writing?",
          skillId: "language-arts-101-skill-reasoning",
          options: [
            { id: "a", text: "Use examples and verify assumptions step by step." },
            { id: "b", text: "Ignore important details and edge cases." },
            { id: "c", text: "Use assumptions unrelated to reading and writing." },
            { id: "d", text: "Change the topic when evidence gets hard." }
          ],
          correctOptionId: "a"
        },
        {
          id: "language-arts-101-l09-q4",
          text: "Why is spaced review useful for Language Arts mastery?",
          skillId: "language-arts-101-skill-review",
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
        { id: "language-arts-101-l09-a1", type: "mnemonic", title: "Memory Tip", content: "Use the phrase Plan, Check, Explain for each question." }
      ]
    },
    {
      id: "language-arts-101-l10",
      title: "Mastery: Language Arts",
      type: "quiz",
      duration: 10,
      questions: [
        {
          id: "language-arts-101-l10-q1",
          text: "Which statement best explains main idea in Language Arts?",
          skillId: "language-arts-101-skill-core",
          options: [
            { id: "a", text: "It explains main idea using evidence from the lesson." },
            { id: "b", text: "It ignores how main idea works in practice." },
            { id: "c", text: "It focuses on an unrelated topic outside Language Arts." },
            { id: "d", text: "It repeats terms without showing meaning." }
          ],
          correctOptionId: "a"
        },
        {
          id: "language-arts-101-l10-q2",
          text: "What is the best first step when analyzing paragraph structure?",
          skillId: "language-arts-101-skill-process",
          options: [
            { id: "a", text: "Define the goal and examine evidence for paragraph structure." },
            { id: "b", text: "Guess quickly without checking evidence." },
            { id: "c", text: "Use data unrelated to paragraph structure." },
            { id: "d", text: "Skip the context and jump to a conclusion." }
          ],
          correctOptionId: "a"
        },
        {
          id: "language-arts-101-l10-q3",
          text: "Which option shows strong reasoning about reading and writing?",
          skillId: "language-arts-101-skill-reasoning",
          options: [
            { id: "a", text: "Use examples and verify assumptions step by step." },
            { id: "b", text: "Ignore important details and edge cases." },
            { id: "c", text: "Use assumptions unrelated to reading and writing." },
            { id: "d", text: "Change the topic when evidence gets hard." }
          ],
          correctOptionId: "a"
        },
        {
          id: "language-arts-101-l10-q4",
          text: "Why is spaced review useful for Language Arts mastery?",
          skillId: "language-arts-101-skill-review",
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
        { id: "language-arts-101-l10-a1", type: "mnemonic", title: "Memory Tip", content: "Use the phrase Plan, Check, Explain for each question." }
      ]
    }
  ],
};
