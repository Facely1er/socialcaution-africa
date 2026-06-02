import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import DemoModeBanner from './DemoModeBanner';
import DashboardNav from './DashboardNav';
import { getDashboardPageMeta } from '../../utils/dashboardPageTitles';

interface ModernDashboardLayoutProps {
  children: React.ReactNode;
}

const ModernDashboardLayout: React.FC<ModernDashboardLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const pageMeta = getDashboardPageMeta(location.pathname);
  const mobilePageTitle = pageMeta?.title ?? 'Dashboard';
  const mobilePageSubtitle = pageMeta?.subtitle;

  return (
    <div className="min-h-[calc(100vh-var(--nav-header-height))] bg-background-secondary dark:bg-background-secondary transition-colors duration-200">
      <a
        href="#dashboard-main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-[calc(var(--nav-header-height)+0.5rem)] focus:left-4 focus:z-[9999] focus:px-6 focus:py-3 focus:bg-accent focus:text-white focus:rounded-lg focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-accent-dark focus:ring-offset-2 font-medium"
        aria-label="Skip to main content"
      >
        Skip to main content
      </a>

      <DemoModeBanner />

      <div className="dashboard-mobile-toolbar md:hidden sticky top-[var(--nav-header-height)] z-30 flex items-center gap-2 px-3 bg-card dark:bg-card border-b border-border dark:border-border min-w-0">
        <div className="flex-1 min-w-0 py-1">
          <h1 className="text-sm font-semibold text-text dark:text-text truncate leading-tight">
            {mobilePageTitle}
          </h1>
          {mobilePageSubtitle && (
            <p className="text-xs text-text-secondary dark:text-text-secondary truncate leading-tight mt-0.5">
              {mobilePageSubtitle}
            </p>
          )}
        </div>
        <button
          type="button"
          className="dashboard-mobile-menu-btn shrink-0"
          onClick={() => setSidebarOpen(true)}
          aria-label="Open dashboard menu"
        >
          <Menu className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>

      <div className="flex min-h-[calc(100vh-var(--nav-header-height))] relative">
        <AnimatePresence>
          {sidebarOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden top-[var(--nav-header-height)]"
              onClick={() => setSidebarOpen(false)}
            />
          )}
        </AnimatePresence>

        <motion.aside
          initial={false}
          className={`fixed md:sticky top-[var(--nav-header-height)] left-0 h-[calc(100vh-var(--nav-header-height))] w-64 modern-sidebar z-50 md:z-10 transition-transform duration-300 flex-shrink-0 border-r border-border dark:border-border bg-card dark:bg-card ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
          }`}
        >
          <div className="flex items-center justify-between px-3 py-1.5 border-b border-border dark:border-border md:hidden">
            <span className="text-sm font-semibold text-text dark:text-text">Menu</span>
            <button
              type="button"
              className="dashboard-mobile-menu-btn"
              onClick={() => setSidebarOpen(false)}
              aria-label="Close dashboard menu"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
          <DashboardNav />
        </motion.aside>

        <div className="flex-1 w-full min-w-0 overflow-x-hidden">
          <main
            id="dashboard-main"
            className="px-3 md:px-6 pb-4 md:pb-6 pt-0 md:pt-6 bg-background-secondary dark:bg-background-secondary min-h-[calc(100vh-var(--nav-header-height))]"
            role="main"
          >
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="w-full"
            >
              {children}
            </motion.div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default ModernDashboardLayout;
