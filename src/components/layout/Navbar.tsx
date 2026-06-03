import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LogOut, User } from 'lucide-react';
import Logo from '../common/Logo';
import useStore from '../../store/useStore';
import AuthModal from '../auth/AuthModal';
import ThemeSwitcher from '../ThemeSwitcher';
import MobileNav from '../navigation/MobileNav';
import HeaderNavLink from './HeaderNavLink';
import HeaderMoreMenu from './HeaderMoreMenu';
import { africaHeaderMore, africaHeaderNav } from '../../config/africaEditionNav';

const Navbar = () => {
  const [showAuth, setShowAuth] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, signOut } = useStore();
  const isHome = location.pathname === '/';

  const handleSignOut = () => {
    signOut();
    navigate('/');
  };

  return (
    <header className="nav-header">
      <div className="nav-header__inner">
        <div className="header-grid">
          <div className="header-left">
            <Link
              to="/"
              className={`header-brand-link${isHome ? ' header-brand-link--active' : ''}`}
              aria-label="SocialCaution Africa — Home"
              aria-current={isHome ? 'page' : undefined}
            >
              <Logo size={40} light className="header-logo" />
              <span className="header-brand-text">
                <span className="header-brand-text__name">
                  SocialCaution<span className="header-brand-text__tm">™</span>
                </span>
                <span className="header-brand-text__tagline">Africa Edition</span>
              </span>
            </Link>
          </div>

          <nav className="header-center" aria-label="Main navigation">
            {africaHeaderNav.map((item) => (
              <HeaderNavLink key={item.path} {...item} />
            ))}
            <HeaderMoreMenu items={africaHeaderMore} />
          </nav>

          <div className="header-right">
            <ThemeSwitcher className="header-theme-toggle" />
            <div className="header-auth hidden lg:flex">
              {user ? (
                <button
                  type="button"
                  className="header-auth-btn"
                  onClick={handleSignOut}
                  aria-label="Sign out"
                >
                  <LogOut className="header-auth-btn__icon" aria-hidden />
                  <span className="header-auth-btn__label">Sign out</span>
                </button>
              ) : (
                <button
                  type="button"
                  className="header-auth-btn"
                  onClick={() => setShowAuth(true)}
                  aria-label="Sign in"
                >
                  <User className="header-auth-btn__icon" aria-hidden />
                  <span className="header-auth-btn__label">Account</span>
                </button>
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
