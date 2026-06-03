# SocialCaution Africa Edition — UI/UX QA Checklist
## Pre-Deployment & Launch Readiness
**Repo:** `Facely1er/socialcaution-africa` · **Target URL:** `https://africa.socialcaution.com`

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
| 0.1 | `npm run build:production` completes with zero errors | Blocker | |
| 0.2 | `npm run type-check` passes with zero errors | Blocker | |
| 0.3 | `npm run lint` passes with zero warnings (max-warnings 0) | Blocker | |
| 0.4 | Remove stale imports `DollarSign`, `Zap`, `KeyRound` from `Hero.tsx` — confirmed absent | High | |
| 0.5 | Duplicate `/africa` route in `App.tsx` resolved — two declarations exist (line 128 `Navigate to /` and line 149 `AfricaHomePage`); remove the second one | Blocker | |
| 0.6 | `npm run validate:africa` passes | Blocker | |
| 0.7 | `npm run launch-check` passes | Blocker | |
| 0.8 | Build output `dist/` contains `index.html`, `/assets/`, `sitemap.xml`, `robots.txt`, `manifest.webmanifest` | Blocker | |

---

## SECTION 1 — Routing & Navigation

| # | Check | Priority | Result |
|---|-------|----------|--------|
| 1.1 | `/` loads `AfricaHomePage` — not the global `HomePage` | Blocker | |
| 1.2 | `/africa` redirects to `/` (Navigate replace) — no duplicate render | Blocker | |
| 1.3 | `/africa/countries` loads country list — all MVP countries visible | Blocker | |
| 1.4 | `/africa/countries/cote-divoire` loads country detail page | Blocker | |
| 1.5 | `/africa/scamshield` loads ScamShield page | Blocker | |
| 1.6 | `/africa/sources` loads source register | Blocker | |
| 1.7 | `/africa/partner` loads AfricaPartnerPage — 3 tiers and 6 regional editions visible | Blocker | |
| 1.8 | `/global` loads the legacy `HomePage` — not an error | High | |
| 1.9 | `/personas` redirects to `/africa/countries` (per legacy redirect config) | High | |
| 1.10 | `/pricing` redirects to `/africa` | High | |
| 1.11 | `/features` redirects to `/africa` | High | |
| 1.12 | `/toolkit` redirects to `/africa/scamshield` | High | |
| 1.13 | `/404` renders NotFoundPage; any unknown path redirects to `/404` | High | |
| 1.14 | All Suspense lazy routes show `<LoadingSpinner />` during load — not a blank screen | High | |
| 1.15 | Browser back/forward navigation works correctly across all Africa routes | High | |
| 1.16 | Deep-link refresh (e.g. hard reload on `/africa/countries/nigeria`) returns correct page — not 404 | Blocker | |

---

## SECTION 2 — Hero & Homepage

| # | Check | Priority | Result |
|---|-------|----------|--------|
| 2.1 | Headline reads "Building Digital Trust / Across Africa" — not "Stop Data Theft" | Blocker | |
| 2.2 | Subline reads "Privacy awareness, cyber hygiene, and digital citizenship" | Blocker | |
| 2.3 | Profile row reads "Choose your profile — get a journey built for African digital life" | High | |
| 2.4 | Third trust pill shows Globe icon and "African context" — not KeyRound / "No data storage" | High | |
| 2.5 | Floating pills show "Your Persona", "African Laws", "Your Journey" | Polish | |
| 2.6 | MatrixBackground animation renders and does not cause layout shift | High | |
| 2.7 | "Choose Your Persona" button navigates to `/personas` → redirects to `/africa/countries` | Blocker | |
| 2.8 | "Take Assessment" button navigates to `/assessment` | High | |
| 2.9 | Hero displays correctly on mobile (320px), tablet (768px), and desktop (1280px) | High | |
| 2.10 | FactsAndFigures shows 4 Africa stats: 54 nations, 43% mobile-only, 38 laws, $530M+ fraud | Blocker | |
| 2.11 | FactsAndFigures section title reads "Digital Privacy in Africa — The Real Picture" | High | |
| 2.12 | FactsAndFigures disclaimer footnote is present and readable | High | |

---

## SECTION 3 — Africa Module Pages

| # | Check | Priority | Result |
|---|-------|----------|--------|
| 3.1 | AfricaHomePage subtitle reads "Building digital trust across Africa." | High | |
| 3.2 | AfricaHomePage description reflects mission statement — not "Help Africans stay safe" | High | |
| 3.3 | All 4 pillars render: Digital Safety, Privacy & Data Rights, Family & School, SME Digital Trust | High | |
| 3.4 | Country list cards link correctly to `/africa/countries/:slug` | Blocker | |
| 3.5 | Country detail page renders law, authority, complaint URL, focus risks, rights, reporting channels | Blocker | |
| 3.6 | Country authority URLs are not broken links — spot-check CI (artci.ci) and NG (nitda.gov.ng) | High | |
| 3.7 | ScamShield page renders scam types and per-scam guidance | Blocker | |
| 3.8 | Sources page renders source register with attribution and verification notes | High | |
| 3.9 | AfricaPartnerPage: Tier II "National Edition" is visually highlighted (ring-2 ring-accent) | High | |
| 3.10 | AfricaPartnerPage: ESATIC listed as institutional partner for Côte d'Ivoire | High | |
| 3.11 | AfricaPartnerPage: All 6 regional edition cards render with ISO code labels (not emoji) | High | |
| 3.12 | AfricaPartnerPage: "Request a Briefing" CTA links to `/contact` | High | |
| 3.13 | AfricaPersonasPage renders Africa personas (mobile-money-user, parent-guardian, student, etc.) for a given country slug | Blocker | |
| 3.14 | AfricaActionCenterPage renders action center for a given country slug | Blocker | |

---

## SECTION 4 — Persona Flow

| # | Check | Priority | Result |
|---|-------|----------|--------|
| 4.1 | `/personas` route redirects to `/africa/countries` per legacy redirect | Blocker | |
| 4.2 | `PersonaSelectionPage` (if still accessible at `/persona-selection`) renders Africa-context description | High | |
| 4.3 | PersonaSelectionPage benefit cards show African-contextualised text for all 3 cards | High | |
| 4.4 | PersonaProvider titles updated: "Content Creator" (not "Social Influencer"), "Private Citizen", "SME Owner / Employee" | High | |
| 4.5 | All 6 persona descriptions reference African digital life (mobile money, African platforms, etc.) | High | |
| 4.6 | Selecting a persona and clicking Continue navigates to `/assessment` without error | Blocker | |
| 4.7 | Persona selection persists in context across navigation (selecting parent → going to assessment → context still set) | High | |
| 4.8 | "Skip for now" bypasses persona selection and reaches `/assessment` | High | |

---

## SECTION 5 — Assessment Flow

| # | Check | Priority | Result |
|---|-------|----------|--------|
| 5.1 | `/assessment` loads without error | Blocker | |
| 5.2 | Assessment completes end-to-end: all questions render, progress bar advances, results page loads | Blocker | |
| 5.3 | `/assessment/exposure` loads ExposureAssessmentPage | Blocker | |
| 5.4 | `/assessment/rights` loads PrivacyRightsAssessmentPage | Blocker | |
| 5.5 | `/assessment/security` loads SecurityAssessmentPage | Blocker | |
| 5.6 | `/assessment/results` renders results — not blank | Blocker | |
| 5.7 | Assessment results include actionable next steps — not empty state | High | |
| 5.8 | No "protect" outcome-guarantee language in any assessment result copy | High | |

---

## SECTION 6 — PrivacyRoadmapPage

| # | Check | Priority | Result |
|---|-------|----------|--------|
| 6.1 | Africa regulatory context banner renders above roadmap phases (ECOWAS / AU Malabo / Globe icon) | Blocker | |
| 6.2 | Banner text is readable in both light and dark mode | High | |
| 6.3 | Roadmap phases render correctly and in order | High | |
| 6.4 | Phase CTAs link to correct routes | High | |

---

## SECTION 7 — Navigation & Layout

| # | Check | Priority | Result |
|---|-------|----------|--------|
| 7.1 | Navbar brand shows "Africa Edition" sub-tagline | Blocker | |
| 7.2 | Navbar core items render: Countries, ScamShield, Sources, Partner With Us | Blocker | |
| 7.3 | "Partner With Us" nav item is highlighted (accent color) | High | |
| 7.4 | "More" dropdown renders: Intl. laws, About ERMITS, Contact, Global platform | High | |
| 7.5 | Mobile hamburger menu opens and closes correctly | High | |
| 7.6 | Mobile bottom nav renders: Home, Countries, Scams, Sources | High | |
| 7.7 | Dark mode toggle switches theme — all pages remain readable | High | |
| 7.8 | Footer brand shows "SocialCaution™ · Africa Edition · Digital trust & safety · ERMITS" | High | |
| 7.9 | Footer Africa column links all resolve (no 404s) | High | |
| 7.10 | Footer legal links (Privacy, Terms, Cookies) resolve | High | |
| 7.11 | ScrollToTop fires on route change — user lands at top of page on navigation | High | |

---

## SECTION 8 — Content & Copy

| # | Check | Priority | Result |
|---|-------|----------|--------|
| 8.1 | No instance of "Stop Data Theft" or "Take Back Control" visible anywhere in production | Blocker | |
| 8.2 | No instance of "Your data is being sold" on any Africa-facing page | Blocker | |
| 8.3 | No outcome-guarantee language: "protect your data", "ensures your privacy", "real-time protection" | Blocker | |
| 8.4 | No "AI-powered" claims anywhere (SocialCaution has no AI tools) | Blocker | |
| 8.5 | No emoji rendered on any page — ISO codes and lucide-react icons only | High | |
| 8.6 | Stats in FactsAndFigures all show source attributions | High | |
| 8.7 | FactsAndFigures disclaimer footnote is visible | High | |
| 8.8 | Impact metrics on AfricaPartnerPage include aspirational disclaimer | High | |
| 8.9 | No reference to STEEL framework by name on any public page | Blocker | |
| 8.10 | No development-stage products listed (EduSoluce, MediSoluce, etc.) anywhere | Blocker | |
| 8.11 | CyberCertitude not described as a C3PAO anywhere | Blocker | |
| 8.12 | Blog posts — spot-check 2 posts for any generic non-Africa copy that contradicts positioning | Polish | |

---

## SECTION 9 — Responsive & Mobile

| # | Check | Priority | Result |
|---|-------|----------|--------|
| 9.1 | Homepage usable at 320px width (smallest Android) — no horizontal scroll | Blocker | |
| 9.2 | Hero headline does not overflow at 320px | Blocker | |
| 9.3 | Country cards readable on mobile — text not truncated | High | |
| 9.4 | AfricaPartnerPage tier cards stack correctly on mobile | High | |
| 9.5 | Assessment questions and progress bar usable on mobile | Blocker | |
| 9.6 | Bottom nav does not overlap page content on mobile | High | |
| 9.7 | Touch targets (buttons, links) are minimum 44×44px on mobile | High | |
| 9.8 | PWA install prompt appears on Android Chrome (if enabled) | Polish | |
| 9.9 | App functions on slow 3G connection — test with Chrome DevTools throttling | High | |

---

## SECTION 10 — Performance

| # | Check | Priority | Result |
|---|-------|----------|--------|
| 10.1 | Lighthouse Performance score ≥ 80 on mobile | High | |
| 10.2 | Lighthouse Accessibility score ≥ 90 | High | |
| 10.3 | Largest Contentful Paint (LCP) ≤ 3s on simulated 4G | High | |
| 10.4 | No render-blocking resources in Lighthouse audit | High | |
| 10.5 | `npm run analyze` — no single chunk exceeds 500KB gzipped | High | |
| 10.6 | `AfricaHomePage` and `Hero` are eagerly loaded (confirmed in App.tsx) — fast first paint | High | |
| 10.7 | All lazy-loaded routes show spinner — no white flash | High | |
| 10.8 | Fonts load from Google Fonts without layout shift (preconnect set in index.html) | Polish | |

---

## SECTION 11 — SEO & Meta

| # | Check | Priority | Result |
|---|-------|----------|--------|
| 11.1 | `<title>` tag: "SocialCaution Africa \| Digital Trust, Scam Prevention & Privacy Rights" | High | |
| 11.2 | Meta description references Africa, scam prevention, privacy rights | High | |
| 11.3 | `og:url` and `twitter:url` point to `https://africa.socialcaution.com/` | High | |
| 11.4 | `og:image` resolves — `socialcaution.png` is present in `public/` | High | |
| 11.5 | `sitemap.xml` — `/africa/partner` is present; `/africa` (redirect) should be removed or pointed to `/` | High | |
| 11.6 | `sitemap.xml` — `/personas` entry removed (it redirects — should not be in sitemap) | High | |
| 11.7 | `robots.txt` allows all crawlers and points to sitemap URL | High | |
| 11.8 | `structured-data.json` `@type` is correct (`WebApplication`) — validates in Google Rich Results Test | Polish | |
| 11.9 | Canonical URL in `<head>` matches deployed domain | High | |

---

## SECTION 12 — Security & Privacy Architecture

| # | Check | Priority | Result |
|---|-------|----------|--------|
| 12.1 | `Content-Security-Policy` header present on all routes (verify in browser DevTools → Network → Response Headers) | Blocker | |
| 12.2 | `X-Content-Type-Options: nosniff` present | Blocker | |
| 12.3 | `X-Frame-Options: DENY` present (set in `_headers`) | Blocker | |
| 12.4 | `Strict-Transport-Security` header present | Blocker | |
| 12.5 | `Permissions-Policy` blocks camera, microphone, geolocation | High | |
| 12.6 | No `console.log` statements in production build (esbuild drops them per vite.config) | High | |
| 12.7 | No API keys, tokens, or Supabase secrets visible in browser DevTools → Sources | Blocker | |
| 12.8 | `VITE_DEMO_MODE=true` confirmed in Netlify env vars — no real Supabase writes from public users | Blocker | |
| 12.9 | LocalStorage used only for persona/journey state — no PII stored (email, name, etc.) | Blocker | |
| 12.10 | Auth modal (if reachable) does not expose production Supabase credentials | Blocker | |

---

## SECTION 13 — Error States & Edge Cases

| # | Check | Priority | Result |
|---|-------|----------|--------|
| 13.1 | `/africa/countries/invalid-slug` renders gracefully — not a white screen | High | |
| 13.2 | `/africa/personas/invalid-slug` renders gracefully | High | |
| 13.3 | Navigating to `/africa/action-center/invalid-slug` renders gracefully | High | |
| 13.4 | ErrorBoundary catches a component crash — renders fallback, not blank page | High | |
| 13.5 | EnhancedErrorBoundary wraps the entire app — top-level crash handled | High | |
| 13.6 | Assessment with no persona selected renders correctly (Skip flow) | High | |
| 13.7 | Dashboard accessed without auth redirects correctly — no infinite loop | High | |

---

## SECTION 14 — Two known issues to fix before launch

These were identified in the code audit and must be resolved:

### Issue 1 — Duplicate `/africa` route (Blocker)
**File:** `src/App.tsx`

Two `<Route path="/africa">` declarations exist — one redirects to `/`, the second
renders `AfricaHomePage`. React Router v6 matches the first one found, so the second
is dead code. Remove this line:

```tsx
// REMOVE this line (currently around line 149):
<Route path="/africa" element={<AfricaHomePage />} />
```
The redirect `<Route path="/africa" element={<Navigate to="/" replace />} />` is correct and should stay.

### Issue 2 — Stale imports in `Hero.tsx` (High)
**File:** `src/components/home/Hero.tsx`

`DollarSign` and `Zap` are imported but no longer used after the copy updates.
`KeyRound` was replaced by `Globe` but may still be in the import line.

```tsx
// Remove from import line: DollarSign, Zap, KeyRound
// Confirm present: Globe
import { Search, Scale, Lock, Shield, GraduationCap, XCircle, Globe, Users } from 'lucide-react';
```

---

## SECTION 15 — Final sign-off

| # | Check | Result |
|---|-------|--------|
| 15.1 | `npm run pre-deploy` passes (validate:local-first + validate:africa + launch-check) | |
| 15.2 | All Blocker items above marked PASS | |
| 15.3 | Netlify deploy preview URL tested end-to-end before DNS cutover | |
| 15.4 | Custom domain `africa.socialcaution.com` DNS resolves correctly after cutover | |
| 15.5 | HTTPS certificate active — no mixed-content warnings | |
| 15.6 | One full user journey completed on production: Home → Country → Persona → Assessment → Results | |

