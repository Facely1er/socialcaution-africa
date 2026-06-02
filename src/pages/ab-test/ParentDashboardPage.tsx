/**
 * ParentDashboardPage — layout shell for the family-focused dashboard.
 *
 * Auth guard: redirects to /parent if the user hasn't completed onboarding
 * (i.e. they navigated directly to /parent/dashboard without going through
 * the wizard + assessment first).
 *
 * Desktop: sidebar nav.
 * Mobile:  fixed bottom tab bar (sidebar is hidden on small screens).
 */
import { Navigate, Outlet, NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, ListChecks, Calendar,
  Settings, Bell, User, LogOut, Shield,
} from 'lucide-react';
import { getABConfig, trackABEvent } from '../../ab-test/config';
import { useABTestStore } from '../../store/abTestStore';

const SIDEBAR_ITEMS = [
  { icon: LayoutDashboard, label: 'Overview',    to: '/parent/dashboard',             end: true  },
  { icon: ListChecks,      label: 'Action Plan', to: '/parent/dashboard/action-plan',  end: false },
  { icon: Calendar,        label: '30-Day Plan', to: '/30-day-roadmap',                end: false },
  { icon: Settings,        label: 'Settings',    to: '/dashboard/settings',            end: false },
];

// Bottom-tab bar uses a trimmed subset for mobile
const MOBILE_TABS = [
  { icon: LayoutDashboard, label: 'Overview',    to: '/parent/dashboard',             end: true  },
  { icon: ListChecks,      label: 'Actions',     to: '/parent/dashboard/action-plan',  end: false },
  { icon: Calendar,        label: 'Roadmap',     to: '/30-day-roadmap',                end: false },
  { icon: Settings,        label: 'Settings',    to: '/dashboard/settings',            end: false },
];

export default function ParentDashboardPage() {
  const navigate  = useNavigate();
  const { variant } = getABConfig();
  const { familyProfile, privacyScore } = useABTestStore();
  const childCount = familyProfile.children.length;

  // ── Auth guard — redirect if onboarding wasn't completed ──
  if (!familyProfile.completedOnboarding) {
    return <Navigate to="/parent" replace />;
  }

  const handleExit = () => {
    trackABEvent('dashboard_exit', { variant });
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-950 flex">
      {/* ────────────────── Desktop sidebar ────────────────── */}
      <aside className="w-60 bg-gray-900 border-r border-gray-800 flex-col p-4 hidden md:flex flex-shrink-0">
        {/* Logo + variant badge (badge only in dev) */}
        <div className="flex items-center gap-2.5 px-2 mb-8 mt-2">
          <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
            <Shield className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-white text-sm">SocialCaution</span>
          {import.meta.env.DEV && (
            <span className="text-xs bg-orange-500/20 text-orange-400 border border-orange-500/30 rounded-full px-1.5 py-0.5">
              {variant}
            </span>
          )}
        </div>

        {/* Family summary pill */}
        <div className="bg-orange-500/5 border border-orange-500/20 rounded-xl p-3 mb-6">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-6 h-6 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-400 text-xs font-bold">
              {childCount}
            </div>
            <span className="text-sm text-white font-medium">
              {childCount} child{childCount !== 1 ? 'ren' : ''}
            </span>
          </div>
          {privacyScore !== null ? (
            <div className="text-xs text-gray-500">
              Family score:{' '}
              <span className="text-orange-400 font-medium">{privacyScore}/100</span>
            </div>
          ) : (
            <div className="text-xs text-gray-600">Assessment pending</div>
          )}
        </div>

        {/* Primary nav */}
        <nav className="flex-1 space-y-0.5">
          {SIDEBAR_ITEMS.map(({ icon: Icon, label, to, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all ${
                  isActive
                    ? 'bg-orange-500/10 text-orange-400 font-medium'
                    : 'text-gray-500 hover:text-white hover:bg-gray-800'
                }`
              }
            >
              <Icon className="w-4 h-4" /> {label}
            </NavLink>
          ))}
        </nav>

        {/* Footer links */}
        <div className="space-y-0.5 mt-4 border-t border-gray-800 pt-4">
          <NavLink
            to="/dashboard/profile"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-500 hover:text-white hover:bg-gray-800 transition-all"
          >
            <User className="w-4 h-4" /> Profile
          </NavLink>
          <NavLink
            to="/dashboard/notifications"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-500 hover:text-white hover:bg-gray-800 transition-all"
          >
            <Bell className="w-4 h-4" /> Notifications
          </NavLink>
          <button
            onClick={handleExit}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-500 hover:text-white hover:bg-gray-800 transition-all"
          >
            <LogOut className="w-4 h-4" /> Exit
          </button>
        </div>
      </aside>

      {/* ────────────────── Main content ────────────────── */}
      <main className="flex-1 overflow-auto pb-20 md:pb-0">
        <Outlet />
      </main>

      {/* ────────────────── Mobile bottom tab bar ────────────────── */}
      <nav className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-800 flex items-stretch md:hidden z-50 safe-area-bottom">
        {MOBILE_TABS.map(({ icon: Icon, label, to, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `flex-1 flex flex-col items-center justify-center gap-1 py-2.5 text-xs transition-colors ${
                isActive
                  ? 'text-orange-400'
                  : 'text-gray-600 hover:text-gray-400'
              }`
            }
          >
            <Icon className="w-5 h-5" />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
