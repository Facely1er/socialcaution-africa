# SocialCaution Africa — Consistency Audit & Fix Handoff
## Repo: `Facely1er/socialcaution-africa`
## Status: Africa infrastructure built; several files not updated

---

## What was done well (do not touch)

- `src/config/site.ts` — correctly set: `SITE_NAME = 'SocialCaution Africa'`, correct description, correct URL
- `src/components/layout/Footer.tsx` — "Africa Edition" sub-brand, Africa nav column, correct tagline
- `src/components/layout/Navbar.tsx` — "Africa Edition" tagline in header brand, Africa nav items wired
- `src/App.tsx` — `/` correctly routes to `AfricaHomePage`, all Africa sub-routes wired
- `src/pages/africa/` — full Africa module built: `AfricaHomePage`, `AfricaCountriesPage`, `AfricaCountryPage`, `ScamShieldAfricaPage`, `AfricaPersonasPage`, `AfricaActionCenterPage`, `AfricaSourcesPage`
- `src/data/africa/countries.ts` — country data with real laws, authorities, URLs
- `src/data/africa/personas.ts` — Africa-specific persona slugs (mobile-money-user, parent-guardian, student, etc.)

---

## What was NOT done — fix list

---

### FIX 1 — `src/components/home/Hero.tsx`
**Problem:** Hero headline/copy is completely unchanged from the continental template.
Visitors land on "Stop Data Theft / Take Back Control / Your data is being sold."
This contradicts the Africa Edition positioning entirely.

**File:** `src/components/home/Hero.tsx`

**Changes required:**

1. Replace headline `<span>` blocks:
```tsx
// REMOVE:
<span className="block mb-2">Stop Data Theft</span>
<span className="block">Take Back Control</span>

// REPLACE WITH:
<span className="block mb-2">Building Digital Trust</span>
<span className="block">Across Africa</span>
```

2. Replace the "Your data is being sold" row text:
```tsx
// REMOVE:
<span className="text-center">Your data is being sold</span>

// REPLACE WITH:
<span className="text-center">Privacy awareness, cyber hygiene, and digital citizenship</span>
```

3. Replace the "Choose your profile" row text:
```tsx
// REMOVE:
<span className="text-center">Choose your profile — get a tailored privacy journey</span>

// REPLACE WITH:
<span className="text-center">Choose your profile — get a journey built for African digital life</span>
```

4. Replace the third trust pill (KeyRound icon):
```tsx
// REMOVE:
<KeyRound className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
<span>No data storage</span>

// REPLACE WITH (import Globe from lucide-react if not already imported):
<Globe className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
<span>African context</span>
```
Remove `KeyRound` from the import line, add `Globe` if absent.

5. Replace floating decorative pills (desktop only):
```tsx
// "Your Persona" pill — no change needed
// "Know Your Rights" → "African Laws"  
// "Protect Data" → "Your Journey"
```

---

### FIX 2 — `src/core/providers/PersonaProvider.tsx`
**Problem:** All 6 persona `title` and `description` strings are unchanged generic copy
from the original continental repo. They make no reference to African digital life.

**File:** `src/core/providers/PersonaProvider.tsx`

Update only `title` and `description` in each `personaConfigs` entry. Do NOT change
`primaryColor`, `secondaryColor`, `icon`, any `path`, `dashboard.widgets`,
`onboarding.steps`, or assessment `id`/`estimatedTime`/`priority` values.

```
CAUTIOUS_PARENT
  title: 'Cautious Parent'  ← keep
  description: 'Navigating connected family life across Africa — managing children\'s exposure to social media, mobile money apps, and the online platforms they use daily.'

PRIVACY_ADVOCATE
  title: 'Privacy Advocate'  ← keep
  description: 'Advanced understanding of digital rights and African data protection laws — equipped to assess your own exposure and support others in your community.'

ONLINE_SHOPPER
  title: 'Online Shopper'  ← keep
  description: 'Navigating African e-commerce platforms (Jumia, Jiji, local marketplaces) and mobile payment services with awareness of how they handle your data.'

SOCIAL_INFLUENCER
  title: 'Content Creator'  ← update
  description: 'Building an audience across African and global platforms while managing personal data exposure, account security, and the risks that come with visibility.'

PRIVATE_INDIVIDUAL  (check the actual enum key name in personaTypes.ts)
  title: 'Private Citizen'  ← update
  description: 'Managing personal data across social media, e-government services, and mobile banking — with limited visibility into what is collected and by whom.'

CONCERNED_EMPLOYEE
  title: 'SME Owner / Employee'  ← update
  description: 'Handling customer data, mobile payments, and device hygiene in a small or informal business — the most common digital work context across Africa.'
```

Also update assessment descriptions for each persona to reflect African context:

```
CAUTIOUS_PARENT assessments:
  'family-privacy-checkup' description:
    'Review your family\'s digital safety — covering children\'s app permissions, 
     social media exposure, and mobile money hygiene in an African household context.'
  'parental-controls-audit' description:
    'Check and strengthen the settings controlling what your children can access 
     and share on devices and platforms commonly used across Africa.'

ONLINE_SHOPPER assessments:
  description: 'Review your data exposure across African e-commerce platforms 
    and mobile payment services — what they collect, store, and share.'

PRIVACY_ADVOCATE assessments:
  description: 'A thorough review of your digital privacy posture, your rights 
    under applicable African data protection laws, and how to exercise them.'
```

---

### FIX 3 — `src/pages/PersonaSelectionPage.tsx`
**Problem:** Page header description and "Why Choose a Privacy Profile?" benefit card
text is generic; no African context.

**File:** `src/pages/PersonaSelectionPage.tsx`

1. Update `<PageLayout>` `description` prop:
```tsx
// REMOVE:
"Everyone's privacy needs are different. Select the profile that best matches 
your situation to get personalized recommendations and guidance tailored to 
your specific needs and concerns."

// REPLACE WITH:
"Privacy needs differ across African digital life — whether you manage a family, 
run a small business, use mobile money daily, or navigate e-government services. 
Select the profile that fits your situation."
```

2. Update the "Why Choose a Privacy Profile?" `<h2>`:
No change needed — title is fine.

3. Update three benefit card body texts:
```
Personalized Recommendations:
  "Get privacy guidance relevant to your situation and the platforms, services, 
   and laws that apply to your country."

Save Time:
  "Focus on what matters for your context — family safety, mobile money hygiene, 
   small business data handling, or digital rights."

Relevant Learning:
  "Learn privacy rights and practices that apply to African digital life — 
   not generic advice written for different markets."
```

---

### FIX 4 — `src/components/home/FactsAndFigures.tsx`
**Problem:** All four stats are global/Western-market figures ($10.5T cybercrime cost,
$4.88M average breach, IBM report, Gartner). These are not wrong but are entirely
disconnected from the African audience. Replace with Africa-relevant framing.

**File:** `src/components/home/FactsAndFigures.tsx`

Replace the `stats` array:

```tsx
const stats = [
  {
    value: '54',
    label: 'Nations, One Platform',
    description: 'SocialCaution Africa is designed for use across all 54 African nations, with country-specific legal and regulatory content.',
    source: 'ERMITS Advisory',
    icon: Globe,
    color: 'bg-accent/10 text-accent'
  },
  {
    value: '43%',
    label: 'Mobile-Only Internet',
    description: 'An estimated 43% of African internet users access the web exclusively via mobile — making mobile-first design a privacy necessity, not a preference.',
    source: 'GSMA Mobile Economy Africa 2023',
    icon: Smartphone,
    color: 'bg-warning/10 text-warning'
  },
  {
    value: '38',
    label: 'African Data Protection Laws',
    description: 'As of 2024, 38 African countries have enacted or are developing national data protection legislation — rights most citizens are unaware of.',
    source: 'AU Data Policy Framework 2022',
    icon: Scale,
    color: 'bg-danger/10 text-danger'
  },
  {
    value: '$530M+',
    label: 'African Fintech Fraud Losses',
    description: 'Annual financial losses from mobile money fraud, SIM swap attacks, and digital scams affecting African users and small businesses.',
    source: 'Interpol Africa Cyberthreat Assessment 2023',
    icon: AlertTriangle,
    color: 'bg-success/10 text-success'
  }
];
```

Add `Smartphone` to the lucide-react import. Replace `DollarSign` and `Users` imports
with `Globe` and `Smartphone` if not already present.

Update section title and subtitle:
```tsx
title="Digital Privacy in Africa — The Real Picture"

subtitle={
  <div className="space-y-3 max-w-3xl mx-auto">
    <p className="text-xl text-accent font-semibold">Why this matters here</p>
    <p className="text-gray-600 dark:text-gray-300">
      African digital life has distinct risks, contexts, and rights. These are the numbers that shape this platform.
    </p>
  </div>
}
```

**Add mandatory disclaimer below the stats grid:**
```tsx
<p className="text-center text-xs text-text-secondary dark:text-gray-400 mt-8 max-w-2xl mx-auto">
  Statistics are sourced from publicly available reports. Figures should be verified 
  against current official sources before citation in formal documents.
</p>
```

---

### FIX 5 — `src/pages/PrivacyRoadmapPage.tsx`
**Problem:** No Africa regulatory context banner — the roadmap is entirely generic.

**File:** `src/pages/PrivacyRoadmapPage.tsx`

Add this banner inside the first `<Section>`, before the roadmap phases render.
Import `Globe` and `Card` if not already imported.

```tsx
<Card className="p-4 mb-8 bg-accent/5 border border-accent/20">
  <div className="flex items-start gap-3">
    <Globe className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
    <div>
      <p className="font-semibold text-text dark:text-white text-sm mb-1">
        African regulatory context
      </p>
      <p className="text-sm text-text-secondary dark:text-gray-300">
        Your privacy roadmap references applicable frameworks including the ECOWAS 
        Supplementary Act on Personal Data, the AU Malabo Convention, and national 
        data protection laws in your country. Assessments cover platforms and services 
        common across Africa.
      </p>
    </div>
  </div>
</Card>
```

---

### FIX 6 — `src/pages/africa/AfricaHomePage.tsx`
**Problem:** The hero subtitle says "Help Africans stay safe, informed, and empowered
online." — passive and vague. Replace with the mission statement.

**File:** `src/pages/africa/AfricaHomePage.tsx`

Update `<AfricaPageLayout>` props:
```tsx
// REMOVE:
subtitle="Help Africans stay safe, informed, and empowered online."
description="Digital trust and safety for the region — scam prevention, privacy rights, family protection, and SME practices across African countries."

// REPLACE WITH:
subtitle="Building digital trust across Africa."
description="Privacy awareness, cyber hygiene, and responsible digital citizenship for citizens, families, schools, and small businesses — tailored to African digital realities."
```

---

### FIX 7 — `src/pages/africa/` — Add `AfricaPartnerPage.tsx` (missing)
**Problem:** No partnership/institutional page exists. This is the government and
NGO entry point for national licensing.

**File to create:** `src/pages/africa/AfricaPartnerPage.tsx`

Use `AfricaPageLayout`, `Section`, `Card`, `Button` from the existing library.
Import `motion` from `../../lib/motion`.

**Page structure:**
```
<AfricaPageLayout title="National Partnership" description="...">

  Section 1 — "Build digital trust infrastructure for your nation"
    Subtext: Three partnership tiers available — from co-branded awareness
    programs to full national white-label deployments.

  Section 2 — Three tier cards (use existing Card component):
    Tier I — Awareness Partner
      For: NGOs, universities, telecom CSR, regional bodies
      Benefits: co-branded page, up to 3 languages, annual campaign kit,
      aggregate reach reporting, 16h/year ERMITS Advisory support
      CTA: "Inquire About Tier I" → /contact

    Tier II — National Edition  [apply ring-2 ring-accent highlight]
      For: Government ministries, regulatory authorities, national digital agencies
      Benefits: full white-label, local hosting option (data sovereignty),
      all platform modules, national dashboard, regulator API integration,
      dedicated vCISO support, Annual Digital Trust Report
      CTA: "Request National Edition Briefing" → /contact

    Tier III — AU / ECOWAS Edition
      For: AU bodies, ECOWAS Secretariat, development banks, pan-African institutions
      Benefits: multi-nation coordination, AU Malabo alignment, continental
      benchmarking, policy brief outputs, Annual Africa Privacy Report co-authorship
      CTA: "Discuss Continental Partnership" → /contact

  Section 3 — Six regional editions (Card per country, ISO code as styled span):
    ISO code styled as:
      <span className="font-mono text-xs font-bold bg-primary/20 
                        text-white px-2 py-0.5 rounded">CI</span>
    
    CI — Côte d'Ivoire
      Authority: ARTCI / ANSSI-CI
      Institutional partner: ESATIC (ITU Centre of Excellence)
    SN — Senegal
      Authority: Commission des Données Personnelles (CDP)
    NG — Nigeria
      Authority: NITDA / Nigeria Data Protection Bureau (NDPR)
    KE — Kenya + East Africa
      Authority: Office of the Data Protection Commissioner (ODPC)
    MA — North Africa
      Authority: CNDP Morocco / INPDP Tunisia
    ZA — Southern Africa
      Authority: South Africa Information Regulator (POPIA)

  Section 4 — Contact CTA
    "Interested in a national deployment or institutional partnership?
     Contact ERMITS Advisory to request a briefing."
    Button: "Request a Briefing" variant="primary" → /contact

</AfricaPageLayout>
```

**Then add route in `App.tsx`:**
```tsx
const AfricaPartnerPage = lazy(() => import('./pages/africa/AfricaPartnerPage'));
// inside router:
<Route path="/africa/partner" element={
  <Suspense fallback={<LoadingSpinner />}>
    <AfricaPartnerPage />
  </Suspense>
} />
```

**Then add nav link in `Navbar.tsx`** to the Africa nav group:
```tsx
{ path: '/africa/partner', label: 'Partner With Us', icon: Handshake, highlight: true }
```
Import `Handshake` from lucide-react.

---

## Summary — files to change

| File | Status | Change type |
|------|--------|-------------|
| `src/components/home/Hero.tsx` | NOT DONE | Edit — 5 string replacements |
| `src/core/providers/PersonaProvider.tsx` | NOT DONE | Edit — 6 descriptions + assessment descriptions |
| `src/pages/PersonaSelectionPage.tsx` | NOT DONE | Edit — 4 strings |
| `src/components/home/FactsAndFigures.tsx` | NOT DONE | Edit — stats array + section text + disclaimer |
| `src/pages/PrivacyRoadmapPage.tsx` | NOT DONE | Edit — add banner |
| `src/pages/africa/AfricaHomePage.tsx` | PARTIAL | Edit — 2 prop strings |
| `src/pages/africa/AfricaPartnerPage.tsx` | MISSING | Create new |
| `src/App.tsx` | PARTIAL | Add 1 route |
| `src/components/layout/Navbar.tsx` | PARTIAL | Add 1 nav link |

---

## Language rules — enforced throughout

| Avoid | Use instead |
|-------|-------------|
| "protect your data" / "protect yourself" | "review", "assess", "reduce your exposure" |
| "detect threats" | "flag potential concerns", "check for red flags" |
| "ensures your privacy" | "designed with privacy as a default" |
| "digital natives" | "young people who have grown up with technology" |
| "500 million Africans" | "a large and growing share of Africans" |
| "AI-powered" for any SocialCaution tool | remove entirely |
| Any unverifiable superlative | remove or qualify with source |
| Stats without sources | always add source attribution or remove |

