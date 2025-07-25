'use client';

import { Button } from '@/components/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/Card';
import { Progress } from '@/components/Progress';
import { chapters, vocabulary } from '@/data/vocabulary';
import { useToast } from '@/hooks/use-toast';
import type { UserProgress } from '@/types/vocabulary';
import {
  BookOpen,
  ChevronDown,
  ChevronUp,
  RotateCcw,
  Target,
  TrendingUp,
} from 'lucide-react';
import { useState, useMemo } from 'react';

interface ProgressDashboardProps {
  progress: UserProgress;
  onResetProgress: () => void;
}

export function ProgressDashboard({
  progress,
  onResetProgress,
}: ProgressDashboardProps) {
  const { toast } = useToast();
  const currentChapterWords = vocabulary.filter((w) =>
    progress.currentChapter === 0
      ? true
      : w.chapter === progress.currentChapter,
  );
  const completedInCurrentChapter = currentChapterWords.filter((w) =>
    progress.completedWords.has(w.id),
  ).length;
  const progressPercentage =
    currentChapterWords.length > 0
      ? (completedInCurrentChapter / currentChapterWords.length) * 100
      : 0;

  const averageScore =
    Object.values(progress.scores).length > 0
      ? Object.values(progress.scores).reduce((a, b) => a + b, 0) /
        Object.values(progress.scores).length
      : 0;

  const [showCategoryProgress, setShowCategoryProgress] = useState(false);

  // Dynamic categories based on current chapter
  const availableCategories = useMemo(() => {
    if (progress.currentChapter === 0) {
      // For "All Chapters", get all unique categories across all vocabulary
      const categories = new Set(
        vocabulary.map((word) => word.category).filter(Boolean),
      );
      return Array.from(categories).sort();
    } else {
      // For specific chapter, get categories only from that chapter
      const chapterWords = vocabulary.filter(
        (w) => w.chapter === progress.currentChapter,
      );
      const categories = new Set(
        chapterWords.map((word) => word.category).filter(Boolean),
      );
      return Array.from(categories).sort();
    }
  }, [progress.currentChapter]);

  const getCategoryProgress = (category: string) => {
    const categoryWords = vocabulary.filter(
      (w) =>
        (progress.currentChapter === 0
          ? true
          : w.chapter === progress.currentChapter) && w.category === category,
    );
    const completed = categoryWords.filter((w) =>
      progress.completedWords.has(w.id),
    ).length;
    return {
      completed,
      total: categoryWords.length,
      percentage:
        categoryWords.length > 0 ? (completed / categoryWords.length) * 100 : 0,
    };
  };

  const handleReset = () => {
    onResetProgress();
    toast({
      title: 'Progress Reset',
      description: 'Your learning progress has been reset.',
      duration: 3000,
    });
  };

  return (
    <>
      <div className="grid gap-4 md:grid-cols-3 mb-6">
        <Card className="bg-card shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium font-nunito">
              Current Chapter
            </CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {progress.currentChapter === 0
                ? 'All Chapters'
                : `Chapter ${progress.currentChapter}`}
            </div>
            <p className="text-xs text-muted-foreground">
              {progress.currentChapter === 0
                ? `${vocabulary.length} total words`
                : chapters.find((c) => c.id === progress.currentChapter)?.title}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium font-nunito">
              Chapter Progress
            </CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {Math.round(progressPercentage)}%
            </div>
            <Progress value={progressPercentage} className="mt-2 bg-muted" />
            <p className="text-xs text-muted-foreground mt-2">
              {completedInCurrentChapter} of {currentChapterWords.length} words
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium font-nunito">
              Average Score
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {Math.round(averageScore * 100)}%
            </div>
            <p className="text-xs text-muted-foreground">
              Based on {Object.values(progress.scores).length} exercises
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-between items-center mb-4">
        <Button
          variant="ghost"
          onClick={handleReset}
          className="text-sm text-destructive hover:bg-destructive/10"
        >
          <RotateCcw className="mr-2 h-4 w-4" /> Reset Progress
        </Button>
        <Button
          variant="ghost"
          onClick={() => setShowCategoryProgress((prev) => !prev)}
          className="text-sm text-muted-foreground hover:bg-muted"
          disabled={availableCategories.length === 0}
        >
          {showCategoryProgress ? (
            <>
              Hide Category Progress <ChevronUp className="ml-2 h-4 w-4" />
            </>
          ) : (
            <>
              Show Category Progress <ChevronDown className="ml-2 h-4 w-4" />
              {availableCategories.length > 0 && (
                <span className="ml-1 text-xs">
                  ({availableCategories.length})
                </span>
              )}
            </>
          )}
        </Button>
      </div>

      {showCategoryProgress && availableCategories.length > 0 && (
        <div className="grid gap-3 md:grid-cols-3 lg:grid-cols-5 mt-4">
          {availableCategories.map((category) => {
            const { completed, total, percentage } =
              getCategoryProgress(category);
            if (total === 0) return null;

            return (
              <Card key={category} className="bg-card shadow-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xs font-medium capitalize font-nunito">
                    {category}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-base font-bold text-foreground">
                    {completed}/{total}
                  </div>
                  <Progress value={percentage} className="mt-1 bg-muted" />
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </>
  );
}
