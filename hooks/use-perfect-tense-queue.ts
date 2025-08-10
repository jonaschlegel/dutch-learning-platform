import {
  perfectTenseVocabulary,
  type PerfectTenseWord,
} from '@/data/perfect-tense';
import { useCallback, useState } from 'react';

interface PerfectTenseQueueConfig {
  maxRecentItems?: number;
  prioritizeIncorrect?: boolean;
  focusCategory?:
    | 'regular'
    | 'irregular'
    | 'strong'
    | 'movement'
    | 'change'
    | null;
  exerciseMode?: 'participle' | 'auxiliary' | 'complete' | 'translate';
}

export function usePerfectTenseQueue(config: PerfectTenseQueueConfig = {}) {
  const {
    maxRecentItems = 5,
    prioritizeIncorrect = true,
    focusCategory = null,
    exerciseMode = 'complete',
  } = config;

  const [currentQueue, setCurrentQueue] = useState<PerfectTenseWord[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [recentItems, setRecentItems] = useState<string[]>([]);
  const [incorrectItems, setIncorrectItems] = useState<Set<string>>(new Set());

  const initializeQueue = useCallback(
    (incorrectWords: Record<string, number> = {}) => {
      let availableWords = [...perfectTenseVocabulary];

      // Filter by category if specified
      if (focusCategory) {
        availableWords = availableWords.filter(
          (word) => word.category === focusCategory,
        );
      }

      // If prioritizing incorrect words and we have some, focus on those
      if (prioritizeIncorrect && Object.keys(incorrectWords).length > 0) {
        const incorrectWordIds = Object.keys(incorrectWords);
        const incorrectPerfectWords = availableWords.filter((word) =>
          incorrectWordIds.includes(word.id),
        );

        if (incorrectPerfectWords.length > 0) {
          availableWords = incorrectPerfectWords;
        }
      }

      // Shuffle the available words
      const shuffled = [...availableWords].sort(() => Math.random() - 0.5);

      setCurrentQueue(shuffled);
      setCurrentIndex(0);
      setRecentItems([]);
      setIncorrectItems(new Set(Object.keys(incorrectWords)));
    },
    [focusCategory, prioritizeIncorrect, maxRecentItems],
  );

  const getCurrentItem = useCallback(() => {
    if (currentQueue.length === 0 || currentIndex >= currentQueue.length) {
      return null;
    }
    return currentQueue[currentIndex];
  }, [currentQueue, currentIndex]);

  const moveToNext = useCallback(
    (wordId: string, wasCorrect: boolean) => {
      // Update incorrect items tracking
      const newIncorrectItems = new Set(incorrectItems);
      if (wasCorrect) {
        newIncorrectItems.delete(wordId);
      } else {
        newIncorrectItems.add(wordId);
      }
      setIncorrectItems(newIncorrectItems);

      // Update recent items
      const newRecentItems = [
        wordId,
        ...recentItems.filter((id) => id !== wordId),
      ].slice(0, maxRecentItems);
      setRecentItems(newRecentItems);

      // Move to next item
      const nextIndex = currentIndex + 1;

      if (nextIndex >= currentQueue.length) {
        // If we've gone through all items, reinitialize with focus on incorrect ones
        const incorrectWords: Record<string, number> = {};
        newIncorrectItems.forEach((id) => {
          incorrectWords[id] = 1;
        });

        if (Object.keys(incorrectWords).length > 0) {
          // Reinitialize with only incorrect words
          initializeQueue(incorrectWords);
        } else {
          // All correct, start fresh
          initializeQueue();
        }
      } else {
        setCurrentIndex(nextIndex);
      }
    },
    [
      currentIndex,
      currentQueue.length,
      incorrectItems,
      recentItems,
      maxRecentItems,
      initializeQueue,
    ],
  );

  const hasMoreItems = useCallback(() => {
    return currentIndex < currentQueue.length - 1 || incorrectItems.size > 0;
  }, [currentIndex, currentQueue.length, incorrectItems.size]);

  const getProgress = useCallback(() => {
    if (currentQueue.length === 0) return { current: 0, total: 0 };
    return {
      current: Math.min(currentIndex + 1, currentQueue.length),
      total: currentQueue.length,
    };
  }, [currentIndex, currentQueue.length]);

  const resetQueue = useCallback(() => {
    setCurrentQueue([]);
    setCurrentIndex(0);
    setRecentItems([]);
    setIncorrectItems(new Set());
  }, []);

  const getStatistics = useCallback(() => {
    return {
      totalWords: perfectTenseVocabulary.length,
      queueLength: currentQueue.length,
      incorrectCount: incorrectItems.size,
      progress: getProgress(),
    };
  }, [currentQueue.length, incorrectItems.size, getProgress]);

  return {
    initializeQueue,
    getCurrentItem,
    moveToNext,
    hasMoreItems,
    getProgress,
    resetQueue,
    getStatistics,
    incorrectItems,
  };
}
