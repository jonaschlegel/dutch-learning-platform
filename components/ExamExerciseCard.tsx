'use client';

import { Badge } from '@/components/Badge';
import { Button } from '@/components/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/Card';
import { Input } from '@/components/Input';
import { Progress } from '@/components/Progress';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/Tooltip';
import { ExamExercise } from '@/data/final-exam-exercises';
import {
  BookOpen,
  CheckCircle,
  Eye,
  EyeOff,
  Lightbulb,
  RotateCcw,
  Target,
  TrendingUp,
  Volume2,
  XCircle,
} from 'lucide-react';
import React, { useRef, useState } from 'react';

interface ExamExerciseCardProps {
  exercise: ExamExercise;
  onComplete: (correct: boolean) => void;
  showHints?: boolean;
}

export function ExamExerciseCard({
  exercise,
  onComplete,
  showHints = true,
}: ExamExerciseCardProps) {
  const [userAnswer, setUserAnswer] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [currentHintIndex, setCurrentHintIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const checkAnswer = () => {
    let correct = false;
    let userResponse = '';

    switch (exercise.type) {
      case 'multiple-choice':
        userResponse = selectedOption.toLowerCase().trim();
        if (Array.isArray(exercise.correctAnswer)) {
          correct = exercise.correctAnswer.some(
            (answer) => answer.toLowerCase().trim() === userResponse,
          );
        } else {
          correct =
            userResponse === exercise.correctAnswer.toLowerCase().trim();
        }
        break;

      case 'perfect-construction':
      case 'imperfect-fill':
      case 'separable-verbs':
      case 'conjunctions-combine':
        userResponse = userAnswer.toLowerCase().trim();
        if (Array.isArray(exercise.correctAnswer)) {
          correct = exercise.correctAnswer.some(
            (answer) => answer.toLowerCase().trim() === userResponse,
          );
        } else {
          const correctAnswerLower = exercise.correctAnswer
            .toLowerCase()
            .trim();
          correct = userResponse === correctAnswerLower;

          // For fill-in exercises, also check if answer is just the verb form
          if (!correct && exercise.type === 'imperfect-fill') {
            // Extract just the verb form from the sentence
            const verbMatch = correctAnswerLower.match(
              /\.\.\.\.\.\.\.\.\.\.(.*?)\.\.\.\.\.\.\.\.\.\.|\s+(\w+)\s+/,
            );
            if (verbMatch) {
              const verbForm = verbMatch[1] || verbMatch[2];
              correct = userResponse === verbForm;
            }
          }
        }
        break;

      case 'writing-prompt':
        // For writing exercises, we consider it "correct" if user provided substantial content
        userResponse = userAnswer.trim();
        correct = userResponse.length >= 50; // At least 50 characters for a meaningful response
        break;
    }

    setIsCorrect(correct);
    setShowFeedback(true);
  };

  const handleNext = () => {
    onComplete(isCorrect);
    resetExercise();
  };

  const resetExercise = () => {
    setUserAnswer('');
    setSelectedOption('');
    setShowFeedback(false);
    setIsCorrect(false);
    setShowHint(false);
    setShowAnswer(false);
    setCurrentHintIndex(0);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !showFeedback) {
      if (exercise.type === 'multiple-choice' && selectedOption) {
        checkAnswer();
      } else if (exercise.type !== 'multiple-choice' && userAnswer.trim()) {
        checkAnswer();
      }
    } else if (e.key === 'Enter' && showFeedback) {
      handleNext();
    }
  };

  const showNextHint = () => {
    if (exercise.hints && currentHintIndex < exercise.hints.length - 1) {
      setCurrentHintIndex(currentHintIndex + 1);
    }
    setShowHint(true);
  };

  const renderExerciseContent = () => {
    switch (exercise.type) {
      case 'multiple-choice':
        return (
          <div className="space-y-4">
            <div className="text-center">
              <p className="text-lg font-medium text-foreground mb-2">
                {exercise.question}
              </p>
              {exercise.englishTranslation && (
                <p className="text-sm text-muted-foreground italic">
                  {exercise.englishTranslation}
                </p>
              )}
            </div>

            <div className="space-y-2">
              {exercise.options?.map((option, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedOption(option)}
                  className={`w-full p-3 text-left rounded-lg border transition-all ${
                    selectedOption === option
                      ? 'border-primary bg-primary/10 text-primary'
                      : 'border-border hover:border-primary/50 hover:bg-primary/5'
                  }`}
                  disabled={showFeedback}
                >
                  <span className="font-medium mr-2">
                    {String.fromCharCode(65 + index)})
                  </span>
                  {option}
                </button>
              ))}
            </div>
          </div>
        );

      case 'perfect-construction':
      case 'conjunctions-combine':
        return (
          <div className="space-y-4">
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-2">
                {exercise.instruction}
              </p>
              <p className="text-lg font-medium text-foreground mb-2">
                {exercise.question}
              </p>
              {exercise.englishTranslation && (
                <p className="text-sm text-muted-foreground italic">
                  {exercise.englishTranslation}
                </p>
              )}
            </div>

            <div className="space-y-3">
              <Input
                ref={inputRef}
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your answer here..."
                className="text-center text-lg"
                disabled={showFeedback}
                autoFocus
              />
            </div>
          </div>
        );

      case 'imperfect-fill':
      case 'separable-verbs':
        return (
          <div className="space-y-4">
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-2">
                {exercise.instruction}
              </p>
              <div className="text-lg font-medium text-foreground mb-2">
                {exercise.question
                  .split('..........')
                  .map((part, index, array) => (
                    <span key={index}>
                      {part}
                      {index < array.length - 1 && (
                        <span className="mx-2">
                          <Input
                            value={userAnswer}
                            onChange={(e) => setUserAnswer(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="..."
                            className="inline-block w-32 mx-1 text-center"
                            disabled={showFeedback}
                            autoFocus={index === 0}
                          />
                        </span>
                      )}
                    </span>
                  ))}
              </div>
              {exercise.englishTranslation && (
                <p className="text-sm text-muted-foreground italic">
                  {exercise.englishTranslation}
                </p>
              )}
            </div>
          </div>
        );

      case 'writing-prompt':
        return (
          <div className="space-y-4">
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-2">
                {exercise.instruction}
              </p>
              <div className="text-lg font-medium text-foreground mb-4">
                {exercise.question}
              </div>
              {exercise.englishTranslation && (
                <p className="text-sm text-muted-foreground italic mb-4">
                  {exercise.englishTranslation}
                </p>
              )}
              {exercise.wordCount && (
                <p className="text-xs text-muted-foreground mb-4">
                  Target word count: approximately {exercise.wordCount} words
                </p>
              )}
              <textarea
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="Write your answer here..."
                className="w-full h-48 p-3 border border-input rounded-md resize-none text-sm"
                disabled={showFeedback}
                autoFocus
              />
              <div className="text-xs text-muted-foreground mt-2">
                Current word count:{' '}
                {
                  userAnswer
                    .trim()
                    .split(/\s+/)
                    .filter((word) => word.length > 0).length
                }{' '}
                words
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-lg border-2 border-border">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Badge variant="secondary" className="text-xs">
              {exercise.category}
            </Badge>
            <Badge variant="outline" className="text-xs">
              Level {exercise.level}
            </Badge>
            <Badge variant="outline" className="text-xs">
              {exercise.points} {exercise.points === 1 ? 'point' : 'points'}
            </Badge>
          </div>
          <div className="flex space-x-2">
            {showHints && exercise.hints && exercise.hints.length > 0 && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={showNextHint}
                      disabled={showFeedback}
                      className="text-xs"
                    >
                      <Lightbulb className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Show hint</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowAnswer(!showAnswer)}
                    disabled={!showFeedback}
                    className="text-xs"
                  >
                    {showAnswer ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{showAnswer ? 'Hide answer' : 'Show answer'}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {renderExerciseContent()}

        {showHint && exercise.hints && exercise.hints[currentHintIndex] && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start space-x-2">
              <Lightbulb className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-blue-800">Hint:</p>
                <p className="text-sm text-blue-700">
                  {exercise.hints[currentHintIndex]}
                </p>
                {currentHintIndex < exercise.hints.length - 1 && (
                  <Button
                    variant="link"
                    size="sm"
                    onClick={showNextHint}
                    className="text-blue-600 p-0 h-auto text-xs mt-1"
                  >
                    Show next hint
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}

        {showAnswer && showFeedback && (
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <div className="flex items-start space-x-2">
              <Target className="h-5 w-5 text-gray-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-gray-800">
                  Correct Answer:
                </p>
                <p className="text-sm text-gray-700 font-mono">
                  {Array.isArray(exercise.correctAnswer)
                    ? exercise.correctAnswer.join(' or ')
                    : exercise.correctAnswer}
                </p>
              </div>
            </div>
          </div>
        )}

        {showFeedback && (
          <div
            className={`rounded-lg p-4 border ${
              isCorrect
                ? 'bg-green-50 border-green-200 text-green-800'
                : 'bg-red-50 border-red-200 text-red-800'
            }`}
          >
            <div className="flex items-start space-x-2">
              {isCorrect ? (
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
              ) : (
                <XCircle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
              )}
              <div className="flex-1">
                <p className="font-medium">
                  {isCorrect ? 'Correct!' : 'Incorrect'}
                </p>
                {exercise.explanation && (
                  <p className="text-sm mt-1">{exercise.explanation}</p>
                )}
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-center space-x-4">
          {!showFeedback ? (
            <Button
              onClick={checkAnswer}
              disabled={
                exercise.type === 'multiple-choice'
                  ? !selectedOption
                  : !userAnswer.trim()
              }
              className="px-8"
            >
              Check Answer
            </Button>
          ) : (
            <Button onClick={handleNext} className="px-8">
              Continue
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
