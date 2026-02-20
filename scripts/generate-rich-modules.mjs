import fs from "node:fs/promises";
import path from "node:path";

const projectRoot = process.cwd();
const catalogDir = path.join(projectRoot, "src", "lib", "modules", "catalog");

const modules = [
  {
    id: "language-arts-101",
    constName: "LanguageArts101Module",
    title: "Language Arts Foundations",
    subject: "Language Arts",
    description: "Build reading, writing, speaking, and comprehension skills with age-appropriate practice.",
    focus: "reading and writing",
    strands: ["main idea", "context clues", "paragraph structure", "revision"],
    lessonTitles: [
      "Reading for Main Idea",
      "Context Clues and Vocabulary",
      "Checkpoint: Reading Comprehension",
      "Writing Strong Sentences",
      "Paragraph Building Workshop",
      "Checkpoint: Writing Basics",
      "Story Elements and Theme",
      "Peer Feedback Activity",
      "Review: Language Skills",
      "Mastery: Language Arts",
    ],
    quizTopics: ["Reading Comprehension", "Writing Basics", "Language Skills", "Language Arts Mastery"],
  },
  {
    id: "basic-math-101",
    constName: "BasicMath101Module",
    title: "Basic Math Foundations",
    subject: "Math",
    description: "Learn number sense, counting, addition, subtraction, and early problem solving.",
    focus: "numbers and operations",
    strands: ["place value", "addition", "subtraction", "word problems"],
    lessonTitles: [
      "Place Value and Number Sense",
      "Addition Strategies",
      "Checkpoint: Number Operations",
      "Subtraction Strategies",
      "Math Word Problem Methods",
      "Checkpoint: Problem Solving",
      "Measurement and Estimation",
      "Math Journal Reflection",
      "Review: Core Math Skills",
      "Mastery: Basic Math",
    ],
    quizTopics: ["Number Operations", "Problem Solving", "Core Math Skills", "Basic Math Mastery"],
  },
  {
    id: "advanced-math-201",
    constName: "AdvancedMath201Module",
    title: "Advanced Math Topics",
    subject: "Advanced Math",
    description: "Explore algebraic thinking, functions, probability, and advanced problem solving.",
    focus: "advanced problem solving",
    strands: ["expressions", "linear functions", "probability", "proof reasoning"],
    lessonTitles: [
      "Expressions and Equations",
      "Linear Functions and Graphs",
      "Checkpoint: Algebra Skills",
      "Systems and Modeling",
      "Probability and Statistics",
      "Checkpoint: Data Reasoning",
      "Geometric Reasoning",
      "Proof and Logic Workshop",
      "Review: Advanced Strategies",
      "Mastery: Advanced Math",
    ],
    quizTopics: ["Algebra Skills", "Data Reasoning", "Advanced Strategies", "Advanced Math Mastery"],
  },
  {
    id: "general-science-101",
    constName: "GeneralScience101Module",
    title: "General Science Explorer",
    subject: "Science",
    description: "Understand scientific thinking, observation, experimentation, and real-world science.",
    focus: "scientific inquiry",
    strands: ["observation", "hypothesis", "variables", "evidence"],
    lessonTitles: [
      "Observation and Questions",
      "Hypothesis and Testing",
      "Checkpoint: Scientific Method",
      "Variables and Controls",
      "Interpreting Evidence",
      "Checkpoint: Experimental Design",
      "Science in Daily Life",
      "Investigation Reflection",
      "Review: Inquiry Skills",
      "Mastery: General Science",
    ],
    quizTopics: ["Scientific Method", "Experimental Design", "Inquiry Skills", "General Science Mastery"],
  },
  {
    id: "biology-101",
    constName: "Biology101Module",
    title: "Biology Essentials",
    subject: "Biology",
    description: "Discover living systems, cells, ecosystems, and the diversity of life.",
    focus: "living systems",
    strands: ["cells", "organs", "ecosystems", "adaptation"],
    lessonTitles: [
      "Cells and Life Processes",
      "Body Systems Overview",
      "Checkpoint: Cell Biology",
      "Ecosystems and Food Webs",
      "Adaptation and Survival",
      "Checkpoint: Ecosystem Thinking",
      "Genetics Basics",
      "Biology Lab Reflection",
      "Review: Biology Concepts",
      "Mastery: Biology",
    ],
    quizTopics: ["Cell Biology", "Ecosystem Thinking", "Biology Concepts", "Biology Mastery"],
  },
  {
    id: "chemistry-101",
    constName: "Chemistry101Module",
    title: "Chemistry Essentials",
    subject: "Chemistry",
    description: "Learn matter, reactions, mixtures, and lab safety through guided lessons.",
    focus: "matter and reactions",
    strands: ["states of matter", "atoms", "mixtures", "chemical change"],
    lessonTitles: [
      "States of Matter",
      "Atoms and Molecules",
      "Checkpoint: Matter Basics",
      "Mixtures and Solutions",
      "Chemical Reactions Intro",
      "Checkpoint: Reaction Evidence",
      "Acids, Bases, and pH",
      "Lab Safety Simulation",
      "Review: Chemistry Ideas",
      "Mastery: Chemistry",
    ],
    quizTopics: ["Matter Basics", "Reaction Evidence", "Chemistry Ideas", "Chemistry Mastery"],
  },
  {
    id: "physics-101",
    constName: "Physics101Module",
    title: "Physics Essentials",
    subject: "Physics",
    description: "Study motion, forces, energy, waves, and practical physics applications.",
    focus: "motion and energy",
    strands: ["motion", "forces", "energy transfer", "waves"],
    lessonTitles: [
      "Motion and Speed",
      "Forces and Newton Laws",
      "Checkpoint: Motion Concepts",
      "Work and Energy",
      "Waves and Sound",
      "Checkpoint: Energy Transfer",
      "Electricity Basics",
      "Physics Challenge Lab",
      "Review: Physics Principles",
      "Mastery: Physics",
    ],
    quizTopics: ["Motion Concepts", "Energy Transfer", "Physics Principles", "Physics Mastery"],
  },
  {
    id: "social-studies-us-101",
    constName: "SocialStudiesUs101Module",
    title: "Social Studies: United States",
    subject: "Social Studies US",
    description: "Learn civics, geography, culture, and key institutions of the United States.",
    focus: "civics and institutions",
    strands: ["constitution", "branches of government", "citizenship", "communities"],
    lessonTitles: [
      "Foundations of US Government",
      "Branches and Checks",
      "Checkpoint: Civics Basics",
      "Rights and Responsibilities",
      "Local and State Government",
      "Checkpoint: Civic Participation",
      "US Regions and Culture",
      "Community Impact Activity",
      "Review: US Social Studies",
      "Mastery: US Civics",
    ],
    quizTopics: ["Civics Basics", "Civic Participation", "US Social Studies", "US Civics Mastery"],
  },
  {
    id: "social-studies-world-101",
    constName: "SocialStudiesWorld101Module",
    title: "Social Studies: World",
    subject: "Social Studies World",
    description: "Compare world cultures, governments, economies, and societies across regions.",
    focus: "global societies",
    strands: ["culture", "government systems", "trade", "human rights"],
    lessonTitles: [
      "Culture and Identity",
      "Government Systems Worldwide",
      "Checkpoint: Global Civics",
      "Economies and Trade",
      "Migration and Urbanization",
      "Checkpoint: Global Challenges",
      "Global Organizations",
      "World Dialogue Activity",
      "Review: World Social Studies",
      "Mastery: Global Studies",
    ],
    quizTopics: ["Global Civics", "Global Challenges", "World Social Studies", "Global Studies Mastery"],
  },
  {
    id: "world-history-101",
    constName: "WorldHistory101Module",
    title: "World History Journey",
    subject: "History Worldwide",
    description: "Survey major civilizations, turning points, and global historical connections.",
    focus: "historical thinking",
    strands: ["civilizations", "timeline", "cause and effect", "primary sources"],
    lessonTitles: [
      "Ancient Civilizations",
      "Classical Era Connections",
      "Checkpoint: Early History",
      "Medieval to Early Modern",
      "Revolutions and Change",
      "Checkpoint: Turning Points",
      "Modern World Developments",
      "Source Analysis Activity",
      "Review: Historical Patterns",
      "Mastery: World History",
    ],
    quizTopics: ["Early History", "Turning Points", "Historical Patterns", "World History Mastery"],
  },
  {
    id: "arts-101",
    constName: "Arts101Module",
    title: "Creative Arts Studio",
    subject: "Arts",
    description: "Practice visual arts, music, design, and creative expression across mediums.",
    focus: "creative expression",
    strands: ["color theory", "composition", "rhythm", "critique"],
    lessonTitles: [
      "Elements of Art",
      "Color and Composition",
      "Checkpoint: Visual Language",
      "Music and Rhythm",
      "Design Thinking Basics",
      "Checkpoint: Creative Process",
      "Art History Snapshot",
      "Portfolio Reflection",
      "Review: Artistic Skills",
      "Mastery: Creative Arts",
    ],
    quizTopics: ["Visual Language", "Creative Process", "Artistic Skills", "Creative Arts Mastery"],
  },
  {
    id: "coding-101",
    constName: "Coding101Module",
    title: "Coding Foundations",
    subject: "Coding",
    description: "Start programming logic, sequencing, debugging, and computational thinking.",
    focus: "coding logic",
    strands: ["sequence", "conditionals", "loops", "debugging"],
    lessonTitles: [
      "Algorithms and Sequence",
      "Conditionals and Decisions",
      "Checkpoint: Logic Basics",
      "Loops and Repetition",
      "Functions and Reuse",
      "Checkpoint: Program Flow",
      "Debugging Strategies",
      "Mini App Activity",
      "Review: Coding Concepts",
      "Mastery: Coding",
    ],
    quizTopics: ["Logic Basics", "Program Flow", "Coding Concepts", "Coding Mastery"],
  },
  {
    id: "financial-literacy-101",
    constName: "FinancialLiteracy101Module",
    title: "Financial Literacy Basics",
    subject: "Financial Literacy",
    description: "Learn saving, budgeting, earning, spending, and responsible money decisions.",
    focus: "money management",
    strands: ["budgeting", "saving", "needs vs wants", "interest"],
    lessonTitles: [
      "Needs, Wants, and Choices",
      "Budget Planning Basics",
      "Checkpoint: Budget Skills",
      "Saving and Goals",
      "Banking and Interest",
      "Checkpoint: Smart Spending",
      "Income and Work",
      "Money Reflection Activity",
      "Review: Finance Habits",
      "Mastery: Financial Literacy",
    ],
    quizTopics: ["Budget Skills", "Smart Spending", "Finance Habits", "Financial Literacy Mastery"],
  },
  {
    id: "household-management-101",
    constName: "HouseholdManagement101Module",
    title: "Household Management Skills",
    subject: "Household Management",
    description: "Build practical skills for home routines, planning, organization, and safety.",
    focus: "home planning",
    strands: ["schedules", "cleaning systems", "meal planning", "home safety"],
    lessonTitles: [
      "Daily Home Routines",
      "Time and Task Planning",
      "Checkpoint: Routine Systems",
      "Meal and Supply Planning",
      "Cleaning and Organization",
      "Checkpoint: Home Logistics",
      "Safety and Emergency Prep",
      "Family Coordination Activity",
      "Review: Household Skills",
      "Mastery: Household Management",
    ],
    quizTopics: ["Routine Systems", "Home Logistics", "Household Skills", "Household Management Mastery"],
  },
  {
    id: "farming-101",
    constName: "Farming101Module",
    title: "Farming and Food Systems",
    subject: "Farming",
    description: "Understand soil, crops, seasons, sustainability, and food production basics.",
    focus: "food systems",
    strands: ["soil health", "crop cycles", "water use", "sustainability"],
    lessonTitles: [
      "Soil and Plant Needs",
      "Crop Cycles and Seasons",
      "Checkpoint: Farming Basics",
      "Water and Irrigation",
      "Pests and Plant Health",
      "Checkpoint: Sustainable Farming",
      "Farm to Market Journey",
      "Garden Observation Activity",
      "Review: Agriculture Concepts",
      "Mastery: Farming Systems",
    ],
    quizTopics: ["Farming Basics", "Sustainable Farming", "Agriculture Concepts", "Farming Systems Mastery"],
  },
  {
    id: "astronomy-101",
    constName: "Astronomy101Module",
    title: "Astronomy Explorer",
    subject: "Astronomy",
    description: "Explore stars, planets, galaxies, and observation of the night sky.",
    focus: "space observation",
    strands: ["solar system", "stars", "galaxies", "observation methods"],
    lessonTitles: [
      "Our Solar System",
      "Stars and Constellations",
      "Checkpoint: Sky Basics",
      "Planets and Orbits",
      "Galaxies and Scale",
      "Checkpoint: Space Concepts",
      "Telescopes and Tools",
      "Night Sky Activity",
      "Review: Astronomy Topics",
      "Mastery: Astronomy",
    ],
    quizTopics: ["Sky Basics", "Space Concepts", "Astronomy Topics", "Astronomy Mastery"],
  },
  {
    id: "geography-101",
    constName: "Geography101Module",
    title: "Geography and Maps",
    subject: "Geography",
    description: "Learn maps, landforms, climates, regions, and human-environment interaction.",
    focus: "maps and regions",
    strands: ["map skills", "landforms", "climate zones", "human geography"],
    lessonTitles: [
      "Map Reading Fundamentals",
      "Coordinates and Scale",
      "Checkpoint: Map Skills",
      "Landforms and Waterways",
      "Climate and Biomes",
      "Checkpoint: Region Analysis",
      "Population and Cities",
      "Geography Field Notes",
      "Review: Geographic Thinking",
      "Mastery: Geography",
    ],
    quizTopics: ["Map Skills", "Region Analysis", "Geographic Thinking", "Geography Mastery"],
  },
  {
    id: "general-relativity-101",
    constName: "GeneralRelativity101Module",
    title: "General Relativity Intro",
    subject: "General Relativity",
    description: "Introduce spacetime, gravity, and Einstein ideas through intuitive models.",
    focus: "spacetime concepts",
    strands: ["frames of reference", "spacetime", "gravity curvature", "evidence"],
    lessonTitles: [
      "Classical vs Relativistic Thinking",
      "Space and Time Together",
      "Checkpoint: Relativity Basics",
      "Gravity as Curvature",
      "Black Holes and Lensing",
      "Checkpoint: Spacetime Reasoning",
      "Cosmology Connections",
      "Thought Experiment Activity",
      "Review: Relativity Concepts",
      "Mastery: General Relativity",
    ],
    quizTopics: ["Relativity Basics", "Spacetime Reasoning", "Relativity Concepts", "General Relativity Mastery"],
  },
];

function quizLesson(moduleId, lessonNum, subject, focus, title, strandA, strandB) {
  const base = `${moduleId}-l${lessonNum}`;
  return `{
      id: "${base}",
      title: "${title}",
      type: "quiz",
      duration: 10,
      questions: [
        {
          id: "${base}-q1",
          text: "Which statement best explains ${strandA} in ${subject}?",
          skillId: "${moduleId}-skill-core",
          options: [
            { id: "a", text: "It explains ${strandA} using evidence from the lesson." },
            { id: "b", text: "It ignores how ${strandA} works in practice." },
            { id: "c", text: "It focuses on an unrelated topic outside ${subject}." },
            { id: "d", text: "It repeats terms without showing meaning." }
          ],
          correctOptionId: "a"
        },
        {
          id: "${base}-q2",
          text: "What is the best first step when analyzing ${strandB}?",
          skillId: "${moduleId}-skill-process",
          options: [
            { id: "a", text: "Define the goal and examine evidence for ${strandB}." },
            { id: "b", text: "Guess quickly without checking evidence." },
            { id: "c", text: "Use data unrelated to ${strandB}." },
            { id: "d", text: "Skip the context and jump to a conclusion." }
          ],
          correctOptionId: "a"
        },
        {
          id: "${base}-q3",
          text: "Which option shows strong reasoning about ${focus}?",
          skillId: "${moduleId}-skill-reasoning",
          options: [
            { id: "a", text: "Use examples and verify assumptions step by step." },
            { id: "b", text: "Ignore important details and edge cases." },
            { id: "c", text: "Use assumptions unrelated to ${focus}." },
            { id: "d", text: "Change the topic when evidence gets hard." }
          ],
          correctOptionId: "a"
        },
        {
          id: "${base}-q4",
          text: "Why is spaced review useful for ${subject} mastery?",
          skillId: "${moduleId}-skill-review",
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
        { id: "${base}-a1", type: "mnemonic", title: "Memory Tip", content: "Use the phrase Plan, Check, Explain for each question." }
      ]
    }`;
}

function buildModuleText(moduleInfo) {
  const { id, constName, title, subject, description, focus, strands, lessonTitles, quizTopics } = moduleInfo;
  const lessons = [
    `{
      id: "${id}-l01",
      title: "${lessonTitles[0]}",
      type: "video",
      duration: 10,
      learningAids: [
        { id: "${id}-l01-a1", type: "image", title: "Concept Poster", content: "A colorful infographic about ${strands[0]} and ${strands[1]}." },
        { id: "${id}-l01-a2", type: "animation", title: "Warm-up Animation", content: "Short animation introducing ${subject} vocabulary." }
      ]
    }`,
    `{
      id: "${id}-l02",
      title: "${lessonTitles[1]}",
      type: "interactive",
      duration: 12,
      metadata: {
        prompts: [
          "Identify one core idea about ${strands[0]} from this lesson.",
          "Explain where ${strands[1]} appears in real life.",
          "Describe one question you still have about ${focus}."
        ]
      },
      learningAids: [
        { id: "${id}-l02-a1", type: "practice", title: "Try It Board", content: "Complete a guided activity on ${strands[1]} and write one reflection." }
      ]
    }`,
    quizLesson(id, "03", subject, focus, lessonTitles[2], strands[0], strands[1]),
    `{
      id: "${id}-l04",
      title: "${lessonTitles[3]}",
      type: "video",
      duration: 11,
      learningAids: [
        { id: "${id}-l04-a1", type: "image", title: "Worked Example Sheet", content: "Step-by-step visuals for ${strands[2]} scenarios." }
      ]
    }`,
    `{
      id: "${id}-l05",
      title: "${lessonTitles[4]}",
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
        { id: "${id}-l05-a1", type: "animation", title: "Challenge Walkthrough", content: "Animated sequence for solving a ${strands[2]} challenge." }
      ]
    }`,
    quizLesson(id, "06", subject, focus, lessonTitles[5], strands[2], strands[3]),
    `{
      id: "${id}-l07",
      title: "${lessonTitles[6]}",
      type: "video",
      duration: 12,
      learningAids: [
        { id: "${id}-l07-a1", type: "practice", title: "Project Planner", content: "Template for planning a mini project focused on ${strands[3]}." }
      ]
    }`,
    `{
      id: "${id}-l08",
      title: "${lessonTitles[7]}",
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
        { id: "${id}-l08-a1", type: "mnemonic", title: "Reflection Cycle", content: "Remember Observe, Adjust, Repeat while practicing." }
      ]
    }`,
    quizLesson(id, "09", subject, focus, lessonTitles[8], strands[1], strands[3]),
    quizLesson(id, "10", subject, focus, lessonTitles[9], strands[0], strands[2]),
  ];

  return `import type { LearningModule } from "@/lib/modules/types";

export const ${constName}: LearningModule = {
  id: "${id}",
  title: "${title}",
  description: "${description}",
  subject: "${subject}",
  tags: ["core", "curriculum", "interactive"],
  minAge: 7,
  maxAge: 18,
  moduleVersion: "1.1.0",
  version: "1.1.0",
  learningObjectives: [
    "Understand core concepts in ${subject}",
    "Apply ${quizTopics[1]} strategies through guided practice",
    "Demonstrate mastery with subject-specific quizzes"
  ],
  lessons: [
    ${lessons.join(",\n    ")}
  ],
};
`;
}

async function main() {
  for (const moduleInfo of modules) {
    const content = buildModuleText(moduleInfo);
    const filePath = path.join(catalogDir, `${moduleInfo.id}.ts`);
    await fs.writeFile(filePath, content, "utf8");
  }
  console.log(`Generated rich lesson content for ${modules.length} modules.`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
