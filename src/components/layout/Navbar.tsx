import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import {
  Home, Search, BookOpen, CreditCard, MessageSquare,
  LayoutDashboard, LogOut, Gauge, HelpCircle, Wrench, FileText, ChevronDown,
  Users, Compass, Map as MapIcon, Shield, User, LucideIcon, Globe2, AlertTriangle
} from 'lucide-react';
import Logo from '../common/Logo';
import useStore from '../../store/useStore';
import AuthModal from '../auth/AuthModal';
import Button from '../common/Button';
import ThemeSwitcher from '../ThemeSwitcher';
import SearchIcon from '../navigation/SearchIcon';
import MobileNav from '../navigation/MobileNav';

// Type definition for navigation items
interface NavItem {
  path: string;
  label: string;
  icon: LucideIcon;
  highlight?: boolean;
}

// Reorganized dropdown structure
const DropdownGroup = ({ label, icon: LabelIcon, items }: any) => {
  const [open, setOpen] = useState(false);
  const [alignEnd, setAlignEnd] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  // Adjust dropdown position to prevent viewport overflow
  useEffect(() => {
    const updatePosition = () => {
      if (open && dropdownRef.current) {
        const rect = dropdownRef.current.getBoundingClientRect();
        const menuWidth = 224; // w-56 = 14rem = 224px
        const viewportWidth = window.innerWidth;
        const spaceOnRight = viewportWidth - rect.right;
        
        // If dropdown would overflow on the right, align to the right edge of button
        setAlignEnd(spaceOnRight < menuWidth && rect.left >= menuWidth);
      }
    };
    
    if (open) {
      updatePosition();
      window.addEventListener('resize', updatePosition);
      window.addEventListener('scroll', updatePosition, true);
      
      return () => {
        window.removeEventListener('resize', updatePosition);
        window.removeEventListener('scroll', updatePosition, true);
      };
    }

    setAlignEnd(false);
  }, [open]);
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    
    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open]);
  
  return (
    <div
      className="relative dropdown-container"
      ref={dropdownRef}
    >
      <button 
        className="header-nav-item flex items-center gap-1 text-white hover:text-white hover:bg-white/5 px-1.5 py-1.5 rounded-md transition-all duration-200 group whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setOpen(!open);
        }}
        type="button"
        {...(open ? { "aria-expanded": "true" } : { "aria-expanded": "false" })}
        aria-haspopup="true"
        aria-label={`${label} menu`}
      >
        {LabelIcon && <LabelIcon className="h-4 w-4 text-accent transition-colors duration-200 flex-shrink-0" />}
        <span className="text-sm">{label}</span>
        <ChevronDown className={`h-4 w-4 text-accent transition-all duration-200 flex-shrink-0 ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <nav
          className={`dropdown-menu absolute top-full left-0 mt-1 w-56 z-[1100] rounded-md bg-card text-text shadow-xl border border-border${alignEnd ? ' dropdown-menu--align-end' : ''}`}
          role="navigation"
          aria-label={`${label} submenu`}
        >
          {items.map(({ path, label, icon: Icon, highlight }: any) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                `px-4 py-2 text-sm flex items-center gap-2 hover:bg-card-hover hover:text-accent transition-all duration-200 group first:rounded-t-md last:rounded-b-md ${
                  isActive ? 'font-semibold text-accent bg-accent/20 hover:bg-accent/30' : ''
                } ${highlight ? 'bg-accent/10 border-l-2 border-accent' : ''}`
              }
              onClick={() => setOpen(false)}
            >
              <Icon className="h-4 w-4 text-accent group-hover:text-accent transition-colors duration-200 flex-shrink-0" />
              {label}
              {highlight && (
                <span className="ml-auto text-xs bg-accent text-white px-2 py-0.5 rounded-full">
                  New
                </span>
              )}
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

  // Core nav links (always visible in center)
  const primaryNavItems: NavItem[] = [
    { path: '/africa', label: 'Africa', icon: Globe2, highlight: true },
    { path: '/personas', label: 'Personas', icon: Users },
    { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/toolkit', label: 'Toolkit', icon: Wrench },
  ];

  // Roadmap dropdown — journey & assessment
  const privacyRoadmapItems = [
    { path: '/30-day-roadmap', label: '30-Day Roadmap', icon: MapIcon },
    { path: '/privacy-journey', label: 'Privacy Journey', icon: Compass },
    { path: '/privacy-action-center', label: 'Action Center', icon: Shield },
    { path: '/africa/countries', label: 'Africa Countries', icon: Globe2, highlight: true },
    { path: '/africa/scamshield', label: 'ScamShield Africa', icon: AlertTriangle, highlight: true },
    { path: '/africa/sources', label: 'Africa Sources', icon: BookOpen, highlight: true },
    { path: '/assessment', label: 'Assessment', icon: Search },
  ];
  
  // Resources dropdown — guides, blog, marketing
  const resourcesItems = [
    { path: '/resources', label: 'Resources', icon: BookOpen },
    { path: '/blog', label: 'Blog', icon: FileText },
    { path: '/help', label: 'Help', icon: HelpCircle },
    { path: '/contact', label: 'Contact', icon: MessageSquare },
    { path: '/features', label: 'Features', icon: Gauge },
    { path: '/pricing', label: 'Pricing', icon: CreditCard },
  ];

  return (
    <header className="nav-header bg-primary fixed top-0 w-full z-50">
      <div className="container mx-auto px-6">
        <div className="header-grid">
          {/* Left Section: Logo and Branding */}
          <div className="header-left flex-shrink-0">
            <Link to="/" className="flex items-center gap-1.5 flex-shrink-0">
              <Logo size={44} light className="header-logo" />
              <div className="flex flex-col justify-center leading-none whitespace-nowrap header-brand-text flex-shrink-0">
                <div className="flex items-baseline">
                  <span className="text-sm font-bold text-white">SocialCaution</span>
                  <span className="text-[10px] font-normal text-white ml-0.5 align-super">™</span>
                </div>
                <div className="header-brand-tagline text-[10px] text-gray-300 leading-none -mt-0.5">Africa Edition</div>
              </div>
            </Link>
          </div>

          {/* Center Section: Desktop Navigation */}
          <nav className="header-center hidden md:flex items-center justify-center">
            {/* Home Link */}
            <NavLink
              to="/"
              className={({ isActive }) =>
                `header-nav-item flex items-center gap-1 text-white hover:text-white hover:bg-white/5 px-1.5 py-1.5 rounded-md transition-all duration-200 group whitespace-nowrap ${
                  isActive ? 'text-accent bg-accent/20 hover:bg-accent/30 font-semibold' : ''
                }`
              }
            >
              <Home className="h-4 w-4 text-accent transition-colors duration-200 flex-shrink-0" />
              <span className="text-sm">Home</span>
            </NavLink>

            {/* PRIMARY NAV ITEMS (always visible) */}
            {primaryNavItems.map(({ path, label, icon: Icon, highlight }) => (
              <NavLink
                key={path}
                to={path}
                className={({ isActive }) =>
                `header-nav-item flex items-center gap-1 text-white hover:text-white hover:bg-white/5 px-1.5 py-1.5 rounded-md transition-all duration-200 group whitespace-nowrap ${
                  isActive ? 'text-accent bg-accent/20 hover:bg-accent/30 font-semibold' : ''
                } ${highlight ? 'bg-accent/10 border border-accent/30' : ''}`
                }
              >
                <Icon className="h-4 w-4 text-accent transition-colors duration-200 flex-shrink-0" />
                <span className="text-sm">{label}</span>
              </NavLink>
            ))}

            {/* DROPDOWN: "Roadmap" */}
            <DropdownGroup label="Roadmap" icon={Compass} items={privacyRoadmapItems} />

            {/* DROPDOWN: "Resources" */}
            <DropdownGroup label="Resources" icon={BookOpen} items={resourcesItems} />
          </nav>

          {/* Right Section: Search, account, mobile menu */}
          <div className="header-right flex items-center justify-end">
            <div className="hidden md:flex items-center gap-2">
              <SearchIcon />
              <ThemeSwitcher />
              {user ? (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleSignOut}
                  aria-label="Sign Out"
                  title="Sign Out"
                  className="header-auth-btn flex items-center gap-1.5 text-white border-white hover:bg-white/10 transition-all duration-200 !min-h-8 !h-8 !py-1 !px-2.5 text-sm"
                >
                  <LogOut className="h-4 w-4 text-accent transition-colors duration-200" />
                  <span className="hidden lg:inline">Sign Out</span>
                </Button>
              ) : (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowAuth(true)}
                  aria-label="Account"
                  title="Account"
                  className="header-auth-btn flex items-center gap-1.5 text-white border-white hover:bg-white/10 transition-all duration-200 !min-h-8 !h-8 !py-1 !px-2.5 text-sm"
                >
                  <User className="h-4 w-4 text-accent transition-colors duration-200" />
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
