import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AssessmentResults, UserLevel } from '../types/assessment';

export type ScoreHistoryEntry = {
  date: string;
  score: number;
  type: string;
};

interface AssessmentState {
  results: AssessmentResults | null;
  userLevel: UserLevel | null;
  lastAssessmentDate: string | null;
  scoreHistory: ScoreHistoryEntry[];
}

interface AssessmentActions {
  setResults: (results: AssessmentResults, userLevel: UserLevel) => void;
  clearResults: () => void;
  setScoreHistory: (history: ScoreHistoryEntry[]) => void;
}

export const useAssessmentStore = create<AssessmentState & AssessmentActions>()(
  persist(
    (set) => ({
      results: null,
      userLevel: null,
      lastAssessmentDate: null,
      scoreHistory: [],

      setResults: (results, userLevel) => set({
        results,
        userLevel,
        lastAssessmentDate: new Date().toISOString(),
      }),

      clearResults: () => set({
        results: null,
        userLevel: null,
        lastAssessmentDate: null,
        scoreHistory: [],
      }),

      setScoreHistory: (history) => set({ scoreHistory: history }),
    }),
    {
      name: 'social-caution-assessment',
    }
  )
);