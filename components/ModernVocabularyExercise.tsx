import { Input } from '@/components/Input';
import type { VocabularyItem } from '@/types/vocabulary';
import React from 'react';
import { ExerciseResult, GenericExercise } from './GenericExercise';

interface ModernVocabularyExerciseProps {
  word: VocabularyItem;
  mode: 'dutch-to-english' | 'english-to-dutch';
  onComplete: (correct: boolean) => void;
}

export function ModernVocabularyExercise({
  word,
  mode,
  onComplete,
}: ModernVocabularyExerciseProps) {
  const validateAnswer = (
    userAnswer: string,
    data: VocabularyItem,
  ): ExerciseResult => {
    const userAnswerClean = userAnswer.trim().toLowerCase();

    // Get the correct answer based on mode
    const correctAnswers =
      mode === 'dutch-to-english'
        ? Array.isArray(data.english)
          ? data.english
          : [data.english]
        : Array.isArray(data.dutch)
        ? data.dutch
        : [data.dutch];

    // Check if any of the correct answers match
    const isCorrect = correctAnswers.some(
      (answer) => answer.toLowerCase() === userAnswerClean,
    );

    return {
      isCorrect,
      userAnswer,
      correctAnswer: correctAnswers.join(' / '),
      feedback: isCorrect
        ? 'Perfect! Well done!'
        : `The correct answer is: ${correctAnswers.join(' / ')}`,
    };
  };

  const renderQuestion = (data: VocabularyItem) => {
    const questionText =
      mode === 'dutch-to-english'
        ? Array.isArray(data.dutch)
          ? data.dutch[0]
          : data.dutch
        : Array.isArray(data.english)
        ? data.english[0]
        : data.english;

    const questionLabel =
      mode === 'dutch-to-english'
        ? 'Translate to English:'
        : 'Translate to Dutch:';

    return (
      <div className="space-y-3">
        <div className="text-sm text-gray-500">{questionLabel}</div>
        <div className="text-2xl font-bold text-blue-600">{questionText}</div>
        {data.category && (
          <div className="text-xs text-gray-400 uppercase tracking-wide">
            {data.category}
          </div>
        )}
      </div>
    );
  };

  const renderAnswerInput = (
    data: VocabularyItem,
    onAnswerChange: (answer: string) => void,
    currentAnswer: string | null,
  ) => (
    <div className="max-w-md mx-auto">
      <Input
        type="text"
        placeholder={
          mode === 'dutch-to-english'
            ? 'English translation...'
            : 'Dutch translation...'
        }
        value={currentAnswer || ''}
        onChange={(e) => onAnswerChange(e.target.value)}
        className="w-full text-center text-lg py-3"
        autoFocus
      />
    </div>
  );

  const renderFeedback = (result: ExerciseResult, data: VocabularyItem) => {
    const allCorrectAnswers =
      mode === 'dutch-to-english'
        ? Array.isArray(data.english)
          ? data.english
          : [data.english]
        : Array.isArray(data.dutch)
        ? data.dutch
        : [data.dutch];

    return (
      <div className="space-y-2">
        <div className="text-sm">{result.feedback}</div>

        {/* Show all possible correct answers if there are multiple */}
        {allCorrectAnswers.length > 1 && (
          <div className="text-xs text-gray-600">
            <strong>All correct answers:</strong> {allCorrectAnswers.join(', ')}
          </div>
        )}

        {/* Show context information */}
        <div className="text-xs text-gray-500 space-y-1">
          {data.category && (
            <div>
              <strong>Category:</strong> {data.category}
            </div>
          )}
          {data.section && (
            <div>
              <strong>Section:</strong> {data.section}
            </div>
          )}
          {data.hint && (
            <div>
              <strong>Tip:</strong> {data.hint}
            </div>
          )}
        </div>
      </div>
    );
  };

  // Create hint text
  const getHint = () => {
    if (word.hint) return word.hint;

    // Generate a helpful hint based on the word properties
    const hints = [];
    if (word.category) hints.push(`This is a ${word.category}`);
    if (word.article) hints.push(`Uses article "${word.article}"`);

    return hints.length > 0 ? hints.join('. ') : undefined;
  };

  return (
    <GenericExercise
      data={word}
      title="Vocabulary Practice"
      subtitle={
        mode === 'dutch-to-english' ? 'Dutch → English' : 'English → Dutch'
      }
      hint={getHint()}
      validateAnswer={validateAnswer}
      renderQuestion={renderQuestion}
      renderAnswerInput={renderAnswerInput}
      renderFeedback={renderFeedback}
      onComplete={onComplete}
    />
  );
}
