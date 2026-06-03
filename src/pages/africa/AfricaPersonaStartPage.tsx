import React from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import AfricaPageLayout from './AfricaPageLayout';
import Section from '../../components/common/Section';
import Card from '../../components/common/Card';
import { africaCountries } from '../../data/africa/countries';
import { getAfricaPersonaBySlug } from '../../data/africa/personas';
import { getPersonaVisual } from '../../data/africa/personaVisuals';

const AfricaPersonaStartPage: React.FC = () => {
  const { personaSlug } = useParams();
  const persona = getAfricaPersonaBySlug(personaSlug);
  const mvpCountries = africaCountries.filter((c) => c.launchStatus === 'MVP');

  if (!persona) return <Navigate to="/" replace />;

  const { Icon, iconBg, iconColor, leftAccent } = getPersonaVisual(persona.slug);

  return (
    <AfricaPageLayout
      title="Where are you based?"
      subtitle={`We'll tailor your plan for a ${persona.label.toLowerCase()}`}
      description={persona.description}
    >
      <Section>
        <div className="max-w-2xl mx-auto">
          <Card className={`p-5 mb-8 flex items-center gap-4 border-l-4 ${leftAccent}`}>
            <div className={`w-12 h-12 rounded-xl ${iconBg} flex items-center justify-center flex-shrink-0`}>
              <Icon className={`h-6 w-6 ${iconColor}`} />
            </div>
            <div>
              <div className="font-bold text-primary dark:text-white">{persona.label}</div>
              <div className="text-sm text-text-secondary dark:text-gray-300 mt-0.5">{persona.description}</div>
            </div>
          </Card>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
            {mvpCountries.map((country) => (
              <Link
                key={country.slug}
                to={`/africa/action-center/${country.slug}?persona=${persona.slug}`}
                className="p-4 rounded-xl border border-border bg-card hover:border-accent hover:bg-accent/5 hover:shadow-sm transition-all text-center font-semibold text-primary dark:text-white text-sm"
              >
                {country.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center justify-between text-sm flex-wrap gap-3">
            <Link
              to="/"
              className="text-text-secondary hover:text-primary dark:text-gray-400 flex items-center gap-1.5"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> Back to profiles
            </Link>
            <Link to="/africa/countries" className="text-accent hover:underline font-semibold">
              My country isn&apos;t listed yet →
            </Link>
          </div>
        </div>
      </Section>
    </AfricaPageLayout>
  );
};

export default AfricaPersonaStartPage;
