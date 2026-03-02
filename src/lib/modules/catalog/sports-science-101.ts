import type { LearningModule } from "@/lib/modules/types";

export const SportsScience101Module: LearningModule = {
  "id": "sports-science-101",
  "title": "Sports Science Foundations",
  "description": "Level 101 curriculum in Sports Science, focused on performance physiology, training periodization, biomechanics and movement analysis, and injury prevention governance through case analysis, simulation practice, and mastery checkpoints.",
  "subject": "Health Science",
  "tags": [
    "core",
    "curriculum",
    "interactive",
    "sports",
    "human-performance"
  ],
  "minAge": 14,
  "maxAge": 99,
  "version": "2.0.0",
  "difficultyBand": "beginner",
  "localeSupport": [
    "en"
  ],
  "learningObjectives": [
    "Apply performance physiology using explicit assumptions and constraints",
    "Design and execute workflows for training periodization with reliable control points",
    "Evaluate biomechanics and movement analysis decisions using baseline and side-effect analysis",
    "Strengthen injury prevention governance with accountable governance mechanisms",
    "Communicate uncertainty and tradeoffs across stakeholder groups",
    "Build defensible recommendations resilient to critical review"
  ],
  "lessons": [
    {
      "id": "sports-science-101-l01",
      "title": "Sports Science Core Foundations",
      "type": "video",
      "duration": 13,
      "learningAids": [
        {
          "id": "sports-science-101-l01-a1",
          "type": "image",
          "title": "Guided Practice",
          "content": "Document assumptions, show your reasoning chain, and verify your conclusions before submission."
        }
      ],
      "chunks": [
        {
          "id": "sports-science-101-l01-c1",
          "kind": "concept",
          "title": "Scope and Shared Vocabulary",
          "content": "This lesson defines the scope of Sports Science, key terms, and how performance physiology and training periodization interact in practical contexts."
        },
        {
          "id": "sports-science-101-l01-c2",
          "kind": "concept",
          "title": "Causal Structure and Constraints",
          "content": "Learners map causal pathways and test hidden assumptions before selecting interventions."
        },
        {
          "id": "sports-science-101-l01-c3",
          "kind": "recap",
          "title": "Evidence Discipline",
          "content": "Claims are tied to observable indicators, uncertainty notes, and review checkpoints."
        }
      ],
      "flashcards": [
        {
          "id": "sports-science-101-l01-f1",
          "front": "performance physiology",
          "back": "A core analytical lens in Sports Science requiring careful assumption control."
        },
        {
          "id": "sports-science-101-l01-f2",
          "front": "training periodization",
          "back": "Operational design practices that determine system reliability and execution quality."
        },
        {
          "id": "sports-science-101-l01-f3",
          "front": "biomechanics and movement analysis",
          "back": "The evaluation framework used to validate outcomes and detect hidden costs."
        }
      ]
    },
    {
      "id": "sports-science-101-l02",
      "title": "Sports Science Workflow Lab",
      "type": "interactive",
      "duration": 15,
      "learningAids": [
        {
          "id": "sports-science-101-l02-a1",
          "type": "practice",
          "title": "Guided Practice",
          "content": "Document assumptions, show your reasoning chain, and verify your conclusions before submission."
        }
      ],
      "chunks": [
        {
          "id": "sports-science-101-l02-c1",
          "kind": "practice",
          "title": "Workflow Construction and Test",
          "content": "Learners design a workflow emphasizing foundational vocabulary, mechanism comprehension, and basic scenario interpretation, then stress-test reliability under uncertainty."
        },
        {
          "id": "sports-science-101-l02-c2",
          "kind": "recap",
          "title": "Control Gates and Readiness",
          "content": "Readiness requires owner mapping, gate criteria, rollback conditions, and verification signals."
        }
      ],
      "interactiveActivities": [
        {
          "id": "sports-science-101-l02-act1",
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
          "id": "sports-science-101-l02-act2",
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
      "id": "sports-science-101-l03",
      "title": "Checkpoint 1: Concepts and Methods",
      "type": "quiz",
      "duration": 10,
      "learningAids": [
        {
          "id": "sports-science-101-l03-a1",
          "type": "practice",
          "title": "Guided Practice",
          "content": "Document assumptions, show your reasoning chain, and verify your conclusions before submission."
        }
      ],
      "questions": [
        {
          "id": "sports-science-101-l03-q1",
          "text": "Which approach most improves decisions in performance physiology?",
          "skillId": "sports-science-101-skill-core",
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
          "id": "sports-science-101-l03-q2",
          "text": "The 101 level should emphasize:",
          "skillId": "sports-science-101-skill-level",
          "options": [
            {
              "id": "a",
              "text": "foundational vocabulary, mechanism comprehension, and basic scenario interpretation"
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
          "explanation": "This level is explicitly structured around foundational vocabulary, mechanism comprehension, and basic scenario interpretation."
        },
        {
          "id": "sports-science-101-l03-q3",
          "text": "What best strengthens training periodization reliability?",
          "skillId": "sports-science-101-skill-reliability",
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
          "id": "sports-science-101-l03-q4",
          "text": "For biomechanics and movement analysis, which practice is most defensible?",
          "skillId": "sports-science-101-skill-eval",
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
          "id": "sports-science-101-l03-q5",
          "text": "A mature injury prevention governance model should include:",
          "skillId": "sports-science-101-skill-governance",
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
      "id": "sports-science-101-l04",
      "title": "Sports Science Case Analysis",
      "type": "video",
      "duration": 14,
      "learningAids": [
        {
          "id": "sports-science-101-l04-a1",
          "type": "mnemonic",
          "title": "Guided Practice",
          "content": "Document assumptions, show your reasoning chain, and verify your conclusions before submission."
        }
      ],
      "chunks": [
        {
          "id": "sports-science-101-l04-c1",
          "kind": "example",
          "title": "Case Context and Decision Stakes",
          "content": "Case focus: a high-performance training program balancing performance gains, recovery, and injury risk. Learners map high-impact risks and competing constraints."
        },
        {
          "id": "sports-science-101-l04-c2",
          "kind": "concept",
          "title": "Tradeoff Matrix",
          "content": "Intervention options are scored across effectiveness, reliability, equity, and implementation feasibility."
        },
        {
          "id": "sports-science-101-l04-c3",
          "kind": "recap",
          "title": "Failure Learning and Recovery",
          "content": "The lesson transforms failure patterns into safeguards, response playbooks, and monitoring updates."
        }
      ],
      "flashcards": [
        {
          "id": "sports-science-101-l04-f1",
          "front": "Tradeoff matrix",
          "back": "A structured comparison of alternatives under competing priorities."
        },
        {
          "id": "sports-science-101-l04-f2",
          "front": "Failure pattern",
          "back": "A recurring risk signature used to design targeted mitigations."
        },
        {
          "id": "sports-science-101-l04-f3",
          "front": "Response playbook",
          "back": "A predefined action sequence for safe and timely recovery."
        }
      ]
    },
    {
      "id": "sports-science-101-l05",
      "title": "Sports Science Simulation Studio",
      "type": "interactive",
      "duration": 16,
      "learningAids": [
        {
          "id": "sports-science-101-l05-a1",
          "type": "practice",
          "title": "Guided Practice",
          "content": "Document assumptions, show your reasoning chain, and verify your conclusions before submission."
        }
      ],
      "chunks": [
        {
          "id": "sports-science-101-l05-c1",
          "kind": "practice",
          "title": "Simulation Setup",
          "content": "Learners configure intervention scenarios, uncertainty parameters, and measurable success thresholds."
        },
        {
          "id": "sports-science-101-l05-c2",
          "kind": "recap",
          "title": "Simulation Debrief",
          "content": "Post-run review evaluates outcomes, side effects, and alignment with governance constraints."
        }
      ],
      "interactiveActivities": [
        {
          "id": "sports-science-101-l05-act1",
          "type": "scenario_practice",
          "title": "Intervention Simulation",
          "description": "Evaluate three strategies and justify which best advances performance physiology and injury prevention governance.",
          "instructions": [
            "Define objective and guardrails before selecting interventions.",
            "Record near-term and long-term tradeoffs for each option.",
            "Select confirmation metrics and escalation triggers."
          ]
        },
        {
          "id": "sports-science-101-l05-act2",
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
      "id": "sports-science-101-l06",
      "title": "Checkpoint 2: Systems Decisions",
      "type": "quiz",
      "duration": 10,
      "learningAids": [
        {
          "id": "sports-science-101-l06-a1",
          "type": "practice",
          "title": "Guided Practice",
          "content": "Document assumptions, show your reasoning chain, and verify your conclusions before submission."
        }
      ],
      "questions": [
        {
          "id": "sports-science-101-l06-q1",
          "text": "Which approach most improves decisions in performance physiology?",
          "skillId": "sports-science-101-skill-core",
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
          "id": "sports-science-101-l06-q2",
          "text": "The 101 level should emphasize:",
          "skillId": "sports-science-101-skill-level",
          "options": [
            {
              "id": "a",
              "text": "foundational vocabulary, mechanism comprehension, and basic scenario interpretation"
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
          "explanation": "This level is explicitly structured around foundational vocabulary, mechanism comprehension, and basic scenario interpretation."
        },
        {
          "id": "sports-science-101-l06-q3",
          "text": "What best strengthens training periodization reliability?",
          "skillId": "sports-science-101-skill-reliability",
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
          "id": "sports-science-101-l06-q4",
          "text": "For biomechanics and movement analysis, which practice is most defensible?",
          "skillId": "sports-science-101-skill-eval",
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
          "id": "sports-science-101-l06-q5",
          "text": "A mature injury prevention governance model should include:",
          "skillId": "sports-science-101-skill-governance",
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
      "id": "sports-science-101-l07",
      "title": "Sports Science Policy and Ethics Integration",
      "type": "video",
      "duration": 12,
      "learningAids": [
        {
          "id": "sports-science-101-l07-a1",
          "type": "image",
          "title": "Guided Practice",
          "content": "Document assumptions, show your reasoning chain, and verify your conclusions before submission."
        }
      ],
      "chunks": [
        {
          "id": "sports-science-101-l07-c1",
          "kind": "concept",
          "title": "Stakeholder Impact Mapping",
          "content": "Learners examine how benefits and burdens are distributed across stakeholders and time horizons."
        },
        {
          "id": "sports-science-101-l07-c2",
          "kind": "concept",
          "title": "Accountability Architecture",
          "content": "Accountability is framed through traceability, review rights, and remediation obligations."
        },
        {
          "id": "sports-science-101-l07-c3",
          "kind": "recap",
          "title": "Responsible Execution Checklist",
          "content": "A final checklist links technical performance with policy, ethics, and stakeholder trust outcomes."
        }
      ],
      "flashcards": [
        {
          "id": "sports-science-101-l07-f1",
          "front": "Impact distribution",
          "back": "How outcomes differ across stakeholder groups and timescales."
        },
        {
          "id": "sports-science-101-l07-f2",
          "front": "Decision traceability",
          "back": "The evidence chain showing how and why a decision was made."
        },
        {
          "id": "sports-science-101-l07-f3",
          "front": "Responsible execution",
          "back": "Delivery behavior that balances effectiveness with ethical and policy safeguards."
        }
      ]
    },
    {
      "id": "sports-science-101-l08",
      "title": "Sports Science Capstone Planning Lab",
      "type": "interactive",
      "duration": 15,
      "learningAids": [
        {
          "id": "sports-science-101-l08-a1",
          "type": "practice",
          "title": "Guided Practice",
          "content": "Document assumptions, show your reasoning chain, and verify your conclusions before submission."
        }
      ],
      "chunks": [
        {
          "id": "sports-science-101-l08-c1",
          "kind": "practice",
          "title": "Capstone Charter",
          "content": "Learners draft capstone objective, constraints, metrics, and governance gates in one decision charter."
        },
        {
          "id": "sports-science-101-l08-c2",
          "kind": "recap",
          "title": "Defense Readiness",
          "content": "Learners prepare evidence-backed defenses for technical, policy, and stakeholder critiques."
        }
      ],
      "interactiveActivities": [
        {
          "id": "sports-science-101-l08-act1",
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
          "id": "sports-science-101-l08-act2",
          "type": "debate_simulator",
          "title": "Decision Defense Panel",
          "description": "Defend your capstone decisions against technical, policy, and stakeholder objections."
        }
      ]
    }
  ]
};
