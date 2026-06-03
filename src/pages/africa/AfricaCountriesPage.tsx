import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, ArrowRight, Languages } from 'lucide-react';
import AfricaPageLayout from './AfricaPageLayout';
import Section from '../../components/common/Section';
import Card from '../../components/common/Card';
import { africaCountries, africaRegions } from '../../data/africa/countries';

const AfricaCountriesPage: React.FC = () => {
  const [region, setRegion] = useState('All');
  const filtered = useMemo(
    () => (region === 'All' ? africaCountries : africaCountries.filter((country) => country.region === region)),
    [region],
  );

  return (
    <AfricaPageLayout
      title="Choose your country"
      subtitle="Local laws, authorities, and reporting paths"
      description="Select a country to view data protection law, risk focus, and how to report a complaint."
    >
      <Section>
        <div className="flex flex-wrap gap-2 mb-8">
          {['All', ...africaRegions].map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setRegion(item)}
              className={`africa-filter-chip ${region === item ? 'africa-filter-chip--active' : 'africa-filter-chip--inactive'}`}
            >
              {item}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          {filtered.map((country) => (
            <Card key={country.slug} hover className="p-6 h-full flex flex-col">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <h2 className="text-xl md:text-2xl font-bold text-primary dark:text-white">{country.name}</h2>
                  <p className="text-sm text-text-secondary dark:text-gray-300 mt-1 flex items-center gap-1.5">
                    <Languages className="h-3.5 w-3.5 flex-shrink-0" />
                    {country.region} · {country.languages.join(', ')}
                  </p>
                </div>
              </div>

              <div className="space-y-3 mb-5 flex-grow">
                <p className="text-sm text-text-secondary dark:text-gray-300">
                  <span className="font-semibold text-primary dark:text-white">Law:</span> {country.law}
                </p>
                <p className="text-sm text-text-secondary dark:text-gray-300">
                  <span className="font-semibold text-primary dark:text-white">Authority:</span> {country.authority}
                </p>
              </div>

              <div className="mb-5">
                <h3 className="font-semibold text-primary dark:text-white mb-2 flex items-center gap-2 text-sm">
                  <AlertTriangle className="h-4 w-4 text-accent" /> Priority risks
                </h3>
                <div className="flex flex-wrap gap-2">
                  {country.focusRisks.map((risk) => (
                    <span
                      key={risk}
                      className="text-xs px-2.5 py-1 rounded-full bg-background-secondary text-text-secondary dark:text-gray-300"
                    >
                      {risk}
                    </span>
                  ))}
                </div>
              </div>

              <Link
                to={`/africa/countries/${country.slug}`}
                className="text-accent font-semibold text-sm hover:underline inline-flex items-center gap-1 mt-auto"
              >
                View country profile <ArrowRight className="h-4 w-4" />
              </Link>
            </Card>
          ))}
        </div>
      </Section>
    </AfricaPageLayout>
  );
};

export default AfricaCountriesPage;
