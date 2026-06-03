import { Key, Shield, Smartphone, MessageCircle, CreditCard, Wifi } from 'lucide-react';
import type { ElementType } from 'react';

export type AfricaAssessmentOption = {
  id: string;
  text: string;
  description: string;
  value: number;
  risk?: 'high' | 'medium' | 'low' | 'none';
};

export type AfricaAssessmentQuestion = {
  id: string;
  text: string;
  description: string;
  icon: ElementType;
  options: AfricaAssessmentOption[];
  standards?: { name: string; description: string }[];
};

/** Security assessment — mobile money, scams, SIM hygiene */
export const africaSecurityQuestions: AfricaAssessmentQuestion[] = [
  {
    id: 'mobile_money_pin',
    text: 'How do you protect your mobile money PIN?',
    description: 'Mobile money (M-Pesa, MTN MoMo, Orange Money, Airtel Money, etc.) is a top fraud target across Africa.',
    icon: CreditCard,
    options: [
      { id: 'shared', text: 'Shared or written down', description: 'PIN is shared with family or stored in messages', value: 0 },
      { id: 'simple', text: 'Simple PIN only', description: 'Birth year or repeated digits', value: 1 },
      { id: 'private', text: 'Private, not shared', description: 'Never shared; not stored on phone', value: 4 },
      { id: 'locked', text: 'Private + app lock', description: 'PIN plus biometric or app lock on money apps', value: 5 },
    ],
    standards: [{ name: 'GSMA Mobile Money', description: 'Customer PIN and device security guidance' }],
  },
  {
    id: 'whatsapp_scam',
    text: 'When you get urgent payment requests on WhatsApp or SMS, what do you do?',
    description: 'Family impersonation and “wrong number” scams are common on WhatsApp in African markets.',
    icon: MessageCircle,
    options: [
      { id: 'pay_fast', text: 'Pay if it sounds urgent', description: 'Send money before verifying offline', value: 0 },
      { id: 'sometimes', text: 'Sometimes verify', description: 'Verify only for large amounts', value: 2 },
      { id: 'call_back', text: 'Call back on known number', description: 'Confirm by voice on a saved contact', value: 4 },
      { id: 'never_otp', text: 'Never share OTP/PIN', description: 'Never share codes; verify in person or known callback', value: 5 },
    ],
  },
  {
    id: 'sim_registration',
    text: 'Do you know which SIM cards are registered in your name?',
    description: 'Unauthorised SIM registration can enable account takeover and mobile money fraud.',
    icon: Smartphone,
    options: [
      { id: 'no_idea', text: 'No idea', description: 'Never checked with my operator or regulator', value: 0 },
      { id: 'heard', text: 'Heard about it', description: 'Aware but have not checked', value: 2 },
      { id: 'checked_once', text: 'Checked once', description: 'Used operator/regulator check at least once', value: 4 },
      { id: 'monitor', text: 'Monitor regularly', description: 'Review registrations when getting a new SIM or yearly', value: 5 },
    ],
    standards: [{ name: 'National telecom / DPA', description: 'SIM registration and subscriber verification rules' }],
  },
];

/** Exposure assessment — platforms common in Africa */
export const africaExposureQuestions: AfricaAssessmentQuestion[] = [
  {
    id: 'mobile_money_usage',
    text: 'How do you use mobile money and banking apps?',
    description: 'Includes M-Pesa, MoMo, bank apps, and agent withdrawals.',
    icon: CreditCard,
    options: [
      { id: 'public_agent', text: 'Agents without checking', description: 'Withdraw/deposit without verifying agent identity', value: 0, risk: 'high' },
      { id: 'basic', text: 'Basic caution', description: 'Use known agents; limited balance checks', value: 2, risk: 'medium' },
      { id: 'alerts', text: 'Transaction alerts on', description: 'SMS/app alerts enabled for all transactions', value: 4, risk: 'low' },
      { id: 'limits', text: 'Alerts + daily limits', description: 'Alerts plus transaction limits and locked unused features', value: 5, risk: 'none' },
    ],
  },
  {
    id: 'otp_sharing',
    text: 'Have you ever shared an OTP or verification code with someone else?',
    description: 'One-time passwords must never be shared — not even with “bank” or “support” callers.',
    icon: Shield,
    options: [
      { id: 'yes_recent', text: 'Yes, recently', description: 'Shared a code in the last year', value: 0, risk: 'high' },
      { id: 'yes_past', text: 'Yes, in the past', description: 'Have shared before but not recently', value: 1, risk: 'high' },
      { id: 'almost', text: 'Almost shared', description: 'Was asked but refused', value: 4, risk: 'low' },
      { id: 'never', text: 'Never share codes', description: 'Never share OTP/PIN with anyone', value: 5, risk: 'none' },
    ],
  },
];

/** Privacy rights — African law references */
export const africaRightsQuestions: AfricaAssessmentQuestion[] = [
  {
    id: 'dpa_complaint',
    text: 'If a company misused your data, would you know how to complain in your country?',
    description: 'e.g. POPIA (South Africa), NDPR (Nigeria), ODPC (Kenya), CDP (Senegal), ARTCI (Côte d\'Ivoire).',
    icon: Shield,
    options: [
      { id: 'no', text: 'No', description: 'Would not know where to report', value: 0 },
      { id: 'vague', text: 'Vague idea', description: 'Heard of a regulator but unsure of steps', value: 2 },
      { id: 'country_page', text: 'Would use country guide', description: 'Would follow national authority steps from a trusted guide', value: 3 },
      { id: 'filed', text: 'Filed or assisted others', description: 'Have filed or helped someone file a complaint', value: 4 },
    ],
    standards: [
      { name: 'POPIA', description: 'South Africa Protection of Personal Information Act' },
      { name: 'NDPR', description: 'Nigeria Data Protection Regulation' },
      { name: 'ECOWAS', description: 'Supplementary Act on Personal Data Protection' },
    ],
  },
];

export const AFRICA_RIGHTS_STANDARDS_APPEND = [
  { name: 'POPIA', description: 'South Africa — Information Regulator complaints' },
  { name: 'NDPR / NDPC', description: 'Nigeria — data subject rights and complaints' },
  { name: 'ODPC', description: 'Kenya — Office of the Data Protection Commissioner' },
];
