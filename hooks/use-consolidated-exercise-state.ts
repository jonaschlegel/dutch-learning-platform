import { ExamMode, ExerciseMode, FinalTestMode } from '@/types/exercise-types';
import { useCallback, useMemo, useState } from 'react';

// Consolidated exercise state interface
export interface ExerciseState {
  // Core exercise state
  mode: ExerciseMode;
  hasStartedLearning: boolean;
  showResults: boolean;
  selectedCategory: string | null;

  // Mode-specific settings
  perfectTenseMode: 'participle' | 'auxiliary' | 'complete' | 'translate';
  imperfectumMode: 'conjugation' | 'complete' | 'translate';
  modalVerbsMode:
    | 'conjugation'
    | 'usage'
    | 'translate'
    | 'negative'
    | 'question';
  conjunctionsMode:
    | 'complete'
    | 'translate'
    | 'identify'
    | 'wordOrder'
    | 'usage';
  finalTestMode: FinalTestMode | ExamMode;
  finalTestCategory: string;

  // User preferences
  useModernExercises: boolean;

  // Review and session state
  finalTestReviewMode: boolean;
  finalExamReviewMode: boolean;
  finalTestSessionCompleted: boolean;
  testReviewMode: { test1: boolean; test2: boolean };

  // Session scores
  sessionScores: Record<string, { correct: number; total: number }>;
}

// Actions interface
interface ExerciseActions {
  // Core actions
  setMode: (mode: ExerciseMode) => void;
  setHasStartedLearning: (started: boolean) => void;
  setShowResults: (show: boolean) => void;
  setSelectedCategory: (category: string | null) => void;

  // Mode-specific actions
  setPerfectTenseMode: (mode: ExerciseState['perfectTenseMode']) => void;
  setImperfectumMode: (mode: ExerciseState['imperfectumMode']) => void;
  setModalVerbsMode: (mode: ExerciseState['modalVerbsMode']) => void;
  setConjunctionsMode: (mode: ExerciseState['conjunctionsMode']) => void;
  setFinalTestMode: (mode: FinalTestMode | ExamMode) => void;
  setFinalTestCategory: (category: string) => void;

  // User preference actions
  setUseModernExercises: (useModern: boolean) => void;

  // Review and session actions
  setFinalTestReviewMode: (review: boolean) => void;
  setFinalExamReviewMode: (review: boolean) => void;
  setFinalTestSessionCompleted: (completed: boolean) => void;
  setTestReviewMode: (mode: ExerciseState['testReviewMode']) => void;

  // Session score actions
  updateSessionScore: (mode: string, isCorrect: boolean) => void;
  resetSessionScore: (mode: string) => void;
  resetAllScores: () => void;

  // Bulk actions
  resetExerciseState: () => void;
  restoreFromSession: (sessionData: any) => void;
}

const initialState: ExerciseState = {
  mode: 'vocabulary',
  hasStartedLearning: false,
  showResults: false,
  selectedCategory: null,

  perfectTenseMode: 'complete',
  imperfectumMode: 'conjugation',
  modalVerbsMode: 'conjugation',
  conjunctionsMode: 'complete',
  finalTestMode: 'mixed',
  finalTestCategory: 'All Categories',

  useModernExercises: true,

  finalTestReviewMode: false,
  finalExamReviewMode: false,
  finalTestSessionCompleted: false,
  testReviewMode: { test1: false, test2: false },

  sessionScores: {
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
    default: { correct: 0, total: 0 },
  },
};

export function useConsolidatedExerciseState(exerciseSession?: any) {
  // Initialize state with session data if available
  const [state, setState] = useState<ExerciseState>(() => {
    if (exerciseSession) {
      return {
        ...initialState,
        mode:
          (exerciseSession.exerciseMode as ExerciseMode) || initialState.mode,
        hasStartedLearning: exerciseSession.hasStartedLearning || false,
        selectedCategory: exerciseSession.selectedCategory || null,
        perfectTenseMode:
          exerciseSession.perfectTenseMode || initialState.perfectTenseMode,
        imperfectumMode:
          exerciseSession.imperfectumMode || initialState.imperfectumMode,
        modalVerbsMode:
          exerciseSession.modalVerbsMode || initialState.modalVerbsMode,
        testReviewMode:
          exerciseSession.testReviewMode || initialState.testReviewMode,
      };
    }
    return initialState;
  });

  // Actions
  const actions: ExerciseActions = {
    setMode: useCallback((mode: ExerciseMode) => {
      setState((prev) => ({ ...prev, mode }));
    }, []),

    setHasStartedLearning: useCallback((hasStartedLearning: boolean) => {
      setState((prev) => ({ ...prev, hasStartedLearning }));
    }, []),

    setShowResults: useCallback((showResults: boolean) => {
      setState((prev) => ({ ...prev, showResults }));
    }, []),

    setSelectedCategory: useCallback((selectedCategory: string | null) => {
      setState((prev) => ({ ...prev, selectedCategory }));
    }, []),

    setPerfectTenseMode: useCallback(
      (perfectTenseMode: ExerciseState['perfectTenseMode']) => {
        setState((prev) => ({ ...prev, perfectTenseMode }));
      },
      [],
    ),

    setImperfectumMode: useCallback(
      (imperfectumMode: ExerciseState['imperfectumMode']) => {
        setState((prev) => ({ ...prev, imperfectumMode }));
      },
      [],
    ),

    setModalVerbsMode: useCallback(
      (modalVerbsMode: ExerciseState['modalVerbsMode']) => {
        setState((prev) => ({ ...prev, modalVerbsMode }));
      },
      [],
    ),

    setConjunctionsMode: useCallback(
      (conjunctionsMode: ExerciseState['conjunctionsMode']) => {
        setState((prev) => ({ ...prev, conjunctionsMode }));
      },
      [],
    ),

    setFinalTestMode: useCallback((finalTestMode: FinalTestMode | ExamMode) => {
      setState((prev) => ({ ...prev, finalTestMode }));
    }, []),

    setFinalTestCategory: useCallback((finalTestCategory: string) => {
      setState((prev) => ({ ...prev, finalTestCategory }));
    }, []),

    setUseModernExercises: useCallback((useModernExercises: boolean) => {
      setState((prev) => ({ ...prev, useModernExercises }));
    }, []),

    setFinalTestReviewMode: useCallback((finalTestReviewMode: boolean) => {
      setState((prev) => ({ ...prev, finalTestReviewMode }));
    }, []),

    setFinalExamReviewMode: useCallback((finalExamReviewMode: boolean) => {
      setState((prev) => ({ ...prev, finalExamReviewMode }));
    }, []),

    setFinalTestSessionCompleted: useCallback(
      (finalTestSessionCompleted: boolean) => {
        setState((prev) => ({ ...prev, finalTestSessionCompleted }));
      },
      [],
    ),

    setTestReviewMode: useCallback(
      (testReviewMode: ExerciseState['testReviewMode']) => {
        setState((prev) => ({ ...prev, testReviewMode }));
      },
      [],
    ),

    updateSessionScore: useCallback((mode: string, isCorrect: boolean) => {
      setState((prev) => ({
        ...prev,
        sessionScores: {
          ...prev.sessionScores,
          [mode]: {
            correct: prev.sessionScores[mode].correct + (isCorrect ? 1 : 0),
            total: prev.sessionScores[mode].total + 1,
          },
        },
      }));
    }, []),

    resetSessionScore: useCallback((mode: string) => {
      setState((prev) => ({
        ...prev,
        sessionScores: {
          ...prev.sessionScores,
          [mode]: { correct: 0, total: 0 },
        },
      }));
    }, []),

    resetAllScores: useCallback(() => {
      setState((prev) => ({
        ...prev,
        sessionScores: initialState.sessionScores,
      }));
    }, []),

    resetExerciseState: useCallback(() => {
      setState(initialState);
    }, []),

    restoreFromSession: useCallback((sessionData: any) => {
      setState((prev) => ({
        ...prev,
        mode: (sessionData.exerciseMode as ExerciseMode) || prev.mode,
        hasStartedLearning: sessionData.hasStartedLearning || false,
        selectedCategory: sessionData.selectedCategory || null,
        perfectTenseMode: sessionData.perfectTenseMode || prev.perfectTenseMode,
        imperfectumMode: sessionData.imperfectumMode || prev.imperfectumMode,
        modalVerbsMode: sessionData.modalVerbsMode || prev.modalVerbsMode,
        testReviewMode: sessionData.testReviewMode || prev.testReviewMode,
      }));
    }, []),
  };

  // Computed values
  const computed = useMemo(
    () => ({
      currentScore: state.sessionScores[state.mode] || { correct: 0, total: 0 },
      isInFinalTest: state.mode === 'finaltest',
      isInReviewMode: state.finalTestReviewMode || state.finalExamReviewMode,
      isInTestMode: state.mode === 'test1' || state.mode === 'test2',
      currentPercentage: (() => {
        const score = state.sessionScores[state.mode] || {
          correct: 0,
          total: 0,
        };
        return score.total > 0
          ? Math.round((score.correct / score.total) * 100)
          : 0;
      })(),
    }),
    [state],
  );

  return {
    state,
    actions,
    computed,
  };
}
