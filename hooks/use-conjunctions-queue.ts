import { type Conjunction, conjunctions } from '@/data/conjunctions';
import { useCallback, useState } from 'react';

interface ConjunctionsQueueConfig {
  maxRecentItems?: number;
  prioritizeIncorrect?: boolean;
  focusLevel?: 'A1' | 'A2' | null;
  focusType?: 'coordinating' | 'subordinating' | 'correlative' | null;
  focusCategory?: 'basic' | 'contrast' | 'cause' | 'time' | 'condition' | null;
}

export function useConjunctionsQueue(config: ConjunctionsQueueConfig = {}) {
  const {
    maxRecentItems = 5,
    prioritizeIncorrect = true,
    focusLevel = null,
    focusType = null,
    focusCategory = null,
  } = config;

  const [currentQueue, setCurrentQueue] = useState<Conjunction[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [recentItems, setRecentItems] = useState<string[]>([]);
  const [incorrectItems, setIncorrectItems] = useState<Set<string>>(new Set());

  const initializeQueue = useCallback(
    (incorrectWords: Record<string, number> = {}, startIndex?: number) => {
      // Get current values to avoid stale closure
      const currentFocusLevel = focusLevel;
      const currentFocusType = focusType;
      const currentFocusCategory = focusCategory;
      const currentPrioritizeIncorrect = prioritizeIncorrect;

      let availableWords = [...conjunctions];

      // Filter by level if specified
      if (currentFocusLevel) {
        availableWords = availableWords.filter(
          (word) => word.level === currentFocusLevel,
        );
      }

      // Filter by type if specified
      if (currentFocusType) {
        availableWords = availableWords.filter(
          (word) => word.type === currentFocusType,
        );
      }

      // Filter by category if specified
      if (currentFocusCategory) {
        availableWords = availableWords.filter(
          (word) => word.category === currentFocusCategory,
        );
      }

      // If prioritizing incorrect words and we have some, focus on those
      if (
        currentPrioritizeIncorrect &&
        Object.keys(incorrectWords).length > 0
      ) {
        const incorrectWordIds = Object.keys(incorrectWords);
        const incorrectConjunctions = availableWords.filter((word) =>
          incorrectWordIds.includes(word.id),
        );

        if (incorrectConjunctions.length > 0) {
          availableWords = incorrectConjunctions;
        }
      }

      // Create a smarter queue that ensures all words are seen before repeating
      const createSmartQueue = (words: typeof availableWords) => {
        const queue = [...words];
        const recentlyUsed = new Set<string>();
        const result: typeof words = [];

        // Fisher-Yates shuffle for initial randomization
        for (let i = queue.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [queue[i], queue[j]] = [queue[j], queue[i]];
        }

        // Ensure no word appears twice until all have been seen once
        while (queue.length > 0) {
          let selectedIndex = -1;

          // Try to find a word that hasn't been used recently
          for (let i = 0; i < queue.length; i++) {
            if (!recentlyUsed.has(queue[i].id)) {
              selectedIndex = i;
              break;
            }
          }

          // If all remaining words were used recently, clear the recent list and pick the first
          if (selectedIndex === -1) {
            recentlyUsed.clear();
            selectedIndex = 0;
          }

          const selectedWord = queue[selectedIndex];
          result.push(selectedWord);
          queue.splice(selectedIndex, 1);

          recentlyUsed.add(selectedWord.id);
          if (
            recentlyUsed.size >
            Math.max(3, Math.floor(availableWords.length / 4))
          ) {
            const oldestId = Array.from(recentlyUsed)[0];
            recentlyUsed.delete(oldestId);
          }
        }

        return result;
      };

      const smartQueue = createSmartQueue(availableWords);
      setCurrentQueue(smartQueue);
      setCurrentIndex(startIndex || 0);
      setRecentItems([]);
      setIncorrectItems(new Set(Object.keys(incorrectWords)));
    },
    [], // Empty dependency array - function is now stable
  );

  const getCurrentItem = useCallback(() => {
    if (currentQueue.length === 0 || currentIndex >= currentQueue.length) {
      return null;
    }
    return currentQueue[currentIndex];
  }, [currentQueue, currentIndex]);

  const moveToNext = useCallback(
    (conjunctionId: string, wasCorrect: boolean) => {
      // Update incorrect items tracking
      const newIncorrectItems = new Set(incorrectItems);
      if (wasCorrect) {
        newIncorrectItems.delete(conjunctionId);
      } else {
        newIncorrectItems.add(conjunctionId);
      }
      setIncorrectItems(newIncorrectItems);

      // Update recent items
      const newRecentItems = [
        conjunctionId,
        ...recentItems.filter((id) => id !== conjunctionId),
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
          initializeQueue(incorrectWords, 0);
        } else {
          // All correct, start fresh
          initializeQueue({}, 0);
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
    // Always has more items since we cycle through the queue
    return currentQueue.length > 0;
  }, [currentQueue.length]);

  const getProgress = useCallback(() => {
    if (currentQueue.length === 0)
      return { current: 0, total: conjunctions.length };
    return {
      current: Math.min(currentIndex + 1, currentQueue.length),
      total: conjunctions.length, // Always show total available exercises
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
      totalWords: conjunctions.length,
      queueLength: currentQueue.length,
      incorrectCount: incorrectItems.size,
      progress: getProgress(),
    };
  }, [currentQueue.length, incorrectItems.size, getProgress]);

  const getAvailableFilters = useCallback(() => {
    return {
      levels: ['A1', 'A2'] as const,
      types: ['coordinating', 'subordinating', 'correlative'] as const,
      categories: ['basic', 'contrast', 'cause', 'time', 'condition'] as const,
    };
  }, []);

  return {
    initializeQueue,
    getCurrentItem,
    moveToNext,
    hasMoreItems,
    getProgress,
    resetQueue,
    getStatistics,
    getAvailableFilters,
    incorrectItems,
    setCurrentIndex: (index: number) => setCurrentIndex(index),
  };
}
