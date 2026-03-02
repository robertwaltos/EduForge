import type { LearningModule } from "@/lib/modules/types";

export const Geoscience601Module: LearningModule = {
  "id": "geoscience-601",
  "title": "Geoscience Research and Leadership",
  "description": "Post-401 specialization module in Geoscience, focused on earth system diagnostics, hazard forecasting design, resource-risk tradeoff analysis, and stewardship governance with case simulation and defense-oriented assessment.",
  "subject": "Earth Science",
  "tags": [
    "core",
    "curriculum",
    "interactive",
    "geoscience",
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
    "Apply advanced methods for earth system diagnostics in high-constraint environments",
    "Design robust execution systems for hazard forecasting design",
    "Evaluate interventions in resource-risk tradeoff analysis with research-grade evidence standards",
    "Operationalize stewardship governance with transparent accountability loops",
    "Lead cross-functional review processes with explicit tradeoff reasoning",
    "Defend capstone recommendations under expert critique"
  ],
  "lessons": [
    {
      "id": "geoscience-601-l01",
      "title": "Geoscience Advanced Foundations",
      "type": "video",
      "duration": 14,
      "learningAids": [
        {
          "id": "geoscience-601-l01-a1",
          "type": "image",
          "title": "Guided Practice",
          "content": "Use a structured approach, document assumptions, and verify outcomes with measurable criteria."
        }
      ],
      "chunks": [
        {
          "id": "geoscience-601-l01-c1",
          "kind": "concept",
          "title": "Scope and Decision Boundaries",
          "content": "This lesson defines advanced boundaries for Geoscience, including control points for earth system diagnostics and hazard forecasting design."
        },
        {
          "id": "geoscience-601-l01-c2",
          "kind": "concept",
          "title": "Causal and Uncertainty Structure",
          "content": "Learners map causal pathways and uncertainty ranges before intervention planning."
        },
        {
          "id": "geoscience-601-l01-c3",
          "kind": "recap",
          "title": "Evidence Thresholds",
          "content": "Claims are tied to measurable indicators, uncertainty declarations, and review checkpoints."
        }
      ],
      "flashcards": [
        {
          "id": "geoscience-601-l01-f1",
          "front": "earth system diagnostics",
          "back": "A specialization axis requiring explicit constraints and measurable assumptions."
        },
        {
          "id": "geoscience-601-l01-f2",
          "front": "hazard forecasting design",
          "back": "Execution architecture that determines repeatability under stress."
        },
        {
          "id": "geoscience-601-l01-f3",
          "front": "resource-risk tradeoff analysis",
          "back": "Evaluation discipline for determining true impact and side effects."
        }
      ]
    },
    {
      "id": "geoscience-601-l02",
      "title": "Geoscience Specialist Methods Lab",
      "type": "interactive",
      "duration": 17,
      "learningAids": [
        {
          "id": "geoscience-601-l02-a1",
          "type": "practice",
          "title": "Guided Practice",
          "content": "Use a structured approach, document assumptions, and verify outcomes with measurable criteria."
        }
      ],
      "chunks": [
        {
          "id": "geoscience-601-l02-c1",
          "kind": "practice",
          "title": "Method Design and Stress Test",
          "content": "Learners design specialist workflows and stress-test them against adversarial conditions."
        },
        {
          "id": "geoscience-601-l02-c2",
          "kind": "recap",
          "title": "Control Gate Design",
          "content": "Gate criteria, rollback conditions, and escalation thresholds are integrated into the workflow."
        }
      ],
      "interactiveActivities": [
        {
          "id": "geoscience-601-l02-act1",
          "type": "matching_pairs",
          "title": "Control-to-Outcome Mapping",
          "description": "Match specialist controls with their strongest system effect.",
          "pairs": [
            {
              "left": "Pre-commit gate",
              "right": "Prevents avoidable downstream failures"
            },
            {
              "left": "Rollback trigger",
              "right": "Limits impact under adverse outcomes"
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
      "id": "geoscience-601-l03",
      "title": "Checkpoint 1: Specialist Methods",
      "type": "quiz",
      "duration": 10,
      "learningAids": [
        {
          "id": "geoscience-601-l03-a1",
          "type": "practice",
          "title": "Guided Practice",
          "content": "Use a structured approach, document assumptions, and verify outcomes with measurable criteria."
        }
      ],
      "questions": [
        {
          "id": "geoscience-601-l03-q1",
          "text": "Which practice most improves earth system diagnostics decision quality?",
          "skillId": "geoscience-601-skill-core",
          "options": [
            {
              "id": "a",
              "text": "Proceed without baselines or constraints"
            },
            {
              "id": "b",
              "text": "Define assumptions, stress-test scenarios, and monitor indicators"
            },
            {
              "id": "c",
              "text": "Ignore edge conditions"
            },
            {
              "id": "d",
              "text": "Prioritize speed over evidence always"
            }
          ],
          "correctOptionId": "b",
          "explanation": "Advanced decisions require explicit assumptions and stress-tested measurement discipline."
        },
        {
          "id": "geoscience-601-l03-q2",
          "text": "At level 601, high-quality execution for hazard forecasting design requires:",
          "skillId": "geoscience-601-skill-execution",
          "options": [
            {
              "id": "a",
              "text": "Owner mapping, checkpoints, and threshold-based escalation"
            },
            {
              "id": "b",
              "text": "No role clarity and ad-hoc approvals"
            },
            {
              "id": "c",
              "text": "No retrospective cycle"
            },
            {
              "id": "d",
              "text": "Untracked process variation"
            }
          ],
          "correctOptionId": "a",
          "explanation": "Reliable advanced execution depends on clear ownership and threshold-driven control points."
        },
        {
          "id": "geoscience-601-l03-q3",
          "text": "A defensible approach to resource-risk tradeoff analysis includes:",
          "skillId": "geoscience-601-skill-eval",
          "options": [
            {
              "id": "a",
              "text": "Anecdotal claims without comparison"
            },
            {
              "id": "b",
              "text": "Baseline comparison, side-effect analysis, and uncertainty bounds"
            },
            {
              "id": "c",
              "text": "Changing criteria after outcomes are known"
            },
            {
              "id": "d",
              "text": "Excluding difficult cases"
            }
          ],
          "correctOptionId": "b",
          "explanation": "Defensible analysis requires comparison, side-effect checks, and explicit uncertainty reporting."
        },
        {
          "id": "geoscience-601-l03-q4",
          "text": "Mature stewardship governance systems connect:",
          "skillId": "geoscience-601-skill-governance",
          "options": [
            {
              "id": "a",
              "text": "Policy intent, measurable controls, and remediation pathways"
            },
            {
              "id": "b",
              "text": "Policy language without enforcement"
            },
            {
              "id": "c",
              "text": "Targets without ownership"
            },
            {
              "id": "d",
              "text": "Operations without accountability logs"
            }
          ],
          "correctOptionId": "a",
          "explanation": "Governance maturity is the linkage between policy, measurement, and corrective execution."
        },
        {
          "id": "geoscience-601-l03-q5",
          "text": "What is the best way to compare competing interventions in advanced Earth Science?",
          "skillId": "geoscience-601-skill-advanced-5",
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
          "id": "geoscience-601-l03-q6",
          "text": "In high-stakes Geoscience Research and Leadership execution, which communication protocol is strongest?",
          "skillId": "geoscience-601-skill-advanced-6",
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
          "id": "geoscience-601-l03-q7",
          "text": "A mature remediation loop in advanced Earth Science should prioritize:",
          "skillId": "geoscience-601-skill-advanced-7",
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
          "id": "geoscience-601-l03-q8",
          "text": "Which portfolio decision rule best balances performance and resilience in Geoscience Research and Leadership?",
          "skillId": "geoscience-601-skill-advanced-8",
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
      "id": "geoscience-601-l04",
      "title": "Geoscience Advanced Case Analysis",
      "type": "video",
      "duration": 14,
      "learningAids": [
        {
          "id": "geoscience-601-l04-a1",
          "type": "mnemonic",
          "title": "Guided Practice",
          "content": "Use a structured approach, document assumptions, and verify outcomes with measurable criteria."
        }
      ],
      "chunks": [
        {
          "id": "geoscience-601-l04-c1",
          "kind": "example",
          "title": "Case Context",
          "content": "Case focus: a regional geoscience board coordinating seismic, flood, and groundwater risk responses. Learners identify constraints, risks, and governance boundaries."
        },
        {
          "id": "geoscience-601-l04-c2",
          "kind": "concept",
          "title": "Tradeoff Matrix",
          "content": "Options are evaluated across performance, reliability, equity, and feasibility dimensions."
        },
        {
          "id": "geoscience-601-l04-c3",
          "kind": "recap",
          "title": "Failure and Recovery Design",
          "content": "Failure signatures are mapped to mitigation actions and measurable recovery triggers."
        }
      ],
      "flashcards": [
        {
          "id": "geoscience-601-l04-f1",
          "front": "Tradeoff matrix",
          "back": "A structured scoring model for competing decision pathways."
        },
        {
          "id": "geoscience-601-l04-f2",
          "front": "Failure signature",
          "back": "A recurring indicator of a known risk class."
        },
        {
          "id": "geoscience-601-l04-f3",
          "front": "Recovery trigger",
          "back": "A measurable threshold that initiates corrective action."
        }
      ]
    },
    {
      "id": "geoscience-601-l05",
      "title": "Geoscience Simulation and Defense Studio",
      "type": "interactive",
      "duration": 17,
      "learningAids": [
        {
          "id": "geoscience-601-l05-a1",
          "type": "practice",
          "title": "Guided Practice",
          "content": "Use a structured approach, document assumptions, and verify outcomes with measurable criteria."
        }
      ],
      "chunks": [
        {
          "id": "geoscience-601-l05-c1",
          "kind": "practice",
          "title": "Simulation Setup",
          "content": "Learners configure scenarios, constraints, metrics, and escalation logic for intervention tests."
        },
        {
          "id": "geoscience-601-l05-c2",
          "kind": "recap",
          "title": "Debrief and Adaptation",
          "content": "Simulation outcomes are reviewed for gains, side effects, and governance compliance."
        }
      ],
      "interactiveActivities": [
        {
          "id": "geoscience-601-l05-act1",
          "type": "scenario_practice",
          "title": "High-Stakes Intervention Simulation",
          "description": "Evaluate intervention options across earth system diagnostics and stewardship governance priorities.",
          "instructions": [
            "Define objective and boundary conditions first.",
            "Record near-term and long-term tradeoffs.",
            "Specify metrics and triggers that validate your recommended path."
          ]
        }
      ]
    },
    {
      "id": "geoscience-601-l06",
      "title": "Checkpoint 2: Research and Governance Decisions",
      "type": "quiz",
      "duration": 10,
      "learningAids": [
        {
          "id": "geoscience-601-l06-a1",
          "type": "practice",
          "title": "Guided Practice",
          "content": "Use a structured approach, document assumptions, and verify outcomes with measurable criteria."
        }
      ],
      "questions": [
        {
          "id": "geoscience-601-l06-q1",
          "text": "Which practice most improves earth system diagnostics decision quality?",
          "skillId": "geoscience-601-skill-core",
          "options": [
            {
              "id": "a",
              "text": "Proceed without baselines or constraints"
            },
            {
              "id": "b",
              "text": "Define assumptions, stress-test scenarios, and monitor indicators"
            },
            {
              "id": "c",
              "text": "Ignore edge conditions"
            },
            {
              "id": "d",
              "text": "Prioritize speed over evidence always"
            }
          ],
          "correctOptionId": "b",
          "explanation": "Advanced decisions require explicit assumptions and stress-tested measurement discipline."
        },
        {
          "id": "geoscience-601-l06-q2",
          "text": "At level 601, high-quality execution for hazard forecasting design requires:",
          "skillId": "geoscience-601-skill-execution",
          "options": [
            {
              "id": "a",
              "text": "Owner mapping, checkpoints, and threshold-based escalation"
            },
            {
              "id": "b",
              "text": "No role clarity and ad-hoc approvals"
            },
            {
              "id": "c",
              "text": "No retrospective cycle"
            },
            {
              "id": "d",
              "text": "Untracked process variation"
            }
          ],
          "correctOptionId": "a",
          "explanation": "Reliable advanced execution depends on clear ownership and threshold-driven control points."
        },
        {
          "id": "geoscience-601-l06-q3",
          "text": "A defensible approach to resource-risk tradeoff analysis includes:",
          "skillId": "geoscience-601-skill-eval",
          "options": [
            {
              "id": "a",
              "text": "Anecdotal claims without comparison"
            },
            {
              "id": "b",
              "text": "Baseline comparison, side-effect analysis, and uncertainty bounds"
            },
            {
              "id": "c",
              "text": "Changing criteria after outcomes are known"
            },
            {
              "id": "d",
              "text": "Excluding difficult cases"
            }
          ],
          "correctOptionId": "b",
          "explanation": "Defensible analysis requires comparison, side-effect checks, and explicit uncertainty reporting."
        },
        {
          "id": "geoscience-601-l06-q4",
          "text": "Mature stewardship governance systems connect:",
          "skillId": "geoscience-601-skill-governance",
          "options": [
            {
              "id": "a",
              "text": "Policy intent, measurable controls, and remediation pathways"
            },
            {
              "id": "b",
              "text": "Policy language without enforcement"
            },
            {
              "id": "c",
              "text": "Targets without ownership"
            },
            {
              "id": "d",
              "text": "Operations without accountability logs"
            }
          ],
          "correctOptionId": "a",
          "explanation": "Governance maturity is the linkage between policy, measurement, and corrective execution."
        },
        {
          "id": "geoscience-601-l06-q5",
          "text": "What is the best way to compare competing interventions in advanced Earth Science?",
          "skillId": "geoscience-601-skill-advanced-5",
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
          "id": "geoscience-601-l06-q6",
          "text": "In high-stakes Geoscience Research and Leadership execution, which communication protocol is strongest?",
          "skillId": "geoscience-601-skill-advanced-6",
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
          "id": "geoscience-601-l06-q7",
          "text": "A mature remediation loop in advanced Earth Science should prioritize:",
          "skillId": "geoscience-601-skill-advanced-7",
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
          "id": "geoscience-601-l06-q8",
          "text": "Which portfolio decision rule best balances performance and resilience in Geoscience Research and Leadership?",
          "skillId": "geoscience-601-skill-advanced-8",
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
      "id": "geoscience-601-l07",
      "title": "Geoscience Governance and Public Impact",
      "type": "video",
      "duration": 13,
      "learningAids": [
        {
          "id": "geoscience-601-l07-a1",
          "type": "image",
          "title": "Guided Practice",
          "content": "Use a structured approach, document assumptions, and verify outcomes with measurable criteria."
        }
      ],
      "chunks": [
        {
          "id": "geoscience-601-l07-c1",
          "kind": "concept",
          "title": "Stakeholder Impact Distribution",
          "content": "Learners map benefit and burden distribution across stakeholders and time horizons."
        },
        {
          "id": "geoscience-601-l07-c2",
          "kind": "concept",
          "title": "Accountability Architecture",
          "content": "Decision traceability, review rights, and remediation obligations are integrated into governance design."
        },
        {
          "id": "geoscience-601-l07-c3",
          "kind": "recap",
          "title": "Responsible Leadership Checklist",
          "content": "A final checklist links technical outcomes, policy compliance, ethics, and resilience."
        }
      ],
      "flashcards": [
        {
          "id": "geoscience-601-l07-f1",
          "front": "Impact distribution",
          "back": "How outcomes are allocated across populations and timescales."
        },
        {
          "id": "geoscience-601-l07-f2",
          "front": "Decision traceability",
          "back": "An auditable record of evidence, ownership, and rationale."
        },
        {
          "id": "geoscience-601-l07-f3",
          "front": "Responsible leadership",
          "back": "Decision behavior that balances performance with accountability and ethics."
        }
      ]
    },
    {
      "id": "geoscience-601-l08",
      "title": "Geoscience Capstone Defense Lab",
      "type": "interactive",
      "duration": 16,
      "learningAids": [
        {
          "id": "geoscience-601-l08-a1",
          "type": "practice",
          "title": "Guided Practice",
          "content": "Use a structured approach, document assumptions, and verify outcomes with measurable criteria."
        }
      ],
      "chunks": [
        {
          "id": "geoscience-601-l08-c1",
          "kind": "practice",
          "title": "Defense Brief Assembly",
          "content": "Learners assemble a brief with claims, evidence, uncertainty bounds, and remediation pathways."
        },
        {
          "id": "geoscience-601-l08-c2",
          "kind": "recap",
          "title": "Expert Panel Rehearsal",
          "content": "Learners rehearse responses to technical, governance, and stakeholder critique scenarios."
        }
      ],
      "interactiveActivities": [
        {
          "id": "geoscience-601-l08-act1",
          "type": "debate_simulator",
          "title": "Expert Defense Panel",
          "description": "Defend specialization recommendations under adversarial cross-examination."
        }
      ]
    }
  ]
};
