import {
  ExerciseMode,
  isExamMode,
  isFinalTestMode,
  ProgressData,
} from '@/types/exercise-types';

interface ProgressCalculatorParams {
  exerciseMode: ExerciseMode;
  finalTestMode: string;
  queues: {
    exercise: any;
    test1: any;
    test2: any;
    perfect: any;
    imperfectum: any;
    modalVerbs: any;
    conjunctions: any;
    finalTest: any;
  };
  getExamProgress: () => ProgressData;
}

export class ProgressCalculator {
  constructor(private params: ProgressCalculatorParams) {}

  getCurrentProgress(): ProgressData {
    const { exerciseMode, finalTestMode, queues, getExamProgress } =
      this.params;

    // Handle final test mode with potential exam submodes
    if (isFinalTestMode(exerciseMode)) {
      if (isExamMode(finalTestMode)) {
        return getExamProgress();
      }
      return queues.finalTest.getProgress();
    }

    // Handle other exercise modes
    switch (exerciseMode) {
      case 'test1':
        return queues.test1.getTestProgress();
      case 'test2':
        return queues.test2.getTestProgress();
      case 'perfect':
        return queues.perfect.getProgress();
      case 'imperfectum':
        return queues.imperfectum.getProgress();
      case 'modalverbs':
        return queues.modalVerbs.getProgress();
      case 'conjunctions':
        return queues.conjunctions.getProgress();
      default:
        return queues.exercise.getProgress();
    }
  }

  getProgressText(): string {
    const progress = this.getCurrentProgress();
    return `${progress.current + 1} of ${progress.total}`;
  }

  getProgressPercentage(): number {
    const progress = this.getCurrentProgress();
    return (
      progress.percentage ||
      (progress.total > 0 ? (progress.current / progress.total) * 100 : 0)
    );
  }

  getReviewModeText(): string | null {
    const { exerciseMode, finalTestMode } = this.params;

    if (isFinalTestMode(exerciseMode)) {
      return 'Review Mode: Practicing Mistakes';
    }

    if (exerciseMode === 'test1' || exerciseMode === 'test2') {
      return 'Review Mode: Practicing Incorrect Answers';
    }

    return null;
  }
}

export function createProgressCalculator(params: ProgressCalculatorParams) {
  return new ProgressCalculator(params);
}
