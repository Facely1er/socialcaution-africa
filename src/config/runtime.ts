/**
 * Runtime mode: local-first by default.
 *
 * No backend is required for normal use. The app stores progress in the browser
 * (localStorage + Zustand) and uses bundled/static content for Africa edition pages.
 *
 * Optional integrations (all off unless configured):
 * - Express/Mongo API: set VITE_API_URL and leave VITE_DEMO_MODE unset/false
 * - Supabase sync: set VITE_SUPABASE_URL + VITE_SUPABASE_ANON_KEY
 *
 * Force local-only even when VITE_API_URL is set: VITE_DEMO_MODE=true
 */
const apiUrl = (import.meta.env.VITE_API_URL ?? '').trim();
const forceLocal = import.meta.env.VITE_DEMO_MODE === 'true';

const supabaseUrl = (import.meta.env.VITE_SUPABASE_URL ?? '').trim();
const supabaseAnonKey = (import.meta.env.VITE_SUPABASE_ANON_KEY ?? '').trim();

/** REST API at VITE_API_URL is active (Mongo/Express backend). Off by default. */
export const isBackendEnabled = (): boolean =>
  apiUrl.length > 0 && !forceLocal;

/** Alias: app uses in-browser storage and bundled mock/demo data. */
export const isDemoMode = (): boolean => !isBackendEnabled();

/** No backend API — default install and recommended Africa deployment shape. */
export const isLocalOnlyMode = (): boolean => !isBackendEnabled();

/** Supabase cloud sync (optional; 30-day challenge can still use localStorage). */
export const isSupabaseEnabled = (): boolean =>
  supabaseUrl.length > 0 && supabaseAnonKey.length > 0;

export const getApiBaseUrl = (): string => apiUrl;

export type RuntimeMode = {
  backend: boolean;
  supabase: boolean;
  localOnly: boolean;
};

export const getRuntimeMode = (): RuntimeMode => ({
  backend: isBackendEnabled(),
  supabase: isSupabaseEnabled(),
  localOnly: isLocalOnlyMode(),
});
