import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Scale, FileText, Shield, Globe, AlertTriangle, MapPin } from 'lucide-react';

interface NavItem {
  id: string;
  title: string;
  path: string;
  icon: React.ElementType;
  regional?: boolean;
  subItems?: {
    id: string;
    title: string;
    path: string;
  }[];
}

const regionalItems: NavItem[] = [
  {
    id: 'africa-countries',
    title: 'African Country Laws',
    path: '/africa/countries',
    icon: MapPin,
    regional: true,
  },
  {
    id: 'africa-home',
    title: 'Africa Edition Home',
    path: '/africa',
    icon: Globe,
    regional: true,
  },
];

const internationalItems: NavItem[] = [
  {
    id: 'overview',
    title: 'Overview',
    path: '/privacy-laws',
    icon: Scale,
  },
  {
    id: 'global-privacy-act',
    title: 'Global Privacy Act',
    path: '/privacy-laws/global-privacy-act',
    icon: Globe,
    subItems: [
      { id: 'gpa-key-provisions', title: 'Key Provisions', path: '/privacy-laws/global-privacy-act#key-provisions' },
      { id: 'gpa-rights', title: 'Your Rights', path: '/privacy-laws/global-privacy-act#your-rights' },
    ],
  },
  {
    id: 'gdpr',
    title: 'GDPR (EU)',
    path: '/privacy-laws/gdpr',
    icon: Shield,
    subItems: [
      { id: 'gdpr-changes', title: 'Key Changes', path: '/privacy-laws/gdpr#key-changes' },
      { id: 'gdpr-compliance', title: 'Compliance', path: '/privacy-laws/gdpr#compliance' },
    ],
  },
  {
    id: 'us-privacy',
    title: 'US Privacy Laws',
    path: '/privacy-laws/us-privacy',
    icon: FileText,
    subItems: [
      { id: 'federal', title: 'Federal Framework', path: '/privacy-laws/us-privacy#federal' },
      { id: 'state', title: 'State Laws', path: '/privacy-laws/us-privacy#state' },
    ],
  },
  {
    id: 'enforcement',
    title: 'Enforcement',
    path: '/privacy-laws/enforcement',
    icon: AlertTriangle,
  },
];

const NavSection: React.FC<{ label: string; items: NavItem[]; location: ReturnType<typeof useLocation> }> = ({
  label,
  items,
  location,
}) => {
  const isActive = (path: string) =>
    location.pathname === path || location.pathname.startsWith(path + '#');

  return (
    <div className="mb-6">
      <p className="text-xs font-semibold uppercase tracking-wide text-text-secondary dark:text-gray-400 mb-3 px-3">
        {label}
      </p>
      {items.map((item) => (
        <div key={item.id} className="mb-3">
          <Link
            to={item.path}
            className={`flex items-center py-2 px-3 rounded-lg transition-colors ${
              isActive(item.path)
                ? 'bg-accent/20 text-accent hover:bg-accent/30'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-card-hover'
            } ${item.regional ? 'border-l-2 border-accent' : ''}`}
          >
            <item.icon className="h-5 w-5 mr-3 flex-shrink-0" />
            <span className="font-medium text-sm">{item.title}</span>
          </Link>
          {item.subItems && (
            <div className="ml-8 mt-2 space-y-2">
              {item.subItems.map((subItem) => (
                <Link
                  key={subItem.id}
                  to={subItem.path}
                  className={`block py-1 px-3 rounded-lg text-sm transition-colors ${
                    location.hash === '#' + subItem.id
                      ? 'text-accent'
                      : 'text-gray-600 dark:text-gray-400 hover:text-accent dark:hover:text-accent'
                  }`}
                >
                  {subItem.title}
                </Link>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

const VerticalNav: React.FC = () => {
  const location = useLocation();

  return (
    <div className="sidebar-nav-panel bg-white dark:bg-card rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold mb-2 text-primary dark:text-white">Privacy &amp; Safety Laws</h3>
      <p className="text-xs text-text-secondary dark:text-gray-400 mb-6">
        Regional Africa content first; international frameworks below.
      </p>
      <nav>
        <NavSection label="Africa Edition" items={regionalItems} location={location} />
        <NavSection label="International reference" items={internationalItems} location={location} />
      </nav>
    </div>
  );
};

export default VerticalNav;
