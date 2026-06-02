import { useEffect } from 'react';
import { getABConfig, trackABEvent } from '../../ab-test/config';
import VariantALandingPage from './VariantALandingPage';
import VariantBLandingPage from './VariantBLandingPage';

/**
 * VariantRouter
 * Detects the active A/B variant from the environment/subdomain
 * and renders the corresponding landing page.
 *
 * Mount this at /parent to serve as the entry point for both subdomains.
 */
export default function VariantRouter() {
  const config = getABConfig();

  useEffect(() => {
    trackABEvent('landing_viewed', { variant: config.variant });
  }, [config.variant]);

  return config.variant === 'A' ? <VariantALandingPage /> : <VariantBLandingPage />;
}
