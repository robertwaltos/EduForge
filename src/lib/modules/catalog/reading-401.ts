import type { LearningModule } from "@/lib/modules/types";

export const Reading401Module: LearningModule = {
  id: "reading-401",
  title: "Critical Interpretation, Research Synthesis, and Discourse Leadership",
  description:
    "Expert-level reading curriculum on critical interpretation frameworks, advanced synthesis, argument quality evaluation, and high-stakes evidence communication.",
  subject: "Reading",
  tags: ["core", "curriculum", "interactive", "critical-reading", "research", "communication"],
  minAge: 16,
  maxAge: 99,
  version: "2.0.0",
  difficultyBand: "advanced",
  localeSupport: ["en"],
  learningObjectives: [
    "Apply advanced critical interpretation frameworks to complex texts",
    "Evaluate argument validity across multi-source research discourse",
    "Synthesize competing perspectives into coherent evidence-led positions",
    "Assess uncertainty, bias, and limitation language in expert writing",
    "Produce decision-grade analytical briefings for diverse audiences",
    "Lead capstone discourse analysis with transparent interpretation boundaries"
  ],
  lessons: [
    {
      id: "reading-401-l01",
      title: "Interpretive Frameworks and Critical Lenses",
      type: "video",
      duration: 14,
      learningAids: [{ id: "reading-401-l01-a1", type: "practice", title: "Guided Practice", content: "Apply the lesson process and record your reasoning steps." }],
      chunks: [
        {
          id: "reading-401-l01-c1",
          kind: "concept",
          title: "Framework Selection",
          content:
            "Expert interpretation requires explicit analytical lenses aligned with text purpose, genre, historical context, and discourse function."
        },
        {
          id: "reading-401-l01-c2",
          kind: "concept",
          title: "Assumption Visibility",
          content:
            "Readers should surface interpretive assumptions and test alternative readings using evidence quality criteria."
        },
        {
          id: "reading-401-l01-c3",
          kind: "recap",
          title: "Interpretive Rigor",
          content:
            "Rigor depends on evidentiary transparency, counter-reading engagement, and argument coherence."
        }
      ],
      flashcards: [
        { id: "reading-401-l01-f1", front: "Interpretive lens", back: "Analytical perspective guiding attention to specific textual features." },
        { id: "reading-401-l01-f2", front: "Counter-reading", back: "Alternative interpretation tested against available evidence." },
        { id: "reading-401-l01-f3", front: "Interpretive assumption", back: "Underlying premise shaping a reader's analytical claim." }
      ]
    },
    {
      id: "reading-401-l02",
      title: "Argument Robustness and Evidence Governance Lab",
      type: "interactive",
      duration: 17,
      learningAids: [{ id: "reading-401-l02-a1", type: "practice", title: "Guided Practice", content: "Apply the lesson process and record your reasoning steps." }],
      chunks: [
        {
          id: "reading-401-l02-c1",
          kind: "concept",
          title: "Argument Robustness Metrics",
          content:
            "Robust arguments align claims with high-quality evidence, acknowledge uncertainty, and address plausible counterarguments."
        },
        {
          id: "reading-401-l02-c2",
          kind: "practice",
          title: "Evidence Governance",
          content:
            "High-level reading tasks require tracking source reliability, methodological quality, and relevance hierarchy."
        }
      ],
      interactiveActivities: [
        {
          id: "reading-401-l02-act1",
          type: "matching_pairs",
          title: "Robustness Match",
          description: "Match argument feature to quality implication.",
          pairs: [
            { left: "Explicit limitation statement", right: "Improves credibility through boundary clarity" },
            { left: "Selective citation only", right: "Raises bias risk" },
            { left: "Counterargument engagement", right: "Strengthens argumentative robustness" },
            { left: "Method-transparent evidence", right: "Improves verifiability" }
          ]
        },
        {
          id: "reading-401-l02-act2",
          type: "scenario_practice",
          title: "Policy Brief Vetting Drill",
          description: "Evaluate a policy brief's argument quality and evidentiary grounding.",
          instructions: [
            "Identify strongest evidence element.",
            "Identify one overclaim and rewrite it responsibly."
          ]
        }
      ]
    },
    {
      id: "reading-401-l03",
      title: "Checkpoint 1: Critical Frameworks and Argument Quality",
      type: "quiz",
      duration: 10,
      learningAids: [{ id: "reading-401-l03-a1", type: "practice", title: "Guided Practice", content: "Apply the lesson process and record your reasoning steps." }],
      questions: [
        {
          id: "reading-401-l03-q1",
          text: "Why make interpretive assumptions explicit?",
          skillId: "reading-401-skill-interpretation",
          options: [
            { id: "a", text: "To hide uncertainty" },
            { id: "b", text: "To test and refine claims transparently" },
            { id: "c", text: "To avoid evidence" },
            { id: "d", text: "To force one reading" }
          ],
          correctOptionId: "b",
          explanation: "Explicit assumptions enable critical testing and stronger reasoning."
        },
        {
          id: "reading-401-l03-q2",
          text: "A robust argument typically includes:",
          skillId: "reading-401-skill-argument",
          options: [
            { id: "a", text: "Single source with no caveats" },
            { id: "b", text: "Evidence quality explanation and counterargument handling" },
            { id: "c", text: "Assertion-only rhetoric" },
            { id: "d", text: "No uncertainty language" }
          ],
          correctOptionId: "b",
          explanation: "Robustness comes from evidence and critical engagement."
        },
        {
          id: "reading-401-l03-q3",
          text: "Overclaim risk increases when a writer:",
          skillId: "reading-401-skill-governance",
          options: [
            { id: "a", text: "States methodological limits" },
            { id: "b", text: "Presents certainty without scope boundaries" },
            { id: "c", text: "Uses independent corroboration" },
            { id: "d", text: "Compares alternatives" }
          ],
          correctOptionId: "b",
          explanation: "Unbounded certainty language often exceeds available evidence."
        },
        {
          id: "reading-401-l03-q4",
          text: "Most reliable interpretation practice is to:",
          skillId: "reading-401-skill-interpretation",
          options: [
            { id: "a", text: "Select one lens and ignore alternatives" },
            { id: "b", text: "Evaluate plausible alternatives against evidence" },
            { id: "c", text: "Prioritize personal preference" },
            { id: "d", text: "Avoid source context" }
          ],
          correctOptionId: "b",
          explanation: "Alternative testing improves interpretive rigor."
        }
      ]
    },
    {
      id: "reading-401-l04",
      title: "Advanced Synthesis: Cross-Discourse Integration",
      type: "video",
      duration: 14,
      learningAids: [{ id: "reading-401-l04-a1", type: "practice", title: "Guided Practice", content: "Apply the lesson process and record your reasoning steps." }],
      chunks: [
        {
          id: "reading-401-l04-c1",
          kind: "concept",
          title: "Synthesis Architectures",
          content:
            "Expert synthesis organizes evidence by themes, tensions, and explanatory frameworks instead of source-by-source summary."
        },
        {
          id: "reading-401-l04-c2",
          kind: "concept",
          title: "Conflict Mapping",
          content:
            "Competing claims should be mapped by assumptions, methods, and evidence strength to locate genuine disagreement points."
        },
        {
          id: "reading-401-l04-c3",
          kind: "recap",
          title: "Position with Boundaries",
          content:
            "High-quality synthesis arrives at a position while clearly stating unresolved uncertainty."
        }
      ],
      flashcards: [
        { id: "reading-401-l04-f1", front: "Synthesis architecture", back: "Organizational logic for integrating multiple sources into unified argument." },
        { id: "reading-401-l04-f2", front: "Conflict mapping", back: "Structured comparison of disagreements across assumptions and evidence." },
        { id: "reading-401-l04-f3", front: "Boundary condition", back: "Context where an interpretation may no longer hold." }
      ]
    },
    {
      id: "reading-401-l05",
      title: "Decision-Grade Communication Lab",
      type: "interactive",
      duration: 17,
      learningAids: [{ id: "reading-401-l05-a1", type: "practice", title: "Guided Practice", content: "Apply the lesson process and record your reasoning steps." }],
      chunks: [
        {
          id: "reading-401-l05-c1",
          kind: "practice",
          title: "Audience-Calibrated Briefing",
          content:
            "Expert reading outputs should be adapted for audience needs while preserving evidence integrity and uncertainty disclosure."
        },
        {
          id: "reading-401-l05-c2",
          kind: "recap",
          title: "Interpretation Accountability",
          content:
            "Responsible communication includes citation traceability, claim scope control, and explicit follow-up evidence needs."
        }
      ],
      interactiveActivities: [
        {
          id: "reading-401-l05-act1",
          type: "sorting_buckets",
          title: "Briefing Statement Sort",
          description: "Sort statements by communication strength.",
          buckets: ["Strong", "Weak"],
          items: [
            { text: "Conclusion with evidence qualifier and confidence range", bucket: "Strong" },
            { text: "Absolute claim with no citation", bucket: "Weak" },
            { text: "Recommendation with assumption disclosure", bucket: "Strong" },
            { text: "Unbounded forecast statement", bucket: "Weak" }
          ]
        },
        {
          id: "reading-401-l05-act2",
          type: "scenario_practice",
          title: "Executive Summary Drill",
          description: "Convert a long synthesis into a decision-grade summary.",
          instructions: [
            "State one headline claim with confidence level.",
            "State one key uncertainty that affects decision risk."
          ]
        }
      ]
    },
    {
      id: "reading-401-l06",
      title: "Checkpoint 2: Synthesis and Communication Rigor",
      type: "quiz",
      duration: 11,
      learningAids: [{ id: "reading-401-l06-a1", type: "practice", title: "Guided Practice", content: "Apply the lesson process and record your reasoning steps." }],
      questions: [
        {
          id: "reading-401-l06-q1",
          text: "Why include confidence qualifiers in analytical summaries?",
          skillId: "reading-401-skill-communication",
          options: [
            { id: "a", text: "To weaken all claims" },
            { id: "b", text: "To align claim strength with evidence certainty" },
            { id: "c", text: "To avoid conclusion" },
            { id: "d", text: "To remove source comparison" }
          ],
          correctOptionId: "b",
          explanation: "Confidence qualifiers support accurate risk-informed interpretation."
        },
        {
          id: "reading-401-l06-q2",
          text: "Strong synthesis differs from summary because it:",
          skillId: "reading-401-skill-synthesis",
          options: [
            { id: "a", text: "Lists sources separately" },
            { id: "b", text: "Builds an integrated claim from source relationships" },
            { id: "c", text: "Ignores disagreements" },
            { id: "d", text: "Avoids evidence weighting" }
          ],
          correctOptionId: "b",
          explanation: "Synthesis constructs integrated interpretation from cross-source dynamics."
        },
        {
          id: "reading-401-l06-q3",
          text: "Best response to conflicting high-quality sources is to:",
          skillId: "reading-401-skill-analysis",
          options: [
            { id: "a", text: "Choose one and ignore the other" },
            { id: "b", text: "Map assumptions and methods to explain divergence" },
            { id: "c", text: "Declare both wrong" },
            { id: "d", text: "Avoid interpretation" }
          ],
          correctOptionId: "b",
          explanation: "Conflict analysis requires methodological and assumption comparison."
        },
        {
          id: "reading-401-l06-q4",
          text: "Decision-grade analytical writing should prioritize:",
          skillId: "reading-401-skill-communication",
          options: [
            { id: "a", text: "Length over clarity" },
            { id: "b", text: "Clarity, traceable evidence, and boundary-aware recommendations" },
            { id: "c", text: "No uncertainty statements" },
            { id: "d", text: "Unverified claims" }
          ],
          correctOptionId: "b",
          explanation: "Decision audiences need concise, evidence-grounded, bounded conclusions."
        }
      ]
    },
    {
      id: "reading-401-l07",
      title: "Capstone: Critical Discourse Analysis Studio",
      type: "interactive",
      duration: 20,
      learningAids: [{ id: "reading-401-l07-a1", type: "practice", title: "Guided Practice", content: "Apply the lesson process and record your reasoning steps." }],
      chunks: [
        {
          id: "reading-401-l07-c1",
          kind: "practice",
          title: "Capstone Brief",
          content:
            "Produce a comprehensive discourse analysis integrating multiple complex texts, evidentiary rankings, conflicting interpretations, and an audience-specific recommendation."
        },
        {
          id: "reading-401-l07-c2",
          kind: "recap",
          title: "Assessment Criteria",
          content:
            "Top work demonstrates analytical rigor, transparent assumptions, balanced counter-reading engagement, and clearly bounded conclusions."
        }
      ],
      metadata: {
        prompts: [
          "State your central interpretive thesis and strongest supporting evidence.",
          "List two credible counter-readings and your response.",
          "Define one condition that would revise your final interpretation."
        ]
      }
    }
  ]
};


