import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../common/Logo';
import { designSystem } from '../../styles/design-system';
import { africaFooterGroups } from '../../config/africaEditionNav';

interface FooterProps {
  className?: string;
}

const Footer: React.FC<FooterProps> = ({ className = '' }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={`bg-primary text-white mt-0 ${className}`.trim()}>
      <div className={`${designSystem.layout.contentShell} py-8 md:py-10`}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 mb-6 footer-grid">
          <div className="footer-branding sm:col-span-2 lg:col-span-4">
            <Link
              to="/"
              className="footer-brand-link flex items-center gap-3 mb-4 w-full max-w-md"
            >
              <Logo size={48} light className="footer-logo" />
              <div className="flex flex-col justify-center leading-tight flex-1">
                <div className="flex items-baseline flex-wrap gap-x-0.5">
                  <span className="text-lg font-bold text-white whitespace-nowrap">SocialCaution</span>
                  <span className="text-xs font-normal text-white align-super">™</span>
                </div>
                <span className="text-sm text-gray-300 whitespace-nowrap">Africa Edition</span>
                <span className="text-xs text-gray-400">ERMITS · Digital trust &amp; safety</span>
              </div>
            </Link>
            <p className="text-gray-300 text-sm leading-relaxed max-w-md">
              Country-aware scam prevention, privacy rights, and safety guidance for African citizens, families, and SMEs.
            </p>
          </div>

          {africaFooterGroups.map((group) => (
            <div key={group.title} className="footer-column min-w-0 lg:col-span-2">
              <h2 className="text-sm font-bold mb-3 text-accent uppercase tracking-wide">{group.title}</h2>
              <ul className="space-y-2">
                {group.items.map((item) => (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      className="text-gray-300 hover:text-accent transition-colors flex items-center gap-2 text-sm"
                    >
                      <item.icon className="h-3.5 w-3.5 text-accent flex-shrink-0" aria-hidden />
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-700 pt-4">
          <p className="text-gray-400 text-xs text-center md:text-left">
            © {currentYear} ERMITS LLC. Africa Edition prototype — verify country sources before official use.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
