import type { CSSProperties } from 'react';
import type { EditionNavItem } from '../../config/africaEditionNav';

export const HEADER_MORE_MENU_ID = 'header-more-menu';
export const MOBILE_NAV_DRAWER_ID = 'mobile-nav-drawer';
export const MOBILE_NAV_DRAWER_TITLE_ID = 'mobile-nav-drawer-title';
export const HEADER_MORE_MENU_WIDTH_PX = 208;

export type { EditionNavItem };

export function headerNavLinkClasses(isActive: boolean, highlight?: boolean): string {
  return [
    'header-nav-link',
    isActive && 'header-nav-link--active',
    highlight && !isActive && 'header-nav-link--highlight',
  ]
    .filter(Boolean)
    .join(' ');
}

export function headerMorePanelLinkClasses(isActive: boolean): string {
  return ['header-more-panel__link', isActive && 'header-more-panel__link--active']
    .filter(Boolean)
    .join(' ');
}

export function headerMorePanelPositionStyle(top: number, left: number): CSSProperties {
  return {
    ['--header-more-top' as string]: `${top}px`,
    ['--header-more-left' as string]: `${left}px`,
  };
}

export function mobileDrawerLinkClasses(isActive: boolean): string {
  return ['mobile-nav-drawer__link', isActive && 'mobile-nav-drawer__link--active']
    .filter(Boolean)
    .join(' ');
}

export const MOBILE_NAV_OPEN_ATTR = 'data-mobile-nav-open';

export function setMobileNavOpen(open: boolean): void {
  if (open) {
    document.documentElement.setAttribute(MOBILE_NAV_OPEN_ATTR, '');
  } else {
    document.documentElement.removeAttribute(MOBILE_NAV_OPEN_ATTR);
  }

  const bottomNav = document.querySelector<HTMLElement>('.bottom-nav');
  if (bottomNav) {
    bottomNav.setAttribute('aria-hidden', open ? 'true' : 'false');
  }
}
