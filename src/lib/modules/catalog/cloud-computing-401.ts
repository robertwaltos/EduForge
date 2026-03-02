import type { LearningModule } from "@/lib/modules/types";

export const CloudComputing401Module: LearningModule = {
  id: "cloud-computing-401",
  title: "Cloud Strategy, Governance, and Platform Leadership",
  description:
    "Expert-level cloud curriculum on enterprise platform strategy, governance operating models, reliability economics, regulatory controls, and executive decision frameworks for large-scale cloud programs.",
  subject: "Computer Science",
  tags: ["core", "curriculum", "interactive", "cloud", "governance", "platform-leadership"],
  minAge: 17,
  maxAge: 99,
  version: "2.0.0",
  difficultyBand: "advanced",
  localeSupport: ["en"],
  thumbnail: "/placeholders/lesson-robot.svg",
  learningObjectives: [
    "Design cloud platform operating models aligned to business goals and risk posture",
    "Build governance systems that balance developer velocity with security and compliance",
    "Evaluate cloud investments using reliability, performance, and unit-economics outcomes",
    "Create executive-ready architecture narratives for modernization and migration decisions",
    "Develop multi-year platform roadmaps with measurable capability milestones",
    "Establish incident, audit, and risk governance loops for continuous improvement"
  ],
  lessons: [
    {
      id: "cloud-computing-401-l01",
      title: "Enterprise Cloud Operating Models",
      type: "video",
      duration: 14,
      objectives: [
        "Compare centralized, federated, and product-aligned platform models",
        "Define responsibilities across platform, security, and application teams",
        "Map governance decisions to operating cadence"
      ],
      chunks: [
        {
          id: "cloud-computing-401-l01-c1",
          kind: "concept",
          title: "Operating Model Archetypes",
          content:
            "Enterprises typically evolve through three cloud operating models. A centralized model controls standards tightly and reduces variance, but can become a delivery bottleneck. A federated model distributes responsibility to domain teams with shared baseline controls. A platform product model treats internal platform capabilities as products with roadmaps, service-level commitments, and customer feedback loops. High-performing organizations often combine federated delivery with a strong platform product core."
        },
        {
          id: "cloud-computing-401-l01-c2",
          kind: "concept",
          title: "Decision Rights and Accountability",
          content:
            "Cloud governance fails when decision rights are implicit. Organizations need explicit ownership for architecture exceptions, control waivers, incident severity classification, and spend approvals. RACI mapping clarifies accountable roles and shortens escalation time. Governance boards should set policy direction while platform and product teams execute within clear guardrails."
        },
        {
          id: "cloud-computing-401-l01-c3",
          kind: "recap",
          title: "From Framework to Weekly Rhythm",
          content:
            "Operating models become real only through cadence: weekly architecture triage, monthly reliability review, quarterly portfolio prioritization, and annual capability planning. The cadence should surface leading indicators early so leadership acts before outages, audit findings, or cost overruns become systemic."
        }
      ],
      flashcards: [
        {
          id: "cloud-computing-401-l01-f1",
          front: "Platform product model",
          back: "Operating model where internal platform capabilities are managed like products with users, SLAs, and roadmaps."
        },
        {
          id: "cloud-computing-401-l01-f2",
          front: "Decision rights",
          back: "Explicit authority boundaries defining who can approve, reject, or escalate technical and governance decisions."
        },
        {
          id: "cloud-computing-401-l01-f3",
          front: "Governance cadence",
          back: "Scheduled rhythm of reviews and decisions that keeps controls and delivery aligned over time."
        }
      ],
      learningAids: [
        {
          id: "cloud-computing-401-l01-a1",
          type: "image",
          title: "Operating Model Matrix",
          content: "Comparison matrix of centralized, federated, and platform-product cloud models with strengths and risks."
        }
      ]
    },
    {
      id: "cloud-computing-401-l02",
      title: "Policy-as-Code and Compliance by Design Lab",
      type: "interactive",
      duration: 17,
      objectives: [
        "Translate regulatory controls into technical guardrails",
        "Design policy evaluation points in CI/CD and runtime",
        "Build evidence pipelines that reduce audit friction"
      ],
      chunks: [
        {
          id: "cloud-computing-401-l02-c1",
          kind: "concept",
          title: "Compliance as System Behavior",
          content:
            "Mature organizations implement compliance as continuous system behavior, not annual checklist work. Policy-as-code enforces standards at provisioning and deployment boundaries. Controls such as encryption enforcement, restricted public exposure, and approved image provenance can be blocked automatically when policies fail."
        },
        {
          id: "cloud-computing-401-l02-c2",
          kind: "practice",
          title: "Evidence Supply Chain",
          content:
            "Audit stress decreases when control evidence is generated continuously. Useful artifacts include policy evaluation logs, change approvals, key rotation history, access review attestations, and incident closure records. The key is traceability from control requirement to technical enforcement and proof artifact."
        }
      ],
      interactiveActivities: [
        {
          id: "cloud-computing-401-l02-act1",
          type: "matching_pairs",
          title: "Control-to-Guardrail Match",
          description: "Match each governance control to a practical policy-as-code enforcement point.",
          pairs: [
            { left: "No public object storage for sensitive data", right: "IaC policy check on bucket ACL and network exposure" },
            { left: "Only approved base images in production", right: "CI image signing and registry admission policy" },
            { left: "Least-privilege service permissions", right: "IAM policy linting + periodic access recertification" },
            { left: "Encryption at rest for regulated workloads", right: "Provisioning rule requiring managed key-backed encryption" }
          ]
        },
        {
          id: "cloud-computing-401-l02-act2",
          type: "scenario_practice",
          title: "Audit Finding Response",
          description: "Create a remediation plan for repeated policy violations in one business unit.",
          instructions: [
            "Define immediate containment action.",
            "Define systemic fix and evidence you will collect next quarter."
          ]
        }
      ],
      metadata: {
        prompts: [
          "How would you prevent teams from bypassing IaC policy checks under delivery pressure?",
          "Which two audit artifacts should be fully automated first and why?",
          "What is one risk of overly strict guardrails and how do you mitigate it?"
        ]
      },
      learningAids: [
        {
          id: "cloud-computing-401-l02-a1",
          type: "practice",
          title: "Compliance Traceability Canvas",
          content: "Template linking requirement, policy control, enforcement point, and evidence artifact."
        }
      ]
    },
    {
      id: "cloud-computing-401-l03",
      title: "Checkpoint 1: Governance and Controls",
      type: "quiz",
      duration: 10,
      questions: [
        {
          id: "cloud-computing-401-l03-q1",
          text: "What is the strongest benefit of policy-as-code in enterprise cloud delivery?",
          skillId: "cloud-computing-401-skill-governance",
          options: [
            { id: "a", text: "Eliminates need for any human oversight" },
            { id: "b", text: "Enforces controls consistently and early in delivery workflows" },
            { id: "c", text: "Reduces all infrastructure costs" },
            { id: "d", text: "Replaces incident response processes" }
          ],
          correctOptionId: "b",
          explanation: "Policy-as-code catches violations at build/provision time with consistent enforcement."
        },
        {
          id: "cloud-computing-401-l03-q2",
          text: "Which artifact most directly proves access governance quality over time?",
          skillId: "cloud-computing-401-skill-compliance",
          options: [
            { id: "a", text: "One-time architecture diagram" },
            { id: "b", text: "Recurring access recertification records with approvals" },
            { id: "c", text: "Marketing roadmap" },
            { id: "d", text: "Cloud provider SLA PDF" }
          ],
          correctOptionId: "b",
          explanation: "Periodic recertification records show ongoing control operation, not one-time intent."
        },
        {
          id: "cloud-computing-401-l03-q3",
          text: "A governance board frequently blocks releases due to late control failures. Best systemic fix?",
          skillId: "cloud-computing-401-skill-governance",
          options: [
            { id: "a", text: "Skip governance review for critical deadlines" },
            { id: "b", text: "Shift control checks left into CI/CD and IaC review" },
            { id: "c", text: "Increase manual paperwork" },
            { id: "d", text: "Delay all deployments by one week" }
          ],
          correctOptionId: "b",
          explanation: "Earlier automated checks prevent late-stage release blocking and reduce rework."
        },
        {
          id: "cloud-computing-401-l03-q4",
          text: "Which governance pattern best preserves both standardization and product-team velocity?",
          skillId: "cloud-computing-401-skill-operating-model",
          options: [
            { id: "a", text: "Central team owns every deployment action" },
            { id: "b", text: "No shared standards, each team chooses independently" },
            { id: "c", text: "Federated execution with platform guardrails and clear decision rights" },
            { id: "d", text: "Monthly release freeze windows" }
          ],
          correctOptionId: "c",
          explanation: "Federated execution with strong shared controls balances agility and risk management."
        }
      ],
      learningAids: [
        {
          id: "cloud-computing-401-l03-a1",
          type: "mnemonic",
          title: "PACE Governance",
          content: "Policy, Automation, Cadence, Evidence."
        }
      ]
    },
    {
      id: "cloud-computing-401-l04",
      title: "Reliability Economics and Portfolio Prioritization",
      type: "video",
      duration: 14,
      objectives: [
        "Quantify reliability investment trade-offs",
        "Use error-budget and incident-cost signals for roadmap prioritization",
        "Frame technical debt as economic risk"
      ],
      chunks: [
        {
          id: "cloud-computing-401-l04-c1",
          kind: "concept",
          title: "Cost of Downtime vs Cost of Prevention",
          content:
            "Leadership decisions improve when reliability is translated into economics. Downtime cost should include direct revenue loss, operational recovery cost, customer churn risk, and regulatory exposure. Prevention cost includes engineering effort, platform upgrades, and operational discipline investments. Optimal strategy rarely means zero risk; it means investing where marginal risk reduction is highest."
        },
        {
          id: "cloud-computing-401-l04-c2",
          kind: "concept",
          title: "Portfolio View of Reliability Debt",
          content:
            "Single-service optimization can mislead. Portfolio-level prioritization compares services by business criticality, incident frequency, recovery friction, and shared dependency risk. A low-traffic internal service may deserve higher priority if it is a core dependency for mission-critical workflows."
        },
        {
          id: "cloud-computing-401-l04-c3",
          kind: "example",
          title: "Executive Narrative",
          content:
            "A strong executive narrative links recommendation to measurable outcome: 'Investing two platform squads for one quarter to harden service mesh resilience is expected to reduce severity-1 incident hours by 35%, with annualized avoided downtime cost of X.' Clear assumptions and confidence ranges build trust."
        }
      ],
      flashcards: [
        {
          id: "cloud-computing-401-l04-f1",
          front: "Reliability economics",
          back: "Decision approach that compares cost of reliability investments against expected risk and outage impact reduction."
        },
        {
          id: "cloud-computing-401-l04-f2",
          front: "Technical debt risk",
          back: "Accumulated shortcuts that increase failure probability, recovery time, or delivery friction over time."
        },
        {
          id: "cloud-computing-401-l04-f3",
          front: "Portfolio prioritization",
          back: "Ranking reliability work across systems by business impact, dependency risk, and mitigation ROI."
        }
      ],
      learningAids: [
        {
          id: "cloud-computing-401-l04-a1",
          type: "image",
          title: "Reliability ROI Chart",
          content: "Quadrant view plotting expected risk reduction versus engineering effort for candidate investments."
        }
      ]
    },
    {
      id: "cloud-computing-401-l05",
      title: "Platform Strategy Simulation",
      type: "interactive",
      duration: 18,
      objectives: [
        "Create a 12-month platform roadmap under budget and risk constraints",
        "Defend sequencing decisions to technical and executive stakeholders",
        "Identify leading indicators for roadmap success"
      ],
      chunks: [
        {
          id: "cloud-computing-401-l05-c1",
          kind: "practice",
          title: "Case: Regulated Multi-Region Expansion",
          content:
            "You lead cloud strategy for a company expanding into three regulated markets. Current blockers include inconsistent identity controls, rising incident volume, and delayed audit evidence collection. Budget allows only four major initiatives this year. You must sequence delivery to reduce compliance risk while preserving release velocity."
        },
        {
          id: "cloud-computing-401-l05-c2",
          kind: "recap",
          title: "Roadmap Evaluation Criteria",
          content:
            "Roadmaps are strongest when initiatives map to measurable outcomes, dependencies are explicit, and sequencing reflects risk exposure. Typical leading indicators include policy pass rate, mean time to restore, change failure rate, and time-to-evidence for audits."
        }
      ],
      interactiveActivities: [
        {
          id: "cloud-computing-401-l05-act1",
          type: "timeline_builder",
          title: "Roadmap Sequencing",
          description: "Order strategic initiatives into quarterly phases with dependency awareness.",
          data: {
            initiatives: [
              "Identity and access baseline hardening",
              "Policy-as-code expansion to all product lines",
              "Multi-region failover automation",
              "Audit evidence automation pipeline",
              "Developer self-service platform APIs"
            ]
          }
        },
        {
          id: "cloud-computing-401-l05-act2",
          type: "scenario_practice",
          title: "Board Review Defense",
          description: "Prepare a concise defense for why one initiative is deferred.",
          instructions: [
            "State risk of deferral and mitigation plan.",
            "State metric that triggers reprioritization next quarter."
          ]
        }
      ],
      metadata: {
        prompts: [
          "Which two initiatives should start first and why?",
          "How would you measure platform roadmap success after one quarter?",
          "What trade-off would you make to preserve both compliance posture and product velocity?"
        ]
      },
      learningAids: [
        {
          id: "cloud-computing-401-l05-a1",
          type: "practice",
          title: "Strategy Scorecard",
          content: "One-page scorecard template linking initiative, owner, KPI, and quarterly target."
        }
      ]
    },
    {
      id: "cloud-computing-401-l06",
      title: "Checkpoint 2: Strategy and Economics",
      type: "quiz",
      duration: 11,
      questions: [
        {
          id: "cloud-computing-401-l06-q1",
          text: "Which metric best helps leadership prioritize reliability investments across services?",
          skillId: "cloud-computing-401-skill-economics",
          options: [
            { id: "a", text: "Team headcount only" },
            { id: "b", text: "Incident impact cost combined with dependency criticality" },
            { id: "c", text: "Number of architecture diagrams" },
            { id: "d", text: "Vendor marketing rank" }
          ],
          correctOptionId: "b",
          explanation: "Prioritization should reflect business impact and systemic dependency risk."
        },
        {
          id: "cloud-computing-401-l06-q2",
          text: "What is the primary governance risk of unclear decision rights?",
          skillId: "cloud-computing-401-skill-operating-model",
          options: [
            { id: "a", text: "Faster approval cycles" },
            { id: "b", text: "Ambiguous accountability and delayed incident/escalation response" },
            { id: "c", text: "Lower audit requirements" },
            { id: "d", text: "Guaranteed cost reduction" }
          ],
          correctOptionId: "b",
          explanation: "Unclear ownership increases delay, conflict, and control breakdown."
        },
        {
          id: "cloud-computing-401-l06-q3",
          text: "Which statement is strongest for an executive architecture recommendation?",
          skillId: "cloud-computing-401-skill-strategy",
          options: [
            { id: "a", text: "This design looks modern and future-ready." },
            { id: "b", text: "This design is preferred by our engineering team." },
            { id: "c", text: "This investment is expected to reduce severity-1 incident hours by 35% with defined assumptions." },
            { id: "d", text: "This architecture has many advanced services." }
          ],
          correctOptionId: "c",
          explanation: "Executive decisions require measurable outcomes and explicit assumptions."
        },
        {
          id: "cloud-computing-401-l06-q4",
          text: "Why should audit evidence generation be automated?",
          skillId: "cloud-computing-401-skill-compliance",
          options: [
            { id: "a", text: "To reduce traceability" },
            { id: "b", text: "To improve consistency, reduce manual effort, and detect control drift sooner" },
            { id: "c", text: "To avoid policy checks" },
            { id: "d", text: "To remove all governance meetings" }
          ],
          correctOptionId: "b",
          explanation: "Automation improves quality and timeliness of evidence while lowering operational overhead."
        },
        {
          id: "cloud-computing-401-l06-q5",
          text: "In platform roadmap planning, a leading indicator is best described as:",
          skillId: "cloud-computing-401-skill-strategy",
          options: [
            { id: "a", text: "A lagging annual revenue metric only" },
            { id: "b", text: "A metric that signals early whether initiatives are moving toward desired outcomes" },
            { id: "c", text: "Any metric with a large number" },
            { id: "d", text: "A one-time project completion date" }
          ],
          correctOptionId: "b",
          explanation: "Leading indicators provide early directional feedback before final outcomes are visible."
        }
      ],
      learningAids: [
        {
          id: "cloud-computing-401-l06-a1",
          type: "mnemonic",
          title: "CLEAR Decisions",
          content: "Context, Levers, Economics, Accountability, Risk."
        }
      ]
    },
    {
      id: "cloud-computing-401-l07",
      title: "Capstone: Cloud Transformation Boardroom",
      type: "interactive",
      duration: 20,
      objectives: [
        "Synthesize architecture, governance, and economics into one transformation proposal",
        "Communicate strategy for technical and non-technical stakeholders",
        "Produce a phased execution plan with measurable quarter-by-quarter outcomes"
      ],
      chunks: [
        {
          id: "cloud-computing-401-l07-c1",
          kind: "practice",
          title: "Capstone Scenario",
          content:
            "Build a board-ready cloud transformation proposal for a global enterprise with strict compliance obligations, legacy platform debt, and rapid growth goals. Your proposal must include operating model, controls strategy, resilience priorities, and FinOps guardrails."
        },
        {
          id: "cloud-computing-401-l07-c2",
          kind: "recap",
          title: "Evaluation Rubric",
          content:
            "High-quality submissions define explicit outcomes, assumptions, risks, and dependencies. They balance ambition with execution realism and identify the first 90-day actions that create irreversible progress toward the long-term target architecture."
        }
      ],
      metadata: {
        prompts: [
          "Present a 12-month transformation roadmap in three phases.",
          "State top three risks and mitigations for your plan.",
          "Define one executive KPI and one engineering KPI for each phase."
        ]
      },
      learningAids: [
        {
          id: "cloud-computing-401-l07-a1",
          type: "practice",
          title: "Board Memo Template",
          content: "Structured memo format covering objectives, options considered, recommended path, economics, and risk controls."
        }
      ]
    }
  ]
};