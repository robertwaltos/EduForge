import type { LearningModule } from "@/lib/modules/types";

export const Windows401Module: LearningModule = {
  id: "windows-401",
  title: "Windows Platform Strategy, Governance, and Enterprise Resilience",
  description:
    "Expert-level Windows platform curriculum on operating model design, fleet governance, reliability economics, supply-chain trust, and executive-level transformation planning.",
  subject: "Operating Systems",
  tags: ["core", "curriculum", "interactive", "windows", "governance", "strategy", "enterprise"],
  minAge: 17,
  maxAge: 99,
  version: "2.0.0",
  difficultyBand: "advanced",
  localeSupport: ["en"],
  thumbnail: "/placeholders/lesson-robot.svg",
  learningObjectives: [
    "Design Windows platform operating models aligned with business, security, and reliability goals",
    "Govern fleet release risk with staged rollout policy and measurable quality gates",
    "Evaluate endpoint investments using outage-cost and productivity-impact economics",
    "Lead severe endpoint incident command with explicit decision rights",
    "Build software provenance and release assurance controls for endpoint trust",
    "Create multi-year Windows transformation roadmaps with clear KPI ownership"
  ],
  lessons: [
    {
      id: "windows-401-l01",
      title: "Windows Platform Operating Models and Decision Rights",
      type: "video",
      duration: 14,
      chunks: [
        {
          id: "windows-401-l01-c1",
          kind: "concept",
          title: "Ownership Model Trade-offs",
          content:
            "Enterprise endpoint strategy must balance centralized control with local domain agility. Central models improve consistency; federated models improve responsiveness but require strong governance standards."
        },
        {
          id: "windows-401-l01-c2",
          kind: "concept",
          title: "Decision Rights in High-Stakes Events",
          content:
            "Major release incidents, emergency security revocations, and policy exceptions require predefined authority boundaries. Ambiguous ownership extends incident duration."
        },
        {
          id: "windows-401-l01-c3",
          kind: "recap",
          title: "Operational Cadence",
          content:
            "High-maturity endpoint programs run weekly risk triage, monthly reliability and compliance scorecards, and quarterly strategic backlog reprioritization."
        }
      ],
      flashcards: [
        {
          id: "windows-401-l01-f1",
          front: "Operating model",
          back: "Organizational design for ownership, service delivery, and governance."
        },
        {
          id: "windows-401-l01-f2",
          front: "Decision rights",
          back: "Explicit authority for approvals, escalations, and emergency action."
        },
        {
          id: "windows-401-l01-f3",
          front: "Governance cadence",
          back: "Recurring review cycle that sustains reliability and risk control."
        }
      ],
      learningAids: [
        {
          id: "windows-401-l01-a1",
          type: "image",
          title: "Endpoint Operating Model Blueprint",
          content: "Blueprint contrasting centralized, federated, and hybrid endpoint governance."
        }
      ]
    },
    {
      id: "windows-401-l02",
      title: "Fleet Release Governance and Safety Gates Lab",
      type: "interactive",
      duration: 17,
      chunks: [
        {
          id: "windows-401-l02-c1",
          kind: "concept",
          title: "Blast Radius Management",
          content:
            "Windows fleet changes can trigger broad outages if rollout controls are weak. Safety requires cohort sequencing, health gates, rollback triggers, and live telemetry monitoring."
        },
        {
          id: "windows-401-l02-c2",
          kind: "practice",
          title: "Policy Lifecycle Governance",
          content:
            "Each high-risk release should move through proposal, simulation, pilot validation, staged rollout, and post-release verification with auditable owner sign-off."
        }
      ],
      interactiveActivities: [
        {
          id: "windows-401-l02-act1",
          type: "matching_pairs",
          title: "Control-to-Risk Match",
          description: "Match governance controls to release risks they mitigate.",
          pairs: [
            { left: "Canary cohort", right: "Limits early impact and reveals regressions" },
            { left: "Crash-rate promotion gate", right: "Prevents rollout when stability declines" },
            { left: "Automated rollback threshold", right: "Triggers rapid reversion under failure" },
            { left: "Exception approval workflow", right: "Prevents unmanaged policy bypass" }
          ]
        },
        {
          id: "windows-401-l02-act2",
          type: "scenario_practice",
          title: "Major Rollout Incident Exercise",
          description: "Contain a widespread endpoint issue caused by policy deployment defect.",
          instructions: [
            "Choose first containment action and justify risk profile.",
            "Define one governance enhancement for future rollout."
          ]
        }
      ],
      metadata: {
        prompts: [
          "Which leading indicator should gate rollout promotion?",
          "How should pilot cohorts be selected to maximize detection quality?",
          "What evidence is mandatory before advancing to full fleet?"
        ]
      },
      learningAids: [
        {
          id: "windows-401-l02-a1",
          type: "practice",
          title: "Release Governance Worksheet",
          content: "Template for rollout rings, gate metrics, rollback conditions, and owner approvals."
        }
      ]
    },
    {
      id: "windows-401-l03",
      title: "Checkpoint 1: Governance and Release Operations",
      type: "quiz",
      duration: 10,
      questions: [
        {
          id: "windows-401-l03-q1",
          text: "Why use canary cohorts for high-impact Windows changes?",
          skillId: "windows-401-skill-governance",
          options: [
            { id: "a", text: "To accelerate global failure" },
            { id: "b", text: "To validate behavior before broad rollout" },
            { id: "c", text: "To avoid telemetry requirements" },
            { id: "d", text: "To remove rollback planning" }
          ],
          correctOptionId: "b",
          explanation: "Canaries reduce exposure while testing real-world impact."
        },
        {
          id: "windows-401-l03-q2",
          text: "Most critical governance failure in severe incidents is:",
          skillId: "windows-401-skill-incident",
          options: [
            { id: "a", text: "Clear command ownership" },
            { id: "b", text: "Delayed decisions from unclear authority" },
            { id: "c", text: "Structured updates" },
            { id: "d", text: "Predefined rollback triggers" }
          ],
          correctOptionId: "b",
          explanation: "Unclear authority increases outage duration and business impact."
        },
        {
          id: "windows-401-l03-q3",
          text: "A defensible release decision record should include:",
          skillId: "windows-401-skill-governance",
          options: [
            { id: "a", text: "Only completion statement" },
            { id: "b", text: "Validation evidence, risk notes, owner, and rollback criteria" },
            { id: "c", text: "No versioned policy reference" },
            { id: "d", text: "Informal team chat summary" }
          ],
          correctOptionId: "b",
          explanation: "Structured records support auditability and repeatable operations."
        },
        {
          id: "windows-401-l03-q4",
          text: "The primary value of exception registers is:",
          skillId: "windows-401-skill-governance",
          options: [
            { id: "a", text: "To hide unresolved risk" },
            { id: "b", text: "To track approved deviation with owner and expiry" },
            { id: "c", text: "To replace baseline policy" },
            { id: "d", text: "To remove review cadence" }
          ],
          correctOptionId: "b",
          explanation: "Exception governance prevents silent long-term control erosion."
        }
      ],
      learningAids: [
        {
          id: "windows-401-l03-a1",
          type: "mnemonic",
          title: "GATE",
          content: "Goals, Approvals, Thresholds, Evidence."
        }
      ]
    },
    {
      id: "windows-401-l04",
      title: "Reliability Economics and Platform Portfolio Strategy",
      type: "video",
      duration: 14,
      chunks: [
        {
          id: "windows-401-l04-c1",
          kind: "concept",
          title: "Cost of Endpoint Failure",
          content:
            "Endpoint instability impacts productivity, support operations, remediation cost, and business trust. Strategic investment decisions should be evaluated through expected risk and outage-cost reduction."
        },
        {
          id: "windows-401-l04-c2",
          kind: "concept",
          title: "Portfolio Prioritization",
          content:
            "Initiatives should be ranked by dependency criticality, recurrence of incident classes, and mitigation confidence. Foundational controls often produce the highest long-term return."
        },
        {
          id: "windows-401-l04-c3",
          kind: "example",
          title: "Executive Framing",
          content:
            "Executive recommendations should quantify projected outcomes and assumptions: 'Health-gated rollout enforcement is projected to reduce high-severity release incidents by 30% over two quarters.'"
        }
      ],
      flashcards: [
        {
          id: "windows-401-l04-f1",
          front: "Reliability ROI",
          back: "Expected outage or productivity-loss reduction per unit investment."
        },
        {
          id: "windows-401-l04-f2",
          front: "Dependency criticality",
          back: "Measure of how many core workflows rely on a platform service."
        },
        {
          id: "windows-401-l04-f3",
          front: "Mitigation confidence",
          back: "Estimated likelihood that planned control delivers intended impact."
        }
      ],
      learningAids: [
        {
          id: "windows-401-l04-a1",
          type: "image",
          title: "Investment Prioritization Matrix",
          content: "Matrix ranking endpoint initiatives by impact potential and implementation complexity."
        }
      ]
    },
    {
      id: "windows-401-l05",
      title: "Supply Chain Trust and Release Assurance Lab",
      type: "interactive",
      duration: 17,
      chunks: [
        {
          id: "windows-401-l05-c1",
          kind: "concept",
          title: "Endpoint Trust Boundaries",
          content:
            "Endpoint integrity depends on trusted sources, controlled package flow, signed artifacts, and admission checks before broad deployment."
        },
        {
          id: "windows-401-l05-c2",
          kind: "practice",
          title: "Provenance Workflow",
          content:
            "Release assurance must include source validation, build attestations, change approvals, and tracked exceptions with expiry and review."
        }
      ],
      interactiveActivities: [
        {
          id: "windows-401-l05-act1",
          type: "sorting_buckets",
          title: "Provenance Control Sort",
          description: "Sort trust controls by lifecycle stage.",
          buckets: ["Source", "Build", "Deploy"],
          items: [
            { text: "Source signature verification", bucket: "Source" },
            { text: "Signed release package with attestations", bucket: "Build" },
            { text: "Deployment admission policy gate", bucket: "Deploy" },
            { text: "Dependency allowlist governance", bucket: "Source" }
          ]
        },
        {
          id: "windows-401-l05-act2",
          type: "scenario_practice",
          title: "Compromised Artifact Drill",
          description: "Respond to suspected package tampering in endpoint rollout pipeline.",
          instructions: [
            "Define immediate containment action.",
            "Specify one governance improvement for future prevention."
          ]
        }
      ],
      metadata: {
        prompts: [
          "Which provenance signals should block deployment automatically?",
          "How do you balance release speed with assurance depth?",
          "What evidence should security and audit teams require each release?"
        ]
      },
      learningAids: [
        {
          id: "windows-401-l05-a1",
          type: "practice",
          title: "Provenance Audit Worksheet",
          content: "Template for source checks, build evidence, deploy gating, and exception tracking."
        }
      ]
    },
    {
      id: "windows-401-l06",
      title: "Checkpoint 2: Strategy, Trust, and Governance",
      type: "quiz",
      duration: 11,
      questions: [
        {
          id: "windows-401-l06-q1",
          text: "Best metric pairing for endpoint reliability investment decisions is:",
          skillId: "windows-401-skill-strategy",
          options: [
            { id: "a", text: "Desktop theme preference and app count" },
            { id: "b", text: "Incident impact cost and dependency criticality" },
            { id: "c", text: "Boot animation speed and icon density" },
            { id: "d", text: "Ticket subject keywords" }
          ],
          correctOptionId: "b",
          explanation: "Impact and centrality indicate highest-value risk reduction opportunities."
        },
        {
          id: "windows-401-l06-q2",
          text: "Why enforce provenance controls before broad endpoint rollout?",
          skillId: "windows-401-skill-supply-chain",
          options: [
            { id: "a", text: "To increase uncertainty" },
            { id: "b", text: "To reduce risk from tampered or untrusted artifacts" },
            { id: "c", text: "To avoid patching" },
            { id: "d", text: "To remove change ownership" }
          ],
          correctOptionId: "b",
          explanation: "Provenance checks reduce supply-chain compromise risk."
        },
        {
          id: "windows-401-l06-q3",
          text: "A strong executive platform recommendation should include:",
          skillId: "windows-401-skill-strategy",
          options: [
            { id: "a", text: "Only technical depth" },
            { id: "b", text: "Outcome metrics, assumptions, risks, and owners" },
            { id: "c", text: "No uncertainty language" },
            { id: "d", text: "Unbounded roadmap promises" }
          ],
          correctOptionId: "b",
          explanation: "Decision quality depends on quantified outcomes and transparent risk framing."
        },
        {
          id: "windows-401-l06-q4",
          text: "Leading indicators are valuable because they:",
          skillId: "windows-401-skill-governance",
          options: [
            { id: "a", text: "Only explain past failures" },
            { id: "b", text: "Support proactive intervention before major incidents" },
            { id: "c", text: "Replace all lagging metrics" },
            { id: "d", text: "Eliminate need for review cadence" }
          ],
          correctOptionId: "b",
          explanation: "Early signals enable corrective action while risk remains controllable."
        },
        {
          id: "windows-401-l06-q5",
          text: "During severe endpoint incidents, explicit decision rights primarily improve:",
          skillId: "windows-401-skill-incident",
          options: [
            { id: "a", text: "Delay and ambiguity" },
            { id: "b", text: "Containment speed and command clarity" },
            { id: "c", text: "Speculative debate" },
            { id: "d", text: "Need for evidence" }
          ],
          correctOptionId: "b",
          explanation: "Clear authority shortens response time and reduces coordination failures."
        }
      ],
      learningAids: [
        {
          id: "windows-401-l06-a1",
          type: "mnemonic",
          title: "CLEAR",
          content: "Context, Levers, Economics, Accountability, Risk."
        }
      ]
    },
    {
      id: "windows-401-l07",
      title: "Capstone: Windows Endpoint Transformation Proposal",
      type: "interactive",
      duration: 20,
      chunks: [
        {
          id: "windows-401-l07-c1",
          kind: "practice",
          title: "Capstone Brief",
          content:
            "Develop a two-year Windows endpoint transformation proposal balancing security, reliability, user productivity, and operating cost. Include governance structure, control portfolio, and milestone plan."
        },
        {
          id: "windows-401-l07-c2",
          kind: "recap",
          title: "Assessment Criteria",
          content:
            "High-quality proposals define measurable outcomes, dependency-aware sequencing, explicit risk acceptance, and accountable ownership at each phase."
        }
      ],
      metadata: {
        prompts: [
          "Present three strategic initiatives with quantified expected impact.",
          "Identify top three risks and assign owners.",
          "Define one executive and one engineering KPI for each initiative."
        ]
      },
      learningAids: [
        {
          id: "windows-401-l07-a1",
          type: "practice",
          title: "Board Memo Framework",
          content: "Template for objective, options, recommendation, economics, controls, and quarterly milestones."
        }
      ]
    }
  ]
};
