import { useCallback, useEffect } from 'react';

// Session data interface
export interface SessionData {
  exerciseMode: string | null;
  currentIndex: number;
  sessionScore: { correct: number; total: number };
  perfectTenseMode: string;
  imperfectumMode: string;
  modalVerbsMode: string;
  selectedCategory: string | null;
  testReviewMode: { test1: boolean; test2: boolean };
  hasStartedLearning: boolean;
}

// Enhanced session management helper
export const sessionHelpers = {
  // Create session data from current state
  createSessionData: (state: any, currentIndex: number = 0): SessionData => {
    return {
      exerciseMode: state.mode,
      currentIndex,
      sessionScore: state.sessionScores[state.mode] || { correct: 0, total: 0 },
      perfectTenseMode: state.perfectTenseMode,
      imperfectumMode: state.imperfectumMode,
      modalVerbsMode: state.modalVerbsMode,
      selectedCategory: state.selectedCategory,
      testReviewMode: state.testReviewMode,
      hasStartedLearning: state.hasStartedLearning,
    };
  },

  // Auto-save session with debouncing
  createAutoSaver: (
    saveFunction: (data: SessionData) => void,
    delay: number = 1000,
  ) => {
    let timeoutId: NodeJS.Timeout;

    return (sessionData: SessionData) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        saveFunction(sessionData);
      }, delay);
    };
  },

  // Validate session data
  validateSessionData: (sessionData: any): boolean => {
    if (!sessionData) return false;

    const requiredFields = ['exerciseMode', 'hasStartedLearning'];
    return requiredFields.every((field) => sessionData.hasOwnProperty(field));
  },

  // Get safe session data with defaults
  getSafeSessionData: (sessionData: any): Partial<SessionData> => {
    if (!sessionHelpers.validateSessionData(sessionData)) {
      return {};
    }

    return {
      exerciseMode: sessionData.exerciseMode || null,
      currentIndex: sessionData.currentIndex || 0,
      sessionScore: sessionData.sessionScore || { correct: 0, total: 0 },
      perfectTenseMode: sessionData.perfectTenseMode || 'complete',
      imperfectumMode: sessionData.imperfectumMode || 'conjugation',
      modalVerbsMode: sessionData.modalVerbsMode || 'conjugation',
      selectedCategory: sessionData.selectedCategory || null,
      testReviewMode: sessionData.testReviewMode || {
        test1: false,
        test2: false,
      },
      hasStartedLearning: sessionData.hasStartedLearning || false,
    };
  },
};

// Auto-save hook
export function useAutoSaveSession(
  state: any,
  saveFunction: (data: SessionData) => void,
  currentIndex: number = 0,
  enabled: boolean = true,
) {
  // Create debounced save function
  const debouncedSave = useCallback(
    sessionHelpers.createAutoSaver(saveFunction, 1000),
    [saveFunction],
  );

  // Auto-save when state changes
  useEffect(() => {
    if (!enabled || !state.hasStartedLearning) return;

    const sessionData = sessionHelpers.createSessionData(state, currentIndex);
    debouncedSave(sessionData);
  }, [
    state.mode,
    state.hasStartedLearning,
    state.selectedCategory,
    state.perfectTenseMode,
    state.imperfectumMode,
    state.modalVerbsMode,
    state.sessionScores,
    currentIndex,
    enabled,
    debouncedSave,
  ]);
}

// Progress calculation utilities
export const progressUtils = {
  // Calculate overall progress percentage
  calculateOverallProgress: (
    sessionScores: Record<string, { correct: number; total: number }>,
  ) => {
    let totalCorrect = 0;
    let totalQuestions = 0;

    Object.values(sessionScores).forEach((score) => {
      totalCorrect += score.correct;
      totalQuestions += score.total;
    });

    return totalQuestions > 0
      ? Math.round((totalCorrect / totalQuestions) * 100)
      : 0;
  },

  // Get progress for specific mode
  getModeProgress: (
    sessionScores: Record<string, { correct: number; total: number }>,
    mode: string,
  ) => {
    const score = sessionScores[mode] || { correct: 0, total: 0 };
    return {
      ...score,
      percentage:
        score.total > 0 ? Math.round((score.correct / score.total) * 100) : 0,
    };
  },

  // Get best performing modes
  getBestModes: (
    sessionScores: Record<string, { correct: number; total: number }>,
    limit: number = 3,
  ) => {
    return Object.entries(sessionScores)
      .filter(([_, score]) => score.total > 0)
      .map(([mode, score]) => ({
        mode,
        ...score,
        percentage: Math.round((score.correct / score.total) * 100),
      }))
      .sort((a, b) => b.percentage - a.percentage)
      .slice(0, limit);
  },

  // Get modes that need practice (low scores)
  getModesNeedingPractice: (
    sessionScores: Record<string, { correct: number; total: number }>,
    threshold: number = 70,
  ) => {
    return Object.entries(sessionScores)
      .filter(([_, score]) => score.total > 0)
      .map(([mode, score]) => ({
        mode,
        ...score,
        percentage: Math.round((score.correct / score.total) * 100),
      }))
      .filter((item) => item.percentage < threshold)
      .sort((a, b) => a.percentage - b.percentage);
  },
};
