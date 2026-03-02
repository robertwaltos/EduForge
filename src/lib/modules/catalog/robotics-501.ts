import type { LearningModule } from "@/lib/modules/types";

export const Robotics501Module: LearningModule = {
  "id": "robotics-501",
  "title": "Robotics Specialization Studio",
  "description": "Post-401 specialization in Robotics, focused on robotics systems diagnostics, robotics operations and execution design, robotics impact and tradeoff analysis, and robotics governance and leadership through advanced casework, simulation, and defense-based checkpoints.",
  "subject": "Robotics",
  "tags": [
    "core",
    "curriculum",
    "interactive",
    "robotics",
    "specialization"
  ],
  "minAge": 17,
  "maxAge": 99,
  "version": "2.0.0",
  "difficultyBand": "advanced",
  "localeSupport": [
    "en",
    "es"
  ],
  "learningObjectives": [
    "Apply advanced methods for robotics systems diagnostics in high-constraint environments",
    "Design robust systems for robotics operations and execution design with measurable control gates",
    "Evaluate interventions in robotics impact and tradeoff analysis with research-grade rigor",
    "Operationalize robotics governance and leadership with accountable governance and escalation pathways",
    "Lead cross-functional decision reviews with explicit tradeoff communication",
    "Defend recommendations under expert critique using evidence and uncertainty bounds"
  ],
  "lessons": [
    {
      "id": "robotics-501-l01",
      "title": "Robotics Advanced Foundations",
      "type": "video",
      "duration": 14,
      "learningAids": [
        {
          "id": "robotics-501-l01-a1",
          "type": "image",
          "title": "Guided Practice",
          "content": "Use a structured method, make assumptions explicit, and validate recommendations with measurable evidence."
        }
      ],
      "chunks": [
        {
          "id": "robotics-501-l01-c1",
          "kind": "concept",
          "title": "Scope and Boundary Design",
          "content": "This lesson defines advanced scope boundaries for Robotics, with focus on robotics systems diagnostics and robotics operations and execution design."
        },
        {
          "id": "robotics-501-l01-c2",
          "kind": "concept",
          "title": "Causal and Uncertainty Modeling",
          "content": "Learners map causal pathways, uncertainty ranges, and system dependencies before intervention planning."
        },
        {
          "id": "robotics-501-l01-c3",
          "kind": "recap",
          "title": "Evidence Thresholds",
          "content": "All claims map to measurable indicators, confidence bounds, and review checkpoints."
        }
      ],
      "flashcards": [
        {
          "id": "robotics-501-l01-f1",
          "front": "robotics systems diagnostics",
          "back": "A specialization axis requiring explicit assumptions and measurable constraints."
        },
        {
          "id": "robotics-501-l01-f2",
          "front": "robotics operations and execution design",
          "back": "Execution architecture that determines reliability under stress."
        },
        {
          "id": "robotics-501-l01-f3",
          "front": "robotics impact and tradeoff analysis",
          "back": "Evaluation discipline for identifying true gains and hidden costs."
        }
      ]
    },
    {
      "id": "robotics-501-l02",
      "title": "Robotics Specialist Methods Lab",
      "type": "interactive",
      "duration": 17,
      "learningAids": [
        {
          "id": "robotics-501-l02-a1",
          "type": "practice",
          "title": "Guided Practice",
          "content": "Use a structured method, make assumptions explicit, and validate recommendations with measurable evidence."
        }
      ],
      "chunks": [
        {
          "id": "robotics-501-l02-c1",
          "kind": "practice",
          "title": "Method Design and Stress Test",
          "content": "Learners design specialist workflows and stress-test them across adverse scenarios."
        },
        {
          "id": "robotics-501-l02-c2",
          "kind": "recap",
          "title": "Control Gate Architecture",
          "content": "Workflows integrate checkpoints, rollback criteria, and threshold-based escalation."
        }
      ],
      "interactiveActivities": [
        {
          "id": "robotics-501-l02-act1",
          "type": "matching_pairs",
          "title": "Control-to-Outcome Mapping",
          "description": "Match specialist controls with their strongest reliability and governance effects.",
          "pairs": [
            {
              "left": "Pre-commit gate",
              "right": "Prevents avoidable downstream failures"
            },
            {
              "left": "Rollback trigger",
              "right": "Limits blast radius under adverse outcomes"
            },
            {
              "left": "Baseline dashboard",
              "right": "Supports defensible impact attribution"
            },
            {
              "left": "Retrospective loop",
              "right": "Improves next-cycle decision quality"
            }
          ]
        }
      ]
    },
    {
      "id": "robotics-501-l03",
      "title": "Checkpoint 1: Specialist Methods",
      "type": "quiz",
      "duration": 10,
      "learningAids": [
        {
          "id": "robotics-501-l03-a1",
          "type": "practice",
          "title": "Guided Practice",
          "content": "Use a structured method, make assumptions explicit, and validate recommendations with measurable evidence."
        }
      ],
      "questions": [
        {
          "id": "robotics-501-l03-q1",
          "text": "Which practice most improves robotics systems diagnostics decision quality?",
          "skillId": "robotics-501-skill-core",
          "options": [
            {
              "id": "a",
              "text": "Proceed without baseline or assumptions"
            },
            {
              "id": "b",
              "text": "Define assumptions, constraints, and measurable indicators"
            },
            {
              "id": "c",
              "text": "Optimize only for speed in every context"
            },
            {
              "id": "d",
              "text": "Ignore uncertainty and edge conditions"
            }
          ],
          "correctOptionId": "b",
          "explanation": "Advanced decisions improve when assumptions, constraints, and metrics are explicit."
        },
        {
          "id": "robotics-501-l03-q2",
          "text": "At level 501, strong execution for robotics operations and execution design requires:",
          "skillId": "robotics-501-skill-execution",
          "options": [
            {
              "id": "a",
              "text": "Owner mapping, checkpoint cadence, and escalation thresholds"
            },
            {
              "id": "b",
              "text": "No role clarity and ad-hoc process changes"
            },
            {
              "id": "c",
              "text": "No retrospective or post-run review"
            },
            {
              "id": "d",
              "text": "No rollback or fallback conditions"
            }
          ],
          "correctOptionId": "a",
          "explanation": "Reliable advanced execution needs ownership clarity and threshold-driven governance."
        },
        {
          "id": "robotics-501-l03-q3",
          "text": "A defensible approach to robotics impact and tradeoff analysis includes:",
          "skillId": "robotics-501-skill-eval",
          "options": [
            {
              "id": "a",
              "text": "Anecdotes without comparison"
            },
            {
              "id": "b",
              "text": "Baseline comparisons, side-effect analysis, and uncertainty bounds"
            },
            {
              "id": "c",
              "text": "Changing success criteria after outcomes"
            },
            {
              "id": "d",
              "text": "Excluding difficult scenarios from analysis"
            }
          ],
          "correctOptionId": "b",
          "explanation": "Defensible analysis combines comparative baselines, side-effect checks, and uncertainty disclosure."
        },
        {
          "id": "robotics-501-l03-q4",
          "text": "Mature governance systems connect:",
          "skillId": "robotics-501-skill-governance",
          "options": [
            {
              "id": "a",
              "text": "Policy intent, measurable controls, and remediation pathways"
            },
            {
              "id": "b",
              "text": "Policy language with no measurable enforcement"
            },
            {
              "id": "c",
              "text": "Targets without ownership or escalation design"
            },
            {
              "id": "d",
              "text": "Operations without transparent accountability"
            }
          ],
          "correctOptionId": "a",
          "explanation": "Governance maturity is the operational link between intent, measurement, and corrective action."
        },
        {
          "id": "robotics-501-l03-q5",
          "text": "What is the best way to compare competing interventions in advanced Robotics?",
          "skillId": "robotics-501-skill-advanced-5",
          "options": [
            {
              "id": "a",
              "text": "Choose the option with the most persuasive narrative"
            },
            {
              "id": "b",
              "text": "Score alternatives against shared metrics, side effects, and uncertainty bounds"
            },
            {
              "id": "c",
              "text": "Switch metrics after results arrive"
            },
            {
              "id": "d",
              "text": "Prioritize whichever option has the shortest memo"
            }
          ],
          "correctOptionId": "b",
          "explanation": "Defensible comparisons require shared metrics, side-effect accounting, and uncertainty disclosure."
        },
        {
          "id": "robotics-501-l03-q6",
          "text": "In high-stakes Robotics Specialization Studio execution, which communication protocol is strongest?",
          "skillId": "robotics-501-skill-advanced-6",
          "options": [
            {
              "id": "a",
              "text": "Broadcast conclusions without assumptions"
            },
            {
              "id": "b",
              "text": "Publish assumptions, confidence ranges, and decision checkpoints to stakeholders"
            },
            {
              "id": "c",
              "text": "Share only final outcomes after completion"
            },
            {
              "id": "d",
              "text": "Limit updates to a single informal channel"
            }
          ],
          "correctOptionId": "b",
          "explanation": "High-stakes communication must expose assumptions, confidence, and checkpoints."
        },
        {
          "id": "robotics-501-l03-q7",
          "text": "A mature remediation loop in advanced Robotics should prioritize:",
          "skillId": "robotics-501-skill-advanced-7",
          "options": [
            {
              "id": "a",
              "text": "Blame assignment without system updates"
            },
            {
              "id": "b",
              "text": "Root-cause analysis, control redesign, and measurable follow-up verification"
            },
            {
              "id": "c",
              "text": "One-time fixes without retesting"
            },
            {
              "id": "d",
              "text": "Issue closure based on elapsed time"
            }
          ],
          "correctOptionId": "b",
          "explanation": "Mature remediation ties root causes to control redesign and verification."
        },
        {
          "id": "robotics-501-l03-q8",
          "text": "Which portfolio decision rule best balances performance and resilience in Robotics Specialization Studio?",
          "skillId": "robotics-501-skill-advanced-8",
          "options": [
            {
              "id": "a",
              "text": "Maximize short-term gains regardless of concentration risk"
            },
            {
              "id": "b",
              "text": "Optimize for expected value while enforcing risk limits and contingency capacity"
            },
            {
              "id": "c",
              "text": "Ignore correlated failure modes"
            },
            {
              "id": "d",
              "text": "Commit all resources to one irreversible pathway"
            }
          ],
          "correctOptionId": "b",
          "explanation": "Balanced portfolios combine value optimization with explicit risk limits and contingency options."
        }
      ]
    },
    {
      "id": "robotics-501-l04",
      "title": "Robotics Advanced Case Analysis",
      "type": "video",
      "duration": 14,
      "learningAids": [
        {
          "id": "robotics-501-l04-a1",
          "type": "image",
          "title": "Guided Practice",
          "content": "Use a structured method, make assumptions explicit, and validate recommendations with measurable evidence."
        }
      ],
      "chunks": [
        {
          "id": "robotics-501-l04-c1",
          "kind": "concept",
          "title": "Scenario Architecture",
          "content": "The case frames competing constraints in robotics systems diagnostics and robotics impact and tradeoff analysis."
        },
        {
          "id": "robotics-501-l04-c2",
          "kind": "practice",
          "title": "Tradeoff Framing",
          "content": "Learners compare options across safety, reliability, cost, equity, and governance dimensions."
        },
        {
          "id": "robotics-501-l04-c3",
          "kind": "recap",
          "title": "Decision Memo Pattern",
          "content": "Each recommendation includes assumptions, evidence, risk controls, and fallback plans."
        }
      ]
    },
    {
      "id": "robotics-501-l05",
      "title": "Robotics Simulation Clinic",
      "type": "interactive",
      "duration": 18,
      "learningAids": [
        {
          "id": "robotics-501-l05-a1",
          "type": "practice",
          "title": "Guided Practice",
          "content": "Use a structured method, make assumptions explicit, and validate recommendations with measurable evidence."
        }
      ],
      "chunks": [
        {
          "id": "robotics-501-l05-c1",
          "kind": "practice",
          "title": "Live Scenario Controls",
          "content": "Learners operate scenario controls while balancing performance and governance constraints."
        },
        {
          "id": "robotics-501-l05-c2",
          "kind": "recap",
          "title": "Adaptive Response Design",
          "content": "Effective responses update control gates without losing traceability or accountability."
        }
      ],
      "interactiveActivities": [
        {
          "id": "robotics-501-l05-act1",
          "type": "scenario",
          "title": "Adverse-Condition Decision Run",
          "description": "Run a high-pressure robotics scenario and tune controls under uncertainty."
        }
      ]
    },
    {
      "id": "robotics-501-l06",
      "title": "Checkpoint 2: Case and Simulation Mastery",
      "type": "quiz",
      "duration": 11,
      "learningAids": [
        {
          "id": "robotics-501-l06-a1",
          "type": "practice",
          "title": "Guided Practice",
          "content": "Use a structured method, make assumptions explicit, and validate recommendations with measurable evidence."
        }
      ],
      "questions": [
        {
          "id": "robotics-501-l06-q1",
          "text": "In advanced casework, the first requirement for defensible recommendations is:",
          "skillId": "robotics-501-skill-case1",
          "options": [
            {
              "id": "a",
              "text": "A preferred option without explicit assumptions"
            },
            {
              "id": "b",
              "text": "A clear baseline, explicit constraints, and success criteria"
            },
            {
              "id": "c",
              "text": "High confidence without evidence logs"
            },
            {
              "id": "d",
              "text": "Single-metric optimization only"
            }
          ],
          "correctOptionId": "b",
          "explanation": "Defensible recommendations begin with explicit assumptions, constraints, and measurable targets."
        },
        {
          "id": "robotics-501-l06-q2",
          "text": "A resilient strategy for robotics operations and execution design should include:",
          "skillId": "robotics-501-skill-case2",
          "options": [
            {
              "id": "a",
              "text": "Checkpointed execution with fallback and escalation criteria"
            },
            {
              "id": "b",
              "text": "One-way execution with no rollback capability"
            },
            {
              "id": "c",
              "text": "No ownership mapping across teams"
            },
            {
              "id": "d",
              "text": "Hidden assumptions and undocumented decisions"
            }
          ],
          "correctOptionId": "a",
          "explanation": "Resilience depends on checkpoints, fallback options, and explicit escalation design."
        },
        {
          "id": "robotics-501-l06-q3",
          "text": "When evaluating robotics impact and tradeoff analysis, which method is most rigorous?",
          "skillId": "robotics-501-skill-case3",
          "options": [
            {
              "id": "a",
              "text": "Single success story without controls"
            },
            {
              "id": "b",
              "text": "Comparative baselines plus side-effect and uncertainty analysis"
            },
            {
              "id": "c",
              "text": "Outcome-only narrative without process evidence"
            },
            {
              "id": "d",
              "text": "Retrospective scope changes to fit outcomes"
            }
          ],
          "correctOptionId": "b",
          "explanation": "Rigorous evaluation requires comparisons, side-effect analysis, and uncertainty disclosure."
        },
        {
          "id": "robotics-501-l06-q4",
          "text": "Advanced governance is strongest when it:",
          "skillId": "robotics-501-skill-case4",
          "options": [
            {
              "id": "a",
              "text": "Aligns authority, measurement, and remediation obligations"
            },
            {
              "id": "b",
              "text": "Separates policy from operational controls"
            },
            {
              "id": "c",
              "text": "Avoids external review and transparency"
            },
            {
              "id": "d",
              "text": "Treats accountability as optional under pressure"
            }
          ],
          "correctOptionId": "a",
          "explanation": "Mature governance links authority, measurable controls, and corrective action."
        },
        {
          "id": "robotics-501-l06-q5",
          "text": "What is the best way to compare competing interventions in advanced Robotics?",
          "skillId": "robotics-501-skill-advanced-5",
          "options": [
            {
              "id": "a",
              "text": "Choose the option with the most persuasive narrative"
            },
            {
              "id": "b",
              "text": "Score alternatives against shared metrics, side effects, and uncertainty bounds"
            },
            {
              "id": "c",
              "text": "Switch metrics after results arrive"
            },
            {
              "id": "d",
              "text": "Prioritize whichever option has the shortest memo"
            }
          ],
          "correctOptionId": "b",
          "explanation": "Defensible comparisons require shared metrics, side-effect accounting, and uncertainty disclosure."
        },
        {
          "id": "robotics-501-l06-q6",
          "text": "In high-stakes Robotics Specialization Studio execution, which communication protocol is strongest?",
          "skillId": "robotics-501-skill-advanced-6",
          "options": [
            {
              "id": "a",
              "text": "Broadcast conclusions without assumptions"
            },
            {
              "id": "b",
              "text": "Publish assumptions, confidence ranges, and decision checkpoints to stakeholders"
            },
            {
              "id": "c",
              "text": "Share only final outcomes after completion"
            },
            {
              "id": "d",
              "text": "Limit updates to a single informal channel"
            }
          ],
          "correctOptionId": "b",
          "explanation": "High-stakes communication must expose assumptions, confidence, and checkpoints."
        },
        {
          "id": "robotics-501-l06-q7",
          "text": "A mature remediation loop in advanced Robotics should prioritize:",
          "skillId": "robotics-501-skill-advanced-7",
          "options": [
            {
              "id": "a",
              "text": "Blame assignment without system updates"
            },
            {
              "id": "b",
              "text": "Root-cause analysis, control redesign, and measurable follow-up verification"
            },
            {
              "id": "c",
              "text": "One-time fixes without retesting"
            },
            {
              "id": "d",
              "text": "Issue closure based on elapsed time"
            }
          ],
          "correctOptionId": "b",
          "explanation": "Mature remediation ties root causes to control redesign and verification."
        },
        {
          "id": "robotics-501-l06-q8",
          "text": "Which portfolio decision rule best balances performance and resilience in Robotics Specialization Studio?",
          "skillId": "robotics-501-skill-advanced-8",
          "options": [
            {
              "id": "a",
              "text": "Maximize short-term gains regardless of concentration risk"
            },
            {
              "id": "b",
              "text": "Optimize for expected value while enforcing risk limits and contingency capacity"
            },
            {
              "id": "c",
              "text": "Ignore correlated failure modes"
            },
            {
              "id": "d",
              "text": "Commit all resources to one irreversible pathway"
            }
          ],
          "correctOptionId": "b",
          "explanation": "Balanced portfolios combine value optimization with explicit risk limits and contingency options."
        }
      ]
    },
    {
      "id": "robotics-501-l07",
      "title": "Robotics Governance and Public Impact",
      "type": "video",
      "duration": 13,
      "learningAids": [
        {
          "id": "robotics-501-l07-a1",
          "type": "image",
          "title": "Guided Practice",
          "content": "Use a structured method, make assumptions explicit, and validate recommendations with measurable evidence."
        }
      ],
      "chunks": [
        {
          "id": "robotics-501-l07-c1",
          "kind": "concept",
          "title": "Stakeholder Impact Distribution",
          "content": "Learners map benefits, burdens, and delayed effects across stakeholder groups."
        },
        {
          "id": "robotics-501-l07-c2",
          "kind": "concept",
          "title": "Accountability Architecture",
          "content": "Decision traceability, review rights, and remediation obligations are integrated."
        },
        {
          "id": "robotics-501-l07-c3",
          "kind": "recap",
          "title": "Responsible Leadership Checklist",
          "content": "A final checklist links outcomes, ethics, policy compliance, and resilience."
        }
      ],
      "flashcards": [
        {
          "id": "robotics-501-l07-f1",
          "front": "Impact distribution",
          "back": "How outcomes are allocated across populations and timescales."
        },
        {
          "id": "robotics-501-l07-f2",
          "front": "Decision traceability",
          "back": "An auditable record of evidence, ownership, and rationale."
        },
        {
          "id": "robotics-501-l07-f3",
          "front": "Responsible leadership",
          "back": "Decision behavior balancing performance, accountability, and ethics."
        }
      ]
    },
    {
      "id": "robotics-501-l08",
      "title": "Robotics Capstone Defense Lab",
      "type": "interactive",
      "duration": 16,
      "learningAids": [
        {
          "id": "robotics-501-l08-a1",
          "type": "practice",
          "title": "Guided Practice",
          "content": "Use a structured method, make assumptions explicit, and validate recommendations with measurable evidence."
        }
      ],
      "chunks": [
        {
          "id": "robotics-501-l08-c1",
          "kind": "practice",
          "title": "Defense Brief Assembly",
          "content": "Learners assemble a brief with claims, evidence, uncertainty bounds, and remediation pathways."
        },
        {
          "id": "robotics-501-l08-c2",
          "kind": "recap",
          "title": "Expert Panel Rehearsal",
          "content": "Learners rehearse responses to technical, governance, and stakeholder critiques."
        }
      ],
      "interactiveActivities": [
        {
          "id": "robotics-501-l08-act1",
          "type": "debate_simulator",
          "title": "Expert Defense Panel",
          "description": "Defend specialization recommendations under adversarial cross-examination."
        }
      ]
    }
  ]
};
