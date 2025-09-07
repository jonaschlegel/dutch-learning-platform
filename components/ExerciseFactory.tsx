import type { VocabularyItem } from '@/types/vocabulary';
import React from 'react';
import { ArticleExercise } from './ArticleExercise';
import { ModernArticleExercise } from './ModernArticleExercise';
import { ModernVocabularyExercise } from './ModernVocabularyExercise';
import { PluralExercise } from './PluralExercise';
import { VocabularyCard } from './VocabularyCard';

export type ExerciseType =
  | 'vocabulary-modern-dutch'
  | 'vocabulary-modern-english'
  | 'article-modern'
  | 'vocabulary-legacy'
  | 'article-legacy'
  | 'plural';

interface ExerciseFactoryProps {
  word: VocabularyItem;
  exerciseType: ExerciseType;
  onComplete: (correct: boolean) => void;
  // Additional props for specific exercise types
  pluralMode?: 'recognition' | 'production';
}

export function ExerciseFactory({
  word,
  exerciseType,
  onComplete,
  pluralMode = 'recognition',
}: ExerciseFactoryProps) {
  switch (exerciseType) {
    case 'vocabulary-modern-dutch':
      return (
        <ModernVocabularyExercise
          word={word}
          mode="english-to-dutch"
          onComplete={onComplete}
        />
      );

    case 'vocabulary-modern-english':
      return (
        <ModernVocabularyExercise
          word={word}
          mode="dutch-to-english"
          onComplete={onComplete}
        />
      );

    case 'article-modern':
      return <ModernArticleExercise word={word} onComplete={onComplete} />;

    case 'vocabulary-legacy':
      return (
        <VocabularyCard
          word={word}
          mode="recognition"
          onComplete={onComplete}
        />
      );

    case 'article-legacy':
      return <ArticleExercise word={word} onComplete={onComplete} />;

    case 'plural':
      return <PluralExercise word={word} onComplete={onComplete} />;

    default:
      console.warn(`Unknown exercise type: ${exerciseType}`);
      return (
        <VocabularyCard
          word={word}
          mode="recognition"
          onComplete={onComplete}
        />
      );
  }
}

// Helper function to get a recommended exercise type based on word properties and user progress
export function getRecommendedExerciseType(
  word: VocabularyItem,
  userPreferences?: {
    preferModern?: boolean;
    focusOnWeakAreas?: boolean;
    exerciseHistory?: Record<string, number>;
  },
): ExerciseType {
  const preferences = {
    preferModern: true,
    focusOnWeakAreas: true,
    ...userPreferences,
  };

  // If word has an article, sometimes practice articles
  if (word.article && Math.random() < 0.3) {
    return preferences.preferModern ? 'article-modern' : 'article-legacy';
  }

  // If word has plural form, sometimes practice plurals
  if (word.plural && Math.random() < 0.2) {
    return 'plural';
  }

  // Default to vocabulary practice
  const direction = Math.random() < 0.5 ? 'dutch' : 'english';

  if (preferences.preferModern) {
    return direction === 'dutch'
      ? 'vocabulary-modern-dutch'
      : 'vocabulary-modern-english';
  } else {
    return 'vocabulary-legacy';
  }
}

// Exercise type metadata for UI display
export const exerciseTypeMetadata = {
  'vocabulary-modern-dutch': {
    name: 'English → Dutch',
    description: 'Translate English words to Dutch',
    icon: '🇬🇧→🇳🇱',
    difficulty: 'medium',
  },
  'vocabulary-modern-english': {
    name: 'Dutch → English',
    description: 'Translate Dutch words to English',
    icon: '🇳🇱→🇬🇧',
    difficulty: 'easy',
  },
  'article-modern': {
    name: 'Article Practice',
    description: 'Choose the correct Dutch article (de/het)',
    icon: '📝',
    difficulty: 'medium',
  },
  'vocabulary-legacy': {
    name: 'Vocabulary Cards',
    description: 'Traditional flashcard-style vocabulary practice',
    icon: '🗃️',
    difficulty: 'easy',
  },
  'article-legacy': {
    name: 'Article Cards',
    description: 'Traditional article practice',
    icon: '📋',
    difficulty: 'medium',
  },
  plural: {
    name: 'Plural Forms',
    description: 'Practice Dutch plural forms',
    icon: '🔢',
    difficulty: 'hard',
  },
} as const;
