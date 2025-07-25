'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/Card';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import type { VocabularyItem } from '@/types/vocabulary';
import { CheckCircle, XCircle, Lightbulb, Volume2 } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/Tooltip';

interface PluralExerciseProps {
  word: VocabularyItem;
  onComplete: (correct: boolean) => void;
}

export function PluralExercise({ word, onComplete }: PluralExerciseProps) {
  const [userAnswer, setUserAnswer] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const checkAnswer = () => {
    const correct =
      userAnswer.toLowerCase().trim() === word.plural?.toLowerCase().trim();
    setIsCorrect(correct);
    setShowFeedback(true);
    setTimeout(() => {
      onComplete(correct);
      setShowFeedback(false);
      setUserAnswer('');
    }, 1500);
  };

  const playAudio = () => {
    const utterance = new SpeechSynthesisUtterance(word.dutch);
    utterance.lang = 'nl-NL';
    speechSynthesis.speak(utterance);
  };

  if (!word.plural) {
    return null;
  }

  return (
    <Card className="w-full max-w-md mx-auto bg-card shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center justify-between font-nunito">
          <span>Form the plural</span>
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
      <CardContent className="space-y-4">
        <div className="text-center">
          <p className="text-2xl font-bold text-primary mb-2">
            {word.article && (
              <span className="text-lg text-muted-foreground mr-1">
                {word.article}
              </span>
            )}
            {word.dutch}
          </p>
          <p className="text-lg text-muted-foreground">({word.english})</p>
        </div>

        <div className="space-y-4">
          <Input
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            placeholder="Type the plural form..."
            onKeyPress={(e) => e.key === 'Enter' && checkAnswer()}
            disabled={showFeedback}
            className="border-input focus:ring-ring focus:border-primary"
          />

          <Button
            onClick={checkAnswer}
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
            disabled={!userAnswer.trim() || showFeedback}
          >
            Check Answer
          </Button>
        </div>

        {showFeedback && (
          <div
            className={`flex items-center justify-center space-x-2 p-4 rounded-lg ${
              isCorrect
                ? 'bg-green-100 text-green-800'
                : 'bg-red-100 text-red-800'
            }`}
          >
            {isCorrect ? (
              <CheckCircle className="h-5 w-5" />
            ) : (
              <XCircle className="h-5 w-5" />
            )}
            <span className="font-medium">
              {isCorrect
                ? 'Correct!'
                : `Incorrect. The plural is: ${word.plural}`}
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
