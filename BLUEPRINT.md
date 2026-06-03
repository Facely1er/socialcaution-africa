# SocialCaution Africa — Complete Project Blueprint
## From current state to deployed, audience-ready product

---

## Honest assessment first

The project has been patched repeatedly on top of a Western-market SaaS template.
The data layer is excellent — country profiles, personas, scam types, action plans
are all solid and Africa-specific. The UI layer is structurally wrong and needs
to be rebuilt, not patched further.

**What is worth keeping:**
- All of `src/data/africa/` — do not touch
- `src/config/africaEditionNav.ts` — fix, don't replace
- `src/components/africa/PersonaCard.tsx` — fix, don't replace
- `src/App.tsx` routing — fix, don't replace
- `src/components/layout/Navbar.tsx` — fix, don't replace
- `src/components/layout/Footer.tsx` — fix, don't replace

**What needs to be rebuilt:**
- `src/pages/africa/AfricaHomePage.tsx` — rebuild from scratch
- `src/pages/africa/AfricaPageLayout.tsx` — rebuild as a proper Africa shell
- `src/styles/variables.css` — update color tokens
- `src/index.css` — remove dead imports
- `tailwind.config.js` — add typography

**What needs to be deleted:**
- `src/styles/blog.css` — dead
- `src/styles/modern-dashboard.css` — dead
- `src/styles/dashboard-optimized.css` — dead

---

## The product in one sentence

SocialCaution Africa gives any African user — regardless of literacy level,
connection speed, or digital experience — a clear, personal answer to:
**"What risks do I face and what should I do about them?"**

That sentence is the test for every design decision. If a screen doesn't
serve that answer, it is removed or simplified.

---

## The primary user journey — non-negotiable

```
HOMEPAGE
"What describes you best?"
7 persona cards, dark hero, immediate recognition

        ↓ user taps a card

COUNTRY PICKER
"Which country are you in?"
6 MVP countries, single question, one tap

        ↓ user taps a country

ACTION CENTER
"Here is your plan."
Persona + country = specific risks + specific actions + relevant authorities

        ↓ optional from Action Center

SCAMSHIELD / COUNTRY PROFILE
Reference content if they want more depth
```

Every other screen (Countries, ScamShield, Sources, Partner) is secondary
and must not compete with this journey for navigation space.

---

## Navigation architecture — final, no more changes after this

### The rule
One navigation system per viewport. No competing parallel systems.

### Desktop (≥1024px)
```
[SocialCaution Africa]   [Countries]  [ScamShield]  [Partner ↗]   [More ▾]  [☀/🌙]
```
- 3 primary items maximum
- "Partner" opens in same tab (it's a page, not external)
- "More" contains: Source register · About ERMITS · Contact · Intl. laws
- No auth button — SHOW_AUTH = false, stays false until dashboard is ready

### Mobile header (hamburger drawer)
```
[Logo]                                              [☀/🌙]  [☰]
```
Drawer sections:
- **Start** — Home · My Plan (→ /africa/personas/start/mobile-money-user)
- **Explore** — Countries · ScamShield · Partner
- **More** — Sources · About ERMITS · Contact · Intl. laws
- **Legal** — Privacy · Terms · Cookies

No auth actions in the drawer footer. Replace with:
`"SocialCaution® Africa · by ERMITS Advisory"`

### Mobile bottom bar (≤1024px, sticky)
```
[Home]    [Countries]    [ScamShield]    [My Plan →]
```
- "My Plan" → `/africa/personas/start/mobile-money-user` (most common persona)
- "Scams" label → "ScamShield" (unify with desktop label)
- Partner removed from bottom bar — it is not a user destination

---

## Visual identity — final specification

### The problem with current design
System font stack + generic orange accent + white cards on white background
= zero visual identity. Looks like every other Tailwind SaaS MVP.

### Africa Edition visual language
Three principles:
1. **Dark, confident hero** on every entry point — not light blue gradient to white
2. **Color-coded sections** — each part of the product has a distinct accent
3. **Readable at arm's length on a cheap Android** — high contrast, clear hierarchy

### Color tokens to update in `variables.css`

```css
/* Keep accent orange but strengthen it */
--color-accent: 234 88 12;          /* orange-600 — stronger than current #FF6B35 */
--color-accent-dark: 194 65 12;     /* orange-700 */

/* Section accent colors (new tokens) */
--color-scam: 220 38 38;            /* red-600 — danger/alert (ScamShield) */
--color-rights: 37 99 235;          /* blue-600 — information/law (Countries) */
--color-journey: 5 150 105;         /* emerald-600 — personal journey (Personas) */
--color-partner: 10 35 66;          /* primary navy — institutional (Partner) */
```

### Typography — add to `tailwind.config.js`

```js
fontFamily: {
  sans: ['DM Sans', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
  display: ['Fraunces', 'Georgia', 'serif'],
  mono: ['IBM Plex Mono', 'Consolas', 'monospace'],
},
```

Add to `index.html` `<head>`:
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=Fraunces:ital,opsz,wght@0,9..144,700;1,9..144,400&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet">
```

`Fraunces` for display headings (h1, h2 on hero and section titles).
`DM Sans` for all body and UI text.
`IBM Plex Mono` for badges, country codes, labels.

---

## Phase 1 — Foundation (Session 1 in Claude Code)
**Scope: CSS, typography, navigation**
**Time: 1 session**
**Done when: the visual foundation is consistent across all pages**

### Files to change

**`src/index.css`**
Remove dead imports:
```css
/* DELETE: */
@import url('./styles/blog.css');
@import url('./styles/modern-dashboard.css');
@import url('./styles/dashboard-optimized.css');
@import url('./styles/home.css');
```

**`src/styles/variables.css`**
Update accent and add section color tokens as specified above.

**`tailwind.config.js`**
Add typography and section color tokens.

**`index.html`**
Add Google Fonts preconnect and link tags.

**`src/config/africaEditionNav.ts`**
Apply the final navigation architecture defined above.
- Fix bottom bar (replace Partner with My Plan)
- Fix mobile sections (Start / Explore / More / Legal)
- Unify "Scams" → "ScamShield" label

**`src/components/layout/MobileNav.tsx`**
Replace auth footer block with brand attribution line.

**`src/styles/africa.css`**
Replace `africa-hero-band` gradient:
```css
.africa-hero-band {
  background: rgb(var(--color-primary));
}
.dark .africa-hero-band {
  background: rgb(10 16 30);
}
```

---

## Phase 2 — Homepage & Persona Journey (Session 2 in Claude Code)
**Scope: AfricaHomePage, AfricaPersonaStartPage, PersonaCard**
**Time: 1 session**
**Done when: the WHO → WHERE → PLAN journey is visually engaging end to end**

### `src/pages/africa/AfricaHomePage.tsx` — rebuild

Structure:
```
┌─────────────────────────────────────────────────────────────────┐
│  DARK HERO (bg-primary, full width)                             │
│                                                                 │
│  [Africa Edition badge]                                         │
│  "What describes you best?"          ← font-display text-5xl   │
│  "Get a plan for your digital life in Africa"  ← text-white/70 │
│                                                                 │
│  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐   ← PersonaCards        │
│  │Mobile│ │Parent│ │Student│ │Teacher│   dark variant          │
│  │Money │ │      │ │       │ │       │                         │
│  └──────┘ └──────┘ └──────┘ └──────┘                          │
│  ┌──────┐ ┌──────┐ ┌──────┐                                   │
│  │ SME  │ │Seller│ │Civil │                                    │
│  │Owner │ │      │ │Svt.  │                                    │
│  └──────┘ └──────┘ └──────┘                                    │
│                                                                 │
│  Free · French & English · 2 minutes                           │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│  SCAMSHIELD BAND (bg-red-950/20, accent border-l)              │
│  "Common scams in Africa right now"                             │
│  4 scam cards (mobile money, WhatsApp, investment, marketplace) │
│  → View full guide                                              │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│  COUNTRY STRIP (bg-background-secondary)                        │
│  "Your country's privacy rights and authorities"                │
│  [CI] [GH] [NG] [KE] [SN] [ZA]  → View all                   │
└─────────────────────────────────────────────────────────────────┘
```

Remove entirely: 4-pillar "What you get" section. The persona cards ARE the
product entry point — explaining the product above them weakens the direct hook.

### `src/components/africa/PersonaCard.tsx` — update

Add `dark?: boolean` prop. When `dark`:
- Background: `bg-white/8 hover:bg-white/12`
- Border: `border-white/15 hover:border-white/30`
- Left accent: `border-l-white/30`
- Title: `text-white`
- Description: `text-white/65`
- Risk tags: `bg-white/10 text-white/55`
- CTA text: `text-accent`

Remove `border-l-4` from `rounded-2xl` cards. Use icon color as differentiator.
Use `rounded-2xl` consistently — no left border accent.

### `src/pages/africa/AfricaPersonaStartPage.tsx` — update

Current header is a generic AfricaPageLayout with title/subtitle.
Replace with a focused step header on dark background:

```
┌─────────────────────────────────────────────────────────────────┐
│  bg-primary                                                     │
│  ← Back    Step 2 of 2                                         │
│                                                                 │
│  [Persona icon in color]  Mobile Money User                    │
│  "Navigating mobile wallets, agent networks, and USSD"         │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│  "Which country are you in?"                                    │
│                                                                 │
│  ┌────────────┐ ┌────────────┐ ┌────────────┐                 │
│  │  CI        │ │  GH        │ │  NG        │                 │
│  │ Côte d'Iv. │ │  Ghana     │ │  Nigeria   │                 │
│  └────────────┘ └────────────┘ └────────────┘                 │
│  ┌────────────┐ ┌────────────┐ ┌────────────┐                 │
│  │  KE        │ │  SN        │ │  ZA        │                 │
│  │  Kenya     │ │  Senegal   │ │ S. Africa  │                 │
│  └────────────┘ └────────────┘ └────────────┘                 │
│                                                                 │
│  My country isn't listed yet →                                 │
└─────────────────────────────────────────────────────────────────┘
```

Country cards: large, tap-friendly (min 80px height on mobile), ISO code in
`font-mono text-xs` badge, country name in `font-semibold text-lg`.

---

## Phase 3 — Action Center & Country Pages (Session 3 in Claude Code)
**Scope: AfricaActionCenterPage, AfricaCountryPage, ScamShieldAfricaPage**
**Time: 1 session**
**Done when: the payoff of the journey is clear and actionable**

### `src/pages/africa/AfricaActionCenterPage.tsx` — update header

The Action Center is the most important screen — it's the payoff.
It needs to immediately communicate personalization.

Header structure:
```
┌─────────────────────────────────────────────────────────────────┐
│  bg-emerald-900 (journey color)                                 │
│  ← Change                          [Persona icon]  [Country]  │
│                                                                 │
│  "Your plan, [Persona label]"    ← font-display                │
│  "[Country name] · [top 2 risks as tags]"                      │
└─────────────────────────────────────────────────────────────────┘
```

Action items: render as a numbered checklist, not a card grid.
Each action:
- Number badge (filled circle, emerald)
- Action title (bold)
- One-line explanation
- Optional: authority link (if relevant)

SocialCaution app prompt: add at bottom of action list.

### `src/pages/africa/AfricaCountryPage.tsx` — update header + CTA

Header:
```
┌─────────────────────────────────────────────────────────────────┐
│  bg-blue-900 (rights color)                                     │
│  [CI]  Côte d'Ivoire                ← font-display             │
│  ARTCI · ANSSI-CI                   ← font-mono text-sm        │
│  French · CFA Franc                 ← context chips            │
└─────────────────────────────────────────────────────────────────┘
```

Replace current three-button card with single-question prompt:
```
"Looking for your personal safety plan?"
[Choose my profile →]   text link: "Just browsing country info"
```

### `src/pages/africa/ScamShieldAfricaPage.tsx` — update header

```
┌─────────────────────────────────────────────────────────────────┐
│  bg-red-900 (scam/danger color)                                 │
│  ShieldAlert icon                                               │
│  "ScamShield Africa"               ← font-display              │
│  "Know what to watch for."         ← subline                   │
└─────────────────────────────────────────────────────────────────┘
```

Scam type cards: add a severity indicator (HIGH / MEDIUM tag) in the
danger color. Currently they are plain text cards with no urgency signal.

---

## Phase 4 — Partner, About, Contact, Footer (Session 4)
**Scope: Secondary pages and footer**
**Time: 1 session**
**Done when: partner/institutional entry point is professional and complete**

### `src/pages/africa/AfricaPartnerPage.tsx`

This page is for governments, regulators, NGOs, development banks.
It should feel institutional, not like the user-facing pages.

Structure:
```
Dark navy hero:
  "Build digital trust infrastructure for your nation"
  "Three partnership tiers — from awareness programs to national deployment"

Three tier cards (Tier I, II featured, III)
Six regional edition cards (ISO codes, authority names, ESATIC note for CI)
Contact CTA block
```

### `src/pages/AboutPage.tsx` — rewrite

Current copy is generic "empower individuals to control their privacy."
Rewrite as Africa Edition About:
- ERMITS Advisory LLC — who we are
- Facely Kande credentials (CISSP, CISA, PMP, PMI-ACP)
- ESATIC partnership
- Why Africa — the mission
- Privacy-first architecture commitment

### `src/components/layout/Footer.tsx`

Footer structure:
```
[SocialCaution Africa logo]
Building digital trust across Africa.
by ERMITS Advisory LLC

[Explore]          [Reference]        [Legal & ERMITS]
Country profiles   Intl. privacy laws Privacy policy
ScamShield         ─                  Terms of service
Source register                       Cookie policy
Partner With Us                       Contact

© 2026 ERMITS Advisory LLC · SocialCaution® Africa Edition
Country data is regularly reviewed. Verify authoritative
sources before formal or legal use.
```

---

## Phase 5 — PWA, Performance, Pre-launch (Session 5)
**Scope: Technical readiness**
**Time: 1 session**
**Done when: build passes all checks, PWA installs on Android**

### Checklist

**CSS cleanup:**
- Remove `blog.css`, `modern-dashboard.css`, `dashboard-optimized.css` imports
- Audit `home.css` — remove if all rules are either unused or duplicated in `africa.css`
- Target: single CSS file chain: `variables → layout → africa → header-footer`

**Build verification:**
- `npx tsc --noEmit` — zero errors
- `npx eslint src --max-warnings 0` — zero warnings
- `npm run build` — clean, bundle ≤500KB gzipped main chunk

**PWA:**
- Confirm `manifest.webmanifest` has correct Africa Edition `name`, `short_name`
- Confirm `theme_color` matches `bg-primary`
- Test "Add to Home Screen" on Android Chrome

**18 URL verification (manual):**
Open each `authorityUrl`, `complaintUrl`, `cybercrimeReportingUrl` in
`countries.ts` for all 6 MVP countries and confirm they resolve.

**Sitemap audit:**
Current approved URLs only — see cleanup doc.

---

## What each Claude Code session needs at the start

Every session: open the repo, paste the relevant phase section from this
document as the opening prompt, attach this full blueprint as context.

Do not mix phases in a single session. Each phase has a clear scope and
a clear "done" state. If a session drifts out of scope, stop and commit
what's done.

---

## What success looks like

**A user in Lagos opens the URL on their Android phone.**
They see a dark screen with a clear headline: "What describes you best?"
They see 7 cards. One says "Mobile Money User" with two risk tags:
"SIM swap" and "OTP theft." They tap it.
They see: "Which country are you in?" — 6 country cards. They tap Nigeria.
They see: "Your plan, Mobile Money User — Nigeria."
They see 5 numbered actions with specific Nigerian authorities linked.
Total time: under 90 seconds. No account. No assessment. No confusion.

That is the product. Everything in this blueprint serves that experience.

---

## Files summary

| File | Action | Phase |
|------|--------|-------|
| `src/index.css` | Remove 3 dead imports | 1 |
| `src/styles/variables.css` | Update color tokens | 1 |
| `tailwind.config.js` | Add fonts + section colors | 1 |
| `index.html` | Add Google Fonts | 1 |
| `src/config/africaEditionNav.ts` | Final nav architecture | 1 |
| `src/components/layout/MobileNav.tsx` | Remove auth footer | 1 |
| `src/styles/africa.css` | Replace hero gradient | 1 |
| `src/styles/blog.css` | Delete | 1 |
| `src/styles/modern-dashboard.css` | Delete | 1 |
| `src/styles/dashboard-optimized.css` | Delete | 1 |
| `src/pages/africa/AfricaHomePage.tsx` | Rebuild | 2 |
| `src/components/africa/PersonaCard.tsx` | Add dark variant | 2 |
| `src/pages/africa/AfricaPersonaStartPage.tsx` | Update header + country cards | 2 |
| `src/pages/africa/AfricaActionCenterPage.tsx` | Update header + action list | 3 |
| `src/pages/africa/AfricaCountryPage.tsx` | Update header + CTA | 3 |
| `src/pages/africa/ScamShieldAfricaPage.tsx` | Update header + urgency tags | 3 |
| `src/pages/africa/AfricaPartnerPage.tsx` | Institutional redesign | 4 |
| `src/pages/AboutPage.tsx` | Africa Edition rewrite | 4 |
| `src/components/layout/Footer.tsx` | Final footer | 4 |
| Build + PWA + URL verification | — | 5 |

