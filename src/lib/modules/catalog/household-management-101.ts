import type { LearningModule } from "@/lib/modules/types";

export const HouseholdManagement101Module: LearningModule = {
  id: "household-management-101",
  title: "Household Management Skills",
  description: "Build practical skills for home routines, planning, organization, and safety.",
  subject: "Household Management",
  tags: ["core", "curriculum", "interactive"],
  minAge: 7,
  maxAge: 18,
  moduleVersion: "1.1.0",
  version: "1.1.0",
  learningObjectives: [
    "Understand core concepts in Household Management",
    "Apply Home Logistics strategies through guided practice",
    "Demonstrate mastery with subject-specific quizzes"
  ],
  lessons: [
    {
      id: "household-management-101-l01",
      title: "Daily Home Routines",
      type: "video",
      duration: 10,
      learningAids: [
        { id: "household-management-101-l01-a1", type: "image", title: "Concept Poster", content: "A colorful infographic about schedules and cleaning systems." },
        { id: "household-management-101-l01-a2", type: "animation", title: "Warm-up Animation", content: "Short animation introducing Household Management vocabulary." }
      ]
    },
    {
      id: "household-management-101-l02",
      title: "Time and Task Planning",
      type: "interactive",
      duration: 12,
      metadata: {
        prompts: [
          "Identify one core idea about schedules from this lesson.",
          "Explain where cleaning systems appears in real life.",
          "Describe one question you still have about home planning."
        ]
      },
      learningAids: [
        { id: "household-management-101-l02-a1", type: "practice", title: "Try It Board", content: "Complete a guided activity on cleaning systems and write one reflection." }
      ]
    },
    {
      id: "household-management-101-l03",
      title: "Checkpoint: Routine Systems",
      type: "quiz",
      duration: 10,
      questions: [
        {
          id: "household-management-101-l03-q1",
          text: "Which statement best explains schedules in Household Management?",
          skillId: "household-management-101-skill-core",
          options: [
            { id: "a", text: "It explains schedules using evidence from the lesson." },
            { id: "b", text: "It ignores how schedules works in practice." },
            { id: "c", text: "It focuses on an unrelated topic outside Household Management." },
            { id: "d", text: "It repeats terms without showing meaning." }
          ],
          correctOptionId: "a"
        },
        {
          id: "household-management-101-l03-q2",
          text: "What is the best first step when analyzing cleaning systems?",
          skillId: "household-management-101-skill-process",
          options: [
            { id: "a", text: "Define the goal and examine evidence for cleaning systems." },
            { id: "b", text: "Guess quickly without checking evidence." },
            { id: "c", text: "Use data unrelated to cleaning systems." },
            { id: "d", text: "Skip the context and jump to a conclusion." }
          ],
          correctOptionId: "a"
        },
        {
          id: "household-management-101-l03-q3",
          text: "Which option shows strong reasoning about home planning?",
          skillId: "household-management-101-skill-reasoning",
          options: [
            { id: "a", text: "Use examples and verify assumptions step by step." },
            { id: "b", text: "Ignore important details and edge cases." },
            { id: "c", text: "Use assumptions unrelated to home planning." },
            { id: "d", text: "Change the topic when evidence gets hard." }
          ],
          correctOptionId: "a"
        },
        {
          id: "household-management-101-l03-q4",
          text: "Why is spaced review useful for Household Management mastery?",
          skillId: "household-management-101-skill-review",
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
        { id: "household-management-101-l03-a1", type: "mnemonic", title: "Memory Tip", content: "Use the phrase Plan, Check, Explain for each question." }
      ]
    },
    {
      id: "household-management-101-l04",
      title: "Meal and Supply Planning",
      type: "video",
      duration: 11,
      learningAids: [
        { id: "household-management-101-l04-a1", type: "image", title: "Worked Example Sheet", content: "Step-by-step visuals for meal planning scenarios." }
      ]
    },
    {
      id: "household-management-101-l05",
      title: "Cleaning and Organization",
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
        { id: "household-management-101-l05-a1", type: "animation", title: "Challenge Walkthrough", content: "Animated sequence for solving a meal planning challenge." }
      ]
    },
    {
      id: "household-management-101-l06",
      title: "Checkpoint: Home Logistics",
      type: "quiz",
      duration: 10,
      questions: [
        {
          id: "household-management-101-l06-q1",
          text: "Which statement best explains meal planning in Household Management?",
          skillId: "household-management-101-skill-core",
          options: [
            { id: "a", text: "It explains meal planning using evidence from the lesson." },
            { id: "b", text: "It ignores how meal planning works in practice." },
            { id: "c", text: "It focuses on an unrelated topic outside Household Management." },
            { id: "d", text: "It repeats terms without showing meaning." }
          ],
          correctOptionId: "a"
        },
        {
          id: "household-management-101-l06-q2",
          text: "What is the best first step when analyzing home safety?",
          skillId: "household-management-101-skill-process",
          options: [
            { id: "a", text: "Define the goal and examine evidence for home safety." },
            { id: "b", text: "Guess quickly without checking evidence." },
            { id: "c", text: "Use data unrelated to home safety." },
            { id: "d", text: "Skip the context and jump to a conclusion." }
          ],
          correctOptionId: "a"
        },
        {
          id: "household-management-101-l06-q3",
          text: "Which option shows strong reasoning about home planning?",
          skillId: "household-management-101-skill-reasoning",
          options: [
            { id: "a", text: "Use examples and verify assumptions step by step." },
            { id: "b", text: "Ignore important details and edge cases." },
            { id: "c", text: "Use assumptions unrelated to home planning." },
            { id: "d", text: "Change the topic when evidence gets hard." }
          ],
          correctOptionId: "a"
        },
        {
          id: "household-management-101-l06-q4",
          text: "Why is spaced review useful for Household Management mastery?",
          skillId: "household-management-101-skill-review",
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
        { id: "household-management-101-l06-a1", type: "mnemonic", title: "Memory Tip", content: "Use the phrase Plan, Check, Explain for each question." }
      ]
    },
    {
      id: "household-management-101-l07",
      title: "Safety and Emergency Prep",
      type: "video",
      duration: 12,
      learningAids: [
        { id: "household-management-101-l07-a1", type: "practice", title: "Project Planner", content: "Template for planning a mini project focused on home safety." }
      ]
    },
    {
      id: "household-management-101-l08",
      title: "Family Coordination Activity",
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
        { id: "household-management-101-l08-a1", type: "mnemonic", title: "Reflection Cycle", content: "Remember Observe, Adjust, Repeat while practicing." }
      ]
    },
    {
      id: "household-management-101-l09",
      title: "Review: Household Skills",
      type: "quiz",
      duration: 10,
      questions: [
        {
          id: "household-management-101-l09-q1",
          text: "Which statement best explains cleaning systems in Household Management?",
          skillId: "household-management-101-skill-core",
          options: [
            { id: "a", text: "It explains cleaning systems using evidence from the lesson." },
            { id: "b", text: "It ignores how cleaning systems works in practice." },
            { id: "c", text: "It focuses on an unrelated topic outside Household Management." },
            { id: "d", text: "It repeats terms without showing meaning." }
          ],
          correctOptionId: "a"
        },
        {
          id: "household-management-101-l09-q2",
          text: "What is the best first step when analyzing home safety?",
          skillId: "household-management-101-skill-process",
          options: [
            { id: "a", text: "Define the goal and examine evidence for home safety." },
            { id: "b", text: "Guess quickly without checking evidence." },
            { id: "c", text: "Use data unrelated to home safety." },
            { id: "d", text: "Skip the context and jump to a conclusion." }
          ],
          correctOptionId: "a"
        },
        {
          id: "household-management-101-l09-q3",
          text: "Which option shows strong reasoning about home planning?",
          skillId: "household-management-101-skill-reasoning",
          options: [
            { id: "a", text: "Use examples and verify assumptions step by step." },
            { id: "b", text: "Ignore important details and edge cases." },
            { id: "c", text: "Use assumptions unrelated to home planning." },
            { id: "d", text: "Change the topic when evidence gets hard." }
          ],
          correctOptionId: "a"
        },
        {
          id: "household-management-101-l09-q4",
          text: "Why is spaced review useful for Household Management mastery?",
          skillId: "household-management-101-skill-review",
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
        { id: "household-management-101-l09-a1", type: "mnemonic", title: "Memory Tip", content: "Use the phrase Plan, Check, Explain for each question." }
      ]
    },
    {
      id: "household-management-101-l10",
      title: "Mastery: Household Management",
      type: "quiz",
      duration: 10,
      questions: [
        {
          id: "household-management-101-l10-q1",
          text: "Which statement best explains schedules in Household Management?",
          skillId: "household-management-101-skill-core",
          options: [
            { id: "a", text: "It explains schedules using evidence from the lesson." },
            { id: "b", text: "It ignores how schedules works in practice." },
            { id: "c", text: "It focuses on an unrelated topic outside Household Management." },
            { id: "d", text: "It repeats terms without showing meaning." }
          ],
          correctOptionId: "a"
        },
        {
          id: "household-management-101-l10-q2",
          text: "What is the best first step when analyzing meal planning?",
          skillId: "household-management-101-skill-process",
          options: [
            { id: "a", text: "Define the goal and examine evidence for meal planning." },
            { id: "b", text: "Guess quickly without checking evidence." },
            { id: "c", text: "Use data unrelated to meal planning." },
            { id: "d", text: "Skip the context and jump to a conclusion." }
          ],
          correctOptionId: "a"
        },
        {
          id: "household-management-101-l10-q3",
          text: "Which option shows strong reasoning about home planning?",
          skillId: "household-management-101-skill-reasoning",
          options: [
            { id: "a", text: "Use examples and verify assumptions step by step." },
            { id: "b", text: "Ignore important details and edge cases." },
            { id: "c", text: "Use assumptions unrelated to home planning." },
            { id: "d", text: "Change the topic when evidence gets hard." }
          ],
          correctOptionId: "a"
        },
        {
          id: "household-management-101-l10-q4",
          text: "Why is spaced review useful for Household Management mastery?",
          skillId: "household-management-101-skill-review",
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
        { id: "household-management-101-l10-a1", type: "mnemonic", title: "Memory Tip", content: "Use the phrase Plan, Check, Explain for each question." }
      ]
    }
  ],
};
