import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from '../../lib/motion';
import AfricaPageLayout from './AfricaPageLayout';
import Section from '../../components/common/Section';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';

const partnershipTiers = [
  {
    title: 'Tier I — Awareness Partner',
    forAudience: 'NGOs, universities, telecom CSR, regional bodies',
    benefits: [
      'Co-branded page',
      'Up to 3 languages',
      'Annual campaign kit',
      'Aggregate reach reporting',
      '16h/year ERMITS Advisory support',
    ],
    cta: 'Inquire About Tier I',
    highlighted: false,
  },
  {
    title: 'Tier II — National Edition',
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
    cta: 'Request National Edition Briefing',
    highlighted: true,
  },
  {
    title: 'Tier III — AU / ECOWAS Edition',
    forAudience: 'AU bodies, ECOWAS Secretariat, development banks, pan-African institutions',
    benefits: [
      'Multi-nation coordination',
      'AU Malabo alignment',
      'Continental benchmarking',
      'Policy brief outputs',
      'Annual Africa Privacy Report co-authorship',
    ],
    cta: 'Discuss Continental Partnership',
    highlighted: false,
  },
];

const regionalEditions = [
  {
    code: 'CI',
    name: "Côte d'Ivoire",
    authority: 'ARTCI / ANSSI-CI',
    partner: 'Institutional partner: ESATIC (ITU Centre of Excellence)',
  },
  {
    code: 'SN',
    name: 'Senegal',
    authority: 'Commission des Données Personnelles (CDP)',
  },
  {
    code: 'NG',
    name: 'Nigeria',
    authority: 'NITDA / Nigeria Data Protection Bureau (NDPR)',
  },
  {
    code: 'KE',
    name: 'Kenya + East Africa',
    authority: 'Office of the Data Protection Commissioner (ODPC)',
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
  },
];

const AfricaPartnerPage: React.FC = () => (
  <AfricaPageLayout
    title="National Partnership"
    subtitle="Build digital trust infrastructure for your nation"
    description="Three partnership tiers available — from co-branded awareness programs to full national white-label deployments."
  >
    <Section>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14"
      >
        {partnershipTiers.map((tier) => (
          <Card
            key={tier.title}
            className={`p-6 h-full flex flex-col ${tier.highlighted ? 'ring-2 ring-accent' : ''}`}
          >
            <h2 className="text-xl font-bold text-primary dark:text-white mb-3">{tier.title}</h2>
            <p className="text-sm text-text-secondary dark:text-gray-300 mb-4">
              <span className="font-semibold text-text dark:text-white">For: </span>
              {tier.forAudience}
            </p>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300 mb-6 flex-grow">
              {tier.benefits.map((benefit) => (
                <li key={benefit} className="flex items-start gap-2">
                  <span className="text-accent mt-0.5">•</span>
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
            <Link to="/contact">
              <Button variant={tier.highlighted ? 'primary' : 'outline'} className="w-full">
                {tier.cta}
              </Button>
            </Link>
          </Card>
        ))}
      </motion.div>

      <div className="mb-14">
        <h2 className="text-2xl font-bold text-primary dark:text-white mb-2 text-center">
          Regional Editions
        </h2>
        <p className="text-center text-text-secondary dark:text-gray-300 mb-8 max-w-2xl mx-auto">
          Active and planned national deployments across key African regions.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {regionalEditions.map((edition) => (
            <Card key={edition.code} className="p-5">
              <div className="flex items-center gap-2 mb-2">
                <span className="font-mono text-xs font-bold bg-primary/20 text-white px-2 py-0.5 rounded">
                  {edition.code}
                </span>
                <h3 className="font-semibold text-primary dark:text-white">{edition.name}</h3>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                <span className="font-medium">Authority: </span>
                {edition.authority}
              </p>
              {edition.partner && (
                <p className="text-sm text-text-secondary dark:text-gray-400 mt-2">{edition.partner}</p>
              )}
            </Card>
          ))}
        </div>
      </div>

      <Card className="p-8 text-center">
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
          Interested in a national deployment or institutional partnership?
          Contact ERMITS Advisory to request a briefing.
        </p>
        <Link to="/contact">
          <Button variant="primary">Request a Briefing</Button>
        </Link>
      </Card>
    </Section>
  </AfricaPageLayout>
);

export default AfricaPartnerPage;
