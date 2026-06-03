import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { NavLink, useLocation } from 'react-router-dom';
import { ChevronDown, LucideIcon, MoreHorizontal } from 'lucide-react';
import { isEditionNavActive } from '../../utils/editionNav';

export type HeaderMoreItem = {
  path: string;
  label: string;
  icon: LucideIcon;
};

type MenuPosition = {
  top: number;
  left: number;
};

export default function HeaderMoreMenu({ items }: { items: HeaderMoreItem[] }) {
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState<MenuPosition>({ top: 0, left: 0 });
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  const moreActive = items.some((item) => isEditionNavActive(location.pathname, item.path));
  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    close();
  }, [location.pathname, close]);

  useLayoutEffect(() => {
    if (!open || !triggerRef.current) return;

    const updatePosition = () => {
      const rect = triggerRef.current!.getBoundingClientRect();
      const menuWidth = 208;
      let left = rect.left;
      if (left + menuWidth > window.innerWidth - 12) {
        left = Math.max(12, rect.right - menuWidth);
      }
      setPosition({ top: rect.bottom + 6, left });
    };

    updatePosition();
    window.addEventListener('resize', updatePosition);
    window.addEventListener('scroll', updatePosition, true);
    return () => {
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition, true);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        triggerRef.current?.contains(target) ||
        menuRef.current?.contains(target)
      ) {
        return;
      }
      close();
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close();
    };

    document.addEventListener('mousedown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('mousedown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open, close]);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        className={[
          'header-nav-link header-more-trigger',
          open || moreActive ? 'header-nav-link--active' : '',
        ]
          .filter(Boolean)
          .join(' ')}
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-haspopup="menu"
        aria-controls={open ? 'header-more-menu' : undefined}
      >
        <MoreHorizontal className="header-nav-link__icon" aria-hidden />
        <span className="header-nav-link__label">More</span>
        <ChevronDown
          className={`header-nav-link__icon header-more-trigger__chevron ${open ? 'header-more-trigger__chevron--open' : ''}`}
          aria-hidden
        />
      </button>

      {open &&
        createPortal(
          <div
            ref={menuRef}
            id="header-more-menu"
            role="menu"
            className="header-more-panel"
            style={{ top: position.top, left: position.left }}
          >
            {items.map(({ path, label, icon: Icon }) => (
              <NavLink
                key={path}
                to={path}
                role="menuitem"
                className={({ isActive }) =>
                  ['header-more-panel__link', isActive ? 'header-more-panel__link--active' : '']
                    .filter(Boolean)
                    .join(' ')
                }
                onClick={close}
              >
                <Icon className="header-more-panel__icon" aria-hidden />
                {label}
              </NavLink>
            ))}
          </div>,
          document.body
        )}
    </>
  );
}
