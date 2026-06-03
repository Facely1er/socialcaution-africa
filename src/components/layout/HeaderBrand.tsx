import { Link } from 'react-router-dom';
import Logo from '../common/Logo';

type HeaderBrandProps = {
  isHome: boolean;
};

export default function HeaderBrand({ isHome }: HeaderBrandProps) {
  return (
    <Link
      to="/"
      className={`header-brand-link${isHome ? ' header-brand-link--active' : ''}`}
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
  );
}
