import type { LearningModule } from "@/lib/modules/types";

export const Linux301Module: LearningModule = {
  id: "linux-301",
  title: "Linux Reliability, Networking, and Security Engineering",
  description:
    "Advanced Linux engineering curriculum on production reliability, performance analysis, network stack behavior, security hardening, and incident response operations.",
  subject: "Operating Systems",
  tags: ["core", "curriculum", "interactive", "technology", "operating-systems", "linux", "security"],
  minAge: 15,
  maxAge: 99,
  version: "2.0.0",
  difficultyBand: "advanced",
  localeSupport: ["en"],
  thumbnail: "/placeholders/lesson-robot.svg",
  learningObjectives: [
    "Engineer Linux services for reliability with systemd and dependency-aware startup",
    "Analyze performance bottlenecks using CPU, memory, IO, and network evidence",
    "Design secure Linux baselines using hardening and access governance controls",
    "Interpret logs and telemetry for faster incident containment and root-cause analysis",
    "Apply automation and change controls to reduce production drift",
    "Communicate operational risk and remediation plans clearly to stakeholders"
  ],
  lessons: [
    {
      id: "linux-301-l01",
      title: "Boot Flow, systemd Graph, and Service Topology",
      type: "video",
      duration: 14,
      chunks: [
        {
          id: "linux-301-l01-c1",
          kind: "concept",
          title: "Boot Path as a Reliability Surface",
          content:
            "Production Linux reliability starts before application code runs. Firmware, bootloader, kernel parameters, initramfs behavior, and systemd unit ordering all affect startup success and recovery speed."
        },
        {
          id: "linux-301-l01-c2",
          kind: "concept",
          title: "Dependency Graph Thinking",
          content:
            "systemd unit dependencies define service start order, restart cascades, and fault isolation boundaries. Poor dependency modeling can make small service failures propagate into full stack outages."
        },
        {
          id: "linux-301-l01-c3",
          kind: "recap",
          title: "Operational Guardrails",
          content:
            "Mature teams treat unit files as governed artifacts with peer review, change records, and rollback plans. Service topology should be visible and versioned."
        }
      ],
      flashcards: [
        {
          id: "linux-301-l01-f1",
          front: "Unit dependency graph",
          back: "Relationship map of service ordering and requirement constraints in systemd."
        },
        {
          id: "linux-301-l01-f2",
          front: "Fault isolation",
          back: "Design principle that limits failure spread across service boundaries."
        },
        {
          id: "linux-301-l01-f3",
          front: "Initramfs",
          back: "Early userspace used during boot to prepare root filesystem mounting and kernel handoff."
        }
      ],
      learningAids: [
        {
          id: "linux-301-l01-a1",
          type: "image",
          title: "Boot and Service Topology Map",
          content: "Reference flow from bootloader to systemd targets and service dependencies."
        }
      ]
    },
    {
      id: "linux-301-l02",
      title: "Observability and Performance Investigation Lab",
      type: "interactive",
      duration: 16,
      chunks: [
        {
          id: "linux-301-l02-c1",
          kind: "concept",
          title: "Four-Domain Diagnosis",
          content:
            "Most Linux incidents involve interacting constraints across CPU, memory, storage IO, and network. Single-metric debugging can mislead if cross-domain effects are ignored."
        },
        {
          id: "linux-301-l02-c2",
          kind: "practice",
          title: "Evidence-Driven Triage",
          content:
            "Reliable diagnosis combines time-correlated logs, process state, kernel signals, and service-level symptoms. Collect baseline evidence before applying changes."
        }
      ],
      interactiveActivities: [
        {
          id: "linux-301-l02-act1",
          type: "matching_pairs",
          title: "Signal-to-Domain Match",
          description: "Match incident signals to likely resource domain.",
          pairs: [
            { left: "High run queue with low idle", right: "CPU contention" },
            { left: "Rising page faults and swap pressure", right: "Memory stress" },
            { left: "Increasing await latency on block device", right: "Storage IO bottleneck" },
            { left: "Packet drops under burst traffic", right: "Network saturation or queue pressure" }
          ]
        },
        {
          id: "linux-301-l02-act2",
          type: "scenario_practice",
          title: "Latency Incident Drill",
          description: "Investigate sudden service latency increase with mixed symptoms.",
          instructions: [
            "Select one first measurement to disambiguate root causes.",
            "Propose one low-risk mitigation while diagnosis continues."
          ]
        }
      ],
      metadata: {
        prompts: [
          "Why is time correlation critical in Linux incident analysis?",
          "What is the risk of tuning without baseline evidence?",
          "Which domain usually shows secondary symptoms first in your case?"
        ]
      },
      learningAids: [
        {
          id: "linux-301-l02-a1",
          type: "practice",
          title: "Incident Evidence Sheet",
          content: "Template for symptom timeline, signal capture, hypothesis ranking, and test results."
        }
      ]
    },
    {
      id: "linux-301-l03",
      title: "Checkpoint 1: Reliability and Performance",
      type: "quiz",
      duration: 10,
      questions: [
        {
          id: "linux-301-l03-q1",
          text: "Why model systemd dependencies explicitly in production?",
          skillId: "linux-301-skill-reliability",
          options: [
            { id: "a", text: "To increase restart storms" },
            { id: "b", text: "To control startup order and limit failure cascades" },
            { id: "c", text: "To avoid documenting services" },
            { id: "d", text: "To disable health checks" }
          ],
          correctOptionId: "b",
          explanation: "Dependency clarity improves determinism and failure containment."
        },
        {
          id: "linux-301-l03-q2",
          text: "Best first step in performance triage is:",
          skillId: "linux-301-skill-observability",
          options: [
            { id: "a", text: "Apply random kernel tuning immediately" },
            { id: "b", text: "Capture baseline multi-domain evidence" },
            { id: "c", text: "Restart all services" },
            { id: "d", text: "Delete historic metrics" }
          ],
          correctOptionId: "b",
          explanation: "Evidence-first triage avoids bias and unnecessary changes."
        },
        {
          id: "linux-301-l03-q3",
          text: "A high page-fault rate with swap growth most directly indicates:",
          skillId: "linux-301-skill-observability",
          options: [
            { id: "a", text: "CPU overclock instability" },
            { id: "b", text: "Memory pressure" },
            { id: "c", text: "DNS cache miss" },
            { id: "d", text: "Filesystem permission issue" }
          ],
          correctOptionId: "b",
          explanation: "Page faults and swap growth are classic memory stress indicators."
        },
        {
          id: "linux-301-l03-q4",
          text: "What makes a temporary incident mitigation safe?",
          skillId: "linux-301-skill-incident",
          options: [
            { id: "a", text: "No record of change" },
            { id: "b", text: "Low blast radius and explicit rollback path" },
            { id: "c", text: "Permanent policy updates during outage" },
            { id: "d", text: "Ignoring service dependencies" }
          ],
          correctOptionId: "b",
          explanation: "Containment actions should be reversible and bounded."
        }
      ],
      learningAids: [
        {
          id: "linux-301-l03-a1",
          type: "mnemonic",
          title: "BASE",
          content: "Baseline, Assess domains, Stabilize, Evaluate cause."
        }
      ]
    },
    {
      id: "linux-301-l04",
      title: "Security Hardening, Compliance, and Access Governance",
      type: "video",
      duration: 14,
      chunks: [
        {
          id: "linux-301-l04-c1",
          kind: "concept",
          title: "Baseline Hardening Controls",
          content:
            "Linux hardening begins with secure defaults: minimized packages, patch cadence, strict SSH policy, file integrity monitoring, and disciplined account lifecycle management."
        },
        {
          id: "linux-301-l04-c2",
          kind: "concept",
          title: "Policy and Evidence",
          content:
            "Compliance readiness is not only technical configuration; it requires evidence trails for patching, privileged access reviews, and security exceptions."
        },
        {
          id: "linux-301-l04-c3",
          kind: "recap",
          title: "Operational Trade-offs",
          content:
            "Hardening must preserve operability. Teams should test controls under real workflows to avoid creating unsafe bypass behavior."
        }
      ],
      flashcards: [
        {
          id: "linux-301-l04-f1",
          front: "Configuration drift",
          back: "Divergence from approved baseline settings over time."
        },
        {
          id: "linux-301-l04-f2",
          front: "Exception register",
          back: "Tracked list of approved deviations with owner, rationale, and expiry."
        },
        {
          id: "linux-301-l04-f3",
          front: "Least privilege",
          back: "Granting only the minimum permissions needed to perform a task."
        }
      ],
      learningAids: [
        {
          id: "linux-301-l04-a1",
          type: "image",
          title: "Linux Security Baseline",
          content: "Checklist view of patching, access, network, and audit controls."
        }
      ]
    },
    {
      id: "linux-301-l05",
      title: "Incident Response and Controlled Change Lab",
      type: "interactive",
      duration: 16,
      chunks: [
        {
          id: "linux-301-l05-c1",
          kind: "practice",
          title: "Containment Decision Framework",
          content:
            "During Linux incidents, responders must trade off speed and certainty. Controlled change workflows reduce secondary outages while still enabling timely containment."
        },
        {
          id: "linux-301-l05-c2",
          kind: "recap",
          title: "Learning Loop",
          content:
            "Post-incident reviews should capture contributing factors, control gaps, and measurable prevention actions rather than blame narratives."
        }
      ],
      interactiveActivities: [
        {
          id: "linux-301-l05-act1",
          type: "timeline_builder",
          title: "Incident Timeline Builder",
          description: "Place key response actions in the correct operational order.",
          data: {
            initiatives: [
              "Declare incident scope and severity",
              "Collect baseline evidence",
              "Apply low-risk containment",
              "Validate service recovery",
              "Publish prevention actions with owners"
            ]
          }
        },
        {
          id: "linux-301-l05-act2",
          type: "sorting_buckets",
          title: "Change Risk Sort",
          description: "Classify changes by risk posture.",
          buckets: ["Safe Immediate", "Needs Review", "High Risk"],
          items: [
            { text: "Restart one stateless worker with rollback", bucket: "Safe Immediate" },
            { text: "Kernel parameter change on all hosts", bucket: "High Risk" },
            { text: "Adjust alert threshold temporarily", bucket: "Needs Review" },
            { text: "Privilege policy change during outage", bucket: "High Risk" }
          ]
        }
      ],
      metadata: {
        prompts: [
          "What criteria define a safe emergency change?",
          "How do you prevent recurring incidents after service restoration?",
          "Which incident artifact most improves future response speed?"
        ]
      },
      learningAids: [
        {
          id: "linux-301-l05-a1",
          type: "practice",
          title: "Response Runbook Template",
          content: "Template for detection, triage, containment, recovery, and prevention records."
        }
      ]
    },
    {
      id: "linux-301-l06",
      title: "Checkpoint 2: Security and Incident Engineering",
      type: "quiz",
      duration: 11,
      questions: [
        {
          id: "linux-301-l06-q1",
          text: "Why track security exceptions with expiration dates?",
          skillId: "linux-301-skill-security",
          options: [
            { id: "a", text: "To make exceptions permanent by default" },
            { id: "b", text: "To ensure temporary risk acceptance is reviewed and closed" },
            { id: "c", text: "To avoid audit records" },
            { id: "d", text: "To disable baseline controls" }
          ],
          correctOptionId: "b",
          explanation: "Time-bounded exceptions prevent hidden long-term exposure."
        },
        {
          id: "linux-301-l06-q2",
          text: "Most useful post-incident output is:",
          skillId: "linux-301-skill-incident",
          options: [
            { id: "a", text: "Only a timeline of events" },
            { id: "b", text: "Actionable prevention tasks with owners and due dates" },
            { id: "c", text: "Unstructured chat logs only" },
            { id: "d", text: "No written report" }
          ],
          correctOptionId: "b",
          explanation: "Ownership and deadlines convert learning into measurable improvement."
        },
        {
          id: "linux-301-l06-q3",
          text: "What is the primary risk of change without rollback planning?",
          skillId: "linux-301-skill-change",
          options: [
            { id: "a", text: "Faster learning" },
            { id: "b", text: "Extended outage if mitigation fails" },
            { id: "c", text: "Lower documentation burden" },
            { id: "d", text: "More deterministic startup" }
          ],
          correctOptionId: "b",
          explanation: "Rollback paths reduce recovery time when interventions misbehave."
        },
        {
          id: "linux-301-l06-q4",
          text: "A secure Linux baseline should prioritize:",
          skillId: "linux-301-skill-security",
          options: [
            { id: "a", text: "Expanded package footprint" },
            { id: "b", text: "Minimal services, patch discipline, and strict access controls" },
            { id: "c", text: "Shared privileged accounts" },
            { id: "d", text: "No logging to reduce storage" }
          ],
          correctOptionId: "b",
          explanation: "Reduced attack surface and accountable access are foundational."
        }
      ],
      learningAids: [
        {
          id: "linux-301-l06-a1",
          type: "mnemonic",
          title: "SHIELD",
          content: "Scope, Harden, Investigate, Escalate, Learn, Document."
        }
      ]
    }
  ]
};
