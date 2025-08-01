'use client';

import { useCallback, useState } from 'react';

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

interface TestExerciseQueue {
  exercises: TestExercise[];
  currentIndex: number;
  completedExercises: Set<string>;
  recentlySeenExercises: Set<string>;
  maxRecentExercises: number;
}

interface UseTestExerciseQueueOptions {
  maxRecentExercises?: number;
  ensureTypeDistribution?: boolean;
}

export function useTestExerciseQueue(
  options: UseTestExerciseQueueOptions = {},
) {
  const { maxRecentExercises = 8, ensureTypeDistribution = true } = options;

  const [queue, setQueue] = useState<TestExerciseQueue>({
    exercises: [],
    currentIndex: 0,
    completedExercises: new Set(),
    recentlySeenExercises: new Set(),
    maxRecentExercises,
  });

  const createSmartTestQueue = useCallback(
    (allExercises: TestExercise[]): TestExercise[] => {
      if (allExercises.length === 0) return [];

      const exercises = [...allExercises];
      const result: TestExercise[] = [];

      if (!ensureTypeDistribution) {
        const available = new Set(exercises.map((ex) => ex.id));
        const recentlyUsed = new Set<string>();
        const maxRecent = Math.min(
          maxRecentExercises,
          Math.floor(exercises.length / 4),
        );

        while (available.size > 0) {
          const availableExercises = exercises.filter(
            (ex) => available.has(ex.id) && !recentlyUsed.has(ex.id),
          );

          let selected: TestExercise;
          if (availableExercises.length === 0) {
            recentlyUsed.clear();
            const fallbackExercises = exercises.filter((ex) =>
              available.has(ex.id),
            );
            selected =
              fallbackExercises[
                Math.floor(Math.random() * fallbackExercises.length)
              ];
          } else {
            selected =
              availableExercises[
                Math.floor(Math.random() * availableExercises.length)
              ];
          }

          result.push(selected);
          available.delete(selected.id);

          recentlyUsed.add(selected.id);
          if (recentlyUsed.size > maxRecent) {
            const firstItem = Array.from(recentlyUsed)[0];
            recentlyUsed.delete(firstItem);
          }
        }

        return result;
      }

      const exercisesByType = exercises.reduce((acc, exercise) => {
        if (!acc[exercise.type]) acc[exercise.type] = [];
        acc[exercise.type].push(exercise);
        return acc;
      }, {} as Record<string, TestExercise[]>);

      const types = Object.keys(exercisesByType);
      const typeQueues = types.map((type) => ({
        type,
        exercises: [...exercisesByType[type]].sort(() => Math.random() - 0.5),
        currentIndex: 0,
      }));

      const recentTypes = new Set<string>();
      const maxRecentTypes = Math.min(3, types.length);

      while (
        typeQueues.some((queue) => queue.currentIndex < queue.exercises.length)
      ) {
        const availableTypeQueues = typeQueues.filter(
          (queue) =>
            queue.currentIndex < queue.exercises.length &&
            !recentTypes.has(queue.type),
        );

        let selectedQueue;
        if (availableTypeQueues.length === 0) {
          recentTypes.clear();
          const fallbackQueues = typeQueues.filter(
            (queue) => queue.currentIndex < queue.exercises.length,
          );
          selectedQueue =
            fallbackQueues[Math.floor(Math.random() * fallbackQueues.length)];
        } else {
          selectedQueue =
            availableTypeQueues[
              Math.floor(Math.random() * availableTypeQueues.length)
            ];
        }

        if (selectedQueue) {
          result.push(selectedQueue.exercises[selectedQueue.currentIndex]);
          selectedQueue.currentIndex++;

          recentTypes.add(selectedQueue.type);
          if (recentTypes.size > maxRecentTypes) {
            const firstType = Array.from(recentTypes)[0];
            recentTypes.delete(firstType);
          }
        }
      }

      return result;
    },
    [maxRecentExercises, ensureTypeDistribution],
  );

  const initializeTestQueue = useCallback(
    (exercises: TestExercise[]) => {
      const smartQueue = createSmartTestQueue(exercises);
      setQueue({
        exercises: smartQueue,
        currentIndex: 0,
        completedExercises: new Set(),
        recentlySeenExercises: new Set(),
        maxRecentExercises,
      });
    },
    [createSmartTestQueue, maxRecentExercises],
  );

  const getCurrentTestExercise = useCallback((): TestExercise | null => {
    if (queue.currentIndex >= queue.exercises.length) return null;
    return queue.exercises[queue.currentIndex];
  }, [queue]);

  const moveToNextTest = useCallback(
    (exerciseId: string, wasCorrect: boolean) => {
      setQueue((prev) => {
        const newRecentlySeenExercises = new Set(prev.recentlySeenExercises);
        newRecentlySeenExercises.add(exerciseId);

        if (newRecentlySeenExercises.size > prev.maxRecentExercises) {
          const exercises = Array.from(newRecentlySeenExercises);
          const oldest = exercises[0];
          newRecentlySeenExercises.delete(oldest);
        }

        const newCompletedExercises = new Set(prev.completedExercises);
        if (wasCorrect) {
          newCompletedExercises.add(exerciseId);
        }

        return {
          ...prev,
          currentIndex: prev.currentIndex + 1,
          completedExercises: newCompletedExercises,
          recentlySeenExercises: newRecentlySeenExercises,
        };
      });
    },
    [],
  );

  const hasMoreTestExercises = useCallback((): boolean => {
    return queue.currentIndex < queue.exercises.length;
  }, [queue]);

  const getTestProgress = useCallback(() => {
    return {
      current: queue.currentIndex,
      total: queue.exercises.length,
      completed: queue.completedExercises.size,
      percentage:
        queue.exercises.length > 0
          ? (queue.currentIndex / queue.exercises.length) * 100
          : 0,
    };
  }, [queue]);

  const resetTestQueue = useCallback(() => {
    setQueue((prev) => ({
      ...prev,
      currentIndex: 0,
      completedExercises: new Set(),
      recentlySeenExercises: new Set(),
    }));
  }, []);

  return {
    initializeTestQueue,
    getCurrentTestExercise,
    moveToNextTest,
    hasMoreTestExercises,
    getTestProgress,
    resetTestQueue,
    testQueueLength: queue.exercises.length,
  };
}
