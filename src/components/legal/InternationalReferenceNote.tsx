import React from 'react';
import { Link } from 'react-router-dom';
import { Globe2, MapPin } from 'lucide-react';

/** Points stakeholders to Africa regional content before international law pages. */
const InternationalReferenceNote: React.FC = () => (
  <div className="mb-8 p-4 md:p-5 rounded-xl border border-accent/25 bg-accent/5 dark:bg-accent/10">
    <div className="flex flex-col sm:flex-row sm:items-start gap-3">
      <Globe2 className="h-6 w-6 text-accent flex-shrink-0" aria-hidden />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-primary dark:text-white mb-1">
          Africa Edition — start here for regional guidance
        </p>
        <p className="text-sm text-text-secondary dark:text-gray-300 mb-3">
          Country-specific digital safety, scam prevention, and data protection paths live in the Africa hub.
          The sections below are international reference material (EU, US, and global frameworks).
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            to="/africa/countries"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:underline"
          >
            <MapPin className="h-4 w-4" />
            African country profiles
          </Link>
          <Link to="/africa/scamshield" className="text-sm font-semibold text-accent hover:underline">
            ScamShield Africa
          </Link>
          <Link to="/africa/sources" className="text-sm font-semibold text-accent hover:underline">
            Source register
          </Link>
        </div>
      </div>
    </div>
  </div>
);

export default InternationalReferenceNote;
