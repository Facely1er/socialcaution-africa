import React from 'react';
import { Link, Navigate, useParams, useSearchParams } from 'react-router-dom';
import { AlertTriangle, ExternalLink, FileText, Landmark } from 'lucide-react';
import PageLayout from '../../components/layout/PageLayout';
import Section from '../../components/common/Section';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import PrivacyActionCenter from '../../components/dashboard/PrivacyActionCenter';
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
    <PageLayout
      title="Digital Rights & Safety Action Center"
      subtitle={`${country.name}${persona ? ` · ${persona.label}` : ''}`}
      description="Country-aware guidance for scam response, rights requests, evidence collection, and authority escalation."
      breadcrumbs={[
        { label: 'Africa', path: '/africa' },
        { label: 'Countries', path: '/africa/countries' },
        { label: country.name, path: `/africa/countries/${country.slug}` },
        { label: 'Action Center', path: `/africa/action-center/${country.slug}` }
      ]}
    >
      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="p-6 lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <Landmark className="h-6 w-6 text-accent" />
              <h2 className="text-2xl font-bold text-primary dark:text-white">Country context</h2>
            </div>
            <div className="space-y-2 text-gray-700 dark:text-gray-300">
              <p><strong>Law:</strong> {country.law}</p>
              <p><strong>Authority:</strong> {country.authority}</p>
              <p><strong>Confidence:</strong> {country.confidenceLevel.replaceAll('-', ' ')}</p>
              <p><strong>Verification note:</strong> {country.verificationNote}</p>
            </div>
            <div className="flex flex-wrap gap-3 mt-5">
              {country.authorityUrl && (
                <a href={country.authorityUrl} target="_blank" rel="noreferrer">
                  <Button variant="outline">Authority Website <ExternalLink className="ml-2 h-4 w-4" /></Button>
                </a>
              )}
              {country.cybercrimeReportingUrl && (
                <a href={country.cybercrimeReportingUrl} target="_blank" rel="noreferrer">
                  <Button variant="outline">Cyber Reporting <ExternalLink className="ml-2 h-4 w-4" /></Button>
                </a>
              )}
            </div>
          </Card>

          <Card className="p-6">
            <AlertTriangle className="h-7 w-7 text-accent mb-3" />
            <h3 className="text-xl font-bold text-primary dark:text-white mb-3">Urgent path</h3>
            <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
              <li>• Preserve screenshots and transaction references.</li>
              <li>• Contact provider fraud support first for account/payment abuse.</li>
              <li>• Escalate through official channels after evidence is captured.</li>
            </ul>
          </Card>
        </div>

        <PrivacyActionCenter
          title="Digital Rights & Safety Action Center"
          subtitle={persona ? `${persona.label} action path for ${country.name}` : `Country-aware action path for ${country.name}`}
          riskScore={72}
          rightsScore={52}
          recommendations={recommendations}
          lastAssessment={new Date().toISOString()}
          countrySlug={country.slug}
        />

        <Card className="p-6 mt-8 bg-light-blue dark:bg-background-secondary">
          <div className="flex items-center gap-3 mb-4">
            <FileText className="h-6 w-6 text-accent" />
            <h2 className="text-2xl font-bold text-primary dark:text-white">What still needs official verification</h2>
          </div>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            This package contains the structure and MVP content only. Before launch, validate each official complaint URL, cybercrime reporting process, and regulator instruction.
          </p>
          <Link to={`/africa/countries/${country.slug}`}><Button variant="outline">Back to country profile</Button></Link>
        </Card>
      </Section>
    </PageLayout>
  );
};

export default AfricaActionCenterPage;
