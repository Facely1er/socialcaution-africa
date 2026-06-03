import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { AFRICA_EDITION } from '../../config/africaEditionNav';

interface NavigationOptimizerProps {
  children: React.ReactNode;
}

const prefetchedHrefs = new Set<string>();

const AFRICA_LIKELY_PAGES: Record<string, string[]> = {
  '/': ['/africa/countries', '/africa/scamshield', '/africa/partner'],
  '/africa/countries': ['/africa/scamshield', '/africa/partner'],
  '/africa/scamshield': ['/africa/countries', '/africa/sources'],
  '/africa/partner': ['/contact', '/africa/sources'],
};

const NavigationOptimizer: React.FC<NavigationOptimizerProps> = ({ children }) => {
  const location = useLocation();
  const imageObserverRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (!AFRICA_EDITION) return;

    const pagesToPreload = AFRICA_LIKELY_PAGES[location.pathname] ?? [];
    pagesToPreload.forEach((page) => {
      if (prefetchedHrefs.has(page)) return;
      prefetchedHrefs.add(page);
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = page;
      document.head.appendChild(link);
    });
  }, [location.pathname]);

  useEffect(() => {
    imageObserverRef.current?.disconnect();

    const images = document.querySelectorAll('img[data-src]');
    if (images.length === 0) return;

    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const img = entry.target as HTMLImageElement;
        img.src = img.dataset.src || '';
        img.removeAttribute('data-src');
        imageObserver.unobserve(img);
      });
    });

    images.forEach((img) => imageObserver.observe(img));
    imageObserverRef.current = imageObserver;

    return () => imageObserver.disconnect();
  }, [location.pathname]);

  return <>{children}</>;
};

export default NavigationOptimizer;
