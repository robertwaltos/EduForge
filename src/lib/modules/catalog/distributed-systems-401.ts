import type { LearningModule } from "@/lib/modules/types";

export const DistributedSystems401Module: LearningModule = {
  "id": "distributed-systems-401",
  "title": "Distributed Systems Leadership and Capstone",
  "description": "Level 401 curriculum in Distributed Systems, focused on consistency and availability, fault tolerance, distributed coordination, and observability and operations through case-driven analysis, simulations, and assessment-backed mastery.",
  "subject": "Computer Science",
  "tags": [
    "core",
    "curriculum",
    "interactive",
    "systems",
    "engineering"
  ],
  "minAge": 16,
  "maxAge": 99,
  "version": "2.0.0",
  "difficultyBand": "advanced",
  "localeSupport": [
    "en"
  ],
  "learningObjectives": [
    "Apply consistency and availability with explicit assumptions and tradeoff framing",
    "Build repeatable workflows for fault tolerance under realistic constraints",
    "Evaluate distributed coordination decisions with baseline and side-effect analysis",
    "Strengthen observability and operations with transparent policies and escalation pathways",
    "Communicate evidence and uncertainty to mixed stakeholder groups",
    "Produce defensible recommendations that survive critical review"
  ],
  "lessons": [
    {
      "id": "distributed-systems-401-l01",
      "title": "Distributed Systems Core Foundations",
      "type": "video",
      "duration": 13,
      "learningAids": [
        {
          "id": "distributed-systems-401-l01-a1",
          "type": "image",
          "title": "Guided Practice",
          "content": "Use the lesson structure, document assumptions, and validate your conclusions before final submission."
        }
      ],
      "chunks": [
        {
          "id": "distributed-systems-401-l01-c1",
          "kind": "concept",
          "title": "Language, Scope, and Boundaries",
          "content": "This lesson defines operational language, scope boundaries, and how consistency and availability and fault tolerance connect in real systems."
        },
        {
          "id": "distributed-systems-401-l01-c2",
          "kind": "concept",
          "title": "Causal Reasoning Under Constraints",
          "content": "Learners model cause-effect pathways and identify failure-prone assumptions before selecting interventions."
        },
        {
          "id": "distributed-systems-401-l01-c3",
          "kind": "recap",
          "title": "Evidence Standards",
          "content": "All claims in this module must map to observable indicators, uncertainty bounds, and review checkpoints."
        }
      ],
      "flashcards": [
        {
          "id": "distributed-systems-401-l01-f1",
          "front": "consistency and availability",
          "back": "A central decision axis in Distributed Systems requiring explicit tradeoff treatment."
        },
        {
          "id": "distributed-systems-401-l01-f2",
          "front": "fault tolerance",
          "back": "The reliability layer that determines whether plans survive real-world variability."
        },
        {
          "id": "distributed-systems-401-l01-f3",
          "front": "distributed coordination",
          "back": "The analytical process for assessing intervention quality and consequence spread."
        }
      ]
    },
    {
      "id": "distributed-systems-401-l02",
      "title": "Distributed Systems Workflow Lab",
      "type": "interactive",
      "duration": 15,
      "learningAids": [
        {
          "id": "distributed-systems-401-l02-a1",
          "type": "practice",
          "title": "Guided Practice",
          "content": "Use the lesson structure, document assumptions, and validate your conclusions before final submission."
        }
      ],
      "chunks": [
        {
          "id": "distributed-systems-401-l02-c1",
          "kind": "practice",
          "title": "Workflow Construction",
          "content": "Learners design a workflow emphasizing strategic leadership, policy and operations alignment, and capstone defense and review, then test resilience against uncertainty."
        },
        {
          "id": "distributed-systems-401-l02-c2",
          "kind": "recap",
          "title": "Readiness and Control Gates",
          "content": "Operational readiness requires owner mapping, control gates, and post-decision verification hooks."
        }
      ],
      "interactiveActivities": [
        {
          "id": "distributed-systems-401-l02-act1",
          "type": "matching_pairs",
          "title": "Control-to-Outcome Mapping",
          "description": "Match each control mechanism to its strongest expected system benefit.",
          "pairs": [
            {
              "left": "Pre-commit review gate",
              "right": "Reduces preventable defects"
            },
            {
              "left": "Rollback trigger",
              "right": "Limits blast radius during failures"
            },
            {
              "left": "Baseline dashboard",
              "right": "Supports defensible impact claims"
            },
            {
              "left": "Retrospective cycle",
              "right": "Improves future decision quality"
            }
          ]
        },
        {
          "id": "distributed-systems-401-l02-act2",
          "type": "sorting_buckets",
          "title": "Constraint Classification",
          "description": "Sort constraints into technical, policy, and stakeholder-impact buckets.",
          "buckets": [
            "Technical",
            "Policy",
            "Stakeholder Impact"
          ],
          "items": [
            {
              "text": "Service latency target",
              "bucket": "Technical"
            },
            {
              "text": "Compliance retention rule",
              "bucket": "Policy"
            },
            {
              "text": "Community trust risk",
              "bucket": "Stakeholder Impact"
            },
            {
              "text": "Incident disclosure protocol",
              "bucket": "Policy"
            }
          ]
        }
      ]
    },
    {
      "id": "distributed-systems-401-l03",
      "title": "Checkpoint 1: Concepts and Methods",
      "type": "quiz",
      "duration": 10,
      "learningAids": [
        {
          "id": "distributed-systems-401-l03-a1",
          "type": "practice",
          "title": "Guided Practice",
          "content": "Use the lesson structure, document assumptions, and validate your conclusions before final submission."
        }
      ],
      "questions": [
        {
          "id": "distributed-systems-401-l03-q1",
          "text": "Which action most improves consistency and availability quality in practice?",
          "skillId": "distributed-systems-401-skill-core",
          "options": [
            {
              "id": "a",
              "text": "Skip explicit constraints and rely on intuition"
            },
            {
              "id": "b",
              "text": "Define assumptions, monitor indicators, and test failure cases"
            },
            {
              "id": "c",
              "text": "Treat all outcomes as equivalent"
            },
            {
              "id": "d",
              "text": "Ignore uncertainty and variance"
            }
          ],
          "correctOptionId": "b",
          "explanation": "High-quality decisions require explicit assumptions and measurable stress tests."
        },
        {
          "id": "distributed-systems-401-l03-q2",
          "text": "At level 401, the strongest emphasis is:",
          "skillId": "distributed-systems-401-skill-level",
          "options": [
            {
              "id": "a",
              "text": "strategic leadership, policy and operations alignment, and capstone defense and review"
            },
            {
              "id": "b",
              "text": "Fast execution with no review loops"
            },
            {
              "id": "c",
              "text": "Single stakeholder perspective only"
            },
            {
              "id": "d",
              "text": "Outcome claims without baselines"
            }
          ],
          "correctOptionId": "a",
          "explanation": "The 401 layer is explicitly designed around strategic leadership, policy and operations alignment, and capstone defense and review."
        },
        {
          "id": "distributed-systems-401-l03-q3",
          "text": "What best strengthens fault tolerance reliability?",
          "skillId": "distributed-systems-401-skill-reliability",
          "options": [
            {
              "id": "a",
              "text": "No ownership for incident response"
            },
            {
              "id": "b",
              "text": "Clear control points, owner mapping, and escalation thresholds"
            },
            {
              "id": "c",
              "text": "Ad-hoc changes without logs"
            },
            {
              "id": "d",
              "text": "No postmortem process"
            }
          ],
          "correctOptionId": "b",
          "explanation": "Reliability improves when control, ownership, and escalation are explicit and repeatable."
        },
        {
          "id": "distributed-systems-401-l03-q4",
          "text": "When evaluating distributed coordination, which approach is most defensible?",
          "skillId": "distributed-systems-401-skill-eval",
          "options": [
            {
              "id": "a",
              "text": "Use anecdotal examples only"
            },
            {
              "id": "b",
              "text": "Compare interventions against baseline and monitor side effects"
            },
            {
              "id": "c",
              "text": "Remove difficult scenarios from evaluation"
            },
            {
              "id": "d",
              "text": "Change target definitions after results are known"
            }
          ],
          "correctOptionId": "b",
          "explanation": "Baseline comparison and side-effect monitoring reduce overclaiming and hidden risk."
        },
        {
          "id": "distributed-systems-401-l03-q5",
          "text": "A mature observability and operations model should include:",
          "skillId": "distributed-systems-401-skill-governance",
          "options": [
            {
              "id": "a",
              "text": "One-time review with no corrective pathway"
            },
            {
              "id": "b",
              "text": "Policy links, measurable thresholds, and remediation triggers"
            },
            {
              "id": "c",
              "text": "No public or stakeholder transparency"
            },
            {
              "id": "d",
              "text": "Unbounded discretion without guardrails"
            }
          ],
          "correctOptionId": "b",
          "explanation": "Mature governance connects policy goals to measurable thresholds and corrective pathways."
        }
      ]
    },
    {
      "id": "distributed-systems-401-l04",
      "title": "Distributed Systems Case Analysis",
      "type": "video",
      "duration": 14,
      "learningAids": [
        {
          "id": "distributed-systems-401-l04-a1",
          "type": "mnemonic",
          "title": "Guided Practice",
          "content": "Use the lesson structure, document assumptions, and validate your conclusions before final submission."
        }
      ],
      "chunks": [
        {
          "id": "distributed-systems-401-l04-c1",
          "kind": "example",
          "title": "Case Context and Stakes",
          "content": "Case focus: a global service experiencing partial outages, stale reads, and recovery pressure under traffic spikes. Learners map decision stakes and identify non-obvious risks."
        },
        {
          "id": "distributed-systems-401-l04-c2",
          "kind": "concept",
          "title": "Tradeoff Matrix Construction",
          "content": "Interventions are compared across effectiveness, reliability, equity, and implementation feasibility."
        },
        {
          "id": "distributed-systems-401-l04-c3",
          "kind": "recap",
          "title": "Failure Lessons and Recovery",
          "content": "The lesson converts failure signatures into safeguards, response playbooks, and monitoring updates."
        }
      ],
      "flashcards": [
        {
          "id": "distributed-systems-401-l04-f1",
          "front": "Tradeoff matrix",
          "back": "A structured comparison of options under conflicting priorities."
        },
        {
          "id": "distributed-systems-401-l04-f2",
          "front": "Failure signature",
          "back": "A recurring observable pattern indicating a class of system risk."
        },
        {
          "id": "distributed-systems-401-l04-f3",
          "front": "Recovery playbook",
          "back": "A documented sequence for safe and timely response during adverse events."
        }
      ]
    },
    {
      "id": "distributed-systems-401-l05",
      "title": "Distributed Systems Simulation Studio",
      "type": "interactive",
      "duration": 16,
      "learningAids": [
        {
          "id": "distributed-systems-401-l05-a1",
          "type": "practice",
          "title": "Guided Practice",
          "content": "Use the lesson structure, document assumptions, and validate your conclusions before final submission."
        }
      ],
      "chunks": [
        {
          "id": "distributed-systems-401-l05-c1",
          "kind": "practice",
          "title": "Scenario Simulation Setup",
          "content": "Learners configure interventions, define uncertainty parameters, and set measurable success thresholds."
        },
        {
          "id": "distributed-systems-401-l05-c2",
          "kind": "recap",
          "title": "Simulation Debrief",
          "content": "After each run, results are reviewed for expected gains, side effects, and governance compliance."
        }
      ],
      "interactiveActivities": [
        {
          "id": "distributed-systems-401-l05-act1",
          "type": "scenario_practice",
          "title": "Intervention Simulation",
          "description": "Compare three intervention paths and justify which best advances consistency and availability and observability and operations.",
          "instructions": [
            "Define objective and guardrails before selecting interventions.",
            "Record one near-term and one long-term tradeoff for each option.",
            "Select metrics that confirm or falsify your choice."
          ]
        },
        {
          "id": "distributed-systems-401-l05-act2",
          "type": "matching_pairs",
          "title": "Mitigation Alignment",
          "description": "Match each risk condition with the strongest mitigation response.",
          "pairs": [
            {
              "left": "Ambiguous ownership",
              "right": "Create explicit role and escalation map"
            },
            {
              "left": "Weak signal quality",
              "right": "Strengthen intake validation and quality checks"
            },
            {
              "left": "Policy drift",
              "right": "Re-anchor controls to documented standards"
            },
            {
              "left": "Stakeholder backlash",
              "right": "Increase transparency and two-way communication"
            }
          ]
        }
      ]
    },
    {
      "id": "distributed-systems-401-l06",
      "title": "Checkpoint 2: Systems Decisions",
      "type": "quiz",
      "duration": 10,
      "learningAids": [
        {
          "id": "distributed-systems-401-l06-a1",
          "type": "practice",
          "title": "Guided Practice",
          "content": "Use the lesson structure, document assumptions, and validate your conclusions before final submission."
        }
      ],
      "questions": [
        {
          "id": "distributed-systems-401-l06-q1",
          "text": "Which action most improves consistency and availability quality in practice?",
          "skillId": "distributed-systems-401-skill-core",
          "options": [
            {
              "id": "a",
              "text": "Skip explicit constraints and rely on intuition"
            },
            {
              "id": "b",
              "text": "Define assumptions, monitor indicators, and test failure cases"
            },
            {
              "id": "c",
              "text": "Treat all outcomes as equivalent"
            },
            {
              "id": "d",
              "text": "Ignore uncertainty and variance"
            }
          ],
          "correctOptionId": "b",
          "explanation": "High-quality decisions require explicit assumptions and measurable stress tests."
        },
        {
          "id": "distributed-systems-401-l06-q2",
          "text": "At level 401, the strongest emphasis is:",
          "skillId": "distributed-systems-401-skill-level",
          "options": [
            {
              "id": "a",
              "text": "strategic leadership, policy and operations alignment, and capstone defense and review"
            },
            {
              "id": "b",
              "text": "Fast execution with no review loops"
            },
            {
              "id": "c",
              "text": "Single stakeholder perspective only"
            },
            {
              "id": "d",
              "text": "Outcome claims without baselines"
            }
          ],
          "correctOptionId": "a",
          "explanation": "The 401 layer is explicitly designed around strategic leadership, policy and operations alignment, and capstone defense and review."
        },
        {
          "id": "distributed-systems-401-l06-q3",
          "text": "What best strengthens fault tolerance reliability?",
          "skillId": "distributed-systems-401-skill-reliability",
          "options": [
            {
              "id": "a",
              "text": "No ownership for incident response"
            },
            {
              "id": "b",
              "text": "Clear control points, owner mapping, and escalation thresholds"
            },
            {
              "id": "c",
              "text": "Ad-hoc changes without logs"
            },
            {
              "id": "d",
              "text": "No postmortem process"
            }
          ],
          "correctOptionId": "b",
          "explanation": "Reliability improves when control, ownership, and escalation are explicit and repeatable."
        },
        {
          "id": "distributed-systems-401-l06-q4",
          "text": "When evaluating distributed coordination, which approach is most defensible?",
          "skillId": "distributed-systems-401-skill-eval",
          "options": [
            {
              "id": "a",
              "text": "Use anecdotal examples only"
            },
            {
              "id": "b",
              "text": "Compare interventions against baseline and monitor side effects"
            },
            {
              "id": "c",
              "text": "Remove difficult scenarios from evaluation"
            },
            {
              "id": "d",
              "text": "Change target definitions after results are known"
            }
          ],
          "correctOptionId": "b",
          "explanation": "Baseline comparison and side-effect monitoring reduce overclaiming and hidden risk."
        },
        {
          "id": "distributed-systems-401-l06-q5",
          "text": "A mature observability and operations model should include:",
          "skillId": "distributed-systems-401-skill-governance",
          "options": [
            {
              "id": "a",
              "text": "One-time review with no corrective pathway"
            },
            {
              "id": "b",
              "text": "Policy links, measurable thresholds, and remediation triggers"
            },
            {
              "id": "c",
              "text": "No public or stakeholder transparency"
            },
            {
              "id": "d",
              "text": "Unbounded discretion without guardrails"
            }
          ],
          "correctOptionId": "b",
          "explanation": "Mature governance connects policy goals to measurable thresholds and corrective pathways."
        }
      ]
    },
    {
      "id": "distributed-systems-401-l07",
      "title": "Distributed Systems Ethics and Policy Integration",
      "type": "video",
      "duration": 12,
      "learningAids": [
        {
          "id": "distributed-systems-401-l07-a1",
          "type": "image",
          "title": "Guided Practice",
          "content": "Use the lesson structure, document assumptions, and validate your conclusions before final submission."
        }
      ],
      "chunks": [
        {
          "id": "distributed-systems-401-l07-c1",
          "kind": "concept",
          "title": "Stakeholder Impact Mapping",
          "content": "This lesson identifies impact distribution, especially where benefits and burdens diverge across groups."
        },
        {
          "id": "distributed-systems-401-l07-c2",
          "kind": "concept",
          "title": "Accountability Architecture",
          "content": "Accountability requires clear decision traceability, review rights, and remediation standards."
        },
        {
          "id": "distributed-systems-401-l07-c3",
          "kind": "recap",
          "title": "Responsible Execution Checklist",
          "content": "A final checklist combines policy, ethics, technical reliability, and stakeholder trust criteria."
        }
      ],
      "flashcards": [
        {
          "id": "distributed-systems-401-l07-f1",
          "front": "Impact distribution",
          "back": "How benefits and harms are allocated across stakeholders."
        },
        {
          "id": "distributed-systems-401-l07-f2",
          "front": "Decision traceability",
          "back": "The ability to explain why a decision was made, by whom, and with what evidence."
        },
        {
          "id": "distributed-systems-401-l07-f3",
          "front": "Responsible execution",
          "back": "A delivery mode that combines effectiveness, fairness, and corrective capacity."
        }
      ]
    },
    {
      "id": "distributed-systems-401-l08",
      "title": "Distributed Systems Capstone Planning Lab",
      "type": "interactive",
      "duration": 15,
      "learningAids": [
        {
          "id": "distributed-systems-401-l08-a1",
          "type": "practice",
          "title": "Guided Practice",
          "content": "Use the lesson structure, document assumptions, and validate your conclusions before final submission."
        }
      ],
      "chunks": [
        {
          "id": "distributed-systems-401-l08-c1",
          "kind": "practice",
          "title": "Capstone Charter Drafting",
          "content": "Learners draft capstone scope, constraints, metrics, and governance checkpoints in one decision charter."
        },
        {
          "id": "distributed-systems-401-l08-c2",
          "kind": "recap",
          "title": "Defense Readiness",
          "content": "Final preparation focuses on evidence-backed justification and robust response to critical review."
        }
      ],
      "interactiveActivities": [
        {
          "id": "distributed-systems-401-l08-act1",
          "type": "project_builder",
          "title": "Capstone Charter Builder",
          "description": "Build a capstone charter with measurable objectives, risks, and remediation plans.",
          "instructions": [
            "State objective and boundary conditions.",
            "Define at least three measurable success indicators.",
            "Document a governance escalation pathway for critical failures."
          ]
        },
        {
          "id": "distributed-systems-401-l08-act2",
          "type": "debate_simulator",
          "title": "Decision Defense Panel",
          "description": "Defend your capstone approach against technical, policy, and stakeholder critiques."
        }
      ]
    }
  ]
};
