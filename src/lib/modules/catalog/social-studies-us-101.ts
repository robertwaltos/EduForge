import type { LearningModule } from "@/lib/modules/types";

export const SocialStudiesUs101Module: LearningModule = {
  id: "social-studies-us-101",
  title: "Social Studies: United States",
  description: "Learn civics, geography, culture, and key institutions of the United States.",
  subject: "Social Studies US",
  tags: ["core", "curriculum", "interactive"],
  minAge: 7,
  maxAge: 18,
  moduleVersion: "1.1.0",
  version: "1.1.0",
  learningObjectives: [
    "Understand core concepts in Social Studies US",
    "Apply Civic Participation strategies through guided practice",
    "Demonstrate mastery with subject-specific quizzes"
  ],
  lessons: [
    {
      id: "social-studies-us-101-l01",
      title: "Foundations of US Government",
      type: "video",
      duration: 10,
      learningAids: [
        { id: "social-studies-us-101-l01-a1", type: "image", title: "Concept Poster", content: "A colorful infographic about constitution and branches of government." },
        { id: "social-studies-us-101-l01-a2", type: "animation", title: "Warm-up Animation", content: "Short animation introducing Social Studies US vocabulary." }
      ]
    },
    {
      id: "social-studies-us-101-l02",
      title: "Branches and Checks",
      type: "interactive",
      duration: 12,
      metadata: {
        prompts: [
          "Identify one core idea about constitution from this lesson.",
          "Explain where branches of government appears in real life.",
          "Describe one question you still have about civics and institutions."
        ]
      },
      learningAids: [
        { id: "social-studies-us-101-l02-a1", type: "practice", title: "Try It Board", content: "Complete a guided activity on branches of government and write one reflection." }
      ]
    },
    {
      id: "social-studies-us-101-l03",
      title: "Checkpoint: Civics Basics",
      type: "quiz",
      duration: 10,
      questions: [
        {
          id: "social-studies-us-101-l03-q1",
          text: "Which statement best explains constitution in Social Studies US?",
          skillId: "social-studies-us-101-skill-core",
          options: [
            { id: "a", text: "It explains constitution using evidence from the lesson." },
            { id: "b", text: "It ignores how constitution works in practice." },
            { id: "c", text: "It focuses on an unrelated topic outside Social Studies US." },
            { id: "d", text: "It repeats terms without showing meaning." }
          ],
          correctOptionId: "a"
        },
        {
          id: "social-studies-us-101-l03-q2",
          text: "What is the best first step when analyzing branches of government?",
          skillId: "social-studies-us-101-skill-process",
          options: [
            { id: "a", text: "Define the goal and examine evidence for branches of government." },
            { id: "b", text: "Guess quickly without checking evidence." },
            { id: "c", text: "Use data unrelated to branches of government." },
            { id: "d", text: "Skip the context and jump to a conclusion." }
          ],
          correctOptionId: "a"
        },
        {
          id: "social-studies-us-101-l03-q3",
          text: "Which option shows strong reasoning about civics and institutions?",
          skillId: "social-studies-us-101-skill-reasoning",
          options: [
            { id: "a", text: "Use examples and verify assumptions step by step." },
            { id: "b", text: "Ignore important details and edge cases." },
            { id: "c", text: "Use assumptions unrelated to civics and institutions." },
            { id: "d", text: "Change the topic when evidence gets hard." }
          ],
          correctOptionId: "a"
        },
        {
          id: "social-studies-us-101-l03-q4",
          text: "Why is spaced review useful for Social Studies US mastery?",
          skillId: "social-studies-us-101-skill-review",
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
        { id: "social-studies-us-101-l03-a1", type: "mnemonic", title: "Memory Tip", content: "Use the phrase Plan, Check, Explain for each question." }
      ]
    },
    {
      id: "social-studies-us-101-l04",
      title: "Rights and Responsibilities",
      type: "video",
      duration: 11,
      learningAids: [
        { id: "social-studies-us-101-l04-a1", type: "image", title: "Worked Example Sheet", content: "Step-by-step visuals for citizenship scenarios." }
      ]
    },
    {
      id: "social-studies-us-101-l05",
      title: "Local and State Government",
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
        { id: "social-studies-us-101-l05-a1", type: "animation", title: "Challenge Walkthrough", content: "Animated sequence for solving a citizenship challenge." }
      ]
    },
    {
      id: "social-studies-us-101-l06",
      title: "Checkpoint: Civic Participation",
      type: "quiz",
      duration: 10,
      questions: [
        {
          id: "social-studies-us-101-l06-q1",
          text: "Which statement best explains citizenship in Social Studies US?",
          skillId: "social-studies-us-101-skill-core",
          options: [
            { id: "a", text: "It explains citizenship using evidence from the lesson." },
            { id: "b", text: "It ignores how citizenship works in practice." },
            { id: "c", text: "It focuses on an unrelated topic outside Social Studies US." },
            { id: "d", text: "It repeats terms without showing meaning." }
          ],
          correctOptionId: "a"
        },
        {
          id: "social-studies-us-101-l06-q2",
          text: "What is the best first step when analyzing communities?",
          skillId: "social-studies-us-101-skill-process",
          options: [
            { id: "a", text: "Define the goal and examine evidence for communities." },
            { id: "b", text: "Guess quickly without checking evidence." },
            { id: "c", text: "Use data unrelated to communities." },
            { id: "d", text: "Skip the context and jump to a conclusion." }
          ],
          correctOptionId: "a"
        },
        {
          id: "social-studies-us-101-l06-q3",
          text: "Which option shows strong reasoning about civics and institutions?",
          skillId: "social-studies-us-101-skill-reasoning",
          options: [
            { id: "a", text: "Use examples and verify assumptions step by step." },
            { id: "b", text: "Ignore important details and edge cases." },
            { id: "c", text: "Use assumptions unrelated to civics and institutions." },
            { id: "d", text: "Change the topic when evidence gets hard." }
          ],
          correctOptionId: "a"
        },
        {
          id: "social-studies-us-101-l06-q4",
          text: "Why is spaced review useful for Social Studies US mastery?",
          skillId: "social-studies-us-101-skill-review",
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
        { id: "social-studies-us-101-l06-a1", type: "mnemonic", title: "Memory Tip", content: "Use the phrase Plan, Check, Explain for each question." }
      ]
    },
    {
      id: "social-studies-us-101-l07",
      title: "US Regions and Culture",
      type: "video",
      duration: 12,
      learningAids: [
        { id: "social-studies-us-101-l07-a1", type: "practice", title: "Project Planner", content: "Template for planning a mini project focused on communities." }
      ]
    },
    {
      id: "social-studies-us-101-l08",
      title: "Community Impact Activity",
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
        { id: "social-studies-us-101-l08-a1", type: "mnemonic", title: "Reflection Cycle", content: "Remember Observe, Adjust, Repeat while practicing." }
      ]
    },
    {
      id: "social-studies-us-101-l09",
      title: "Review: US Social Studies",
      type: "quiz",
      duration: 10,
      questions: [
        {
          id: "social-studies-us-101-l09-q1",
          text: "Which statement best explains branches of government in Social Studies US?",
          skillId: "social-studies-us-101-skill-core",
          options: [
            { id: "a", text: "It explains branches of government using evidence from the lesson." },
            { id: "b", text: "It ignores how branches of government works in practice." },
            { id: "c", text: "It focuses on an unrelated topic outside Social Studies US." },
            { id: "d", text: "It repeats terms without showing meaning." }
          ],
          correctOptionId: "a"
        },
        {
          id: "social-studies-us-101-l09-q2",
          text: "What is the best first step when analyzing communities?",
          skillId: "social-studies-us-101-skill-process",
          options: [
            { id: "a", text: "Define the goal and examine evidence for communities." },
            { id: "b", text: "Guess quickly without checking evidence." },
            { id: "c", text: "Use data unrelated to communities." },
            { id: "d", text: "Skip the context and jump to a conclusion." }
          ],
          correctOptionId: "a"
        },
        {
          id: "social-studies-us-101-l09-q3",
          text: "Which option shows strong reasoning about civics and institutions?",
          skillId: "social-studies-us-101-skill-reasoning",
          options: [
            { id: "a", text: "Use examples and verify assumptions step by step." },
            { id: "b", text: "Ignore important details and edge cases." },
            { id: "c", text: "Use assumptions unrelated to civics and institutions." },
            { id: "d", text: "Change the topic when evidence gets hard." }
          ],
          correctOptionId: "a"
        },
        {
          id: "social-studies-us-101-l09-q4",
          text: "Why is spaced review useful for Social Studies US mastery?",
          skillId: "social-studies-us-101-skill-review",
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
        { id: "social-studies-us-101-l09-a1", type: "mnemonic", title: "Memory Tip", content: "Use the phrase Plan, Check, Explain for each question." }
      ]
    },
    {
      id: "social-studies-us-101-l10",
      title: "Mastery: US Civics",
      type: "quiz",
      duration: 10,
      questions: [
        {
          id: "social-studies-us-101-l10-q1",
          text: "Which statement best explains constitution in Social Studies US?",
          skillId: "social-studies-us-101-skill-core",
          options: [
            { id: "a", text: "It explains constitution using evidence from the lesson." },
            { id: "b", text: "It ignores how constitution works in practice." },
            { id: "c", text: "It focuses on an unrelated topic outside Social Studies US." },
            { id: "d", text: "It repeats terms without showing meaning." }
          ],
          correctOptionId: "a"
        },
        {
          id: "social-studies-us-101-l10-q2",
          text: "What is the best first step when analyzing citizenship?",
          skillId: "social-studies-us-101-skill-process",
          options: [
            { id: "a", text: "Define the goal and examine evidence for citizenship." },
            { id: "b", text: "Guess quickly without checking evidence." },
            { id: "c", text: "Use data unrelated to citizenship." },
            { id: "d", text: "Skip the context and jump to a conclusion." }
          ],
          correctOptionId: "a"
        },
        {
          id: "social-studies-us-101-l10-q3",
          text: "Which option shows strong reasoning about civics and institutions?",
          skillId: "social-studies-us-101-skill-reasoning",
          options: [
            { id: "a", text: "Use examples and verify assumptions step by step." },
            { id: "b", text: "Ignore important details and edge cases." },
            { id: "c", text: "Use assumptions unrelated to civics and institutions." },
            { id: "d", text: "Change the topic when evidence gets hard." }
          ],
          correctOptionId: "a"
        },
        {
          id: "social-studies-us-101-l10-q4",
          text: "Why is spaced review useful for Social Studies US mastery?",
          skillId: "social-studies-us-101-skill-review",
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
        { id: "social-studies-us-101-l10-a1", type: "mnemonic", title: "Memory Tip", content: "Use the phrase Plan, Check, Explain for each question." }
      ]
    }
  ],
};
