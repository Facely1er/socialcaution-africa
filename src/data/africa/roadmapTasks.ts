import { CreditCard, MessageCircle, MapPin, Shield, Smartphone } from 'lucide-react';
import type { ElementType } from 'react';

export type AfricaRoadmapTask = {
  id: string;
  title: string;
  description: string;
  duration: string;
  icon: ElementType;
  link?: string;
};

export const africaRoadmapTasks: AfricaRoadmapTask[] = [
  {
    id: 'mobile-money-pin',
    title: 'Secure your mobile money PIN',
    description: 'Use a unique PIN, enable app lock, and never share codes with callers or WhatsApp contacts.',
    duration: '15 min',
    icon: CreditCard,
    link: '/africa/scamshield',
  },
  {
    id: 'sim-check',
    title: 'Review SIM registrations',
    description: 'Check with your operator or national telecom portal which SIMs are registered to your ID.',
    duration: '20 min',
    icon: Smartphone,
    link: '/africa/countries',
  },
  {
    id: 'whatsapp-hygiene',
    title: 'WhatsApp scam checklist',
    description: 'Verify urgent money requests by calling saved numbers — not replying in-chat.',
    duration: '10 min',
    icon: MessageCircle,
    link: '/africa/scamshield',
  },
  {
    id: 'country-rights',
    title: 'Learn your national data rights',
    description: 'Open your country profile for applicable law, regulator, and complaint steps.',
    duration: '25 min',
    icon: MapPin,
    link: '/africa/countries',
  },
  {
    id: 'authority-complaint',
    title: 'Know your complaint channel',
    description: 'Bookmark your data protection authority path (POPIA, NDPR, ODPC, CDP, ARTCI, etc.).',
    duration: '20 min',
    icon: Shield,
    link: '/africa/sources',
  },
];
