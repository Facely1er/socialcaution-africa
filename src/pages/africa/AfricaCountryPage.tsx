import React from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { AlertTriangle, FileText, Landmark, ShieldCheck, ExternalLink } from 'lucide-react';
import AfricaPageLayout from './AfricaPageLayout';
import Section from '../../components/common/Section';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import { africaCountries } from '../../data/africa/countries';

const AfricaCountryPage: React.FC = () => {
  const { countrySlug } = useParams();
  const country = africaCountries.find((item) => item.slug === countrySlug);

  if (!country) return <Navigate to="/africa/countries" replace />;

  return (
    <AfricaPageLayout title={country.name} subtitle={`${country.region} Digital Trust Profile`} description={`Country-specific safety, privacy rights, and reporting guidance for ${country.name}.`}>
      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
          <Card className="p-6 lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <Landmark className="h-7 w-7 text-accent" />
              <h2 className="text-2xl font-bold text-primary dark:text-white">Legal and institutional layer</h2>
            </div>
            <p className="text-gray-700 dark:text-gray-300 mb-3"><strong>Applicable law:</strong> {country.law}</p>
            <p className="text-gray-700 dark:text-gray-300 mb-3"><strong>Authority:</strong> {country.authority}</p>
            {country.authorityUrl && <a href={country.authorityUrl} target="_blank" rel="noreferrer" className="text-accent font-semibold hover:underline">Open authority website →</a>}
          </Card>
          <Card className="p-6">
            <h3 className="text-xl font-bold text-primary dark:text-white mb-3">Languages</h3>
            <div className="flex flex-wrap gap-2">{country.languages.map((language) => <span key={language} className="px-3 py-1 rounded-full bg-accent/10 text-accent text-sm">{language}</span>)}</div>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <Card className="p-6">
            <AlertTriangle className="h-7 w-7 text-accent mb-3" />
            <h3 className="text-xl font-bold text-primary dark:text-white mb-3">Priority risks</h3>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300">{country.focusRisks.map((risk) => <li key={risk}>• {risk}</li>)}</ul>
          </Card>
          <Card className="p-6">
            <ShieldCheck className="h-7 w-7 text-accent mb-3" />
            <h3 className="text-xl font-bold text-primary dark:text-white mb-3">Data rights</h3>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300">{country.rights.map((right) => <li key={right}>• {right}</li>)}</ul>
          </Card>
          <Card className="p-6">
            <FileText className="h-7 w-7 text-accent mb-3" />
            <h3 className="text-xl font-bold text-primary dark:text-white mb-3">Reporting channels</h3>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300">{country.reportingChannels.map((channel) => <li key={channel}>• {channel}</li>)}</ul>
          </Card>
        </div>

        <Card className="p-6 mb-10 border border-warning/40 bg-warning/5">
          <h2 className="text-2xl font-bold text-primary dark:text-white mb-3">Official sources</h2>
          <div className="flex flex-wrap gap-3">
            {country.sourceUrls.map((url) => (
              <a key={url} href={url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-accent font-semibold hover:underline">
                Source <ExternalLink className="h-4 w-4" />
              </a>
            ))}
          </div>
        </Card>

        <Card className="p-6 bg-light-blue dark:bg-background-secondary">
          <h2 className="text-xl font-bold text-primary dark:text-white mb-2">
            Ready to get your personal safety plan?
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-5 text-sm">
            Start with ScamShield for immediate safety guidance, or choose your profile to get a plan tailored to
            your situation in {country.name}.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link to={`/africa/personas/${country.slug}`}>
              <Button>Choose my profile →</Button>
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
