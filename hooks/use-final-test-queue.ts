'use client';

import { FinalTestVocabulary } from '@/data/final-test-vocabulary';
import { useCallback, useMemo, useState } from 'react';

interface FinalTestExerciseQueue {
  items: FinalTestVocabulary[];
  currentIndex: number;
  completedItems: Set<string>;
  incorrectItems: Record<string, { count: number; lastAttempt: number }>;
  recentlySeenItems: Set<string>;
  maxRecentItems: number;
  currentCategory: string | null;
  categoryProgress: Record<string, { completed: number; total: number }>;
  allCategoriesCompleted: boolean;
}

interface UseFinalTestQueueOptions {
  maxRecentItems?: number;
  prioritizeIncorrect?: boolean;
  ensureCategoryCompletion?: boolean;
}

export function useFinalTestQueue(options: UseFinalTestQueueOptions = {}) {
  const {
    maxRecentItems = 10,
    prioritizeIncorrect = true,
    ensureCategoryCompletion = true,
  } = options;

  const [queue, setQueue] = useState<FinalTestExerciseQueue>({
    items: [],
    currentIndex: 0,
    completedItems: new Set(),
    incorrectItems: {},
    recentlySeenItems: new Set(),
    maxRecentItems,
    currentCategory: null,
    categoryProgress: {},
    allCategoriesCompleted: false,
  });

  const createSmartFinalTestQueue = useCallback(
    (
      allItems: FinalTestVocabulary[],
      selectedCategory?: string,
      incorrectWordsParam?: Record<
        string,
        { count: number; lastAttempt: number }
      >,
    ): FinalTestVocabulary[] => {
      if (allItems.length === 0) return [];

      let itemsToUse = [...allItems];

      // Filter by category if specified
      if (selectedCategory && selectedCategory !== 'All Categories') {
        itemsToUse = itemsToUse.filter(
          (item) => item.category === selectedCategory,
        );
      }

      if (!ensureCategoryCompletion) {
        // Simple shuffle if category completion is not enforced
        return itemsToUse.sort(() => Math.random() - 0.5);
      }

      // Group items by subcategory for better organization
      const itemsBySubcategory = itemsToUse.reduce((acc, item) => {
        const subcategory = item.subcategory || item.category;
        if (!acc[subcategory]) acc[subcategory] = [];
        acc[subcategory].push(item);
        return acc;
      }, {} as Record<string, FinalTestVocabulary[]>);

      const result: FinalTestVocabulary[] = [];
      const subcategories = Object.keys(itemsBySubcategory);
      const subcategoryQueues = subcategories.map((subcategory) => ({
        subcategory,
        items: [...itemsBySubcategory[subcategory]].sort(
          () => Math.random() - 0.5,
        ),
        currentIndex: 0,
      }));

      const recentSubcategories = new Set<string>();
      const maxRecentSubcategories = Math.min(3, subcategories.length);

      // Distribute items ensuring we go through each subcategory completely before repeating
      while (
        subcategoryQueues.some(
          (queue) => queue.currentIndex < queue.items.length,
        )
      ) {
        const availableQueues = subcategoryQueues.filter(
          (queue) =>
            queue.currentIndex < queue.items.length &&
            !recentSubcategories.has(queue.subcategory),
        );

        let selectedQueue;
        if (availableQueues.length === 0) {
          // If no available queues, reset recent subcategories and try again
          recentSubcategories.clear();
          const stillActiveQueues = subcategoryQueues.filter(
            (queue) => queue.currentIndex < queue.items.length,
          );
          if (stillActiveQueues.length > 0) {
            selectedQueue =
              stillActiveQueues[
                Math.floor(Math.random() * stillActiveQueues.length)
              ];
          }
        } else {
          // Prioritize incorrect items if specified
          if (prioritizeIncorrect && incorrectWordsParam) {
            const queueWithIncorrectItems = availableQueues.find((queue) =>
              queue.items
                .slice(queue.currentIndex, queue.currentIndex + 3)
                .some(
                  (item) =>
                    incorrectWordsParam[item.id] &&
                    incorrectWordsParam[item.id].count > 0,
                ),
            );
            selectedQueue =
              queueWithIncorrectItems ||
              availableQueues[
                Math.floor(Math.random() * availableQueues.length)
              ];
          } else {
            selectedQueue =
              availableQueues[
                Math.floor(Math.random() * availableQueues.length)
              ];
          }
        }

        if (selectedQueue) {
          const selectedItem = selectedQueue.items[selectedQueue.currentIndex];
          result.push(selectedItem);
          selectedQueue.currentIndex++;

          recentSubcategories.add(selectedQueue.subcategory);
          if (recentSubcategories.size > maxRecentSubcategories) {
            const firstSubcategory = Array.from(recentSubcategories)[0];
            recentSubcategories.delete(firstSubcategory);
          }
        }
      }

      return result;
    },
    [ensureCategoryCompletion, prioritizeIncorrect],
  );

  const initializeFinalTestQueue = useCallback(
    (
      items: FinalTestVocabulary[],
      selectedCategory?: string,
      incorrectWords?: Record<string, { count: number; lastAttempt: number }>,
      startIndex?: number,
    ) => {
      const smartQueue = createSmartFinalTestQueue(
        items,
        selectedCategory,
        incorrectWords,
      );

      // Calculate category progress
      const categoryProgress: Record<
        string,
        { completed: number; total: number }
      > = {};
      const categories = Array.from(
        new Set(items.map((item) => item.category)),
      );

      categories.forEach((category) => {
        const categoryItems = items.filter(
          (item) => item.category === category,
        );
        categoryProgress[category] = {
          completed: 0,
          total: categoryItems.length,
        };
      });

      setQueue({
        items: smartQueue,
        currentIndex: startIndex || 0,
        completedItems: new Set(),
        incorrectItems: incorrectWords || {},
        recentlySeenItems: new Set(),
        maxRecentItems,
        currentCategory: selectedCategory || null,
        categoryProgress,
        allCategoriesCompleted: false,
      });
    },
    [createSmartFinalTestQueue, maxRecentItems],
  );

  const getCurrentItem = (): FinalTestVocabulary | null => {
    if (queue.currentIndex >= queue.items.length) return null;
    return queue.items[queue.currentIndex];
  };

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
      const newIncorrectItems = { ...prev.incorrectItems };

      if (wasCorrect) {
        newCompletedItems.add(itemId);
        // Remove from incorrect items if it was previously wrong
        if (newIncorrectItems[itemId]) {
          delete newIncorrectItems[itemId];
        }
      } else {
        // Add to incorrect items or increment count
        newIncorrectItems[itemId] = {
          count: (newIncorrectItems[itemId]?.count || 0) + 1,
          lastAttempt: Date.now(),
        };
      }

      // Update category progress
      const currentItem = prev.items[prev.currentIndex];
      const newCategoryProgress = { ...prev.categoryProgress };
      if (currentItem && wasCorrect) {
        const category = currentItem.category;
        if (newCategoryProgress[category]) {
          newCategoryProgress[category].completed += 1;
        }
      }

      // Check if we've seen all items at least once
      const hasSeenAllItems = prev.currentIndex >= prev.items.length - 1;
      const hasIncorrectItems = Object.keys(newIncorrectItems).length > 0;

      // If we've seen all items and there are incorrect ones, we should show review mode
      // instead of continuing to next item
      if (hasSeenAllItems && hasIncorrectItems) {
        // Don't increment currentIndex - we'll handle review mode separately
        return {
          ...prev,
          completedItems: newCompletedItems,
          incorrectItems: newIncorrectItems,
          recentlySeenItems: newRecentlySeenItems,
          categoryProgress: newCategoryProgress,
          allCategoriesCompleted: hasSeenAllItems && !hasIncorrectItems,
        };
      }

      // Check if all categories are completed
      const allCategoriesCompleted = Object.values(newCategoryProgress).every(
        (progress) => progress.completed >= progress.total,
      );

      return {
        ...prev,
        currentIndex: prev.currentIndex + 1,
        completedItems: newCompletedItems,
        incorrectItems: newIncorrectItems,
        recentlySeenItems: newRecentlySeenItems,
        categoryProgress: newCategoryProgress,
        allCategoriesCompleted: hasSeenAllItems && !hasIncorrectItems,
      };
    });
  }, []);

  const hasMoreItems = (): boolean => {
    return queue.currentIndex < queue.items.length;
  };

  const getProgress = () => {
    return {
      current: queue.currentIndex,
      total: queue.items.length,
      completed: queue.completedItems.size,
      percentage:
        queue.items.length > 0
          ? (queue.currentIndex / queue.items.length) * 100
          : 0,
      categoryProgress: queue.categoryProgress,
      allCategoriesCompleted: queue.allCategoriesCompleted,
    };
  };

  const getCategoryProgress = (category: string) => {
    return queue.categoryProgress[category] || { completed: 0, total: 0 };
  };

  const getIncorrectItemIds = useCallback(() => {
    return Object.keys(queue.incorrectItems);
  }, [queue.incorrectItems]);

  const getIncorrectItems = useCallback(() => {
    return queue.incorrectItems;
  }, [queue.incorrectItems]);

  const shouldShowReviewMode = useCallback(() => {
    const hasSeenAllItems = queue.currentIndex >= queue.items.length;
    const hasIncorrectItems = Object.keys(queue.incorrectItems).length > 0;
    return hasSeenAllItems && hasIncorrectItems;
  }, [queue.currentIndex, queue.items.length, queue.incorrectItems]);

  const startReviewMode = useCallback(() => {
    // Create a new queue with only incorrect items
    const incorrectItemIds = Object.keys(queue.incorrectItems);
    const incorrectItems = queue.items.filter((item) =>
      incorrectItemIds.includes(item.id),
    );

    setQueue((prev) => ({
      ...prev,
      items: incorrectItems,
      currentIndex: 0,
      completedItems: new Set(), // Reset completed items for review
      recentlySeenItems: new Set(),
    }));
  }, [queue.incorrectItems, queue.items]);

  const isInReviewMode = useCallback(() => {
    // Check if current queue only contains items that were previously incorrect
    const incorrectItemIds = Object.keys(queue.incorrectItems);
    const allItemsAreIncorrect = queue.items.every((item) =>
      incorrectItemIds.includes(item.id),
    );
    return allItemsAreIncorrect && queue.items.length < queue.items.length;
  }, [queue.incorrectItems, queue.items]);

  const reshuffleRemaining = useCallback(
    (
      selectedCategory?: string,
      incorrectWords?: Record<string, { count: number; lastAttempt: number }>,
    ) => {
      setQueue((prev) => {
        const remainingItems = prev.items.slice(prev.currentIndex);
        const reshuffled = createSmartFinalTestQueue(
          remainingItems,
          selectedCategory,
          incorrectWords,
        );

        return {
          ...prev,
          items: [...prev.items.slice(0, prev.currentIndex), ...reshuffled],
        };
      });
    },
    [createSmartFinalTestQueue],
  );

  const reset = useCallback(() => {
    setQueue((prev) => ({
      ...prev,
      currentIndex: 0,
      completedItems: new Set(),
      recentlySeenItems: new Set(),
      allCategoriesCompleted: false,
      categoryProgress: Object.keys(prev.categoryProgress).reduce(
        (acc, category) => {
          acc[category] = { ...prev.categoryProgress[category], completed: 0 };
          return acc;
        },
        {} as Record<string, { completed: number; total: number }>,
      ),
    }));
  }, []);

  const switchCategory = useCallback(
    (
      items: FinalTestVocabulary[],
      newCategory: string,
      incorrectWords?: Record<string, { count: number; lastAttempt: number }>,
    ) => {
      const smartQueue = createSmartFinalTestQueue(
        items,
        newCategory,
        incorrectWords,
      );

      setQueue((prev) => ({
        ...prev,
        items: smartQueue,
        currentIndex: 0,
        currentCategory: newCategory,
        completedItems: new Set(),
        recentlySeenItems: new Set(),
      }));
    },
    [createSmartFinalTestQueue],
  );

  return {
    initializeFinalTestQueue,
    getCurrentItem,
    moveToNext,
    hasMoreItems,
    getProgress,
    getCategoryProgress,
    getIncorrectItemIds,
    getIncorrectItems,
    shouldShowReviewMode,
    startReviewMode,
    isInReviewMode,
    reshuffleRemaining,
    reset,
    switchCategory,
    queueLength: queue.items.length,
    currentCategory: queue.currentCategory,
    setCurrentIndex: (index: number) => {
      setQueue((prev) => ({ ...prev, currentIndex: index }));
    },
  };
}
