import type { LearningModule } from "@/lib/modules/types";

export const CloudComputing301Module: LearningModule = {
  id: "cloud-computing-301",
  title: "Cloud Architecture and Resilience",
  description:
    "Advanced cloud architecture for high-scale systems: multi-region design, distributed data patterns, secure platform boundaries, performance engineering, and resilience validation under failure.",
  subject: "Computer Science",
  tags: ["core", "curriculum", "interactive", "cloud", "architecture", "resilience"],
  minAge: 16,
  maxAge: 99,
  version: "2.0.0",
  difficultyBand: "advanced",
  localeSupport: ["en"],
  thumbnail: "/placeholders/lesson-robot.svg",
  learningObjectives: [
    "Design multi-region service topologies with explicit recovery objectives",
    "Compare distributed data consistency patterns and choose by workload constraints",
    "Apply advanced network and identity controls for zero-trust cloud architectures",
    "Model performance bottlenecks and tune systems using evidence from production telemetry",
    "Design resilience testing programs using fault injection and game-day exercises",
    "Evaluate architecture trade-offs with measurable reliability, latency, and cost outcomes"
  ],
  lessons: [
    {
      id: "cloud-computing-301-l01",
      title: "Multi-Region Architecture Patterns",
      type: "video",
      duration: 13,
      objectives: [
        "Differentiate active-active and active-passive regional strategies",
        "Define RTO and RPO targets from business requirements",
        "Identify regional failure triggers and failover guardrails"
      ],
      chunks: [
        {
          id: "cloud-computing-301-l01-c1",
          kind: "concept",
          title: "From Availability Zones to Regions",
          content:
            "Single-region architectures can be highly available inside one geography yet still fail during regional events. Multi-region design introduces fault isolation at a larger boundary and requires explicit traffic, data, and control-plane decisions. Active-passive keeps one region warm for failover and is simpler operationally. Active-active serves traffic from multiple regions concurrently and improves latency for global users, but requires stronger consistency and routing controls."
        },
        {
          id: "cloud-computing-301-l01-c2",
          kind: "concept",
          title: "Recovery Objectives",
          content:
            "Recovery Time Objective (RTO) is the maximum acceptable outage duration after disruption. Recovery Point Objective (RPO) is the maximum acceptable data loss window. If checkout requires RTO under 5 minutes and RPO near zero, async replication with manual cutover is insufficient. Architecture must include near-real-time replication, tested failover automation, and deterministic runbooks."
        },
        {
          id: "cloud-computing-301-l01-c3",
          kind: "example",
          title: "Global Read, Local Write Trade-offs",
          content:
            "A common pattern is global read replicas with a designated write region. This lowers read latency globally but can create write hot spots and failover complexity. Fully multi-writer designs reduce regional dependency but increase conflict resolution complexity and operational risk. Teams should select based on data domain criticality, update frequency, and acceptable consistency behavior seen by users."
        }
      ],
      flashcards: [
        {
          id: "cloud-computing-301-l01-f1",
          front: "RTO",
          back: "Maximum acceptable time to restore service after disruption."
        },
        {
          id: "cloud-computing-301-l01-f2",
          front: "RPO",
          back: "Maximum acceptable amount of data loss measured by time between last good state and failure."
        },
        {
          id: "cloud-computing-301-l01-f3",
          front: "Active-active",
          back: "Multiple regions serve live traffic simultaneously with failover and traffic policy controls."
        }
      ],
      learningAids: [
        {
          id: "cloud-computing-301-l01-a1",
          type: "image",
          title: "Recovery Objective Grid",
          content: "Architecture matrix mapping workload criticality to target RTO/RPO tiers."
        }
      ]
    },
    {
      id: "cloud-computing-301-l02",
      title: "Distributed Data and Consistency Lab",
      type: "interactive",
      duration: 16,
      objectives: [
        "Compare strong, eventual, and bounded-staleness consistency",
        "Select partitioning and replication strategies for different workloads",
        "Reason about CAP trade-offs under network partitions"
      ],
      chunks: [
        {
          id: "cloud-computing-301-l02-c1",
          kind: "concept",
          title: "Consistency Choices",
          content:
            "Strong consistency provides freshest reads after writes but can increase cross-region latency and reduce availability under partition. Eventual consistency improves availability and write throughput but allows temporary stale reads. Bounded staleness places explicit limits on replication lag, balancing freshness and performance. Architecture decisions should align with user-critical operations, not ideology."
        },
        {
          id: "cloud-computing-301-l02-c2",
          kind: "practice",
          title: "Partitioning and Hot Keys",
          content:
            "Partitioning distributes load, but poor key design creates hot shards and tail-latency spikes. Teams should detect skew with per-partition metrics, then apply key redesign, adaptive sharding, or write buffering. Data model and traffic pattern must be reviewed together; scaling compute alone cannot fix pathological partition distribution."
        }
      ],
      interactiveActivities: [
        {
          id: "cloud-computing-301-l02-act1",
          type: "matching_pairs",
          title: "Workload to Consistency Match",
          description: "Match workload requirements to the most suitable consistency model.",
          pairs: [
            { left: "Real-time account balance updates", right: "Strong consistency" },
            { left: "Social feed like counters", right: "Eventual consistency" },
            { left: "Global catalog with lag under 2 seconds", right: "Bounded staleness" },
            { left: "Critical inventory reservation", right: "Strong consistency with transactional write path" }
          ]
        },
        {
          id: "cloud-computing-301-l02-act2",
          type: "scenario_practice",
          title: "Partition Failure Drill",
          description: "Decide system behavior when cross-region replication is interrupted.",
          instructions: [
            "Choose fail-open or fail-closed for each endpoint class.",
            "State one user-facing risk of your choice."
          ]
        }
      ],
      metadata: {
        prompts: [
          "Which endpoints in a commerce app require strong consistency and why?",
          "How would you detect and remediate a hot partition before customer impact escalates?",
          "When is eventual consistency acceptable, and how do you communicate it to product teams?"
        ]
      },
      learningAids: [
        {
          id: "cloud-computing-301-l02-a1",
          type: "practice",
          title: "Consistency Decision Tree",
          content: "Stepwise guide for selecting consistency model by correctness risk and latency target."
        }
      ]
    },
    {
      id: "cloud-computing-301-l03",
      title: "Checkpoint 1: Architecture Decisions",
      type: "quiz",
      duration: 10,
      questions: [
        {
          id: "cloud-computing-301-l03-q1",
          text: "Which statement best describes RPO?",
          skillId: "cloud-computing-301-skill-recovery",
          options: [
            { id: "a", text: "Maximum acceptable service downtime" },
            { id: "b", text: "Maximum acceptable data loss window" },
            { id: "c", text: "Average response latency across regions" },
            { id: "d", text: "Time to provision replacement compute" }
          ],
          correctOptionId: "b",
          explanation: "RPO defines the tolerated data-loss interval after failure."
        },
        {
          id: "cloud-computing-301-l03-q2",
          text: "What is the primary risk of active-active multi-writer databases?",
          skillId: "cloud-computing-301-skill-data",
          options: [
            { id: "a", text: "Higher risk of write conflicts and reconciliation complexity" },
            { id: "b", text: "Inability to scale read traffic" },
            { id: "c", text: "No regional latency benefits" },
            { id: "d", text: "Impossible automated failover" }
          ],
          correctOptionId: "a",
          explanation: "Concurrent writes across regions can conflict and require robust merge policy."
        },
        {
          id: "cloud-computing-301-l03-q3",
          text: "Under a network partition, CAP theorem implies you must trade off:",
          skillId: "cloud-computing-301-skill-data",
          options: [
            { id: "a", text: "Consistency or availability" },
            { id: "b", text: "Durability or encryption" },
            { id: "c", text: "Observability or automation" },
            { id: "d", text: "Latency or throughput always" }
          ],
          correctOptionId: "a",
          explanation: "During partition, distributed systems cannot guarantee both full consistency and availability."
        },
        {
          id: "cloud-computing-301-l03-q4",
          text: "A workload requires near-zero data loss and sub-5-minute recovery. Which approach is strongest?",
          skillId: "cloud-computing-301-skill-recovery",
          options: [
            { id: "a", text: "Daily backup with manual restore" },
            { id: "b", text: "Cold standby in same region" },
            { id: "c", text: "Multi-region replication with automated failover and tested runbooks" },
            { id: "d", text: "Single-zone deployment with auto-restart" }
          ],
          correctOptionId: "c",
          explanation: "Aggressive RTO/RPO requires replication plus automated, regularly tested recovery workflow."
        }
      ],
      learningAids: [
        {
          id: "cloud-computing-301-l03-a1",
          type: "mnemonic",
          title: "Recovery Trio",
          content: "Targets, Tooling, Testing."
        }
      ]
    },
    {
      id: "cloud-computing-301-l04",
      title: "Zero-Trust Cloud Security Architecture",
      type: "video",
      duration: 13,
      objectives: [
        "Design identity-centric access boundaries",
        "Apply network segmentation and service-to-service auth",
        "Map controls to compliance-ready evidence trails"
      ],
      chunks: [
        {
          id: "cloud-computing-301-l04-c1",
          kind: "concept",
          title: "Identity as the New Perimeter",
          content:
            "Zero trust assumes no implicit trust based on network location. Every request must be authenticated, authorized, and logged. Short-lived credentials, workload identities, and policy-as-code reduce long-lived secret risk and improve auditability."
        },
        {
          id: "cloud-computing-301-l04-c2",
          kind: "example",
          title: "Segmentation and East-West Controls",
          content:
            "Flat networks amplify breach impact. Micro-segmentation limits east-west movement by enforcing least-privilege communication paths. Service mesh policy can require mutual TLS and explicit service identity for internal API calls, reducing spoofing and lateral movement risk."
        },
        {
          id: "cloud-computing-301-l04-c3",
          kind: "recap",
          title: "Compliance Through Engineering Evidence",
          content:
            "Compliance maturity improves when controls generate machine-verifiable evidence: policy diffs, access logs, key rotation records, and change approvals. Automated control evidence reduces audit scramble and catches control drift early."
        }
      ],
      flashcards: [
        {
          id: "cloud-computing-301-l04-f1",
          front: "Zero trust",
          back: "Security model where trust is continuously verified, not assumed from network location."
        },
        {
          id: "cloud-computing-301-l04-f2",
          front: "Least privilege",
          back: "Grant only the minimum permissions required for a task, for the minimum time needed."
        },
        {
          id: "cloud-computing-301-l04-f3",
          front: "mTLS",
          back: "Mutual TLS authenticates both client and server, securing service-to-service communication."
        }
      ],
      learningAids: [
        {
          id: "cloud-computing-301-l04-a1",
          type: "image",
          title: "Zero-Trust Control Map",
          content: "Control map linking identity, network, data, and audit layers to common cloud threats."
        }
      ]
    },
    {
      id: "cloud-computing-301-l05",
      title: "Performance Engineering and Capacity Lab",
      type: "interactive",
      duration: 16,
      objectives: [
        "Interpret saturation, throughput, and latency together",
        "Apply load-test insights to tuning decisions",
        "Prevent regression via performance budgets"
      ],
      chunks: [
        {
          id: "cloud-computing-301-l05-c1",
          kind: "concept",
          title: "Tail Latency Matters",
          content:
            "Users experience tail latency, not average latency. A system with stable median latency can still feel slow if p99 spikes under concurrency. Performance engineering should model bottlenecks in dependency calls, queueing behavior, and thread-pool saturation, then test with realistic traffic shape."
        },
        {
          id: "cloud-computing-301-l05-c2",
          kind: "practice",
          title: "Performance Budgets",
          content:
            "A performance budget defines measurable limits such as p95 latency, CPU saturation, memory headroom, and database query duration. Release pipelines can block deployment when benchmark deltas exceed budget thresholds, turning performance into a first-class quality gate."
        }
      ],
      interactiveActivities: [
        {
          id: "cloud-computing-301-l05-act1",
          type: "sorting_buckets",
          title: "Signal-to-Bottleneck Mapping",
          description: "Sort each signal by likely dominant bottleneck.",
          buckets: ["CPU Bound", "IO/Network Bound", "Contention/Queueing"],
          items: [
            { text: "High CPU and low IO wait", bucket: "CPU Bound" },
            { text: "Low CPU with rising downstream latency", bucket: "IO/Network Bound" },
            { text: "Thread pool exhausted during bursts", bucket: "Contention/Queueing" },
            { text: "Database lock wait time spikes", bucket: "Contention/Queueing" },
            { text: "Packet retransmits increase during peak", bucket: "IO/Network Bound" }
          ]
        }
      ],
      metadata: {
        prompts: [
          "Why can p50 remain stable while p99 degrades sharply?",
          "Define one performance budget gate for your CI pipeline.",
          "Which metric would you inspect first for suspected queue contention?"
        ]
      },
      learningAids: [
        {
          id: "cloud-computing-301-l05-a1",
          type: "practice",
          title: "Load Test Debrief Sheet",
          content: "Template to capture hypothesis, bottleneck evidence, fix applied, and post-fix benchmark delta."
        }
      ]
    },
    {
      id: "cloud-computing-301-l06",
      title: "Checkpoint 2: Security and Performance",
      type: "quiz",
      duration: 10,
      questions: [
        {
          id: "cloud-computing-301-l06-q1",
          text: "Which control most directly reduces lateral movement risk inside a cloud network?",
          skillId: "cloud-computing-301-skill-security",
          options: [
            { id: "a", text: "Single shared admin account" },
            { id: "b", text: "Flat subnet for all workloads" },
            { id: "c", text: "Micro-segmentation with explicit allow policies" },
            { id: "d", text: "Disabling all internal logs" }
          ],
          correctOptionId: "c",
          explanation: "Segmentation with explicit policy constrains breach propagation paths."
        },
        {
          id: "cloud-computing-301-l06-q2",
          text: "Which metric best reflects end-user slow experience under burst traffic?",
          skillId: "cloud-computing-301-skill-performance",
          options: [
            { id: "a", text: "Median latency only" },
            { id: "b", text: "p99 latency" },
            { id: "c", text: "Build duration" },
            { id: "d", text: "Disk capacity total" }
          ],
          correctOptionId: "b",
          explanation: "Tail latency captures worst-case user experience during stress."
        },
        {
          id: "cloud-computing-301-l06-q3",
          text: "A service uses long-lived static credentials for internal API calls. Best remediation?",
          skillId: "cloud-computing-301-skill-security",
          options: [
            { id: "a", text: "Increase credential lifetime to reduce rotation work" },
            { id: "b", text: "Use workload identity and short-lived tokens" },
            { id: "c", text: "Store credentials in plain text for visibility" },
            { id: "d", text: "Disable service-to-service authentication" }
          ],
          correctOptionId: "b",
          explanation: "Short-lived identity tokens reduce blast radius and secret leakage risk."
        },
        {
          id: "cloud-computing-301-l06-q4",
          text: "What is the main value of performance budgets in delivery pipelines?",
          skillId: "cloud-computing-301-skill-performance",
          options: [
            { id: "a", text: "They replace functional testing" },
            { id: "b", text: "They prevent release when performance regresses beyond agreed thresholds" },
            { id: "c", text: "They guarantee zero outages" },
            { id: "d", text: "They eliminate capacity planning" }
          ],
          correctOptionId: "b",
          explanation: "Performance budgets operationalize non-functional acceptance criteria in CI/CD."
        }
      ],
      learningAids: [
        {
          id: "cloud-computing-301-l06-a1",
          type: "mnemonic",
          title: "TAIL",
          content: "Track averages less, inspect latency tails."
        }
      ]
    },
    {
      id: "cloud-computing-301-l07",
      title: "Resilience Game Day Studio",
      type: "interactive",
      duration: 17,
      objectives: [
        "Design fault-injection experiments with safe boundaries",
        "Define success criteria for resilience drills",
        "Translate game-day findings into roadmap actions"
      ],
      chunks: [
        {
          id: "cloud-computing-301-l07-c1",
          kind: "practice",
          title: "Failure Injection Planning",
          content:
            "Resilience drills are valuable only when they test realistic failure assumptions. Teams define hypothesis, blast-radius guardrails, abort criteria, and telemetry to observe. Example hypotheses: 'If region A API gateway fails, global traffic shifts within 90 seconds without checkout error rate above 2%.'"
        },
        {
          id: "cloud-computing-301-l07-c2",
          kind: "recap",
          title: "From Drill to Engineering Backlog",
          content:
            "Every game day should produce concrete ownership: detection gap fixes, runbook updates, automation tasks, and architecture debt items. Without explicit owners and deadlines, resilience exercises become performance theater rather than risk reduction."
        }
      ],
      metadata: {
        prompts: [
          "Write one game-day hypothesis with measurable pass/fail criteria.",
          "Name two abort conditions that keep a resilience drill safe.",
          "List three follow-up actions after discovering a failover gap."
        ]
      },
      learningAids: [
        {
          id: "cloud-computing-301-l07-a1",
          type: "practice",
          title: "Game Day Runbook",
          content: "Worksheet for hypothesis, blast radius, telemetry checkpoints, and post-drill action owners."
        }
      ]
    }
  ]
};