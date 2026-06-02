# Africa Edition Merge Report

Consolidation work applied to `socialcaution-africa` (ERMITS base) on 2026-06-01.

## Repo diff summary

| Comparison | Result |
|------------|--------|
| Base vs visible-update | 1 content diff: `HomePage.tsx` (+ report doc) |
| Base vs continental (Supabase) | Already aligned — `privacy_*` tables in `src/lib/supabase.ts` and `supabase/migrations/` |
| Base vs persona fork | Persona uses `/regions/africa/*` routing; base uses `/africa/*` (kept base routing) |

## Merged from visible-update

- **`src/pages/HomePage.tsx`** — Africa Edition section after hero with CTAs to `/africa`, `/africa/countries`, `/africa/scamshield`

## Ported from persona fork (adapted)

- **`src/pages/africa/AfricaSourcesPage.tsx`** — Source register at `/africa/sources`, wired to `src/data/africa/countries.ts`
- **`scripts/validate-africa-edition.mjs`** — Validation for countries, personas, routes, homepage visibility

## Already present in base (no merge needed)

- Full `/africa/*` route tree in `src/App.tsx`
- Africa nav links in Navbar, MobileNav, BottomNav
- `src/data/africa/countries.ts`, `personas.ts`, `actions.ts`
- Supabase schema differentiation (`SCHEMA_DIFFERENTIATION.md`, `privacy_*` migrations)

## Not merged (intentional)

| Source | Item | Reason |
|--------|------|--------|
| continental | 266 differing `src/` files | Global/Western fork; would overwrite Africa edition |
| continental | Extra tool pages (footprint, cookie scanner) | Simulated tools; out of Africa launch scope |
| persona | `/regions/africa/*` routing | Conflicts with established `/africa/*` structure |
| persona | `src/data/africa/africaData.ts` | Superseded by richer `countries.ts` model |
| visible-update | Locales | Neither copy has active `public/locales/` |

## Remaining completion work

1. **Content verification** — Validate country authority URLs and complaint workflows (`confidenceLevel: needs-official-verification`)
2. **ScamShield content** — Incident examples, templates, posters (`ScamShieldAfricaPage.tsx`)
3. **Tests** — Add E2E coverage for `/africa/sources` and homepage Africa section
4. **Production mode** — Decide local-first static deploy vs full backend
5. **CI deploy** — Replace placeholder deploy steps in `.github/workflows/ci.yml`
6. **i18n** — French/English support for target markets (future phase)

## Validation

```bash
npm run validate:local-first
npm run validate:africa
npm run type-check
npm run build
```

## Local-first mode (no backend)

The Africa edition is designed to run as a **static SPA** with no Express/Mongo server:

| Feature | Storage / source |
|---------|------------------|
| Assessments & dashboard | Zustand + localStorage |
| Auth (optional) | `AuthProvider` + localStorage |
| Africa countries / ScamShield | Static TS data in `src/data/africa/` |
| Persona caution feed | `demoApi` + mock data |
| 30-day challenge | Zustand persist (Supabase optional) |
| Contact form | Saved to localStorage in local-first mode |

**Defaults:** `VITE_DEMO_MODE=true` in Netlify, Vercel, and `.env.development`. Leave `VITE_API_URL` unset unless you explicitly run the backend.
