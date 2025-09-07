import { Badge } from '@/components/Badge';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import {
  exerciseConfigs,
  finalTestModeConfigs,
  getExercisesByCategory,
} from '@/config/exercise-config';
import { ExamMode, ExerciseMode, FinalTestMode } from '@/types/exercise-types';
import {
  BookOpen,
  ChevronRight,
  GraduationCap,
  Trophy,
  Users,
} from 'lucide-react';
import React from 'react';

interface ExerciseModeSelectProps {
  onSelect: (mode: ExerciseMode | 'finaltest') => void;
  className?: string;
}

interface FinalTestModeSelectProps {
  onSelect: (mode: FinalTestMode | ExamMode) => void;
  onBack: () => void;
  className?: string;
}

export function ExerciseModeSelect({
  onSelect,
  className,
}: ExerciseModeSelectProps) {
  const basicExercises = getExercisesByCategory('basic');
  const advancedExercises = getExercisesByCategory('advanced');
  const testExercises = getExercisesByCategory('test');

  const categories = [
    {
      id: 'basic',
      title: 'Basic Practice',
      description: 'Start with vocabulary and fundamental concepts',
      icon: BookOpen,
      color: 'bg-blue-50 text-blue-600 border-blue-200',
      exercises: basicExercises,
    },
    {
      id: 'advanced',
      title: 'Advanced Grammar',
      description: 'Master complex grammar rules and structures',
      icon: Users,
      color: 'bg-purple-50 text-purple-600 border-purple-200',
      exercises: advancedExercises,
    },
    {
      id: 'test',
      title: 'Test Practice',
      description: 'Prepare for exams with comprehensive exercises',
      icon: GraduationCap,
      color: 'bg-green-50 text-green-600 border-green-200',
      exercises: testExercises,
    },
  ];

  return (
    <div className={`space-y-8 ${className}`}>
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Choose Your Learning Path
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Select the type of exercise that matches your current level and
          learning goals.
        </p>
      </div>

      {categories.map((category) => (
        <div key={category.id} className="space-y-4">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${category.color}`}>
              <category.icon className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900">
                {category.title}
              </h3>
              <p className="text-gray-600">{category.description}</p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {category.exercises.map((exercise) => {
              const IconComponent = exercise.icon;
              return (
                <Card
                  key={exercise.id}
                  className="p-6 hover:shadow-lg transition-shadow cursor-pointer border-2 border-transparent hover:border-blue-200"
                  onClick={() => onSelect(exercise.id as ExerciseMode)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-gray-100 rounded-lg">
                        <IconComponent className="w-5 h-5 text-gray-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">
                          {exercise.name}
                        </h4>
                        <p className="text-sm text-gray-600 mt-1">
                          {exercise.description}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge variant="secondary" className="text-xs">
                            {exercise.level}
                          </Badge>
                          {exercise.requiresChapter && (
                            <Badge variant="outline" className="text-xs">
                              Chapter-based
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      ))}

      {/* Special Final Test Section */}
      <div className="border-t pt-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-amber-50 text-amber-600 border-amber-200">
            <Trophy className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900">
              Final Challenge
            </h3>
            <p className="text-gray-600">Test your complete Dutch knowledge</p>
          </div>
        </div>

        <Card
          className="p-6 hover:shadow-lg transition-shadow cursor-pointer border-2 border-transparent hover:border-amber-200 bg-gradient-to-r from-amber-50 to-orange-50"
          onClick={() => onSelect('finaltest')}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-amber-100 rounded-lg">
                <Trophy className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-900">
                  Final Test
                </h4>
                <p className="text-gray-600">
                  Comprehensive assessment with multiple modes
                </p>
                <Badge className="mt-2 bg-amber-100 text-amber-800">
                  A1-B2
                </Badge>
              </div>
            </div>
            <ChevronRight className="w-6 h-6 text-gray-400" />
          </div>
        </Card>
      </div>
    </div>
  );
}

export function FinalTestModeSelect({
  onSelect,
  onBack,
  className,
}: FinalTestModeSelectProps) {
  const basicModes = Object.values(finalTestModeConfigs).filter(
    (config) => config.category === 'basic',
  );
  const examModes = Object.values(finalTestModeConfigs).filter(
    (config) => config.category === 'exam',
  );

  const categories = [
    {
      id: 'basic',
      title: 'Translation Practice',
      description: 'Focus on vocabulary and translation skills',
      icon: BookOpen,
      color: 'bg-blue-50 text-blue-600 border-blue-200',
      modes: basicModes,
    },
    {
      id: 'exam',
      title: 'Comprehensive Exams',
      description: 'Advanced exercises covering specific grammar topics',
      icon: GraduationCap,
      color: 'bg-purple-50 text-purple-600 border-purple-200',
      modes: examModes,
    },
  ];

  return (
    <div className={`space-y-8 ${className}`}>
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Final Test Modes
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Choose your preferred test format and difficulty level.
        </p>
        <Button variant="outline" onClick={onBack} className="mt-4">
          ← Back to Main Menu
        </Button>
      </div>

      {categories.map((category) => (
        <div key={category.id} className="space-y-4">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${category.color}`}>
              <category.icon className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900">
                {category.title}
              </h3>
              <p className="text-gray-600">{category.description}</p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {category.modes.map((mode) => {
              const IconComponent = mode.icon;
              return (
                <Card
                  key={mode.id}
                  className="p-6 hover:shadow-lg transition-shadow cursor-pointer border-2 border-transparent hover:border-blue-200"
                  onClick={() => onSelect(mode.id as FinalTestMode | ExamMode)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-gray-100 rounded-lg">
                        <IconComponent className="w-5 h-5 text-gray-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">
                          {mode.name}
                        </h4>
                        <p className="text-sm text-gray-600 mt-1">
                          {mode.description}
                        </p>
                        <Badge variant="secondary" className="text-xs mt-2">
                          {mode.level}
                        </Badge>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
