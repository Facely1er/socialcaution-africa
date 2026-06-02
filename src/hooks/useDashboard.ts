import { useState, useEffect, useCallback } from 'react';
import apiService from '../services/api';
import { isBackendEnabled } from '../config/runtime';
import { useAssessmentStore } from '../store/assessmentStore';
import { useProgressStore } from '../store/progressStore';
import {
  actionPlanToDashboardTasks,
  categoryScoresFromResults,
  type DashboardTask,
  type DashboardResource,
  getRecommendedResources,
} from '../utils/dashboardData';

export interface DashboardData {
  privacyScore: number;
  userLevel: string;
  riskLevel: string;
  lastAssessmentDate: string | null;
  categoryScores: Record<string, number>;
  assessmentHistory: Array<{
    date: string;
    score: number;
    type: string;
  }>;
  upcomingTasks: Array<{
    id: string;
    title: string;
    description: string;
    priority: string;
    dueDate?: string;
  }>;
  actionPlanTasks: DashboardTask[];
  completedActionCount: number;
  totalActionCount: number;
  improvementAreaCount: number;
  recommendedResources: DashboardResource[];
  riskLevelDistribution: Record<string, number>;
  privacyProfile: Record<string, unknown>;
  totalAssessments: number;
  improvementAreas: Array<{
    category: string;
    score: number;
    description: string;
    priority: string;
  }>;
  strengths: Array<{
    category: string;
    score: number;
    description: string;
  }>;
}

export const useDashboard = () => {
  const [data, setData] = useState<DashboardData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { results, lastAssessmentDate, scoreHistory } = useAssessmentStore();
  const completedActions = useProgressStore((s) => s.completedActions);

  const getLocalDashboardData = useCallback((): DashboardData | null => {
    if (!results) {
      return null;
    }

    const privacyScore = results.percentage;
    const userLevel = results.userLevel;
    const categoryScores = categoryScoresFromResults(results);

    let riskLevel = 'low';
    if (privacyScore < 40) riskLevel = 'high';
    else if (privacyScore < 70) riskLevel = 'medium';

    const actionPlanTasks = actionPlanToDashboardTasks(
      results.actionPlan,
      completedActions
    );

    const completedActionCount = actionPlanTasks.filter((t) => t.completed).length;
    const totalActionCount = actionPlanTasks.length;

    const assessmentHistory =
      scoreHistory.length > 0
        ? scoreHistory
        : [
            {
              date: (lastAssessmentDate || new Date().toISOString()).split('T')[0],
              score: privacyScore,
              type:
                results.assessmentType === 'exposure'
                  ? 'Exposure Check'
                  : results.assessmentType === 'rights'
                    ? 'Rights Checkup'
                    : results.assessmentType === 'security'
                      ? 'Security Assessment'
                      : 'Privacy Assessment',
            },
          ];

    const upcomingTasks = actionPlanTasks
      .filter((t) => !t.completed)
      .slice(0, 6)
      .map(({ id, title, description, priority, dueDate }) => ({
        id,
        title,
        description,
        priority,
        dueDate,
      }));

    const improvementAreas = Object.entries(categoryScores)
      .filter(([, score]) => score < 70)
      .map(([category, score]) => ({
        category,
        score,
        description: `Improve your ${category.toLowerCase()} practices`,
        priority: score < 50 ? 'high' : 'medium',
      }));

    const strengths = Object.entries(categoryScores)
      .filter(([, score]) => score >= 80)
      .map(([category, score]) => ({
        category,
        score,
        description: `Strong ${category.toLowerCase()} practices`,
      }));

    const recommendedResources = getRecommendedResources(
      categoryScores,
      improvementAreas.map((a) => a.category)
    );

    return {
      privacyScore,
      userLevel,
      riskLevel,
      lastAssessmentDate,
      categoryScores,
      assessmentHistory,
      upcomingTasks,
      actionPlanTasks,
      completedActionCount,
      totalActionCount,
      improvementAreaCount: improvementAreas.length,
      recommendedResources,
      riskLevelDistribution: {
        low: riskLevel === 'low' ? 1 : 0,
        medium: riskLevel === 'medium' ? 1 : 0,
        high: riskLevel === 'high' ? 1 : 0,
      },
      privacyProfile: {
        persona: userLevel,
        riskLevel,
        lastAssessmentDate,
        overallScore: privacyScore,
      },
      totalAssessments: assessmentHistory.length,
      improvementAreas,
      strengths,
    };
  }, [results, lastAssessmentDate, completedActions, scoreHistory]);

  const fetchDashboardData = useCallback(async () => {
    const localData = getLocalDashboardData();

    if (!isBackendEnabled()) {
      setError(null);
      setData(localData);
      return;
    }

    try {
      setError(null);
      const response = await apiService.getDashboardOverview();

      if (response.status === 'success' && response.data) {
        const apiData = response.data;
        const categoryScores = apiData.categoryScores || localData?.categoryScores || {};
        const improvementAreas =
          apiData.improvementAreas || localData?.improvementAreas || [];

        setData({
          privacyScore: apiData.privacyScore ?? localData?.privacyScore ?? 0,
          userLevel: apiData.userLevel || 'beginner',
          riskLevel: apiData.riskLevel || 'low',
          lastAssessmentDate: apiData.lastAssessmentDate || localData?.lastAssessmentDate || null,
          categoryScores,
          assessmentHistory: apiData.assessmentHistory || localData?.assessmentHistory || [],
          upcomingTasks: apiData.upcomingTasks || localData?.upcomingTasks || [],
          actionPlanTasks: localData?.actionPlanTasks || [],
          completedActionCount: localData?.completedActionCount ?? 0,
          totalActionCount: localData?.totalActionCount ?? 0,
          improvementAreaCount: improvementAreas.length,
          recommendedResources:
            localData?.recommendedResources ||
            getRecommendedResources(
              categoryScores,
              improvementAreas.map((a: { category: string }) => a.category)
            ),
          riskLevelDistribution: apiData.riskLevelDistribution || {},
          privacyProfile: apiData.privacyProfile || {},
          totalAssessments: apiData.totalAssessments || 0,
          improvementAreas,
          strengths: apiData.strengths || localData?.strengths || [],
        });
      } else {
        throw new Error(response.message || 'Failed to fetch dashboard data');
      }
    } catch (err) {
      if (import.meta.env.DEV) {
        console.warn('[Dashboard] API unavailable, using local assessment data.', err);
      }
      setError(null);
      setData(localData);
    }
  }, [getLocalDashboardData]);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  const refetch = () => {
    fetchDashboardData();
  };

  return {
    data,
    error,
    refetch,
  };
};
