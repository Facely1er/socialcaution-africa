import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import logger from '../../utils/logger';

interface NavigationEvent {
  path: string;
  timestamp: number;
  duration?: number;
  source?: string;
  userAgent?: string;
  screenSize?: string;
}

interface NavigationAnalyticsProps {
  children: React.ReactNode;
}

const NavigationAnalytics: React.FC<NavigationAnalyticsProps> = ({ children }) => {
  const location = useLocation();
  const sessionStartRef = useRef(Date.now());
  const navigationEventsRef = useRef<NavigationEvent[]>([]);
  const lastTrackedPathRef = useRef<string | null>(null);

  // Track page views once per pathname — refs avoid effect ↔ state feedback loops
  useEffect(() => {
    if (lastTrackedPathRef.current === location.pathname) return;
    lastTrackedPathRef.current = location.pathname;

    const now = Date.now();
    const navigationEvent: NavigationEvent = {
      path: location.pathname,
      timestamp: now,
      userAgent: navigator.userAgent,
      screenSize: `${window.screen.width}x${window.screen.height}`,
      source: document.referrer || 'direct',
    };

    const events = navigationEventsRef.current;
    if (events.length > 0) {
      const lastEvent = events[events.length - 1];
      lastEvent.duration = now - lastEvent.timestamp;
    }
    navigationEventsRef.current = [...events, navigationEvent].slice(-50);

    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', 'GA_MEASUREMENT_ID', {
        page_path: location.pathname,
        page_title: document.title,
      });
    }

    try {
      const navigationData = {
        path: location.pathname,
        timestamp: now,
        sessionDuration: now - sessionStartRef.current,
        navigationCount: navigationEventsRef.current.length,
        userAgent: navigator.userAgent,
        screenSize: `${window.screen.width}x${window.screen.height}`,
      };
      const existingData = JSON.parse(localStorage.getItem('navigationAnalytics') || '[]');
      existingData.push(navigationData);
      localStorage.setItem('navigationAnalytics', JSON.stringify(existingData.slice(-100)));
    } catch (error) {
      logger.warn('Failed to store navigation analytics:', error);
    }

    const pathSegments = location.pathname.split('/').filter(Boolean);
    const section = pathSegments[0] || 'home';
    try {
      const sectionData = JSON.parse(localStorage.getItem('sectionAnalytics') || '{}');
      sectionData[section] = (sectionData[section] || 0) + 1;
      localStorage.setItem('sectionAnalytics', JSON.stringify(sectionData));
    } catch (error) {
      logger.warn('Failed to store section analytics:', error);
    }

    const eventsSnapshot = navigationEventsRef.current;
    if (eventsSnapshot.length > 1) {
      const lastPath = eventsSnapshot[eventsSnapshot.length - 2]?.path;
      if (lastPath) {
        const pathTransition = `${lastPath} -> ${location.pathname}`;
        try {
          const transitionData = JSON.parse(localStorage.getItem('transitionAnalytics') || '{}');
          transitionData[pathTransition] = (transitionData[pathTransition] || 0) + 1;
          localStorage.setItem('transitionAnalytics', JSON.stringify(transitionData));
        } catch (error) {
          logger.warn('Failed to store transition analytics:', error);
        }
      }
    }
  }, [location.pathname]);

  // Performance sample — once per route, delayed
  useEffect(() => {
    const timer = window.setTimeout(() => {
      if (!('performance' in window)) return;
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming | undefined;
      if (!navigation) return;

      try {
        const performanceData = {
          path: location.pathname,
          timestamp: Date.now(),
          loadTime: navigation.loadEventEnd - navigation.loadEventStart,
          domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
          firstPaint: performance.getEntriesByName('first-paint')[0]?.startTime || 0,
          firstContentfulPaint: performance.getEntriesByName('first-contentful-paint')[0]?.startTime || 0,
        };
        const existingData = JSON.parse(localStorage.getItem('performanceAnalytics') || '[]');
        existingData.push(performanceData);
        localStorage.setItem('performanceAnalytics', JSON.stringify(existingData.slice(-50)));
      } catch (error) {
        logger.warn('Failed to store performance analytics:', error);
      }
    }, 1000);

    return () => window.clearTimeout(timer);
  }, [location.pathname]);

  return <>{children}</>;
};

export default NavigationAnalytics;
