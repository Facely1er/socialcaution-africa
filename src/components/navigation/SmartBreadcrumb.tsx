import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, ArrowLeft } from 'lucide-react';
import CompactProgressTracker from './CompactProgressTracker';
import { shouldShowPrivacyJourneyProgress } from '../../data/privacyJourneySteps';
import { getChecklist, getGuide } from '../../data/privacyResources';

interface BreadcrumbItem {
  label: string;
  path?: string;
  icon?: React.ComponentType<any>;
  isActive?: boolean;
}

interface SmartBreadcrumbProps {
  items?: BreadcrumbItem[];
  showBackButton?: boolean;
  showProgress?: boolean;
  className?: string;
}

const TOP_LEVEL_SECTIONS: Record<string, { label: string; path: string }> = {
  resources: { label: 'Resources', path: '/resources' },
  personas: { label: 'Personas', path: '/personas' },
  assessment: { label: 'Assessment', path: '/assessment' },
  toolkit: { label: 'Toolkit', path: '/toolkit' },
  dashboard: { label: 'Dashboard', path: '/dashboard' },
  blog: { label: 'Blog', path: '/blog' },
  help: { label: 'Help Center', path: '/help' },
  legal: { label: 'Legal', path: '/privacy' },
  tools: { label: 'Tools', path: '/resources/tools' },
};

/** Matches Navbar dropdown groups — parent label + optional landing path */
const NAV_GROUP_PARENTS: Record<string, { label: string; path?: string }> = {
  // Roadmap dropdown (Navbar)
  '30-day-roadmap': { label: 'Roadmap' },
  'privacy-journey': { label: 'Roadmap' },
  'privacy-action-center': { label: 'Roadmap' },
  assessment: { label: 'Roadmap' },
  // Resources dropdown (Navbar) — sibling pages outside /resources/*
  blog: { label: 'Resources', path: '/resources' },
  help: { label: 'Resources', path: '/resources' },
  contact: { label: 'Resources', path: '/resources' },
  features: { label: 'Resources', path: '/resources' },
  pricing: { label: 'Resources', path: '/resources' },
};

const STANDALONE_ROUTES: Record<string, { label: string; path: string }> = {
  '30-day-roadmap': { label: '30-Day Roadmap', path: '/30-day-roadmap' },
  'privacy-journey': { label: 'Privacy Journey', path: '/privacy-journey' },
  'privacy-action-center': { label: 'Action Center', path: '/privacy-action-center' },
  about: { label: 'About', path: '/about' },
  contact: { label: 'Contact', path: '/contact' },
  features: { label: 'Features', path: '/features' },
  pricing: { label: 'Pricing', path: '/pricing' },
  'privacy-laws': { label: 'Privacy Laws', path: '/privacy-laws' },
  'how-it-works': { label: 'How It Works', path: '/how-it-works' },
  help: { label: 'Help Center', path: '/help' },
  blog: { label: 'Blog', path: '/blog' },
};

const SUBSEGMENT_LABELS: Record<string, string> = {
  guides: 'Guides',
  checklists: 'Checklists',
  tools: 'Tools',
};

const formatSegment = (segment: string): string =>
  segment
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

const resolveResourceLabel = (segment: string, parentSegment?: string): string | null => {
  if (parentSegment === 'guides') {
    return getGuide(segment)?.title ?? null;
  }
  if (parentSegment === 'checklists') {
    return getChecklist(segment)?.title ?? null;
  }
  return null;
};

const SmartBreadcrumb: React.FC<SmartBreadcrumbProps> = ({
  items,
  showBackButton = true,
  showProgress = false,
  className = ''
}) => {
  const location = useLocation();

  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    if (items) return items;

    const pathSegments = location.pathname.split('/').filter(Boolean);
    if (pathSegments.length === 0) return [];

    const [firstSegment, ...restSegments] = pathSegments;

    // Nav dropdown groups (Roadmap, Resources siblings)
    const navParent = NAV_GROUP_PARENTS[firstSegment];
    if (navParent && restSegments.length === 0) {
      const pageLabel =
        STANDALONE_ROUTES[firstSegment]?.label ?? formatSegment(firstSegment);
      return [
        { label: navParent.label, path: navParent.path },
        { label: pageLabel, isActive: true },
      ];
    }

    const sectionRoot = TOP_LEVEL_SECTIONS[firstSegment];

    if (sectionRoot) {
      if (restSegments.length === 0) {
        return [{ label: sectionRoot.label, isActive: true }];
      }

      const breadcrumbs: BreadcrumbItem[] = [
        { label: sectionRoot.label, path: sectionRoot.path },
      ];

      let currentPath = sectionRoot.path;
      restSegments.forEach((segment, index) => {
        currentPath += `/${segment}`;
        const isLast = index === restSegments.length - 1;
        const parentSegment = restSegments[index - 1];
        const label =
          resolveResourceLabel(segment, parentSegment) ??
          SUBSEGMENT_LABELS[segment] ??
          formatSegment(segment);

        breadcrumbs.push({
          label,
          path: isLast ? undefined : currentPath,
          isActive: isLast,
        });
      });

      return breadcrumbs;
    }

    const standaloneRoute = STANDALONE_ROUTES[firstSegment];
    if (standaloneRoute && restSegments.length === 0) {
      return [{ label: standaloneRoute.label, isActive: true }];
    }

    const breadcrumbs: BreadcrumbItem[] = [];
    let currentPath = '';

    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      const isLast = index === pathSegments.length - 1;
      const label =
        STANDALONE_ROUTES[segment]?.label ??
        SUBSEGMENT_LABELS[segment] ??
        formatSegment(segment);

      breadcrumbs.push({
        label,
        path: isLast ? undefined : currentPath,
        isActive: isLast,
      });
    });

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();
  const showJourneyProgress = showProgress && shouldShowPrivacyJourneyProgress(location.pathname);

  // Handle back button click
  const handleBackClick = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      // Fallback to home if no history
      window.location.href = '/';
    }
  };

  return (
    <div className={`flex items-center justify-between gap-4 w-full ${className}`}>
      <div className="flex items-center gap-2 flex-1 min-w-0">
        {/* Back Button */}
        {showBackButton && (
          <motion.button
            onClick={handleBackClick}
            className="flex items-center gap-1 text-gray-600 dark:text-gray-400 hover:text-accent transition-colors p-1 rounded-md hover:bg-gray-100 dark:hover:bg-card-hover flex-shrink-0"
            whileHover={{ x: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="text-sm font-medium hidden sm:inline">
              Back
            </span>
          </motion.button>
        )}

        {/* Breadcrumb Separator */}
        {showBackButton && (
          <div className="w-px h-4 bg-gray-300 dark:bg-gray-600 flex-shrink-0" />
        )}

        {/* Breadcrumb Items */}
        <nav className="flex items-center space-x-1 text-sm min-w-0" aria-label="Breadcrumb navigation">
          {breadcrumbs.map((item, index) => (
            <React.Fragment key={index}>
              {index > 0 && (
                <ChevronRight className="h-4 w-4 text-gray-400 flex-shrink-0" />
              )}

              {item.path ? (
                <Link
                  to={item.path}
                  className="flex items-center gap-1 text-gray-600 dark:text-gray-400 hover:text-accent transition-colors group truncate"
                >
                  {item.icon && (
                    <item.icon className="h-4 w-4 group-hover:scale-110 transition-transform flex-shrink-0" />
                  )}
                  <span className="font-medium group-hover:underline truncate">
                    {item.label}
                  </span>
                </Link>
              ) : (
                <div className="flex items-center gap-1 text-gray-900 dark:text-white truncate">
                  {item.icon && (
                    <item.icon className="h-4 w-4 flex-shrink-0" />
                  )}
                  <span className="font-semibold truncate">
                    {item.label}
                  </span>
                </div>
              )}
            </React.Fragment>
          ))}
        </nav>
      </div>

      {/* Compact Progress Tracker - Always visible when showProgress is true */}
      {showJourneyProgress && (
        <div className="flex items-center gap-3 flex-shrink-0">
          <div className="hidden md:block w-px h-6 bg-gray-300 dark:bg-gray-600" />
          <CompactProgressTracker />
        </div>
      )}
    </div>
  );
};

export default SmartBreadcrumb;