'use client';

import { ArticleExercise } from '@/components/ArticleExercise';
import { Avatar, AvatarFallback } from '@/components/Avatar';
import { Badge } from '@/components/Badge';
import { Button } from '@/components/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/Card';
import { ChapterSelector } from '@/components/ChapterSelector';
import { ImperfectumExercise } from '@/components/ImperfectumExercise';
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
import { imperfectumVocabulary } from '@/data/imperfectum';
import { perfectTenseVocabulary } from '@/data/perfect-tense';
import { testExercises2 } from '@/data/test-exercises';
import { vocabulary } from '@/data/vocabulary';
import { useExerciseQueue } from '@/hooks/use-exercise-queue';
import { useImperfectumQueue } from '@/hooks/use-imperfectum-queue';
import { usePerfectTenseQueue } from '@/hooks/use-perfect-tense-queue';
import { useProgress } from '@/hooks/use-progress';
import { useTestExerciseQueue } from '@/hooks/use-test-exercise-queue';
import { useToast } from '@/hooks/use-toast';
import { useUserAvatar } from '@/hooks/use-user-avatar';
import {
  BookOpen,
  Brain,
  Clock,
  GraduationCap,
  Play,
  RotateCcw,
  Target,
} from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

export default function DutchLearningPlatform() {
  const {
    progress,
    markWordCompleted,
    setCurrentChapter,
    toggleMistakeMode,
    resetProgress,
  } = useProgress();
  const { initial, color } = useUserAvatar();
  const { toast } = useToast();

  const exerciseQueue = useExerciseQueue({
    maxRecentItems: 8,
    prioritizeIncorrect: true,
  });

  const testExerciseQueue = useTestExerciseQueue({
    maxRecentExercises: 6,
    ensureTypeDistribution: true,
  });

  const perfectTenseQueue = usePerfectTenseQueue({
    maxRecentItems: 6,
    prioritizeIncorrect: progress.mistakeMode || true,
  });

  const imperfectumQueue = useImperfectumQueue({
    maxRecentItems: 6,
    prioritizeIncorrect: progress.mistakeMode || true,
  });

  const [exerciseMode, setExerciseMode] = useState<
    | 'vocabulary'
    | 'articles'
    | 'plural'
    | 'perfect'
    | 'imperfectum'
    | 'test1'
    | 'test2'
  >('vocabulary');
  const [perfectTenseMode, setPerfectTenseMode] = useState<
    'participle' | 'auxiliary' | 'complete' | 'translate'
  >('complete');
  const [imperfectumMode, setImperfectumMode] = useState<
    'conjugation' | 'complete' | 'translate'
  >('conjugation');
  const [showResults, setShowResults] = useState(false);
  const [sessionScore, setSessionScore] = useState({ correct: 0, total: 0 });
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [hasStartedLearning, setHasStartedLearning] = useState(false);

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

  const currentChapterWords = useMemo(() => {
    if (progress.currentChapter === 0) {
      return vocabulary;
    }
    return vocabulary.filter((w) => w.chapter === progress.currentChapter);
  }, [progress.currentChapter]);

  const availableWords = useMemo(() => {
    if (
      exerciseMode === 'test1' ||
      exerciseMode === 'test2' ||
      exerciseMode === 'perfect' ||
      exerciseMode === 'imperfectum'
    ) {
      return [];
    }

    let words = currentChapterWords;

    if (progress.mistakeMode) {
      const incorrectWordIds = Object.keys(progress.incorrectWords);
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
    progress.incorrectWords,
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

  useEffect(() => {
    if (exerciseMode === 'test1') {
      const testExercises = createTestExercises();
      testExerciseQueue.initializeTestQueue(testExercises);
    } else if (exerciseMode === 'test2') {
      const testExercises = createTestExercises2();
      testExerciseQueue.initializeTestQueue(testExercises);
    } else if (exerciseMode === 'perfect') {
      const incorrectWordIds: Record<string, number> = {};
      Object.entries(progress.incorrectWords).forEach(([id, data]) => {
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
        perfectTenseQueue.initializeQueue(filteredIncorrectWords);
      } else {
        perfectTenseQueue.initializeQueue(incorrectWordIds);
      }
    } else if (exerciseMode === 'imperfectum') {
      const incorrectWordIds: Record<string, number> = {};
      Object.entries(progress.incorrectWords).forEach(([id, data]) => {
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
        imperfectumQueue.initializeQueue(filteredIncorrectWords);
      } else {
        imperfectumQueue.initializeQueue(incorrectWordIds);
      }
    } else {
      exerciseQueue.initializeQueue(availableWords, progress.incorrectWords);
    }
  }, [
    availableWords,
    exerciseMode,
    progress.incorrectWords,
    progress.mistakeMode,
  ]);

  const currentWord = exerciseQueue.getCurrentItem();
  const currentTestExercise = testExerciseQueue.getCurrentTestExercise();
  const currentPerfectTenseWord = perfectTenseQueue.getCurrentItem();
  const currentImperfectumWord = imperfectumQueue.getCurrentItem();

  const handleExerciseComplete = (correct: boolean) => {
    if (
      (exerciseMode === 'test1' || exerciseMode === 'test2') &&
      currentTestExercise
    ) {
      testExerciseQueue.moveToNextTest(currentTestExercise.id, correct);
    } else if (exerciseMode === 'perfect' && currentPerfectTenseWord) {
      markWordCompleted(currentPerfectTenseWord.id, correct ? 1 : 0);
      perfectTenseQueue.moveToNext(currentPerfectTenseWord.id, correct);
    } else if (exerciseMode === 'imperfectum' && currentImperfectumWord) {
      markWordCompleted(currentImperfectumWord.id, correct ? 1 : 0);
      imperfectumQueue.moveToNext(currentImperfectumWord.id, correct);
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
      exerciseMode === 'test1' || exerciseMode === 'test2'
        ? testExerciseQueue.hasMoreTestExercises()
        : exerciseMode === 'perfect'
        ? perfectTenseQueue.hasMoreItems()
        : exerciseMode === 'imperfectum'
        ? imperfectumQueue.hasMoreItems()
        : exerciseQueue.hasMoreItems();

    if (progress.mistakeMode && correct) {
      const currentId =
        currentWord?.id ||
        currentPerfectTenseWord?.id ||
        currentImperfectumWord?.id;
      if (currentId) {
        const remainingIncorrectWords = Object.keys(
          progress.incorrectWords,
        ).filter((id) => id !== currentId);

        if (remainingIncorrectWords.length === 0) {
          setShowResults(true);
          return;
        }
      }
    }

    if (!hasMoreExercises) {
      setShowResults(true);
    }
  };

  const resetExercises = () => {
    setShowResults(false);
    setSessionScore({ correct: 0, total: 0 });
    if (exerciseMode === 'test1' || exerciseMode === 'test2') {
      // Create test exercises based on the selected test level
      const exercises =
        exerciseMode === 'test1'
          ? createTestExercises()
          : createTestExercises2();
      testExerciseQueue.initializeTestQueue(exercises);
    } else if (exerciseMode === 'perfect') {
      const incorrectWordIds: Record<string, number> = {};
      Object.entries(progress.incorrectWords).forEach(([id, data]) => {
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
        perfectTenseQueue.initializeQueue(filteredIncorrectWords);
      } else {
        perfectTenseQueue.initializeQueue(incorrectWordIds);
      }
    } else if (exerciseMode === 'imperfectum') {
      const incorrectWordIds: Record<string, number> = {};
      Object.entries(progress.incorrectWords).forEach(([id, data]) => {
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
        imperfectumQueue.initializeQueue(filteredIncorrectWords);
      } else {
        imperfectumQueue.initializeQueue(incorrectWordIds);
      }
    } else {
      exerciseQueue.initializeQueue(availableWords, progress.incorrectWords);
    }
  };

  const startNewSession = (
    mode:
      | 'vocabulary'
      | 'articles'
      | 'plural'
      | 'perfect'
      | 'imperfectum'
      | 'test1'
      | 'test2',
  ) => {
    setExerciseMode(mode);
    resetExercises();
    setHasStartedLearning(true);
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
              <p className="text-lg text-foreground">
                Ready to dive into Dutch? This platform helps you learn
                vocabulary and master articles (de/het) through interactive
                exercises.
              </p>
              <p className="text-md text-muted-foreground">
                Start with "Vocabulary" to learn new words, challenge yourself
                with "Articles" to get the de/het right, master "Perfect Tense"
                to learn the perfectum, practice "Imperfectum" for past tense
                (A1/A2), or prepare for your test with "Test Prep"! You can also
                browse vocabulary by chapter.
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
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-3">
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
                </div>

                {/* Third row - Test options */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
              <TabsList className="grid w-full grid-cols-3 bg-muted">
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
                            progress.incorrectWords,
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

                    {(exerciseMode !== 'test1' &&
                      exerciseMode !== 'test2' &&
                      exerciseMode !== 'perfect' &&
                      exerciseMode !== 'imperfectum' &&
                      availableWords.length > 0 &&
                      currentWord) ||
                    ((exerciseMode === 'test1' || exerciseMode === 'test2') &&
                      currentTestExercise) ||
                    (exerciseMode === 'perfect' && currentPerfectTenseWord) ||
                    (exerciseMode === 'imperfectum' &&
                      currentImperfectumWord) ? (
                      <div className="space-y-4">
                        <div className="text-center">
                          <p className="text-sm text-muted-foreground">
                            Question{' '}
                            {exerciseMode === 'test1' ||
                            exerciseMode === 'test2'
                              ? testExerciseQueue.getTestProgress().current + 1
                              : exerciseMode === 'perfect'
                              ? perfectTenseQueue.getProgress().current
                              : exerciseMode === 'imperfectum'
                              ? imperfectumQueue.getProgress().current
                              : exerciseQueue.getProgress().current + 1}{' '}
                            of{' '}
                            {exerciseMode === 'test1' ||
                            exerciseMode === 'test2'
                              ? testExerciseQueue.getTestProgress().total
                              : exerciseMode === 'perfect'
                              ? perfectTenseQueue.getProgress().total
                              : exerciseMode === 'imperfectum'
                              ? imperfectumQueue.getProgress().total
                              : exerciseQueue.getProgress().total}
                          </p>
                          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                            <div
                              className="bg-primary h-2 rounded-full transition-all duration-300"
                              style={{
                                width: `${
                                  exerciseMode === 'test1' ||
                                  exerciseMode === 'test2'
                                    ? testExerciseQueue.getTestProgress()
                                        .percentage
                                    : exerciseMode === 'perfect'
                                    ? (perfectTenseQueue.getProgress().current /
                                        perfectTenseQueue.getProgress().total) *
                                      100
                                    : exerciseMode === 'imperfectum'
                                    ? (imperfectumQueue.getProgress().current /
                                        imperfectumQueue.getProgress().total) *
                                      100
                                    : exerciseQueue.getProgress().percentage
                                }%`,
                              }}
                            />
                          </div>
                        </div>

                        {(exerciseMode === 'test1' ||
                          exerciseMode === 'test2') &&
                        currentTestExercise ? (
                          <TestExerciseCard
                            exercise={currentTestExercise}
                            onComplete={handleExerciseComplete}
                          />
                        ) : exerciseMode === 'perfect' &&
                          currentPerfectTenseWord ? (
                          <PerfectTenseExercise
                            word={currentPerfectTenseWord}
                            mode={perfectTenseMode}
                            onComplete={handleExerciseComplete}
                          />
                        ) : exerciseMode === 'imperfectum' &&
                          currentImperfectumWord ? (
                          <ImperfectumExercise
                            word={currentImperfectumWord}
                            mode={imperfectumMode}
                            onComplete={handleExerciseComplete}
                          />
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
                              <div className="text-6xl">🎉</div>
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
                                    {word.dutch}
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
