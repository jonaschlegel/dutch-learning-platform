import {
  ExamMode,
  ExerciseMode,
  FinalTestMode,
  isExamMode,
  isFinalTestMode,
  ProgressData,
  SessionScore,
} from '@/types/exercise-types';
import { useCallback, useMemo, useState } from 'react';

interface ExerciseState {
  mode: ExerciseMode;
  finalTestMode: FinalTestMode | ExamMode;
  category: string;
  reviewMode: boolean;
  examReviewMode: boolean;
  sessionCompleted: boolean;
  scores: Record<string, SessionScore>;
}

interface ExerciseActions {
  setMode: (mode: ExerciseMode) => void;
  setFinalTestMode: (mode: FinalTestMode | ExamMode) => void;
  setCategory: (category: string) => void;
  setReviewMode: (enabled: boolean) => void;
  setExamReviewMode: (enabled: boolean) => void;
  setSessionCompleted: (completed: boolean) => void;
  updateScore: (mode: string, correct: boolean) => void;
  resetScore: (mode: string) => void;
  resetAll: () => void;
}

const initialState: ExerciseState = {
  mode: 'vocabulary',
  finalTestMode: 'mixed',
  category: 'All Categories',
  reviewMode: false,
  examReviewMode: false,
  sessionCompleted: false,
  scores: {
    vocabulary: { correct: 0, total: 0 },
    articles: { correct: 0, total: 0 },
    plural: { correct: 0, total: 0 },
    perfect: { correct: 0, total: 0 },
    imperfectum: { correct: 0, total: 0 },
    modalverbs: { correct: 0, total: 0 },
    conjunctions: { correct: 0, total: 0 },
    test1: { correct: 0, total: 0 },
    test2: { correct: 0, total: 0 },
    finaltest: { correct: 0, total: 0 },
  },
};

export function useExerciseState() {
  const [state, setState] = useState<ExerciseState>(initialState);

  const actions: ExerciseActions = {
    setMode: useCallback((mode: ExerciseMode) => {
      setState((prev) => ({
        ...prev,
        mode,
        sessionCompleted: false,
        reviewMode: false,
        examReviewMode: false,
      }));
    }, []),

    setFinalTestMode: useCallback((finalTestMode: FinalTestMode | ExamMode) => {
      setState((prev) => ({
        ...prev,
        finalTestMode,
        sessionCompleted: false,
        reviewMode: false,
        examReviewMode: false,
      }));
    }, []),

    setCategory: useCallback((category: string) => {
      setState((prev) => ({ ...prev, category, sessionCompleted: false }));
    }, []),

    setReviewMode: useCallback((reviewMode: boolean) => {
      setState((prev) => ({ ...prev, reviewMode, sessionCompleted: false }));
    }, []),

    setExamReviewMode: useCallback((examReviewMode: boolean) => {
      setState((prev) => ({
        ...prev,
        examReviewMode,
        sessionCompleted: false,
      }));
    }, []),

    setSessionCompleted: useCallback((sessionCompleted: boolean) => {
      setState((prev) => ({ ...prev, sessionCompleted }));
    }, []),

    updateScore: useCallback((mode: string, correct: boolean) => {
      setState((prev) => ({
        ...prev,
        scores: {
          ...prev.scores,
          [mode]: {
            correct: prev.scores[mode].correct + (correct ? 1 : 0),
            total: prev.scores[mode].total + 1,
          },
        },
      }));
    }, []),

    resetScore: useCallback((mode: string) => {
      setState((prev) => ({
        ...prev,
        scores: {
          ...prev.scores,
          [mode]: { correct: 0, total: 0 },
        },
      }));
    }, []),

    resetAll: useCallback(() => {
      setState(initialState);
    }, []),
  };

  // Computed values
  const computed = useMemo(
    () => ({
      isInFinalTest: isFinalTestMode(state.mode),
      isInExamMode:
        isFinalTestMode(state.mode) && isExamMode(state.finalTestMode),
      currentScore: state.scores[state.mode] || { correct: 0, total: 0 },
      isInReviewMode: state.reviewMode || state.examReviewMode,
    }),
    [state],
  );

  return {
    state,
    actions,
    computed,
  };
}
