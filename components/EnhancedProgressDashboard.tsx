import { BarChart3, ChevronDown, ChevronUp } from 'lucide-react';
import React, { useState } from 'react';
import {
  DashboardStats,
  getExerciseRecommendations,
  getProgressMessage,
} from '../utils/progress-dashboard';
import { Badge } from './Badge';
import { Button } from './Button';
import { Card } from './Card';
import { Progress } from './Progress';

interface EnhancedProgressDashboardProps {
  stats: DashboardStats;
  onExerciseSelect: (mode: string) => void;
  currentMode?: string;
  defaultExpanded?: boolean;
}

export function EnhancedProgressDashboard({
  stats,
  onExerciseSelect,
  currentMode,
  defaultExpanded = false,
}: EnhancedProgressDashboardProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const [showDetailedStats, setShowDetailedStats] = useState(false);

  const progressMessage = getProgressMessage(
    stats.accuracy,
    stats.totalExercises,
  );
  const recommendations = getExerciseRecommendations(stats);

  return (
    <div className="space-y-4">
      {/* Compact Header - Always Visible */}
      <Card
        className="cursor-pointer transition-all duration-200 hover:shadow-md"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <BarChart3 className="h-5 w-5 text-blue-600" />
              <div>
                <h3 className="font-semibold text-gray-800">
                  Progress Overview
                </h3>
                <p className="text-sm text-gray-600">
                  {stats.totalExercises > 0
                    ? `${
                        stats.totalExercises
                      } exercises • ${stats.accuracy.toFixed(0)}% accuracy`
                    : 'Ready to start learning!'}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {/* Quick Stats */}
              {stats.totalExercises > 0 && (
                <div className="hidden sm:flex items-center space-x-4 mr-4">
                  <div className="text-center">
                    <div className="text-lg font-bold text-blue-600">
                      {stats.totalExercises}
                    </div>
                    <div className="text-xs text-gray-500">Total</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-green-600">
                      {stats.accuracy.toFixed(0)}%
                    </div>
                    <div className="text-xs text-gray-500">Accuracy</div>
                  </div>
                </div>
              )}
              {isExpanded ? (
                <ChevronUp className="h-5 w-5 text-gray-400" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-400" />
              )}
            </div>
          </div>
        </div>
      </Card>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="space-y-4 animate-in slide-in-from-top-2 duration-200">
          {/* Progress Message */}
          <Card className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50">
            <p className="text-center text-gray-700 font-medium">
              {progressMessage}
            </p>
          </Card>

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="text-center p-4">
              <div className="text-3xl font-bold text-blue-600">
                {stats.totalExercises}
              </div>
              <div className="text-sm text-gray-600">Total Exercises</div>
            </Card>

            <Card className="text-center p-4">
              <div className="text-3xl font-bold text-green-600">
                {stats.accuracy.toFixed(1)}%
              </div>
              <div className="text-sm text-gray-600">Overall Accuracy</div>
            </Card>

            <Card className="text-center p-4">
              <div className="text-3xl font-bold text-purple-600">
                {stats.streakInfo.current}
              </div>
              <div className="text-sm text-gray-600">Current Streak</div>
              {stats.streakInfo.longest > stats.streakInfo.current && (
                <div className="text-xs text-gray-500">
                  Best: {stats.streakInfo.longest}
                </div>
              )}
            </Card>
          </div>

          {/* Overall Progress Bar */}
          <Card className="p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">
                Overall Progress
              </span>
              <span className="text-sm text-gray-600">
                {stats.correctAnswers}/{stats.totalExercises}
              </span>
            </div>
            <Progress value={stats.accuracy} className="h-3" />
          </Card>

          {/* Recommendations - Priority */}
          {recommendations.length > 0 && (
            <Card className="p-4">
              <h4 className="text-lg font-semibold text-gray-800 mb-3">
                Recommended Practice
              </h4>
              <div className="space-y-2">
                {recommendations.slice(0, 2).map((rec, index) => (
                  <div
                    key={rec.mode}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <Badge
                        variant={
                          rec.priority === 'high'
                            ? 'destructive'
                            : rec.priority === 'medium'
                            ? 'default'
                            : 'secondary'
                        }
                        className="text-xs"
                      >
                        {rec.priority}
                      </Badge>
                      <span className="text-sm text-gray-700">
                        {rec.reason}
                      </span>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onExerciseSelect(rec.mode)}
                      disabled={currentMode === rec.mode}
                    >
                      {currentMode === rec.mode ? 'Current' : 'Practice'}
                    </Button>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Advanced Stats Toggle */}
          <div className="flex justify-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowDetailedStats(!showDetailedStats)}
              className="text-gray-600 hover:text-gray-800"
            >
              {showDetailedStats ? 'Hide' : 'Show'} Detailed Statistics
              {showDetailedStats ? (
                <ChevronUp className="h-4 w-4 ml-1" />
              ) : (
                <ChevronDown className="h-4 w-4 ml-1" />
              )}
            </Button>
          </div>

          {/* Detailed Statistics */}
          {showDetailedStats && (
            <div className="space-y-4 animate-in slide-in-from-top-2 duration-200">
              {/* Category Breakdown */}
              {stats.categoryBreakdown.length > 0 && (
                <Card className="p-4">
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">
                    Category Performance
                  </h4>
                  <div className="space-y-3">
                    {stats.categoryBreakdown.map((category) => (
                      <div
                        key={category.category}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center space-x-3 flex-1">
                          <span className="text-sm font-medium text-gray-700 min-w-[100px]">
                            {category.label}
                          </span>
                          <div className="flex-1">
                            <Progress
                              value={category.accuracy}
                              className="h-2"
                            />
                          </div>
                          <span className="text-sm text-gray-600 min-w-[60px] text-right">
                            {category.accuracy.toFixed(0)}%
                          </span>
                        </div>
                        <div className="text-xs text-gray-500 ml-3 min-w-[40px] text-right">
                          {category.correct}/{category.total}
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              )}

              {/* Recent Activity */}
              {stats.recentActivity.length > 0 && (
                <Card className="p-4">
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">
                    Recent Activity
                  </h4>
                  <div className="space-y-2">
                    {stats.recentActivity.map((activity, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between text-sm"
                      >
                        <span className="text-gray-600 capitalize">
                          {activity.mode}
                        </span>
                        <div className="flex items-center space-x-2">
                          <span className="text-gray-500">
                            {activity.correct}/{activity.total}
                          </span>
                          <Badge
                            variant={
                              activity.correct / activity.total >= 0.8
                                ? 'default'
                                : activity.correct / activity.total >= 0.6
                                ? 'secondary'
                                : 'destructive'
                            }
                            className="text-xs"
                          >
                            {(
                              (activity.correct / activity.total) *
                              100
                            ).toFixed(0)}
                            %
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
