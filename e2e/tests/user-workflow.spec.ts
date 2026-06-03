import { test, expect } from '@playwright/test';

const MAX_SECURITY_QUESTIONS = 12;

async function dismissDevOverlays(page: import('@playwright/test').Page) {
  const closeChecklist = page.getByRole('button', { name: /Close production checklist/i });
  if (await closeChecklist.isVisible().catch(() => false)) {
    await closeChecklist.click();
  }
}

async function clearAppStorage(page: import('@playwright/test').Page) {
  await page.goto('/');
  await page.evaluate(() => {
    localStorage.clear();
    sessionStorage.clear();
  });
  await dismissDevOverlays(page);
}

async function completeSecurityAssessment(page: import('@playwright/test').Page) {
  await page.goto('/assessment/security', { waitUntil: 'networkidle' });
  await dismissDevOverlays(page);
  await expect(page.getByRole('heading', { name: 'Security Assessment' }).first()).toBeVisible({
    timeout: 30_000,
  });
  await page.getByText('Start Assessment', { exact: true }).click();

  for (let i = 0; i < MAX_SECURITY_QUESTIONS; i++) {
    const option = page.locator('.space-y-4.mt-6 > div').first();
    await expect(option).toBeVisible({ timeout: 10_000 });
    await option.click();

    const completeBtn = page.getByRole('button', { name: 'Complete' });
    if (await completeBtn.isVisible()) {
      await expect(completeBtn).toBeEnabled({ timeout: 5_000 });
      await completeBtn.click();
      break;
    }

    const nextBtn = page.getByRole('button', { name: 'Next' });
    await expect(nextBtn).toBeEnabled({ timeout: 5_000 });
    await nextBtn.click();
  }

  await expect(page).toHaveURL(/\/assessment\/results/, { timeout: 20_000 });
  await dismissDevOverlays(page);
  await expect(
    page.getByRole('heading', { name: /Security Assessment Results/i }).first()
  ).toBeVisible({ timeout: 20_000 });
}

test.describe('User workflow — Africa Edition', () => {
  test.beforeEach(async ({ page }) => {
    await clearAppStorage(page);
  });

  test('home shows Africa Edition and primary CTAs', async ({ page }) => {
    await page.goto('/');
    await dismissDevOverlays(page);
    await expect(page).toHaveTitle(/Social\s*Caution|SocialCaution/i);
    await expect(page.getByRole('heading', { name: /SocialCaution Africa/i }).first()).toBeVisible({
      timeout: 15_000,
    });
    await expect(page.getByRole('link', { name: /Explore Countries/i }).first()).toBeVisible();
    await expect(page.getByRole('link', { name: /Open ScamShield/i }).first()).toBeVisible();
  });

  test('countries → country profile → personas → action center', async ({ page }) => {
    await page.goto('/africa/countries');
    await dismissDevOverlays(page);
    await expect(page.getByRole('heading', { name: /Country/i }).first()).toBeVisible({
      timeout: 15_000,
    });

    await page.getByRole('link', { name: /Kenya/i }).first().click();
    await expect(page).toHaveURL(/\/africa\/countries\/kenya/, { timeout: 15_000 });

    const personasLink = page.getByRole('link', { name: /user profiles|personas/i }).first();
    if (await personasLink.isVisible().catch(() => false)) {
      await personasLink.click();
      await expect(page).toHaveURL(/\/africa\/personas\/kenya/, { timeout: 15_000 });
      await page.getByRole('button', { name: /Continue to Action Center/i }).first().click();
      await expect(page).toHaveURL(/\/africa\/action-center\/kenya/, { timeout: 15_000 });
    }
  });

  test('legacy dashboard URL redirects to home', async ({ page }) => {
    await page.goto('/dashboard');
    await dismissDevOverlays(page);
    await expect(page).toHaveURL(/\/$/, { timeout: 15_000 });
    await expect(page.getByRole('heading', { name: /404/i })).not.toBeVisible();
  });

  test('assessment security flow completes to results', async ({ page }) => {
    await completeSecurityAssessment(page);
  });
});

test.describe('User workflow — navigation', () => {
  test('primary Africa nav routes resolve', async ({ page }) => {
    const routes: Array<{ path: string; heading: RegExp }> = [
      { path: '/africa/scamshield', heading: /ScamShield|Scam/i },
      { path: '/africa/sources', heading: /Source|Register/i },
      { path: '/about', heading: /About|ERMITS|Africa/i },
      { path: '/contact', heading: /Contact|ERMITS/i },
      { path: '/africa/roadmap', heading: /Africa Privacy Roadmap|roadmap/i },
    ];

    for (const { path, heading } of routes) {
      await page.goto(path, { waitUntil: 'domcontentloaded' });
      await dismissDevOverlays(page);
      await expect(page.locator('h1, h2').filter({ hasText: heading }).first()).toBeVisible({
        timeout: 20_000,
      });
      await expect(page.getByRole('heading', { name: /404/i })).not.toBeVisible();
    }
  });

  test('unknown URL shows 404 page', async ({ page }) => {
    await page.goto('/this-route-does-not-exist-xyz');
    await dismissDevOverlays(page);
    await expect(page.getByRole('heading', { name: /404/i })).toBeVisible({
      timeout: 10_000,
    });
  });
});
