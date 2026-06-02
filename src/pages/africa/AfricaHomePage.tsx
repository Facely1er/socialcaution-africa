import React from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, Globe2, Landmark, ShieldCheck, Smartphone, Users } from 'lucide-react';
import PageLayout from '../../components/layout/PageLayout';
import Section from '../../components/common/Section';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import { africaCountries, scamTypes } from '../../data/africa/countries';

const pillars = [
  { icon: Smartphone, title: 'Digital Safety', text: 'Practical guidance against mobile money fraud, WhatsApp scams, fake investments, account takeover, and identity theft.' },
  { icon: Landmark, title: 'Privacy & Data Rights', text: 'Country-specific explanations of rights, authorities, complaint channels, and request workflows.' },
  { icon: Users, title: 'Family & School Protection', text: 'Parent, student, teacher, and community-facing resources adapted for African digital realities.' },
  { icon: ShieldCheck, title: 'SME Digital Trust', text: 'Basic privacy, cybersecurity, and customer data protection practices for small organizations.' }
];

const AfricaHomePage: React.FC = () => {
  return (
    <PageLayout
      title="SocialCaution Africa"
      subtitle="Digital Trust & Safety for Africa"
      description="A regional SocialCaution edition focused on online safety, scam prevention, privacy rights, family protection, and SME digital trust across African countries."
      heroBackground
      breadcrumbs={[{ label: 'Africa', path: '/africa' }]}
    >
      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center mb-14">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent font-semibold mb-4">
              <Globe2 className="h-4 w-4" /> Regional Edition
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-primary dark:text-white mb-5">
              Help Africans stay safe, informed, and empowered online.
            </h1>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
              This edition is not only a rights portal. It combines digital safety, scam prevention, data rights, family protection, and SME trust into one regionalized journey.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/africa/countries"><Button>Explore Countries</Button></Link>
              <Link to="/africa/scamshield"><Button variant="outline">Open ScamShield</Button></Link>
              <Link to="/africa/sources"><Button variant="outline">Source Register</Button></Link>
            </div>
          </div>
          <Card className="p-6">
            <h2 className="text-2xl font-bold text-primary dark:text-white mb-4">MVP Country Coverage</h2>
            <div className="space-y-3">
              {africaCountries.map((country) => (
                <Link key={country.slug} to={`/africa/countries/${country.slug}`} className="block p-4 rounded-xl border border-border hover:border-accent transition-colors">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <div className="font-semibold text-primary dark:text-white">{country.name}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-300">{country.region} · {country.law}</div>
                    </div>
                    <span className="text-xs bg-accent/10 text-accent px-2 py-1 rounded-full">{country.launchStatus}</span>
                  </div>
                </Link>
              ))}
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
          {pillars.map((pillar) => (
            <Card key={pillar.title} className="p-6 h-full">
              <pillar.icon className="h-8 w-8 text-accent mb-4" />
              <h3 className="text-xl font-bold text-primary dark:text-white mb-2">{pillar.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{pillar.text}</p>
            </Card>
          ))}
        </div>

        <Card className="p-6 md:p-8 bg-light-blue dark:bg-background-secondary">
          <div className="flex items-start gap-4 mb-6">
            <AlertTriangle className="h-8 w-8 text-accent flex-shrink-0" />
            <div>
              <h2 className="text-2xl font-bold text-primary dark:text-white">Launch with high-engagement safety content first</h2>
              <p className="text-gray-700 dark:text-gray-300 mt-2">
                Rights content builds legitimacy, but safety content drives adoption. The first release should lead with scam prevention and digital trust, then route users into privacy rights and action workflows.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {scamTypes.map((scam) => (
              <div key={scam.title} className="p-4 bg-white dark:bg-card rounded-xl border border-border">
                <h3 className="font-semibold text-primary dark:text-white mb-1">{scam.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{scam.description}</p>
                <p className="text-sm font-medium text-accent">{scam.action}</p>
              </div>
            ))}
          </div>
        </Card>
      </Section>
    </PageLayout>
  );
};

export default AfricaHomePage;
