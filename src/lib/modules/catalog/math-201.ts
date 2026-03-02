import type { LearningModule } from "@/lib/modules/types";

export const Math201Module: LearningModule = {
  id: "math-201",
  title: "Algebra and Quantitative Reasoning II",
  description:
    "Intermediate mathematics curriculum focused on algebraic structure, linear models, proportional reasoning, systems, and quantitative decision making.",
  subject: "Math",
  tags: ["core", "curriculum", "interactive", "algebra", "modeling"],
  minAge: 11,
  maxAge: 16,
  version: "2.0.0",
  difficultyBand: "intermediate",
  localeSupport: ["en", "es"],
  learningObjectives: [
    "Manipulate algebraic expressions and solve multi-step equations reliably",
    "Represent linear relationships across tables, graphs, and equations",
    "Apply proportional reasoning in real-world rate and scale scenarios",
    "Solve and interpret systems of linear equations",
    "Use inequalities to model constraints and feasible solutions",
    "Validate quantitative conclusions with units, assumptions, and reasonableness checks"
  ],
  lessons: [
    {
      id: "math-201-l01",
      title: "Expression Structure and Equation Solving",
      type: "video",
      duration: 13,
      learningAids: [{ id: "math-201-l01-a1", type: "practice", title: "Guided Practice", content: "Apply the lesson process and record your reasoning steps." }],
      chunks: [
        {
          id: "math-201-l01-c1",
          kind: "concept",
          title: "Expressions as Structures",
          content:
            "Intermediate algebra is not only about getting an answer; it is about seeing structure. Equivalent expressions can look different but encode the same relationship."
        },
        {
          id: "math-201-l01-c2",
          kind: "concept",
          title: "Equation Strategy",
          content:
            "Reliable solving uses inverse operations, distributive reasoning, and careful variable isolation while preserving equality on both sides."
        },
        {
          id: "math-201-l01-c3",
          kind: "recap",
          title: "Verification Discipline",
          content:
            "Substitution checks catch arithmetic drift and help confirm that transformed equations remained equivalent."
        }
      ],
      flashcards: [
        {
          id: "math-201-l01-f1",
          front: "Equivalent expressions",
          back: "Different-looking forms that produce identical values for all valid inputs."
        },
        {
          id: "math-201-l01-f2",
          front: "Inverse operations",
          back: "Paired operations used to undo transformations while preserving equality."
        },
        {
          id: "math-201-l01-f3",
          front: "Distributive property",
          back: "a(b + c) = ab + ac, often used to simplify and solve equations."
        }
      ]
    },
    {
      id: "math-201-l02",
      title: "Linear Functions and Multiple Representations Lab",
      type: "interactive",
      duration: 15,
      learningAids: [{ id: "math-201-l02-a1", type: "practice", title: "Guided Practice", content: "Apply the lesson process and record your reasoning steps." }],
      chunks: [
        {
          id: "math-201-l02-c1",
          kind: "concept",
          title: "Rate of Change",
          content:
            "Linear models are defined by constant rate of change. Interpreting slope and intercept in context is essential for applied reasoning."
        },
        {
          id: "math-201-l02-c2",
          kind: "practice",
          title: "Representation Conversion",
          content:
            "Strong quantitative reasoning moves fluently between equation form, graph behavior, and tabular patterns."
        }
      ],
      interactiveActivities: [
        {
          id: "math-201-l02-act1",
          type: "matching_pairs",
          title: "Representation Match",
          description: "Match each linear description to the best interpretation.",
          pairs: [
            { left: "y = 3x + 5", right: "Slope 3, y-intercept 5" },
            { left: "Flat graph segment", right: "Zero rate of change" },
            { left: "Negative slope", right: "Output decreases as input increases" },
            { left: "Point (0, b)", right: "Initial value" }
          ]
        },
        {
          id: "math-201-l02-act2",
          type: "scenario_practice",
          title: "Cost Model Drill",
          description: "Build and interpret a linear pricing model.",
          instructions: [
            "Identify variable and fixed components.",
            "State one reasonableness check for your model."
          ]
        }
      ]
    },
    {
      id: "math-201-l03",
      title: "Checkpoint 1: Equations and Linear Models",
      type: "quiz",
      duration: 10,
      learningAids: [{ id: "math-201-l03-a1", type: "practice", title: "Guided Practice", content: "Apply the lesson process and record your reasoning steps." }],
      questions: [
        {
          id: "math-201-l03-q1",
          text: "Why substitute a solution candidate back into the original equation?",
          skillId: "math-201-skill-equations",
          options: [
            { id: "a", text: "To change the equation form" },
            { id: "b", text: "To verify equivalence and solution validity" },
            { id: "c", text: "To avoid simplifying expressions" },
            { id: "d", text: "To remove variable meaning" }
          ],
          correctOptionId: "b",
          explanation: "Back-substitution confirms the candidate satisfies the original relation."
        },
        {
          id: "math-201-l03-q2",
          text: "In y = mx + b, parameter m primarily represents:",
          skillId: "math-201-skill-linear",
          options: [
            { id: "a", text: "Initial value" },
            { id: "b", text: "Rate of change" },
            { id: "c", text: "Output constraint" },
            { id: "d", text: "Graph domain only" }
          ],
          correctOptionId: "b",
          explanation: "m captures slope, the constant change in y per unit x."
        },
        {
          id: "math-201-l03-q3",
          text: "A line with negative slope means:",
          skillId: "math-201-skill-linear",
          options: [
            { id: "a", text: "y increases as x increases" },
            { id: "b", text: "y decreases as x increases" },
            { id: "c", text: "No relationship" },
            { id: "d", text: "Vertical line" }
          ],
          correctOptionId: "b",
          explanation: "Negative slope indicates inverse directional movement."
        },
        {
          id: "math-201-l03-q4",
          text: "Which practice best supports model credibility?",
          skillId: "math-201-skill-modeling",
          options: [
            { id: "a", text: "Ignore units" },
            { id: "b", text: "Check assumptions and units against context" },
            { id: "c", text: "Avoid validation data" },
            { id: "d", text: "Use only one data point" }
          ],
          correctOptionId: "b",
          explanation: "Units and assumptions anchor models to real context."
        }
      ]
    },
    {
      id: "math-201-l04",
      title: "Proportions, Rates, and Percent Reasoning",
      type: "video",
      duration: 13,
      learningAids: [{ id: "math-201-l04-a1", type: "practice", title: "Guided Practice", content: "Apply the lesson process and record your reasoning steps." }],
      chunks: [
        {
          id: "math-201-l04-c1",
          kind: "concept",
          title: "Proportional Structure",
          content:
            "Proportional reasoning links multiplicative relationships across scale, similarity, and rate contexts."
        },
        {
          id: "math-201-l04-c2",
          kind: "concept",
          title: "Rates and Unit Rates",
          content:
            "Unit rates create direct comparability across options and are central to data-informed decisions."
        },
        {
          id: "math-201-l04-c3",
          kind: "recap",
          title: "Percent as Relative Change",
          content:
            "Percent analysis should be interpreted as relative quantity change, not only arithmetic manipulation."
        }
      ],
      flashcards: [
        {
          id: "math-201-l04-f1",
          front: "Unit rate",
          back: "Rate normalized to one unit for comparison clarity."
        },
        {
          id: "math-201-l04-f2",
          front: "Proportional relationship",
          back: "Relationship with constant ratio between paired quantities."
        },
        {
          id: "math-201-l04-f3",
          front: "Percent change",
          back: "Relative increase or decrease compared to original quantity."
        }
      ]
    },
    {
      id: "math-201-l05",
      title: "Systems and Inequalities Lab",
      type: "interactive",
      duration: 15,
      learningAids: [{ id: "math-201-l05-a1", type: "practice", title: "Guided Practice", content: "Apply the lesson process and record your reasoning steps." }],
      chunks: [
        {
          id: "math-201-l05-c1",
          kind: "practice",
          title: "Intersection as Shared Truth",
          content:
            "Solving systems means identifying values that satisfy all constraints simultaneously."
        },
        {
          id: "math-201-l05-c2",
          kind: "recap",
          title: "Inequality Regions",
          content:
            "Inequalities describe feasible sets and are useful for bounded optimization contexts."
        }
      ],
      interactiveActivities: [
        {
          id: "math-201-l05-act1",
          type: "sorting_buckets",
          title: "Constraint Classification",
          description: "Sort statements by equation vs inequality model type.",
          buckets: ["Equation", "Inequality"],
          items: [
            { text: "2x + 3 = 15", bucket: "Equation" },
            { text: "x + y <= 10", bucket: "Inequality" },
            { text: "4a - 1 = 7", bucket: "Equation" },
            { text: "3n > 12", bucket: "Inequality" }
          ]
        },
        {
          id: "math-201-l05-act2",
          type: "scenario_practice",
          title: "Budget Constraint Drill",
          description: "Model a purchase plan with two constraints.",
          instructions: [
            "Define variables and write constraints.",
            "Identify one feasible solution and test it."
          ]
        }
      ]
    },
    {
      id: "math-201-l06",
      title: "Checkpoint 2: Quantitative Modeling",
      type: "quiz",
      duration: 10,
      learningAids: [{ id: "math-201-l06-a1", type: "practice", title: "Guided Practice", content: "Apply the lesson process and record your reasoning steps." }],
      questions: [
        {
          id: "math-201-l06-q1",
          text: "A system solution represents:",
          skillId: "math-201-skill-systems",
          options: [
            { id: "a", text: "A value satisfying one equation only" },
            { id: "b", text: "A value pair satisfying all equations in the system" },
            { id: "c", text: "Any plotted point" },
            { id: "d", text: "Only x-intercepts" }
          ],
          correctOptionId: "b",
          explanation: "System solutions satisfy every included relation simultaneously."
        },
        {
          id: "math-201-l06-q2",
          text: "Why are inequalities useful in modeling?",
          skillId: "math-201-skill-inequalities",
          options: [
            { id: "a", text: "They remove all constraints" },
            { id: "b", text: "They represent feasible ranges under limits" },
            { id: "c", text: "They force exact equality" },
            { id: "d", text: "They only apply to geometry" }
          ],
          correctOptionId: "b",
          explanation: "Inequalities capture bounded possibility sets."
        },
        {
          id: "math-201-l06-q3",
          text: "Most defensible quantitative claim includes:",
          skillId: "math-201-skill-modeling",
          options: [
            { id: "a", text: "Answer only" },
            { id: "b", text: "Assumptions, units, and validation check" },
            { id: "c", text: "No context" },
            { id: "d", text: "Approximation without explanation" }
          ],
          correctOptionId: "b",
          explanation: "Transparent assumptions improve interpretability and trust."
        },
        {
          id: "math-201-l06-q4",
          text: "Best way to compare two pricing options with different package sizes is:",
          skillId: "math-201-skill-rates",
          options: [
            { id: "a", text: "Compare total price only" },
            { id: "b", text: "Compute and compare unit rates" },
            { id: "c", text: "Choose larger package always" },
            { id: "d", text: "Ignore quantity differences" }
          ],
          correctOptionId: "b",
          explanation: "Unit rate normalization enables fair comparisons."
        }
      ]
    }
  ]
};


