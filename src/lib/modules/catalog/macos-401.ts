import type { LearningModule } from "@/lib/modules/types";

export const Macos401Module: LearningModule = {
  id: "macos-401",
  title: "Apple Platform Strategy, Governance, and Enterprise Reliability",
  description:
    "Expert-level macOS and Apple endpoint strategy curriculum focused on platform governance, fleet economics, supply-chain trust, severe incident leadership, and multi-year transformation planning.",
  subject: "Operating Systems",
  tags: ["core", "curriculum", "interactive", "macos", "governance", "enterprise", "strategy"],
  minAge: 17,
  maxAge: 99,
  version: "2.0.0",
  difficultyBand: "advanced",
  localeSupport: ["en"],
  thumbnail: "/placeholders/lesson-robot.svg",
  learningObjectives: [
    "Design enterprise Apple platform operating models with clear ownership boundaries",
    "Govern fleet change risk with staged release policy and measurable quality gates",
    "Evaluate endpoint reliability investments using impact and cost-of-failure economics",
    "Lead cross-functional incident command during severe endpoint disruptions",
    "Implement trusted software provenance and release assurance controls",
    "Build executive-ready platform roadmaps with quarterly capability targets"
  ],
  lessons: [
    {
      id: "macos-401-l01",
      title: "Enterprise Apple Platform Operating Models",
      type: "video",
      duration: 14,
      chunks: [
        {
          id: "macos-401-l01-c1",
          kind: "concept",
          title: "Centralized vs Federated Endpoint Ownership",
          content:
            "Large organizations must decide whether endpoint authority sits in a central platform team, domain-specific operations teams, or a hybrid model. Each model trades control, speed, and consistency."
        },
        {
          id: "macos-401-l01-c2",
          kind: "concept",
          title: "Decision Rights and Escalation",
          content:
            "High-impact decisions such as urgent OS rollout, emergency revocation, and baseline exceptions require explicit authority boundaries. Unclear authority slows containment during major incidents."
        },
        {
          id: "macos-401-l01-c3",
          kind: "recap",
          title: "Operating Rhythm",
          content:
            "Strategic endpoint operations need cadence: weekly risk review, monthly reliability and compliance scorecards, and quarterly architecture debt planning."
        }
      ],
      flashcards: [
        {
          id: "macos-401-l01-f1",
          front: "Platform operating model",
          back: "Structure of ownership, decision paths, and service boundaries for endpoint delivery."
        },
        {
          id: "macos-401-l01-f2",
          front: "Decision rights",
          back: "Defined authority for approvals, exceptions, and emergency actions."
        },
        {
          id: "macos-401-l01-f3",
          front: "Operational cadence",
          back: "Recurring review rhythm that keeps governance and execution aligned."
        }
      ],
      learningAids: [
        {
          id: "macos-401-l01-a1",
          type: "image",
          title: "Endpoint Operating Model Map",
          content: "Comparison map of centralized, federated, and hybrid endpoint models."
        }
      ]
    },
    {
      id: "macos-401-l02",
      title: "Fleet Release Risk Governance Lab",
      type: "interactive",
      duration: 17,
      chunks: [
        {
          id: "macos-401-l02-c1",
          kind: "concept",
          title: "Release Blast Radius and Health Gates",
          content:
            "macOS fleet releases can fail due to driver changes, app compatibility shifts, or policy collisions. Governance should enforce ring rollout, health checks, and rollback triggers."
        },
        {
          id: "macos-401-l02-c2",
          kind: "practice",
          title: "Policy Lifecycle",
          content:
            "Reliable release governance includes authoring standards, simulation, pilot verification, staged deployment, runtime telemetry, and retirement or revision criteria."
        }
      ],
      interactiveActivities: [
        {
          id: "macos-401-l02-act1",
          type: "matching_pairs",
          title: "Control-to-Risk Match",
          description: "Match release controls to the risk they reduce.",
          pairs: [
            { left: "Pilot cohort gate", right: "Detects compatibility regressions early" },
            { left: "Crash-rate threshold", right: "Blocks rollout when stability degrades" },
            { left: "Automated rollback", right: "Restores baseline when failure trigger is met" },
            { left: "Exception approval workflow", right: "Prevents unmanaged policy bypass" }
          ]
        },
        {
          id: "macos-401-l02-act2",
          type: "scenario_practice",
          title: "Major Release Incident Simulation",
          description: "Contain an enterprise endpoint outage caused by a policy release defect.",
          instructions: [
            "Choose one immediate containment command decision.",
            "Define one governance change for future releases."
          ]
        }
      ],
      metadata: {
        prompts: [
          "Which metric is the best rollout promotion gate in your environment?",
          "How do you choose pilot populations to maximize detection value?",
          "What evidence should be mandatory before promoting to full fleet?"
        ]
      },
      learningAids: [
        {
          id: "macos-401-l02-a1",
          type: "practice",
          title: "Release Governance Worksheet",
          content: "Template for rollout rings, health gates, stop conditions, and owner sign-off."
        }
      ]
    },
    {
      id: "macos-401-l03",
      title: "Checkpoint 1: Governance and Release Safety",
      type: "quiz",
      duration: 10,
      questions: [
        {
          id: "macos-401-l03-q1",
          text: "Why are staged fleet rollouts mandatory for high-impact endpoint changes?",
          skillId: "macos-401-skill-governance",
          options: [
            { id: "a", text: "They maximize immediate blast radius" },
            { id: "b", text: "They reveal defects before full organization impact" },
            { id: "c", text: "They remove need for telemetry" },
            { id: "d", text: "They eliminate rollback planning" }
          ],
          correctOptionId: "b",
          explanation: "Staging reduces exposure and supports evidence-based promotion."
        },
        {
          id: "macos-401-l03-q2",
          text: "Most damaging governance gap during severe incidents is:",
          skillId: "macos-401-skill-incident",
          options: [
            { id: "a", text: "Clear decision authority" },
            { id: "b", text: "Ambiguous ownership and delayed command decisions" },
            { id: "c", text: "Structured incident updates" },
            { id: "d", text: "Defined rollback trigger" }
          ],
          correctOptionId: "b",
          explanation: "Unclear authority extends incident duration and user impact."
        },
        {
          id: "macos-401-l03-q3",
          text: "A high-trust release decision should include:",
          skillId: "macos-401-skill-governance",
          options: [
            { id: "a", text: "Only confidence statements" },
            { id: "b", text: "Validation evidence, risk notes, and rollback criteria" },
            { id: "c", text: "No documentation if rollout succeeds" },
            { id: "d", text: "Single-person verbal approval" }
          ],
          correctOptionId: "b",
          explanation: "Evidence-backed decisions are auditable and repeatable."
        },
        {
          id: "macos-401-l03-q4",
          text: "What is the primary value of endpoint exception registers?",
          skillId: "macos-401-skill-governance",
          options: [
            { id: "a", text: "Hide control gaps" },
            { id: "b", text: "Track risk acceptance with ownership and expiration" },
            { id: "c", text: "Remove compliance scope" },
            { id: "d", text: "Replace baseline policy" }
          ],
          correctOptionId: "b",
          explanation: "Exception governance prevents unmanaged long-term risk accumulation."
        }
      ],
      learningAids: [
        {
          id: "macos-401-l03-a1",
          type: "mnemonic",
          title: "RING",
          content: "Risk, Indicators, Next gate, Governance evidence."
        }
      ]
    },
    {
      id: "macos-401-l04",
      title: "Reliability Economics and Portfolio Prioritization",
      type: "video",
      duration: 14,
      chunks: [
        {
          id: "macos-401-l04-c1",
          kind: "concept",
          title: "Cost of Endpoint Failure",
          content:
            "Endpoint outages create direct and indirect costs: productivity loss, support load spikes, remediation labor, and user trust damage. Investment choices should be driven by expected failure-cost reduction."
        },
        {
          id: "macos-401-l04-c2",
          kind: "concept",
          title: "Portfolio Lens",
          content:
            "Prioritize platform initiatives by dependency criticality, incident recurrence, adoption friction, and mitigation confidence. Foundational controls often outperform high-visibility feature work."
        },
        {
          id: "macos-401-l04-c3",
          kind: "example",
          title: "Executive Framing",
          content:
            "A strategic recommendation should state expected measurable impact and assumptions, for example: 'Managed rollout health gates are expected to reduce high-severity release incidents by 30% over two quarters.'"
        }
      ],
      flashcards: [
        {
          id: "macos-401-l04-f1",
          front: "Reliability ROI",
          back: "Expected reduction in outage impact per unit of platform investment."
        },
        {
          id: "macos-401-l04-f2",
          front: "Dependency criticality",
          back: "How central a platform service is to key business workflows."
        },
        {
          id: "macos-401-l04-f3",
          front: "Mitigation confidence",
          back: "Confidence that a chosen control will achieve predicted outcomes."
        }
      ],
      learningAids: [
        {
          id: "macos-401-l04-a1",
          type: "image",
          title: "Endpoint Investment Matrix",
          content: "Matrix ranking initiatives by risk reduction potential and delivery effort."
        }
      ]
    },
    {
      id: "macos-401-l05",
      title: "Supply Chain and Provenance Assurance Lab",
      type: "interactive",
      duration: 17,
      chunks: [
        {
          id: "macos-401-l05-c1",
          kind: "concept",
          title: "Trust Boundaries in Endpoint Delivery",
          content:
            "Platform trust depends on source authenticity, package integrity, distribution controls, and policy gate enforcement before endpoint deployment."
        },
        {
          id: "macos-401-l05-c2",
          kind: "practice",
          title: "Release Assurance Workflow",
          content:
            "High-trust release operations require signing evidence, provenance metadata, approval records, and exception workflows with expiry and review."
        }
      ],
      interactiveActivities: [
        {
          id: "macos-401-l05-act1",
          type: "sorting_buckets",
          title: "Provenance Control Sort",
          description: "Sort controls by lifecycle stage.",
          buckets: ["Source", "Build", "Deploy"],
          items: [
            { text: "Upstream source verification", bucket: "Source" },
            { text: "Signed package and attestations", bucket: "Build" },
            { text: "Deployment admission gate", bucket: "Deploy" },
            { text: "Dependency trust policy", bucket: "Source" }
          ]
        },
        {
          id: "macos-401-l05-act2",
          type: "scenario_practice",
          title: "Compromised Package Response",
          description: "Respond to suspected package tampering in release pipeline.",
          instructions: [
            "Define first containment control.",
            "Specify one long-term governance improvement."
          ]
        }
      ],
      metadata: {
        prompts: [
          "Which release evidence should be mandatory for production promotion?",
          "How do you balance release speed with provenance assurance?",
          "What signal should trigger immediate release freeze?"
        ]
      },
      learningAids: [
        {
          id: "macos-401-l05-a1",
          type: "practice",
          title: "Provenance Audit Template",
          content: "Template for source checks, build evidence, deploy approval, and exception tracking."
        }
      ]
    },
    {
      id: "macos-401-l06",
      title: "Checkpoint 2: Strategy and Trust",
      type: "quiz",
      duration: 11,
      questions: [
        {
          id: "macos-401-l06-q1",
          text: "Best metric pair for prioritizing endpoint reliability programs is:",
          skillId: "macos-401-skill-strategy",
          options: [
            { id: "a", text: "Wallpaper refresh rate and dock layout count" },
            { id: "b", text: "Incident impact cost and dependency criticality" },
            { id: "c", text: "App icon count and install speed" },
            { id: "d", text: "Number of support chats" }
          ],
          correctOptionId: "b",
          explanation: "Impact and centrality provide the strongest investment signal."
        },
        {
          id: "macos-401-l06-q2",
          text: "Why enforce provenance checks before endpoint deployment?",
          skillId: "macos-401-skill-supply-chain",
          options: [
            { id: "a", text: "To increase release uncertainty" },
            { id: "b", text: "To reduce risk from tampered or untrusted artifacts" },
            { id: "c", text: "To disable patching" },
            { id: "d", text: "To remove compliance evidence" }
          ],
          correctOptionId: "b",
          explanation: "Provenance controls protect against software supply-chain compromise."
        },
        {
          id: "macos-401-l06-q3",
          text: "A credible executive platform recommendation includes:",
          skillId: "macos-401-skill-strategy",
          options: [
            { id: "a", text: "Only technical detail" },
            { id: "b", text: "Outcome metrics, assumptions, risks, and ownership" },
            { id: "c", text: "No uncertainty discussion" },
            { id: "d", text: "Unscoped roadmap promises" }
          ],
          correctOptionId: "b",
          explanation: "Decision quality depends on measurable outcomes and transparent assumptions."
        },
        {
          id: "macos-401-l06-q4",
          text: "Leading indicators help endpoint strategy because they:",
          skillId: "macos-401-skill-governance",
          options: [
            { id: "a", text: "Only describe past incidents" },
            { id: "b", text: "Provide early warning for proactive corrections" },
            { id: "c", text: "Replace all outcome metrics" },
            { id: "d", text: "Eliminate need for policy review" }
          ],
          correctOptionId: "b",
          explanation: "Early signals enable risk mitigation before major failures."
        },
        {
          id: "macos-401-l06-q5",
          text: "In severe endpoint incidents, explicit decision rights improve:",
          skillId: "macos-401-skill-incident",
          options: [
            { id: "a", text: "Ambiguity and delay" },
            { id: "b", text: "Containment speed and command clarity" },
            { id: "c", text: "Speculation volume" },
            { id: "d", text: "Need for evidence" }
          ],
          correctOptionId: "b",
          explanation: "Clear authority reduces coordination latency."
        }
      ],
      learningAids: [
        {
          id: "macos-401-l06-a1",
          type: "mnemonic",
          title: "CLEAR",
          content: "Context, Levers, Economics, Accountability, Risk."
        }
      ]
    },
    {
      id: "macos-401-l07",
      title: "Capstone: Enterprise Apple Platform Transformation Proposal",
      type: "interactive",
      duration: 20,
      chunks: [
        {
          id: "macos-401-l07-c1",
          kind: "practice",
          title: "Capstone Brief",
          content:
            "Create a two-year enterprise Apple platform transformation proposal balancing reliability, security, user productivity, and cost. Include governance model, control portfolio, and quarterly milestones."
        },
        {
          id: "macos-401-l07-c2",
          kind: "recap",
          title: "Assessment Criteria",
          content:
            "High-quality proposals define measurable outcomes, dependency-aware sequencing, explicit risk acceptance, and owner accountability at each phase."
        }
      ],
      metadata: {
        prompts: [
          "Present three strategic initiatives with projected impact.",
          "List top three risks and mitigation ownership.",
          "Define executive and engineering KPIs per initiative."
        ]
      },
      learningAids: [
        {
          id: "macos-401-l07-a1",
          type: "practice",
          title: "Board Memo Template",
          content: "Template for objective, options, recommendation, economics, controls, and milestones."
        }
      ]
    }
  ]
};
