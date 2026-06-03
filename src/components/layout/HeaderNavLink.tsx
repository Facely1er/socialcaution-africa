import { NavLink } from 'react-router-dom';
import type { EditionNavItem } from '../../config/africaEditionNav';
import { headerNavLinkClasses } from './headerNav';

export default function HeaderNavLink({ path, label, icon: Icon, highlight }: EditionNavItem) {
  return (
    <NavLink
      to={path}
      end={path === '/'}
      title={label}
      className={({ isActive }) => headerNavLinkClasses(isActive, highlight)}
    >
      <Icon className="header-nav-link__icon" aria-hidden />
      <span className="header-nav-link__label">{label}</span>
    </NavLink>
  );
}
