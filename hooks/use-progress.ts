'use client';

import type { UserProgress } from '@/types/vocabulary';
import { useEffect, useState } from 'react';

export function useProgress() {
  const [progress, setProgress] = useState<UserProgress>({
    completedWords: new Set(),
    scores: {},
    currentChapter: 0,
  });

  useEffect(() => {
    const savedProgress = localStorage.getItem('dutch-learning-progress');
    if (savedProgress) {
      const parsed = JSON.parse(savedProgress);
      setProgress({
        ...parsed,
        completedWords: new Set(parsed.completedWords),
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
    };
    saveProgress(newProgress);
  };

  const setCurrentChapter = (chapter: number) => {
    const newProgress = { ...progress, currentChapter: chapter };
    saveProgress(newProgress);
  };

  const resetProgress = () => {
    localStorage.removeItem('dutch-learning-progress');
    setProgress({
      completedWords: new Set(),
      scores: {},
      currentChapter: 0,
    });
  };

  return {
    progress,
    markWordCompleted,
    setCurrentChapter,
    resetProgress,
  };
}
