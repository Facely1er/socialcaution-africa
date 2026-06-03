# SocialCaution Africa — Content Cleanup Plan
## What to remove, what to adapt, what to keep

---

## Decision framework

Three questions for each piece of content:

1. **Does an African user encounter it?** (reachable from nav, CTA, or direct URL)
2. **Is the content relevant to their context?** (African laws, platforms, risks)
3. **Does it contradict or dilute the Africa Edition positioning?**

**Verdict categories:**
- **DELETE** — remove file and route entirely
- **HIDE** — keep file, remove from routing and nav (preserves history, not reachable)
- **ADAPT** — Africa content exists or can be added; worth keeping with changes
- **KEEP** — already Africa-relevant, no changes needed

---

## PAGES — Full inventory

### Africa core module (all KEEP)

| Page | Route | Verdict | Notes |
|------|-------|---------|-------|
| AfricaHomePage | `/` | KEEP + fix | Remove internal note card (see diagnosis) |
| AfricaCountriesPage | `/africa/countries` | KEEP | Solid |
| AfricaCountryPage | `/africa/countries/:slug` | KEEP | Best page in repo |
| ScamShieldAfricaPage | `/africa/scamshield` | KEEP | High-value |
| AfricaPersonasPage | `/africa/personas/:slug` | KEEP + fix | Remove internal note copy |
| AfricaActionCenterPage | `/africa/action-center/:slug` | KEEP | Core journey end |
| AfricaSourcesPage | `/africa/sources` | KEEP | Reference value |
| AfricaPartnerPage | `/africa/partner` | KEEP | Correct, clean |

---

### Blog — 8 posts, 0 Africa mentions — all DELETE

Every blog post was written for a Western-market B2C audience. Zero mentions of
Africa, African laws, mobile money, local platforms, or regional regulators.
They are not linked from the Africa nav but are reachable via direct URL and
appear in `sitemap.xml`.

| File | Route | Content | Verdict |
|------|-------|---------|---------|
| PrivacyImportanceBlogPost | `/blog/privacy-importance` | Generic Western framing | DELETE |
| DataProtectionLawsBlogPost | `/blog/data-protection-laws-2024` | GDPR, CCPA, CPRA, Brazil — no Africa | DELETE |
| PrivacyToolsSocialMediaBlogPost | `/blog/privacy-tools-social-media` | Generic tools — Brave, DuckDuckGo, etc. | DELETE |
| ChildrenPrivacyProtectionBlogPost | `/blog/children-privacy-protection` | Generic parental controls — no Africa context | DELETE |
| HiddenCostFreeBlogPost | `/blog/hidden-cost-free-services` | Generic data economy framing | DELETE |
| PrivacyBrowsersComparisonBlogPost | `/blog/privacy-browsers-comparison` | Browser comparison — irrelevant for mobile-first Africa audience | DELETE |
| PrivacyLawsBlogPost | `/blog/privacy-laws-2025` | GDPR, CCPA, UK GDPR, India, Brazil — no POPIA, NDPR, ECOWAS | DELETE |
| WorkplacePrivacyBlogPost | `/blog/workplace-privacy` | GDPR/CCPA employee rights — no African labour/data law context | DELETE |
| BlogPage | `/blog` | Index page for deleted posts | DELETE |

**What to do instead:** The AfricaSourcesPage and AfricaCountryPage cover
regulatory reference content better than these blog posts do. No replacement
needed at launch. Africa-specific articles (mobile money fraud, POPIA explained,
ARTCI complaint guide) can be added in a future sprint as actual Africa content.

---

### Legal — split verdict

| File | Route | Content | Verdict |
|------|-------|---------|---------|
| PrivacyLawsPage | `/privacy-laws` | Linked from "More" nav as "Intl. laws (reference)" — EU/US/global | KEEP as reference only — add Africa disclaimer banner |
| GDPRPage | `/privacy-laws/gdpr` | EU regulation detail — not applicable to Africa users | HIDE — not linked from Africa nav, keep for `/global` users |
| USPrivacyPage | `/privacy-laws/us-privacy` | US state laws — no Africa relevance | HIDE |
| GlobalPrivacyActPage | `/privacy-laws/global-privacy-act` | Aspirational global framework — low value | HIDE |
| EnforcementPage | `/privacy-laws/enforcement` | Global enforcement — marginal Africa relevance | HIDE |
| PrivacyPolicyPage | `/privacy` | References "United States / EU", GDPR, CCPA, California residents | ADAPT — add Africa section covering applicable laws for African users |
| TermsPage | `/terms` | Generic, jurisdiction-neutral | KEEP — acceptable as-is |
| CookiePolicyPage | `/cookies` | Standard | KEEP |
| AcceptableUsePolicyPage | `/acceptable-use` | Standard | KEEP |

**PrivacyPolicyPage adaptation needed:** The policy currently lists
"United States / EU" as the governing jurisdiction and has sections for EU/UK/Swiss
GDPR rights and California CCPA rights — but no section for African users.
Add a section: "Additional rights for users in Africa" covering POPIA, NDPR,
and ECOWAS framework rights, and update the jurisdiction reference to include Africa.

---

### Marketing / product pages — all DELETE or HIDE

| File | Route | Content | Verdict |
|------|-------|---------|---------|
| FeaturesPage | `/features` | Generic SaaS features list — no Africa context | DELETE — legacy redirects point here but the page itself adds nothing |
| PricingPage | `/pricing` | USD subscription tiers ($9.99/mo, $19.99/mo) — wrong currency, wrong model for Africa Edition (free access + government licensing) | DELETE |
| HowItWorksPage | `/how-it-works` | Generic 3-step explainer — no Africa context, no country/persona flow | DELETE |
| AboutPage | `/about` | "Our mission is to empower individuals to take control of their digital privacy" — no ERMITS, no Africa, no institutional context | ADAPT — rewrite as Africa Edition About page with ERMITS, ESATIC, mission |
| ContactPage | `/contact` | Generic form, no ERMITS branding, no Africa context | ADAPT — add ERMITS Advisory contact details and partnership inquiry context |
| HomePage | `/global` | Original Western-market homepage — contradicts Africa Edition | HIDE — remove from nav entirely; keep route so deep links don't 404 |

---

### Persona pages (continental) — HIDE

These are the original 6 persona pages (`/personas/*`). The Africa Edition
has its own persona flow at `/africa/personas/:countrySlug`. The original pages
contain zero Africa-specific content.

| File | Route | Verdict |
|------|-------|---------|
| CautiousParentPage | `/personas/cautious-parent` | HIDE — replaced by Africa persona flow |
| PrivateIndividualPage | `/personas/private-individual` | HIDE |
| OnlineShopperPage | `/personas/online-shopper` | HIDE |
| SocialInfluencerPage | `/personas/social-influencer` | HIDE |
| PrivacyAdvocatePage | `/personas/privacy-advocate` | HIDE |
| EmployeePersonaPage | `/personas/concerned-employee` | HIDE |
| PersonaSelectionPage | `/personas` | HIDE — redirects to `/africa/countries` already; the page itself is dead code |
| PersonaSelection | `/persona-selection` | HIDE — MVP version, not used |
| PersonaSelectionEnhanced | (unrouted) | DELETE — not routed, duplicate |
| PersonasPage | (check routing) | HIDE |

---

### Journey / roadmap / action pages — split verdict

| File | Route | Content | Verdict |
|------|-------|---------|---------|
| PrivacyRoadmapPage | `/privacy-journey` (redirects here) | Has the Africa regulatory banner now; roadmap steps are generic | ADAPT — roadmap tasks reference generic "privacy practices"; add Africa-specific task variants (mobile money PIN hygiene, SIM registration review, ARTCI complaint walkthrough) |
| ThirtyDayRoadmapPage | `/30-day-roadmap` | 30-day daily task challenge — all generic Western tasks | HIDE — no Africa tasks; not worth adapting at MVP |
| PrivacyJourneyPage | `/privacy-journey` | Route for the roadmap flow | KEEP if PrivacyRoadmapPage is kept |
| PrivacyActionCenterPage | `/privacy-action-center` | "Comprehensive Privacy Protection Platform" / "real-time insights" — protection language, no Africa context | HIDE — the Africa edition has `/africa/action-center/:slug` which supersedes this |
| PrivacyFocusPage | `/privacy-focus` | Not audited in depth | HIDE pending audit |

---

### Assessment — KEEP with adaptation note

| File | Route | Verdict |
|------|-------|---------|
| AssessmentPage | `/assessment` | KEEP — functional; needs Africa context in questions |
| ExposureAssessmentPage | `/assessment/exposure` | KEEP — needs Africa platforms in service list |
| PrivacyRightsAssessmentPage | `/assessment/rights` | KEEP — needs African law references in questions |
| SecurityAssessmentPage | `/assessment/security` | KEEP |
| AssessmentResultsPage | `/assessment/results` | KEEP |

Assessment adaptation is a future sprint. At launch, mark it as "Beta" and note
that questions are being localized for African platforms.

---

### Dashboard — HIDE at launch

| File | Route | Verdict |
|------|-------|---------|
| DashboardPage + all sub-pages | `/dashboard/*` | HIDE at launch — over-featured for Africa MVP, disconnected from Africa journey, requires auth that hasn't been validated for Africa users |

---

### A/B test pages — DELETE

| File | Route | Verdict |
|------|-------|---------|
| VariantRouter | `/parent` | DELETE — parent journey A/B test; unrelated to Africa |
| VariantALandingPage | (sub) | DELETE |
| VariantBLandingPage | (sub) | DELETE |
| OnboardingWizard | `/parent/onboarding` | DELETE |
| ParentDashboardPage | `/parent/dashboard` | DELETE |

---

### Misc orphaned pages — HIDE or DELETE

| File | Route | Verdict |
|------|-------|---------|
| CautionFeed | `/cautions` | HIDE — MVP feed page, not connected to Africa journey |
| SimpleDashboard | `/simple-dashboard` | HIDE — MVP dashboard, not connected |
| ToolkitPage | `/toolkit` | HIDE — legacy toolkit, redirects from `/toolkit` already go to `/africa/scamshield` |
| ResourcesPage + sub-pages | `/resources/*` | HIDE — generic Western resources; no Africa content |
| TestAssessmentPage | `/test-assessment` | DELETE — dev/test page |
| HelpCenterPage | `/help` | ADAPT or HIDE — useful concept but generic |
| ActionPlanTutorial | `/help/action-plan` | HIDE |
| GettingStartedGuide | `/help/getting-started` | HIDE |
| PrivacyRiskTeaser | (component) | Not a page |
| PersonalDataInventoryPage | (check routing) | HIDE |

---

## Summary counts

| Verdict | Count |
|---------|-------|
| KEEP (no changes) | 8 |
| KEEP + minor fix | 3 |
| ADAPT (Africa content needed) | 5 |
| HIDE (keep file, remove from routing) | 22 |
| DELETE (remove file and route) | 14 |

---

## Implementation order for Claude Code

Do these in order. Each is a single-session scope.

### Session 1 — Immediate (unblocks partner review)

1. Remove the two internal-note cards from `AfricaHomePage` and `AfricaPersonasPage`
2. Delete or comment out all 8 blog routes and `BlogPage` from `App.tsx`
3. Remove `/global` link from `africaEditionNav.ts` "More" dropdown
4. Remove PricingPage route and the legacy `/pricing → /africa` redirect (replace
   with Navigate directly so the page never renders)
5. Delete A/B test routes (`/parent`, `/parent/onboarding`, `/parent/dashboard`)
   from `App.tsx`
6. Remove `/30-day-roadmap`, `/privacy-action-center`, `/toolkit`,
   `/simple-dashboard`, `/cautions`, `/test-assessment` from `App.tsx`
7. Update `sitemap.xml` — remove all deleted/hidden routes; add `/africa/partner`

**Result:** The repo no longer exposes confusing, contradictory, or
embarrassing content to real users or partner reviewers.

### Session 2 — Before first users

1. Adapt `AboutPage` — rewrite as Africa Edition About with ERMITS, ESATIC,
   Facely Kande credentials, and Africa mission
2. Adapt `ContactPage` — add ERMITS Advisory contact details and partnership
   inquiry framing
3. Add Africa user rights section to `PrivacyPolicyPage`
4. Hide (but don't delete) all 6 original persona pages and `PersonaSelectionPage`
   — they may be useful for the global platform later

### Session 3 — First sprint post-launch

1. Adapt assessment questions for African platforms and laws
2. Add Africa-specific tasks to `PrivacyRoadmapPage`
3. Consider whether Dashboard is worth enabling with Africa context

---

## Routes to keep in `sitemap.xml` after cleanup

```
/ (homepage)
/africa/countries
/africa/countries/cote-divoire
/africa/countries/senegal
/africa/countries/nigeria
/africa/countries/kenya
/africa/countries/ghana
/africa/countries/south-africa
/africa/scamshield
/africa/sources
/africa/partner
/assessment
/about
/contact
/privacy-laws (with disclaimer banner)
/privacy
/terms
/cookies
```

Remove everything else from `sitemap.xml`.

