import type { LearningModule } from "@/lib/modules/types";

export const Science401Module: LearningModule = {
  id: "science-401",
  title: "Scientific Research Strategy and Evidence Governance",
  description:
    "Expert-level science curriculum on research design governance, high-uncertainty inference, interdisciplinary evidence synthesis, and policy-facing scientific communication.",
  subject: "Science",
  tags: ["core", "curriculum", "interactive", "research", "governance", "evidence"],
  minAge: 16,
  maxAge: 99,
  version: "2.0.0",
  difficultyBand: "advanced",
  localeSupport: ["en"],
  learningObjectives: [
    "Design research programs with explicit validity, ethics, and reproducibility controls",
    "Evaluate competing scientific models using uncertainty-aware comparison",
    "Integrate evidence across methods, scales, and disciplines",
    "Assess bias, confounding, and publication-risk influences on conclusions",
    "Communicate high-stakes findings to technical and policy audiences responsibly",
    "Build a capstone research proposal with rigorous decision criteria"
  ],
  lessons: [
    {
      id: "science-401-l01",
      title: "Research Architecture and Validity Frameworks",
      type: "video",
      duration: 14,
      learningAids: [{ id: "science-401-l01-a1", type: "practice", title: "Guided Practice", content: "Apply the lesson process and record your reasoning steps." }],
      chunks: [
        {
          id: "science-401-l01-c1",
          kind: "concept",
          title: "Program-Level Research Design",
          content:
            "High-impact research requires design architecture that aligns questions, methods, data pipelines, and inference goals across study phases."
        },
        {
          id: "science-401-l01-c2",
          kind: "concept",
          title: "Validity Dimensions",
          content:
            "Internal validity, external validity, construct validity, and measurement validity must all be evaluated for credible inference."
        },
        {
          id: "science-401-l01-c3",
          kind: "recap",
          title: "Governance and Reproducibility",
          content:
            "Research governance includes preregistration, protocol transparency, data stewardship, and reproducible analysis pathways."
        }
      ],
      flashcards: [
        { id: "science-401-l01-f1", front: "Internal validity", back: "Confidence that observed effect is caused by intended factors." },
        { id: "science-401-l01-f2", front: "External validity", back: "Generalizability of findings beyond study conditions." },
        { id: "science-401-l01-f3", front: "Preregistration", back: "Documenting hypotheses and analysis plans before data outcomes are known." }
      ]
    },
    {
      id: "science-401-l02",
      title: "Model Competition and Uncertainty Lab",
      type: "interactive",
      duration: 17,
      learningAids: [{ id: "science-401-l02-a1", type: "practice", title: "Guided Practice", content: "Apply the lesson process and record your reasoning steps." }],
      chunks: [
        {
          id: "science-401-l02-c1",
          kind: "concept",
          title: "Competing Explanatory Models",
          content:
            "Expert science compares multiple plausible models and weighs fit, complexity, predictive utility, and assumption burden."
        },
        {
          id: "science-401-l02-c2",
          kind: "practice",
          title: "Uncertainty Decomposition",
          content:
            "Uncertainty should be decomposed into measurement, structural, and sampling components for clearer decision communication."
        }
      ],
      interactiveActivities: [
        {
          id: "science-401-l02-act1",
          type: "matching_pairs",
          title: "Model Metric Match",
          description: "Match comparison metric to interpretive role.",
          pairs: [
            { left: "Predictive error", right: "Out-of-sample performance signal" },
            { left: "Model complexity", right: "Risk of overfitting trade-off" },
            { left: "Residual structure", right: "Indicator of unmodeled dynamics" },
            { left: "Sensitivity profile", right: "Dependence on uncertain assumptions" }
          ]
        },
        {
          id: "science-401-l02-act2",
          type: "scenario_practice",
          title: "Competing Hypothesis Debate",
          description: "Defend one model while acknowledging uncertainty and alternatives.",
          instructions: [
            "State strongest evidence for your preferred model.",
            "State one result that would falsify your position."
          ]
        }
      ]
    },
    {
      id: "science-401-l03",
      title: "Checkpoint 1: Research Validity and Model Inference",
      type: "quiz",
      duration: 10,
      learningAids: [{ id: "science-401-l03-a1", type: "practice", title: "Guided Practice", content: "Apply the lesson process and record your reasoning steps." }],
      questions: [
        {
          id: "science-401-l03-q1",
          text: "Why is preregistration useful in high-stakes research?",
          skillId: "science-401-skill-governance",
          options: [
            { id: "a", text: "It removes need for replication" },
            { id: "b", text: "It reduces post-hoc analytical drift and selective reporting" },
            { id: "c", text: "It guarantees causal proof" },
            { id: "d", text: "It prevents all bias" }
          ],
          correctOptionId: "b",
          explanation: "Preregistration strengthens transparency and inference integrity."
        },
        {
          id: "science-401-l03-q2",
          text: "Residual structure after fitting often suggests:",
          skillId: "science-401-skill-models",
          options: [
            { id: "a", text: "Perfect model adequacy" },
            { id: "b", text: "Potential unmodeled process or assumption mismatch" },
            { id: "c", text: "No need for further analysis" },
            { id: "d", text: "Guaranteed causal interpretation" }
          ],
          correctOptionId: "b",
          explanation: "Structured residuals indicate likely model deficiency."
        },
        {
          id: "science-401-l03-q3",
          text: "External validity addresses whether findings:",
          skillId: "science-401-skill-validity",
          options: [
            { id: "a", text: "Generalize beyond the sample context" },
            { id: "b", text: "Use proper units" },
            { id: "c", text: "Contain no noise" },
            { id: "d", text: "Are mathematically elegant" }
          ],
          correctOptionId: "a",
          explanation: "External validity concerns broader applicability of results."
        },
        {
          id: "science-401-l03-q4",
          text: "Model comparison should balance fit with:",
          skillId: "science-401-skill-models",
          options: [
            { id: "a", text: "Complexity and robustness" },
            { id: "b", text: "Narrative appeal" },
            { id: "c", text: "Single metric only" },
            { id: "d", text: "Author preference" }
          ],
          correctOptionId: "a",
          explanation: "Overfitting risk and robustness are central comparison dimensions."
        }
      ]
    },
    {
      id: "science-401-l04",
      title: "Bias, Confounding, and Meta-Evidence Evaluation",
      type: "video",
      duration: 14,
      learningAids: [{ id: "science-401-l04-a1", type: "practice", title: "Guided Practice", content: "Apply the lesson process and record your reasoning steps." }],
      chunks: [
        {
          id: "science-401-l04-c1",
          kind: "concept",
          title: "Bias Taxonomy",
          content:
            "Selection bias, measurement bias, publication bias, and analytic bias can independently distort findings."
        },
        {
          id: "science-401-l04-c2",
          kind: "concept",
          title: "Confounding Architecture",
          content:
            "Confounding pathways can mimic effects unless design or statistical controls are sufficient."
        },
        {
          id: "science-401-l04-c3",
          kind: "recap",
          title: "Meta-Evidence Reasoning",
          content:
            "Scientific confidence rises when independent studies converge with compatible effect direction and mechanism plausibility."
        }
      ],
      flashcards: [
        { id: "science-401-l04-f1", front: "Publication bias", back: "Distortion from selective reporting of positive or significant outcomes." },
        { id: "science-401-l04-f2", front: "Confounder", back: "Variable associated with both predictor and outcome, distorting causal inference." },
        { id: "science-401-l04-f3", front: "Evidence convergence", back: "Agreement across independent methods and datasets." }
      ]
    },
    {
      id: "science-401-l05",
      title: "Policy-Facing Scientific Communication Lab",
      type: "interactive",
      duration: 17,
      learningAids: [{ id: "science-401-l05-a1", type: "practice", title: "Guided Practice", content: "Apply the lesson process and record your reasoning steps." }],
      chunks: [
        {
          id: "science-401-l05-c1",
          kind: "practice",
          title: "Decision-Grade Science Communication",
          content:
            "Policy audiences need clear conclusions, confidence ranges, scenario implications, and explicit uncertainty boundaries."
        },
        {
          id: "science-401-l05-c2",
          kind: "recap",
          title: "Avoiding Overclaim",
          content:
            "Experts communicate what data supports, what remains unresolved, and what follow-up evidence would change recommendations."
        }
      ],
      interactiveActivities: [
        {
          id: "science-401-l05-act1",
          type: "sorting_buckets",
          title: "Statement Quality Sort",
          description: "Sort statements by communication rigor.",
          buckets: ["Rigor Strong", "Rigor Weak"],
          items: [
            { text: "Result with uncertainty interval and assumption note", bucket: "Rigor Strong" },
            { text: "Absolute claim without confidence bounds", bucket: "Rigor Weak" },
            { text: "Recommendation with scenario sensitivity", bucket: "Rigor Strong" },
            { text: "Policy demand with no evidence link", bucket: "Rigor Weak" }
          ]
        },
        {
          id: "science-401-l05-act2",
          type: "scenario_practice",
          title: "Briefing Simulation",
          description: "Prepare a concise science briefing for decision-makers.",
          instructions: [
            "State one clear headline finding.",
            "State one uncertainty condition that changes interpretation."
          ]
        }
      ]
    },
    {
      id: "science-401-l06",
      title: "Checkpoint 2: Evidence Governance and Decision Communication",
      type: "quiz",
      duration: 11,
      learningAids: [{ id: "science-401-l06-a1", type: "practice", title: "Guided Practice", content: "Apply the lesson process and record your reasoning steps." }],
      questions: [
        {
          id: "science-401-l06-q1",
          text: "Why is overconfident policy communication risky?",
          skillId: "science-401-skill-communication",
          options: [
            { id: "a", text: "It improves uncertainty tracking" },
            { id: "b", text: "It hides assumptions and can misguide decisions" },
            { id: "c", text: "It always increases evidence quality" },
            { id: "d", text: "It removes model limitations" }
          ],
          correctOptionId: "b",
          explanation: "Decisions degrade when uncertainty and assumptions are hidden."
        },
        {
          id: "science-401-l06-q2",
          text: "Most credible high-stakes scientific recommendation includes:",
          skillId: "science-401-skill-governance",
          options: [
            { id: "a", text: "Single estimate only" },
            { id: "b", text: "Evidence, uncertainty bounds, assumptions, and decision implications" },
            { id: "c", text: "No model comparison" },
            { id: "d", text: "No bias discussion" }
          ],
          correctOptionId: "b",
          explanation: "Complete framing supports responsible and traceable decisions."
        },
        {
          id: "science-401-l06-q3",
          text: "Evidence convergence from independent methods primarily improves:",
          skillId: "science-401-skill-evidence",
          options: [
            { id: "a", text: "Narrative simplicity" },
            { id: "b", text: "Confidence robustness" },
            { id: "c", text: "Model complexity" },
            { id: "d", text: "Bias certainty" }
          ],
          correctOptionId: "b",
          explanation: "Independent convergence reduces single-method fragility."
        },
        {
          id: "science-401-l06-q4",
          text: "Confounding risk is best addressed by:",
          skillId: "science-401-skill-validity",
          options: [
            { id: "a", text: "Ignoring alternative pathways" },
            { id: "b", text: "Design controls and transparent adjustment strategy" },
            { id: "c", text: "Only increasing sample size" },
            { id: "d", text: "Removing all variables" }
          ],
          correctOptionId: "b",
          explanation: "Confounding requires explicit design and analytic controls."
        }
      ]
    },
    {
      id: "science-401-l07",
      title: "Capstone: Research Program Proposal Studio",
      type: "interactive",
      duration: 20,
      learningAids: [{ id: "science-401-l07-a1", type: "practice", title: "Guided Practice", content: "Apply the lesson process and record your reasoning steps." }],
      chunks: [
        {
          id: "science-401-l07-c1",
          kind: "practice",
          title: "Capstone Brief",
          content:
            "Design a research program addressing a complex scientific question with phased methodology, uncertainty controls, ethics framework, and decision-use outputs."
        },
        {
          id: "science-401-l07-c2",
          kind: "recap",
          title: "Assessment Criteria",
          content:
            "Strong proposals align methods to questions, define validity safeguards, and communicate actionable interpretation boundaries."
        }
      ],
      metadata: {
        prompts: [
          "Define your primary question and measurable outcomes.",
          "List top three uncertainty drivers and mitigation plan.",
          "State what future evidence would revise your recommendations."
        ]
      }
    }
  ]
};


