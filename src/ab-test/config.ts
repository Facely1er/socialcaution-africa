/**
 * A/B Test Configuration
 *
 * Variant detection priority:
 * 1. VITE_AB_VARIANT env var (Netlify env per-site / .env.local)
 * 2. Subdomain: alpha.socialcaution.com → 'A'
 *               beta.socialcaution.com  → 'B'
 * 3. Default: 'A'
 */

export type ABVariant = 'A' | 'B';

export interface ABTestConfig {
  variant: ABVariant;
  variantLabel: string;
  entryStyle: 'persona-first' | 'concern-first';
  description: string;
}

export function detectVariant(): ABVariant {
  // 1. Env var override (Netlify env / .env.local)
  const envVariant = import.meta.env.VITE_AB_VARIANT as string | undefined;
  if (envVariant === 'A' || envVariant === 'B') return envVariant;

  // 2. Subdomain detection
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname.toLowerCase();
    if (hostname.startsWith('alpha.')) return 'A';
    if (hostname.startsWith('beta.'))  return 'B';
  }

  return 'A';
}

export function getABConfig(): ABTestConfig {
  const variant = detectVariant();
  return {
    variant,
    variantLabel: variant === 'A' ? 'Persona-First' : 'Concern-First',
    entryStyle: variant === 'A' ? 'persona-first' : 'concern-first',
    description:
      variant === 'A'
        ? 'User selects a persona (Who are you?) before the onboarding wizard'
        : 'User selects primary concerns before the onboarding wizard',
  };
}

/** Fire a structured GA4 event for A/B tracking. */
export function trackABEvent(
  step: string,
  extra?: Record<string, string | number | boolean>
): void {
  const { variant } = getABConfig();
  const payload = {
    ab_variant: variant,
    ab_step: step,
    ab_context: 'parent_journey',
    ...extra,
  };
  try {
    if (
      typeof window !== 'undefined' &&
      typeof (window as Record<string, unknown>).gtag === 'function'
    ) {
      (window as Record<string, unknown> & { gtag: (...args: unknown[]) => void }).gtag('event', 'ab_test_event', payload);
    }
  } catch {
    // silently ignore analytics errors in test environments
  }
}
