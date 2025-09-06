'use client';

import { ArticleExercise } from '@/components/ArticleExercise';
import { Avatar, AvatarFallback } from '@/components/Avatar';
import { Badge } from '@/components/Badge';
import { Button } from '@/components/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/Card';
import { ChapterSelector } from '@/components/ChapterSelector';
import { ConjunctionsExercise } from '@/components/ConjunctionsExercise';
import { ExamExerciseCard } from '@/components/ExamExerciseCard';
import { FinalTestExercise } from '@/components/FinalTestExercise';
import { FinalTestProgressDashboard } from '@/components/FinalTestProgressDashboard';
import { ImperfectumExercise } from '@/components/ImperfectumExercise';
import { ModalVerbsExercise } from '@/components/ModalVerbsExercise';
import { PerfectTenseExercise } from '@/components/PerfectTenseExercise';
import { PluralExercise } from '@/components/PluralExercise';
import { ProgressDashboard } from '@/components/ProgressDashboard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/Tabs';
import {
  createTestExercises,
  createTestExercises2,
  TestExerciseCard,
} from '@/components/TestExerciseCard';
import { VocabularyCard } from '@/components/VocabularyCard';
import { conjunctions } from '@/data/conjunctions';
import { allExamExercises, examCategories } from '@/data/final-exam-exercises';
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
import { useExerciseQueue } from '@/hooks/use-exercise-queue';
import { useFinalTestQueue } from '@/hooks/use-final-test-queue';
import { useImperfectumQueue } from '@/hooks/use-imperfectum-queue';
import { useModalVerbsQueue } from '@/hooks/use-modal-verbs-queue';
import { usePerfectTenseQueue } from '@/hooks/use-perfect-tense-queue';
import { useProgress } from '@/hooks/use-progress';
import { useTestExerciseQueue } from '@/hooks/use-test-exercise-queue';
import { useToast } from '@/hooks/use-toast';
import { useUserAvatar } from '@/hooks/use-user-avatar';
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

  // Use state from exerciseSession instead of local state
  const [exerciseMode, setExerciseMode] = useState<
    | 'vocabulary'
    | 'articles'
    | 'plural'
    | 'perfect'
    | 'imperfectum'
    | 'modalverbs'
    | 'conjunctions'
    | 'test1'
    | 'test2'
    | 'finaltest'
  >((exerciseSession.exerciseMode as any) || 'vocabulary');
  const [perfectTenseMode, setPerfectTenseMode] = useState<
    'participle' | 'auxiliary' | 'complete' | 'translate'
  >((exerciseSession.perfectTenseMode as any) || 'complete');
  const [imperfectumMode, setImperfectumMode] = useState<
    'conjugation' | 'complete' | 'translate'
  >((exerciseSession.imperfectumMode as any) || 'conjugation');
  const [modalVerbsMode, setModalVerbsMode] = useState<
    'conjugation' | 'usage' | 'translate' | 'negative' | 'question'
  >((exerciseSession.modalVerbsMode as any) || 'conjugation');
  const [conjunctionsMode, setConjunctionsMode] = useState<
    'complete' | 'translate' | 'identify' | 'wordOrder' | 'usage'
  >('complete');
  const [finalTestMode, setFinalTestMode] = useState<
    | 'translate'
    | 'reverse'
    | 'mixed'
    | 'conjugation'
    | 'article'
    | 'exam-perfect'
    | 'exam-imperfect'
    | 'exam-separable'
    | 'exam-conjunctions'
    | 'exam-multiple-choice'
    | 'exam-writing'
    | 'exam-mixed'
  >('mixed');
  const [finalTestCategory, setFinalTestCategory] =
    useState<string>('All Categories');
  const [finalTestReviewMode, setFinalTestReviewMode] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [sessionScore, setSessionScore] = useState(
    exerciseSession.sessionScore || { correct: 0, total: 0 },
  );
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    exerciseSession.selectedCategory || null,
  );
  const [hasStartedLearning, setHasStartedLearning] = useState(
    exerciseSession.hasStartedLearning || false,
  );
  const [testReviewMode, setTestReviewMode] = useState(
    exerciseSession.testReviewMode || { test1: false, test2: false },
  );

  // Session completion tracking
  const [sessionCompleted, setSessionCompleted] = useState({
    perfect: false,
    imperfectum: false,
    modalverbs: false,
    conjunctions: false,
  });

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
      sessionScore,
      perfectTenseMode,
      imperfectumMode,
      modalVerbsMode,
      selectedCategory,
      testReviewMode,
      hasStartedLearning,
    });
  }, [
    exerciseMode,
    sessionScore,
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
    sessionScore,
    testReviewMode,
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
  const [completedExamExercises, setCompletedExamExercises] = useState<
    Set<string>
  >(new Set());
  const [examExerciseSessionCompleted, setExamExerciseSessionCompleted] =
    useState(false);

  const currentExamExercise = useMemo(() => {
    const filteredExercises = (() => {
      switch (finalTestMode) {
        case 'exam-perfect':
          return allExamExercises.filter(
            (ex) => ex.type === 'perfect-construction',
          );
        case 'exam-imperfect':
          return allExamExercises.filter((ex) => ex.type === 'imperfect-fill');
        case 'exam-separable':
          return allExamExercises.filter((ex) => ex.type === 'separable-verbs');
        case 'exam-conjunctions':
          return allExamExercises.filter(
            (ex) => ex.type === 'conjunctions-combine',
          );
        case 'exam-multiple-choice':
          return allExamExercises.filter((ex) => ex.type === 'multiple-choice');
        case 'exam-writing':
          return allExamExercises.filter((ex) => ex.type === 'writing-prompt');
        case 'exam-mixed':
          return allExamExercises;
        default:
          return [];
      }
    })();

    // If we've completed the session, return null
    if (
      examExerciseSessionCompleted ||
      currentExamExerciseIndex >= filteredExercises.length
    ) {
      return null;
    }

    return filteredExercises[currentExamExerciseIndex] || null;
  }, [finalTestMode, currentExamExerciseIndex, examExerciseSessionCompleted]);

  // Function to get exam exercise progress
  const getExamExerciseProgress = () => {
    const filteredExercises = (() => {
      switch (finalTestMode) {
        case 'exam-perfect':
          return allExamExercises.filter(
            (ex) => ex.type === 'perfect-construction',
          );
        case 'exam-imperfect':
          return allExamExercises.filter((ex) => ex.type === 'imperfect-fill');
        case 'exam-separable':
          return allExamExercises.filter((ex) => ex.type === 'separable-verbs');
        case 'exam-conjunctions':
          return allExamExercises.filter(
            (ex) => ex.type === 'conjunctions-combine',
          );
        case 'exam-multiple-choice':
          return allExamExercises.filter((ex) => ex.type === 'multiple-choice');
        case 'exam-writing':
          return allExamExercises.filter((ex) => ex.type === 'writing-prompt');
        case 'exam-mixed':
          return allExamExercises;
        default:
          return [];
      }
    })();

    return {
      current: currentExamExerciseIndex,
      total: filteredExercises.length,
      completed: completedExamExercises.size,
      percentage:
        filteredExercises.length > 0
          ? (currentExamExerciseIndex / filteredExercises.length) * 100
          : 0,
    };
  };

  // Reset exam exercise session when mode changes
  useEffect(() => {
    setCurrentExamExerciseIndex(0);
    setCompletedExamExercises(new Set());
    setExamExerciseSessionCompleted(false);
  }, [finalTestMode]);

  // Auto-switch to "All Categories" when current category becomes irrelevant for the mode
  useEffect(() => {
    if (finalTestCategory && finalTestCategory !== 'All Categories') {
      if (!isCategoryRelevantForMode(finalTestCategory, finalTestMode)) {
        setFinalTestCategory('All Categories');
      }
    }
  }, [finalTestMode, finalTestCategory]);

  const handleExerciseComplete = (correct: boolean) => {
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

      // Check if we've completed a full cycle
      const progress = perfectTenseQueue.getProgress();
      if (progress.current >= progress.total && !sessionCompleted.perfect) {
        setSessionCompleted((prev) => ({ ...prev, perfect: true }));
      }
    } else if (exerciseMode === 'imperfectum' && currentImperfectumWord) {
      markWordCompleted(currentImperfectumWord.id, correct ? 1 : 0);
      imperfectumQueue.moveToNext(currentImperfectumWord.id, correct);

      // Check if we've completed a full cycle
      const progress = imperfectumQueue.getProgress();
      if (progress.current >= progress.total && !sessionCompleted.imperfectum) {
        setSessionCompleted((prev) => ({ ...prev, imperfectum: true }));
      }
    } else if (exerciseMode === 'modalverbs' && currentModalVerb) {
      markWordCompleted(currentModalVerb.id, correct ? 1 : 0);
      modalVerbsQueue.moveToNext(currentModalVerb.id, correct);

      // Check if we've completed a full cycle
      const progress = modalVerbsQueue.getProgress();
      if (progress.current >= progress.total && !sessionCompleted.modalverbs) {
        setSessionCompleted((prev) => ({ ...prev, modalverbs: true }));
      }
    } else if (exerciseMode === 'conjunctions' && currentConjunction) {
      markWordCompleted(currentConjunction.id, correct ? 1 : 0);
      conjunctionsQueue.moveToNext(currentConjunction.id, correct);

      // Check if we've completed a full cycle
      const progress = conjunctionsQueue.getProgress();
      if (
        progress.current >= progress.total &&
        !sessionCompleted.conjunctions
      ) {
        setSessionCompleted((prev) => ({ ...prev, conjunctions: true }));
      }
    } else if (exerciseMode === 'finaltest' && currentFinalTestItem) {
      // For final test, handle completion with review mode logic
      finalTestQueue.moveToNext(currentFinalTestItem.id, correct);

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
      }
    } else if (exerciseMode === 'finaltest' && currentExamExercise) {
      // Handle exam exercises with proper completion tracking
      setCompletedExamExercises(
        (prev) => new Set([...prev, currentExamExercise.id]),
      );

      const nextIndex = currentExamExerciseIndex + 1;
      const examProgress = getExamExerciseProgress();

      // Check if we've completed all exercises in this mode
      if (nextIndex >= examProgress.total) {
        setExamExerciseSessionCompleted(true);

        // Show completion message and ask if user wants to restart
        setTimeout(() => {
          toast({
            title: 'Exam Section Complete!',
            description: `You've completed all ${examProgress.total} exercises in this section. Great job!`,
          });
        }, 100);
      } else {
        setCurrentExamExerciseIndex(nextIndex);
      }
    } else if (currentWord) {
      markWordCompleted(currentWord.id, correct ? 1 : 0);
      exerciseQueue.moveToNext(currentWord.id, correct);
    }

    const newScore = {
      correct: sessionScore.correct + (correct ? 1 : 0),
      total: sessionScore.total + 1,
    };
    setSessionScore(newScore);

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
        ? (() => {
            const filteredExercises = (() => {
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
            return (
              !examExerciseSessionCompleted &&
              currentExamExerciseIndex < filteredExercises.length
            );
          })()
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
    setSessionScore({ correct: 0, total: 0 });
    clearExerciseSession(); // Clear session when resetting
    if (exerciseMode === 'test1') {
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

    if (!isContinuingSession) {
      // Starting a fresh session
      resetExercises();
      setSessionScore({ correct: 0, total: 0 });

      // Reset session completion flags for the current mode
      if (mode === 'perfect') {
        setSessionCompleted((prev) => ({ ...prev, perfect: false }));
      } else if (mode === 'imperfectum') {
        setSessionCompleted((prev) => ({ ...prev, imperfectum: false }));
      } else if (mode === 'modalverbs') {
        setSessionCompleted((prev) => ({ ...prev, modalverbs: false }));
      } else if (mode === 'conjunctions') {
        setSessionCompleted((prev) => ({ ...prev, conjunctions: false }));
      }
    } else {
      // Continuing existing session - restore session score
      setSessionScore(exerciseSession.sessionScore);
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
        finalTestCategory === 'All Categories' ? undefined : finalTestCategory,
        {},
        0,
      );
    }

    // Save the session state
    const newSession = {
      exerciseMode: mode,
      currentIndex: isContinuingSession ? exerciseSession.currentIndex : 0,
      sessionScore: isContinuingSession
        ? exerciseSession.sessionScore
        : { correct: 0, total: 0 },
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
    setSessionScore({ correct: 0, total: 0 });

    // Save the updated session
    saveExerciseSession({
      exerciseMode,
      currentIndex: 0,
      sessionScore: { correct: 0, total: 0 },
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
    setSessionScore({ correct: 0, total: 0 });
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
            <ProgressDashboard
              progress={progress}
              onResetProgress={resetProgress}
              onToggleMistakeMode={toggleMistakeMode}
            />

            <Tabs defaultValue="practice" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4 bg-muted">
                <TabsTrigger
                  value="practice"
                  className="flex items-center space-x-2 font-nunito"
                >
                  <Brain className="h-4 w-4" />
                  <span>Practice</span>
                </TabsTrigger>
                <TabsTrigger
                  value="vocabulary"
                  className="flex items-center space-x-2 font-nunito"
                >
                  <BookOpen className="h-4 w-4" />
                  <span>Vocabulary</span>
                </TabsTrigger>
                <TabsTrigger
                  value="finaltest"
                  className="flex items-center space-x-2 font-nunito"
                >
                  <GraduationCap className="h-4 w-4" />
                  <span>Final Test</span>
                </TabsTrigger>
                <TabsTrigger
                  value="chapters"
                  className="flex items-center space-x-2 font-nunito"
                >
                  <Target className="h-4 w-4" />
                  <span>Chapters</span>
                </TabsTrigger>
              </TabsList>

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
                    {progress.currentChapter !== 0 &&
                      availableCategories.length > 0 && (
                        <div className="flex flex-wrap justify-center gap-2 mb-4">
                          <Button
                            variant={
                              selectedCategory === null ? 'default' : 'outline'
                            }
                            size="sm"
                            onClick={() => setSelectedCategory(null)}
                            className={
                              selectedCategory === null
                                ? 'bg-secondary text-secondary-foreground hover:bg-secondary/90'
                                : ''
                            }
                          >
                            All Categories
                          </Button>
                          {availableCategories.map((category) => (
                            <Button
                              key={category}
                              variant={
                                selectedCategory === category
                                  ? 'default'
                                  : 'outline'
                              }
                              size="sm"
                              onClick={() => setSelectedCategory(category)}
                              className={`capitalize ${
                                selectedCategory === category
                                  ? 'bg-secondary text-secondary-foreground hover:bg-secondary/90'
                                  : ''
                              }`}
                            >
                              {category}
                            </Button>
                          ))}
                        </div>
                      )}
                    <div className="flex justify-center space-x-4 flex-wrap gap-y-2">
                      <Button
                        variant={
                          exerciseMode === 'vocabulary' ? 'default' : 'outline'
                        }
                        onClick={() => startNewSession('vocabulary')}
                        className={
                          exerciseMode === 'vocabulary'
                            ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                            : ''
                        }
                      >
                        Vocabulary Practice
                      </Button>
                      <Button
                        variant={
                          exerciseMode === 'articles' ? 'default' : 'outline'
                        }
                        onClick={() => startNewSession('articles')}
                        className={
                          exerciseMode === 'articles'
                            ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                            : ''
                        }
                      >
                        Article Practice (de/het)
                      </Button>
                      <Button
                        variant={
                          exerciseMode === 'plural' ? 'default' : 'outline'
                        }
                        onClick={() => startNewSession('plural')}
                        className={
                          exerciseMode === 'plural'
                            ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                            : ''
                        }
                      >
                        Plural Practice
                      </Button>
                      <Button
                        variant={
                          exerciseMode === 'perfect' ? 'default' : 'outline'
                        }
                        onClick={() => startNewSession('perfect')}
                        className={
                          exerciseMode === 'perfect'
                            ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                            : ''
                        }
                      >
                        Perfect Tense
                      </Button>
                      <Button
                        variant={
                          exerciseMode === 'imperfectum' ? 'default' : 'outline'
                        }
                        onClick={() => startNewSession('imperfectum')}
                        className={
                          exerciseMode === 'imperfectum'
                            ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                            : ''
                        }
                      >
                        Imperfectum
                      </Button>
                      <Button
                        variant={
                          exerciseMode === 'modalverbs' ? 'default' : 'outline'
                        }
                        onClick={() => startNewSession('modalverbs')}
                        className={
                          exerciseMode === 'modalverbs'
                            ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                            : ''
                        }
                        title="Modal verbs are always available - not tied to any specific chapter"
                      >
                        Modal Verbs
                      </Button>
                      <Button
                        variant={
                          exerciseMode === 'conjunctions'
                            ? 'default'
                            : 'outline'
                        }
                        onClick={() => startNewSession('conjunctions')}
                        className={
                          exerciseMode === 'conjunctions'
                            ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                            : ''
                        }
                        title="Learn conjunctions (A1-A2 level) - not tied to any specific chapter"
                      >
                        Conjunctions
                      </Button>
                      <Button
                        variant={
                          exerciseMode === 'finaltest' ? 'default' : 'outline'
                        }
                        onClick={() => startNewSession('finaltest')}
                        className={
                          exerciseMode === 'finaltest'
                            ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700'
                            : 'border-purple-300 text-purple-700 hover:bg-purple-50'
                        }
                        title="Comprehensive final test covering all vocabulary categories"
                      >
                        Final Test
                      </Button>
                      <Button
                        variant={
                          exerciseMode === 'test1' ? 'default' : 'outline'
                        }
                        onClick={() => startNewSession('test1')}
                        className={
                          exerciseMode === 'test1'
                            ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                            : ''
                        }
                      >
                        Test 1 (Basic)
                      </Button>
                      <Button
                        variant={
                          exerciseMode === 'test2' ? 'default' : 'outline'
                        }
                        onClick={() => startNewSession('test2')}
                        className={
                          exerciseMode === 'test2'
                            ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                            : ''
                        }
                      >
                        Test 2 (Advanced)
                      </Button>
                    </div>

                    {/* Test Review Mode Controls */}
                    {(exerciseMode === 'test1' || exerciseMode === 'test2') && (
                      <div className="flex justify-center space-x-4 mb-4">
                        {exerciseMode === 'test1' && (
                          <div className="flex items-center space-x-2">
                            <Badge variant="outline">
                              Test 1 Incorrect:{' '}
                              {
                                Object.keys(
                                  getTestExerciseProgress('test1')
                                    .incorrectExercises,
                                ).length
                              }
                            </Badge>
                            {Object.keys(
                              getTestExerciseProgress('test1')
                                .incorrectExercises,
                            ).length > 0 && (
                              <Button
                                size="sm"
                                variant={
                                  testReviewMode.test1 ? 'default' : 'outline'
                                }
                                onClick={() => toggleTestReviewMode('test1')}
                              >
                                {testReviewMode.test1
                                  ? 'Exit Review'
                                  : 'Review Mode'}
                              </Button>
                            )}
                          </div>
                        )}
                        {exerciseMode === 'test2' && (
                          <div className="flex items-center space-x-2">
                            <Badge variant="outline">
                              Test 2 Incorrect:{' '}
                              {
                                Object.keys(
                                  getTestExerciseProgress('test2')
                                    .incorrectExercises,
                                ).length
                              }
                            </Badge>
                            {Object.keys(
                              getTestExerciseProgress('test2')
                                .incorrectExercises,
                            ).length > 0 && (
                              <Button
                                size="sm"
                                variant={
                                  testReviewMode.test2 ? 'default' : 'outline'
                                }
                                onClick={() => toggleTestReviewMode('test2')}
                              >
                                {testReviewMode.test2
                                  ? 'Exit Review'
                                  : 'Review Mode'}
                              </Button>
                            )}
                          </div>
                        )}
                      </div>
                    )}

                    {exerciseMode === 'perfect' && (
                      <div className="flex justify-center space-x-2 mb-4">
                        <span className="text-sm text-muted-foreground self-center mr-2">
                          Perfect Tense Mode:
                        </span>
                        <Button
                          variant={
                            perfectTenseMode === 'participle'
                              ? 'default'
                              : 'outline'
                          }
                          size="sm"
                          onClick={() => setPerfectTenseMode('participle')}
                        >
                          Past Participle
                        </Button>
                        <Button
                          variant={
                            perfectTenseMode === 'auxiliary'
                              ? 'default'
                              : 'outline'
                          }
                          size="sm"
                          onClick={() => setPerfectTenseMode('auxiliary')}
                        >
                          Auxiliary Verb
                        </Button>
                        <Button
                          variant={
                            perfectTenseMode === 'complete'
                              ? 'default'
                              : 'outline'
                          }
                          size="sm"
                          onClick={() => setPerfectTenseMode('complete')}
                        >
                          Complete Form
                        </Button>
                        <Button
                          variant={
                            perfectTenseMode === 'translate'
                              ? 'default'
                              : 'outline'
                          }
                          size="sm"
                          onClick={() => setPerfectTenseMode('translate')}
                        >
                          Translation
                        </Button>
                      </div>
                    )}

                    {exerciseMode === 'imperfectum' && (
                      <div className="flex justify-center space-x-2 mb-4">
                        <span className="text-sm text-muted-foreground self-center mr-2">
                          Imperfectum Mode:
                        </span>
                        <Button
                          variant={
                            imperfectumMode === 'conjugation'
                              ? 'default'
                              : 'outline'
                          }
                          size="sm"
                          onClick={() => setImperfectumMode('conjugation')}
                        >
                          Conjugation
                        </Button>
                        <Button
                          variant={
                            imperfectumMode === 'complete'
                              ? 'default'
                              : 'outline'
                          }
                          size="sm"
                          onClick={() => setImperfectumMode('complete')}
                        >
                          Complete Sentence
                        </Button>
                        <Button
                          variant={
                            imperfectumMode === 'translate'
                              ? 'default'
                              : 'outline'
                          }
                          size="sm"
                          onClick={() => setImperfectumMode('translate')}
                        >
                          Translation
                        </Button>
                      </div>
                    )}

                    {exerciseMode === 'modalverbs' && (
                      <div className="flex justify-center space-x-2 mb-4 flex-wrap">
                        <span className="text-sm text-muted-foreground self-center mr-2">
                          Modal Verbs Mode:
                        </span>
                        <Button
                          variant={
                            modalVerbsMode === 'conjugation'
                              ? 'default'
                              : 'outline'
                          }
                          size="sm"
                          onClick={() => setModalVerbsMode('conjugation')}
                          className="mb-1"
                        >
                          Conjugation
                        </Button>
                        <Button
                          variant={
                            modalVerbsMode === 'usage' ? 'default' : 'outline'
                          }
                          size="sm"
                          onClick={() => setModalVerbsMode('usage')}
                          className="mb-1"
                        >
                          Usage
                        </Button>
                        <Button
                          variant={
                            modalVerbsMode === 'translate'
                              ? 'default'
                              : 'outline'
                          }
                          size="sm"
                          onClick={() => setModalVerbsMode('translate')}
                          className="mb-1"
                        >
                          Translation
                        </Button>
                        <Button
                          variant={
                            modalVerbsMode === 'negative'
                              ? 'default'
                              : 'outline'
                          }
                          size="sm"
                          onClick={() => setModalVerbsMode('negative')}
                          className="mb-1"
                        >
                          Negative Form
                        </Button>
                        <Button
                          variant={
                            modalVerbsMode === 'question'
                              ? 'default'
                              : 'outline'
                          }
                          size="sm"
                          onClick={() => setModalVerbsMode('question')}
                          className="mb-1"
                        >
                          Question Form
                        </Button>
                      </div>
                    )}

                    {exerciseMode === 'conjunctions' && (
                      <div className="flex justify-center space-x-2 mb-4 flex-wrap">
                        <span className="text-sm text-muted-foreground self-center mr-2">
                          Conjunctions Mode:
                        </span>
                        <Button
                          variant={
                            conjunctionsMode === 'complete'
                              ? 'default'
                              : 'outline'
                          }
                          size="sm"
                          onClick={() => setConjunctionsMode('complete')}
                          className="mb-1"
                        >
                          Complete
                        </Button>
                        <Button
                          variant={
                            conjunctionsMode === 'translate'
                              ? 'default'
                              : 'outline'
                          }
                          size="sm"
                          onClick={() => setConjunctionsMode('translate')}
                          className="mb-1"
                        >
                          Translate
                        </Button>
                        <Button
                          variant={
                            conjunctionsMode === 'identify'
                              ? 'default'
                              : 'outline'
                          }
                          size="sm"
                          onClick={() => setConjunctionsMode('identify')}
                          className="mb-1"
                        >
                          Identify
                        </Button>
                        <Button
                          variant={
                            conjunctionsMode === 'wordOrder'
                              ? 'default'
                              : 'outline'
                          }
                          size="sm"
                          onClick={() => setConjunctionsMode('wordOrder')}
                          className="mb-1"
                        >
                          Word Order
                        </Button>
                        <Button
                          variant={
                            conjunctionsMode === 'usage' ? 'default' : 'outline'
                          }
                          size="sm"
                          onClick={() => setConjunctionsMode('usage')}
                          className="mb-1"
                        >
                          Usage
                        </Button>
                      </div>
                    )}

                    {exerciseMode === 'finaltest' && (
                      <>
                        <div className="flex justify-center space-x-2 mb-4 flex-wrap">
                          <span className="text-sm text-muted-foreground self-center mr-2">
                            Exercise Mode:
                          </span>
                          <Button
                            variant={
                              finalTestMode === 'translate'
                                ? 'default'
                                : 'outline'
                            }
                            size="sm"
                            onClick={() => setFinalTestMode('translate')}
                            className="mb-1"
                            title="Translate from Dutch to English - includes all vocabulary"
                          >
                            Dutch → English
                          </Button>
                          <Button
                            variant={
                              finalTestMode === 'reverse'
                                ? 'default'
                                : 'outline'
                            }
                            size="sm"
                            onClick={() => setFinalTestMode('reverse')}
                            className="mb-1"
                            title="Translate from English to Dutch - includes all vocabulary"
                          >
                            English → Dutch
                          </Button>
                          <Button
                            variant={
                              finalTestMode === 'mixed' ? 'default' : 'outline'
                            }
                            size="sm"
                            onClick={() => setFinalTestMode('mixed')}
                            className="mb-1"
                            title="Random mix of translation directions - includes all vocabulary"
                          >
                            Mixed
                          </Button>
                          <Button
                            variant={
                              finalTestMode === 'article'
                                ? 'default'
                                : 'outline'
                            }
                            size="sm"
                            onClick={() => setFinalTestMode('article')}
                            className="mb-1"
                            title="Practice only with nouns that have articles (de/het)"
                          >
                            Articles (de/het)
                          </Button>
                          <Button
                            variant={
                              finalTestMode === 'conjugation'
                                ? 'default'
                                : 'outline'
                            }
                            size="sm"
                            onClick={() => setFinalTestMode('conjugation')}
                            className="mb-1"
                            title="Practice only with verbs that have conjugation forms"
                          >
                            Conjugation
                          </Button>
                        </div>

                        <div className="flex justify-center space-x-2 mb-4 flex-wrap">
                          <span className="text-sm text-muted-foreground self-center mr-2">
                            Exam Exercises:
                          </span>
                          <Button
                            variant={
                              finalTestMode === 'exam-perfect'
                                ? 'default'
                                : 'outline'
                            }
                            size="sm"
                            onClick={() => setFinalTestMode('exam-perfect')}
                            className="mb-1"
                            title="Perfect tense construction exercises"
                          >
                            Perfect Tense
                          </Button>
                          <Button
                            variant={
                              finalTestMode === 'exam-imperfect'
                                ? 'default'
                                : 'outline'
                            }
                            size="sm"
                            onClick={() => setFinalTestMode('exam-imperfect')}
                            className="mb-1"
                            title="Imperfect tense fill-in exercises"
                          >
                            Imperfect Tense
                          </Button>
                          <Button
                            variant={
                              finalTestMode === 'exam-separable'
                                ? 'default'
                                : 'outline'
                            }
                            size="sm"
                            onClick={() => setFinalTestMode('exam-separable')}
                            className="mb-1"
                            title="Separable verbs exercises"
                          >
                            Separable Verbs
                          </Button>
                          <Button
                            variant={
                              finalTestMode === 'exam-conjunctions'
                                ? 'default'
                                : 'outline'
                            }
                            size="sm"
                            onClick={() =>
                              setFinalTestMode('exam-conjunctions')
                            }
                            className="mb-1"
                            title="Conjunction combination exercises"
                          >
                            Conjunctions
                          </Button>
                          <Button
                            variant={
                              finalTestMode === 'exam-multiple-choice'
                                ? 'default'
                                : 'outline'
                            }
                            size="sm"
                            onClick={() =>
                              setFinalTestMode('exam-multiple-choice')
                            }
                            className="mb-1"
                            title="Multiple choice grammar exercises"
                          >
                            Multiple Choice
                          </Button>
                          <Button
                            variant={
                              finalTestMode === 'exam-mixed'
                                ? 'default'
                                : 'outline'
                            }
                            size="sm"
                            onClick={() => setFinalTestMode('exam-mixed')}
                            className="mb-1"
                            title="Mixed exam exercises from all categories"
                          >
                            Mixed Exam
                          </Button>
                          <Button
                            variant={
                              finalTestMode === 'exam-writing'
                                ? 'default'
                                : 'outline'
                            }
                            size="sm"
                            onClick={() => setFinalTestMode('exam-writing')}
                            className="mb-1"
                            title="Writing exercises - compose texts on various topics"
                          >
                            Writing
                          </Button>
                        </div>

                        <div className="flex justify-center space-x-2 mb-4 flex-wrap">
                          <div className="flex flex-col items-center">
                            <div className="flex items-center space-x-2 mb-1">
                              <span className="text-sm text-muted-foreground">
                                Category:
                              </span>
                              <select
                                value={finalTestCategory}
                                onChange={(e) => {
                                  const selectedCategory = e.target.value;
                                  // Only allow selection if category is relevant for current mode
                                  if (
                                    isCategoryRelevantForMode(
                                      selectedCategory,
                                      finalTestMode,
                                    )
                                  ) {
                                    setFinalTestCategory(selectedCategory);
                                  }
                                }}
                                className="px-3 py-1 border border-gray-300 rounded-md text-sm"
                              >
                                <option value="All Categories">
                                  All Categories
                                </option>
                                {finalTestCategories.map((category) => {
                                  const isRelevant = isCategoryRelevantForMode(
                                    category,
                                    finalTestMode,
                                  );
                                  return (
                                    <option
                                      key={category}
                                      value={category}
                                      disabled={!isRelevant}
                                      style={{
                                        color: isRelevant ? 'inherit' : '#999',
                                        backgroundColor: isRelevant
                                          ? 'inherit'
                                          : '#f5f5f5',
                                      }}
                                    >
                                      {category}{' '}
                                      {!isRelevant
                                        ? finalTestMode.startsWith('exam-')
                                          ? '(uses exam categories)'
                                          : '(not applicable)'
                                        : ''}
                                    </option>
                                  );
                                })}
                              </select>
                            </div>
                            {finalTestMode.startsWith('exam-') && (
                              <p className="text-xs text-muted-foreground text-center max-w-xs">
                                Exam exercises use their own category system
                              </p>
                            )}
                          </div>

                          <Button
                            variant={
                              finalTestReviewMode ? 'default' : 'outline'
                            }
                            size="sm"
                            onClick={() =>
                              setFinalTestReviewMode(!finalTestReviewMode)
                            }
                            disabled={
                              Object.keys(finalTestQueue.getIncorrectItems())
                                .length === 0
                            }
                            className="mb-1"
                          >
                            Review Mode (
                            {
                              Object.keys(finalTestQueue.getIncorrectItems())
                                .length
                            }
                            )
                          </Button>
                        </div>
                      </>
                    )}

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
                                    ? finalTestQueue.getProgress().percentage
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
                        ) : exerciseMode === 'perfect' &&
                          sessionCompleted.perfect ? (
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
                                        setSessionCompleted((prev) => ({
                                          ...prev,
                                          perfect: false,
                                        }));
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
                        ) : exerciseMode === 'imperfectum' &&
                          sessionCompleted.imperfectum ? (
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
                                        setSessionCompleted((prev) => ({
                                          ...prev,
                                          imperfectum: false,
                                        }));
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
                          ) : sessionCompleted.modalverbs ? (
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
                                          setSessionCompleted((prev) => ({
                                            ...prev,
                                            modalverbs: false,
                                          }));
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
                          ) : sessionCompleted.conjunctions ? (
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
                                          setSessionCompleted((prev) => ({
                                            ...prev,
                                            conjunctions: false,
                                          }));
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
                            currentExamExercise ? (
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
                                          }}
                                          className="bg-green-600 text-white hover:bg-green-700 mr-2"
                                        >
                                          Practice Again
                                        </Button>
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
                            )
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
                        {sessionScore.total > 0
                          ? Math.round(
                              (sessionScore.correct / sessionScore.total) * 100,
                            )
                          : 0}
                        %
                      </div>
                      <p className="text-lg text-muted-foreground">
                        You got {sessionScore.correct} out of{' '}
                        {sessionScore.total} questions correct!
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
            </Tabs>
          </>
        )}
      </div>
    </div>
  );
}
