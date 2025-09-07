'use client';

import { ArticleExercise } from '@/components/ArticleExercise';
import { Avatar, AvatarFallback } from '@/components/Avatar';
import { Badge } from '@/components/Badge';
import { Button } from '@/components/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/Card';
import { ChapterSelector } from '@/components/ChapterSelector';
import { CollapsibleExerciseSelector } from '@/components/CollapsibleExerciseSelector';
import { CollapsibleTabs } from '@/components/CollapsibleTabs';
import { ConjunctionsExercise } from '@/components/ConjunctionsExercise';
import { EnhancedProgressDashboard } from '@/components/EnhancedProgressDashboard';
import { ExamExerciseCard } from '@/components/ExamExerciseCard';
import { FinalTestExercise } from '@/components/FinalTestExercise';
import { FinalTestProgressDashboard } from '@/components/FinalTestProgressDashboard';
import { ImperfectumExercise } from '@/components/ImperfectumExercise';
import { ModalVerbsExercise } from '@/components/ModalVerbsExercise';
import { PerfectTenseExercise } from '@/components/PerfectTenseExercise';
import { PluralExercise } from '@/components/PluralExercise';
import { ProgressDashboard } from '@/components/ProgressDashboard';
import { SimpleModeSelector } from '@/components/SimpleModeSelector';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/Tabs';
import {
  createTestExercises,
  createTestExercises2,
  TestExerciseCard,
} from '@/components/TestExerciseCard';
import { VocabularyCard } from '@/components/VocabularyCard';
import { conjunctions } from '@/data/conjunctions';
import {
  allExamExercises,
  examCategories,
  ExamExercise,
} from '@/data/final-exam-exercises';
import {
  finalTestCategories,
  finalTestVocabulary,
} from '@/data/final-test-vocabulary';
import { imperfectumVocabulary } from '@/data/imperfectum';
import { modalVerbs } from '@/data/modal-verbs';
import { perfectTenseVocabulary } from '@/data/perfect-tense';
import { testExercises2 } from '@/data/test-exercises';
import { vocabulary } from '@/data/vocabulary';
import { useConjunctionsQueue } from '@/hooks/use-conjunctions-queue';
import { useConsolidatedExerciseState } from '@/hooks/use-consolidated-exercise-state';
import { useExerciseQueue } from '@/hooks/use-exercise-queue';
import { useFinalTestQueue } from '@/hooks/use-final-test-queue';
import { useImperfectumQueue } from '@/hooks/use-imperfectum-queue';
import { useModalVerbsQueue } from '@/hooks/use-modal-verbs-queue';
import { usePerfectTenseQueue } from '@/hooks/use-perfect-tense-queue';
import { useProgress } from '@/hooks/use-progress';
import { useTestExerciseQueue } from '@/hooks/use-test-exercise-queue';
import { useToast } from '@/hooks/use-toast';
import { useUserAvatar } from '@/hooks/use-user-avatar';
import { exerciseHelpers } from '@/utils/exercise-helpers';
import { calculateDashboardStats } from '@/utils/progress-dashboard';
import {
  progressUtils,
  sessionHelpers,
  useAutoSaveSession,
} from '@/utils/session-management';
import {
  BookOpen,
  Brain,
  CheckCircle,
  Clock,
  GraduationCap,
  Play,
  RotateCcw,
  Target,
} from 'lucide-react';
import { useCallback, useEffect, useMemo, useState } from 'react';

export default function DutchLearningPlatform() {
  const {
    progress,
    exerciseSession,
    markWordCompleted,
    setCurrentChapter,
    toggleMistakeMode,
    resetProgress,
    markTestExerciseCompleted,
    getTestExerciseProgress,
    markFinalExamExerciseCompleted,
    setFinalExamMistakeMode,
    saveExerciseSession,
    clearExerciseSession,
  } = useProgress();
  const { initial, color } = useUserAvatar();
  const { toast } = useToast();

  const exerciseQueueOptions = useMemo(
    () => ({
      maxRecentItems: 8,
      prioritizeIncorrect: true,
    }),
    [],
  );

  const exerciseQueue = useExerciseQueue(exerciseQueueOptions);

  const test1ExerciseQueueOptions = useMemo(
    () => ({
      maxRecentExercises: 6,
      ensureTypeDistribution: true,
    }),
    [],
  );

  const test1ExerciseQueue = useTestExerciseQueue(test1ExerciseQueueOptions);

  const test2ExerciseQueueOptions = useMemo(
    () => ({
      maxRecentExercises: 6,
      ensureTypeDistribution: true,
    }),
    [],
  );

  const test2ExerciseQueue = useTestExerciseQueue(test2ExerciseQueueOptions);

  const perfectTenseQueueOptions = useMemo(
    () => ({
      maxRecentItems: 6,
      prioritizeIncorrect: true,
    }),
    [],
  );

  const perfectTenseQueue = usePerfectTenseQueue(perfectTenseQueueOptions);

  const imperfectumQueueOptions = useMemo(
    () => ({
      maxRecentItems: 6,
      prioritizeIncorrect: true,
    }),
    [],
  );

  const imperfectumQueue = useImperfectumQueue(imperfectumQueueOptions);

  const modalVerbsQueueOptions = useMemo(
    () => ({
      maxRecentItems: 6,
      prioritizeIncorrect: true,
    }),
    [],
  );

  const modalVerbsQueue = useModalVerbsQueue(modalVerbsQueueOptions);

  const conjunctionsQueueOptions = useMemo(
    () => ({
      maxRecentItems: 6,
      prioritizeIncorrect: true,
    }),
    [],
  );

  const conjunctionsQueue = useConjunctionsQueue(conjunctionsQueueOptions);

  const finalTestQueueOptions = useMemo(
    () => ({
      maxRecentItems: 10,
      prioritizeIncorrect: true,
      ensureCategoryCompletion: true,
    }),
    [],
  );

  const finalTestQueue = useFinalTestQueue(finalTestQueueOptions);

  // Consolidated exercise state management
  const {
    state: exerciseState,
    actions: exerciseActions,
    computed,
  } = useConsolidatedExerciseState(exerciseSession);

  // Extract commonly used values for backward compatibility
  const exerciseMode = exerciseState.mode;
  const hasStartedLearning = exerciseState.hasStartedLearning;
  const showResults = exerciseState.showResults;
  const selectedCategory = exerciseState.selectedCategory;
  const perfectTenseMode = exerciseState.perfectTenseMode;
  const imperfectumMode = exerciseState.imperfectumMode;
  const modalVerbsMode = exerciseState.modalVerbsMode;
  const conjunctionsMode = exerciseState.conjunctionsMode;
  const finalTestMode = exerciseState.finalTestMode;
  const finalTestCategory = exerciseState.finalTestCategory;
  const finalTestReviewMode = exerciseState.finalTestReviewMode;
  const finalExamReviewMode = exerciseState.finalExamReviewMode;
  const finalTestSessionCompleted = exerciseState.finalTestSessionCompleted;
  const sessionScores = exerciseState.sessionScores;
  const testReviewMode = exerciseState.testReviewMode;
  const useModernExercises = exerciseState.useModernExercises;

  // Backward compatible setters
  const setExerciseMode = exerciseActions.setMode;
  const setHasStartedLearning = exerciseActions.setHasStartedLearning;
  const setShowResults = exerciseActions.setShowResults;
  const setSelectedCategory = exerciseActions.setSelectedCategory;
  const setPerfectTenseMode = exerciseActions.setPerfectTenseMode;
  const setImperfectumMode = exerciseActions.setImperfectumMode;
  const setModalVerbsMode = exerciseActions.setModalVerbsMode;
  const setConjunctionsMode = exerciseActions.setConjunctionsMode;
  const setFinalTestMode = exerciseActions.setFinalTestMode;
  const setFinalTestCategory = exerciseActions.setFinalTestCategory;
  const setFinalTestReviewMode = exerciseActions.setFinalTestReviewMode;
  const setFinalExamReviewMode = exerciseActions.setFinalExamReviewMode;
  const setFinalTestSessionCompleted =
    exerciseActions.setFinalTestSessionCompleted;
  const setTestReviewMode = exerciseActions.setTestReviewMode;
  const setUseModernExercises = exerciseActions.setUseModernExercises;
  // Session scores are now managed through exerciseActions.updateSessionScore and exerciseActions.resetSessionScore

  // Auto-save session when state changes
  useAutoSaveSession(exerciseState, saveExerciseSession, 0, true);

  // Calculate enhanced dashboard statistics
  const dashboardStats = useMemo(() => {
    return calculateDashboardStats(exerciseState);
  }, [exerciseState.sessionScores, exerciseState.mode]);

  // Session completion tracking - temporarily disabled to fix switching issues
  // const [sessionCompleted, setSessionCompleted] = useState({
  //   perfect: false,
  //   imperfectum: false,
  //   modalverbs: false,
  //   conjunctions: false,
  // });

  // Centralized UI state determination
  const getUIState = useCallback(() => {
    if (!hasStartedLearning) {
      return 'welcome';
    }

    if (
      exerciseHelpers.requiresChapter(exerciseMode) &&
      progress.currentChapter === 0
    ) {
      return 'chapter-selection';
    }

    return 'exercise';
  }, [hasStartedLearning, exerciseMode, progress.currentChapter]);

  // Function to save current exercise session state (simplified to prevent infinite loops)
  const saveCurrentSession = useCallback(() => {
    if (!hasStartedLearning) return;

    const currentProgress =
      exerciseMode === 'test1'
        ? test1ExerciseQueue.getTestProgress()
        : exerciseMode === 'test2'
        ? test2ExerciseQueue.getTestProgress()
        : exerciseMode === 'finaltest'
        ? finalTestQueue.getProgress()
        : exerciseMode === 'perfect'
        ? perfectTenseQueue.getProgress()
        : exerciseMode === 'imperfectum'
        ? imperfectumQueue.getProgress()
        : exerciseMode === 'modalverbs'
        ? modalVerbsQueue.getProgress()
        : exerciseMode === 'conjunctions'
        ? conjunctionsQueue.getProgress()
        : exerciseQueue.getProgress();

    saveExerciseSession({
      exerciseMode,
      currentIndex: currentProgress.current,
      sessionScore: sessionScores[exerciseMode] || { correct: 0, total: 0 },
      perfectTenseMode,
      imperfectumMode,
      modalVerbsMode,
      selectedCategory,
      testReviewMode,
      hasStartedLearning,
    });
  }, [
    exerciseMode,
    perfectTenseMode,
    imperfectumMode,
    modalVerbsMode,
    conjunctionsMode,
    selectedCategory,
    testReviewMode,
    hasStartedLearning,
    saveExerciseSession,
  ]);

  useEffect(() => {
    toast({
      title: 'Progress Saved',
      description:
        'Your learning progress is saved automatically in your browser.',
      duration: 5000,
    });
  }, [toast]);

  useEffect(() => {
    if (progress.currentChapter === 0) {
      setSelectedCategory(null);
    }
  }, [progress.currentChapter]);

  // Save session state when relevant values change (simplified to prevent infinite loops)
  // Removed sessionScore from dependencies to prevent rapid state changes
  useEffect(() => {
    if (hasStartedLearning) {
      saveCurrentSession();
    }
  }, [
    exerciseMode,
    perfectTenseMode,
    imperfectumMode,
    modalVerbsMode,
    selectedCategory,
    hasStartedLearning,
    testReviewMode,
  ]);

  // Save session score with a delay to prevent rapid updates
  useEffect(() => {
    const currentScore = sessionScores[exerciseMode];
    if (hasStartedLearning && currentScore && currentScore.total > 0) {
      const timeoutId = setTimeout(() => {
        saveCurrentSession();
      }, 500); // 500ms delay

      return () => clearTimeout(timeoutId);
    }
  }, [sessionScores, exerciseMode, hasStartedLearning, saveCurrentSession]);

  // Initialize shuffled exam exercises when finalTestMode changes
  useEffect(() => {
    if (finalTestMode) {
      let filteredExercises: ExamExercise[] = [];

      if (
        finalExamReviewMode &&
        progress.finalExamProgress?.incorrectExercises
      ) {
        // In review mode, only show incorrect exercises
        const incorrectExerciseIds = Object.keys(
          progress.finalExamProgress.incorrectExercises,
        );
        filteredExercises = allExamExercises.filter((ex) =>
          incorrectExerciseIds.includes(ex.id),
        );
      } else {
        // Normal mode: filter by exam type
        filteredExercises = (() => {
          switch (finalTestMode) {
            case 'exam-perfect':
              return allExamExercises.filter(
                (ex) => ex.type === 'perfect-construction',
              );
            case 'exam-imperfect':
              return allExamExercises.filter(
                (ex) => ex.type === 'imperfect-fill',
              );
            case 'exam-separable':
              return allExamExercises.filter(
                (ex) => ex.type === 'separable-verbs',
              );
            case 'exam-conjunctions':
              return allExamExercises.filter(
                (ex) => ex.type === 'conjunctions-combine',
              );
            case 'exam-multiple-choice':
              return allExamExercises.filter(
                (ex) => ex.type === 'multiple-choice',
              );
            case 'exam-writing':
              return allExamExercises.filter(
                (ex) => ex.type === 'writing-prompt',
              );
            case 'exam-mixed':
              return allExamExercises;
            default:
              return [];
          }
        })();
      }

      // Shuffle the filtered exercises
      const shuffled = [...filteredExercises].sort(() => Math.random() - 0.5);
      console.log(`[DEBUG] ${finalTestMode} exercises:`, {
        total: filteredExercises.length,
        shuffled: shuffled.map((ex) => ex.id),
        firstExercise: shuffled[0]?.question,
      });
      setShuffledExamExercises(shuffled);

      // Reset the current index
      setCurrentExamExerciseIndex(0);
    } else {
      setShuffledExamExercises([]);
    }
  }, [
    finalTestMode,
    finalExamReviewMode,
    progress.finalExamProgress?.incorrectExercises,
  ]);

  const currentChapterWords = useMemo(() => {
    if (progress.currentChapter === 0) {
      return vocabulary;
    }
    return vocabulary.filter((w) => w.chapter === progress.currentChapter);
  }, [progress.currentChapter]);

  // Memoize incorrectWords to prevent infinite loops
  const memoizedIncorrectWords = useMemo(() => {
    return progress.incorrectWords;
  }, [JSON.stringify(progress.incorrectWords)]);

  const availableWords = useMemo(() => {
    if (
      exerciseMode === 'test1' ||
      exerciseMode === 'test2' ||
      exerciseMode === 'perfect' ||
      exerciseMode === 'imperfectum' ||
      exerciseMode === 'modalverbs' ||
      exerciseMode === 'conjunctions'
    ) {
      return [];
    }

    let words = currentChapterWords;

    if (progress.mistakeMode) {
      const incorrectWordIds = Object.keys(memoizedIncorrectWords);
      words = words.filter((w) => incorrectWordIds.includes(w.id));
    }

    if (exerciseMode === 'articles') {
      words = words.filter((w) => w.article);
    } else if (exerciseMode === 'plural') {
      words = words.filter((w) => w.plural);
    }

    if (selectedCategory) {
      words = words.filter((w) => w.category === selectedCategory);
    }

    if (progress.currentChapter === 0) {
      words = [...words].sort(() => Math.random() - 0.5);
    }

    return words;
  }, [
    currentChapterWords,
    exerciseMode,
    selectedCategory,
    progress.mistakeMode,
    memoizedIncorrectWords,
    progress.currentChapter,
  ]);

  const availableCategories = useMemo(() => {
    if (progress.currentChapter === 0) {
      return [];
    }

    const categories = new Set(
      currentChapterWords
        .map((word) => word.category)
        .filter((category): category is NonNullable<typeof category> =>
          Boolean(category),
        ),
    );
    return Array.from(categories).sort();
  }, [currentChapterWords, progress.currentChapter]);

  const testReviewModeValues = useMemo(
    () => ({
      test1: testReviewMode.test1,
      test2: testReviewMode.test2,
    }),
    [testReviewMode.test1, testReviewMode.test2],
  );

  useEffect(() => {
    if (exerciseMode === 'test1') {
      const testExercises = createTestExercises();
      const test1Progress = getTestExerciseProgress('test1');
      const incorrectIds = Object.keys(test1Progress.incorrectExercises);

      if (testReviewModeValues.test1 && incorrectIds.length > 0) {
        const incorrectExercises = testExercises.filter((ex) =>
          incorrectIds.includes(ex.id),
        );
        test1ExerciseQueue.initializeTestQueue(
          incorrectExercises,
          exerciseSession.currentIndex,
        );
      } else {
        test1ExerciseQueue.initializeTestQueue(
          testExercises,
          exerciseSession.currentIndex,
        );
      }
    } else if (exerciseMode === 'test2') {
      const testExercises = createTestExercises2();
      const test2Progress = getTestExerciseProgress('test2');
      const incorrectIds = Object.keys(test2Progress.incorrectExercises);

      if (testReviewModeValues.test2 && incorrectIds.length > 0) {
        const incorrectExercises = testExercises.filter((ex) =>
          incorrectIds.includes(ex.id),
        );
        test2ExerciseQueue.initializeTestQueue(
          incorrectExercises,
          exerciseSession.currentIndex,
        );
      } else {
        test2ExerciseQueue.initializeTestQueue(
          testExercises,
          exerciseSession.currentIndex,
        );
      }
    } else if (exerciseMode === 'perfect') {
      const incorrectWordIds: Record<string, number> = {};
      Object.entries(memoizedIncorrectWords).forEach(([id, data]) => {
        incorrectWordIds[id] = data.count;
      });

      if (progress.mistakeMode) {
        const perfectTenseIds = new Set(
          perfectTenseVocabulary.map((w) => w.id),
        );
        const filteredIncorrectWords: Record<string, number> = {};
        Object.entries(incorrectWordIds).forEach(([id, count]) => {
          if (perfectTenseIds.has(id)) {
            filteredIncorrectWords[id] = count;
          }
        });
        perfectTenseQueue.initializeQueue(
          filteredIncorrectWords,
          exerciseSession.currentIndex,
        );
      } else {
        perfectTenseQueue.initializeQueue(
          incorrectWordIds,
          exerciseSession.currentIndex,
        );
      }
    } else if (exerciseMode === 'imperfectum') {
      const incorrectWordIds: Record<string, number> = {};
      Object.entries(memoizedIncorrectWords).forEach(([id, data]) => {
        incorrectWordIds[id] = data.count;
      });

      if (progress.mistakeMode) {
        const imperfectumIds = new Set(imperfectumVocabulary.map((w) => w.id));
        const filteredIncorrectWords: Record<string, number> = {};
        Object.entries(incorrectWordIds).forEach(([id, count]) => {
          if (imperfectumIds.has(id)) {
            filteredIncorrectWords[id] = count;
          }
        });
        imperfectumQueue.initializeQueue(
          filteredIncorrectWords,
          exerciseSession.currentIndex,
        );
      } else {
        imperfectumQueue.initializeQueue(
          incorrectWordIds,
          exerciseSession.currentIndex,
        );
      }
    } else if (exerciseMode === 'modalverbs') {
      // Modal verbs should ALWAYS be available regardless of chapters or mistake mode
      const incorrectWordIds: Record<string, number> = {};
      Object.entries(memoizedIncorrectWords).forEach(([id, data]) => {
        incorrectWordIds[id] = data.count;
      });

      if (progress.mistakeMode && Object.keys(incorrectWordIds).length > 0) {
        // In mistake mode: only show modal verbs that were answered incorrectly
        const modalVerbIds = new Set(modalVerbs.map((w) => w.id));
        const filteredIncorrectWords: Record<string, number> = {};
        Object.entries(incorrectWordIds).forEach(([id, count]) => {
          if (modalVerbIds.has(id)) {
            filteredIncorrectWords[id] = count;
          }
        });

        // If there are modal verb mistakes, use them, otherwise show all modal verbs
        if (Object.keys(filteredIncorrectWords).length > 0) {
          modalVerbsQueue.initializeQueue(
            filteredIncorrectWords,
            exerciseSession.currentIndex,
          );
        } else {
          // No modal verb mistakes, show all modal verbs even in mistake mode
          modalVerbsQueue.initializeQueue({}, exerciseSession.currentIndex);
        }
      } else {
        // Normal mode: always show all modal verbs
        modalVerbsQueue.initializeQueue({}, exerciseSession.currentIndex);
      }
    } else if (exerciseMode === 'conjunctions') {
      // Conjunctions should ALWAYS be available regardless of chapters or mistake mode
      const incorrectWordIds: Record<string, number> = {};
      Object.entries(memoizedIncorrectWords).forEach(([id, data]) => {
        incorrectWordIds[id] = data.count;
      });

      if (progress.mistakeMode && Object.keys(incorrectWordIds).length > 0) {
        // In mistake mode: only show conjunctions that were answered incorrectly
        const conjunctionIds = new Set(conjunctions.map((w) => w.id));
        const filteredIncorrectWords: Record<string, number> = {};
        Object.entries(incorrectWordIds).forEach(([id, count]) => {
          if (conjunctionIds.has(id)) {
            filteredIncorrectWords[id] = count;
          }
        });

        // If there are conjunction mistakes, use them, otherwise show all conjunctions
        if (Object.keys(filteredIncorrectWords).length > 0) {
          conjunctionsQueue.initializeQueue(
            filteredIncorrectWords,
            exerciseSession.currentIndex,
          );
        } else {
          // No conjunction mistakes, show all conjunctions even in mistake mode
          conjunctionsQueue.initializeQueue({}, exerciseSession.currentIndex);
        }
      } else {
        // Normal mode: always show all conjunctions
        conjunctionsQueue.initializeQueue({}, exerciseSession.currentIndex);
      }
    } else if (exerciseMode === 'finaltest') {
      // Final test vocabulary
      const incorrectItemIds = Object.keys(memoizedIncorrectWords)
        .map((id) => ({
          [id]: {
            count: memoizedIncorrectWords[id].count,
            lastAttempt: memoizedIncorrectWords[id].lastAttempt,
          },
        }))
        .reduce((acc, curr) => ({ ...acc, ...curr }), {});

      // Filter vocabulary based on exercise mode
      const filterVocabularyByMode = (items: typeof finalTestVocabulary) => {
        switch (finalTestMode) {
          case 'article':
            // Only include nouns with articles
            return items.filter((item) => item.type === 'noun' && item.article);
          case 'conjugation':
            // Only include verbs with conjugation data
            return items.filter(
              (item) => item.type === 'verb' && item.conjugation,
            );
          case 'translate':
          case 'reverse':
          case 'mixed':
          default:
            // Include all vocabulary for translation modes
            return items;
        }
      };

      if (finalTestReviewMode && Object.keys(incorrectItemIds).length > 0) {
        // Review mode: only show incorrect items
        const incorrectFinalTestItems = finalTestVocabulary.filter(
          (item) => incorrectItemIds[item.id],
        );
        const filteredIncorrectItems = filterVocabularyByMode(
          incorrectFinalTestItems,
        );
        finalTestQueue.initializeFinalTestQueue(
          filteredIncorrectItems,
          finalTestCategory === 'All Categories'
            ? undefined
            : finalTestCategory,
          incorrectItemIds,
          exerciseSession.currentIndex,
        );
      } else {
        // Normal mode: all items from selected category, filtered by mode
        const categoryItems =
          finalTestCategory === 'All Categories'
            ? finalTestVocabulary
            : finalTestVocabulary.filter(
                (item) => item.category === finalTestCategory,
              );

        const filteredCategoryItems = filterVocabularyByMode(categoryItems);

        finalTestQueue.initializeFinalTestQueue(
          filteredCategoryItems,
          finalTestCategory === 'All Categories'
            ? undefined
            : finalTestCategory,
          incorrectItemIds,
          exerciseSession.currentIndex,
        );
      }
    } else {
      exerciseQueue.initializeQueue(
        availableWords,
        memoizedIncorrectWords,
        exerciseSession.currentIndex,
      );
    }
  }, [
    availableWords,
    exerciseMode,
    memoizedIncorrectWords,
    progress.mistakeMode,
    testReviewModeValues,
    exerciseSession.currentIndex,
    exerciseQueue.initializeQueue,
    test1ExerciseQueue.initializeTestQueue,
    test2ExerciseQueue.initializeTestQueue,
    perfectTenseQueue.initializeQueue,
    imperfectumQueue.initializeQueue,
    modalVerbsQueue.initializeQueue,
    conjunctionsQueue.initializeQueue,
    finalTestQueue.initializeFinalTestQueue,
    getTestExerciseProgress,
    finalTestCategory,
    finalTestReviewMode,
    finalTestMode,
  ]);

  const currentWord = exerciseQueue.getCurrentItem();
  const currentTest1Exercise = test1ExerciseQueue.getCurrentTestExercise();
  const currentTest2Exercise = test2ExerciseQueue.getCurrentTestExercise();
  const currentPerfectTenseWord = perfectTenseQueue.getCurrentItem();
  const currentImperfectumWord = imperfectumQueue.getCurrentItem();
  const currentModalVerb = modalVerbsQueue.getCurrentItem();
  const currentConjunction = conjunctionsQueue.getCurrentItem();
  const currentFinalTestItem = finalTestQueue.getCurrentItem();

  // Exam exercises state with proper queue management
  const [currentExamExerciseIndex, setCurrentExamExerciseIndex] = useState(0);
  const [examExercises, setExamExercises] = useState(allExamExercises);
  const [shuffledExamExercises, setShuffledExamExercises] = useState<
    typeof allExamExercises
  >([]);
  const [completedExamExercises, setCompletedExamExercises] = useState<
    Set<string>
  >(new Set());
  const [examExerciseSessionCompleted, setExamExerciseSessionCompleted] =
    useState(false);

  const currentExamExercise = useMemo(() => {
    // If we've completed the session, return null
    if (
      examExerciseSessionCompleted ||
      currentExamExerciseIndex >= shuffledExamExercises.length
    ) {
      return null;
    }

    return shuffledExamExercises[currentExamExerciseIndex] || null;
  }, [
    currentExamExerciseIndex,
    examExerciseSessionCompleted,
    shuffledExamExercises,
  ]);

  // Function to get exam exercise progress
  const getExamExerciseProgress = () => {
    return {
      current: currentExamExerciseIndex,
      total: shuffledExamExercises.length,
      completed: completedExamExercises.size,
      percentage:
        shuffledExamExercises.length > 0
          ? (currentExamExerciseIndex / shuffledExamExercises.length) * 100
          : 0,
    };
  };

  // Safe completion screen data
  const finalTestCompletionData = useMemo(() => {
    try {
      const progress = finalTestQueue.getProgress();
      const incorrectItems = finalTestQueue.getIncorrectItems();
      return {
        totalExercises: progress?.total || 0,
        incorrectCount: incorrectItems ? Object.keys(incorrectItems).length : 0,
      };
    } catch (error) {
      console.warn('Error getting final test completion data:', error);
      return {
        totalExercises: 0,
        incorrectCount: 0,
      };
    }
  }, [finalTestQueue, finalTestSessionCompleted]);

  // Reset exam exercise session when mode changes
  useEffect(() => {
    setCurrentExamExerciseIndex(0);
    setCompletedExamExercises(new Set());
    setExamExerciseSessionCompleted(false);
    setFinalTestSessionCompleted(false);
    // Reset session scores when switching exam modes
    if (finalTestMode.startsWith('exam-')) {
      exerciseActions.resetSessionScore('finaltest');
    }
  }, [finalTestMode, finalTestReviewMode]);

  // Auto-switch to "All Categories" when current category becomes irrelevant for the mode
  useEffect(() => {
    if (finalTestCategory && finalTestCategory !== 'All Categories') {
      if (!isCategoryRelevantForMode(finalTestCategory, finalTestMode)) {
        setFinalTestCategory('All Categories');
      }
    }
  }, [finalTestMode, finalTestCategory]);

  const handleExerciseComplete = (correct: boolean) => {
    // Update session score using consolidated state management
    exerciseActions.updateSessionScore(exerciseMode, correct);

    if (exerciseMode === 'test1' && currentTest1Exercise) {
      markTestExerciseCompleted(
        'test1',
        currentTest1Exercise.id,
        correct ? 1 : 0,
      );
      test1ExerciseQueue.moveToNextTest(currentTest1Exercise.id, correct);
    } else if (exerciseMode === 'test2' && currentTest2Exercise) {
      markTestExerciseCompleted(
        'test2',
        currentTest2Exercise.id,
        correct ? 1 : 0,
      );
      test2ExerciseQueue.moveToNextTest(currentTest2Exercise.id, correct);
    } else if (exerciseMode === 'perfect' && currentPerfectTenseWord) {
      markWordCompleted(currentPerfectTenseWord.id, correct ? 1 : 0);
      perfectTenseQueue.moveToNext(currentPerfectTenseWord.id, correct);
    } else if (exerciseMode === 'imperfectum' && currentImperfectumWord) {
      markWordCompleted(currentImperfectumWord.id, correct ? 1 : 0);
      imperfectumQueue.moveToNext(currentImperfectumWord.id, correct);
    } else if (exerciseMode === 'modalverbs' && currentModalVerb) {
      markWordCompleted(currentModalVerb.id, correct ? 1 : 0);
      modalVerbsQueue.moveToNext(currentModalVerb.id, correct);
    } else if (exerciseMode === 'conjunctions' && currentConjunction) {
      markWordCompleted(currentConjunction.id, correct ? 1 : 0);
      conjunctionsQueue.moveToNext(currentConjunction.id, correct);
    } else if (
      exerciseMode === 'finaltest' &&
      [
        'exam-perfect',
        'exam-imperfect',
        'exam-separable',
        'exam-conjunctions',
        'exam-multiple-choice',
        'exam-writing',
        'exam-mixed',
      ].includes(finalTestMode) &&
      currentExamExercise
    ) {
      // Handle exam exercises with proper completion tracking
      console.log(`[DEBUG] Exam exercise completed:`, {
        exerciseId: currentExamExercise.id,
        correct,
        currentIndex: currentExamExerciseIndex,
        total: getExamExerciseProgress().total,
      });
      markFinalExamExerciseCompleted(currentExamExercise.id, correct ? 1 : 0);

      setCompletedExamExercises(
        (prev) => new Set([...prev, currentExamExercise.id]),
      );

      const nextIndex = currentExamExerciseIndex + 1;
      const examProgress = getExamExerciseProgress();

      // Check if we've completed all exercises in this mode
      if (nextIndex >= examProgress.total) {
        setExamExerciseSessionCompleted(true);

        // Check if there are any incorrect exercises for review
        const incorrectExercises =
          progress.finalExamProgress?.incorrectExercises || {};
        const incorrectCount = Object.keys(incorrectExercises).length;

        // Show completion message
        setTimeout(() => {
          if (finalExamReviewMode) {
            // Review mode completion
            const remainingIncorrect =
              progress.finalExamProgress?.incorrectExercises || {};
            const remainingCount = Object.keys(remainingIncorrect).length;

            if (remainingCount > 0) {
              toast({
                title: 'Review Session Complete!',
                description: `You've practiced your mistakes! You still have ${remainingCount} exercises that need more practice.`,
              });
            } else {
              toast({
                title: 'All Mistakes Mastered!',
                description: `Excellent! You've successfully corrected all your previous mistakes. Great job!`,
              });
            }
          } else if (incorrectCount > 0) {
            toast({
              title: 'Exam Section Complete!',
              description: `You've completed all ${examProgress.total} exercises. You have ${incorrectCount} exercises to review. Click "Review Mistakes" to practice them again.`,
            });
          } else {
            toast({
              title: 'Perfect Score!',
              description: `You've completed all ${examProgress.total} exercises with no mistakes. Excellent work!`,
            });
          }
        }, 100);
      } else {
        setCurrentExamExerciseIndex(nextIndex);
      }
    } else if (exerciseMode === 'finaltest' && currentFinalTestItem) {
      // For final test vocabulary, handle completion with both queue and global progress tracking
      markWordCompleted(currentFinalTestItem.id, correct ? 1 : 0);
      finalTestQueue.moveToNext(currentFinalTestItem.id, correct);

      // Check if we've finished all items (either for review or completion)
      if (!finalTestQueue.hasMoreItems()) {
        setFinalTestSessionCompleted(true);

        // Check if we should show review mode after going through all items
        if (finalTestQueue.shouldShowReviewMode()) {
          // Show completion message and review option
          setTimeout(() => {
            const incorrectCount = Object.keys(
              finalTestQueue.getIncorrectItems(),
            ).length;
            if (incorrectCount > 0) {
              setShowResults(true);
              toast({
                title: 'Session Complete!',
                description: `You have ${incorrectCount} words to review. Click "Review Mistakes" to practice them again.`,
              });
            }
          }, 100);
        } else {
          // Perfect completion - no incorrect items
          setTimeout(() => {
            toast({
              title: 'Perfect Score!',
              description: `You've completed all ${
                finalTestQueue.getProgress().total
              } exercises with no mistakes. Excellent work!`,
            });
          }, 100);
        }
      }
    } else if (currentWord) {
      markWordCompleted(currentWord.id, correct ? 1 : 0);
      exerciseQueue.moveToNext(currentWord.id, correct);
    }

    // Update session score using consolidated action
    exerciseActions.updateSessionScore(exerciseMode, correct);

    const hasMoreExercises =
      exerciseMode === 'test1'
        ? test1ExerciseQueue.hasMoreTestExercises()
        : exerciseMode === 'test2'
        ? test2ExerciseQueue.hasMoreTestExercises()
        : exerciseMode === 'finaltest' &&
          [
            'exam-perfect',
            'exam-imperfect',
            'exam-separable',
            'exam-conjunctions',
            'exam-multiple-choice',
            'exam-writing',
            'exam-mixed',
          ].includes(finalTestMode)
        ? !examExerciseSessionCompleted &&
          currentExamExerciseIndex < shuffledExamExercises.length
        : exerciseMode === 'finaltest'
        ? finalTestQueue.hasMoreItems() &&
          !finalTestQueue.shouldShowReviewMode()
        : exerciseMode === 'perfect'
        ? perfectTenseQueue.hasMoreItems()
        : exerciseMode === 'imperfectum'
        ? imperfectumQueue.hasMoreItems()
        : exerciseMode === 'modalverbs'
        ? modalVerbsQueue.hasMoreItems()
        : exerciseMode === 'conjunctions'
        ? conjunctionsQueue.hasMoreItems()
        : exerciseQueue.hasMoreItems();

    if (progress.mistakeMode && correct) {
      const currentId =
        currentWord?.id ||
        currentPerfectTenseWord?.id ||
        currentImperfectumWord?.id ||
        currentModalVerb?.id ||
        currentConjunction?.id ||
        currentFinalTestItem?.id;
      if (currentId) {
        const remainingIncorrectWords = Object.keys(
          memoizedIncorrectWords,
        ).filter((id) => id !== currentId);

        if (remainingIncorrectWords.length === 0) {
          setShowResults(true);
          clearExerciseSession(); // Clear session when exercise is complete
          return;
        }
      }
    }

    if (!hasMoreExercises) {
      setShowResults(true);
      clearExerciseSession(); // Clear session when exercise is complete
    } else {
      // Save session state after each question
      saveCurrentSession();
    }
  };

  const resetExercises = () => {
    setShowResults(false);
    exerciseActions.resetSessionScore(exerciseMode);
    clearExerciseSession(); // Clear session when resetting

    // Reset completion states
    setFinalTestSessionCompleted(false);

    // Reset exam exercise state for finaltest modes with exam- prefix
    if (exerciseMode === 'finaltest' && finalTestMode.startsWith('exam-')) {
      setCurrentExamExerciseIndex(0);
      setCompletedExamExercises(new Set());
      setExamExerciseSessionCompleted(false);
    } else if (exerciseMode === 'test1') {
      const exercises = createTestExercises();
      test1ExerciseQueue.initializeTestQueue(exercises, 0);
    } else if (exerciseMode === 'test2') {
      const exercises = createTestExercises2();
      test2ExerciseQueue.initializeTestQueue(exercises, 0);
    } else if (exerciseMode === 'perfect') {
      const incorrectWordIds: Record<string, number> = {};
      Object.entries(memoizedIncorrectWords).forEach(([id, data]) => {
        incorrectWordIds[id] = data.count;
      });

      if (progress.mistakeMode) {
        const perfectTenseIds = new Set(
          perfectTenseVocabulary.map((w) => w.id),
        );
        const filteredIncorrectWords: Record<string, number> = {};
        Object.entries(incorrectWordIds).forEach(([id, count]) => {
          if (perfectTenseIds.has(id)) {
            filteredIncorrectWords[id] = count;
          }
        });
        perfectTenseQueue.initializeQueue(filteredIncorrectWords, 0);
      } else {
        perfectTenseQueue.initializeQueue(incorrectWordIds, 0);
      }
    } else if (exerciseMode === 'imperfectum') {
      const incorrectWordIds: Record<string, number> = {};
      Object.entries(memoizedIncorrectWords).forEach(([id, data]) => {
        incorrectWordIds[id] = data.count;
      });

      if (progress.mistakeMode) {
        const imperfectumIds = new Set(imperfectumVocabulary.map((w) => w.id));
        const filteredIncorrectWords: Record<string, number> = {};
        Object.entries(incorrectWordIds).forEach(([id, count]) => {
          if (imperfectumIds.has(id)) {
            filteredIncorrectWords[id] = count;
          }
        });
        imperfectumQueue.initializeQueue(filteredIncorrectWords, 0);
      } else {
        imperfectumQueue.initializeQueue(incorrectWordIds, 0);
      }
    } else if (exerciseMode === 'modalverbs') {
      // Modal verbs should ALWAYS be available
      modalVerbsQueue.initializeQueue({}, 0);
    } else {
      exerciseQueue.initializeQueue(availableWords, memoizedIncorrectWords, 0);
    }
  };

  // Helper function to determine if a category is relevant for the current final test mode
  const isCategoryRelevantForMode = (
    category: string,
    mode: string,
  ): boolean => {
    // All exam modes use exam exercises with their own categories, not vocabulary categories
    if (mode.startsWith('exam-')) {
      // For exam modes, vocabulary categories are irrelevant since exam exercises
      // have their own category system (Perfect Tense, Imperfect Tense, etc.)
      // Only "All Categories" remains relevant for filtering
      return category === 'All Categories';
    }

    if (mode === 'article') {
      // Article mode should only show categories with nouns
      const nounCategories = [
        'Nouns',
        'Substantieven',
        'House',
        'Body Parts',
        'Food',
        'Transportation',
        'Professions',
        'Themed Vocabulary',
      ];
      return category === 'All Categories' || nounCategories.includes(category);
    }

    if (mode === 'conjugation') {
      // Conjugation mode should only show categories with verbs
      const verbCategories = [
        'Irregular Verbs',
        'Onregelmatige verba',
        'Regular Verbs',
        'Regelmatige verba',
        'Reflexive Verbs',
        'Reflexief',
        'Modal Verbs',
      ];
      return category === 'All Categories' || verbCategories.includes(category);
    }

    // For other vocabulary modes (translate, reverse, mixed), all categories are relevant
    return true;
  };

  const startNewSession = (
    mode:
      | 'vocabulary'
      | 'articles'
      | 'plural'
      | 'perfect'
      | 'imperfectum'
      | 'modalverbs'
      | 'conjunctions'
      | 'test1'
      | 'test2'
      | 'finaltest',
  ) => {
    // Check if we're continuing an existing session for this mode
    const isContinuingSession =
      exerciseSession.exerciseMode === mode &&
      exerciseSession.currentIndex > 0 &&
      !showResults;

    setExerciseMode(mode);

    // Show helpful guidance for chapter-based exercises
    if (
      exerciseHelpers.requiresChapter(mode) &&
      progress.currentChapter === 0
    ) {
      toast({
        title: `${exerciseHelpers.getExerciseConfig(mode).name} Selected`,
        description: 'Please select a chapter first to start practicing.',
        duration: 4000,
      });
    }

    if (!isContinuingSession) {
      // Starting a fresh session
      resetExercises();
      exerciseActions.resetSessionScore(mode);
    } else {
      // Continuing existing session - restore session score
      // For now, keep scores separate per mode - no restoration needed
    }
    setHasStartedLearning(true);

    // For modal verbs, ensure immediate initialization
    if (mode === 'modalverbs') {
      // Initialize modal verbs immediately
      modalVerbsQueue.initializeQueue({}, 0);
    }

    // For conjunctions, ensure immediate initialization
    if (mode === 'conjunctions') {
      // Initialize conjunctions immediately
      conjunctionsQueue.initializeQueue({}, 0);
    }

    // For final test, ensure immediate initialization
    if (mode === 'finaltest') {
      // Reset exam exercise state for finaltest modes with exam- prefix
      if (finalTestMode.startsWith('exam-')) {
        setCurrentExamExerciseIndex(0);
        setCompletedExamExercises(new Set());
        setExamExerciseSessionCompleted(false);
      } else {
        // Initialize final test immediately with mode filtering
        const categoryItems =
          finalTestCategory === 'All Categories'
            ? finalTestVocabulary
            : finalTestVocabulary.filter(
                (item) => item.category === finalTestCategory,
              );

        // Filter by exercise mode
        const filteredItems = (() => {
          switch (finalTestMode) {
            case 'article':
              return categoryItems.filter(
                (item) => item.type === 'noun' && item.article,
              );
            case 'conjugation':
              return categoryItems.filter(
                (item) => item.type === 'verb' && item.conjugation,
              );
            case 'translate':
            case 'reverse':
            case 'mixed':
            default:
              return categoryItems;
          }
        })();

        finalTestQueue.initializeFinalTestQueue(
          filteredItems,
          finalTestCategory === 'All Categories'
            ? undefined
            : finalTestCategory,
          {},
          0,
        );
      }
    }

    // Save the session state
    const newSession = {
      exerciseMode: mode,
      currentIndex: isContinuingSession ? exerciseSession.currentIndex : 0,
      sessionScore: sessionScores[mode] || { correct: 0, total: 0 },
      perfectTenseMode,
      imperfectumMode,
      modalVerbsMode,
      selectedCategory,
      testReviewMode,
      hasStartedLearning: true,
    };
    saveExerciseSession(newSession);
  };

  const toggleTestReviewMode = (testType: 'test1' | 'test2') => {
    const newTestReviewMode = {
      ...testReviewMode,
      [testType]: !testReviewMode[testType],
    };
    setTestReviewMode(newTestReviewMode);

    // Reset the session when toggling review mode
    setShowResults(false);
    exerciseActions.resetSessionScore(testType);

    // Save the updated session
    saveExerciseSession({
      exerciseMode,
      currentIndex: 0,
      sessionScore: sessionScores[testType] || { correct: 0, total: 0 },
      perfectTenseMode,
      imperfectumMode,
      modalVerbsMode,
      selectedCategory,
      testReviewMode: newTestReviewMode,
      hasStartedLearning,
    });
  };

  const toggleFinalTestReviewMode = () => {
    const newReviewMode = !finalTestReviewMode;
    setFinalTestReviewMode(newReviewMode);

    if (newReviewMode && finalTestQueue.shouldShowReviewMode()) {
      // Start review mode with incorrect items
      finalTestQueue.startReviewMode();
    } else {
      // Restart normal mode
      startNewSession('finaltest');
    }

    // Reset session state
    setShowResults(false);
    exerciseActions.resetSessionScore('finaltest');
  };

  const toggleFinalExamReviewMode = () => {
    const newReviewMode = !finalExamReviewMode;
    setFinalExamReviewMode(newReviewMode);

    // Reset the exam exercise session when toggling review mode
    setCurrentExamExerciseIndex(0);
    setCompletedExamExercises(new Set());
    setExamExerciseSessionCompleted(false);

    // Reset session state
    setShowResults(false);
    exerciseActions.resetSessionScore('finaltest');
  };

  const handleExamModeChange = (mode: string) => {
    setFinalTestMode(mode as any);
    setFinalExamReviewMode(false); // Always exit review mode when changing exam modes
    setCurrentExamExerciseIndex(0);
    setCompletedExamExercises(new Set());
    setExamExerciseSessionCompleted(false);
  };

  const getTestCompletionStatus = (testType: 'test1' | 'test2') => {
    const testProgress = getTestExerciseProgress(testType);
    const totalExercises =
      testType === 'test1'
        ? createTestExercises().length
        : createTestExercises2().length;
    const attemptedExercises = testProgress.completedExercises.size;
    const correctExercises = Object.values(testProgress.scores).filter(
      (score) => score === 1,
    ).length;

    return {
      total: totalExercises,
      attempted: attemptedExercises,
      correct: correctExercises,
      incorrect: Object.keys(testProgress.incorrectExercises).length,
      completionPercentage:
        totalExercises > 0 ? (attemptedExercises / totalExercises) * 100 : 0,
      accuracyPercentage:
        attemptedExercises > 0
          ? (correctExercises / attemptedExercises) * 100
          : 0,
    };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-dutch-blue-light to-indigo-100 font-inter">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8 flex flex-col items-center">
          <div className="flex items-center justify-center mb-4">
            {initial && color && (
              <Avatar className="mr-3">
                <AvatarFallback
                  style={{ backgroundColor: color, color: 'white' }}
                >
                  {initial}
                </AvatarFallback>
              </Avatar>
            )}
            <h1 className="text-4xl font-bold text-foreground font-nunito">
              Nederlands Leren
            </h1>
          </div>
          <p className="text-xl text-muted-foreground font-nunito">
            Interactive Dutch Language Learning Platform
          </p>
        </header>

        {!hasStartedLearning ? (
          <Card className="text-center py-12 px-6 max-w-2xl mx-auto bg-card shadow-lg">
            <CardHeader>
              <CardTitle className="text-3xl font-semibold text-foreground font-nunito">
                Welkom bij Nederlands Leren!
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {exerciseSession.exerciseMode &&
                exerciseSession.currentIndex > 0 && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                    <div className="flex items-center space-x-2">
                      <RotateCcw className="h-5 w-5 text-blue-600" />
                      <span className="font-medium text-blue-800">
                        Session Found!
                      </span>
                    </div>
                    <p className="text-sm text-blue-700 mt-2">
                      We found your previous {exerciseSession.exerciseMode}{' '}
                      session with {exerciseSession.currentIndex} questions
                      completed. Click on "
                      {exerciseSession.exerciseMode.charAt(0).toUpperCase() +
                        exerciseSession.exerciseMode.slice(1)}
                      " below to continue where you left off.
                    </p>
                  </div>
                )}
              <p className="text-lg text-foreground">
                Ready to dive into Dutch? This platform helps you learn
                vocabulary and master articles (de/het) through interactive
                exercises.
              </p>
              <p className="text-md text-muted-foreground">
                Start with "Vocabulary" to learn new words, challenge yourself
                with "Articles" to get the de/het right, master "Perfect Tense"
                to learn the perfectum, practice "Imperfectum" for past tense
                (A1/A2), learn "Modal Verbs" (essential Dutch verbs like kunnen,
                mogen, moeten, willen, zullen - available at any level), master
                "Conjunctions", take the comprehensive "Final Test" covering all
                categories, or prepare for your test with "Test Prep"! You can
                also browse vocabulary by chapter.
              </p>
              <div className="space-y-4">
                {/* First row - Primary actions */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  <Button
                    size="default"
                    onClick={() => startNewSession('vocabulary')}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground w-full"
                  >
                    <Play className="h-5 w-5 mr-2" />
                    Vocabulary
                  </Button>
                  <Button
                    size="default"
                    variant="outline"
                    onClick={() => startNewSession('articles')}
                    className="border-primary text-primary hover:bg-primary/10 w-full"
                  >
                    <Play className="h-5 w-5 mr-2" />
                    Articles
                  </Button>
                  <Button
                    size="default"
                    variant="outline"
                    onClick={() => startNewSession('plural')}
                    className="border-primary text-primary hover:bg-primary/10 w-full"
                  >
                    <Play className="h-5 w-5 mr-2" />
                    Plural
                  </Button>
                </div>

                {/* Second row - Advanced features */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  <Button
                    size="default"
                    variant="outline"
                    onClick={() => startNewSession('perfect')}
                    className="border-primary text-primary hover:bg-primary/10 w-full"
                  >
                    <Clock className="h-5 w-5 mr-2" />
                    Perfect Tense
                  </Button>
                  <Button
                    size="default"
                    variant="outline"
                    onClick={() => startNewSession('imperfectum')}
                    className="border-primary text-primary hover:bg-primary/10 w-full"
                  >
                    <Clock className="h-5 w-5 mr-2" />
                    Imperfectum
                  </Button>
                  <Button
                    size="default"
                    variant="outline"
                    onClick={() => startNewSession('modalverbs')}
                    className="border-primary text-primary hover:bg-primary/10 w-full"
                    title="Modal verbs are always available - not tied to any specific chapter"
                  >
                    <Brain className="h-5 w-5 mr-2" />
                    Modal Verbs
                  </Button>
                  <Button
                    size="default"
                    variant="outline"
                    onClick={() => startNewSession('conjunctions')}
                    className="border-primary text-primary hover:bg-primary/10 w-full"
                    title="Learn conjunctions (A1-A2 level) - not tied to any specific chapter"
                  >
                    <BookOpen className="h-5 w-5 mr-2" />
                    Conjunctions
                  </Button>
                </div>

                {/* Third row - Test options */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <Button
                    size="default"
                    variant="outline"
                    onClick={() => startNewSession('finaltest')}
                    className="border-purple-300 text-purple-700 hover:bg-purple-50 w-full"
                    title="Comprehensive final test covering all vocabulary categories"
                  >
                    <GraduationCap className="h-5 w-5 mr-2" />
                    Final Test
                  </Button>
                  <Button
                    size="default"
                    variant="outline"
                    onClick={() => startNewSession('test1')}
                    className="border-primary text-primary hover:bg-primary/10 w-full"
                  >
                    <GraduationCap className="h-5 w-5 mr-2" />
                    Test 1 (Basic)
                  </Button>
                  <Button
                    size="default"
                    variant="outline"
                    onClick={() => startNewSession('test2')}
                    className="border-secondary text-secondary hover:bg-secondary/10 w-full"
                  >
                    <GraduationCap className="h-5 w-5 mr-2" />
                    Test 2 (Advanced)
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          <>
            <EnhancedProgressDashboard
              stats={dashboardStats}
              onExerciseSelect={(mode) => {
                // Handle exercise selection
                const validModes = [
                  'test1',
                  'test2',
                  'vocabulary',
                  'articles',
                  'plural',
                  'perfect',
                  'imperfectum',
                  'modalverbs',
                  'conjunctions',
                  'finaltest',
                ];
                if (validModes.includes(mode)) {
                  setExerciseMode(mode as any);
                  startNewSession(mode as any);
                }
              }}
              currentMode={exerciseMode}
            />

            <CollapsibleTabs
              defaultValue="practice"
              defaultExpanded={false}
              tabsData={[
                {
                  value: 'practice',
                  label: 'Practice',
                  icon: <Brain className="h-4 w-4" />,
                },
                {
                  value: 'vocabulary',
                  label: 'Vocabulary',
                  icon: <BookOpen className="h-4 w-4" />,
                },
                {
                  value: 'finaltest',
                  label: 'Final Test',
                  icon: <GraduationCap className="h-4 w-4" />,
                },
                {
                  value: 'chapters',
                  label: 'Chapters',
                  icon: <Target className="h-4 w-4" />,
                },
              ]}
              className="space-y-6"
            >
              <TabsContent value="practice" className="space-y-6">
                {progress.mistakeMode && (
                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Target className="h-5 w-5 text-orange-600" />
                        <span className="font-medium text-orange-800">
                          Mistake Review Mode
                        </span>
                      </div>
                      <span className="text-sm text-orange-600">
                        {(() => {
                          const incorrectWordIds = Object.keys(
                            memoizedIncorrectWords,
                          );
                          if (exerciseMode === 'perfect') {
                            const perfectTenseIds = new Set(
                              perfectTenseVocabulary.map((w) => w.id),
                            );
                            const perfectIncorrectCount =
                              incorrectWordIds.filter((id) =>
                                perfectTenseIds.has(id),
                              ).length;
                            return `${perfectIncorrectCount} perfect tense words to review`;
                          } else if (exerciseMode === 'imperfectum') {
                            const imperfectumIds = new Set(
                              imperfectumVocabulary.map((w) => w.id),
                            );
                            const imperfectumIncorrectCount =
                              incorrectWordIds.filter((id) =>
                                imperfectumIds.has(id),
                              ).length;
                            return `${imperfectumIncorrectCount} imperfectum words to review`;
                          } else if (exerciseMode === 'modalverbs') {
                            const modalVerbIds = new Set(
                              modalVerbs.map((w) => w.id),
                            );
                            const modalVerbIncorrectCount =
                              incorrectWordIds.filter((id) =>
                                modalVerbIds.has(id),
                              ).length;
                            return `${modalVerbIncorrectCount} modal verbs to review`;
                          } else {
                            return `${incorrectWordIds.length} words to review`;
                          }
                        })()}
                      </span>
                    </div>
                    <p className="text-sm text-orange-700 mt-2">
                      Practicing words you've answered incorrectly before. Get
                      them right to remove them from review!
                    </p>
                  </div>
                )}
                {!showResults ? (
                  <div className="space-y-6">
                    {/* Collapsible Exercise Selection */}
                    <CollapsibleExerciseSelector
                      currentMode={exerciseMode}
                      onModeSelect={(mode) => startNewSession(mode as any)}
                      canStartMode={(mode) =>
                        exerciseHelpers.canStartExercise(
                          mode,
                          progress.currentChapter,
                        )
                      }
                      exerciseMode={exerciseMode}
                      testReviewMode={testReviewMode}
                      onToggleTestReviewMode={toggleTestReviewMode}
                      getTestExerciseProgress={getTestExerciseProgress}
                      perfectTenseMode={perfectTenseMode}
                      onSetPerfectTenseMode={setPerfectTenseMode}
                      imperfectumMode={imperfectumMode}
                      onSetImperfectumMode={setImperfectumMode}
                      modalVerbsMode={modalVerbsMode}
                      onSetModalVerbsMode={setModalVerbsMode}
                      conjunctionsMode={conjunctionsMode}
                      onSetConjunctionsMode={setConjunctionsMode}
                      selectedCategory={selectedCategory}
                      onSetSelectedCategory={setSelectedCategory}
                      availableCategories={availableCategories}
                      finalTestMode={finalTestMode}
                      onSetFinalTestMode={setFinalTestMode}
                      finalTestCategory={finalTestCategory}
                      onSetFinalTestCategory={setFinalTestCategory}
                      finalTestCategories={finalTestCategories}
                      finalTestReviewMode={finalTestReviewMode}
                      onSetFinalTestReviewMode={setFinalTestReviewMode}
                      finalExamReviewMode={finalExamReviewMode}
                      onToggleFinalExamReviewMode={toggleFinalExamReviewMode}
                      handleExamModeChange={handleExamModeChange}
                      isCategoryRelevantForMode={isCategoryRelevantForMode}
                      memoizedIncorrectWords={memoizedIncorrectWords}
                      progress={progress}
                      defaultExpanded={false}
                    />

                    {(exerciseMode !== 'test1' &&
                      exerciseMode !== 'test2' &&
                      exerciseMode !== 'perfect' &&
                      exerciseMode !== 'imperfectum' &&
                      exerciseMode !== 'modalverbs' &&
                      exerciseMode !== 'conjunctions' &&
                      exerciseMode !== 'finaltest' &&
                      availableWords.length > 0 &&
                      currentWord) ||
                    (exerciseMode === 'test1' && currentTest1Exercise) ||
                    (exerciseMode === 'test2' && currentTest2Exercise) ||
                    (exerciseMode === 'finaltest' && currentFinalTestItem) ||
                    (exerciseMode === 'perfect' && currentPerfectTenseWord) ||
                    (exerciseMode === 'imperfectum' &&
                      currentImperfectumWord) ||
                    exerciseMode === 'modalverbs' ||
                    exerciseMode === 'conjunctions' ? (
                      <div className="space-y-4">
                        <div className="text-center">
                          <p className="text-sm text-muted-foreground">
                            Question{' '}
                            {exerciseMode === 'test1'
                              ? test1ExerciseQueue.getTestProgress().current + 1
                              : exerciseMode === 'test2'
                              ? test2ExerciseQueue.getTestProgress().current + 1
                              : exerciseMode === 'perfect'
                              ? perfectTenseQueue.getProgress().current + 1
                              : exerciseMode === 'imperfectum'
                              ? imperfectumQueue.getProgress().current + 1
                              : exerciseMode === 'modalverbs'
                              ? modalVerbsQueue.getProgress().current + 1
                              : exerciseMode === 'conjunctions'
                              ? conjunctionsQueue.getProgress().current + 1
                              : exerciseMode === 'finaltest'
                              ? (() => {
                                  // Check if we're in exam mode
                                  if (
                                    [
                                      'exam-perfect',
                                      'exam-imperfect',
                                      'exam-separable',
                                      'exam-conjunctions',
                                      'exam-multiple-choice',
                                      'exam-writing',
                                      'exam-mixed',
                                    ].includes(finalTestMode)
                                  ) {
                                    return (
                                      getExamExerciseProgress().current + 1
                                    );
                                  }
                                  return (
                                    finalTestQueue.getProgress().current + 1
                                  );
                                })()
                              : exerciseQueue.getProgress().current + 1}{' '}
                            of{' '}
                            {exerciseMode === 'test1'
                              ? test1ExerciseQueue.getTestProgress().total
                              : exerciseMode === 'test2'
                              ? test2ExerciseQueue.getTestProgress().total
                              : exerciseMode === 'perfect'
                              ? perfectTenseQueue.getProgress().total
                              : exerciseMode === 'imperfectum'
                              ? imperfectumQueue.getProgress().total
                              : exerciseMode === 'modalverbs'
                              ? modalVerbsQueue.getProgress().total
                              : exerciseMode === 'conjunctions'
                              ? conjunctionsQueue.getProgress().total
                              : exerciseMode === 'finaltest'
                              ? (() => {
                                  // Check if we're in exam mode
                                  if (
                                    [
                                      'exam-perfect',
                                      'exam-imperfect',
                                      'exam-separable',
                                      'exam-conjunctions',
                                      'exam-multiple-choice',
                                      'exam-writing',
                                      'exam-mixed',
                                    ].includes(finalTestMode)
                                  ) {
                                    return getExamExerciseProgress().total;
                                  }
                                  return finalTestQueue.getProgress().total;
                                })()
                              : exerciseQueue.getProgress().total}
                          </p>
                          {/* Review Mode Indicator */}
                          {(((exerciseMode === 'test1' &&
                            testReviewMode.test1) ||
                            (exerciseMode === 'test2' &&
                              testReviewMode.test2)) && (
                            <Badge variant="secondary" className="mt-2">
                              Review Mode: Practicing Incorrect Answers
                            </Badge>
                          )) ||
                            (exerciseMode === 'finaltest' &&
                              finalTestReviewMode && (
                                <Badge variant="secondary" className="mt-2">
                                  Review Mode: Practicing Mistakes
                                </Badge>
                              ))}
                          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                            <div
                              className="bg-primary h-2 rounded-full transition-all duration-300"
                              style={{
                                width: `${
                                  exerciseMode === 'test1'
                                    ? test1ExerciseQueue.getTestProgress()
                                        .percentage
                                    : exerciseMode === 'test2'
                                    ? test2ExerciseQueue.getTestProgress()
                                        .percentage
                                    : exerciseMode === 'perfect'
                                    ? (perfectTenseQueue.getProgress().current /
                                        perfectTenseQueue.getProgress().total) *
                                      100
                                    : exerciseMode === 'imperfectum'
                                    ? (imperfectumQueue.getProgress().current /
                                        imperfectumQueue.getProgress().total) *
                                      100
                                    : exerciseMode === 'modalverbs'
                                    ? (modalVerbsQueue.getProgress().current /
                                        modalVerbsQueue.getProgress().total) *
                                      100
                                    : exerciseMode === 'conjunctions'
                                    ? (conjunctionsQueue.getProgress().current /
                                        conjunctionsQueue.getProgress().total) *
                                      100
                                    : exerciseMode === 'finaltest'
                                    ? (() => {
                                        // Check if we're in exam mode
                                        if (
                                          [
                                            'exam-perfect',
                                            'exam-imperfect',
                                            'exam-separable',
                                            'exam-conjunctions',
                                            'exam-multiple-choice',
                                            'exam-writing',
                                            'exam-mixed',
                                          ].includes(finalTestMode)
                                        ) {
                                          const examProgress =
                                            getExamExerciseProgress();
                                          return examProgress.total > 0
                                            ? (examProgress.current /
                                                examProgress.total) *
                                                100
                                            : 0;
                                        }
                                        return finalTestQueue.getProgress()
                                          .percentage;
                                      })()
                                    : exerciseQueue.getProgress().percentage
                                }%`,
                              }}
                            />
                          </div>
                        </div>

                        {exerciseMode === 'test1' && currentTest1Exercise ? (
                          <TestExerciseCard
                            exercise={currentTest1Exercise}
                            onComplete={handleExerciseComplete}
                          />
                        ) : exerciseMode === 'test2' && currentTest2Exercise ? (
                          <TestExerciseCard
                            exercise={currentTest2Exercise}
                            onComplete={handleExerciseComplete}
                          />
                        ) : exerciseMode === 'perfect' &&
                          currentPerfectTenseWord ? (
                          <PerfectTenseExercise
                            word={currentPerfectTenseWord}
                            mode={perfectTenseMode}
                            onComplete={handleExerciseComplete}
                          />
                        ) : exerciseMode === 'perfect' && false ? (
                          <Card className="text-center py-8">
                            <CardContent>
                              <div className="space-y-4">
                                <div className="bg-blue-50 p-6 rounded-lg border-2 border-blue-200">
                                  <h3 className="text-xl font-bold text-blue-800 mb-2">
                                    🎉 Perfect Tense Complete!
                                  </h3>
                                  <p className="text-blue-700 mb-4">
                                    You've completed all Perfect Tense
                                    exercises! Great job mastering Dutch perfect
                                    tense.
                                  </p>
                                  <div className="space-y-2">
                                    <Button
                                      onClick={() => {
                                        perfectTenseQueue.resetQueue();
                                        perfectTenseQueue.initializeQueue({});
                                        startNewSession('perfect');
                                      }}
                                      className="bg-blue-600 text-white hover:bg-blue-700 mr-2"
                                    >
                                      Practice Again
                                    </Button>
                                    <Button
                                      variant="outline"
                                      onClick={() =>
                                        startNewSession('vocabulary')
                                      }
                                      className="text-blue-700 border-blue-300 hover:bg-blue-50"
                                    >
                                      Try Different Exercise
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ) : exerciseMode === 'imperfectum' &&
                          currentImperfectumWord ? (
                          <ImperfectumExercise
                            word={currentImperfectumWord}
                            mode={imperfectumMode}
                            onComplete={handleExerciseComplete}
                          />
                        ) : exerciseMode === 'imperfectum' && false ? (
                          <Card className="text-center py-8">
                            <CardContent>
                              <div className="space-y-4">
                                <div className="bg-purple-50 p-6 rounded-lg border-2 border-purple-200">
                                  <h3 className="text-xl font-bold text-purple-800 mb-2">
                                    🎉 Imperfect Tense Complete!
                                  </h3>
                                  <p className="text-purple-700 mb-4">
                                    You've completed all Imperfect Tense
                                    exercises! Well done mastering Dutch
                                    imperfect tense.
                                  </p>
                                  <div className="space-y-2">
                                    <Button
                                      onClick={() => {
                                        imperfectumQueue.resetQueue();
                                        imperfectumQueue.initializeQueue({});
                                        startNewSession('imperfectum');
                                      }}
                                      className="bg-purple-600 text-white hover:bg-purple-700 mr-2"
                                    >
                                      Practice Again
                                    </Button>
                                    <Button
                                      variant="outline"
                                      onClick={() =>
                                        startNewSession('vocabulary')
                                      }
                                      className="text-purple-700 border-purple-300 hover:bg-purple-50"
                                    >
                                      Try Different Exercise
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ) : exerciseMode === 'modalverbs' ? (
                          currentModalVerb ? (
                            <ModalVerbsExercise
                              word={currentModalVerb}
                              mode={modalVerbsMode}
                              onComplete={handleExerciseComplete}
                            />
                          ) : false ? (
                            <Card className="text-center py-8">
                              <CardContent>
                                <div className="space-y-4">
                                  <div className="bg-green-50 p-6 rounded-lg border-2 border-green-200">
                                    <h3 className="text-xl font-bold text-green-800 mb-2">
                                      🎉 Modal Verbs Complete!
                                    </h3>
                                    <p className="text-green-700 mb-4">
                                      You've completed all Modal Verbs
                                      exercises! Excellent work mastering Dutch
                                      modal verbs.
                                    </p>
                                    <div className="space-y-2">
                                      <Button
                                        onClick={() => {
                                          modalVerbsQueue.resetQueue();
                                          modalVerbsQueue.initializeQueue({});
                                          startNewSession('modalverbs');
                                        }}
                                        className="bg-green-600 text-white hover:bg-green-700 mr-2"
                                      >
                                        Practice Again
                                      </Button>
                                      <Button
                                        variant="outline"
                                        onClick={() =>
                                          startNewSession('vocabulary')
                                        }
                                        className="text-green-700 border-green-300 hover:bg-green-50"
                                      >
                                        Try Different Exercise
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ) : (
                            <Card className="text-center py-8">
                              <CardContent>
                                <p className="text-lg text-muted-foreground">
                                  Loading modal verbs exercises...
                                </p>
                              </CardContent>
                            </Card>
                          )
                        ) : exerciseMode === 'conjunctions' ? (
                          currentConjunction ? (
                            <ConjunctionsExercise
                              conjunction={currentConjunction}
                              mode={conjunctionsMode}
                              onComplete={handleExerciseComplete}
                            />
                          ) : false ? (
                            <Card className="text-center py-8">
                              <CardContent>
                                <div className="space-y-4">
                                  <div className="bg-orange-50 p-6 rounded-lg border-2 border-orange-200">
                                    <h3 className="text-xl font-bold text-orange-800 mb-2">
                                      🎉 Conjunctions Complete!
                                    </h3>
                                    <p className="text-orange-700 mb-4">
                                      You've completed all Conjunctions
                                      exercises! Great job mastering Dutch
                                      conjunctions.
                                    </p>
                                    <div className="space-y-2">
                                      <Button
                                        onClick={() => {
                                          conjunctionsQueue.resetQueue();
                                          conjunctionsQueue.initializeQueue({});
                                          startNewSession('conjunctions');
                                        }}
                                        className="bg-orange-600 text-white hover:bg-orange-700 mr-2"
                                      >
                                        Practice Again
                                      </Button>
                                      <Button
                                        variant="outline"
                                        onClick={() =>
                                          startNewSession('vocabulary')
                                        }
                                        className="text-orange-700 border-orange-300 hover:bg-orange-50"
                                      >
                                        Try Different Exercise
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ) : (
                            <Card className="text-center py-8">
                              <CardContent>
                                <p className="text-lg text-muted-foreground">
                                  Loading conjunctions exercises...
                                </p>
                              </CardContent>
                            </Card>
                          )
                        ) : exerciseMode === 'finaltest' ? (
                          [
                            'exam-perfect',
                            'exam-imperfect',
                            'exam-separable',
                            'exam-conjunctions',
                            'exam-multiple-choice',
                            'exam-writing',
                            'exam-mixed',
                          ].includes(finalTestMode) ? (
                            <>
                              {finalExamReviewMode && (
                                <Card className="mb-4">
                                  <CardContent className="py-4">
                                    <div className="flex items-center justify-between">
                                      <div className="flex items-center space-x-2">
                                        <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                                        <span className="font-medium text-orange-700">
                                          Review Mode: Practicing Mistakes
                                        </span>
                                      </div>
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => {
                                          setFinalExamReviewMode(false);
                                          setCurrentExamExerciseIndex(0);
                                          setCompletedExamExercises(new Set());
                                          setExamExerciseSessionCompleted(
                                            false,
                                          );
                                        }}
                                        className="text-orange-700 border-orange-300 hover:bg-orange-50"
                                      >
                                        Exit Review Mode
                                      </Button>
                                    </div>
                                  </CardContent>
                                </Card>
                              )}
                              {currentExamExercise ? (
                                <ExamExerciseCard
                                  exercise={currentExamExercise}
                                  onComplete={handleExerciseComplete}
                                />
                              ) : examExerciseSessionCompleted ? (
                                <Card className="text-center py-8">
                                  <CardContent>
                                    <div className="space-y-4">
                                      <div className="bg-green-50 p-6 rounded-lg border-2 border-green-200">
                                        <h3 className="text-xl font-bold text-green-800 mb-2">
                                          🎉 Section Complete!
                                        </h3>
                                        <p className="text-green-700 mb-4">
                                          You've completed all{' '}
                                          {getExamExerciseProgress().total}{' '}
                                          exercises in this{' '}
                                          {finalTestMode
                                            .replace('exam-', '')
                                            .replace('-', ' ')}{' '}
                                          section!
                                        </p>
                                        <div className="space-y-2">
                                          <Button
                                            onClick={() => {
                                              setCurrentExamExerciseIndex(0);
                                              setCompletedExamExercises(
                                                new Set(),
                                              );
                                              setExamExerciseSessionCompleted(
                                                false,
                                              );
                                              // Reset session scores for exam exercises
                                              exerciseActions.resetSessionScore(
                                                'finaltest',
                                              );
                                            }}
                                            className="bg-green-600 text-white hover:bg-green-700 mr-2"
                                          >
                                            Practice Again
                                          </Button>
                                          {progress.finalExamProgress
                                            ?.incorrectExercises &&
                                            Object.keys(
                                              progress.finalExamProgress
                                                .incorrectExercises,
                                            ).length > 0 && (
                                              <Button
                                                onClick={() => {
                                                  setFinalExamReviewMode(true);
                                                  setExamExerciseSessionCompleted(
                                                    false,
                                                  );
                                                  setCurrentExamExerciseIndex(
                                                    0,
                                                  );
                                                  setCompletedExamExercises(
                                                    new Set(),
                                                  );
                                                }}
                                                className="bg-orange-600 text-white hover:bg-orange-700 mr-2"
                                              >
                                                Review Mistakes (
                                                {
                                                  Object.keys(
                                                    progress.finalExamProgress
                                                      .incorrectExercises,
                                                  ).length
                                                }
                                                )
                                              </Button>
                                            )}
                                          <Button
                                            variant="outline"
                                            onClick={() =>
                                              setFinalTestMode('mixed')
                                            }
                                            className="text-green-700 border-green-300 hover:bg-green-50"
                                          >
                                            Try Different Section
                                          </Button>
                                        </div>
                                      </div>
                                    </div>
                                  </CardContent>
                                </Card>
                              ) : (
                                <Card className="text-center py-8">
                                  <CardContent>
                                    <p className="text-lg text-muted-foreground">
                                      Loading exam exercises...
                                    </p>
                                  </CardContent>
                                </Card>
                              )}
                            </>
                          ) : finalTestSessionCompleted ? (
                            <Card className="text-center py-8">
                              <CardContent>
                                <div className="space-y-4">
                                  <div className="bg-green-50 p-6 rounded-lg border-2 border-green-200">
                                    <h3 className="text-xl font-bold text-green-800 mb-2">
                                      🎉 Final Test Complete!
                                    </h3>
                                    <p className="text-green-700 mb-4">
                                      You've completed all{' '}
                                      {finalTestCompletionData.totalExercises}{' '}
                                      exercises in {finalTestMode} mode
                                      {finalTestCategory !== 'All Categories'
                                        ? ` for ${finalTestCategory}`
                                        : ''}
                                      !
                                    </p>
                                    <div className="space-y-2">
                                      <Button
                                        onClick={() => {
                                          setFinalTestSessionCompleted(false);
                                          exerciseActions.resetSessionScore(
                                            'finaltest',
                                          );
                                          // This will trigger the useEffect to reinitialize the queue
                                        }}
                                        className="bg-green-600 text-white hover:bg-green-700 mr-2"
                                      >
                                        Practice Again
                                      </Button>
                                      {finalTestCompletionData.incorrectCount >
                                        0 && (
                                        <Button
                                          onClick={() => {
                                            setFinalTestReviewMode(true);
                                            setFinalTestSessionCompleted(false);
                                          }}
                                          className="bg-orange-600 text-white hover:bg-orange-700 mr-2"
                                        >
                                          Review Mistakes (
                                          {
                                            finalTestCompletionData.incorrectCount
                                          }
                                          )
                                        </Button>
                                      )}
                                      <Button
                                        variant="outline"
                                        onClick={() =>
                                          setFinalTestMode('mixed')
                                        }
                                        className="text-green-700 border-green-300 hover:bg-green-50"
                                      >
                                        Try Different Mode
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ) : currentFinalTestItem ? (
                            <FinalTestExercise
                              item={currentFinalTestItem}
                              exerciseMode={finalTestMode}
                              onComplete={handleExerciseComplete}
                            />
                          ) : (
                            <Card className="text-center py-8">
                              <CardContent>
                                <p className="text-lg text-muted-foreground">
                                  Loading final test exercises...
                                </p>
                              </CardContent>
                            </Card>
                          )
                        ) : exerciseMode === 'vocabulary' && currentWord ? (
                          <VocabularyCard
                            word={currentWord}
                            mode="production"
                            onComplete={handleExerciseComplete}
                          />
                        ) : exerciseMode === 'articles' && currentWord ? (
                          <ArticleExercise
                            word={currentWord}
                            onComplete={handleExerciseComplete}
                          />
                        ) : currentWord ? (
                          <PluralExercise
                            word={currentWord}
                            onComplete={handleExerciseComplete}
                          />
                        ) : null}
                      </div>
                    ) : (
                      <Card className="text-center py-8 bg-card shadow-sm">
                        <CardContent>
                          {progress.mistakeMode ? (
                            <div className="space-y-4">
                              <div className="text-6xl">
                                <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
                              </div>
                              <p className="text-xl font-semibold text-foreground">
                                Great job!
                              </p>
                              <p className="text-lg text-muted-foreground">
                                No words to review - you've mastered all your
                                previous mistakes!
                              </p>
                              <Button
                                onClick={toggleMistakeMode}
                                className="mt-4"
                              >
                                Return to Normal Practice
                              </Button>
                            </div>
                          ) : (
                            <p className="text-lg text-muted-foreground">
                              No exercises available for this mode or category
                              in the current chapter. Try selecting a different
                              chapter or category.
                            </p>
                          )}
                        </CardContent>
                      </Card>
                    )}
                  </div>
                ) : (
                  <Card className="text-center py-8 bg-card shadow-sm">
                    <CardHeader>
                      <CardTitle className="text-2xl font-nunito">
                        Session Complete!
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="text-4xl font-bold text-primary">
                        {sessionScores[exerciseMode]?.total > 0
                          ? Math.round(
                              (sessionScores[exerciseMode].correct /
                                sessionScores[exerciseMode].total) *
                                100,
                            )
                          : 0}
                        %
                      </div>
                      <p className="text-lg text-muted-foreground">
                        You got {sessionScores[exerciseMode]?.correct || 0} out
                        of {sessionScores[exerciseMode]?.total || 0} questions
                        correct!
                      </p>

                      {/* Enhanced Test Statistics */}
                      {(exerciseMode === 'test1' ||
                        exerciseMode === 'test2') && (
                        <div className="mt-6 space-y-4">
                          <div className="grid gap-4 md:grid-cols-3">
                            <div className="bg-gray-50 p-4 rounded-lg">
                              <h4 className="font-semibold text-sm text-gray-600">
                                Overall Progress
                              </h4>
                              <p className="text-2xl font-bold text-gray-800">
                                {getTestCompletionStatus(
                                  exerciseMode,
                                ).completionPercentage.toFixed(1)}
                                %
                              </p>
                              <p className="text-xs text-gray-500">
                                {
                                  getTestCompletionStatus(exerciseMode)
                                    .attempted
                                }{' '}
                                of {getTestCompletionStatus(exerciseMode).total}{' '}
                                exercises
                              </p>
                            </div>
                            <div className="bg-green-50 p-4 rounded-lg">
                              <h4 className="font-semibold text-sm text-green-600">
                                Accuracy Rate
                              </h4>
                              <p className="text-2xl font-bold text-green-800">
                                {getTestCompletionStatus(
                                  exerciseMode,
                                ).accuracyPercentage.toFixed(1)}
                                %
                              </p>
                              <p className="text-xs text-green-500">
                                {getTestCompletionStatus(exerciseMode).correct}{' '}
                                correct answers
                              </p>
                            </div>
                            <div className="bg-orange-50 p-4 rounded-lg">
                              <h4 className="font-semibold text-sm text-orange-600">
                                Need Review
                              </h4>
                              <p className="text-2xl font-bold text-orange-800">
                                {
                                  getTestCompletionStatus(exerciseMode)
                                    .incorrect
                                }
                              </p>
                              <p className="text-xs text-orange-500">
                                exercises to practice
                              </p>
                            </div>
                          </div>

                          {getTestCompletionStatus(exerciseMode).incorrect >
                            0 && (
                            <div className="bg-blue-50 p-4 rounded-lg">
                              <p className="text-sm text-blue-800 mb-2">
                                <strong>Tip:</strong> Practice your incorrect
                                answers in Review Mode to improve your
                                understanding!
                              </p>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() =>
                                  toggleTestReviewMode(exerciseMode)
                                }
                                className="border-blue-300 text-blue-700 hover:bg-blue-100"
                              >
                                Start Review Mode
                              </Button>
                            </div>
                          )}
                        </div>
                      )}

                      <Button
                        onClick={resetExercises}
                        className="mt-4 bg-primary text-primary-foreground hover:bg-primary/90"
                      >
                        <RotateCcw className="h-4 w-4 mr-2" />
                        Practice Again
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="vocabulary" className="space-y-6">
                <Card className="bg-card shadow-sm">
                  <CardHeader>
                    <CardTitle className="font-nunito">
                      {progress.currentChapter === 0
                        ? 'All Vocabulary'
                        : `Chapter ${progress.currentChapter} Vocabulary`}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                      {currentChapterWords.length > 0 ? (
                        currentChapterWords.map((word) => (
                          <Card
                            key={word.id}
                            className={`${
                              progress.completedWords.has(word.id)
                                ? 'border-primary bg-dutch-blue-light'
                                : 'bg-background'
                            }`}
                          >
                            <CardContent className="p-4">
                              <div className="space-y-2">
                                <div className="flex justify-between items-start">
                                  <span className="font-semibold text-lg text-foreground">
                                    {Array.isArray(word.dutch)
                                      ? word.dutch.join(' / ')
                                      : word.dutch}
                                  </span>
                                  {word.article && (
                                    <Badge
                                      variant="secondary"
                                      className="bg-secondary text-secondary-foreground"
                                    >
                                      {word.article}
                                    </Badge>
                                  )}
                                  {word.plural && (
                                    <Badge
                                      variant="secondary"
                                      className="bg-secondary text-secondary-foreground"
                                    >
                                      Plural:{' '}
                                      {Array.isArray(word.plural)
                                        ? word.plural.join(' / ')
                                        : word.plural}
                                    </Badge>
                                  )}
                                </div>
                                <p className="text-muted-foreground">
                                  {Array.isArray(word.english)
                                    ? word.english.join(', ')
                                    : word.english}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  {word.section}
                                </p>
                              </div>
                            </CardContent>
                          </Card>
                        ))
                      ) : (
                        <p className="text-muted-foreground col-span-full">
                          No vocabulary found for this chapter.
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="finaltest" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2 font-nunito">
                      <GraduationCap className="h-5 w-5" />
                      <span>Final Test Dashboard</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <FinalTestProgressDashboard
                      progress={finalTestQueue.getProgress()}
                      incorrectItems={finalTestQueue.getIncorrectItems()}
                      currentCategory={finalTestQueue.currentCategory}
                      onResetProgress={() => {
                        setFinalTestReviewMode(false);
                        finalTestQueue.reset();
                      }}
                      onStartReview={() => {
                        setFinalTestReviewMode(true);
                        if (exerciseMode !== 'finaltest') {
                          startNewSession('finaltest');
                        }
                      }}
                      onCategorySelect={(category: string) => {
                        finalTestQueue.switchCategory(
                          finalTestVocabulary,
                          category,
                        );
                        if (exerciseMode !== 'finaltest') {
                          startNewSession('finaltest');
                        }
                      }}
                    />
                  </CardContent>
                </Card>

                {exerciseMode !== 'finaltest' && (
                  <div className="space-y-4">
                    <div className="text-center text-muted-foreground">
                      <p>
                        Ready to test your complete Dutch vocabulary knowledge?
                      </p>
                      <p className="text-sm mt-2">
                        This comprehensive test covers all categories: irregular
                        verbs, reflexive verbs, adjectives, colors, numbers, and
                        more!
                      </p>
                    </div>
                    <div className="flex justify-center">
                      <Button
                        onClick={() => startNewSession('finaltest')}
                        className="w-full max-w-md font-nunito"
                      >
                        <GraduationCap className="w-4 h-4 mr-2" />
                        Start Final Test
                      </Button>
                    </div>
                  </div>
                )}

                {exerciseMode === 'finaltest' && (
                  <Card>
                    <CardContent className="pt-6">
                      {currentFinalTestItem ? (
                        <FinalTestExercise
                          item={currentFinalTestItem}
                          exerciseMode={finalTestMode}
                          onComplete={handleExerciseComplete}
                        />
                      ) : !finalTestQueue.hasMoreItems() ||
                        finalTestQueue.shouldShowReviewMode() ? (
                        <div className="text-center py-8 space-y-4">
                          <div className="bg-blue-50 p-6 rounded-lg border-2 border-blue-200">
                            <h3 className="text-xl font-bold text-blue-800 mb-2">
                              🎉 Well Done!
                            </h3>
                            <p className="text-blue-700 mb-4">
                              You've completed all exercises in this session!
                              You got{' '}
                              {
                                Object.keys(finalTestQueue.getIncorrectItems())
                                  .length
                              }{' '}
                              exercises incorrect.
                            </p>
                            {Object.keys(finalTestQueue.getIncorrectItems())
                              .length > 0 ? (
                              <div className="space-y-2">
                                <p className="text-blue-700">
                                  Would you like to review your incorrect
                                  answers?
                                </p>
                                <Button
                                  onClick={() => {
                                    finalTestQueue.startReviewMode();
                                    setFinalTestReviewMode(true);
                                  }}
                                  className="bg-blue-600 text-white hover:bg-blue-700"
                                >
                                  Start Review Mode (
                                  {
                                    Object.keys(
                                      finalTestQueue.getIncorrectItems(),
                                    ).length
                                  }{' '}
                                  exercises)
                                </Button>
                              </div>
                            ) : (
                              <p className="text-blue-700 font-medium">
                                Perfect score! You got everything right! 🌟
                              </p>
                            )}
                          </div>
                        </div>
                      ) : (
                        <div className="text-center py-8">
                          <p className="text-lg text-muted-foreground">
                            Loading final test exercises...
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="chapters" className="space-y-6">
                <ChapterSelector
                  currentChapter={progress.currentChapter}
                  onChapterSelect={setCurrentChapter}
                  completedWords={progress.completedWords}
                  totalWords={vocabulary.length}
                />
              </TabsContent>
            </CollapsibleTabs>
          </>
        )}
      </div>
    </div>
  );
}
