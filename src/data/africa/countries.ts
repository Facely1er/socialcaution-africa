export type AfricaRegion = 'West Africa' | 'East Africa' | 'Central Africa' | 'Southern Africa' | 'North Africa';
export type LaunchStatus = 'MVP' | 'Next' | 'Backlog';
export type ConfidenceLevel = 'needs-official-verification' | 'official-source-pending' | 'verified-official';

export type AfricaCountry = {
  slug: string;
  name: string;
  region: AfricaRegion;
  languages: string[];
  law: string;
  authority: string;
  authorityUrl?: string;
  complaintUrl?: string;
  cybercrimeReportingUrl?: string;
  consumerProtectionUrl?: string;
  financialFraudChannel?: string;
  telecomEscalation?: string;
  childProtectionReference?: string;
  focusRisks: string[];
  rights: string[];
  reportingChannels: string[];
  recommendedPersonas: string[];
  launchStatus: LaunchStatus;
  lastVerifiedDate: string;
  confidenceLevel: ConfidenceLevel;
  sourceUrls: string[];
  verificationNote: string;
};

export const africaCountries: AfricaCountry[] = [
  {
    slug: 'cote-divoire',
    name: "Côte d'Ivoire",
    region: 'West Africa',
    languages: ['French'],
    law: 'Law No. 2013-450 on the protection of personal data',
    authority: 'Autorité de Régulation des Télécommunications/TIC de Côte d’Ivoire (ARTCI)',
    authorityUrl: 'https://www.artci.ci',
    complaintUrl: 'https://www.artci.ci',
    cybercrimeReportingUrl: 'https://www.plcc.ci',
    consumerProtectionUrl: 'https://commerce.gouv.ci',
    financialFraudChannel: 'Bank/mobile-money provider fraud desk and national cybercrime reporting channels',
    telecomEscalation: 'Mobile network operator support, then ARTCI escalation where applicable',
    childProtectionReference: 'Use national child protection and education ministry references before publication',
    focusRisks: ['Mobile money fraud', 'WhatsApp impersonation', 'SIM-swap risk', 'Online marketplace scams'],
    rights: ['Information', 'Access', 'Rectification', 'Objection', 'Complaint to authority'],
    reportingChannels: ['National cybercrime reporting channels', 'Telecom/mobile money provider support', 'Data protection authority complaint path'],
    recommendedPersonas: ['mobile-money-user', 'parent-guardian', 'student', 'small-business-owner'],
    launchStatus: 'MVP',
    lastVerifiedDate: '2026-06-01',
    confidenceLevel: 'needs-official-verification',
    sourceUrls: ['https://www.artci.ci', 'https://www.plcc.ci'],
    verificationNote: 'MVP profile. Validate complaint URLs, complaint forms, and current authority procedures against official pages before public launch.'
  },
  {
    slug: 'ghana',
    name: 'Ghana',
    region: 'West Africa',
    languages: ['English'],
    law: 'Data Protection Act, 2012 (Act 843)',
    authority: 'Data Protection Commission Ghana',
    authorityUrl: 'https://www.dataprotection.org.gh',
    complaintUrl: 'https://www.dataprotection.org.gh',
    cybercrimeReportingUrl: 'https://www.csa.gov.gh',
    consumerProtectionUrl: 'https://moti.gov.gh',
    financialFraudChannel: 'Bank/mobile-money provider fraud desk and Cyber Security Authority guidance',
    telecomEscalation: 'Mobile network operator support, then relevant regulator escalation where applicable',
    childProtectionReference: 'Use national child online protection guidance before publication',
    focusRisks: ['Mobile money fraud', 'Business email compromise', 'Romance scams', 'Fake investment schemes'],
    rights: ['Information', 'Access', 'Correction', 'Objection', 'Complaint to authority'],
    reportingChannels: ['Cyber Security Authority reporting resources', 'Data Protection Commission', 'Financial provider fraud support'],
    recommendedPersonas: ['mobile-money-user', 'online-seller', 'small-business-owner', 'parent-guardian'],
    launchStatus: 'MVP',
    lastVerifiedDate: '2026-06-01',
    confidenceLevel: 'needs-official-verification',
    sourceUrls: ['https://www.dataprotection.org.gh', 'https://www.csa.gov.gh'],
    verificationNote: 'MVP profile. Validate complaint workflow and direct reporting links before production.'
  },
  {
    slug: 'kenya',
    name: 'Kenya',
    region: 'East Africa',
    languages: ['English', 'Swahili'],
    law: 'Data Protection Act, 2019',
    authority: 'Office of the Data Protection Commissioner',
    authorityUrl: 'https://www.odpc.go.ke',
    complaintUrl: 'https://www.odpc.go.ke',
    cybercrimeReportingUrl: 'https://ke-cirt.go.ke',
    consumerProtectionUrl: 'https://www.cak.go.ke',
    financialFraudChannel: 'M-Pesa/mobile-money provider support, bank fraud desk, and national cyber incident guidance',
    telecomEscalation: 'Provider support, then Communications Authority escalation where applicable',
    childProtectionReference: 'Use ODPC and national child online protection materials before publication',
    focusRisks: ['M-Pesa fraud', 'Digital ID misuse', 'SMS phishing', 'Social account takeover'],
    rights: ['Information', 'Access', 'Correction', 'Deletion', 'Objection', 'Complaint to authority'],
    reportingChannels: ['ODPC complaint path', 'National cybercrime reporting resources', 'Mobile money provider support'],
    recommendedPersonas: ['mobile-money-user', 'student', 'online-seller', 'teacher-school-staff'],
    launchStatus: 'MVP',
    lastVerifiedDate: '2026-06-01',
    confidenceLevel: 'needs-official-verification',
    sourceUrls: ['https://www.odpc.go.ke', 'https://ke-cirt.go.ke'],
    verificationNote: 'MVP profile. Validate ODPC complaint and KE-CIRT reporting paths before production.'
  },
  {
    slug: 'nigeria',
    name: 'Nigeria',
    region: 'West Africa',
    languages: ['English'],
    law: 'Nigeria Data Protection Act, 2023',
    authority: 'Nigeria Data Protection Commission',
    authorityUrl: 'https://ndpc.gov.ng',
    complaintUrl: 'https://ndpc.gov.ng',
    cybercrimeReportingUrl: 'https://www.cert.gov.ng',
    consumerProtectionUrl: 'https://fccpc.gov.ng',
    financialFraudChannel: 'Bank fraud desk, mobile-money provider support, and national cybercrime reporting channels',
    telecomEscalation: 'Provider support, then relevant telecom regulator escalation where applicable',
    childProtectionReference: 'Use national child online safety references before publication',
    focusRisks: ['Banking fraud', 'WhatsApp scams', 'Fake job scams', 'Identity theft'],
    rights: ['Information', 'Access', 'Correction', 'Deletion', 'Objection', 'Complaint to authority'],
    reportingChannels: ['NDPC complaint path', 'Cybercrime reporting resources', 'Bank fraud desk'],
    recommendedPersonas: ['small-business-owner', 'online-seller', 'student', 'civil-servant-employee'],
    launchStatus: 'MVP',
    lastVerifiedDate: '2026-06-01',
    confidenceLevel: 'needs-official-verification',
    sourceUrls: ['https://ndpc.gov.ng', 'https://www.cert.gov.ng', 'https://fccpc.gov.ng'],
    verificationNote: 'MVP profile. Validate current NDPC, CERT, and consumer protection reporting workflows before launch.'
  },
  {
    slug: 'south-africa',
    name: 'South Africa',
    region: 'Southern Africa',
    languages: ['English'],
    law: 'Protection of Personal Information Act (POPIA)',
    authority: 'Information Regulator South Africa',
    authorityUrl: 'https://inforegulator.org.za',
    complaintUrl: 'https://inforegulator.org.za',
    cybercrimeReportingUrl: 'https://www.saps.gov.za',
    consumerProtectionUrl: 'https://www.thencc.gov.za',
    financialFraudChannel: 'Bank fraud desk, sector ombuds where applicable, and police/cybercrime reporting channels',
    telecomEscalation: 'Provider support, then relevant communications regulator escalation where applicable',
    childProtectionReference: 'Use national child protection and education resources before publication',
    focusRisks: ['Banking fraud', 'Data broker exposure', 'Identity theft', 'Online shopping fraud'],
    rights: ['Information', 'Access', 'Correction', 'Deletion', 'Objection', 'Complaint to authority'],
    reportingChannels: ['Information Regulator complaint path', 'SAPS cybercrime reporting resources', 'Bank fraud desk'],
    recommendedPersonas: ['private-individual', 'parent-guardian', 'online-seller', 'civil-servant-employee'],
    launchStatus: 'MVP',
    lastVerifiedDate: '2026-06-01',
    confidenceLevel: 'needs-official-verification',
    sourceUrls: ['https://inforegulator.org.za', 'https://www.saps.gov.za', 'https://www.thencc.gov.za'],
    verificationNote: 'MVP profile. Validate complaint forms and current reporting instructions before launch.'
  }
];

export const africaRegions = Array.from(new Set(africaCountries.map((country) => country.region)));

export const getAfricaCountryBySlug = (slug?: string) => africaCountries.find((country) => country.slug === slug);

export const scamTypes = [
  {
    title: 'Mobile money fraud',
    description: 'Impersonation, fake reversal messages, PIN harvesting, SIM swap abuse, and agent-assisted fraud patterns.',
    action: 'Never share PINs or OTPs. Verify transaction references in the official app before acting.'
  },
  {
    title: 'WhatsApp and social impersonation',
    description: 'Attackers clone profiles, request emergency money, or move victims into fake investment groups.',
    action: 'Call the person on a known number and enable two-step verification in messaging apps.'
  },
  {
    title: 'Fake investment and job schemes',
    description: 'Fraudsters use high-return promises, fake recruiters, and application fees to extract money and documents.',
    action: 'Treat upfront fees, guaranteed returns, and pressure tactics as red flags.'
  },
  {
    title: 'Identity document misuse',
    description: 'Copies of IDs, selfies, student records, and business registration documents can be reused for fraud.',
    action: 'Watermark shared documents, limit channels used, and track who received each copy.'
  }
];
