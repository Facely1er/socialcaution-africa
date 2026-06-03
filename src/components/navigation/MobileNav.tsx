import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from '../../lib/motion';
import { Link, useLocation } from 'react-router-dom';
import {
  Menu,
  X,
  Home,
  BookOpen,
  ChevronDown,
  ChevronUp,
  Globe2,
  AlertTriangle,
  MapPin,
  Landmark,
  Scale,
  Info,
} from 'lucide-react';
import { africaFooterGroups, africaHeaderMore } from '../../config/africaEditionNav';
import SearchIcon from './SearchIcon';
import useStore from '../../store/useStore';
import AuthModal from '../auth/AuthModal';

interface MobileNavProps {
  className?: string;
}

const MobileNav: React.FC<MobileNavProps> = ({ className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>('africa');
  const [showAuth, setShowAuth] = useState(false);
  const location = useLocation();
  const store = useStore();
  const { user } = store;

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
    setActiveSection(null);
  }, [location.pathname]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleSection = (section: string) => {
    setActiveSection(activeSection === section ? null : section);
  };

  const navigationSections = [
    {
      id: 'africa',
      title: 'Africa Edition',
      icon: Globe2,
      items: [
        { path: '/', label: 'Home', icon: Home },
        { path: '/africa/countries', label: 'Countries', icon: MapPin },
        { path: '/africa/scamshield', label: 'ScamShield', icon: AlertTriangle },
        { path: '/africa/sources', label: 'Sources', icon: Landmark },
      ],
    },
    {
      id: 'reference',
      title: 'Reference & Legal',
      icon: Scale,
      items: [...africaHeaderMore, ...(africaFooterGroups.find((g) => g.title === 'Legal & ERMITS')?.items ?? [])].filter(
        (item, index, arr) => arr.findIndex((i) => i.path === item.path) === index
      ),
    },
  ];

  const handleSignOut = () => {
    store.signOut();
    setIsOpen(false);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        type="button"
        onClick={toggleMenu}
        className={`md:hidden text-white hover:text-accent transition-colors p-2 ${className}`}
        aria-label="Toggle mobile menu"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Menu Overlay — portaled outside header to avoid nav-header color/height overrides */}
      {createPortal(
        <AnimatePresence>
          {isOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 z-[1100] md:hidden"
                onClick={toggleMenu}
                role="button"
                tabIndex={0}
                aria-label="Close mobile menu"
              />

              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="mobile-nav-drawer fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white dark:bg-card z-[1101] shadow-2xl overflow-y-auto md:hidden"
              >
              <div className="p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    SocialCaution Africa
                  </h2>
                  <button
                    type="button"
                    onClick={toggleMenu}
                    aria-label="Close mobile menu"
                    title="Close mobile menu"
                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                  >
                    <X size={24} />
                  </button>
                </div>

                {/* Search */}
                <div className="mb-6 flex justify-center mobile-nav-search">
                  <SearchIcon />
                </div>

                {/* Navigation Sections */}
                <div className="space-y-2">
                  {navigationSections.map((section) => {
                    const SectionIcon = section.icon;
                    const isActive = activeSection === section.id;
                    
                    return (
                      <div key={section.id}>
                        <button
                          type="button"
                          onClick={() => toggleSection(section.id)}
                          className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-card-hover transition-colors group"
                        >
                          <div className="flex items-center gap-3">
                            <SectionIcon className="h-5 w-5 text-gray-600 dark:text-gray-400 group-hover:text-accent transition-colors" />
                            <span className="font-medium text-gray-900 dark:text-white">
                              {section.title}
                            </span>
                          </div>
                          {isActive ? (
                            <ChevronUp className="h-4 w-4 text-gray-400" />
                          ) : (
                            <ChevronDown className="h-4 w-4 text-gray-400" />
                          )}
                        </button>
                        
                        <AnimatePresence>
                          {isActive && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden"
                            >
                              <div className="pl-8 space-y-1">
                                {section.items.map((item) => {
                                  const ItemIcon = item.icon;
                                  const isCurrentPage = location.pathname === item.path;
                                  
                                  return (
                                    <Link
                                      key={item.path}
                                      to={item.path}
                                      className={`flex items-center gap-3 p-2 rounded-md transition-colors group ${
                                        isCurrentPage
                                          ? 'bg-accent/10 text-accent'
                                          : 'text-gray-600 dark:text-gray-400 hover:text-accent hover:bg-gray-50 dark:hover:bg-card-hover'
                                      }`}
                                    >
                                      <ItemIcon className="h-4 w-4 group-hover:scale-110 transition-transform" />
                                      <span className="text-sm font-medium">
                                        {item.label}
                                      </span>
                                      {isCurrentPage && (
                                        <div className="ml-auto w-2 h-2 bg-accent rounded-full" />
                                      )}
                                    </Link>
                                  );
                                })}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>

                {/* User Actions */}
                <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                  {user ? (
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-card-hover">
                        <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                          <span className="text-white text-sm font-medium">
                            {user.email?.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                            {user.email}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            Signed in
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={handleSignOut}
                        className="w-full flex items-center gap-3 p-3 rounded-lg text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                      >
                        <X className="h-4 w-4" />
                        <span className="text-sm font-medium">
                          Sign Out
                        </span>
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <button
                        type="button"
                        onClick={() => setShowAuth(true)}
                        className="w-full flex items-center justify-center gap-2 p-3 rounded-lg bg-accent text-white hover:bg-accent-dark transition-colors"
                      >
                        <span className="text-sm font-medium">
                          Sign In
                        </span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>,
      document.body
      )}
      
      {showAuth && <AuthModal onClose={() => setShowAuth(false)} defaultMode="signin" />}
    </>
  );
};

export default MobileNav;