import React from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { AlertTriangle, ExternalLink, FileText, Landmark, ShieldCheck } from 'lucide-react';
import AfricaPageLayout from './AfricaPageLayout';
import Section from '../../components/common/Section';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import { africaCountries } from '../../data/africa/countries';
import { designSystem } from '../../styles/design-system';

const COUNTRY_ISO: Record<string, string> = {
  'cote-divoire': 'CI',
  ghana: 'GH',
  nigeria: 'NG',
  kenya: 'KE',
  senegal: 'SN',
  'south-africa': 'ZA',
};

const AUTHORITY_ABBREV: Record<string, string> = {
  'cote-divoire': 'ARTCI · ANSSI',
  ghana: 'DPC Ghana · CSA',
  nigeria: 'NDPC · ngCERT',
  kenya: 'ODPC · KE-CIRT',
  senegal: 'CDP · DGPN',
  'south-africa': 'Info Regulator · SAPS',
};

const CURRENCY_CHIP: Record<string, string> = {
  'cote-divoire': 'CFA Franc',
  ghana: 'Ghana Cedi',
  nigeria: 'Naira',
  kenya: 'Kenyan Shilling',
  'south-africa': 'Rand',
};

function DetailList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2.5">
      {items.map((item) => (
        <li key={item} className="africa-list-item text-sm text-text-secondary dark:text-gray-300">
          {item}
        </li>
      ))}
    </ul>
  );
}

const AfricaCountryPage: React.FC = () => {
  const { countrySlug } = useParams();
  const country = africaCountries.find((item) => item.slug === countrySlug);

  if (!country) return <Navigate to="/africa/countries" replace />;

  const iso = COUNTRY_ISO[country.slug] ?? country.slug.slice(0, 2).toUpperCase();
  const authorityAbbrev = AUTHORITY_ABBREV[country.slug] ?? country.authority;
  const currency = CURRENCY_CHIP[country.slug];

  return (
    <AfricaPageLayout heroType="minimal" backgroundType="africa">
      <div className="bg-blue-900 text-white -mt-px">
        <div className={`${designSystem.layout.contentShell} py-6 md:py-8`}>
          <div className="flex items-start gap-4">
            <span className="font-mono text-sm font-medium px-3 py-1.5 rounded-lg bg-white/10 text-white/90 flex-shrink-0">
              {iso}
            </span>
            <div className="min-w-0">
              <h1 className="font-display text-3xl md:text-4xl font-bold text-white leading-tight mb-2">
                {country.name}
              </h1>
              <p className="font-mono text-sm text-white/70 mb-4">{authorityAbbrev}</p>
              <div className="flex flex-wrap gap-2">
                {country.languages.map((language) => (
                  <span
                    key={language}
                    className="text-xs font-medium px-2.5 py-1 rounded-full bg-white/10 text-white/75"
                  >
                    {language}
                  </span>
                ))}
                {currency && (
                  <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-white/10 text-white/75">
                    {currency}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Section>
        <div id="country-info" className="grid grid-cols-1 lg:grid-cols-3 gap-5 md:gap-6 mb-8 md:mb-10">
          <Card className="p-6 lg:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-rights/10 flex items-center justify-center">
                <Landmark className="h-5 w-5 text-rights" />
              </div>
              <h2 className="text-xl font-bold text-primary dark:text-white">Legal & institutional</h2>
            </div>
            <div className="space-y-3 mb-4">
              <p className="text-sm text-text-secondary dark:text-gray-300">
                <span className="font-semibold text-primary dark:text-white">Applicable law:</span> {country.law}
              </p>
              <p className="text-sm text-text-secondary dark:text-gray-300">
                <span className="font-semibold text-primary dark:text-white">Authority:</span> {country.authority}
              </p>
            </div>
            {country.authorityUrl && (
              <a
                href={country.authorityUrl}
                target="_blank"
                rel="noreferrer"
                className="text-rights font-semibold text-sm hover:underline inline-flex items-center gap-1.5"
              >
                Open authority website <ExternalLink className="h-4 w-4" />
              </a>
            )}
          </Card>
          <Card className="p-6">
            <h3 className="text-lg font-bold text-primary dark:text-white mb-3">Languages</h3>
            <div className="flex flex-wrap gap-2">
              {country.languages.map((language) => (
                <span
                  key={language}
                  className="px-3 py-1 rounded-full bg-rights/10 text-rights text-sm font-medium"
                >
                  {language}
                </span>
              ))}
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 mb-8 md:mb-10">
          <Card className="p-6">
            <div className="w-10 h-10 rounded-xl bg-rights/10 flex items-center justify-center mb-4">
              <AlertTriangle className="h-5 w-5 text-rights" />
            </div>
            <h3 className="text-lg font-bold text-primary dark:text-white mb-3">Priority risks</h3>
            <DetailList items={country.focusRisks} />
          </Card>
          <Card className="p-6">
            <div className="w-10 h-10 rounded-xl bg-rights/10 flex items-center justify-center mb-4">
              <ShieldCheck className="h-5 w-5 text-rights" />
            </div>
            <h3 className="text-lg font-bold text-primary dark:text-white mb-3">Data rights</h3>
            <DetailList items={country.rights} />
          </Card>
          <Card className="p-6">
            <div className="w-10 h-10 rounded-xl bg-rights/10 flex items-center justify-center mb-4">
              <FileText className="h-5 w-5 text-rights" />
            </div>
            <h3 className="text-lg font-bold text-primary dark:text-white mb-3">Reporting channels</h3>
            <DetailList items={country.reportingChannels} />
          </Card>
        </div>

        <Card className="p-6 mb-8 md:mb-10 bg-background-secondary dark:bg-background-secondary/50">
          <h2 className="text-lg font-bold text-primary dark:text-white mb-3">Official sources</h2>
          <div className="flex flex-wrap gap-4">
            {country.sourceUrls.map((url) => (
              <a
                key={url}
                href={url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-sm text-rights font-semibold hover:underline"
              >
                {url.replace(/^https?:\/\//, '').split('/')[0]}
                <ExternalLink className="h-4 w-4" />
              </a>
            ))}
          </div>
        </Card>

        <Card className="p-6 md:p-8 bg-background-secondary dark:bg-background-secondary/50">
          <h2 className="font-display text-xl md:text-2xl font-bold text-primary dark:text-white mb-2">
            Looking for your personal safety plan?
          </h2>
          <p className="text-text-secondary dark:text-gray-300 mb-6 text-sm leading-relaxed max-w-2xl">
            Choose a profile that matches your situation in {country.name} to get tailored risks and
            first actions.
          </p>
          <Link to={`/africa/personas/${country.slug}`}>
            <Button>Choose my profile</Button>
          </Link>
          <p className="mt-4 text-sm">
            <a
              href="#country-info"
              className="text-text-secondary dark:text-gray-400 hover:text-primary dark:hover:text-white transition-colors"
            >
              Just browsing country info
            </a>
          </p>
        </Card>
      </Section>
    </AfricaPageLayout>
  );
};

export default AfricaCountryPage;
