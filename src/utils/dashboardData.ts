import { Shield } from 'lucide-react';
import type { AssessmentResults, UserLevel } from '../types/assessment';

type ActionItem = AssessmentResults['actionPlan'][number];

export type DashboardTask = {
  id: string;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  completed: boolean;
  dueDate?: string;
  category?: string;
  estimatedTime?: string;
  resourceLink?: string;
};

export type DashboardResource = {
  id: string;
  title: string;
  type: 'guide' | 'course' | 'template';
  description: string;
  premium: boolean;
  rating?: number;
  category: string;
  priority: 'high' | 'medium' | 'low';
  path: string;
};

/** Mini-assessment result shape (exposure, rights, security widgets). */
export type MiniAssessmentResult = {
  overallScore: number;
  categoryScores: Record<string, number>;
  recommendations?: string[];
  priorityAreas?: string[];
};

const DEFAULT_RESOURCES: DashboardResource[] = [
  {
    id: 'password-management',
    title: 'Password Security Guide',
    type: 'guide',
    description: 'Learn how to create and manage secure passwords',
    premium: false,
    rating: 4.8,
    category: 'Account Security',
    priority: 'high',
    path: '/resources/guides/password-management',
  },
  {
    id: 'understanding-privacy',
    title: 'Privacy Rights Essentials',
    type: 'guide',
    description: 'Understand and exercise your privacy rights',
    premium: false,
    rating: 4.9,
    category: 'Privacy Settings',
    priority: 'high',
    path: '/resources/guides/understanding-privacy',
  },
  {
    id: 'data-broker-removal',
    title: 'Data Broker Removal Guide',
    type: 'guide',
    description: 'Remove your data from broker sites',
    premium: false,
    rating: 4.7,
    category: 'Data Protection',
    priority: 'medium',
    path: '/resources/guides/data-broker-removal',
  },
  {
    id: 'social-media-security',
    title: 'Social Media Security',
    type: 'guide',
    description: 'Secure your social media accounts and privacy settings',
    premium: false,
    rating: 4.6,
    category: 'Social Media',
    priority: 'medium',
    path: '/resources/guides/social-media-security',
  },
  {
    id: 'mobile-privacy',
    title: 'Mobile Privacy Guide',
    type: 'guide',
    description: 'Protect privacy on phones and tablets',
    premium: false,
    rating: 4.5,
    category: 'Device Security',
    priority: 'medium',
    path: '/resources/guides/mobile-privacy',
  },
];

export function priorityNumberToLevel(priority: number): 'high' | 'medium' | 'low' {
  if (priority >= 3) return 'high';
  if (priority <= 1) return 'low';
  return 'medium';
}

export function userLevelFromPercentage(percentage: number): UserLevel {
  if (percentage >= 80) return 'advanced';
  if (percentage >= 60) return 'intermediate';
  return 'beginner';
}

export function formatRiskLevel(riskLevel: string): string {
  return riskLevel.charAt(0).toUpperCase() + riskLevel.slice(1);
}

export function taskIdFromActionItem(item: ActionItem, index: number): string {
  if (item.questionId) return `action-${item.questionId}`;
  const slug = item.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 40);
  return `action-${index}-${slug}`;
}

function dueDateFromTimeframe(timeframe: string | undefined, index: number): string {
  const weeksMatch = timeframe?.match(/(\d+)\s*-\s*(\d+)\s*week/i);
  const singleWeek = timeframe?.match(/(\d+)\s*week/i);
  let days = (index + 1) * 7;
  if (weeksMatch) {
    days = parseInt(weeksMatch[2], 10) * 7;
  } else if (singleWeek) {
    days = parseInt(singleWeek[1], 10) * 7;
  }
  return new Date(Date.now() + days * 24 * 60 * 60 * 1000).toISOString();
}

export function actionPlanToDashboardTasks(
  actionPlan: ActionItem[] | undefined,
  completedIds: string[]
): DashboardTask[] {
  if (!actionPlan?.length) return [];

  return actionPlan.map((item, index) => {
    const id = taskIdFromActionItem(item, index);
    const resourceLink = item.resources?.[0]?.url;
    return {
      id,
      title: item.title,
      description:
        item.steps?.[0] ||
        item.resources?.[0]?.title ||
        `Improve your ${item.category?.toLowerCase() || 'privacy'} practices`,
      priority: priorityNumberToLevel(item.priority),
      completed: completedIds.includes(id),
      dueDate: dueDateFromTimeframe(item.timeframe, index),
      category: item.category,
      estimatedTime: item.timeframe,
      resourceLink: resourceLink?.startsWith('/') ? resourceLink : undefined,
    };
  });
}

export function categoryScoresFromResults(results: AssessmentResults): Record<string, number> {
  if (results.categoryScores && Object.keys(results.categoryScores).length > 0) {
    return results.categoryScores;
  }

  const byCategory: Record<string, { total: number; count: number }> = {};
  for (const item of results.actionPlan) {
    if (!item.category) continue;
    if (!byCategory[item.category]) {
      byCategory[item.category] = { total: 0, count: 0 };
    }
    // Lower priority number = weaker area → lower implied score
    const implied = Math.max(20, 100 - item.priority * 15 - item.criticality * 5);
    byCategory[item.category].total += implied;
    byCategory[item.category].count += 1;
  }

  return Object.fromEntries(
    Object.entries(byCategory).map(([cat, { total, count }]) => [
      cat,
      Math.round(total / count),
    ])
  );
}

function recommendationsToActionPlan(
  recommendations: string[] = [],
  priorityAreas: string[] = []
): ActionItem[] {
  const titles = [...new Set([...priorityAreas, ...recommendations])].slice(0, 8);
  return titles.map((title, index) => ({
    title,
    timeframe: `${index + 1}-${index + 2} weeks`,
    steps: [title],
    resources: [],
    icon: Shield,
    priority: index === 0 ? 3 : index < 3 ? 2 : 1,
    category: priorityAreas[0] || 'Privacy',
    questionId: `mini-${index}`,
    criticality: 3,
    complexity: 2,
  }));
}

/** Convert exposure / rights / security mini-results into persisted assessment data. */
export function miniAssessmentToResults(
  mini: MiniAssessmentResult,
  assessmentType: 'exposure' | 'rights' | 'security'
): AssessmentResults {
  const percentage = mini.overallScore;
  return {
    score: percentage,
    maxScore: 100,
    percentage,
    userLevel: userLevelFromPercentage(percentage),
    categoryScores: mini.categoryScores,
    assessmentType,
    actionPlan: recommendationsToActionPlan(
      mini.recommendations,
      mini.priorityAreas
    ),
  };
}

export function mergeAssessmentResults(
  existing: AssessmentResults | null,
  incoming: AssessmentResults
): AssessmentResults {
  if (!existing) return incoming;

  const categoryScores = {
    ...categoryScoresFromResults(existing),
    ...incoming.categoryScores,
  };

  const seen = new Set<string>();
  const actionPlan = [...incoming.actionPlan, ...existing.actionPlan].filter((item) => {
    const key = item.title.toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  return {
    score: incoming.score,
    maxScore: incoming.maxScore,
    percentage: incoming.percentage,
    userLevel: incoming.userLevel,
    categoryScores,
    assessmentType: incoming.assessmentType ?? existing.assessmentType,
    actionPlan: actionPlan.slice(0, 12),
  };
}

export function getRecommendedResources(
  categoryScores: Record<string, number>,
  improvementAreaNames: string[]
): DashboardResource[] {
  const priorityAreas =
    improvementAreaNames.length > 0
      ? improvementAreaNames
      : Object.entries(categoryScores)
          .filter(([, score]) => score < 70)
          .sort(([, a], [, b]) => a - b)
          .map(([name]) => name);

  const sorted = [...DEFAULT_RESOURCES].sort((a, b) => {
    const aMatch = priorityAreas.some(
      (p) => p.toLowerCase() === a.category.toLowerCase() || a.category.toLowerCase().includes(p.toLowerCase())
    );
    const bMatch = priorityAreas.some(
      (p) => p.toLowerCase() === b.category.toLowerCase() || b.category.toLowerCase().includes(p.toLowerCase())
    );
    if (aMatch !== bMatch) return aMatch ? -1 : 1;
    const aScore = categoryScores[a.category] ?? 100;
    const bScore = categoryScores[b.category] ?? 100;
    return aScore - bScore;
  });

  return sorted.slice(0, 3);
}

export function persistMiniAssessment(
  mini: MiniAssessmentResult,
  type: 'exposure' | 'rights' | 'security',
  setResults: (results: AssessmentResults, userLevel: UserLevel) => void,
  getExisting: () => AssessmentResults | null
): void {
  const incoming = miniAssessmentToResults(mini, type);
  const merged = mergeAssessmentResults(getExisting(), incoming);
  setResults(merged, merged.userLevel);
}
