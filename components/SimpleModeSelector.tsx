import { Badge } from '@/components/Badge';
import { Button } from '@/components/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/Card';
import { exerciseHelpers, uiStateHelpers } from '@/utils/exercise-helpers';
import {
  BookOpen,
  Brain,
  Clock,
  Edit3,
  GraduationCap,
  Layers,
  Target,
  Zap,
} from 'lucide-react';
import React from 'react';

interface SimpleModeSelectorProps {
  currentMode: string;
  onModeSelect: (mode: string) => void;
  canStartMode: (mode: string) => boolean;
  className?: string;
}

const modeIcons = {
  vocabulary: BookOpen,
  articles: Target,
  plural: Layers,
  perfect: Clock,
  imperfectum: Edit3,
  modalverbs: Brain,
  conjunctions: Zap,
  test1: GraduationCap,
  test2: GraduationCap,
  finaltest: GraduationCap,
};

export function SimpleModeSelector({
  currentMode,
  onModeSelect,
  canStartMode,
  className,
}: SimpleModeSelectorProps) {
  const modeCategories = uiStateHelpers.getExerciseModesByCategory();

  const renderModeButton = (mode: string) => {
    const config = exerciseHelpers.getExerciseConfig(mode);
    const Icon = modeIcons[mode as keyof typeof modeIcons] || BookOpen;
    const isActive = currentMode === mode;
    const isDisabled = !canStartMode(mode);

    return (
      <Button
        key={mode}
        variant={isActive ? 'default' : 'outline'}
        onClick={() => onModeSelect(mode)}
        disabled={isDisabled}
        className={`flex items-center gap-2 min-w-[180px] ${
          isActive ? 'bg-primary text-primary-foreground' : ''
        } ${isDisabled ? 'opacity-50' : ''}`}
      >
        <Icon className="w-4 h-4" />
        <span className="font-medium">{config.name}</span>
        {config.requiresChapter && (
          <Badge variant="secondary" className="text-xs ml-1">
            Chapter
          </Badge>
        )}
      </Button>
    );
  };

  return (
    <div className={`space-y-6 ${className}`}>
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Choose Your Exercise
        </h2>
        <p className="text-gray-600">
          Select the type of practice that matches your learning goals
        </p>
      </div>

      {/* Basic Exercises */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <BookOpen className="w-5 h-5 text-blue-600" />
            Basic Practice
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {modeCategories.basic.map(renderModeButton)}
          </div>
          <p className="text-sm text-gray-600 mt-3">
            Start with vocabulary and fundamental concepts. These exercises
            require chapter selection.
          </p>
        </CardContent>
      </Card>

      {/* Grammar Exercises */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Brain className="w-5 h-5 text-purple-600" />
            Grammar Practice
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
            {modeCategories.grammar.map(renderModeButton)}
          </div>
          <p className="text-sm text-gray-600 mt-3">
            Master complex grammar rules and verb conjugations. No chapter
            selection needed.
          </p>
        </CardContent>
      </Card>

      {/* Test Exercises */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <GraduationCap className="w-5 h-5 text-green-600" />
            Test Practice
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {modeCategories.tests.map(renderModeButton)}
          </div>
          <p className="text-sm text-gray-600 mt-3">
            Comprehensive tests to evaluate your progress and prepare for exams.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
