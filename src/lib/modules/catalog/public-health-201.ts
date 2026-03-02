import type { LearningModule } from "@/lib/modules/types";

export const PublicHealth201Module: LearningModule = {
  "id": "public-health-201",
  "title": "Public Health Applied Practice",
  "description": "Level 201 curriculum in Public Health, focused on population health metrics, epidemiologic reasoning, prevention strategy, and health equity governance through case-driven analysis, simulations, and assessment-backed mastery.",
  "subject": "Health Science",
  "tags": [
    "core",
    "curriculum",
    "interactive",
    "health",
    "policy"
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
    "Apply population health metrics with explicit assumptions and tradeoff framing",
    "Build repeatable workflows for epidemiologic reasoning under realistic constraints",
    "Evaluate prevention strategy decisions with baseline and side-effect analysis",
    "Strengthen health equity governance with transparent policies and escalation pathways",
    "Communicate evidence and uncertainty to mixed stakeholder groups",
    "Produce defensible recommendations that survive critical review"
  ],
  "lessons": [
    {
      "id": "public-health-201-l01",
      "title": "Public Health Core Foundations",
      "type": "video",
      "duration": 13,
      "learningAids": [
        {
          "id": "public-health-201-l01-a1",
          "type": "image",
          "title": "Guided Practice",
          "content": "Use the lesson structure, document assumptions, and validate your conclusions before final submission."
        }
      ],
      "chunks": [
        {
          "id": "public-health-201-l01-c1",
          "kind": "concept",
          "title": "Language, Scope, and Boundaries",
          "content": "This lesson defines operational language, scope boundaries, and how population health metrics and epidemiologic reasoning connect in real systems."
        },
        {
          "id": "public-health-201-l01-c2",
          "kind": "concept",
          "title": "Causal Reasoning Under Constraints",
          "content": "Learners model cause-effect pathways and identify failure-prone assumptions before selecting interventions."
        },
        {
          "id": "public-health-201-l01-c3",
          "kind": "recap",
          "title": "Evidence Standards",
          "content": "All claims in this module must map to observable indicators, uncertainty bounds, and review checkpoints."
        }
      ],
      "flashcards": [
        {
          "id": "public-health-201-l01-f1",
          "front": "population health metrics",
          "back": "A central decision axis in Public Health requiring explicit tradeoff treatment."
        },
        {
          "id": "public-health-201-l01-f2",
          "front": "epidemiologic reasoning",
          "back": "The reliability layer that determines whether plans survive real-world variability."
        },
        {
          "id": "public-health-201-l01-f3",
          "front": "prevention strategy",
          "back": "The analytical process for assessing intervention quality and consequence spread."
        }
      ]
    },
    {
      "id": "public-health-201-l02",
      "title": "Public Health Workflow Lab",
      "type": "interactive",
      "duration": 15,
      "learningAids": [
        {
          "id": "public-health-201-l02-a1",
          "type": "practice",
          "title": "Guided Practice",
          "content": "Use the lesson structure, document assumptions, and validate your conclusions before final submission."
        }
      ],
      "chunks": [
        {
          "id": "public-health-201-l02-c1",
          "kind": "practice",
          "title": "Workflow Construction",
          "content": "Learners design a workflow emphasizing method execution, structured workflow practice, and evidence-based interpretation, then test resilience against uncertainty."
        },
        {
          "id": "public-health-201-l02-c2",
          "kind": "recap",
          "title": "Readiness and Control Gates",
          "content": "Operational readiness requires owner mapping, control gates, and post-decision verification hooks."
        }
      ],
      "interactiveActivities": [
        {
          "id": "public-health-201-l02-act1",
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
          "id": "public-health-201-l02-act2",
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
      "id": "public-health-201-l03",
      "title": "Checkpoint 1: Concepts and Methods",
      "type": "quiz",
      "duration": 10,
      "learningAids": [
        {
          "id": "public-health-201-l03-a1",
          "type": "practice",
          "title": "Guided Practice",
          "content": "Use the lesson structure, document assumptions, and validate your conclusions before final submission."
        }
      ],
      "questions": [
        {
          "id": "public-health-201-l03-q1",
          "text": "Which action most improves population health metrics quality in practice?",
          "skillId": "public-health-201-skill-core",
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
          "id": "public-health-201-l03-q2",
          "text": "At level 201, the strongest emphasis is:",
          "skillId": "public-health-201-skill-level",
          "options": [
            {
              "id": "a",
              "text": "method execution, structured workflow practice, and evidence-based interpretation"
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
          "explanation": "The 201 layer is explicitly designed around method execution, structured workflow practice, and evidence-based interpretation."
        },
        {
          "id": "public-health-201-l03-q3",
          "text": "What best strengthens epidemiologic reasoning reliability?",
          "skillId": "public-health-201-skill-reliability",
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
          "id": "public-health-201-l03-q4",
          "text": "When evaluating prevention strategy, which approach is most defensible?",
          "skillId": "public-health-201-skill-eval",
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
          "id": "public-health-201-l03-q5",
          "text": "A mature health equity governance model should include:",
          "skillId": "public-health-201-skill-governance",
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
      "id": "public-health-201-l04",
      "title": "Public Health Case Analysis",
      "type": "video",
      "duration": 14,
      "learningAids": [
        {
          "id": "public-health-201-l04-a1",
          "type": "mnemonic",
          "title": "Guided Practice",
          "content": "Use the lesson structure, document assumptions, and validate your conclusions before final submission."
        }
      ],
      "chunks": [
        {
          "id": "public-health-201-l04-c1",
          "kind": "example",
          "title": "Case Context and Stakes",
          "content": "Case focus: a regional outbreak response balancing surveillance, communication, and intervention resources. Learners map decision stakes and identify non-obvious risks."
        },
        {
          "id": "public-health-201-l04-c2",
          "kind": "concept",
          "title": "Tradeoff Matrix Construction",
          "content": "Interventions are compared across effectiveness, reliability, equity, and implementation feasibility."
        },
        {
          "id": "public-health-201-l04-c3",
          "kind": "recap",
          "title": "Failure Lessons and Recovery",
          "content": "The lesson converts failure signatures into safeguards, response playbooks, and monitoring updates."
        }
      ],
      "flashcards": [
        {
          "id": "public-health-201-l04-f1",
          "front": "Tradeoff matrix",
          "back": "A structured comparison of options under conflicting priorities."
        },
        {
          "id": "public-health-201-l04-f2",
          "front": "Failure signature",
          "back": "A recurring observable pattern indicating a class of system risk."
        },
        {
          "id": "public-health-201-l04-f3",
          "front": "Recovery playbook",
          "back": "A documented sequence for safe and timely response during adverse events."
        }
      ]
    },
    {
      "id": "public-health-201-l05",
      "title": "Public Health Simulation Studio",
      "type": "interactive",
      "duration": 16,
      "learningAids": [
        {
          "id": "public-health-201-l05-a1",
          "type": "practice",
          "title": "Guided Practice",
          "content": "Use the lesson structure, document assumptions, and validate your conclusions before final submission."
        }
      ],
      "chunks": [
        {
          "id": "public-health-201-l05-c1",
          "kind": "practice",
          "title": "Scenario Simulation Setup",
          "content": "Learners configure interventions, define uncertainty parameters, and set measurable success thresholds."
        },
        {
          "id": "public-health-201-l05-c2",
          "kind": "recap",
          "title": "Simulation Debrief",
          "content": "After each run, results are reviewed for expected gains, side effects, and governance compliance."
        }
      ],
      "interactiveActivities": [
        {
          "id": "public-health-201-l05-act1",
          "type": "scenario_practice",
          "title": "Intervention Simulation",
          "description": "Compare three intervention paths and justify which best advances population health metrics and health equity governance.",
          "instructions": [
            "Define objective and guardrails before selecting interventions.",
            "Record one near-term and one long-term tradeoff for each option.",
            "Select metrics that confirm or falsify your choice."
          ]
        },
        {
          "id": "public-health-201-l05-act2",
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
      "id": "public-health-201-l06",
      "title": "Checkpoint 2: Systems Decisions",
      "type": "quiz",
      "duration": 10,
      "learningAids": [
        {
          "id": "public-health-201-l06-a1",
          "type": "practice",
          "title": "Guided Practice",
          "content": "Use the lesson structure, document assumptions, and validate your conclusions before final submission."
        }
      ],
      "questions": [
        {
          "id": "public-health-201-l06-q1",
          "text": "Which action most improves population health metrics quality in practice?",
          "skillId": "public-health-201-skill-core",
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
          "id": "public-health-201-l06-q2",
          "text": "At level 201, the strongest emphasis is:",
          "skillId": "public-health-201-skill-level",
          "options": [
            {
              "id": "a",
              "text": "method execution, structured workflow practice, and evidence-based interpretation"
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
          "explanation": "The 201 layer is explicitly designed around method execution, structured workflow practice, and evidence-based interpretation."
        },
        {
          "id": "public-health-201-l06-q3",
          "text": "What best strengthens epidemiologic reasoning reliability?",
          "skillId": "public-health-201-skill-reliability",
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
          "id": "public-health-201-l06-q4",
          "text": "When evaluating prevention strategy, which approach is most defensible?",
          "skillId": "public-health-201-skill-eval",
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
          "id": "public-health-201-l06-q5",
          "text": "A mature health equity governance model should include:",
          "skillId": "public-health-201-skill-governance",
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
      "id": "public-health-201-l07",
      "title": "Public Health Ethics and Policy Integration",
      "type": "video",
      "duration": 12,
      "learningAids": [
        {
          "id": "public-health-201-l07-a1",
          "type": "image",
          "title": "Guided Practice",
          "content": "Use the lesson structure, document assumptions, and validate your conclusions before final submission."
        }
      ],
      "chunks": [
        {
          "id": "public-health-201-l07-c1",
          "kind": "concept",
          "title": "Stakeholder Impact Mapping",
          "content": "This lesson identifies impact distribution, especially where benefits and burdens diverge across groups."
        },
        {
          "id": "public-health-201-l07-c2",
          "kind": "concept",
          "title": "Accountability Architecture",
          "content": "Accountability requires clear decision traceability, review rights, and remediation standards."
        },
        {
          "id": "public-health-201-l07-c3",
          "kind": "recap",
          "title": "Responsible Execution Checklist",
          "content": "A final checklist combines policy, ethics, technical reliability, and stakeholder trust criteria."
        }
      ],
      "flashcards": [
        {
          "id": "public-health-201-l07-f1",
          "front": "Impact distribution",
          "back": "How benefits and harms are allocated across stakeholders."
        },
        {
          "id": "public-health-201-l07-f2",
          "front": "Decision traceability",
          "back": "The ability to explain why a decision was made, by whom, and with what evidence."
        },
        {
          "id": "public-health-201-l07-f3",
          "front": "Responsible execution",
          "back": "A delivery mode that combines effectiveness, fairness, and corrective capacity."
        }
      ]
    },
    {
      "id": "public-health-201-l08",
      "title": "Public Health Capstone Planning Lab",
      "type": "interactive",
      "duration": 15,
      "learningAids": [
        {
          "id": "public-health-201-l08-a1",
          "type": "practice",
          "title": "Guided Practice",
          "content": "Use the lesson structure, document assumptions, and validate your conclusions before final submission."
        }
      ],
      "chunks": [
        {
          "id": "public-health-201-l08-c1",
          "kind": "practice",
          "title": "Capstone Charter Drafting",
          "content": "Learners draft capstone scope, constraints, metrics, and governance checkpoints in one decision charter."
        },
        {
          "id": "public-health-201-l08-c2",
          "kind": "recap",
          "title": "Defense Readiness",
          "content": "Final preparation focuses on evidence-backed justification and robust response to critical review."
        }
      ],
      "interactiveActivities": [
        {
          "id": "public-health-201-l08-act1",
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
          "id": "public-health-201-l08-act2",
          "type": "debate_simulator",
          "title": "Decision Defense Panel",
          "description": "Defend your capstone approach against technical, policy, and stakeholder critiques."
        }
      ]
    }
  ]
};
