import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Globe2, Landmark, ShieldCheck, Smartphone, Users } from 'lucide-react';
import AfricaPageLayout from './AfricaPageLayout';
import Section from '../../components/common/Section';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import PersonaCard from '../../components/africa/PersonaCard';
import { designSystem } from '../../styles/design-system';
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
      <Section fullWidth className="africa-hero-band pt-10 pb-14 md:pt-14 md:pb-16 !py-0">
        <div className={`${designSystem.layout.contentShell} py-10 md:py-14`}>
          <div className="text-center mb-10 md:mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 text-accent font-semibold text-sm mb-5">
              <Globe2 className="h-4 w-4" /> Africa Edition
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary dark:text-white mb-4 leading-tight">
              What describes you best?
            </h1>
            <p className="text-lg md:text-xl text-text-secondary dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Get a privacy and safety plan tailored to your digital life — no account needed.
            </p>
          </div>

          <div className={`${designSystem.grid.personas} gap-4 md:gap-5 mb-8`}>
            {africaPersonas.map((persona) => (
              <PersonaCard key={persona.slug} persona={persona} />
            ))}
          </div>

          <p className="text-center text-sm text-text-secondary dark:text-gray-400">
            Free · Available in French and English · Takes about 2 minutes
          </p>
        </div>
      </Section>

      <Section>
        <div className={`africa-section-band p-6 md:p-10`}>
          <div className="text-center mb-8 md:mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-primary dark:text-white mb-2">What you get</h2>
            <p className="text-text-secondary dark:text-gray-300 max-w-2xl mx-auto">
              Four pillars of digital trust — each links to a concrete next step.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
            {pillars.map((pillar) => (
              <Card key={pillar.title} hover className="p-6 h-full flex flex-col bg-card">
                <div className="w-11 h-11 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                  <pillar.icon className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-lg font-bold text-primary dark:text-white mb-2">{pillar.title}</h3>
                <p className="text-sm text-text-secondary dark:text-gray-300 flex-grow leading-relaxed">{pillar.text}</p>
                <div className="mt-5 pt-4 border-t border-border/60">
                  <Link
                    to={pillar.link}
                    className="text-sm font-semibold text-accent hover:underline inline-flex items-center gap-1.5"
                  >
                    {pillar.cta} <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </Section>

      <Section>
        <Card className="p-6 md:p-8 mb-12 border-l-4 border-l-accent overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-6">
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-primary dark:text-white mb-2">ScamShield Africa</h2>
              <p className="text-text-secondary dark:text-gray-300 max-w-xl">
                Start with practical scam awareness — mobile money fraud, WhatsApp impersonation, and more.
              </p>
            </div>
            <Link to="/africa/scamshield" className="flex-shrink-0">
              <Button variant="outline">Open full guide</Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {scamTypes.slice(0, 4).map((scam) => (
              <div
                key={scam.title}
                className="p-4 rounded-xl bg-background-secondary dark:bg-background border border-border/60"
              >
                <h3 className="font-semibold text-primary dark:text-white mb-1">{scam.title}</h3>
                <p className="text-sm text-text-secondary dark:text-gray-300 leading-relaxed">{scam.description}</p>
              </div>
            ))}
          </div>
        </Card>

        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-primary dark:text-white">Country coverage</h2>
            <p className="text-sm text-text-secondary dark:text-gray-400 mt-1">Six countries at launch — more coming soon</p>
          </div>
          <Link
            to="/africa/countries"
            className="text-accent font-semibold text-sm hover:underline flex items-center gap-1 flex-shrink-0"
          >
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="flex flex-wrap gap-3">
          {mvpCountries.map((c) => (
            <Link key={c.slug} to={`/africa/countries/${c.slug}`} className="africa-country-pill">
              {c.name}
            </Link>
          ))}
        </div>
      </Section>
    </AfricaPageLayout>
  );
};

export default AfricaHomePage;
