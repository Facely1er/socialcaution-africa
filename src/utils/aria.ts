/** String booleans required by ARIA / axe (avoid boolean aria-* props). */
export type AriaBool = 'true' | 'false';

export function ariaBool(value: boolean): AriaBool {
  return value ? 'true' : 'false';
}

/** Literal attribute objects for static a11y linters (Edge Tools). */
export const ariaExpandedTrue = { 'aria-expanded': 'true' } as const;
export const ariaExpandedFalse = { 'aria-expanded': 'false' } as const;
export const ariaHiddenTrue = { 'aria-hidden': 'true' } as const;
export const ariaHiddenFalse = { 'aria-hidden': 'false' } as const;
export const ariaPressedTrue = { 'aria-pressed': 'true' } as const;
export const ariaPressedFalse = { 'aria-pressed': 'false' } as const;
export const ariaModalTrue = { 'aria-modal': 'true' } as const;
