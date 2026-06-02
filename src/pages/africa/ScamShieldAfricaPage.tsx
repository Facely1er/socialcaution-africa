import React from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, CheckCircle2, ExternalLink, MessageSquare, FileWarning } from 'lucide-react';
import PageLayout from '../../components/layout/PageLayout';
import Section from '../../components/common/Section';
import Card from '../../components/common/Card';
import { scamTypes } from '../../data/africa/countries';
import { scamIncidents, warningTemplates, countryReportingLinks } from '../../data/africa/scamShield';

const ScamShieldAfricaPage: React.FC = () => {
  return (
    <PageLayout
      title="ScamShield Africa"
      subtitle="Practical scam prevention for mobile-first digital life"
      description="High-frequency fraud patterns, response steps, and country reporting entry points for African users."
      breadcrumbs={[
        { label: 'Africa', path: '/africa' },
        { label: 'ScamShield', path: '/africa/scamshield' },
      ]}
    >
      <Section title="Know the pattern" subtitle="Common scams affecting mobile money, messaging apps, and job seekers across the region.">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {scamTypes.map((scam) => (
            <Card key={scam.title} className="p-6 h-full">
              <AlertTriangle className="h-8 w-8 text-accent mb-4" />
              <h2 className="text-2xl font-bold text-primary dark:text-white mb-3">{scam.title}</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">{scam.description}</p>
              <div className="flex items-start gap-2 p-4 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-900/40">
                <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-green-900 dark:text-green-100 font-medium">{scam.action}</p>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      <Section title="Incident examples" subtitle="Use these scenarios in awareness workshops and family safety conversations." className="bg-card-hover">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 max-w-6xl mx-auto">
          {scamIncidents.map((incident) => (
            <Card key={incident.id} className="p-6">
              <FileWarning className="h-6 w-6 text-accent mb-3" />
              <p className="text-xs font-semibold text-accent uppercase tracking-wide mb-2">{incident.relatedScam}</p>
              <h3 className="text-lg font-bold text-primary dark:text-white mb-2">{incident.title}</h3>
              <p className="text-sm text-text-secondary dark:text-gray-300 mb-3">{incident.pattern}</p>
              <p className="text-sm font-medium text-primary dark:text-white">{incident.whatToDo}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section title="Shareable warning templates">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-6xl mx-auto mb-6">
          {warningTemplates.map((template) => (
            <Card key={template.title} className="p-5">
              <MessageSquare className="h-5 w-5 text-accent mb-3" />
              <h3 className="font-bold text-primary dark:text-white mb-2">{template.title}</h3>
              <p className="text-sm text-text-secondary dark:text-gray-300 whitespace-pre-wrap">{template.body}</p>
            </Card>
          ))}
        </div>
        <p className="text-sm text-text-secondary dark:text-gray-400 max-w-3xl mx-auto text-center">
          Copy and adapt these messages for schools, SMEs, and community groups. Verify local reporting numbers before mass distribution.
        </p>
      </Section>

      <Section title="Country reporting links" subtitle="MVP references — verify URLs on official regulator sites before public-sector use." className="bg-card-hover">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-5xl mx-auto">
          {countryReportingLinks.map((country) => (
            <Card key={country.slug} className="p-5">
              <h3 className="font-bold text-primary dark:text-white mb-1">
                <Link to={`/africa/countries/${country.slug}`} className="hover:text-accent">
                  {country.name}
                </Link>
              </h3>
              <p className="text-sm text-text-secondary dark:text-gray-300 mb-3">{country.authority}</p>
              <ul className="space-y-2 text-sm">
                {country.authorityUrl && (
                  <li>
                    <a href={country.authorityUrl} target="_blank" rel="noreferrer" className="text-accent font-semibold inline-flex items-center hover:underline">
                      Data protection authority <ExternalLink className="h-3.5 w-3.5 ml-1" />
                    </a>
                  </li>
                )}
                {country.cybercrimeReportingUrl && (
                  <li>
                    <a href={country.cybercrimeReportingUrl} target="_blank" rel="noreferrer" className="text-accent font-semibold inline-flex items-center hover:underline">
                      Cybercrime / police reporting <ExternalLink className="h-3.5 w-3.5 ml-1" />
                    </a>
                  </li>
                )}
              </ul>
              <p className="mt-3 text-xs text-text-secondary dark:text-gray-400">{country.financialFraudChannel}</p>
            </Card>
          ))}
        </div>
        <p className="text-center mt-6">
          <Link to="/africa/sources" className="text-accent font-semibold hover:underline">
            View full source register →
          </Link>
        </p>
      </Section>

      <Section>
        <Card className="p-6 border border-amber-200 dark:border-amber-800/50 bg-amber-50/50 dark:bg-amber-950/20">
          <h2 className="text-xl font-bold text-primary dark:text-white mb-2">Before production launch</h2>
          <p className="text-gray-700 dark:text-gray-300">
            Country authority URLs and complaint workflows must be validated against official pages.
            This module is educational — not a substitute for law enforcement or regulated financial advice.
          </p>
        </Card>
      </Section>
    </PageLayout>
  );
};

export default ScamShieldAfricaPage;
