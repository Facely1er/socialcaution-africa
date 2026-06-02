# Deploy SocialCaution Africa on Netlify

This repo is configured for **static, local-first** production on Netlify — no backend server.

## New site (start here)

Use this flow when creating a **brand-new** Netlify site (not updating an old beta/alpha site).

### Step-by-step

1. **Push code to GitHub** (if not already)
   - Repository folder: `socialcaution-africa`
   - Branch: `main` (or your default branch)

2. **Netlify** → [app.netlify.com](https://app.netlify.com) → **Add new project** → **Import an existing project**

3. **Connect to Git** → choose GitHub → authorize → select **`socialcaution-africa`**

4. **Review build settings** (should auto-fill from `netlify.toml`):
   - Branch to deploy: `main`
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Do **not** set a base directory unless the repo is in a subfolder

5. **Site name** — pick a Netlify subdomain, e.g.:
   - `socialcaution-africa` → `https://socialcaution-africa.netlify.app`
   - or `sc-africa` → `https://sc-africa.netlify.app`

6. Click **Deploy site** and wait for the first build (~2–4 min)

7. **After first deploy** → **Site configuration** → **Environment variables**
   - Confirm or add for **Production** (and **Deploy previews** if you want):
     - `VITE_DEMO_MODE` = `true`
   - Leave **`VITE_API_URL` unset**

8. **Trigger redeploy** if you added env vars after the first build:
   - **Deploys** → **Trigger deploy** → **Clear cache and deploy site**

9. **Custom domain**:
   - **Domain management** → **Add domain** → `africa.socialcaution.com`
   - At your DNS provider, add the CNAME/ALIAS records Netlify shows
   - `public/sitemap.xml`, `robots.txt`, and `index.html` already use `https://africa.socialcaution.com`
   - Env var `VITE_SITE_URL` is set in `netlify.toml` (override in UI if needed)

### New site checklist

- [ ] First build succeeded (green check in Deploys)
- [ ] Homepage shows **SocialCaution Africa Edition** section
- [ ] `/africa/scamshield` loads (hard refresh — no 404)
- [ ] No `VITE_API_URL` in environment variables
- [ ] HTTPS enabled on Netlify subdomain

---

## 1. Connect the site (existing / re-import)

1. Log in to [Netlify](https://app.netlify.com)
2. **Add new site** → **Import an existing project**
3. Connect your Git provider and select the **`socialcaution-africa`** repository
4. Netlify reads settings from `netlify.toml` automatically:

| Setting | Value |
|---------|--------|
| Build command | `npm run build` |
| Publish directory | `dist` |
| Node version | `20.19.0` |

You do not need to change these unless you use a monorepo subfolder (not the case here).

## 2. Environment variables (Netlify UI)

Go to **Site configuration** → **Environment variables** → **Production** (and Deploy previews if you want the same behavior).

### Required for local-first (no backend)

| Variable | Value | Notes |
|----------|--------|--------|
| `VITE_DEMO_MODE` | `true` | Already in `netlify.toml`; UI override only if you removed it |
| `NODE_VERSION` | `20.19.0` | Optional — `netlify.toml` sets this |

### Do not set (unless you add a backend later)

- `VITE_API_URL` — leave unset so the app never calls Express/Mongo
- `VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY` — optional; 30-day challenge works in localStorage without them

### Optional

| Variable | Value | Purpose |
|----------|--------|---------|
| `VITE_AB_VARIANT` | `B` | Parent A/B journey (already in `netlify.toml`) |
| `VITE_REACT_APP_SENTRY_DSN` | your DSN | Error tracking in production |

## 3. Deploy

- **Git push** to the connected branch triggers a build
- Or **Deploys** → **Trigger deploy** → **Deploy site**

Build logs should end with Vite writing to `dist/` and Netlify publishing that folder.

## 4. Custom domain

1. **Domain management** → **Add domain**
2. Point DNS to Netlify (CNAME or Netlify DNS)
3. Enable HTTPS (automatic with Let’s Encrypt)

Update `public/sitemap.xml` host URLs if your production domain is not `socialcaution.com`.

## 5. Post-deploy smoke test

Open your live URL and check:

- `/` — **SocialCaution Africa Edition** section on the homepage
- `/africa`
- `/africa/countries`
- `/africa/scamshield`
- `/africa/sources`
- `/assessment`
- `/dashboard`
- Hard refresh on `/africa/scamshield` (SPA routing — should not 404)

## 6. Local check before you push

```bash
npm install
npm run pre-deploy
```

`pre-deploy` runs Africa + local-first validation and a full launch check (TypeScript, lint, build, tests).

Preview the production build locally:

```bash
npm run build
npm run preview
```

## 7. Netlify CLI (optional)

```bash
npm install -g netlify-cli
cd socialcaution-africa
netlify login
netlify init
netlify deploy --prod
```

First time: link the folder to your existing Netlify site.

## Troubleshooting

| Issue | Fix |
|-------|-----|
| Blank page after deploy | Confirm publish directory is `dist`, not `build` |
| Africa routes 404 on refresh | SPA fallback is in `netlify.toml` and `public/_redirects` — redeploy |
| App tries to call an API | Remove `VITE_API_URL` from Netlify env; set `VITE_DEMO_MODE=true` |
| Build fails on Node | Set `NODE_VERSION=20.19.0` in Netlify UI |
| CSP blocks Supabase | Only add Supabase vars if you use cloud sync; CSP already allows `*.supabase.co` |

## What Netlify does not run

- `backend/` (Express/Mongo) — not deployed by this site
- Docker / `docker-compose` — not used on Netlify for this project

For a full API later, host the backend separately and set `VITE_API_URL` + `VITE_DEMO_MODE=false`.
