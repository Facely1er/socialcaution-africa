import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from '../../lib/motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, LogOut, User } from 'lucide-react';
import { africaMobileNavItems } from '../../config/africaEditionNav';
import { isEditionNavActive } from '../../utils/editionNav';
import ThemeSwitcher from '../ThemeSwitcher';
import useStore from '../../store/useStore';
import AuthModal from '../auth/AuthModal';

interface MobileNavProps {
  className?: string;
}

const MobileNav: React.FC<MobileNavProps> = ({ className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useStore();

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleSignOut = () => {
    signOut();
    setIsOpen(false);
    navigate('/');
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        className={`lg:hidden text-white hover:bg-white/10 rounded-md p-2 transition-colors ${className}`}
        aria-expanded={isOpen}
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
      >
        {isOpen ? <X size={22} aria-hidden /> : <Menu size={22} aria-hidden />}
      </button>

      {createPortal(
        <AnimatePresence>
          {isOpen && (
            <>
              <motion.button
                type="button"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 z-[1100] lg:hidden border-0 cursor-default"
                onClick={() => setIsOpen(false)}
                aria-label="Close menu"
              />

              <motion.nav
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 28, stiffness: 280 }}
                className="mobile-nav-drawer fixed top-0 right-0 h-full w-[min(20rem,88vw)] bg-white dark:bg-card z-[1101] shadow-2xl overflow-y-auto lg:hidden flex flex-col"
                aria-label="Mobile navigation"
              >
                <div className="flex items-center justify-between p-4 border-b border-border">
                  <p className="font-bold text-primary dark:text-white text-base">SocialCaution Africa</p>
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="p-2 rounded-md text-gray-500 hover:bg-gray-100 dark:hover:bg-card-hover"
                    aria-label="Close menu"
                  >
                    <X size={22} />
                  </button>
                </div>

                <div className="p-4 border-b border-border flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Theme</span>
                  <ThemeSwitcher
                    showLabel
                    className="!text-gray-800 dark:!text-gray-100 hover:!bg-gray-100 dark:hover:!bg-card-hover"
                  />
                </div>

                <ul className="flex-1 p-3 space-y-0.5 overflow-y-auto">
                  {africaMobileNavItems.map(({ path, label, icon: Icon }) => {
                    const active = isEditionNavActive(location.pathname, path);
                    return (
                      <li key={path}>
                        <Link
                          to={path}
                          className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                            active
                              ? 'bg-accent/15 text-accent'
                              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-card-hover'
                          }`}
                        >
                          <Icon className="h-5 w-5 flex-shrink-0 text-accent" aria-hidden />
                          {label}
                          {active && (
                            <span className="ml-auto h-2 w-2 rounded-full bg-accent" aria-hidden />
                          )}
                        </Link>
                      </li>
                    );
                  })}
                </ul>

                <div className="p-4 border-t border-border mt-auto">
                  {user ? (
                    <div className="space-y-3">
                      <p className="text-xs text-gray-500 truncate px-1">{user.email}</p>
                      <button
                        type="button"
                        onClick={handleSignOut}
                        className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg border border-red-200 text-red-600 dark:border-red-800 dark:text-red-400 text-sm font-medium"
                      >
                        <LogOut className="h-4 w-4" />
                        Sign out
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setShowAuth(true)}
                      className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-accent text-white text-sm font-medium"
                    >
                      <User className="h-4 w-4" />
                      Sign in
                    </button>
                  )}
                </div>
              </motion.nav>
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
