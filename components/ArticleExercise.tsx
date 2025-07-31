'use client';

import { Button } from '@/components/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/Card';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/Tooltip';
import type { VocabularyItem } from '@/types/vocabulary';
import { CheckCircle, Lightbulb, XCircle } from 'lucide-react';
import { useState } from 'react';

interface ArticleExerciseProps {
  word: VocabularyItem;
  onComplete: (correct: boolean) => void;
}

export function ArticleExercise({ word, onComplete }: ArticleExerciseProps) {
  const [selectedArticle, setSelectedArticle] = useState<'de' | 'het' | null>(
    null,
  );
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const checkAnswer = () => {
    const correct = selectedArticle === word.article;
    setIsCorrect(correct);
    setShowFeedback(true);
  };

  const handleNext = () => {
    onComplete(isCorrect);
    setShowFeedback(false);
    setSelectedArticle(null);
  };

  if (!word.article) {
    return null;
  }

  return (
    <Card className="w-full max-w-md mx-auto bg-card shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center justify-between font-nunito">
          <span>Choose the correct article</span>
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
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center">
          <p className="text-2xl font-bold text-primary mb-2">
            ___{' '}
            {typeof word.dutch === 'string'
              ? word.dutch.replace(/^(de|het)\s+/, '')
              : Array.isArray(word.dutch)
              ? word.dutch.join(' ').replace(/^(de|het)\s+/, '')
              : ''}
          </p>
          <p className="text-lg text-muted-foreground">({word.english})</p>
        </div>

        <div className="flex space-x-4 justify-center">
          <Button
            variant={selectedArticle === 'de' ? 'default' : 'outline'}
            onClick={() => setSelectedArticle('de')}
            disabled={showFeedback}
            className={`w-20 ${
              selectedArticle === 'de'
                ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                : 'border-border hover:bg-muted'
            }`}
          >
            de
          </Button>
          <Button
            variant={selectedArticle === 'het' ? 'default' : 'outline'}
            onClick={() => setSelectedArticle('het')}
            disabled={showFeedback}
            className={`w-20 ${
              selectedArticle === 'het'
                ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                : 'border-border hover:bg-muted'
            }`}
          >
            het
          </Button>
        </div>

        <Button
          onClick={checkAnswer}
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
          disabled={!selectedArticle || showFeedback}
        >
          Check Answer
        </Button>

        {showFeedback && (
          <>
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
                  : `Incorrect. The correct article is: ${word.article}`}
              </span>
            </div>
            <Button
              onClick={handleNext}
              className="w-full bg-blue-600 text-white hover:bg-blue-700"
            >
              Next Exercise
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
}
