import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { NavLink, useLocation } from 'react-router-dom';
import { ChevronDown, MoreHorizontal } from 'lucide-react';
import type { EditionNavItem } from '../../config/africaEditionNav';
import { isEditionNavActive } from '../../utils/editionNav';
import {
  ariaExpandedFalse,
  ariaExpandedTrue,
  ariaHiddenFalse,
  ariaHiddenTrue,
} from '../../utils/aria';
import {
  HEADER_MORE_MENU_ID,
  HEADER_MORE_MENU_WIDTH_PX,
  headerMorePanelLinkClasses,
  headerNavLinkClasses,
} from './headerNav';

type HeaderMoreMenuProps = {
  items: EditionNavItem[];
};

function computeMenuPosition(trigger: HTMLButtonElement): { top: number; left: number } {
  const rect = trigger.getBoundingClientRect();
  let left = rect.left;
  if (left + HEADER_MORE_MENU_WIDTH_PX > window.innerWidth - 12) {
    left = Math.max(12, rect.right - HEADER_MORE_MENU_WIDTH_PX);
  }
  return { top: rect.bottom + 6, left };
}

export default function HeaderMoreMenu({ items }: HeaderMoreMenuProps) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLUListElement>(null);
  const location = useLocation();

  const submenuActive = items.some((item) => isEditionNavActive(location.pathname, item.path));
  const close = useCallback(() => setOpen(false), []);
  useEffect(() => {
    close();
  }, [location.pathname, close]);

  useLayoutEffect(() => {
    if (!open || !triggerRef.current) return;

    const updatePosition = () => {
      if (!triggerRef.current || !panelRef.current) return;
      const { top, left } = computeMenuPosition(triggerRef.current);
      panelRef.current.style.setProperty('--header-more-top', `${top}px`);
      panelRef.current.style.setProperty('--header-more-left', `${left}px`);
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
      if (triggerRef.current?.contains(target) || panelRef.current?.contains(target)) {
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

  const triggerClass = headerNavLinkClasses(open || submenuActive);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        className={`${triggerClass} header-more-trigger`}
        onClick={() => setOpen((value) => !value)}
        {...(open ? ariaExpandedTrue : ariaExpandedFalse)}
        aria-haspopup="true"
        aria-controls={HEADER_MORE_MENU_ID}
      >
        <MoreHorizontal className="header-nav-link__icon" aria-hidden />
        <span className="header-nav-link__label">More</span>
        <ChevronDown
          className={`header-nav-link__icon header-more-trigger__chevron${open ? ' header-more-trigger__chevron--open' : ''}`}
          aria-hidden
        />
      </button>

      {createPortal(
        <ul
          ref={panelRef}
          id={HEADER_MORE_MENU_ID}
          className={`header-more-panel${open ? '' : ' header-more-panel--hidden'}`}
          aria-label="More navigation"
          {...(open ? ariaHiddenFalse : ariaHiddenTrue)}
          hidden={!open}
        >
          {items.map(({ path, label, icon: Icon }) => (
            <li key={path} className="header-more-panel__item">
              <NavLink
                to={path}
                className={({ isActive }) => headerMorePanelLinkClasses(isActive)}
                onClick={close}
                tabIndex={open ? undefined : -1}
              >
                <Icon className="header-more-panel__icon" aria-hidden />
                {label}
              </NavLink>
            </li>
          ))}
        </ul>,
        document.body
      )}
    </>
  );
}
