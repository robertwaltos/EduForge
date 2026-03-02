import type { LearningModule } from "@/lib/modules/types";

export const GeneralRelativity401Module: LearningModule = {
  id: "general-relativity-401",
  title: "General Relativity Frontiers and Scientific Synthesis",
  description:
    "Expert-level general relativity curriculum on geometric field theory, strong-gravity phenomena, gravitational-wave inference, cosmological testing, and research-grade scientific argumentation.",
  subject: "General Relativity",
  tags: ["core", "curriculum", "interactive", "relativity", "physics", "research"],
  minAge: 14,
  maxAge: 99,
  version: "2.0.0",
  difficultyBand: "advanced",
  localeSupport: ["en"],
  thumbnail: "/placeholders/lesson-robot.svg",
  learningObjectives: [
    "Connect spacetime geometry concepts to physically measurable predictions",
    "Interpret strong-field relativistic phenomena using mathematical and observational evidence",
    "Evaluate gravitational-wave and astrophysical datasets with uncertainty-aware reasoning",
    "Compare competing relativistic and cosmological models using empirical tests",
    "Communicate high-complexity scientific conclusions with clear assumptions and limitations",
    "Design research proposals that integrate theory, simulation, and observation"
  ],
  lessons: [
    {
      id: "general-relativity-401-l01",
      title: "Geometry, Field Equations, and Physical Meaning",
      type: "video",
      duration: 14,
      chunks: [
        {
          id: "general-relativity-401-l01-c1",
          kind: "concept",
          title: "Curvature as Physics",
          content:
            "In general relativity, gravity is not a force field in space but a manifestation of spacetime curvature. Matter-energy influences geometry, and geometry governs free-fall trajectories."
        },
        {
          id: "general-relativity-401-l01-c2",
          kind: "concept",
          title: "Equation-to-Observation Bridge",
          content:
            "Field equations become meaningful through measurable consequences: perihelion precession, light deflection, time dilation, gravitational redshift, and waveform signatures from compact-object mergers."
        },
        {
          id: "general-relativity-401-l01-c3",
          kind: "recap",
          title: "Model Scope and Limits",
          content:
            "Expert reasoning distinguishes between model domain validity and speculative extrapolation. A model may explain one regime extremely well while remaining incomplete in another."
        }
      ],
      flashcards: [
        {
          id: "general-relativity-401-l01-f1",
          front: "Spacetime curvature",
          back: "Geometric structure that determines inertial paths and gravitational effects in relativity."
        },
        {
          id: "general-relativity-401-l01-f2",
          front: "Geodesic",
          back: "The locally extremal path followed by free-falling objects in curved spacetime."
        },
        {
          id: "general-relativity-401-l01-f3",
          front: "Model domain",
          back: "The physical regime where a model's assumptions remain valid and predictive."
        }
      ],
      learningAids: [
        {
          id: "general-relativity-401-l01-a1",
          type: "image",
          title: "Geometry-to-Measurement Map",
          content: "Diagram linking curvature concepts to observables such as lensing, time delay, and waveforms."
        }
      ]
    },
    {
      id: "general-relativity-401-l02",
      title: "Strong-Field Relativity and Simulation Lab",
      type: "interactive",
      duration: 16,
      chunks: [
        {
          id: "general-relativity-401-l02-c1",
          kind: "concept",
          title: "Strong-Gravity Regimes",
          content:
            "Black holes, neutron stars, and compact-binary systems probe regimes where relativistic effects dominate. In these settings, weak-field approximations fail and nonlinear dynamics become central."
        },
        {
          id: "general-relativity-401-l02-c2",
          kind: "practice",
          title: "Simulation-Assisted Reasoning",
          content:
            "Numerical simulations support interpretation of merger dynamics and waveform morphology. Expert practice includes sensitivity checks to initial conditions, parameter priors, and numerical resolution limits."
        }
      ],
      interactiveActivities: [
        {
          id: "general-relativity-401-l02-act1",
          type: "matching_pairs",
          title: "Signal-to-Physics Match",
          description: "Match observed signal features to likely physical interpretation.",
          pairs: [
            { left: "Late-time waveform ringdown", right: "Post-merger compact remnant dynamics" },
            { left: "Gravitational redshift increase", right: "Stronger local gravitational potential" },
            { left: "Orbital precession anomaly", right: "Curvature-driven trajectory correction" },
            { left: "Lensing magnification variation", right: "Line-of-sight mass distribution effects" }
          ]
        },
        {
          id: "general-relativity-401-l02-act2",
          type: "scenario_practice",
          title: "Model Robustness Drill",
          description: "Defend a strong-field interpretation under parameter uncertainty.",
          instructions: [
            "Identify one parameter assumption with highest sensitivity.",
            "Propose one follow-up test to reduce ambiguity."
          ]
        }
      ],
      metadata: {
        prompts: [
          "Why are nonlinear effects central in strong-field relativity?",
          "How do simulation assumptions influence physical interpretation?",
          "What evidence would make you reject a favored strong-field model?"
        ]
      },
      learningAids: [
        {
          id: "general-relativity-401-l02-a1",
          type: "practice",
          title: "Robustness Checklist",
          content: "Checklist for assumptions, sensitivity tests, residual checks, and alternative explanations."
        }
      ]
    },
    {
      id: "general-relativity-401-l03",
      title: "Checkpoint 1: Geometry and Strong-Field Inference",
      type: "quiz",
      duration: 10,
      questions: [
        {
          id: "general-relativity-401-l03-q1",
          text: "In general relativity, gravity is best described as:",
          skillId: "general-relativity-401-skill-foundations",
          options: [
            { id: "a", text: "A force acting in flat space only" },
            { id: "b", text: "Spacetime curvature influencing motion" },
            { id: "c", text: "A quantum-only artifact" },
            { id: "d", text: "A mathematical convenience with no measurements" }
          ],
          correctOptionId: "b",
          explanation: "Relativistic gravity is modeled geometrically through spacetime curvature."
        },
        {
          id: "general-relativity-401-l03-q2",
          text: "Why are strong-field systems important for relativity testing?",
          skillId: "general-relativity-401-skill-strong-field",
          options: [
            { id: "a", text: "They avoid all uncertainty" },
            { id: "b", text: "They probe regimes where relativistic effects are largest" },
            { id: "c", text: "They simplify to Newtonian behavior always" },
            { id: "d", text: "They remove need for simulation" }
          ],
          correctOptionId: "b",
          explanation: "Extreme conditions make relativistic predictions observable at higher contrast."
        },
        {
          id: "general-relativity-401-l03-q3",
          text: "A convincing scientific claim should always include:",
          skillId: "general-relativity-401-skill-communication",
          options: [
            { id: "a", text: "Only the preferred interpretation" },
            { id: "b", text: "Assumptions, uncertainty, and competing alternatives" },
            { id: "c", text: "No mention of limitations" },
            { id: "d", text: "Only visual plots" }
          ],
          correctOptionId: "b",
          explanation: "Transparent assumptions and uncertainty are core to research rigor."
        },
        {
          id: "general-relativity-401-l03-q4",
          text: "If residuals show unexplained structure after fitting a waveform model, likely implication is:",
          skillId: "general-relativity-401-skill-inference",
          options: [
            { id: "a", text: "Model may be incomplete or assumptions mismatched" },
            { id: "b", text: "Model is automatically correct" },
            { id: "c", text: "Data should be ignored" },
            { id: "d", text: "No interpretation is possible" }
          ],
          correctOptionId: "a",
          explanation: "Structured residuals are often evidence of missing model components or bias."
        }
      ],
      learningAids: [
        {
          id: "general-relativity-401-l03-a1",
          type: "mnemonic",
          title: "PAIR",
          content: "Prediction, Assumptions, Inference, Residuals."
        }
      ]
    },
    {
      id: "general-relativity-401-l04",
      title: "Gravitational Waves, Black Holes, and Evidence Synthesis",
      type: "video",
      duration: 13,
      chunks: [
        {
          id: "general-relativity-401-l04-c1",
          kind: "concept",
          title: "Waveform Physics",
          content:
            "Gravitational-wave signals encode masses, spins, orbital evolution, and merger dynamics. Extracting these parameters requires model libraries, noise characterization, and careful uncertainty quantification."
        },
        {
          id: "general-relativity-401-l04-c2",
          kind: "concept",
          title: "Black Hole Tests",
          content:
            "Observational tests include horizon-scale imaging, orbital dynamics near compact objects, and post-merger ringdown signatures. Independent channels strengthen confidence when interpretations converge."
        },
        {
          id: "general-relativity-401-l04-c3",
          kind: "recap",
          title: "Synthesis Across Instruments",
          content:
            "Evidence synthesis combines gravitational-wave, electromagnetic, and timing measurements to reduce degeneracy and improve physical plausibility checks."
        }
      ],
      flashcards: [
        {
          id: "general-relativity-401-l04-f1",
          front: "Ringdown",
          back: "Late-stage signal as a merged compact object settles to equilibrium modes."
        },
        {
          id: "general-relativity-401-l04-f2",
          front: "Parameter degeneracy",
          back: "Different parameter combinations that can produce similar observable signals."
        },
        {
          id: "general-relativity-401-l04-f3",
          front: "Evidence synthesis",
          back: "Combining independent data channels to test consistency and reduce ambiguity."
        }
      ],
      learningAids: [
        {
          id: "general-relativity-401-l04-a1",
          type: "image",
          title: "Waveform Inference Pipeline",
          content: "Pipeline from detection candidate to parameter posteriors and model comparison outcomes."
        }
      ]
    },
    {
      id: "general-relativity-401-l05",
      title: "Cosmological GR Tests and Model Comparison Lab",
      type: "interactive",
      duration: 16,
      chunks: [
        {
          id: "general-relativity-401-l05-c1",
          kind: "concept",
          title: "Testing Relativity at Cosmological Scales",
          content:
            "Relativistic predictions at large scales are tested against expansion history, structure growth, lensing statistics, and background anisotropies. Agreement and tension patterns both provide insight."
        },
        {
          id: "general-relativity-401-l05-c2",
          kind: "practice",
          title: "Comparative Model Logic",
          content:
            "Model comparison balances fit quality, complexity, prior assumptions, and physical plausibility. Experts avoid over-claiming from small likelihood differences without robustness analysis."
        }
      ],
      interactiveActivities: [
        {
          id: "general-relativity-401-l05-act1",
          type: "sorting_buckets",
          title: "Evidence Role Sort",
          description: "Sort cosmological evidence by primary testing role.",
          buckets: ["Expansion Constraints", "Structure Constraints", "Geometry/Curvature Constraints"],
          items: [
            { text: "Distance-redshift supernova relation", bucket: "Expansion Constraints" },
            { text: "Weak lensing clustering statistics", bucket: "Structure Constraints" },
            { text: "Large-scale lensing geometry", bucket: "Geometry/Curvature Constraints" },
            { text: "Growth rate from redshift-space distortions", bucket: "Structure Constraints" }
          ]
        },
        {
          id: "general-relativity-401-l05-act2",
          type: "scenario_practice",
          title: "Model Selection Debate",
          description: "Argue for or against extending a baseline relativistic model.",
          instructions: [
            "State one empirical argument for extension.",
            "State one caution against premature model inflation."
          ]
        }
      ],
      metadata: {
        prompts: [
          "What makes a model extension scientifically justified rather than overfit?",
          "How should conflicting cosmological constraints be communicated responsibly?",
          "Which follow-up dataset would most improve discriminative power between two models?"
        ]
      },
      learningAids: [
        {
          id: "general-relativity-401-l05-a1",
          type: "practice",
          title: "Model Comparison Worksheet",
          content: "Template for assumptions, fit metrics, robustness checks, and interpretation boundaries."
        }
      ]
    },
    {
      id: "general-relativity-401-l06",
      title: "Checkpoint 2: Frontier Model Evaluation",
      type: "quiz",
      duration: 11,
      questions: [
        {
          id: "general-relativity-401-l06-q1",
          text: "Why are independent data channels valuable in relativistic inference?",
          skillId: "general-relativity-401-skill-synthesis",
          options: [
            { id: "a", text: "They remove all uncertainty" },
            { id: "b", text: "They provide complementary constraints and consistency checks" },
            { id: "c", text: "They guarantee one model is true" },
            { id: "d", text: "They eliminate need for theory" }
          ],
          correctOptionId: "b",
          explanation: "Independent channels reduce degeneracy and test inference robustness."
        },
        {
          id: "general-relativity-401-l06-q2",
          text: "Most responsible interpretation of mild model preference in one dataset is:",
          skillId: "general-relativity-401-skill-inference",
          options: [
            { id: "a", text: "Declare definitive new physics" },
            { id: "b", text: "Treat as tentative and seek cross-dataset validation" },
            { id: "c", text: "Ignore uncertainty ranges" },
            { id: "d", text: "Discard baseline models immediately" }
          ],
          correctOptionId: "b",
          explanation: "Scientific caution requires replication and robustness checks before strong claims."
        },
        {
          id: "general-relativity-401-l06-q3",
          text: "A key risk when comparing complex models is:",
          skillId: "general-relativity-401-skill-models",
          options: [
            { id: "a", text: "Overfitting without sufficient penalty for complexity" },
            { id: "b", text: "Having too much uncertainty reporting" },
            { id: "c", text: "Using independent datasets" },
            { id: "d", text: "Running sensitivity tests" }
          ],
          correctOptionId: "a",
          explanation: "Complex models can appear better-fit while generalizing poorly."
        },
        {
          id: "general-relativity-401-l06-q4",
          text: "Best communication practice for frontier results is to:",
          skillId: "general-relativity-401-skill-communication",
          options: [
            { id: "a", text: "Emphasize certainty and omit caveats" },
            { id: "b", text: "Report assumptions, uncertainty, alternatives, and testable predictions" },
            { id: "c", text: "Use only qualitative claims" },
            { id: "d", text: "Avoid discussing limitations" }
          ],
          correctOptionId: "b",
          explanation: "Transparent framing supports reproducibility and informed scientific dialogue."
        },
        {
          id: "general-relativity-401-l06-q5",
          text: "If two datasets disagree strongly, the first expert step is to:",
          skillId: "general-relativity-401-skill-inference",
          options: [
            { id: "a", text: "Select the more popular dataset" },
            { id: "b", text: "Audit assumptions, calibration, and analysis pipeline differences" },
            { id: "c", text: "Publish final conclusion immediately" },
            { id: "d", text: "Ignore one dataset entirely" }
          ],
          correctOptionId: "b",
          explanation: "Conflict diagnosis starts with methodological and assumption audits."
        }
      ],
      learningAids: [
        {
          id: "general-relativity-401-l06-a1",
          type: "mnemonic",
          title: "TEST",
          content: "Theory, Evidence, Sensitivity, Transparency."
        }
      ]
    },
    {
      id: "general-relativity-401-l07",
      title: "Capstone: Relativity Research Synthesis Proposal",
      type: "interactive",
      duration: 19,
      chunks: [
        {
          id: "general-relativity-401-l07-c1",
          kind: "practice",
          title: "Capstone Brief",
          content:
            "Develop a full research synthesis proposal integrating theory selection, measurement plan, uncertainty controls, model comparison strategy, and scientific communication framework."
        },
        {
          id: "general-relativity-401-l07-c2",
          kind: "recap",
          title: "Assessment Criteria",
          content:
            "Strong proposals align predicted observables with feasible measurements, explicitly bound assumptions, and define falsification criteria for preferred models."
        }
      ],
      metadata: {
        prompts: [
          "State your research question and two competing models.",
          "Define one falsification condition for your favored model.",
          "List top uncertainty sources and mitigation steps."
        ]
      },
      learningAids: [
        {
          id: "general-relativity-401-l07-a1",
          type: "practice",
          title: "Research Proposal Template",
          content: "Template for hypothesis, methods, assumptions, uncertainty budget, and interpretation plan."
        }
      ]
    }
  ]
};