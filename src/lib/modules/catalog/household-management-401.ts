import type { LearningModule } from "@/lib/modules/types";

export const HouseholdManagement401Module: LearningModule = {
  id: "household-management-401",
  title: "Household Systems Leadership and Long-Term Resilience",
  description:
    "Expert-level household management focused on governance, financial resilience, care logistics, legal readiness, and multi-year operating strategy for complex households.",
  subject: "Household Management",
  tags: ["core", "curriculum", "interactive", "resilience", "finance", "governance"],
  minAge: 16,
  maxAge: 99,
  version: "2.0.0",
  difficultyBand: "advanced",
  localeSupport: ["en"],
  thumbnail: "/placeholders/lesson-robot.svg",
  learningObjectives: [
    "Design household operating systems with explicit roles, policies, and review cadence",
    "Build contingency plans for financial, health, housing, and dependency risks",
    "Evaluate household decisions using trade-off analysis and scenario planning",
    "Coordinate intergenerational care, legal documents, and emergency readiness",
    "Use measurable indicators to improve household reliability and well-being",
    "Present a strategic household plan with assumptions, risks, and accountability"
  ],
  lessons: [
    {
      id: "household-management-401-l01",
      title: "Household Governance and Operating Models",
      type: "video",
      duration: 14,
      chunks: [
        {
          id: "household-management-401-l01-c1",
          kind: "concept",
          title: "From Chores to Systems",
          content:
            "Advanced household management treats recurring tasks as an operating system rather than ad-hoc reminders. Governance defines who decides, who executes, and how exceptions are handled under stress."
        },
        {
          id: "household-management-401-l01-c2",
          kind: "concept",
          title: "Decision Rights and Escalation",
          content:
            "High-impact decisions such as relocation, major expenses, caregiving transitions, and schooling changes need explicit decision rights and escalation rules. Ambiguity increases conflict and delays action."
        },
        {
          id: "household-management-401-l01-c3",
          kind: "recap",
          title: "Review Cadence",
          content:
            "Strong systems include weekly operations check-ins, monthly budget and risk review, and quarterly goal reset. Cadence prevents silent drift and reduces crisis-driven decision making."
        }
      ],
      flashcards: [
        {
          id: "household-management-401-l01-f1",
          front: "Household governance",
          back: "Decision and accountability structure for household priorities, resources, and exceptions."
        },
        {
          id: "household-management-401-l01-f2",
          front: "Decision rights",
          back: "Defined authority boundaries for who can approve, defer, or escalate major decisions."
        },
        {
          id: "household-management-401-l01-f3",
          front: "Operating cadence",
          back: "Recurring review rhythm that keeps plans current and coordinated."
        }
      ],
      learningAids: [
        {
          id: "household-management-401-l01-a1",
          type: "image",
          title: "Household Operating Model Map",
          content: "Template mapping roles, decisions, escalation routes, and review rhythms."
        }
      ]
    },
    {
      id: "household-management-401-l02",
      title: "Risk Portfolio and Contingency Planning Lab",
      type: "interactive",
      duration: 16,
      chunks: [
        {
          id: "household-management-401-l02-c1",
          kind: "concept",
          title: "Risk Buckets",
          content:
            "Household resilience depends on coverage across financial shocks, health events, housing disruptions, caregiving gaps, and technology outages. Single-point dependency creates fragility."
        },
        {
          id: "household-management-401-l02-c2",
          kind: "practice",
          title: "Control Design",
          content:
            "Each risk needs a preventive control, a detection signal, and a recovery playbook. Plans should include owner, trigger thresholds, and fallback options."
        }
      ],
      interactiveActivities: [
        {
          id: "household-management-401-l02-act1",
          type: "matching_pairs",
          title: "Control-to-Risk Matching",
          description: "Match household controls to the risk they reduce most directly.",
          pairs: [
            { left: "Three-month emergency reserve", right: "Buffers income interruption and urgent expenses" },
            { left: "Medication and records go-bag", right: "Improves response speed during medical events" },
            { left: "Backup caregiver roster", right: "Reduces single-person dependency risk" },
            { left: "Utility outage checklist", right: "Maintains continuity during power or water disruption" }
          ]
        },
        {
          id: "household-management-401-l02-act2",
          type: "scenario_practice",
          title: "72-Hour Disruption Drill",
          description: "Respond to a sudden disruption and defend your first three actions.",
          instructions: [
            "Choose one containment action in the first hour.",
            "Name one communication protocol that prevents confusion."
          ]
        }
      ],
      metadata: {
        prompts: [
          "Which risk in your household has the highest impact if unmanaged?",
          "What trigger would force immediate escalation to all adults in the home?",
          "Which control gives the best resilience per dollar of effort?"
        ]
      },
      learningAids: [
        {
          id: "household-management-401-l02-a1",
          type: "practice",
          title: "Contingency Worksheet",
          content: "Template for risk owner, early warning indicator, fallback steps, and recovery target."
        }
      ]
    },
    {
      id: "household-management-401-l03",
      title: "Checkpoint 1: Governance and Risk",
      type: "quiz",
      duration: 10,
      questions: [
        {
          id: "household-management-401-l03-q1",
          text: "What is the strongest indicator of a robust household operating system?",
          skillId: "household-management-401-skill-governance",
          options: [
            { id: "a", text: "Tasks are handled informally with no ownership" },
            { id: "b", text: "Roles, escalation paths, and review cadence are explicit" },
            { id: "c", text: "Only one person tracks all critical decisions" },
            { id: "d", text: "Planning happens only during emergencies" }
          ],
          correctOptionId: "b",
          explanation: "Clarity of ownership and cadence is foundational to reliability under stress."
        },
        {
          id: "household-management-401-l03-q2",
          text: "Why should contingency plans include trigger thresholds?",
          skillId: "household-management-401-skill-risk",
          options: [
            { id: "a", text: "To delay action until all uncertainty is removed" },
            { id: "b", text: "To standardize when escalation and fallback actions begin" },
            { id: "c", text: "To reduce documentation effort" },
            { id: "d", text: "To avoid discussing trade-offs" }
          ],
          correctOptionId: "b",
          explanation: "Triggers turn plans into timely action instead of debate during crises."
        },
        {
          id: "household-management-401-l03-q3",
          text: "Most common failure pattern in household disruptions is:",
          skillId: "household-management-401-skill-incident",
          options: [
            { id: "a", text: "Over-communication with clear roles" },
            { id: "b", text: "Undefined roles and delayed decisions" },
            { id: "c", text: "Too many documented playbooks" },
            { id: "d", text: "Routine review meetings" }
          ],
          correctOptionId: "b",
          explanation: "Ambiguity causes response delay and increases downstream impact."
        },
        {
          id: "household-management-401-l03-q4",
          text: "A resilient plan should always include:",
          skillId: "household-management-401-skill-risk",
          options: [
            { id: "a", text: "Only prevention controls" },
            { id: "b", text: "Prevention, detection, and recovery components" },
            { id: "c", text: "A single best-case scenario" },
            { id: "d", text: "No ownership assignments" }
          ],
          correctOptionId: "b",
          explanation: "Coverage across prevention, detection, and recovery improves end-to-end resilience."
        }
      ],
      learningAids: [
        {
          id: "household-management-401-l03-a1",
          type: "mnemonic",
          title: "RACE",
          content: "Roles, Alerts, Controls, Escalation."
        }
      ]
    },
    {
      id: "household-management-401-l04",
      title: "Financial, Legal, and Care Infrastructure",
      type: "video",
      duration: 14,
      chunks: [
        {
          id: "household-management-401-l04-c1",
          kind: "concept",
          title: "Financial Resilience Stack",
          content:
            "Expert household planning coordinates liquidity buffers, debt strategy, insurance coverage, and long-horizon goals. The right structure depends on volatility exposure and dependency count."
        },
        {
          id: "household-management-401-l04-c2",
          kind: "concept",
          title: "Legal and Documentation Readiness",
          content:
            "Core documentation includes emergency contacts, authorization and consent forms, key account instructions, and jurisdiction-appropriate legal instruments. Documentation quality affects recovery speed and conflict risk."
        },
        {
          id: "household-management-401-l04-c3",
          kind: "recap",
          title: "Care Logistics",
          content:
            "Intergenerational care planning should model scheduling, backup coverage, medical communication pathways, and burnout prevention for primary caregivers."
        }
      ],
      flashcards: [
        {
          id: "household-management-401-l04-f1",
          front: "Liquidity buffer",
          back: "Accessible reserves for short-term disruptions without forced high-cost borrowing."
        },
        {
          id: "household-management-401-l04-f2",
          front: "Care continuity",
          back: "Ability to sustain dependent care standards across disruptions or caregiver unavailability."
        },
        {
          id: "household-management-401-l04-f3",
          front: "Documentation readiness",
          back: "Maintained records and instructions required for fast, low-conflict response."
        }
      ],
      learningAids: [
        {
          id: "household-management-401-l04-a1",
          type: "image",
          title: "Resilience Stack Diagram",
          content: "Layered view of cash, insurance, legal, and care systems with dependencies."
        }
      ]
    },
    {
      id: "household-management-401-l05",
      title: "Operations Dashboard and Trade-off Simulation",
      type: "interactive",
      duration: 17,
      chunks: [
        {
          id: "household-management-401-l05-c1",
          kind: "practice",
          title: "Case: Multi-Constraint Household",
          content:
            "You manage a household facing irregular income, school schedule complexity, and caregiver capacity limits. Build a monthly operating plan that protects essentials while preserving recovery margin."
        },
        {
          id: "household-management-401-l05-c2",
          kind: "recap",
          title: "Quality Signals",
          content:
            "Strong plans include measurable indicators, risk ownership, protected buffers, and explicit triggers for adjustment."
        }
      ],
      interactiveActivities: [
        {
          id: "household-management-401-l05-act1",
          type: "timeline_builder",
          title: "Quarterly Resilience Planner",
          description: "Sequence priority actions across a 90-day household stabilization plan.",
          data: {
            initiatives: [
              "Automate essential bill and savings flows",
              "Document emergency contacts and care instructions",
              "Create backup transport and school pickup plan",
              "Run monthly risk review and adjustment meeting",
              "Set burnout prevention schedule for primary caregiver"
            ]
          }
        },
        {
          id: "household-management-401-l05-act2",
          type: "sorting_buckets",
          title: "Indicator Classification",
          description: "Sort household signals by planning horizon.",
          buckets: ["Early Warning", "Operational", "Strategic"],
          items: [
            { text: "Credit utilization trend", bucket: "Early Warning" },
            { text: "Weekly schedule conflict count", bucket: "Operational" },
            { text: "Emergency reserve months of coverage", bucket: "Strategic" },
            { text: "Caregiver fatigue self-rating", bucket: "Early Warning" }
          ]
        }
      ],
      metadata: {
        prompts: [
          "Which one metric would you monitor weekly to detect stability drift early?",
          "What trade-off will you accept this quarter and why?",
          "What trigger would force a plan reset within 24 hours?"
        ]
      },
      learningAids: [
        {
          id: "household-management-401-l05-a1",
          type: "practice",
          title: "Household KPI Scorecard",
          content: "Template linking metric, threshold, owner, review cadence, and intervention playbook."
        }
      ]
    },
    {
      id: "household-management-401-l06",
      title: "Checkpoint 2: Strategy and Execution",
      type: "quiz",
      duration: 11,
      questions: [
        {
          id: "household-management-401-l06-q1",
          text: "Best reason to track both leading and lagging indicators in household planning?",
          skillId: "household-management-401-skill-analytics",
          options: [
            { id: "a", text: "Leading indicators replace all outcome measures" },
            { id: "b", text: "Leading indicators provide early warnings while lagging indicators confirm outcomes" },
            { id: "c", text: "Lagging indicators are never useful" },
            { id: "d", text: "Only annual indicators matter" }
          ],
          correctOptionId: "b",
          explanation: "Combining both supports both prevention and accountability."
        },
        {
          id: "household-management-401-l06-q2",
          text: "When should a household escalate from routine operations to incident mode?",
          skillId: "household-management-401-skill-incident",
          options: [
            { id: "a", text: "Only after all reserves are exhausted" },
            { id: "b", text: "When predefined trigger thresholds are crossed" },
            { id: "c", text: "Whenever one task is late" },
            { id: "d", text: "Only at year-end review" }
          ],
          correctOptionId: "b",
          explanation: "Threshold-based escalation reduces delay and confusion."
        },
        {
          id: "household-management-401-l06-q3",
          text: "Most defensible recommendation for a high-stress household is:",
          skillId: "household-management-401-skill-strategy",
          options: [
            { id: "a", text: "Maximize complexity to capture every edge case" },
            { id: "b", text: "Use simple repeatable protocols with clear ownership" },
            { id: "c", text: "Defer all planning to annual meetings" },
            { id: "d", text: "Rely on memory instead of written procedures" }
          ],
          correctOptionId: "b",
          explanation: "Simple, repeatable systems are more reliable under pressure."
        },
        {
          id: "household-management-401-l06-q4",
          text: "Why include backup caregiver pathways in household operations?",
          skillId: "household-management-401-skill-care",
          options: [
            { id: "a", text: "To avoid documenting primary care routines" },
            { id: "b", text: "To reduce single-point-of-failure risk for dependent care" },
            { id: "c", text: "To remove communication responsibilities" },
            { id: "d", text: "To increase scheduling uncertainty" }
          ],
          correctOptionId: "b",
          explanation: "Redundancy in care pathways protects continuity and safety."
        },
        {
          id: "household-management-401-l06-q5",
          text: "What makes a household strategy proposal credible to all adults involved?",
          skillId: "household-management-401-skill-communication",
          options: [
            { id: "a", text: "Only motivational language" },
            { id: "b", text: "Clear assumptions, measurable outcomes, and role accountability" },
            { id: "c", text: "No mention of constraints" },
            { id: "d", text: "A long task list without priorities" }
          ],
          correctOptionId: "b",
          explanation: "Credibility comes from transparent assumptions and operational clarity."
        }
      ],
      learningAids: [
        {
          id: "household-management-401-l06-a1",
          type: "mnemonic",
          title: "CLEAR",
          content: "Constraints, Levers, Evidence, Accountability, Review."
        }
      ]
    },
    {
      id: "household-management-401-l07",
      title: "Capstone: Household Resilience Board Proposal",
      type: "interactive",
      duration: 19,
      chunks: [
        {
          id: "household-management-401-l07-c1",
          kind: "practice",
          title: "Capstone Brief",
          content:
            "Develop a one-year resilience plan for a complex household with multiple dependents and variable income. Include governance model, risk controls, financial and care infrastructure, and execution milestones."
        },
        {
          id: "household-management-401-l07-c2",
          kind: "recap",
          title: "Assessment Criteria",
          content:
            "High-quality plans define decision rights, measurable KPIs, realistic sequencing, and explicit risk acceptance where trade-offs are unavoidable."
        }
      ],
      metadata: {
        prompts: [
          "Present top three risks and your control strategy for each.",
          "Define one weekly and one monthly KPI for household stability.",
          "State one deferred initiative and the trigger for reprioritization."
        ]
      },
      learningAids: [
        {
          id: "household-management-401-l07-a1",
          type: "practice",
          title: "Board Memo Template",
          content: "Template for objective, options, recommendation, KPI plan, and contingency controls."
        }
      ]
    }
  ]
};
