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
  testExercises2,
} from '@/data/test-exercises';
import { Check, Volume2, X } from 'lucide-react';
import { useRef, useState } from 'react';

type TestExerciseType =
  | 'dictation'
  | 'fillIn'
  | 'pronouns'
  | 'questionAnswer'
  | 'createQuestions'
  | 'sentenceWriting'
  | 'vocabulary'
  | 'perfectTense'
  | 'imperfectum'
  | 'readingComprehension'
  | 'listeningComprehension'
  | 'grammar'
  | 'dialogue';

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
  options?: string[];
  level?: string;
  title?: string;
  text?: string;
  audioScript?: string;
  scenario?: string;
  dialogue?: Array<{
    speaker: string;
    text: string;
    isUserInput?: boolean;
    answerOptions?: string[];
    correctAnswer?: string;
  }>;
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

  const handleSubmit = (answer?: string) => {
    const answerToCheck = answer || userAnswer;
    if (!answerToCheck.trim()) return;

    let isCorrect = false;

    if (exercise.correctAnswer) {
      // Normalize both answers for comparison
      const normalizedUserAnswer = answerToCheck
        .toLowerCase()
        .trim()
        .replace(/[.,!?;]/g, '') // Remove punctuation
        .replace(/\s+/g, ' '); // Normalize whitespace

      const normalizedCorrectAnswer = exercise.correctAnswer
        .toLowerCase()
        .trim()
        .replace(/[.,!?;]/g, '')
        .replace(/\s+/g, ' ');

      // For multiple choice, exact match is required
      if (exercise.options && exercise.options.length > 0) {
        isCorrect = answerToCheck === exercise.correctAnswer;
      } else {
        // For open-ended questions, allow some flexibility
        isCorrect =
          normalizedUserAnswer === normalizedCorrectAnswer ||
          // Also check if the user answer contains the correct answer
          (normalizedUserAnswer.includes(normalizedCorrectAnswer) &&
            normalizedCorrectAnswer.length > 3); // Avoid matching very short words
      }
    } else {
      // For exercises without a specific correct answer (like creative writing)
      // Consider it correct if the answer has sufficient length
      isCorrect = answerToCheck.trim().length >= 3;
    }

    if (answer) {
      setUserAnswer(answer);
    }
    setFeedback(isCorrect ? 'correct' : 'incorrect');
    setShowAnswer(true);
  };

  const handleNext = () => {
    onComplete(feedback === 'correct');
    resetCard();
  };

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
      case 'vocabulary':
        return 'Vocabulary';
      case 'perfectTense':
        return 'Perfect Tense';
      case 'imperfectum':
        return 'Imperfectum';
      case 'readingComprehension':
        return 'Reading Comprehension';
      case 'listeningComprehension':
        return 'Listening Comprehension';
      case 'grammar':
        return 'Grammar';
      case 'dialogue':
        return 'Dialogue';
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
        {/* Reading comprehension text */}
        {exercise.type === 'readingComprehension' && exercise.text && (
          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="font-semibold mb-2">{exercise.title}</h4>
            <p className="text-sm leading-relaxed whitespace-pre-line">
              {exercise.text}
            </p>
          </div>
        )}

        {/* Listening comprehension audio */}
        {exercise.type === 'listeningComprehension' && exercise.audioScript && (
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <h4 className="font-semibold mb-2">{exercise.title}</h4>
            <p className="text-muted-foreground mb-4">
              Listen carefully to the audio
            </p>
            <Button
              variant="outline"
              size="lg"
              onClick={() => playAudio(exercise.audioScript!)}
              className="mb-4"
            >
              <Volume2 className="h-5 w-5 mr-2" />
              Play Audio
            </Button>
          </div>
        )}

        {/* Dialogue scenario */}
        {exercise.type === 'dialogue' && exercise.scenario && (
          <div className="p-4 bg-yellow-50 rounded-lg">
            <h4 className="font-semibold mb-2">Scenario</h4>
            <p className="text-sm">{exercise.scenario}</p>
          </div>
        )}

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

          {/* Multiple choice options */}
          {exercise.options && exercise.options.length > 0 && !showAnswer ? (
            <div className="space-y-2">
              {exercise.options.map((option, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="w-full text-left justify-start h-auto p-3 whitespace-normal"
                  onClick={() => {
                    setUserAnswer(option);
                    handleSubmit(option);
                  }}
                >
                  {option}
                </Button>
              ))}
            </div>
          ) : !showAnswer ? (
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
              <Button
                onClick={() => handleSubmit()}
                disabled={!userAnswer.trim()}
                className="w-full"
              >
                Submit Answer
              </Button>
            </div>
          ) : null}

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
                      <strong>Correct answer:</strong> {exercise.correctAnswer}
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

  return exercises.sort(() => Math.random() - 0.5);
}

export function createTestExercises2(): TestExercise[] {
  const exercises: TestExercise[] = [];

  // Vocabulary exercises
  testExercises2.vocabulary.forEach((vocabEx, exerciseIndex) => {
    exercises.push({
      id: `vocab2-${vocabEx.id}`,
      type: 'vocabulary',
      exerciseIndex,
      questionIndex: 0,
      question: vocabEx.question,
      correctAnswer: vocabEx.answer,
      options: vocabEx.options,
      level: vocabEx.level,
      instructions: 'Select the correct translation or answer.',
    });
  });

  // Perfect tense exercises
  testExercises2.perfectTense.forEach((perfectEx, exerciseIndex) => {
    exercises.push({
      id: `perfect2-${perfectEx.id}`,
      type: 'perfectTense',
      exerciseIndex,
      questionIndex: 0,
      question: perfectEx.question,
      correctAnswer: perfectEx.answer,
      level: perfectEx.level,
      instructions:
        'Complete the sentence with the correct perfect tense form.',
    });
  });

  // Imperfectum exercises
  testExercises2.imperfectum.forEach((imperfectEx, exerciseIndex) => {
    exercises.push({
      id: `imperfect2-${imperfectEx.id}`,
      type: 'imperfectum',
      exerciseIndex,
      questionIndex: 0,
      question: imperfectEx.question,
      correctAnswer: imperfectEx.answer,
      level: imperfectEx.level,
      instructions: 'Complete the sentence with the correct imperfectum form.',
    });
  });

  // Reading comprehension exercises
  testExercises2.readingComprehension.forEach((readingEx, exerciseIndex) => {
    readingEx.questions.forEach((questionItem, questionIndex) => {
      exercises.push({
        id: `reading2-${readingEx.id}-${questionIndex}`,
        type: 'readingComprehension',
        exerciseIndex,
        questionIndex,
        question: questionItem.question,
        correctAnswer: questionItem.answer,
        options: questionItem.options,
        level: readingEx.level,
        title: readingEx.title,
        text: readingEx.text,
        instructions: 'Read the text and answer the questions.',
      });
    });
  });

  // Listening comprehension exercises
  testExercises2.listeningComprehension.forEach(
    (listeningEx, exerciseIndex) => {
      listeningEx.questions.forEach((questionItem, questionIndex) => {
        exercises.push({
          id: `listening2-${listeningEx.id}-${questionIndex}`,
          type: 'listeningComprehension',
          exerciseIndex,
          questionIndex,
          question: questionItem.question,
          correctAnswer: questionItem.answer,
          options: questionItem.options,
          level: listeningEx.level,
          title: listeningEx.title,
          audioScript: listeningEx.audioScript,
          instructions: 'Listen to the audio and answer the questions.',
        });
      });
    },
  );

  // Grammar exercises
  testExercises2.grammar.forEach((grammarEx, exerciseIndex) => {
    exercises.push({
      id: `grammar2-${grammarEx.id}`,
      type: 'grammar',
      exerciseIndex,
      questionIndex: 0,
      question: grammarEx.question,
      correctAnswer: grammarEx.answer,
      options: grammarEx.options,
      level: grammarEx.level,
      instructions: 'Complete the sentence with the correct grammar form.',
    });
  });

  // Dialogue exercises
  testExercises2.dialogue.forEach((dialogueEx, exerciseIndex) => {
    exercises.push({
      id: `dialogue2-${dialogueEx.id}`,
      type: 'dialogue',
      exerciseIndex,
      questionIndex: 0,
      question: `Complete the dialogue: ${dialogueEx.title}`,
      level: dialogueEx.level,
      title: dialogueEx.title,
      scenario: dialogueEx.scenario,
      dialogue: dialogueEx.dialogue,
      instructions:
        'Complete the dialogue by selecting the appropriate responses.',
    });
  });

  return exercises.sort(() => Math.random() - 0.5);
}
