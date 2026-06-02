import { useMemo } from 'react';
import { useAssessmentStore } from '../store/assessmentStore';
import { useProgressStore } from '../store/progressStore';
import { actionPlanToDashboardTasks } from '../utils/dashboardData';

/** Action plan tasks derived from assessment results + completion progress. */
export function useDashboardActionPlan() {
  const { results } = useAssessmentStore();
  const completedActions = useProgressStore((s) => s.completedActions);

  return useMemo(
    () => actionPlanToDashboardTasks(results?.actionPlan, completedActions),
    [results?.actionPlan, completedActions]
  );
}
