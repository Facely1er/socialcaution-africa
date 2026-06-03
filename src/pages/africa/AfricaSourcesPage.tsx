import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, ExternalLink, Landmark, MapPin } from 'lucide-react';
import AfricaPageLayout from './AfricaPageLayout';
import Section from '../../components/common/Section';
import { africaCountries, africaRegions, type ConfidenceLevel } from '../../data/africa/countries';

function confidenceBadgeClass(level: ConfidenceLevel): string {
  if (level === 'verified-official') return 'source-status-badge source-status-badge--verified';
  return 'source-status-badge source-status-badge--pending';
}

function formatConfidence(level: ConfidenceLevel): string {
  return level.replace(/-/g, ' ');
}

const AfricaSourcesPage: React.FC = () => {
  const [region, setRegion] = useState('All');
  const filtered = useMemo(
    () => (region === 'All' ? africaCountries : africaCountries.filter((c) => c.region === region)),
    [region],
  );

  const mvpCount = africaCountries.filter((c) => c.launchStatus === 'MVP').length;

  return (
    <AfricaPageLayout
      title="Source register"
      subtitle="Official authority and law references for the Africa Edition"
      description="Verification register for public-sector, legal, and partner use. Confidence levels reflect source review status."
    >
      <Section>
        <div className="africa-section-band p-5 md:p-6 mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-primary dark:text-white">
              {africaCountries.length} countries · {mvpCount} at MVP launch
            </p>
            <p className="text-sm text-text-secondary dark:text-gray-400 mt-1">
              Filter by region or open a country profile for public-facing guidance.
            </p>
          </div>
          <Link
            to="/africa/countries"
            className="text-sm font-semibold text-accent hover:underline inline-flex items-center gap-1 flex-shrink-0"
          >
            Public country pages <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
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

        <div className="space-y-4">
          {filtered.map((country) => (
            <article key={country.slug} className="source-register-card">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h2 className="text-lg font-bold text-primary dark:text-white">{country.name}</h2>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-background-secondary text-text-secondary font-medium">
                      {country.launchStatus}
                    </span>
                  </div>
                  <p className="text-sm text-text-secondary dark:text-gray-300 flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5 flex-shrink-0" />
                    {country.region} · {country.languages.join(', ')}
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-2 sm:justify-end">
                  <span className={confidenceBadgeClass(country.confidenceLevel)}>
                    {formatConfidence(country.confidenceLevel)}
                  </span>
                  <span className="text-xs text-text-secondary dark:text-gray-400 inline-flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    Reviewed {country.lastVerifiedDate}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                <div className="flex items-start gap-2 text-sm">
                  <Landmark className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-primary dark:text-white text-xs uppercase tracking-wide mb-0.5">
                      Law
                    </p>
                    <p className="text-text-secondary dark:text-gray-300">{country.law}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2 text-sm">
                  <Landmark className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-primary dark:text-white text-xs uppercase tracking-wide mb-0.5">
                      Authority
                    </p>
                    <p className="text-text-secondary dark:text-gray-300">{country.authority}</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-3">
                {country.sourceUrls.map((url) => (
                  <a
                    key={url}
                    href={url}
                    target="_blank"
                    rel="noreferrer"
                    className="source-link-row"
                  >
                    {url.replace(/^https?:\/\//, '')}
                    <ExternalLink className="h-3.5 w-3.5 flex-shrink-0" />
                  </a>
                ))}
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-border/60">
                <Link
                  to={`/africa/countries/${country.slug}`}
                  className="text-sm font-semibold text-accent hover:underline inline-flex items-center gap-1"
                >
                  Public profile <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>

              {country.verificationNote && (
                <p className="source-verification-note">{country.verificationNote}</p>
              )}
            </article>
          ))}
        </div>
      </Section>
    </AfricaPageLayout>
  );
};

export default AfricaSourcesPage;
