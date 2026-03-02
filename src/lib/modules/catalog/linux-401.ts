import type { LearningModule } from "@/lib/modules/types";

export const Linux401Module: LearningModule = {
  id: "linux-401",
  title: "Linux Platform Strategy, SRE Governance, and Fleet Operations",
  description:
    "Expert-level Linux curriculum on fleet architecture, platform governance, reliability economics, supply-chain trust, and board-level operating strategy for mission-critical environments.",
  subject: "Operating Systems",
  tags: ["core", "curriculum", "interactive", "linux", "governance", "sre", "platform"],
  minAge: 17,
  maxAge: 99,
  version: "2.0.0",
  difficultyBand: "advanced",
  localeSupport: ["en"],
  thumbnail: "/placeholders/lesson-robot.svg",
  learningObjectives: [
    "Design Linux platform operating models for scale, reliability, and organizational clarity",
    "Govern fleet change risk through policy, rollout strategy, and measurable control gates",
    "Evaluate reliability investments using service impact and failure-cost economics",
    "Lead severe incident governance with clear decision rights and learning systems",
    "Build defensible Linux supply-chain and provenance controls",
    "Communicate multi-year platform roadmaps to technical and executive stakeholders"
  ],
  lessons: [
    {
      id: "linux-401-l01",
      title: "Linux Platform Operating Models at Scale",
      type: "video",
      duration: 14,
      chunks: [
        {
          id: "linux-401-l01-c1",
          kind: "concept",
          title: "Central Platform vs Embedded Ops",
          content:
            "Organizations running large Linux fleets must choose how responsibility is distributed. Central platform teams improve consistency and control, while embedded teams improve domain speed. Hybrid models require strict interface contracts and shared governance."
        },
        {
          id: "linux-401-l01-c2",
          kind: "concept",
          title: "Decision Rights and Escalation",
          content:
            "Critical decisions such as kernel upgrade cadence, hardening exceptions, and emergency patch rollout need explicit authority boundaries. Ambiguous ownership is a major incident amplifier."
        },
        {
          id: "linux-401-l01-c3",
          kind: "recap",
          title: "Operating Cadence",
          content:
            "Sustainable platform operations rely on cadence: weekly risk review, monthly reliability scorecard, and quarterly architecture debt and roadmap review."
        }
      ],
      flashcards: [
        {
          id: "linux-401-l01-f1",
          front: "Platform operating model",
          back: "How responsibilities, services, and governance are structured for fleet operations."
        },
        {
          id: "linux-401-l01-f2",
          front: "Decision rights",
          back: "Defined authority to approve, reject, or escalate high-impact changes."
        },
        {
          id: "linux-401-l01-f3",
          front: "Service contract",
          back: "Explicit expectation of capabilities, SLAs, and ownership boundaries between teams."
        }
      ],
      learningAids: [
        {
          id: "linux-401-l01-a1",
          type: "image",
          title: "Operating Model Blueprint",
          content: "Blueprint contrasting centralized, federated, and hybrid Linux platform models."
        }
      ]
    },
    {
      id: "linux-401-l02",
      title: "Fleet Risk Governance and Change Safety Lab",
      type: "interactive",
      duration: 17,
      chunks: [
        {
          id: "linux-401-l02-c1",
          kind: "concept",
          title: "Change Blast Radius",
          content:
            "At fleet scale, minor misconfigurations can trigger widespread failures. Governance requires preflight validation, staged rollout, health gates, and automatic rollback criteria."
        },
        {
          id: "linux-401-l02-c2",
          kind: "practice",
          title: "Policy Lifecycle",
          content:
            "Change policy should define proposal, simulation, approval, rollout stages, monitoring, and retirement. Every high-risk change needs owner, evidence, and fallback path."
        }
      ],
      interactiveActivities: [
        {
          id: "linux-401-l02-act1",
          type: "matching_pairs",
          title: "Control-to-Risk Match",
          description: "Match governance controls to the risks they mitigate.",
          pairs: [
            { left: "Canary rollout", right: "Limits initial impact to small host subset" },
            { left: "Automated health gate", right: "Blocks promotion when service SLO degrades" },
            { left: "Immutable baseline policy", right: "Reduces drift and unauthorized host variance" },
            { left: "Rollback trigger threshold", right: "Defines immediate reversion condition" }
          ]
        },
        {
          id: "linux-401-l02-act2",
          type: "scenario_practice",
          title: "Kernel Patch Incident Exercise",
          description: "Contain fleet instability caused by a bad patch rollout.",
          instructions: [
            "Select first containment action with lowest systemic risk.",
            "Define one governance update to prevent recurrence."
          ]
        }
      ],
      metadata: {
        prompts: [
          "Which metric should gate fleet rollout progression?",
          "How do you choose canary population composition?",
          "What evidence must be captured after high-risk changes?"
        ]
      },
      learningAids: [
        {
          id: "linux-401-l02-a1",
          type: "practice",
          title: "Fleet Change Worksheet",
          content: "Template for scope, canary plan, health gates, rollback trigger, and approver evidence."
        }
      ]
    },
    {
      id: "linux-401-l03",
      title: "Checkpoint 1: Governance and Fleet Safety",
      type: "quiz",
      duration: 10,
      questions: [
        {
          id: "linux-401-l03-q1",
          text: "Why are staged rollouts critical in Linux fleet operations?",
          skillId: "linux-401-skill-governance",
          options: [
            { id: "a", text: "They increase blast radius quickly" },
            { id: "b", text: "They expose failures early before global impact" },
            { id: "c", text: "They remove need for monitoring" },
            { id: "d", text: "They replace rollback design" }
          ],
          correctOptionId: "b",
          explanation: "Staging limits exposure and enables controlled validation."
        },
        {
          id: "linux-401-l03-q2",
          text: "Most common governance failure during severe incidents is:",
          skillId: "linux-401-skill-incident",
          options: [
            { id: "a", text: "Clear escalation ownership" },
            { id: "b", text: "Ambiguous authority and delayed containment" },
            { id: "c", text: "Frequent situation reports" },
            { id: "d", text: "Predefined rollback criteria" }
          ],
          correctOptionId: "b",
          explanation: "Unclear decision rights prolong outage duration and impact."
        },
        {
          id: "linux-401-l03-q3",
          text: "What is the strongest value of immutable baseline policy?",
          skillId: "linux-401-skill-governance",
          options: [
            { id: "a", text: "Prevents all incidents permanently" },
            { id: "b", text: "Reduces drift and improves predictability across hosts" },
            { id: "c", text: "Eliminates need for documentation" },
            { id: "d", text: "Avoids patching" }
          ],
          correctOptionId: "b",
          explanation: "Drift reduction is central to fleet reliability and security posture."
        },
        {
          id: "linux-401-l03-q4",
          text: "A credible high-risk change record should include:",
          skillId: "linux-401-skill-governance",
          options: [
            { id: "a", text: "Only final success claim" },
            { id: "b", text: "Intent, validation evidence, approver, and rollback conditions" },
            { id: "c", text: "No owner assignment" },
            { id: "d", text: "Untracked chat notes" }
          ],
          correctOptionId: "b",
          explanation: "Structured evidence enables accountability and repeatable learning."
        }
      ],
      learningAids: [
        {
          id: "linux-401-l03-a1",
          type: "mnemonic",
          title: "GATE",
          content: "Goal, Approval, Thresholds, Evidence."
        }
      ]
    },
    {
      id: "linux-401-l04",
      title: "Reliability Economics and Platform Portfolio Strategy",
      type: "video",
      duration: 14,
      chunks: [
        {
          id: "linux-401-l04-c1",
          kind: "concept",
          title: "Failure Cost Framing",
          content:
            "Linux platform incidents incur business cost through lost transactions, operational delay, response effort, contractual exposure, and trust erosion. Investment decisions should be driven by expected risk reduction, not tool novelty."
        },
        {
          id: "linux-401-l04-c2",
          kind: "concept",
          title: "Portfolio Prioritization",
          content:
            "Initiatives should be ranked by dependency centrality, incident history, mitigation confidence, and business impact. Foundational changes often outperform visible but lower-leverage optimizations."
        },
        {
          id: "linux-401-l04-c3",
          kind: "example",
          title: "Executive Recommendation Pattern",
          content:
            "Strong recommendations quantify outcomes and assumptions, for example: 'Config baseline enforcement is expected to reduce high-severity drift incidents by 35% in two quarters, contingent on full host enrollment.'"
        }
      ],
      flashcards: [
        {
          id: "linux-401-l04-f1",
          front: "Reliability ROI",
          back: "Expected outage-risk reduction per unit of engineering investment."
        },
        {
          id: "linux-401-l04-f2",
          front: "Dependency centrality",
          back: "Degree to which critical services rely on a specific platform component."
        },
        {
          id: "linux-401-l04-f3",
          front: "Mitigation confidence",
          back: "Likelihood that a planned intervention will produce the predicted improvement."
        }
      ],
      learningAids: [
        {
          id: "linux-401-l04-a1",
          type: "image",
          title: "Risk-Reduction Portfolio Matrix",
          content: "Matrix ranking platform initiatives by systemic impact and implementation effort."
        }
      ]
    },
    {
      id: "linux-401-l05",
      title: "Supply Chain Trust and Provenance Assurance Lab",
      type: "interactive",
      duration: 17,
      chunks: [
        {
          id: "linux-401-l05-c1",
          kind: "concept",
          title: "Trust Boundaries",
          content:
            "Linux fleet security extends beyond host hardening to package provenance, build pipeline integrity, artifact signing, and dependency transparency."
        },
        {
          id: "linux-401-l05-c2",
          kind: "practice",
          title: "Verification Workflow",
          content:
            "Provenance assurance requires documented checks for source authenticity, reproducibility signals, and release approval controls before deployment."
        }
      ],
      interactiveActivities: [
        {
          id: "linux-401-l05-act1",
          type: "sorting_buckets",
          title: "Control Classification",
          description: "Sort controls by where they apply in supply-chain defense.",
          buckets: ["Source", "Build", "Deploy"],
          items: [
            { text: "Signed upstream source verification", bucket: "Source" },
            { text: "Artifact signature and attestations", bucket: "Build" },
            { text: "Admission policy gate in deployment pipeline", bucket: "Deploy" },
            { text: "Dependency allowlist maintenance", bucket: "Source" }
          ]
        },
        {
          id: "linux-401-l05-act2",
          type: "scenario_practice",
          title: "Compromised Package Simulation",
          description: "Respond to suspected package compromise in production pipeline.",
          instructions: [
            "Define immediate containment action.",
            "Specify one permanent control improvement."
          ]
        }
      ],
      metadata: {
        prompts: [
          "Which supply-chain signal should block release automatically?",
          "How do you balance release speed against provenance strictness?",
          "What minimum evidence should auditors receive for platform releases?"
        ]
      },
      learningAids: [
        {
          id: "linux-401-l05-a1",
          type: "practice",
          title: "Provenance Audit Worksheet",
          content: "Template for source evidence, build attestations, deploy approval, and exception tracking."
        }
      ]
    },
    {
      id: "linux-401-l06",
      title: "Checkpoint 2: Economics, Trust, and Strategy",
      type: "quiz",
      duration: 11,
      questions: [
        {
          id: "linux-401-l06-q1",
          text: "Best metric pairing for prioritizing Linux platform reliability investments is:",
          skillId: "linux-401-skill-strategy",
          options: [
            { id: "a", text: "Host count and shell prompt style" },
            { id: "b", text: "Incident cost impact and dependency criticality" },
            { id: "c", text: "Number of package managers installed" },
            { id: "d", text: "Age of log files" }
          ],
          correctOptionId: "b",
          explanation: "Impact and centrality are strongest portfolio signals."
        },
        {
          id: "linux-401-l06-q2",
          text: "Why require artifact provenance checks before deployment?",
          skillId: "linux-401-skill-supply-chain",
          options: [
            { id: "a", text: "To slow delivery with no security benefit" },
            { id: "b", text: "To reduce risk from tampered or untrusted build outputs" },
            { id: "c", text: "To remove patch management" },
            { id: "d", text: "To avoid release documentation" }
          ],
          correctOptionId: "b",
          explanation: "Provenance controls reduce software supply-chain compromise risk."
        },
        {
          id: "linux-401-l06-q3",
          text: "What makes an executive Linux platform recommendation credible?",
          skillId: "linux-401-skill-strategy",
          options: [
            { id: "a", text: "Only technical jargon" },
            { id: "b", text: "Measurable outcomes, assumptions, risks, and owner accountability" },
            { id: "c", text: "Longest incident timeline" },
            { id: "d", text: "No mention of trade-offs" }
          ],
          correctOptionId: "b",
          explanation: "Executives need decision-ready impact with clear risk boundaries."
        },
        {
          id: "linux-401-l06-q4",
          text: "Leading indicators in fleet operations are useful because they:",
          skillId: "linux-401-skill-governance",
          options: [
            { id: "a", text: "Only explain past outages" },
            { id: "b", text: "Enable earlier corrective action before major incidents" },
            { id: "c", text: "Replace all lagging indicators" },
            { id: "d", text: "Remove need for SLOs" }
          ],
          correctOptionId: "b",
          explanation: "Early signals enable proactive risk reduction."
        },
        {
          id: "linux-401-l06-q5",
          text: "During severe fleet incidents, explicit decision rights primarily improve:",
          skillId: "linux-401-skill-incident",
          options: [
            { id: "a", text: "Delay and ambiguity" },
            { id: "b", text: "Containment speed and coordination clarity" },
            { id: "c", text: "Volume of speculation" },
            { id: "d", text: "Need for communication" }
          ],
          correctOptionId: "b",
          explanation: "Clear authority reduces response latency in high-pressure events."
        }
      ],
      learningAids: [
        {
          id: "linux-401-l06-a1",
          type: "mnemonic",
          title: "CLEAR",
          content: "Context, Levers, Economics, Accountability, Risk."
        }
      ]
    },
    {
      id: "linux-401-l07",
      title: "Capstone: Linux Platform Transformation Proposal",
      type: "interactive",
      duration: 20,
      chunks: [
        {
          id: "linux-401-l07-c1",
          kind: "practice",
          title: "Capstone Brief",
          content:
            "Develop a board-level proposal for a two-year Linux platform transformation covering fleet governance, reliability improvements, supply-chain trust controls, and execution milestones."
        },
        {
          id: "linux-401-l07-c2",
          kind: "recap",
          title: "Assessment Criteria",
          content:
            "Strong proposals align engineering changes with business outcomes, quantify expected improvements, and define ownership, risk acceptance, and quarterly checkpoints."
        }
      ],
      metadata: {
        prompts: [
          "Present three strategic initiatives and expected impact metrics.",
          "Identify top three risks and mitigation owners.",
          "Define one executive KPI and one engineering KPI per initiative."
        ]
      },
      learningAids: [
        {
          id: "linux-401-l07-a1",
          type: "practice",
          title: "Board Memo Framework",
          content: "Template for options, recommendation, economics, risk controls, and milestone roadmap."
        }
      ]
    }
  ]
};
