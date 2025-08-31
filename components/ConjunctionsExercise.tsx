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
import type { Conjunction } from '@/data/conjunctions';
import { CheckCircle, ChevronRight, Lightbulb, XCircle } from 'lucide-react';
import { useState } from 'react';

interface ConjunctionsExerciseProps {
  conjunction: Conjunction;
  mode: 'complete' | 'translate' | 'identify' | 'wordOrder' | 'usage';
  onComplete: (correct: boolean) => void;
}

export function ConjunctionsExercise({
  conjunction,
  mode,
  onComplete,
}: ConjunctionsExerciseProps) {
  const [userAnswer, setUserAnswer] = useState('');
  const [selectedType, setSelectedType] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedWordOrder, setSelectedWordOrder] = useState<string>('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [hasAnswered, setHasAnswered] = useState(false);

  // Options for multiple choice questions
  const typeOptions = ['coordinating', 'subordinating', 'correlative'];
  const categoryOptions = ['basic', 'contrast', 'cause', 'time', 'condition'];
  const wordOrderOptions = ['normal', 'inverted', 'verb-to-end'];

  const checkAnswer = () => {
    let correct = false;

    switch (mode) {
      case 'complete':
        // Check if the user can complete a sentence with the conjunction
        const normalizedAnswer = userAnswer.toLowerCase().trim();
        const expectedAnswer = conjunction.dutch.toLowerCase();
        correct = normalizedAnswer === expectedAnswer;
        break;
      case 'translate':
        // Check translation from English to Dutch
        const translationAnswer = userAnswer.toLowerCase().trim();
        const expectedTranslation = conjunction.dutch.toLowerCase();
        correct = translationAnswer === expectedTranslation;
        break;
      case 'identify':
        // Check if user can identify the type and category
        correct =
          selectedType === conjunction.type &&
          selectedCategory === conjunction.category;
        break;
      case 'wordOrder':
        // Check if user knows the word order rule
        correct = selectedWordOrder === conjunction.wordOrder;
        break;
      case 'usage':
        // Check if user understands the usage
        const usageAnswer = userAnswer.toLowerCase().trim();
        const expectedUsage = conjunction.usage.toLowerCase();
        correct =
          usageAnswer.includes(expectedUsage.split(' ')[0]) ||
          expectedUsage.includes(usageAnswer);
        break;
    }

    setIsCorrect(correct);
    setShowFeedback(true);
    setHasAnswered(true);
  };

  const handleNext = () => {
    onComplete(isCorrect);
    setShowFeedback(false);
    setUserAnswer('');
    setSelectedType('');
    setSelectedCategory('');
    setSelectedWordOrder('');
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
          (mode === 'complete' && userAnswer.trim()) ||
          (mode === 'translate' && userAnswer.trim()) ||
          (mode === 'identify' && selectedType && selectedCategory) ||
          (mode === 'wordOrder' && selectedWordOrder) ||
          (mode === 'usage' && userAnswer.trim());

        if (canCheck) {
          e.preventDefault();
          checkAnswer();
        }
      }
    }
  };

  const getInstructions = () => {
    switch (mode) {
      case 'complete':
        return 'Complete the sentence with the correct conjunction';
      case 'translate':
        return 'Translate the English conjunction to Dutch';
      case 'identify':
        return 'Identify the type and category';
      case 'wordOrder':
        return 'What word order does this conjunction require?';
      case 'usage':
        return 'Explain when to use this conjunction';
    }
  };

  const getPrompt = () => {
    switch (mode) {
      case 'complete':
        // Create a sentence with a blank where the conjunction should go
        if (conjunction.exampleSentence) {
          return conjunction.exampleSentence.replace(conjunction.dutch, '___');
        }
        return `Complete: "Ik hou van thee ___ koffie" (${conjunction.english})`;
      case 'translate':
        return `Translate "${conjunction.english}" to Dutch:`;
      case 'identify':
        return `What type and category is "${conjunction.dutch}"?`;
      case 'wordOrder':
        return `What word order rule applies to "${conjunction.dutch}"?`;
      case 'usage':
        return `When do you use "${conjunction.dutch}"?`;
    }
  };

  const getLevelBadgeColor = () => {
    switch (conjunction.level) {
      case 'A1':
        return 'bg-green-100 text-green-800';
      case 'A2':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeBadgeColor = () => {
    switch (conjunction.type) {
      case 'coordinating':
        return 'bg-orange-100 text-orange-800';
      case 'subordinating':
        return 'bg-purple-100 text-purple-800';
      case 'correlative':
        return 'bg-pink-100 text-pink-800';
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
              {conjunction.level}
            </span>
            <span
              className={`px-2 py-1 rounded text-xs font-medium ${getTypeBadgeColor()}`}
            >
              {conjunction.type}
            </span>
            {conjunction.hint && (
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
                    {conjunction.hint}
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
            {mode !== 'translate' ? conjunction.dutch : '?'}
          </p>
          <p className="text-lg text-muted-foreground mb-1">
            ({mode !== 'complete' ? conjunction.english : '?'})
          </p>
          <p className="text-sm text-muted-foreground">
            Category: {conjunction.category}
          </p>
        </div>

        <div className="text-center bg-muted p-3 rounded-lg">
          <p className="text-md font-medium text-foreground">{getPrompt()}</p>
        </div>

        <div className="space-y-4 flex-1 flex flex-col justify-center">
          {(mode === 'complete' ||
            mode === 'translate' ||
            mode === 'usage') && (
            <Input
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              placeholder={
                mode === 'complete'
                  ? 'Type the conjunction...'
                  : mode === 'translate'
                  ? 'Type the Dutch conjunction...'
                  : 'Explain the usage...'
              }
              disabled={hasAnswered}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  if (!hasAnswered) {
                    e.stopPropagation();
                    checkAnswer();
                  }
                }
              }}
              className="text-center text-lg"
            />
          )}

          {mode === 'identify' && (
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium mb-2">Type:</p>
                <div className="grid grid-cols-1 gap-2">
                  {typeOptions.map((type) => (
                    <Button
                      key={type}
                      variant={selectedType === type ? 'default' : 'outline'}
                      onClick={() => setSelectedType(type)}
                      disabled={hasAnswered}
                      className="text-left justify-start"
                    >
                      {type}
                    </Button>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-sm font-medium mb-2">Category:</p>
                <div className="grid grid-cols-1 gap-2">
                  {categoryOptions.map((category) => (
                    <Button
                      key={category}
                      variant={
                        selectedCategory === category ? 'default' : 'outline'
                      }
                      onClick={() => setSelectedCategory(category)}
                      disabled={hasAnswered}
                      className="text-left justify-start"
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {mode === 'wordOrder' && (
            <div className="space-y-3">
              <div className="grid grid-cols-1 gap-2">
                {wordOrderOptions.map((order) => (
                  <Button
                    key={order}
                    variant={
                      selectedWordOrder === order ? 'default' : 'outline'
                    }
                    onClick={() => setSelectedWordOrder(order)}
                    disabled={hasAnswered}
                    className="text-left justify-start"
                  >
                    {order === 'normal' &&
                      'Normal word order (subject-verb-object)'}
                    {order === 'inverted' &&
                      'Inverted word order (verb before subject)'}
                    {order === 'verb-to-end' &&
                      'Verb goes to the end of clause'}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {!hasAnswered ? (
            <Button
              onClick={checkAnswer}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
              disabled={
                (mode === 'complete' && !userAnswer.trim()) ||
                (mode === 'translate' && !userAnswer.trim()) ||
                (mode === 'identify' && (!selectedType || !selectedCategory)) ||
                (mode === 'wordOrder' && !selectedWordOrder) ||
                (mode === 'usage' && !userAnswer.trim())
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
                      {mode === 'complete' && (
                        <p className="font-semibold">
                          Correct answer:{' '}
                          <span className="text-dutch-blue">
                            {conjunction.dutch}
                          </span>
                        </p>
                      )}
                      {mode === 'translate' && (
                        <p className="font-semibold">
                          Translation:{' '}
                          <span className="text-dutch-blue">
                            {conjunction.dutch}
                          </span>
                        </p>
                      )}
                      {mode === 'identify' && (
                        <div>
                          <p className="font-semibold">
                            Type:{' '}
                            <span className="text-dutch-blue">
                              {conjunction.type}
                            </span>
                          </p>
                          <p className="font-semibold">
                            Category:{' '}
                            <span className="text-dutch-blue">
                              {conjunction.category}
                            </span>
                          </p>
                        </div>
                      )}
                      {mode === 'wordOrder' && (
                        <p className="font-semibold">
                          Word order:{' '}
                          <span className="text-dutch-blue">
                            {conjunction.wordOrder}
                          </span>
                        </p>
                      )}
                      {mode === 'usage' && (
                        <p className="font-semibold">
                          Usage:{' '}
                          <span className="text-dutch-blue">
                            {conjunction.usage}
                          </span>
                        </p>
                      )}
                    </div>
                  )}
                  {conjunction.exampleSentence && (
                    <div className="mt-2 text-xs">
                      <p className="font-medium">Example:</p>
                      <p className="text-dutch-blue">
                        {conjunction.exampleSentence}
                      </p>
                      <p className="text-muted-foreground italic">
                        {conjunction.exampleTranslation}
                      </p>
                    </div>
                  )}
                  {conjunction.rule && (
                    <div className="mt-2 text-xs">
                      <p className="font-medium">Rule:</p>
                      <p className="text-muted-foreground">
                        {conjunction.rule}
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
