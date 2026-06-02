import { test, expect } from '@playwright/test';

const MAX_SECURITY_QUESTIONS = 12;

/** Dismiss dev-only UI that blocks interactions (production checklist, etc.). */
async function dismissDevOverlays(page: import('@playwright/test').Page) {
  const closeChecklist = page.getByRole('button', { name: /Close production checklist/i });
  if (await closeChecklist.isVisible().catch(() => false)) {
    await closeChecklist.click();
  }
}

/** Clear persisted assessment so each run starts fresh. */
async function clearAppStorage(page: import('@playwright/test').Page) {
  await page.goto('/');
  await page.evaluate(() => {
    localStorage.clear();
    sessionStorage.clear();
  });
  await dismissDevOverlays(page);
}

/**
 * Primary user path: assessment hub → security mini-assessment → results → store.
 * Matches production routes (/assessment/security, not unrouted 15-q Assessment.tsx).
 */
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

/** Select a demo persona so /cautions does not redirect away. */
async function selectDemoPersona(page: import('@playwright/test').Page, cardIndex = 0) {
  await page.goto('/persona-selection', { waitUntil: 'networkidle' });
  await dismissDevOverlays(page);
  await expect(
    page.getByRole('heading', { name: /Choose Your Privacy Persona/i })
  ).toBeVisible({ timeout: 20_000 });

  await page.getByRole('button', { name: /Select .+ persona/i }).nth(cardIndex).click();
  await page.getByRole('button', { name: /Continue to Cautions|Update Persona/i }).click();
  await page.waitForURL(/\/cautions/, { timeout: 20_000 });
}

/** Read the MVP demo-mode persona slug from localStorage. */
async function getDemoPersonaSlug(page: import('@playwright/test').Page) {
  return page.evaluate(() => {
    const raw = localStorage.getItem('ermits-demo-data');
    if (!raw) return null;
    return JSON.parse(raw).selectedPersona as string | null;
  });
}
/** Main app path: /personas → select profile → assessment hub. */
async function selectMainAppPersona(
  page: import('@playwright/test').Page,
  personaTitle = 'Cautious Parent'
) {
  await page.goto('/personas', { waitUntil: 'networkidle' });
  await dismissDevOverlays(page);
  await expect(
    page.locator('h1').filter({ hasText: /Find Your Privacy Profile/i }).first()
  ).toBeVisible({ timeout: 20_000 });

  await page.getByRole('heading', { name: personaTitle, level: 3 }).click();
  await page.getByRole('button', { name: new RegExp(`Continue with ${personaTitle}`) }).click();
  await page.waitForURL(/\/assessment\/?$/, { timeout: 20_000 });
}

test.describe('User workflow — core privacy journey', () => {
  test.beforeEach(async ({ page }) => {
    await clearAppStorage(page);
  });

  test('home → assessment → results → dashboard shows score', async ({ page }) => {
    await page.goto('/');
    await dismissDevOverlays(page);
    await expect(page).toHaveTitle(/Social\s*Caution|SocialCaution/i);
    await expect(page.getByRole('link', { name: 'Dashboard' }).first()).toBeVisible();
    await page.getByRole('button', { name: 'Roadmap menu' }).click();
    await expect(page.getByRole('link', { name: 'Assessment' }).first()).toBeVisible();

    await completeSecurityAssessment(page);

    await page.getByRole('button', { name: 'Go to Dashboard' }).click();
    await page.waitForURL(/\/dashboard\/?$/, { timeout: 15_000 });

    await expect(
      page.getByRole('heading', { name: 'Privacy Score', exact: true }).first()
    ).toBeVisible({ timeout: 15_000 });
    await expect(page.getByText('Start Your First Assessment')).not.toBeVisible();
  });

  test('assessment → action plan lists personalized tasks', async ({ page }) => {
    await completeSecurityAssessment(page);

    await page.goto('/dashboard/action-plan');
    await dismissDevOverlays(page);
    await expect(page.getByRole('heading', { name: /Action Plan/i }).first()).toBeVisible({
      timeout: 10_000,
    });

    const emptyState = page.getByText('No action plan yet');
    const taskList = page.locator('h4').filter({ hasText: /Improve|password|privacy|security/i });
    await expect(emptyState.or(taskList.first())).toBeVisible({ timeout: 10_000 });
    await expect(emptyState).not.toBeVisible();
  });

  test('dashboard exposure check route loads assessment widget', async ({ page }) => {
    await completeSecurityAssessment(page);

    await page.goto('/dashboard/exposure-check');
    await expect(page.getByRole('heading', { name: /Exposure Check/i })).toBeVisible({
      timeout: 10_000,
    });
    await expect(
      page.getByRole('button', { name: /Start|Begin|Check/i }).first()
    ).toBeVisible({ timeout: 10_000 });
  });
});

test.describe('User workflow — navigation & resources', () => {
  test('primary nav routes resolve without error', async ({ page }) => {
    const routes: Array<{ path: string; heading?: RegExp; title?: RegExp }> = [
      { path: '/', title: /Social\s*Caution|SocialCaution/i },
      { path: '/toolkit', heading: /Privacy Toolkit/i },
      { path: '/resources', heading: /Privacy Resources/i },
      { path: '/personas', heading: /Find Your Privacy Profile/i },
      { path: '/help', heading: /Help Center/i },
    ];

    for (const { path, heading, title } of routes) {
      await page.goto(path, { waitUntil: 'networkidle' });
      await dismissDevOverlays(page);
      if (title) {
        await expect(page).toHaveTitle(title);
      } else if (heading) {
        await expect(page.locator('h1').filter({ hasText: heading }).first()).toBeVisible({
          timeout: 20_000,
        });
      }
    }
  });

  test('unknown URL shows 404 page', async ({ page }) => {
    await page.goto('/this-route-does-not-exist-xyz');
    await dismissDevOverlays(page);
    await expect(page.getByRole('heading', { name: /404/i })).toBeVisible({
      timeout: 10_000,
    });
  });

  test('resource guide deep link loads', async ({ page }) => {
    await page.goto('/resources/guides/password-management');
    await expect(page.locator('h1, h2').first()).toBeVisible({ timeout: 15_000 });
    await expect(page.getByRole('heading', { name: /404/i })).not.toBeVisible();
  });
});

test.describe('User workflow — MVP paths', () => {
  test.beforeEach(async ({ page }) => {
    await clearAppStorage(page);
  });

  test('persona selection and caution feed load', async ({ page }) => {
    await selectDemoPersona(page);
    await expect(page.getByRole('heading', { name: /Privacy Cautions/i }).first()).toBeVisible({
      timeout: 15_000,
    });
  });

  test('cautions redirects to persona selection without saved persona', async ({ page }) => {
    await page.goto('/cautions', { waitUntil: 'networkidle' });
    await dismissDevOverlays(page);
    await expect(page).toHaveURL(/\/persona-selection/, { timeout: 15_000 });
    await expect(
      page.getByRole('heading', { name: /Choose Your Privacy Persona/i })
    ).toBeVisible({ timeout: 10_000 });
  });

  test('simple dashboard redirects to persona selection without saved persona', async ({ page }) => {
    await page.goto('/simple-dashboard', { waitUntil: 'networkidle' });
    await dismissDevOverlays(page);
    await expect(page).toHaveURL(/\/persona-selection/, { timeout: 15_000 });
    await expect(
      page.getByRole('heading', { name: /Choose Your Privacy Persona/i })
    ).toBeVisible({ timeout: 10_000 });
  });

  test('change persona from caution feed updates saved persona', async ({ page }) => {
    await selectDemoPersona(page, 0);
    expect(await getDemoPersonaSlug(page)).toBe('parent');

    await page.getByRole('button', { name: /Change your persona/i }).click();
    await expect(page).toHaveURL(/\/persona-selection/, { timeout: 15_000 });

    await page.getByRole('button', { name: /Select .+ persona/i }).nth(1).click();
    await page.getByRole('button', { name: /Continue to Cautions|Update Persona/i }).click();
    await page.waitForURL(/\/cautions/, { timeout: 20_000 });

    expect(await getDemoPersonaSlug(page)).toBe('teen');
    await expect(page.getByRole('heading', { name: /Privacy Cautions/i }).first()).toBeVisible({
      timeout: 10_000,
    });
  });
});

test.describe('User workflow — persona-first journey coherence', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => {
      localStorage.clear();
      sessionStorage.clear();
    });
    await page.getByRole('button', { name: /Close production checklist/i }).click({ timeout: 2000 }).catch(() => {});
  });

  test('landing → personas → assessment follows discover phase', async ({ page }) => {
    await page.getByRole('button', { name: /Choose Your Persona/i }).first().click();
    await expect(page).toHaveURL(/\/personas\/?$/);

    await page.getByRole('heading', { name: 'Cautious Parent', level: 3 }).click();
    await page.getByRole('button', { name: /Continue with Cautious Parent/i }).click();
    await expect(page).toHaveURL(/\/assessment\/?$/);
    await expect(
      page.locator('h1').filter({ hasText: /Privacy Assessment/i }).first()
    ).toBeVisible();

    expect(await page.evaluate(() => localStorage.getItem('socialcaution-persona'))).toBe(
      'cautious-parent'
    );
  });

  test('roadmap preview remains reachable after persona messaging', async ({ page }) => {
    const roadmapSection = page.locator('section').filter({
      has: page.getByRole('heading', { name: 'Your 30-Day Protect Roadmap' }),
    });
    await roadmapSection.scrollIntoViewIfNeeded();
    await roadmapSection.getByRole('button', { name: /Preview the Roadmap/i }).click();
    await expect(page).toHaveURL(/\/30-day-roadmap\/?$/);
    await expect(page.getByRole('heading', { name: /30-Day Privacy Challenge/i })).toBeVisible();
  });

  test('how-it-works CTA aligns with persona entry point', async ({ page }) => {
    const howSection = page.locator('section').filter({ hasText: 'How SocialCaution Works' });
    await howSection.scrollIntoViewIfNeeded();
    await howSection.getByRole('button', { name: /Choose Your Persona/i }).click();
    await expect(page).toHaveURL(/\/personas\/?$/);
  });
});

test.describe('User workflow — main app persona path', () => {
  test.beforeEach(async ({ page }) => {
    await clearAppStorage(page);
  });

  test('personas page selection navigates to assessment', async ({ page }) => {
    await selectMainAppPersona(page, 'Cautious Parent');

    await expect(page.locator('h1').filter({ hasText: /Privacy Assessment/i }).first()).toBeVisible({
      timeout: 15_000,
    });

    const savedPersona = await page.evaluate(() =>
      localStorage.getItem('socialcaution-persona')
    );
    expect(savedPersona).toBe('cautious-parent');
  });
});
