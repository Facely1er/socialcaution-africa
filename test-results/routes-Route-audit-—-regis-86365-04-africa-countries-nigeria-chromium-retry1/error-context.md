# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: routes.spec.ts >> Route audit — registered pages >> loads without 404: /africa/countries/nigeria
- Location: e2e\tests\routes.spec.ts:138:5

# Error details

```
Error: expect(page).not.toHaveURL(expected) failed

Expected pattern: not /\/404\/?$/
Received string: "https://beta.socialcaution.com/404"
Timeout: 15000ms

Call log:
  - Expect "not toHaveURL" with timeout 15000ms
    29 × unexpected value "https://beta.socialcaution.com/404"

```

```yaml
- link "Skip to main content":
  - /url: "#main-content"
- banner:
  - link "SocialCaution Logo SocialCaution ™ Control Your Privacy":
    - /url: /
    - img "SocialCaution Logo"
    - text: SocialCaution ™ Control Your Privacy
  - navigation:
    - link "Home":
      - /url: /
      - img
      - text: Home
    - link "Personas":
      - /url: /personas
      - img
      - text: Personas
    - link "Dashboard":
      - /url: /dashboard
      - img
      - text: Dashboard
    - link "Resources":
      - /url: /resources
      - img
      - text: Resources
    - button "Roadmap menu":
      - img
      - text: Roadmap
      - img
    - button "Resources menu":
      - img
      - text: Resources
      - img
  - button "Open search":
    - img
  - button "Toggle theme":
    - img
  - button "Account":
    - img
    - text: Account
  - button "Toggle mobile menu":
    - img
- button "Back":
  - img
  - text: Back
- navigation "Breadcrumb navigation": "404"
- main:
  - 'heading "404: Page Not Found" [level=1]'
  - paragraph: Oops! The page you're looking for seems to have vanished into the digital void.
  - img
  - paragraph: Let's get you back to safety.
  - link "Return to Homepage":
    - /url: /
    - button "Return to Homepage":
      - img
      - text: Return to Homepage
  - paragraph:
    - text: Need help?
    - link "Contact our support team":
      - /url: /contact
- button "Show quick actions":
  - img
  - text: Quick actions
- contentinfo:
  - link "SocialCaution Logo SocialCaution ™ Control Your Privacy by ERMITS":
    - /url: /
    - img "SocialCaution Logo"
    - text: SocialCaution ™ Control Your Privacy by ERMITS
  - paragraph: Empowering individuals to take control of their digital privacy and protect their personal data.
  - heading "Learn" [level=2]
  - list:
    - listitem:
      - link "Guides":
        - /url: /resources/guides
        - img
        - text: Guides
    - listitem:
      - link "Checklists":
        - /url: /resources/checklists
        - img
        - text: Checklists
    - listitem:
      - link "Privacy Laws":
        - /url: /privacy-laws
        - img
        - text: Privacy Laws
    - listitem:
      - link "Blog":
        - /url: /blog
        - img
        - text: Blog
  - heading "Company" [level=2]
  - list:
    - listitem:
      - link "About Us":
        - /url: /about
        - img
        - text: About Us
    - listitem:
      - link "Help Center":
        - /url: /help
        - img
        - text: Help Center
    - listitem:
      - link "About Us":
        - /url: /about
        - img
        - text: About Us
    - listitem:
      - link "Contact":
        - /url: /contact
        - img
        - text: Contact
  - heading "Legal" [level=2]
  - list:
    - listitem:
      - link "Privacy Policy":
        - /url: /privacy
        - img
        - text: Privacy Policy
    - listitem:
      - link "Terms of Service":
        - /url: /terms
        - img
        - text: Terms of Service
    - listitem:
      - link "Cookie Policy":
        - /url: /cookies
        - img
        - text: Cookie Policy
    - listitem:
      - link "Acceptable Use":
        - /url: /acceptable-use
        - img
        - text: Acceptable Use
  - paragraph: © 2026 ERMITS LLC. All rights reserved.
- region "Notifications"
```

# Test source

```ts
  1   | import { test, expect } from '@playwright/test';
  2   | import { getAllGuideIds, getAllChecklistIds } from '../../src/data/privacyResources';
  3   | 
  4   | /** Dismiss dev-only UI that blocks interactions. */
  5   | async function dismissDevOverlays(page: import('@playwright/test').Page) {
  6   |   const closeChecklist = page.getByRole('button', { name: /Close production checklist/i });
  7   |   if (await closeChecklist.isVisible().catch(() => false)) {
  8   |     await closeChecklist.click();
  9   |   }
  10  | }
  11  | 
  12  | async function assertNot404(page: import('@playwright/test').Page, path: string) {
  13  |   await page.goto(path, { waitUntil: 'domcontentloaded' });
  14  |   await dismissDevOverlays(page);
  15  | 
> 16  |   await expect(page).not.toHaveURL(/\/404\/?$/, { timeout: 15_000 });
      |                          ^ Error: expect(page).not.toHaveURL(expected) failed
  17  |   await expect(
  18  |     page.getByRole('heading', { name: /404:\s*Page Not Found/i })
  19  |   ).not.toBeVisible({ timeout: 5_000 });
  20  |   await expect(page.getByRole('heading', { name: /Unexpected Application Error!/i })).not.toBeVisible({
  21  |     timeout: 5_000,
  22  |   });
  23  | 
  24  |   await expect(page.getByRole('heading').first()).toBeVisible({ timeout: 15_000 });
  25  | }
  26  | 
  27  | /** All static routes registered in App.tsx */
  28  | const STATIC_ROUTES = [
  29  |   '/',
  30  |   '/persona-selection',
  31  |   '/cautions',
  32  |   '/simple-dashboard',
  33  |   '/parent',
  34  |   '/parent/onboarding',
  35  |   '/parent/dashboard',
  36  |   '/parent/dashboard/action-plan',
  37  |   '/about',
  38  |   '/features',
  39  |   '/how-it-works',
  40  |   '/help',
  41  |   '/help/action-plan',
  42  |   '/help/getting-started',
  43  |   '/toolkit',
  44  |   '/resources',
  45  |   '/privacy-journey',
  46  |   '/30-day-roadmap',
  47  |   '/privacy-focus',
  48  |   '/personas',
  49  |   '/personas/cautious-parent',
  50  |   '/personas/private-individual',
  51  |   '/personas/online-shopper',
  52  |   '/personas/social-influencer',
  53  |   '/personas/privacy-advocate',
  54  |   '/personas/concerned-employee',
  55  |   '/assessment',
  56  |   '/assessment/exposure',
  57  |   '/assessment/rights',
  58  |   '/assessment/security',
  59  |   '/assessment/results',
  60  |   '/test-assessment',
  61  |   '/privacy-action-center',
  62  |   '/resources/guides',
  63  |   '/resources/checklists',
  64  |   '/resources/tools',
  65  |   '/resources/tools/privacy-assessment',
  66  |   '/resources/tools/personal-data-inventory',
  67  |   '/resources/tools/password-strength',
  68  |   '/blog',
  69  |   '/blog/privacy-importance',
  70  |   '/blog/data-protection-laws-2024',
  71  |   '/blog/privacy-tools-social-media',
  72  |   '/blog/children-privacy-protection',
  73  |   '/blog/hidden-cost-free-services',
  74  |   '/blog/privacy-browsers-comparison',
  75  |   '/blog/privacy-laws-2025',
  76  |   '/blog/workplace-privacy',
  77  |   '/dashboard',
  78  |   '/dashboard/action-plan',
  79  |   '/dashboard/history',
  80  |   '/dashboard/exposure-check',
  81  |   '/dashboard/rights-checkup',
  82  |   '/dashboard/complete-assessment',
  83  |   '/dashboard/profile',
  84  |   '/dashboard/settings',
  85  |   '/dashboard/notifications',
  86  |   '/dashboard/help',
  87  |   '/privacy-laws',
  88  |   '/privacy-laws/gdpr',
  89  |   '/privacy-laws/global-privacy-act',
  90  |   '/privacy-laws/us-privacy',
  91  |   '/privacy-laws/enforcement',
  92  |   '/privacy',
  93  |   '/terms',
  94  |   '/cookies',
  95  |   '/acceptable-use',
  96  |   '/pricing',
  97  |   '/contact',
  98  |   '/africa',
  99  |   '/africa/countries',
  100 |   '/africa/countries/cote-divoire',
  101 |   '/africa/countries/ghana',
  102 |   '/africa/countries/kenya',
  103 |   '/africa/countries/nigeria',
  104 |   '/africa/countries/south-africa',
  105 |   '/africa/scamshield',
  106 |   '/africa/sources',
  107 |   '/africa/personas/kenya',
  108 |   '/africa/action-center/kenya',
  109 | ];
  110 | 
  111 | /** Routes linked in UI that redirect to registered pages */
  112 | const REDIRECTED_LINK_TARGETS: Array<{ path: string; expectedUrl: RegExp }> = [
  113 |   { path: '/legal', expectedUrl: /\/privacy-laws\/?$/ },
  114 |   { path: '/dashboard/preferences', expectedUrl: /\/dashboard\/settings\/?$/ },
  115 |   { path: '/dashboard/security', expectedUrl: /\/dashboard\/settings\/?$/ },
  116 |   { path: '/dashboard/privacy', expectedUrl: /\/dashboard\/settings\/?$/ },
```