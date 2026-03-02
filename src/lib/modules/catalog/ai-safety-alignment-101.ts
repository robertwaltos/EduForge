import type { LearningModule } from "@/lib/modules/types";

export const AiSafetyAlignment101Module: LearningModule = {
  "id": "ai-safety-alignment-101",
  "title": "AI Safety and Alignment Foundations",
  "description": "Level 101 curriculum in AI Safety and Alignment, focused on risk modeling, alignment objectives, evaluation harnesses, and governance controls, with rigorous scenario analysis and assessment-backed mastery.",
  "subject": "AI Ethics",
  "tags": [
    "core",
    "curriculum",
    "interactive",
    "ai",
    "safety"
  ],
  "minAge": 14,
  "maxAge": 99,
  "version": "2.0.0",
  "difficultyBand": "beginner",
  "localeSupport": [
    "en"
  ],
  "learningObjectives": [
    "Explain and apply risk modeling using clear assumptions and constraints",
    "Build repeatable workflows for alignment objectives with measurable checkpoints",
    "Evaluate evaluation harnesses outcomes against baseline and target metrics",
    "Use governance patterns to improve governance controls decision quality",
    "Communicate tradeoffs across technical, policy, and user-impact dimensions",
    "Synthesize AI Safety and Alignment methods into defensible recommendations"
  ],
  "lessons": [
    {
      "id": "ai-safety-alignment-101-l01",
      "title": "AI Safety and Alignment Core Concepts",
      "type": "video",
      "duration": 13,
      "learningAids": [
        {
          "id": "ai-safety-alignment-101-l01-a1",
          "type": "image",
          "title": "Guided Practice",
          "content": "Use the lesson scaffold, show your reasoning, and verify assumptions before finalizing your answer."
        }
      ],
      "chunks": [
        {
          "id": "ai-safety-alignment-101-l01-c1",
          "kind": "concept",
          "title": "Vocabulary and System Boundaries",
          "content": "This lesson establishes shared language for AI Safety and Alignment, defines operating boundaries, and maps where risk modeling and alignment objectives interact in real environments."
        },
        {
          "id": "ai-safety-alignment-101-l01-c2",
          "kind": "concept",
          "title": "Causal Structures and Constraints",
          "content": "Learners model causal paths, identify hidden assumptions, and apply constraint checks before proposing interventions."
        },
        {
          "id": "ai-safety-alignment-101-l01-c3",
          "kind": "recap",
          "title": "Evidence Discipline",
          "content": "The module introduces an evidence-first workflow where each claim is tied to observable indicators and expected uncertainty."
        }
      ],
      "flashcards": [
        {
          "id": "ai-safety-alignment-101-l01-f1",
          "front": "risk modeling",
          "back": "A core mechanism in AI Safety and Alignment requiring explicit assumptions and measurable controls."
        },
        {
          "id": "ai-safety-alignment-101-l01-f2",
          "front": "alignment objectives",
          "back": "Operational practices that convert strategy into reliable execution."
        },
        {
          "id": "ai-safety-alignment-101-l01-f3",
          "front": "evaluation harnesses",
          "back": "The evaluation layer that determines whether interventions truly improve outcomes."
        }
      ]
    },
    {
      "id": "ai-safety-alignment-101-l02",
      "title": "AI Safety and Alignment Methods Lab",
      "type": "interactive",
      "duration": 15,
      "learningAids": [
        {
          "id": "ai-safety-alignment-101-l02-a1",
          "type": "practice",
          "title": "Guided Practice",
          "content": "Use the lesson scaffold, show your reasoning, and verify assumptions before finalizing your answer."
        }
      ],
      "chunks": [
        {
          "id": "ai-safety-alignment-101-l02-c1",
          "kind": "practice",
          "title": "Method Sequence Construction",
          "content": "Learners build a method sequence optimized for foundational vocabulary, core mechanisms, and baseline analysis, then stress-test each step under uncertainty."
        },
        {
          "id": "ai-safety-alignment-101-l02-c2",
          "kind": "recap",
          "title": "Operational Readiness Checks",
          "content": "Readiness is assessed with owner mapping, checkpoint cadence, rollback triggers, and evidence logs."
        }
      ],
      "interactiveActivities": [
        {
          "id": "ai-safety-alignment-101-l02-act1",
          "type": "matching_pairs",
          "title": "Method-to-Outcome Mapping",
          "description": "Match each design choice to the strongest expected system effect.",
          "pairs": [
            {
              "left": "Pre-release stress tests",
              "right": "Lower severe failure probability"
            },
            {
              "left": "Checkpoint gating",
              "right": "Prevents defect propagation"
            },
            {
              "left": "Baseline comparison",
              "right": "Supports defensible impact claims"
            },
            {
              "left": "Retrospective review",
              "right": "Improves next-iteration decisions"
            }
          ]
        },
        {
          "id": "ai-safety-alignment-101-l02-act2",
          "type": "sorting_buckets",
          "title": "Constraint Sorting",
          "description": "Sort constraints into technical, policy, and user-impact categories.",
          "buckets": [
            "Technical",
            "Policy",
            "User Impact"
          ],
          "items": [
            {
              "text": "Latency budget",
              "bucket": "Technical"
            },
            {
              "text": "Audit retention requirement",
              "bucket": "Policy"
            },
            {
              "text": "Accessibility burden",
              "bucket": "User Impact"
            },
            {
              "text": "Human review threshold",
              "bucket": "Policy"
            }
          ]
        }
      ]
    },
    {
      "id": "ai-safety-alignment-101-l03",
      "title": "Checkpoint 1: Core Methods",
      "type": "quiz",
      "duration": 10,
      "learningAids": [
        {
          "id": "ai-safety-alignment-101-l03-a1",
          "type": "practice",
          "title": "Guided Practice",
          "content": "Use the lesson scaffold, show your reasoning, and verify assumptions before finalizing your answer."
        }
      ],
      "questions": [
        {
          "id": "ai-safety-alignment-101-l03-q1",
          "text": "Which practice most strengthens risk modeling in real deployments?",
          "skillId": "ai-safety-alignment-101-skill-risk",
          "options": [
            {
              "id": "a",
              "text": "Use assumptions without documenting them"
            },
            {
              "id": "b",
              "text": "Define failure criteria and monitor leading indicators"
            },
            {
              "id": "c",
              "text": "Evaluate outcomes only once per year"
            },
            {
              "id": "d",
              "text": "Avoid stress-testing edge cases"
            }
          ],
          "correctOptionId": "b",
          "explanation": "Explicit failure criteria and leading indicators improve early detection and response."
        },
        {
          "id": "ai-safety-alignment-101-l03-q2",
          "text": "At level 101, AI Safety and Alignment work should prioritize:",
          "skillId": "ai-safety-alignment-101-skill-level",
          "options": [
            {
              "id": "a",
              "text": "foundational vocabulary, core mechanisms, and baseline analysis"
            },
            {
              "id": "b",
              "text": "Speed over traceability in all cases"
            },
            {
              "id": "c",
              "text": "No validation loops after release"
            },
            {
              "id": "d",
              "text": "Single-metric optimization without context"
            }
          ],
          "correctOptionId": "a",
          "explanation": "The 101 sequence is designed around foundational vocabulary, core mechanisms, and baseline analysis."
        },
        {
          "id": "ai-safety-alignment-101-l03-q3",
          "text": "What is the strongest indicator of healthy alignment objectives?",
          "skillId": "ai-safety-alignment-101-skill-ops",
          "options": [
            {
              "id": "a",
              "text": "Untracked interventions and ad-hoc approvals"
            },
            {
              "id": "b",
              "text": "Clear owner mapping, review cadence, and measurable thresholds"
            },
            {
              "id": "c",
              "text": "Skipping post-incident analysis"
            },
            {
              "id": "d",
              "text": "Changing targets after observing results"
            }
          ],
          "correctOptionId": "b",
          "explanation": "Stable systems require clear ownership, decision cadence, and measurable controls."
        },
        {
          "id": "ai-safety-alignment-101-l03-q4",
          "text": "When improving evaluation harnesses, which approach is most defensible?",
          "skillId": "ai-safety-alignment-101-skill-eval",
          "options": [
            {
              "id": "a",
              "text": "Use anecdotal wins as sole evidence"
            },
            {
              "id": "b",
              "text": "Compare against baselines and include failure analysis"
            },
            {
              "id": "c",
              "text": "Remove difficult test scenarios"
            },
            {
              "id": "d",
              "text": "Ignore lagging outcomes"
            }
          ],
          "correctOptionId": "b",
          "explanation": "Baselines and failure analysis reduce bias and reveal true system performance."
        },
        {
          "id": "ai-safety-alignment-101-l03-q5",
          "text": "A mature governance controls strategy should include:",
          "skillId": "ai-safety-alignment-101-skill-governance",
          "options": [
            {
              "id": "a",
              "text": "No escalation path for critical defects"
            },
            {
              "id": "b",
              "text": "Policy, measurement, and escalation pathways linked to impact tiers"
            },
            {
              "id": "c",
              "text": "One-time governance review only"
            },
            {
              "id": "d",
              "text": "Separation between metrics and decisions"
            }
          ],
          "correctOptionId": "b",
          "explanation": "Effective governance connects policy intent to measurement and response action."
        }
      ]
    },
    {
      "id": "ai-safety-alignment-101-l04",
      "title": "AI Safety and Alignment Case Analysis",
      "type": "video",
      "duration": 14,
      "learningAids": [
        {
          "id": "ai-safety-alignment-101-l04-a1",
          "type": "mnemonic",
          "title": "Guided Practice",
          "content": "Use the lesson scaffold, show your reasoning, and verify assumptions before finalizing your answer."
        }
      ],
      "chunks": [
        {
          "id": "ai-safety-alignment-101-l04-c1",
          "kind": "example",
          "title": "Case Setup and Stakes",
          "content": "The case examines an AI assistant deployed in education producing persuasive but occasionally fabricated answers, requiring learners to separate evidence, assumptions, and high-consequence risks."
        },
        {
          "id": "ai-safety-alignment-101-l04-c2",
          "kind": "concept",
          "title": "Decision Tradeoff Matrix",
          "content": "Alternatives are scored across performance, reliability, cost, and equity implications before selecting an intervention path."
        },
        {
          "id": "ai-safety-alignment-101-l04-c3",
          "kind": "recap",
          "title": "Lessons from Failure Modes",
          "content": "Failure patterns are categorized to convert one-off incidents into reusable design safeguards."
        }
      ],
      "flashcards": [
        {
          "id": "ai-safety-alignment-101-l04-f1",
          "front": "Tradeoff matrix",
          "back": "A structured way to compare options across competing priorities before choosing an intervention."
        },
        {
          "id": "ai-safety-alignment-101-l04-f2",
          "front": "Failure mode",
          "back": "A repeatable pattern describing how systems break under real constraints."
        },
        {
          "id": "ai-safety-alignment-101-l04-f3",
          "front": "Escalation threshold",
          "back": "A predefined condition that triggers higher-level review or corrective action."
        }
      ]
    },
    {
      "id": "ai-safety-alignment-101-l05",
      "title": "AI Safety and Alignment Simulation Studio",
      "type": "interactive",
      "duration": 16,
      "learningAids": [
        {
          "id": "ai-safety-alignment-101-l05-a1",
          "type": "practice",
          "title": "Guided Practice",
          "content": "Use the lesson scaffold, show your reasoning, and verify assumptions before finalizing your answer."
        }
      ],
      "chunks": [
        {
          "id": "ai-safety-alignment-101-l05-c1",
          "kind": "practice",
          "title": "Simulation Setup",
          "content": "Learners configure a scenario model with explicit uncertainty assumptions and success metrics tied to governance controls."
        },
        {
          "id": "ai-safety-alignment-101-l05-c2",
          "kind": "recap",
          "title": "Decision Review Loop",
          "content": "Each simulation round ends with evidence review, policy alignment checks, and improvement actions."
        }
      ],
      "interactiveActivities": [
        {
          "id": "ai-safety-alignment-101-l05-act1",
          "type": "scenario_practice",
          "title": "Policy and Operations Simulation",
          "description": "Run three intervention strategies and justify which option best advances risk modeling and governance controls.",
          "instructions": [
            "Define the primary objective and guardrails before choosing an intervention.",
            "Record one tradeoff created by each intervention.",
            "Select a follow-up metric that confirms whether the choice was successful."
          ]
        },
        {
          "id": "ai-safety-alignment-101-l05-act2",
          "type": "matching_pairs",
          "title": "Mitigation Mapping",
          "description": "Match each failure condition with the strongest mitigation response.",
          "pairs": [
            {
              "left": "Unreliable input stream",
              "right": "Introduce quality contracts and quarantine checks"
            },
            {
              "left": "Policy ambiguity",
              "right": "Define decision authority and escalation rules"
            },
            {
              "left": "Metric drift",
              "right": "Re-baseline and monitor leading indicators"
            },
            {
              "left": "User trust decline",
              "right": "Increase transparency and corrective feedback loops"
            }
          ]
        }
      ]
    },
    {
      "id": "ai-safety-alignment-101-l06",
      "title": "Checkpoint 2: Systems and Decisions",
      "type": "quiz",
      "duration": 10,
      "learningAids": [
        {
          "id": "ai-safety-alignment-101-l06-a1",
          "type": "practice",
          "title": "Guided Practice",
          "content": "Use the lesson scaffold, show your reasoning, and verify assumptions before finalizing your answer."
        }
      ],
      "questions": [
        {
          "id": "ai-safety-alignment-101-l06-q1",
          "text": "Which practice most strengthens risk modeling in real deployments?",
          "skillId": "ai-safety-alignment-101-skill-risk",
          "options": [
            {
              "id": "a",
              "text": "Use assumptions without documenting them"
            },
            {
              "id": "b",
              "text": "Define failure criteria and monitor leading indicators"
            },
            {
              "id": "c",
              "text": "Evaluate outcomes only once per year"
            },
            {
              "id": "d",
              "text": "Avoid stress-testing edge cases"
            }
          ],
          "correctOptionId": "b",
          "explanation": "Explicit failure criteria and leading indicators improve early detection and response."
        },
        {
          "id": "ai-safety-alignment-101-l06-q2",
          "text": "At level 101, AI Safety and Alignment work should prioritize:",
          "skillId": "ai-safety-alignment-101-skill-level",
          "options": [
            {
              "id": "a",
              "text": "foundational vocabulary, core mechanisms, and baseline analysis"
            },
            {
              "id": "b",
              "text": "Speed over traceability in all cases"
            },
            {
              "id": "c",
              "text": "No validation loops after release"
            },
            {
              "id": "d",
              "text": "Single-metric optimization without context"
            }
          ],
          "correctOptionId": "a",
          "explanation": "The 101 sequence is designed around foundational vocabulary, core mechanisms, and baseline analysis."
        },
        {
          "id": "ai-safety-alignment-101-l06-q3",
          "text": "What is the strongest indicator of healthy alignment objectives?",
          "skillId": "ai-safety-alignment-101-skill-ops",
          "options": [
            {
              "id": "a",
              "text": "Untracked interventions and ad-hoc approvals"
            },
            {
              "id": "b",
              "text": "Clear owner mapping, review cadence, and measurable thresholds"
            },
            {
              "id": "c",
              "text": "Skipping post-incident analysis"
            },
            {
              "id": "d",
              "text": "Changing targets after observing results"
            }
          ],
          "correctOptionId": "b",
          "explanation": "Stable systems require clear ownership, decision cadence, and measurable controls."
        },
        {
          "id": "ai-safety-alignment-101-l06-q4",
          "text": "When improving evaluation harnesses, which approach is most defensible?",
          "skillId": "ai-safety-alignment-101-skill-eval",
          "options": [
            {
              "id": "a",
              "text": "Use anecdotal wins as sole evidence"
            },
            {
              "id": "b",
              "text": "Compare against baselines and include failure analysis"
            },
            {
              "id": "c",
              "text": "Remove difficult test scenarios"
            },
            {
              "id": "d",
              "text": "Ignore lagging outcomes"
            }
          ],
          "correctOptionId": "b",
          "explanation": "Baselines and failure analysis reduce bias and reveal true system performance."
        },
        {
          "id": "ai-safety-alignment-101-l06-q5",
          "text": "A mature governance controls strategy should include:",
          "skillId": "ai-safety-alignment-101-skill-governance",
          "options": [
            {
              "id": "a",
              "text": "No escalation path for critical defects"
            },
            {
              "id": "b",
              "text": "Policy, measurement, and escalation pathways linked to impact tiers"
            },
            {
              "id": "c",
              "text": "One-time governance review only"
            },
            {
              "id": "d",
              "text": "Separation between metrics and decisions"
            }
          ],
          "correctOptionId": "b",
          "explanation": "Effective governance connects policy intent to measurement and response action."
        }
      ]
    },
    {
      "id": "ai-safety-alignment-101-l07",
      "title": "AI Safety and Alignment Ethics, Policy, and Public Impact",
      "type": "video",
      "duration": 12,
      "learningAids": [
        {
          "id": "ai-safety-alignment-101-l07-a1",
          "type": "image",
          "title": "Guided Practice",
          "content": "Use the lesson scaffold, show your reasoning, and verify assumptions before finalizing your answer."
        }
      ],
      "chunks": [
        {
          "id": "ai-safety-alignment-101-l07-c1",
          "kind": "concept",
          "title": "Stakeholder Analysis",
          "content": "Learners identify who benefits, who bears risk, and how policy choices shape outcomes across groups."
        },
        {
          "id": "ai-safety-alignment-101-l07-c2",
          "kind": "concept",
          "title": "Governance and Accountability",
          "content": "Governance mechanisms are linked to measurable controls, transparency obligations, and remediation pathways."
        },
        {
          "id": "ai-safety-alignment-101-l07-c3",
          "kind": "recap",
          "title": "Responsible Execution Checklist",
          "content": "A final checklist integrates legal, ethical, technical, and user-impact criteria before deployment decisions."
        }
      ],
      "flashcards": [
        {
          "id": "ai-safety-alignment-101-l07-f1",
          "front": "Stakeholder map",
          "back": "A framework that tracks impact distribution across affected groups."
        },
        {
          "id": "ai-safety-alignment-101-l07-f2",
          "front": "Accountability loop",
          "back": "A cycle connecting outcomes, ownership, and corrective action."
        },
        {
          "id": "ai-safety-alignment-101-l07-f3",
          "front": "Responsible execution",
          "back": "Delivery practice that balances performance with safety, fairness, and transparency."
        }
      ]
    },
    {
      "id": "ai-safety-alignment-101-l08",
      "title": "AI Safety and Alignment Capstone Planning Lab",
      "type": "interactive",
      "duration": 15,
      "learningAids": [
        {
          "id": "ai-safety-alignment-101-l08-a1",
          "type": "practice",
          "title": "Guided Practice",
          "content": "Use the lesson scaffold, show your reasoning, and verify assumptions before finalizing your answer."
        }
      ],
      "chunks": [
        {
          "id": "ai-safety-alignment-101-l08-c1",
          "kind": "practice",
          "title": "Capstone Scope Definition",
          "content": "Learners draft a capstone charter with objective, risks, success metrics, and governance checkpoints."
        },
        {
          "id": "ai-safety-alignment-101-l08-c2",
          "kind": "recap",
          "title": "Defense Preparation",
          "content": "The lesson ends with a defense template that requires evidence-backed claims and explicit tradeoff reasoning."
        }
      ],
      "interactiveActivities": [
        {
          "id": "ai-safety-alignment-101-l08-act1",
          "type": "project_builder",
          "title": "Capstone Charter Builder",
          "description": "Build a one-page capstone charter with metrics, controls, and success criteria.",
          "instructions": [
            "State the primary objective and boundary conditions.",
            "Define at least three measurable success indicators.",
            "Identify one ethical or policy risk and mitigation plan."
          ]
        },
        {
          "id": "ai-safety-alignment-101-l08-act2",
          "type": "debate_simulator",
          "title": "Decision Defense Drill",
          "description": "Defend your capstone approach against cost, risk, and equity critiques."
        }
      ]
    }
  ]
};
