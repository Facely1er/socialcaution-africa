import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { LogOut, Menu, User, X } from 'lucide-react';
import { africaMobileNavSections } from '../../config/africaEditionNav';
import {
  MOBILE_NAV_DRAWER_ID,
  MOBILE_NAV_DRAWER_TITLE_ID,
  mobileDrawerLinkClasses,
  setMobileNavOpen,
} from '../layout/headerNav';
import ThemeSwitcher from '../ThemeSwitcher';
import useStore from '../../store/useStore';
import AuthModal from '../auth/AuthModal';
import {
  ariaExpandedFalse,
  ariaExpandedTrue,
  ariaHiddenFalse,
  ariaHiddenTrue,
  ariaModalTrue,
} from '../../utils/aria';

type MobileNavProps = {
  className?: string;
};

export default function MobileNav({ className = '' }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useStore();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const wasOpenRef = useRef(false);

  const close = useCallback(() => setIsOpen(false), []);
  const open = useCallback(() => setIsOpen(true), []);

  useEffect(() => {
    close();
  }, [location.pathname, close]);

  useEffect(() => {
    setMobileNavOpen(isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      setMobileNavOpen(false);
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      closeButtonRef.current?.focus();
    } else if (wasOpenRef.current) {
      menuButtonRef.current?.focus();
    }
    wasOpenRef.current = isOpen;
  }, [isOpen]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) close();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [isOpen, close]);

  const handleSignOut = () => {
    signOut();
    close();
    navigate('/');
  };

  const drawer = createPortal(
    <div className={`mobile-nav-root${isOpen ? ' mobile-nav-root--open' : ''}`}>
      {isOpen ? (
        <div
          className="mobile-nav-overlay"
          onClick={close}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault();
              close();
            }
          }}
          role="presentation"
          tabIndex={-1}
        />
      ) : null}
      <div
        ref={drawerRef}
        id={MOBILE_NAV_DRAWER_ID}
        className={`mobile-nav-drawer${isOpen ? ' mobile-nav-drawer--open' : ' mobile-nav-drawer--closed'}`}
        {...(isOpen ? ariaHiddenFalse : ariaHiddenTrue)}
        {...(isOpen
          ? {
              role: 'dialog' as const,
              ...ariaModalTrue,
              'aria-labelledby': MOBILE_NAV_DRAWER_TITLE_ID,
            }
          : {})}
      >
        <div className="mobile-nav-drawer__header">
          <h2 id={MOBILE_NAV_DRAWER_TITLE_ID} className="mobile-nav-drawer__title">
            Menu
          </h2>
          <button
            ref={closeButtonRef}
            type="button"
            className="mobile-nav-drawer__close"
            onClick={close}
            aria-label="Close menu"
          >
            <X size={22} aria-hidden />
          </button>
        </div>

        <div className="mobile-nav-drawer__theme">
          <span id="mobile-nav-theme-label" className="mobile-nav-drawer__theme-label">
            Appearance
          </span>
          <ThemeSwitcher
            showLabel
            className="mobile-nav-drawer__theme-switch"
            ariaDescribedBy="mobile-nav-theme-label"
          />
        </div>

        <div className="mobile-nav-drawer__scroll">
          {africaMobileNavSections.map((section) => (
            <section
              key={section.id}
              className="mobile-nav-drawer__section"
              aria-labelledby={`mobile-nav-section-${section.id}`}
            >
              <h3 id={`mobile-nav-section-${section.id}`} className="mobile-nav-drawer__section-title">
                {section.title}
              </h3>
              <ul className="mobile-nav-drawer__list">
                {section.items.map(({ path, label, icon: Icon }) => (
                  <li key={path}>
                    <NavLink
                      to={path}
                      end={path === '/'}
                      className={({ isActive }) => mobileDrawerLinkClasses(isActive)}
                      onClick={close}
                      tabIndex={isOpen ? undefined : -1}
                    >
                      <Icon className="mobile-nav-drawer__icon" aria-hidden />
                      <span className="mobile-nav-drawer__label">{label}</span>
                    </NavLink>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <div className="mobile-nav-drawer__footer">
          {user ? (
            <>
              <p className="mobile-nav-drawer__email">{user.email}</p>
              <button
                type="button"
                className="mobile-nav-drawer__signout"
                onClick={handleSignOut}
                tabIndex={isOpen ? undefined : -1}
              >
                <LogOut className="h-4 w-4" aria-hidden />
                Sign out
              </button>
            </>
          ) : (
            <button
              type="button"
              className="mobile-nav-drawer__signin"
              onClick={() => {
                close();
                setShowAuth(true);
              }}
              tabIndex={isOpen ? undefined : -1}
            >
              <User className="h-4 w-4" aria-hidden />
              Sign in
            </button>
          )}
        </div>
      </div>
    </div>,
    document.body
  );

  return (
    <>
      <button
        ref={menuButtonRef}
        type="button"
        className={`header-mobile-menu-btn lg:hidden ${className}`.trim()}
        onClick={() => (isOpen ? close() : open())}
        {...(isOpen ? ariaExpandedTrue : ariaExpandedFalse)}
        aria-controls={MOBILE_NAV_DRAWER_ID}
        aria-haspopup="dialog"
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
      >
        {isOpen ? <X size={22} aria-hidden /> : <Menu size={22} aria-hidden />}
      </button>

      {drawer}

      {showAuth && <AuthModal onClose={() => setShowAuth(false)} defaultMode="signin" />}
    </>
  );
}
