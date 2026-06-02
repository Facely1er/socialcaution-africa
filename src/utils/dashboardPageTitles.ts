export type DashboardPageMeta = {
  title: string;
  subtitle?: string;
};

/** Single source of truth for dashboard page titles, subtitles, and breadcrumbs. */
export const DASHBOARD_PAGE_META: Record<string, DashboardPageMeta> = {
  '/dashboard': {
    title: 'Dashboard',
  },
  '/dashboard/history': {
    title: 'Assessment History',
    subtitle: 'Track your privacy assessment progress over time',
  },
  '/dashboard/settings': {
    title: 'Settings',
    subtitle: 'Manage your privacy preferences and account settings',
  },
  '/dashboard/profile': {
    title: 'Profile',
    subtitle: 'Manage your account settings and preferences',
  },
  '/dashboard/help': {
    title: 'Help & Support',
    subtitle: 'Get help with using SocialCaution and protecting your privacy',
  },
  '/dashboard/notifications': {
    title: 'Notifications',
    subtitle: 'View and manage your privacy notifications and alerts',
  },
  '/dashboard/action-plan': {
    title: 'Action Plan',
    subtitle: 'Your personalized privacy improvement roadmap',
  },
  '/dashboard/exposure-check': {
    title: 'Exposure Check',
    subtitle: 'Assess your digital exposure and privacy risks',
  },
  '/dashboard/rights-checkup': {
    title: 'Privacy Rights Checkup',
    subtitle: 'Evaluate your understanding and exercise of privacy rights across platforms',
  },
  '/dashboard/complete-assessment': {
    title: 'Complete Assessment',
    subtitle: 'Complete your security awareness assessment',
  },
};

function normalizeDashboardPath(pathname: string): string {
  const trimmed = pathname.replace(/\/$/, '');
  return trimmed || '/dashboard';
}

export function getDashboardPageMeta(pathname: string): DashboardPageMeta | null {
  return DASHBOARD_PAGE_META[normalizeDashboardPath(pathname)] ?? null;
}

export function getDashboardPageTitle(pathname: string): string {
  return getDashboardPageMeta(pathname)?.title ?? 'Dashboard';
}

export function getDashboardBreadcrumbs(
  pathname: string
): Array<{ label: string; path?: string }> {
  const normalized = normalizeDashboardPath(pathname);
  if (normalized === '/dashboard') return [];

  const meta = getDashboardPageMeta(normalized);
  if (!meta) return [];

  return [{ label: meta.title, path: normalized }];
}
