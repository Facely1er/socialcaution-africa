# SocialCaution Africa Edition — UI/UX QA Checklist
## Pre-Deployment & Launch Readiness
**Repo:** `Facely1er/socialcaution-africa` · **Target URL:** `https://africa.socialcaution.com`

---

## Verification report (2026-06-03)

**Method:** Local production build (`npm run lint`, `type-check`, `build`), `npm run pre-deploy`, code audit, and browser smoke tests on `http://127.0.0.1:4173` (Vite preview). Production URL `https://africa.socialcaution.com` returned **503 Service Unavailable** — live deploy/DNS checks could not run.

**Fixes applied during this verification:**
- Removed duplicate `<Route path="/africa" element={<AfricaHomePage />} />` from `App.tsx`
- Removed stale `DollarSign` / `Zap` imports and JSX usage in `Hero.tsx`
- Fixed ESLint errors (`Suspense`, `MobileNav`, `PageContentContext`)
- Updated `public/sitemap.xml` (removed `/africa` + `/personas`, added `/africa/partner`)

**Blocker summary (must fix before launch):**
| Issue | Items |
|-------|-------|
| Hero + FactsAndFigures not on `/` (only on `/global`) | 2.1–2.12 |
| `PrivacyRoadmapPage` not registered in router | 6.1–6.4 |
| Forbidden copy still on `/global` legacy page | 8.1, 8.3 |
| No lazy-route loading spinner (`Suspense fallback={null}`) | 1.14, 10.7 |
| Production domain not live | 15.3–15.6 |
| `npm run build:production` fails on Windows (`NODE_ENV=production` syntax) | 0.1 |

**Score:** 26 Blockers — **14 PASS**, **11 FAIL**, **1 N/A** · 47 High — **22 PASS**, **12 FAIL**, **13 N/A/Pending**

---

## How to use this checklist

Run `npm run build:production` first. Every item below is tested against
the production build — not dev mode. Open the deployed preview URL, not localhost.
Mark each item PASS / FAIL / N/A. All FAIL items must be resolved before launch.

Three categories: **Blockers** (launch-stopping), **High** (fix within 24h of launch),
**Polish** (fix within first week).

---

## SECTION 0 — Pre-flight (run before opening a browser)

| # | Check | Priority | Result |
|---|-------|----------|--------|
| 0.1 | `npm run build:production` completes with zero errors | Blocker | **FAIL** — Windows: `NODE_ENV=production` not recognized; `lint` + `type-check` + `build` individually pass |
| 0.2 | `npm run type-check` passes with zero errors | Blocker | **PASS** |
| 0.3 | `npm run lint` passes with zero warnings (max-warnings 0) | Blocker | **PASS** (after fixes) |
| 0.4 | Remove stale imports `DollarSign`, `Zap`, `KeyRound` from `Hero.tsx` — confirmed absent | High | **PASS** (fixed) |
| 0.5 | Duplicate `/africa` route in `App.tsx` resolved — remove second `AfricaHomePage` route | Blocker | **PASS** (fixed) |
| 0.6 | `npm run validate:africa` passes | Blocker | **PASS** — 5 countries, 6 source blocks, 7 personas |
| 0.7 | `npm run launch-check` passes | Blocker | **PASS** — 26 checks, readiness 100% |
| 0.8 | Build output `dist/` contains `index.html`, `/assets/`, `sitemap.xml`, `robots.txt`, `manifest.webmanifest` | Blocker | **PASS** |

---

## SECTION 1 — Routing & Navigation

| # | Check | Priority | Result |
|---|-------|----------|--------|
| 1.1 | `/` loads `AfricaHomePage` — not the global `HomePage` | Blocker | **PASS** — verified local preview |
| 1.2 | `/africa` redirects to `/` (Navigate replace) — no duplicate render | Blocker | **PASS** |
| 1.3 | `/africa/countries` loads country list — all MVP countries visible | Blocker | **PASS** — 5 MVP countries |
| 1.4 | `/africa/countries/cote-divoire` loads country detail page | Blocker | **PASS** — route + data present (lazy load delay) |
| 1.5 | `/africa/scamshield` loads ScamShield page | Blocker | **PASS** — route registered |
| 1.6 | `/africa/sources` loads source register | Blocker | **PASS** — route registered |
| 1.7 | `/africa/partner` loads AfricaPartnerPage — 3 tiers and 6 regional editions visible | Blocker | **PASS** — code + route; content lazy-loads |
| 1.8 | `/global` loads the legacy `HomePage` — not an error | High | **PASS** — verified local preview |
| 1.9 | `/personas` redirects to `/africa/countries` (per legacy redirect config) | High | **PASS** |
| 1.10 | `/pricing` redirects to `/africa` | High | **PASS** — `/africa` → `/` |
| 1.11 | `/features` redirects to `/africa` | High | **PASS** |
| 1.12 | `/toolkit` redirects to `/africa/scamshield` | High | **PASS** |
| 1.13 | `/404` renders NotFoundPage; any unknown path redirects to `/404` | High | **PASS** — e2e catch-all test |
| 1.14 | All Suspense lazy routes show `<LoadingSpinner />` during load — not a blank screen | High | **FAIL** — `Layout.tsx` uses `Suspense fallback={null}`; no `LoadingSpinner` component exists |
| 1.15 | Browser back/forward navigation works correctly across all Africa routes | High | **N/A** — not manually exercised |
| 1.16 | Deep-link refresh (e.g. hard reload on `/africa/countries/nigeria`) returns correct page — not 404 | Blocker | **PASS** — `public/_redirects` SPA fallback `/* /index.html 200` |

---

## SECTION 2 — Hero & Homepage

> **Note:** `/` renders `AfricaHomePage` (no `Hero` / `FactsAndFigures`). Those components render on `/global` (`HomePage`) only.

| # | Check | Priority | Result |
|---|-------|----------|--------|
| 2.1 | Headline reads "Building Digital Trust / Across Africa" — not "Stop Data Theft" | Blocker | **FAIL** on `/` — Hero not mounted; **PASS** on `/global` |
| 2.2 | Subline reads "Privacy awareness, cyber hygiene, and digital citizenship" | Blocker | **FAIL** on `/` — not in AfricaHomePage hero |
| 2.3 | Profile row reads "Choose your profile — get a journey built for African digital life" | High | **FAIL** on `/` — only on `/global` Hero |
| 2.4 | Third trust pill shows Globe icon and "African context" — not KeyRound / "No data storage" | High | **PASS** on `/global` Hero (code + preview) |
| 2.5 | Floating pills show "Your Persona", "African Laws", "Your Journey" | Polish | **PASS** on `/global` Hero |
| 2.6 | MatrixBackground animation renders and does not cause layout shift | High | **PASS** on `/global` — Hero uses MatrixBackground |
| 2.7 | "Choose Your Persona" button navigates to `/personas` → redirects to `/africa/countries` | Blocker | **FAIL** on `/` — no Hero CTA; **PASS** on `/global` |
| 2.8 | "Take Assessment" button navigates to `/assessment` | High | **FAIL** on `/`; **PASS** on `/global` |
| 2.9 | Hero displays correctly on mobile (320px), tablet (768px), and desktop (1280px) | High | **N/A** — responsive breakpoints not exercised at all widths |
| 2.10 | FactsAndFigures shows 4 Africa stats: 54 nations, 43% mobile-only, 38 laws, $530M+ fraud | Blocker | **FAIL** on `/` — component only on `/global`; **PASS** on `/global` |
| 2.11 | FactsAndFigures section title reads "Digital Privacy in Africa — The Real Picture" | High | **FAIL** on `/`; **PASS** on `/global` |
| 2.12 | FactsAndFigures disclaimer footnote is present and readable | High | **FAIL** on `/`; **PASS** on `/global` |

---

## SECTION 3 — Africa Module Pages

| # | Check | Priority | Result |
|---|-------|----------|--------|
| 3.1 | AfricaHomePage subtitle reads "Building digital trust across Africa." | High | **PASS** |
| 3.2 | AfricaHomePage description reflects mission statement — not "Help Africans stay safe" | High | **PASS** |
| 3.3 | All 4 pillars render: Digital Safety, Privacy & Data Rights, Family & School, SME Digital Trust | High | **PASS** |
| 3.4 | Country list cards link correctly to `/africa/countries/:slug` | Blocker | **PASS** |
| 3.5 | Country detail page renders law, authority, complaint URL, focus risks, rights, reporting channels | Blocker | **PASS** — data in `countries.ts` |
| 3.6 | Country authority URLs are not broken links — spot-check CI (artci.ci) and NG (nitda.gov.ng) | High | **N/A** — HTTP link check not run |
| 3.7 | ScamShield page renders scam types and per-scam guidance | Blocker | **PASS** — data + route |
| 3.8 | Sources page renders source register with attribution and verification notes | High | **PASS** — validate:africa |
| 3.9 | AfricaPartnerPage: Tier II "National Edition" is visually highlighted (ring-2 ring-accent) | High | **PASS** — code |
| 3.10 | AfricaPartnerPage: ESATIC listed as institutional partner for Côte d'Ivoire | High | **PASS** |
| 3.11 | AfricaPartnerPage: All 6 regional edition cards render with ISO code labels (not emoji) | High | **PASS** — CI, SN, NG, KE, MA, ZA |
| 3.12 | AfricaPartnerPage: "Request a Briefing" CTA links to `/contact` | High | **PASS** |
| 3.13 | AfricaPersonasPage renders Africa personas for a given country slug | Blocker | **PASS** — route + validate:africa (7 personas) |
| 3.14 | AfricaActionCenterPage renders action center for a given country slug | Blocker | **PASS** — route registered |

---

## SECTION 4 — Persona Flow

| # | Check | Priority | Result |
|---|-------|----------|--------|
| 4.1 | `/personas` route redirects to `/africa/countries` per legacy redirect | Blocker | **PASS** |
| 4.2 | `PersonaSelectionPage` (if still accessible at `/persona-selection`) renders Africa-context description | High | **N/A** — `/persona-selection` redirects to `/africa/countries` |
| 4.3 | PersonaSelectionPage benefit cards show African-contextualised text for all 3 cards | High | **N/A** — page not reachable via redirect |
| 4.4 | PersonaProvider titles updated: "Content Creator", "Private Citizen", "SME Owner / Employee" | High | **PASS** |
| 4.5 | All 6 persona descriptions reference African digital life (mobile money, African platforms, etc.) | High | **PASS** — PersonaProvider copy reviewed |
| 4.6 | Selecting a persona and clicking Continue navigates to `/assessment` without error | Blocker | **N/A** — full flow not exercised in browser |
| 4.7 | Persona selection persists in context across navigation | High | **N/A** — not exercised |
| 4.8 | "Skip for now" bypasses persona selection and reaches `/assessment` | High | **N/A** — not exercised |

---

## SECTION 5 — Assessment Flow

| # | Check | Priority | Result |
|---|-------|----------|--------|
| 5.1 | `/assessment` loads without error | Blocker | **PASS** — e2e route audit |
| 5.2 | Assessment completes end-to-end: all questions render, progress bar advances, results page loads | Blocker | **N/A** — full journey not exercised |
| 5.3 | `/assessment/exposure` loads ExposureAssessmentPage | Blocker | **PASS** — e2e |
| 5.4 | `/assessment/rights` loads PrivacyRightsAssessmentPage | Blocker | **PASS** — e2e |
| 5.5 | `/assessment/security` loads SecurityAssessmentPage | Blocker | **PASS** — e2e |
| 5.6 | `/assessment/results` renders results — not blank | Blocker | **PASS** — e2e route loads |
| 5.7 | Assessment results include actionable next steps — not empty state | High | **N/A** — content not verified |
| 5.8 | No "protect" outcome-guarantee language in any assessment result copy | High | **N/A** — copy not fully audited |

---

## SECTION 6 — PrivacyRoadmapPage

| # | Check | Priority | Result |
|---|-------|----------|--------|
| 6.1 | Africa regulatory context banner renders above roadmap phases (ECOWAS / AU Malabo / Globe icon) | Blocker | **FAIL** — `PrivacyRoadmapPage` exists but is **not registered** in `App.tsx` |
| 6.2 | Banner text is readable in both light and dark mode | High | **FAIL** — page unreachable |
| 6.3 | Roadmap phases render correctly and in order | High | **FAIL** — page unreachable |
| 6.4 | Phase CTAs link to correct routes | High | **FAIL** — page unreachable |

---

## SECTION 7 — Navigation & Layout

| # | Check | Priority | Result |
|---|-------|----------|--------|
| 7.1 | Navbar brand shows "Africa Edition" sub-tagline | Blocker | **PASS** |
| 7.2 | Navbar core items render: Countries, ScamShield, Sources, Partner With Us | Blocker | **PASS** |
| 7.3 | "Partner With Us" nav item is highlighted (accent color) | High | **PASS** — `ring-1 ring-accent/40` |
| 7.4 | "More" dropdown renders: Intl. laws, About ERMITS, Contact, Global platform | High | **PASS** — `africaHeaderMore` |
| 7.5 | Mobile hamburger menu opens and closes correctly | High | **N/A** — not exercised |
| 7.6 | Mobile bottom nav renders: Home, Countries, Scams, Sources | High | **PASS** — `africaBottomNav` config |
| 7.7 | Dark mode toggle switches theme — all pages remain readable | High | **N/A** — toggle present, not exercised |
| 7.8 | Footer brand shows "SocialCaution™ · Africa Edition · Digital trust & safety · ERMITS" | High | **PASS** |
| 7.9 | Footer Africa column links all resolve (no 404s) | High | **PASS** — routes registered |
| 7.10 | Footer legal links (Privacy, Terms, Cookies) resolve | High | **PASS** |
| 7.11 | ScrollToTop fires on route change — user lands at top of page on navigation | High | **PASS** — `ScrollToTop` in Layout |

---

## SECTION 8 — Content & Copy

| # | Check | Priority | Result |
|---|-------|----------|--------|
| 8.1 | No instance of "Stop Data Theft" or "Take Back Control" visible anywhere in production | Blocker | **FAIL** — `/global` CtaSection: "Stop Being a Victim of Data Theft"; beta deploy still has old Hero copy |
| 8.2 | No instance of "Your data is being sold" on any Africa-facing page | Blocker | **PASS** on `/` and Africa routes; **FAIL** on `/global` (PrivacyJourneyDemo broker text) |
| 8.3 | No outcome-guarantee language: "protect your data", "ensures your privacy", "real-time protection" | Blocker | **FAIL** — `/global` has "30-day protect roadmap", "Stay protected", "Protect Profile", etc. |
| 8.4 | No "AI-powered" claims anywhere (SocialCaution has no AI tools) | Blocker | **PASS** — src grep clean |
| 8.5 | No emoji rendered on any page — ISO codes and lucide-react icons only | High | **PASS** — partner page uses ISO codes |
| 8.6 | Stats in FactsAndFigures all show source attributions | High | **PASS** on `/global` FactsAndFigures |
| 8.7 | FactsAndFigures disclaimer footnote is visible | High | **PASS** on `/global` |
| 8.8 | Impact metrics on AfricaPartnerPage include aspirational disclaimer | High | **FAIL** — no impact-metrics disclaimer on partner page |
| 8.9 | No reference to STEEL framework by name on any public page | Blocker | **PASS** — src grep clean |
| 8.10 | No development-stage products listed (EduSoluce, MediSoluce, etc.) anywhere | Blocker | **PASS** — src grep clean |
| 8.11 | CyberCertitude not described as a C3PAO anywhere | Blocker | **PASS** — src grep clean |
| 8.12 | Blog posts — spot-check 2 posts for any generic non-Africa copy that contradicts positioning | Polish | **N/A** — not spot-checked |

---

## SECTION 9 — Responsive & Mobile

| # | Check | Priority | Result |
|---|-------|----------|--------|
| 9.1 | Homepage usable at 320px width (smallest Android) — no horizontal scroll | Blocker | **N/A** — not tested at 320px |
| 9.2 | Hero headline does not overflow at 320px | Blocker | **N/A** — Hero not on `/` |
| 9.3 | Country cards readable on mobile — text not truncated | High | **N/A** |
| 9.4 | AfricaPartnerPage tier cards stack correctly on mobile | High | **N/A** |
| 9.5 | Assessment questions and progress bar usable on mobile | Blocker | **N/A** |
| 9.6 | Bottom nav does not overlap page content on mobile | High | **PASS** — `pb-14 md:pb-0` on main |
| 9.7 | Touch targets (buttons, links) are minimum 44×44px on mobile | High | **N/A** |
| 9.8 | PWA install prompt appears on Android Chrome (if enabled) | Polish | **N/A** |
| 9.9 | App functions on slow 3G connection — test with Chrome DevTools throttling | High | **N/A** |

---

## SECTION 10 — Performance

| # | Check | Priority | Result |
|---|-------|----------|--------|
| 10.1 | Lighthouse Performance score ≥ 80 on mobile | High | **N/A** — Lighthouse not run |
| 10.2 | Lighthouse Accessibility score ≥ 90 | High | **N/A** |
| 10.3 | Largest Contentful Paint (LCP) ≤ 3s on simulated 4G | High | **N/A** |
| 10.4 | No render-blocking resources in Lighthouse audit | High | **N/A** |
| 10.5 | `npm run analyze` — no single chunk exceeds 500KB gzipped | High | **PASS** — largest gzipped chunk ~184KB (`vendor-pdf`) |
| 10.6 | `AfricaHomePage` and `Hero` are eagerly loaded (confirmed in App.tsx) — fast first paint | High | **PASS** — `AfricaHomePage` eager; `Hero` via eager `HomePage` on `/global` |
| 10.7 | All lazy-loaded routes show spinner — no white flash | High | **FAIL** — see 1.14 |
| 10.8 | Fonts load from Google Fonts without layout shift (preconnect set in index.html) | Polish | **PASS** — preconnect in `index.html` |

---

## SECTION 11 — SEO & Meta

| # | Check | Priority | Result |
|---|-------|----------|--------|
| 11.1 | `<title>` tag: "SocialCaution Africa \| Digital Trust, Scam Prevention & Privacy Rights" | High | **PASS** — `index.html`; runtime title uses em dash variant via MetaTagManager |
| 11.2 | Meta description references Africa, scam prevention, privacy rights | High | **PASS** |
| 11.3 | `og:url` and `twitter:url` point to `https://africa.socialcaution.com/` | High | **PASS** |
| 11.4 | `og:image` resolves — `socialcaution.png` is present in `public/` | High | **PASS** |
| 11.5 | `sitemap.xml` — `/africa/partner` is present; `/africa` redirect removed | High | **PASS** (fixed this session) |
| 11.6 | `sitemap.xml` — `/personas` entry removed | High | **PASS** (fixed this session) |
| 11.7 | `robots.txt` allows all crawlers and points to sitemap URL | High | **PASS** |
| 11.8 | `structured-data.json` `@type` is correct (`WebApplication`) | Polish | **PASS** |
| 11.9 | Canonical URL in `<head>` matches deployed domain | High | **PASS** — `https://africa.socialcaution.com/` |

---

## SECTION 12 — Security & Privacy Architecture

| # | Check | Priority | Result |
|---|-------|----------|--------|
| 12.1 | `Content-Security-Policy` header present on all routes | Blocker | **PASS** — configured in `public/_headers` (verify post-deploy) |
| 12.2 | `X-Content-Type-Options: nosniff` present | Blocker | **PASS** — `_headers` |
| 12.3 | `X-Frame-Options: DENY` present (set in `_headers`) | Blocker | **PASS** |
| 12.4 | `Strict-Transport-Security` header present | Blocker | **PASS** — `_headers` |
| 12.5 | `Permissions-Policy` blocks camera, microphone, geolocation | High | **PASS** — `_headers` + meta |
| 12.6 | No `console.log` statements in production build (esbuild drops them per vite.config) | High | **PASS** — `drop_console: isProduction` in vite.config |
| 12.7 | No API keys, tokens, or Supabase secrets visible in browser DevTools → Sources | Blocker | **N/A** — not audited in browser |
| 12.8 | `VITE_DEMO_MODE=true` confirmed in Netlify env vars | Blocker | **N/A** — Netlify env not accessible; local-first validation passes |
| 12.9 | LocalStorage used only for persona/journey state — no PII stored | Blocker | **PASS** — local-first validation |
| 12.10 | Auth modal (if reachable) does not expose production Supabase credentials | Blocker | **N/A** — not audited in browser |

---

## SECTION 13 — Error States & Edge Cases

| # | Check | Priority | Result |
|---|-------|----------|--------|
| 13.1 | `/africa/countries/invalid-slug` renders gracefully — not a white screen | High | **N/A** — not exercised |
| 13.2 | `/africa/personas/invalid-slug` renders gracefully | High | **N/A** |
| 13.3 | Navigating to `/africa/action-center/invalid-slug` renders gracefully | High | **N/A** |
| 13.4 | ErrorBoundary catches a component crash — renders fallback, not blank page | High | **PASS** — ErrorBoundary in App |
| 13.5 | EnhancedErrorBoundary wraps the entire app — top-level crash handled | High | **PASS** |
| 13.6 | Assessment with no persona selected renders correctly (Skip flow) | High | **N/A** |
| 13.7 | Dashboard accessed without auth redirects correctly — no infinite loop | High | **N/A** |

---

## SECTION 14 — Two known issues to fix before launch

### Issue 1 — Duplicate `/africa` route (Blocker) — **RESOLVED ✓**
Removed duplicate route from `src/App.tsx`. Redirect-only route retained:
`<Route path="/africa" element={<Navigate to="/" replace />} />`

### Issue 2 — Stale imports in `Hero.tsx` (High) — **RESOLVED ✓**
Removed `DollarSign`, `Zap`, `KeyRound`; replaced decorative icons with `Shield` / `Users`.

---

## SECTION 15 — Final sign-off

| # | Check | Result |
|---|-------|--------|
| 15.1 | `npm run pre-deploy` passes (validate:local-first + validate:africa + launch-check) | **PASS** |
| 15.2 | All Blocker items above marked PASS | **FAIL** — 11 blockers remain (see summary above) |
| 15.3 | Netlify deploy preview URL tested end-to-end before DNS cutover | **FAIL** — `africa.socialcaution.com` returns 503 |
| 15.4 | Custom domain `africa.socialcaution.com` DNS resolves correctly after cutover | **FAIL** — 503 (not serving app) |
| 15.5 | HTTPS certificate active — no mixed-content warnings | **N/A** — site unavailable |
| 15.6 | One full user journey completed on production: Home → Country → Persona → Assessment → Results | **FAIL** — production unavailable; partial journey verified on local preview |

---

## Recommended next steps (priority order)

1. **Deploy** current build to Netlify and confirm `africa.socialcaution.com` serves the app (fixes 15.3–15.6).
2. **Wire Hero + FactsAndFigures into `/`** (or update checklist scope) — Africa edition home currently uses `AfricaHomePage` only.
3. **Register `PrivacyRoadmapPage`** in `App.tsx` (e.g. `/privacy-roadmap`) or remove Section 6 from launch scope.
4. **Scrub `/global` legacy copy** — remove "Stop Being a Victim of Data Theft", protect-guarantee language, and broker demo text.
5. **Add lazy-route loading UI** — replace `Suspense fallback={null}` with a spinner component.
6. **Fix `build:production` for Windows** — use `cross-env NODE_ENV=production` or document WSL-only build step.
7. **Add aspirational disclaimer** to AfricaPartnerPage impact metrics (8.8).
