import { useLocation } from 'react-router-dom';
import ThemeSwitcher from '../ThemeSwitcher';
import MobileNav from '../navigation/MobileNav';
import { africaHeaderMore, africaHeaderNav } from '../../config/africaEditionNav';
import HeaderAuthActions from './HeaderAuthActions';
import HeaderBrand from './HeaderBrand';
import HeaderMoreMenu from './HeaderMoreMenu';
import HeaderNavLink from './HeaderNavLink';

export default function Navbar() {
  const { pathname } = useLocation();

  return (
    <header className="nav-header" aria-label="Site header">
      <div className="nav-header__inner">
        <div className="header-grid">
          <div className="header-left">
            <HeaderBrand isHome={pathname === '/'} />
          </div>

          <nav className="header-center" aria-label="Main navigation">
            {africaHeaderNav.map((item) => (
              <HeaderNavLink key={item.path} {...item} />
            ))}
            <HeaderMoreMenu items={africaHeaderMore} />
          </nav>

          <div className="header-right">
            <div className="header-theme-toggle hidden lg:block">
              <ThemeSwitcher />
            </div>
            <HeaderAuthActions />
            <MobileNav />
          </div>
        </div>
      </div>
    </header>
  );
}
