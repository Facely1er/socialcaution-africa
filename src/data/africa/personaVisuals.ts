import {
  Smartphone,
  Heart,
  GraduationCap,
  BookOpen,
  Briefcase,
  ShoppingBag,
  Building2,
  ShieldCheck,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export type PersonaVisual = {
  Icon: LucideIcon;
  iconBg: string;
  iconColor: string;
  cardBorder: string;
  leftAccent: string;
};

export const PERSONA_VISUAL: Record<string, PersonaVisual> = {
  'mobile-money-user': {
    Icon: Smartphone,
    iconBg: 'bg-green-50 dark:bg-green-900/20',
    iconColor: 'text-green-600 dark:text-green-400',
    cardBorder: 'hover:border-green-400',
    leftAccent: 'border-l-green-500',
  },
  'parent-guardian': {
    Icon: Heart,
    iconBg: 'bg-pink-50 dark:bg-pink-900/20',
    iconColor: 'text-pink-600 dark:text-pink-400',
    cardBorder: 'hover:border-pink-400',
    leftAccent: 'border-l-pink-500',
  },
  student: {
    Icon: GraduationCap,
    iconBg: 'bg-blue-50 dark:bg-blue-900/20',
    iconColor: 'text-blue-600 dark:text-blue-400',
    cardBorder: 'hover:border-blue-400',
    leftAccent: 'border-l-blue-500',
  },
  'teacher-school-staff': {
    Icon: BookOpen,
    iconBg: 'bg-indigo-50 dark:bg-indigo-900/20',
    iconColor: 'text-indigo-600 dark:text-indigo-400',
    cardBorder: 'hover:border-indigo-400',
    leftAccent: 'border-l-indigo-500',
  },
  'small-business-owner': {
    Icon: Briefcase,
    iconBg: 'bg-orange-50 dark:bg-orange-900/20',
    iconColor: 'text-orange-600 dark:text-orange-400',
    cardBorder: 'hover:border-orange-400',
    leftAccent: 'border-l-orange-500',
  },
  'online-seller': {
    Icon: ShoppingBag,
    iconBg: 'bg-purple-50 dark:bg-purple-900/20',
    iconColor: 'text-purple-600 dark:text-purple-400',
    cardBorder: 'hover:border-purple-400',
    leftAccent: 'border-l-purple-500',
  },
  'civil-servant-employee': {
    Icon: Building2,
    iconBg: 'bg-slate-50 dark:bg-slate-800/40',
    iconColor: 'text-slate-600 dark:text-slate-400',
    cardBorder: 'hover:border-slate-400',
    leftAccent: 'border-l-slate-500',
  },
};

export const getPersonaVisual = (slug: string): PersonaVisual =>
  PERSONA_VISUAL[slug] ?? {
    Icon: ShieldCheck,
    iconBg: 'bg-accent/10',
    iconColor: 'text-accent',
    cardBorder: 'hover:border-accent',
    leftAccent: 'border-l-accent',
  };
