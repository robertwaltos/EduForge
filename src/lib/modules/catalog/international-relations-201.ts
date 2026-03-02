import type { LearningModule } from "@/lib/modules/types";

export const InternationalRelations201Module: LearningModule = {
  "id": "international-relations-201",
  "title": "International Relations Applied Practice",
  "description": "Level 201 curriculum in International Relations, focused on state and non-state actors, strategic bargaining, institutional governance, and conflict and cooperation analysis through case analysis, simulation practice, and mastery checkpoints.",
  "subject": "Social Studies",
  "tags": [
    "core",
    "curriculum",
    "interactive",
    "policy",
    "global-studies"
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
    "Apply state and non-state actors using explicit assumptions and constraints",
    "Design and execute workflows for strategic bargaining with reliable control points",
    "Evaluate institutional governance decisions using baseline and side-effect analysis",
    "Strengthen conflict and cooperation analysis with accountable governance mechanisms",
    "Communicate uncertainty and tradeoffs across stakeholder groups",
    "Build defensible recommendations resilient to critical review"
  ],
  "lessons": [
    {
      "id": "international-relations-201-l01",
      "title": "International Relations Core Foundations",
      "type": "video",
      "duration": 13,
      "learningAids": [
        {
          "id": "international-relations-201-l01-a1",
          "type": "image",
          "title": "Guided Practice",
          "content": "Document assumptions, show your reasoning chain, and verify your conclusions before submission."
        }
      ],
      "chunks": [
        {
          "id": "international-relations-201-l01-c1",
          "kind": "concept",
          "title": "Scope and Shared Vocabulary",
          "content": "This lesson defines the scope of International Relations, key terms, and how state and non-state actors and strategic bargaining interact in practical contexts."
        },
        {
          "id": "international-relations-201-l01-c2",
          "kind": "concept",
          "title": "Causal Structure and Constraints",
          "content": "Learners map causal pathways and test hidden assumptions before selecting interventions."
        },
        {
          "id": "international-relations-201-l01-c3",
          "kind": "recap",
          "title": "Evidence Discipline",
          "content": "Claims are tied to observable indicators, uncertainty notes, and review checkpoints."
        }
      ],
      "flashcards": [
        {
          "id": "international-relations-201-l01-f1",
          "front": "state and non-state actors",
          "back": "A core analytical lens in International Relations requiring careful assumption control."
        },
        {
          "id": "international-relations-201-l01-f2",
          "front": "strategic bargaining",
          "back": "Operational design practices that determine system reliability and execution quality."
        },
        {
          "id": "international-relations-201-l01-f3",
          "front": "institutional governance",
          "back": "The evaluation framework used to validate outcomes and detect hidden costs."
        }
      ]
    },
    {
      "id": "international-relations-201-l02",
      "title": "International Relations Workflow Lab",
      "type": "interactive",
      "duration": 15,
      "learningAids": [
        {
          "id": "international-relations-201-l02-a1",
          "type": "practice",
          "title": "Guided Practice",
          "content": "Document assumptions, show your reasoning chain, and verify your conclusions before submission."
        }
      ],
      "chunks": [
        {
          "id": "international-relations-201-l02-c1",
          "kind": "practice",
          "title": "Workflow Construction and Test",
          "content": "Learners design a workflow emphasizing method execution, workflow discipline, and evidence-based reasoning, then stress-test reliability under uncertainty."
        },
        {
          "id": "international-relations-201-l02-c2",
          "kind": "recap",
          "title": "Control Gates and Readiness",
          "content": "Readiness requires owner mapping, gate criteria, rollback conditions, and verification signals."
        }
      ],
      "interactiveActivities": [
        {
          "id": "international-relations-201-l02-act1",
          "type": "matching_pairs",
          "title": "Control Mapping",
          "description": "Match controls to the strongest expected reliability or governance effect.",
          "pairs": [
            {
              "left": "Pre-release gate",
              "right": "Reduces preventable failures"
            },
            {
              "left": "Rollback threshold",
              "right": "Contains blast radius quickly"
            },
            {
              "left": "Baseline monitor",
              "right": "Supports impact attribution"
            },
            {
              "left": "Retrospective cycle",
              "right": "Improves future decision quality"
            }
          ]
        },
        {
          "id": "international-relations-201-l02-act2",
          "type": "sorting_buckets",
          "title": "Constraint Sorting",
          "description": "Sort constraint types into technical, policy, and stakeholder-impact categories.",
          "buckets": [
            "Technical",
            "Policy",
            "Stakeholder Impact"
          ],
          "items": [
            {
              "text": "Throughput budget",
              "bucket": "Technical"
            },
            {
              "text": "Regulatory retention requirement",
              "bucket": "Policy"
            },
            {
              "text": "Public trust erosion risk",
              "bucket": "Stakeholder Impact"
            },
            {
              "text": "Audit evidence requirement",
              "bucket": "Policy"
            }
          ]
        }
      ]
    },
    {
      "id": "international-relations-201-l03",
      "title": "Checkpoint 1: Concepts and Methods",
      "type": "quiz",
      "duration": 10,
      "learningAids": [
        {
          "id": "international-relations-201-l03-a1",
          "type": "practice",
          "title": "Guided Practice",
          "content": "Document assumptions, show your reasoning chain, and verify your conclusions before submission."
        }
      ],
      "questions": [
        {
          "id": "international-relations-201-l03-q1",
          "text": "Which approach most improves decisions in state and non-state actors?",
          "skillId": "international-relations-201-skill-core",
          "options": [
            {
              "id": "a",
              "text": "Rely on assumptions that are never tested"
            },
            {
              "id": "b",
              "text": "Define constraints, test failure modes, and monitor indicators"
            },
            {
              "id": "c",
              "text": "Treat all contexts as identical"
            },
            {
              "id": "d",
              "text": "Avoid uncertainty analysis"
            }
          ],
          "correctOptionId": "b",
          "explanation": "Reliable decisions require explicit constraints, failure tests, and measured signals."
        },
        {
          "id": "international-relations-201-l03-q2",
          "text": "The 201 level should emphasize:",
          "skillId": "international-relations-201-skill-level",
          "options": [
            {
              "id": "a",
              "text": "method execution, workflow discipline, and evidence-based reasoning"
            },
            {
              "id": "b",
              "text": "Execution speed without review"
            },
            {
              "id": "c",
              "text": "No baselines or controls"
            },
            {
              "id": "d",
              "text": "Single perspective decision-making"
            }
          ],
          "correctOptionId": "a",
          "explanation": "This level is explicitly structured around method execution, workflow discipline, and evidence-based reasoning."
        },
        {
          "id": "international-relations-201-l03-q3",
          "text": "What best strengthens strategic bargaining reliability?",
          "skillId": "international-relations-201-skill-reliability",
          "options": [
            {
              "id": "a",
              "text": "Unowned workflows and unclear escalation"
            },
            {
              "id": "b",
              "text": "Control checkpoints, ownership mapping, and response thresholds"
            },
            {
              "id": "c",
              "text": "Untracked changes"
            },
            {
              "id": "d",
              "text": "No incident review"
            }
          ],
          "correctOptionId": "b",
          "explanation": "Reliability depends on clear controls, owners, and threshold-driven responses."
        },
        {
          "id": "international-relations-201-l03-q4",
          "text": "For institutional governance, which practice is most defensible?",
          "skillId": "international-relations-201-skill-eval",
          "options": [
            {
              "id": "a",
              "text": "Use anecdotal wins only"
            },
            {
              "id": "b",
              "text": "Compare against baselines and include side-effect checks"
            },
            {
              "id": "c",
              "text": "Ignore difficult scenarios"
            },
            {
              "id": "d",
              "text": "Adjust criteria after results"
            }
          ],
          "correctOptionId": "b",
          "explanation": "Baseline and side-effect analysis prevents biased or incomplete conclusions."
        },
        {
          "id": "international-relations-201-l03-q5",
          "text": "A mature conflict and cooperation analysis model should include:",
          "skillId": "international-relations-201-skill-governance",
          "options": [
            {
              "id": "a",
              "text": "Policy disconnected from measurement"
            },
            {
              "id": "b",
              "text": "Policy links, measurable thresholds, and corrective pathways"
            },
            {
              "id": "c",
              "text": "No transparency obligations"
            },
            {
              "id": "d",
              "text": "No remediation expectations"
            }
          ],
          "correctOptionId": "b",
          "explanation": "Governance maturity connects intention, measurement, and corrective response."
        }
      ]
    },
    {
      "id": "international-relations-201-l04",
      "title": "International Relations Case Analysis",
      "type": "video",
      "duration": 14,
      "learningAids": [
        {
          "id": "international-relations-201-l04-a1",
          "type": "mnemonic",
          "title": "Guided Practice",
          "content": "Document assumptions, show your reasoning chain, and verify your conclusions before submission."
        }
      ],
      "chunks": [
        {
          "id": "international-relations-201-l04-c1",
          "kind": "example",
          "title": "Case Context and Decision Stakes",
          "content": "Case focus: a regional crisis requiring diplomacy, alliance management, and multilateral institution engagement. Learners map high-impact risks and competing constraints."
        },
        {
          "id": "international-relations-201-l04-c2",
          "kind": "concept",
          "title": "Tradeoff Matrix",
          "content": "Intervention options are scored across effectiveness, reliability, equity, and implementation feasibility."
        },
        {
          "id": "international-relations-201-l04-c3",
          "kind": "recap",
          "title": "Failure Learning and Recovery",
          "content": "The lesson transforms failure patterns into safeguards, response playbooks, and monitoring updates."
        }
      ],
      "flashcards": [
        {
          "id": "international-relations-201-l04-f1",
          "front": "Tradeoff matrix",
          "back": "A structured comparison of alternatives under competing priorities."
        },
        {
          "id": "international-relations-201-l04-f2",
          "front": "Failure pattern",
          "back": "A recurring risk signature used to design targeted mitigations."
        },
        {
          "id": "international-relations-201-l04-f3",
          "front": "Response playbook",
          "back": "A predefined action sequence for safe and timely recovery."
        }
      ]
    },
    {
      "id": "international-relations-201-l05",
      "title": "International Relations Simulation Studio",
      "type": "interactive",
      "duration": 16,
      "learningAids": [
        {
          "id": "international-relations-201-l05-a1",
          "type": "practice",
          "title": "Guided Practice",
          "content": "Document assumptions, show your reasoning chain, and verify your conclusions before submission."
        }
      ],
      "chunks": [
        {
          "id": "international-relations-201-l05-c1",
          "kind": "practice",
          "title": "Simulation Setup",
          "content": "Learners configure intervention scenarios, uncertainty parameters, and measurable success thresholds."
        },
        {
          "id": "international-relations-201-l05-c2",
          "kind": "recap",
          "title": "Simulation Debrief",
          "content": "Post-run review evaluates outcomes, side effects, and alignment with governance constraints."
        }
      ],
      "interactiveActivities": [
        {
          "id": "international-relations-201-l05-act1",
          "type": "scenario_practice",
          "title": "Intervention Simulation",
          "description": "Evaluate three strategies and justify which best advances state and non-state actors and conflict and cooperation analysis.",
          "instructions": [
            "Define objective and guardrails before selecting interventions.",
            "Record near-term and long-term tradeoffs for each option.",
            "Select confirmation metrics and escalation triggers."
          ]
        },
        {
          "id": "international-relations-201-l05-act2",
          "type": "matching_pairs",
          "title": "Mitigation Alignment",
          "description": "Match risk conditions to the strongest mitigation responses.",
          "pairs": [
            {
              "left": "Ambiguous ownership",
              "right": "Define role map and escalation authority"
            },
            {
              "left": "Weak signal quality",
              "right": "Strengthen intake validation and monitoring"
            },
            {
              "left": "Policy drift",
              "right": "Re-anchor controls to explicit standards"
            },
            {
              "left": "Stakeholder opposition",
              "right": "Increase transparency and feedback channels"
            }
          ]
        }
      ]
    },
    {
      "id": "international-relations-201-l06",
      "title": "Checkpoint 2: Systems Decisions",
      "type": "quiz",
      "duration": 10,
      "learningAids": [
        {
          "id": "international-relations-201-l06-a1",
          "type": "practice",
          "title": "Guided Practice",
          "content": "Document assumptions, show your reasoning chain, and verify your conclusions before submission."
        }
      ],
      "questions": [
        {
          "id": "international-relations-201-l06-q1",
          "text": "Which approach most improves decisions in state and non-state actors?",
          "skillId": "international-relations-201-skill-core",
          "options": [
            {
              "id": "a",
              "text": "Rely on assumptions that are never tested"
            },
            {
              "id": "b",
              "text": "Define constraints, test failure modes, and monitor indicators"
            },
            {
              "id": "c",
              "text": "Treat all contexts as identical"
            },
            {
              "id": "d",
              "text": "Avoid uncertainty analysis"
            }
          ],
          "correctOptionId": "b",
          "explanation": "Reliable decisions require explicit constraints, failure tests, and measured signals."
        },
        {
          "id": "international-relations-201-l06-q2",
          "text": "The 201 level should emphasize:",
          "skillId": "international-relations-201-skill-level",
          "options": [
            {
              "id": "a",
              "text": "method execution, workflow discipline, and evidence-based reasoning"
            },
            {
              "id": "b",
              "text": "Execution speed without review"
            },
            {
              "id": "c",
              "text": "No baselines or controls"
            },
            {
              "id": "d",
              "text": "Single perspective decision-making"
            }
          ],
          "correctOptionId": "a",
          "explanation": "This level is explicitly structured around method execution, workflow discipline, and evidence-based reasoning."
        },
        {
          "id": "international-relations-201-l06-q3",
          "text": "What best strengthens strategic bargaining reliability?",
          "skillId": "international-relations-201-skill-reliability",
          "options": [
            {
              "id": "a",
              "text": "Unowned workflows and unclear escalation"
            },
            {
              "id": "b",
              "text": "Control checkpoints, ownership mapping, and response thresholds"
            },
            {
              "id": "c",
              "text": "Untracked changes"
            },
            {
              "id": "d",
              "text": "No incident review"
            }
          ],
          "correctOptionId": "b",
          "explanation": "Reliability depends on clear controls, owners, and threshold-driven responses."
        },
        {
          "id": "international-relations-201-l06-q4",
          "text": "For institutional governance, which practice is most defensible?",
          "skillId": "international-relations-201-skill-eval",
          "options": [
            {
              "id": "a",
              "text": "Use anecdotal wins only"
            },
            {
              "id": "b",
              "text": "Compare against baselines and include side-effect checks"
            },
            {
              "id": "c",
              "text": "Ignore difficult scenarios"
            },
            {
              "id": "d",
              "text": "Adjust criteria after results"
            }
          ],
          "correctOptionId": "b",
          "explanation": "Baseline and side-effect analysis prevents biased or incomplete conclusions."
        },
        {
          "id": "international-relations-201-l06-q5",
          "text": "A mature conflict and cooperation analysis model should include:",
          "skillId": "international-relations-201-skill-governance",
          "options": [
            {
              "id": "a",
              "text": "Policy disconnected from measurement"
            },
            {
              "id": "b",
              "text": "Policy links, measurable thresholds, and corrective pathways"
            },
            {
              "id": "c",
              "text": "No transparency obligations"
            },
            {
              "id": "d",
              "text": "No remediation expectations"
            }
          ],
          "correctOptionId": "b",
          "explanation": "Governance maturity connects intention, measurement, and corrective response."
        }
      ]
    },
    {
      "id": "international-relations-201-l07",
      "title": "International Relations Policy and Ethics Integration",
      "type": "video",
      "duration": 12,
      "learningAids": [
        {
          "id": "international-relations-201-l07-a1",
          "type": "image",
          "title": "Guided Practice",
          "content": "Document assumptions, show your reasoning chain, and verify your conclusions before submission."
        }
      ],
      "chunks": [
        {
          "id": "international-relations-201-l07-c1",
          "kind": "concept",
          "title": "Stakeholder Impact Mapping",
          "content": "Learners examine how benefits and burdens are distributed across stakeholders and time horizons."
        },
        {
          "id": "international-relations-201-l07-c2",
          "kind": "concept",
          "title": "Accountability Architecture",
          "content": "Accountability is framed through traceability, review rights, and remediation obligations."
        },
        {
          "id": "international-relations-201-l07-c3",
          "kind": "recap",
          "title": "Responsible Execution Checklist",
          "content": "A final checklist links technical performance with policy, ethics, and stakeholder trust outcomes."
        }
      ],
      "flashcards": [
        {
          "id": "international-relations-201-l07-f1",
          "front": "Impact distribution",
          "back": "How outcomes differ across stakeholder groups and timescales."
        },
        {
          "id": "international-relations-201-l07-f2",
          "front": "Decision traceability",
          "back": "The evidence chain showing how and why a decision was made."
        },
        {
          "id": "international-relations-201-l07-f3",
          "front": "Responsible execution",
          "back": "Delivery behavior that balances effectiveness with ethical and policy safeguards."
        }
      ]
    },
    {
      "id": "international-relations-201-l08",
      "title": "International Relations Capstone Planning Lab",
      "type": "interactive",
      "duration": 15,
      "learningAids": [
        {
          "id": "international-relations-201-l08-a1",
          "type": "practice",
          "title": "Guided Practice",
          "content": "Document assumptions, show your reasoning chain, and verify your conclusions before submission."
        }
      ],
      "chunks": [
        {
          "id": "international-relations-201-l08-c1",
          "kind": "practice",
          "title": "Capstone Charter",
          "content": "Learners draft capstone objective, constraints, metrics, and governance gates in one decision charter."
        },
        {
          "id": "international-relations-201-l08-c2",
          "kind": "recap",
          "title": "Defense Readiness",
          "content": "Learners prepare evidence-backed defenses for technical, policy, and stakeholder critiques."
        }
      ],
      "interactiveActivities": [
        {
          "id": "international-relations-201-l08-act1",
          "type": "project_builder",
          "title": "Capstone Charter Builder",
          "description": "Build a capstone charter with objectives, metrics, risks, and remediation pathways.",
          "instructions": [
            "Define objective and boundary conditions.",
            "List at least three measurable success indicators.",
            "Define escalation and corrective action criteria."
          ]
        },
        {
          "id": "international-relations-201-l08-act2",
          "type": "debate_simulator",
          "title": "Decision Defense Panel",
          "description": "Defend your capstone decisions against technical, policy, and stakeholder objections."
        }
      ]
    }
  ]
};
