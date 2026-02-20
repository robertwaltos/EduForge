import type { LearningModule } from "@/lib/modules/types";

export const GeneralRelativity101Module: LearningModule = {
  id: "general-relativity-101",
  title: "General Relativity Intro",
  description: "Introduce spacetime, gravity, and Einstein ideas through intuitive models.",
  subject: "General Relativity",
  tags: ["core", "curriculum", "interactive"],
  minAge: 7,
  maxAge: 18,
  moduleVersion: "1.1.0",
  version: "1.1.0",
  learningObjectives: [
    "Understand core concepts in General Relativity",
    "Apply Spacetime Reasoning strategies through guided practice",
    "Demonstrate mastery with subject-specific quizzes"
  ],
  lessons: [
    {
      id: "general-relativity-101-l01",
      title: "Classical vs Relativistic Thinking",
      type: "video",
      duration: 10,
      learningAids: [
        { id: "general-relativity-101-l01-a1", type: "image", title: "Concept Poster", content: "A colorful infographic about frames of reference and spacetime." },
        { id: "general-relativity-101-l01-a2", type: "animation", title: "Warm-up Animation", content: "Short animation introducing General Relativity vocabulary." }
      ]
    },
    {
      id: "general-relativity-101-l02",
      title: "Space and Time Together",
      type: "interactive",
      duration: 12,
      metadata: {
        prompts: [
          "Identify one core idea about frames of reference from this lesson.",
          "Explain where spacetime appears in real life.",
          "Describe one question you still have about spacetime concepts."
        ]
      },
      learningAids: [
        { id: "general-relativity-101-l02-a1", type: "practice", title: "Try It Board", content: "Complete a guided activity on spacetime and write one reflection." }
      ]
    },
    {
      id: "general-relativity-101-l03",
      title: "Checkpoint: Relativity Basics",
      type: "quiz",
      duration: 10,
      questions: [
        {
          id: "general-relativity-101-l03-q1",
          text: "Which statement best explains frames of reference in General Relativity?",
          skillId: "general-relativity-101-skill-core",
          options: [
            { id: "a", text: "It explains frames of reference using evidence from the lesson." },
            { id: "b", text: "It ignores how frames of reference works in practice." },
            { id: "c", text: "It focuses on an unrelated topic outside General Relativity." },
            { id: "d", text: "It repeats terms without showing meaning." }
          ],
          correctOptionId: "a"
        },
        {
          id: "general-relativity-101-l03-q2",
          text: "What is the best first step when analyzing spacetime?",
          skillId: "general-relativity-101-skill-process",
          options: [
            { id: "a", text: "Define the goal and examine evidence for spacetime." },
            { id: "b", text: "Guess quickly without checking evidence." },
            { id: "c", text: "Use data unrelated to spacetime." },
            { id: "d", text: "Skip the context and jump to a conclusion." }
          ],
          correctOptionId: "a"
        },
        {
          id: "general-relativity-101-l03-q3",
          text: "Which option shows strong reasoning about spacetime concepts?",
          skillId: "general-relativity-101-skill-reasoning",
          options: [
            { id: "a", text: "Use examples and verify assumptions step by step." },
            { id: "b", text: "Ignore important details and edge cases." },
            { id: "c", text: "Use assumptions unrelated to spacetime concepts." },
            { id: "d", text: "Change the topic when evidence gets hard." }
          ],
          correctOptionId: "a"
        },
        {
          id: "general-relativity-101-l03-q4",
          text: "Why is spaced review useful for General Relativity mastery?",
          skillId: "general-relativity-101-skill-review",
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
        { id: "general-relativity-101-l03-a1", type: "mnemonic", title: "Memory Tip", content: "Use the phrase Plan, Check, Explain for each question." }
      ]
    },
    {
      id: "general-relativity-101-l04",
      title: "Gravity as Curvature",
      type: "video",
      duration: 11,
      learningAids: [
        { id: "general-relativity-101-l04-a1", type: "image", title: "Worked Example Sheet", content: "Step-by-step visuals for gravity curvature scenarios." }
      ]
    },
    {
      id: "general-relativity-101-l05",
      title: "Black Holes and Lensing",
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
        { id: "general-relativity-101-l05-a1", type: "animation", title: "Challenge Walkthrough", content: "Animated sequence for solving a gravity curvature challenge." }
      ]
    },
    {
      id: "general-relativity-101-l06",
      title: "Checkpoint: Spacetime Reasoning",
      type: "quiz",
      duration: 10,
      questions: [
        {
          id: "general-relativity-101-l06-q1",
          text: "Which statement best explains gravity curvature in General Relativity?",
          skillId: "general-relativity-101-skill-core",
          options: [
            { id: "a", text: "It explains gravity curvature using evidence from the lesson." },
            { id: "b", text: "It ignores how gravity curvature works in practice." },
            { id: "c", text: "It focuses on an unrelated topic outside General Relativity." },
            { id: "d", text: "It repeats terms without showing meaning." }
          ],
          correctOptionId: "a"
        },
        {
          id: "general-relativity-101-l06-q2",
          text: "What is the best first step when analyzing evidence?",
          skillId: "general-relativity-101-skill-process",
          options: [
            { id: "a", text: "Define the goal and examine evidence for evidence." },
            { id: "b", text: "Guess quickly without checking evidence." },
            { id: "c", text: "Use data unrelated to evidence." },
            { id: "d", text: "Skip the context and jump to a conclusion." }
          ],
          correctOptionId: "a"
        },
        {
          id: "general-relativity-101-l06-q3",
          text: "Which option shows strong reasoning about spacetime concepts?",
          skillId: "general-relativity-101-skill-reasoning",
          options: [
            { id: "a", text: "Use examples and verify assumptions step by step." },
            { id: "b", text: "Ignore important details and edge cases." },
            { id: "c", text: "Use assumptions unrelated to spacetime concepts." },
            { id: "d", text: "Change the topic when evidence gets hard." }
          ],
          correctOptionId: "a"
        },
        {
          id: "general-relativity-101-l06-q4",
          text: "Why is spaced review useful for General Relativity mastery?",
          skillId: "general-relativity-101-skill-review",
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
        { id: "general-relativity-101-l06-a1", type: "mnemonic", title: "Memory Tip", content: "Use the phrase Plan, Check, Explain for each question." }
      ]
    },
    {
      id: "general-relativity-101-l07",
      title: "Cosmology Connections",
      type: "video",
      duration: 12,
      learningAids: [
        { id: "general-relativity-101-l07-a1", type: "practice", title: "Project Planner", content: "Template for planning a mini project focused on evidence." }
      ]
    },
    {
      id: "general-relativity-101-l08",
      title: "Thought Experiment Activity",
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
        { id: "general-relativity-101-l08-a1", type: "mnemonic", title: "Reflection Cycle", content: "Remember Observe, Adjust, Repeat while practicing." }
      ]
    },
    {
      id: "general-relativity-101-l09",
      title: "Review: Relativity Concepts",
      type: "quiz",
      duration: 10,
      questions: [
        {
          id: "general-relativity-101-l09-q1",
          text: "Which statement best explains spacetime in General Relativity?",
          skillId: "general-relativity-101-skill-core",
          options: [
            { id: "a", text: "It explains spacetime using evidence from the lesson." },
            { id: "b", text: "It ignores how spacetime works in practice." },
            { id: "c", text: "It focuses on an unrelated topic outside General Relativity." },
            { id: "d", text: "It repeats terms without showing meaning." }
          ],
          correctOptionId: "a"
        },
        {
          id: "general-relativity-101-l09-q2",
          text: "What is the best first step when analyzing evidence?",
          skillId: "general-relativity-101-skill-process",
          options: [
            { id: "a", text: "Define the goal and examine evidence for evidence." },
            { id: "b", text: "Guess quickly without checking evidence." },
            { id: "c", text: "Use data unrelated to evidence." },
            { id: "d", text: "Skip the context and jump to a conclusion." }
          ],
          correctOptionId: "a"
        },
        {
          id: "general-relativity-101-l09-q3",
          text: "Which option shows strong reasoning about spacetime concepts?",
          skillId: "general-relativity-101-skill-reasoning",
          options: [
            { id: "a", text: "Use examples and verify assumptions step by step." },
            { id: "b", text: "Ignore important details and edge cases." },
            { id: "c", text: "Use assumptions unrelated to spacetime concepts." },
            { id: "d", text: "Change the topic when evidence gets hard." }
          ],
          correctOptionId: "a"
        },
        {
          id: "general-relativity-101-l09-q4",
          text: "Why is spaced review useful for General Relativity mastery?",
          skillId: "general-relativity-101-skill-review",
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
        { id: "general-relativity-101-l09-a1", type: "mnemonic", title: "Memory Tip", content: "Use the phrase Plan, Check, Explain for each question." }
      ]
    },
    {
      id: "general-relativity-101-l10",
      title: "Mastery: General Relativity",
      type: "quiz",
      duration: 10,
      questions: [
        {
          id: "general-relativity-101-l10-q1",
          text: "Which statement best explains frames of reference in General Relativity?",
          skillId: "general-relativity-101-skill-core",
          options: [
            { id: "a", text: "It explains frames of reference using evidence from the lesson." },
            { id: "b", text: "It ignores how frames of reference works in practice." },
            { id: "c", text: "It focuses on an unrelated topic outside General Relativity." },
            { id: "d", text: "It repeats terms without showing meaning." }
          ],
          correctOptionId: "a"
        },
        {
          id: "general-relativity-101-l10-q2",
          text: "What is the best first step when analyzing gravity curvature?",
          skillId: "general-relativity-101-skill-process",
          options: [
            { id: "a", text: "Define the goal and examine evidence for gravity curvature." },
            { id: "b", text: "Guess quickly without checking evidence." },
            { id: "c", text: "Use data unrelated to gravity curvature." },
            { id: "d", text: "Skip the context and jump to a conclusion." }
          ],
          correctOptionId: "a"
        },
        {
          id: "general-relativity-101-l10-q3",
          text: "Which option shows strong reasoning about spacetime concepts?",
          skillId: "general-relativity-101-skill-reasoning",
          options: [
            { id: "a", text: "Use examples and verify assumptions step by step." },
            { id: "b", text: "Ignore important details and edge cases." },
            { id: "c", text: "Use assumptions unrelated to spacetime concepts." },
            { id: "d", text: "Change the topic when evidence gets hard." }
          ],
          correctOptionId: "a"
        },
        {
          id: "general-relativity-101-l10-q4",
          text: "Why is spaced review useful for General Relativity mastery?",
          skillId: "general-relativity-101-skill-review",
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
        { id: "general-relativity-101-l10-a1", type: "mnemonic", title: "Memory Tip", content: "Use the phrase Plan, Check, Explain for each question." }
      ]
    }
  ],
};
