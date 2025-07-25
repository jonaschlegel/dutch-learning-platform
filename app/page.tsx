'use client';

import { ArticleExercise } from '@/components/ArticleExercise';
import { ChapterSelector } from '@/components/ChapterSelector';
import { PluralExercise } from '@/components/PluralExercise';
import { ProgressDashboard } from '@/components/ProgressDashboard';
import { Avatar, AvatarFallback } from '@/components/Aavatar';
import { Badge } from '@/components/Badge';
import { Button } from '@/components/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/Card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/Tabs';
import { VocabularyCard } from '@/components/VocabularyCard';
import { vocabulary } from '@/data/vocabulary';
import { useToast } from '@/hooks/use-toast';
import { useProgress } from '@/hooks/use-progress';
import { useUserAvatar } from '@/hooks/use-user-avatar';
import { BookOpen, Brain, Play, RotateCcw, Target } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

export default function DutchLearningPlatform() {
  const { progress, markWordCompleted, setCurrentChapter, resetProgress } =
    useProgress();
  const { initial, color } = useUserAvatar();
  const { toast } = useToast();

  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [exerciseMode, setExerciseMode] = useState<
    'vocabulary' | 'articles' | 'plural'
  >('vocabulary');
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

  const currentChapterWords = useMemo(() => {
    if (progress.currentChapter === 0) {
      return vocabulary;
    }
    return vocabulary.filter((w) => w.chapter === progress.currentChapter);
  }, [progress.currentChapter]);

  const availableWords = useMemo(() => {
    let words = currentChapterWords;

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
    progress.currentChapter,
  ]);

  const currentWord = availableWords[currentExerciseIndex];

  const handleExerciseComplete = (correct: boolean) => {
    if (currentWord) {
      markWordCompleted(currentWord.id, correct ? 1 : 0);
    }

    const newScore = {
      correct: sessionScore.correct + (correct ? 1 : 0),
      total: sessionScore.total + 1,
    };
    setSessionScore(newScore);

    if (currentExerciseIndex < availableWords.length - 1) {
      setCurrentExerciseIndex((prev) => prev + 1);
    } else {
      setShowResults(true);
    }
  };

  const resetExercises = () => {
    setCurrentExerciseIndex(0);
    setShowResults(false);
    setSessionScore({ correct: 0, total: 0 });
  };

  const startNewSession = (mode: 'vocabulary' | 'articles' | 'plural') => {
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
                Start with "Vocabulary" to learn new words, or challenge
                yourself with "Articles" to get the de/het right! You can also
                browse vocabulary by chapter.
              </p>
              <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                <Button
                  size="default"
                  onClick={() => startNewSession('vocabulary')}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  <Play className="h-5 w-5 mr-2" />
                  Vocabulary
                </Button>
                <Button
                  size="default"
                  variant="outline"
                  onClick={() => startNewSession('articles')}
                  className="border-primary text-primary hover:bg-primary/10"
                >
                  <Play className="h-5 w-5 mr-2" />
                  Articles (de/het)
                </Button>
                <Button
                  size="default"
                  variant="outline"
                  onClick={() => startNewSession('plural')}
                  className="border-primary text-primary hover:bg-primary/10"
                >
                  <Play className="h-5 w-5 mr-2" />
                  Plural
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <>
            <ProgressDashboard
              progress={progress}
              onResetProgress={resetProgress}
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
                {!showResults ? (
                  <div className="space-y-6">
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
                      {[
                        'family',
                        'time',
                        'number',
                        'greeting',
                        'description',
                        'question',
                        'pronoun',
                        'article',
                        'season',
                        'ordinal',
                        'plural',
                      ].map((category) => (
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
                    <div className="flex justify-center space-x-4">
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
                    </div>

                    {availableWords.length > 0 && currentWord ? (
                      <div className="space-y-4">
                        <div className="text-center">
                          <p className="text-sm text-muted-foreground">
                            Question {currentExerciseIndex + 1} of{' '}
                            {availableWords.length}
                          </p>
                          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                            <div
                              className="bg-primary h-2 rounded-full transition-all duration-300"
                              style={{
                                width: `${
                                  ((currentExerciseIndex + 1) /
                                    availableWords.length) *
                                  100
                                }%`,
                              }}
                            />
                          </div>
                        </div>

                        {exerciseMode === 'vocabulary' ? (
                          <VocabularyCard
                            word={currentWord}
                            mode="production"
                            onComplete={handleExerciseComplete}
                          />
                        ) : exerciseMode === 'articles' ? (
                          <ArticleExercise
                            word={currentWord}
                            onComplete={handleExerciseComplete}
                          />
                        ) : (
                          <PluralExercise
                            word={currentWord}
                            onComplete={handleExerciseComplete}
                          />
                        )}
                      </div>
                    ) : (
                      <Card className="text-center py-8 bg-card shadow-sm">
                        <CardContent>
                          <p className="text-lg text-muted-foreground">
                            No exercises available for this mode or category in
                            the current chapter. Try selecting a different
                            chapter or category.
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
                                      Plural: {word.plural}
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
