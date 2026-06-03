import React from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { ArrowLeft, MapPin } from 'lucide-react';
import AfricaPageLayout from './AfricaPageLayout';
import Section from '../../components/common/Section';
import PersonaCard from '../../components/africa/PersonaCard';
import { designSystem } from '../../styles/design-system';
import { getAfricaCountryBySlug } from '../../data/africa/countries';
import { getRecommendedPersonasForCountry } from '../../data/africa/personas';

const AfricaPersonasPage: React.FC = () => {
  const { countrySlug } = useParams();
  const country = getAfricaCountryBySlug(countrySlug);

  if (!country) return <Navigate to="/africa/countries" replace />;

  const personas = getRecommendedPersonasForCountry(country);

  return (
    <AfricaPageLayout
      title="What describes you best?"
      subtitle={`Profiles for ${country.name}`}
      description="Pick the profile closest to your situation — we'll open a safety plan tailored to you."
    >
      <Section>
        <div className="mb-8 md:mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 text-accent font-semibold text-sm mb-4">
            <MapPin className="h-4 w-4" />
            {country.name} · {country.region}
          </div>
          <p className="text-sm text-text-secondary dark:text-gray-300 max-w-2xl leading-relaxed">
            These profiles are recommended for {country.name} based on local risk patterns. Select one to jump
            straight to your personal action plan.
          </p>
          <Link
            to={`/africa/countries/${country.slug}`}
            className="inline-flex items-center gap-1.5 mt-4 text-sm font-semibold text-accent hover:underline"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to {country.name} profile
          </Link>
        </div>

        <div className={`${designSystem.grid.personas} gap-4 md:gap-5`}>
          {personas.map((persona) => (
            <PersonaCard
              key={persona.slug}
              persona={persona}
              to={`/africa/action-center/${country.slug}?persona=${persona.slug}`}
              ctaLabel="Open my plan"
            />
          ))}
        </div>

        <p className="text-center text-sm text-text-secondary dark:text-gray-400 mt-8">
          Not sure?{' '}
          <Link to="/" className="text-accent font-semibold hover:underline">
            Start from the homepage
          </Link>{' '}
          to browse all profiles.
        </p>
      </Section>
    </AfricaPageLayout>
  );
};

export default AfricaPersonasPage;
