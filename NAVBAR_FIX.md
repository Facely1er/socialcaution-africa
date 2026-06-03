# SocialCaution Africa — Navbar Fix
## File: `src/config/africaEditionNav.ts`

---

## Current problems

**Desktop primary nav (3 items):**
`Countries` · `ScamShield` · `Partner` (highlighted)

No issue with the items themselves. The problem is the **More dropdown**:
`Sources` · `Assessment` · `Roadmap` · `About` · `Contact` · `Intl. laws`

- `Assessment` → `/assessment` — generic Western-market questions, no African platform
  context. Labelled just "Assessment" with no qualifier. A user who clicks it lands
  on a flow that asks about Equifax, US credit bureaus, and CCPA rights. Wrong audience,
  wrong content, wrong trust signal at this stage.
- `Roadmap` → `/africa/roadmap` which renders `PrivacyRoadmapPage` — a generic
  4-phase privacy roadmap with no Africa-specific tasks. The route alias makes it look
  Africa-specific but the content is not.
- `About` → `/about` — still the generic "Our mission is to empower individuals..."
  page with no ERMITS, no Africa, no institutional context (not yet adapted per Session 2
  of the cleanup plan).

**Mobile drawer (Explore section):**
Pulls from `uniqueNavByPath([Home, ...africaHeaderNav, ...africaHeaderMore])` which
means it shows every item including Assessment, Roadmap, About in the same flat
"Explore" list — no distinction between core Africa journeys and secondary tools.

**Footer (Reference column):**
`International privacy laws` · `Privacy assessment (beta)`

The `(beta)` qualifier on Assessment in the footer is honest — but it contradicts
the unlabelled "Assessment" in the desktop More dropdown. Same destination, two
different labels, inconsistent trust signal.

**Footer legal line:**
> "Africa Edition prototype — verify country sources before official use."

"Prototype" is appropriate for internal review but should not appear in a
partner-facing or public deployment. Replace before launch.

**`Account` button (desktop header right):**
Shows a `User` icon and "Account" label that opens an `AuthModal`. Auth/accounts
are a dashboard feature that is hidden at launch per the cleanup plan. Showing
an Account button in the navbar while the dashboard is inaccessible creates a
dead-end flow — a user who signs in has nowhere to go.

---

## Fixes — all in `src/config/africaEditionNav.ts`

### 1. Remove `Assessment` and `Roadmap` from the More dropdown

These are not ready for Africa users. Remove them now. Add them back when
the assessment questions include African platforms and laws.

```typescript
// CURRENT africaHeaderMore:
export const africaHeaderMore: EditionNavItem[] = [
  { path: '/africa/sources', label: 'Sources', icon: Landmark },
  { path: '/assessment', label: 'Assessment', icon: ShieldCheck },      // REMOVE
  { path: '/africa/roadmap', label: 'Roadmap', icon: Map },             // REMOVE
  { path: '/about', label: 'About', icon: Info },
  { path: '/contact', label: 'Contact', icon: Mail },
  { path: '/privacy-laws', label: 'Intl. laws', icon: Scale },
];

// REPLACE WITH:
export const africaHeaderMore: EditionNavItem[] = [
  { path: '/africa/sources', label: 'Source register', icon: Landmark },
  { path: '/about', label: 'About ERMITS', icon: Info },
  { path: '/contact', label: 'Contact', icon: Mail },
  { path: '/privacy-laws', label: 'Intl. laws (reference)', icon: Scale },
];
```

### 2. Remove `Assessment` and `Roadmap` from the footer Reference column

```typescript
// CURRENT africaFooterGroups Reference section:
{
  title: 'Reference',
  items: [
    { path: '/privacy-laws', label: 'International privacy laws', icon: Scale },
    { path: '/assessment', label: 'Privacy assessment (beta)', icon: ShieldCheck }, // REMOVE
  ],
},

// REPLACE WITH:
{
  title: 'Reference',
  items: [
    { path: '/privacy-laws', label: 'International privacy laws', icon: Scale },
  ],
},
```

### 3. Remove `Roadmap` from the footer Explore column

```typescript
// CURRENT africaFooterGroups Explore section:
{
  title: 'Explore',
  items: [
    { path: '/africa/countries', label: 'Country profiles', icon: MapPin },
    { path: '/africa/scamshield', label: 'ScamShield Africa', icon: AlertTriangle },
    { path: '/africa/sources', label: 'Source register', icon: Landmark },
    { path: '/africa/partner', label: 'Partner With Us', icon: HeartHandshake },
    { path: '/africa/roadmap', label: 'Privacy roadmap', icon: Map },              // REMOVE
  ],
},
```

Also remove the `Map` import from lucide-react at the top of the file — it will
be unused after removing Roadmap from all three nav structures.

### 4. Fix the footer legal line

```typescript
// In Footer.tsx, replace:
"Africa Edition prototype — verify country sources before official use."

// With:
"Country data is regularly reviewed. Verify authoritative sources before
formal or legal use. By ERMITS Advisory LLC."
```

---

## Fix in `src/components/layout/HeaderAuthActions.tsx`

### 5. Hide the Account button at launch

The Auth/Account button shows on desktop but the dashboard is not accessible
to Africa Edition users at launch. Two options:

**Option A — Hide it entirely (simplest):**
```tsx
// Wrap the entire auth section in a feature flag:
const SHOW_AUTH = false; // flip to true when dashboard is ready for Africa users

export default function HeaderAuthActions() {
  if (!SHOW_AUTH) return null;
  // ... existing code
}
```

**Option B — Replace with a Partner CTA (more useful):**
Replace the Account button with a small "Partner" link for desktop, since
`/africa/partner` is the primary institutional CTA and having it in both the
primary nav and the header right reinforces it without overcrowding the nav.

```tsx
import { Link } from 'react-router-dom';
import { HeartHandshake } from 'lucide-react';

export default function HeaderAuthActions() {
  return (
    <div className="header-auth hidden lg:flex">
      <Link to="/africa/partner" className="header-auth-btn">
        <HeartHandshake className="header-auth-btn__icon" aria-hidden />
        <span className="header-auth-btn__label">Partner</span>
      </Link>
    </div>
  );
}
```

**Recommendation: Option A for launch.** Clean slate. The Partner link
is already in the primary nav as a highlighted item — duplicating it
in the header right adds visual noise, not clarity.

---

## Result after these fixes

**Desktop nav:**
`Countries` · `ScamShield` · `Partner [highlighted]` · `More ▾`

**More dropdown:**
`Source register` · `About ERMITS` · `Contact` · `Intl. laws (reference)`

**Mobile drawer Explore section:**
`Home` · `Countries` · `ScamShield` · `Partner` · `Source register` ·
`About ERMITS` · `Contact` · `Intl. laws (reference)`

**Mobile bottom bar** (unchanged — already clean):
`Home` · `Countries` · `Scams` · `Assess`

Wait — the mobile bottom bar still has `Assess` → `/assessment`.
Apply the same fix:

### 6. Replace `Assess` in mobile bottom bar

```typescript
// CURRENT africaBottomNav:
export const africaBottomNav: EditionNavItem[] = [
  { path: '/', label: 'Home', icon: Home },
  { path: '/africa/countries', label: 'Countries', icon: MapPin },
  { path: '/africa/scamshield', label: 'Scams', icon: AlertTriangle },
  { path: '/assessment', label: 'Assess', icon: ClipboardList },        // REPLACE
];

// REPLACE WITH:
export const africaBottomNav: EditionNavItem[] = [
  { path: '/', label: 'Home', icon: Home },
  { path: '/africa/countries', label: 'Countries', icon: MapPin },
  { path: '/africa/scamshield', label: 'Scams', icon: AlertTriangle },
  { path: '/africa/partner', label: 'Partner', icon: HeartHandshake },
];
```

Remove `ClipboardList` from the import block; add `HeartHandshake` if not
already imported (it already is — used by africaHeaderNav).

---

## Summary — all changes in two files

### `src/config/africaEditionNav.ts`

| Change | Location | Action |
|--------|----------|--------|
| Remove Assessment | `africaHeaderMore` | Delete entry |
| Remove Roadmap | `africaHeaderMore` | Delete entry |
| Rename Sources | `africaHeaderMore` | "Sources" → "Source register" |
| Rename About | `africaHeaderMore` | "About" → "About ERMITS" |
| Remove Assessment | `africaFooterGroups` Reference | Delete entry |
| Remove Roadmap | `africaFooterGroups` Explore | Delete entry |
| Replace Assess | `africaBottomNav` | `/assessment` → `/africa/partner` |
| Remove unused imports | top of file | `Map`, `ClipboardList` |

### `src/components/layout/HeaderAuthActions.tsx`

| Change | Action |
|--------|--------|
| Hide Account button at launch | Add `if (!SHOW_AUTH) return null;` guard |

### `src/components/layout/Footer.tsx`

| Change | Action |
|--------|--------|
| Footer legal line | Replace "prototype" language |

