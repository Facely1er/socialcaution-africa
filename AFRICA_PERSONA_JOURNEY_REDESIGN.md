# SocialCaution Africa — Persona Journey Redesign
## Claude Code Session Brief

---

## The core problem to solve

The current journey is: **Homepage → Country list → Country detail → Persona list → Action Center**

Country is the first question. But "which country are you in?" is not an emotional
hook. It is a filter. Nobody wakes up thinking "I need country-specific data
protection law information." They wake up thinking "someone just tried to scam me",
"I'm worried about my kid on TikTok", "my customer data is on WhatsApp."

The correct journey is: **WHO are you → WHERE are you → HERE IS YOUR PLAN**

The Africa persona data is excellent — 7 real personas with Africa-specific risks,
primary actions, and recommended modules. It just needs to be the front door,
not a secondary screen behind country selection.

---

## Journey redesign — three phases

### Phase 1 — Homepage: lead with persona selection

The homepage hero should do one thing: help the user identify themselves.
Not explain the product. Not list countries. Not describe features.

**Above the fold (hero):**
- Headline: "What describes you best?"
- Subtitle: "Get a privacy and safety plan built for your digital life in Africa."
- Below: The 7 persona cards (see card design below)
- No country selector at this stage

**Below the fold (secondary sections, keep existing):**
- 4 pillar cards (already exist — link them properly)
- ScamShield teaser → /africa/scamshield
- Country coverage card → /africa/countries

---

### Phase 2 — After persona selection: country picker

Once a user selects a persona, prompt for their country. This is a single focused
question, not a full country-list page.

**Implementation:** A modal or inline step that appears after persona card click.
Simple dropdown or card grid of MVP countries only (CI, GH, NG, KE, ZA, SN).

Route: `/africa/personas/:personaSlug` — already exists but currently requires
country first. Invert this: `/africa/start/:personaSlug` → country picker modal
→ `/africa/action-center/:countrySlug?persona=:personaSlug`

---

### Phase 3 — Action Center: the payoff

The Action Center already reads both `countrySlug` and `persona` query param and
builds `buildAfricaActionRecommendations(country, persona)`. The data logic is
complete. The page just needs to feel like a personal plan, not a dashboard.

---

## Task 1 — Rebuild `AfricaHomePage.tsx`

**File:** `src/pages/africa/AfricaHomePage.tsx`

Replace the current layout entirely. New structure:

```tsx
<AfricaPageLayout title="SocialCaution Africa" ...>

  {/* SECTION 1 — Persona selection hero */}
  <Section>
    <div className="text-center mb-10">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full
                      bg-accent/10 text-accent font-semibold text-sm mb-4">
        <Globe2 className="h-4 w-4" /> Africa Edition
      </div>
      <h1 className="text-3xl md:text-4xl font-bold text-primary dark:text-white mb-3">
        What describes you best?
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 max-w-xl mx-auto">
        Get a privacy and safety plan tailored to your digital life in Africa.
      </p>
    </div>

    {/* Persona grid — see Task 2 for PersonaCard component */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-6">
      {africaPersonas.map((persona) => (
        <PersonaCard key={persona.slug} persona={persona} />
      ))}
    </div>

    <p className="text-center text-sm text-gray-500 dark:text-gray-400 mb-16">
      No account needed · Free · Available in French and English
    </p>
  </Section>

  {/* SECTION 2 — What you get (4 pillars, each with a real link) */}
  <Section className="bg-gray-50 dark:bg-background-secondary py-12 rounded-2xl">
    ... (keep existing pillar cards but with correct CTAs — see Task 3)
  </Section>

  {/* SECTION 3 — Country coverage (compact, secondary) */}
  <Section>
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-xl font-bold text-primary dark:text-white">
        Country coverage
      </h2>
      <Link to="/africa/countries" className="text-accent font-semibold text-sm
                                               hover:underline flex items-center gap-1">
        View all <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
    {/* Show MVP countries only as a compact strip, not a full card grid */}
    <div className="flex flex-wrap gap-3">
      {africaCountries
        .filter(c => c.launchStatus === 'MVP')
        .map(c => (
          <Link key={c.slug} to={`/africa/countries/${c.slug}`}
                className="px-4 py-2 rounded-full border border-border
                           hover:border-accent hover:text-accent transition-colors
                           text-sm font-medium text-gray-700 dark:text-gray-300">
            {c.name}
          </Link>
        ))}
    </div>
  </Section>

</AfricaPageLayout>
```

**Remove from AfricaHomePage entirely:**
- The AlertTriangle "Launch with high-engagement safety content first" card
- The left-column description block with three buttons
- The full-card country list (replaced by compact strip above)

---

## Task 2 — Create `PersonaCard` component

**File:** `src/components/africa/PersonaCard.tsx`

This is the most important UI piece in the whole product. It must feel
personally recognisable to an African user. Each card is a mirror —
the user should see themselves in it.

**Design requirements:**
- Each persona has a distinct accent color (not all the same ShieldCheck icon)
- Shows: persona label, 1-line description, top 2 priority risks as small tags
- On hover: subtle lift (translateY -3px), border becomes accent color
- Click: navigates to `/africa/personas/start/:personaSlug`
  (new route — see Task 4) which prompts country selection

**Persona visual identity map — use these colors and icons:**

| Persona slug | Icon | Accent color class |
|---|---|---|
| mobile-money-user | `Smartphone` | `text-green-600` / `bg-green-50` |
| parent-guardian | `Heart` | `text-pink-600` / `bg-pink-50` |
| student | `GraduationCap` | `text-blue-600` / `bg-blue-50` |
| teacher-school-staff | `BookOpen` | `text-indigo-600` / `bg-indigo-50` |
| small-business-owner | `Briefcase` | `text-orange-600` / `bg-orange-50` |
| online-seller | `ShoppingBag` | `text-purple-600` / `bg-purple-50` |
| civil-servant-employee | `Building2` | `text-slate-600` / `bg-slate-50` |

**Component structure:**

```tsx
import { motion } from '../../lib/motion';
import { Link } from 'react-router-dom';
import { Smartphone, Heart, GraduationCap, BookOpen,
         Briefcase, ShoppingBag, Building2 } from 'lucide-react';
import type { AfricaPersona } from '../../data/africa/personas';

const PERSONA_VISUAL: Record<string, {
  Icon: LucideIcon;
  iconBg: string;
  iconColor: string;
  cardBorder: string;
}> = {
  'mobile-money-user': {
    Icon: Smartphone,
    iconBg: 'bg-green-50 dark:bg-green-900/20',
    iconColor: 'text-green-600 dark:text-green-400',
    cardBorder: 'hover:border-green-400',
  },
  'parent-guardian': {
    Icon: Heart,
    iconBg: 'bg-pink-50 dark:bg-pink-900/20',
    iconColor: 'text-pink-600 dark:text-pink-400',
    cardBorder: 'hover:border-pink-400',
  },
  'student': {
    Icon: GraduationCap,
    iconBg: 'bg-blue-50 dark:bg-blue-900/20',
    iconColor: 'text-blue-600 dark:text-blue-400',
    cardBorder: 'hover:border-blue-400',
  },
  'teacher-school-staff': {
    Icon: BookOpen,
    iconBg: 'bg-indigo-50 dark:bg-indigo-900/20',
    iconColor: 'text-indigo-600 dark:text-indigo-400',
    cardBorder: 'hover:border-indigo-400',
  },
  'small-business-owner': {
    Icon: Briefcase,
    iconBg: 'bg-orange-50 dark:bg-orange-900/20',
    iconColor: 'text-orange-600 dark:text-orange-400',
    cardBorder: 'hover:border-orange-400',
  },
  'online-seller': {
    Icon: ShoppingBag,
    iconBg: 'bg-purple-50 dark:bg-purple-900/20',
    iconColor: 'text-purple-600 dark:text-purple-400',
    cardBorder: 'hover:border-purple-400',
  },
  'civil-servant-employee': {
    Icon: Building2,
    iconBg: 'bg-slate-50 dark:bg-slate-800/40',
    iconColor: 'text-slate-600 dark:text-slate-400',
    cardBorder: 'hover:border-slate-400',
  },
};

export default function PersonaCard({ persona }: { persona: AfricaPersona }) {
  const visual = PERSONA_VISUAL[persona.slug] ?? {
    Icon: ShieldCheck,
    iconBg: 'bg-accent/10',
    iconColor: 'text-accent',
    cardBorder: 'hover:border-accent',
  };
  const { Icon, iconBg, iconColor, cardBorder } = visual;

  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <Link
        to={`/africa/personas/start/${persona.slug}`}
        className={`block p-5 rounded-xl border border-border bg-white
                    dark:bg-card transition-all duration-200 h-full
                    ${cardBorder} hover:shadow-md group`}
      >
        <div className={`w-11 h-11 rounded-xl ${iconBg} flex items-center
                          justify-center mb-4`}>
          <Icon className={`h-5 w-5 ${iconColor}`} />
        </div>

        <h3 className="font-bold text-primary dark:text-white text-base mb-1
                       group-hover:text-accent transition-colors">
          {persona.label}
        </h3>

        <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 leading-relaxed">
          {persona.description}
        </p>

        <div className="flex flex-wrap gap-1.5">
          {persona.priorityRisks.slice(0, 2).map((risk) => (
            <span key={risk}
                  className="text-xs px-2 py-0.5 rounded-full
                             bg-gray-100 dark:bg-background-secondary
                             text-gray-600 dark:text-gray-400">
              {risk}
            </span>
          ))}
        </div>

        <div className="mt-4 flex items-center text-xs font-semibold
                        text-accent opacity-0 group-hover:opacity-100
                        transition-opacity">
          Get my plan <ArrowRight className="ml-1 h-3 w-3" />
        </div>
      </Link>
    </motion.div>
  );
}
```

---

## Task 3 — Fix the 4 pillar cards on `AfricaHomePage`

Currently the pillar cards have no links. Each should lead somewhere real.

```
Digital Safety        → /africa/scamshield
Privacy & Data Rights → /africa/countries   (pick your country for rights)
Family & School       → /africa/personas/start/parent-guardian
SME Digital Trust     → /africa/personas/start/small-business-owner
```

Add a footer to each pillar card:
```tsx
<div className="mt-4 pt-4 border-t border-border">
  <Link to={pillar.link}
        className="text-sm font-semibold text-accent hover:underline
                   flex items-center gap-1">
    {pillar.cta} <ArrowRight className="h-3.5 w-3.5" />
  </Link>
</div>
```

---

## Task 4 — Create `AfricaPersonaStartPage.tsx` (country picker step)

**File:** `src/pages/africa/AfricaPersonaStartPage.tsx`
**Route:** `/africa/personas/start/:personaSlug`

This page bridges persona selection → country selection → action center.
It is a focused, single-question screen. Not a full page layout — more like
an onboarding step.

```
┌─────────────────────────────────────────────────────┐
│  [Persona icon]  Mobile Money User                  │
│  "Navigating mobile wallets, USSD, and agent        │
│   networks..."                                      │
│                                                     │
│  ──────────────────────────────────────────────     │
│                                                     │
│  Which country are you in?                          │
│                                                     │
│  [Côte d'Ivoire]  [Ghana]  [Nigeria]               │
│  [Kenya]          [Senegal] [South Africa]          │
│                                                     │
│  + More countries →                                 │
│                                                     │
│  ← Back to profiles                                 │
└─────────────────────────────────────────────────────┘
```

**Logic:**
- If `personaSlug` is invalid → redirect to `/`
- Display only `launchStatus === 'MVP'` countries as clickable cards
- "More countries" links to `/africa/countries` (full list, no persona pre-selected)
- Country card click → navigate to `/africa/action-center/:countrySlug?persona=:personaSlug`

**Implementation:**

```tsx
const AfricaPersonaStartPage: React.FC = () => {
  const { personaSlug } = useParams();
  const persona = getAfricaPersonaBySlug(personaSlug);
  const mvpCountries = africaCountries.filter(c => c.launchStatus === 'MVP');

  if (!persona) return <Navigate to="/" replace />;

  const visual = PERSONA_VISUAL[persona.slug]; // import from PersonaCard or a shared constants file
  const { Icon, iconBg, iconColor } = visual;

  return (
    <AfricaPageLayout
      title={persona.label}
      subtitle="Select your country to continue"
      description={persona.description}
    >
      <Section>
        <div className="max-w-2xl mx-auto">

          {/* Persona confirmation banner */}
          <Card className="p-5 mb-8 flex items-center gap-4">
            <div className={`w-12 h-12 rounded-xl ${iconBg} flex items-center
                              justify-center flex-shrink-0`}>
              <Icon className={`h-6 w-6 ${iconColor}`} />
            </div>
            <div>
              <div className="font-bold text-primary dark:text-white">
                {persona.label}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">
                {persona.description}
              </div>
            </div>
          </Card>

          {/* Country question */}
          <h2 className="text-xl font-bold text-primary dark:text-white mb-4">
            Which country are you in?
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
            {mvpCountries.map((country) => (
              <Link
                key={country.slug}
                to={`/africa/action-center/${country.slug}?persona=${persona.slug}`}
                className="p-4 rounded-xl border border-border hover:border-accent
                           hover:bg-accent/5 transition-all text-center font-semibold
                           text-primary dark:text-white text-sm"
              >
                {country.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center justify-between text-sm">
            <Link to="/" className="text-gray-500 hover:text-primary
                                     dark:text-gray-400 flex items-center gap-1">
              <ArrowLeft className="h-3.5 w-3.5" /> Back to profiles
            </Link>
            <Link to="/africa/countries"
                  className="text-accent hover:underline font-semibold">
              My country isn't listed yet →
            </Link>
          </div>

        </div>
      </Section>
    </AfricaPageLayout>
  );
};
```

**Add route to `App.tsx`:**
```tsx
const AfricaPersonaStartPage = lazy(() => import('./pages/africa/AfricaPersonaStartPage'));
// inside router:
<Route path="/africa/personas/start/:personaSlug" element={
  <Suspense fallback={<LoadingSpinner />}>
    <AfricaPersonaStartPage />
  </Suspense>
} />
```

---

## Task 5 — Update `AfricaPersonasPage` (country-first path, still valid)

The existing `/africa/personas/:countrySlug` page is still the correct path when
a user arrives via a country page. It already shows good persona cards.

Two fixes only:
1. Remove the internal note: "This replaces the generic persona jump with
   Africa-specific user profiles. The next step routes..."
   Replace with: "Select the profile that fits your situation in {country.name}."

2. Replace the single ShieldCheck icon on every card with the persona-specific
   icon from `PERSONA_VISUAL` (extract the map to a shared
   `src/data/africa/personaVisuals.ts` file so both `PersonaCard` and
   `AfricaPersonasPage` use the same source of truth).

---

## Task 6 — Update `africaEditionNav.ts` mobile bottom bar

Now that persona selection is the primary journey, the mobile bottom bar
should reflect it.

```typescript
// REPLACE africaBottomNav with:
export const africaBottomNav: EditionNavItem[] = [
  { path: '/', label: 'Home', icon: Home },
  { path: '/africa/countries', label: 'Countries', icon: MapPin },
  { path: '/africa/scamshield', label: 'Scams', icon: AlertTriangle },
  { path: '/africa/partner', label: 'Partner', icon: HeartHandshake },
];
```

The bottom bar is for the four most-used destinations. Persona selection
happens on the homepage — it does not need a bottom bar slot because
users access it by landing on `/`.

---

## Task 7 — Update `AfricaCountryPage` recommended journey card

The country page currently has a "Recommended user journey" card at the bottom
with three equal-weight buttons. Replace with a single primary action:

```tsx
// REPLACE the three-button card with:
<Card className="p-6 bg-light-blue dark:bg-background-secondary">
  <h2 className="text-xl font-bold text-primary dark:text-white mb-2">
    Ready to get your personal safety plan?
  </h2>
  <p className="text-gray-700 dark:text-gray-300 mb-5 text-sm">
    Start with ScamShield for immediate safety guidance, or choose your
    profile to get a plan tailored to your situation in {country.name}.
  </p>
  <div className="flex flex-wrap gap-3">
    <Link to={`/africa/personas/${country.slug}`}>
      <Button>Choose my profile →</Button>
    </Link>
    <Link to="/africa/scamshield">
      <Button variant="outline">Open ScamShield</Button>
    </Link>
  </div>
</Card>
```

---

## Shared constants file (extract before writing Tasks 2, 5)

**File to create first:** `src/data/africa/personaVisuals.ts`

Extract `PERSONA_VISUAL` map into this file. Import it in both
`PersonaCard.tsx` and `AfricaPersonasPage.tsx`. This ensures both
screens use the same icon and color for each persona.

```typescript
import { Smartphone, Heart, GraduationCap, BookOpen,
         Briefcase, ShoppingBag, Building2, ShieldCheck } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export type PersonaVisual = {
  Icon: LucideIcon;
  iconBg: string;
  iconColor: string;
  cardBorder: string;
};

export const PERSONA_VISUAL: Record<string, PersonaVisual> = {
  'mobile-money-user':      { Icon: Smartphone,      iconBg: 'bg-green-50 dark:bg-green-900/20',   iconColor: 'text-green-600 dark:text-green-400',   cardBorder: 'hover:border-green-400' },
  'parent-guardian':        { Icon: Heart,            iconBg: 'bg-pink-50 dark:bg-pink-900/20',     iconColor: 'text-pink-600 dark:text-pink-400',     cardBorder: 'hover:border-pink-400'  },
  'student':                { Icon: GraduationCap,    iconBg: 'bg-blue-50 dark:bg-blue-900/20',     iconColor: 'text-blue-600 dark:text-blue-400',     cardBorder: 'hover:border-blue-400'  },
  'teacher-school-staff':   { Icon: BookOpen,         iconBg: 'bg-indigo-50 dark:bg-indigo-900/20', iconColor: 'text-indigo-600 dark:text-indigo-400', cardBorder: 'hover:border-indigo-400'},
  'small-business-owner':   { Icon: Briefcase,        iconBg: 'bg-orange-50 dark:bg-orange-900/20', iconColor: 'text-orange-600 dark:text-orange-400', cardBorder: 'hover:border-orange-400'},
  'online-seller':          { Icon: ShoppingBag,      iconBg: 'bg-purple-50 dark:bg-purple-900/20', iconColor: 'text-purple-600 dark:text-purple-400', cardBorder: 'hover:border-purple-400'},
  'civil-servant-employee': { Icon: Building2,        iconBg: 'bg-slate-50 dark:bg-slate-800/40',   iconColor: 'text-slate-600 dark:text-slate-400',   cardBorder: 'hover:border-slate-400' },
};

export const getPersonaVisual = (slug: string): PersonaVisual =>
  PERSONA_VISUAL[slug] ?? {
    Icon: ShieldCheck,
    iconBg: 'bg-accent/10',
    iconColor: 'text-accent',
    cardBorder: 'hover:border-accent',
  };
```

---

## Build order for Claude Code

1. Create `src/data/africa/personaVisuals.ts`
2. Create `src/components/africa/PersonaCard.tsx`
3. Rebuild `src/pages/africa/AfricaHomePage.tsx`
4. Create `src/pages/africa/AfricaPersonaStartPage.tsx`
5. Update `src/pages/africa/AfricaPersonasPage.tsx` (remove note, use shared visuals)
6. Update `src/pages/africa/AfricaCountryPage.tsx` (journey card)
7. Add route in `src/App.tsx`
8. Update `africaEditionNav.ts` bottom bar

---

## What this achieves

**Before:** Homepage → Country list (reference tool) → Country detail → Persona cards → Action Center

**After:** Homepage (WHO are you?) → Country picker (WHERE?) → Action Center (YOUR plan)

The persona is now the entry point. A mobile money user in Nigeria lands on the
homepage, sees "Mobile Money User" as a card that describes exactly their situation,
clicks it, picks Nigeria, and immediately gets an action center showing their
specific risks (PIN/OTP theft, SIM swap, fake reversal SMS) and the correct
Nigerian reporting channels (NITDA, CBN fraud desk). That is a product that
has value on first use — no account, no assessment, no onboarding flow.

