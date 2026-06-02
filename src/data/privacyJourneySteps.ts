export interface PrivacyJourneyStep {
  id: string;
  title: string;
  path: string;
}

/** Linear onboarding flow shown in the sticky progress tracker */
export const PRIVACY_JOURNEY_STEPS: PrivacyJourneyStep[] = [
  { id: 'home', title: 'Welcome', path: '/' },
  { id: 'personas', title: 'Find Your Persona', path: '/personas' },
  { id: 'assessment', title: 'Take Assessment', path: '/assessment' },
  { id: 'dashboard', title: 'View Dashboard', path: '/dashboard' },
  { id: 'resources', title: 'Explore Resources', path: '/resources' },
  { id: 'journey', title: 'Privacy Journey', path: '/privacy-journey' },
];

export interface PrivacyJourneyProgress {
  stepNumber: number;
  total: number;
  progress: number;
  currentStep: PrivacyJourneyStep;
}

export function getPrivacyJourneyProgress(pathname: string): PrivacyJourneyProgress | null {
  const index = PRIVACY_JOURNEY_STEPS.findIndex(
    (step) =>
      pathname === step.path ||
      (step.path !== '/' && pathname.startsWith(`${step.path}/`))
  );

  if (index === -1) return null;

  const stepNumber = index + 1;
  const total = PRIVACY_JOURNEY_STEPS.length;

  return {
    stepNumber,
    total,
    progress: (stepNumber / total) * 100,
    currentStep: PRIVACY_JOURNEY_STEPS[index],
  };
}

/** Pages that belong to the onboarding flow (excludes home — no sticky bar there) */
export function shouldShowPrivacyJourneyProgress(pathname: string): boolean {
  if (pathname === '/') return false;
  return getPrivacyJourneyProgress(pathname) !== null;
}
