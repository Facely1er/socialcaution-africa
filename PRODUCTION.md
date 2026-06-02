# SocialCaution Africa — Production Deployment

## Netlify (recommended)

This project is set up for **Netlify** static hosting with **no backend**.

**Full guide:** [NETLIFY_DEPLOY.md](./NETLIFY_DEPLOY.md)

| Netlify setting | Value (from `netlify.toml`) |
|-----------------|----------------------------|
| Build command | `npm run build` |
| Publish directory | `dist` |
| `VITE_DEMO_MODE` | `true` (local-first) |
| Node | `20.19.0` |

**Before you push:**

```bash
npm run pre-deploy
```

**After deploy, smoke-test:** `/`, `/africa`, `/africa/scamshield`, `/africa/sources`, `/assessment`, `/dashboard`

---

## Other hosts

| Platform | Config |
|----------|--------|
| **Vercel** | `vercel.json` — `VITE_DEMO_MODE=true` in build env |
| **Any static host** | Publish `dist/` with SPA fallback to `index.html` |
## Pre-deploy checklist

```bash
npm install
npm run pre-deploy
```

This runs:

1. `validate:local-first` — confirms no-backend defaults
2. `validate:africa` — Africa routes, data, homepage section
3. `launch-check` — TypeScript, build, deploy files

## Environment variables

```env
# Required for local-first production (default)
VITE_DEMO_MODE=true

# Do NOT set unless you run the optional backend
# VITE_API_URL=

# Optional cloud sync for 30-day challenge
# VITE_SUPABASE_URL=
# VITE_SUPABASE_ANON_KEY=
```

## Build and preview

```bash
npm run build
npm run preview
```

Smoke-test:

- `/` — Africa Edition section visible on homepage
- `/africa`, `/africa/countries`, `/africa/scamshield`, `/africa/sources`
- `/assessment`, `/dashboard`, `/toolkit`

## Optional full-stack

Only if you need server-side auth, RSS refresh, or email:

1. Set `VITE_API_URL` to your API base
2. Set `VITE_DEMO_MODE=false`
3. Run `backend/` with MongoDB and env from `backend/.env.example`

## Content verification before public launch

Country data in `src/data/africa/countries.ts` is MVP-level (`needs-official-verification`). Validate authority URLs and complaint workflows via `/africa/sources` before government or legal use.

## Workspace

Canonical repo: `ERMITS_DEPLOYMENTS/socialcaution-africa` only. Other forks were merged and removed from the workspace.
