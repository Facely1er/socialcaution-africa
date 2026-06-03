import React from 'react';
import { Navigate, useParams, useSearchParams } from 'react-router-dom';
import AfricaPageLayout from './AfricaPageLayout';
import Section from '../../components/common/Section';
import AfricaPersonalPlan from '../../components/africa/AfricaPersonalPlan';
import { getAfricaCountryBySlug } from '../../data/africa/countries';
import { getAfricaPersonaBySlug } from '../../data/africa/personas';
import { buildAfricaActionRecommendations } from '../../data/africa/actions';

const AfricaActionCenterPage: React.FC = () => {
  const { countrySlug } = useParams();
  const [searchParams] = useSearchParams();
  const country = getAfricaCountryBySlug(countrySlug);
  const persona = getAfricaPersonaBySlug(searchParams.get('persona') || undefined);

  if (!country) return <Navigate to="/africa/countries" replace />;

  const recommendations = buildAfricaActionRecommendations(country, persona);

  return (
    <AfricaPageLayout
      title={persona ? 'Your safety plan' : 'Safety plan'}
      subtitle={country.name}
      description={
        persona
          ? `Tailored steps for ${persona.shortLabel} — scams, rights, and reporting in ${country.name}.`
          : `Country-specific guidance for ${country.name}. Pick a profile on the homepage to personalize this plan.`
      }
    >
      <Section>
        <AfricaPersonalPlan country={country} persona={persona} recommendations={recommendations} />
      </Section>
    </AfricaPageLayout>
  );
};

export default AfricaActionCenterPage;
