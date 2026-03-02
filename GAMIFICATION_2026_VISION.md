# Koydo 2026: The "Juicy" Interactive Vision

This document outlines the strategy for moving from a "functional" educational web app to a "lovable/addictive" premium learning experience.

## 1. The "Juice" Philosophy
In 2026, educational apps must compete with AAA gaming titles for attention. We don't use manipulative dark patterns; instead, we use **Visceral Joy** (The Nintendo Effect).

### Core Principles:
- **Squash & Stretch**: Every UI element should react to touch with physical momentum.
- **Narrative Continuity**: Learners are guided by a cast of original, AI-generated mascots (The Koydos).
- **Juicy Feedback**: High-performance "celebration" layers (confetti, particle bursts, screen-shakes) for small wins.
- **Ambient Life**: Non-static backgrounds that react to the time of day and the student's progress.

## 2. Component Road Map

### 🟢 Phase 1: Foundations (NOW)
- [ ] **`ExperienceProvider`**: Manages global game states like "Haptics Enabled" or "Accessibility Mode."
- [ ] **`JuicyConfetti`**: Canvas-based, light-weight celebration component.
- [ ] **`MascotHost`**: High-fidelity SVG mascot tracker that "watches" the student's mouse/touch.

### 🟡 Phase 2: Game Upgrades
- [ ] **Physics-Based UI**: Migrating `LetterCatcher` and `NumberCrunch` from basic CSS to state-aware physics.
- [ ] **World Themes**: Each game session gets a random (but coherent) "Biome" from our `public/media` library.

### 🔴 Phase 3: The Social/Adventure Meta
- [ ] **Global Classroom Milestones**: Students feel like they are building a collective "City/Planet" through their individual mastery.
- [ ] **Personal AI Storyline**: The `AiLessonTutor` evolves into a personalized mascot that remembers the student's struggles and celebrates their specific growth path.

## 4. Ownership & Implementation Status

| Component | Owner | Status | File |
|-----------|-------|--------|------|
| `ExperienceProvider` + `useExperience()` | **Claude Code (2026-03-01)** | ✅ COMPLETE | `src/lib/gamification/experience-context.tsx` |
| `useGameResult()` hook | **Claude Code (2026-03-01)** | ✅ COMPLETE | `src/lib/gamification/use-game-result.ts` |
| `JuicyConfetti` | (prior agent) | ✅ COMPLETE | `src/components/experience/JuicyConfetti.tsx` |
| `AchievementToast` | (prior agent) | ✅ COMPLETE | `src/components/experience/AchievementToast.tsx` |
| `MascotHost` | (prior agent) | ✅ COMPLETE | `src/components/experience/MascotHost.tsx` |
| `LevelProgressBar` / `BadgeGallery` / `StreakCalendar` | (prior agent) | ✅ COMPLETE | `src/components/gamification/` |
| `ExperienceProvider` wired to `app-providers.tsx` | **Claude Code (2026-03-01)** | ✅ COMPLETE | — |
| `ExperienceProvider` → Phase 2 (physics UI, world themes) | UNCLAIMED | 🔲 PENDING | — |
| `MascotHost` → context-aware subject companion | UNCLAIMED | 🔲 PENDING | — |
| Global Classroom Milestones (Phase 3) | UNCLAIMED | 🔲 PENDING | — |

## 3. Copyright & Safety Guardrails
- **Zero-External Assets**: All icons, illustrations, and videos must be generated via our internal `AI-MEDIA-PROMPTS` or crafted as original SVGs.
- **Strict Privacy**: Gamification must be achieved without exploitative timers or high-pressure social comparisons that violate COPPA/GDPR child safety guidelines.
- **Accessible-Joy**: All "Juice" must have a `motion-reduced` alternative that still conveys success and progress.
