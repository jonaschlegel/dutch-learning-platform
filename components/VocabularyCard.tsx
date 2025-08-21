'use client';

import { Button } from '@/components/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/Card';
import { Input } from '@/components/Input';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/Tooltip';
import type { VocabularyItem } from '@/types/vocabulary';
import {
  CheckCircle,
  ChevronRight,
  Lightbulb,
  Volume2,
  XCircle,
} from 'lucide-react';
import { useState } from 'react';

interface VocabularyCardProps {
  word: VocabularyItem;
  mode: 'recognition' | 'production';
  onComplete: (correct: boolean) => void;
}

export function VocabularyCard({
  word,
  mode,
  onComplete,
}: VocabularyCardProps) {
  const [userAnswer, setUserAnswer] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [hasAnswered, setHasAnswered] = useState(false);

  const checkAnswer = () => {
    const userAnswerLower = userAnswer.toLowerCase().trim();
    let correct = false;

    if (Array.isArray(word.dutch)) {
      correct = word.dutch.some(
        (dutchForm) => userAnswerLower === dutchForm.toLowerCase(),
      );
    } else {
      correct = userAnswerLower === word.dutch.toLowerCase();
    }

    setIsCorrect(correct);
    setShowFeedback(true);
    setHasAnswered(true);
  };

  const handleNext = () => {
    onComplete(isCorrect);
    setShowFeedback(false);
    setUserAnswer('');
    setHasAnswered(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      if (hasAnswered) {
        e.preventDefault();
        handleNext();
      } else if (userAnswer.trim()) {
        e.preventDefault();
        checkAnswer();
      }
    }
  };

  const playAudio = () => {
    const dutchText = Array.isArray(word.dutch) ? word.dutch[0] : word.dutch;
    const utterance = new SpeechSynthesisUtterance(dutchText);
    utterance.lang = 'nl-NL';
    speechSynthesis.speak(utterance);
  };

  const englishDisplay = Array.isArray(word.english)
    ? word.english.join(' / ')
    : word.english;

  return (
    <Card
      className="w-full max-w-md mx-auto bg-card shadow-lg min-h-[400px] flex flex-col"
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      <CardHeader>
        <CardTitle className="flex items-center justify-between font-nunito">
          <span>Translate to Dutch</span>
          <div className="flex items-center space-x-2">
            {word.hint && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-border text-foreground hover:bg-muted bg-transparent"
                    >
                      <Lightbulb className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs p-3 text-sm">
                    {word.hint}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={playAudio}
              className="border-border text-foreground hover:bg-muted bg-transparent"
            >
              <Volume2 className="h-4 w-4" />
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 flex-1 flex flex-col">
        <div className="text-center">
          <p className="text-2xl font-bold text-primary mb-2">
            {englishDisplay}
          </p>
          {word.article && (
            <p className="text-sm text-muted-foreground">
              Article: {word.article}
            </p>
          )}
        </div>

        <div className="space-y-4 flex-1 flex flex-col justify-center">
          <Input
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            placeholder="Type your answer in Dutch..."
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                if (!hasAnswered) {
                  e.stopPropagation();
                  checkAnswer();
                }
                // If hasAnswered is true, let the event bubble up to the card handler
              }
            }}
            disabled={hasAnswered}
            className="border-input focus:ring-ring focus:border-primary"
          />

          {!hasAnswered ? (
            <Button
              onClick={checkAnswer}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
              disabled={!userAnswer.trim()}
            >
              Check Answer
            </Button>
          ) : (
            <Button
              onClick={handleNext}
              className="w-full bg-dutch-blue text-white hover:bg-dutch-blue/90 flex items-center justify-center space-x-2"
            >
              <span>Next Question</span>
              <ChevronRight className="h-4 w-4" />
            </Button>
          )}
        </div>

        <div className="min-h-[80px] flex items-center justify-center">
          {showFeedback && (
            <div
              className={`w-full p-4 rounded-lg border-2 transition-all duration-300 ${
                isCorrect
                  ? 'bg-green-50 border-green-200 text-green-800'
                  : 'bg-red-50 border-red-200 text-red-800'
              }`}
            >
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 mt-0.5">
                  {isCorrect ? (
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-600" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-sm">
                    {isCorrect ? 'Correct! Well done!' : 'Not quite right.'}
                  </p>
                  {!isCorrect && (
                    <div className="mt-2 text-sm">
                      <p className="font-semibold">
                        Correct answer:{' '}
                        <span className="text-dutch-blue">
                          {Array.isArray(word.dutch)
                            ? word.dutch.join(' / ')
                            : word.dutch}
                        </span>
                      </p>
                      {Array.isArray(word.english) &&
                        word.english.length > 1 && (
                          <p className="mt-1 text-xs text-muted-foreground">
                            Other translations:{' '}
                            {word.english.slice(1).join(', ')}
                          </p>
                        )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
