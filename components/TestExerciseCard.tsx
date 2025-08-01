'use client';

import { Badge } from '@/components/Badge';
import { Button } from '@/components/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/Card';
import { Input } from '@/components/Input';
import {
  type CreateQuestionsExercise,
  type DictationExercise,
  type FillInExercise,
  type PronounExercise,
  type QuestionAnswerExercise,
  type SentenceWritingExercise,
  testExercises,
} from '@/data/test-exercises';
import { Check, Volume2, X } from 'lucide-react';
import { useRef, useState } from 'react';

type TestExerciseType =
  | 'dictation'
  | 'fillIn'
  | 'pronouns'
  | 'questionAnswer'
  | 'createQuestions'
  | 'sentenceWriting';

interface TestExercise {
  id: string;
  type: TestExerciseType;
  exerciseIndex: number;
  questionIndex: number;
  question: string;
  correctAnswer?: string;
  sampleAnswer?: string;
  targetWords?: string[];
  wordBank?: string[];
  instructions: string;
}

interface TestExerciseCardProps {
  exercise: TestExercise;
  onComplete: (correct: boolean) => void;
  mode?: 'practice' | 'test';
}

export function TestExerciseCard({
  exercise,
  onComplete,
  mode = 'practice',
}: TestExerciseCardProps) {
  const [userAnswer, setUserAnswer] = useState('');
  const [showAnswer, setShowAnswer] = useState(false);
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(
    null,
  );
  const audioRef = useRef<HTMLAudioElement>(null);

  const handleSubmit = () => {
    if (!userAnswer.trim()) return;

    let isCorrect = false;

    if (exercise.correctAnswer) {
      isCorrect =
        userAnswer.toLowerCase().trim() ===
        exercise.correctAnswer.toLowerCase().trim();
    } else {
      isCorrect = userAnswer.trim().length > 0;
    }

    setFeedback(isCorrect ? 'correct' : 'incorrect');
    setShowAnswer(true);
  };

  const handleNext = () => {
    onComplete(feedback === 'correct');
    resetCard();
  };

  // Handle Enter key for next exercise
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && showAnswer) {
      handleNext();
    }
  };

  const resetCard = () => {
    setUserAnswer('');
    setShowAnswer(false);
    setFeedback(null);
  };

  const playAudio = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'nl-NL';
      utterance.rate = 0.8;
      speechSynthesis.speak(utterance);
    }
  };

  const getTypeLabel = () => {
    switch (exercise.type) {
      case 'dictation':
        return 'Dictation';
      case 'fillIn':
        return 'Fill in Verbs';
      case 'pronouns':
        return 'Pronouns';
      case 'questionAnswer':
        return 'Q&A Practice';
      case 'createQuestions':
        return 'Create Questions';
      case 'sentenceWriting':
        return 'Sentence Writing';
      default:
        return 'Exercise';
    }
  };

  return (
    <Card
      className="w-full max-w-2xl mx-auto"
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{getTypeLabel()}</CardTitle>
          <Badge variant="outline">{exercise.type}</Badge>
        </div>
        <p className="text-sm text-muted-foreground">{exercise.instructions}</p>

        {exercise.targetWords && exercise.targetWords.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            <span className="text-sm font-medium">Target words:</span>
            {exercise.targetWords.map((word) => (
              <Badge key={word} variant="secondary">
                {word}
              </Badge>
            ))}
          </div>
        )}

        {exercise.wordBank && exercise.wordBank.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            <span className="text-sm font-medium">Word bank:</span>
            {exercise.wordBank.map((word) => (
              <Badge key={word} variant="outline">
                {word}
              </Badge>
            ))}
          </div>
        )}
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="space-y-4">
          {exercise.type === 'dictation' ? (
            <div className="text-center">
              <p className="text-muted-foreground mb-4">
                Listen carefully and write down what you hear
              </p>
              <Button
                variant="outline"
                size="lg"
                onClick={() => playAudio(exercise.question)}
                className="mb-4"
              >
                <Volume2 className="h-5 w-5 mr-2" />
                Play Audio
              </Button>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <p className="text-lg font-medium">{exercise.question}</p>
            </div>
          )}

          <div className="space-y-3">
            <Input
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              placeholder={
                exercise.type === 'dictation'
                  ? 'Write what you hear...'
                  : 'Your answer...'
              }
              disabled={showAnswer}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !showAnswer) {
                  handleSubmit();
                }
              }}
              className={
                feedback === 'correct'
                  ? 'border-green-500 bg-green-50'
                  : feedback === 'incorrect'
                  ? 'border-red-500 bg-red-50'
                  : ''
              }
            />

            {showAnswer && (
              <div className="space-y-3">
                {feedback === 'correct' ? (
                  <div className="flex items-center text-green-600">
                    <Check className="h-4 w-4 mr-2" />
                    <span>Correct!</span>
                  </div>
                ) : (
                  <div className="space-y-1">
                    <div className="flex items-center text-red-600">
                      <X className="h-4 w-4 mr-2" />
                      <span>Not quite right</span>
                    </div>
                    {exercise.correctAnswer && (
                      <p className="text-sm text-muted-foreground">
                        <strong>Correct answer:</strong>{' '}
                        {exercise.correctAnswer}
                      </p>
                    )}
                    {exercise.sampleAnswer && (
                      <p className="text-sm text-muted-foreground">
                        <strong>Sample answer:</strong> {exercise.sampleAnswer}
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
              </div>
            )}
          </div>

          {!showAnswer && (
            <Button
              onClick={handleSubmit}
              disabled={!userAnswer.trim()}
              className="w-full"
            >
              Submit Answer
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export function createTestExercises(): TestExercise[] {
  const exercises: TestExercise[] = [];

  testExercises.dictation.forEach((dictationEx, exerciseIndex) => {
    dictationEx.sentences.forEach((sentence, questionIndex) => {
      exercises.push({
        id: `${dictationEx.id}-${questionIndex}`,
        type: 'dictation',
        exerciseIndex,
        questionIndex,
        question: sentence,
        targetWords: dictationEx.targetWords,
        instructions: dictationEx.instructions,
      });
    });
  });

  // Add fill-in exercises
  testExercises.fillIn.forEach((fillInEx, exerciseIndex) => {
    fillInEx.sentences.forEach((item, questionIndex) => {
      exercises.push({
        id: `${fillInEx.id}-${questionIndex}`,
        type: 'fillIn',
        exerciseIndex,
        questionIndex,
        question: item.sentence,
        correctAnswer: item.correctAnswer,
        wordBank: fillInEx.wordBank,
        instructions: fillInEx.instructions,
      });
    });
  });

  // Add pronoun exercises
  testExercises.pronouns.forEach((pronounEx, exerciseIndex) => {
    pronounEx.sentences.forEach((item, questionIndex) => {
      exercises.push({
        id: `${pronounEx.id}-${questionIndex}`,
        type: 'pronouns',
        exerciseIndex,
        questionIndex,
        question: item.sentence,
        correctAnswer: item.correctAnswer,
        instructions: pronounEx.instructions,
      });
    });
  });

  // Add question-answer exercises
  testExercises.questionAnswer.forEach((qaEx, exerciseIndex) => {
    qaEx.questions.forEach((item, questionIndex) => {
      exercises.push({
        id: `${qaEx.id}-${questionIndex}`,
        type: 'questionAnswer',
        exerciseIndex,
        questionIndex,
        question: item.question,
        sampleAnswer: item.sampleAnswer,
        instructions: qaEx.instructions,
      });
    });
  });

  // Add create questions exercises
  testExercises.createQuestions.forEach((createEx, exerciseIndex) => {
    createEx.answerPairs.forEach((item, questionIndex) => {
      exercises.push({
        id: `${createEx.id}-${questionIndex}`,
        type: 'createQuestions',
        exerciseIndex,
        questionIndex,
        question: `Create a question for this answer: "${item.answer}"`,
        sampleAnswer: item.sampleQuestion,
        instructions: createEx.instructions,
      });
    });
  });

  // Add sentence writing exercises
  testExercises.sentenceWriting.forEach((sentenceEx, exerciseIndex) => {
    sentenceEx.prompts.forEach((item, questionIndex) => {
      exercises.push({
        id: `${sentenceEx.id}-${questionIndex}`,
        type: 'sentenceWriting',
        exerciseIndex,
        questionIndex,
        question: `Write a sentence using: ${item.words}`,
        sampleAnswer: item.sampleAnswer,
        instructions: sentenceEx.instructions,
      });
    });
  });

  return exercises.sort(() => Math.random() - 0.5); // Shuffle the exercises
}
