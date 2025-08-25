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
import type { ModalVerb } from '@/data/modal-verbs';
import { CheckCircle, ChevronRight, Lightbulb, XCircle } from 'lucide-react';
import { useState } from 'react';

interface ModalVerbsExerciseProps {
  word: ModalVerb;
  mode: 'conjugation' | 'usage' | 'translate' | 'negative' | 'question';
  onComplete: (correct: boolean) => void;
}

export function ModalVerbsExercise({
  word,
  mode,
  onComplete,
}: ModalVerbsExerciseProps) {
  const [selectedPronoun, setSelectedPronoun] = useState<string>('ik');
  const [userConjugation, setUserConjugation] = useState('');
  const [userSentence, setUserSentence] = useState('');
  const [userTranslation, setUserTranslation] = useState('');
  const [selectedUsage, setSelectedUsage] = useState<string>('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [hasAnswered, setHasAnswered] = useState(false);

  const pronouns = ['ik', 'jij', 'hij', 'wij', 'jullie', 'zij'];
  const currentPronoun = selectedPronoun as keyof typeof word.present;

  // Usage options for usage mode
  const usageOptions = [
    'ability/possibility',
    'permission',
    'necessity/obligation',
    'desire/wish',
    'future tense',
    'causative',
    'courage',
  ];

  const checkAnswer = () => {
    let correct = false;

    switch (mode) {
      case 'conjugation':
        const expectedForm = word.present[currentPronoun];
        const acceptedForms = expectedForm.includes('/')
          ? expectedForm.split('/')
          : [expectedForm];
        correct = acceptedForms.some(
          (form) =>
            userConjugation.toLowerCase().trim() === form.toLowerCase().trim(),
        );
        break;
      case 'usage':
        const usageMap: Record<string, string[]> = {
          'ability/possibility': ['kunnen'],
          permission: ['mogen', 'laten'],
          'necessity/obligation': ['moeten', 'hoeven'],
          'desire/wish': ['willen'],
          'future tense': ['zullen'],
          causative: ['laten'],
          courage: ['durven'],
        };
        correct = usageMap[selectedUsage]?.includes(word.infinitive) || false;
        break;
      case 'translate':
        const hasCorrectForm = Object.values(word.present).some((form) => {
          const forms = form.includes('/') ? form.split('/') : [form];
          return forms.some((f) =>
            userTranslation.toLowerCase().includes(f.toLowerCase()),
          );
        });
        correct = hasCorrectForm;
        break;
      case 'negative':
        const expectedNegative = word.negativeForm || `${word.present.ik} niet`;
        correct = userSentence
          .toLowerCase()
          .includes(expectedNegative.toLowerCase());
        break;
      case 'question':
        const expectedQuestion = word.questionForm || '';
        const questionWords = expectedQuestion.toLowerCase().split(/\s+/);
        const userWords = userSentence.toLowerCase().split(/\s+/);
        correct = questionWords.some((qWord) =>
          userWords.some((uWord) => uWord.includes(qWord.replace(/[?.]/g, ''))),
        );
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
    setSelectedUsage('');
    setHasAnswered(false);
    const randomPronoun = pronouns[Math.floor(Math.random() * pronouns.length)];
    setSelectedPronoun(randomPronoun);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      if (hasAnswered) {
        e.preventDefault();
        handleNext();
      } else {
        // Check if we have valid answers based on mode
        const canCheck =
          (mode === 'conjugation' && userConjugation.trim()) ||
          (mode === 'usage' && selectedUsage) ||
          (mode === 'translate' && userTranslation.trim()) ||
          (mode === 'negative' && userSentence.trim()) ||
          (mode === 'question' && userSentence.trim());

        if (canCheck) {
          e.preventDefault();
          checkAnswer();
        }
      }
    }
  };

  const getInstructions = () => {
    switch (mode) {
      case 'conjugation':
        return 'Conjugate the modal verb';
      case 'usage':
        return 'Choose the correct usage';
      case 'translate':
        return 'Translate to Dutch';
      case 'negative':
        return 'Make a negative sentence';
      case 'question':
        return 'Form a question';
    }
  };

  const getPrompt = () => {
    switch (mode) {
      case 'conjugation':
        return `${
          currentPronoun.charAt(0).toUpperCase() + currentPronoun.slice(1)
        } ___ (${word.infinitive})`;
      case 'usage':
        return `What is the main usage of "${word.infinitive}"?`;
      case 'translate':
        return word.exampleTranslation || `I ${word.english.split('/')[0]}`;
      case 'negative':
        return `Make negative: "${currentPronoun} ${
          word.present[currentPronoun].split('/')[0]
        } ..."`;
      case 'question':
        return `Form a question with "${word.infinitive}"`;
    }
  };

  const getLevelBadgeColor = () => {
    switch (word.level) {
      case 'A1':
        return 'bg-green-100 text-green-800';
      case 'A2':
        return 'bg-blue-100 text-blue-800';
      case 'B1':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card
      className="w-full max-w-lg mx-auto bg-card shadow-lg min-h-[500px] flex flex-col"
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
          <p className="text-lg text-muted-foreground mb-1">
            (
            {Array.isArray(word.english)
              ? word.english.join(', ')
              : word.english}
            )
          </p>
          <p className="text-sm text-muted-foreground">
            {word.meaning} • {word.usage}
          </p>
        </div>

        <div className="text-center bg-muted p-3 rounded-lg">
          <p className="text-md font-medium text-foreground">{getPrompt()}</p>
        </div>

        <div className="space-y-4 flex-1 flex flex-col justify-center">
          {mode === 'conjugation' && (
            <div className="space-y-3">
              <div className="flex justify-center space-x-2 mb-4 flex-wrap">
                {pronouns.map((pronoun) => (
                  <Button
                    key={pronoun}
                    variant={
                      selectedPronoun === pronoun ? 'default' : 'outline'
                    }
                    size="sm"
                    onClick={() => setSelectedPronoun(pronoun)}
                    disabled={hasAnswered}
                    className="min-w-[60px] mb-1"
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
                  placeholder="modal verb form..."
                  disabled={hasAnswered}
                  className="flex-1 max-w-[200px] text-center text-lg"
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

          {mode === 'usage' && (
            <div className="space-y-3">
              <div className="grid grid-cols-1 gap-2">
                {usageOptions.map((usage) => (
                  <Button
                    key={usage}
                    variant={selectedUsage === usage ? 'default' : 'outline'}
                    onClick={() => setSelectedUsage(usage)}
                    disabled={hasAnswered}
                    className="text-left justify-start"
                  >
                    {usage}
                  </Button>
                ))}
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

          {(mode === 'negative' || mode === 'question') && (
            <div className="space-y-3">
              <div className="flex justify-center space-x-2 mb-4 flex-wrap">
                {pronouns.map((pronoun) => (
                  <Button
                    key={pronoun}
                    variant={
                      selectedPronoun === pronoun ? 'default' : 'outline'
                    }
                    size="sm"
                    onClick={() => setSelectedPronoun(pronoun)}
                    disabled={hasAnswered}
                    className="min-w-[60px] mb-1"
                  >
                    {pronoun}
                  </Button>
                ))}
              </div>
              <Input
                value={userSentence}
                onChange={(e) => setUserSentence(e.target.value)}
                placeholder={
                  mode === 'negative'
                    ? `${currentPronoun} ... niet ...`
                    : `${
                        mode === 'question'
                          ? word.questionForm?.split(' ')[0] || 'Kun'
                          : ''
                      } je ...?`
                }
                disabled={hasAnswered}
                className="text-center"
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
          )}

          {!hasAnswered ? (
            <Button
              onClick={checkAnswer}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
              disabled={
                (mode === 'conjugation' && !userConjugation.trim()) ||
                (mode === 'usage' && !selectedUsage) ||
                (mode === 'translate' && !userTranslation.trim()) ||
                (mode === 'negative' && !userSentence.trim()) ||
                (mode === 'question' && !userSentence.trim())
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
                    {isCorrect ? 'Correct! Well done!' : 'Not quite right.'}
                  </p>
                  {!isCorrect && (
                    <div className="mt-2 text-sm">
                      {mode === 'conjugation' && (
                        <p className="font-semibold">
                          Correct form:{' '}
                          <span className="text-dutch-blue">
                            {currentPronoun} {word.present[currentPronoun]}
                          </span>
                        </p>
                      )}
                      {mode === 'usage' && (
                        <p className="font-semibold">
                          Usage:{' '}
                          <span className="text-dutch-blue">
                            {word.meaning}
                          </span>
                        </p>
                      )}
                      {mode === 'translate' && (
                        <p className="font-semibold">
                          Example:{' '}
                          <span className="text-dutch-blue">
                            {word.exampleSentence}
                          </span>
                        </p>
                      )}
                      {mode === 'negative' && (
                        <p className="font-semibold">
                          Negative form:{' '}
                          <span className="text-dutch-blue">
                            {word.negativeForm}
                          </span>
                        </p>
                      )}
                      {mode === 'question' && (
                        <p className="font-semibold">
                          Question form:{' '}
                          <span className="text-dutch-blue">
                            {word.questionForm}
                          </span>
                        </p>
                      )}
                    </div>
                  )}
                  {word.exampleSentence && (
                    <div className="mt-2 text-xs">
                      <p className="font-medium">Example:</p>
                      <p className="text-dutch-blue">{word.exampleSentence}</p>
                      <p className="text-muted-foreground italic">
                        {word.exampleTranslation}
                      </p>
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
