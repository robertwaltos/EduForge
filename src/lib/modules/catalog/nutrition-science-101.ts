import type { LearningModule } from "@/lib/modules/types";

export const NutritionScience101Module: LearningModule = {
  "id": "nutrition-science-101",
  "title": "Nutrition Science Foundations",
  "description": "Level 101 curriculum in Nutrition Science, centered on metabolic foundations, dietary pattern analysis, evidence-based intervention design, and nutrition policy and equity through case analysis, simulation, and checkpoint-driven mastery.",
  "subject": "Health Science",
  "tags": [
    "core",
    "curriculum",
    "interactive",
    "nutrition",
    "public-health"
  ],
  "minAge": 14,
  "maxAge": 99,
  "version": "2.0.0",
  "difficultyBand": "beginner",
  "localeSupport": [
    "en",
    "es"
  ],
  "learningObjectives": [
    "Explain and apply metabolic foundations under practical constraints",
    "Build repeatable workflows for dietary pattern analysis with measurable controls",
    "Evaluate interventions in evidence-based intervention design using comparative evidence",
    "Operationalize nutrition policy and equity with transparent governance loops",
    "Communicate uncertainty, risk, and tradeoffs clearly to mixed stakeholders",
    "Defend decisions through evidence-backed reasoning and post-run review"
  ],
  "lessons": [
    {
      "id": "nutrition-science-101-l01",
      "title": "Nutrition Science Core Models",
      "type": "video",
      "duration": 13,
      "learningAids": [
        {
          "id": "nutrition-science-101-l01-a1",
          "type": "image",
          "title": "Guided Practice",
          "content": "Use structured reasoning, map tradeoffs, and verify outcomes with metrics before finalizing."
        }
      ],
      "chunks": [
        {
          "id": "nutrition-science-101-l01-c1",
          "kind": "concept",
          "title": "Scope and Vocabulary",
          "content": "This lesson establishes shared vocabulary for Nutrition Science and clarifies the scope boundaries for metabolic foundations and dietary pattern analysis."
        },
        {
          "id": "nutrition-science-101-l01-c2",
          "kind": "concept",
          "title": "Causal Reasoning",
          "content": "Learners map causal relationships, assumptions, and constraints before intervention design."
        },
        {
          "id": "nutrition-science-101-l01-c3",
          "kind": "recap",
          "title": "Evidence Standards",
          "content": "Claims are anchored to measurable indicators, confidence ranges, and review checkpoints."
        }
      ],
      "flashcards": [
        {
          "id": "nutrition-science-101-l01-f1",
          "front": "metabolic foundations",
          "back": "A core decision lens in Nutrition Science requiring explicit assumption control."
        },
        {
          "id": "nutrition-science-101-l01-f2",
          "front": "dietary pattern analysis",
          "back": "Execution systems that determine reliability and repeatability."
        },
        {
          "id": "nutrition-science-101-l01-f3",
          "front": "evidence-based intervention design",
          "back": "Evaluation process for distinguishing real gains from superficial wins."
        }
      ]
    },
    {
      "id": "nutrition-science-101-l02",
      "title": "Nutrition Science Workflow Lab",
      "type": "interactive",
      "duration": 15,
      "learningAids": [
        {
          "id": "nutrition-science-101-l02-a1",
          "type": "practice",
          "title": "Guided Practice",
          "content": "Use structured reasoning, map tradeoffs, and verify outcomes with metrics before finalizing."
        }
      ],
      "chunks": [
        {
          "id": "nutrition-science-101-l02-c1",
          "kind": "practice",
          "title": "Workflow Build",
          "content": "Learners build a workflow with owner mapping, control gates, and measurable outcomes."
        },
        {
          "id": "nutrition-science-101-l02-c2",
          "kind": "recap",
          "title": "Readiness and Rollback",
          "content": "Systems are stress-tested for failure scenarios and rollback decision thresholds."
        }
      ],
      "interactiveActivities": [
        {
          "id": "nutrition-science-101-l02-act1",
          "type": "matching_pairs",
          "title": "Control Mapping",
          "description": "Match each control to its strongest reliability or governance effect.",
          "pairs": [
            {
              "left": "Pre-commit review",
              "right": "Prevents avoidable defects"
            },
            {
              "left": "Rollback trigger",
              "right": "Contains impact during failures"
            },
            {
              "left": "Baseline monitor",
              "right": "Supports defensible outcome claims"
            },
            {
              "left": "Retrospective cycle",
              "right": "Improves future decisions"
            }
          ]
        }
      ]
    },
    {
      "id": "nutrition-science-101-l03",
      "title": "Checkpoint 1: Concepts and Workflow",
      "type": "quiz",
      "duration": 10,
      "learningAids": [
        {
          "id": "nutrition-science-101-l03-a1",
          "type": "practice",
          "title": "Guided Practice",
          "content": "Use structured reasoning, map tradeoffs, and verify outcomes with metrics before finalizing."
        }
      ],
      "questions": [
        {
          "id": "nutrition-science-101-l03-q1",
          "text": "Which practice most improves decision quality in metabolic foundations?",
          "skillId": "nutrition-science-101-skill-core",
          "options": [
            {
              "id": "a",
              "text": "Use implicit assumptions and no baseline"
            },
            {
              "id": "b",
              "text": "Define assumptions, constraints, and measurable indicators"
            },
            {
              "id": "c",
              "text": "Prioritize speed over evidence in all cases"
            },
            {
              "id": "d",
              "text": "Ignore uncertainty and edge cases"
            }
          ],
          "correctOptionId": "b",
          "explanation": "Decision quality improves when assumptions, constraints, and measurement are explicit."
        },
        {
          "id": "nutrition-science-101-l03-q2",
          "text": "At level 101, high-quality execution in dietary pattern analysis should include:",
          "skillId": "nutrition-science-101-skill-execution",
          "options": [
            {
              "id": "a",
              "text": "Owner mapping, checkpoints, and escalation thresholds"
            },
            {
              "id": "b",
              "text": "No role clarity and ad-hoc decisions"
            },
            {
              "id": "c",
              "text": "No post-implementation review"
            },
            {
              "id": "d",
              "text": "Untracked process changes"
            }
          ],
          "correctOptionId": "a",
          "explanation": "Reliable execution needs clear ownership and threshold-driven control points."
        },
        {
          "id": "nutrition-science-101-l03-q3",
          "text": "A defensible approach to evidence-based intervention design requires:",
          "skillId": "nutrition-science-101-skill-eval",
          "options": [
            {
              "id": "a",
              "text": "Anecdotal wins without comparison"
            },
            {
              "id": "b",
              "text": "Baseline comparison and side-effect analysis"
            },
            {
              "id": "c",
              "text": "Changing criteria after seeing results"
            },
            {
              "id": "d",
              "text": "Ignoring difficult cases"
            }
          ],
          "correctOptionId": "b",
          "explanation": "Comparison and side-effect analysis prevent biased conclusions."
        },
        {
          "id": "nutrition-science-101-l03-q4",
          "text": "Mature nutrition policy and equity systems connect:",
          "skillId": "nutrition-science-101-skill-governance",
          "options": [
            {
              "id": "a",
              "text": "Policy intent, measurable controls, and remediation pathways"
            },
            {
              "id": "b",
              "text": "Policy statements without accountability"
            },
            {
              "id": "c",
              "text": "Performance targets with no risk controls"
            },
            {
              "id": "d",
              "text": "Governance with no transparency"
            }
          ],
          "correctOptionId": "a",
          "explanation": "Effective governance links policy intent to measurable controls and corrective action."
        }
      ]
    },
    {
      "id": "nutrition-science-101-l04",
      "title": "Nutrition Science Case Analysis",
      "type": "video",
      "duration": 14,
      "learningAids": [
        {
          "id": "nutrition-science-101-l04-a1",
          "type": "mnemonic",
          "title": "Guided Practice",
          "content": "Use structured reasoning, map tradeoffs, and verify outcomes with metrics before finalizing."
        }
      ],
      "chunks": [
        {
          "id": "nutrition-science-101-l04-c1",
          "kind": "example",
          "title": "Case Context",
          "content": "Case focus: a community nutrition initiative balancing clinical outcomes, cultural fit, and food-access constraints. Learners identify competing objectives and system risks."
        },
        {
          "id": "nutrition-science-101-l04-c2",
          "kind": "concept",
          "title": "Tradeoff Matrix",
          "content": "Options are scored across effectiveness, feasibility, risk, and stakeholder impact."
        },
        {
          "id": "nutrition-science-101-l04-c3",
          "kind": "recap",
          "title": "Recovery Design",
          "content": "Failure patterns are converted into safeguards and response playbooks."
        }
      ],
      "flashcards": [
        {
          "id": "nutrition-science-101-l04-f1",
          "front": "Tradeoff matrix",
          "back": "A structured method to compare options under competing priorities."
        },
        {
          "id": "nutrition-science-101-l04-f2",
          "front": "Failure pattern",
          "back": "A recurring signal indicating a predictable risk mode."
        },
        {
          "id": "nutrition-science-101-l04-f3",
          "front": "Response playbook",
          "back": "A predefined action pathway for safe and timely recovery."
        }
      ]
    },
    {
      "id": "nutrition-science-101-l05",
      "title": "Nutrition Science Simulation Studio",
      "type": "interactive",
      "duration": 16,
      "learningAids": [
        {
          "id": "nutrition-science-101-l05-a1",
          "type": "practice",
          "title": "Guided Practice",
          "content": "Use structured reasoning, map tradeoffs, and verify outcomes with metrics before finalizing."
        }
      ],
      "chunks": [
        {
          "id": "nutrition-science-101-l05-c1",
          "kind": "practice",
          "title": "Scenario Simulation",
          "content": "Learners run multiple intervention scenarios under uncertainty and compare outcomes."
        },
        {
          "id": "nutrition-science-101-l05-c2",
          "kind": "recap",
          "title": "Debrief",
          "content": "Each run is evaluated for target attainment, side effects, and governance compliance."
        }
      ],
      "interactiveActivities": [
        {
          "id": "nutrition-science-101-l05-act1",
          "type": "scenario_practice",
          "title": "Intervention Simulation",
          "description": "Compare intervention paths for metabolic foundations and nutrition policy and equity.",
          "instructions": [
            "Define objective and constraints before intervention selection.",
            "Document near-term and long-term tradeoffs.",
            "Specify metrics that validate your chosen path."
          ]
        }
      ]
    },
    {
      "id": "nutrition-science-101-l06",
      "title": "Checkpoint 2: Systems Decisions",
      "type": "quiz",
      "duration": 10,
      "learningAids": [
        {
          "id": "nutrition-science-101-l06-a1",
          "type": "practice",
          "title": "Guided Practice",
          "content": "Use structured reasoning, map tradeoffs, and verify outcomes with metrics before finalizing."
        }
      ],
      "questions": [
        {
          "id": "nutrition-science-101-l06-q1",
          "text": "Which practice most improves decision quality in metabolic foundations?",
          "skillId": "nutrition-science-101-skill-core",
          "options": [
            {
              "id": "a",
              "text": "Use implicit assumptions and no baseline"
            },
            {
              "id": "b",
              "text": "Define assumptions, constraints, and measurable indicators"
            },
            {
              "id": "c",
              "text": "Prioritize speed over evidence in all cases"
            },
            {
              "id": "d",
              "text": "Ignore uncertainty and edge cases"
            }
          ],
          "correctOptionId": "b",
          "explanation": "Decision quality improves when assumptions, constraints, and measurement are explicit."
        },
        {
          "id": "nutrition-science-101-l06-q2",
          "text": "At level 101, high-quality execution in dietary pattern analysis should include:",
          "skillId": "nutrition-science-101-skill-execution",
          "options": [
            {
              "id": "a",
              "text": "Owner mapping, checkpoints, and escalation thresholds"
            },
            {
              "id": "b",
              "text": "No role clarity and ad-hoc decisions"
            },
            {
              "id": "c",
              "text": "No post-implementation review"
            },
            {
              "id": "d",
              "text": "Untracked process changes"
            }
          ],
          "correctOptionId": "a",
          "explanation": "Reliable execution needs clear ownership and threshold-driven control points."
        },
        {
          "id": "nutrition-science-101-l06-q3",
          "text": "A defensible approach to evidence-based intervention design requires:",
          "skillId": "nutrition-science-101-skill-eval",
          "options": [
            {
              "id": "a",
              "text": "Anecdotal wins without comparison"
            },
            {
              "id": "b",
              "text": "Baseline comparison and side-effect analysis"
            },
            {
              "id": "c",
              "text": "Changing criteria after seeing results"
            },
            {
              "id": "d",
              "text": "Ignoring difficult cases"
            }
          ],
          "correctOptionId": "b",
          "explanation": "Comparison and side-effect analysis prevent biased conclusions."
        },
        {
          "id": "nutrition-science-101-l06-q4",
          "text": "Mature nutrition policy and equity systems connect:",
          "skillId": "nutrition-science-101-skill-governance",
          "options": [
            {
              "id": "a",
              "text": "Policy intent, measurable controls, and remediation pathways"
            },
            {
              "id": "b",
              "text": "Policy statements without accountability"
            },
            {
              "id": "c",
              "text": "Performance targets with no risk controls"
            },
            {
              "id": "d",
              "text": "Governance with no transparency"
            }
          ],
          "correctOptionId": "a",
          "explanation": "Effective governance links policy intent to measurable controls and corrective action."
        }
      ]
    },
    {
      "id": "nutrition-science-101-l07",
      "title": "Nutrition Science Governance and Impact",
      "type": "video",
      "duration": 12,
      "learningAids": [
        {
          "id": "nutrition-science-101-l07-a1",
          "type": "image",
          "title": "Guided Practice",
          "content": "Use structured reasoning, map tradeoffs, and verify outcomes with metrics before finalizing."
        }
      ],
      "chunks": [
        {
          "id": "nutrition-science-101-l07-c1",
          "kind": "concept",
          "title": "Stakeholder Impact",
          "content": "Learners map benefit and burden distribution across stakeholder groups."
        },
        {
          "id": "nutrition-science-101-l07-c2",
          "kind": "concept",
          "title": "Accountability Architecture",
          "content": "Decision traceability, review rights, and remediation obligations are integrated."
        },
        {
          "id": "nutrition-science-101-l07-c3",
          "kind": "recap",
          "title": "Responsible Execution",
          "content": "A final checklist balances performance, risk control, and ethical impact."
        }
      ],
      "flashcards": [
        {
          "id": "nutrition-science-101-l07-f1",
          "front": "Impact distribution",
          "back": "How outcomes are allocated across people, systems, and time."
        },
        {
          "id": "nutrition-science-101-l07-f2",
          "front": "Decision traceability",
          "back": "An auditable explanation of evidence, ownership, and rationale."
        },
        {
          "id": "nutrition-science-101-l07-f3",
          "front": "Responsible execution",
          "back": "Delivery mode that combines effectiveness with accountability and fairness."
        }
      ]
    },
    {
      "id": "nutrition-science-101-l08",
      "title": "Nutrition Science Capstone Planning Lab",
      "type": "interactive",
      "duration": 15,
      "learningAids": [
        {
          "id": "nutrition-science-101-l08-a1",
          "type": "practice",
          "title": "Guided Practice",
          "content": "Use structured reasoning, map tradeoffs, and verify outcomes with metrics before finalizing."
        }
      ],
      "chunks": [
        {
          "id": "nutrition-science-101-l08-c1",
          "kind": "practice",
          "title": "Capstone Charter",
          "content": "Learners draft objective, constraints, metrics, and governance triggers."
        },
        {
          "id": "nutrition-science-101-l08-c2",
          "kind": "recap",
          "title": "Defense Readiness",
          "content": "Learners prepare to defend decisions against technical and governance critiques."
        }
      ],
      "interactiveActivities": [
        {
          "id": "nutrition-science-101-l08-act1",
          "type": "project_builder",
          "title": "Capstone Charter Builder",
          "description": "Build a capstone charter with measurable outcomes and remediation pathways.",
          "instructions": [
            "Define objective and operating boundaries.",
            "List at least three measurable success indicators.",
            "Define escalation and corrective-action criteria."
          ]
        }
      ]
    }
  ]
};
