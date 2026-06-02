# Local-Only Feature Map

**ERMITS Social Caution — how each feature works without a backend**

When `VITE_DEMO_MODE=true` and `VITE_API_URL` is unset, the app runs entirely in the browser. No Express API, MongoDB, or Supabase is required.

Mode detection lives in `src/config/runtime.ts`:

| Function | Meaning |
|----------|---------|
| `isDemoMode()` | Local-only — use localStorage + mock data |
| `isBackendEnabled()` | Remote API active — requires `VITE_API_URL` and `VITE_DEMO_MODE≠true` |

---

## Quick setup (local-only)

```env
VITE_DEMO_MODE=true
# Do NOT set VITE_API_URL
# Do NOT set VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY
```

```bash
npm install
npm run dev
```

---

## Architecture overview

```
┌─────────────────────────────────────────────────────────────┐
│                     Browser (no backend)                     │
├─────────────────────────────────────────────────────────────┤
│  UI Pages / Components                                       │
│       ↓                                                      │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────┐  │
│  │ AuthProvider │  │ Zustand      │  │ demoApi          │  │
│  │              │  │ persist      │  │ (mock API)       │  │
│  └──────┬───────┘  └──────┬───────┘  └────────┬─────────┘  │
│         ↓                 ↓                    ↓             │
│  localStorageService   localStorage keys   ermits-demo-data  │
└─────────────────────────────────────────────────────────────┘
```

| Layer | File | Role |
|-------|------|------|
| Mode switch | `src/config/runtime.ts` | Enables/disables backend |
| User & data CRUD | `src/services/localStorageService.ts` | Accounts, assessments, action plans, notifications |
| Mock API | `src/services/demoApi.ts` | Personas, caution feed, privacy tools |
| API router | `src/services/cautionApi.ts`, `src/services/toolsApi.ts` | Route to `demoApi` when `isDemoMode()` |
| Auth | `src/components/auth/AuthProvider.tsx` | Always localStorage (never hits backend) |

---

## Core features

### Authentication & user profile

| | |
|---|---|
| **Feature** | Register, login, logout, profile |
| **Service** | `AuthProvider` → `localStorageService` |
| **Backend used?** | Never |
| **Key files** | `src/components/auth/AuthProvider.tsx`, `src/services/localStorageService.ts` |

| Storage key | Contents |
|-------------|----------|
| `social-caution-user` | Current user account (`LocalUser`) |
| `auth_token` | Session token (`local_{userId}_{timestamp}`) |
| `social-caution-auth` | Zustand persist wrapper (`useStore`) |

---

### Privacy assessments (full / exposure / security / rights)

| | |
|---|---|
| **Feature** | Interactive questionnaires, scoring, action plans |
| **Service** | `Assessment.tsx` + `assessmentStore`; sub-pages write `assessment-results` |
| **Backend used?** | Only if `user && isBackendEnabled()` — otherwise local |
| **Key files** | `src/components/assessment/Assessment.tsx`, `src/store/assessmentStore.ts` |

| Storage key | Contents |
|-------------|----------|
| `social-caution-assessment` | Zustand: results, userLevel, lastAssessmentDate |
| `social-caution-assessments` | Full assessment history via `localStorageService` |
| `assessment-results` | Per-type results (exposure, security, rights) from sub-pages |
| `social-caution-action-plan` | Generated action plan items |

**Flow (local-only):**
1. `handleStart` → sets `assessmentId = 'local-assessment'`
2. Answers stored in React state
3. `completeAssessment` → `calculateLocalResults()` → `assessmentStore.setResults()`

---

### Dashboard & analytics

| | |
|---|---|
| **Feature** | Privacy score, charts, upcoming tasks, improvement areas |
| **Service** | `useDashboard` reads `assessmentStore` + computes locally |
| **Backend used?** | Only if `user && isBackendEnabled()` — otherwise local |
| **Key files** | `src/hooks/useDashboard.ts`, `src/store/assessmentStore.ts` |

Data is derived from assessment results in Zustand; no separate dashboard storage key.

---

### Personas & caution feed (MVP)

| | |
|---|---|
| **Feature** | 6 personas, sample caution alerts, filtering, stats |
| **Service** | `cautionApi` → `demoApi` (when `isDemoMode()`) |
| **Backend used?** | Never in local-only mode |
| **Key files** | `src/services/cautionApi.ts`, `src/services/demoApi.ts`, `src/data/mockData.ts` |

| Storage key | Contents |
|-------------|----------|
| `ermits-demo-data` | `{ user, selectedPersona }` — persona selection persists |

**Pages:** `PersonaSelection`, `CautionFeed`, `SimpleDashboard`

---

### Privacy journey personas (full app)

| | |
|---|---|
| **Feature** | Persona type + journey phase (Discover → Learn → Protect → Monitor) |
| **Service** | `PersonaProvider` |
| **Key files** | `src/core/providers/PersonaProvider.tsx` |

| Storage key | Contents |
|-------------|----------|
| `socialcaution-persona` | Selected persona type |
| `socialcaution-journey-phase` | Current journey phase |

---

### Privacy tools

| Tool | Service | Storage | Backend? |
|------|---------|---------|----------|
| Digital footprint analyzer | `toolsApi` → `demoApi` | None (session only) | Mock in demo |
| Data breach checker | `toolsApi` → `demoApi` | None | Mock in demo |
| Website privacy scanner | `toolsApi` → `demoApi` | None | Mock in demo |
| Password strength checker | `toolsApi` → `demoApi` | `passwordCheckHistory` | Client-side + mock |
| Data broker removal | `toolsApi` → `demoApi` | `social-caution-data-broker-removals-{userId}` via service | Mock submit/status |
| Personal data inventory | `utils/personalDataInventory/storage.ts` | `personalDataInventory` | Never |
| Cookie tracker scanner | Page component | None | Simulated UI |

**Key files:** `src/services/toolsApi.ts`, `src/services/demoApi.ts`, `src/pages/tools/*`

---

### 30-day privacy challenge

| | |
|---|---|
| **Feature** | Daily tasks, streaks, milestones, achievements |
| **Service** | `thirtyDayChallengeStore` (Zustand persist) |
| **Supabase sync?** | Only when `isSupabaseAvailable()` — skipped in local-only |
| **Key files** | `src/store/thirtyDayChallengeStore.ts`, `src/pages/ThirtyDayRoadmapPage.tsx` |

| Storage key | Contents |
|-------------|----------|
| `social-caution-30day-challenge` | Full challenge state (tasks, streak, milestones) |

---

### Progress, achievements & gamification

| | |
|---|---|
| **Feature** | Points, levels, badges, 13 achievements |
| **Service** | `progressStore` (Zustand persist) |
| **Key files** | `src/store/progressStore.ts` |

| Storage key | Contents |
|-------------|----------|
| `social-caution-progress` | Points, level, streak, achievements, badges |

---

### A/B test — Parent journey

| | |
|---|---|
| **Feature** | Variant A/B, onboarding wizard, family profile |
| **Service** | `abTestStore` (Zustand persist) |
| **Key files** | `src/store/abTestStore.ts`, `src/pages/ab-test/*` |

| Storage key | Contents |
|-------------|----------|
| `sc-ab-test-state` | Variant, onboarding step, family profile, concerns, score |

Controlled at build time by `VITE_AB_VARIANT=A|B`.

---

### Theme & UI preferences

| | |
|---|---|
| **Feature** | Dark / light / system theme |
| **Service** | `ThemeContext` |
| **Key files** | `src/contexts/ThemeContext.tsx` |

| Storage key | Contents |
|-------------|----------|
| `theme` | `'light'` \| `'dark'` \| `'system'` |

User notification preferences are stored inside `social-caution-user` via `localStorageService`.

---

### Blog & content (client-side only)

| Feature | Storage key | File |
|---------|-------------|------|
| Blog bookmarks | `blog-bookmarks` | `EnhancedBlogPost.tsx` |
| Blog likes | `blog-liked-{title}` | `EnhancedBlogPost.tsx` |
| Newsletter subscriptions | `blog-subscriptions` | `BlogPage.tsx` |

---

### Navigation & onboarding

| Feature | Storage key | File |
|---------|-------------|------|
| Welcome walkthrough seen | `hasSeenWalkthrough` | `WelcomeWalkthrough.tsx` |
| Navigation analytics | `navigationAnalytics` | `NavigationAnalytics.tsx` |
| Performance analytics | `performanceAnalytics` | `NavigationAnalytics.tsx` |
| Section analytics | `sectionAnalytics` | `NavigationAnalytics.tsx` |
| Transition analytics | `transitionAnalytics` | `NavigationAnalytics.tsx` |
| Last error (debug) | `last_error` | `EnhancedErrorBoundary.tsx` |

**Global search** (`GlobalSearch.tsx`) uses in-memory recent searches only — no localStorage persistence.

---

## Per-user keys (via `localStorageService`)

These append `{userId}` when a user is logged in:

| Pattern | Purpose |
|---------|---------|
| `social-caution-digital-footprint-{userId}` | Footprint analysis history |
| `social-caution-data-broker-removals-{userId}` | Broker opt-out tracking |
| `social-caution-personal-data-inventory-{userId}` | Inventory (service layer; page also uses `personalDataInventory`) |
| `social-caution-challenge-progress-{userId}` | Legacy challenge backup |
| `social-caution-preferences-{userId}` | User preferences override |

---

## What is NOT stored locally

| Feature | Local-only behavior |
|---------|---------------------|
| Real RSS feed updates | Static mock cautions in `mockData.ts` |
| Have I Been Pwned / breach APIs | Simulated breach results |
| Email notifications | Not available |
| Cross-device sync | Not available |
| Server-side auth (JWT) | Not used — local tokens only |

---

## Switching to the remote ERMITS API later

Set in your hosting environment:

```env
VITE_API_URL=https://your-ermits-api.example.com/api
VITE_DEMO_MODE=false
```

Then deploy the backend with MongoDB + JWT secrets (see `BACKEND_SETUP.md`).

Features that will start using the remote API:
- Assessments (when logged in)
- Dashboard overview (when logged in)
- Personas/caution feed (via `cautionApi` instead of `demoApi`)
- Privacy tools (via backend routes instead of `demoApi`)

Auth via `AuthProvider` remains localStorage unless you refactor it to call `apiService.login/register`.

---

## Debugging localStorage

Open DevTools → Application → Local Storage → your origin.

To reset all app data:

```javascript
// Clear ERMITS / Social Caution keys
Object.keys(localStorage)
  .filter(k => k.startsWith('social-caution') || k.startsWith('socialcaution') || k.startsWith('ermits') || k.startsWith('sc-') || k === 'auth_token' || k === 'personalDataInventory')
  .forEach(k => localStorage.removeItem(k));
```

---

## Related docs

- [LOCALSTORAGE_IMPLEMENTATION.md](./LOCALSTORAGE_IMPLEMENTATION.md) — service API reference
- [DEMO_MODE_DEPLOYMENT.md](./DEMO_MODE_DEPLOYMENT.md) — deploy without backend
- [DEVELOPMENT_STATUS.md](./DEVELOPMENT_STATUS.md) — production-ready vs demo features
