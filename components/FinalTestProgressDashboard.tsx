'use client';

import { Badge } from '@/components/Badge';
import { Button } from '@/components/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/Card';
import { Progress } from '@/components/Progress';
import { finalTestCategories } from '@/data/final-test-vocabulary';
import {
  Award,
  BookOpen,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Clock,
  RotateCcw,
  Target,
  TrendingUp,
  XCircle,
} from 'lucide-react';
import React, { useState } from 'react';

interface FinalTestProgressDashboardProps {
  progress: {
    current: number;
    total: number;
    completed: number;
    percentage: number;
    categoryProgress: Record<string, { completed: number; total: number }>;
    allCategoriesCompleted: boolean;
  };
  incorrectItems: Record<string, { count: number; lastAttempt: number }>;
  currentCategory: string | null;
  onResetProgress: () => void;
  onStartReview: () => void;
  onCategorySelect: (category: string) => void;
  sessionStats?: {
    correct: number;
    total: number;
    startTime: number;
  };
}

export function FinalTestProgressDashboard({
  progress,
  incorrectItems,
  currentCategory,
  onResetProgress,
  onStartReview,
  onCategorySelect,
  sessionStats,
}: FinalTestProgressDashboardProps) {
  const [showCategoryDetails, setShowCategoryDetails] = useState(false);
  const [showIncorrectDetails, setShowIncorrectDetails] = useState(false);

  const averageScore =
    sessionStats && sessionStats.total > 0
      ? (sessionStats.correct / sessionStats.total) * 100
      : 0;

  const sessionDuration = sessionStats
    ? Math.floor((Date.now() - sessionStats.startTime) / 1000 / 60)
    : 0;

  const incorrectItemsCount = Object.keys(incorrectItems).length;
  const totalCategoriesCompleted = Object.values(
    progress.categoryProgress,
  ).filter((cat) => cat.completed >= cat.total).length;

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getCategoryCompletionColor = (completed: number, total: number) => {
    const percentage = total > 0 ? (completed / total) * 100 : 0;
    if (percentage === 100) return 'bg-green-500';
    if (percentage >= 50) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="space-y-6">
      {/* Main Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-card shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Overall Progress
            </CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {progress.current}/{progress.total}
            </div>
            <p className="text-xs text-muted-foreground">
              {progress.percentage.toFixed(1)}% complete
            </p>
            <Progress value={progress.percentage} className="mt-2 bg-muted" />
          </CardContent>
        </Card>

        <Card className="bg-card shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Session Score</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div
              className={`text-2xl font-bold ${getScoreColor(averageScore)}`}
            >
              {averageScore.toFixed(1)}%
            </div>
            <p className="text-xs text-muted-foreground">
              {sessionStats?.correct || 0} correct out of{' '}
              {sessionStats?.total || 0}
            </p>
            <Progress value={averageScore} className="mt-2 bg-muted" />
          </CardContent>
        </Card>

        <Card className="bg-card shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Categories</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {totalCategoriesCompleted}/{finalTestCategories.length}
            </div>
            <p className="text-xs text-muted-foreground">
              Categories completed
            </p>
            <Progress
              value={
                (totalCategoriesCompleted / finalTestCategories.length) * 100
              }
              className="mt-2 bg-muted"
            />
          </CardContent>
        </Card>

        <Card className="bg-card shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Review Items</CardTitle>
            <XCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {incorrectItemsCount}
            </div>
            <p className="text-xs text-muted-foreground">Items need review</p>
            {sessionDuration > 0 && (
              <p className="text-xs text-muted-foreground mt-1">
                <Clock className="h-3 w-3 inline mr-1" />
                {sessionDuration} min session
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3">
        <Button
          variant="default"
          onClick={onStartReview}
          disabled={incorrectItemsCount === 0}
          className="bg-orange-600 hover:bg-orange-700 text-white"
        >
          <RotateCcw className="mr-2 h-4 w-4" />
          Review Mistakes ({incorrectItemsCount})
        </Button>

        <Button
          variant="outline"
          onClick={() => setShowCategoryDetails(!showCategoryDetails)}
          className="text-muted-foreground hover:bg-muted"
        >
          {showCategoryDetails ? (
            <ChevronUp className="mr-2 h-4 w-4" />
          ) : (
            <ChevronDown className="mr-2 h-4 w-4" />
          )}
          Category Progress
        </Button>

        <Button
          variant="outline"
          onClick={() => setShowIncorrectDetails(!showIncorrectDetails)}
          disabled={incorrectItemsCount === 0}
          className="text-muted-foreground hover:bg-muted"
        >
          {showIncorrectDetails ? (
            <ChevronUp className="mr-2 h-4 w-4" />
          ) : (
            <ChevronDown className="mr-2 h-4 w-4" />
          )}
          Mistake Details
        </Button>

        <Button
          variant="ghost"
          onClick={onResetProgress}
          className="text-sm text-destructive hover:bg-destructive/10 ml-auto"
        >
          <RotateCcw className="mr-2 h-4 w-4" />
          Reset Progress
        </Button>
      </div>

      {/* Category Details */}
      {showCategoryDetails && (
        <Card className="bg-card shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">Category Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
              {finalTestCategories.map((category) => {
                const categoryProgress = progress.categoryProgress[
                  category
                ] || { completed: 0, total: 0 };
                const percentage =
                  categoryProgress.total > 0
                    ? (categoryProgress.completed / categoryProgress.total) *
                      100
                    : 0;
                const isCompleted = percentage === 100;
                const isCurrent = currentCategory === category;

                return (
                  <Card
                    key={category}
                    className={`cursor-pointer transition-colors ${
                      isCurrent ? 'ring-2 ring-primary' : ''
                    } ${isCompleted ? 'bg-green-50 border-green-200' : ''}`}
                    onClick={() => onCategorySelect(category)}
                  >
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-sm font-medium truncate">
                          {category}
                        </CardTitle>
                        {isCompleted && (
                          <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span>
                          {categoryProgress.completed}/{categoryProgress.total}
                        </span>
                        <Badge
                          variant="secondary"
                          className={`text-xs ${
                            isCompleted ? 'bg-green-100 text-green-800' : ''
                          }`}
                        >
                          {percentage.toFixed(0)}%
                        </Badge>
                      </div>
                      <Progress
                        value={percentage}
                        className={`h-2 ${getCategoryCompletionColor(
                          categoryProgress.completed,
                          categoryProgress.total,
                        )}`}
                      />
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Incorrect Items Details */}
      {showIncorrectDetails && incorrectItemsCount > 0 && (
        <Card className="bg-card shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg text-red-600">
              Items That Need Review ({incorrectItemsCount})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
              {Object.entries(incorrectItems)
                .sort(([, a], [, b]) => b.count - a.count)
                .slice(0, 12)
                .map(([itemId, stats]) => (
                  <Card key={itemId} className="bg-red-50 border-red-200">
                    <CardContent className="p-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium truncate">
                          ID: {itemId}
                        </span>
                        <Badge variant="destructive" className="text-xs">
                          {stats.count}x wrong
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        Last attempt:{' '}
                        {new Date(stats.lastAttempt).toLocaleDateString()}
                      </p>
                    </CardContent>
                  </Card>
                ))}
            </div>
            {Object.keys(incorrectItems).length > 12 && (
              <p className="text-sm text-muted-foreground mt-3 text-center">
                And {Object.keys(incorrectItems).length - 12} more items...
              </p>
            )}
          </CardContent>
        </Card>
      )}

      {/* Achievement Badge */}
      {progress.allCategoriesCompleted && (
        <Card className="bg-gradient-to-r from-green-100 to-blue-100 border-green-300">
          <CardContent className="p-6 text-center">
            <Award className="h-12 w-12 text-green-600 mx-auto mb-3" />
            <h3 className="text-xl font-bold text-green-800 mb-2">
              Congratulations! 🎉
            </h3>
            <p className="text-green-700">
              You've completed all categories in the Final Test! Keep reviewing
              to maintain your Dutch skills.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
