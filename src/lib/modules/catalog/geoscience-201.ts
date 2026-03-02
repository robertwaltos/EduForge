import type { LearningModule } from "@/lib/modules/types";

export const Geoscience201Module: LearningModule = {
  "id": "geoscience-201",
  "title": "Geoscience Applied Practice",
  "description": "Level 201 curriculum in Geoscience, centered on tectonic and surface processes, earth materials analysis, hazard and risk interpretation, and resource and stewardship governance through case analysis, simulation, and checkpoint-driven mastery.",
  "subject": "Earth Science",
  "tags": [
    "core",
    "curriculum",
    "interactive",
    "geology",
    "earth-systems"
  ],
  "minAge": 15,
  "maxAge": 99,
  "version": "2.0.0",
  "difficultyBand": "intermediate",
  "localeSupport": [
    "en",
    "es"
  ],
  "learningObjectives": [
    "Explain and apply tectonic and surface processes under practical constraints",
    "Build repeatable workflows for earth materials analysis with measurable controls",
    "Evaluate interventions in hazard and risk interpretation using comparative evidence",
    "Operationalize resource and stewardship governance with transparent governance loops",
    "Communicate uncertainty, risk, and tradeoffs clearly to mixed stakeholders",
    "Defend decisions through evidence-backed reasoning and post-run review"
  ],
  "lessons": [
    {
      "id": "geoscience-201-l01",
      "title": "Geoscience Core Models",
      "type": "video",
      "duration": 13,
      "learningAids": [
        {
          "id": "geoscience-201-l01-a1",
          "type": "image",
          "title": "Guided Practice",
          "content": "Use structured reasoning, map tradeoffs, and verify outcomes with metrics before finalizing."
        }
      ],
      "chunks": [
        {
          "id": "geoscience-201-l01-c1",
          "kind": "concept",
          "title": "Scope and Vocabulary",
          "content": "This lesson establishes shared vocabulary for Geoscience and clarifies the scope boundaries for tectonic and surface processes and earth materials analysis."
        },
        {
          "id": "geoscience-201-l01-c2",
          "kind": "concept",
          "title": "Causal Reasoning",
          "content": "Learners map causal relationships, assumptions, and constraints before intervention design."
        },
        {
          "id": "geoscience-201-l01-c3",
          "kind": "recap",
          "title": "Evidence Standards",
          "content": "Claims are anchored to measurable indicators, confidence ranges, and review checkpoints."
        }
      ],
      "flashcards": [
        {
          "id": "geoscience-201-l01-f1",
          "front": "tectonic and surface processes",
          "back": "A core decision lens in Geoscience requiring explicit assumption control."
        },
        {
          "id": "geoscience-201-l01-f2",
          "front": "earth materials analysis",
          "back": "Execution systems that determine reliability and repeatability."
        },
        {
          "id": "geoscience-201-l01-f3",
          "front": "hazard and risk interpretation",
          "back": "Evaluation process for distinguishing real gains from superficial wins."
        }
      ]
    },
    {
      "id": "geoscience-201-l02",
      "title": "Geoscience Workflow Lab",
      "type": "interactive",
      "duration": 15,
      "learningAids": [
        {
          "id": "geoscience-201-l02-a1",
          "type": "practice",
          "title": "Guided Practice",
          "content": "Use structured reasoning, map tradeoffs, and verify outcomes with metrics before finalizing."
        }
      ],
      "chunks": [
        {
          "id": "geoscience-201-l02-c1",
          "kind": "practice",
          "title": "Workflow Build",
          "content": "Learners build a workflow with owner mapping, control gates, and measurable outcomes."
        },
        {
          "id": "geoscience-201-l02-c2",
          "kind": "recap",
          "title": "Readiness and Rollback",
          "content": "Systems are stress-tested for failure scenarios and rollback decision thresholds."
        }
      ],
      "interactiveActivities": [
        {
          "id": "geoscience-201-l02-act1",
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
      "id": "geoscience-201-l03",
      "title": "Checkpoint 1: Concepts and Workflow",
      "type": "quiz",
      "duration": 10,
      "learningAids": [
        {
          "id": "geoscience-201-l03-a1",
          "type": "practice",
          "title": "Guided Practice",
          "content": "Use structured reasoning, map tradeoffs, and verify outcomes with metrics before finalizing."
        }
      ],
      "questions": [
        {
          "id": "geoscience-201-l03-q1",
          "text": "Which practice most improves decision quality in tectonic and surface processes?",
          "skillId": "geoscience-201-skill-core",
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
          "id": "geoscience-201-l03-q2",
          "text": "At level 201, high-quality execution in earth materials analysis should include:",
          "skillId": "geoscience-201-skill-execution",
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
          "id": "geoscience-201-l03-q3",
          "text": "A defensible approach to hazard and risk interpretation requires:",
          "skillId": "geoscience-201-skill-eval",
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
          "id": "geoscience-201-l03-q4",
          "text": "Mature resource and stewardship governance systems connect:",
          "skillId": "geoscience-201-skill-governance",
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
      "id": "geoscience-201-l04",
      "title": "Geoscience Case Analysis",
      "type": "video",
      "duration": 14,
      "learningAids": [
        {
          "id": "geoscience-201-l04-a1",
          "type": "mnemonic",
          "title": "Guided Practice",
          "content": "Use structured reasoning, map tradeoffs, and verify outcomes with metrics before finalizing."
        }
      ],
      "chunks": [
        {
          "id": "geoscience-201-l04-c1",
          "kind": "example",
          "title": "Case Context",
          "content": "Case focus: a region facing seismic, erosion, and groundwater pressures requiring integrated geoscience decisions. Learners identify competing objectives and system risks."
        },
        {
          "id": "geoscience-201-l04-c2",
          "kind": "concept",
          "title": "Tradeoff Matrix",
          "content": "Options are scored across effectiveness, feasibility, risk, and stakeholder impact."
        },
        {
          "id": "geoscience-201-l04-c3",
          "kind": "recap",
          "title": "Recovery Design",
          "content": "Failure patterns are converted into safeguards and response playbooks."
        }
      ],
      "flashcards": [
        {
          "id": "geoscience-201-l04-f1",
          "front": "Tradeoff matrix",
          "back": "A structured method to compare options under competing priorities."
        },
        {
          "id": "geoscience-201-l04-f2",
          "front": "Failure pattern",
          "back": "A recurring signal indicating a predictable risk mode."
        },
        {
          "id": "geoscience-201-l04-f3",
          "front": "Response playbook",
          "back": "A predefined action pathway for safe and timely recovery."
        }
      ]
    },
    {
      "id": "geoscience-201-l05",
      "title": "Geoscience Simulation Studio",
      "type": "interactive",
      "duration": 16,
      "learningAids": [
        {
          "id": "geoscience-201-l05-a1",
          "type": "practice",
          "title": "Guided Practice",
          "content": "Use structured reasoning, map tradeoffs, and verify outcomes with metrics before finalizing."
        }
      ],
      "chunks": [
        {
          "id": "geoscience-201-l05-c1",
          "kind": "practice",
          "title": "Scenario Simulation",
          "content": "Learners run multiple intervention scenarios under uncertainty and compare outcomes."
        },
        {
          "id": "geoscience-201-l05-c2",
          "kind": "recap",
          "title": "Debrief",
          "content": "Each run is evaluated for target attainment, side effects, and governance compliance."
        }
      ],
      "interactiveActivities": [
        {
          "id": "geoscience-201-l05-act1",
          "type": "scenario_practice",
          "title": "Intervention Simulation",
          "description": "Compare intervention paths for tectonic and surface processes and resource and stewardship governance.",
          "instructions": [
            "Define objective and constraints before intervention selection.",
            "Document near-term and long-term tradeoffs.",
            "Specify metrics that validate your chosen path."
          ]
        }
      ]
    },
    {
      "id": "geoscience-201-l06",
      "title": "Checkpoint 2: Systems Decisions",
      "type": "quiz",
      "duration": 10,
      "learningAids": [
        {
          "id": "geoscience-201-l06-a1",
          "type": "practice",
          "title": "Guided Practice",
          "content": "Use structured reasoning, map tradeoffs, and verify outcomes with metrics before finalizing."
        }
      ],
      "questions": [
        {
          "id": "geoscience-201-l06-q1",
          "text": "Which practice most improves decision quality in tectonic and surface processes?",
          "skillId": "geoscience-201-skill-core",
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
          "id": "geoscience-201-l06-q2",
          "text": "At level 201, high-quality execution in earth materials analysis should include:",
          "skillId": "geoscience-201-skill-execution",
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
          "id": "geoscience-201-l06-q3",
          "text": "A defensible approach to hazard and risk interpretation requires:",
          "skillId": "geoscience-201-skill-eval",
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
          "id": "geoscience-201-l06-q4",
          "text": "Mature resource and stewardship governance systems connect:",
          "skillId": "geoscience-201-skill-governance",
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
      "id": "geoscience-201-l07",
      "title": "Geoscience Governance and Impact",
      "type": "video",
      "duration": 12,
      "learningAids": [
        {
          "id": "geoscience-201-l07-a1",
          "type": "image",
          "title": "Guided Practice",
          "content": "Use structured reasoning, map tradeoffs, and verify outcomes with metrics before finalizing."
        }
      ],
      "chunks": [
        {
          "id": "geoscience-201-l07-c1",
          "kind": "concept",
          "title": "Stakeholder Impact",
          "content": "Learners map benefit and burden distribution across stakeholder groups."
        },
        {
          "id": "geoscience-201-l07-c2",
          "kind": "concept",
          "title": "Accountability Architecture",
          "content": "Decision traceability, review rights, and remediation obligations are integrated."
        },
        {
          "id": "geoscience-201-l07-c3",
          "kind": "recap",
          "title": "Responsible Execution",
          "content": "A final checklist balances performance, risk control, and ethical impact."
        }
      ],
      "flashcards": [
        {
          "id": "geoscience-201-l07-f1",
          "front": "Impact distribution",
          "back": "How outcomes are allocated across people, systems, and time."
        },
        {
          "id": "geoscience-201-l07-f2",
          "front": "Decision traceability",
          "back": "An auditable explanation of evidence, ownership, and rationale."
        },
        {
          "id": "geoscience-201-l07-f3",
          "front": "Responsible execution",
          "back": "Delivery mode that combines effectiveness with accountability and fairness."
        }
      ]
    },
    {
      "id": "geoscience-201-l08",
      "title": "Geoscience Capstone Planning Lab",
      "type": "interactive",
      "duration": 15,
      "learningAids": [
        {
          "id": "geoscience-201-l08-a1",
          "type": "practice",
          "title": "Guided Practice",
          "content": "Use structured reasoning, map tradeoffs, and verify outcomes with metrics before finalizing."
        }
      ],
      "chunks": [
        {
          "id": "geoscience-201-l08-c1",
          "kind": "practice",
          "title": "Capstone Charter",
          "content": "Learners draft objective, constraints, metrics, and governance triggers."
        },
        {
          "id": "geoscience-201-l08-c2",
          "kind": "recap",
          "title": "Defense Readiness",
          "content": "Learners prepare to defend decisions against technical and governance critiques."
        }
      ],
      "interactiveActivities": [
        {
          "id": "geoscience-201-l08-act1",
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
