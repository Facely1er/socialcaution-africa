import { Link } from 'react-router-dom';
import { AlertTriangle, MapPin } from 'lucide-react';
import Card from '../common/Card';

/** Shown on assessment flows in the Africa Edition (beta localization). */
export default function AfricaAssessmentBanner() {
  return (
    <Card className="p-4 mb-6 border-2 border-accent/25 bg-accent/5">
      <div className="flex items-start gap-3">
        <AlertTriangle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
        <div className="text-sm">
          <p className="font-semibold text-primary dark:text-white mb-1">
            Africa Edition — assessment beta
          </p>
          <p className="text-gray-600 dark:text-gray-300">
            Questions include mobile money, WhatsApp scams, SIM registration, and African data-protection
            frameworks. For country-specific laws and reporting paths, use your{' '}
            <Link to="/africa/countries" className="text-accent font-semibold hover:underline inline-flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5" />
              country profile
            </Link>
            .
          </p>
        </div>
      </div>
    </Card>
  );
}
