import {
  ExamMode,
  ExerciseConfig,
  ExerciseMode,
  FinalTestMode,
} from '@/types/exercise-types';
import {
  BookOpen,
  Brain,
  Clock,
  Edit3,
  GraduationCap,
  Layers,
  PenTool,
  Play,
  Target,
  Zap,
} from 'lucide-react';

export const exerciseConfigs: Record<ExerciseMode, ExerciseConfig> = {
  vocabulary: {
    id: 'vocabulary',
    name: 'Vocabulary',
    description: 'Learn new Dutch words with translations and context',
    icon: Play,
    category: 'basic',
    level: 'A1-B2',
    isAvailable: true,
    requiresChapter: true,
  },
  articles: {
    id: 'articles',
    name: 'Articles',
    description: 'Master Dutch articles (de/het) with practice exercises',
    icon: Target,
    category: 'basic',
    level: 'A1-A2',
    isAvailable: true,
    requiresChapter: true,
  },
  plural: {
    id: 'plural',
    name: 'Plural',
    description: 'Practice Dutch plural forms and rules',
    icon: Layers,
    category: 'basic',
    level: 'A1-A2',
    isAvailable: true,
    requiresChapter: true,
  },
  perfect: {
    id: 'perfect',
    name: 'Perfect Tense',
    description: 'Learn Dutch perfect tense (perfectum) formation and usage',
    icon: Clock,
    category: 'advanced',
    level: 'A2-B1',
    isAvailable: true,
    requiresChapter: false,
  },
  imperfectum: {
    id: 'imperfectum',
    name: 'Imperfectum',
    description: 'Master Dutch past tense (imperfectum) conjugations',
    icon: Clock,
    category: 'advanced',
    level: 'A1-A2',
    isAvailable: true,
    requiresChapter: false,
  },
  modalverbs: {
    id: 'modalverbs',
    name: 'Modal Verbs',
    description:
      'Essential Dutch modal verbs: kunnen, mogen, moeten, willen, zullen',
    icon: Brain,
    category: 'advanced',
    level: 'A1-B2',
    isAvailable: true,
    requiresChapter: false,
  },
  conjunctions: {
    id: 'conjunctions',
    name: 'Conjunctions',
    description: 'Learn Dutch conjunctions and sentence connections',
    icon: BookOpen,
    category: 'advanced',
    level: 'A1-A2',
    isAvailable: true,
    requiresChapter: false,
  },
  test1: {
    id: 'test1',
    name: 'Test Prep 1',
    description: 'Practice test with mixed vocabulary and grammar exercises',
    icon: GraduationCap,
    category: 'test',
    level: 'A1-A2',
    isAvailable: true,
    requiresChapter: false,
  },
  test2: {
    id: 'test2',
    name: 'Test Prep 2',
    description: 'Advanced practice test with comprehensive exercises',
    icon: GraduationCap,
    category: 'test',
    level: 'A2-B1',
    isAvailable: true,
    requiresChapter: false,
  },
  finaltest: {
    id: 'finaltest',
    name: 'Final Test',
    description: 'Comprehensive test covering all vocabulary categories',
    icon: GraduationCap,
    category: 'test',
    level: 'A1-B2',
    isAvailable: true,
    requiresChapter: false,
  },
};

export const finalTestModeConfigs: Record<
  FinalTestMode | ExamMode,
  ExerciseConfig
> = {
  translate: {
    id: 'translate',
    name: 'Dutch → English',
    description: 'Translate Dutch words to English',
    icon: Play,
    category: 'basic',
    level: 'A1-B2',
    isAvailable: true,
  },
  reverse: {
    id: 'reverse',
    name: 'English → Dutch',
    description: 'Translate English words to Dutch',
    icon: Play,
    category: 'basic',
    level: 'A1-B2',
    isAvailable: true,
  },
  mixed: {
    id: 'mixed',
    name: 'Mixed Practice',
    description: 'Random mix of translation directions',
    icon: Zap,
    category: 'basic',
    level: 'A1-B2',
    isAvailable: true,
  },
  conjugation: {
    id: 'conjugation',
    name: 'Conjugations',
    description: 'Practice verb conjugations',
    icon: Edit3,
    category: 'advanced',
    level: 'A2-B1',
    isAvailable: true,
  },
  article: {
    id: 'article',
    name: 'Articles Only',
    description: 'Focus on de/het articles',
    icon: Target,
    category: 'basic',
    level: 'A1-A2',
    isAvailable: true,
  },
  'exam-perfect': {
    id: 'exam-perfect',
    name: 'Perfect Tense Exam',
    description: 'Comprehensive perfect tense exercises',
    icon: Clock,
    category: 'exam',
    level: 'A2-B1',
    isAvailable: true,
  },
  'exam-imperfect': {
    id: 'exam-imperfect',
    name: 'Imperfect Tense Exam',
    description: 'Past tense conjugation exercises',
    icon: Clock,
    category: 'exam',
    level: 'A1-A2',
    isAvailable: true,
  },
  'exam-separable': {
    id: 'exam-separable',
    name: 'Separable Verbs Exam',
    description: 'Practice separable verb constructions',
    icon: Layers,
    category: 'exam',
    level: 'A2-B1',
    isAvailable: true,
  },
  'exam-conjunctions': {
    id: 'exam-conjunctions',
    name: 'Conjunctions Exam',
    description: 'Master sentence connections',
    icon: BookOpen,
    category: 'exam',
    level: 'A1-A2',
    isAvailable: true,
  },
  'exam-multiple-choice': {
    id: 'exam-multiple-choice',
    name: 'Multiple Choice Exam',
    description: 'Various multiple choice questions',
    icon: Target,
    category: 'exam',
    level: 'A1-B2',
    isAvailable: true,
  },
  'exam-writing': {
    id: 'exam-writing',
    name: 'Writing Exam',
    description: 'Writing and composition exercises',
    icon: PenTool,
    category: 'exam',
    level: 'B1-B2',
    isAvailable: true,
  },
  'exam-mixed': {
    id: 'exam-mixed',
    name: 'Mixed Exam',
    description: 'Comprehensive mixed exercise exam',
    icon: Brain,
    category: 'exam',
    level: 'A1-B2',
    isAvailable: true,
  },
};

export function getExerciseConfig(mode: ExerciseMode): ExerciseConfig {
  return exerciseConfigs[mode];
}

export function getFinalTestModeConfig(
  mode: FinalTestMode | ExamMode,
): ExerciseConfig {
  return finalTestModeConfigs[mode];
}

export function getExercisesByCategory(
  category: 'basic' | 'advanced' | 'test' | 'exam',
) {
  return Object.values(exerciseConfigs).filter(
    (config) => config.category === category,
  );
}
