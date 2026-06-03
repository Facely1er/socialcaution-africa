import React from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Users } from 'lucide-react';
import AfricaPageLayout from './AfricaPageLayout';
import Section from '../../components/common/Section';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import { getAfricaCountryBySlug } from '../../data/africa/countries';
import { getRecommendedPersonasForCountry } from '../../data/africa/personas';

const AfricaPersonasPage: React.FC = () => {
  const { countrySlug } = useParams();
  const country = getAfricaCountryBySlug(countrySlug);

  if (!country) return <Navigate to="/africa/countries" replace />;

  const personas = getRecommendedPersonasForCountry(country);

  return (
    <AfricaPageLayout
      title={`${country.name} User Profiles`}
      subtitle="Africa-specific persona routing"
      description={`Select the user profile that best matches your digital safety and privacy context in ${country.name}.`}
    >
      <Section>
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent font-semibold mb-4">
            <Users className="h-4 w-4" /> Country-aware journey
          </div>
          <p className="text-gray-700 dark:text-gray-300">
            Choose the profile that best matches your situation in {country.name}. Your selection opens a tailored action plan in the Digital Rights &amp; Safety Action Center.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {personas.map((persona) => (
            <Card key={persona.slug} className="p-6 h-full flex flex-col">
              <div className="flex items-start gap-3 mb-4">
                <div className="p-3 rounded-full bg-accent/10 text-accent">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-primary dark:text-white">{persona.label}</h2>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{persona.description}</p>
                </div>
              </div>

              <div className="mb-4">
                <h3 className="font-semibold text-primary dark:text-white mb-2">Priority risks</h3>
                <div className="flex flex-wrap gap-2">
                  {persona.priorityRisks.map((risk) => (
                    <span key={risk} className="text-xs px-2 py-1 rounded-full bg-gray-100 dark:bg-background-secondary text-gray-700 dark:text-gray-300">
                      {risk}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mb-5 flex-grow">
                <h3 className="font-semibold text-primary dark:text-white mb-2">First actions</h3>
                <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  {persona.primaryActions.slice(0, 3).map((action) => <li key={action}>• {action}</li>)}
                </ul>
              </div>

              <Link to={`/africa/action-center/${country.slug}?persona=${persona.slug}`}>
                <Button fullWidth>
                  Continue to Action Center
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </Card>
          ))}
        </div>
      </Section>
    </AfricaPageLayout>
  );
};

export default AfricaPersonasPage;
