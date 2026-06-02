import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home, LayoutDashboard } from 'lucide-react';
import { motion } from 'framer-motion';

interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface BreadcrumbProps {
  items?: BreadcrumbItem[];
  className?: string;
  variant?: 'default' | 'dashboard';
  /** Dashboard: style the current (last) crumb as the page heading on desktop */
  showCurrentAsTitle?: boolean;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({
  items,
  className = '',
  variant = 'default',
  showCurrentAsTitle = false,
}) => {
  const location = useLocation();
  
  // Auto-generate breadcrumbs from path if not provided
  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    if (items) return items;
    
    const pathSegments = location.pathname.split('/').filter(Boolean);
    const breadcrumbs: BreadcrumbItem[] = [];
    
    pathSegments.forEach((segment, index) => {
      const path = '/' + pathSegments.slice(0, index + 1).join('/');
      
      const label = segment
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      
      breadcrumbs.push({ label, path });
    });
    
    return breadcrumbs;
  };
  
  const breadcrumbItems = generateBreadcrumbs();
  
  if (breadcrumbItems.length === 0) return null;

  const isDashboard = variant === 'dashboard';
  const RootIcon = isDashboard ? LayoutDashboard : Home;
  const rootHref = isDashboard ? '/dashboard' : '/';
  const rootLabel = isDashboard ? 'Dashboard' : 'Home';

  // Avoid "Dashboard > Dashboard > …" when pages pass Dashboard as the first crumb
  const trailItems =
    isDashboard && breadcrumbItems[0]?.label === 'Dashboard'
      ? breadcrumbItems.slice(1)
      : breadcrumbItems;

  const navClassName = isDashboard
    ? showCurrentAsTitle
      ? `dashboard-breadcrumb flex flex-col items-start gap-y-0.5 text-sm min-w-0 max-w-full w-full ${className}`
      : `dashboard-breadcrumb flex flex-wrap items-center gap-x-1.5 gap-y-1 text-sm min-w-0 max-w-full w-full ${className}`
    : `flex flex-wrap items-center gap-x-2 gap-y-1 text-sm min-w-0 max-w-full ${className}`;

  const linkClassName = isDashboard
    ? 'text-text-secondary dark:text-text-secondary hover:text-accent dark:hover:text-accent transition-colors truncate max-w-[12rem] sm:max-w-none'
    : 'text-text-secondary dark:text-text-secondary hover:text-accent dark:hover:text-accent transition-colors';

  const currentClassName =
    isDashboard && showCurrentAsTitle
      ? 'dashboard-title truncate block mt-0.5'
      : isDashboard
        ? 'text-text dark:text-text font-semibold truncate'
        : 'text-text dark:text-text font-medium';

  const NavWrapper = isDashboard ? 'nav' : motion.nav;
  const navProps = isDashboard
    ? { className: navClassName, 'aria-label': 'Breadcrumb' as const }
    : {
        initial: { opacity: 0, y: -10 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.3 },
        className: navClassName,
        'aria-label': 'Breadcrumb' as const,
      };

  return (
    <NavWrapper {...navProps}>
      <Link
        to={rootHref}
        className={`inline-flex items-center shrink-0 ${linkClassName}`}
        aria-label={rootLabel}
      >
        <RootIcon className="h-4 w-4" />
        {isDashboard && (
          <span className="sr-only">{rootLabel}</span>
        )}
      </Link>

      {trailItems.map((item, index) => (
        <React.Fragment key={`${item.label}-${index}`}>
          <ChevronRight className="h-4 w-4 text-text-secondary dark:text-text-secondary shrink-0" aria-hidden="true" />
          {index === trailItems.length - 1 ? (
            <span className={currentClassName}>{item.label}</span>
          ) : (
            <Link to={item.path!} className={linkClassName}>
              {item.label}
            </Link>
          )}
        </React.Fragment>
      ))}
    </NavWrapper>
  );
};

export default Breadcrumb;