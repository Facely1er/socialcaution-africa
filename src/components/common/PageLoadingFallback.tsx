import React from 'react';

/** Shown while lazy routes load — avoids blank main content during navigation. */
const PageLoadingFallback: React.FC = () => (
  <div
    className="flex flex-col items-center justify-center min-h-[40vh] px-4 py-16"
    role="status"
    aria-live="polite"
    aria-label="Loading page"
  >
    <div className="w-10 h-10 rounded-full border-2 border-accent/30 border-t-accent animate-spin mb-4" />
    <p className="text-sm font-medium text-text-secondary dark:text-gray-400">Loading…</p>
  </div>
);

export default PageLoadingFallback;
