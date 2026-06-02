import { test, expect } from '@playwright/test';

test.describe('UI/UX — Header', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/');
  });

  test('displays full branding text without truncation', async ({ page }) => {
    const brandText = page.locator('.header-brand-text');
    await expect(brandText).toBeVisible();
    await expect(brandText).toContainText('SocialCaution');
    await expect(brandText).toContainText('™');

    const isTruncated = await brandText.evaluate((el) => {
      return el.scrollWidth > el.clientWidth + 1;
    });
    expect(isTruncated).toBe(false);
  });

  test('shows compact desktop navigation with all primary items', async ({ page }) => {
    const nav = page.locator('nav.header-center');
    await expect(nav).toBeVisible();

    for (const label of ['Home', 'Personas', 'Dashboard', 'Toolkit']) {
      await expect(nav.getByRole('link', { name: label })).toBeVisible();
    }

    await expect(nav.getByRole('button', { name: 'Roadmap menu' })).toBeVisible();
    await expect(nav.getByRole('button', { name: 'Resources menu' })).toBeVisible();

    const navGap = await nav.evaluate((el) => getComputedStyle(el).gap);
    const gapPx = parseFloat(navGap);
    expect(gapPx).toBeGreaterThan(0);
    expect(gapPx).toBeLessThanOrEqual(10);
  });
});

test.describe('UI/UX — Persona-first landing', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/');
    await page.getByRole('button', { name: /Close production checklist/i }).click({ timeout: 2000 }).catch(() => {});
  });

  test('hero primary CTA starts persona journey', async ({ page }) => {
    const heroCta = page.getByRole('button', { name: /Choose Your Persona/i }).first();
    await expect(heroCta).toBeVisible();
    await heroCta.click();
    await expect(page).toHaveURL(/\/personas\/?$/);
    await expect(
      page.locator('h1').filter({ hasText: /Find Your Privacy Profile/i }).first()
    ).toBeVisible();
  });

  test('persona cards section appears before protect roadmap on homepage', async ({ page }) => {
    const personaHeading = page.getByRole('heading', {
      name: /Start Here: Choose Your Privacy Persona/i,
    });
    const roadmapHeading = page.getByRole('heading', {
      name: /Your 30-Day Protect Roadmap/i,
    });

    await personaHeading.scrollIntoViewIfNeeded();
    await roadmapHeading.scrollIntoViewIfNeeded();

    const order = await page.evaluate(() => {
      const headings = Array.from(document.querySelectorAll('h2, h3'));
      const personaIdx = headings.findIndex((h) =>
        /Start Here: Choose Your Privacy Persona/i.test(h.textContent ?? '')
      );
      const roadmapIdx = headings.findIndex((h) =>
        /Your 30-Day Protect Roadmap/i.test(h.textContent ?? '')
      );
      return { personaIdx, roadmapIdx };
    });

    expect(order.personaIdx).toBeGreaterThanOrEqual(0);
    expect(order.roadmapIdx).toBeGreaterThan(order.personaIdx);
  });
});

test.describe('UI/UX — Protect roadmap section', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/');
    await page.getByRole('button', { name: /Close production checklist/i }).click({ timeout: 2000 }).catch(() => {});
  });

  test('roadmap section centers heading and leads with persona CTA', async ({ page }) => {
    const section = page.locator('section').filter({
      has: page.getByRole('heading', { name: 'Your 30-Day Protect Roadmap' }),
    });
    await section.scrollIntoViewIfNeeded();

    const heading = section.getByRole('heading', { name: 'Your 30-Day Protect Roadmap' });
    await expect(heading).toBeVisible();

    const headerBlock = heading.locator('..');
    await expect(headerBlock).toHaveClass(/text-center/);

    const subtitle = section.getByText(/Protect phase of your privacy journey/i);
    await expect(subtitle).toBeVisible();

    await expect(
      section.getByRole('button', { name: /Choose Your Persona First/i })
    ).toBeVisible();
    await expect(section.getByRole('button', { name: /Preview the Roadmap/i })).toBeVisible();
  });
});

test.describe('UI/UX — Footer', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/');
  });

  test('branding description uses at least the branding link width', async ({ page }) => {
    const branding = page.locator('.footer-branding');
    await branding.scrollIntoViewIfNeeded();

    const link = branding.locator('a').first();
    const description = branding.locator('p').first();

    await expect(link).toBeVisible();
    await expect(description).toBeVisible();
    await expect(description).toContainText('Empowering individuals');

    const linkBox = await link.boundingBox();
    const descBox = await description.boundingBox();

    expect(linkBox).not.toBeNull();
    expect(descBox).not.toBeNull();
    expect(descBox!.width).toBeGreaterThanOrEqual(linkBox!.width - 2);
  });
});

test.describe('UI/UX — Page layout', () => {
  test('resource guide content clears header and breadcrumb bar', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/resources/guides/social-media-security');

    await page.getByRole('button', { name: /Close production checklist/i }).click({ timeout: 2000 }).catch(() => {});

    const offsets = await page.evaluate(() => {
      const header = document.querySelector('.nav-header');
      const breadcrumbBar = header?.nextElementSibling as HTMLElement | null;
      const backButton = document.querySelector('#main-content button');
      const headerBottom = header?.getBoundingClientRect().bottom ?? 0;
      const breadcrumbBottom = breadcrumbBar?.getBoundingClientRect().bottom ?? headerBottom;
      const contentTop = backButton?.getBoundingClientRect().top ?? 0;
      return { headerBottom, breadcrumbBottom, contentTop };
    });

    expect(offsets.contentTop).toBeGreaterThanOrEqual(offsets.breadcrumbBottom - 2);
    expect(offsets.breadcrumbBottom).toBeGreaterThan(offsets.headerBottom - 2);
  });

  test('resource guide breadcrumbs start from section root without Home', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/resources/guides/social-media-security');

    const breadcrumbNav = page.getByRole('navigation', { name: 'Breadcrumb navigation' });
    await expect(breadcrumbNav).toBeVisible();
    await expect(breadcrumbNav.getByRole('link', { name: 'Home' })).toHaveCount(0);
    await expect(breadcrumbNav.getByRole('link', { name: 'Resources' })).toBeVisible();
    await expect(breadcrumbNav.getByRole('link', { name: 'Guides' })).toBeVisible();
    await expect(breadcrumbNav.getByText('Social Media Security Guide')).toBeVisible();
  });
});

test.describe('UI/UX — Responsive', () => {
  test('mobile hides desktop nav and shows menu control', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/');

    await expect(page.locator('nav.header-center')).toBeHidden();
    await expect(page.getByRole('button', { name: /menu|navigation/i })).toBeVisible();
  });
});
