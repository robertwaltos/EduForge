export type Skill = {
  id: string;
  name: string;
};

export type LessonOption = {
  id: string;
  text: string;
  imageUrl?: string;
  imageAlt?: string;
};

export type Question = {
  id: string;
  text: string;
  skillId: string;
  options: LessonOption[];
  correctOptionId: string;
  hint?: string;
  explanation?: string;
  imageUrl?: string;
  imageAlt?: string;
};

export type LessonType = "video" | "quiz" | "interactive" | (string & {});

export type LearningAidType = "image" | "animation" | "mnemonic" | "practice";

export type LearningAid = {
  id: string;
  type: LearningAidType;
  title: string;
  content: string;
};

export type Lesson = {
  id: string;
  title: string;
  type: LessonType;
  duration: number;
  questions?: Question[];
  learningAids?: LearningAid[];
  metadata?: Record<string, string | number | boolean | string[]>;
};

export type Subject =
  | "Math"
  | "Reading"
  | "Science"
  | "Languages"
  | "Coding"
  | (string & {});

export type LearningModule = {
  id: string;
  title: string;
  description: string;
  subject: Subject;
  lessons: Lesson[];
  tags?: string[];
  minAge?: number;
  maxAge?: number;
  version?: string;
  moduleVersion?: string;
  difficultyBand?: "beginner" | "intermediate" | "advanced" | (string & {});
  localeSupport?: string[];
  thumbnail?: string;
  learningObjectives?: string[];
};
