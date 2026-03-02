import type { LearningModule } from "@/lib/modules/types";

export const Arts401Module: LearningModule = {
  id: "arts-401",
  title: "Arts Leadership, Curation, and Professional Practice",
  description:
    "Expert-level arts curriculum focused on artistic direction, critical frameworks, exhibition curation, audience strategy, and sustainable professional practice across visual and interdisciplinary arts.",
  subject: "Arts",
  tags: ["core", "curriculum", "interactive", "arts", "curation", "professional-practice"],
  minAge: 12,
  maxAge: 99,
  version: "2.0.0",
  difficultyBand: "advanced",
  localeSupport: ["en"],
  thumbnail: "/placeholders/lesson-robot.svg",
  learningObjectives: [
    "Develop a coherent artistic voice across a body of work",
    "Apply advanced critique frameworks with evidence-based interpretation",
    "Design curatorial narratives for exhibitions and digital showcases",
    "Evaluate ethical, cultural, and contextual dimensions of artistic production",
    "Build professional workflows for portfolio, documentation, and audience engagement",
    "Create strategic project plans balancing creative ambition and practical constraints"
  ],
  lessons: [
    {
      id: "arts-401-l01",
      title: "Artistic Direction and Visual Language Systems",
      type: "video",
      duration: 13,
      chunks: [
        {
          id: "arts-401-l01-c1",
          kind: "concept",
          title: "From Style to Voice",
          content:
            "Style can be imitated; voice is built from recurring choices linked to meaning. Advanced artists define intentional relationships between form, process, and concept. Consistency does not mean repetition - it means clarity of authorship across different works and media."
        },
        {
          id: "arts-401-l01-c2",
          kind: "concept",
          title: "Visual Language Components",
          content:
            "Visual language includes compositional rhythm, color systems, material decisions, mark logic, pacing, and narrative framing. Professionals document these decisions to sustain coherence in long-term projects and collaborations."
        },
        {
          id: "arts-401-l01-c3",
          kind: "recap",
          title: "Direction Statements",
          content:
            "A strong direction statement explains what the artist investigates, why it matters, and how formal choices support that inquiry. This statement guides both creation and curation."
        }
      ],
      flashcards: [
        {
          id: "arts-401-l01-f1",
          front: "Artistic voice",
          back: "Distinctive conceptual and formal identity that persists across a body of work."
        },
        {
          id: "arts-401-l01-f2",
          front: "Visual language",
          back: "System of artistic choices (form, color, composition, material, rhythm) that communicates intent."
        },
        {
          id: "arts-401-l01-f3",
          front: "Direction statement",
          back: "A concise articulation of thematic focus, motivations, and formal strategy."
        }
      ],
      learningAids: [
        {
          id: "arts-401-l01-a1",
          type: "image",
          title: "Voice Mapping Canvas",
          content: "Framework connecting themes, materials, recurring motifs, and audience effect goals."
        }
      ]
    },
    {
      id: "arts-401-l02",
      title: "Advanced Critique and Interpretation Lab",
      type: "interactive",
      duration: 15,
      chunks: [
        {
          id: "arts-401-l02-c1",
          kind: "concept",
          title: "Critique as Inquiry",
          content:
            "Advanced critique moves beyond preference statements. It separates observation, interpretation, and evaluation while grounding claims in visible evidence and context."
        },
        {
          id: "arts-401-l02-c2",
          kind: "practice",
          title: "Framework Integration",
          content:
            "Different lenses - formal, historical, social, material, and audience-centered - can produce different readings of the same work. Strong critics compare these readings and justify chosen interpretations transparently."
        }
      ],
      interactiveActivities: [
        {
          id: "arts-401-l02-act1",
          type: "sorting_buckets",
          title: "Critique Evidence Sort",
          description: "Sort statements into observation, interpretation, or evaluation.",
          buckets: ["Observation", "Interpretation", "Evaluation"],
          items: [
            { text: "The work uses three dominant blue tones", bucket: "Observation" },
            { text: "The repeated blue suggests emotional distance", bucket: "Interpretation" },
            { text: "The composition effectively sustains tension", bucket: "Evaluation" },
            { text: "Foreground figures are cropped at the frame edge", bucket: "Observation" },
            { text: "Cropping implies instability in perspective", bucket: "Interpretation" }
          ]
        },
        {
          id: "arts-401-l02-act2",
          type: "scenario_practice",
          title: "Panel Critique Exercise",
          description: "Prepare a concise critique for a mixed-experience audience panel.",
          instructions: [
            "State one evidence-based strength.",
            "State one revision suggestion tied to artist intent."
          ]
        }
      ],
      metadata: {
        prompts: [
          "How do you avoid confusing interpretation with objective observation?",
          "Which critique lens best fits socially engaged artwork, and why?",
          "Write one revision recommendation that respects the artist's stated goal."
        ]
      },
      learningAids: [
        {
          id: "arts-401-l02-a1",
          type: "practice",
          title: "Critique Protocol Card",
          content: "Observe, Interpret, Evaluate, Recommend - with evidence for each step."
        }
      ]
    },
    {
      id: "arts-401-l03",
      title: "Checkpoint 1: Voice and Critique",
      type: "quiz",
      duration: 10,
      questions: [
        {
          id: "arts-401-l03-q1",
          text: "Which statement best defines artistic voice?",
          skillId: "arts-401-skill-voice",
          options: [
            { id: "a", text: "A single favorite technique used once" },
            { id: "b", text: "A recurring conceptual and formal identity across works" },
            { id: "c", text: "Only the medium selected" },
            { id: "d", text: "Any trend copied from peers" }
          ],
          correctOptionId: "b",
          explanation: "Voice emerges from coherent meaning and formal choices over time."
        },
        {
          id: "arts-401-l03-q2",
          text: "In critique practice, which comes first?",
          skillId: "arts-401-skill-critique",
          options: [
            { id: "a", text: "Evaluation" },
            { id: "b", text: "Interpretation" },
            { id: "c", text: "Observation" },
            { id: "d", text: "Revision plan" }
          ],
          correctOptionId: "c",
          explanation: "Grounded critique starts with evidence-based observation."
        },
        {
          id: "arts-401-l03-q3",
          text: "A useful direction statement should include:",
          skillId: "arts-401-skill-voice",
          options: [
            { id: "a", text: "Only artist biography" },
            { id: "b", text: "Theme, motivation, and formal strategy link" },
            { id: "c", text: "Only sales goals" },
            { id: "d", text: "A list of tools used" }
          ],
          correctOptionId: "b",
          explanation: "It should connect what is explored, why, and how form supports meaning."
        },
        {
          id: "arts-401-l03-q4",
          text: "Which critique claim is most defensible?",
          skillId: "arts-401-skill-critique",
          options: [
            { id: "a", text: "I just do not like it" },
            { id: "b", text: "It is good because it is popular" },
            { id: "c", text: "Repeated vertical compression and muted palette reinforce the work's anxiety theme" },
            { id: "d", text: "It looks expensive" }
          ],
          correctOptionId: "c",
          explanation: "Strong critique ties interpretation to observable formal evidence."
        }
      ],
      learningAids: [
        {
          id: "arts-401-l03-a1",
          type: "mnemonic",
          title: "OIER",
          content: "Observe, Interpret, Evaluate, Recommend."
        }
      ]
    },
    {
      id: "arts-401-l04",
      title: "Curation, Sequencing, and Exhibition Design",
      type: "video",
      duration: 13,
      chunks: [
        {
          id: "arts-401-l04-c1",
          kind: "concept",
          title: "Curatorial Narrative",
          content:
            "Curation shapes meaning through selection, sequencing, adjacency, and framing. The same artwork can read differently depending on neighbor works, spatial pacing, lighting, and textual mediation."
        },
        {
          id: "arts-401-l04-c2",
          kind: "concept",
          title: "Spatial and Digital Experience",
          content:
            "Physical exhibitions use circulation paths, sightlines, and acoustic context. Digital exhibitions use navigation hierarchy, image fidelity, and temporal reveal. In both formats, design decisions influence interpretation depth and audience retention."
        },
        {
          id: "arts-401-l04-c3",
          kind: "recap",
          title: "Ethical Curation",
          content:
            "Responsible curation includes contextual transparency, representation awareness, accessibility design, and cultural sensitivity in framing and language."
        }
      ],
      flashcards: [
        {
          id: "arts-401-l04-f1",
          front: "Curatorial narrative",
          back: "Conceptual storyline created through selection and arrangement of works."
        },
        {
          id: "arts-401-l04-f2",
          front: "Adjacency effect",
          back: "Interpretive shift produced when works are placed near specific other works."
        },
        {
          id: "arts-401-l04-f3",
          front: "Accessibility in exhibition design",
          back: "Designing multiple pathways for engagement, including language, physical, and sensory access."
        }
      ],
      learningAids: [
        {
          id: "arts-401-l04-a1",
          type: "image",
          title: "Exhibition Flow Blueprint",
          content: "Template showing entry thesis, section transitions, and closure sequence for curated shows."
        }
      ]
    },
    {
      id: "arts-401-l05",
      title: "Professional Practice and Audience Strategy Lab",
      type: "interactive",
      duration: 16,
      chunks: [
        {
          id: "arts-401-l05-c1",
          kind: "concept",
          title: "Portfolio as Argument",
          content:
            "A professional portfolio is not a scrapbook - it is a structured argument about artistic capability, coherence, and growth. Selection, sequencing, and annotation should support clear positioning."
        },
        {
          id: "arts-401-l05-c2",
          kind: "practice",
          title: "Audience and Platform Fit",
          content:
            "Different audiences (collectors, curators, educators, collaborators) require different framing depth. Strategic communication includes artist statement variants, documentation standards, and channel-specific adaptation without diluting core voice."
        }
      ],
      interactiveActivities: [
        {
          id: "arts-401-l05-act1",
          type: "matching_pairs",
          title: "Audience-to-Artifact Match",
          description: "Match audience types with strongest supporting portfolio artifact.",
          pairs: [
            { left: "Curator", right: "Cohesive project series with curatorial statement" },
            { left: "Collaborator", right: "Process documentation and workflow reliability evidence" },
            { left: "Collector", right: "High-quality final work documentation and edition context" },
            { left: "Educator/mentor", right: "Reflective growth narrative with iterative studies" }
          ]
        },
        {
          id: "arts-401-l05-act2",
          type: "scenario_practice",
          title: "Portfolio Revision Sprint",
          description: "Prioritize edits before a major submission deadline.",
          instructions: [
            "Select two high-impact improvements.",
            "Explain what to defer and why."
          ]
        }
      ],
      metadata: {
        prompts: [
          "What makes a portfolio sequence feel intentional rather than random?",
          "How would you adapt one project description for curator vs collaborator audiences?",
          "Name one documentation standard that improves professionalism immediately."
        ]
      },
      learningAids: [
        {
          id: "arts-401-l05-a1",
          type: "practice",
          title: "Professional Readiness Checklist",
          content: "Checklist for documentation quality, statement clarity, sequencing logic, and submission packaging."
        }
      ]
    },
    {
      id: "arts-401-l06",
      title: "Checkpoint 2: Curation and Practice",
      type: "quiz",
      duration: 11,
      questions: [
        {
          id: "arts-401-l06-q1",
          text: "Primary function of curatorial sequencing is to:",
          skillId: "arts-401-skill-curation",
          options: [
            { id: "a", text: "Randomize viewing to avoid patterns" },
            { id: "b", text: "Shape interpretation through order and context" },
            { id: "c", text: "Reduce number of artworks only" },
            { id: "d", text: "Replace artist intent" }
          ],
          correctOptionId: "b",
          explanation: "Sequence and adjacency directly influence how meaning is constructed."
        },
        {
          id: "arts-401-l06-q2",
          text: "Which portfolio approach is strongest for professional review?",
          skillId: "arts-401-skill-practice",
          options: [
            { id: "a", text: "All works shown in upload order" },
            { id: "b", text: "Curated sequence with concise context and consistent documentation" },
            { id: "c", text: "Only social media screenshots" },
            { id: "d", text: "No written context provided" }
          ],
          correctOptionId: "b",
          explanation: "Intentional sequence and context improve reviewer understanding and credibility."
        },
        {
          id: "arts-401-l06-q3",
          text: "Which statement best reflects ethical curation practice?",
          skillId: "arts-401-skill-curation",
          options: [
            { id: "a", text: "Context is optional if visuals are strong" },
            { id: "b", text: "Representation and context framing should be explicit and responsible" },
            { id: "c", text: "Audience accessibility is not part of curation" },
            { id: "d", text: "Only market value matters" }
          ],
          correctOptionId: "b",
          explanation: "Ethical curation includes context, accessibility, and representation awareness."
        },
        {
          id: "arts-401-l06-q4",
          text: "Best reason to maintain multiple statement versions for different audiences?",
          skillId: "arts-401-skill-practice",
          options: [
            { id: "a", text: "To change artistic intent each time" },
            { id: "b", text: "To preserve core intent while improving communication relevance" },
            { id: "c", text: "To avoid all feedback" },
            { id: "d", text: "To remove conceptual language" }
          ],
          correctOptionId: "b",
          explanation: "Audience-adapted framing can improve clarity without losing core meaning."
        },
        {
          id: "arts-401-l06-q5",
          text: "What is the strongest indicator of a coherent body of work?",
          skillId: "arts-401-skill-voice",
          options: [
            { id: "a", text: "Randomly changing style each piece" },
            { id: "b", text: "Recurring conceptual throughline supported by formal consistency" },
            { id: "c", text: "Using only one color forever" },
            { id: "d", text: "Avoiding reflection and revision" }
          ],
          correctOptionId: "b",
          explanation: "Coherence comes from sustained intent linked to formal choices across works."
        }
      ],
      learningAids: [
        {
          id: "arts-401-l06-a1",
          type: "mnemonic",
          title: "VOICE",
          content: "Vision, Observation, Intent, Context, Evidence."
        }
      ]
    },
    {
      id: "arts-401-l07",
      title: "Capstone: Curated Body-of-Work Proposal",
      type: "interactive",
      duration: 18,
      chunks: [
        {
          id: "arts-401-l07-c1",
          kind: "practice",
          title: "Capstone Brief",
          content:
            "Create a complete proposal for a curated body of work: thematic thesis, artwork selection logic, exhibition sequence, audience strategy, documentation plan, and reflection framework."
        },
        {
          id: "arts-401-l07-c2",
          kind: "recap",
          title: "Assessment Criteria",
          content:
            "Strong submissions demonstrate conceptual coherence, curatorial intention, ethical framing, and practical professional readiness."
        }
      ],
      metadata: {
        prompts: [
          "State the thesis of your curated body of work in two sentences.",
          "Explain one key sequencing decision and intended audience effect.",
          "List three professional deliverables needed before public presentation."
        ]
      },
      learningAids: [
        {
          id: "arts-401-l07-a1",
          type: "practice",
          title: "Curatorial Proposal Template",
          content: "Template covering thesis, section plan, audience goals, production timeline, and review criteria."
        }
      ]
    }
  ]
};