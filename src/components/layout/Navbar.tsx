import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Home, LogOut, ChevronDown, User, LucideIcon, MoreHorizontal } from 'lucide-react';
import Logo from '../common/Logo';
import useStore from '../../store/useStore';
import AuthModal from '../auth/AuthModal';
import Button from '../common/Button';
import ThemeSwitcher from '../ThemeSwitcher';
import MobileNav from '../navigation/MobileNav';
import { africaHeaderMore, africaHeaderNav } from '../../config/africaEditionNav';

interface NavItem {
  path: string;
  label: string;
  icon: LucideIcon;
}

const MoreDropdown = ({ items }: { items: NavItem[] }) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    if (open) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  const toggleOpen = () => setOpen(!open);
  const buttonClassName =
    'header-nav-item flex items-center gap-1 text-white hover:bg-white/5 px-1.5 py-1.5 rounded-md transition-all duration-200 whitespace-nowrap focus-visible:ring-2 focus-visible:ring-accent';
  const buttonContent = (
    <>
      <MoreHorizontal className="h-4 w-4 text-accent flex-shrink-0" />
      <span className="text-sm">More</span>
      <ChevronDown
        className={`h-4 w-4 text-accent flex-shrink-0 transition-transform ${open ? 'rotate-180' : ''}`}
      />
    </>
  );

  return (
    <div className="relative dropdown-container" ref={dropdownRef}>
      {open ? (
        <button
          type="button"
          className={buttonClassName}
          onClick={toggleOpen}
          aria-expanded="true"
          aria-haspopup="true"
          aria-label="More menu"
        >
          {buttonContent}
        </button>
      ) : (
        <button
          type="button"
          className={buttonClassName}
          onClick={toggleOpen}
          aria-expanded="false"
          aria-haspopup="true"
          aria-label="More menu"
        >
          {buttonContent}
        </button>
      )}
      {open && (
        <nav
          className="dropdown-menu absolute top-full left-0 mt-1 w-56 z-[1100] rounded-md bg-card text-text shadow-xl border border-border"
          aria-label="More submenu"
        >
          {items.map(({ path, label, icon: Icon }) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                `px-4 py-2 text-sm flex items-center gap-2 hover:bg-card-hover hover:text-accent first:rounded-t-md last:rounded-b-md ${
                  isActive ? 'font-semibold text-accent bg-accent/20' : ''
                }`
              }
              onClick={() => setOpen(false)}
            >
              <Icon className="h-4 w-4 text-accent flex-shrink-0" />
              {label}
            </NavLink>
          ))}
        </nav>
      )}
    </div>
  );
};

const Navbar: React.FC = () => {
  const [showAuth, setShowAuth] = useState(false);
  const navigate = useNavigate();
  const store = useStore();
  const { user } = store;

  const handleSignOut = () => {
    store.signOut();
    navigate('/');
  };

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `header-nav-item flex items-center gap-1 text-white hover:bg-white/5 px-1.5 py-1.5 rounded-md transition-all duration-200 whitespace-nowrap ${
      isActive ? 'text-accent bg-accent/20 font-semibold' : ''
    }`;

  return (
    <header className="nav-header bg-primary fixed top-0 w-full z-50">
      <div className="container mx-auto px-6">
        <div className="header-grid">
          <div className="header-left flex-shrink-0">
            <Link to="/" className="flex items-center gap-1.5 flex-shrink-0">
              <Logo size={44} light className="header-logo" />
              <div className="flex flex-col justify-center leading-none header-brand-text flex-shrink-0">
                <div className="flex items-baseline">
                  <span className="text-sm font-bold text-white">SocialCaution</span>
                  <span className="text-[10px] font-normal text-white ml-0.5 align-super">™</span>
                </div>
                <div className="header-brand-tagline text-[10px] text-gray-300 leading-none -mt-0.5">Africa Edition</div>
              </div>
            </Link>
          </div>

          <nav className="header-center hidden md:flex items-center justify-center gap-0.5">
            <NavLink to="/" className={navLinkClass} end>
              <Home className="h-4 w-4 text-accent flex-shrink-0" />
              <span className="text-sm">Home</span>
            </NavLink>

            {africaHeaderNav.map(({ path, label, icon: Icon, highlight }) => (
              <NavLink
                key={path}
                to={path}
                className={({ isActive }) =>
                  `${navLinkClass({ isActive })}${highlight ? ' ring-1 ring-accent/40' : ''}`
                }
              >
                <Icon className="h-4 w-4 text-accent flex-shrink-0" />
                <span className="text-sm">{label}</span>
              </NavLink>
            ))}

            <MoreDropdown items={africaHeaderMore} />
          </nav>

          <div className="header-right flex items-center justify-end">
            <div className="hidden md:flex items-center gap-2">
              <ThemeSwitcher />
              {user ? (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleSignOut}
                  aria-label="Sign Out"
                  className="header-auth-btn flex items-center gap-1.5 text-white border-white hover:bg-white/10 !min-h-8 !h-8 !py-1 !px-2.5 text-sm"
                >
                  <LogOut className="h-4 w-4 text-accent" />
                  <span className="hidden lg:inline">Sign Out</span>
                </Button>
              ) : (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowAuth(true)}
                  aria-label="Account"
                  className="header-auth-btn flex items-center gap-1.5 text-white border-white hover:bg-white/10 !min-h-8 !h-8 !py-1 !px-2.5 text-sm"
                >
                  <User className="h-4 w-4 text-accent" />
                  <span className="hidden lg:inline">Account</span>
                </Button>
              )}
            </div>
            <MobileNav />
          </div>
        </div>
      </div>

      {showAuth && <AuthModal onClose={() => setShowAuth(false)} defaultMode="signin" />}
    </header>
  );
};

export default Navbar;
