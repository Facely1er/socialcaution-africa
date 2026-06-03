import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import AfricaPageLayout from './AfricaPageLayout';
import Section from '../../components/common/Section';
import Card from '../../components/common/Card';
import { africaCountries, africaRegions } from '../../data/africa/countries';

const AfricaCountriesPage: React.FC = () => {
  const [region, setRegion] = useState('All');
  const filtered = useMemo(() => region === 'All' ? africaCountries : africaCountries.filter((country) => country.region === region), [region]);

  return (
    <AfricaPageLayout title="Africa Country Selector" subtitle="Country-specific digital safety and privacy guidance" description="Select a country to view local data protection law, authority, risk focus, and reporting paths.">
      <Section>
        <div className="flex flex-wrap gap-2 mb-8">
          {['All', ...africaRegions].map((item) => (
            <button key={item} onClick={() => setRegion(item)} className={`px-4 py-2 rounded-full border transition-colors ${region === item ? 'bg-accent text-white border-accent' : 'border-border text-primary dark:text-white hover:border-accent'}`}>
              {item}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map((country) => (
            <Card key={country.slug} className="p-6 h-full">
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <h2 className="text-2xl font-bold text-primary dark:text-white">{country.name}</h2>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{country.region} · {country.languages.join(', ')}</p>
                </div>
                <span className="text-xs bg-accent/10 text-accent px-2 py-1 rounded-full">{country.launchStatus}</span>
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-4"><strong>Law:</strong> {country.law}</p>
              <p className="text-gray-700 dark:text-gray-300 mb-4"><strong>Authority:</strong> {country.authority}</p>
              <div className="mb-5">
                <h3 className="font-semibold text-primary dark:text-white mb-2 flex items-center gap-2"><Search className="h-4 w-4 text-accent" /> Risk focus</h3>
                <div className="flex flex-wrap gap-2">
                  {country.focusRisks.map((risk) => <span key={risk} className="text-xs px-2 py-1 rounded-full bg-gray-100 dark:bg-background-secondary text-gray-700 dark:text-gray-300">{risk}</span>)}
                </div>
              </div>
              <Link to={`/africa/countries/${country.slug}`} className="text-accent font-semibold hover:underline">View country page →</Link>
            </Card>
          ))}
        </div>
      </Section>
    </AfricaPageLayout>
  );
};

export default AfricaCountriesPage;
