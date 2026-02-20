import type { LearningModule } from "@/lib/modules/types";

export const Physics101Module: LearningModule = {
  id: "physics-101",
  title: "Physics Essentials",
  description: "Study motion, forces, energy, waves, and practical physics applications.",
  subject: "Physics",
  tags: ["core", "curriculum", "interactive"],
  minAge: 7,
  maxAge: 18,
  moduleVersion: "1.1.0",
  version: "1.1.0",
  learningObjectives: [
    "Understand core concepts in Physics",
    "Apply Energy Transfer strategies through guided practice",
    "Demonstrate mastery with subject-specific quizzes"
  ],
  lessons: [
    {
      id: "physics-101-l01",
      title: "Motion and Speed",
      type: "video",
      duration: 10,
      learningAids: [
        { id: "physics-101-l01-a1", type: "image", title: "Concept Poster", content: "A colorful infographic about motion and forces." },
        { id: "physics-101-l01-a2", type: "animation", title: "Warm-up Animation", content: "Short animation introducing Physics vocabulary." }
      ]
    },
    {
      id: "physics-101-l02",
      title: "Forces and Newton Laws",
      type: "interactive",
      duration: 12,
      metadata: {
        prompts: [
          "Identify one core idea about motion from this lesson.",
          "Explain where forces appears in real life.",
          "Describe one question you still have about motion and energy."
        ]
      },
      learningAids: [
        { id: "physics-101-l02-a1", type: "practice", title: "Try It Board", content: "Complete a guided activity on forces and write one reflection." }
      ]
    },
    {
      id: "physics-101-l03",
      title: "Checkpoint: Motion Concepts",
      type: "quiz",
      duration: 10,
      questions: [
        {
          id: "physics-101-l03-q1",
          text: "Which statement best explains motion in Physics?",
          skillId: "physics-101-skill-core",
          options: [
            { id: "a", text: "It explains motion using evidence from the lesson." },
            { id: "b", text: "It ignores how motion works in practice." },
            { id: "c", text: "It focuses on an unrelated topic outside Physics." },
            { id: "d", text: "It repeats terms without showing meaning." }
          ],
          correctOptionId: "a"
        },
        {
          id: "physics-101-l03-q2",
          text: "What is the best first step when analyzing forces?",
          skillId: "physics-101-skill-process",
          options: [
            { id: "a", text: "Define the goal and examine evidence for forces." },
            { id: "b", text: "Guess quickly without checking evidence." },
            { id: "c", text: "Use data unrelated to forces." },
            { id: "d", text: "Skip the context and jump to a conclusion." }
          ],
          correctOptionId: "a"
        },
        {
          id: "physics-101-l03-q3",
          text: "Which option shows strong reasoning about motion and energy?",
          skillId: "physics-101-skill-reasoning",
          options: [
            { id: "a", text: "Use examples and verify assumptions step by step." },
            { id: "b", text: "Ignore important details and edge cases." },
            { id: "c", text: "Use assumptions unrelated to motion and energy." },
            { id: "d", text: "Change the topic when evidence gets hard." }
          ],
          correctOptionId: "a"
        },
        {
          id: "physics-101-l03-q4",
          text: "Why is spaced review useful for Physics mastery?",
          skillId: "physics-101-skill-review",
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
        { id: "physics-101-l03-a1", type: "mnemonic", title: "Memory Tip", content: "Use the phrase Plan, Check, Explain for each question." }
      ]
    },
    {
      id: "physics-101-l04",
      title: "Work and Energy",
      type: "video",
      duration: 11,
      learningAids: [
        { id: "physics-101-l04-a1", type: "image", title: "Worked Example Sheet", content: "Step-by-step visuals for energy transfer scenarios." }
      ]
    },
    {
      id: "physics-101-l05",
      title: "Waves and Sound",
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
        { id: "physics-101-l05-a1", type: "animation", title: "Challenge Walkthrough", content: "Animated sequence for solving a energy transfer challenge." }
      ]
    },
    {
      id: "physics-101-l06",
      title: "Checkpoint: Energy Transfer",
      type: "quiz",
      duration: 10,
      questions: [
        {
          id: "physics-101-l06-q1",
          text: "Which statement best explains energy transfer in Physics?",
          skillId: "physics-101-skill-core",
          options: [
            { id: "a", text: "It explains energy transfer using evidence from the lesson." },
            { id: "b", text: "It ignores how energy transfer works in practice." },
            { id: "c", text: "It focuses on an unrelated topic outside Physics." },
            { id: "d", text: "It repeats terms without showing meaning." }
          ],
          correctOptionId: "a"
        },
        {
          id: "physics-101-l06-q2",
          text: "What is the best first step when analyzing waves?",
          skillId: "physics-101-skill-process",
          options: [
            { id: "a", text: "Define the goal and examine evidence for waves." },
            { id: "b", text: "Guess quickly without checking evidence." },
            { id: "c", text: "Use data unrelated to waves." },
            { id: "d", text: "Skip the context and jump to a conclusion." }
          ],
          correctOptionId: "a"
        },
        {
          id: "physics-101-l06-q3",
          text: "Which option shows strong reasoning about motion and energy?",
          skillId: "physics-101-skill-reasoning",
          options: [
            { id: "a", text: "Use examples and verify assumptions step by step." },
            { id: "b", text: "Ignore important details and edge cases." },
            { id: "c", text: "Use assumptions unrelated to motion and energy." },
            { id: "d", text: "Change the topic when evidence gets hard." }
          ],
          correctOptionId: "a"
        },
        {
          id: "physics-101-l06-q4",
          text: "Why is spaced review useful for Physics mastery?",
          skillId: "physics-101-skill-review",
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
        { id: "physics-101-l06-a1", type: "mnemonic", title: "Memory Tip", content: "Use the phrase Plan, Check, Explain for each question." }
      ]
    },
    {
      id: "physics-101-l07",
      title: "Electricity Basics",
      type: "video",
      duration: 12,
      learningAids: [
        { id: "physics-101-l07-a1", type: "practice", title: "Project Planner", content: "Template for planning a mini project focused on waves." }
      ]
    },
    {
      id: "physics-101-l08",
      title: "Physics Challenge Lab",
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
        { id: "physics-101-l08-a1", type: "mnemonic", title: "Reflection Cycle", content: "Remember Observe, Adjust, Repeat while practicing." }
      ]
    },
    {
      id: "physics-101-l09",
      title: "Review: Physics Principles",
      type: "quiz",
      duration: 10,
      questions: [
        {
          id: "physics-101-l09-q1",
          text: "Which statement best explains forces in Physics?",
          skillId: "physics-101-skill-core",
          options: [
            { id: "a", text: "It explains forces using evidence from the lesson." },
            { id: "b", text: "It ignores how forces works in practice." },
            { id: "c", text: "It focuses on an unrelated topic outside Physics." },
            { id: "d", text: "It repeats terms without showing meaning." }
          ],
          correctOptionId: "a"
        },
        {
          id: "physics-101-l09-q2",
          text: "What is the best first step when analyzing waves?",
          skillId: "physics-101-skill-process",
          options: [
            { id: "a", text: "Define the goal and examine evidence for waves." },
            { id: "b", text: "Guess quickly without checking evidence." },
            { id: "c", text: "Use data unrelated to waves." },
            { id: "d", text: "Skip the context and jump to a conclusion." }
          ],
          correctOptionId: "a"
        },
        {
          id: "physics-101-l09-q3",
          text: "Which option shows strong reasoning about motion and energy?",
          skillId: "physics-101-skill-reasoning",
          options: [
            { id: "a", text: "Use examples and verify assumptions step by step." },
            { id: "b", text: "Ignore important details and edge cases." },
            { id: "c", text: "Use assumptions unrelated to motion and energy." },
            { id: "d", text: "Change the topic when evidence gets hard." }
          ],
          correctOptionId: "a"
        },
        {
          id: "physics-101-l09-q4",
          text: "Why is spaced review useful for Physics mastery?",
          skillId: "physics-101-skill-review",
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
        { id: "physics-101-l09-a1", type: "mnemonic", title: "Memory Tip", content: "Use the phrase Plan, Check, Explain for each question." }
      ]
    },
    {
      id: "physics-101-l10",
      title: "Mastery: Physics",
      type: "quiz",
      duration: 10,
      questions: [
        {
          id: "physics-101-l10-q1",
          text: "Which statement best explains motion in Physics?",
          skillId: "physics-101-skill-core",
          options: [
            { id: "a", text: "It explains motion using evidence from the lesson." },
            { id: "b", text: "It ignores how motion works in practice." },
            { id: "c", text: "It focuses on an unrelated topic outside Physics." },
            { id: "d", text: "It repeats terms without showing meaning." }
          ],
          correctOptionId: "a"
        },
        {
          id: "physics-101-l10-q2",
          text: "What is the best first step when analyzing energy transfer?",
          skillId: "physics-101-skill-process",
          options: [
            { id: "a", text: "Define the goal and examine evidence for energy transfer." },
            { id: "b", text: "Guess quickly without checking evidence." },
            { id: "c", text: "Use data unrelated to energy transfer." },
            { id: "d", text: "Skip the context and jump to a conclusion." }
          ],
          correctOptionId: "a"
        },
        {
          id: "physics-101-l10-q3",
          text: "Which option shows strong reasoning about motion and energy?",
          skillId: "physics-101-skill-reasoning",
          options: [
            { id: "a", text: "Use examples and verify assumptions step by step." },
            { id: "b", text: "Ignore important details and edge cases." },
            { id: "c", text: "Use assumptions unrelated to motion and energy." },
            { id: "d", text: "Change the topic when evidence gets hard." }
          ],
          correctOptionId: "a"
        },
        {
          id: "physics-101-l10-q4",
          text: "Why is spaced review useful for Physics mastery?",
          skillId: "physics-101-skill-review",
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
        { id: "physics-101-l10-a1", type: "mnemonic", title: "Memory Tip", content: "Use the phrase Plan, Check, Explain for each question." }
      ]
    }
  ],
};
