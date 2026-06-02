import type { AfricaCountry } from './countries';
import type { AfricaPersona } from './personas';

export type AfricaActionRecommendation = {
  id: string;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  type: 'risk' | 'rights';
};

export const buildAfricaActionRecommendations = (
  country?: AfricaCountry,
  persona?: AfricaPersona
): AfricaActionRecommendation[] => {
  const countryName = country?.name ?? 'your country';
  const personaRisk = persona?.priorityRisks?.[0] ?? 'account and identity exposure';

  return [
    {
      id: 'report-scam-path',
      title: `Confirm the reporting path for ${countryName}`,
      description: country
        ? `Use ${country.reportingChannels[0]} first for urgent fraud or cyber incidents, then preserve evidence and escalate to the relevant authority.`
        : 'Select your country so the platform can show the correct reporting channel, authority, and complaint path.',
      priority: 'high',
      type: 'risk'
    },
    {
      id: 'persona-risk-control',
      title: persona ? `Reduce ${persona.shortLabel} exposure` : 'Choose your user profile',
      description: persona
        ? `Your first control priority is ${personaRisk}. Start with: ${persona.primaryActions[0]}.`
        : 'Choose a persona so recommendations reflect mobile money, family, student, SME, seller, or employee risks.',
      priority: 'high',
      type: 'risk'
    },
    {
      id: 'rights-complaint-path',
      title: country ? `Prepare a rights request under ${country.law}` : 'Prepare a privacy rights request',
      description: country
        ? `Available rights include: ${country.rights.join(', ')}. Validate the official complaint form before submitting.`
        : 'Select a country to tailor the request language, authority, rights list, and complaint escalation path.',
      priority: 'medium',
      type: 'rights'
    },
    {
      id: 'evidence-log',
      title: 'Create an evidence log before escalating',
      description: 'Record dates, screenshots, transaction references, account names, phone numbers, and official support ticket numbers before submitting a complaint.',
      priority: 'medium',
      type: 'rights'
    }
  ];
};
