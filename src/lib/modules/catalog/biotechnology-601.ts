import type { LearningModule } from "@/lib/modules/types";

export const Biotechnology601Module: LearningModule = {
  "id": "biotechnology-601",
  "title": "Biotechnology Research and Leadership",
  "description": "Post-401 specialization in Biotechnology, focused on bioprocess optimization, translational validation, regulatory quality systems, and bioethics governance through advanced casework, simulation, and capstone-level defense.",
  "subject": "Biotechnology",
  "tags": [
    "core",
    "curriculum",
    "interactive",
    "life-sciences",
    "biotech"
  ],
  "minAge": 17,
  "maxAge": 99,
  "version": "2.0.0",
  "difficultyBand": "advanced",
  "localeSupport": [
    "en"
  ],
  "learningObjectives": [
    "Apply advanced methods for bioprocess optimization in high-constraint environments",
    "Engineer repeatable workflows that improve translational validation under uncertainty",
    "Evaluate interventions in regulatory quality systems with research-grade evidence standards",
    "Operationalize bioethics governance with transparent accountability and remediation loops",
    "Lead cross-functional decision reviews with clear tradeoff reasoning",
    "Deliver capstone-quality artifacts that withstand expert critique"
  ],
  "lessons": [
    {
      "id": "biotechnology-601-l01",
      "title": "Biotechnology Advanced Foundations",
      "type": "video",
      "duration": 14,
      "learningAids": [
        {
          "id": "biotechnology-601-l01-a1",
          "type": "image",
          "title": "Guided Practice",
          "content": "Use a structured method, log assumptions, and verify conclusions against constraints and metrics."
        }
      ],
      "chunks": [
        {
          "id": "biotechnology-601-l01-c1",
          "kind": "concept",
          "title": "Advanced Scope and Decision Boundaries",
          "content": "This lesson defines advanced boundaries for Biotechnology, framing how bioprocess optimization and translational validation interact across complex systems."
        },
        {
          "id": "biotechnology-601-l01-c2",
          "kind": "concept",
          "title": "Causal Structure Under Uncertainty",
          "content": "Learners model causal pathways, uncertainty ranges, and hidden assumptions before intervention design."
        },
        {
          "id": "biotechnology-601-l01-c3",
          "kind": "recap",
          "title": "Evidence and Rigor Standards",
          "content": "All advanced claims are tied to measurable indicators, confidence bounds, and review checkpoints."
        }
      ],
      "flashcards": [
        {
          "id": "biotechnology-601-l01-f1",
          "front": "bioprocess optimization",
          "back": "A specialization axis in Biotechnology requiring explicit assumptions and measured tradeoff choices."
        },
        {
          "id": "biotechnology-601-l01-f2",
          "front": "translational validation",
          "back": "Operational design capability that governs whether complex workflows remain reliable."
        },
        {
          "id": "biotechnology-601-l01-f3",
          "front": "regulatory quality systems",
          "back": "Evaluation practice for validating outcomes beyond headline metrics."
        }
      ]
    },
    {
      "id": "biotechnology-601-l02",
      "title": "Biotechnology Specialist Methods Lab",
      "type": "interactive",
      "duration": 17,
      "learningAids": [
        {
          "id": "biotechnology-601-l02-a1",
          "type": "practice",
          "title": "Guided Practice",
          "content": "Use a structured method, log assumptions, and verify conclusions against constraints and metrics."
        }
      ],
      "chunks": [
        {
          "id": "biotechnology-601-l02-c1",
          "kind": "practice",
          "title": "Method Sequence and Stress Test",
          "content": "Learners build a specialist workflow emphasizing research-grade reasoning, leadership decision quality, and publishable capstone defense, then test it against adversarial or edge-case conditions."
        },
        {
          "id": "biotechnology-601-l02-c2",
          "kind": "recap",
          "title": "Controls and Failure Gates",
          "content": "Robust specialist workflows require control gates, rollback criteria, and accountability checkpoints."
        }
      ],
      "interactiveActivities": [
        {
          "id": "biotechnology-601-l02-act1",
          "type": "matching_pairs",
          "title": "Control-to-Outcome Mapping",
          "description": "Match advanced controls with the strongest expected system effect.",
          "pairs": [
            {
              "left": "Pre-commit review gate",
              "right": "Prevents avoidable downstream defects"
            },
            {
              "left": "Rollback threshold",
              "right": "Contains impact quickly when failures emerge"
            },
            {
              "left": "Baseline monitoring",
              "right": "Enables defensible impact attribution"
            },
            {
              "left": "Retrospective cycle",
              "right": "Improves next-iteration design quality"
            }
          ]
        },
        {
          "id": "biotechnology-601-l02-act2",
          "type": "sorting_buckets",
          "title": "Advanced Constraint Classification",
          "description": "Sort constraints into technical, governance, and stakeholder-impact categories.",
          "buckets": [
            "Technical",
            "Governance",
            "Stakeholder Impact"
          ],
          "items": [
            {
              "text": "Latency budget violation",
              "bucket": "Technical"
            },
            {
              "text": "Audit traceability requirement",
              "bucket": "Governance"
            },
            {
              "text": "Trust and adoption decline",
              "bucket": "Stakeholder Impact"
            },
            {
              "text": "Escalation policy noncompliance",
              "bucket": "Governance"
            }
          ]
        }
      ]
    },
    {
      "id": "biotechnology-601-l03",
      "title": "Checkpoint 1: Specialist Methods",
      "type": "quiz",
      "duration": 11,
      "learningAids": [
        {
          "id": "biotechnology-601-l03-a1",
          "type": "practice",
          "title": "Guided Practice",
          "content": "Use a structured method, log assumptions, and verify conclusions against constraints and metrics."
        }
      ],
      "questions": [
        {
          "id": "biotechnology-601-l03-q1",
          "text": "Which practice most improves specialist performance in bioprocess optimization?",
          "skillId": "biotechnology-601-skill-specialist",
          "options": [
            {
              "id": "a",
              "text": "Rely on undocumented assumptions"
            },
            {
              "id": "b",
              "text": "Define constraints, monitor leading indicators, and test edge cases"
            },
            {
              "id": "c",
              "text": "Avoid post-decision review"
            },
            {
              "id": "d",
              "text": "Optimize only for speed"
            }
          ],
          "correctOptionId": "b",
          "explanation": "Advanced performance depends on explicit constraints, monitoring, and stress testing."
        },
        {
          "id": "biotechnology-601-l03-q2",
          "text": "At level 601, the curriculum emphasizes:",
          "skillId": "biotechnology-601-skill-level",
          "options": [
            {
              "id": "a",
              "text": "research-grade reasoning, leadership decision quality, and publishable capstone defense"
            },
            {
              "id": "b",
              "text": "Unbounded iteration with no controls"
            },
            {
              "id": "c",
              "text": "Single-metric decision making"
            },
            {
              "id": "d",
              "text": "No uncertainty communication"
            }
          ],
          "correctOptionId": "a",
          "explanation": "The 601 design is built around research-grade reasoning, leadership decision quality, and publishable capstone defense."
        },
        {
          "id": "biotechnology-601-l03-q3",
          "text": "What best strengthens translational validation execution quality?",
          "skillId": "biotechnology-601-skill-execution",
          "options": [
            {
              "id": "a",
              "text": "No owner mapping or escalation path"
            },
            {
              "id": "b",
              "text": "Explicit ownership, checkpoints, and governance thresholds"
            },
            {
              "id": "c",
              "text": "Ad-hoc process changes without logs"
            },
            {
              "id": "d",
              "text": "Skipping retrospective review"
            }
          ],
          "correctOptionId": "b",
          "explanation": "Quality execution needs ownership clarity, checkpoints, and threshold-driven governance."
        },
        {
          "id": "biotechnology-601-l03-q4",
          "text": "A rigorous approach to regulatory quality systems should include:",
          "skillId": "biotechnology-601-skill-evaluation",
          "options": [
            {
              "id": "a",
              "text": "Outcome claims without baselines"
            },
            {
              "id": "b",
              "text": "Baseline comparison, side-effect checks, and uncertainty bounds"
            },
            {
              "id": "c",
              "text": "Removal of difficult scenarios"
            },
            {
              "id": "d",
              "text": "Changing criteria after seeing results"
            }
          ],
          "correctOptionId": "b",
          "explanation": "Baselines, side-effect checks, and uncertainty disclosure make results defensible."
        },
        {
          "id": "biotechnology-601-l03-q5",
          "text": "A mature bioethics governance system should connect:",
          "skillId": "biotechnology-601-skill-governance",
          "options": [
            {
              "id": "a",
              "text": "Policy and practice without measurement"
            },
            {
              "id": "b",
              "text": "Policy, measurable thresholds, and remediation pathways"
            },
            {
              "id": "c",
              "text": "Technical delivery with no accountability"
            },
            {
              "id": "d",
              "text": "Performance targets with no risk controls"
            }
          ],
          "correctOptionId": "b",
          "explanation": "Governance quality comes from linking policy intent to measurable controls and action."
        },
        {
          "id": "biotechnology-601-l03-q6",
          "text": "In high-stakes Biotechnology Research and Leadership execution, which communication protocol is strongest?",
          "skillId": "biotechnology-601-skill-advanced-6",
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
          "id": "biotechnology-601-l03-q7",
          "text": "A mature remediation loop in advanced Biotechnology should prioritize:",
          "skillId": "biotechnology-601-skill-advanced-7",
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
          "id": "biotechnology-601-l03-q8",
          "text": "Which portfolio decision rule best balances performance and resilience in Biotechnology Research and Leadership?",
          "skillId": "biotechnology-601-skill-advanced-8",
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
      "id": "biotechnology-601-l04",
      "title": "Biotechnology Advanced Case Analysis",
      "type": "video",
      "duration": 14,
      "learningAids": [
        {
          "id": "biotechnology-601-l04-a1",
          "type": "mnemonic",
          "title": "Guided Practice",
          "content": "Use a structured method, log assumptions, and verify conclusions against constraints and metrics."
        }
      ],
      "chunks": [
        {
          "id": "biotechnology-601-l04-c1",
          "kind": "example",
          "title": "Case Stakes and Competing Objectives",
          "content": "Case focus: a therapeutic biotechnology program moving from lab-stage results to clinical and regulatory milestones. Learners map strategic objectives, failure risks, and governance constraints before action."
        },
        {
          "id": "biotechnology-601-l04-c2",
          "kind": "concept",
          "title": "Tradeoff Matrix and Option Scoring",
          "content": "Options are scored across effectiveness, reliability, equity, feasibility, and long-term maintainability."
        },
        {
          "id": "biotechnology-601-l04-c3",
          "kind": "recap",
          "title": "Recovery and Adaptation Design",
          "content": "Failure signatures are translated into safeguards, response playbooks, and measurable adaptation loops."
        }
      ],
      "flashcards": [
        {
          "id": "biotechnology-601-l04-f1",
          "front": "Tradeoff matrix",
          "back": "A scoring framework for choosing among competing options under real constraints."
        },
        {
          "id": "biotechnology-601-l04-f2",
          "front": "Failure signature",
          "back": "A recurrent signal indicating a predictable class of breakdown risk."
        },
        {
          "id": "biotechnology-601-l04-f3",
          "front": "Adaptation loop",
          "back": "A measured process for converting incident learning into improved future behavior."
        }
      ]
    },
    {
      "id": "biotechnology-601-l05",
      "title": "Biotechnology Simulation and Response Studio",
      "type": "interactive",
      "duration": 17,
      "learningAids": [
        {
          "id": "biotechnology-601-l05-a1",
          "type": "practice",
          "title": "Guided Practice",
          "content": "Use a structured method, log assumptions, and verify conclusions against constraints and metrics."
        }
      ],
      "chunks": [
        {
          "id": "biotechnology-601-l05-c1",
          "kind": "practice",
          "title": "Scenario Modeling",
          "content": "Learners configure simulation assumptions, thresholds, and intervention pathways under high-stakes conditions."
        },
        {
          "id": "biotechnology-601-l05-c2",
          "kind": "recap",
          "title": "Debrief and Decision Quality Review",
          "content": "After each run, teams review target attainment, side effects, and governance compliance gaps."
        }
      ],
      "interactiveActivities": [
        {
          "id": "biotechnology-601-l05-act1",
          "type": "scenario_practice",
          "title": "High-Stakes Intervention Simulation",
          "description": "Compare three advanced interventions and justify which best improves bioprocess optimization and bioethics governance.",
          "instructions": [
            "Define objective, constraints, and escalation triggers.",
            "Record near-term and long-term tradeoffs for each intervention.",
            "Select the metric set that confirms or falsifies your chosen approach."
          ]
        },
        {
          "id": "biotechnology-601-l05-act2",
          "type": "matching_pairs",
          "title": "Mitigation Alignment",
          "description": "Match advanced risk scenarios with the strongest mitigation actions.",
          "pairs": [
            {
              "left": "Ambiguous ownership chain",
              "right": "Define accountable owner map and escalation rights"
            },
            {
              "left": "Weak measurement signal",
              "right": "Strengthen baseline instrumentation and quality checks"
            },
            {
              "left": "Policy-execution drift",
              "right": "Re-align controls to explicit governance standards"
            },
            {
              "left": "Stakeholder trust erosion",
              "right": "Increase transparency and corrective feedback cadence"
            }
          ]
        }
      ]
    },
    {
      "id": "biotechnology-601-l06",
      "title": "Checkpoint 2: Research and Systems Decisions",
      "type": "quiz",
      "duration": 11,
      "learningAids": [
        {
          "id": "biotechnology-601-l06-a1",
          "type": "practice",
          "title": "Guided Practice",
          "content": "Use a structured method, log assumptions, and verify conclusions against constraints and metrics."
        }
      ],
      "questions": [
        {
          "id": "biotechnology-601-l06-q1",
          "text": "Which practice most improves specialist performance in bioprocess optimization?",
          "skillId": "biotechnology-601-skill-specialist",
          "options": [
            {
              "id": "a",
              "text": "Rely on undocumented assumptions"
            },
            {
              "id": "b",
              "text": "Define constraints, monitor leading indicators, and test edge cases"
            },
            {
              "id": "c",
              "text": "Avoid post-decision review"
            },
            {
              "id": "d",
              "text": "Optimize only for speed"
            }
          ],
          "correctOptionId": "b",
          "explanation": "Advanced performance depends on explicit constraints, monitoring, and stress testing."
        },
        {
          "id": "biotechnology-601-l06-q2",
          "text": "At level 601, the curriculum emphasizes:",
          "skillId": "biotechnology-601-skill-level",
          "options": [
            {
              "id": "a",
              "text": "research-grade reasoning, leadership decision quality, and publishable capstone defense"
            },
            {
              "id": "b",
              "text": "Unbounded iteration with no controls"
            },
            {
              "id": "c",
              "text": "Single-metric decision making"
            },
            {
              "id": "d",
              "text": "No uncertainty communication"
            }
          ],
          "correctOptionId": "a",
          "explanation": "The 601 design is built around research-grade reasoning, leadership decision quality, and publishable capstone defense."
        },
        {
          "id": "biotechnology-601-l06-q3",
          "text": "What best strengthens translational validation execution quality?",
          "skillId": "biotechnology-601-skill-execution",
          "options": [
            {
              "id": "a",
              "text": "No owner mapping or escalation path"
            },
            {
              "id": "b",
              "text": "Explicit ownership, checkpoints, and governance thresholds"
            },
            {
              "id": "c",
              "text": "Ad-hoc process changes without logs"
            },
            {
              "id": "d",
              "text": "Skipping retrospective review"
            }
          ],
          "correctOptionId": "b",
          "explanation": "Quality execution needs ownership clarity, checkpoints, and threshold-driven governance."
        },
        {
          "id": "biotechnology-601-l06-q4",
          "text": "A rigorous approach to regulatory quality systems should include:",
          "skillId": "biotechnology-601-skill-evaluation",
          "options": [
            {
              "id": "a",
              "text": "Outcome claims without baselines"
            },
            {
              "id": "b",
              "text": "Baseline comparison, side-effect checks, and uncertainty bounds"
            },
            {
              "id": "c",
              "text": "Removal of difficult scenarios"
            },
            {
              "id": "d",
              "text": "Changing criteria after seeing results"
            }
          ],
          "correctOptionId": "b",
          "explanation": "Baselines, side-effect checks, and uncertainty disclosure make results defensible."
        },
        {
          "id": "biotechnology-601-l06-q5",
          "text": "A mature bioethics governance system should connect:",
          "skillId": "biotechnology-601-skill-governance",
          "options": [
            {
              "id": "a",
              "text": "Policy and practice without measurement"
            },
            {
              "id": "b",
              "text": "Policy, measurable thresholds, and remediation pathways"
            },
            {
              "id": "c",
              "text": "Technical delivery with no accountability"
            },
            {
              "id": "d",
              "text": "Performance targets with no risk controls"
            }
          ],
          "correctOptionId": "b",
          "explanation": "Governance quality comes from linking policy intent to measurable controls and action."
        },
        {
          "id": "biotechnology-601-l06-q6",
          "text": "In high-stakes Biotechnology Research and Leadership execution, which communication protocol is strongest?",
          "skillId": "biotechnology-601-skill-advanced-6",
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
          "id": "biotechnology-601-l06-q7",
          "text": "A mature remediation loop in advanced Biotechnology should prioritize:",
          "skillId": "biotechnology-601-skill-advanced-7",
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
          "id": "biotechnology-601-l06-q8",
          "text": "Which portfolio decision rule best balances performance and resilience in Biotechnology Research and Leadership?",
          "skillId": "biotechnology-601-skill-advanced-8",
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
      "id": "biotechnology-601-l07",
      "title": "Biotechnology Governance and Public Impact",
      "type": "video",
      "duration": 13,
      "learningAids": [
        {
          "id": "biotechnology-601-l07-a1",
          "type": "image",
          "title": "Guided Practice",
          "content": "Use a structured method, log assumptions, and verify conclusions against constraints and metrics."
        }
      ],
      "chunks": [
        {
          "id": "biotechnology-601-l07-c1",
          "kind": "concept",
          "title": "Stakeholder Impact Distribution",
          "content": "Learners evaluate how outcomes are distributed across stakeholders, including delayed and indirect effects."
        },
        {
          "id": "biotechnology-601-l07-c2",
          "kind": "concept",
          "title": "Accountability System Design",
          "content": "Accountability is implemented through traceability standards, review rights, and remediation obligations."
        },
        {
          "id": "biotechnology-601-l07-c3",
          "kind": "recap",
          "title": "Responsible Leadership Checklist",
          "content": "A leadership checklist links strategy, ethics, policy, and operational controls into one review artifact."
        }
      ],
      "flashcards": [
        {
          "id": "biotechnology-601-l07-f1",
          "front": "Impact distribution",
          "back": "How benefits and harms are allocated across groups and timeframes."
        },
        {
          "id": "biotechnology-601-l07-f2",
          "front": "Decision traceability",
          "back": "An auditable explanation of evidence, rationale, and ownership behind a decision."
        },
        {
          "id": "biotechnology-601-l07-f3",
          "front": "Responsible leadership",
          "back": "Decision practice that balances performance, risk, ethics, and accountability."
        }
      ]
    },
    {
      "id": "biotechnology-601-l08",
      "title": "Biotechnology Capstone Defense Lab",
      "type": "interactive",
      "duration": 16,
      "learningAids": [
        {
          "id": "biotechnology-601-l08-a1",
          "type": "practice",
          "title": "Guided Practice",
          "content": "Use a structured method, log assumptions, and verify conclusions against constraints and metrics."
        }
      ],
      "chunks": [
        {
          "id": "biotechnology-601-l08-c1",
          "kind": "practice",
          "title": "Capstone Charter and Evidence Pack",
          "content": "Learners assemble a capstone charter with objectives, constraints, metrics, governance controls, and evidence plan."
        },
        {
          "id": "biotechnology-601-l08-c2",
          "kind": "recap",
          "title": "Defense Rehearsal",
          "content": "The final practice round trains learners to defend decisions against technical, governance, and stakeholder critiques."
        }
      ],
      "interactiveActivities": [
        {
          "id": "biotechnology-601-l08-act1",
          "type": "project_builder",
          "title": "Capstone Charter Builder",
          "description": "Build a specialization capstone charter with measurable outcomes and remediation pathways.",
          "instructions": [
            "Define objective, scope boundaries, and operating assumptions.",
            "Specify at least three measurable indicators and confidence thresholds.",
            "Define escalation and corrective-action criteria for failure scenarios."
          ]
        },
        {
          "id": "biotechnology-601-l08-act2",
          "type": "debate_simulator",
          "title": "Capstone Defense Panel",
          "description": "Defend your capstone against expert critique on rigor, risk, and accountability."
        }
      ]
    }
  ]
};
