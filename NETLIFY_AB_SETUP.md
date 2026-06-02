# Netlify A/B Test Setup Guide

The parent-journey A/B test runs as **two separate Netlify sites** built
from the **same repository and branch**. Each site gets a unique env var
that bakes the variant into the build at compile time.

---

## Overview

| | Site A (Alpha) | Site B (Beta) |
|---|---|---|
| **URL** | `alpha.socialcaution.com` | `beta.socialcaution.com` |
| **Variant** | A — Persona-first | B — Concern-first |
| **Landing hero** | "Who best describes you?" (persona cards) | "What concerns you most?" (concern picker) |
| **Entry point** | Click Cautious Parent → `/parent/onboarding` | Select parent concerns → `/parent/onboarding` |
| **After landing** | Shared wizard → Assessment → Family Dashboard | Same |
| **Env var** | `VITE_AB_VARIANT=A` | `VITE_AB_VARIANT=B` |
| **Branch** | `claude/trusting-gauss-Ebe3G` | same |

---

## Step 1 — Create Site A (alpha.socialcaution.com)

1. Go to **app.netlify.com → Add new site → Import an existing project**
2. Connect GitHub → select `facely1er/ermits-socialcaution`
3. Set:
   - **Branch**: `claude/trusting-gauss-Ebe3G`
   - **Build command**: `npm run build` *(auto-detected from netlify.toml)*
   - **Publish directory**: `dist` *(auto-detected)*
4. Expand **Advanced build settings → New variable**:
   - Key: `VITE_AB_VARIANT`
   - Value: `A`
5. Click **Deploy site**
6. Once deployed, go to **Domain management → Add custom domain**:
   - Add `alpha.socialcaution.com`
   - In your DNS provider, add a CNAME record:
     ```
     alpha   CNAME   <your-netlify-site-name>.netlify.app
     ```
   - Wait for Netlify to provision the SSL certificate (usually < 5 min)

---

## Step 2 — Create Site B (beta.socialcaution.com)

Repeat Step 1 with:
- **VITE_AB_VARIANT** = `B`
- Custom domain: `beta.socialcaution.com`
- DNS CNAME: `beta` → `<second-netlify-site-name>.netlify.app`

> Both sites build independently from the same branch. The variant is
> baked in at compile time via `import.meta.env.VITE_AB_VARIANT` in
> `src/ab-test/config.ts`. Subdomain detection (`alpha.` → A,
> `beta.` → B) also works as a runtime fallback if the env var is unset.

---

## Step 3 — Verify builds

After each deploy, navigate to `/parent` on each domain and confirm:

- **alpha.socialcaution.com/parent** → persona cards hero ("Who best describes you?")
- **beta.socialcaution.com/parent** → concern picker hero ("What concerns you most?")

In the browser console you can also check:
```js
localStorage.getItem('sc-ab-test-state') // shows stored variant after first visit
```

---

## Step 4 — GA4 funnel tracking

All user-journey events fire via `trackABEvent()` as a GA4 custom event
named `ab_test_event` with parameters `ab_variant` (A or B) and `ab_step`.

In **GA4 → Explore → Funnel Exploration**, build a funnel filtered by
`ab_variant` to compare drop-off between variants:

| Funnel step | `ab_step` value |
|---|---|
| 1. Landing viewed | `landing_viewed` |
| 2a. Variant A — persona picked | `persona_selected` |
| 2b. Variant B — concerns submitted | `concerns_submitted` |
| 3. Onboarding complete | `onboarding_completed` |
| 4. Assessment complete | `assessment_completed` |
| 5. Roadmap started | `roadmap_cta_clicked` |

**Primary metric**: conversion from step 1 → 3 (did the entry
mechanism drive people into the wizard?).

**Secondary metrics**:
- Per-step drop-off inside the wizard (`onboarding_step_completed`)
- Assessment score distribution per variant
- `action_item_toggled` rate on the dashboard

---

## Auto-deploys

Both Netlify sites auto-deploy on every commit to
`claude/trusting-gauss-Ebe3G`. Merging to `main` will not affect the
A/B test sites unless you update their branch setting.

---

## Local development

To test a specific variant locally, add to `.env.local`:

```bash
VITE_AB_VARIANT=B   # or A
```

Then visit `http://localhost:5173/parent`.
