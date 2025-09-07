// Helper functions to improve the main page.tsx logic
export const exerciseHelpers = {
  // Check if an exercise mode requires chapter selection
  requiresChapter: (mode: string): boolean => {
    return ['vocabulary', 'articles', 'plural'].includes(mode);
  },

  // Get exercise configuration
  getExerciseConfig: (mode: string) => {
    const configs: Record<
      string,
      {
        name: string;
        description: string;
        requiresChapter: boolean;
        color: string;
      }
    > = {
      vocabulary: {
        name: 'Vocabulary Practice',
        description: 'Learn Dutch words with translations',
        requiresChapter: true,
        color: 'bg-blue-500',
      },
      articles: {
        name: 'Article Practice (de/het)',
        description: 'Practice Dutch articles',
        requiresChapter: true,
        color: 'bg-green-500',
      },
      plural: {
        name: 'Plural Practice',
        description: 'Learn Dutch plural forms',
        requiresChapter: true,
        color: 'bg-purple-500',
      },
      perfect: {
        name: 'Perfect Tense',
        description: 'Master Dutch perfect tense',
        requiresChapter: false,
        color: 'bg-orange-500',
      },
      imperfectum: {
        name: 'Imperfectum',
        description: 'Learn Dutch past tense',
        requiresChapter: false,
        color: 'bg-red-500',
      },
      modalverbs: {
        name: 'Modal Verbs',
        description: 'Practice modal verbs',
        requiresChapter: false,
        color: 'bg-indigo-500',
      },
      conjunctions: {
        name: 'Conjunctions',
        description: 'Learn sentence connections',
        requiresChapter: false,
        color: 'bg-pink-500',
      },
      test1: {
        name: 'Test Practice 1',
        description: 'Mixed practice exercises',
        requiresChapter: false,
        color: 'bg-gray-500',
      },
      test2: {
        name: 'Test Practice 2',
        description: 'Advanced practice exercises',
        requiresChapter: false,
        color: 'bg-gray-600',
      },
      finaltest: {
        name: 'Final Test',
        description: 'Comprehensive assessment',
        requiresChapter: false,
        color: 'bg-yellow-500',
      },
    };

    return (
      configs[mode] || {
        name: mode,
        description: '',
        requiresChapter: false,
        color: 'bg-gray-400',
      }
    );
  },

  // Check if current exercise can start
  canStartExercise: (mode: string, currentChapter: number): boolean => {
    if (exerciseHelpers.requiresChapter(mode)) {
      return currentChapter > 0;
    }
    return true;
  },

  // Get current exercise item based on mode and queues
  getCurrentExerciseItem: (mode: string, queues: any) => {
    switch (mode) {
      case 'vocabulary':
      case 'articles':
      case 'plural':
        return queues.exercise?.getCurrentItem() || null;
      case 'perfect':
        return queues.perfectTense?.getCurrentItem() || null;
      case 'imperfectum':
        return queues.imperfectum?.getCurrentItem() || null;
      case 'modalverbs':
        return queues.modalVerbs?.getCurrentItem() || null;
      case 'conjunctions':
        return queues.conjunctions?.getCurrentItem() || null;
      case 'test1':
        return queues.test1?.getCurrentTestExercise() || null;
      case 'test2':
        return queues.test2?.getCurrentTestExercise() || null;
      case 'finaltest':
        return queues.finalTest?.getCurrentItem() || null;
      default:
        return null;
    }
  },

  // Handle exercise completion for different modes
  handleExerciseCompletion: (
    mode: string,
    isCorrect: boolean,
    item: any,
    queues: any,
    progressFunctions: any,
  ) => {
    switch (mode) {
      case 'vocabulary':
      case 'articles':
      case 'plural':
        if (item) {
          queues.exercise?.moveToNext(item.id, isCorrect);
          progressFunctions.markWordCompleted(item.id, isCorrect ? 1 : 0);
        }
        break;
      case 'perfect':
        if (item) {
          queues.perfectTense?.moveToNext(item.id, isCorrect);
        }
        break;
      case 'imperfectum':
        if (item) {
          queues.imperfectum?.moveToNext(item.id, isCorrect);
        }
        break;
      case 'modalverbs':
        if (item) {
          queues.modalVerbs?.moveToNext(item.id, isCorrect);
        }
        break;
      case 'conjunctions':
        if (item) {
          queues.conjunctions?.moveToNext(item.id, isCorrect);
        }
        break;
      case 'test1':
        if (item) {
          queues.test1?.moveToNextTest(item.id, isCorrect);
          progressFunctions.markTestExerciseCompleted(
            item.id,
            isCorrect ? 'correct' : 'incorrect',
            'test1',
          );
        }
        break;
      case 'test2':
        if (item) {
          queues.test2?.moveToNextTest(item.id, isCorrect);
          progressFunctions.markTestExerciseCompleted(
            item.id,
            isCorrect ? 'correct' : 'incorrect',
            'test2',
          );
        }
        break;
      case 'finaltest':
        if (item) {
          queues.finalTest?.moveToNext(item.id, isCorrect);
          progressFunctions.markFinalExamExerciseCompleted(
            item.id,
            isCorrect ? 1 : 0,
          );
        }
        break;
    }
  },

  // Get progress for current exercise
  getExerciseProgress: (mode: string, queues: any) => {
    switch (mode) {
      case 'vocabulary':
      case 'articles':
      case 'plural':
        return (
          queues.exercise?.getProgress() || {
            current: 0,
            total: 0,
            percentage: 0,
          }
        );
      case 'perfect':
        return (
          queues.perfectTense?.getProgress() || {
            current: 0,
            total: 0,
            percentage: 0,
          }
        );
      case 'imperfectum':
        return (
          queues.imperfectum?.getProgress() || {
            current: 0,
            total: 0,
            percentage: 0,
          }
        );
      case 'modalverbs':
        return (
          queues.modalVerbs?.getProgress() || {
            current: 0,
            total: 0,
            percentage: 0,
          }
        );
      case 'conjunctions':
        return (
          queues.conjunctions?.getProgress() || {
            current: 0,
            total: 0,
            percentage: 0,
          }
        );
      case 'test1':
      case 'test2':
        return (
          queues[mode]?.getTestProgress() || {
            current: 0,
            total: 0,
            percentage: 0,
          }
        );
      case 'finaltest':
        return (
          queues.finalTest?.getProgress() || {
            current: 0,
            total: 0,
            percentage: 0,
          }
        );
      default:
        return { current: 0, total: 0, percentage: 0 };
    }
  },

  // Initialize queue for specific exercise mode
  initializeExerciseQueue: (
    mode: string,
    queues: any,
    data: any,
    progress: any,
  ) => {
    switch (mode) {
      case 'vocabulary':
      case 'articles':
      case 'plural':
        queues.exercise?.initializeQueue(
          data.vocabulary,
          progress.incorrectWords,
        );
        break;
      case 'perfect':
        queues.perfectTense?.initializeQueue(progress.incorrectWords?.perfect);
        break;
      case 'imperfectum':
        queues.imperfectum?.initializeQueue(
          progress.incorrectWords?.imperfectum,
        );
        break;
      case 'modalverbs':
        queues.modalVerbs?.initializeQueue(progress.incorrectWords?.modalverbs);
        break;
      case 'conjunctions':
        queues.conjunctions?.initializeQueue(
          progress.incorrectWords?.conjunctions,
        );
        break;
      case 'test1':
        queues.test1?.initializeTestQueue(data.createTestExercises());
        break;
      case 'test2':
        queues.test2?.initializeTestQueue(data.createTestExercises2());
        break;
      case 'finaltest':
        queues.finalTest?.initializeFinalTestQueue(data.finalTestVocabulary);
        break;
    }
  },
};

// UI state management helpers
export const uiStateHelpers = {
  // Determine what UI state should be shown
  getUIState: (
    hasStartedLearning: boolean,
    exerciseMode: string,
    currentChapter: number,
  ) => {
    if (!hasStartedLearning) {
      return 'mode-selection';
    }

    const config = exerciseHelpers.getExerciseConfig(exerciseMode);

    if (config.requiresChapter && currentChapter === 0) {
      return 'chapter-selection';
    }

    if (exerciseMode === 'finaltest') {
      return 'final-test';
    }

    return 'exercise';
  },

  // Get available exercise modes based on current state
  getAvailableExerciseModes: () => {
    return [
      'vocabulary',
      'articles',
      'plural',
      'perfect',
      'imperfectum',
      'modalverbs',
      'conjunctions',
      'test1',
      'test2',
      'finaltest',
    ];
  },

  // Group exercise modes by category
  getExerciseModesByCategory: () => {
    return {
      basic: ['vocabulary', 'articles', 'plural'],
      grammar: ['perfect', 'imperfectum', 'modalverbs', 'conjunctions'],
      tests: ['test1', 'test2', 'finaltest'],
    };
  },
};

// Session management helpers
export const sessionHelpers = {
  // Save current session state
  saveCurrentSessionState: (state: any, saveFunction: Function) => {
    const sessionData = {
      exerciseMode: state.exerciseMode,
      currentIndex: state.currentIndex || 0,
      sessionScore: state.sessionScore || { correct: 0, total: 0 },
      perfectTenseMode: state.perfectTenseMode || 'complete',
      imperfectumMode: state.imperfectumMode || 'conjugation',
      modalVerbsMode: state.modalVerbsMode || 'conjugation',
      selectedCategory: state.selectedCategory,
      testReviewMode: state.testReviewMode || { test1: false, test2: false },
      hasStartedLearning: state.hasStartedLearning || false,
    };

    saveFunction(sessionData);
  },

  // Restore session state
  restoreSessionState: (savedSession: any) => {
    return {
      exerciseMode: savedSession?.exerciseMode || 'vocabulary',
      perfectTenseMode: savedSession?.perfectTenseMode || 'complete',
      imperfectumMode: savedSession?.imperfectumMode || 'conjugation',
      modalVerbsMode: savedSession?.modalVerbsMode || 'conjugation',
      selectedCategory: savedSession?.selectedCategory,
      testReviewMode: savedSession?.testReviewMode || {
        test1: false,
        test2: false,
      },
      hasStartedLearning: savedSession?.hasStartedLearning || false,
      currentIndex: savedSession?.currentIndex || 0,
      sessionScore: savedSession?.sessionScore || { correct: 0, total: 0 },
    };
  },

  // Update session scores
  updateSessionScore: (
    sessionScores: any,
    mode: string,
    isCorrect: boolean,
  ) => {
    const currentScore = sessionScores[mode] || { correct: 0, total: 0 };
    return {
      ...sessionScores,
      [mode]: {
        correct: currentScore.correct + (isCorrect ? 1 : 0),
        total: currentScore.total + 1,
      },
    };
  },
};
