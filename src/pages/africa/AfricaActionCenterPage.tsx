import React from 'react';
import { Link, Navigate, useParams, useSearchParams } from 'react-router-dom';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import AfricaPageLayout from './AfricaPageLayout';
import Section from '../../components/common/Section';
import { getAfricaCountryBySlug } from '../../data/africa/countries';
import { getAfricaPersonaBySlug } from '../../data/africa/personas';
import { buildAfricaActionRecommendations } from '../../data/africa/actions';
import type { AfricaActionRecommendation } from '../../data/africa/actions';
import type { AfricaCountry } from '../../data/africa/countries';
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

function authorityLinkForAction(
  rec: AfricaActionRecommendation,
  country: AfricaCountry
): { label: string; href: string } | null {
  if (rec.id === 'report-scam-path' && country.cybercrimeReportingUrl) {
    return { label: 'Report cybercrime', href: country.cybercrimeReportingUrl };
  }
  if (rec.type === 'rights' && rec.id === 'rights-complaint-path' && country.authorityUrl) {
    return { label: country.authority.split('(')[0].trim(), href: country.authorityUrl };
  }
  if (rec.id === 'report-scam-path' && country.authorityUrl) {
    return { label: 'Data protection authority', href: country.authorityUrl };
  }
  return null;
}

const AfricaActionCenterPage: React.FC = () => {
  const { countrySlug } = useParams();
  const [searchParams] = useSearchParams();
  const country = getAfricaCountryBySlug(countrySlug);
  const persona = getAfricaPersonaBySlug(searchParams.get('persona') || undefined);

  if (!country) return <Navigate to="/africa/countries" replace />;

  const recommendations = buildAfricaActionRecommendations(country, persona);
  const visual = persona ? getPersonaVisual(persona.slug) : null;
  const PersonaIcon = visual?.Icon;
  const topRisks = persona?.priorityRisks.slice(0, 2) ?? country.focusRisks.slice(0, 2);
  const changeTarget = persona
    ? `/africa/personas/start/${persona.slug}`
    : `/africa/personas/${country.slug}`;

  return (
    <AfricaPageLayout heroType="minimal" backgroundType="africa">
      <div className="bg-emerald-900 text-white -mt-px">
        <div className={`${designSystem.layout.contentShell} py-6 md:py-8`}>
          <div className="flex items-center justify-between gap-4 mb-6">
            <Link
              to={changeTarget}
              className="inline-flex items-center gap-1.5 text-sm text-white/70 hover:text-white transition-colors"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden />
              Change
            </Link>
            <div className="flex items-center gap-2">
              {persona && PersonaIcon && visual && (
                <span
                  className={`inline-flex items-center justify-center w-9 h-9 rounded-lg ${visual.iconBg}`}
                  aria-hidden
                >
                  <PersonaIcon className={`h-5 w-5 ${visual.iconColor}`} />
                </span>
              )}
              <span className="font-mono text-xs font-medium px-2.5 py-1 rounded-md bg-white/10 text-white/90">
                {COUNTRY_ISO[country.slug] ?? country.name.slice(0, 2).toUpperCase()}
              </span>
            </div>
          </div>

          <h1 className="font-display text-3xl md:text-4xl font-bold text-white leading-tight mb-3">
            {persona ? `Your plan, ${persona.label}` : `Your plan for ${country.name}`}
          </h1>
          <div className="flex flex-wrap items-center gap-x-2 gap-y-2 text-sm md:text-base text-white/75">
            <span>{country.name}</span>
            {topRisks.length > 0 && (
              <>
                <span aria-hidden className="text-white/40">
                  ·
                </span>
                {topRisks.map((risk) => (
                  <span
                    key={risk}
                    className="text-xs font-medium px-2.5 py-1 rounded-full bg-white/10 text-white/70"
                  >
                    {risk}
                  </span>
                ))}
              </>
            )}
          </div>
        </div>
      </div>

      <Section>
        <div className={`${designSystem.layout.contentShell} max-w-3xl mx-auto`}>
          {!persona && (
            <p className="text-sm text-text-secondary dark:text-gray-400 mb-6 leading-relaxed">
              Choose a profile on the homepage to tailor risks and first actions to your situation.{' '}
              <Link to="/" className="text-journey font-semibold hover:underline">
                Choose my profile
              </Link>
            </p>
          )}

          <ol className="space-y-6 mb-10">
            {recommendations.map((rec, index) => {
              const authorityLink = authorityLinkForAction(rec, country);
              return (
                <li key={rec.id} className="flex gap-4">
                  <span
                    className="flex-shrink-0 w-8 h-8 rounded-full bg-journey text-white text-sm font-bold flex items-center justify-center"
                    aria-hidden
                  >
                    {index + 1}
                  </span>
                  <div className="min-w-0 pt-0.5">
                    <h2 className="font-bold text-primary dark:text-white mb-1 leading-snug">
                      {rec.title}
                    </h2>
                    <p className="text-sm text-text-secondary dark:text-gray-300 leading-relaxed">
                      {rec.description}
                    </p>
                    {authorityLink && (
                      <a
                        href={authorityLink.href}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 mt-2 text-sm font-semibold text-journey hover:underline"
                      >
                        {authorityLink.label}
                        <ExternalLink className="h-3.5 w-3.5" aria-hidden />
                      </a>
                    )}
                  </div>
                </li>
              );
            })}
          </ol>

          {persona && persona.recommendedModules.length > 0 && (
            <div className="rounded-2xl border border-border bg-background-secondary dark:bg-background-secondary/50 p-5 md:p-6">
              <p className="text-sm font-semibold text-primary dark:text-white mb-1">
                Go further with SocialCaution
              </p>
              <p className="text-sm text-text-secondary dark:text-gray-300 leading-relaxed">
                This plan covers your first steps. For a deeper privacy assessment, review these
                modules: {persona.recommendedModules.join(' · ')}.
              </p>
            </div>
          )}

          <div className="flex flex-wrap gap-4 mt-8 pt-6 border-t border-border/60 text-sm">
            <Link to="/africa/scamshield" className="font-semibold text-accent hover:underline">
              Open ScamShield
            </Link>
            <Link
              to={`/africa/countries/${country.slug}`}
              className="font-semibold text-text-secondary dark:text-gray-400 hover:text-primary dark:hover:text-white transition-colors"
            >
              Full country profile
            </Link>
          </div>
        </div>
      </Section>
    </AfricaPageLayout>
  );
};

export default AfricaActionCenterPage;
