# EduForge External AI Research Prompt Pack

Use these prompts with web-enabled AI agents to accelerate curriculum, market, and brand decisions.

## Prompt 1: Full Curriculum Build (Pre-K through Grade 12)

You are an educational research analyst and curriculum architect. Build a complete curriculum blueprint for a global EdTech app serving pre-K through grade 12.

Requirements:
- Cover core subjects: language arts, math (basic + advanced), science (general/biology/chemistry/physics), social studies (US + world), history (worldwide), arts, coding, financial literacy, household management, farming, astronomy, geography, and introductory relativity.
- For each grade band (pre-K, elementary, middle, high school):
  - Define standards-aligned learning objectives.
  - Propose 10 modules per subject, with 10 lessons per module.
  - For each lesson, provide:
    - learning objective
    - activity type (video, interactive simulation, guided practice, quiz)
    - 5 sample questions
    - media suggestions (image/animation/video)
    - mastery criteria.
- Include scaffolding for learners with different levels and multilingual support.
- Produce output as:
  1) curriculum map table
  2) JSON schema for lesson objects
  3) phased rollout plan (MVP, V2, V3).

Constraints:
- Child-safe and culturally inclusive.
- Supports low-bandwidth and offline-first use cases.
- Designed for app-based interaction, not textbook-only instruction.

## Prompt 2: College Entrance Exam Pathways (US + International)

You are a global exam-prep strategist for K-12 EdTech. Build exam prep pathways that integrate into a single learning app.

Tasks:
- Identify major exams by region:
  - US: SAT, ACT, AP
  - UK: GCSE, A-level
  - India: JEE, NEET
  - China: Gaokao
  - Other major national entrance exams worth supporting.
- For each exam:
  - target age/grade
  - tested competencies
  - recommended module prerequisites
  - adaptive study plan structure (8, 12, 24-week versions)
  - diagnostic test + remediation loop design
  - mock exam cadence.
- Recommend data model fields needed to support exam prep analytics.
- Include a monetization-safe approach for subscriptions that remains app-store compliant.

Output:
- Comparative matrix by exam
- Technical implementation checklist
- Priority order for rollout by global demand and implementation effort.

## Prompt 3: Market Differentiation and Competitive Positioning

You are a product strategy lead for EdTech. Analyze how this app can be differentiated from existing platforms.

Platform goals:
- child-friendly, high-engagement lessons
- strong parent/admin oversight
- offline-first and multilingual
- AI-guided personalization
- affordable subscription model.

Tasks:
- Compare against major competitors (Khan Academy, Duolingo, ABCmouse, BYJU'S, Coursera where relevant by segment).
- Identify 5 strongest differentiators we can own and defend for 3+ years.
- For each differentiator:
  - user value statement
  - technical enabler
  - operational risk
  - measurable KPI.
- Recommend a messaging framework for parents, students, and schools.
- Suggest pricing/packaging experiments by region.

Output:
- concise strategy memo
- differentiation scorecard
- 90-day execution roadmap.

## Prompt 4: Global Brand Name Research (No Negative Connotations)

You are a global naming and trademark pre-screen researcher.

Goal:
- Propose a new brand name for an education platform currently using a temporary name.

Requirements:
- Name must imply learning, growth, or self-improvement.
- Must be easy to pronounce in: English, Spanish, French, Arabic, Hindi, Chinese, Japanese, Korean, Russian.
- Avoid negative meanings or awkward sounds in those languages.
- Prefer short, memorable names and likely available domains (`.com`, `.ai`, `.io`).

Tasks:
- Generate 50 candidate names.
- For each candidate provide:
  - meaning/story
  - pronunciation complexity score (1-5)
  - potential linguistic risk flags
  - preliminary trademark collision risk (high/medium/low heuristic)
  - domain availability check guidance steps.
- Shortlist top 10 with strongest global viability.

Output:
- ranked table of 50 candidates
- top-10 recommendation with rationale
- due-diligence checklist before final selection.

## Prompt 5: Product Development Expansion Research

You are a principal engineer + product researcher. Propose the next 12 months of platform evolution for a global K-12 EdTech app.

Include:
- AI tutoring architecture (on-device + cloud hybrid inference)
- privacy-compliant child safety and parental consent workflows
- creator pipeline for rapidly generating high-quality lessons
- teacher/school dashboard requirements
- support/admin operations maturity model
- app store policy compliance checkpoints (Apple + Google).

Deliverables:
- quarter-by-quarter roadmap
- team composition and hiring priorities
- risk register with mitigation plans
- technical debt prevention checklist.
