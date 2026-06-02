# Launch Readiness Report

**Generated:** Run `npm run launch-check` before each deploy.  
**Mode:** Local-first (no backend required) — set `VITE_DEMO_MODE=true` on Netlify/Vercel.

## Quick commands

| Command | Purpose |
|---------|---------|
| `npm run launch-check` | Full audit (TypeScript, lint, build, files, redirects) |
| `npm run production-check` | Shorter validation (lint + build) |
| `npm run pre-deploy` | Alias → `launch-check` |

## Latest status

| Check | Status |
|-------|--------|
| TypeScript | ✅ Pass |
| ESLint | ✅ Pass |
| Production build | ✅ Pass |
| Deploy files (`netlify.toml`, `_headers`, `_redirects`) | ✅ Present |
| SEO (`robots.txt`, `sitemap.xml`) | ✅ Present |
| Local-first runtime (`src/config/runtime.ts`) | ✅ Configured |
| Broken redirects (`/assessment/full`, `/toolkit-access`) | ✅ Removed |
| Dev-only tools (`ProductionChecklist`) | ✅ Gated with `import.meta.env.DEV` |
| Unit tests | ⚠️ Advisory — 12 failing (legacy hook tests; app builds) |
| Bundle size | ⚠️ `feature-dashboard` chunk ~915KB — consider further code-splitting |

## Pre-launch smoke test (manual)

After deploy, verify in the browser:

1. `/` — home loads
2. `/assessment` — start and complete assessment → dashboard updates
3. `/dashboard` — stats from local assessment data
4. `/dashboard/action-plan` — tasks from assessment
5. `/toolkit` and `/resources` — no redirect loops
6. `/404` or unknown URL — not-found page
7. `/privacy` — legal page (not `/privacy-policy`)

## Environment (production)

**Local-only launch (recommended):**

```env
VITE_DEMO_MODE=true
# Leave VITE_API_URL unset
```

**Optional backend:**

```env
VITE_DEMO_MODE=false
VITE_API_URL=https://your-api.example.com/api
```

## Fixes applied for this audit

- ESLint unused imports (`App.tsx`, `ToolkitPage.tsx`)
- `public/_redirects` — removed dead targets; fixed privacy canonical URL
- Added `public/robots.txt` and `public/sitemap.xml`
- `scripts/launch-readiness.cjs` — automated checklist
- `useAuth.test.ts` mock includes `isSupabaseAvailable`

## Remaining (non-blocking)

- Repair failing Vitest suites (`useToast`, legacy Supabase hook tests)
- Split large dashboard chunk for faster first paint
- Wire contact form to a service or label as demo-only in UI
