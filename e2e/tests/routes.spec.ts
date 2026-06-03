import { test, expect } from '@playwright/test';

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

/** Africa Edition routes registered in App.tsx */
const STATIC_ROUTES = [
  '/',
  '/about',
  '/contact',
  '/assessment',
  '/assessment/exposure',
  '/assessment/rights',
  '/assessment/security',
  '/assessment/results',
  '/privacy-laws',
  '/privacy',
  '/terms',
  '/cookies',
  '/acceptable-use',
  '/africa/countries',
  '/africa/countries/cote-divoire',
  '/africa/countries/ghana',
  '/africa/countries/kenya',
  '/africa/countries/nigeria',
  '/africa/countries/south-africa',
  '/africa/scamshield',
  '/africa/sources',
  '/africa/partner',
  '/africa/roadmap',
  '/africa/personas/kenya',
  '/africa/action-center/kenya',
];

/** Legacy paths that must redirect without 404 (see africaRouteRedirects.ts) */
const REDIRECTED_PATHS: Array<{ path: string; expectedUrl: RegExp }> = [
  { path: '/africa', expectedUrl: /\/$/ },
  { path: '/pricing', expectedUrl: /\/$/ },
  { path: '/blog', expectedUrl: /\/$/ },
  { path: '/dashboard', expectedUrl: /\/$/ },
  { path: '/parent', expectedUrl: /\/$/ },
  { path: '/personas', expectedUrl: /\/africa\/countries\/?$/ },
  { path: '/toolkit', expectedUrl: /\/africa\/scamshield\/?$/ },
  { path: '/privacy-laws/gdpr', expectedUrl: /\/privacy-laws\/?$/ },
  { path: '/legal', expectedUrl: /\/privacy-laws\/?$/ },
  { path: '/privacy-journey', expectedUrl: /\/africa\/roadmap\/?$/ },
];

test.describe('Route audit — Africa Edition pages', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await dismissDevOverlays(page);
  });

  for (const path of STATIC_ROUTES) {
    test(`loads without 404: ${path}`, async ({ page }) => {
      await assertNot404(page, path);
    });
  }
});

test.describe('Route audit — legacy redirects', () => {
  for (const { path, expectedUrl } of REDIRECTED_PATHS) {
    test(`redirects without 404: ${path}`, async ({ page }) => {
      await page.goto(path, { waitUntil: 'domcontentloaded' });
      await dismissDevOverlays(page);
      await expect(page).toHaveURL(expectedUrl, { timeout: 15_000 });
      await expect(page.getByRole('heading', { name: /404:\s*Page Not Found/i })).not.toBeVisible();
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
