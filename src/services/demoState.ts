import { useAssessmentStore } from '../store/assessmentStore';
import { useProgressStore } from '../store/progressStore';
import { useAppModeStore } from '../store/appModeStore';
import {
  DEMO_ASSESSMENT_RESULTS,
  DEMO_COMPLETED_ACTION_IDS,
  DEMO_LAST_ASSESSMENT_DATE,
  DEMO_SCORE_HISTORY,
} from '../data/demoSeedData';

const DEMO_STORAGE_KEYS = [
  'social-caution-assessment',
  'social-caution-progress',
  'social-caution-assessments',
  'social-caution-action-plan',
  'assessment-results',
] as const;

function removeStorageKeys(keys: readonly string[]) {
  if (typeof window === 'undefined') return;
  keys.forEach((key) => localStorage.removeItem(key));
}

/** Load seeded demo dashboard / assessment data into stores. */
export function seedDemoState() {
  useAppModeStore.getState().setMode('demo');

  useAssessmentStore.setState({
    results: DEMO_ASSESSMENT_RESULTS,
    userLevel: DEMO_ASSESSMENT_RESULTS.userLevel,
    lastAssessmentDate: DEMO_LAST_ASSESSMENT_DATE,
    scoreHistory: DEMO_SCORE_HISTORY,
  });

  const progress = useProgressStore.getState();
  progress.resetProgress();
  useProgressStore.setState({
    totalPoints: 175,
    level: 2,
    currentLevelPoints: 75,
    nextLevelPoints: 100,
    streak: 4,
    lastActivityDate: DEMO_LAST_ASSESSMENT_DATE,
    completedActions: [...DEMO_COMPLETED_ACTION_IDS],
    assessmentCount: 3,
    achievements: progress.achievements.map((a) => {
      if (a.id === 'first-assessment' || a.id === 'action-hero') {
        return { ...a, unlocked: true, unlockedAt: DEMO_LAST_ASSESSMENT_DATE };
      }
      return { ...a, unlocked: false, unlockedAt: undefined };
    }),
  });
}

/** Clear demo/user dashboard data and switch to a fresh live session. */
export function startFreshSession() {
  useAppModeStore.getState().setMode('live');

  useAssessmentStore.getState().clearResults();
  useProgressStore.getState().resetProgress();

  removeStorageKeys(DEMO_STORAGE_KEYS);
}

/** Re-apply demo seed (e.g. after corrupted state). */
export function ensureDemoState() {
  if (useAppModeStore.getState().mode === 'demo') {
    seedDemoState();
  }
}
