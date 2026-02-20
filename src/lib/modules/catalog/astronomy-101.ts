import type { LearningModule } from "@/lib/modules/types";

export const Astronomy101Module: LearningModule = {
  id: "astronomy-101",
  title: "Astronomy Explorer",
  description: "Explore stars, planets, galaxies, and observation of the night sky.",
  subject: "Astronomy",
  tags: ["core", "curriculum", "interactive"],
  minAge: 7,
  maxAge: 18,
  moduleVersion: "1.1.0",
  version: "1.1.0",
  learningObjectives: [
    "Understand core concepts in Astronomy",
    "Apply Space Concepts strategies through guided practice",
    "Demonstrate mastery with subject-specific quizzes"
  ],
  lessons: [
    {
      id: "astronomy-101-l01",
      title: "Our Solar System",
      type: "video",
      duration: 10,
      learningAids: [
        { id: "astronomy-101-l01-a1", type: "image", title: "Concept Poster", content: "A colorful infographic about solar system and stars." },
        { id: "astronomy-101-l01-a2", type: "animation", title: "Warm-up Animation", content: "Short animation introducing Astronomy vocabulary." }
      ]
    },
    {
      id: "astronomy-101-l02",
      title: "Stars and Constellations",
      type: "interactive",
      duration: 12,
      metadata: {
        prompts: [
          "Identify one core idea about solar system from this lesson.",
          "Explain where stars appears in real life.",
          "Describe one question you still have about space observation."
        ]
      },
      learningAids: [
        { id: "astronomy-101-l02-a1", type: "practice", title: "Try It Board", content: "Complete a guided activity on stars and write one reflection." }
      ]
    },
    {
      id: "astronomy-101-l03",
      title: "Checkpoint: Sky Basics",
      type: "quiz",
      duration: 10,
      questions: [
        {
          id: "astronomy-101-l03-q1",
          text: "Which statement best explains solar system in Astronomy?",
          skillId: "astronomy-101-skill-core",
          options: [
            { id: "a", text: "It explains solar system using evidence from the lesson." },
            { id: "b", text: "It ignores how solar system works in practice." },
            { id: "c", text: "It focuses on an unrelated topic outside Astronomy." },
            { id: "d", text: "It repeats terms without showing meaning." }
          ],
          correctOptionId: "a"
        },
        {
          id: "astronomy-101-l03-q2",
          text: "What is the best first step when analyzing stars?",
          skillId: "astronomy-101-skill-process",
          options: [
            { id: "a", text: "Define the goal and examine evidence for stars." },
            { id: "b", text: "Guess quickly without checking evidence." },
            { id: "c", text: "Use data unrelated to stars." },
            { id: "d", text: "Skip the context and jump to a conclusion." }
          ],
          correctOptionId: "a"
        },
        {
          id: "astronomy-101-l03-q3",
          text: "Which option shows strong reasoning about space observation?",
          skillId: "astronomy-101-skill-reasoning",
          options: [
            { id: "a", text: "Use examples and verify assumptions step by step." },
            { id: "b", text: "Ignore important details and edge cases." },
            { id: "c", text: "Use assumptions unrelated to space observation." },
            { id: "d", text: "Change the topic when evidence gets hard." }
          ],
          correctOptionId: "a"
        },
        {
          id: "astronomy-101-l03-q4",
          text: "Why is spaced review useful for Astronomy mastery?",
          skillId: "astronomy-101-skill-review",
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
        { id: "astronomy-101-l03-a1", type: "mnemonic", title: "Memory Tip", content: "Use the phrase Plan, Check, Explain for each question." }
      ]
    },
    {
      id: "astronomy-101-l04",
      title: "Planets and Orbits",
      type: "video",
      duration: 11,
      learningAids: [
        { id: "astronomy-101-l04-a1", type: "image", title: "Worked Example Sheet", content: "Step-by-step visuals for galaxies scenarios." }
      ]
    },
    {
      id: "astronomy-101-l05",
      title: "Galaxies and Scale",
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
        { id: "astronomy-101-l05-a1", type: "animation", title: "Challenge Walkthrough", content: "Animated sequence for solving a galaxies challenge." }
      ]
    },
    {
      id: "astronomy-101-l06",
      title: "Checkpoint: Space Concepts",
      type: "quiz",
      duration: 10,
      questions: [
        {
          id: "astronomy-101-l06-q1",
          text: "Which statement best explains galaxies in Astronomy?",
          skillId: "astronomy-101-skill-core",
          options: [
            { id: "a", text: "It explains galaxies using evidence from the lesson." },
            { id: "b", text: "It ignores how galaxies works in practice." },
            { id: "c", text: "It focuses on an unrelated topic outside Astronomy." },
            { id: "d", text: "It repeats terms without showing meaning." }
          ],
          correctOptionId: "a"
        },
        {
          id: "astronomy-101-l06-q2",
          text: "What is the best first step when analyzing observation methods?",
          skillId: "astronomy-101-skill-process",
          options: [
            { id: "a", text: "Define the goal and examine evidence for observation methods." },
            { id: "b", text: "Guess quickly without checking evidence." },
            { id: "c", text: "Use data unrelated to observation methods." },
            { id: "d", text: "Skip the context and jump to a conclusion." }
          ],
          correctOptionId: "a"
        },
        {
          id: "astronomy-101-l06-q3",
          text: "Which option shows strong reasoning about space observation?",
          skillId: "astronomy-101-skill-reasoning",
          options: [
            { id: "a", text: "Use examples and verify assumptions step by step." },
            { id: "b", text: "Ignore important details and edge cases." },
            { id: "c", text: "Use assumptions unrelated to space observation." },
            { id: "d", text: "Change the topic when evidence gets hard." }
          ],
          correctOptionId: "a"
        },
        {
          id: "astronomy-101-l06-q4",
          text: "Why is spaced review useful for Astronomy mastery?",
          skillId: "astronomy-101-skill-review",
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
        { id: "astronomy-101-l06-a1", type: "mnemonic", title: "Memory Tip", content: "Use the phrase Plan, Check, Explain for each question." }
      ]
    },
    {
      id: "astronomy-101-l07",
      title: "Telescopes and Tools",
      type: "video",
      duration: 12,
      learningAids: [
        { id: "astronomy-101-l07-a1", type: "practice", title: "Project Planner", content: "Template for planning a mini project focused on observation methods." }
      ]
    },
    {
      id: "astronomy-101-l08",
      title: "Night Sky Activity",
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
        { id: "astronomy-101-l08-a1", type: "mnemonic", title: "Reflection Cycle", content: "Remember Observe, Adjust, Repeat while practicing." }
      ]
    },
    {
      id: "astronomy-101-l09",
      title: "Review: Astronomy Topics",
      type: "quiz",
      duration: 10,
      questions: [
        {
          id: "astronomy-101-l09-q1",
          text: "Which statement best explains stars in Astronomy?",
          skillId: "astronomy-101-skill-core",
          options: [
            { id: "a", text: "It explains stars using evidence from the lesson." },
            { id: "b", text: "It ignores how stars works in practice." },
            { id: "c", text: "It focuses on an unrelated topic outside Astronomy." },
            { id: "d", text: "It repeats terms without showing meaning." }
          ],
          correctOptionId: "a"
        },
        {
          id: "astronomy-101-l09-q2",
          text: "What is the best first step when analyzing observation methods?",
          skillId: "astronomy-101-skill-process",
          options: [
            { id: "a", text: "Define the goal and examine evidence for observation methods." },
            { id: "b", text: "Guess quickly without checking evidence." },
            { id: "c", text: "Use data unrelated to observation methods." },
            { id: "d", text: "Skip the context and jump to a conclusion." }
          ],
          correctOptionId: "a"
        },
        {
          id: "astronomy-101-l09-q3",
          text: "Which option shows strong reasoning about space observation?",
          skillId: "astronomy-101-skill-reasoning",
          options: [
            { id: "a", text: "Use examples and verify assumptions step by step." },
            { id: "b", text: "Ignore important details and edge cases." },
            { id: "c", text: "Use assumptions unrelated to space observation." },
            { id: "d", text: "Change the topic when evidence gets hard." }
          ],
          correctOptionId: "a"
        },
        {
          id: "astronomy-101-l09-q4",
          text: "Why is spaced review useful for Astronomy mastery?",
          skillId: "astronomy-101-skill-review",
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
        { id: "astronomy-101-l09-a1", type: "mnemonic", title: "Memory Tip", content: "Use the phrase Plan, Check, Explain for each question." }
      ]
    },
    {
      id: "astronomy-101-l10",
      title: "Mastery: Astronomy",
      type: "quiz",
      duration: 10,
      questions: [
        {
          id: "astronomy-101-l10-q1",
          text: "Which statement best explains solar system in Astronomy?",
          skillId: "astronomy-101-skill-core",
          options: [
            { id: "a", text: "It explains solar system using evidence from the lesson." },
            { id: "b", text: "It ignores how solar system works in practice." },
            { id: "c", text: "It focuses on an unrelated topic outside Astronomy." },
            { id: "d", text: "It repeats terms without showing meaning." }
          ],
          correctOptionId: "a"
        },
        {
          id: "astronomy-101-l10-q2",
          text: "What is the best first step when analyzing galaxies?",
          skillId: "astronomy-101-skill-process",
          options: [
            { id: "a", text: "Define the goal and examine evidence for galaxies." },
            { id: "b", text: "Guess quickly without checking evidence." },
            { id: "c", text: "Use data unrelated to galaxies." },
            { id: "d", text: "Skip the context and jump to a conclusion." }
          ],
          correctOptionId: "a"
        },
        {
          id: "astronomy-101-l10-q3",
          text: "Which option shows strong reasoning about space observation?",
          skillId: "astronomy-101-skill-reasoning",
          options: [
            { id: "a", text: "Use examples and verify assumptions step by step." },
            { id: "b", text: "Ignore important details and edge cases." },
            { id: "c", text: "Use assumptions unrelated to space observation." },
            { id: "d", text: "Change the topic when evidence gets hard." }
          ],
          correctOptionId: "a"
        },
        {
          id: "astronomy-101-l10-q4",
          text: "Why is spaced review useful for Astronomy mastery?",
          skillId: "astronomy-101-skill-review",
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
        { id: "astronomy-101-l10-a1", type: "mnemonic", title: "Memory Tip", content: "Use the phrase Plan, Check, Explain for each question." }
      ]
    }
  ],
};
