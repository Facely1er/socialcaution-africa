import type { LucideIcon } from 'lucide-react';
import {
  AlertTriangle,
  ClipboardList,
  HeartHandshake,
  Home,
  Info,
  Landmark,
  Mail,
  MapPin,
  Scale,
  ShieldCheck,
  FileText,
  Cookie,
} from 'lucide-react';

/** Single source of truth: this deployment is the Africa regional edition. */
export const AFRICA_EDITION = true;

export type EditionNavItem = {
  path: string;
  label: string;
  icon: LucideIcon;
  highlight?: boolean;
};

/** Desktop header — primary journeys (keep ≤4 items + More) */
export const africaHeaderNav: EditionNavItem[] = [
  { path: '/africa/countries', label: 'Countries', icon: MapPin },
  { path: '/africa/scamshield', label: 'ScamShield', icon: AlertTriangle },
  { path: '/africa/partner', label: 'Partner', icon: HeartHandshake, highlight: true },
];

/** Default persona journey entry — most common Africa Edition user */
export const AFRICA_DEFAULT_PLAN_PATH = '/africa/personas/start/mobile-money-user';

/** Desktop “More” — secondary links */
export const africaHeaderMore: EditionNavItem[] = [
  { path: '/africa/sources', label: 'Source register', icon: Landmark },
  { path: '/about', label: 'About ERMITS', icon: Info },
  { path: '/contact', label: 'Contact', icon: Mail },
  { path: '/privacy-laws', label: 'Intl. laws', icon: Scale },
];

/** Mobile bottom bar — four highest-frequency destinations */
export const africaBottomNav: EditionNavItem[] = [
  { path: '/', label: 'Home', icon: Home },
  { path: '/africa/countries', label: 'Countries', icon: MapPin },
  { path: '/africa/scamshield', label: 'ScamShield', icon: AlertTriangle },
  { path: AFRICA_DEFAULT_PLAN_PATH, label: 'My Plan', icon: ClipboardList },
];

function uniqueNavByPath(items: EditionNavItem[]): EditionNavItem[] {
  const seen = new Set<string>();
  return items.filter((item) => {
    if (seen.has(item.path)) return false;
    seen.add(item.path);
    return true;
  });
}

export type MobileNavSection = {
  id: string;
  title: string;
  items: EditionNavItem[];
};

/** Mobile drawer — grouped sections */
export const africaMobileNavSections: MobileNavSection[] = [
  {
    id: 'start',
    title: 'Start',
    items: [
      { path: '/', label: 'Home', icon: Home },
      { path: AFRICA_DEFAULT_PLAN_PATH, label: 'My Plan', icon: ClipboardList },
    ],
  },
  {
    id: 'explore',
    title: 'Explore',
    items: uniqueNavByPath([...africaHeaderNav]),
  },
  {
    id: 'more',
    title: 'More',
    items: uniqueNavByPath([...africaHeaderMore]),
  },
  {
    id: 'legal',
    title: 'Legal',
    items: [
      { path: '/privacy', label: 'Privacy policy', icon: ShieldCheck },
      { path: '/terms', label: 'Terms of service', icon: FileText },
      { path: '/cookies', label: 'Cookie policy', icon: Cookie },
    ],
  },
];

export type FooterLinkGroup = {
  title: string;
  items: EditionNavItem[];
};

export const africaFooterGroups: FooterLinkGroup[] = [
  {
    title: 'Explore',
    items: [
      { path: '/africa/countries', label: 'Country profiles', icon: MapPin },
      { path: '/africa/scamshield', label: 'ScamShield Africa', icon: AlertTriangle },
      { path: '/africa/sources', label: 'Source register', icon: Landmark },
      { path: '/africa/partner', label: 'Partner With Us', icon: HeartHandshake },
    ],
  },
  {
    title: 'Reference',
    items: [
      { path: '/privacy-laws', label: 'International privacy laws', icon: Scale },
    ],
  },
  {
    title: 'Legal & ERMITS',
    items: [
      { path: '/privacy', label: 'Privacy policy', icon: ShieldCheck },
      { path: '/terms', label: 'Terms of service', icon: FileText },
      { path: '/cookies', label: 'Cookie policy', icon: Cookie },
      { path: '/contact', label: 'Contact', icon: Mail },
    ],
  },
];

export function isAfricaPath(pathname: string): boolean {
  return pathname === '/' || pathname.startsWith('/africa');
}
