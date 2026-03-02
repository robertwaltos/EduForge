import type { LearningModule } from "@/lib/modules/types";

export const Linux201Module: LearningModule = {
  id: "linux-201",
  title: "Linux Administration and Automation II",
  description:
    "Intermediate Linux operations curriculum on package lifecycle, identity and access control, service management, storage operations, logging, and practical automation.",
  subject: "Operating Systems",
  tags: ["core", "curriculum", "interactive", "technology", "operating-systems", "linux"],
  minAge: 13,
  maxAge: 99,
  version: "2.0.0",
  difficultyBand: "intermediate",
  localeSupport: ["en"],
  thumbnail: "/placeholders/lesson-robot.svg",
  learningObjectives: [
    "Manage software lifecycle with distribution package tools and repository hygiene",
    "Apply least-privilege user and group administration with safe sudo practices",
    "Operate Linux services with systemd, journald, and startup policy controls",
    "Administer storage, mounts, and backup patterns for resilient operations",
    "Use shell scripting and scheduled jobs for repeatable maintenance tasks",
    "Diagnose and recover from common Linux operational incidents"
  ],
  lessons: [
    {
      id: "linux-201-l01",
      title: "Package Management and Repository Operations",
      type: "video",
      duration: 13,
      chunks: [
        {
          id: "linux-201-l01-c1",
          kind: "concept",
          title: "Package Ecosystem Models",
          content:
            "Linux distributions package software differently, but core lifecycle concepts are shared: trusted repositories, metadata refresh, dependency resolution, version pinning, and controlled updates. Operators should know whether their host uses apt, dnf, or another tool and how those tools represent installed, candidate, and held versions."
        },
        {
          id: "linux-201-l01-c2",
          kind: "concept",
          title: "Update Strategy and Risk",
          content:
            "Blindly updating everything can break production workloads. Strong operations practice includes staging updates, reviewing changelogs, validating service compatibility, and using rollback plans or snapshots when available. Security patch urgency must be balanced with service stability and maintenance windows."
        },
        {
          id: "linux-201-l01-c3",
          kind: "recap",
          title: "Repository Hygiene",
          content:
            "Repository trust is part of system security. Keep repository sources explicit, avoid unknown third-party channels, and verify signing practices. Clean package caches and remove unused dependencies to reduce drift and potential attack surface."
        }
      ],
      flashcards: [
        {
          id: "linux-201-l01-f1",
          front: "Dependency resolution",
          back: "Process of selecting compatible supporting packages required by a target installation."
        },
        {
          id: "linux-201-l01-f2",
          front: "Version pinning",
          back: "Holding software to an approved version to avoid unplanned upgrades."
        },
        {
          id: "linux-201-l01-f3",
          front: "Repository trust",
          back: "Confidence that package sources are authentic, signed, and maintained."
        }
      ],
      learningAids: [
        {
          id: "linux-201-l01-a1",
          type: "image",
          title: "Package Lifecycle Map",
          content: "Diagram of install, upgrade, hold, rollback, and cleanup workflows."
        }
      ]
    },
    {
      id: "linux-201-l02",
      title: "Users, Groups, Sudo, and Access Control Lab",
      type: "interactive",
      duration: 15,
      chunks: [
        {
          id: "linux-201-l02-c1",
          kind: "concept",
          title: "Identity Model",
          content:
            "Linux authorization relies on users, groups, file ownership, and permission bits. Administrative safety improves when access is granted by role via groups instead of direct user-by-user exceptions."
        },
        {
          id: "linux-201-l02-c2",
          kind: "practice",
          title: "Privilege Boundaries",
          content:
            "Sudo policies should be narrow, auditable, and task-focused. Avoid full unrestricted sudo where possible; use command-scoped privileges and separate service accounts for automation."
        }
      ],
      interactiveActivities: [
        {
          id: "linux-201-l02-act1",
          type: "matching_pairs",
          title: "Access Model Match",
          description: "Match access control concept to its operational purpose.",
          pairs: [
            { left: "Primary group", right: "Baseline collaboration and file ownership context" },
            { left: "sudoers rule", right: "Controlled privilege elevation for approved commands" },
            { left: "service account", right: "Non-human identity for predictable automation" },
            { left: "least privilege", right: "Minimum required access to reduce blast radius" }
          ]
        },
        {
          id: "linux-201-l02-act2",
          type: "scenario_practice",
          title: "Privilege Review Drill",
          description: "Review a risky access request and define a safer policy.",
          instructions: [
            "Choose one scoped permission set instead of full admin.",
            "State one logging control to monitor privileged use."
          ]
        }
      ],
      metadata: {
        prompts: [
          "What is the downside of granting broad sudo rights to all developers?",
          "When should a dedicated service account be created?",
          "How do group-based permissions simplify audits?"
        ]
      },
      learningAids: [
        {
          id: "linux-201-l02-a1",
          type: "practice",
          title: "Access Review Checklist",
          content: "Checklist for role, scope, logging, expiration, and approval evidence."
        }
      ]
    },
    {
      id: "linux-201-l03",
      title: "Checkpoint 1: Package and Access Operations",
      type: "quiz",
      duration: 10,
      questions: [
        {
          id: "linux-201-l03-q1",
          text: "Why use staged updates in Linux operations?",
          skillId: "linux-201-skill-packages",
          options: [
            { id: "a", text: "To reduce visibility into changes" },
            { id: "b", text: "To detect regressions before broad production impact" },
            { id: "c", text: "To avoid documenting updates" },
            { id: "d", text: "To disable security patches" }
          ],
          correctOptionId: "b",
          explanation: "Staging catches compatibility issues with lower blast radius."
        },
        {
          id: "linux-201-l03-q2",
          text: "Best principle for assigning sudo permissions is:",
          skillId: "linux-201-skill-access",
          options: [
            { id: "a", text: "Grant full root to all power users" },
            { id: "b", text: "Use least privilege with command-scoped elevation" },
            { id: "c", text: "Avoid all privilege logging" },
            { id: "d", text: "Store shared root password in chat" }
          ],
          correctOptionId: "b",
          explanation: "Scoped privilege and auditability reduce operational and security risk."
        },
        {
          id: "linux-201-l03-q3",
          text: "A key reason to avoid untrusted repositories is:",
          skillId: "linux-201-skill-packages",
          options: [
            { id: "a", text: "They improve deterministic builds" },
            { id: "b", text: "They may introduce unsigned or compromised packages" },
            { id: "c", text: "They always use fewer dependencies" },
            { id: "d", text: "They remove need for patching" }
          ],
          correctOptionId: "b",
          explanation: "Repository trust directly affects host integrity and supply-chain exposure."
        },
        {
          id: "linux-201-l03-q4",
          text: "Why prefer group-based access over per-user permission sprawl?",
          skillId: "linux-201-skill-access",
          options: [
            { id: "a", text: "It makes audits and role changes easier to manage" },
            { id: "b", text: "It removes the need for ownership" },
            { id: "c", text: "It bypasses file permission checks" },
            { id: "d", text: "It guarantees no mistakes" }
          ],
          correctOptionId: "a",
          explanation: "Group-centered policy scales better and simplifies governance."
        }
      ],
      learningAids: [
        {
          id: "linux-201-l03-a1",
          type: "mnemonic",
          title: "SAFE",
          content: "Source trust, Access scope, Fix windows, Evidence logs."
        }
      ]
    },
    {
      id: "linux-201-l04",
      title: "Storage, Mounts, and Backup Reliability",
      type: "video",
      duration: 13,
      chunks: [
        {
          id: "linux-201-l04-c1",
          kind: "concept",
          title: "Filesystem and Mount Strategy",
          content:
            "Reliable Linux operations require understanding partitioning, filesystem options, and persistent mount configuration. Operators should distinguish temporary mounts from boot-time definitions and validate mount behavior after restart."
        },
        {
          id: "linux-201-l04-c2",
          kind: "concept",
          title: "Capacity and Failure Signals",
          content:
            "Storage incidents often begin with small warning signs: inode exhaustion, slow IO latency, and unchecked log growth. Track both space and inode headroom and set thresholds before write failures impact services."
        },
        {
          id: "linux-201-l04-c3",
          kind: "recap",
          title: "Backup and Restore Thinking",
          content:
            "Backups are only trustworthy when restore procedures are tested. Define recovery point objective and recovery time objective, then verify that tooling and retention policy meet those requirements."
        }
      ],
      flashcards: [
        {
          id: "linux-201-l04-f1",
          front: "RPO",
          back: "Maximum acceptable data loss window measured in time."
        },
        {
          id: "linux-201-l04-f2",
          front: "RTO",
          back: "Maximum acceptable service restoration time after failure."
        },
        {
          id: "linux-201-l04-f3",
          front: "Inode exhaustion",
          back: "Condition where file metadata entries run out before disk space does."
        }
      ],
      learningAids: [
        {
          id: "linux-201-l04-a1",
          type: "image",
          title: "Storage Health Dashboard",
          content: "Sample dashboard for space, inodes, latency, and backup freshness."
        }
      ]
    },
    {
      id: "linux-201-l05",
      title: "Service Operations, Logging, and Scheduled Automation",
      type: "interactive",
      duration: 15,
      chunks: [
        {
          id: "linux-201-l05-c1",
          kind: "practice",
          title: "Service Lifecycle",
          content:
            "Service reliability depends on predictable startup policy, restart behavior, and log visibility. Use systemd units and journal analysis as a single operational loop for incident triage."
        },
        {
          id: "linux-201-l05-c2",
          kind: "recap",
          title: "Automation Quality",
          content:
            "Automation should be idempotent, logged, and safe to rerun. Scheduled tasks need ownership, monitoring, and failure notification to avoid silent drift."
        }
      ],
      interactiveActivities: [
        {
          id: "linux-201-l05-act1",
          type: "sorting_buckets",
          title: "Task Ownership Sort",
          description: "Sort operations tasks by execution model.",
          buckets: ["On-demand", "Scheduled", "Event-driven"],
          items: [
            { text: "Weekly log rotation validation", bucket: "Scheduled" },
            { text: "Manual service restart during maintenance", bucket: "On-demand" },
            { text: "Alert-triggered disk cleanup playbook", bucket: "Event-driven" },
            { text: "Nightly backup integrity check", bucket: "Scheduled" }
          ]
        },
        {
          id: "linux-201-l05-act2",
          type: "scenario_practice",
          title: "Failed Job Response",
          description: "Respond to a failed scheduled task with structured diagnosis.",
          instructions: [
            "Identify the first log source to inspect.",
            "Define one preventive control for repeat failure."
          ]
        }
      ],
      metadata: {
        prompts: [
          "How do you ensure scheduled jobs remain visible and auditable?",
          "What makes an automation script safe to rerun?",
          "When should a service be configured to auto-restart?"
        ]
      },
      learningAids: [
        {
          id: "linux-201-l05-a1",
          type: "practice",
          title: "Automation Runbook",
          content: "Template for trigger, command flow, log path, rollback, and owner."
        }
      ]
    },
    {
      id: "linux-201-l06",
      title: "Checkpoint 2: Services, Storage, and Recovery",
      type: "quiz",
      duration: 10,
      questions: [
        {
          id: "linux-201-l06-q1",
          text: "Why test restore workflows instead of only checking backup completion logs?",
          skillId: "linux-201-skill-recovery",
          options: [
            { id: "a", text: "Completion logs prove full recoverability" },
            { id: "b", text: "Only restore tests validate data integrity and recovery speed" },
            { id: "c", text: "Restore tests are never needed" },
            { id: "d", text: "Restore tests replace all monitoring" }
          ],
          correctOptionId: "b",
          explanation: "A successful backup job can still produce unusable restore artifacts."
        },
        {
          id: "linux-201-l06-q2",
          text: "A robust scheduled automation practice requires:",
          skillId: "linux-201-skill-automation",
          options: [
            { id: "a", text: "No ownership or alerting" },
            { id: "b", text: "Owner assignment, log visibility, and failure notification" },
            { id: "c", text: "Hidden scripts without documentation" },
            { id: "d", text: "Manual execution only" }
          ],
          correctOptionId: "b",
          explanation: "Visibility and accountability are required for reliable automation."
        },
        {
          id: "linux-201-l06-q3",
          text: "Which indicator most directly signals metadata pressure despite free disk space?",
          skillId: "linux-201-skill-storage",
          options: [
            { id: "a", text: "Inode exhaustion" },
            { id: "b", text: "CPU utilization" },
            { id: "c", text: "Timezone mismatch" },
            { id: "d", text: "Swap disable" }
          ],
          correctOptionId: "a",
          explanation: "Hosts can fail file writes when inode count reaches zero."
        },
        {
          id: "linux-201-l06-q4",
          text: "Most useful first step in service incident triage is:",
          skillId: "linux-201-skill-service",
          options: [
            { id: "a", text: "Restart repeatedly without checking evidence" },
            { id: "b", text: "Inspect recent unit and journal events for failure signatures" },
            { id: "c", text: "Delete logs immediately" },
            { id: "d", text: "Disable the service permanently" }
          ],
          correctOptionId: "b",
          explanation: "Evidence-first triage speeds root-cause isolation and safe remediation."
        }
      ],
      learningAids: [
        {
          id: "linux-201-l06-a1",
          type: "mnemonic",
          title: "CARE",
          content: "Check logs, Assess risk, Recover service, Evaluate prevention."
        }
      ]
    }
  ]
};
