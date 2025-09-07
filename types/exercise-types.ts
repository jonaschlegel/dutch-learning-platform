// Exercise type definitions for better type safety and organization

export type BaseExerciseMode =
  | 'vocabulary'
  | 'articles'
  | 'plural'
  | 'perfect'
  | 'imperfectum'
  | 'modalverbs'
  | 'conjunctions'
  | 'test1'
  | 'test2';

export type FinalTestMode =
  | 'translate'
  | 'reverse'
  | 'mixed'
  | 'conjugation'
  | 'article';

export type ExamMode =
  | 'exam-perfect'
  | 'exam-imperfect'
  | 'exam-separable'
  | 'exam-conjunctions'
  | 'exam-multiple-choice'
  | 'exam-writing'
  | 'exam-mixed';

export type ExerciseMode = BaseExerciseMode | 'finaltest';

export type AllModes = BaseExerciseMode | FinalTestMode | ExamMode;

export interface ExerciseConfig {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  category: 'basic' | 'advanced' | 'test' | 'exam';
  level: string;
  isAvailable: boolean;
  requiresChapter?: boolean;
}

export interface ProgressData {
  current: number;
  total: number;
  percentage: number;
  completed?: number;
}

export interface SessionScore {
  correct: number;
  total: number;
}

export const EXAM_MODES: ExamMode[] = [
  'exam-perfect',
  'exam-imperfect',
  'exam-separable',
  'exam-conjunctions',
  'exam-multiple-choice',
  'exam-writing',
  'exam-mixed',
];

export const isExamMode = (mode: string): mode is ExamMode => {
  return EXAM_MODES.includes(mode as ExamMode);
};

export const isFinalTestMode = (mode: ExerciseMode): mode is 'finaltest' => {
  return mode === 'finaltest';
};
