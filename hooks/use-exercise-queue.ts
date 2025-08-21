'use client';

import type { VocabularyItem } from '@/types/vocabulary';
import { useCallback, useState } from 'react';

interface ExerciseQueue {
  items: VocabularyItem[];
  currentIndex: number;
  completedItems: Set<string>;
  recentlySeenItems: Set<string>;
  maxRecentItems: number;
}

interface UseExerciseQueueOptions {
  maxRecentItems?: number;
  prioritizeIncorrect?: boolean;
}

export function useExerciseQueue(options: UseExerciseQueueOptions = {}) {
  const { maxRecentItems = 10, prioritizeIncorrect = true } = options;

  const [queue, setQueue] = useState<ExerciseQueue>({
    items: [],
    currentIndex: 0,
    completedItems: new Set(),
    recentlySeenItems: new Set(),
    maxRecentItems,
  });

  const createSmartQueue = useCallback(
    (
      allItems: VocabularyItem[],
      incorrectWords?: Record<string, { count: number; lastAttempt: number }>,
    ): VocabularyItem[] => {
      if (allItems.length === 0) return [];

      const items = [...allItems];
      const result: VocabularyItem[] = [];
      const available = new Set(items.map((item) => item.id));
      const recentlyUsed = new Set<string>();
      const maxRecent = Math.min(maxRecentItems, Math.floor(items.length / 3));

      const incorrectItems = items.filter(
        (item) =>
          incorrectWords &&
          incorrectWords[item.id] &&
          incorrectWords[item.id].count > 0,
      );
      const regularItems = items.filter(
        (item) =>
          !incorrectWords ||
          !incorrectWords[item.id] ||
          incorrectWords[item.id].count === 0,
      );

      const selectNext = (): VocabularyItem | null => {
        const availableItems = items.filter(
          (item) => available.has(item.id) && !recentlyUsed.has(item.id),
        );

        if (availableItems.length === 0) {
          recentlyUsed.clear();
          const fallbackItems = items.filter((item) => available.has(item.id));
          if (fallbackItems.length === 0) return null;
          return fallbackItems[
            Math.floor(Math.random() * fallbackItems.length)
          ];
        }

        if (prioritizeIncorrect && incorrectItems.length > 0) {
          const availableIncorrect = availableItems.filter(
            (item) =>
              incorrectWords &&
              incorrectWords[item.id] &&
              incorrectWords[item.id].count > 0,
          );

          if (availableIncorrect.length > 0) {
            if (Math.random() < 0.7) {
              return availableIncorrect[
                Math.floor(Math.random() * availableIncorrect.length)
              ];
            }
          }
        }

        return availableItems[
          Math.floor(Math.random() * availableItems.length)
        ];
      };

      while (available.size > 0) {
        const selected = selectNext();
        if (!selected) break;

        result.push(selected);
        available.delete(selected.id);

        recentlyUsed.add(selected.id);
        if (recentlyUsed.size > maxRecent) {
          const firstItem = Array.from(recentlyUsed)[0];
          recentlyUsed.delete(firstItem);
        }
      }

      return result;
    },
    [maxRecentItems, prioritizeIncorrect],
  );

  const initializeQueue = useCallback(
    (
      items: VocabularyItem[],
      incorrectWords?: Record<string, { count: number; lastAttempt: number }>,
      startIndex?: number,
    ) => {
      const smartQueue = createSmartQueue(items, incorrectWords);
      setQueue({
        items: smartQueue,
        currentIndex: startIndex || 0,
        completedItems: new Set(),
        recentlySeenItems: new Set(),
        maxRecentItems,
      });
    },
    [createSmartQueue, maxRecentItems],
  );

  const getCurrentItem = useCallback((): VocabularyItem | null => {
    if (queue.currentIndex >= queue.items.length) return null;
    return queue.items[queue.currentIndex];
  }, [queue]);

  const moveToNext = useCallback((itemId: string, wasCorrect: boolean) => {
    setQueue((prev) => {
      const newRecentlySeenItems = new Set(prev.recentlySeenItems);
      newRecentlySeenItems.add(itemId);

      if (newRecentlySeenItems.size > prev.maxRecentItems) {
        const items = Array.from(newRecentlySeenItems);
        const oldest = items[0];
        newRecentlySeenItems.delete(oldest);
      }

      const newCompletedItems = new Set(prev.completedItems);
      if (wasCorrect) {
        newCompletedItems.add(itemId);
      }

      return {
        ...prev,
        currentIndex: prev.currentIndex + 1,
        completedItems: newCompletedItems,
        recentlySeenItems: newRecentlySeenItems,
      };
    });
  }, []);

  const hasMoreItems = useCallback((): boolean => {
    return queue.currentIndex < queue.items.length;
  }, [queue]);

  const getProgress = useCallback(() => {
    return {
      current: queue.currentIndex,
      total: queue.items.length,
      completed: queue.completedItems.size,
      percentage:
        queue.items.length > 0
          ? (queue.currentIndex / queue.items.length) * 100
          : 0,
    };
  }, [queue]);

  const reshuffleRemaining = useCallback(
    (
      incorrectWords?: Record<string, { count: number; lastAttempt: number }>,
    ) => {
      setQueue((prev) => {
        const remainingItems = prev.items.slice(prev.currentIndex);
        const newShuffledItems = createSmartQueue(
          remainingItems,
          incorrectWords,
        );

        return {
          ...prev,
          items: [
            ...prev.items.slice(0, prev.currentIndex),
            ...newShuffledItems,
          ],
        };
      });
    },
    [createSmartQueue],
  );

  const reset = useCallback(() => {
    setQueue((prev) => ({
      ...prev,
      currentIndex: 0,
      completedItems: new Set(),
      recentlySeenItems: new Set(),
    }));
  }, []);

  return {
    initializeQueue,
    getCurrentItem,
    moveToNext,
    hasMoreItems,
    getProgress,
    reshuffleRemaining,
    reset,
    queueLength: queue.items.length,
    setCurrentIndex: (index: number) => {
      setQueue((prev) => ({ ...prev, currentIndex: index }));
    },
  };
}
