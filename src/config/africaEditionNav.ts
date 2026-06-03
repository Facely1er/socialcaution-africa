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
} from 'lucide-react';

/** Single source of truth: this deployment is the Africa regional edition. */
export const AFRICA_EDITION = true;

export type EditionNavItem = {
  path: string;
  label: string;
  icon: LucideIcon;
  highlight?: boolean;
};

/** Desktop header — core stakeholder journeys only */
export const africaHeaderNav: EditionNavItem[] = [
  { path: '/africa/countries', label: 'Countries', icon: MapPin },
  { path: '/africa/scamshield', label: 'ScamShield', icon: AlertTriangle },
  { path: '/africa/sources', label: 'Sources', icon: Landmark },
  { path: '/africa/partner', label: 'Partner With Us', icon: HeartHandshake, highlight: true },
];

/** “More” menu — secondary / reference */
export const africaHeaderMore: EditionNavItem[] = [
  { path: '/privacy-laws', label: 'Intl. laws (reference)', icon: Scale },
  { path: '/about', label: 'About ERMITS', icon: Info },
  { path: '/contact', label: 'Contact', icon: Mail },
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
      { path: '/africa/partner', label: 'Partner With Us', icon: HeartHandshake },
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
