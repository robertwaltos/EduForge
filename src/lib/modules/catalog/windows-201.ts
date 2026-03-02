import type { LearningModule } from "@/lib/modules/types";

export const Windows201Module: LearningModule = {
  id: "windows-201",
  title: "Windows Administration and Automation II",
  description:
    "Intermediate Windows operations curriculum on identity governance, update lifecycle, endpoint hardening, event-driven troubleshooting, and automation with PowerShell.",
  subject: "Operating Systems",
  tags: ["core", "curriculum", "interactive", "technology", "operating-systems", "windows"],
  minAge: 13,
  maxAge: 99,
  version: "2.0.0",
  difficultyBand: "intermediate",
  localeSupport: ["en"],
  thumbnail: "/placeholders/lesson-robot.svg",
  learningObjectives: [
    "Administer Windows accounts, groups, and privilege boundaries with least-privilege principles",
    "Operate update and patch workflows using staged deployment and rollback planning",
    "Apply endpoint hardening controls including Defender, firewall, and policy governance",
    "Use Event Viewer, Task Scheduler, and service controls for structured troubleshooting",
    "Automate recurring operations safely with PowerShell scripts",
    "Create support runbooks with evidence, escalation, and recovery standards"
  ],
  lessons: [
    {
      id: "windows-201-l01",
      title: "Identity, Privilege, and Access Governance",
      type: "video",
      duration: 13,
      chunks: [
        {
          id: "windows-201-l01-c1",
          kind: "concept",
          title: "Access Boundaries in Windows Operations",
          content:
            "Reliable Windows administration requires clear separation between standard user activity and privileged operations. Group-based access patterns scale better than ad-hoc user exceptions."
        },
        {
          id: "windows-201-l01-c2",
          kind: "concept",
          title: "Privilege Elevation Discipline",
          content:
            "Elevation should be scoped, approved, and logged. Persistent broad admin rights increase both security and operational risk."
        },
        {
          id: "windows-201-l01-c3",
          kind: "recap",
          title: "Governance Signals",
          content:
            "Strong governance includes periodic access review, stale account cleanup, and auditable policy for privileged activity exceptions."
        }
      ],
      flashcards: [
        {
          id: "windows-201-l01-f1",
          front: "Least privilege",
          back: "Operational principle of granting only minimum required rights for a task."
        },
        {
          id: "windows-201-l01-f2",
          front: "Elevation policy",
          back: "Rules controlling who may run privileged actions and under what conditions."
        },
        {
          id: "windows-201-l01-f3",
          front: "Access review",
          back: "Regular validation that assigned permissions remain justified and current."
        }
      ],
      learningAids: [
        {
          id: "windows-201-l01-a1",
          type: "image",
          title: "Privilege Governance Map",
          content: "Map of user roles, admin scopes, and approval checkpoints."
        }
      ]
    },
    {
      id: "windows-201-l02",
      title: "Patch Lifecycle and Controlled Rollout Lab",
      type: "interactive",
      duration: 15,
      chunks: [
        {
          id: "windows-201-l02-c1",
          kind: "concept",
          title: "Update Rings and Validation",
          content:
            "Windows patching at scale should use phased deployment cohorts, preflight compatibility checks, and telemetry-based health gates before wider release."
        },
        {
          id: "windows-201-l02-c2",
          kind: "practice",
          title: "Rollback and Recovery Readiness",
          content:
            "Every high-impact update should define rollback conditions, ownership, and communication protocols so support teams can respond quickly to regression."
        }
      ],
      interactiveActivities: [
        {
          id: "windows-201-l02-act1",
          type: "matching_pairs",
          title: "Rollout Control Match",
          description: "Match rollout controls to their primary risk reduction outcome.",
          pairs: [
            { left: "Pilot ring", right: "Detects regressions before broad impact" },
            { left: "Health gate threshold", right: "Blocks progression when stability drops" },
            { left: "Rollback trigger", right: "Defines automatic or manual reversion point" },
            { left: "User comms plan", right: "Reduces support noise and confusion" }
          ]
        },
        {
          id: "windows-201-l02-act2",
          type: "scenario_practice",
          title: "Urgent Patch Exercise",
          description: "Plan deployment of a critical security patch under time pressure.",
          instructions: [
            "Choose first rollout cohort and justify choice.",
            "Define one metric that pauses rollout immediately."
          ]
        }
      ],
      metadata: {
        prompts: [
          "How do you balance patch urgency and compatibility risk?",
          "Which telemetry signals should gate rollout expansion?",
          "What makes rollback execution credible during incidents?"
        ]
      },
      learningAids: [
        {
          id: "windows-201-l02-a1",
          type: "practice",
          title: "Patch Runbook",
          content: "Template for scope, ring plan, validation checks, rollback, and owner sign-off."
        }
      ]
    },
    {
      id: "windows-201-l03",
      title: "Checkpoint 1: Access and Update Operations",
      type: "quiz",
      duration: 10,
      questions: [
        {
          id: "windows-201-l03-q1",
          text: "Why should broad permanent admin rights be minimized?",
          skillId: "windows-201-skill-access",
          options: [
            { id: "a", text: "They simplify audit trails" },
            { id: "b", text: "They increase misconfiguration and security blast radius" },
            { id: "c", text: "They improve rollback speed" },
            { id: "d", text: "They reduce support workload automatically" }
          ],
          correctOptionId: "b",
          explanation: "Broad privileges amplify both accidental and malicious impact."
        },
        {
          id: "windows-201-l03-q2",
          text: "Primary purpose of staged patch rings is:",
          skillId: "windows-201-skill-patch",
          options: [
            { id: "a", text: "Immediate global rollout" },
            { id: "b", text: "Controlled validation before full deployment" },
            { id: "c", text: "Removing telemetry dependence" },
            { id: "d", text: "Avoiding rollback planning" }
          ],
          correctOptionId: "b",
          explanation: "Rings reduce exposure while confirming update behavior."
        },
        {
          id: "windows-201-l03-q3",
          text: "A high-quality elevation workflow includes:",
          skillId: "windows-201-skill-access",
          options: [
            { id: "a", text: "Shared local admin credentials" },
            { id: "b", text: "Approval, scope limits, and activity logging" },
            { id: "c", text: "No documentation requirements" },
            { id: "d", text: "One-time approval for lifetime elevation" }
          ],
          correctOptionId: "b",
          explanation: "Scoped and logged elevation supports accountable operations."
        },
        {
          id: "windows-201-l03-q4",
          text: "Most critical rollout safety artifact is:",
          skillId: "windows-201-skill-patch",
          options: [
            { id: "a", text: "A broad completion email" },
            { id: "b", text: "A measurable rollback trigger tied to health data" },
            { id: "c", text: "A screenshot of update settings" },
            { id: "d", text: "A private undocumented checklist" }
          ],
          correctOptionId: "b",
          explanation: "Clear rollback conditions are essential when regressions occur."
        }
      ],
      learningAids: [
        {
          id: "windows-201-l03-a1",
          type: "mnemonic",
          title: "RISK",
          content: "Rights, Indicators, Staging, Kill-switch."
        }
      ]
    },
    {
      id: "windows-201-l04",
      title: "Endpoint Hardening and Security Baselines",
      type: "video",
      duration: 13,
      chunks: [
        {
          id: "windows-201-l04-c1",
          kind: "concept",
          title: "Baseline Security Components",
          content:
            "Windows hardening baseline should combine endpoint protection policy, firewall posture, credential protections, and controlled script execution settings."
        },
        {
          id: "windows-201-l04-c2",
          kind: "concept",
          title: "Policy Exceptions and Evidence",
          content:
            "Exceptions should be time-bounded and owned. Without explicit evidence, temporary bypasses become hidden permanent risk."
        },
        {
          id: "windows-201-l04-c3",
          kind: "recap",
          title: "Operational Fit",
          content:
            "Hardening must preserve core productivity workflows while reducing threat surface. Controls should be tested with real user scenarios."
        }
      ],
      flashcards: [
        {
          id: "windows-201-l04-f1",
          front: "Security baseline",
          back: "Approved minimum configuration standard for endpoint protection and policy."
        },
        {
          id: "windows-201-l04-f2",
          front: "Exception expiry",
          back: "Predefined end date for temporary control bypass approval."
        },
        {
          id: "windows-201-l04-f3",
          front: "Threat surface",
          back: "Set of exposed pathways through which systems can be compromised."
        }
      ],
      learningAids: [
        {
          id: "windows-201-l04-a1",
          type: "image",
          title: "Windows Hardening Matrix",
          content: "Matrix of protection controls, enforcement level, and review cadence."
        }
      ]
    },
    {
      id: "windows-201-l05",
      title: "Event-Driven Troubleshooting and PowerShell Lab",
      type: "interactive",
      duration: 15,
      chunks: [
        {
          id: "windows-201-l05-c1",
          kind: "practice",
          title: "Evidence-First Triage",
          content:
            "Effective Windows incident handling starts with event correlation, service state review, and controlled hypothesis testing before broad system changes."
        },
        {
          id: "windows-201-l05-c2",
          kind: "recap",
          title: "Automation Safety",
          content:
            "PowerShell automation should be idempotent, parameterized, and logged. Scripts need ownership and verification checkpoints."
        }
      ],
      interactiveActivities: [
        {
          id: "windows-201-l05-act1",
          type: "sorting_buckets",
          title: "Response Flow Sort",
          description: "Sort support actions into Diagnose, Mitigate, and Verify.",
          buckets: ["Diagnose", "Mitigate", "Verify"],
          items: [
            { text: "Collect relevant event logs", bucket: "Diagnose" },
            { text: "Apply minimal-risk service fix", bucket: "Mitigate" },
            { text: "Confirm user workflow success", bucket: "Verify" },
            { text: "Document root cause and preventive action", bucket: "Verify" }
          ]
        },
        {
          id: "windows-201-l05-act2",
          type: "scenario_practice",
          title: "Recurring Error Drill",
          description: "Resolve repeated endpoint failure and propose one automation improvement.",
          instructions: [
            "Pick one repeatable diagnostic step for scripting.",
            "Define one script safeguard before broad use."
          ]
        }
      ],
      metadata: {
        prompts: [
          "Why should event evidence lead troubleshooting decisions?",
          "What makes PowerShell automation production-safe?",
          "When should escalation happen instead of local remediation?"
        ]
      },
      learningAids: [
        {
          id: "windows-201-l05-a1",
          type: "practice",
          title: "Troubleshooting Runbook",
          content: "Template for symptom, log evidence, intervention, validation, and escalation."
        }
      ]
    },
    {
      id: "windows-201-l06",
      title: "Checkpoint 2: Security and Automation Operations",
      type: "quiz",
      duration: 10,
      questions: [
        {
          id: "windows-201-l06-q1",
          text: "Why should security exceptions always include expiration?",
          skillId: "windows-201-skill-security",
          options: [
            { id: "a", text: "To make exceptions permanent" },
            { id: "b", text: "To force review and prevent hidden long-term risk" },
            { id: "c", text: "To remove accountability" },
            { id: "d", text: "To skip policy documentation" }
          ],
          correctOptionId: "b",
          explanation: "Expiration ensures risk acceptance is revisited and closed."
        },
        {
          id: "windows-201-l06-q2",
          text: "A production-ready script should include:",
          skillId: "windows-201-skill-automation",
          options: [
            { id: "a", text: "Hardcoded credentials" },
            { id: "b", text: "Input validation, logging, and safe rerun behavior" },
            { id: "c", text: "No error handling" },
            { id: "d", text: "Unbounded destructive actions" }
          ],
          correctOptionId: "b",
          explanation: "Safe scripts are controlled, observable, and repeatable."
        },
        {
          id: "windows-201-l06-q3",
          text: "Most valuable first step in recurring endpoint incidents is:",
          skillId: "windows-201-skill-support",
          options: [
            { id: "a", text: "Immediate full reimage" },
            { id: "b", text: "Pattern analysis across logs and affected cohorts" },
            { id: "c", text: "Disable protections broadly" },
            { id: "d", text: "Ignore prior tickets" }
          ],
          correctOptionId: "b",
          explanation: "Pattern evidence improves root-cause quality and prevents churn."
        },
        {
          id: "windows-201-l06-q4",
          text: "Why should support runbooks include explicit verification steps?",
          skillId: "windows-201-skill-support",
          options: [
            { id: "a", text: "To increase ticket volume" },
            { id: "b", text: "To confirm recovery and prevent false closure" },
            { id: "c", text: "To avoid escalation records" },
            { id: "d", text: "To remove user communication" }
          ],
          correctOptionId: "b",
          explanation: "Verification ensures fixes are real and durable."
        }
      ],
      learningAids: [
        {
          id: "windows-201-l06-a1",
          type: "mnemonic",
          title: "EVIDE",
          content: "Events, Validate, Intervene, Document, Escalate."
        }
      ]
    }
  ]
};
