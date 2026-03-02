import type { LearningModule } from "@/lib/modules/types";

export const Philosophy301Module: LearningModule = {
  "id": "philosophy-301",
  "title": "Philosophy Systems and Analysis",
  "description": "Level 301 curriculum in Philosophy, emphasizing argument structure, epistemology, ethics and politics, applied reasoning, and real-world decision quality through structured practice and assessment.",
  "subject": "Humanities",
  "tags": [
    "core",
    "curriculum",
    "interactive",
    "critical-thinking",
    "ethics"
  ],
  "minAge": 15,
  "maxAge": 99,
  "version": "2.0.0",
  "difficultyBand": "advanced",
  "localeSupport": [
    "en"
  ],
  "learningObjectives": [
    "Develop rigorous mental models for argument structure and epistemology",
    "Apply structured methods to plan, execute, and review ethics and politics tasks",
    "Interpret evidence using metrics, constraints, and context",
    "Diagnose common failure modes and design recovery actions",
    "Communicate tradeoffs clearly to technical and non-technical audiences",
    "Build repeatable systems for sustained improvement in Philosophy"
  ],
  "lessons": [
    {
      "id": "philosophy-301-l01",
      "title": "Core Models for Philosophy",
      "type": "video",
      "duration": 13,
      "learningAids": [
        {
          "id": "philosophy-301-l01-a1",
          "type": "image",
          "title": "Guided Practice",
          "content": "Use the structured prompt and write your reasoning before finalizing answers."
        }
      ],
      "chunks": [
        {
          "id": "philosophy-301-l01-c1",
          "kind": "concept",
          "title": "Operating Vocabulary and Scope",
          "content": "Philosophy at level 301 requires precise language. We define scope boundaries, identify the operating unit of analysis, and align terminology so decisions can be compared across teams."
        },
        {
          "id": "philosophy-301-l01-c2",
          "kind": "concept",
          "title": "Causal Thinking and Constraints",
          "content": "Strong performance in Philosophy depends on understanding causes, not just outcomes. This lesson maps assumptions, dependencies, and constraints so interventions target root causes rather than symptoms."
        },
        {
          "id": "philosophy-301-l01-c3",
          "kind": "recap",
          "title": "Evidence and Accountability",
          "content": "Evidence standards, logging discipline, and explicit accountability loops are introduced as non-negotiable practices for reliable execution."
        }
      ],
      "flashcards": [
        {
          "id": "philosophy-301-l01-f1",
          "front": "Unit of analysis",
          "back": "The specific entity or process you evaluate to make defensible decisions."
        },
        {
          "id": "philosophy-301-l01-f2",
          "front": "Constraint mapping",
          "back": "A method for identifying boundaries that shape feasible options."
        },
        {
          "id": "philosophy-301-l01-f3",
          "front": "Evidence standard",
          "back": "The minimum quality threshold data must meet before action is taken."
        }
      ]
    },
    {
      "id": "philosophy-301-l02",
      "title": "Philosophy Workflow Lab",
      "type": "interactive",
      "duration": 15,
      "learningAids": [
        {
          "id": "philosophy-301-l02-a1",
          "type": "practice",
          "title": "Guided Practice",
          "content": "Use the structured prompt and write your reasoning before finalizing answers."
        }
      ],
      "chunks": [
        {
          "id": "philosophy-301-l02-c1",
          "kind": "practice",
          "title": "Workflow Construction",
          "content": "Learners build a complete workflow for argument structure and epistemology, including inputs, checkpoints, outputs, and rollback triggers."
        },
        {
          "id": "philosophy-301-l02-c2",
          "kind": "recap",
          "title": "Decision Logging",
          "content": "Every decision is paired with rationale, expected effect, and a verification point to enable post-run analysis."
        }
      ],
      "interactiveActivities": [
        {
          "id": "philosophy-301-l02-act1",
          "type": "matching_pairs",
          "title": "Workflow Match",
          "description": "Match each workflow component to its strongest governance function.",
          "pairs": [
            {
              "left": "Input audit",
              "right": "Prevents low-quality data from entering the system"
            },
            {
              "left": "Checkpoint gate",
              "right": "Stops propagation of known defects"
            },
            {
              "left": "Outcome metric",
              "right": "Measures whether the objective was met"
            },
            {
              "left": "Retrospective log",
              "right": "Captures lessons for next iteration"
            }
          ]
        },
        {
          "id": "philosophy-301-l02-act2",
          "type": "sorting_buckets",
          "title": "Risk Classification",
          "description": "Sort items into strategic, operational, and quality-risk groups.",
          "buckets": [
            "Strategic",
            "Operational",
            "Quality"
          ],
          "items": [
            {
              "text": "Misaligned goals",
              "bucket": "Strategic"
            },
            {
              "text": "Unclear handoff timing",
              "bucket": "Operational"
            },
            {
              "text": "Inconsistent acceptance criteria",
              "bucket": "Quality"
            },
            {
              "text": "No benchmark baseline",
              "bucket": "Quality"
            }
          ]
        }
      ]
    },
    {
      "id": "philosophy-301-l03",
      "title": "Checkpoint 1: Concepts and Workflow",
      "type": "quiz",
      "duration": 10,
      "learningAids": [
        {
          "id": "philosophy-301-l03-a1",
          "type": "practice",
          "title": "Guided Practice",
          "content": "Use the structured prompt and write your reasoning before finalizing answers."
        }
      ],
      "questions": [
        {
          "id": "philosophy-301-l03-q1",
          "text": "Which action best improves decisions in argument structure work?",
          "skillId": "philosophy-301-skill-core",
          "options": [
            {
              "id": "a",
              "text": "Rely on one unverified example"
            },
            {
              "id": "b",
              "text": "Define criteria, compare alternatives, and test assumptions"
            },
            {
              "id": "c",
              "text": "Skip metrics and move directly to execution"
            },
            {
              "id": "d",
              "text": "Avoid documenting rationale"
            }
          ],
          "correctOptionId": "b",
          "explanation": "Explicit criteria and testable assumptions improve reliability and transferability."
        },
        {
          "id": "philosophy-301-l03-q2",
          "text": "In epistemology, what is the strongest indicator of process quality?",
          "skillId": "philosophy-301-skill-process",
          "options": [
            {
              "id": "a",
              "text": "Output speed only"
            },
            {
              "id": "b",
              "text": "Traceable steps, checkpoints, and measurable outcomes"
            },
            {
              "id": "c",
              "text": "Unstructured iteration without logs"
            },
            {
              "id": "d",
              "text": "One-time performance anecdotes"
            }
          ],
          "correctOptionId": "b",
          "explanation": "Quality processes are observable, repeatable, and measurable."
        },
        {
          "id": "philosophy-301-l03-q3",
          "text": "When evaluating ethics and politics, which practice supports trustworthy conclusions?",
          "skillId": "philosophy-301-skill-eval",
          "options": [
            {
              "id": "a",
              "text": "Ignore edge cases"
            },
            {
              "id": "b",
              "text": "Use baseline comparisons and failure analysis"
            },
            {
              "id": "c",
              "text": "Change targets after results are known"
            },
            {
              "id": "d",
              "text": "Remove context from findings"
            }
          ],
          "correctOptionId": "b",
          "explanation": "Baselines and failure analysis prevent overclaiming and improve design quality."
        },
        {
          "id": "philosophy-301-l03-q4",
          "text": "A mature applied reasoning strategy should prioritize:",
          "skillId": "philosophy-301-skill-strategy",
          "options": [
            {
              "id": "a",
              "text": "Single-metric optimization at any cost"
            },
            {
              "id": "b",
              "text": "Balanced outcomes across quality, risk, and sustainability"
            },
            {
              "id": "c",
              "text": "Decisions based only on intuition"
            },
            {
              "id": "d",
              "text": "No post-implementation review"
            }
          ],
          "correctOptionId": "b",
          "explanation": "Balanced scorecards align long-term performance with accountability."
        }
      ]
    },
    {
      "id": "philosophy-301-l04",
      "title": "Methods, Metrics, and Failure Modes in Philosophy",
      "type": "video",
      "duration": 14,
      "learningAids": [
        {
          "id": "philosophy-301-l04-a1",
          "type": "mnemonic",
          "title": "Guided Practice",
          "content": "Use the structured prompt and write your reasoning before finalizing answers."
        }
      ],
      "chunks": [
        {
          "id": "philosophy-301-l04-c1",
          "kind": "concept",
          "title": "Method Selection",
          "content": "Method selection is based on constraints, information quality, and cost of error. Learners compare alternatives and justify method fit for Philosophy scenarios."
        },
        {
          "id": "philosophy-301-l04-c2",
          "kind": "example",
          "title": "Metric Architecture",
          "content": "A metric architecture links leading indicators, lagging outcomes, and diagnostic measures so that teams can detect drift early and respond deliberately."
        },
        {
          "id": "philosophy-301-l04-c3",
          "kind": "recap",
          "title": "Failure Taxonomy",
          "content": "Failures are grouped by data, process, execution, and governance so mitigation plans are specific rather than generic."
        }
      ],
      "flashcards": [
        {
          "id": "philosophy-301-l04-f1",
          "front": "Leading indicator",
          "back": "A metric that signals probable future outcomes before final results appear."
        },
        {
          "id": "philosophy-301-l04-f2",
          "front": "Failure taxonomy",
          "back": "A structured classification of failure types used to design targeted fixes."
        },
        {
          "id": "philosophy-301-l04-f3",
          "front": "Cost of error",
          "back": "The operational, financial, or social impact caused by an incorrect decision."
        }
      ]
    },
    {
      "id": "philosophy-301-l05",
      "title": "Case Studio: Improve a Philosophy System",
      "type": "interactive",
      "duration": 16,
      "learningAids": [
        {
          "id": "philosophy-301-l05-a1",
          "type": "practice",
          "title": "Guided Practice",
          "content": "Use the structured prompt and write your reasoning before finalizing answers."
        }
      ],
      "chunks": [
        {
          "id": "philosophy-301-l05-c1",
          "kind": "practice",
          "title": "Case Decomposition",
          "content": "A realistic case is decomposed into objective, context, constraints, and intervention options with explicit tradeoff notes."
        },
        {
          "id": "philosophy-301-l05-c2",
          "kind": "recap",
          "title": "Improvement Proposal",
          "content": "Learners deliver a staged improvement proposal with success criteria, owner mapping, and follow-up timeline."
        }
      ],
      "interactiveActivities": [
        {
          "id": "philosophy-301-l05-act1",
          "type": "scenario_practice",
          "title": "Decision Path Simulation",
          "description": "Choose among three interventions to improve ethics and politics outcomes under time and quality constraints.",
          "instructions": [
            "Define success criteria before selecting an intervention.",
            "Document one short-term tradeoff and one long-term benefit.",
            "Specify a metric that confirms success in the next cycle."
          ]
        },
        {
          "id": "philosophy-301-l05-act2",
          "type": "matching_pairs",
          "title": "Intervention to Outcome Mapping",
          "description": "Connect interventions with the most likely system-level effects.",
          "pairs": [
            {
              "left": "Tighter intake criteria",
              "right": "Higher signal quality and lower downstream rework"
            },
            {
              "left": "Checkpoint automation",
              "right": "Faster detection of preventable defects"
            },
            {
              "left": "Post-run retrospective",
              "right": "Improved adaptation in later cycles"
            },
            {
              "left": "Cross-team briefing",
              "right": "Reduced ambiguity at handoff boundaries"
            }
          ]
        }
      ]
    },
    {
      "id": "philosophy-301-l06",
      "title": "Checkpoint 2: Systems Reasoning",
      "type": "quiz",
      "duration": 10,
      "learningAids": [
        {
          "id": "philosophy-301-l06-a1",
          "type": "practice",
          "title": "Guided Practice",
          "content": "Use the structured prompt and write your reasoning before finalizing answers."
        }
      ],
      "questions": [
        {
          "id": "philosophy-301-l06-q1",
          "text": "Which action best improves decisions in argument structure work?",
          "skillId": "philosophy-301-skill-core",
          "options": [
            {
              "id": "a",
              "text": "Rely on one unverified example"
            },
            {
              "id": "b",
              "text": "Define criteria, compare alternatives, and test assumptions"
            },
            {
              "id": "c",
              "text": "Skip metrics and move directly to execution"
            },
            {
              "id": "d",
              "text": "Avoid documenting rationale"
            }
          ],
          "correctOptionId": "b",
          "explanation": "Explicit criteria and testable assumptions improve reliability and transferability."
        },
        {
          "id": "philosophy-301-l06-q2",
          "text": "In epistemology, what is the strongest indicator of process quality?",
          "skillId": "philosophy-301-skill-process",
          "options": [
            {
              "id": "a",
              "text": "Output speed only"
            },
            {
              "id": "b",
              "text": "Traceable steps, checkpoints, and measurable outcomes"
            },
            {
              "id": "c",
              "text": "Unstructured iteration without logs"
            },
            {
              "id": "d",
              "text": "One-time performance anecdotes"
            }
          ],
          "correctOptionId": "b",
          "explanation": "Quality processes are observable, repeatable, and measurable."
        },
        {
          "id": "philosophy-301-l06-q3",
          "text": "When evaluating ethics and politics, which practice supports trustworthy conclusions?",
          "skillId": "philosophy-301-skill-eval",
          "options": [
            {
              "id": "a",
              "text": "Ignore edge cases"
            },
            {
              "id": "b",
              "text": "Use baseline comparisons and failure analysis"
            },
            {
              "id": "c",
              "text": "Change targets after results are known"
            },
            {
              "id": "d",
              "text": "Remove context from findings"
            }
          ],
          "correctOptionId": "b",
          "explanation": "Baselines and failure analysis prevent overclaiming and improve design quality."
        },
        {
          "id": "philosophy-301-l06-q4",
          "text": "A mature applied reasoning strategy should prioritize:",
          "skillId": "philosophy-301-skill-strategy",
          "options": [
            {
              "id": "a",
              "text": "Single-metric optimization at any cost"
            },
            {
              "id": "b",
              "text": "Balanced outcomes across quality, risk, and sustainability"
            },
            {
              "id": "c",
              "text": "Decisions based only on intuition"
            },
            {
              "id": "d",
              "text": "No post-implementation review"
            }
          ],
          "correctOptionId": "b",
          "explanation": "Balanced scorecards align long-term performance with accountability."
        }
      ]
    }
  ]
};
