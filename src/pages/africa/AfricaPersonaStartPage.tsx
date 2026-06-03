import React from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import AfricaPageLayout from './AfricaPageLayout';
import Section from '../../components/common/Section';
import { africaCountries } from '../../data/africa/countries';
import { getAfricaPersonaBySlug } from '../../data/africa/personas';
import { getPersonaVisual } from '../../data/africa/personaVisuals';
import { designSystem } from '../../styles/design-system';

const COUNTRY_ISO: Record<string, string> = {
  'cote-divoire': 'CI',
  ghana: 'GH',
  nigeria: 'NG',
  kenya: 'KE',
  senegal: 'SN',
  'south-africa': 'ZA',
};

const COUNTRY_DISPLAY: Record<string, string> = {
  'cote-divoire': "Côte d'Iv.",
  'south-africa': 'S. Africa',
};

const AfricaPersonaStartPage: React.FC = () => {
  const { personaSlug } = useParams();
  const persona = getAfricaPersonaBySlug(personaSlug);
  const mvpCountries = africaCountries.filter((c) => c.launchStatus === 'MVP');

  if (!persona) return <Navigate to="/" replace />;

  const { Icon, iconBg, iconColor } = getPersonaVisual(persona.slug);

  return (
    <AfricaPageLayout heroType="minimal" backgroundType="africa">
      <div className="bg-primary text-white -mt-px">
        <div className={`${designSystem.layout.contentShell} py-6 md:py-8`}>
          <div className="flex items-center justify-between gap-4 mb-6">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-sm text-white/70 hover:text-white transition-colors"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden />
              Back
            </Link>
            <span className="text-sm text-white/50 font-mono">Step 2 of 2</span>
          </div>

          <div className="flex items-start gap-4">
            <div
              className={`w-14 h-14 rounded-xl ${iconBg} flex items-center justify-center flex-shrink-0`}
            >
              <Icon className={`h-7 w-7 ${iconColor}`} aria-hidden />
            </div>
            <div className="min-w-0">
              <h1 className="font-display text-2xl md:text-3xl font-bold text-white leading-tight">
                {persona.label}
              </h1>
              <p className="text-white/70 mt-1.5 leading-relaxed">{persona.description}</p>
            </div>
          </div>
        </div>
      </div>

      <Section>
        <div className={`${designSystem.layout.contentShell} max-w-3xl mx-auto`}>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-primary dark:text-white mb-6 text-center md:text-left">
            Which country are you in?
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4 mb-8">
            {mvpCountries.map((country) => (
              <Link
                key={country.slug}
                to={`/africa/action-center/${country.slug}?persona=${persona.slug}`}
                className="flex flex-col items-center justify-center min-h-[5rem] p-4 rounded-2xl border border-border bg-card hover:border-accent hover:bg-accent/5 hover:shadow-sm transition-all text-center"
              >
                <span className="font-mono text-xs font-medium px-2 py-0.5 rounded-md bg-background-secondary text-text-secondary mb-2">
                  {COUNTRY_ISO[country.slug] ?? country.slug.slice(0, 2).toUpperCase()}
                </span>
                <span className="font-semibold text-lg text-primary dark:text-white leading-snug">
                  {COUNTRY_DISPLAY[country.slug] ?? country.name}
                </span>
              </Link>
            ))}
          </div>

          <p className="text-center md:text-left">
            <Link
              to="/africa/countries"
              className="text-accent hover:underline font-semibold text-sm"
            >
              My country isn&apos;t listed yet →
            </Link>
          </p>
        </div>
      </Section>
    </AfricaPageLayout>
  );
};

export default AfricaPersonaStartPage;
