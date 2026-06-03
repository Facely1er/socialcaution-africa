import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Globe2, HeartHandshake, Landmark, Mail } from 'lucide-react';
import AfricaPageLayout from './AfricaPageLayout';
import Section from '../../components/common/Section';
import Button from '../../components/common/Button';

const partnershipTiers = [
  {
    tier: 'I',
    title: 'Awareness Partner',
    forAudience: 'NGOs, universities, telecom CSR, regional bodies',
    benefits: [
      'Co-branded page',
      'Up to 3 languages',
      'Annual campaign kit',
      'Aggregate reach reporting',
      '16h/year ERMITS Advisory support',
    ],
    cta: 'Inquire about Tier I',
    highlighted: false,
  },
  {
    tier: 'II',
    title: 'National Edition',
    forAudience: 'Government ministries, regulatory authorities, national digital agencies',
    benefits: [
      'Full white-label',
      'Local hosting option (data sovereignty)',
      'All platform modules',
      'National dashboard',
      'Regulator API integration',
      'Dedicated vCISO support',
      'Annual Digital Trust Report',
    ],
    cta: 'Request National Edition briefing',
    highlighted: true,
  },
  {
    tier: 'III',
    title: 'AU / ECOWAS Edition',
    forAudience: 'AU bodies, ECOWAS Secretariat, development banks, pan-African institutions',
    benefits: [
      'Multi-nation coordination',
      'AU Malabo alignment',
      'Continental benchmarking',
      'Policy brief outputs',
      'Annual Africa Privacy Report co-authorship',
    ],
    cta: 'Discuss continental partnership',
    highlighted: false,
  },
];

const regionalEditions = [
  {
    code: 'CI',
    name: "Côte d'Ivoire",
    authority: 'ARTCI / ANSSI-CI',
    partner: 'Institutional partner: ESATIC (ITU Centre of Excellence)',
    slug: 'cote-divoire',
  },
  {
    code: 'SN',
    name: 'Senegal',
    authority: 'Commission des Données Personnelles (CDP)',
    slug: 'senegal',
  },
  {
    code: 'NG',
    name: 'Nigeria',
    authority: 'NITDA / Nigeria Data Protection Bureau (NDPR)',
    slug: 'nigeria',
  },
  {
    code: 'KE',
    name: 'Kenya + East Africa',
    authority: 'Office of the Data Protection Commissioner (ODPC)',
    slug: 'kenya',
  },
  {
    code: 'MA',
    name: 'North Africa',
    authority: 'CNDP Morocco / INPDP Tunisia',
  },
  {
    code: 'ZA',
    name: 'Southern Africa',
    authority: 'South Africa Information Regulator (POPIA)',
    slug: 'south-africa',
  },
];

function SectionHeading({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="africa-section-heading text-center mx-auto mb-8 md:mb-10">
      <h2>{title}</h2>
      {subtitle && <p className="mx-auto">{subtitle}</p>}
    </div>
  );
}

const AfricaPartnerPage: React.FC = () => (
  <AfricaPageLayout
    title="National Partnership"
    subtitle="Build digital trust infrastructure for your nation"
    description="Three partnership tiers — from co-branded awareness programs to full national white-label deployments."
  >
    <Section>
      <div className="africa-section-band p-5 md:p-6 mb-10 flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="w-11 h-11 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
          <HeartHandshake className="h-6 w-6 text-accent" />
        </div>
        <div>
          <p className="text-sm font-semibold text-primary dark:text-white">
            ERMITS Advisory · Africa Edition partnerships
          </p>
          <p className="text-sm text-text-secondary dark:text-gray-300 mt-1 leading-relaxed">
            Deploy citizen-facing digital safety and privacy guidance under your national authority — with optional
            white-label, local hosting, and regulator integration.
          </p>
        </div>
      </div>

      <SectionHeading
        title="Partnership tiers"
        subtitle="Choose the deployment model that fits your institution's scope and mandate."
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 mb-12 md:mb-14">
        {partnershipTiers.map((tier) => (
          <article
            key={tier.tier}
            className={`partner-tier-card ${tier.highlighted ? 'partner-tier-card--featured' : ''}`}
          >
            {tier.highlighted && <span className="partner-tier-badge">Most popular</span>}
            <p className="text-xs font-bold uppercase tracking-wide text-text-secondary dark:text-gray-400 mb-1">
              Tier {tier.tier}
            </p>
            <h2 className="text-lg md:text-xl font-bold text-primary dark:text-white mb-3">{tier.title}</h2>
            <p className="text-sm text-text-secondary dark:text-gray-300 mb-5 leading-relaxed">
              <span className="font-semibold text-primary dark:text-white">For: </span>
              {tier.forAudience}
            </p>
            <ul className="space-y-2.5 mb-6 flex-grow">
              {tier.benefits.map((benefit) => (
                <li key={benefit} className="partner-benefit-item">
                  {benefit}
                </li>
              ))}
            </ul>
            <Link to="/contact" className="mt-auto">
              <Button variant={tier.highlighted ? 'primary' : 'outline'} fullWidth>
                {tier.cta}
              </Button>
            </Link>
          </article>
        ))}
      </div>

      <div className="africa-section-band p-6 md:p-8 mb-12 md:mb-14">
        <SectionHeading
          title="Regional editions"
          subtitle="Active and planned national deployments across key African regions."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {regionalEditions.map((edition) => {
            const inner = (
              <>
                <div className="flex items-center gap-2 mb-2">
                  <span className="partner-edition-code">{edition.code}</span>
                  <h3 className="font-semibold text-primary dark:text-white">{edition.name}</h3>
                </div>
                <p className="text-sm text-text-secondary dark:text-gray-300 flex items-start gap-1.5">
                  <Landmark className="h-3.5 w-3.5 text-accent flex-shrink-0 mt-0.5" />
                  {edition.authority}
                </p>
                {edition.partner && (
                  <p className="text-xs text-text-secondary dark:text-gray-400 mt-2 leading-relaxed">
                    {edition.partner}
                  </p>
                )}
                {edition.slug && (
                  <span className="inline-flex items-center gap-1 mt-3 text-xs font-semibold text-accent">
                    View edition <ArrowRight className="h-3 w-3" />
                  </span>
                )}
              </>
            );

            return edition.slug ? (
              <Link key={edition.code} to={`/africa/countries/${edition.slug}`} className="partner-edition-card block">
                {inner}
              </Link>
            ) : (
              <article key={edition.code} className="partner-edition-card">
                {inner}
              </article>
            );
          })}
        </div>
      </div>

      <div className="partner-cta-band">
        <div className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-accent/10 mb-4">
          <Mail className="h-5 w-5 text-accent" />
        </div>
        <p className="text-base text-text-secondary dark:text-gray-300 mb-6 max-w-2xl mx-auto leading-relaxed">
          Interested in a national deployment or institutional partnership? Contact ERMITS Advisory to request a
          briefing or demo of the Africa Edition.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link to="/contact">
            <Button variant="primary">Request a briefing</Button>
          </Link>
          <Link to="/africa/sources">
            <Button variant="outline">View source register</Button>
          </Link>
        </div>
        <p className="mt-5 text-xs text-text-secondary dark:text-gray-400 inline-flex items-center gap-1.5">
          <Globe2 className="h-3.5 w-3.5" />
          Deployments available in English and French
        </p>
      </div>
    </Section>
  </AfricaPageLayout>
);

export default AfricaPartnerPage;
