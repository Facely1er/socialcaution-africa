import type { LucideIcon } from 'lucide-react';
import {
  AlertTriangle,
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
  ClipboardList,
  Map,
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

/** Desktop “More” — secondary links */
export const africaHeaderMore: EditionNavItem[] = [
  { path: '/africa/sources', label: 'Sources', icon: Landmark },
  { path: '/assessment', label: 'Assessment', icon: ShieldCheck },
  { path: '/africa/roadmap', label: 'Roadmap', icon: Map },
  { path: '/about', label: 'About', icon: Info },
  { path: '/contact', label: 'Contact', icon: Mail },
  { path: '/privacy-laws', label: 'Intl. laws', icon: Scale },
];

/** Mobile bottom bar — four highest-frequency destinations */
export const africaBottomNav: EditionNavItem[] = [
  { path: '/', label: 'Home', icon: Home },
  { path: '/africa/countries', label: 'Countries', icon: MapPin },
  { path: '/africa/scamshield', label: 'Scams', icon: AlertTriangle },
  { path: '/assessment', label: 'Assess', icon: ClipboardList },
];

/** Full Africa menu for mobile drawer */
export const africaMobileNavItems: EditionNavItem[] = [
  { path: '/', label: 'Home', icon: Home },
  ...africaHeaderNav,
  ...africaHeaderMore,
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
      { path: '/africa/roadmap', label: 'Privacy roadmap', icon: Map },
    ],
  },
  {
    title: 'Reference',
    items: [
      { path: '/privacy-laws', label: 'International privacy laws', icon: Scale },
      { path: '/assessment', label: 'Privacy assessment (beta)', icon: ShieldCheck },
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
