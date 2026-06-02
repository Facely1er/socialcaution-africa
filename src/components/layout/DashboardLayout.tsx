import React from 'react';
import { useLocation } from 'react-router-dom';
import { getDashboardPageMeta } from '../../utils/dashboardPageTitles';

interface DashboardLayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
}

/**
 * Desktop page header only. Mobile title/subtitle are in ModernDashboardLayout toolbar.
 */
const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  title,
  subtitle,
}) => {
  const location = useLocation();
  const meta = getDashboardPageMeta(location.pathname);
  const pageTitle = title ?? meta?.title;
  const pageSubtitle = subtitle ?? meta?.subtitle;

  return (
    <div className="w-full min-w-0 max-w-full">
      {pageTitle && (
        <header className="dashboard-header mb-4 md:mb-6 min-w-0 max-w-full">
          <h1 className="dashboard-title">{pageTitle}</h1>
          {pageSubtitle && (
            <p className="dashboard-subtitle mt-1">{pageSubtitle}</p>
          )}
        </header>
      )}

      <div className="dashboard-page-content w-full min-w-0 max-w-full">
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
