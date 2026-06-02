import React from 'react';
import { WifiOff } from 'lucide-react';
import { isLocalOnlyMode } from '../../config/runtime';

const LocalOnlyBanner: React.FC = () => {
  if (!isLocalOnlyMode()) return null;

  return (
    <div
      className="bg-slate-100 dark:bg-slate-900/80 border-b border-slate-200 dark:border-slate-700 px-4 py-2"
      role="status"
      aria-live="polite"
    >
      <div className="max-w-7xl mx-auto flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
        <WifiOff className="h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
        <p>
          <span className="font-semibold">Local-first mode</span>
          {' — '}
          No server required. Assessments, Africa guides, and progress are saved in your browser.
        </p>
      </div>
    </div>
  );
};

export default LocalOnlyBanner;
