import React from 'react';
import { Link } from 'react-router-dom';
import {
  AlertTriangle,
  CheckCircle2,
  ExternalLink,
  MessageSquare,
  FileWarning,
  ShieldAlert,
  MapPin,
} from 'lucide-react';
import AfricaPageLayout from './AfricaPageLayout';
import Section from '../../components/common/Section';
import { scamTypes } from '../../data/africa/countries';
import { scamIncidents, warningTemplates, countryReportingLinks } from '../../data/africa/scamShield';
import { designSystem } from '../../styles/design-system';

const SCAM_SEVERITY: Record<string, 'HIGH' | 'MEDIUM'> = {
  'Mobile money fraud': 'HIGH',
  'WhatsApp and social impersonation': 'HIGH',
  'Fake investment and job schemes': 'HIGH',
  'Identity document misuse': 'MEDIUM',
};

function SectionHeading({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="africa-section-heading">
      <h2>{title}</h2>
      {subtitle && <p>{subtitle}</p>}
    </div>
  );
}

const ScamShieldAfricaPage: React.FC = () => {
  return (
    <AfricaPageLayout heroType="minimal" backgroundType="africa">
      <div className="bg-red-900 text-white -mt-px">
        <div className={`${designSystem.layout.contentShell} py-6 md:py-10`}>
          <ShieldAlert className="h-10 w-10 text-white/90 mb-4" aria-hidden />
          <h1 className="font-display text-3xl md:text-4xl font-bold text-white leading-tight mb-2">
            ScamShield Africa
          </h1>
          <p className="text-white/70 text-lg">Know what to watch for.</p>
        </div>
      </div>

      <Section>
        <SectionHeading
          title="Know the pattern"
          subtitle="Common scams affecting mobile money, messaging apps, and job seekers across the region."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          {scamTypes.map((scam) => {
            const severity = SCAM_SEVERITY[scam.title] ?? 'MEDIUM';
            return (
              <article key={scam.title} className="scam-alert-card">
                <div className="flex items-center justify-between gap-3 mb-3">
                  <span
                    className={`font-mono text-xs font-bold uppercase tracking-wide px-2 py-0.5 rounded ${
                      severity === 'HIGH'
                        ? 'bg-scam/15 text-scam'
                        : 'bg-warning/15 text-warning'
                    }`}
                  >
                    {severity}
                  </span>
                </div>
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-scam/15 flex items-center justify-center flex-shrink-0">
                    <AlertTriangle className="h-5 w-5 text-scam" />
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-primary dark:text-white leading-snug pt-1">
                    {scam.title}
                  </h3>
                </div>
                <p className="text-sm text-text-secondary dark:text-gray-300 mb-4 leading-relaxed flex-grow">
                  {scam.description}
                </p>
                <div className="scam-action-callout">
                  <CheckCircle2 className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wide text-success mb-0.5">What to do</p>
                    <p className="text-sm font-medium text-primary dark:text-white leading-relaxed">{scam.action}</p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </Section>

      <Section>
        <div className="africa-section-band p-6 md:p-8">
          <SectionHeading
            title="Real incident examples"
            subtitle="Use these scenarios in family conversations, school workshops, or SME staff briefings."
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-5">
            {scamIncidents.map((incident) => (
              <article key={incident.id} className="scam-incident-card">
                <div className="flex items-center gap-2 mb-2">
                  <FileWarning className="h-4 w-4 text-warning flex-shrink-0" />
                  <p className="text-xs font-bold text-scam uppercase tracking-wide">{incident.relatedScam}</p>
                </div>
                <h3 className="text-base font-bold text-primary dark:text-white mb-2">{incident.title}</h3>
                <p className="text-sm text-text-secondary dark:text-gray-300 leading-relaxed">{incident.pattern}</p>
                <div className="scam-incident-response">
                  <p className="text-xs font-bold uppercase tracking-wide text-scam mb-1">Your response</p>
                  <p className="text-sm font-medium text-primary dark:text-white leading-relaxed">
                    {incident.whatToDo}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </Section>

      <Section>
        <SectionHeading
          title="Shareable warning templates"
          subtitle="Copy and adapt for WhatsApp groups, staff alerts, or school notices."
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 mb-4">
          {warningTemplates.map((template) => (
            <article key={template.title} className="scam-template-card">
              <div className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4 text-scam flex-shrink-0" />
                <h3 className="font-bold text-primary dark:text-white text-sm">{template.title}</h3>
              </div>
              <blockquote className="scam-template-body">{template.body}</blockquote>
            </article>
          ))}
        </div>
        <p className="text-sm text-text-secondary dark:text-gray-400 text-center max-w-xl mx-auto">
          Verify local reporting numbers before mass distribution in your community.
        </p>
      </Section>

      <Section>
        <div className="africa-section-band p-6 md:p-8">
          <SectionHeading
            title="Report in your country"
            subtitle="Official authority and cybercrime reporting links for each covered country."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {countryReportingLinks.map((country) => (
              <article key={country.slug} className="scam-reporting-card">
                <div className="flex items-start gap-2 mb-2">
                  <MapPin className="h-4 w-4 text-scam flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-primary dark:text-white">
                      <Link to={`/africa/countries/${country.slug}`} className="hover:text-scam transition-colors">
                        {country.name}
                      </Link>
                    </h3>
                    <p className="text-sm text-text-secondary dark:text-gray-300 mt-0.5">{country.authority}</p>
                  </div>
                </div>
                <ul className="space-y-2 text-sm mt-3">
                  {country.authorityUrl && (
                    <li>
                      <a
                        href={country.authorityUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-scam font-semibold inline-flex items-center hover:underline"
                      >
                        Data protection authority <ExternalLink className="h-3.5 w-3.5 ml-1" />
                      </a>
                    </li>
                  )}
                  {country.cybercrimeReportingUrl && (
                    <li>
                      <a
                        href={country.cybercrimeReportingUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-scam font-semibold inline-flex items-center hover:underline"
                      >
                        Cybercrime / police reporting <ExternalLink className="h-3.5 w-3.5 ml-1" />
                      </a>
                    </li>
                  )}
                </ul>
                {country.financialFraudChannel && (
                  <p className="mt-3 text-xs text-text-secondary dark:text-gray-400 leading-relaxed">
                    {country.financialFraudChannel}
                  </p>
                )}
              </article>
            ))}
          </div>
          <p className="text-center mt-6">
            <Link to="/africa/sources" className="text-scam font-semibold hover:underline text-sm">
              View full source register →
            </Link>
          </p>
        </div>
      </Section>

      <Section>
        <div className="rounded-xl border border-border bg-background-secondary dark:bg-background-secondary/50 p-5 md:p-6 text-center">
          <p className="text-sm text-text-secondary dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
            ScamShield is educational guidance — not a substitute for law enforcement or regulated financial advice.
            Always verify reporting channels on official government websites.
          </p>
        </div>
      </Section>
    </AfricaPageLayout>
  );
};

export default ScamShieldAfricaPage;
