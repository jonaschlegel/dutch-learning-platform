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

interface PerfectTenseWord {
  id: string;
  infinitive: string;
  english: string;
  pastParticiple: string;
  auxiliary: 'hebben' | 'zijn';
  category: 'regular' | 'irregular' | 'strong' | 'movement' | 'change';
  rule?: string;
  hint?: string;
  exampleSentence?: string;
  exampleTranslation?: string;
}

interface PerfectTenseExerciseProps {
  word: PerfectTenseWord;
  mode: 'participle' | 'auxiliary' | 'complete' | 'translate';
  onComplete: (correct: boolean) => void;
}

export function PerfectTenseExercise({
  word,
  mode,
  onComplete,
}: PerfectTenseExerciseProps) {
  const [userParticiple, setUserParticiple] = useState('');
  const [userAuxiliary, setUserAuxiliary] = useState<'hebben' | 'zijn' | ''>(
    '',
  );
  const [userTranslation, setUserTranslation] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [hasAnswered, setHasAnswered] = useState(false);

  const checkAnswer = () => {
    let correct = false;

    switch (mode) {
      case 'participle':
        correct =
          userParticiple.toLowerCase().trim() ===
          word.pastParticiple.toLowerCase();
        break;
      case 'auxiliary':
        correct = userAuxiliary === word.auxiliary;
        break;
      case 'complete':
        const participleCorrect =
          userParticiple.toLowerCase().trim() ===
          word.pastParticiple.toLowerCase();
        const auxiliaryCorrect = userAuxiliary === word.auxiliary;
        correct = participleCorrect && auxiliaryCorrect;
        break;
      case 'translate':
        const hasAuxiliary = userTranslation
          .toLowerCase()
          .includes(word.auxiliary);
        const hasParticiple = userTranslation
          .toLowerCase()
          .includes(word.pastParticiple.toLowerCase());
        correct = hasAuxiliary && hasParticiple;
        break;
    }

    setIsCorrect(correct);
    setShowFeedback(true);
    setHasAnswered(true);
  };

  const handleNext = () => {
    onComplete(isCorrect);
    setShowFeedback(false);
    setUserParticiple('');
    setUserAuxiliary('');
    setUserTranslation('');
    setHasAnswered(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      if (hasAnswered) {
        e.preventDefault();
        handleNext();
      } else {
        // Check if we have valid answers based on mode
        const canCheck =
          (mode === 'participle' && userParticiple.trim()) ||
          (mode === 'auxiliary' && userAuxiliary) ||
          (mode === 'complete' && userParticiple.trim() && userAuxiliary) ||
          (mode === 'translate' && userTranslation.trim());

        if (canCheck) {
          e.preventDefault();
          checkAnswer();
        }
      }
    }
  };

  const getInstructions = () => {
    switch (mode) {
      case 'participle':
        return 'Form the past participle';
      case 'auxiliary':
        return 'Choose the correct auxiliary verb';
      case 'complete':
        return 'Complete the perfect tense';
      case 'translate':
        return 'Translate to Dutch (perfect tense)';
    }
  };

  const getPrompt = () => {
    switch (mode) {
      case 'participle':
        return `Past participle of "${word.infinitive}":`;
      case 'auxiliary':
        return `Which auxiliary verb goes with "${word.infinitive}"?`;
      case 'complete':
        return `Perfect tense of "${word.infinitive}":`;
      case 'translate':
        return word.exampleTranslation || `I have ${word.english}`;
    }
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
      <CardContent className="space-y-4 flex-1 flex flex-col">
        <div className="text-center">
          <p className="text-2xl font-bold text-primary mb-2">
            {word.infinitive}
          </p>
          <p className="text-lg text-muted-foreground mb-1">
            (
            {Array.isArray(word.english)
              ? word.english.join(', ')
              : word.english}
            )
          </p>
          <p className="text-sm text-muted-foreground">
            Category: {word.category} {word.rule && `• ${word.rule}`}
          </p>
        </div>

        <div className="text-center bg-muted p-3 rounded-lg">
          <p className="text-md font-medium text-foreground">{getPrompt()}</p>
        </div>

        <div className="space-y-4 flex-1 flex flex-col justify-center">
          {mode === 'participle' && (
            <Input
              value={userParticiple}
              onChange={(e) => setUserParticiple(e.target.value)}
              placeholder="Type the past participle..."
              disabled={hasAnswered}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  if (!hasAnswered) {
                    e.stopPropagation();
                    checkAnswer();
                  }
                  // If hasAnswered is true, let the event bubble up to the card handler
                }
              }}
              className="text-center text-lg"
            />
          )}

          {mode === 'auxiliary' && (
            <div className="flex space-x-4 justify-center">
              <Button
                variant={userAuxiliary === 'hebben' ? 'default' : 'outline'}
                onClick={() => setUserAuxiliary('hebben')}
                disabled={hasAnswered}
                className="flex-1 max-w-[120px]"
              >
                hebben
              </Button>
              <Button
                variant={userAuxiliary === 'zijn' ? 'default' : 'outline'}
                onClick={() => setUserAuxiliary('zijn')}
                disabled={hasAnswered}
                className="flex-1 max-w-[120px]"
              >
                zijn
              </Button>
            </div>
          )}

          {mode === 'complete' && (
            <div className="space-y-3">
              <div className="flex space-x-2 justify-center">
                <span className="text-lg self-center">Ik</span>
                <Button
                  variant={userAuxiliary === 'hebben' ? 'default' : 'outline'}
                  onClick={() => setUserAuxiliary('hebben')}
                  disabled={hasAnswered}
                  size="sm"
                  className="min-w-[80px]"
                >
                  heb
                </Button>
                <Button
                  variant={userAuxiliary === 'zijn' ? 'default' : 'outline'}
                  onClick={() => setUserAuxiliary('zijn')}
                  disabled={hasAnswered}
                  size="sm"
                  className="min-w-[80px]"
                >
                  ben
                </Button>
                <Input
                  value={userParticiple}
                  onChange={(e) => setUserParticiple(e.target.value)}
                  placeholder="past participle..."
                  disabled={hasAnswered}
                  className="flex-1 max-w-[150px] text-center"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      if (!hasAnswered) {
                        e.stopPropagation();
                        checkAnswer();
                      }
                      // If hasAnswered is true, let the event bubble up to the card handler
                    }
                  }}
                />
              </div>
            </div>
          )}

          {mode === 'translate' && (
            <Input
              value={userTranslation}
              onChange={(e) => setUserTranslation(e.target.value)}
              placeholder="Type your Dutch translation..."
              disabled={hasAnswered}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  if (!hasAnswered) {
                    e.stopPropagation();
                    checkAnswer();
                  }
                  // If hasAnswered is true, let the event bubble up to the card handler
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
                (mode === 'participle' && !userParticiple.trim()) ||
                (mode === 'auxiliary' && !userAuxiliary) ||
                (mode === 'complete' &&
                  (!userParticiple.trim() || !userAuxiliary)) ||
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
                    {isCorrect ? 'Excellent! Perfect!' : 'Not quite right.'}
                  </p>
                  {!isCorrect && (
                    <div className="mt-2 text-sm space-y-1">
                      <p className="font-semibold">
                        Correct answer:
                        <span className="text-dutch-blue ml-1">
                          {mode === 'auxiliary'
                            ? word.auxiliary
                            : mode === 'participle'
                            ? word.pastParticiple
                            : mode === 'complete'
                            ? `Ik ${
                                word.auxiliary === 'hebben' ? 'heb' : 'ben'
                              } ${word.pastParticiple}`
                            : mode === 'translate'
                            ? `Ik ${
                                word.auxiliary === 'hebben' ? 'heb' : 'ben'
                              } ${word.pastParticiple}` +
                              (word.exampleSentence
                                ? ` (${word.exampleSentence})`
                                : '')
                            : `Ik ${
                                word.auxiliary === 'hebben' ? 'heb' : 'ben'
                              } ${word.pastParticiple}`}
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
