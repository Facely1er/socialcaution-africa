import React from 'react';
import { ExternalLink } from 'lucide-react';
import PageLayout from '../../components/layout/PageLayout';
import Section from '../../components/common/Section';
import Card from '../../components/common/Card';
import { africaCountries } from '../../data/africa/countries';

const AfricaSourcesPage: React.FC = () => (
  <PageLayout
    title="Africa Edition Source Register"
    subtitle="Official references used by the regional prototype"
    description="Authority and law references for verification before public-sector or legal use."
    breadcrumbs={[
      { label: 'Africa', path: '/africa' },
      { label: 'Sources', path: '/africa/sources' },
    ]}
  >
    <Section>
      <div className="max-w-5xl mx-auto grid gap-4">
        {africaCountries.map((country) => (
          <Card key={country.slug} className="p-5">
            <h2 className="text-lg font-bold text-primary dark:text-white mb-1">{country.name}</h2>
            <p className="text-sm text-text-secondary dark:text-gray-300 mb-2">
              {country.law} · {country.authority}
            </p>
            <p className="text-xs text-text-secondary dark:text-gray-400 mb-3">
              Confidence: {country.confidenceLevel.replace(/-/g, ' ')} · Last reviewed {country.lastVerifiedDate}
            </p>
            <ul className="space-y-2">
              {country.sourceUrls.map((url) => (
                <li key={url}>
                  <a
                    href={url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-accent font-semibold inline-flex items-center hover:underline"
                  >
                    {url.replace(/^https?:\/\//, '')}
                    <ExternalLink className="h-4 w-4 ml-1" />
                  </a>
                </li>
              ))}
            </ul>
            {country.verificationNote && (
              <p className="mt-3 text-xs text-text-secondary dark:text-gray-400">{country.verificationNote}</p>
            )}
          </Card>
        ))}
      </div>
    </Section>
  </PageLayout>
);

export default AfricaSourcesPage;
