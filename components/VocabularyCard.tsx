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
import { CheckCircle, Lightbulb, Volume2, XCircle } from 'lucide-react';
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

  const checkAnswer = () => {
    const userAnswerLower = userAnswer.toLowerCase().trim();
    let correct = false;

    if (Array.isArray(word.english)) {
      correct = word.english.some(
        (translation) => userAnswerLower === translation.toLowerCase(),
      );
    } else {
      correct = userAnswerLower === word.dutch.toLowerCase();
    }

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

  const englishDisplay = Array.isArray(word.english)
    ? word.english.join(' / ')
    : word.english;

  return (
    <Card className="w-full max-w-md mx-auto bg-card shadow-lg">
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
      <CardContent className="space-y-4">
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

        <div className="space-y-4">
          <Input
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            placeholder="Type your answer in Dutch..."
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
                : `Incorrect. The answer is: ${word.dutch}`}
              {!isCorrect && Array.isArray(word.english) && (
                <span className="block text-sm mt-1">
                  Possible translations: {word.english.join(', ')}
                </span>
              )}
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
