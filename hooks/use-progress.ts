'use client';

import type { UserProgress } from '@/types/vocabulary';
import { useEffect, useState } from 'react';

export function useProgress() {
  const [progress, setProgress] = useState<UserProgress>({
    completedWords: new Set(),
    scores: {},
    currentChapter: 0,
    incorrectWords: {},
    mistakeMode: false,
    testExerciseProgress: {
      test1: {
        completedExercises: new Set(),
        incorrectExercises: {},
        scores: {},
      },
      test2: {
        completedExercises: new Set(),
        incorrectExercises: {},
        scores: {},
      },
    },
  });

  useEffect(() => {
    const savedProgress = localStorage.getItem('dutch-learning-progress');
    if (savedProgress) {
      const parsed = JSON.parse(savedProgress);
      setProgress({
        ...parsed,
        completedWords: new Set(parsed.completedWords),
        incorrectWords: parsed.incorrectWords || {},
        mistakeMode: parsed.mistakeMode || false,
        testExerciseProgress: parsed.testExerciseProgress
          ? {
              test1: {
                ...parsed.testExerciseProgress.test1,
                completedExercises: new Set(
                  parsed.testExerciseProgress.test1.completedExercises || [],
                ),
                incorrectExercises:
                  parsed.testExerciseProgress.test1.incorrectExercises || {},
                scores: parsed.testExerciseProgress.test1.scores || {},
              },
              test2: {
                ...parsed.testExerciseProgress.test2,
                completedExercises: new Set(
                  parsed.testExerciseProgress.test2.completedExercises || [],
                ),
                incorrectExercises:
                  parsed.testExerciseProgress.test2.incorrectExercises || {},
                scores: parsed.testExerciseProgress.test2.scores || {},
              },
            }
          : {
              test1: {
                completedExercises: new Set(),
                incorrectExercises: {},
                scores: {},
              },
              test2: {
                completedExercises: new Set(),
                incorrectExercises: {},
                scores: {},
              },
            },
      });
    }
  }, []);

  const saveProgress = (newProgress: UserProgress) => {
    const toSave = {
      ...newProgress,
      completedWords: Array.from(newProgress.completedWords),
      testExerciseProgress: newProgress.testExerciseProgress
        ? {
            test1: {
              ...newProgress.testExerciseProgress.test1,
              completedExercises: Array.from(
                newProgress.testExerciseProgress.test1.completedExercises,
              ),
            },
            test2: {
              ...newProgress.testExerciseProgress.test2,
              completedExercises: Array.from(
                newProgress.testExerciseProgress.test2.completedExercises,
              ),
            },
          }
        : undefined,
    };
    localStorage.setItem('dutch-learning-progress', JSON.stringify(toSave));
    setProgress(newProgress);
  };

  const markWordCompleted = (wordId: string, score: number) => {
    const newProgress = {
      ...progress,
      completedWords: new Set([...progress.completedWords, wordId]),
      scores: { ...progress.scores, [wordId]: score },
      incorrectWords: { ...progress.incorrectWords },
    };

    // Handle incorrect answers
    if (score === 0) {
      const now = Date.now();
      const currentIncorrect = progress.incorrectWords[wordId] || {
        count: 0,
        lastAttempt: 0,
      };

      newProgress.incorrectWords[wordId] = {
        count: currentIncorrect.count + 1,
        lastAttempt: now,
      };
    }

    if (score === 1 && progress.incorrectWords[wordId]) {
      const { [wordId]: removed, ...remainingIncorrect } =
        newProgress.incorrectWords;
      newProgress.incorrectWords = remainingIncorrect;
    }

    saveProgress(newProgress);
  };

  const markWordIncorrect = (wordId: string) => {
    const now = Date.now();
    const currentIncorrect = progress.incorrectWords[wordId] || {
      count: 0,
      lastAttempt: 0,
    };

    const newProgress = {
      ...progress,
      incorrectWords: {
        ...progress.incorrectWords,
        [wordId]: {
          count: currentIncorrect.count + 1,
          lastAttempt: now,
        },
      },
    };

    saveProgress(newProgress);
  };

  const setCurrentChapter = (chapter: number) => {
    const newProgress = { ...progress, currentChapter: chapter };
    saveProgress(newProgress);
  };

  const toggleMistakeMode = () => {
    const newProgress = { ...progress, mistakeMode: !progress.mistakeMode };
    saveProgress(newProgress);
  };

  const resetProgress = () => {
    localStorage.removeItem('dutch-learning-progress');
    setProgress({
      completedWords: new Set(),
      scores: {},
      currentChapter: 0,
      incorrectWords: {},
      mistakeMode: false,
      testExerciseProgress: {
        test1: {
          completedExercises: new Set(),
          incorrectExercises: {},
          scores: {},
        },
        test2: {
          completedExercises: new Set(),
          incorrectExercises: {},
          scores: {},
        },
      },
    });
  };

  const markTestExerciseCompleted = (
    testType: 'test1' | 'test2',
    exerciseId: string,
    score: number,
  ) => {
    const newProgress = { ...progress };

    // Initialize test exercise progress if it doesn't exist
    if (!newProgress.testExerciseProgress) {
      newProgress.testExerciseProgress = {
        test1: {
          completedExercises: new Set(),
          incorrectExercises: {},
          scores: {},
        },
        test2: {
          completedExercises: new Set(),
          incorrectExercises: {},
          scores: {},
        },
      };
    }

    const testProgress = newProgress.testExerciseProgress[testType];

    // Mark as completed and record score
    testProgress.completedExercises.add(exerciseId);
    testProgress.scores[exerciseId] = score;

    // Handle incorrect answers
    if (score === 0) {
      const now = Date.now();
      const currentIncorrect = testProgress.incorrectExercises[exerciseId] || {
        count: 0,
        lastAttempt: 0,
      };

      testProgress.incorrectExercises[exerciseId] = {
        count: currentIncorrect.count + 1,
        lastAttempt: now,
      };
    } else if (score === 1 && testProgress.incorrectExercises[exerciseId]) {
      // Remove from incorrect list if answered correctly
      const { [exerciseId]: removed, ...remaining } =
        testProgress.incorrectExercises;
      testProgress.incorrectExercises = remaining;
    }

    saveProgress(newProgress);
  };

  const getTestExerciseProgress = (testType: 'test1' | 'test2') => {
    if (!progress.testExerciseProgress) {
      return {
        completedExercises: new Set<string>(),
        incorrectExercises: {},
        scores: {},
      };
    }
    return progress.testExerciseProgress[testType];
  };

  return {
    progress,
    markWordCompleted,
    markWordIncorrect,
    setCurrentChapter,
    toggleMistakeMode,
    resetProgress,
    markTestExerciseCompleted,
    getTestExerciseProgress,
  };
}
