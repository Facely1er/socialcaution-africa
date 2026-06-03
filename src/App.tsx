import { lazy } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
  Navigate,
} from 'react-router-dom';
import ErrorBoundary from './components/common/ErrorBoundary';
import EnhancedErrorBoundary from './components/common/EnhancedErrorBoundary';
import { AuthProvider } from './components/auth/AuthProvider';
import { ThemeProvider } from './contexts/ThemeContext';
import { PersonaProvider } from './core/providers/PersonaProvider';
import { ToastProvider } from './components/common/ToastProvider';
import Layout from './components/layout/Layout';
import { AFRICA_ROUTE_REDIRECTS } from './config/africaRouteRedirects';
import ProductionChecklist from './components/common/ProductionChecklist';
import PerformanceMonitor from './components/common/PerformanceMonitor';

import HomePage from './pages/HomePage';
import AfricaHomePage from './pages/africa/AfricaHomePage';

const AssessmentPage = lazy(() => import('./pages/AssessmentPage'));
const ExposureAssessmentPage = lazy(() => import('./pages/assessment/ExposureAssessmentPage'));
const PrivacyRightsAssessmentPage = lazy(() => import('./pages/assessment/PrivacyRightsAssessmentPage'));
const SecurityAssessmentPage = lazy(() => import('./pages/assessment/SecurityAssessmentPage'));
const AssessmentResultsPage = lazy(() => import('./pages/assessment/AssessmentResultsPage'));

const AboutPage = lazy(() => import('./pages/AboutPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

const AfricaCountriesPage = lazy(() => import('./pages/africa/AfricaCountriesPage'));
const AfricaCountryPage = lazy(() => import('./pages/africa/AfricaCountryPage'));
const ScamShieldAfricaPage = lazy(() => import('./pages/africa/ScamShieldAfricaPage'));
const AfricaPersonasPage = lazy(() => import('./pages/africa/AfricaPersonasPage'));
const AfricaActionCenterPage = lazy(() => import('./pages/africa/AfricaActionCenterPage'));
const AfricaSourcesPage = lazy(() => import('./pages/africa/AfricaSourcesPage'));
const AfricaPartnerPage = lazy(() => import('./pages/africa/AfricaPartnerPage'));

const PrivacyLawsPage = lazy(() => import('./pages/legal/PrivacyLawsPage'));
const PrivacyPolicyPage = lazy(() => import('./pages/legal/PrivacyPolicyPage'));
const TermsPage = lazy(() => import('./pages/legal/TermsPage'));
const CookiePolicyPage = lazy(() => import('./pages/legal/CookiePolicyPage'));
const AcceptableUsePolicyPage = lazy(() => import('./pages/legal/AcceptableUsePolicyPage'));
const PrivacyRoadmapPage = lazy(() => import('./pages/PrivacyRoadmapPage'));

const allRedirects = AFRICA_ROUTE_REDIRECTS;

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Layout />}>
      {Object.entries(allRedirects).map(([from, to]) => (
        <Route key={from} path={from} element={<Navigate to={to} replace />} />
      ))}
      <Route path="/resources/guides/*" element={<Navigate to="/africa/sources" replace />} />
      <Route path="/resources/checklists/*" element={<Navigate to="/africa/sources" replace />} />
      <Route path="/blog/*" element={<Navigate to="/" replace />} />

      <Route path="/" element={<AfricaHomePage />} />
      <Route path="/global" element={<HomePage />} />

      <Route path="/africa/countries" element={<AfricaCountriesPage />} />
      <Route path="/africa/countries/:countrySlug" element={<AfricaCountryPage />} />
      <Route path="/africa/scamshield" element={<ScamShieldAfricaPage />} />
      <Route path="/africa/personas/:countrySlug" element={<AfricaPersonasPage />} />
      <Route path="/africa/action-center/:countrySlug" element={<AfricaActionCenterPage />} />
      <Route path="/africa/sources" element={<AfricaSourcesPage />} />
      <Route path="/africa/partner" element={<AfricaPartnerPage />} />
      <Route path="/africa/roadmap" element={<PrivacyRoadmapPage />} />

      <Route path="/about" element={<AboutPage />} />
      <Route path="/contact" element={<ContactPage />} />

      <Route path="/assessment" element={<AssessmentPage />} />
      <Route path="/assessment/exposure" element={<ExposureAssessmentPage />} />
      <Route path="/assessment/rights" element={<PrivacyRightsAssessmentPage />} />
      <Route path="/assessment/security" element={<SecurityAssessmentPage />} />
      <Route path="/assessment/results" element={<AssessmentResultsPage />} />

      <Route path="/privacy-laws" element={<PrivacyLawsPage />} />
      <Route path="/privacy" element={<PrivacyPolicyPage />} />
      <Route path="/terms" element={<TermsPage />} />
      <Route path="/cookies" element={<CookiePolicyPage />} />
      <Route path="/acceptable-use" element={<AcceptableUsePolicyPage />} />

      <Route path="/404" element={<NotFoundPage />} />
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Route>
  )
);

function App() {
  return (
    <EnhancedErrorBoundary>
      <ErrorBoundary>
        <ThemeProvider>
          <ToastProvider>
            <AuthProvider>
              <PersonaProvider>
                {import.meta.env.DEV && (
                  <>
                    <ProductionChecklist />
                    <PerformanceMonitor />
                  </>
                )}
                <RouterProvider router={router} />
              </PersonaProvider>
            </AuthProvider>
          </ToastProvider>
        </ThemeProvider>
      </ErrorBoundary>
    </EnhancedErrorBoundary>
  );
}

export default App;
