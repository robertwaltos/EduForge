import type { LearningModule } from "@/lib/modules/types";

export const Farming401Module: LearningModule = {
  id: "farming-401",
  title: "Farming Systems Leadership and Climate Resilience",
  description:
    "Expert-level farming curriculum on agroecosystem strategy, precision decision systems, climate risk adaptation, resource economics, and long-term farm resilience planning.",
  subject: "Farming",
  tags: ["core", "curriculum", "interactive", "farming", "agroecology", "resilience"],
  minAge: 12,
  maxAge: 99,
  version: "2.0.0",
  difficultyBand: "advanced",
  localeSupport: ["en"],
  thumbnail: "/placeholders/lesson-robot.svg",
  learningObjectives: [
    "Design integrated farming systems that balance productivity and ecological health",
    "Use precision data for irrigation, nutrient, and pest management decisions",
    "Evaluate climate risk scenarios and adaptation pathways",
    "Optimize resource allocation under economic and environmental constraints",
    "Build resilient farm operating plans with measurable sustainability indicators",
    "Communicate strategy across technical, financial, and community stakeholders"
  ],
  lessons: [
    {
      id: "farming-401-l01",
      title: "Agroecosystem Strategy and Whole-Farm Design",
      type: "video",
      duration: 13,
      chunks: [
        {
          id: "farming-401-l01-c1",
          kind: "concept",
          title: "Farm as a System",
          content:
            "Advanced farm planning treats soil, water, crops, livestock, labor, and market access as interconnected subsystems. Optimizing one variable in isolation can degrade overall resilience."
        },
        {
          id: "farming-401-l01-c2",
          kind: "concept",
          title: "Productivity-Resilience Trade-offs",
          content:
            "Short-term yield maximization may increase long-term fragility through soil depletion, water stress, and pest pressure. Expert systems planning balances immediate outputs with regenerative capacity."
        },
        {
          id: "farming-401-l01-c3",
          kind: "recap",
          title: "Design Principles",
          content:
            "Diversification, adaptive rotation, water stewardship, and risk-distributed revenue streams are core principles in resilient whole-farm design."
        }
      ],
      flashcards: [
        {
          id: "farming-401-l01-f1",
          front: "Agroecosystem",
          back: "An integrated system of biological, environmental, and economic processes within farming operations."
        },
        {
          id: "farming-401-l01-f2",
          front: "Resilience",
          back: "Capacity to absorb shocks, adapt, and sustain function over time."
        },
        {
          id: "farming-401-l01-f3",
          front: "Diversification",
          back: "Risk-reduction strategy using variety in crops, practices, and income channels."
        }
      ],
      learningAids: [
        {
          id: "farming-401-l01-a1",
          type: "image",
          title: "Whole-Farm Systems Map",
          content: "Visual map linking soil, water, crop, labor, and market loops in strategic farm planning."
        }
      ]
    },
    {
      id: "farming-401-l02",
      title: "Precision Agriculture Decision Lab",
      type: "interactive",
      duration: 16,
      chunks: [
        {
          id: "farming-401-l02-c1",
          kind: "concept",
          title: "Data-Informed Operations",
          content:
            "Precision agriculture integrates field sensors, weather feeds, satellite indices, and equipment telemetry to improve timing and input efficiency. Better data should lead to clearer decisions, not more dashboard noise."
        },
        {
          id: "farming-401-l02-c2",
          kind: "practice",
          title: "Decision Thresholds",
          content:
            "Strong operations define action thresholds: when to irrigate, apply nutrients, trigger scouting, or hold intervention. Threshold design should incorporate uncertainty and avoid overreaction to single noisy signals."
        }
      ],
      interactiveActivities: [
        {
          id: "farming-401-l02-act1",
          type: "matching_pairs",
          title: "Signal-to-Action Match",
          description: "Match field signals with the most appropriate management response.",
          pairs: [
            { left: "Soil moisture trending below threshold", right: "Targeted irrigation scheduling" },
            { left: "Leaf chlorophyll decline with stable moisture", right: "Nutrient status assessment" },
            { left: "Localized canopy stress hotspot", right: "Zone-specific scouting" },
            { left: "Weather forecast indicates heat spike", right: "Irrigation and shade-risk contingency review" }
          ]
        },
        {
          id: "farming-401-l02-act2",
          type: "scenario_practice",
          title: "Input Optimization Drill",
          description: "Prioritize interventions under constrained water and fertilizer budgets.",
          instructions: [
            "Select one high-impact intervention now.",
            "Define one indicator that triggers escalation."
          ]
        }
      ],
      metadata: {
        prompts: [
          "How do you separate signal from noise in farm telemetry?",
          "What is one risk of over-automated decision-making in agriculture?",
          "Which metric best reflects irrigation efficiency outcome?"
        ]
      },
      learningAids: [
        {
          id: "farming-401-l02-a1",
          type: "practice",
          title: "Threshold Design Worksheet",
          content: "Template for trigger values, confidence bounds, action owner, and review cadence."
        }
      ]
    },
    {
      id: "farming-401-l03",
      title: "Checkpoint 1: Systems and Precision Decisions",
      type: "quiz",
      duration: 10,
      questions: [
        {
          id: "farming-401-l03-q1",
          text: "Why is whole-farm systems thinking essential at advanced levels?",
          skillId: "farming-401-skill-systems",
          options: [
            { id: "a", text: "It ignores economic constraints" },
            { id: "b", text: "It captures cross-impact among ecological and operational variables" },
            { id: "c", text: "It removes weather uncertainty" },
            { id: "d", text: "It guarantees maximum yield every season" }
          ],
          correctOptionId: "b",
          explanation: "System interactions determine long-term performance and resilience."
        },
        {
          id: "farming-401-l03-q2",
          text: "Best use of precision data in farm operations?",
          skillId: "farming-401-skill-precision",
          options: [
            { id: "a", text: "Collect data without action thresholds" },
            { id: "b", text: "Inform decisions through defined triggers and validation" },
            { id: "c", text: "Replace all field observations" },
            { id: "d", text: "Increase interventions regardless of context" }
          ],
          correctOptionId: "b",
          explanation: "Data value comes from actionable and validated operational decisions."
        },
        {
          id: "farming-401-l03-q3",
          text: "A sudden stress signal appears in only one zone. Best first action?",
          skillId: "farming-401-skill-precision",
          options: [
            { id: "a", text: "Apply whole-farm treatment immediately" },
            { id: "b", text: "Conduct targeted zone inspection before broad intervention" },
            { id: "c", text: "Ignore until next season" },
            { id: "d", text: "Reduce monitoring frequency" }
          ],
          correctOptionId: "b",
          explanation: "Targeted verification limits unnecessary cost and intervention risk."
        },
        {
          id: "farming-401-l03-q4",
          text: "Which choice most improves long-term resilience?",
          skillId: "farming-401-skill-systems",
          options: [
            { id: "a", text: "Single-input dependency" },
            { id: "b", text: "Diversified production and risk pathways" },
            { id: "c", text: "No rotation planning" },
            { id: "d", text: "Minimal record keeping" }
          ],
          correctOptionId: "b",
          explanation: "Diversification reduces vulnerability to single-point shocks."
        }
      ],
      learningAids: [
        {
          id: "farming-401-l03-a1",
          type: "mnemonic",
          title: "SCAN",
          content: "System, Constraints, Action thresholds, Next review."
        }
      ]
    },
    {
      id: "farming-401-l04",
      title: "Climate Risk Adaptation and Resource Stewardship",
      type: "video",
      duration: 13,
      chunks: [
        {
          id: "farming-401-l04-c1",
          kind: "concept",
          title: "Climate Scenario Planning",
          content:
            "Advanced farm leaders evaluate multiple future climate scenarios rather than relying on historical averages. Adaptation planning includes heat stress, rainfall volatility, pest shifts, and supply disruptions."
        },
        {
          id: "farming-401-l04-c2",
          kind: "concept",
          title: "Water and Soil Resilience",
          content:
            "Water retention, infiltration, erosion control, and soil organic matter are central risk controls. Infrastructure choices and agronomic practice must be coordinated rather than optimized independently."
        },
        {
          id: "farming-401-l04-c3",
          kind: "recap",
          title: "Adaptation Governance",
          content:
            "Effective adaptation plans define indicators, thresholds, accountable owners, and scheduled revision cycles as climate patterns shift."
        }
      ],
      flashcards: [
        {
          id: "farming-401-l04-f1",
          front: "Scenario planning",
          back: "Evaluating multiple plausible futures to design robust decisions under uncertainty."
        },
        {
          id: "farming-401-l04-f2",
          front: "Soil organic matter",
          back: "Key indicator tied to water retention, nutrient dynamics, and long-term soil function."
        },
        {
          id: "farming-401-l04-f3",
          front: "Adaptive governance",
          back: "A management approach that updates policy and operations based on new evidence."
        }
      ],
      learningAids: [
        {
          id: "farming-401-l04-a1",
          type: "image",
          title: "Climate Adaptation Map",
          content: "Visual linking climate stressors to operational adaptation levers and monitoring indicators."
        }
      ]
    },
    {
      id: "farming-401-l05",
      title: "Farm Economics and Risk Portfolio Lab",
      type: "interactive",
      duration: 16,
      chunks: [
        {
          id: "farming-401-l05-c1",
          kind: "concept",
          title: "Economic Resilience",
          content:
            "Farm resilience depends on both ecological and financial design. Margin stability, cost volatility exposure, market concentration, and insurance structure all influence survival under shocks."
        },
        {
          id: "farming-401-l05-c2",
          kind: "practice",
          title: "Portfolio Decisions",
          content:
            "Leaders evaluate crop mix, contract strategy, storage decisions, and investment pacing through scenario analysis. The objective is robust performance across uncertain seasons, not best-case optimization."
        }
      ],
      interactiveActivities: [
        {
          id: "farming-401-l05-act1",
          type: "sorting_buckets",
          title: "Risk Lever Sort",
          description: "Sort interventions by the primary risk they mitigate.",
          buckets: ["Yield Risk", "Price Risk", "Input Cost Risk"],
          items: [
            { text: "Drought-tolerant cultivar adoption", bucket: "Yield Risk" },
            { text: "Forward pricing contract", bucket: "Price Risk" },
            { text: "Fertilizer procurement hedge", bucket: "Input Cost Risk" },
            { text: "Diversified crop calendar", bucket: "Yield Risk" }
          ]
        },
        {
          id: "farming-401-l05-act2",
          type: "scenario_practice",
          title: "Season Planning Drill",
          description: "Choose a robust farm plan under uncertain weather and market conditions.",
          instructions: [
            "State one decision that protects downside risk.",
            "State one trade-off in expected upside."
          ]
        }
      ],
      metadata: {
        prompts: [
          "Why can a highest-yield strategy still be financially fragile?",
          "What indicator would trigger changing crop mix mid-season?",
          "How do ecological and financial resilience reinforce each other?"
        ]
      },
      learningAids: [
        {
          id: "farming-401-l05-a1",
          type: "practice",
          title: "Risk Dashboard Template",
          content: "Template for key yield, water, cost, and market risk indicators with trigger actions."
        }
      ]
    },
    {
      id: "farming-401-l06",
      title: "Checkpoint 2: Climate and Economics",
      type: "quiz",
      duration: 11,
      questions: [
        {
          id: "farming-401-l06-q1",
          text: "Best reason to use scenario planning in climate-sensitive farming?",
          skillId: "farming-401-skill-climate",
          options: [
            { id: "a", text: "To avoid uncertainty discussions" },
            { id: "b", text: "To design robust plans across multiple plausible futures" },
            { id: "c", text: "To predict one exact season outcome" },
            { id: "d", text: "To eliminate all risk" }
          ],
          correctOptionId: "b",
          explanation: "Scenario planning improves decisions under uncertainty rather than assuming one future."
        },
        {
          id: "farming-401-l06-q2",
          text: "Which option most directly improves water resilience?",
          skillId: "farming-401-skill-resources",
          options: [
            { id: "a", text: "Ignoring infiltration trends" },
            { id: "b", text: "Practices that increase soil retention and reduce runoff" },
            { id: "c", text: "Single high-intensity irrigation schedule" },
            { id: "d", text: "Reducing all monitoring" }
          ],
          correctOptionId: "b",
          explanation: "Retention and infiltration improvements stabilize water availability under stress."
        },
        {
          id: "farming-401-l06-q3",
          text: "A resilient economic farm strategy typically includes:",
          skillId: "farming-401-skill-economics",
          options: [
            { id: "a", text: "Single market dependency" },
            { id: "b", text: "Risk-diversified revenue and cost management levers" },
            { id: "c", text: "No contingency planning" },
            { id: "d", text: "Only short-term yield targets" }
          ],
          correctOptionId: "b",
          explanation: "Diversified risk controls support stability when conditions shift."
        },
        {
          id: "farming-401-l06-q4",
          text: "Most useful trigger for adaptive governance updates is:",
          skillId: "farming-401-skill-governance",
          options: [
            { id: "a", text: "Annual tradition only" },
            { id: "b", text: "Indicator thresholds crossing planned bounds" },
            { id: "c", text: "Random schedule changes" },
            { id: "d", text: "No trigger needed" }
          ],
          correctOptionId: "b",
          explanation: "Evidence-based thresholds support timely adaptation decisions."
        },
        {
          id: "farming-401-l06-q5",
          text: "Why should precision interventions include validation loops?",
          skillId: "farming-401-skill-precision",
          options: [
            { id: "a", text: "To increase intervention frequency blindly" },
            { id: "b", text: "To confirm that actions improved target outcomes" },
            { id: "c", text: "To avoid documenting results" },
            { id: "d", text: "To remove field observations" }
          ],
          correctOptionId: "b",
          explanation: "Closed-loop validation ensures interventions are effective and efficient."
        }
      ],
      learningAids: [
        {
          id: "farming-401-l06-a1",
          type: "mnemonic",
          title: "GROW",
          content: "Goals, Risks, Options, Watch indicators."
        }
      ]
    },
    {
      id: "farming-401-l07",
      title: "Capstone: Climate-Resilient Farm Strategy Proposal",
      type: "interactive",
      duration: 19,
      chunks: [
        {
          id: "farming-401-l07-c1",
          kind: "practice",
          title: "Capstone Brief",
          content:
            "Develop a multi-year farm strategy proposal with ecological targets, economic risk controls, adaptation triggers, and implementation roadmap under realistic labor and capital constraints."
        },
        {
          id: "farming-401-l07-c2",
          kind: "recap",
          title: "Assessment Criteria",
          content:
            "Strong proposals integrate agronomy, climate adaptation, and financial resilience with measurable milestones and accountable ownership."
        }
      ],
      metadata: {
        prompts: [
          "Define top three farm resilience goals and metrics.",
          "List two adaptation triggers and response actions.",
          "Explain one trade-off between short-term profitability and long-term resilience."
        ]
      },
      learningAids: [
        {
          id: "farming-401-l07-a1",
          type: "practice",
          title: "Strategy Proposal Template",
          content: "Template for goals, indicators, risk scenarios, action plan, and review cadence."
        }
      ]
    }
  ]
};