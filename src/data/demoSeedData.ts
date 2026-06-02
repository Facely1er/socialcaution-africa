import { Shield, Lock, Globe } from 'lucide-react';
import type { AssessmentResults } from '../types/assessment';

export type ScoreHistoryEntry = {
  date: string;
  score: number;
  type: string;
};

export const DEMO_SCORE_HISTORY: ScoreHistoryEntry[] = [
  { date: '2026-02-15', score: 38, type: 'Privacy Assessment' },
  { date: '2026-03-22', score: 43, type: 'Privacy Assessment' },
  { date: '2026-04-18', score: 55, type: 'Exposure Check' },
  { date: '2026-05-28', score: 62, type: 'Privacy Assessment' },
];

export const DEMO_ASSESSMENT_RESULTS: AssessmentResults = {
  score: 62,
  maxScore: 100,
  percentage: 62,
  userLevel: 'intermediate',
  assessmentType: 'complete',
  categoryScores: {
    'Account Security': 45,
    'Privacy Settings': 72,
    'Data Sharing': 58,
    'Social Media': 68,
    'Device Security': 55,
  },
  actionPlan: [
    {
      title: 'Enable two-factor authentication',
      timeframe: 'This week',
      steps: [
        'Turn on 2FA for your email account',
        'Add an authenticator app to banking apps',
        'Save backup codes in a secure location',
      ],
      resources: [
        { title: 'Password Security Guide', url: '/resources/guides/password-management' },
      ],
      icon: Lock,
      priority: 1,
      category: 'Account Security',
      questionId: 'demo-q-1',
      criticality: 5,
      complexity: 2,
    },
    {
      title: 'Review social media privacy settings',
      timeframe: '1–2 weeks',
      steps: [
        'Set profiles to friends-only where possible',
        'Limit ad personalization and data sharing',
        'Remove unused connected apps',
      ],
      resources: [
        { title: 'Social Media Security', url: '/resources/guides/social-media-security' },
      ],
      icon: Globe,
      priority: 2,
      category: 'Social Media',
      questionId: 'demo-q-2',
      criticality: 4,
      complexity: 2,
    },
    {
      title: 'Audit app permissions on your phone',
      timeframe: '2 weeks',
      steps: [
        'Review location access for each app',
        'Revoke microphone/camera access where not needed',
        'Delete apps you no longer use',
      ],
      resources: [
        { title: 'Mobile Privacy Checklist', url: '/resources/checklists' },
      ],
      icon: Shield,
      priority: 3,
      category: 'Device Security',
      questionId: 'demo-q-3',
      criticality: 3,
      complexity: 3,
    },
    {
      title: 'Opt out of non-essential data sharing',
      timeframe: '3 weeks',
      steps: [
        'Review privacy policies for top 5 apps you use',
        'Disable marketing data sharing where available',
        'Submit opt-out requests to major data brokers',
      ],
      resources: [
        { title: 'Data Broker Removal Guide', url: '/resources/guides/data-broker-removal' },
      ],
      icon: Shield,
      priority: 4,
      category: 'Data Sharing',
      questionId: 'demo-q-4',
      criticality: 4,
      complexity: 3,
    },
  ],
};

/** Maps demo action plan items to progress store completed action ids */
export const DEMO_COMPLETED_ACTION_IDS = ['action-demo-q-1', 'action-demo-q-2'];

export const DEMO_LAST_ASSESSMENT_DATE = '2026-05-28T14:30:00.000Z';
