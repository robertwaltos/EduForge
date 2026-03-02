import type { LearningModule } from "@/lib/modules/types";

export const Reading301Module: LearningModule = {
  id: "reading-301",
  title: "Analytical Reading, Rhetoric, and Synthesis III",
  description:
    "Advanced reading curriculum on rhetorical analysis, thematic synthesis, source comparison, and evidence-based interpretation of complex texts.",
  subject: "Reading",
  tags: ["core", "curriculum", "interactive", "rhetoric", "analysis", "literacy"],
  minAge: 13,
  maxAge: 18,
  version: "2.0.0",
  difficultyBand: "advanced",
  localeSupport: ["en"],
  learningObjectives: [
    "Analyze rhetorical choices in argument and informational texts",
    "Evaluate source reliability, perspective, and potential bias",
    "Synthesize central ideas across multiple complex readings",
    "Interpret figurative language and tone shifts in literary passages",
    "Construct concise analytical responses with layered evidence",
    "Differentiate strong reasoning from logical fallacies"
  ],
  lessons: [
    {
      id: "reading-301-l01",
      title: "Rhetorical Situation and Author Strategy",
      type: "video",
      duration: 14,
      learningAids: [{ id: "reading-301-l01-a1", type: "practice", title: "Guided Practice", content: "Apply the lesson process and record your reasoning steps." }],
      chunks: [
        {
          id: "reading-301-l01-c1",
          kind: "concept",
          title: "Purpose, Audience, Context",
          content:
            "Advanced reading begins by identifying rhetorical situation: who is speaking, to whom, for what purpose, and under what context."
        },
        {
          id: "reading-301-l01-c2",
          kind: "concept",
          title: "Appeal and Structure Choices",
          content:
            "Authors shape persuasion through evidence selection, emotional framing, and organizational sequencing."
        },
        {
          id: "reading-301-l01-c3",
          kind: "recap",
          title: "Strategy Evaluation",
          content:
            "Analytical reading should evaluate effectiveness, not only identify devices."
        }
      ],
      flashcards: [
        { id: "reading-301-l01-f1", front: "Rhetorical situation", back: "Purpose-audience-context framing for a text." },
        { id: "reading-301-l01-f2", front: "Appeal", back: "Persuasive mode such as logical, ethical, or emotional framing." },
        { id: "reading-301-l01-f3", front: "Rhetorical strategy", back: "Deliberate technique used to influence interpretation." }
      ]
    },
    {
      id: "reading-301-l02",
      title: "Source Quality and Bias Detection Lab",
      type: "interactive",
      duration: 16,
      learningAids: [{ id: "reading-301-l02-a1", type: "practice", title: "Guided Practice", content: "Apply the lesson process and record your reasoning steps." }],
      chunks: [
        {
          id: "reading-301-l02-c1",
          kind: "concept",
          title: "Reliability Signals",
          content:
            "Source reliability depends on evidence transparency, methodological rigor, authorship credibility, and editorial process."
        },
        {
          id: "reading-301-l02-c2",
          kind: "practice",
          title: "Bias and Framing",
          content:
            "Every source carries perspective; strong readers identify framing choices and test claims against independent evidence."
        }
      ],
      interactiveActivities: [
        {
          id: "reading-301-l02-act1",
          type: "matching_pairs",
          title: "Reliability Cue Match",
          description: "Match source characteristics to credibility implications.",
          pairs: [
            { left: "Method and data disclosed", right: "Higher verification potential" },
            { left: "Anonymous authorship", right: "Reduced accountability" },
            { left: "Independent corroboration", right: "Stronger confidence" },
            { left: "Single anecdotal evidence", right: "Weak generalizability" }
          ]
        },
        {
          id: "reading-301-l02-act2",
          type: "scenario_practice",
          title: "Source Vetting Drill",
          description: "Rank source options for a research question.",
          instructions: [
            "Identify one strongest source and justify.",
            "Identify one high-risk source and explain limitations."
          ]
        }
      ]
    },
    {
      id: "reading-301-l03",
      title: "Checkpoint 1: Rhetoric and Source Evaluation",
      type: "quiz",
      duration: 10,
      learningAids: [{ id: "reading-301-l03-a1", type: "practice", title: "Guided Practice", content: "Apply the lesson process and record your reasoning steps." }],
      questions: [
        {
          id: "reading-301-l03-q1",
          text: "Why analyze audience when interpreting argument strategy?",
          skillId: "reading-301-skill-rhetoric",
          options: [
            { id: "a", text: "Audience has no influence" },
            { id: "b", text: "Audience shapes tone, evidence, and persuasive choices" },
            { id: "c", text: "Only author biography matters" },
            { id: "d", text: "Audience applies only in fiction" }
          ],
          correctOptionId: "b",
          explanation: "Persuasive design is audience-dependent."
        },
        {
          id: "reading-301-l03-q2",
          text: "Most reliable source signal is:",
          skillId: "reading-301-skill-sources",
          options: [
            { id: "a", text: "Strong headline language" },
            { id: "b", text: "Transparent evidence and verifiable methodology" },
            { id: "c", text: "Anonymous claims" },
            { id: "d", text: "No citation list" }
          ],
          correctOptionId: "b",
          explanation: "Transparency enables independent verification."
        },
        {
          id: "reading-301-l03-q3",
          text: "A framing bias often appears when an author:",
          skillId: "reading-301-skill-bias",
          options: [
            { id: "a", text: "Presents multiple perspectives fairly" },
            { id: "b", text: "Selectively presents evidence supporting one angle" },
            { id: "c", text: "Defines key terms" },
            { id: "d", text: "Cites independent studies" }
          ],
          correctOptionId: "b",
          explanation: "Selective evidence emphasis is a common bias signal."
        },
        {
          id: "reading-301-l03-q4",
          text: "Best analytical response to a rhetorical technique is:",
          skillId: "reading-301-skill-analysis",
          options: [
            { id: "a", text: "Name technique only" },
            { id: "b", text: "Explain its effect on audience interpretation" },
            { id: "c", text: "Ignore context" },
            { id: "d", text: "Summarize unrelated section" }
          ],
          correctOptionId: "b",
          explanation: "Analysis must connect technique to audience effect and purpose."
        }
      ]
    },
    {
      id: "reading-301-l04",
      title: "Literary Analysis: Tone, Symbol, and Theme",
      type: "video",
      duration: 14,
      learningAids: [{ id: "reading-301-l04-a1", type: "practice", title: "Guided Practice", content: "Apply the lesson process and record your reasoning steps." }],
      chunks: [
        {
          id: "reading-301-l04-c1",
          kind: "concept",
          title: "Tone and Voice",
          content:
            "Tone is conveyed through diction, syntax, and narrative stance; shifts in tone often signal turning points in interpretation."
        },
        {
          id: "reading-301-l04-c2",
          kind: "concept",
          title: "Symbol and Motif",
          content:
            "Recurring images or objects may carry thematic meaning that evolves across a text."
        },
        {
          id: "reading-301-l04-c3",
          kind: "recap",
          title: "Theme Formation",
          content:
            "Themes should be stated as interpretive insights supported by textual patterns, not as single-word labels."
        }
      ],
      flashcards: [
        { id: "reading-301-l04-f1", front: "Tone", back: "Attitude conveyed by authorial language choices." },
        { id: "reading-301-l04-f2", front: "Motif", back: "Recurring element that reinforces thematic pattern." },
        { id: "reading-301-l04-f3", front: "Theme", back: "Broader interpretive message developed through textual evidence." }
      ]
    },
    {
      id: "reading-301-l05",
      title: "Multi-Text Synthesis and Reasoning Lab",
      type: "interactive",
      duration: 16,
      learningAids: [{ id: "reading-301-l05-a1", type: "practice", title: "Guided Practice", content: "Apply the lesson process and record your reasoning steps." }],
      chunks: [
        {
          id: "reading-301-l05-c1",
          kind: "practice",
          title: "Cross-Text Alignment",
          content:
            "Synthesis requires identifying points of convergence, divergence, and unresolved tension across sources."
        },
        {
          id: "reading-301-l05-c2",
          kind: "recap",
          title: "Reasoning Quality",
          content:
            "Strong synthesis explains relationships among texts rather than listing source summaries."
        }
      ],
      interactiveActivities: [
        {
          id: "reading-301-l05-act1",
          type: "sorting_buckets",
          title: "Synthesis Move Sort",
          description: "Sort statements by synthesis move type.",
          buckets: ["Agreement", "Contrast", "Qualification"],
          items: [
            { text: "Both authors cite similar trend data", bucket: "Agreement" },
            { text: "Source B challenges Source A's assumptions", bucket: "Contrast" },
            { text: "Source C supports A but only in limited context", bucket: "Qualification" },
            { text: "Two studies differ in sampling approach", bucket: "Contrast" }
          ]
        },
        {
          id: "reading-301-l05-act2",
          type: "scenario_practice",
          title: "Synthesis Paragraph Builder",
          description: "Draft a concise synthesis claim using three source snippets.",
          instructions: [
            "State one central synthesis claim.",
            "Cite at least two source relationships in your support."
          ]
        }
      ]
    },
    {
      id: "reading-301-l06",
      title: "Checkpoint 2: Literary and Synthesis Analysis",
      type: "quiz",
      duration: 11,
      learningAids: [{ id: "reading-301-l06-a1", type: "practice", title: "Guided Practice", content: "Apply the lesson process and record your reasoning steps." }],
      questions: [
        {
          id: "reading-301-l06-q1",
          text: "A valid theme statement should be:",
          skillId: "reading-301-skill-literary",
          options: [
            { id: "a", text: "One-word topic" },
            { id: "b", text: "Interpretive insight supported by textual evidence" },
            { id: "c", text: "Plot summary" },
            { id: "d", text: "Character name list" }
          ],
          correctOptionId: "b",
          explanation: "Themes are evidence-based interpretive claims, not labels."
        },
        {
          id: "reading-301-l06-q2",
          text: "Best synthesis writing practice is to:",
          skillId: "reading-301-skill-synthesis",
          options: [
            { id: "a", text: "Summarize each source separately only" },
            { id: "b", text: "Explain how sources agree, differ, and qualify each other" },
            { id: "c", text: "Use one source only" },
            { id: "d", text: "Ignore source reliability" }
          ],
          correctOptionId: "b",
          explanation: "Synthesis requires relationship-based integration across sources."
        },
        {
          id: "reading-301-l06-q3",
          text: "Logical fallacy detection is important because it:",
          skillId: "reading-301-skill-argument",
          options: [
            { id: "a", text: "Makes arguments more emotional" },
            { id: "b", text: "Improves evaluation of reasoning quality" },
            { id: "c", text: "Eliminates need for evidence" },
            { id: "d", text: "Applies only to fiction" }
          ],
          correctOptionId: "b",
          explanation: "Fallacy awareness strengthens critical argument analysis."
        },
        {
          id: "reading-301-l06-q4",
          text: "Most effective rhetorical analysis explains:",
          skillId: "reading-301-skill-rhetoric",
          options: [
            { id: "a", text: "Only technique names" },
            { id: "b", text: "How strategy influences audience and purpose" },
            { id: "c", text: "Only biography" },
            { id: "d", text: "Only text length" }
          ],
          correctOptionId: "b",
          explanation: "Function and effect are central to rhetorical analysis."
        }
      ]
    }
  ]
};


