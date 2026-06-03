import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Globe2 } from 'lucide-react';
import AfricaPageLayout from './AfricaPageLayout';
import Section from '../../components/common/Section';
import PersonaCard from '../../components/africa/PersonaCard';
import { designSystem } from '../../styles/design-system';
import { africaCountries, scamTypes } from '../../data/africa/countries';
import { africaPersonas } from '../../data/africa/personas';

const COUNTRY_ISO: Record<string, string> = {
  'cote-divoire': 'CI',
  ghana: 'GH',
  nigeria: 'NG',
  kenya: 'KE',
  'south-africa': 'ZA',
};

const AfricaHomePage: React.FC = () => {
  const mvpCountries = africaCountries.filter((c) => c.launchStatus === 'MVP');

  return (
    <AfricaPageLayout heroType="minimal" backgroundType="africa">
      <Section fullWidth className="africa-hero-band text-white pt-10 pb-14 md:pt-14 md:pb-16 !py-0">
        <div className={`${designSystem.layout.contentShell} py-10 md:py-14`}>
          <div className="text-center mb-10 md:mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 text-white/90 font-semibold text-sm mb-5">
              <Globe2 className="h-4 w-4" aria-hidden />
              Africa Edition
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
              What describes you best?
            </h1>
            <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
              Get a plan for your digital life in Africa
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 mb-8">
            {africaPersonas.map((persona) => (
              <PersonaCard key={persona.slug} persona={persona} dark />
            ))}
          </div>

          <p className="text-center text-sm text-white/55">
            Free · French &amp; English · 2 minutes
          </p>
        </div>
      </Section>

      <Section>
        <div className="rounded-2xl bg-red-950/20 border border-border/60 border-l-4 border-l-scam p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
            <div>
              <h2 className="font-display text-xl md:text-2xl font-bold text-primary dark:text-white mb-2">
                Common scams in Africa right now
              </h2>
              <p className="text-text-secondary dark:text-gray-300 max-w-xl text-sm md:text-base">
                Mobile money fraud, WhatsApp impersonation, fake investments, and more — know what to watch for.
              </p>
            </div>
            <Link
              to="/africa/scamshield"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:underline flex-shrink-0"
            >
              View full guide <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {scamTypes.slice(0, 4).map((scam) => (
              <div
                key={scam.title}
                className="p-4 rounded-xl bg-background/80 dark:bg-background border border-border/60"
              >
                <h3 className="font-semibold text-primary dark:text-white mb-1">{scam.title}</h3>
                <p className="text-sm text-text-secondary dark:text-gray-300 leading-relaxed">
                  {scam.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section fullWidth className="bg-background-secondary !py-10 md:!py-12">
        <div className={designSystem.layout.contentShell}>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
            <div>
              <h2 className="font-display text-xl md:text-2xl font-bold text-primary dark:text-white">
                Your country&apos;s privacy rights and authorities
              </h2>
              <p className="text-sm text-text-secondary dark:text-gray-400 mt-1">
                Six countries at launch — more coming soon
              </p>
            </div>
            <Link
              to="/africa/countries"
              className="text-accent font-semibold text-sm hover:underline inline-flex items-center gap-1 flex-shrink-0"
            >
              View all <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
          <div className="flex flex-wrap gap-3">
            {mvpCountries.map((country) => (
              <Link
                key={country.slug}
                to={`/africa/countries/${country.slug}`}
                className="inline-flex items-center justify-center min-w-[3.5rem] px-4 py-2.5 rounded-full border border-border bg-card hover:border-accent hover:text-accent transition-colors font-mono text-sm font-medium text-primary dark:text-white"
              >
                {COUNTRY_ISO[country.slug] ?? country.slug.slice(0, 2).toUpperCase()}
              </Link>
            ))}
          </div>
        </div>
      </Section>
    </AfricaPageLayout>
  );
};

export default AfricaHomePage;
