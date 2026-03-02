import type { LearningModule } from "@/lib/modules/types";

export const Hvac601Module: LearningModule = {
  "id": "hvac-601",
  "title": "Hvac Research and Leadership",
  "description": "Post-401 specialization in Hvac, focused on hvac systems diagnostics, hvac operations and execution design, hvac impact and tradeoff analysis, and hvac governance and leadership through advanced casework, simulation, and defense-based checkpoints.",
  "subject": "HVAC",
  "tags": [
    "core",
    "curriculum",
    "interactive",
    "hvac",
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
    "Apply advanced methods for hvac systems diagnostics in high-constraint environments",
    "Design robust systems for hvac operations and execution design with measurable control gates",
    "Evaluate interventions in hvac impact and tradeoff analysis with research-grade rigor",
    "Operationalize hvac governance and leadership with accountable governance and escalation pathways",
    "Lead cross-functional decision reviews with explicit tradeoff communication",
    "Defend recommendations under expert critique using evidence and uncertainty bounds"
  ],
  "lessons": [
    {
      "id": "hvac-601-l01",
      "title": "Hvac Advanced Foundations",
      "type": "video",
      "duration": 14,
      "learningAids": [
        {
          "id": "hvac-601-l01-a1",
          "type": "image",
          "title": "Guided Practice",
          "content": "Use a structured method, make assumptions explicit, and validate recommendations with measurable evidence."
        }
      ],
      "chunks": [
        {
          "id": "hvac-601-l01-c1",
          "kind": "concept",
          "title": "Scope and Boundary Design",
          "content": "This lesson defines advanced scope boundaries for Hvac, with focus on hvac systems diagnostics and hvac operations and execution design."
        },
        {
          "id": "hvac-601-l01-c2",
          "kind": "concept",
          "title": "Causal and Uncertainty Modeling",
          "content": "Learners map causal pathways, uncertainty ranges, and system dependencies before intervention planning."
        },
        {
          "id": "hvac-601-l01-c3",
          "kind": "recap",
          "title": "Evidence Thresholds",
          "content": "All claims map to measurable indicators, confidence bounds, and review checkpoints."
        }
      ],
      "flashcards": [
        {
          "id": "hvac-601-l01-f1",
          "front": "hvac systems diagnostics",
          "back": "A specialization axis requiring explicit assumptions and measurable constraints."
        },
        {
          "id": "hvac-601-l01-f2",
          "front": "hvac operations and execution design",
          "back": "Execution architecture that determines reliability under stress."
        },
        {
          "id": "hvac-601-l01-f3",
          "front": "hvac impact and tradeoff analysis",
          "back": "Evaluation discipline for identifying true gains and hidden costs."
        }
      ]
    },
    {
      "id": "hvac-601-l02",
      "title": "Hvac Specialist Methods Lab",
      "type": "interactive",
      "duration": 17,
      "learningAids": [
        {
          "id": "hvac-601-l02-a1",
          "type": "practice",
          "title": "Guided Practice",
          "content": "Use a structured method, make assumptions explicit, and validate recommendations with measurable evidence."
        }
      ],
      "chunks": [
        {
          "id": "hvac-601-l02-c1",
          "kind": "practice",
          "title": "Method Design and Stress Test",
          "content": "Learners design specialist workflows and stress-test them across adverse scenarios."
        },
        {
          "id": "hvac-601-l02-c2",
          "kind": "recap",
          "title": "Control Gate Architecture",
          "content": "Workflows integrate checkpoints, rollback criteria, and threshold-based escalation."
        }
      ],
      "interactiveActivities": [
        {
          "id": "hvac-601-l02-act1",
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
      "id": "hvac-601-l03",
      "title": "Checkpoint 1: Specialist Methods",
      "type": "quiz",
      "duration": 10,
      "learningAids": [
        {
          "id": "hvac-601-l03-a1",
          "type": "practice",
          "title": "Guided Practice",
          "content": "Use a structured method, make assumptions explicit, and validate recommendations with measurable evidence."
        }
      ],
      "questions": [
        {
          "id": "hvac-601-l03-q1",
          "text": "Which practice most improves hvac systems diagnostics decision quality?",
          "skillId": "hvac-601-skill-core",
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
          "id": "hvac-601-l03-q2",
          "text": "At level 601, strong execution for hvac operations and execution design requires:",
          "skillId": "hvac-601-skill-execution",
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
          "id": "hvac-601-l03-q3",
          "text": "A defensible approach to hvac impact and tradeoff analysis includes:",
          "skillId": "hvac-601-skill-eval",
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
          "id": "hvac-601-l03-q4",
          "text": "Mature governance systems connect:",
          "skillId": "hvac-601-skill-governance",
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
          "id": "hvac-601-l03-q5",
          "text": "What is the best way to compare competing interventions in advanced HVAC?",
          "skillId": "hvac-601-skill-advanced-5",
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
          "id": "hvac-601-l03-q6",
          "text": "In high-stakes Hvac Research and Leadership execution, which communication protocol is strongest?",
          "skillId": "hvac-601-skill-advanced-6",
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
          "id": "hvac-601-l03-q7",
          "text": "A mature remediation loop in advanced HVAC should prioritize:",
          "skillId": "hvac-601-skill-advanced-7",
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
          "id": "hvac-601-l03-q8",
          "text": "Which portfolio decision rule best balances performance and resilience in Hvac Research and Leadership?",
          "skillId": "hvac-601-skill-advanced-8",
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
      "id": "hvac-601-l04",
      "title": "Hvac Advanced Case Analysis",
      "type": "video",
      "duration": 14,
      "learningAids": [
        {
          "id": "hvac-601-l04-a1",
          "type": "image",
          "title": "Guided Practice",
          "content": "Use a structured method, make assumptions explicit, and validate recommendations with measurable evidence."
        }
      ],
      "chunks": [
        {
          "id": "hvac-601-l04-c1",
          "kind": "concept",
          "title": "Scenario Architecture",
          "content": "The case frames competing constraints in hvac systems diagnostics and hvac impact and tradeoff analysis."
        },
        {
          "id": "hvac-601-l04-c2",
          "kind": "practice",
          "title": "Tradeoff Framing",
          "content": "Learners compare options across safety, reliability, cost, equity, and governance dimensions."
        },
        {
          "id": "hvac-601-l04-c3",
          "kind": "recap",
          "title": "Decision Memo Pattern",
          "content": "Each recommendation includes assumptions, evidence, risk controls, and fallback plans."
        }
      ]
    },
    {
      "id": "hvac-601-l05",
      "title": "Hvac Simulation Clinic",
      "type": "interactive",
      "duration": 18,
      "learningAids": [
        {
          "id": "hvac-601-l05-a1",
          "type": "practice",
          "title": "Guided Practice",
          "content": "Use a structured method, make assumptions explicit, and validate recommendations with measurable evidence."
        }
      ],
      "chunks": [
        {
          "id": "hvac-601-l05-c1",
          "kind": "practice",
          "title": "Live Scenario Controls",
          "content": "Learners operate scenario controls while balancing performance and governance constraints."
        },
        {
          "id": "hvac-601-l05-c2",
          "kind": "recap",
          "title": "Adaptive Response Design",
          "content": "Effective responses update control gates without losing traceability or accountability."
        }
      ],
      "interactiveActivities": [
        {
          "id": "hvac-601-l05-act1",
          "type": "scenario",
          "title": "Adverse-Condition Decision Run",
          "description": "Run a high-pressure hvac scenario and tune controls under uncertainty."
        }
      ]
    },
    {
      "id": "hvac-601-l06",
      "title": "Checkpoint 2: Case and Simulation Mastery",
      "type": "quiz",
      "duration": 11,
      "learningAids": [
        {
          "id": "hvac-601-l06-a1",
          "type": "practice",
          "title": "Guided Practice",
          "content": "Use a structured method, make assumptions explicit, and validate recommendations with measurable evidence."
        }
      ],
      "questions": [
        {
          "id": "hvac-601-l06-q1",
          "text": "In advanced casework, the first requirement for defensible recommendations is:",
          "skillId": "hvac-601-skill-case1",
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
          "id": "hvac-601-l06-q2",
          "text": "A resilient strategy for hvac operations and execution design should include:",
          "skillId": "hvac-601-skill-case2",
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
          "id": "hvac-601-l06-q3",
          "text": "When evaluating hvac impact and tradeoff analysis, which method is most rigorous?",
          "skillId": "hvac-601-skill-case3",
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
          "id": "hvac-601-l06-q4",
          "text": "Advanced governance is strongest when it:",
          "skillId": "hvac-601-skill-case4",
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
          "id": "hvac-601-l06-q5",
          "text": "What is the best way to compare competing interventions in advanced HVAC?",
          "skillId": "hvac-601-skill-advanced-5",
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
          "id": "hvac-601-l06-q6",
          "text": "In high-stakes Hvac Research and Leadership execution, which communication protocol is strongest?",
          "skillId": "hvac-601-skill-advanced-6",
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
          "id": "hvac-601-l06-q7",
          "text": "A mature remediation loop in advanced HVAC should prioritize:",
          "skillId": "hvac-601-skill-advanced-7",
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
          "id": "hvac-601-l06-q8",
          "text": "Which portfolio decision rule best balances performance and resilience in Hvac Research and Leadership?",
          "skillId": "hvac-601-skill-advanced-8",
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
      "id": "hvac-601-l07",
      "title": "Hvac Governance and Public Impact",
      "type": "video",
      "duration": 13,
      "learningAids": [
        {
          "id": "hvac-601-l07-a1",
          "type": "image",
          "title": "Guided Practice",
          "content": "Use a structured method, make assumptions explicit, and validate recommendations with measurable evidence."
        }
      ],
      "chunks": [
        {
          "id": "hvac-601-l07-c1",
          "kind": "concept",
          "title": "Stakeholder Impact Distribution",
          "content": "Learners map benefits, burdens, and delayed effects across stakeholder groups."
        },
        {
          "id": "hvac-601-l07-c2",
          "kind": "concept",
          "title": "Accountability Architecture",
          "content": "Decision traceability, review rights, and remediation obligations are integrated."
        },
        {
          "id": "hvac-601-l07-c3",
          "kind": "recap",
          "title": "Responsible Leadership Checklist",
          "content": "A final checklist links outcomes, ethics, policy compliance, and resilience."
        }
      ],
      "flashcards": [
        {
          "id": "hvac-601-l07-f1",
          "front": "Impact distribution",
          "back": "How outcomes are allocated across populations and timescales."
        },
        {
          "id": "hvac-601-l07-f2",
          "front": "Decision traceability",
          "back": "An auditable record of evidence, ownership, and rationale."
        },
        {
          "id": "hvac-601-l07-f3",
          "front": "Responsible leadership",
          "back": "Decision behavior balancing performance, accountability, and ethics."
        }
      ]
    },
    {
      "id": "hvac-601-l08",
      "title": "Hvac Capstone Defense Lab",
      "type": "interactive",
      "duration": 16,
      "learningAids": [
        {
          "id": "hvac-601-l08-a1",
          "type": "practice",
          "title": "Guided Practice",
          "content": "Use a structured method, make assumptions explicit, and validate recommendations with measurable evidence."
        }
      ],
      "chunks": [
        {
          "id": "hvac-601-l08-c1",
          "kind": "practice",
          "title": "Defense Brief Assembly",
          "content": "Learners assemble a brief with claims, evidence, uncertainty bounds, and remediation pathways."
        },
        {
          "id": "hvac-601-l08-c2",
          "kind": "recap",
          "title": "Expert Panel Rehearsal",
          "content": "Learners rehearse responses to technical, governance, and stakeholder critiques."
        }
      ],
      "interactiveActivities": [
        {
          "id": "hvac-601-l08-act1",
          "type": "debate_simulator",
          "title": "Expert Defense Panel",
          "description": "Defend specialization recommendations under adversarial cross-examination."
        }
      ]
    }
  ]
};
