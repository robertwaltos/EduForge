import type { LearningModule } from "@/lib/modules/types";

export const Reading201Module: LearningModule = {
  id: "reading-201",
  title: "Reading Comprehension and Argument Literacy II",
  description:
    "Intermediate reading curriculum on inference, structure analysis, vocabulary in context, argument quality, and evidence-based interpretation.",
  subject: "Reading",
  tags: ["core", "curriculum", "interactive", "literacy", "comprehension"],
  minAge: 9,
  maxAge: 14,
  version: "2.0.0",
  difficultyBand: "intermediate",
  localeSupport: ["en", "es"],
  learningObjectives: [
    "Use textual evidence to justify literal and inferential comprehension answers",
    "Analyze text structure in narrative and informational passages",
    "Interpret vocabulary using context and morphology clues",
    "Identify claim, evidence, and reasoning quality in arguments",
    "Compare perspectives across multiple short texts",
    "Write concise evidence-supported reading responses"
  ],
  lessons: [
    {
      id: "reading-201-l01",
      title: "Inference and Evidence Tracking",
      type: "video",
      duration: 12,
      learningAids: [{ id: "reading-201-l01-a1", type: "practice", title: "Guided Practice", content: "Apply the lesson process and record your reasoning steps." }],
      chunks: [
        {
          id: "reading-201-l01-c1",
          kind: "concept",
          title: "Reading Beyond the Surface",
          content:
            "Inference combines textual clues with prior knowledge, but strong inference always remains anchored to explicit text evidence."
        },
        {
          id: "reading-201-l01-c2",
          kind: "concept",
          title: "Evidence Quality",
          content:
            "Not all quotes are equally useful. Strong evidence is specific, relevant, and directly connected to the interpretation claim."
        },
        {
          id: "reading-201-l01-c3",
          kind: "recap",
          title: "Claim-Evidence Link",
          content:
            "Readers should explain how selected evidence supports an inference, not merely copy text lines."
        }
      ],
      flashcards: [
        { id: "reading-201-l01-f1", front: "Inference", back: "Conclusion drawn from textual clues plus background knowledge." },
        { id: "reading-201-l01-f2", front: "Text evidence", back: "Specific words or passages used to support interpretation." },
        { id: "reading-201-l01-f3", front: "Relevant evidence", back: "Evidence directly tied to the reading question or claim." }
      ]
    },
    {
      id: "reading-201-l02",
      title: "Text Structure and Organization Lab",
      type: "interactive",
      duration: 14,
      learningAids: [{ id: "reading-201-l02-a1", type: "practice", title: "Guided Practice", content: "Apply the lesson process and record your reasoning steps." }],
      chunks: [
        {
          id: "reading-201-l02-c1",
          kind: "concept",
          title: "Common Structures",
          content:
            "Informational texts often use sequence, cause-effect, compare-contrast, or problem-solution patterns to organize ideas."
        },
        {
          id: "reading-201-l02-c2",
          kind: "practice",
          title: "Signal Word Analysis",
          content:
            "Signal words help detect structure and improve prediction about upcoming ideas."
        }
      ],
      interactiveActivities: [
        {
          id: "reading-201-l02-act1",
          type: "matching_pairs",
          title: "Structure Signal Match",
          description: "Match signal words to likely text structure.",
          pairs: [
            { left: "because / therefore", right: "Cause and effect" },
            { left: "first / next / finally", right: "Sequence" },
            { left: "similarly / however", right: "Compare and contrast" },
            { left: "challenge / solution", right: "Problem and solution" }
          ]
        },
        {
          id: "reading-201-l02-act2",
          type: "scenario_practice",
          title: "Paragraph Blueprint Drill",
          description: "Identify structure of a short passage and justify your choice.",
          instructions: [
            "Name one signal phrase from the passage.",
            "Explain why it indicates your selected structure."
          ]
        }
      ]
    },
    {
      id: "reading-201-l03",
      title: "Checkpoint 1: Inference and Structure",
      type: "quiz",
      duration: 10,
      learningAids: [{ id: "reading-201-l03-a1", type: "practice", title: "Guided Practice", content: "Apply the lesson process and record your reasoning steps." }],
      questions: [
        {
          id: "reading-201-l03-q1",
          text: "A strong inference should be supported by:",
          skillId: "reading-201-skill-inference",
          options: [
            { id: "a", text: "Personal opinion only" },
            { id: "b", text: "Specific textual evidence and reasoning" },
            { id: "c", text: "Unrelated details" },
            { id: "d", text: "Title alone" }
          ],
          correctOptionId: "b",
          explanation: "Inference quality depends on evidence linkage and explanation."
        },
        {
          id: "reading-201-l03-q2",
          text: "Signal words like first, then, finally usually indicate:",
          skillId: "reading-201-skill-structure",
          options: [
            { id: "a", text: "Cause-effect" },
            { id: "b", text: "Sequence" },
            { id: "c", text: "Compare-contrast" },
            { id: "d", text: "Argument rebuttal" }
          ],
          correctOptionId: "b",
          explanation: "Ordered transition terms point to sequence structure."
        },
        {
          id: "reading-201-l03-q3",
          text: "Best evidence for an interpretation is typically:",
          skillId: "reading-201-skill-evidence",
          options: [
            { id: "a", text: "Longest quote" },
            { id: "b", text: "Most directly relevant quote" },
            { id: "c", text: "First sentence only" },
            { id: "d", text: "Any repeated word" }
          ],
          correctOptionId: "b",
          explanation: "Relevance and precision matter more than quote length."
        },
        {
          id: "reading-201-l03-q4",
          text: "When explaining evidence, you should:",
          skillId: "reading-201-skill-analysis",
          options: [
            { id: "a", text: "Restate quote with no interpretation" },
            { id: "b", text: "Explain how quote supports the claim" },
            { id: "c", text: "Avoid the question prompt" },
            { id: "d", text: "Use unrelated examples" }
          ],
          correctOptionId: "b",
          explanation: "Evidence must be connected to claim through reasoning."
        }
      ]
    },
    {
      id: "reading-201-l04",
      title: "Vocabulary in Context and Word Analysis",
      type: "video",
      duration: 12,
      learningAids: [{ id: "reading-201-l04-a1", type: "practice", title: "Guided Practice", content: "Apply the lesson process and record your reasoning steps." }],
      chunks: [
        {
          id: "reading-201-l04-c1",
          kind: "concept",
          title: "Context Clues",
          content:
            "Readers can infer unknown words using surrounding definitions, examples, contrasts, and restatements."
        },
        {
          id: "reading-201-l04-c2",
          kind: "concept",
          title: "Morphology Strategies",
          content:
            "Prefixes, roots, and suffixes reveal meaning components and help decode unfamiliar academic vocabulary."
        },
        {
          id: "reading-201-l04-c3",
          kind: "recap",
          title: "Precision in Meaning",
          content:
            "Word choice nuances matter; readers should select meanings that best fit sentence and passage context."
        }
      ],
      flashcards: [
        { id: "reading-201-l04-f1", front: "Context clue", back: "Hint from surrounding text that helps determine meaning." },
        { id: "reading-201-l04-f2", front: "Root word", back: "Core unit of meaning in a word family." },
        { id: "reading-201-l04-f3", front: "Prefix", back: "Word part added before root that modifies meaning." }
      ]
    },
    {
      id: "reading-201-l05",
      title: "Argument and Perspective Analysis Lab",
      type: "interactive",
      duration: 14,
      learningAids: [{ id: "reading-201-l05-a1", type: "practice", title: "Guided Practice", content: "Apply the lesson process and record your reasoning steps." }],
      chunks: [
        {
          id: "reading-201-l05-c1",
          kind: "practice",
          title: "Claim-Evidence-Reasoning Framework",
          content:
            "Argument reading requires identifying author claim, evidence type, and reasoning quality."
        },
        {
          id: "reading-201-l05-c2",
          kind: "recap",
          title: "Perspective Comparison",
          content:
            "Comparing texts reveals how purpose, audience, and evidence choices shape interpretation."
        }
      ],
      interactiveActivities: [
        {
          id: "reading-201-l05-act1",
          type: "sorting_buckets",
          title: "Argument Element Sort",
          description: "Sort statements by claim, evidence, or reasoning role.",
          buckets: ["Claim", "Evidence", "Reasoning"],
          items: [
            { text: "School start time should be later", bucket: "Claim" },
            { text: "Study shows improved sleep outcomes", bucket: "Evidence" },
            { text: "More sleep supports better attention", bucket: "Reasoning" },
            { text: "Survey of student schedules", bucket: "Evidence" }
          ]
        },
        {
          id: "reading-201-l05-act2",
          type: "scenario_practice",
          title: "Two-Text Comparison Drill",
          description: "Compare viewpoints in two short passages.",
          instructions: [
            "Identify one agreement point.",
            "Identify one key evidence difference."
          ]
        }
      ]
    },
    {
      id: "reading-201-l06",
      title: "Checkpoint 2: Vocabulary and Argument Literacy",
      type: "quiz",
      duration: 10,
      learningAids: [{ id: "reading-201-l06-a1", type: "practice", title: "Guided Practice", content: "Apply the lesson process and record your reasoning steps." }],
      questions: [
        {
          id: "reading-201-l06-q1",
          text: "Best first strategy for unknown academic word in passage is:",
          skillId: "reading-201-skill-vocab",
          options: [
            { id: "a", text: "Skip immediately" },
            { id: "b", text: "Use surrounding context clues" },
            { id: "c", text: "Guess unrelated meaning" },
            { id: "d", text: "Assume opposite meaning" }
          ],
          correctOptionId: "b",
          explanation: "Context clues provide efficient meaning signals before lookup."
        },
        {
          id: "reading-201-l06-q2",
          text: "In argument analysis, evidence quality is strongest when it is:",
          skillId: "reading-201-skill-argument",
          options: [
            { id: "a", text: "Emotional only" },
            { id: "b", text: "Relevant, credible, and specific" },
            { id: "c", text: "Unverifiable claim" },
            { id: "d", text: "Anecdotal with no context" }
          ],
          correctOptionId: "b",
          explanation: "Credibility and relevance determine argument support strength."
        },
        {
          id: "reading-201-l06-q3",
          text: "Compare-contrast structure is often signaled by:",
          skillId: "reading-201-skill-structure",
          options: [
            { id: "a", text: "first / next / finally" },
            { id: "b", text: "similarly / however" },
            { id: "c", text: "because / therefore" },
            { id: "d", text: "problem / fix" }
          ],
          correctOptionId: "b",
          explanation: "Similarity and contrast transitions indicate comparison structure."
        },
        {
          id: "reading-201-l06-q4",
          text: "Most effective reading response includes:",
          skillId: "reading-201-skill-writing",
          options: [
            { id: "a", text: "Claim without evidence" },
            { id: "b", text: "Claim, selected evidence, and explanation" },
            { id: "c", text: "Only summary" },
            { id: "d", text: "Only quote list" }
          ],
          correctOptionId: "b",
          explanation: "Interpretation requires both evidence and reasoning linkage."
        }
      ]
    }
  ]
};


