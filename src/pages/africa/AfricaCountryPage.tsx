import React from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { AlertTriangle, ExternalLink, FileText, Landmark, ShieldCheck } from 'lucide-react';
import AfricaPageLayout from './AfricaPageLayout';
import Section from '../../components/common/Section';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import { africaCountries } from '../../data/africa/countries';

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

  return (
    <AfricaPageLayout
      title={country.name}
      subtitle={`${country.region} · Digital trust profile`}
      description={`Safety, privacy rights, and reporting guidance for ${country.name}.`}
    >
      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 md:gap-6 mb-8 md:mb-10">
          <Card className="p-6 lg:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                <Landmark className="h-5 w-5 text-accent" />
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
                className="text-accent font-semibold text-sm hover:underline inline-flex items-center gap-1.5"
              >
                Open authority website <ExternalLink className="h-4 w-4" />
              </a>
            )}
          </Card>
          <Card className="p-6">
            <h3 className="text-lg font-bold text-primary dark:text-white mb-3">Languages</h3>
            <div className="flex flex-wrap gap-2">
              {country.languages.map((language) => (
                <span key={language} className="px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium">
                  {language}
                </span>
              ))}
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 mb-8 md:mb-10">
          <Card className="p-6">
            <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
              <AlertTriangle className="h-5 w-5 text-accent" />
            </div>
            <h3 className="text-lg font-bold text-primary dark:text-white mb-3">Priority risks</h3>
            <DetailList items={country.focusRisks} />
          </Card>
          <Card className="p-6">
            <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
              <ShieldCheck className="h-5 w-5 text-accent" />
            </div>
            <h3 className="text-lg font-bold text-primary dark:text-white mb-3">Data rights</h3>
            <DetailList items={country.rights} />
          </Card>
          <Card className="p-6">
            <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
              <FileText className="h-5 w-5 text-accent" />
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
                className="inline-flex items-center gap-2 text-sm text-accent font-semibold hover:underline"
              >
                {url.replace(/^https?:\/\//, '').split('/')[0]}
                <ExternalLink className="h-4 w-4" />
              </a>
            ))}
          </div>
        </Card>

        <Card className="p-6 md:p-8 border-l-4 border-l-accent bg-light-blue dark:bg-background-secondary">
          <h2 className="text-xl font-bold text-primary dark:text-white mb-2">Get your personal safety plan</h2>
          <p className="text-text-secondary dark:text-gray-300 mb-6 text-sm leading-relaxed max-w-2xl">
            Choose a profile that matches your situation in {country.name}, or start with ScamShield for immediate
            fraud-prevention guidance.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link to={`/africa/personas/${country.slug}`}>
              <Button>Choose my profile</Button>
            </Link>
            <Link to="/africa/scamshield">
              <Button variant="outline">Open ScamShield</Button>
            </Link>
          </div>
        </Card>
      </Section>
    </AfricaPageLayout>
  );
};

export default AfricaCountryPage;
