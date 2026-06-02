import type { AfricaCountry } from './countries';

export type AfricaPersona = {
  slug: string;
  label: string;
  shortLabel: string;
  description: string;
  priorityRisks: string[];
  primaryActions: string[];
  recommendedModules: string[];
};

export const africaPersonas: AfricaPersona[] = [
  {
    slug: 'mobile-money-user',
    label: 'Mobile Money User',
    shortLabel: 'Mobile Money',
    description: 'For citizens using mobile wallets, USSD, telecom apps, bank apps, and agent networks.',
    priorityRisks: ['PIN/OTP theft', 'SIM swap', 'fake reversal SMS', 'agent-assisted fraud'],
    primaryActions: ['Enable app/phone lock', 'Never share OTP/PIN', 'Verify transactions in the official app', 'Report fraud to provider quickly'],
    recommendedModules: ['ScamShield Africa', 'Digital Rights & Safety Action Center']
  },
  {
    slug: 'parent-guardian',
    label: 'Parent / Guardian',
    shortLabel: 'Parent',
    description: 'For families protecting children from oversharing, scams, cyberbullying, grooming, and unsafe apps.',
    priorityRisks: ['Child oversharing', 'cyberbullying', 'unsafe app permissions', 'school data exposure'],
    primaryActions: ['Review child app permissions', 'Create a family reporting plan', 'Discuss safe sharing', 'Use school privacy questions'],
    recommendedModules: ['Family Protection Hub', 'Rights Checkup']
  },
  {
    slug: 'student',
    label: 'Student',
    shortLabel: 'Student',
    description: 'For learners managing school accounts, social media, shared devices, and identity documents.',
    priorityRisks: ['Account takeover', 'fake scholarships', 'document misuse', 'social pressure scams'],
    primaryActions: ['Use strong authentication', 'Watermark ID copies', 'Verify scholarship links', 'Limit public profile data'],
    recommendedModules: ['ScamShield Africa', 'Privacy Exposure Check']
  },
  {
    slug: 'teacher-school-staff',
    label: 'Teacher / School Staff',
    shortLabel: 'School Staff',
    description: 'For educators handling student records, parent communications, classroom apps, and shared devices.',
    priorityRisks: ['Student data leakage', 'unsafe edtech tools', 'WhatsApp group exposure', 'weak account controls'],
    primaryActions: ['Minimize shared student data', 'Review edtech permissions', 'Separate personal and school channels', 'Escalate incidents quickly'],
    recommendedModules: ['Family Protection Hub', 'SME Digital Trust Toolkit']
  },
  {
    slug: 'small-business-owner',
    label: 'Small Business Owner',
    shortLabel: 'SME Owner',
    description: 'For SMEs collecting customer records, payments, delivery information, and supplier data.',
    priorityRisks: ['Customer data leakage', 'payment fraud', 'fake supplier invoices', 'business account takeover'],
    primaryActions: ['Map customer data', 'Secure payment channels', 'Control staff access', 'Publish a simple privacy notice'],
    recommendedModules: ['SME Digital Trust Toolkit', 'Digital Rights & Safety Action Center']
  },
  {
    slug: 'online-seller',
    label: 'Online Seller',
    shortLabel: 'Online Seller',
    description: 'For sellers using marketplaces, WhatsApp, Instagram, Facebook, delivery partners, and mobile payments.',
    priorityRisks: ['Fake buyers', 'delivery scams', 'chargeback abuse', 'customer data misuse'],
    primaryActions: ['Verify payments before dispatch', 'Limit buyer data retention', 'Use trusted delivery channels', 'Separate business accounts'],
    recommendedModules: ['ScamShield Africa', 'SME Digital Trust Toolkit']
  },
  {
    slug: 'civil-servant-employee',
    label: 'Civil Servant / Employee',
    shortLabel: 'Employee',
    description: 'For workers managing workplace systems, personal devices, official documents, and public service data.',
    priorityRisks: ['Phishing', 'document leakage', 'shared-device exposure', 'work/personal account mixing'],
    primaryActions: ['Separate official and personal channels', 'Report suspicious messages', 'Avoid unmanaged cloud sharing', 'Protect identity documents'],
    recommendedModules: ['Privacy Exposure Check', 'Digital Rights & Safety Action Center']
  }
];

export const getAfricaPersonaBySlug = (slug?: string) => africaPersonas.find((persona) => persona.slug === slug);

export const getRecommendedPersonasForCountry = (country: AfricaCountry) => {
  const recommended = country.recommendedPersonas
    .map((slug) => getAfricaPersonaBySlug(slug))
    .filter((persona): persona is AfricaPersona => Boolean(persona));

  return recommended.length > 0 ? recommended : africaPersonas.slice(0, 4);
};
