import type { LearningModule } from "@/lib/modules/types";

export const NetworkEngineering301Module: LearningModule = {
  id: "network-engineering-301",
  title: "Advanced Network Architecture and Automation",
  description:
    "Advanced networking curriculum covering BGP/OSPF design at scale, traffic engineering, EVPN overlays, network programmability, and high-reliability operations for large enterprise and service-provider-like environments.",
  subject: "Computer Science",
  tags: ["core", "curriculum", "interactive", "networking", "automation", "architecture"],
  minAge: 16,
  maxAge: 99,
  version: "2.0.0",
  difficultyBand: "advanced",
  localeSupport: ["en"],
  thumbnail: "/placeholders/lesson-robot.svg",
  learningObjectives: [
    "Design scalable underlay and overlay architectures with clear fault domains",
    "Apply advanced BGP and OSPF policy for deterministic traffic behavior",
    "Implement traffic engineering and QoS strategies for mixed critical workloads",
    "Use automation and intent validation to reduce configuration drift",
    "Perform deep packet-path troubleshooting across control and data planes",
    "Plan safe large-scale network changes with measurable blast-radius controls"
  ],
  lessons: [
    {
      id: "network-engineering-301-l01",
      title: "Large-Scale Routing Architecture",
      type: "video",
      duration: 13,
      chunks: [
        {
          id: "network-engineering-301-l01-c1",
          kind: "concept",
          title: "Control-Plane Scalability",
          content:
            "At scale, routing architecture is constrained by convergence behavior, route churn, policy complexity, and operational visibility. Designers must bound failure domains with summarization, hierarchy, and policy isolation while preserving enough path granularity for traffic engineering goals."
        },
        {
          id: "network-engineering-301-l01-c2",
          kind: "concept",
          title: "BGP in Enterprise-Scale Environments",
          content:
            "BGP is no longer only edge routing. Many large networks use iBGP for underlay and overlay control with route reflectors and policy communities. Clear policy intent, deterministic path design, and strict change review prevent route leaks, asymmetric flows, and unintended transit behavior."
        },
        {
          id: "network-engineering-301-l01-c3",
          kind: "recap",
          title: "Architectural Guardrails",
          content:
            "Strong architectures define guardrails up front: max prefix limits, route dampening strategy, mandatory community tagging, and automated policy linting. These controls keep growth manageable and reduce incident frequency as network size increases."
        }
      ],
      flashcards: [
        {
          id: "network-engineering-301-l01-f1",
          front: "Route reflector",
          back: "A BGP scaling mechanism that reduces full-mesh iBGP requirements by reflecting routes between clients."
        },
        {
          id: "network-engineering-301-l01-f2",
          front: "Route churn",
          back: "Frequent route updates/withdrawals that can destabilize convergence and increase control-plane load."
        },
        {
          id: "network-engineering-301-l01-f3",
          front: "Policy guardrail",
          back: "A predefined boundary rule that prevents unsafe routing behavior before it reaches production."
        }
      ],
      learningAids: [
        {
          id: "network-engineering-301-l01-a1",
          type: "image",
          title: "Scale Routing Blueprint",
          content: "Reference blueprint showing hierarchy, route reflectors, summarization points, and policy boundaries."
        }
      ]
    },
    {
      id: "network-engineering-301-l02",
      title: "Traffic Engineering and QoS Lab",
      type: "interactive",
      duration: 16,
      chunks: [
        {
          id: "network-engineering-301-l02-c1",
          kind: "concept",
          title: "Traffic Engineering Intent",
          content:
            "Traffic engineering balances path utilization, latency, and failure resilience. Engineers must distinguish control-plane preferred paths from real forwarding behavior under congestion, failover, and policy overrides."
        },
        {
          id: "network-engineering-301-l02-c2",
          kind: "concept",
          title: "QoS in Practice",
          content:
            "QoS strategy requires classification, marking, queuing, and policing decisions tied to business-critical applications. Misaligned QoS policy can starve low-priority traffic or fail to protect real-time services during bursts. Validation should include synthetic stress and real traffic baselines."
        }
      ],
      interactiveActivities: [
        {
          id: "network-engineering-301-l02-act1",
          type: "sorting_buckets",
          title: "QoS Policy Classification",
          description: "Sort traffic classes into appropriate forwarding treatment categories.",
          buckets: ["Low Latency", "Assured Forwarding", "Best Effort"],
          items: [
            { text: "Voice signaling and media", bucket: "Low Latency" },
            { text: "Interactive business app traffic", bucket: "Assured Forwarding" },
            { text: "Software updates", bucket: "Best Effort" },
            { text: "Backup replication", bucket: "Best Effort" },
            { text: "Critical ERP transaction flow", bucket: "Assured Forwarding" }
          ]
        },
        {
          id: "network-engineering-301-l02-act2",
          type: "scenario_practice",
          title: "Path Shift Drill",
          description: "Choose policy changes to relieve congested WAN links while preserving SLA traffic.",
          instructions: [
            "Pick one immediate action and one medium-term redesign action.",
            "State one risk for each action."
          ]
        }
      ],
      metadata: {
        prompts: [
          "How can preferred BGP path and actual traffic path diverge?",
          "What QoS misconfiguration could increase jitter during peak hours?",
          "Which metric would prove your traffic engineering change worked?"
        ]
      },
      learningAids: [
        {
          id: "network-engineering-301-l02-a1",
          type: "practice",
          title: "QoS Validation Sheet",
          content: "Worksheet to compare pre/post queue drop, latency, and jitter by traffic class."
        }
      ]
    },
    {
      id: "network-engineering-301-l03",
      title: "Checkpoint 1: Architecture and QoS",
      type: "quiz",
      duration: 10,
      questions: [
        {
          id: "network-engineering-301-l03-q1",
          text: "Primary purpose of BGP route reflectors in large networks?",
          skillId: "network-engineering-301-skill-routing",
          options: [
            { id: "a", text: "Increase packet encryption" },
            { id: "b", text: "Reduce iBGP full-mesh scaling complexity" },
            { id: "c", text: "Replace all IGP protocols" },
            { id: "d", text: "Eliminate path policy" }
          ],
          correctOptionId: "b",
          explanation: "Route reflectors reduce session count and simplify iBGP scaling."
        },
        {
          id: "network-engineering-301-l03-q2",
          text: "Which QoS class should usually protect delay-sensitive voice media traffic?",
          skillId: "network-engineering-301-skill-qos",
          options: [
            { id: "a", text: "Low latency priority queue" },
            { id: "b", text: "Best effort queue only" },
            { id: "c", text: "Bulk transfer queue" },
            { id: "d", text: "Unclassified discard queue" }
          ],
          correctOptionId: "a",
          explanation: "Delay-sensitive traffic benefits from protected low-latency treatment."
        },
        {
          id: "network-engineering-301-l03-q3",
          text: "Why are routing policy guardrails important at scale?",
          skillId: "network-engineering-301-skill-operations",
          options: [
            { id: "a", text: "They prevent unsafe policy changes from causing broad impact" },
            { id: "b", text: "They remove need for testing" },
            { id: "c", text: "They disable route updates" },
            { id: "d", text: "They guarantee zero congestion" }
          ],
          correctOptionId: "a",
          explanation: "Guardrails reduce high-blast-radius mistakes in control-plane policy."
        },
        {
          id: "network-engineering-301-l03-q4",
          text: "Most reliable way to validate traffic engineering change success?",
          skillId: "network-engineering-301-skill-qos",
          options: [
            { id: "a", text: "Assume success if configs committed" },
            { id: "b", text: "Compare pre/post telemetry for utilization, latency, and drops" },
            { id: "c", text: "Turn off monitoring" },
            { id: "d", text: "Rely on one ping test only" }
          ],
          correctOptionId: "b",
          explanation: "Measured telemetry outcomes are required to confirm design intent."
        }
      ],
      learningAids: [
        {
          id: "network-engineering-301-l03-a1",
          type: "mnemonic",
          title: "PATH",
          content: "Policy, Assertions, Telemetry, Hardening."
        }
      ]
    },
    {
      id: "network-engineering-301-l04",
      title: "EVPN/VXLAN and Overlay Fabrics",
      type: "video",
      duration: 13,
      chunks: [
        {
          id: "network-engineering-301-l04-c1",
          kind: "concept",
          title: "Underlay and Overlay Separation",
          content:
            "Overlay fabrics separate logical service topology from physical transport. VXLAN encapsulation extends Layer 2 semantics over Layer 3 underlays. EVPN distributes MAC/IP reachability with BGP control-plane signaling, improving scale and operational visibility compared with flood-and-learn methods."
        },
        {
          id: "network-engineering-301-l04-c2",
          kind: "concept",
          title: "Operational Considerations",
          content:
            "Overlay success depends on underlay stability, MTU planning, endpoint policy consistency, and robust troubleshooting tools that correlate encapsulated and decapsulated paths."
        },
        {
          id: "network-engineering-301-l04-c3",
          kind: "recap",
          title: "Design Trade-offs",
          content:
            "EVPN/VXLAN can improve scale and flexibility but introduces control-plane complexity. Teams need clear templates, observability, and staged rollout strategy."
        }
      ],
      flashcards: [
        {
          id: "network-engineering-301-l04-f1",
          front: "EVPN",
          back: "A BGP-based control-plane for distributing MAC/IP information in overlay networks."
        },
        {
          id: "network-engineering-301-l04-f2",
          front: "VXLAN",
          back: "Overlay encapsulation that carries Layer 2 segments across Layer 3 networks."
        },
        {
          id: "network-engineering-301-l04-f3",
          front: "Underlay",
          back: "Physical/logical transport network that carries overlay encapsulated traffic."
        }
      ],
      learningAids: [
        {
          id: "network-engineering-301-l04-a1",
          type: "image",
          title: "Overlay Fabric Packet Path",
          content: "Diagram tracing endpoint packet encapsulation, underlay forwarding, and decapsulation flow."
        }
      ]
    },
    {
      id: "network-engineering-301-l05",
      title: "Network Automation and Intent Validation Lab",
      type: "interactive",
      duration: 16,
      chunks: [
        {
          id: "network-engineering-301-l05-c1",
          kind: "concept",
          title: "From CLI Drift to Intent",
          content:
            "Manual CLI operations at scale create drift and hidden inconsistencies. Automation pipelines should generate configuration from declared intent, validate policy invariants, and perform pre/post checks before and after deployment."
        },
        {
          id: "network-engineering-301-l05-c2",
          kind: "practice",
          title: "Safe Change Pipeline",
          content:
            "A safe network automation pipeline includes syntax linting, policy tests, topology simulation, canary deployment, and automatic rollback triggers based on telemetry anomalies."
        }
      ],
      interactiveActivities: [
        {
          id: "network-engineering-301-l05-act1",
          type: "timeline_builder",
          title: "Automation Pipeline Order",
          description: "Place network automation stages in safe execution order.",
          data: {
            stages: [
              "Intent definition",
              "Template generation",
              "Static/policy validation",
              "Lab simulation",
              "Canary rollout",
              "Telemetry verification",
              "Full rollout"
            ]
          }
        }
      ],
      metadata: {
        prompts: [
          "What drift signals should trigger automatic rollback?",
          "Why is canary rollout useful in network automation as well as app deployment?",
          "Name one policy invariant you would enforce before merge."
        ]
      },
      learningAids: [
        {
          id: "network-engineering-301-l05-a1",
          type: "practice",
          title: "Intent Test Catalog",
          content: "Checklist of invariants: no unauthorized transit, route limits, ACL consistency, and MTU policy."
        }
      ]
    },
    {
      id: "network-engineering-301-l06",
      title: "Checkpoint 2: Overlay and Automation",
      type: "quiz",
      duration: 10,
      questions: [
        {
          id: "network-engineering-301-l06-q1",
          text: "Main benefit of EVPN over flood-and-learn overlays?",
          skillId: "network-engineering-301-skill-overlay",
          options: [
            { id: "a", text: "No control-plane required" },
            { id: "b", text: "BGP-based control-plane improves scale and reachability signaling" },
            { id: "c", text: "No underlay needed" },
            { id: "d", text: "All traffic is encrypted by default" }
          ],
          correctOptionId: "b",
          explanation: "EVPN provides explicit control-plane exchange for endpoint reachability."
        },
        {
          id: "network-engineering-301-l06-q2",
          text: "Most important reason to include simulation before rollout in network automation?",
          skillId: "network-engineering-301-skill-automation",
          options: [
            { id: "a", text: "It slows delivery intentionally" },
            { id: "b", text: "It catches topology/policy failures before production impact" },
            { id: "c", text: "It removes need for monitoring" },
            { id: "d", text: "It replaces design review permanently" }
          ],
          correctOptionId: "b",
          explanation: "Simulation reduces risk by revealing logic and policy defects early."
        },
        {
          id: "network-engineering-301-l06-q3",
          text: "Which practice best reduces configuration drift long-term?",
          skillId: "network-engineering-301-skill-automation",
          options: [
            { id: "a", text: "Frequent ad hoc manual edits" },
            { id: "b", text: "Intent-based source of truth with automated deployment" },
            { id: "c", text: "Ignoring diff reports" },
            { id: "d", text: "Disabling config backup" }
          ],
          correctOptionId: "b",
          explanation: "Single source of truth plus automation limits unsanctioned drift."
        },
        {
          id: "network-engineering-301-l06-q4",
          text: "What is a key prerequisite for stable overlay operations?",
          skillId: "network-engineering-301-skill-overlay",
          options: [
            { id: "a", text: "Unstable underlay links" },
            { id: "b", text: "Consistent underlay reachability and MTU planning" },
            { id: "c", text: "Random VNI assignment" },
            { id: "d", text: "No telemetry" }
          ],
          correctOptionId: "b",
          explanation: "Overlay reliability depends on solid underlay fundamentals."
        }
      ],
      learningAids: [
        {
          id: "network-engineering-301-l06-a1",
          type: "mnemonic",
          title: "SAFE Change",
          content: "Simulate, Apply canary, Follow telemetry, Expand rollout."
        }
      ]
    },
    {
      id: "network-engineering-301-l07",
      title: "Capstone: Multi-Site Network Redesign",
      type: "interactive",
      duration: 18,
      chunks: [
        {
          id: "network-engineering-301-l07-c1",
          kind: "practice",
          title: "Redesign Scenario",
          content:
            "Plan a multi-site network redesign for a fast-growing organization needing lower WAN latency, stronger segmentation, and automated change control. Propose target architecture, migration waves, and risk controls."
        },
        {
          id: "network-engineering-301-l07-c2",
          kind: "recap",
          title: "Evaluation Criteria",
          content:
            "High-scoring designs include clear policy intent, observability requirements, rollback paths, and measurable success criteria tied to user experience and operational reliability."
        }
      ],
      metadata: {
        prompts: [
          "Define three architecture decisions and their trade-offs.",
          "Choose one migration risk and mitigation plan.",
          "Name two KPIs proving redesign success in 90 days."
        ]
      },
      learningAids: [
        {
          id: "network-engineering-301-l07-a1",
          type: "practice",
          title: "Architecture Decision Record",
          content: "Template for decision, alternatives, rationale, risk, and measurable success criteria."
        }
      ]
    }
  ]
};