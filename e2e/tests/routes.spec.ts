import { test, expect } from '@playwright/test';
import { getAllGuideIds, getAllChecklistIds } from '../../src/data/privacyResources';

/** Dismiss dev-only UI that blocks interactions. */
async function dismissDevOverlays(page: import('@playwright/test').Page) {
  const closeChecklist = page.getByRole('button', { name: /Close production checklist/i });
  if (await closeChecklist.isVisible().catch(() => false)) {
    await closeChecklist.click();
  }
}

async function assertNot404(page: import('@playwright/test').Page, path: string) {
  await page.goto(path, { waitUntil: 'domcontentloaded' });
  await dismissDevOverlays(page);

  await expect(page).not.toHaveURL(/\/404\/?$/, { timeout: 15_000 });
  await expect(
    page.getByRole('heading', { name: /404:\s*Page Not Found/i })
  ).not.toBeVisible({ timeout: 5_000 });
  await expect(page.getByRole('heading', { name: /Unexpected Application Error!/i })).not.toBeVisible({
    timeout: 5_000,
  });

  await expect(page.getByRole('heading').first()).toBeVisible({ timeout: 15_000 });
}

/** All static routes registered in App.tsx */
const STATIC_ROUTES = [
  '/',
  '/persona-selection',
  '/cautions',
  '/simple-dashboard',
  '/parent',
  '/parent/onboarding',
  '/parent/dashboard',
  '/parent/dashboard/action-plan',
  '/about',
  '/features',
  '/how-it-works',
  '/help',
  '/help/action-plan',
  '/help/getting-started',
  '/toolkit',
  '/resources',
  '/privacy-journey',
  '/30-day-roadmap',
  '/privacy-focus',
  '/personas',
  '/personas/cautious-parent',
  '/personas/private-individual',
  '/personas/online-shopper',
  '/personas/social-influencer',
  '/personas/privacy-advocate',
  '/personas/concerned-employee',
  '/assessment',
  '/assessment/exposure',
  '/assessment/rights',
  '/assessment/security',
  '/assessment/results',
  '/test-assessment',
  '/privacy-action-center',
  '/resources/guides',
  '/resources/checklists',
  '/resources/tools',
  '/resources/tools/privacy-assessment',
  '/resources/tools/personal-data-inventory',
  '/resources/tools/password-strength',
  '/blog',
  '/blog/privacy-importance',
  '/blog/data-protection-laws-2024',
  '/blog/privacy-tools-social-media',
  '/blog/children-privacy-protection',
  '/blog/hidden-cost-free-services',
  '/blog/privacy-browsers-comparison',
  '/blog/privacy-laws-2025',
  '/blog/workplace-privacy',
  '/dashboard',
  '/dashboard/action-plan',
  '/dashboard/history',
  '/dashboard/exposure-check',
  '/dashboard/rights-checkup',
  '/dashboard/complete-assessment',
  '/dashboard/profile',
  '/dashboard/settings',
  '/dashboard/notifications',
  '/dashboard/help',
  '/privacy-laws',
  '/privacy-laws/gdpr',
  '/privacy-laws/global-privacy-act',
  '/privacy-laws/us-privacy',
  '/privacy-laws/enforcement',
  '/privacy',
  '/terms',
  '/cookies',
  '/acceptable-use',
  '/pricing',
  '/contact',
  '/africa',
  '/africa/countries',
  '/africa/countries/cote-divoire',
  '/africa/countries/ghana',
  '/africa/countries/kenya',
  '/africa/countries/nigeria',
  '/africa/countries/south-africa',
  '/africa/scamshield',
  '/africa/sources',
  '/africa/personas/kenya',
  '/africa/action-center/kenya',
];

/** Routes linked in UI that redirect to registered pages */
const REDIRECTED_LINK_TARGETS: Array<{ path: string; expectedUrl: RegExp }> = [
  { path: '/legal', expectedUrl: /\/privacy-laws\/?$/ },
  { path: '/dashboard/preferences', expectedUrl: /\/dashboard\/settings\/?$/ },
  { path: '/dashboard/security', expectedUrl: /\/dashboard\/settings\/?$/ },
  { path: '/dashboard/privacy', expectedUrl: /\/dashboard\/settings\/?$/ },
  { path: '/dashboard/billing', expectedUrl: /\/pricing\/?$/ },
  { path: '/dashboard/data-export', expectedUrl: /\/dashboard\/profile\/?$/ },
  { path: '/dashboard/account-deletion', expectedUrl: /\/dashboard\/settings\/?$/ },
];

test.describe('Route audit — registered pages', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => {
      localStorage.setItem(
        'ermits-demo-data',
        JSON.stringify({
          user: { selectedPersona: 'parent' },
          selectedPersona: 'parent',
        })
      );
    });
    await dismissDevOverlays(page);
  });

  for (const path of STATIC_ROUTES) {
    test(`loads without 404: ${path}`, async ({ page }) => {
      await assertNot404(page, path);
    });
  }

  for (const guideId of getAllGuideIds()) {
    test(`loads guide without 404: /resources/guides/${guideId}`, async ({ page }) => {
      await page.goto(`/resources/guides/${guideId}`, { waitUntil: 'domcontentloaded' });
      await dismissDevOverlays(page);

      await expect(page).not.toHaveURL(/\/404\/?$/);
      await expect(
        page.getByRole('heading', { name: /404:\s*Page Not Found|Guide Not Found/i })
      ).not.toBeVisible({ timeout: 10_000 });
    });
  }

  for (const checklistId of getAllChecklistIds()) {
    test(`loads checklist without 404: /resources/checklists/${checklistId}`, async ({
      page,
    }) => {
      await page.goto(`/resources/checklists/${checklistId}`, { waitUntil: 'domcontentloaded' });
      await dismissDevOverlays(page);

      await expect(page).not.toHaveURL(/\/404\/?$/);
      await expect(
        page.getByRole('heading', { name: /404:\s*Page Not Found|Checklist Not Found/i })
      ).not.toBeVisible({ timeout: 10_000 });
    });
  }
});

test.describe('Route audit — catch-all', () => {
  test('unknown path shows 404 page', async ({ page }) => {
    await page.goto('/this-route-does-not-exist-xyz');
    await dismissDevOverlays(page);
    await expect(page).toHaveURL(/\/404\/?$/);
    await expect(page.getByRole('heading', { name: /404:\s*Page Not Found/i })).toBeVisible({
      timeout: 10_000,
    });
  });
});

test.describe('Route audit — redirected link targets', () => {
  for (const { path, expectedUrl } of REDIRECTED_LINK_TARGETS) {
    test(`redirects without 404: ${path}`, async ({ page }) => {
      await page.goto(path, { waitUntil: 'domcontentloaded' });
      await dismissDevOverlays(page);
      await expect(page).toHaveURL(expectedUrl, { timeout: 15_000 });
      await expect(page.getByRole('heading', { name: /404:\s*Page Not Found/i })).not.toBeVisible();
    });
  }
});
