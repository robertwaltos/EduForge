import type { LearningModule } from "@/lib/modules/types";

export const MicroCircuits401Module: LearningModule = {
  id: "micro-circuits-401",
  title: "Micro-Circuit Architecture, Verification, and Silicon Readiness",
  description:
    "Expert-level micro-circuit engineering curriculum covering architectural trade-offs, mixed-signal integrity, DFT strategy, reliability engineering, and tape-out decision governance.",
  subject: "Circuit Design",
  tags: ["core", "curriculum", "interactive", "electronics", "verification", "semiconductor"],
  minAge: 16,
  maxAge: 99,
  version: "2.0.0",
  difficultyBand: "advanced",
  localeSupport: ["en"],
  thumbnail: "/placeholders/lesson-robot.svg",
  learningObjectives: [
    "Evaluate architecture-level trade-offs across power, area, performance, and cost",
    "Apply signal-integrity and power-integrity reasoning in high-speed board and package contexts",
    "Design verification and DFT strategies that improve test coverage and debug velocity",
    "Assess reliability and manufacturability risks before tape-out",
    "Use evidence from simulation and lab characterization to support design decisions",
    "Communicate silicon readiness using measurable quality and risk indicators"
  ],
  lessons: [
    {
      id: "micro-circuits-401-l01",
      title: "Architecture Trade-offs for Complex Micro-Circuits",
      type: "video",
      duration: 14,
      chunks: [
        {
          id: "micro-circuits-401-l01-c1",
          kind: "concept",
          title: "PPA as a System Problem",
          content:
            "Performance, power, and area are coupled constraints. Improving one metric can degrade another unless architecture choices align with workload behavior, timing closure goals, and packaging limits."
        },
        {
          id: "micro-circuits-401-l01-c2",
          kind: "concept",
          title: "Partitioning and Interface Boundaries",
          content:
            "Partition decisions affect verification complexity, clock-domain crossings, and debug observability. Well-defined interfaces reduce integration surprises and improve reuse across product variants."
        },
        {
          id: "micro-circuits-401-l01-c3",
          kind: "recap",
          title: "Architecture Review Quality",
          content:
            "High-quality reviews include workload assumptions, margin analysis, failure modes, and quantified trade-off rationale rather than narrative-only justifications."
        }
      ],
      flashcards: [
        {
          id: "micro-circuits-401-l01-f1",
          front: "PPA",
          back: "Power, Performance, and Area trade-off framework used in architecture decisions."
        },
        {
          id: "micro-circuits-401-l01-f2",
          front: "Clock-domain crossing",
          back: "Boundary where asynchronous or differently-clocked logic transfers signals."
        },
        {
          id: "micro-circuits-401-l01-f3",
          front: "Margin analysis",
          back: "Quantifying safety headroom under process, voltage, and temperature variability."
        }
      ],
      learningAids: [
        {
          id: "micro-circuits-401-l01-a1",
          type: "image",
          title: "PPA Trade-off Matrix",
          content: "Matrix linking architecture options to power, latency, throughput, and area impact."
        }
      ]
    },
    {
      id: "micro-circuits-401-l02",
      title: "Signal Integrity and Power Integrity Lab",
      type: "interactive",
      duration: 16,
      chunks: [
        {
          id: "micro-circuits-401-l02-c1",
          kind: "concept",
          title: "SI/PI Coupling",
          content:
            "High-speed micro-circuit behavior is strongly affected by return paths, impedance discontinuities, simultaneous switching noise, and decoupling effectiveness across frequency ranges."
        },
        {
          id: "micro-circuits-401-l02-c2",
          kind: "practice",
          title: "Failure Signature Interpretation",
          content:
            "Design teams should map waveform artifacts to root-cause hypotheses using simulation, measurement, and controlled perturbation tests before implementing fixes."
        }
      ],
      interactiveActivities: [
        {
          id: "micro-circuits-401-l02-act1",
          type: "matching_pairs",
          title: "Artifact-to-Cause Match",
          description: "Match observed behavior with the most likely electrical cause.",
          pairs: [
            { left: "Excessive ringback on edge transitions", right: "Impedance discontinuity and poor termination strategy" },
            { left: "Broadband supply ripple under load step", right: "Inadequate decoupling network response" },
            { left: "Clock jitter increase with IO burst", right: "Power delivery noise coupling into timing path" },
            { left: "Intermittent bit errors at high temperature", right: "Shrinking noise margin under PVT stress" }
          ]
        },
        {
          id: "micro-circuits-401-l02-act2",
          type: "scenario_practice",
          title: "Debug Priority Drill",
          description: "Prioritize your first three validation tests for a failing high-speed channel.",
          instructions: [
            "Choose one measurement that narrows root causes fastest.",
            "Define one rollback-safe mitigation to test first."
          ]
        }
      ],
      metadata: {
        prompts: [
          "Which SI/PI risk has highest system-level impact in your design?",
          "How do you separate measurement artifacts from real electrical failures?",
          "What evidence threshold should be required before layout ECO approval?"
        ]
      },
      learningAids: [
        {
          id: "micro-circuits-401-l02-a1",
          type: "practice",
          title: "SI/PI Debug Worksheet",
          content: "Template for symptom capture, hypothesis ranking, test sequence, and acceptance criteria."
        }
      ]
    },
    {
      id: "micro-circuits-401-l03",
      title: "Checkpoint 1: Architecture and Integrity",
      type: "quiz",
      duration: 10,
      questions: [
        {
          id: "micro-circuits-401-l03-q1",
          text: "What is the main reason architecture trade-offs must include workload assumptions?",
          skillId: "micro-circuits-401-skill-architecture",
          options: [
            { id: "a", text: "Workloads rarely affect circuit behavior" },
            { id: "b", text: "Power and performance outcomes depend on realistic usage patterns" },
            { id: "c", text: "Assumptions only matter after silicon" },
            { id: "d", text: "Area is fixed regardless of architecture" }
          ],
          correctOptionId: "b",
          explanation: "Architecture quality depends on how well assumptions match expected operation."
        },
        {
          id: "micro-circuits-401-l03-q2",
          text: "A frequent source of high-speed channel ringing is:",
          skillId: "micro-circuits-401-skill-si",
          options: [
            { id: "a", text: "Perfect impedance continuity" },
            { id: "b", text: "Impedance mismatch and weak termination" },
            { id: "c", text: "Excessive shielding only" },
            { id: "d", text: "Clock gating strategy" }
          ],
          correctOptionId: "b",
          explanation: "Reflections from impedance discontinuities are a primary ringing mechanism."
        },
        {
          id: "micro-circuits-401-l03-q3",
          text: "Most important reason to correlate simulation with bench data is:",
          skillId: "micro-circuits-401-skill-validation",
          options: [
            { id: "a", text: "To avoid model updates" },
            { id: "b", text: "To check model fidelity and reduce false confidence" },
            { id: "c", text: "To replace measurement entirely" },
            { id: "d", text: "To skip corner analysis" }
          ],
          correctOptionId: "b",
          explanation: "Correlation identifies model gaps before costly downstream decisions."
        },
        {
          id: "micro-circuits-401-l03-q4",
          text: "Best practice for architecture review governance is:",
          skillId: "micro-circuits-401-skill-governance",
          options: [
            { id: "a", text: "Approve based on intuition only" },
            { id: "b", text: "Require explicit assumptions, margins, and risk register" },
            { id: "c", text: "Delay all risk discussion until bring-up" },
            { id: "d", text: "Ignore verification resource constraints" }
          ],
          correctOptionId: "b",
          explanation: "Evidence-backed reviews reduce avoidable tape-out risk."
        }
      ],
      learningAids: [
        {
          id: "micro-circuits-401-l03-a1",
          type: "mnemonic",
          title: "MARS",
          content: "Models, Assumptions, Risk, Signals."
        }
      ]
    },
    {
      id: "micro-circuits-401-l04",
      title: "DFT, Reliability, and Manufacturability",
      type: "video",
      duration: 14,
      chunks: [
        {
          id: "micro-circuits-401-l04-c1",
          kind: "concept",
          title: "Design for Test",
          content:
            "DFT architecture determines post-silicon debug speed and production quality confidence. Scan coverage, observability points, and built-in self-test planning must align with product goals and tester limits."
        },
        {
          id: "micro-circuits-401-l04-c2",
          kind: "concept",
          title: "Reliability Mechanisms",
          content:
            "Electromigration, time-dependent dielectric breakdown, thermal cycling, and soft-error exposure require early mitigation strategies, not late reactive patches."
        },
        {
          id: "micro-circuits-401-l04-c3",
          kind: "recap",
          title: "Manufacturing Readiness",
          content:
            "Silicon-ready designs include process corner validation, test-time budgeting, yield-risk hypotheses, and clear disposition criteria for initial lot results."
        }
      ],
      flashcards: [
        {
          id: "micro-circuits-401-l04-f1",
          front: "DFT coverage",
          back: "Proportion of target fault space detectable by planned test infrastructure."
        },
        {
          id: "micro-circuits-401-l04-f2",
          front: "Electromigration",
          back: "Progressive conductor degradation caused by high current density over time."
        },
        {
          id: "micro-circuits-401-l04-f3",
          front: "Yield risk",
          back: "Probability of manufacturability issues reducing pass rate at target performance bins."
        }
      ],
      learningAids: [
        {
          id: "micro-circuits-401-l04-a1",
          type: "image",
          title: "Silicon Readiness Checklist",
          content: "Checklist spanning DFT metrics, reliability limits, corner closure, and manufacturing gates."
        }
      ]
    },
    {
      id: "micro-circuits-401-l05",
      title: "Verification Closure and Bring-Up Planning Studio",
      type: "interactive",
      duration: 17,
      chunks: [
        {
          id: "micro-circuits-401-l05-c1",
          kind: "practice",
          title: "Case: Tape-Out in Six Weeks",
          content:
            "Your team is approaching tape-out with open timing exceptions, partial mixed-signal coverage, and limited lab resources. Build a closure plan that balances risk and schedule."
        },
        {
          id: "micro-circuits-401-l05-c2",
          kind: "recap",
          title: "Closure Quality Signals",
          content:
            "High-quality closure decisions are explicit about uncovered risk, mitigation ownership, and post-silicon verification strategy."
        }
      ],
      interactiveActivities: [
        {
          id: "micro-circuits-401-l05-act1",
          type: "timeline_builder",
          title: "Tape-Out Sequencing Drill",
          description: "Sequence final readiness tasks with dependency awareness.",
          data: {
            initiatives: [
              "Finalize top unclosed verification assertions",
              "Run SI/PI corner stress regressions",
              "Freeze DFT pattern generation and tester budget",
              "Publish bring-up instrumentation plan",
              "Approve risk register and ownership for residual gaps"
            ]
          }
        },
        {
          id: "micro-circuits-401-l05-act2",
          type: "sorting_buckets",
          title: "Risk Ownership Sort",
          description: "Sort open issues by owner domain.",
          buckets: ["Design", "Verification", "Product/Test"],
          items: [
            { text: "CDC exception with ambiguous constraints", bucket: "Design" },
            { text: "Unstable random regression at high activity", bucket: "Verification" },
            { text: "Probe card timing budget uncertainty", bucket: "Product/Test" },
            { text: "Unknown sensor calibration drift bound", bucket: "Design" }
          ]
        }
      ],
      metadata: {
        prompts: [
          "Which unresolved risk is still acceptable for tape-out and why?",
          "What evidence is mandatory before waiving a verification gap?",
          "How will you measure bring-up success in the first week of silicon?"
        ]
      },
      learningAids: [
        {
          id: "micro-circuits-401-l05-a1",
          type: "practice",
          title: "Closure Scorecard",
          content: "Template linking open issue, severity, owner, mitigation, and go/no-go threshold."
        }
      ]
    },
    {
      id: "micro-circuits-401-l06",
      title: "Checkpoint 2: Readiness and Execution",
      type: "quiz",
      duration: 11,
      questions: [
        {
          id: "micro-circuits-401-l06-q1",
          text: "Why is DFT planning an architecture-stage concern rather than a late add-on?",
          skillId: "micro-circuits-401-skill-dft",
          options: [
            { id: "a", text: "Late insertion always improves coverage with no trade-offs" },
            { id: "b", text: "Testability choices affect area, performance, and debug latency early" },
            { id: "c", text: "DFT is unrelated to production quality" },
            { id: "d", text: "Only packaging teams handle DFT" }
          ],
          correctOptionId: "b",
          explanation: "Testability architecture impacts core design constraints and downstream quality."
        },
        {
          id: "micro-circuits-401-l06-q2",
          text: "A tape-out decision is most defensible when it includes:",
          skillId: "micro-circuits-401-skill-governance",
          options: [
            { id: "a", text: "Only a schedule commitment" },
            { id: "b", text: "Residual risk list, mitigation owners, and post-silicon plan" },
            { id: "c", text: "No mention of open issues" },
            { id: "d", text: "Assumption-free certainty claims" }
          ],
          correctOptionId: "b",
          explanation: "Transparent risk and ownership are critical for accountable execution."
        },
        {
          id: "micro-circuits-401-l06-q3",
          text: "Most reliable way to reduce SI debug cycle time is:",
          skillId: "micro-circuits-401-skill-si",
          options: [
            { id: "a", text: "Run random fixes without baseline data" },
            { id: "b", text: "Use hypothesis-driven test sequencing with correlated measurements" },
            { id: "c", text: "Skip instrument calibration" },
            { id: "d", text: "Ignore temperature and voltage corners" }
          ],
          correctOptionId: "b",
          explanation: "Structured hypothesis testing converges faster and reduces false positives."
        },
        {
          id: "micro-circuits-401-l06-q4",
          text: "Which metric best indicates production test strategy health?",
          skillId: "micro-circuits-401-skill-dft",
          options: [
            { id: "a", text: "Coverage claims without pattern quality evidence" },
            { id: "b", text: "Fault coverage with tester-time and escape-risk context" },
            { id: "c", text: "Only number of generated test vectors" },
            { id: "d", text: "Only simulation runtime" }
          ],
          correctOptionId: "b",
          explanation: "Coverage must be interpreted with practical test-time and quality outcomes."
        },
        {
          id: "micro-circuits-401-l06-q5",
          text: "Best communication pattern for executive silicon-readiness updates is:",
          skillId: "micro-circuits-401-skill-communication",
          options: [
            { id: "a", text: "Report optimism only" },
            { id: "b", text: "Summarize status, top risks, mitigations, and decision deadlines" },
            { id: "c", text: "Avoid discussing uncertainty" },
            { id: "d", text: "Share raw logs without synthesis" }
          ],
          correctOptionId: "b",
          explanation: "Decision makers need concise risk-informed status, not only technical detail."
        }
      ],
      learningAids: [
        {
          id: "micro-circuits-401-l06-a1",
          type: "mnemonic",
          title: "TRACE",
          content: "Trade-offs, Risks, Assumptions, Coverage, Evidence."
        }
      ]
    },
    {
      id: "micro-circuits-401-l07",
      title: "Capstone: Silicon Program Go/No-Go Review",
      type: "interactive",
      duration: 19,
      chunks: [
        {
          id: "micro-circuits-401-l07-c1",
          kind: "practice",
          title: "Capstone Brief",
          content:
            "Prepare a complete go/no-go recommendation for a mixed-signal micro-circuit nearing tape-out. Include architecture rationale, SI/PI evidence, DFT quality, residual risks, and post-silicon validation plan."
        },
        {
          id: "micro-circuits-401-l07-c2",
          kind: "recap",
          title: "Assessment Criteria",
          content:
            "High-quality recommendations are explicit about assumptions, measurable thresholds, risk owners, and contingency actions if first-silicon behavior diverges from predictions."
        }
      ],
      metadata: {
        prompts: [
          "State your go/no-go decision and three strongest evidence points.",
          "List top three residual risks and assigned owners.",
          "Define first-silicon success criteria for week one and week four."
        ]
      },
      learningAids: [
        {
          id: "micro-circuits-401-l07-a1",
          type: "practice",
          title: "Program Review Template",
          content: "Template for status, risk heatmap, mitigation plan, and decision recommendation."
        }
      ]
    }
  ]
};
