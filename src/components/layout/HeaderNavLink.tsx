import { NavLink } from 'react-router-dom';
import type { LucideIcon } from 'lucide-react';

type HeaderNavLinkProps = {
  to: string;
  label: string;
  icon: LucideIcon;
  highlight?: boolean;
};

export default function HeaderNavLink({ to, label, icon: Icon, highlight }: HeaderNavLinkProps) {
  return (
    <NavLink
      to={to}
      end={to === '/'}
      title={label}
      className={({ isActive }) =>
        [
          'header-nav-link',
          isActive ? 'header-nav-link--active' : '',
          highlight && !isActive ? 'header-nav-link--highlight' : '',
        ]
          .filter(Boolean)
          .join(' ')
      }
    >
      <Icon className="header-nav-link__icon" aria-hidden />
      <span className="header-nav-link__label">{label}</span>
    </NavLink>
  );
}
