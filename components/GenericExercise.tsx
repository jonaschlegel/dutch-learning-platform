import { Button } from '@/components/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/Card';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/Tooltip';
import { CheckCircle, ChevronRight, Lightbulb, XCircle } from 'lucide-react';
import React, { ReactNode, useCallback, useState } from 'react';

export interface ExerciseResult {
  isCorrect: boolean;
  userAnswer?: any;
  correctAnswer?: any;
  feedback?: string;
  hint?: string;
}

export interface GenericExerciseProps<TData = any> {
  // Data for the exercise
  data: TData;

  // Exercise configuration
  title: string;
  subtitle?: string;
  hint?: string;

  // Answer validation function
  validateAnswer: (userAnswer: any, data: TData) => ExerciseResult;

  // Render functions for different parts of the exercise
  renderQuestion: (data: TData) => ReactNode;
  renderAnswerInput: (
    data: TData,
    onAnswerChange: (answer: any) => void,
    currentAnswer: any,
  ) => ReactNode;
  renderFeedback?: (result: ExerciseResult, data: TData) => ReactNode;

  // Event handlers
  onComplete: (correct: boolean) => void;
  onHintUsed?: () => void;

  // Optional customization
  className?: string;
  showHintButton?: boolean;
  autoFocus?: boolean;
}

export function GenericExercise<TData = any>({
  data,
  title,
  subtitle,
  hint,
  validateAnswer,
  renderQuestion,
  renderAnswerInput,
  renderFeedback,
  onComplete,
  onHintUsed,
  className = '',
  showHintButton = true,
  autoFocus = true,
}: GenericExerciseProps<TData>) {
  const [userAnswer, setUserAnswer] = useState<any>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [exerciseResult, setExerciseResult] = useState<ExerciseResult | null>(
    null,
  );
  const [hasAnswered, setHasAnswered] = useState(false);
  const [hintUsed, setHintUsed] = useState(false);

  const handleAnswerChange = useCallback(
    (answer: any) => {
      setUserAnswer(answer);
      if (hasAnswered) {
        // Reset feedback when user changes answer after getting it wrong
        setShowFeedback(false);
        setHasAnswered(false);
      }
    },
    [hasAnswered],
  );

  const checkAnswer = useCallback(() => {
    if (userAnswer === null || userAnswer === undefined || userAnswer === '') {
      return;
    }

    const result = validateAnswer(userAnswer, data);
    setExerciseResult(result);
    setShowFeedback(true);
    setHasAnswered(true);
  }, [userAnswer, data, validateAnswer]);

  const handleNext = useCallback(() => {
    if (exerciseResult) {
      onComplete(exerciseResult.isCorrect);

      // Reset state for next exercise
      setUserAnswer(null);
      setShowFeedback(false);
      setExerciseResult(null);
      setHasAnswered(false);
      setHintUsed(false);
    }
  }, [exerciseResult, onComplete]);

  const handleHint = useCallback(() => {
    setHintUsed(true);
    if (onHintUsed) {
      onHintUsed();
    }
  }, [onHintUsed]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter') {
        if (showFeedback && exerciseResult) {
          handleNext();
        } else if (
          userAnswer !== null &&
          userAnswer !== undefined &&
          userAnswer !== ''
        ) {
          checkAnswer();
        }
      }
    },
    [showFeedback, exerciseResult, userAnswer, checkAnswer, handleNext],
  );

  const canSubmit =
    userAnswer !== null && userAnswer !== undefined && userAnswer !== '';
  const isCorrect = exerciseResult?.isCorrect ?? false;

  return (
    <Card
      className={`w-full max-w-2xl mx-auto ${className}`}
      onKeyDown={handleKeyDown}
      tabIndex={-1}
    >
      <CardHeader className="text-center pb-4">
        <CardTitle className="text-xl font-bold text-gray-800">
          {title}
        </CardTitle>
        {subtitle && <p className="text-sm text-gray-600 mt-1">{subtitle}</p>}
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Question Section */}
        <div className="text-center text-lg font-medium text-gray-700">
          {renderQuestion(data)}
        </div>

        {/* Answer Input Section */}
        <div className="space-y-4">
          {renderAnswerInput(data, handleAnswerChange, userAnswer)}
        </div>

        {/* Hint Section */}
        {hint && showHintButton && (
          <div className="flex justify-center">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleHint}
                    className="flex items-center space-x-2"
                  >
                    <Lightbulb className="h-4 w-4" />
                    <span>Hint</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs">{hint}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-center space-x-3">
          {!showFeedback ? (
            <Button
              onClick={checkAnswer}
              disabled={!canSubmit}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8"
            >
              Check Answer
            </Button>
          ) : (
            <Button
              onClick={handleNext}
              className={`px-8 ${
                isCorrect
                  ? 'bg-green-600 hover:bg-green-700 text-white'
                  : 'bg-orange-600 hover:bg-orange-700 text-white'
              }`}
            >
              <span className="flex items-center space-x-2">
                <span>Next</span>
                <ChevronRight className="h-4 w-4" />
              </span>
            </Button>
          )}
        </div>

        {/* Feedback Section */}
        {showFeedback && exerciseResult && (
          <div
            className={`p-4 rounded-lg ${
              isCorrect
                ? 'bg-green-50 border border-green-200'
                : 'bg-red-50 border border-red-200'
            }`}
          >
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                {isCorrect ? (
                  <CheckCircle className="h-6 w-6 text-green-600" />
                ) : (
                  <XCircle className="h-6 w-6 text-red-600" />
                )}
              </div>
              <div className="flex-1">
                <div
                  className={`font-medium ${
                    isCorrect ? 'text-green-800' : 'text-red-800'
                  }`}
                >
                  {isCorrect ? 'Correct!' : 'Incorrect'}
                </div>

                {/* Custom feedback rendering */}
                {renderFeedback ? (
                  renderFeedback(exerciseResult, data)
                ) : (
                  <div
                    className={`mt-1 text-sm ${
                      isCorrect ? 'text-green-600' : 'text-red-600'
                    }`}
                  >
                    {exerciseResult.feedback ||
                      (isCorrect
                        ? 'Well done!'
                        : `The correct answer is: ${exerciseResult.correctAnswer}`)}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Hint Display */}
        {hintUsed && hint && (
          <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-start space-x-2">
              <Lightbulb className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-yellow-800">{hint}</div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// Helper function to create common answer validation patterns
export const createValidation = {
  exact:
    (correctAnswer: string, caseSensitive = false) =>
    (userAnswer: string) => ({
      isCorrect: caseSensitive
        ? userAnswer === correctAnswer
        : userAnswer.toLowerCase() === correctAnswer.toLowerCase(),
      userAnswer,
      correctAnswer,
    }),

  multipleChoice: (correctAnswer: any) => (userAnswer: any) => ({
    isCorrect: userAnswer === correctAnswer,
    userAnswer,
    correctAnswer,
  }),

  custom:
    (validator: (userAnswer: any, data: any) => boolean, correctAnswer?: any) =>
    (userAnswer: any, data: any) => ({
      isCorrect: validator(userAnswer, data),
      userAnswer,
      correctAnswer,
    }),
};
