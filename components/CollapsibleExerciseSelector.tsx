import { ChevronDown, ChevronUp, Play, Settings } from 'lucide-react';
import React, { useState } from 'react';
import { Badge } from './Badge';
import { Button } from './Button';
import { Card } from './Card';
import { SimpleModeSelector } from './SimpleModeSelector';

interface CollapsibleExerciseSelectorProps {
  currentMode: string;
  onModeSelect: (mode: string) => void;
  canStartMode: (mode: string) => boolean;
  exerciseMode: string;
  testReviewMode: { test1: boolean; test2: boolean };
  onToggleTestReviewMode: (test: 'test1' | 'test2') => void;
  getTestExerciseProgress: (test: any) => {
    incorrectExercises: Record<string, any>;
  };
  perfectTenseMode: string;
  onSetPerfectTenseMode: (mode: any) => void;
  imperfectumMode: string;
  onSetImperfectumMode: (mode: any) => void;
  modalVerbsMode: string;
  onSetModalVerbsMode: (mode: any) => void;
  conjunctionsMode: string;
  onSetConjunctionsMode: (mode: any) => void;
  selectedCategory?: string | null;
  onSetSelectedCategory?: (category: string | null) => void;
  availableCategories?: string[];
  // Final test specific props
  finalTestMode?: string;
  onSetFinalTestMode?: (mode: any) => void;
  finalTestCategory?: string;
  onSetFinalTestCategory?: (category: string) => void;
  finalTestCategories?: string[];
  finalTestReviewMode?: boolean;
  onSetFinalTestReviewMode?: (mode: boolean) => void;
  finalExamReviewMode?: boolean;
  onToggleFinalExamReviewMode?: () => void;
  handleExamModeChange?: (mode: string) => void;
  isCategoryRelevantForMode?: (category: string, mode: string) => boolean;
  memoizedIncorrectWords?: Record<string, any>;
  progress?: any;
  defaultExpanded?: boolean;
}

export function CollapsibleExerciseSelector({
  currentMode,
  onModeSelect,
  canStartMode,
  exerciseMode,
  testReviewMode,
  onToggleTestReviewMode,
  getTestExerciseProgress,
  perfectTenseMode,
  onSetPerfectTenseMode,
  imperfectumMode,
  onSetImperfectumMode,
  modalVerbsMode,
  onSetModalVerbsMode,
  conjunctionsMode,
  onSetConjunctionsMode,
  selectedCategory,
  onSetSelectedCategory,
  availableCategories = [],
  finalTestMode,
  onSetFinalTestMode,
  finalTestCategory,
  onSetFinalTestCategory,
  finalTestCategories = [],
  finalTestReviewMode,
  onSetFinalTestReviewMode,
  finalExamReviewMode,
  onToggleFinalExamReviewMode,
  handleExamModeChange,
  isCategoryRelevantForMode,
  memoizedIncorrectWords = {},
  progress,
  defaultExpanded = false,
}: CollapsibleExerciseSelectorProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);

  const hasActiveSettings =
    testReviewMode.test1 ||
    testReviewMode.test2 ||
    perfectTenseMode !== 'participle' ||
    imperfectumMode !== 'conjugation' ||
    modalVerbsMode !== 'conjugation' ||
    conjunctionsMode !== 'complete' ||
    finalTestReviewMode ||
    finalExamReviewMode;

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
              <Play className="h-5 w-5 text-green-600" />
              <div>
                <h3 className="font-semibold text-gray-800">
                  Exercise Selection
                </h3>
                <p className="text-sm text-gray-600">
                  {currentMode
                    ? `Currently: ${currentMode}`
                    : 'Choose your practice mode'}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {/* Quick Status Indicators */}
              {hasActiveSettings && (
                <div className="hidden sm:flex items-center space-x-2 mr-4">
                  <Settings className="h-4 w-4 text-blue-600" />
                  <span className="text-xs text-gray-500">
                    Custom settings active
                  </span>
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
          {/* Exercise Mode Selector */}
          <Card className="p-4">
            <h4 className="text-lg font-semibold text-gray-800 mb-4">
              Choose Exercise Type
            </h4>
            <SimpleModeSelector
              currentMode={currentMode}
              onModeSelect={onModeSelect}
              canStartMode={canStartMode}
              className="max-w-6xl mx-auto"
            />
          </Card>

          {/* Category Selection */}
          {availableCategories.length > 0 &&
            selectedCategory !== undefined &&
            onSetSelectedCategory && (
              <Card className="p-4">
                <h4 className="text-lg font-semibold text-gray-800 mb-4">
                  Category
                </h4>
                <div className="flex flex-wrap gap-2">
                  {availableCategories.map((category) => (
                    <Button
                      key={category}
                      variant={
                        selectedCategory === category ? 'default' : 'outline'
                      }
                      size="sm"
                      onClick={() => onSetSelectedCategory(category)}
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
              </Card>
            )}

          {/* Advanced Options Toggle */}
          <div className="flex justify-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowAdvancedOptions(!showAdvancedOptions)}
              className="text-gray-600 hover:text-gray-800"
            >
              {showAdvancedOptions ? 'Hide' : 'Show'} Advanced Options
              {showAdvancedOptions ? (
                <ChevronUp className="h-4 w-4 ml-1" />
              ) : (
                <ChevronDown className="h-4 w-4 ml-1" />
              )}
            </Button>
          </div>

          {/* Advanced Options */}
          {showAdvancedOptions && (
            <div className="space-y-4 animate-in slide-in-from-top-2 duration-200">
              {/* Test Review Mode Controls */}
              {(exerciseMode === 'test1' || exerciseMode === 'test2') && (
                <Card className="p-4">
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">
                    Test Review Options
                  </h4>
                  <div className="space-y-4">
                    {exerciseMode === 'test1' && (
                      <div className="flex items-center justify-between">
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
                        </div>
                        {Object.keys(
                          getTestExerciseProgress('test1').incorrectExercises,
                        ).length > 0 && (
                          <Button
                            size="sm"
                            variant={
                              testReviewMode.test1 ? 'default' : 'outline'
                            }
                            onClick={() => onToggleTestReviewMode('test1')}
                          >
                            {testReviewMode.test1
                              ? 'Exit Review'
                              : 'Review Mode'}
                          </Button>
                        )}
                      </div>
                    )}
                    {exerciseMode === 'test2' && (
                      <div className="flex items-center justify-between">
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
                        </div>
                        {Object.keys(
                          getTestExerciseProgress('test2').incorrectExercises,
                        ).length > 0 && (
                          <Button
                            size="sm"
                            variant={
                              testReviewMode.test2 ? 'default' : 'outline'
                            }
                            onClick={() => onToggleTestReviewMode('test2')}
                          >
                            {testReviewMode.test2
                              ? 'Exit Review'
                              : 'Review Mode'}
                          </Button>
                        )}
                      </div>
                    )}
                  </div>
                </Card>
              )}

              {/* Perfect Tense Mode */}
              {exerciseMode === 'perfect' && (
                <Card className="p-4">
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">
                    Perfect Tense Options
                  </h4>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Mode:</span>
                    <div className="flex space-x-2">
                      <Button
                        variant={
                          perfectTenseMode === 'participle'
                            ? 'default'
                            : 'outline'
                        }
                        size="sm"
                        onClick={() => onSetPerfectTenseMode('participle')}
                      >
                        Participle
                      </Button>
                      <Button
                        variant={
                          perfectTenseMode === 'auxiliary'
                            ? 'default'
                            : 'outline'
                        }
                        size="sm"
                        onClick={() => onSetPerfectTenseMode('auxiliary')}
                      >
                        Auxiliary
                      </Button>
                    </div>
                  </div>
                </Card>
              )}

              {/* Imperfectum Mode */}
              {exerciseMode === 'imperfectum' && (
                <Card className="p-4">
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">
                    Imperfectum Options
                  </h4>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Mode:</span>
                    <div className="flex space-x-2">
                      <Button
                        variant={
                          imperfectumMode === 'regular' ? 'default' : 'outline'
                        }
                        size="sm"
                        onClick={() => onSetImperfectumMode('regular')}
                      >
                        Regular
                      </Button>
                      <Button
                        variant={
                          imperfectumMode === 'irregular'
                            ? 'default'
                            : 'outline'
                        }
                        size="sm"
                        onClick={() => onSetImperfectumMode('irregular')}
                      >
                        Irregular
                      </Button>
                    </div>
                  </div>
                </Card>
              )}

              {/* Modal Verbs Mode */}
              {exerciseMode === 'modalverbs' && (
                <Card className="p-4">
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">
                    Modal Verbs Options
                  </h4>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Mode:</span>
                    <div className="flex space-x-2">
                      <Button
                        variant={
                          modalVerbsMode === 'auxiliary' ? 'default' : 'outline'
                        }
                        size="sm"
                        onClick={() => onSetModalVerbsMode('auxiliary')}
                      >
                        Auxiliary
                      </Button>
                      <Button
                        variant={
                          modalVerbsMode === 'modal' ? 'default' : 'outline'
                        }
                        size="sm"
                        onClick={() => onSetModalVerbsMode('modal')}
                      >
                        Modal
                      </Button>
                    </div>
                  </div>
                </Card>
              )}

              {/* Conjunctions Mode */}
              {exerciseMode === 'conjunctions' && (
                <Card className="p-4">
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">
                    Conjunctions Options
                  </h4>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Mode:</span>
                    <div className="flex flex-wrap gap-2">
                      <Button
                        variant={
                          conjunctionsMode === 'complete'
                            ? 'default'
                            : 'outline'
                        }
                        size="sm"
                        onClick={() => onSetConjunctionsMode('complete')}
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
                        onClick={() => onSetConjunctionsMode('translate')}
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
                        onClick={() => onSetConjunctionsMode('identify')}
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
                        onClick={() => onSetConjunctionsMode('wordOrder')}
                      >
                        Word Order
                      </Button>
                      <Button
                        variant={
                          conjunctionsMode === 'usage' ? 'default' : 'outline'
                        }
                        size="sm"
                        onClick={() => onSetConjunctionsMode('usage')}
                      >
                        Usage
                      </Button>
                    </div>
                  </div>
                </Card>
              )}

              {/* Final Test Mode */}
              {exerciseMode === 'finaltest' && (
                <div className="space-y-4">
                  <Card className="p-4">
                    <h4 className="text-lg font-semibold text-gray-800 mb-4">
                      Final Test Exercise Mode
                    </h4>
                    <div className="space-y-3">
                      <div className="flex flex-wrap gap-2">
                        {onSetFinalTestMode && (
                          <>
                            <Button
                              variant={
                                finalTestMode === 'translate'
                                  ? 'default'
                                  : 'outline'
                              }
                              size="sm"
                              onClick={() => onSetFinalTestMode('translate')}
                              title="Translate from Dutch to English"
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
                              onClick={() => onSetFinalTestMode('reverse')}
                              title="Translate from English to Dutch"
                            >
                              English → Dutch
                            </Button>
                            <Button
                              variant={
                                finalTestMode === 'mixed'
                                  ? 'default'
                                  : 'outline'
                              }
                              size="sm"
                              onClick={() => onSetFinalTestMode('mixed')}
                              title="Random mix of translation directions"
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
                              onClick={() => onSetFinalTestMode('article')}
                              title="Practice with articles (de/het)"
                            >
                              Articles
                            </Button>
                            <Button
                              variant={
                                finalTestMode === 'conjugation'
                                  ? 'default'
                                  : 'outline'
                              }
                              size="sm"
                              onClick={() => onSetFinalTestMode('conjugation')}
                              title="Practice verb conjugations"
                            >
                              Conjugation
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  </Card>

                  {/* Exam Exercises */}
                  {handleExamModeChange && (
                    <Card className="p-4">
                      <h4 className="text-lg font-semibold text-gray-800 mb-4">
                        Exam Exercises
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        <Button
                          variant={
                            finalTestMode === 'exam-perfect'
                              ? 'default'
                              : 'outline'
                          }
                          size="sm"
                          onClick={() => handleExamModeChange('exam-perfect')}
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
                          onClick={() => handleExamModeChange('exam-imperfect')}
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
                          onClick={() => handleExamModeChange('exam-separable')}
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
                            handleExamModeChange('exam-conjunctions')
                          }
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
                            handleExamModeChange('exam-multiple-choice')
                          }
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
                          onClick={() => handleExamModeChange('exam-mixed')}
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
                          onClick={() => handleExamModeChange('exam-writing')}
                          title="Writing exercises"
                        >
                          Writing
                        </Button>
                      </div>
                    </Card>
                  )}

                  {/* Final Test Category and Review */}
                  <Card className="p-4">
                    <h4 className="text-lg font-semibold text-gray-800 mb-4">
                      Category & Review Options
                    </h4>
                    <div className="space-y-3">
                      {/* Category Selection */}
                      {onSetFinalTestCategory &&
                        finalTestCategories.length > 0 && (
                          <div>
                            <label className="text-sm text-muted-foreground">
                              Category:
                            </label>
                            <select
                              value={finalTestCategory || 'All Categories'}
                              onChange={(e) => {
                                const selectedCategory = e.target.value;
                                if (
                                  isCategoryRelevantForMode &&
                                  finalTestMode
                                ) {
                                  if (
                                    isCategoryRelevantForMode(
                                      selectedCategory,
                                      finalTestMode,
                                    )
                                  ) {
                                    onSetFinalTestCategory(selectedCategory);
                                  }
                                } else {
                                  onSetFinalTestCategory(selectedCategory);
                                }
                              }}
                              className="ml-2 px-3 py-1 border border-gray-300 rounded-md text-sm"
                            >
                              <option value="All Categories">
                                All Categories
                              </option>
                              {finalTestCategories.map((category, index) => {
                                const isRelevant =
                                  !isCategoryRelevantForMode ||
                                  !finalTestMode ||
                                  isCategoryRelevantForMode(
                                    category,
                                    finalTestMode,
                                  );
                                return (
                                  <option
                                    key={`${category}-${index}`}
                                    value={category}
                                    disabled={!isRelevant}
                                  >
                                    {category}{' '}
                                    {!isRelevant ? '(not applicable)' : ''}
                                  </option>
                                );
                              })}
                            </select>
                          </div>
                        )}

                      {/* Review Options */}
                      <div className="flex flex-wrap gap-2">
                        {onSetFinalTestReviewMode && (
                          <Button
                            variant={
                              finalTestReviewMode ? 'default' : 'outline'
                            }
                            size="sm"
                            onClick={() =>
                              onSetFinalTestReviewMode(!finalTestReviewMode)
                            }
                            disabled={
                              Object.keys(memoizedIncorrectWords).length === 0
                            }
                            title="Review vocabulary mistakes from final test"
                          >
                            Vocabulary Review (
                            {Object.keys(memoizedIncorrectWords).length})
                          </Button>
                        )}

                        {finalTestMode?.startsWith('exam-') &&
                          onToggleFinalExamReviewMode && (
                            <Button
                              variant={
                                finalExamReviewMode ? 'default' : 'outline'
                              }
                              size="sm"
                              onClick={onToggleFinalExamReviewMode}
                              disabled={
                                !progress?.finalExamProgress
                                  ?.incorrectExercises ||
                                Object.keys(
                                  progress.finalExamProgress.incorrectExercises,
                                ).length === 0
                              }
                              title="Review exam exercise mistakes"
                            >
                              Exam Review (
                              {progress?.finalExamProgress?.incorrectExercises
                                ? Object.keys(
                                    progress.finalExamProgress
                                      .incorrectExercises,
                                  ).length
                                : 0}
                              )
                            </Button>
                          )}
                      </div>
                    </div>
                  </Card>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
