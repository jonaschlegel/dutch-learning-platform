import { Button } from '@/components/Button';
import type { VocabularyItem } from '@/types/vocabulary';
import React from 'react';
import {
  createValidation,
  ExerciseResult,
  GenericExercise,
} from './GenericExercise';

interface ModernArticleExerciseProps {
  word: VocabularyItem;
  onComplete: (correct: boolean) => void;
}

export function ModernArticleExercise({
  word,
  onComplete,
}: ModernArticleExerciseProps) {
  if (!word.article) {
    return null;
  }

  const validateAnswer = (
    userAnswer: 'de' | 'het',
    data: VocabularyItem,
  ): ExerciseResult => {
    const isCorrect = userAnswer === data.article;
    return {
      isCorrect,
      userAnswer,
      correctAnswer: data.article,
      feedback: isCorrect
        ? `Correct! "${data.dutch}" uses "${data.article}".`
        : `"${data.dutch}" uses "${data.article}", not "${userAnswer}".`,
    };
  };

  const renderQuestion = (data: VocabularyItem) => (
    <div className="space-y-3">
      <div className="text-2xl font-bold text-blue-600">{data.dutch}</div>
      <div className="text-gray-600">English: {data.english}</div>
      <div className="text-sm text-gray-500 mt-2">
        Choose the correct article:
      </div>
    </div>
  );

  const renderAnswerInput = (
    data: VocabularyItem,
    onAnswerChange: (answer: 'de' | 'het') => void,
    currentAnswer: 'de' | 'het' | null,
  ) => (
    <div className="flex justify-center space-x-4">
      <Button
        variant={currentAnswer === 'de' ? 'default' : 'outline'}
        size="lg"
        onClick={() => onAnswerChange('de')}
        className={`px-8 py-3 text-lg font-medium transition-colors ${
          currentAnswer === 'de'
            ? 'bg-blue-600 text-white border-blue-600'
            : 'hover:bg-blue-50 hover:border-blue-300'
        }`}
      >
        de
      </Button>
      <Button
        variant={currentAnswer === 'het' ? 'default' : 'outline'}
        size="lg"
        onClick={() => onAnswerChange('het')}
        className={`px-8 py-3 text-lg font-medium transition-colors ${
          currentAnswer === 'het'
            ? 'bg-blue-600 text-white border-blue-600'
            : 'hover:bg-blue-50 hover:border-blue-300'
        }`}
      >
        het
      </Button>
    </div>
  );

  const renderFeedback = (result: ExerciseResult, data: VocabularyItem) => (
    <div className="space-y-2">
      <div className="text-sm">{result.feedback}</div>
      {data.category && (
        <div className="text-xs text-gray-600">
          <strong>Category:</strong> {data.category}
        </div>
      )}
      {data.hint && (
        <div className="text-xs text-gray-600">
          <strong>Tip:</strong> {data.hint}
        </div>
      )}
    </div>
  );

  return (
    <GenericExercise
      data={word}
      title="Article Practice"
      subtitle="Choose the correct Dutch article"
      hint={word.hint || undefined}
      validateAnswer={validateAnswer}
      renderQuestion={renderQuestion}
      renderAnswerInput={renderAnswerInput}
      renderFeedback={renderFeedback}
      onComplete={onComplete}
    />
  );
}
