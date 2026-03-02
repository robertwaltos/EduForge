import type { LearningModule } from "@/lib/modules/types";

export const AdvancedMath101Module: LearningModule = {
  id: "advanced-math-101",
  title: "Advanced Math Foundations",
  description:
    "Build the foundational habits needed for advanced mathematics: mathematical language, patterns, algebra readiness, equation solving, graph interpretation, and structured problem-solving workflows.",
  subject: "Advanced Math",
  tags: ["core", "curriculum", "interactive", "mathematics", "problem-solving"],
  minAge: 7,
  maxAge: 18,
  version: "2.0.0",
  difficultyBand: "beginner",
  localeSupport: ["en"],
  thumbnail: "/placeholders/lesson-robot.svg",
  learningObjectives: [
    "Use mathematical vocabulary precisely in explanations",
    "Recognize patterns and represent them with variables",
    "Simplify expressions using operation order and structure",
    "Solve one-step and two-step equations with justification",
    "Interpret tables and coordinate graphs to identify relationships",
    "Apply ratio, proportion, and percent reasoning in context",
    "Complete multi-step word problems using clear strategy and verification"
  ],
  lessons: [
    {
      id: "advanced-math-101-l01",
      title: "Mathematical Thinking and Patterns",
      type: "video",
      duration: 11,
      objectives: [
        "Identify arithmetic and geometric pattern behavior",
        "Translate pattern rules into words and symbols",
        "Check whether a claimed pattern rule is valid"
      ],
      chunks: [
        {
          id: "advanced-math-101-l01-c1",
          kind: "intro",
          title: "Why Patterns Matter",
          content:
            "Patterns are the bridge between arithmetic and algebra. When learners describe how numbers change, they begin building function thinking. Strong mathematical reasoning starts by observing regularity, naming structure, and testing whether the rule holds for more than one case."
        },
        {
          id: "advanced-math-101-l01-c2",
          kind: "concept",
          title: "From Sequence to Rule",
          content:
            "A sequence such as 4, 7, 10, 13 adds 3 each step. We can describe this verbally (start at 4 and add 3 repeatedly) or symbolically (a_n = 4 + 3(n-1)). Different representations should tell the same story."
        },
        {
          id: "advanced-math-101-l01-c3",
          kind: "example",
          title: "Testing a Rule",
          content:
            "If someone claims the nth term is 2n + 1 for 5, 8, 11, 14..., test n=1 gives 3, which fails. A better rule is 3n + 2. Good mathematicians verify rules against evidence before accepting them."
        }
      ],
      flashcards: [
        {
          id: "advanced-math-101-l01-f1",
          front: "Pattern rule",
          back: "A statement or formula that describes how terms in a sequence are generated."
        },
        {
          id: "advanced-math-101-l01-f2",
          front: "Variable",
          back: "A symbol that represents a changing or unknown quantity."
        },
        {
          id: "advanced-math-101-l01-f3",
          front: "Rule validation",
          back: "Testing a proposed rule against multiple terms to confirm it fits."
        }
      ],
      learningAids: [
        {
          id: "advanced-math-101-l01-a1",
          type: "image",
          title: "Pattern to Formula Map",
          content: "Visual map showing sequence values, verbal rule, table, and symbolic expression side by side."
        }
      ]
    },
    {
      id: "advanced-math-101-l02",
      title: "Expressions and Order of Operations Lab",
      type: "interactive",
      duration: 13,
      objectives: [
        "Evaluate expressions using operation order",
        "Distinguish like and unlike terms",
        "Write expressions from real-world descriptions"
      ],
      chunks: [
        {
          id: "advanced-math-101-l02-c1",
          kind: "concept",
          title: "Expression Structure",
          content:
            "Expressions combine numbers, variables, and operations. Understanding structure helps avoid common mistakes such as adding terms that are not like terms or misapplying operation order."
        },
        {
          id: "advanced-math-101-l02-c2",
          kind: "practice",
          title: "Operation Order with Purpose",
          content:
            "Order of operations is a convention that keeps expressions unambiguous. Parentheses and grouping symbols first, then exponents, then multiplication/division, then addition/subtraction. Good practice includes writing each step clearly to avoid hidden arithmetic slips."
        }
      ],
      interactiveActivities: [
        {
          id: "advanced-math-101-l02-act1",
          type: "sorting_buckets",
          title: "Like Term Sort",
          description: "Sort each expression piece into like-term groups.",
          buckets: ["x terms", "y terms", "constants"],
          items: [
            { text: "5x", bucket: "x terms" },
            { text: "-2y", bucket: "y terms" },
            { text: "8", bucket: "constants" },
            { text: "3x", bucket: "x terms" },
            { text: "7y", bucket: "y terms" },
            { text: "-4", bucket: "constants" }
          ]
        },
        {
          id: "advanced-math-101-l02-act2",
          type: "matching_pairs",
          title: "Expression Translation",
          description: "Match each phrase to its algebraic expression.",
          pairs: [
            { left: "Three more than twice n", right: "2n + 3" },
            { left: "Half of m minus 5", right: "m/2 - 5" },
            { left: "Seven times x", right: "7x" },
            { left: "Sum of p and q", right: "p + q" }
          ]
        }
      ],
      metadata: {
        prompts: [
          "Why can 3x + 2y not be simplified to 5xy?",
          "Evaluate 2(4 + 3) - 5 and explain each step.",
          "Write an expression for: 4 less than a number t, then doubled."
        ]
      },
      learningAids: [
        {
          id: "advanced-math-101-l02-a1",
          type: "practice",
          title: "Step-by-Step Evaluator",
          content: "Template to write each operation-order step and self-check for sign errors."
        }
      ]
    },
    {
      id: "advanced-math-101-l03",
      title: "Checkpoint 1: Patterns and Expressions",
      type: "quiz",
      duration: 10,
      questions: [
        {
          id: "advanced-math-101-l03-q1",
          text: "Which rule matches the sequence 6, 10, 14, 18?",
          skillId: "advanced-math-101-skill-patterns",
          options: [
            { id: "a", text: "4n + 2" },
            { id: "b", text: "6n - 2" },
            { id: "c", text: "2n + 4" },
            { id: "d", text: "n + 6" }
          ],
          correctOptionId: "a",
          explanation: "For n=1, 4(1)+2=6; n=2 gives 10; n=3 gives 14."
        },
        {
          id: "advanced-math-101-l03-q2",
          text: "Simplify 3x + 5 + 2x - 1.",
          skillId: "advanced-math-101-skill-expressions",
          options: [
            { id: "a", text: "5x + 4" },
            { id: "b", text: "5x + 6" },
            { id: "c", text: "6x + 4" },
            { id: "d", text: "x + 4" }
          ],
          correctOptionId: "a",
          explanation: "Combine like terms: 3x+2x=5x and 5-1=4."
        },
        {
          id: "advanced-math-101-l03-q3",
          text: "Evaluate 18 - 3(4 - 2).",
          skillId: "advanced-math-101-skill-order",
          options: [
            { id: "a", text: "24" },
            { id: "b", text: "12" },
            { id: "c", text: "6" },
            { id: "d", text: "2" }
          ],
          correctOptionId: "b",
          explanation: "Parentheses first: (4-2)=2, then 3*2=6, then 18-6=12."
        },
        {
          id: "advanced-math-101-l03-q4",
          text: "Which expression means 'five less than twice y'?",
          skillId: "advanced-math-101-skill-translation",
          options: [
            { id: "a", text: "2y - 5" },
            { id: "b", text: "5y - 2" },
            { id: "c", text: "2(y - 5)" },
            { id: "d", text: "y/2 - 5" }
          ],
          correctOptionId: "a",
          explanation: "Twice y is 2y, then subtract 5."
        }
      ],
      learningAids: [
        {
          id: "advanced-math-101-l03-a1",
          type: "mnemonic",
          title: "PEMDAS Check",
          content: "Group first, then powers, then multiply/divide, then add/subtract left to right."
        }
      ]
    },
    {
      id: "advanced-math-101-l04",
      title: "Equation Solving Fundamentals",
      type: "video",
      duration: 12,
      objectives: [
        "Solve one-step and two-step equations",
        "Use inverse operations consistently",
        "Verify solutions by substitution"
      ],
      chunks: [
        {
          id: "advanced-math-101-l04-c1",
          kind: "concept",
          title: "Balance Model",
          content:
            "An equation states two expressions are equal. Think of a balance scale: whatever operation you do to one side, do the same to the other to maintain equality."
        },
        {
          id: "advanced-math-101-l04-c2",
          kind: "example",
          title: "Two-Step Example",
          content:
            "Solve 3x + 7 = 22. Subtract 7 from both sides: 3x = 15. Divide both sides by 3: x = 5. Check: 3(5)+7=22."
        },
        {
          id: "advanced-math-101-l04-c3",
          kind: "recap",
          title: "Error Prevention",
          content:
            "Frequent errors include sign mistakes and incomplete checks. Writing each transformation line-by-line and substituting final answers reduces these errors significantly."
        }
      ],
      flashcards: [
        {
          id: "advanced-math-101-l04-f1",
          front: "Inverse operation",
          back: "An operation that undoes another operation, such as + and -, or * and /."
        },
        {
          id: "advanced-math-101-l04-f2",
          front: "Equation check",
          back: "Substitute solution back into original equation to confirm equality holds."
        },
        {
          id: "advanced-math-101-l04-f3",
          front: "Balance principle",
          back: "Apply identical operations to both sides to preserve equality."
        }
      ],
      learningAids: [
        {
          id: "advanced-math-101-l04-a1",
          type: "image",
          title: "Equation Balance Diagram",
          content: "Visual showing valid and invalid transformations when solving equations."
        }
      ]
    },
    {
      id: "advanced-math-101-l05",
      title: "Graphs, Tables, and Relationships Lab",
      type: "interactive",
      duration: 14,
      objectives: [
        "Read coordinate points correctly",
        "Connect table patterns to graph behavior",
        "Describe linear trends in context"
      ],
      chunks: [
        {
          id: "advanced-math-101-l05-c1",
          kind: "concept",
          title: "Representations of Relationships",
          content:
            "Relationships can be shown in words, tables, equations, and graphs. Skilled learners move between forms to verify consistency. If a table increases by a constant amount each step, the graph forms a straight line with constant slope."
        },
        {
          id: "advanced-math-101-l05-c2",
          kind: "practice",
          title: "Reading Graph Features",
          content:
            "Key graph features include intercepts, direction (increasing/decreasing), and steepness. Interpreting these features in context helps with real-world reasoning such as cost growth, distance-time motion, or temperature trends."
        }
      ],
      interactiveActivities: [
        {
          id: "advanced-math-101-l05-act1",
          type: "matching_pairs",
          title: "Table-to-Rule Match",
          description: "Match each table pattern to the best algebraic rule.",
          pairs: [
            { left: "x:1,2,3 ; y:4,7,10", right: "y = 3x + 1" },
            { left: "x:0,1,2 ; y:5,5,5", right: "y = 5" },
            { left: "x:1,2,3 ; y:2,4,6", right: "y = 2x" },
            { left: "x:1,2,3 ; y:1,4,9", right: "nonlinear (quadratic pattern)" }
          ]
        }
      ],
      metadata: {
        prompts: [
          "How do you tell from a table that a relationship is linear?",
          "What does a y-intercept represent in a real-world story?",
          "Give one example of a nonlinear pattern from everyday life."
        ]
      },
      learningAids: [
        {
          id: "advanced-math-101-l05-a1",
          type: "practice",
          title: "Graph Reading Guide",
          content: "Checklist for slope direction, intercept meaning, and trend interpretation in context."
        }
      ]
    },
    {
      id: "advanced-math-101-l06",
      title: "Checkpoint 2: Equations and Graphs",
      type: "quiz",
      duration: 10,
      questions: [
        {
          id: "advanced-math-101-l06-q1",
          text: "Solve: 2x + 9 = 21.",
          skillId: "advanced-math-101-skill-equations",
          options: [
            { id: "a", text: "x = 6" },
            { id: "b", text: "x = 7" },
            { id: "c", text: "x = 12" },
            { id: "d", text: "x = 15" }
          ],
          correctOptionId: "a",
          explanation: "Subtract 9 to get 2x=12, divide by 2 gives x=6."
        },
        {
          id: "advanced-math-101-l06-q2",
          text: "A line through points (1,3) and (2,5) has what slope?",
          skillId: "advanced-math-101-skill-graphs",
          options: [
            { id: "a", text: "1" },
            { id: "b", text: "2" },
            { id: "c", text: "3" },
            { id: "d", text: "-2" }
          ],
          correctOptionId: "b",
          explanation: "Slope = rise/run = (5-3)/(2-1)=2."
        },
        {
          id: "advanced-math-101-l06-q3",
          text: "Which table likely represents a linear rule?",
          skillId: "advanced-math-101-skill-graphs",
          options: [
            { id: "a", text: "y values: 1,4,9,16" },
            { id: "b", text: "y values: 3,6,9,12" },
            { id: "c", text: "y values: 2,3,5,8" },
            { id: "d", text: "y values: 5,5,6,8" }
          ],
          correctOptionId: "b",
          explanation: "Constant change (+3 each step) indicates linear behavior."
        },
        {
          id: "advanced-math-101-l06-q4",
          text: "Best final step after solving any equation?",
          skillId: "advanced-math-101-skill-equations",
          options: [
            { id: "a", text: "Round answer to nearest ten" },
            { id: "b", text: "Plug solution into original equation" },
            { id: "c", text: "Change variable name" },
            { id: "d", text: "Graph unrelated points" }
          ],
          correctOptionId: "b",
          explanation: "Substitution confirms the solution is valid in the original equation."
        }
      ],
      learningAids: [
        {
          id: "advanced-math-101-l06-a1",
          type: "mnemonic",
          title: "Solve-Check",
          content: "Isolate variable, then substitute back to confirm."
        }
      ]
    },
    {
      id: "advanced-math-101-l07",
      title: "Capstone: Multi-Step Math Modeling",
      type: "interactive",
      duration: 16,
      objectives: [
        "Apply patterns, expressions, equations, and graphs together",
        "Explain reasoning in complete mathematical sentences",
        "Verify final answers against context constraints"
      ],
      chunks: [
        {
          id: "advanced-math-101-l07-c1",
          kind: "practice",
          title: "Capstone Scenario",
          content:
            "A school fundraiser sells tickets with a fixed setup fee and per-ticket cost. Build an equation from context, solve for break-even, and graph the relationship to explain when profit begins."
        },
        {
          id: "advanced-math-101-l07-c2",
          kind: "recap",
          title: "Quality Criteria",
          content:
            "Strong solutions define variables, show equation setup, justify each step, interpret graph features in words, and verify if the result is reasonable in context."
        }
      ],
      metadata: {
        prompts: [
          "Define your variables before writing equations.",
          "Explain what the intercept means in this fundraiser context.",
          "State one way you checked your final answer."
        ]
      },
      learningAids: [
        {
          id: "advanced-math-101-l07-a1",
          type: "practice",
          title: "Modeling Checklist",
          content: "Define, represent, solve, interpret, verify."
        }
      ]
    }
  ]
};