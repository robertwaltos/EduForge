import type { LearningModule } from "@/lib/modules/types";

export const Astronomy401Module: LearningModule = {
  id: "astronomy-401",
  title: "Astronomy Research Design and Cosmological Inference",
  description:
    "Expert-level astronomy curriculum focused on research-grade observation strategy, statistical inference, exoplanet and transient analysis, cosmological parameter estimation, and scientific communication.",
  subject: "Astronomy",
  tags: ["core", "curriculum", "interactive", "astronomy", "research", "inference"],
  minAge: 13,
  maxAge: 99,
  version: "2.0.0",
  difficultyBand: "advanced",
  localeSupport: ["en"],
  thumbnail: "/placeholders/lesson-robot.svg",
  learningObjectives: [
    "Design observation plans with clear signal, noise, and uncertainty assumptions",
    "Apply statistical methods to evaluate astrophysical hypotheses",
    "Interpret multi-wavelength data for galaxies, stars, and transient events",
    "Evaluate evidence for exoplanets using radial velocity and transit methods",
    "Connect cosmological models to observational constraints",
    "Communicate conclusions with transparent assumptions and confidence limits"
  ],
  lessons: [
    {
      id: "astronomy-401-l01",
      title: "Observational Strategy and Survey Design",
      type: "video",
      duration: 13,
      chunks: [
        {
          id: "astronomy-401-l01-c1",
          kind: "concept",
          title: "From Question to Measurement",
          content:
            "High-quality astronomy begins by matching scientific questions to measurable signals. Survey design choices such as cadence, exposure time, filter selection, and sky coverage determine what phenomena can be detected and what remains invisible."
        },
        {
          id: "astronomy-401-l01-c2",
          kind: "concept",
          title: "Uncertainty Budgets",
          content:
            "Researchers separate random and systematic uncertainty sources: detector noise, background contamination, calibration drift, atmospheric variability, and model assumptions. Explicit uncertainty budgets make downstream inference defensible."
        },
        {
          id: "astronomy-401-l01-c3",
          kind: "recap",
          title: "Design Trade-offs",
          content:
            "A deep narrow survey and a shallow wide survey answer different questions. Experts justify trade-offs by expected discovery yield, follow-up feasibility, and the scientific value of negative results."
        }
      ],
      flashcards: [
        {
          id: "astronomy-401-l01-f1",
          front: "Survey cadence",
          back: "The frequency of repeated observations over time, critical for detecting variability and transients."
        },
        {
          id: "astronomy-401-l01-f2",
          front: "Systematic uncertainty",
          back: "Bias-like error source that can shift measurements consistently if not corrected."
        },
        {
          id: "astronomy-401-l01-f3",
          front: "Signal-to-noise ratio",
          back: "A measure of detection confidence comparing true signal strength to noise level."
        }
      ],
      learningAids: [
        {
          id: "astronomy-401-l01-a1",
          type: "image",
          title: "Survey Design Matrix",
          content: "Decision matrix mapping cadence, depth, and wavelength choices to research objectives."
        }
      ]
    },
    {
      id: "astronomy-401-l02",
      title: "Signal Extraction and Statistical Inference Lab",
      type: "interactive",
      duration: 16,
      chunks: [
        {
          id: "astronomy-401-l02-c1",
          kind: "concept",
          title: "Detection Versus Interpretation",
          content:
            "Detecting a feature is not equivalent to proving a physical interpretation. Robust astronomy separates detection confidence from model selection confidence and reports both explicitly."
        },
        {
          id: "astronomy-401-l02-c2",
          kind: "practice",
          title: "Model Comparison",
          content:
            "Researchers compare hypotheses with likelihoods, posterior estimates, residual diagnostics, and out-of-sample checks. The preferred model is not only best-fit; it is most credible under uncertainty and assumptions."
        }
      ],
      interactiveActivities: [
        {
          id: "astronomy-401-l02-act1",
          type: "matching_pairs",
          title: "Error Source Match",
          description: "Match observational issues to strongest mitigation approach.",
          pairs: [
            { left: "Flat-field calibration drift", right: "Frequent recalibration and reference frame checks" },
            { left: "Cosmic ray artifacts", right: "Frame stacking with outlier rejection" },
            { left: "Background sky variation", right: "Local background modeling" },
            { left: "Instrument thermal noise", right: "Exposure planning and detector correction" }
          ]
        },
        {
          id: "astronomy-401-l02-act2",
          type: "scenario_practice",
          title: "Inference Defense Drill",
          description: "Defend a tentative signal claim to a skeptical review panel.",
          instructions: [
            "State evidence supporting detection confidence.",
            "State one assumption that could invalidate the conclusion."
          ]
        }
      ],
      metadata: {
        prompts: [
          "Why must systematic uncertainty be modeled separately from random noise?",
          "What result would make you reject your preferred astrophysical model?",
          "How do residual patterns reveal model mismatch?"
        ]
      },
      learningAids: [
        {
          id: "astronomy-401-l02-a1",
          type: "practice",
          title: "Inference Checklist",
          content: "Template for detection threshold, model assumptions, residual diagnostics, and confidence reporting."
        }
      ]
    },
    {
      id: "astronomy-401-l03",
      title: "Checkpoint 1: Research Methods",
      type: "quiz",
      duration: 10,
      questions: [
        {
          id: "astronomy-401-l03-q1",
          text: "Which factor most directly affects whether short-lived transients are detected?",
          skillId: "astronomy-401-skill-survey",
          options: [
            { id: "a", text: "Catalog naming convention" },
            { id: "b", text: "Observation cadence" },
            { id: "c", text: "Telescope paint color" },
            { id: "d", text: "Coordinate system choice" }
          ],
          correctOptionId: "b",
          explanation: "Transient detection probability is highly sensitive to revisit frequency."
        },
        {
          id: "astronomy-401-l03-q2",
          text: "Why separate systematic from random uncertainty?",
          skillId: "astronomy-401-skill-inference",
          options: [
            { id: "a", text: "To make plots look simpler" },
            { id: "b", text: "Because they influence bias and variance differently" },
            { id: "c", text: "To reduce data volume only" },
            { id: "d", text: "No practical reason" }
          ],
          correctOptionId: "b",
          explanation: "Systematic errors can bias conclusions even when random noise is low."
        },
        {
          id: "astronomy-401-l03-q3",
          text: "A model fits well but residuals show structure. Best interpretation?",
          skillId: "astronomy-401-skill-inference",
          options: [
            { id: "a", text: "Model likely misses important process" },
            { id: "b", text: "Model is definitively correct" },
            { id: "c", text: "Residuals are always random" },
            { id: "d", text: "Data should be discarded immediately" }
          ],
          correctOptionId: "a",
          explanation: "Structured residuals often indicate under-modeled physics or measurement artifacts."
        },
        {
          id: "astronomy-401-l03-q4",
          text: "Most defensible scientific claim includes:",
          skillId: "astronomy-401-skill-communication",
          options: [
            { id: "a", text: "Only the best-fit value" },
            { id: "b", text: "Estimate, uncertainty bounds, and assumptions" },
            { id: "c", text: "A strong conclusion without caveats" },
            { id: "d", text: "Only graphical output" }
          ],
          correctOptionId: "b",
          explanation: "Transparent assumptions and uncertainty are essential for credible inference."
        }
      ],
      learningAids: [
        {
          id: "astronomy-401-l03-a1",
          type: "mnemonic",
          title: "CUE",
          content: "Claim, Uncertainty, Evidence."
        }
      ]
    },
    {
      id: "astronomy-401-l04",
      title: "Exoplanets, Transients, and Multi-Messenger Astronomy",
      type: "video",
      duration: 13,
      chunks: [
        {
          id: "astronomy-401-l04-c1",
          kind: "concept",
          title: "Exoplanet Evidence Chains",
          content:
            "Transit depth, periodicity, and radial-velocity signals combine to constrain planet radius, orbital period, and minimum mass. Robust interpretation controls for stellar activity, instrumental drift, and false-positive scenarios."
        },
        {
          id: "astronomy-401-l04-c2",
          kind: "concept",
          title: "Transient Event Classification",
          content:
            "Supernovae, tidal disruption events, gamma-ray bursts, and kilonova candidates require rapid classification pipelines with follow-up prioritization. Timing and multi-wavelength context are often decisive."
        },
        {
          id: "astronomy-401-l04-c3",
          kind: "recap",
          title: "Multi-Messenger Context",
          content:
            "Combining electromagnetic, gravitational-wave, and neutrino information improves source localization and physical interpretation. Cross-observatory coordination is now central to frontier astronomy."
        }
      ],
      flashcards: [
        {
          id: "astronomy-401-l04-f1",
          front: "Transit method",
          back: "Detects periodic brightness dips when a planet passes in front of its host star."
        },
        {
          id: "astronomy-401-l04-f2",
          front: "Radial velocity",
          back: "Infers planetary influence by measuring periodic Doppler shifts in stellar spectra."
        },
        {
          id: "astronomy-401-l04-f3",
          front: "Multi-messenger astronomy",
          back: "Study of astrophysical events using multiple signal channels beyond light alone."
        }
      ],
      learningAids: [
        {
          id: "astronomy-401-l04-a1",
          type: "image",
          title: "Evidence Pipeline Diagram",
          content: "Workflow from candidate detection to follow-up confirmation in exoplanet/transient science."
        }
      ]
    },
    {
      id: "astronomy-401-l05",
      title: "Cosmological Parameter Estimation Lab",
      type: "interactive",
      duration: 16,
      chunks: [
        {
          id: "astronomy-401-l05-c1",
          kind: "concept",
          title: "From Data to Cosmology",
          content:
            "Cosmological inference links redshift, distance indicators, large-scale structure, and background radiation observations to parameter estimates such as expansion rate and matter-energy composition."
        },
        {
          id: "astronomy-401-l05-c2",
          kind: "practice",
          title: "Degeneracy and Tension",
          content:
            "Different datasets can favor different parameter ranges. Experts test whether tension reflects measurement bias, model incompleteness, or statistically expected variation."
        }
      ],
      interactiveActivities: [
        {
          id: "astronomy-401-l05-act1",
          type: "sorting_buckets",
          title: "Dataset Role Sort",
          description: "Sort observational datasets by strongest cosmological constraint role.",
          buckets: ["Expansion History", "Structure Growth", "Early-Universe Conditions"],
          items: [
            { text: "Type Ia supernova distance ladders", bucket: "Expansion History" },
            { text: "Galaxy clustering statistics", bucket: "Structure Growth" },
            { text: "Cosmic microwave background maps", bucket: "Early-Universe Conditions" },
            { text: "Baryon acoustic oscillation scales", bucket: "Expansion History" }
          ]
        },
        {
          id: "astronomy-401-l05-act2",
          type: "scenario_practice",
          title: "Parameter Tension Debate",
          description: "Argue whether an observed dataset tension is methodological or physical.",
          instructions: [
            "Present one methodological explanation.",
            "Present one new-physics hypothesis with a testable prediction."
          ]
        }
      ],
      metadata: {
        prompts: [
          "What does parameter degeneracy mean in practice?",
          "How should researchers communicate tension without overstating conclusions?",
          "Which follow-up measurement would most reduce uncertainty in your model choice?"
        ]
      },
      learningAids: [
        {
          id: "astronomy-401-l05-a1",
          type: "practice",
          title: "Cosmology Analysis Sheet",
          content: "Template for parameter assumptions, dataset dependencies, and robustness checks."
        }
      ]
    },
    {
      id: "astronomy-401-l06",
      title: "Checkpoint 2: Frontier Inference",
      type: "quiz",
      duration: 11,
      questions: [
        {
          id: "astronomy-401-l06-q1",
          text: "Why combine transit and radial-velocity observations for exoplanets?",
          skillId: "astronomy-401-skill-exoplanets",
          options: [
            { id: "a", text: "To reduce telescope scheduling" },
            { id: "b", text: "To constrain complementary planet properties" },
            { id: "c", text: "To avoid uncertainty reporting" },
            { id: "d", text: "No scientific advantage" }
          ],
          correctOptionId: "b",
          explanation: "Each method constrains different parameters and strengthens interpretation together."
        },
        {
          id: "astronomy-401-l06-q2",
          text: "A persistent parameter tension across independent pipelines suggests:",
          skillId: "astronomy-401-skill-cosmology",
          options: [
            { id: "a", text: "Immediate proof of new physics" },
            { id: "b", text: "Need for deeper systematic checks and model stress-testing" },
            { id: "c", text: "Data can be ignored" },
            { id: "d", text: "One dataset must be deleted" }
          ],
          correctOptionId: "b",
          explanation: "Tension requires careful methodological and theoretical evaluation before strong claims."
        },
        {
          id: "astronomy-401-l06-q3",
          text: "Most important feature of a research-grade result statement?",
          skillId: "astronomy-401-skill-communication",
          options: [
            { id: "a", text: "Only confidence language" },
            { id: "b", text: "Estimate, uncertainty, assumptions, and limits" },
            { id: "c", text: "Single numerical claim without context" },
            { id: "d", text: "Avoid any caveats" }
          ],
          correctOptionId: "b",
          explanation: "Transparent scope and uncertainty make results reproducible and credible."
        },
        {
          id: "astronomy-401-l06-q4",
          text: "What is a core advantage of multi-messenger astronomy?",
          skillId: "astronomy-401-skill-transients",
          options: [
            { id: "a", text: "Eliminates instrument calibration needs" },
            { id: "b", text: "Provides complementary constraints from different physical channels" },
            { id: "c", text: "Replaces all optical telescopes" },
            { id: "d", text: "Guarantees immediate classification" }
          ],
          correctOptionId: "b",
          explanation: "Multiple channels improve inference robustness and source interpretation."
        },
        {
          id: "astronomy-401-l06-q5",
          text: "Best practice when presenting potentially controversial cosmological findings?",
          skillId: "astronomy-401-skill-communication",
          options: [
            { id: "a", text: "Emphasize certainty and omit limitations" },
            { id: "b", text: "Report assumptions, alternatives, and needed follow-up tests" },
            { id: "c", text: "Publish only if no uncertainties remain" },
            { id: "d", text: "Ignore cross-check datasets" }
          ],
          correctOptionId: "b",
          explanation: "Responsible communication includes limitations and testable next steps."
        }
      ],
      learningAids: [
        {
          id: "astronomy-401-l06-a1",
          type: "mnemonic",
          title: "STAR",
          content: "Signal, Test, Assumptions, Robustness."
        }
      ]
    },
    {
      id: "astronomy-401-l07",
      title: "Capstone: Astronomy Research Proposal Studio",
      type: "interactive",
      duration: 19,
      chunks: [
        {
          id: "astronomy-401-l07-c1",
          kind: "practice",
          title: "Proposal Brief",
          content:
            "Develop a full research proposal: scientific question, observation plan, inference framework, risk controls, and communication strategy for expected and null outcomes."
        },
        {
          id: "astronomy-401-l07-c2",
          kind: "recap",
          title: "Evaluation Criteria",
          content:
            "Strong proposals align measurement design with hypothesis, define uncertainty controls, and present realistic analysis and follow-up pathways."
        }
      ],
      metadata: {
        prompts: [
          "State your primary hypothesis and measurable prediction.",
          "List two dominant uncertainty sources and mitigation plans.",
          "Define what result would falsify your preferred model."
        ]
      },
      learningAids: [
        {
          id: "astronomy-401-l07-a1",
          type: "practice",
          title: "Proposal Template",
          content: "Template for question, method, uncertainty budget, analysis plan, and reporting framework."
        }
      ]
    }
  ]
};