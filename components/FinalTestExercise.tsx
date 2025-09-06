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
import { FinalTestVocabulary } from '@/data/final-test-vocabulary';
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

interface FinalTestExerciseProps {
  item: FinalTestVocabulary;
  onComplete: (correct: boolean) => void;
  exerciseMode: 'translate' | 'reverse' | 'mixed' | 'conjugation' | 'article';
  showHints?: boolean;
}

export function FinalTestExercise({
  item,
  onComplete,
  exerciseMode,
  showHints = true,
}: FinalTestExerciseProps) {
  const [userAnswer, setUserAnswer] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);

  const checkAnswer = () => {
    const userAnswerLower = userAnswer.toLowerCase().trim();
    let correct = false;
    let correctAnswers: string[] = [];

    switch (exerciseMode) {
      case 'translate':
        // Dutch to English
        if (Array.isArray(item.english)) {
          correctAnswers = item.english.map((e) => e.toLowerCase().trim());
          correct = correctAnswers.some(
            (answer) =>
              userAnswerLower === answer ||
              userAnswerLower === answer.replace(/^(the|a|an)\s+/, '') ||
              answer.replace(/^(the|a|an)\s+/, '') === userAnswerLower,
          );
        } else {
          const englishAnswer = item.english.toLowerCase().trim();
          correctAnswers = [englishAnswer];
          correct =
            userAnswerLower === englishAnswer ||
            userAnswerLower === englishAnswer.replace(/^(the|a|an)\s+/, '') ||
            englishAnswer.replace(/^(the|a|an)\s+/, '') === userAnswerLower;
        }
        break;

      case 'reverse':
        // English to Dutch
        if (Array.isArray(item.dutch)) {
          correctAnswers = item.dutch.map((d) => d.toLowerCase().trim());
          correct = correctAnswers.some((answer) => {
            // Check with and without articles
            const withoutArticle = answer.replace(/^(de|het)\s+/, '');
            return (
              userAnswerLower === answer ||
              userAnswerLower === withoutArticle ||
              (item.article &&
                userAnswerLower === `${item.article} ${withoutArticle}`)
            );
          });
        } else {
          const dutchAnswer = item.dutch.toLowerCase().trim();
          correctAnswers = [dutchAnswer];
          const withoutArticle = dutchAnswer.replace(/^(de|het)\s+/, '');
          correct =
            userAnswerLower === dutchAnswer ||
            userAnswerLower === withoutArticle ||
            !!(
              item.article &&
              userAnswerLower === `${item.article} ${withoutArticle}`
            );
        }
        break;

      case 'article':
        // Article exercise for nouns
        if (item.type === 'noun' && item.article) {
          correctAnswers = [item.article];
          correct = userAnswerLower === item.article;
        }
        break;

      case 'conjugation':
        // For verbs with conjugation data
        if (item.conjugation?.present) {
          const conjugations = Object.values(item.conjugation.present).map(
            (c) => c.toLowerCase(),
          );
          correctAnswers = conjugations;
          correct = conjugations.some((conj) => userAnswerLower === conj);
        }
        break;

      case 'mixed':
        // Random between translate and reverse
        const randomMode = Math.random() < 0.5 ? 'translate' : 'reverse';
        return checkAnswer(); // Recursive call with the same mode for consistency
    }

    setIsCorrect(correct);
    setShowFeedback(true);
  };

  const handleNext = () => {
    onComplete(isCorrect);
    resetExercise();
  };

  const resetExercise = () => {
    setShowFeedback(false);
    setUserAnswer('');
    setShowHint(false);
    setShowAnswer(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      if (showFeedback) {
        handleNext();
      } else if (userAnswer.trim()) {
        checkAnswer();
      }
    }
  };

  const playAudio = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'nl-NL';
      speechSynthesis.speak(utterance);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'bg-green-100 text-green-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'hard':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getExercisePrompt = () => {
    const dutchText = Array.isArray(item.dutch)
      ? item.dutch.join(' / ')
      : item.dutch;
    const englishText = Array.isArray(item.english)
      ? item.english.join(' / ')
      : item.english;

    switch (exerciseMode) {
      case 'translate':
        return {
          question: dutchText,
          instruction: 'Translate to English',
        };
      case 'reverse':
        return {
          question: englishText,
          instruction: 'Translate to Dutch',
        };
      case 'article':
        const wordWithoutArticle = dutchText.replace(/^(de|het)\s+/, '');
        return {
          question: wordWithoutArticle,
          instruction: 'What is the correct article? (de/het)',
        };
      case 'conjugation':
        return {
          question: `${dutchText} (ik form)`,
          instruction: 'Conjugate for "ik"',
        };
      default:
        return {
          question: dutchText,
          instruction: 'Translate',
        };
    }
  };

  const { question, instruction } = getExercisePrompt();

  const getCorrectAnswer = () => {
    switch (exerciseMode) {
      case 'translate':
        return Array.isArray(item.english)
          ? item.english.join(' / ')
          : item.english;
      case 'reverse':
        const dutchAnswer = Array.isArray(item.dutch)
          ? item.dutch.join(' / ')
          : item.dutch;
        return item.article
          ? `${item.article} ${dutchAnswer.replace(/^(de|het)\s+/, '')}`
          : dutchAnswer;
      case 'article':
        return item.article || '';
      case 'conjugation':
        return item.conjugation?.present?.ik || '';
      default:
        return Array.isArray(item.english)
          ? item.english.join(' / ')
          : item.english;
    }
  };

  return (
    <Card
      className="w-full max-w-2xl mx-auto bg-card shadow-lg"
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      <CardHeader>
        <CardTitle className="flex items-center justify-between font-nunito">
          <span className="flex items-center space-x-2">
            <BookOpen className="h-5 w-5 text-primary" />
            <span>{instruction}</span>
          </span>
          <div className="flex items-center space-x-2">
            <Badge className={getDifficultyColor(item.difficulty || 'medium')}>
              {item.difficulty || 'medium'}
            </Badge>
            <Badge variant="outline" className="text-xs">
              {item.category}
            </Badge>
            {item.subcategory && (
              <Badge variant="outline" className="text-xs">
                {item.subcategory}
              </Badge>
            )}
          </div>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <p className="text-2xl font-bold text-primary">{question}</p>
            {exerciseMode !== 'article' && (
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  playAudio(
                    Array.isArray(item.dutch) ? item.dutch[0] : item.dutch,
                  )
                }
                className="border-border text-foreground hover:bg-muted bg-transparent"
              >
                <Volume2 className="h-4 w-4" />
              </Button>
            )}
          </div>

          {item.type && (
            <Badge variant="secondary" className="text-xs mb-2">
              {item.type}
            </Badge>
          )}

          {exerciseMode === 'translate' && Array.isArray(item.english) && (
            <p className="text-sm text-muted-foreground">
              Multiple correct answers possible
            </p>
          )}
        </div>

        <div className="space-y-4">
          <Input
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            placeholder="Type your answer..."
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                if (!showFeedback && userAnswer.trim()) {
                  e.stopPropagation();
                  checkAnswer();
                }
              }
            }}
            disabled={showFeedback}
            className="border-input focus:ring-ring focus:border-primary text-center text-lg"
          />

          <div className="flex space-x-2">
            <Button
              onClick={checkAnswer}
              className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
              disabled={!userAnswer.trim() || showFeedback}
            >
              Check Answer
            </Button>

            {showHints && item.hint && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setShowHint(!showHint)}
                      className="border-border text-foreground hover:bg-muted"
                    >
                      <Lightbulb className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs p-3 text-sm">
                    {item.hint}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}

            <Button
              variant="outline"
              size="icon"
              onClick={() => setShowAnswer(!showAnswer)}
              className="border-border text-foreground hover:bg-muted"
            >
              {showAnswer ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </Button>
          </div>

          {showAnswer && !showFeedback && (
            <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm font-medium text-blue-800">Answer:</p>
              <p className="text-blue-700">{getCorrectAnswer()}</p>
            </div>
          )}

          {showHint && item.hint && (
            <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
              <p className="text-sm font-medium text-yellow-800 flex items-center">
                <Lightbulb className="h-4 w-4 mr-1" />
                Hint:
              </p>
              <p className="text-yellow-700">{item.hint}</p>
            </div>
          )}
        </div>

        {showFeedback && (
          <>
            <div
              className={`flex items-center justify-center space-x-2 p-4 rounded-lg ${
                isCorrect
                  ? 'bg-green-100 text-green-800 border border-green-200'
                  : 'bg-red-100 text-red-800 border border-red-200'
              }`}
            >
              {isCorrect ? (
                <CheckCircle className="h-5 w-5" />
              ) : (
                <XCircle className="h-5 w-5" />
              )}
              <div className="text-center">
                <span className="font-medium block">
                  {isCorrect ? 'Correct!' : 'Incorrect!'}
                </span>
                {!isCorrect && (
                  <span className="text-sm">
                    Correct answer: {getCorrectAnswer()}
                  </span>
                )}
              </div>
            </div>

            {item.exampleSentence && (
              <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-sm font-medium text-blue-800">Example:</p>
                <p className="text-blue-700">{item.exampleSentence}</p>
                {item.exampleTranslation && (
                  <p className="text-blue-600 text-sm italic">
                    {item.exampleTranslation}
                  </p>
                )}
              </div>
            )}

            <Button
              onClick={handleNext}
              className="w-full bg-blue-600 text-white hover:bg-blue-700"
            >
              Next Exercise
            </Button>
          </>
        )}

        {item.conjugation &&
          exerciseMode !== 'conjugation' &&
          !showFeedback && (
            <div className="p-3 bg-gray-50 rounded-lg border">
              <p className="text-sm font-medium text-gray-700 mb-2">
                Conjugation Info:
              </p>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {Object.entries(item.conjugation.present || {}).map(
                  ([pronoun, form]) => (
                    <div key={pronoun} className="flex justify-between">
                      <span className="text-gray-600">{pronoun}:</span>
                      <span className="text-gray-800">{form}</span>
                    </div>
                  ),
                )}
              </div>
            </div>
          )}

        {item.opposite && (
          <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
            <p className="text-sm font-medium text-purple-800">Opposite:</p>
            <p className="text-purple-700">{item.opposite}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
