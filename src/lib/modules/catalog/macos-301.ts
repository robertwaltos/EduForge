import type { LearningModule } from "@/lib/modules/types";

export const Macos301Module: LearningModule = {
  id: "macos-301",
  title: "macOS Fleet Management, Security, and Performance Engineering",
  description:
    "Advanced macOS engineering curriculum on fleet policy controls, endpoint telemetry, incident analysis, performance optimization, and enterprise support governance.",
  subject: "Operating Systems",
  tags: ["core", "curriculum", "interactive", "technology", "operating-systems", "macos", "security"],
  minAge: 15,
  maxAge: 99,
  version: "2.0.0",
  difficultyBand: "advanced",
  localeSupport: ["en"],
  thumbnail: "/placeholders/lesson-robot.svg",
  learningObjectives: [
    "Operate macOS fleets with policy-driven management and change control",
    "Correlate endpoint telemetry to diagnose reliability and security issues",
    "Design hardening baselines with exception governance and evidence trails",
    "Analyze performance bottlenecks across CPU, memory, storage, and app layers",
    "Lead incident response workflows with containment and post-incident learning",
    "Communicate fleet risk, remediation, and rollout decisions to stakeholders"
  ],
  lessons: [
    {
      id: "macos-301-l01",
      title: "Fleet Policy Architecture and Management Controls",
      type: "video",
      duration: 14,
      chunks: [
        {
          id: "macos-301-l01-c1",
          kind: "concept",
          title: "Policy-Centric Fleet Operations",
          content:
            "At scale, macOS operations should be policy-driven rather than ticket-driven. Baselines for security, software, and configuration must be versioned and consistently enforced."
        },
        {
          id: "macos-301-l01-c2",
          kind: "concept",
          title: "Change Control and Drift Prevention",
          content:
            "Fleet reliability depends on minimizing unmanaged variance. Controlled profiles, ringed rollouts, and exception registers reduce drift and improve incident predictability."
        },
        {
          id: "macos-301-l01-c3",
          kind: "recap",
          title: "Governance Cadence",
          content:
            "High-performing endpoint teams maintain weekly drift reports, monthly policy compliance reviews, and quarterly baseline refresh cycles."
        }
      ],
      flashcards: [
        {
          id: "macos-301-l01-f1",
          front: "Fleet drift",
          back: "Unapproved divergence from standardized endpoint baseline."
        },
        {
          id: "macos-301-l01-f2",
          front: "Policy ring",
          back: "Controlled cohort sequence for staged policy deployment."
        },
        {
          id: "macos-301-l01-f3",
          front: "Exception register",
          back: "Tracked record of approved baseline deviations with owner and expiry."
        }
      ],
      learningAids: [
        {
          id: "macos-301-l01-a1",
          type: "image",
          title: "Fleet Control Model",
          content: "Model of baseline policy, rollout rings, exception handling, and compliance review."
        }
      ]
    },
    {
      id: "macos-301-l02",
      title: "Endpoint Telemetry and Performance Investigation Lab",
      type: "interactive",
      duration: 16,
      chunks: [
        {
          id: "macos-301-l02-c1",
          kind: "concept",
          title: "Signal Correlation",
          content:
            "Reliable diagnosis requires correlation across logs, process metrics, and user workflow symptoms. Single-source interpretation can hide root causes."
        },
        {
          id: "macos-301-l02-c2",
          kind: "practice",
          title: "Performance Triage",
          content:
            "Performance incidents should be analyzed using bounded hypotheses, baseline comparisons, and low-risk interventions before broad policy changes."
        }
      ],
      interactiveActivities: [
        {
          id: "macos-301-l02-act1",
          type: "matching_pairs",
          title: "Signal-to-Hypothesis Match",
          description: "Match observed endpoint behavior to likely root domain.",
          pairs: [
            { left: "Sustained high memory pressure", right: "Application or workload memory contention" },
            { left: "Frequent app launch delays", right: "Storage latency or indexing overhead" },
            { left: "Thermal throttling under normal workflow", right: "CPU utilization pattern or cooling constraint" },
            { left: "Periodic network-dependent app freezes", right: "Intermittent connectivity or DNS instability" }
          ]
        },
        {
          id: "macos-301-l02-act2",
          type: "scenario_practice",
          title: "Fleet Latency Drill",
          description: "Investigate a region-wide endpoint slowdown without disrupting users.",
          instructions: [
            "Pick one low-risk measurement action first.",
            "Define one mitigation safe for limited cohort deployment."
          ]
        }
      ],
      metadata: {
        prompts: [
          "Why are baseline comparisons essential for endpoint triage?",
          "Which metrics can mislead without context?",
          "How do you avoid over-correcting from limited samples?"
        ]
      },
      learningAids: [
        {
          id: "macos-301-l02-a1",
          type: "practice",
          title: "Endpoint Incident Sheet",
          content: "Template for timeline, correlated signals, hypothesis ranking, and mitigation validation."
        }
      ]
    },
    {
      id: "macos-301-l03",
      title: "Checkpoint 1: Fleet and Performance Engineering",
      type: "quiz",
      duration: 10,
      questions: [
        {
          id: "macos-301-l03-q1",
          text: "Why use staged policy rollout for fleet changes?",
          skillId: "macos-301-skill-fleet",
          options: [
            { id: "a", text: "To increase failure blast radius" },
            { id: "b", text: "To catch regressions before full deployment" },
            { id: "c", text: "To remove need for monitoring" },
            { id: "d", text: "To avoid documentation" }
          ],
          correctOptionId: "b",
          explanation: "Staged rollout supports controlled validation and safer change velocity."
        },
        {
          id: "macos-301-l03-q2",
          text: "Most reliable first move in endpoint performance incidents is:",
          skillId: "macos-301-skill-performance",
          options: [
            { id: "a", text: "Apply broad config changes immediately" },
            { id: "b", text: "Capture baseline telemetry and correlate symptoms" },
            { id: "c", text: "Disable all security tools" },
            { id: "d", text: "Reimage all affected devices" }
          ],
          correctOptionId: "b",
          explanation: "Evidence-first diagnosis reduces unnecessary disruption."
        },
        {
          id: "macos-301-l03-q3",
          text: "A strong exception register should include:",
          skillId: "macos-301-skill-governance",
          options: [
            { id: "a", text: "No owner and no expiry" },
            { id: "b", text: "Owner, rationale, approved scope, and expiration" },
            { id: "c", text: "Only device serial numbers" },
            { id: "d", text: "Untracked verbal approvals" }
          ],
          correctOptionId: "b",
          explanation: "Governed exceptions prevent permanent hidden policy erosion."
        },
        {
          id: "macos-301-l03-q4",
          text: "What is the main risk of single-metric troubleshooting?",
          skillId: "macos-301-skill-performance",
          options: [
            { id: "a", text: "Faster root-cause certainty" },
            { id: "b", text: "Misdiagnosis due to missing cross-domain context" },
            { id: "c", text: "Lower operational cost" },
            { id: "d", text: "Improved evidence quality" }
          ],
          correctOptionId: "b",
          explanation: "Endpoint incidents are often multi-factor and require correlation."
        }
      ],
      learningAids: [
        {
          id: "macos-301-l03-a1",
          type: "mnemonic",
          title: "TRACE",
          content: "Telemetry, Relationships, Assumptions, Changes, Evidence."
        }
      ]
    },
    {
      id: "macos-301-l04",
      title: "Hardening Strategy and Compliance Evidence",
      type: "video",
      duration: 14,
      chunks: [
        {
          id: "macos-301-l04-c1",
          kind: "concept",
          title: "Baseline Hardening Components",
          content:
            "A durable macOS hardening baseline combines encryption policy, execution trust controls, network posture, local firewall strategy, and privileged access boundaries."
        },
        {
          id: "macos-301-l04-c2",
          kind: "concept",
          title: "Evidence and Audit Readiness",
          content:
            "Security maturity includes proof: policy versions, compliance reports, remediation timelines, and tracked exceptions. Evidence quality determines audit confidence."
        },
        {
          id: "macos-301-l04-c3",
          kind: "recap",
          title: "Operational Fit",
          content:
            "Controls must support business workflows. Hardening that breaks core productivity creates bypass behavior and undermines security goals."
        }
      ],
      flashcards: [
        {
          id: "macos-301-l04-f1",
          front: "Baseline compliance",
          back: "Degree to which endpoints meet approved control configuration standards."
        },
        {
          id: "macos-301-l04-f2",
          front: "Control exception",
          back: "Approved deviation from baseline with documented risk acceptance."
        },
        {
          id: "macos-301-l04-f3",
          front: "Audit evidence",
          back: "Records proving policy enforcement, review, and remediation actions."
        }
      ],
      learningAids: [
        {
          id: "macos-301-l04-a1",
          type: "image",
          title: "Hardening Evidence Map",
          content: "Map connecting controls, telemetry, exceptions, and review cycles."
        }
      ]
    },
    {
      id: "macos-301-l05",
      title: "Incident Response and Change Governance Lab",
      type: "interactive",
      duration: 16,
      chunks: [
        {
          id: "macos-301-l05-c1",
          kind: "practice",
          title: "Containment and User Impact",
          content:
            "Incident response on endpoints should balance containment speed with user continuity. Define low-risk containment first, then escalate based on verified impact."
        },
        {
          id: "macos-301-l05-c2",
          kind: "recap",
          title: "Post-Incident Improvement",
          content:
            "Learning reviews should produce owned actions, measurable due dates, and policy or tooling updates that reduce recurrence probability."
        }
      ],
      interactiveActivities: [
        {
          id: "macos-301-l05-act1",
          type: "timeline_builder",
          title: "Response Sequence Builder",
          description: "Arrange endpoint incident phases in defensible order.",
          data: {
            initiatives: [
              "Confirm incident scope and affected cohort",
              "Apply low-impact containment",
              "Collect forensic and operational evidence",
              "Validate service recovery",
              "Publish prevention and ownership plan"
            ]
          }
        },
        {
          id: "macos-301-l05-act2",
          type: "sorting_buckets",
          title: "Change Risk Sort",
          description: "Classify proposed response changes by risk level.",
          buckets: ["Safe Immediate", "Needs Review", "High Risk"],
          items: [
            { text: "Temporary blocklist rule for affected app", bucket: "Needs Review" },
            { text: "Global profile rewrite during incident", bucket: "High Risk" },
            { text: "Targeted restart of impacted background service", bucket: "Safe Immediate" },
            { text: "Disable endpoint protection across fleet", bucket: "High Risk" }
          ]
        }
      ],
      metadata: {
        prompts: [
          "Which incident change types require mandatory secondary approval?",
          "How do you avoid permanent emergency fixes?",
          "What artifact best supports faster future triage?"
        ]
      },
      learningAids: [
        {
          id: "macos-301-l05-a1",
          type: "practice",
          title: "Incident Governance Template",
          content: "Template for severity, containment, evidence, communication, and prevention actions."
        }
      ]
    },
    {
      id: "macos-301-l06",
      title: "Checkpoint 2: Security and Incident Leadership",
      type: "quiz",
      duration: 11,
      questions: [
        {
          id: "macos-301-l06-q1",
          text: "Why pair hardening controls with documented exceptions?",
          skillId: "macos-301-skill-security",
          options: [
            { id: "a", text: "To make controls optional permanently" },
            { id: "b", text: "To preserve operational flexibility with accountable risk tracking" },
            { id: "c", text: "To avoid policy ownership" },
            { id: "d", text: "To remove compliance obligations" }
          ],
          correctOptionId: "b",
          explanation: "Governed exceptions maintain transparency while supporting real constraints."
        },
        {
          id: "macos-301-l06-q2",
          text: "Most valuable output of post-incident review is:",
          skillId: "macos-301-skill-incident",
          options: [
            { id: "a", text: "A long chat transcript" },
            { id: "b", text: "Owned corrective actions with measurable deadlines" },
            { id: "c", text: "No written follow-up" },
            { id: "d", text: "Unprioritized suggestions" }
          ],
          correctOptionId: "b",
          explanation: "Clear ownership and deadlines convert review into prevention."
        },
        {
          id: "macos-301-l06-q3",
          text: "Primary purpose of ringed policy rollout is:",
          skillId: "macos-301-skill-fleet",
          options: [
            { id: "a", text: "Simultaneous global blast" },
            { id: "b", text: "Gradual validation with controlled risk exposure" },
            { id: "c", text: "Skipping observability" },
            { id: "d", text: "Removing rollback plans" }
          ],
          correctOptionId: "b",
          explanation: "Rings let teams verify effects before broad deployment."
        },
        {
          id: "macos-301-l06-q4",
          text: "In incident response, what makes a change reversible?",
          skillId: "macos-301-skill-change",
          options: [
            { id: "a", text: "No record of prior state" },
            { id: "b", text: "Defined rollback path and validation criteria" },
            { id: "c", text: "Ad-hoc scripting in production" },
            { id: "d", text: "Undocumented profile edits" }
          ],
          correctOptionId: "b",
          explanation: "Rollback-ready changes reduce prolonged incident impact."
        }
      ],
      learningAids: [
        {
          id: "macos-301-l06-a1",
          type: "mnemonic",
          title: "CLIP",
          content: "Contain, Log, Improve, Prevent."
        }
      ]
    }
  ]
};
