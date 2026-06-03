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
      subtitle={
        persona
          ? `${persona.shortLabel} · ${country.name}`
          : `${country.name} — personalize with a profile`
      }
      description={
        persona
          ? 'Work through the steps below — scams, rights, and reporting tailored to you.'
          : 'Country-specific guidance. Choose a profile on the homepage to personalize risks and first actions.'
      }
    >
      <Section>
        <AfricaPersonalPlan country={country} persona={persona} recommendations={recommendations} />
      </Section>
    </AfricaPageLayout>
  );
};

export default AfricaActionCenterPage;
