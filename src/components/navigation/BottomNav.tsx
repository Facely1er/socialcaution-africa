import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion } from '../../lib/motion';
import { africaBottomNav } from '../../config/africaEditionNav';
import type { EditionNavItem } from '../../config/africaEditionNav';
import { isEditionNavActive } from '../../utils/editionNav';

type NavItem = EditionNavItem;

interface BottomNavProps {
  items?: NavItem[];
  className?: string;
}

const BottomNav: React.FC<BottomNavProps> = ({
  items = africaBottomNav,
  className = ''
}) => {
  const location = useLocation();

  return (
    <nav
      className={`
        fixed bottom-0 left-0 right-0
        bg-card dark:bg-card
        border-t border-border dark:border-border
        lg:hidden z-40
        safe-area-inset-bottom
        ${className}
      `}
      role="navigation"
      aria-label="Mobile navigation"
    >
      <div className="grid grid-cols-4 gap-0.5 px-2 pt-1 pb-safe">
        {items.map((item) => {
          const Icon = item.icon;
          const active = isEditionNavActive(location.pathname, item.path);

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={`
                flex flex-col items-center justify-center
                py-1 px-0.5 rounded-lg min-h-[3rem]
                transition-all duration-200
                active:scale-95
                ${active ? 'text-accent' : 'text-text-secondary hover:text-text'}
              `}
              aria-label={item.label}
              aria-current={active ? 'page' : undefined}
            >
              <>
                  <div className="relative">
                    <Icon className="h-5 w-5 mb-0.5" aria-hidden />
                    {active && (
                      <motion.div
                        layoutId="bottomNavIndicator"
                        className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-accent rounded-full"
                        initial={false}
                        transition={{
                          type: "spring",
                          stiffness: 500,
                          damping: 30
                        }}
                      />
                    )}
                  </div>
                  <span className="text-[11px] font-medium truncate max-w-[4.5rem]">
                    {item.label}
                  </span>
              </>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
