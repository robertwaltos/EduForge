import type { LearningModule } from "@/lib/modules/types";

export const Chemistry101Module: LearningModule = {
  id: "chemistry-101",
  title: "Chemistry Essentials",
  description: "Learn matter, reactions, mixtures, and lab safety through guided lessons.",
  subject: "Chemistry",
  tags: ["core", "curriculum", "interactive"],
  minAge: 7,
  maxAge: 18,
  moduleVersion: "1.1.0",
  version: "1.1.0",
  learningObjectives: [
    "Understand core concepts in Chemistry",
    "Apply Reaction Evidence strategies through guided practice",
    "Demonstrate mastery with subject-specific quizzes"
  ],
  lessons: [
    {
      id: "chemistry-101-l01",
      title: "States of Matter",
      type: "video",
      duration: 10,
      learningAids: [
        { id: "chemistry-101-l01-a1", type: "image", title: "Concept Poster", content: "A colorful infographic about states of matter and atoms." },
        { id: "chemistry-101-l01-a2", type: "animation", title: "Warm-up Animation", content: "Short animation introducing Chemistry vocabulary." }
      ]
    },
    {
      id: "chemistry-101-l02",
      title: "Atoms and Molecules",
      type: "interactive",
      duration: 12,
      metadata: {
        prompts: [
          "Identify one core idea about states of matter from this lesson.",
          "Explain where atoms appears in real life.",
          "Describe one question you still have about matter and reactions."
        ]
      },
      learningAids: [
        { id: "chemistry-101-l02-a1", type: "practice", title: "Try It Board", content: "Complete a guided activity on atoms and write one reflection." }
      ]
    },
    {
      id: "chemistry-101-l03",
      title: "Checkpoint: Matter Basics",
      type: "quiz",
      duration: 10,
      questions: [
        {
          id: "chemistry-101-l03-q1",
          text: "Which statement best explains states of matter in Chemistry?",
          skillId: "chemistry-101-skill-core",
          options: [
            { id: "a", text: "It explains states of matter using evidence from the lesson." },
            { id: "b", text: "It ignores how states of matter works in practice." },
            { id: "c", text: "It focuses on an unrelated topic outside Chemistry." },
            { id: "d", text: "It repeats terms without showing meaning." }
          ],
          correctOptionId: "a"
        },
        {
          id: "chemistry-101-l03-q2",
          text: "What is the best first step when analyzing atoms?",
          skillId: "chemistry-101-skill-process",
          options: [
            { id: "a", text: "Define the goal and examine evidence for atoms." },
            { id: "b", text: "Guess quickly without checking evidence." },
            { id: "c", text: "Use data unrelated to atoms." },
            { id: "d", text: "Skip the context and jump to a conclusion." }
          ],
          correctOptionId: "a"
        },
        {
          id: "chemistry-101-l03-q3",
          text: "Which option shows strong reasoning about matter and reactions?",
          skillId: "chemistry-101-skill-reasoning",
          options: [
            { id: "a", text: "Use examples and verify assumptions step by step." },
            { id: "b", text: "Ignore important details and edge cases." },
            { id: "c", text: "Use assumptions unrelated to matter and reactions." },
            { id: "d", text: "Change the topic when evidence gets hard." }
          ],
          correctOptionId: "a"
        },
        {
          id: "chemistry-101-l03-q4",
          text: "Why is spaced review useful for Chemistry mastery?",
          skillId: "chemistry-101-skill-review",
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
        { id: "chemistry-101-l03-a1", type: "mnemonic", title: "Memory Tip", content: "Use the phrase Plan, Check, Explain for each question." }
      ]
    },
    {
      id: "chemistry-101-l04",
      title: "Mixtures and Solutions",
      type: "video",
      duration: 11,
      learningAids: [
        { id: "chemistry-101-l04-a1", type: "image", title: "Worked Example Sheet", content: "Step-by-step visuals for mixtures scenarios." }
      ]
    },
    {
      id: "chemistry-101-l05",
      title: "Chemical Reactions Intro",
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
        { id: "chemistry-101-l05-a1", type: "animation", title: "Challenge Walkthrough", content: "Animated sequence for solving a mixtures challenge." }
      ]
    },
    {
      id: "chemistry-101-l06",
      title: "Checkpoint: Reaction Evidence",
      type: "quiz",
      duration: 10,
      questions: [
        {
          id: "chemistry-101-l06-q1",
          text: "Which statement best explains mixtures in Chemistry?",
          skillId: "chemistry-101-skill-core",
          options: [
            { id: "a", text: "It explains mixtures using evidence from the lesson." },
            { id: "b", text: "It ignores how mixtures works in practice." },
            { id: "c", text: "It focuses on an unrelated topic outside Chemistry." },
            { id: "d", text: "It repeats terms without showing meaning." }
          ],
          correctOptionId: "a"
        },
        {
          id: "chemistry-101-l06-q2",
          text: "What is the best first step when analyzing chemical change?",
          skillId: "chemistry-101-skill-process",
          options: [
            { id: "a", text: "Define the goal and examine evidence for chemical change." },
            { id: "b", text: "Guess quickly without checking evidence." },
            { id: "c", text: "Use data unrelated to chemical change." },
            { id: "d", text: "Skip the context and jump to a conclusion." }
          ],
          correctOptionId: "a"
        },
        {
          id: "chemistry-101-l06-q3",
          text: "Which option shows strong reasoning about matter and reactions?",
          skillId: "chemistry-101-skill-reasoning",
          options: [
            { id: "a", text: "Use examples and verify assumptions step by step." },
            { id: "b", text: "Ignore important details and edge cases." },
            { id: "c", text: "Use assumptions unrelated to matter and reactions." },
            { id: "d", text: "Change the topic when evidence gets hard." }
          ],
          correctOptionId: "a"
        },
        {
          id: "chemistry-101-l06-q4",
          text: "Why is spaced review useful for Chemistry mastery?",
          skillId: "chemistry-101-skill-review",
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
        { id: "chemistry-101-l06-a1", type: "mnemonic", title: "Memory Tip", content: "Use the phrase Plan, Check, Explain for each question." }
      ]
    },
    {
      id: "chemistry-101-l07",
      title: "Acids, Bases, and pH",
      type: "video",
      duration: 12,
      learningAids: [
        { id: "chemistry-101-l07-a1", type: "practice", title: "Project Planner", content: "Template for planning a mini project focused on chemical change." }
      ]
    },
    {
      id: "chemistry-101-l08",
      title: "Lab Safety Simulation",
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
        { id: "chemistry-101-l08-a1", type: "mnemonic", title: "Reflection Cycle", content: "Remember Observe, Adjust, Repeat while practicing." }
      ]
    },
    {
      id: "chemistry-101-l09",
      title: "Review: Chemistry Ideas",
      type: "quiz",
      duration: 10,
      questions: [
        {
          id: "chemistry-101-l09-q1",
          text: "Which statement best explains atoms in Chemistry?",
          skillId: "chemistry-101-skill-core",
          options: [
            { id: "a", text: "It explains atoms using evidence from the lesson." },
            { id: "b", text: "It ignores how atoms works in practice." },
            { id: "c", text: "It focuses on an unrelated topic outside Chemistry." },
            { id: "d", text: "It repeats terms without showing meaning." }
          ],
          correctOptionId: "a"
        },
        {
          id: "chemistry-101-l09-q2",
          text: "What is the best first step when analyzing chemical change?",
          skillId: "chemistry-101-skill-process",
          options: [
            { id: "a", text: "Define the goal and examine evidence for chemical change." },
            { id: "b", text: "Guess quickly without checking evidence." },
            { id: "c", text: "Use data unrelated to chemical change." },
            { id: "d", text: "Skip the context and jump to a conclusion." }
          ],
          correctOptionId: "a"
        },
        {
          id: "chemistry-101-l09-q3",
          text: "Which option shows strong reasoning about matter and reactions?",
          skillId: "chemistry-101-skill-reasoning",
          options: [
            { id: "a", text: "Use examples and verify assumptions step by step." },
            { id: "b", text: "Ignore important details and edge cases." },
            { id: "c", text: "Use assumptions unrelated to matter and reactions." },
            { id: "d", text: "Change the topic when evidence gets hard." }
          ],
          correctOptionId: "a"
        },
        {
          id: "chemistry-101-l09-q4",
          text: "Why is spaced review useful for Chemistry mastery?",
          skillId: "chemistry-101-skill-review",
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
        { id: "chemistry-101-l09-a1", type: "mnemonic", title: "Memory Tip", content: "Use the phrase Plan, Check, Explain for each question." }
      ]
    },
    {
      id: "chemistry-101-l10",
      title: "Mastery: Chemistry",
      type: "quiz",
      duration: 10,
      questions: [
        {
          id: "chemistry-101-l10-q1",
          text: "Which statement best explains states of matter in Chemistry?",
          skillId: "chemistry-101-skill-core",
          options: [
            { id: "a", text: "It explains states of matter using evidence from the lesson." },
            { id: "b", text: "It ignores how states of matter works in practice." },
            { id: "c", text: "It focuses on an unrelated topic outside Chemistry." },
            { id: "d", text: "It repeats terms without showing meaning." }
          ],
          correctOptionId: "a"
        },
        {
          id: "chemistry-101-l10-q2",
          text: "What is the best first step when analyzing mixtures?",
          skillId: "chemistry-101-skill-process",
          options: [
            { id: "a", text: "Define the goal and examine evidence for mixtures." },
            { id: "b", text: "Guess quickly without checking evidence." },
            { id: "c", text: "Use data unrelated to mixtures." },
            { id: "d", text: "Skip the context and jump to a conclusion." }
          ],
          correctOptionId: "a"
        },
        {
          id: "chemistry-101-l10-q3",
          text: "Which option shows strong reasoning about matter and reactions?",
          skillId: "chemistry-101-skill-reasoning",
          options: [
            { id: "a", text: "Use examples and verify assumptions step by step." },
            { id: "b", text: "Ignore important details and edge cases." },
            { id: "c", text: "Use assumptions unrelated to matter and reactions." },
            { id: "d", text: "Change the topic when evidence gets hard." }
          ],
          correctOptionId: "a"
        },
        {
          id: "chemistry-101-l10-q4",
          text: "Why is spaced review useful for Chemistry mastery?",
          skillId: "chemistry-101-skill-review",
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
        { id: "chemistry-101-l10-a1", type: "mnemonic", title: "Memory Tip", content: "Use the phrase Plan, Check, Explain for each question." }
      ]
    }
  ],
};
