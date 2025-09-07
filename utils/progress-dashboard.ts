import { ExerciseState } from '../hooks/use-consolidated-exercise-state';

export interface DashboardStats {
  totalExercises: number;
  correctAnswers: number;
  accuracy: number;
  streakInfo: {
    current: number;
    longest: number;
  };
  categoryBreakdown: Array<{
    category: string;
    label: string;
    correct: number;
    total: number;
    accuracy: number;
  }>;
  recentActivity: Array<{
    mode: string;
    timestamp: number;
    correct: number;
    total: number;
  }>;
}

export function calculateDashboardStats(
  exerciseState: ExerciseState,
  sessionHistory?: any[],
): DashboardStats {
  const { sessionScores } = exerciseState;

  // Calculate totals across all exercise types
  const totals = Object.values(sessionScores).reduce(
    (
      acc: { correct: number; total: number },
      score: { correct: number; total: number },
    ) => ({
      correct: acc.correct + score.correct,
      total: acc.total + score.total,
    }),
    { correct: 0, total: 0 },
  );

  // Category breakdown with readable labels
  const categoryLabels: Record<string, string> = {
    vocabulary: 'Vocabulary',
    articles: 'Articles (de/het)',
    plural: 'Plural Forms',
    perfect: 'Perfect Tense',
    imperfectum: 'Imperfectum',
    modalverbs: 'Modal Verbs',
    conjunctions: 'Conjunctions',
    test1: 'Test 1',
    test2: 'Test 2',
    finaltest: 'Final Test',
    default: 'General',
  };

  const categoryBreakdown = Object.entries(sessionScores)
    .filter(
      ([_, score]: [string, { correct: number; total: number }]) =>
        score.total > 0,
    )
    .map(([category, score]: [string, { correct: number; total: number }]) => ({
      category,
      label: categoryLabels[category] || category,
      correct: score.correct,
      total: score.total,
      accuracy: score.total > 0 ? (score.correct / score.total) * 100 : 0,
    }))
    .sort((a, b) => b.total - a.total);

  // Calculate current streak (simplified - based on recent performance)
  let currentStreak = 0;
  let longestStreak = 0;

  // This is a simplified streak calculation
  // In a real implementation, you'd track individual answer history
  if (totals.total > 0) {
    const recentAccuracy = totals.correct / totals.total;
    if (recentAccuracy > 0.7) {
      // 70% accuracy threshold
      currentStreak = Math.min(totals.correct, 5); // Max 5 for demo
    }
    longestStreak = Math.max(currentStreak, Math.min(totals.correct, 8));
  }

  // Recent activity (last few sessions)
  const recentActivity = categoryBreakdown
    .slice(0, 5)
    .map((cat) => ({
      mode: cat.category,
      timestamp: Date.now() - Math.random() * 3600000, // Mock timestamps
      correct: cat.correct,
      total: cat.total,
    }))
    .sort((a, b) => b.timestamp - a.timestamp);

  return {
    totalExercises: totals.total,
    correctAnswers: totals.correct,
    accuracy: totals.total > 0 ? (totals.correct / totals.total) * 100 : 0,
    streakInfo: {
      current: currentStreak,
      longest: longestStreak,
    },
    categoryBreakdown,
    recentActivity,
  };
}

export function getProgressMessage(
  accuracy: number,
  totalExercises: number,
): string {
  if (totalExercises === 0) {
    return 'Ready to start your Dutch learning journey! 🇳🇱';
  }

  if (accuracy >= 90) {
    return "Excellent work! You're mastering Dutch! 🏆";
  } else if (accuracy >= 80) {
    return 'Great progress! Keep up the good work! 🌟';
  } else if (accuracy >= 70) {
    return "Good effort! You're improving steadily! 📈";
  } else if (accuracy >= 60) {
    return 'Making progress! Practice makes perfect! 💪';
  } else {
    return 'Keep practicing! Every mistake is a learning opportunity! 🌱';
  }
}

export function getExerciseRecommendations(stats: DashboardStats): Array<{
  mode: string;
  reason: string;
  priority: 'high' | 'medium' | 'low';
}> {
  const recommendations: Array<{
    mode: string;
    reason: string;
    priority: 'high' | 'medium' | 'low';
  }> = [];

  // Recommend categories with low accuracy
  const weakCategories = stats.categoryBreakdown
    .filter((cat) => cat.accuracy < 70 && cat.total >= 3)
    .slice(0, 2);

  weakCategories.forEach((cat) => {
    recommendations.push({
      mode: cat.category,
      reason: `Improve ${cat.label} accuracy (${cat.accuracy.toFixed(0)}%)`,
      priority: 'high' as const,
    });
  });

  // Recommend untried or underused categories
  const allModes = [
    'vocabulary',
    'articles',
    'plural',
    'perfect',
    'imperfectum',
  ];
  const underusedModes = allModes.filter((mode) => {
    const cat = stats.categoryBreakdown.find((c) => c.category === mode);
    return !cat || cat.total < 5;
  });

  underusedModes.slice(0, 2).forEach((mode) => {
    const label =
      {
        vocabulary: 'Vocabulary',
        articles: 'Articles',
        plural: 'Plural Forms',
        perfect: 'Perfect Tense',
        imperfectum: 'Imperfectum',
      }[mode] || mode;

    recommendations.push({
      mode,
      reason: `Try ${label} exercises`,
      priority: 'medium' as const,
    });
  });

  return recommendations.slice(0, 3); // Max 3 recommendations
}
