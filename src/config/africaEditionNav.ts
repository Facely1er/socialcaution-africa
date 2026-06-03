import type { LucideIcon } from 'lucide-react';
import {
  AlertTriangle,
  Globe2,
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
};

/** Desktop header — core stakeholder journeys only */
export const africaHeaderNav: EditionNavItem[] = [
  { path: '/africa/countries', label: 'Countries', icon: MapPin },
  { path: '/africa/scamshield', label: 'ScamShield', icon: AlertTriangle },
  { path: '/africa/sources', label: 'Sources', icon: Landmark },
];

/** “More” menu — secondary / reference */
export const africaHeaderMore: EditionNavItem[] = [
  { path: '/privacy-laws', label: 'Intl. laws (reference)', icon: Scale },
  { path: '/about', label: 'About ERMITS', icon: Info },
  { path: '/contact', label: 'Contact', icon: Mail },
  { path: '/global', label: 'Global platform (legacy)', icon: Globe2 },
];

/** Mobile bottom bar */
export const africaBottomNav: EditionNavItem[] = [
  { path: '/', label: 'Home', icon: Home },
  { path: '/africa/countries', label: 'Countries', icon: MapPin },
  { path: '/africa/scamshield', label: 'Scams', icon: AlertTriangle },
  { path: '/africa/sources', label: 'Sources', icon: Landmark },
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
    ],
  },
  {
    title: 'Reference',
    items: [
      { path: '/privacy-laws', label: 'International privacy laws', icon: Scale },
      { path: '/global', label: 'Global platform overview', icon: Globe2 },
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

/** Legacy global marketing routes → Africa edition entry points */
export const AFRICA_LEGACY_REDIRECTS: Record<string, string> = {
  '/pricing': '/africa',
  '/features': '/africa',
  '/personas': '/africa/countries',
  '/persona-selection': '/africa/countries',
  '/privacy-journey': '/africa',
  '/30-day-roadmap': '/africa',
  '/privacy-action-center': '/africa',
  '/parent': '/africa',
  '/cautions': '/africa',
  '/simple-dashboard': '/africa',
  '/toolkit': '/africa/scamshield',
  '/blog': '/global',
};

export function isAfricaPath(pathname: string): boolean {
  return pathname === '/' || pathname.startsWith('/africa');
}
