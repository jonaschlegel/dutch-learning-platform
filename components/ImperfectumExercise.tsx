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
import { CheckCircle, ChevronRight, Lightbulb, XCircle } from 'lucide-react';
import { useState } from 'react';

interface ImperfectumWord {
  id: string;
  infinitive: string;
  english: string;
  imperfectum: {
    ik: string;
    jij: string;
    hij: string;
    wij: string;
    jullie: string;
    zij: string;
  };
  category: 'regular' | 'irregular' | 'modal';
  level: 'A1' | 'A2';
  rule?: string;
  hint?: string;
  exampleSentence?: string;
  exampleTranslation?: string;
}

interface ImperfectumExerciseProps {
  word: ImperfectumWord;
  mode: 'conjugation' | 'complete' | 'translate';
  onComplete: (correct: boolean) => void;
}

export function ImperfectumExercise({
  word,
  mode,
  onComplete,
}: ImperfectumExerciseProps) {
  const [selectedPronoun, setSelectedPronoun] = useState<string>('ik');
  const [userConjugation, setUserConjugation] = useState('');
  const [userSentence, setUserSentence] = useState('');
  const [userTranslation, setUserTranslation] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [hasAnswered, setHasAnswered] = useState(false);

  const pronouns = ['ik', 'jij', 'hij', 'wij', 'jullie', 'zij'];
  const currentPronoun = selectedPronoun as keyof typeof word.imperfectum;

  const checkAnswer = () => {
    let correct = false;

    switch (mode) {
      case 'conjugation':
        correct =
          userConjugation.toLowerCase().trim() ===
          word.imperfectum[currentPronoun].toLowerCase();
        break;
      case 'complete':
        const expectedConjugation = word.imperfectum[currentPronoun];
        correct = userSentence
          .toLowerCase()
          .includes(expectedConjugation.toLowerCase());
        break;
      case 'translate':
        const hasCorrectForm = Object.values(word.imperfectum).some((form) =>
          userTranslation.toLowerCase().includes(form.toLowerCase()),
        );
        correct = hasCorrectForm;
        break;
    }

    setIsCorrect(correct);
    setShowFeedback(true);
    setHasAnswered(true);
  };

  const handleNext = () => {
    onComplete(isCorrect);
    setShowFeedback(false);
    setUserConjugation('');
    setUserSentence('');
    setUserTranslation('');
    setHasAnswered(false);
    const randomPronoun = pronouns[Math.floor(Math.random() * pronouns.length)];
    setSelectedPronoun(randomPronoun);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && hasAnswered) {
      e.preventDefault();
      handleNext();
    }
  };

  const getInstructions = () => {
    switch (mode) {
      case 'conjugation':
        return 'Conjugate the verb in imperfectum';
      case 'complete':
        return 'Complete the sentence';
      case 'translate':
        return 'Translate to Dutch (imperfectum)';
    }
  };

  const getPrompt = () => {
    switch (mode) {
      case 'conjugation':
        return `${
          currentPronoun.charAt(0).toUpperCase() + currentPronoun.slice(1)
        } ___ (${word.infinitive})`;
      case 'complete':
        return `${
          currentPronoun.charAt(0).toUpperCase() + currentPronoun.slice(1)
        } ___ gisteren...`;
      case 'translate':
        return word.exampleTranslation || `I ${word.english} yesterday`;
    }
  };

  const getLevelBadgeColor = () => {
    return word.level === 'A1'
      ? 'bg-green-100 text-green-800'
      : 'bg-blue-100 text-blue-800';
  };

  return (
    <Card
      className="w-full max-w-lg mx-auto bg-card shadow-lg min-h-[450px] flex flex-col"
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      <CardHeader>
        <CardTitle className="flex items-center justify-between font-nunito">
          <span>{getInstructions()}</span>
          <div className="flex items-center space-x-2">
            <span
              className={`px-2 py-1 rounded text-xs font-medium ${getLevelBadgeColor()}`}
            >
              {word.level}
            </span>
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
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 flex-1 flex flex-col">
        <div className="text-center">
          <p className="text-2xl font-bold text-primary mb-2">
            {word.infinitive}
          </p>
          <p className="text-lg text-muted-foreground mb-1">({word.english})</p>
          <p className="text-sm text-muted-foreground">
            Category: {word.category} {word.rule && `• ${word.rule}`}
          </p>
        </div>

        <div className="text-center bg-muted p-3 rounded-lg">
          <p className="text-md font-medium text-foreground">{getPrompt()}</p>
        </div>

        <div className="space-y-4 flex-1 flex flex-col justify-center">
          {mode === 'conjugation' && (
            <div className="space-y-3">
              <div className="flex justify-center space-x-2 mb-4">
                {pronouns.map((pronoun) => (
                  <Button
                    key={pronoun}
                    variant={
                      selectedPronoun === pronoun ? 'default' : 'outline'
                    }
                    size="sm"
                    onClick={() => setSelectedPronoun(pronoun)}
                    disabled={hasAnswered}
                    className="min-w-[60px]"
                  >
                    {pronoun}
                  </Button>
                ))}
              </div>
              <div className="flex items-center justify-center space-x-2">
                <span className="text-lg font-medium">{currentPronoun}</span>
                <Input
                  value={userConjugation}
                  onChange={(e) => setUserConjugation(e.target.value)}
                  placeholder="verb form..."
                  disabled={hasAnswered}
                  className="flex-1 max-w-[200px] text-center text-lg"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !hasAnswered) {
                      e.stopPropagation();
                      checkAnswer();
                    }
                  }}
                />
              </div>
            </div>
          )}

          {mode === 'complete' && (
            <div className="space-y-3">
              <div className="flex justify-center space-x-2 mb-4">
                {pronouns.map((pronoun) => (
                  <Button
                    key={pronoun}
                    variant={
                      selectedPronoun === pronoun ? 'default' : 'outline'
                    }
                    size="sm"
                    onClick={() => setSelectedPronoun(pronoun)}
                    disabled={hasAnswered}
                    className="min-w-[60px]"
                  >
                    {pronoun}
                  </Button>
                ))}
              </div>
              <Input
                value={userSentence}
                onChange={(e) => setUserSentence(e.target.value)}
                placeholder={`${currentPronoun} ... gisteren...`}
                disabled={hasAnswered}
                className="text-center"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !hasAnswered) {
                    e.stopPropagation();
                    checkAnswer();
                  }
                }}
              />
            </div>
          )}

          {mode === 'translate' && (
            <Input
              value={userTranslation}
              onChange={(e) => setUserTranslation(e.target.value)}
              placeholder="Type your Dutch translation..."
              disabled={hasAnswered}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !hasAnswered) {
                  e.stopPropagation();
                  checkAnswer();
                }
              }}
              className="text-center"
            />
          )}

          {!hasAnswered ? (
            <Button
              onClick={checkAnswer}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
              disabled={
                (mode === 'conjugation' && !userConjugation.trim()) ||
                (mode === 'complete' && !userSentence.trim()) ||
                (mode === 'translate' && !userTranslation.trim())
              }
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

        <div className="min-h-[120px] flex items-center justify-center">
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
                    {isCorrect ? 'Excellent! Correct!' : 'Not quite right.'}
                  </p>
                  {!isCorrect && (
                    <div className="mt-2 text-sm space-y-1">
                      <p className="font-semibold">
                        Correct answer:
                        <span className="text-dutch-blue ml-1">
                          {mode === 'conjugation'
                            ? `${currentPronoun} ${word.imperfectum[currentPronoun]}`
                            : mode === 'complete'
                            ? `${currentPronoun} ${word.imperfectum[currentPronoun]} gisteren...`
                            : word.exampleSentence ||
                              `${word.imperfectum.ik} (I ${word.english})`}
                        </span>
                      </p>
                      {word.rule && (
                        <p className="text-xs text-muted-foreground">
                          Rule: {word.rule}
                        </p>
                      )}
                      {word.exampleSentence && (
                        <p className="text-xs text-muted-foreground">
                          Example: {word.exampleSentence}
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
