import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Globe2, Landmark, ShieldCheck, Smartphone, Users } from 'lucide-react';
import AfricaPageLayout from './AfricaPageLayout';
import Section from '../../components/common/Section';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import PersonaCard from '../../components/africa/PersonaCard';
import { africaCountries, scamTypes } from '../../data/africa/countries';
import { africaPersonas } from '../../data/africa/personas';

const pillars = [
  {
    icon: Smartphone,
    title: 'Digital Safety',
    text: 'Practical guidance against mobile money fraud, WhatsApp scams, fake investments, account takeover, and identity theft.',
    link: '/africa/scamshield',
    cta: 'Open ScamShield',
  },
  {
    icon: Landmark,
    title: 'Privacy & Data Rights',
    text: 'Country-specific explanations of rights, authorities, complaint channels, and request workflows.',
    link: '/africa/countries',
    cta: 'Pick your country',
  },
  {
    icon: Users,
    title: 'Family & School Protection',
    text: 'Parent, student, teacher, and community-facing resources adapted for African digital realities.',
    link: '/africa/personas/start/parent-guardian',
    cta: 'Family & school plan',
  },
  {
    icon: ShieldCheck,
    title: 'SME Digital Trust',
    text: 'Basic privacy, cybersecurity, and customer data protection practices for small organizations.',
    link: '/africa/personas/start/small-business-owner',
    cta: 'SME safety plan',
  },
];

const AfricaHomePage: React.FC = () => {
  const mvpCountries = africaCountries.filter((c) => c.launchStatus === 'MVP');

  return (
    <AfricaPageLayout heroType="minimal" backgroundType="africa">
      <Section>
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent font-semibold text-sm mb-4">
            <Globe2 className="h-4 w-4" /> Africa Edition
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-primary dark:text-white mb-3">
            What describes you best?
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-xl mx-auto">
            Get a privacy and safety plan tailored to your digital life in Africa.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-6">
          {africaPersonas.map((persona) => (
            <PersonaCard key={persona.slug} persona={persona} />
          ))}
        </div>

        <p className="text-center text-sm text-gray-500 dark:text-gray-400 mb-16">
          No account needed · Free · Available in French and English
        </p>
      </Section>

      <Section className="bg-gray-50 dark:bg-background-secondary py-12 rounded-2xl -mx-4 px-4 sm:mx-0 sm:px-8">
        <h2 className="text-2xl font-bold text-primary dark:text-white mb-2 text-center">What you get</h2>
        <p className="text-gray-600 dark:text-gray-300 text-center mb-8 max-w-2xl mx-auto">
          Four pillars of digital trust — each links to a concrete next step.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar) => (
            <Card key={pillar.title} className="p-6 h-full flex flex-col">
              <pillar.icon className="h-8 w-8 text-accent mb-4" />
              <h3 className="text-xl font-bold text-primary dark:text-white mb-2">{pillar.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 flex-grow">{pillar.text}</p>
              <div className="mt-4 pt-4 border-t border-border">
                <Link
                  to={pillar.link}
                  className="text-sm font-semibold text-accent hover:underline flex items-center gap-1"
                >
                  {pillar.cta} <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      <Section>
        <Card className="p-6 md:p-8 mb-12">
          <h2 className="text-xl font-bold text-primary dark:text-white mb-3">ScamShield Africa</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            Start with practical scam awareness — mobile money fraud, WhatsApp impersonation, and more.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {scamTypes.slice(0, 4).map((scam) => (
              <div key={scam.title} className="p-4 bg-white dark:bg-card rounded-xl border border-border">
                <h3 className="font-semibold text-primary dark:text-white mb-1">{scam.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">{scam.description}</p>
              </div>
            ))}
          </div>
          <Link to="/africa/scamshield">
            <Button variant="outline">Open ScamShield guide</Button>
          </Link>
        </Card>

        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-primary dark:text-white">Country coverage</h2>
          <Link
            to="/africa/countries"
            className="text-accent font-semibold text-sm hover:underline flex items-center gap-1"
          >
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="flex flex-wrap gap-3">
          {mvpCountries.map((c) => (
            <Link
              key={c.slug}
              to={`/africa/countries/${c.slug}`}
              className="px-4 py-2 rounded-full border border-border hover:border-accent hover:text-accent transition-colors text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              {c.name}
            </Link>
          ))}
        </div>
      </Section>
    </AfricaPageLayout>
  );
};

export default AfricaHomePage;
