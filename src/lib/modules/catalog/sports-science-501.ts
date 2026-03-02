import type { LearningModule } from "@/lib/modules/types";

export const SportsScience501Module: LearningModule = {
  "id": "sports-science-501",
  "title": "Sports Science Specialization Studio",
  "description": "Post-401 specialization in Sports Science, focused on performance systems modeling, training and recovery design, injury-risk analytics, and athlete welfare governance through advanced casework, simulation, and defense-based checkpoints.",
  "subject": "Health Science",
  "tags": [
    "core",
    "curriculum",
    "interactive",
    "sports-science",
    "specialization"
  ],
  "minAge": 17,
  "maxAge": 99,
  "version": "2.0.0",
  "difficultyBand": "advanced",
  "localeSupport": [
    "en"
  ],
  "learningObjectives": [
    "Apply advanced methods for performance systems modeling in high-constraint environments",
    "Design robust systems for training and recovery design with measurable control gates",
    "Evaluate interventions in injury-risk analytics with research-grade rigor",
    "Operationalize athlete welfare governance with accountable governance and escalation pathways",
    "Lead cross-functional decision reviews with explicit tradeoff communication",
    "Defend recommendations under expert critique using evidence and uncertainty bounds"
  ],
  "lessons": [
    {
      "id": "sports-science-501-l01",
      "title": "Sports Science Advanced Foundations",
      "type": "video",
      "duration": 14,
      "learningAids": [
        {
          "id": "sports-science-501-l01-a1",
          "type": "image",
          "title": "Guided Practice",
          "content": "Use a structured method, make assumptions explicit, and validate recommendations with measurable evidence."
        }
      ],
      "chunks": [
        {
          "id": "sports-science-501-l01-c1",
          "kind": "concept",
          "title": "Scope and Boundary Design",
          "content": "This lesson defines advanced scope boundaries for Sports Science, with focus on performance systems modeling and training and recovery design."
        },
        {
          "id": "sports-science-501-l01-c2",
          "kind": "concept",
          "title": "Causal and Uncertainty Modeling",
          "content": "Learners map causal pathways, uncertainty ranges, and system dependencies before intervention planning."
        },
        {
          "id": "sports-science-501-l01-c3",
          "kind": "recap",
          "title": "Evidence Thresholds",
          "content": "All claims map to measurable indicators, confidence bounds, and review checkpoints."
        }
      ],
      "flashcards": [
        {
          "id": "sports-science-501-l01-f1",
          "front": "performance systems modeling",
          "back": "A specialization axis requiring explicit assumptions and measurable constraints."
        },
        {
          "id": "sports-science-501-l01-f2",
          "front": "training and recovery design",
          "back": "Execution architecture that determines reliability under stress."
        },
        {
          "id": "sports-science-501-l01-f3",
          "front": "injury-risk analytics",
          "back": "Evaluation discipline for identifying true gains and hidden costs."
        }
      ]
    },
    {
      "id": "sports-science-501-l02",
      "title": "Sports Science Specialist Methods Lab",
      "type": "interactive",
      "duration": 17,
      "learningAids": [
        {
          "id": "sports-science-501-l02-a1",
          "type": "practice",
          "title": "Guided Practice",
          "content": "Use a structured method, make assumptions explicit, and validate recommendations with measurable evidence."
        }
      ],
      "chunks": [
        {
          "id": "sports-science-501-l02-c1",
          "kind": "practice",
          "title": "Method Design and Stress Test",
          "content": "Learners design specialist workflows and stress-test them across adverse scenarios."
        },
        {
          "id": "sports-science-501-l02-c2",
          "kind": "recap",
          "title": "Control Gate Architecture",
          "content": "Workflows integrate checkpoints, rollback criteria, and threshold-based escalation."
        }
      ],
      "interactiveActivities": [
        {
          "id": "sports-science-501-l02-act1",
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
      "id": "sports-science-501-l03",
      "title": "Checkpoint 1: Specialist Methods",
      "type": "quiz",
      "duration": 10,
      "learningAids": [
        {
          "id": "sports-science-501-l03-a1",
          "type": "practice",
          "title": "Guided Practice",
          "content": "Use a structured method, make assumptions explicit, and validate recommendations with measurable evidence."
        }
      ],
      "questions": [
        {
          "id": "sports-science-501-l03-q1",
          "text": "Which practice most improves performance systems modeling decision quality?",
          "skillId": "sports-science-501-skill-core",
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
          "id": "sports-science-501-l03-q2",
          "text": "At level 501, strong execution for training and recovery design requires:",
          "skillId": "sports-science-501-skill-execution",
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
          "id": "sports-science-501-l03-q3",
          "text": "A defensible approach to injury-risk analytics includes:",
          "skillId": "sports-science-501-skill-eval",
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
          "id": "sports-science-501-l03-q4",
          "text": "Mature athlete welfare governance systems connect:",
          "skillId": "sports-science-501-skill-governance",
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
          "id": "sports-science-501-l03-q5",
          "text": "What is the best way to compare competing interventions in advanced Health Science?",
          "skillId": "sports-science-501-skill-advanced-5",
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
          "id": "sports-science-501-l03-q6",
          "text": "In high-stakes Sports Science Specialization Studio execution, which communication protocol is strongest?",
          "skillId": "sports-science-501-skill-advanced-6",
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
          "id": "sports-science-501-l03-q7",
          "text": "A mature remediation loop in advanced Health Science should prioritize:",
          "skillId": "sports-science-501-skill-advanced-7",
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
          "id": "sports-science-501-l03-q8",
          "text": "Which portfolio decision rule best balances performance and resilience in Sports Science Specialization Studio?",
          "skillId": "sports-science-501-skill-advanced-8",
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
      "id": "sports-science-501-l04",
      "title": "Sports Science Advanced Case Analysis",
      "type": "video",
      "duration": 14,
      "learningAids": [
        {
          "id": "sports-science-501-l04-a1",
          "type": "mnemonic",
          "title": "Guided Practice",
          "content": "Use a structured method, make assumptions explicit, and validate recommendations with measurable evidence."
        }
      ],
      "chunks": [
        {
          "id": "sports-science-501-l04-c1",
          "kind": "example",
          "title": "Case Context and Stakes",
          "content": "Case focus: a high-performance program aligning competitive goals with recovery science and long-term athlete health. Learners map constraints, risk classes, and governance boundaries."
        },
        {
          "id": "sports-science-501-l04-c2",
          "kind": "concept",
          "title": "Tradeoff Matrix",
          "content": "Alternatives are scored across effectiveness, feasibility, risk, equity, and implementation cost."
        },
        {
          "id": "sports-science-501-l04-c3",
          "kind": "recap",
          "title": "Recovery and Adaptation Design",
          "content": "Failure signatures are mapped to remediation actions and measurable recovery triggers."
        }
      ],
      "flashcards": [
        {
          "id": "sports-science-501-l04-f1",
          "front": "Tradeoff matrix",
          "back": "A structured model for comparing alternatives under competing priorities."
        },
        {
          "id": "sports-science-501-l04-f2",
          "front": "Failure signature",
          "back": "A recurring indicator of a predictable risk class."
        },
        {
          "id": "sports-science-501-l04-f3",
          "front": "Recovery trigger",
          "back": "A measurable threshold that initiates corrective action."
        }
      ]
    },
    {
      "id": "sports-science-501-l05",
      "title": "Sports Science Simulation and Defense Studio",
      "type": "interactive",
      "duration": 17,
      "learningAids": [
        {
          "id": "sports-science-501-l05-a1",
          "type": "practice",
          "title": "Guided Practice",
          "content": "Use a structured method, make assumptions explicit, and validate recommendations with measurable evidence."
        }
      ],
      "chunks": [
        {
          "id": "sports-science-501-l05-c1",
          "kind": "practice",
          "title": "Scenario Simulation",
          "content": "Learners configure interventions, constraints, and escalation logic for high-stakes tests."
        },
        {
          "id": "sports-science-501-l05-c2",
          "kind": "recap",
          "title": "Debrief and Adaptation",
          "content": "Outcomes are reviewed for gains, side effects, and governance compliance gaps."
        }
      ],
      "interactiveActivities": [
        {
          "id": "sports-science-501-l05-act1",
          "type": "scenario_practice",
          "title": "High-Stakes Intervention Simulation",
          "description": "Evaluate intervention options across performance systems modeling and athlete welfare governance priorities.",
          "instructions": [
            "Define objective and boundary conditions first.",
            "Document short- and long-term tradeoffs.",
            "Specify metrics and triggers that validate your recommendation."
          ]
        }
      ]
    },
    {
      "id": "sports-science-501-l06",
      "title": "Checkpoint 2: Research and Governance Decisions",
      "type": "quiz",
      "duration": 10,
      "learningAids": [
        {
          "id": "sports-science-501-l06-a1",
          "type": "practice",
          "title": "Guided Practice",
          "content": "Use a structured method, make assumptions explicit, and validate recommendations with measurable evidence."
        }
      ],
      "questions": [
        {
          "id": "sports-science-501-l06-q1",
          "text": "Which practice most improves performance systems modeling decision quality?",
          "skillId": "sports-science-501-skill-core",
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
          "id": "sports-science-501-l06-q2",
          "text": "At level 501, strong execution for training and recovery design requires:",
          "skillId": "sports-science-501-skill-execution",
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
          "id": "sports-science-501-l06-q3",
          "text": "A defensible approach to injury-risk analytics includes:",
          "skillId": "sports-science-501-skill-eval",
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
          "id": "sports-science-501-l06-q4",
          "text": "Mature athlete welfare governance systems connect:",
          "skillId": "sports-science-501-skill-governance",
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
          "id": "sports-science-501-l06-q5",
          "text": "What is the best way to compare competing interventions in advanced Health Science?",
          "skillId": "sports-science-501-skill-advanced-5",
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
          "id": "sports-science-501-l06-q6",
          "text": "In high-stakes Sports Science Specialization Studio execution, which communication protocol is strongest?",
          "skillId": "sports-science-501-skill-advanced-6",
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
          "id": "sports-science-501-l06-q7",
          "text": "A mature remediation loop in advanced Health Science should prioritize:",
          "skillId": "sports-science-501-skill-advanced-7",
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
          "id": "sports-science-501-l06-q8",
          "text": "Which portfolio decision rule best balances performance and resilience in Sports Science Specialization Studio?",
          "skillId": "sports-science-501-skill-advanced-8",
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
      "id": "sports-science-501-l07",
      "title": "Sports Science Governance and Public Impact",
      "type": "video",
      "duration": 13,
      "learningAids": [
        {
          "id": "sports-science-501-l07-a1",
          "type": "image",
          "title": "Guided Practice",
          "content": "Use a structured method, make assumptions explicit, and validate recommendations with measurable evidence."
        }
      ],
      "chunks": [
        {
          "id": "sports-science-501-l07-c1",
          "kind": "concept",
          "title": "Stakeholder Impact Distribution",
          "content": "Learners map benefits, burdens, and delayed effects across stakeholder groups."
        },
        {
          "id": "sports-science-501-l07-c2",
          "kind": "concept",
          "title": "Accountability Architecture",
          "content": "Decision traceability, review rights, and remediation obligations are integrated."
        },
        {
          "id": "sports-science-501-l07-c3",
          "kind": "recap",
          "title": "Responsible Leadership Checklist",
          "content": "A final checklist links outcomes, ethics, policy compliance, and resilience."
        }
      ],
      "flashcards": [
        {
          "id": "sports-science-501-l07-f1",
          "front": "Impact distribution",
          "back": "How outcomes are allocated across populations and timescales."
        },
        {
          "id": "sports-science-501-l07-f2",
          "front": "Decision traceability",
          "back": "An auditable record of evidence, ownership, and rationale."
        },
        {
          "id": "sports-science-501-l07-f3",
          "front": "Responsible leadership",
          "back": "Decision behavior balancing performance, accountability, and ethics."
        }
      ]
    },
    {
      "id": "sports-science-501-l08",
      "title": "Sports Science Capstone Defense Lab",
      "type": "interactive",
      "duration": 16,
      "learningAids": [
        {
          "id": "sports-science-501-l08-a1",
          "type": "practice",
          "title": "Guided Practice",
          "content": "Use a structured method, make assumptions explicit, and validate recommendations with measurable evidence."
        }
      ],
      "chunks": [
        {
          "id": "sports-science-501-l08-c1",
          "kind": "practice",
          "title": "Defense Brief Assembly",
          "content": "Learners assemble a brief with claims, evidence, uncertainty bounds, and remediation pathways."
        },
        {
          "id": "sports-science-501-l08-c2",
          "kind": "recap",
          "title": "Expert Panel Rehearsal",
          "content": "Learners rehearse responses to technical, governance, and stakeholder critiques."
        }
      ],
      "interactiveActivities": [
        {
          "id": "sports-science-501-l08-act1",
          "type": "debate_simulator",
          "title": "Expert Defense Panel",
          "description": "Defend specialization recommendations under adversarial cross-examination."
        }
      ]
    }
  ]
};
