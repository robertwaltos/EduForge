import type { LearningModule } from "@/lib/modules/types";

export const NetworkEngineering401Module: LearningModule = {
  id: "network-engineering-401",
  title: "Network Strategy, Governance, and Internet-Scale Operations",
  description:
    "Expert-level network engineering on platform strategy, internet-scale resilience, routing risk governance, SRE-style reliability economics, and organizational operating models for mission-critical connectivity platforms.",
  subject: "Computer Science",
  tags: ["core", "curriculum", "interactive", "networking", "governance", "leadership"],
  minAge: 17,
  maxAge: 99,
  version: "2.0.0",
  difficultyBand: "advanced",
  localeSupport: ["en"],
  thumbnail: "/placeholders/lesson-robot.svg",
  learningObjectives: [
    "Build strategic network operating models aligned with business and risk objectives",
    "Design governance controls for routing policy safety and interconnection risk",
    "Evaluate network investments using availability, latency, and outage-cost economics",
    "Lead multi-team incident governance and post-incident learning systems",
    "Construct multi-year network transformation roadmaps with measurable capability targets",
    "Communicate network strategy to executive and technical stakeholders"
  ],
  lessons: [
    {
      id: "network-engineering-401-l01",
      title: "Network Platform Operating Models",
      type: "video",
      duration: 14,
      chunks: [
        {
          id: "network-engineering-401-l01-c1",
          kind: "concept",
          title: "Centralized vs Federated Networking",
          content:
            "Large organizations must decide how network authority is distributed. Centralized models maximize consistency but can bottleneck delivery. Federated models improve domain agility but require robust standards and shared governance to avoid fragmentation. Platform-product networking combines reusable services, self-service workflows, and policy guardrails for balanced control."
        },
        {
          id: "network-engineering-401-l01-c2",
          kind: "concept",
          title: "Decision Rights and Escalation",
          content:
            "High-risk decisions such as global route policy updates, peering changes, and DDoS posture shifts need explicit decision rights and escalation thresholds. Ambiguous ownership is a frequent root cause in prolonged incidents."
        },
        {
          id: "network-engineering-401-l01-c3",
          kind: "recap",
          title: "Operational Cadence",
          content:
            "Sustainable operations require recurring rhythms: weekly risk review, monthly reliability scorecard, quarterly architecture debt planning, and annual interconnection strategy review."
        }
      ],
      flashcards: [
        {
          id: "network-engineering-401-l01-f1",
          front: "Platform-product networking",
          back: "Operating model that treats internal network services as products with users, SLAs, and roadmaps."
        },
        {
          id: "network-engineering-401-l01-f2",
          front: "Decision rights",
          back: "Defined authority boundaries for approvals, exceptions, and escalations."
        },
        {
          id: "network-engineering-401-l01-f3",
          front: "Operational cadence",
          back: "Recurring review cycle that keeps risk, reliability, and delivery aligned."
        }
      ],
      learningAids: [
        {
          id: "network-engineering-401-l01-a1",
          type: "image",
          title: "Operating Model Map",
          content: "Reference map of network organization archetypes with trade-offs in control, speed, and resilience."
        }
      ]
    },
    {
      id: "network-engineering-401-l02",
      title: "Routing Risk Governance and Internet Edge Policy Lab",
      type: "interactive",
      duration: 17,
      chunks: [
        {
          id: "network-engineering-401-l02-c1",
          kind: "concept",
          title: "Interconnection Risk",
          content:
            "At internet edge, small configuration errors can create major outages or route leaks. Governance controls include max-prefix policies, community-based policy constraints, prefix filtering, RPKI validation strategy, and staged peer policy deployment."
        },
        {
          id: "network-engineering-401-l02-c2",
          kind: "practice",
          title: "Policy Lifecycle",
          content:
            "Policy governance should cover authoring, simulation, approval, rollout, runtime monitoring, and retirement. Every high-risk policy needs rollback conditions, ownership, and audit trail."
        }
      ],
      interactiveActivities: [
        {
          id: "network-engineering-401-l02-act1",
          type: "matching_pairs",
          title: "Control-to-Risk Match",
          description: "Match routing controls with the risk they most directly mitigate.",
          pairs: [
            { left: "Max-prefix limit", right: "Prevents runaway route table growth from peer anomalies" },
            { left: "Prefix filtering", right: "Blocks unauthorized route advertisement" },
            { left: "Community policy standard", right: "Improves deterministic traffic steering and exception control" },
            { left: "Staged rollout", right: "Reduces blast radius of policy mistakes" }
          ]
        },
        {
          id: "network-engineering-401-l02-act2",
          type: "scenario_practice",
          title: "Edge Incident Exercise",
          description: "Respond to a live route leak affecting external reachability.",
          instructions: [
            "Choose immediate containment actions.",
            "Specify one governance change to prevent recurrence."
          ]
        }
      ],
      metadata: {
        prompts: [
          "Which governance control should block risky route exports by default?",
          "How do you stage edge policy rollout to minimize customer impact?",
          "What evidence should be mandatory after high-risk routing changes?"
        ]
      },
      learningAids: [
        {
          id: "network-engineering-401-l02-a1",
          type: "practice",
          title: "Edge Policy Review Worksheet",
          content: "Checklist for policy intent, simulation output, rollback trigger, and owner sign-off."
        }
      ]
    },
    {
      id: "network-engineering-401-l03",
      title: "Checkpoint 1: Governance and Edge Operations",
      type: "quiz",
      duration: 10,
      questions: [
        {
          id: "network-engineering-401-l03-q1",
          text: "Why are max-prefix limits critical at internet peering edges?",
          skillId: "network-engineering-401-skill-governance",
          options: [
            { id: "a", text: "They improve cable quality" },
            { id: "b", text: "They cap damage from unexpected route advertisement volume" },
            { id: "c", text: "They encrypt all BGP sessions" },
            { id: "d", text: "They replace route policy" }
          ],
          correctOptionId: "b",
          explanation: "Prefix limits reduce large-scale control-plane overload from peer anomalies."
        },
        {
          id: "network-engineering-401-l03-q2",
          text: "Most important reason for staged rollout of edge policy changes?",
          skillId: "network-engineering-401-skill-governance",
          options: [
            { id: "a", text: "To increase blast radius" },
            { id: "b", text: "To detect issues early before global impact" },
            { id: "c", text: "To avoid monitoring" },
            { id: "d", text: "To skip peer communication" }
          ],
          correctOptionId: "b",
          explanation: "Staging reveals policy issues under limited scope first."
        },
        {
          id: "network-engineering-401-l03-q3",
          text: "What is a key governance failure pattern during severe network incidents?",
          skillId: "network-engineering-401-skill-incident",
          options: [
            { id: "a", text: "Clear ownership and escalation" },
            { id: "b", text: "Ambiguous decision rights and delayed containment" },
            { id: "c", text: "Strong communication cadence" },
            { id: "d", text: "Documented rollback plans" }
          ],
          correctOptionId: "b",
          explanation: "Unclear authority causes response latency and greater customer impact."
        },
        {
          id: "network-engineering-401-l03-q4",
          text: "Which artifact best supports post-change accountability?",
          skillId: "network-engineering-401-skill-governance",
          options: [
            { id: "a", text: "Memory of who changed what" },
            { id: "b", text: "Structured change record with simulation, approver, and verification evidence" },
            { id: "c", text: "Untracked chat message" },
            { id: "d", text: "Only final config snapshot" }
          ],
          correctOptionId: "b",
          explanation: "Comprehensive change evidence supports governance, auditability, and learning."
        }
      ],
      learningAids: [
        {
          id: "network-engineering-401-l03-a1",
          type: "mnemonic",
          title: "RISK",
          content: "Review, Isolate, Stage, Keep evidence."
        }
      ]
    },
    {
      id: "network-engineering-401-l04",
      title: "Reliability Economics for Network Programs",
      type: "video",
      duration: 14,
      chunks: [
        {
          id: "network-engineering-401-l04-c1",
          kind: "concept",
          title: "Cost of Network Failure",
          content:
            "Network outage cost includes lost revenue, productivity impact, response labor, contractual penalties, and reputational harm. Strategic investments should be evaluated by expected risk reduction per engineering dollar, not by technology novelty alone."
        },
        {
          id: "network-engineering-401-l04-c2",
          kind: "concept",
          title: "Portfolio Prioritization",
          content:
            "A portfolio lens prioritizes initiatives by business criticality, dependency centrality, incident history, and mitigation confidence. Sometimes a low-profile core transit service deserves top priority because many revenue paths depend on it."
        },
        {
          id: "network-engineering-401-l04-c3",
          kind: "example",
          title: "Executive Recommendation Framing",
          content:
            "Strong strategy statements quantify expected outcome and assumptions: 'Automating edge policy validation is expected to reduce high-severity routing incidents by 30% within two quarters, assuming full adoption across top peering domains.'"
        }
      ],
      flashcards: [
        {
          id: "network-engineering-401-l04-f1",
          front: "Reliability ROI",
          back: "Expected risk reduction or outage-cost avoidance per unit of investment."
        },
        {
          id: "network-engineering-401-l04-f2",
          front: "Dependency centrality",
          back: "How many critical services rely on a given network component."
        },
        {
          id: "network-engineering-401-l04-f3",
          front: "Portfolio prioritization",
          back: "Ranking initiatives by systemic business impact and mitigation confidence."
        }
      ],
      learningAids: [
        {
          id: "network-engineering-401-l04-a1",
          type: "image",
          title: "Risk-Reduction Matrix",
          content: "Quadrant map of network initiatives by impact and implementation effort."
        }
      ]
    },
    {
      id: "network-engineering-401-l05",
      title: "Transformation Roadmap Simulation",
      type: "interactive",
      duration: 18,
      chunks: [
        {
          id: "network-engineering-401-l05-c1",
          kind: "practice",
          title: "Case: Global Network Modernization",
          content:
            "You are accountable for a two-year network transformation across regions with strict uptime obligations and legacy architecture debt. Budget supports only four major programs in year one. Sequence initiatives to improve reliability and security without stalling business delivery."
        },
        {
          id: "network-engineering-401-l05-c2",
          kind: "recap",
          title: "Roadmap Quality Signals",
          content:
            "Effective roadmaps show dependencies, measurable KPIs, clear ownership, and explicit risk acceptance where trade-offs are unavoidable."
        }
      ],
      interactiveActivities: [
        {
          id: "network-engineering-401-l05-act1",
          type: "timeline_builder",
          title: "Roadmap Sequencing Drill",
          description: "Arrange strategic initiatives into quarterly phases with dependency awareness.",
          data: {
            initiatives: [
              "Routing policy governance automation",
              "Edge telemetry and anomaly detection upgrade",
              "WAN resiliency redesign",
              "Security segmentation standardization",
              "Network self-service platform rollout"
            ]
          }
        },
        {
          id: "network-engineering-401-l05-act2",
          type: "scenario_practice",
          title: "Executive Trade-off Brief",
          description: "Defend one deferred initiative and mitigation approach.",
          instructions: [
            "State risk of deferral.",
            "Define trigger for reprioritization next quarter."
          ]
        }
      ],
      metadata: {
        prompts: [
          "Which initiative should start first and why?",
          "How will you measure roadmap effectiveness in the first 90 days?",
          "What risk will you accept temporarily, and what compensating control applies?"
        ]
      },
      learningAids: [
        {
          id: "network-engineering-401-l05-a1",
          type: "practice",
          title: "Strategy KPI Scorecard",
          content: "Template linking initiative, KPI, baseline, quarterly target, and accountable owner."
        }
      ]
    },
    {
      id: "network-engineering-401-l06",
      title: "Checkpoint 2: Strategy and Economics",
      type: "quiz",
      duration: 11,
      questions: [
        {
          id: "network-engineering-401-l06-q1",
          text: "Best metric pairing for prioritizing reliability investment?",
          skillId: "network-engineering-401-skill-strategy",
          options: [
            { id: "a", text: "Incident impact cost and dependency criticality" },
            { id: "b", text: "Cable vendor count and office headcount" },
            { id: "c", text: "Number of CLI commands" },
            { id: "d", text: "Age of documentation" }
          ],
          correctOptionId: "a",
          explanation: "Impact and dependency context provide strongest prioritization signal."
        },
        {
          id: "network-engineering-401-l06-q2",
          text: "What is the key value of explicit decision rights in incident governance?",
          skillId: "network-engineering-401-skill-incident",
          options: [
            { id: "a", text: "Faster, clearer containment and escalation decisions" },
            { id: "b", text: "Less need for communication" },
            { id: "c", text: "Guaranteed zero outages" },
            { id: "d", text: "No need for postmortems" }
          ],
          correctOptionId: "a",
          explanation: "Clear authority reduces coordination delays in high-pressure incidents."
        },
        {
          id: "network-engineering-401-l06-q3",
          text: "Why automate routing policy validation in transformation programs?",
          skillId: "network-engineering-401-skill-governance",
          options: [
            { id: "a", text: "To remove all human review permanently" },
            { id: "b", text: "To detect unsafe changes earlier and scale governance consistently" },
            { id: "c", text: "To avoid documenting policy intent" },
            { id: "d", text: "To hide failed simulations" }
          ],
          correctOptionId: "b",
          explanation: "Automation increases consistency and catches risk pre-production."
        },
        {
          id: "network-engineering-401-l06-q4",
          text: "What makes an executive network strategy recommendation credible?",
          skillId: "network-engineering-401-skill-strategy",
          options: [
            { id: "a", text: "Only technical depth without outcomes" },
            { id: "b", text: "Measured outcomes, assumptions, risks, and ownership" },
            { id: "c", text: "Longest architecture diagram" },
            { id: "d", text: "Most expensive vendor option" }
          ],
          correctOptionId: "b",
          explanation: "Decision-makers need measurable impact, not only technical detail."
        },
        {
          id: "network-engineering-401-l06-q5",
          text: "Leading indicators in network transformation are used to:",
          skillId: "network-engineering-401-skill-strategy",
          options: [
            { id: "a", text: "Report only after annual failures occur" },
            { id: "b", text: "Provide early signal that program outcomes are on or off track" },
            { id: "c", text: "Replace all lagging metrics" },
            { id: "d", text: "Eliminate risk management" }
          ],
          correctOptionId: "b",
          explanation: "Leading indicators enable course correction before major misses."
        }
      ],
      learningAids: [
        {
          id: "network-engineering-401-l06-a1",
          type: "mnemonic",
          title: "CLEAR",
          content: "Context, Levers, Economics, Accountability, Risk."
        }
      ]
    },
    {
      id: "network-engineering-401-l07",
      title: "Capstone: Board-Level Network Program Proposal",
      type: "interactive",
      duration: 20,
      chunks: [
        {
          id: "network-engineering-401-l07-c1",
          kind: "practice",
          title: "Capstone Brief",
          content:
            "Develop a board-level proposal for a global network program balancing growth, security, and resilience. Include operating model, governance controls, risk economics, and quarterly milestones."
        },
        {
          id: "network-engineering-401-l07-c2",
          kind: "recap",
          title: "Assessment Criteria",
          content:
            "High-quality proposals align technical plans with business priorities, show measurable outcomes, and include practical execution sequencing with explicit ownership."
        }
      ],
      metadata: {
        prompts: [
          "Present three strategic initiatives with expected business impact.",
          "List top three program risks and mitigations.",
          "Define one executive KPI and one engineering KPI per initiative."
        ]
      },
      learningAids: [
        {
          id: "network-engineering-401-l07-a1",
          type: "practice",
          title: "Board Memo Framework",
          content: "Template for objective, options, recommendation, economics, risk controls, and milestone plan."
        }
      ]
    }
  ]
};