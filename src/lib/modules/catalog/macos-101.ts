import type { LearningModule } from "@/lib/modules/types";

export const Macos101Module: LearningModule = {
  id: "macos-101",
  title: "macOS Fundamentals",
  description:
    "Learn practical macOS workflows for Finder, system settings, security, and Terminal basics.",
  subject: "Operating Systems",
  tags: ["curriculum", "technology", "operating-systems"],
  minAge: 12,
  maxAge: 99,
  version: "1.0.0",
  difficultyBand: "beginner",
  thumbnail: "/placeholders/lesson-robot.svg",
  learningObjectives: [
    "Use Finder and Spotlight to manage files efficiently.",
    "Configure macOS settings for productivity and safety.",
    "Run core Terminal commands responsibly.",
  ],
  lessons: [
    {
      id: "macos-101-l01",
      title: "Desktop, Dock, and Finder",
      type: "video",
      duration: 10,
      chunks: [
        {
          id: "macos-101-l01-c1",
          title: "Dock and Menu Bar",
          content:
            "Use the Dock for launch/switch workflows and the menu bar for context-specific controls.",
        },
        {
          id: "macos-101-l01-c2",
          title: "Finder Navigation",
          content:
            "Move through sidebars, tags, and views to locate and organize content quickly.",
        },
        {
          id: "macos-101-l01-c3",
          title: "Spotlight Workflow",
          content:
            "Search apps, files, and quick facts from a single command entry point.",
        },
      ],
      flashcards: [
        {
          id: "macos-101-l01-f1",
          front: "Finder",
          back: "The main file manager for browsing, organizing, and previewing files.",
        },
        {
          id: "macos-101-l01-f2",
          front: "Spotlight",
          back: "A system-wide search and launcher shortcut for apps and files.",
        },
      ],
    },
    {
      id: "macos-101-l02",
      title: "File Management and iCloud Awareness",
      type: "interactive",
      duration: 12,
      interactiveActivities: [
        {
          id: "macos-101-l02-ia1",
          type: "sorting_buckets",
          title: "Finder Organization Drill",
          description: "Sort project assets into local and cloud-aware folders.",
          estimatedMinutes: 9,
          difficultyLevel: "easy",
          data: {
            buckets: [
              { id: "local", label: "Local Work Folder" },
              { id: "icloud", label: "iCloud Shared Folder" },
              { id: "archive", label: "Archive" },
            ],
            items: [
              { id: "m1", label: "draft-notes.pages", correctTargetId: "local" },
              { id: "m2", label: "team-summary.key", correctTargetId: "icloud" },
              { id: "m3", label: "old-export.zip", correctTargetId: "archive" },
              { id: "m4", label: "meeting-audio.m4a", correctTargetId: "icloud" },
            ],
          },
        },
      ],
      learningAids: [
        {
          id: "macos-101-l02-a1",
          type: "practice",
          title: "Naming Convention Guide",
          content: "Use date-prefix + project name + version to keep files sortable.",
        },
      ],
    },
    {
      id: "macos-101-l03",
      title: "Checkpoint: Core macOS Skills",
      type: "quiz",
      duration: 10,
      questions: [
        {
          id: "macos-101-l03-q1",
          text: "Which shortcut opens Spotlight search by default?",
          skillId: "macos-101-skill-navigation",
          options: [
            { id: "a", text: "Command + Space" },
            { id: "b", text: "Command + Shift + N" },
            { id: "c", text: "Control + Escape" },
            { id: "d", text: "Option + Tab" },
          ],
          correctOptionId: "a",
        },
        {
          id: "macos-101-l03-q2",
          text: "Which setting should remain enabled for device security?",
          skillId: "macos-101-skill-security",
          options: [
            { id: "a", text: "Automatic updates and built-in firewall" },
            { id: "b", text: "Disable all lock screen requirements" },
            { id: "c", text: "Install unknown apps without checks" },
            { id: "d", text: "Turn off account password" },
          ],
          correctOptionId: "a",
        },
        {
          id: "macos-101-l03-q3",
          text: "What is a safe first command pattern in Terminal learning?",
          skillId: "macos-101-skill-cli",
          options: [
            { id: "a", text: "Start with read-only commands like pwd, ls, and man." },
            { id: "b", text: "Run delete commands immediately." },
            { id: "c", text: "Disable SIP for convenience." },
            { id: "d", text: "Force root shell by default." },
          ],
          correctOptionId: "a",
        },
      ],
      learningAids: [
        {
          id: "macos-101-l03-a1",
          type: "mnemonic",
          title: "F-S-T",
          content: "Finder, Spotlight, Terminal: core tools in order of safe exploration.",
        },
      ],
    },
    {
      id: "macos-101-l04",
      title: "System Settings, Privacy, and Backup",
      type: "video",
      duration: 11,
      chunks: [
        {
          id: "macos-101-l04-c1",
          title: "Permissions and Privacy",
          content:
            "Review app permissions for camera, microphone, files, and location access.",
        },
        {
          id: "macos-101-l04-c2",
          title: "Software Updates",
          content:
            "Keep macOS and apps current while scheduling around school or work sessions.",
        },
        {
          id: "macos-101-l04-c3",
          title: "Time Machine Basics",
          content:
            "Use incremental backups to recover files and reduce accidental data loss.",
        },
      ],
    },
    {
      id: "macos-101-l05",
      title: "Terminal Starter Lab",
      type: "interactive",
      duration: 14,
      interactiveActivities: [
        {
          id: "macos-101-l05-ia1",
          type: "coding_editor",
          title: "Command-Line Orientation",
          description: "Practice path, listing, and help commands without making system changes.",
          estimatedMinutes: 12,
          difficultyLevel: "medium",
          instructions: [
            "Use pwd to view location.",
            "Use ls -la to inspect directory contents.",
            "Use man <command> to read command documentation.",
          ],
        },
      ],
      learningAids: [
        {
          id: "macos-101-l05-a1",
          type: "mnemonic",
          title: "L-D-C",
          content: "Locate, Display, Confirm before any command action.",
        },
      ],
    },
    {
      id: "macos-101-l06",
      title: "Checkpoint 2: Practical macOS Workflow",
      type: "quiz",
      duration: 10,
      questions: [
        {
          id: "macos-101-l06-q1",
          text: "Which workflow best reduces accidental file loss on macOS?",
          skillId: "macos-101-skill-backup",
          options: [
            { id: "a", text: "Use Time Machine backups and verify restore points regularly." },
            { id: "b", text: "Rely only on desktop copies with no backups." },
            { id: "c", text: "Disable backup prompts permanently." },
            { id: "d", text: "Store all files only in Downloads forever." },
          ],
          correctOptionId: "a",
        },
        {
          id: "macos-101-l06-q2",
          text: "When practicing Terminal basics, what is the safest approach?",
          skillId: "macos-101-skill-cli",
          options: [
            { id: "a", text: "Start with read-only commands and review docs before changes." },
            { id: "b", text: "Run destructive commands to learn faster." },
            { id: "c", text: "Always use elevated privileges by default." },
            { id: "d", text: "Disable system protections for convenience." },
          ],
          correctOptionId: "a",
        },
        {
          id: "macos-101-l06-q3",
          text: "What improves device security posture the most for everyday users?",
          skillId: "macos-101-skill-security",
          options: [
            { id: "a", text: "Keep updates current, require login protection, and review permissions." },
            { id: "b", text: "Install software from unknown sources without checks." },
            { id: "c", text: "Turn off update reminders and firewall settings." },
            { id: "d", text: "Share admin credentials with all users." },
          ],
          correctOptionId: "a",
        },
        {
          id: "macos-101-l06-q4",
          text: "A strong Finder organization system should include:",
          skillId: "macos-101-skill-navigation",
          options: [
            { id: "a", text: "Consistent naming, folder structure, and periodic cleanup reviews." },
            { id: "b", text: "Random names and mixed file locations." },
            { id: "c", text: "No tags, no folders, and no archive approach." },
            { id: "d", text: "Only one folder for every project forever." },
          ],
          correctOptionId: "a",
        },
      ],
      learningAids: [
        {
          id: "macos-101-l06-a1",
          type: "practice",
          title: "Daily Ops Checklist",
          content: "Check navigation, security, backup, and command-safety habits each week.",
        },
      ],
    },
  ],
};
