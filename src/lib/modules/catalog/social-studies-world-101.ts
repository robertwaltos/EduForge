import type { LearningModule } from "@/lib/modules/types";

export const SocialStudiesWorld101Module: LearningModule = {
  id: "social-studies-world-101",
  title: "Social Studies: World",
  description: "Compare world cultures, governments, economies, and societies across regions.",
  subject: "Social Studies World",
  tags: ["core", "curriculum", "interactive"],
  minAge: 7,
  maxAge: 18,
  moduleVersion: "1.1.0",
  version: "1.1.0",
  learningObjectives: [
    "Understand core concepts in Social Studies World",
    "Apply Global Challenges strategies through guided practice",
    "Demonstrate mastery with subject-specific quizzes"
  ],
  lessons: [
    {
      id: "social-studies-world-101-l01",
      title: "Culture and Identity",
      type: "video",
      duration: 10,
      learningAids: [
        { id: "social-studies-world-101-l01-a1", type: "image", title: "Concept Poster", content: "A colorful infographic about culture and government systems." },
        { id: "social-studies-world-101-l01-a2", type: "animation", title: "Warm-up Animation", content: "Short animation introducing Social Studies World vocabulary." }
      ]
    },
    {
      id: "social-studies-world-101-l02",
      title: "Government Systems Worldwide",
      type: "interactive",
      duration: 12,
      metadata: {
        prompts: [
          "Identify one core idea about culture from this lesson.",
          "Explain where government systems appears in real life.",
          "Describe one question you still have about global societies."
        ]
      },
      learningAids: [
        { id: "social-studies-world-101-l02-a1", type: "practice", title: "Try It Board", content: "Complete a guided activity on government systems and write one reflection." }
      ]
    },
    {
      id: "social-studies-world-101-l03",
      title: "Checkpoint: Global Civics",
      type: "quiz",
      duration: 10,
      questions: [
        {
          id: "social-studies-world-101-l03-q1",
          text: "Which statement best explains culture in Social Studies World?",
          skillId: "social-studies-world-101-skill-core",
          options: [
            { id: "a", text: "It explains culture using evidence from the lesson." },
            { id: "b", text: "It ignores how culture works in practice." },
            { id: "c", text: "It focuses on an unrelated topic outside Social Studies World." },
            { id: "d", text: "It repeats terms without showing meaning." }
          ],
          correctOptionId: "a"
        },
        {
          id: "social-studies-world-101-l03-q2",
          text: "What is the best first step when analyzing government systems?",
          skillId: "social-studies-world-101-skill-process",
          options: [
            { id: "a", text: "Define the goal and examine evidence for government systems." },
            { id: "b", text: "Guess quickly without checking evidence." },
            { id: "c", text: "Use data unrelated to government systems." },
            { id: "d", text: "Skip the context and jump to a conclusion." }
          ],
          correctOptionId: "a"
        },
        {
          id: "social-studies-world-101-l03-q3",
          text: "Which option shows strong reasoning about global societies?",
          skillId: "social-studies-world-101-skill-reasoning",
          options: [
            { id: "a", text: "Use examples and verify assumptions step by step." },
            { id: "b", text: "Ignore important details and edge cases." },
            { id: "c", text: "Use assumptions unrelated to global societies." },
            { id: "d", text: "Change the topic when evidence gets hard." }
          ],
          correctOptionId: "a"
        },
        {
          id: "social-studies-world-101-l03-q4",
          text: "Why is spaced review useful for Social Studies World mastery?",
          skillId: "social-studies-world-101-skill-review",
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
        { id: "social-studies-world-101-l03-a1", type: "mnemonic", title: "Memory Tip", content: "Use the phrase Plan, Check, Explain for each question." }
      ]
    },
    {
      id: "social-studies-world-101-l04",
      title: "Economies and Trade",
      type: "video",
      duration: 11,
      learningAids: [
        { id: "social-studies-world-101-l04-a1", type: "image", title: "Worked Example Sheet", content: "Step-by-step visuals for trade scenarios." }
      ]
    },
    {
      id: "social-studies-world-101-l05",
      title: "Migration and Urbanization",
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
        { id: "social-studies-world-101-l05-a1", type: "animation", title: "Challenge Walkthrough", content: "Animated sequence for solving a trade challenge." }
      ]
    },
    {
      id: "social-studies-world-101-l06",
      title: "Checkpoint: Global Challenges",
      type: "quiz",
      duration: 10,
      questions: [
        {
          id: "social-studies-world-101-l06-q1",
          text: "Which statement best explains trade in Social Studies World?",
          skillId: "social-studies-world-101-skill-core",
          options: [
            { id: "a", text: "It explains trade using evidence from the lesson." },
            { id: "b", text: "It ignores how trade works in practice." },
            { id: "c", text: "It focuses on an unrelated topic outside Social Studies World." },
            { id: "d", text: "It repeats terms without showing meaning." }
          ],
          correctOptionId: "a"
        },
        {
          id: "social-studies-world-101-l06-q2",
          text: "What is the best first step when analyzing human rights?",
          skillId: "social-studies-world-101-skill-process",
          options: [
            { id: "a", text: "Define the goal and examine evidence for human rights." },
            { id: "b", text: "Guess quickly without checking evidence." },
            { id: "c", text: "Use data unrelated to human rights." },
            { id: "d", text: "Skip the context and jump to a conclusion." }
          ],
          correctOptionId: "a"
        },
        {
          id: "social-studies-world-101-l06-q3",
          text: "Which option shows strong reasoning about global societies?",
          skillId: "social-studies-world-101-skill-reasoning",
          options: [
            { id: "a", text: "Use examples and verify assumptions step by step." },
            { id: "b", text: "Ignore important details and edge cases." },
            { id: "c", text: "Use assumptions unrelated to global societies." },
            { id: "d", text: "Change the topic when evidence gets hard." }
          ],
          correctOptionId: "a"
        },
        {
          id: "social-studies-world-101-l06-q4",
          text: "Why is spaced review useful for Social Studies World mastery?",
          skillId: "social-studies-world-101-skill-review",
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
        { id: "social-studies-world-101-l06-a1", type: "mnemonic", title: "Memory Tip", content: "Use the phrase Plan, Check, Explain for each question." }
      ]
    },
    {
      id: "social-studies-world-101-l07",
      title: "Global Organizations",
      type: "video",
      duration: 12,
      learningAids: [
        { id: "social-studies-world-101-l07-a1", type: "practice", title: "Project Planner", content: "Template for planning a mini project focused on human rights." }
      ]
    },
    {
      id: "social-studies-world-101-l08",
      title: "World Dialogue Activity",
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
        { id: "social-studies-world-101-l08-a1", type: "mnemonic", title: "Reflection Cycle", content: "Remember Observe, Adjust, Repeat while practicing." }
      ]
    },
    {
      id: "social-studies-world-101-l09",
      title: "Review: World Social Studies",
      type: "quiz",
      duration: 10,
      questions: [
        {
          id: "social-studies-world-101-l09-q1",
          text: "Which statement best explains government systems in Social Studies World?",
          skillId: "social-studies-world-101-skill-core",
          options: [
            { id: "a", text: "It explains government systems using evidence from the lesson." },
            { id: "b", text: "It ignores how government systems works in practice." },
            { id: "c", text: "It focuses on an unrelated topic outside Social Studies World." },
            { id: "d", text: "It repeats terms without showing meaning." }
          ],
          correctOptionId: "a"
        },
        {
          id: "social-studies-world-101-l09-q2",
          text: "What is the best first step when analyzing human rights?",
          skillId: "social-studies-world-101-skill-process",
          options: [
            { id: "a", text: "Define the goal and examine evidence for human rights." },
            { id: "b", text: "Guess quickly without checking evidence." },
            { id: "c", text: "Use data unrelated to human rights." },
            { id: "d", text: "Skip the context and jump to a conclusion." }
          ],
          correctOptionId: "a"
        },
        {
          id: "social-studies-world-101-l09-q3",
          text: "Which option shows strong reasoning about global societies?",
          skillId: "social-studies-world-101-skill-reasoning",
          options: [
            { id: "a", text: "Use examples and verify assumptions step by step." },
            { id: "b", text: "Ignore important details and edge cases." },
            { id: "c", text: "Use assumptions unrelated to global societies." },
            { id: "d", text: "Change the topic when evidence gets hard." }
          ],
          correctOptionId: "a"
        },
        {
          id: "social-studies-world-101-l09-q4",
          text: "Why is spaced review useful for Social Studies World mastery?",
          skillId: "social-studies-world-101-skill-review",
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
        { id: "social-studies-world-101-l09-a1", type: "mnemonic", title: "Memory Tip", content: "Use the phrase Plan, Check, Explain for each question." }
      ]
    },
    {
      id: "social-studies-world-101-l10",
      title: "Mastery: Global Studies",
      type: "quiz",
      duration: 10,
      questions: [
        {
          id: "social-studies-world-101-l10-q1",
          text: "Which statement best explains culture in Social Studies World?",
          skillId: "social-studies-world-101-skill-core",
          options: [
            { id: "a", text: "It explains culture using evidence from the lesson." },
            { id: "b", text: "It ignores how culture works in practice." },
            { id: "c", text: "It focuses on an unrelated topic outside Social Studies World." },
            { id: "d", text: "It repeats terms without showing meaning." }
          ],
          correctOptionId: "a"
        },
        {
          id: "social-studies-world-101-l10-q2",
          text: "What is the best first step when analyzing trade?",
          skillId: "social-studies-world-101-skill-process",
          options: [
            { id: "a", text: "Define the goal and examine evidence for trade." },
            { id: "b", text: "Guess quickly without checking evidence." },
            { id: "c", text: "Use data unrelated to trade." },
            { id: "d", text: "Skip the context and jump to a conclusion." }
          ],
          correctOptionId: "a"
        },
        {
          id: "social-studies-world-101-l10-q3",
          text: "Which option shows strong reasoning about global societies?",
          skillId: "social-studies-world-101-skill-reasoning",
          options: [
            { id: "a", text: "Use examples and verify assumptions step by step." },
            { id: "b", text: "Ignore important details and edge cases." },
            { id: "c", text: "Use assumptions unrelated to global societies." },
            { id: "d", text: "Change the topic when evidence gets hard." }
          ],
          correctOptionId: "a"
        },
        {
          id: "social-studies-world-101-l10-q4",
          text: "Why is spaced review useful for Social Studies World mastery?",
          skillId: "social-studies-world-101-skill-review",
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
        { id: "social-studies-world-101-l10-a1", type: "mnemonic", title: "Memory Tip", content: "Use the phrase Plan, Check, Explain for each question." }
      ]
    }
  ],
};
