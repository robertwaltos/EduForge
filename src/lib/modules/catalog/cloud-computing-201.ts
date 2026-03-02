import type { LearningModule } from "@/lib/modules/types";

export const CloudComputing201Module: LearningModule = {
  id: "cloud-computing-201",
  title: "Cloud Platform Engineering",
  description:
    "Intermediate cloud engineering focused on reliability, observability, automation, security operations, and cost-aware architecture. Learners build practical platform skills used by modern SRE and platform teams.",
  subject: "Computer Science",
  tags: ["core", "curriculum", "interactive", "cloud", "sre", "platform-engineering"],
  minAge: 15,
  maxAge: 99,
  version: "2.0.0",
  difficultyBand: "intermediate",
  localeSupport: ["en"],
  thumbnail: "/placeholders/lesson-robot.svg",
  learningObjectives: [
    "Define and apply SLI, SLO, and error-budget practices for production cloud services",
    "Design telemetry pipelines that combine metrics, logs, and traces for fast root-cause analysis",
    "Implement reliable delivery workflows using IaC, policy checks, and progressive deployment patterns",
    "Build incident response playbooks that reduce mean time to detect and mean time to recover",
    "Evaluate autoscaling and resilience patterns including queue buffering, circuit breakers, and bulkheads",
    "Use FinOps concepts to improve cloud cost efficiency without degrading performance or reliability",
    "Propose platform-level improvements with measurable engineering outcomes"
  ],
  quizBlueprint: {
    frequency: "every-2-lessons",
    masteryThreshold: 0.8,
    feedbackMode: "immediate"
  },
  lessons: [
    {
      id: "cloud-computing-201-l01",
      title: "Reliability Engineering Foundations",
      type: "video",
      duration: 12,
      objectives: [
        "Differentiate availability, reliability, and durability",
        "Define SLI/SLO/error budget and describe how teams use them",
        "Map common production failure modes to mitigation patterns"
      ],
      chunks: [
        {
          id: "cloud-computing-201-l01-c1",
          kind: "concept",
          title: "Reliability Language That Teams Share",
          content:
            "Cloud teams often confuse reliability terms. Availability is whether users can reach a service now. Reliability is whether the service behaves correctly over time. Durability is whether stored data survives failures. Site Reliability Engineering (SRE) uses service-level indicators (SLIs) such as request success rate or p95 latency to measure user-visible quality. Teams then set service-level objectives (SLOs), such as 99.9% successful requests over 30 days. The allowed gap between 100% and the SLO is the error budget, which guides release pace: when a team burns the budget too quickly, it slows feature rollout and fixes reliability debt first."
        },
        {
          id: "cloud-computing-201-l01-c2",
          kind: "example",
          title: "Failure Domains and Blast Radius",
          content:
            "A failure domain is a boundary where faults are likely to be correlated, such as one availability zone, one database cluster, or one shared cache. Platform engineers reduce blast radius by isolating workloads across zones, keeping stateless services horizontally scalable, and avoiding single shared choke points. For example, if API pods run in three zones behind a load balancer and each zone can carry 60% of normal traffic, the service can survive one-zone failure while autoscaling the remaining zones."
        },
        {
          id: "cloud-computing-201-l01-c3",
          kind: "recap",
          title: "Reliability as a Product Requirement",
          content:
            "Reliability is not a post-launch patch; it is part of product quality. SLOs convert vague statements like 'must be fast' into measurable engineering targets. If checkout latency SLO is p95 under 300 ms, teams can reason about architecture, caching, and capacity decisions with shared evidence. Mature teams track both leading indicators (queue depth, saturation) and lagging indicators (customer incidents, failed transactions) to prevent failures before users experience them."
        }
      ],
      flashcards: [
        {
          id: "cloud-computing-201-l01-f1",
          front: "SLI",
          back: "A quantitative measure of service behavior, such as success rate, latency, or error ratio observed by users."
        },
        {
          id: "cloud-computing-201-l01-f2",
          front: "SLO",
          back: "A target value for an SLI over a time window, for example 99.9% successful requests over 30 days."
        },
        {
          id: "cloud-computing-201-l01-f3",
          front: "Error budget",
          back: "The maximum unreliability allowed by an SLO; teams spend it with releases and protect it with reliability work."
        },
        {
          id: "cloud-computing-201-l01-f4",
          front: "Blast radius",
          back: "The scope of impact when a component fails; smaller blast radius means failures affect fewer users or systems."
        }
      ],
      learningAids: [
        {
          id: "cloud-computing-201-l01-a1",
          type: "image",
          title: "SLO Scorecard",
          content: "One-page visual for SLI definitions, objective windows, and monthly error-budget burn examples."
        }
      ]
    },
    {
      id: "cloud-computing-201-l02",
      title: "Observability and Incident Response Lab",
      type: "interactive",
      duration: 15,
      objectives: [
        "Use metrics, logs, and traces together for diagnosis",
        "Identify noisy alerts and propose actionable alert rules",
        "Create a first-response incident timeline"
      ],
      chunks: [
        {
          id: "cloud-computing-201-l02-c1",
          kind: "concept",
          title: "From Monitoring to Observability",
          content:
            "Monitoring answers known questions with predefined dashboards and thresholds. Observability supports unknown-question debugging by correlating telemetry across system boundaries. Metrics show trend and saturation, logs preserve event detail, and traces explain request journeys across services. Teams that only monitor CPU and memory often miss application-level regressions such as dependency latency spikes or queue backlogs."
        },
        {
          id: "cloud-computing-201-l02-c2",
          kind: "practice",
          title: "Incident Workflow",
          content:
            "An effective incident flow includes detection, triage, mitigation, communication, and review. First responders stabilize service by reducing impact quickly: traffic shifting, feature flags, rollback, or rate limits. During mitigation, one owner updates status on a fixed cadence while a second owner investigates root cause. After recovery, teams run a blameless post-incident review and convert findings into concrete work items with due dates."
        }
      ],
      interactiveActivities: [
        {
          id: "cloud-computing-201-l02-act1",
          type: "sorting_buckets",
          title: "Telemetry Signal Sort",
          description: "Classify each diagnostic clue as metric, log, or trace evidence.",
          buckets: ["Metrics", "Logs", "Traces"],
          items: [
            { text: "p95 latency jumped from 180 ms to 620 ms", bucket: "Metrics" },
            { text: "Order service error: timeout contacting payments", bucket: "Logs" },
            { text: "Span waterfall shows 4.2 s at inventory API", bucket: "Traces" },
            { text: "Queue depth exceeded 50k messages", bucket: "Metrics" },
            { text: "Request id 8f1a... retried 5 times before fail", bucket: "Logs" },
            { text: "Single user request crosses 7 services in 1.8 s", bucket: "Traces" }
          ]
        },
        {
          id: "cloud-computing-201-l02-act2",
          type: "timeline_builder",
          title: "Incident Timeline Builder",
          description: "Place each response step in the right sequence for a severity-1 outage.",
          instructions: [
            "Order the steps from first signal to post-incident follow-up.",
            "Explain one risk if the communication step is skipped."
          ],
          data: {
            steps: [
              "Alert fires and is acknowledged",
              "Initial impact assessment",
              "Mitigation applied (rollback or traffic shift)",
              "Stakeholder status update",
              "Root-cause validation",
              "Post-incident review and action items"
            ]
          }
        }
      ],
      metadata: {
        prompts: [
          "Given high latency and low CPU, what second signal would you check next and why?",
          "Write a two-sentence stakeholder update for an active production incident.",
          "Name one alert that should page immediately and one that should create a ticket only."
        ]
      },
      learningAids: [
        {
          id: "cloud-computing-201-l02-a1",
          type: "practice",
          title: "On-Call First 10 Minutes",
          content: "Checklist for acknowledgement, impact scope, mitigation choice, and communication cadence."
        }
      ]
    },
    {
      id: "cloud-computing-201-l03",
      title: "Checkpoint 1: Reliability and Ops",
      type: "quiz",
      duration: 10,
      quizBlueprint: {
        totalQuestions: 5,
        timeLimitMinutes: 10,
        questionTypes: [{ type: "mcq_single", count: 5, pointsEach: 1 }],
        difficultyDistribution: { easy: 1, medium: 3, hard: 1 }
      },
      questions: [
        {
          id: "cloud-computing-201-l03-q1",
          text: "A service has an SLO of 99.9% success over 30 days. What is the monthly error budget?",
          skillId: "cloud-computing-201-skill-reliability",
          options: [
            { id: "a", text: "0.1% failed requests" },
            { id: "b", text: "1% failed requests" },
            { id: "c", text: "10% failed requests" },
            { id: "d", text: "No failures are allowed" }
          ],
          correctOptionId: "a",
          explanation: "99.9% objective allows 0.1% of requests to fail within the measurement window."
        },
        {
          id: "cloud-computing-201-l03-q2",
          text: "Which telemetry source is most useful for seeing cross-service latency on one request path?",
          skillId: "cloud-computing-201-skill-observability",
          options: [
            { id: "a", text: "Application logs only" },
            { id: "b", text: "Distributed traces" },
            { id: "c", text: "CPU utilization metric" },
            { id: "d", text: "Billing report" }
          ],
          correctOptionId: "b",
          explanation: "Distributed traces show span-by-span latency across service calls for one request."
        },
        {
          id: "cloud-computing-201-l03-q3",
          text: "What is the best first mitigation when a bad deployment causes elevated 5xx errors?",
          skillId: "cloud-computing-201-skill-incident-response",
          options: [
            { id: "a", text: "Wait for more data before changing anything" },
            { id: "b", text: "Scale the database vertically" },
            { id: "c", text: "Rollback or disable the risky feature flag" },
            { id: "d", text: "Restart every service in the cluster" }
          ],
          correctOptionId: "c",
          explanation: "Fastest risk-reduction is restoring known-good behavior by rollback or feature disablement."
        },
        {
          id: "cloud-computing-201-l03-q4",
          text: "Which alert is most likely to create pager fatigue?",
          skillId: "cloud-computing-201-skill-observability",
          options: [
            { id: "a", text: "Sustained checkout error rate above 3% for 10 minutes" },
            { id: "b", text: "Disk usage exceeds 80% on one non-critical build node" },
            { id: "c", text: "Authentication failures spike across all regions" },
            { id: "d", text: "API latency p99 exceeds SLO threshold" }
          ],
          correctOptionId: "b",
          explanation: "Low-severity, noisy infrastructure thresholds should usually route to ticketing, not paging."
        },
        {
          id: "cloud-computing-201-l03-q5",
          text: "Why do teams define failure domains in architecture design?",
          skillId: "cloud-computing-201-skill-reliability",
          options: [
            { id: "a", text: "To maximize coupling between services" },
            { id: "b", text: "To reduce blast radius when components fail" },
            { id: "c", text: "To eliminate the need for observability" },
            { id: "d", text: "To avoid writing runbooks" }
          ],
          correctOptionId: "b",
          explanation: "Failure-domain design localizes impact so one fault does not cascade broadly."
        }
      ],
      learningAids: [
        {
          id: "cloud-computing-201-l03-a1",
          type: "mnemonic",
          title: "Incident Core Loop",
          content: "Acknowledge, Assess, Mitigate, Communicate, Review."
        }
      ]
    },
    {
      id: "cloud-computing-201-l04",
      title: "Automation, IaC, and Progressive Delivery",
      type: "video",
      duration: 13,
      objectives: [
        "Explain why immutable infrastructure reduces configuration drift",
        "Describe CI/CD guardrails for safer releases",
        "Compare rolling, blue/green, and canary deployment strategies"
      ],
      chunks: [
        {
          id: "cloud-computing-201-l04-c1",
          kind: "concept",
          title: "Infrastructure as Code Discipline",
          content:
            "Infrastructure as Code (IaC) treats cloud resources as versioned code instead of manual console clicks. Teams define networks, compute pools, access policies, and data services in declarative templates, then review changes through pull requests. This approach improves auditability, repeatability, and disaster recovery because environments can be rebuilt predictably. Drift detection compares actual cloud state with declared state and flags unmanaged changes before they become outages."
        },
        {
          id: "cloud-computing-201-l04-c2",
          kind: "example",
          title: "CI/CD Safety Rails",
          content:
            "Reliable pipelines include linting, unit tests, integration tests, policy checks, and artifact signing before deployment. Release pipelines should block on failed quality gates and enforce approvals for high-risk systems. Runtime guardrails include automated rollback when error rate or latency exceeds threshold. Mature teams also run deployment simulations and game days to ensure rollback logic works under pressure, not just in staging."
        },
        {
          id: "cloud-computing-201-l04-c3",
          kind: "concept",
          title: "Progressive Delivery Patterns",
          content:
            "Rolling deployment replaces instances gradually in-place. Blue/green keeps two environments and switches traffic when the new environment is validated. Canary ships to a small traffic slice first, observes metrics, then ramps gradually. Feature flags complement these methods by separating deployment from release, letting teams dark-launch code and enable behavior for selected cohorts."
        }
      ],
      flashcards: [
        {
          id: "cloud-computing-201-l04-f1",
          front: "Configuration drift",
          back: "Mismatch between declared infrastructure and actual running state caused by manual or unmanaged changes."
        },
        {
          id: "cloud-computing-201-l04-f2",
          front: "Blue/green deployment",
          back: "Release strategy with two parallel environments where traffic switches to the validated target environment."
        },
        {
          id: "cloud-computing-201-l04-f3",
          front: "Canary deployment",
          back: "Gradual rollout to a small user subset first, expanding only if health metrics remain within guardrails."
        }
      ],
      learningAids: [
        {
          id: "cloud-computing-201-l04-a1",
          type: "animation",
          title: "Release Strategy Comparison",
          content: "Side-by-side timeline of rolling, blue/green, and canary rollout behavior with rollback points."
        }
      ]
    },
    {
      id: "cloud-computing-201-l05",
      title: "Capacity, Scaling, and FinOps Workshop",
      type: "interactive",
      duration: 15,
      objectives: [
        "Estimate baseline and peak capacity requirements",
        "Choose autoscaling triggers that align with user experience",
        "Apply FinOps unit economics to cloud architecture decisions"
      ],
      chunks: [
        {
          id: "cloud-computing-201-l05-c1",
          kind: "concept",
          title: "Right-Sizing and Autoscaling Signals",
          content:
            "Autoscaling works when signals reflect user pain, not just infrastructure noise. CPU is useful for compute-bound jobs, but queue depth, request latency, and concurrent sessions often correlate better with user impact. Rightsizing starts with workload profiling, then selecting instance families based on memory pressure, network throughput, and storage IOPS patterns."
        },
        {
          id: "cloud-computing-201-l05-c2",
          kind: "concept",
          title: "FinOps Metrics That Matter",
          content:
            "FinOps connects engineering choices with business outcomes. Beyond total monthly spend, teams track unit cost metrics like cost per 1,000 API calls, cost per active user, or cost per data pipeline run. These metrics make optimization trade-offs visible. For example, adding cache nodes may increase infrastructure spend but reduce database load and lower cost per transaction while improving latency."
        }
      ],
      interactiveActivities: [
        {
          id: "cloud-computing-201-l05-act1",
          type: "matching_pairs",
          title: "Optimization Match",
          description: "Match each cost problem with the strongest first optimization action.",
          pairs: [
            { left: "Consistently low VM utilization", right: "Rightsize or move to smaller instance class" },
            { left: "Batch jobs interrupted on on-demand only", right: "Use spot + checkpoint strategy" },
            { left: "High egress charges across regions", right: "Revisit data locality and architecture boundaries" },
            { left: "Frequent cold starts in serverless API", right: "Tune concurrency and provisioned capacity" }
          ]
        },
        {
          id: "cloud-computing-201-l05-act2",
          type: "scenario_practice",
          title: "Scale Plan Drill",
          description: "Propose a scaling policy for flash-sale traffic with latency and cost constraints.",
          instructions: [
            "Set one scale-out trigger and one scale-in trigger.",
            "Name one guardrail to prevent runaway cloud spend."
          ]
        }
      ],
      metadata: {
        prompts: [
          "If p95 latency rises while CPU is normal, what signal would you scale on next?",
          "Define one unit-cost KPI your team can review weekly.",
          "Explain one case where spending more lowers total cost of ownership."
        ]
      },
      learningAids: [
        {
          id: "cloud-computing-201-l05-a1",
          type: "practice",
          title: "FinOps Worksheet",
          content: "Template to compute cost per transaction before and after architecture changes."
        }
      ]
    },
    {
      id: "cloud-computing-201-l06",
      title: "Checkpoint 2: Delivery and FinOps",
      type: "quiz",
      duration: 11,
      quizBlueprint: {
        totalQuestions: 6,
        timeLimitMinutes: 11,
        questionTypes: [{ type: "mcq_single", count: 6, pointsEach: 1 }],
        difficultyDistribution: { easy: 2, medium: 3, hard: 1 }
      },
      questions: [
        {
          id: "cloud-computing-201-l06-q1",
          text: "What is the primary benefit of managing infrastructure as code?",
          skillId: "cloud-computing-201-skill-automation",
          options: [
            { id: "a", text: "It eliminates all incidents permanently" },
            { id: "b", text: "It replaces the need for testing" },
            { id: "c", text: "It improves repeatability, reviewability, and auditability" },
            { id: "d", text: "It guarantees lower cloud bills every month" }
          ],
          correctOptionId: "c",
          explanation: "IaC standardizes environment changes through version control and reviewable change history."
        },
        {
          id: "cloud-computing-201-l06-q2",
          text: "Which deployment approach usually minimizes user exposure during high-risk releases?",
          skillId: "cloud-computing-201-skill-delivery",
          options: [
            { id: "a", text: "Big-bang replacement in all regions" },
            { id: "b", text: "Canary rollout with health checks" },
            { id: "c", text: "Manual patching on production servers" },
            { id: "d", text: "Disabling telemetry before rollout" }
          ],
          correctOptionId: "b",
          explanation: "Canary limits blast radius by exposing only a small traffic slice until metrics confirm safety."
        },
        {
          id: "cloud-computing-201-l06-q3",
          text: "A team tracks cost per 1,000 API requests. This is an example of:",
          skillId: "cloud-computing-201-skill-finops",
          options: [
            { id: "a", text: "A unit economics metric" },
            { id: "b", text: "A compliance framework" },
            { id: "c", text: "A tracing attribute" },
            { id: "d", text: "A static code metric" }
          ],
          correctOptionId: "a",
          explanation: "Unit economics metrics connect cost to business output, improving optimization decisions."
        },
        {
          id: "cloud-computing-201-l06-q4",
          text: "Which scaling trigger is most aligned with user experience for an API service?",
          skillId: "cloud-computing-201-skill-scaling",
          options: [
            { id: "a", text: "Monthly invoice total" },
            { id: "b", text: "p95 response latency" },
            { id: "c", text: "Disk temperature" },
            { id: "d", text: "Number of team standups" }
          ],
          correctOptionId: "b",
          explanation: "Latency directly reflects customer impact and is often a better scaling signal than raw host metrics alone."
        },
        {
          id: "cloud-computing-201-l06-q5",
          text: "Why are feature flags useful in progressive delivery?",
          skillId: "cloud-computing-201-skill-delivery",
          options: [
            { id: "a", text: "They remove the need for rollback" },
            { id: "b", text: "They separate deploy from release and allow controlled exposure" },
            { id: "c", text: "They encrypt network traffic" },
            { id: "d", text: "They replace identity management" }
          ],
          correctOptionId: "b",
          explanation: "Feature flags let teams ship code safely and enable functionality to selected users incrementally."
        },
        {
          id: "cloud-computing-201-l06-q6",
          text: "What is the best first response if reserved capacity sits consistently underutilized?",
          skillId: "cloud-computing-201-skill-finops",
          options: [
            { id: "a", text: "Increase reservation term automatically" },
            { id: "b", text: "Ignore it to preserve flexibility" },
            { id: "c", text: "Re-baseline demand and rebalance commitments" },
            { id: "d", text: "Disable autoscaling across all services" }
          ],
          correctOptionId: "c",
          explanation: "Underused commitments indicate mismatch between forecast and consumption; rebalance before extending terms."
        }
      ],
      learningAids: [
        {
          id: "cloud-computing-201-l06-a1",
          type: "mnemonic",
          title: "SAFE Release",
          content: "Small batches, Automated checks, Fast rollback, Evidence-driven ramp."
        }
      ]
    },
    {
      id: "cloud-computing-201-l07",
      title: "Platform Design Studio",
      type: "interactive",
      duration: 16,
      objectives: [
        "Synthesize reliability, delivery, and cost practices in one architecture",
        "Defend design trade-offs using measurable SLO and cost outcomes",
        "Produce an actionable 30-day platform improvement plan"
      ],
      chunks: [
        {
          id: "cloud-computing-201-l07-c1",
          kind: "practice",
          title: "Case: Global Learning API",
          content:
            "You are the platform engineer for a learning platform that serves three regions and sees 8x traffic spikes during evening homework hours. The current architecture has one primary database region, no request tracing, and manual deployment approval at midnight. Your job is to redesign for resiliency, faster safe releases, and predictable unit economics."
        },
        {
          id: "cloud-computing-201-l07-c2",
          kind: "recap",
          title: "Design Rubric",
          content:
            "Strong solutions include explicit SLOs, error-budget policy, observability plan, release strategy, scaling triggers, and cost guardrails. Accept trade-offs if they are measurable. For example, adding regional read replicas may increase spend but reduce p95 latency and improve availability under failover."
        }
      ],
      metadata: {
        prompts: [
          "Define two SLIs and one SLO for the case study service.",
          "Choose rollout strategy for weekly releases and justify rollback criteria.",
          "List three 30-day actions with expected impact on reliability or cost."
        ]
      },
      learningAids: [
        {
          id: "cloud-computing-201-l07-a1",
          type: "practice",
          title: "Architecture Review Canvas",
          content: "Template with sections for reliability target, telemetry plan, release plan, and FinOps KPI baseline."
        }
      ]
    }
  ]
};