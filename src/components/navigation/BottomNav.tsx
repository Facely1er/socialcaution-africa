import { NavLink, useLocation } from 'react-router-dom';
import { africaBottomNav } from '../../config/africaEditionNav';
import type { EditionNavItem } from '../../config/africaEditionNav';
import { isEditionNavActive } from '../../utils/editionNav';

type BottomNavProps = {
  items?: EditionNavItem[];
  className?: string;
};

export default function BottomNav({ items = africaBottomNav, className = '' }: BottomNavProps) {
  const location = useLocation();

  return (
    <nav
      className={`bottom-nav lg:hidden ${className}`.trim()}
      aria-label="Quick navigation"
    >
      <ul className="bottom-nav__list">
        {items.map(({ path, label, icon: Icon }) => {
          const active = isEditionNavActive(location.pathname, path);
          return (
            <li key={path} className="bottom-nav__item">
              <NavLink
                to={path}
                end={path === '/'}
                className={active ? 'bottom-nav__link bottom-nav__link--active' : 'bottom-nav__link'}
              >
                <Icon className="bottom-nav__icon" aria-hidden />
                <span className="bottom-nav__label">{label}</span>
              </NavLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
