import type { LearningModule } from "@/lib/modules/types";

export const NetworkEngineering201Module: LearningModule = {
  id: "network-engineering-201",
  title: "Network Engineering Operations",
  description:
    "Intermediate network engineering focused on enterprise operations, routing behavior, fault isolation, performance tuning, and secure service delivery across campus, branch, and cloud-connected environments.",
  subject: "Computer Science",
  tags: ["core", "curriculum", "interactive", "networking", "operations", "troubleshooting"],
  minAge: 15,
  maxAge: 99,
  version: "2.0.0",
  difficultyBand: "intermediate",
  localeSupport: ["en"],
  thumbnail: "/placeholders/lesson-robot.svg",
  learningObjectives: [
    "Design resilient Layer 2 and Layer 3 enterprise network segments",
    "Analyze OSPF and BGP behaviors in realistic failure and convergence scenarios",
    "Troubleshoot packet loss, latency, and asymmetric routing using structured workflows",
    "Apply network security controls including segmentation, NAC, and VPN policy boundaries",
    "Use telemetry and baseline metrics to identify performance regressions early",
    "Create incident playbooks that improve recovery speed and change safety"
  ],
  lessons: [
    {
      id: "network-engineering-201-l01",
      title: "Enterprise Topology and Redundancy Patterns",
      type: "video",
      duration: 12,
      objectives: [
        "Compare hierarchical campus and spine-leaf patterns",
        "Explain first-hop redundancy protocols and uplink design",
        "Identify single points of failure in branch and campus layouts"
      ],
      chunks: [
        {
          id: "network-engineering-201-l01-c1",
          kind: "concept",
          title: "Topology Patterns",
          content:
            "Modern enterprise networks blend traditional three-tier campus design with data-center fabrics and WAN overlays. Core-distribution-access hierarchies simplify policy boundaries and failure containment. Spine-leaf designs prioritize predictable east-west latency and equal-cost pathing. Selecting architecture depends on scale, traffic profile, and operational maturity."
        },
        {
          id: "network-engineering-201-l01-c2",
          kind: "concept",
          title: "Gateway and Uplink Redundancy",
          content:
            "Resilience at the edge relies on gateway redundancy and path diversity. First-hop redundancy protocols present a virtual default gateway to endpoints. Uplink design should avoid hidden Layer 2 loops while preserving fast failover. Good designs account for failure domains, deterministic forwarding, and clear control-plane ownership."
        },
        {
          id: "network-engineering-201-l01-c3",
          kind: "recap",
          title: "Failure-Domain Thinking",
          content:
            "Operationally strong networks are organized to limit blast radius. Segmented VLANs, controlled fault boundaries, and documented failover behavior reduce outage spread. Architecture diagrams must explicitly show control-plane dependencies, not just physical links."
        }
      ],
      flashcards: [
        {
          id: "network-engineering-201-l01-f1",
          front: "Failure domain",
          back: "A boundary where faults are likely correlated; limiting its size reduces outage impact."
        },
        {
          id: "network-engineering-201-l01-f2",
          front: "First-hop redundancy",
          back: "A method that provides a virtual gateway IP so endpoint default gateway remains available during device failure."
        },
        {
          id: "network-engineering-201-l01-f3",
          front: "Spine-leaf goal",
          back: "Consistent low-latency multipath forwarding for scale-out traffic patterns."
        }
      ],
      learningAids: [
        {
          id: "network-engineering-201-l01-a1",
          type: "image",
          title: "Topology Decision Map",
          content: "Decision chart for choosing campus hierarchy vs spine-leaf by traffic and scale constraints."
        }
      ]
    },
    {
      id: "network-engineering-201-l02",
      title: "Routing Behavior and Convergence Lab",
      type: "interactive",
      duration: 15,
      objectives: [
        "Interpret OSPF adjacency and LSDB issues",
        "Evaluate BGP path selection under policy changes",
        "Reason about convergence trade-offs"
      ],
      chunks: [
        {
          id: "network-engineering-201-l02-c1",
          kind: "concept",
          title: "OSPF Stability",
          content:
            "OSPF stability depends on clean neighbor adjacencies, consistent timers, and coherent area design. Mismatched MTU, authentication settings, or area type often causes hidden reachability issues. Engineers should correlate neighbor state transitions with topology change events and SPF recalculation frequency."
        },
        {
          id: "network-engineering-201-l02-c2",
          kind: "concept",
          title: "BGP Policy Effects",
          content:
            "BGP decisions are policy-driven. Local preference, AS path length, MED, and community tags shape route selection and egress behavior. Small policy edits can shift massive traffic volumes, so validation in staging and guarded rollouts are essential."
        }
      ],
      interactiveActivities: [
        {
          id: "network-engineering-201-l02-act1",
          type: "matching_pairs",
          title: "Symptom to Root-Cause Match",
          description: "Match routing symptoms to likely protocol-level causes.",
          pairs: [
            { left: "OSPF stuck in EXSTART", right: "MTU mismatch or adjacency negotiation issue" },
            { left: "Unexpected egress ISP shift", right: "Local preference or policy update changed best path" },
            { left: "Frequent reconvergence spikes", right: "Flapping links or unstable neighbor sessions" },
            { left: "Route present but no traffic", right: "Policy/filter mismatch or next-hop reachability problem" }
          ]
        },
        {
          id: "network-engineering-201-l02-act2",
          type: "scenario_practice",
          title: "Convergence Triage",
          description: "Prioritize checks during a live routing instability incident.",
          instructions: [
            "List first three commands/telemetry checks you would run.",
            "Explain one action you would avoid to prevent wider blast radius."
          ]
        }
      ],
      metadata: {
        prompts: [
          "Why can a route appear in the table but still fail in forwarding?",
          "What is one safe method to test BGP policy impact before broad rollout?",
          "How do you reduce route flapping without hiding real failures?"
        ]
      },
      learningAids: [
        {
          id: "network-engineering-201-l02-a1",
          type: "practice",
          title: "Convergence Checklist",
          content: "Step-by-step triage sheet for adjacency, control-plane, and data-plane validation."
        }
      ]
    },
    {
      id: "network-engineering-201-l03",
      title: "Checkpoint 1: Routing and Operations",
      type: "quiz",
      duration: 10,
      questions: [
        {
          id: "network-engineering-201-l03-q1",
          text: "A route exists in control plane but packets drop. Most likely first verification?",
          skillId: "network-engineering-201-skill-routing",
          options: [
            { id: "a", text: "Check next-hop reachability and forwarding table programming" },
            { id: "b", text: "Restart all switches immediately" },
            { id: "c", text: "Disable routing protocol entirely" },
            { id: "d", text: "Ignore because route is present" }
          ],
          correctOptionId: "a",
          explanation: "Control-plane visibility does not guarantee valid forwarding path."
        },
        {
          id: "network-engineering-201-l03-q2",
          text: "Which BGP attribute is commonly used to prefer one outbound path inside an AS?",
          skillId: "network-engineering-201-skill-routing",
          options: [
            { id: "a", text: "Local preference" },
            { id: "b", text: "CRC" },
            { id: "c", text: "VLAN ID" },
            { id: "d", text: "MTU" }
          ],
          correctOptionId: "a",
          explanation: "Local preference is a common internal policy lever for outbound path choice."
        },
        {
          id: "network-engineering-201-l03-q3",
          text: "What is the best reason to limit failure domain size in network design?",
          skillId: "network-engineering-201-skill-architecture",
          options: [
            { id: "a", text: "Increase outage spread for faster detection" },
            { id: "b", text: "Reduce potential user impact when one component fails" },
            { id: "c", text: "Avoid any monitoring requirements" },
            { id: "d", text: "Eliminate need for documentation" }
          ],
          correctOptionId: "b",
          explanation: "Smaller failure domains reduce blast radius and accelerate recovery."
        },
        {
          id: "network-engineering-201-l03-q4",
          text: "Which practice improves safety for high-impact routing policy changes?",
          skillId: "network-engineering-201-skill-operations",
          options: [
            { id: "a", text: "Direct production edits with no rollback plan" },
            { id: "b", text: "Staged rollout with validation and rollback criteria" },
            { id: "c", text: "Disable telemetry to reduce noise" },
            { id: "d", text: "Apply changes during peak business hours only" }
          ],
          correctOptionId: "b",
          explanation: "Guarded rollout with rollback conditions minimizes risk."
        }
      ],
      learningAids: [
        {
          id: "network-engineering-201-l03-a1",
          type: "mnemonic",
          title: "TRACE",
          content: "Table, Reachability, Adjacency, Change history, Evidence."
        }
      ]
    },
    {
      id: "network-engineering-201-l04",
      title: "Network Security Controls in Operations",
      type: "video",
      duration: 12,
      objectives: [
        "Apply segmentation and ACL strategy by trust zone",
        "Explain NAC and identity-aware access in enterprise networks",
        "Compare IPsec and SSL VPN deployment trade-offs"
      ],
      chunks: [
        {
          id: "network-engineering-201-l04-c1",
          kind: "concept",
          title: "Segmentation as Risk Control",
          content:
            "Security and reliability both benefit from segmentation. VLAN and VRF boundaries separate trust zones and limit lateral movement. ACLs and firewall policy should be explicit, least-privilege, and regularly reviewed against real traffic behavior."
        },
        {
          id: "network-engineering-201-l04-c2",
          kind: "concept",
          title: "Access Control and Remote Connectivity",
          content:
            "Network access control (NAC) verifies device/user posture before granting connectivity. Remote access architecture should enforce strong identity, conditional policy, and session logging. IPsec often suits site-to-site tunnels; SSL/TLS-based remote access supports user mobility and browser-native workflows."
        },
        {
          id: "network-engineering-201-l04-c3",
          kind: "recap",
          title: "Operational Security Hygiene",
          content:
            "Common gaps include stale ACL entries, over-broad admin rights, and undocumented exceptions. Mature teams run periodic policy recertification and track exceptions with expiration dates and owners."
        }
      ],
      flashcards: [
        {
          id: "network-engineering-201-l04-f1",
          front: "VRF",
          back: "Virtual routing and forwarding instance that creates separate routing tables on shared hardware."
        },
        {
          id: "network-engineering-201-l04-f2",
          front: "NAC",
          back: "Network Access Control: enforces identity/posture policy before allowing network access."
        },
        {
          id: "network-engineering-201-l04-f3",
          front: "Least privilege policy",
          back: "Grant only minimum required network access for required duration and scope."
        }
      ],
      learningAids: [
        {
          id: "network-engineering-201-l04-a1",
          type: "image",
          title: "Trust Zone Policy Map",
          content: "Reference map of enterprise trust zones with example ACL intents and review cadence."
        }
      ]
    },
    {
      id: "network-engineering-201-l05",
      title: "Observability and Incident Handling Workshop",
      type: "interactive",
      duration: 15,
      objectives: [
        "Use flow telemetry and synthetic probes to detect emerging issues",
        "Create fast incident triage paths for network outages",
        "Produce blameless corrective actions"
      ],
      chunks: [
        {
          id: "network-engineering-201-l05-c1",
          kind: "concept",
          title: "Baseline and Drift",
          content:
            "Operational telemetry is most useful when compared to baseline behavior. Track interface errors, queue drops, path latency, and control-plane events over time. Sudden drift from baseline often reveals emerging incidents earlier than threshold-based alerts alone."
        },
        {
          id: "network-engineering-201-l05-c2",
          kind: "practice",
          title: "Incident Playbook Structure",
          content:
            "A practical network incident playbook includes detection source, impact scope, immediate containment actions, escalation matrix, and recovery verification checks. Post-incident reviews should focus on system gaps and durable fixes instead of individual blame."
        }
      ],
      interactiveActivities: [
        {
          id: "network-engineering-201-l05-act1",
          type: "sorting_buckets",
          title: "Signal Classification",
          description: "Classify observability signals by likely diagnostic value.",
          buckets: ["Control Plane", "Data Plane", "Physical Layer"],
          items: [
            { text: "BGP session reset count spike", bucket: "Control Plane" },
            { text: "Interface CRC errors rising", bucket: "Physical Layer" },
            { text: "Packet loss on one path only", bucket: "Data Plane" },
            { text: "OSPF adjacency churn", bucket: "Control Plane" },
            { text: "Queue drops on uplink under load", bucket: "Data Plane" }
          ]
        }
      ],
      metadata: {
        prompts: [
          "Which metric drift would you alert on before users report outage symptoms?",
          "Write a two-line stakeholder update during an active WAN incident.",
          "Name one post-incident action that prevents recurrence."
        ]
      },
      learningAids: [
        {
          id: "network-engineering-201-l05-a1",
          type: "practice",
          title: "Incident Update Template",
          content: "Template for impact statement, current mitigation, next update time, and owner."
        }
      ]
    },
    {
      id: "network-engineering-201-l06",
      title: "Checkpoint 2: Security and Reliability",
      type: "quiz",
      duration: 10,
      questions: [
        {
          id: "network-engineering-201-l06-q1",
          text: "Which control most directly limits lateral movement across internal networks?",
          skillId: "network-engineering-201-skill-security",
          options: [
            { id: "a", text: "Flat Layer 2 network for all workloads" },
            { id: "b", text: "Zone segmentation with explicit allow policy" },
            { id: "c", text: "Disabling all logs" },
            { id: "d", text: "One shared admin credential" }
          ],
          correctOptionId: "b",
          explanation: "Segmentation and explicit policy sharply reduce lateral attack and failure spread."
        },
        {
          id: "network-engineering-201-l06-q2",
          text: "Why is baseline telemetry important in network operations?",
          skillId: "network-engineering-201-skill-observability",
          options: [
            { id: "a", text: "It removes need for troubleshooting" },
            { id: "b", text: "It helps detect abnormal drift before major incidents" },
            { id: "c", text: "It guarantees no false alerts" },
            { id: "d", text: "It replaces routing policy" }
          ],
          correctOptionId: "b",
          explanation: "Baseline comparison reveals early change patterns not obvious from static thresholds."
        },
        {
          id: "network-engineering-201-l06-q3",
          text: "Best first action after restoring service from a network outage?",
          skillId: "network-engineering-201-skill-operations",
          options: [
            { id: "a", text: "Close incident with no further analysis" },
            { id: "b", text: "Run blameless review and assign corrective actions" },
            { id: "c", text: "Disable monitoring to reduce alert noise" },
            { id: "d", text: "Rollback all security controls" }
          ],
          correctOptionId: "b",
          explanation: "Durable reliability improvement requires structured post-incident action ownership."
        },
        {
          id: "network-engineering-201-l06-q4",
          text: "Which VPN option is typically preferred for site-to-site network tunnels?",
          skillId: "network-engineering-201-skill-security",
          options: [
            { id: "a", text: "IPsec" },
            { id: "b", text: "SMTP" },
            { id: "c", text: "DHCP relay" },
            { id: "d", text: "RDP" }
          ],
          correctOptionId: "a",
          explanation: "IPsec is a common standard for secure site-to-site connectivity."
        }
      ],
      learningAids: [
        {
          id: "network-engineering-201-l06-a1",
          type: "mnemonic",
          title: "SAFE Ops",
          content: "Segment, Alert, Fix, Evaluate."
        }
      ]
    },
    {
      id: "network-engineering-201-l07",
      title: "Capstone: Branch Network Modernization",
      type: "interactive",
      duration: 18,
      objectives: [
        "Synthesize design, routing, security, and operations practices",
        "Prioritize modernization tasks under risk and budget constraints",
        "Produce a practical rollout and validation plan"
      ],
      chunks: [
        {
          id: "network-engineering-201-l07-c1",
          kind: "practice",
          title: "Case Scenario",
          content:
            "Design an upgrade plan for 60 branch sites with unstable WAN links, inconsistent ACL policy, and limited local IT support. Your plan must reduce outage frequency while improving security posture and deployment repeatability."
        },
        {
          id: "network-engineering-201-l07-c2",
          kind: "recap",
          title: "Evaluation Lens",
          content:
            "Strong plans include phased rollout, fallback strategy, measurable KPIs, and training for operational handoff."
        }
      ],
      metadata: {
        prompts: [
          "Define three KPIs for branch reliability improvement.",
          "Select one high-risk change and describe your rollback approach.",
          "List two security controls to standardize across all branches first."
        ]
      },
      learningAids: [
        {
          id: "network-engineering-201-l07-a1",
          type: "practice",
          title: "Modernization Canvas",
          content: "Template for current-state pain points, target architecture, change waves, and KPI targets."
        }
      ]
    }
  ]
};