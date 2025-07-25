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
      });
    }
  }, []);

  const saveProgress = (newProgress: UserProgress) => {
    const toSave = {
      ...newProgress,
      completedWords: Array.from(newProgress.completedWords),
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
    });
  };

  return {
    progress,
    markWordCompleted,
    markWordIncorrect,
    setCurrentChapter,
    toggleMistakeMode,
    resetProgress,
  };
}
