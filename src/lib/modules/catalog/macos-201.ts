import type { LearningModule } from "@/lib/modules/types";

export const Macos201Module: LearningModule = {
  id: "macos-201",
  title: "macOS Administration and Automation II",
  description:
    "Intermediate macOS operations curriculum on account governance, device hardening, software lifecycle, automation workflows, and support-ready troubleshooting.",
  subject: "Operating Systems",
  tags: ["core", "curriculum", "interactive", "technology", "operating-systems", "macos"],
  minAge: 13,
  maxAge: 99,
  version: "2.0.0",
  difficultyBand: "intermediate",
  localeSupport: ["en"],
  thumbnail: "/placeholders/lesson-robot.svg",
  learningObjectives: [
    "Manage macOS accounts, permissions, and privilege boundaries safely",
    "Apply software update and package deployment workflows with rollback awareness",
    "Configure device security controls including FileVault, Gatekeeper, and privacy permissions",
    "Use system logs and activity tools for evidence-based troubleshooting",
    "Automate repetitive support tasks using Terminal and scripting basics",
    "Document support runbooks with clear escalation and recovery steps"
  ],
  lessons: [
    {
      id: "macos-201-l01",
      title: "Account Governance and Privilege Management",
      type: "video",
      duration: 13,
      chunks: [
        {
          id: "macos-201-l01-c1",
          kind: "concept",
          title: "Identity and Role Boundaries",
          content:
            "Reliable macOS administration starts with clear role boundaries: standard users for daily work, elevated rights only for approved tasks, and auditable administrative access paths."
        },
        {
          id: "macos-201-l01-c2",
          kind: "concept",
          title: "Credential and Session Hygiene",
          content:
            "Strong operational posture includes secure authentication settings, lock policies, password lifecycle controls, and rapid removal of stale privileged access."
        },
        {
          id: "macos-201-l01-c3",
          kind: "recap",
          title: "Least Privilege on macOS",
          content:
            "Least privilege reduces accidental misconfiguration and security exposure. Standardize elevation process and retain evidence for each privileged intervention."
        }
      ],
      flashcards: [
        {
          id: "macos-201-l01-f1",
          front: "Least privilege",
          back: "Access principle granting only minimum permissions needed for a task."
        },
        {
          id: "macos-201-l01-f2",
          front: "Elevation workflow",
          back: "Controlled process for temporary administrative action and approval."
        },
        {
          id: "macos-201-l01-f3",
          front: "Session hygiene",
          back: "Practices that reduce risk from unattended or overprivileged sessions."
        }
      ],
      learningAids: [
        {
          id: "macos-201-l01-a1",
          type: "image",
          title: "Access Governance Map",
          content: "Diagram mapping user roles, admin tasks, approvals, and audit points."
        }
      ]
    },
    {
      id: "macos-201-l02",
      title: "Software Lifecycle and Managed Deployment Lab",
      type: "interactive",
      duration: 15,
      chunks: [
        {
          id: "macos-201-l02-c1",
          kind: "concept",
          title: "Update Channels and Risk",
          content:
            "macOS software lifecycle management should distinguish security urgency, compatibility testing, and user-impact windows. Staged rollout reduces outage risk."
        },
        {
          id: "macos-201-l02-c2",
          kind: "practice",
          title: "Deployment Control Points",
          content:
            "Controlled deployment includes pilot rings, health checks, rollback triggers, and communication plans. Treat package changes as governed operations events."
        }
      ],
      interactiveActivities: [
        {
          id: "macos-201-l02-act1",
          type: "matching_pairs",
          title: "Deployment Control Match",
          description: "Match deployment controls to the risk they reduce.",
          pairs: [
            { left: "Pilot ring rollout", right: "Limits impact during early validation" },
            { left: "Compatibility test matrix", right: "Detects app and OS conflicts before broad push" },
            { left: "Rollback criterion", right: "Defines when deployment must be reverted" },
            { left: "Maintenance communication", right: "Reduces user confusion and support surge" }
          ]
        },
        {
          id: "macos-201-l02-act2",
          type: "scenario_practice",
          title: "Patch Window Exercise",
          description: "Plan a high-priority patch deployment with limited support capacity.",
          instructions: [
            "Choose first cohort and explain why.",
            "Define one abort threshold for the rollout."
          ]
        }
      ],
      metadata: {
        prompts: [
          "What makes a software update strategy trustworthy for users?",
          "How do you choose pilot cohort composition?",
          "Which signals should pause rollout immediately?"
        ]
      },
      learningAids: [
        {
          id: "macos-201-l02-a1",
          type: "practice",
          title: "Deployment Runbook",
          content: "Template for scope, test evidence, rollout rings, rollback triggers, and owner."
        }
      ]
    },
    {
      id: "macos-201-l03",
      title: "Checkpoint 1: Access and Software Operations",
      type: "quiz",
      duration: 10,
      questions: [
        {
          id: "macos-201-l03-q1",
          text: "Why should administrative privileges be limited on managed macOS devices?",
          skillId: "macos-201-skill-access",
          options: [
            { id: "a", text: "To increase troubleshooting time" },
            { id: "b", text: "To reduce misconfiguration and security blast radius" },
            { id: "c", text: "To prevent all software installs permanently" },
            { id: "d", text: "To remove accountability" }
          ],
          correctOptionId: "b",
          explanation: "Scoped admin rights reduce risk and improve auditability."
        },
        {
          id: "macos-201-l03-q2",
          text: "Best reason to stage software rollout in rings is:",
          skillId: "macos-201-skill-deploy",
          options: [
            { id: "a", text: "To maximize early blast radius" },
            { id: "b", text: "To detect regressions before broad user impact" },
            { id: "c", text: "To skip compatibility checks" },
            { id: "d", text: "To avoid communication plans" }
          ],
          correctOptionId: "b",
          explanation: "Ring deployment enables controlled validation."
        },
        {
          id: "macos-201-l03-q3",
          text: "A strong elevation workflow should include:",
          skillId: "macos-201-skill-access",
          options: [
            { id: "a", text: "Shared admin credentials" },
            { id: "b", text: "Approval, time-bounded access, and logging" },
            { id: "c", text: "No session controls" },
            { id: "d", text: "Permanent privilege after first request" }
          ],
          correctOptionId: "b",
          explanation: "Time-bounded, auditable elevation supports safety and traceability."
        },
        {
          id: "macos-201-l03-q4",
          text: "Most important deployment safety artifact is:",
          skillId: "macos-201-skill-deploy",
          options: [
            { id: "a", text: "A release message without rollback plan" },
            { id: "b", text: "A rollback criterion tied to measurable health signals" },
            { id: "c", text: "A screenshot of installer progress" },
            { id: "d", text: "A private note with no owner" }
          ],
          correctOptionId: "b",
          explanation: "Measurable rollback gates protect users when updates misbehave."
        }
      ],
      learningAids: [
        {
          id: "macos-201-l03-a1",
          type: "mnemonic",
          title: "ROLE",
          content: "Rights, Oversight, Logs, Expiry."
        }
      ]
    },
    {
      id: "macos-201-l04",
      title: "Security Controls: FileVault, Gatekeeper, and Privacy",
      type: "video",
      duration: 13,
      chunks: [
        {
          id: "macos-201-l04-c1",
          kind: "concept",
          title: "Device Encryption and Startup Security",
          content:
            "FileVault protects data at rest and should be operationalized with key escrow and recovery workflows. Encryption policy is only effective when recovery operations are tested."
        },
        {
          id: "macos-201-l04-c2",
          kind: "concept",
          title: "Application Trust and Execution Policy",
          content:
            "Gatekeeper and notarization workflows reduce untrusted executable risk. Exceptions should be rare, justified, and tracked with owner and expiry."
        },
        {
          id: "macos-201-l04-c3",
          kind: "recap",
          title: "Privacy Permission Governance",
          content:
            "Camera, microphone, automation, and full-disk access permissions should be reviewed regularly to prevent excessive data exposure."
        }
      ],
      flashcards: [
        {
          id: "macos-201-l04-f1",
          front: "FileVault",
          back: "Full-disk encryption mechanism for protecting data at rest on macOS."
        },
        {
          id: "macos-201-l04-f2",
          front: "Gatekeeper",
          back: "Execution policy control that helps block untrusted software."
        },
        {
          id: "macos-201-l04-f3",
          front: "Permission governance",
          back: "Process for reviewing and limiting sensitive app permissions."
        }
      ],
      learningAids: [
        {
          id: "macos-201-l04-a1",
          type: "image",
          title: "macOS Security Baseline",
          content: "Reference matrix of encryption, execution policy, and privacy controls."
        }
      ]
    },
    {
      id: "macos-201-l05",
      title: "Troubleshooting and Automation Workflow Lab",
      type: "interactive",
      duration: 15,
      chunks: [
        {
          id: "macos-201-l05-c1",
          kind: "practice",
          title: "Evidence-First Support",
          content:
            "Effective support avoids guesswork by correlating logs, user symptoms, and system state before remediation."
        },
        {
          id: "macos-201-l05-c2",
          kind: "recap",
          title: "Automation Safety",
          content:
            "Automation scripts should be idempotent, observable, and scoped. Scheduled maintenance tasks require ownership and failure alerts."
        }
      ],
      interactiveActivities: [
        {
          id: "macos-201-l05-act1",
          type: "sorting_buckets",
          title: "Support Flow Sort",
          description: "Sort response actions into Diagnose, Remediate, and Verify.",
          buckets: ["Diagnose", "Remediate", "Verify"],
          items: [
            { text: "Collect relevant system and app logs", bucket: "Diagnose" },
            { text: "Apply minimal-risk configuration fix", bucket: "Remediate" },
            { text: "Confirm user workflow succeeds post-fix", bucket: "Verify" },
            { text: "Record root cause and prevention action", bucket: "Verify" }
          ]
        },
        {
          id: "macos-201-l05-act2",
          type: "scenario_practice",
          title: "Recurring Ticket Drill",
          description: "Resolve a repeating issue and define one automation improvement.",
          instructions: [
            "Identify one repeatable step suitable for scripting.",
            "Define one safeguard before automating at scale."
          ]
        }
      ],
      metadata: {
        prompts: [
          "Why should support runbooks include verification checkpoints?",
          "What makes a troubleshooting script safe for reuse?",
          "When should a ticket be escalated instead of patched locally?"
        ]
      },
      learningAids: [
        {
          id: "macos-201-l05-a1",
          type: "practice",
          title: "Support Runbook Template",
          content: "Template for symptom, evidence, fix, verification, and prevention notes."
        }
      ]
    },
    {
      id: "macos-201-l06",
      title: "Checkpoint 2: Security and Support Operations",
      type: "quiz",
      duration: 10,
      questions: [
        {
          id: "macos-201-l06-q1",
          text: "Why is key escrow important when FileVault is enforced?",
          skillId: "macos-201-skill-security",
          options: [
            { id: "a", text: "To disable encryption quickly" },
            { id: "b", text: "To ensure recoverability if user credentials are unavailable" },
            { id: "c", text: "To bypass authentication permanently" },
            { id: "d", text: "To avoid backup strategy" }
          ],
          correctOptionId: "b",
          explanation: "Encryption policy must include reliable recovery operations."
        },
        {
          id: "macos-201-l06-q2",
          text: "Best practice for Gatekeeper exceptions is:",
          skillId: "macos-201-skill-security",
          options: [
            { id: "a", text: "Allow all unsigned software" },
            { id: "b", text: "Use documented, time-bounded exceptions with owner approval" },
            { id: "c", text: "Disable execution controls globally" },
            { id: "d", text: "Skip exception logs" }
          ],
          correctOptionId: "b",
          explanation: "Controlled exceptions reduce long-term trust exposure."
        },
        {
          id: "macos-201-l06-q3",
          text: "A dependable support automation workflow requires:",
          skillId: "macos-201-skill-automation",
          options: [
            { id: "a", text: "No testing before rollout" },
            { id: "b", text: "Idempotent actions, logging, and rollback path" },
            { id: "c", text: "Hardcoded admin credentials" },
            { id: "d", text: "No ownership assignments" }
          ],
          correctOptionId: "b",
          explanation: "Safe automation is repeatable, observable, and reversible."
        },
        {
          id: "macos-201-l06-q4",
          text: "Most useful first step in recurring support incidents is:",
          skillId: "macos-201-skill-support",
          options: [
            { id: "a", text: "Immediate broad reimage without evidence" },
            { id: "b", text: "Pattern analysis across logs, timing, and affected cohorts" },
            { id: "c", text: "Ignore user reports" },
            { id: "d", text: "Disable all security controls" }
          ],
          correctOptionId: "b",
          explanation: "Pattern evidence helps isolate common root causes."
        }
      ],
      learningAids: [
        {
          id: "macos-201-l06-a1",
          type: "mnemonic",
          title: "SCOPE",
          content: "Signal, Correlate, Operate, Prove, Escalate."
        }
      ]
    }
  ]
};
