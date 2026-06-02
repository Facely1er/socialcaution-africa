/**
 * Public site URL for SEO, sitemaps, and canonical links.
 * Override in Netlify: VITE_SITE_URL=https://africa.socialcaution.com
 */
const raw = (import.meta.env.VITE_SITE_URL ?? 'https://africa.socialcaution.com').trim();

export const SITE_URL = raw.replace(/\/$/, '');

export const SITE_NAME = 'SocialCaution Africa';

export const SITE_DESCRIPTION =
  'Digital trust, scam prevention, and privacy rights for African citizens, families, students, and small businesses.';

export const absoluteUrl = (path: string): string => {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${SITE_URL}${normalized}`;
};
