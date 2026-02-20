import { z } from "zod";

export const lessonOptionSchema = z.object({
  id: z.string().min(1),
  text: z.string().min(1),
  imageUrl: z.string().min(1).optional(),
  imageAlt: z.string().min(1).optional(),
});

export const questionSchema = z.object({
  id: z.string().min(1),
  text: z.string().min(1),
  skillId: z.string().min(1),
  options: z.array(lessonOptionSchema).min(2),
  correctOptionId: z.string().min(1),
  hint: z.string().min(1).optional(),
  explanation: z.string().min(1).optional(),
  imageUrl: z.string().min(1).optional(),
  imageAlt: z.string().min(1).optional(),
});

export const learningAidSchema = z.object({
  id: z.string().min(1),
  type: z.enum(["image", "animation", "mnemonic", "practice"]),
  title: z.string().min(1),
  content: z.string().min(1),
});

export const lessonSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  type: z.string().min(1),
  duration: z.number().nonnegative(),
  questions: z.array(questionSchema).optional(),
  learningAids: z.array(learningAidSchema).optional(),
  metadata: z.record(z.string(), z.union([z.string(), z.number(), z.boolean(), z.array(z.string())])).optional(),
});

export const learningModuleSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
  subject: z.string().min(1),
  lessons: z.array(lessonSchema).min(1),
  tags: z.array(z.string()).optional(),
  minAge: z.number().int().nonnegative().optional(),
  maxAge: z.number().int().nonnegative().optional(),
  version: z.string().optional(),
  moduleVersion: z.string().optional(),
  difficultyBand: z.string().optional(),
  localeSupport: z.array(z.string()).optional(),
  thumbnail: z.string().optional(),
  learningObjectives: z.array(z.string()).optional(),
});

export const moduleRegistrySchema = z.array(learningModuleSchema);
