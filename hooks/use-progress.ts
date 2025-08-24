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

  // State for current exercise session
  const [exerciseSession, setExerciseSession] = useState<{
    exerciseMode: string | null;
    currentIndex: number;
    sessionScore: { correct: number; total: number };
    perfectTenseMode: string;
    imperfectumMode: string;
    selectedCategory: string | null;
    testReviewMode: { test1: boolean; test2: boolean };
    hasStartedLearning: boolean;
  }>({
    exerciseMode: null,
    currentIndex: 0,
    sessionScore: { correct: 0, total: 0 },
    perfectTenseMode: 'complete',
    imperfectumMode: 'conjugation',
    selectedCategory: null,
    testReviewMode: { test1: false, test2: false },
    hasStartedLearning: false,
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

    // Load exercise session state
    const savedSession = localStorage.getItem('dutch-learning-session');
    if (savedSession) {
      const parsedSession = JSON.parse(savedSession);
      setExerciseSession({
        exerciseMode: parsedSession.exerciseMode || null,
        currentIndex: parsedSession.currentIndex || 0,
        sessionScore: parsedSession.sessionScore || { correct: 0, total: 0 },
        perfectTenseMode: parsedSession.perfectTenseMode || 'complete',
        imperfectumMode: parsedSession.imperfectumMode || 'conjugation',
        selectedCategory: parsedSession.selectedCategory || null,
        testReviewMode: parsedSession.testReviewMode || {
          test1: false,
          test2: false,
        },
        hasStartedLearning: parsedSession.hasStartedLearning || false,
      });
    }
  }, []);

  const saveProgress = (newProgress: UserProgress) => {
    console.log('saveProgress called with:', newProgress);
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
    console.log('Saving to localStorage:', toSave);
    localStorage.setItem('dutch-learning-progress', JSON.stringify(toSave));
    setProgress(newProgress);
    console.log('Progress state updated');
  };

  const saveExerciseSession = (newSession: typeof exerciseSession) => {
    localStorage.setItem('dutch-learning-session', JSON.stringify(newSession));
    setExerciseSession(newSession);
  };

  const clearExerciseSession = () => {
    localStorage.removeItem('dutch-learning-session');
    setExerciseSession({
      exerciseMode: null,
      currentIndex: 0,
      sessionScore: { correct: 0, total: 0 },
      perfectTenseMode: 'complete',
      imperfectumMode: 'conjugation',
      selectedCategory: null,
      testReviewMode: { test1: false, test2: false },
      hasStartedLearning: false,
    });
  };

  const markWordCompleted = (wordId: string, score: number) => {
    console.log('markWordCompleted called:', { wordId, score });
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

    console.log('Saving progress:', {
      completedWords: Array.from(newProgress.completedWords),
      scores: newProgress.scores,
    });
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
    localStorage.removeItem('dutch-learning-session');
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
    setExerciseSession({
      exerciseMode: null,
      currentIndex: 0,
      sessionScore: { correct: 0, total: 0 },
      perfectTenseMode: 'complete',
      imperfectumMode: 'conjugation',
      selectedCategory: null,
      testReviewMode: { test1: false, test2: false },
      hasStartedLearning: false,
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
    exerciseSession,
    markWordCompleted,
    markWordIncorrect,
    setCurrentChapter,
    toggleMistakeMode,
    resetProgress,
    markTestExerciseCompleted,
    getTestExerciseProgress,
    saveExerciseSession,
    clearExerciseSession,
  };
}
