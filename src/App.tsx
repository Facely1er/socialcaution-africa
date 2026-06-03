import { Suspense, lazy } from 'react';
import { createBrowserRouter, RouterProvider, createRoutesFromElements, Route, Navigate } from 'react-router-dom';
import ErrorBoundary from './components/common/ErrorBoundary';
import EnhancedErrorBoundary from './components/common/EnhancedErrorBoundary';
import { AuthProvider } from './components/auth/AuthProvider';
import { ThemeProvider } from './contexts/ThemeContext';
import { PersonaProvider } from './core/providers/PersonaProvider';
import { ToastProvider } from './components/common/ToastProvider';
import Layout from './components/layout/Layout';
import { AFRICA_LEGACY_REDIRECTS } from './config/africaEditionNav';
import ProductionChecklist from './components/common/ProductionChecklist';
import PerformanceMonitor from './components/common/PerformanceMonitor';

// Landing pages — eagerly loaded for fast first paint (avoids router hook errors on /)
import HomePage from './pages/HomePage';
import AfricaHomePage from './pages/africa/AfricaHomePage';

// Heavy routes — lazy loaded to avoid circular chunk init errors on landing page
const DashboardPage = lazy(() => import('./pages/DashboardPage'));
const DashboardHomePage = lazy(() => import('./pages/dashboard/ModernDashboardHomePage'));
const AssessmentPage = lazy(() => import('./pages/AssessmentPage'));
const ToolkitPage = lazy(() => import('./pages/ToolkitPage'));

// MVP Pages (simplified persona-based privacy caution system)
const PersonaSelection = lazy(() => import('./pages/PersonaSelection'));
const CautionFeed = lazy(() => import('./pages/CautionFeed'));
const SimpleDashboard = lazy(() => import('./pages/SimpleDashboard'));

// ── A/B Test — Parent Journey ──────────────────────────────────────
const VariantRouter = lazy(() => import('./pages/ab-test/VariantRouter'));
const OnboardingWizard = lazy(() => import('./pages/ab-test/onboarding/OnboardingWizard'));
const ParentDashboardPage = lazy(() => import('./pages/ab-test/ParentDashboardPage'));
const ParentDashboardHomePage = lazy(() => import('./pages/ab-test/ParentDashboardHomePage'));

// Assessment related pages (AssessmentPage is eagerly loaded above)
const ExposureAssessmentPage = lazy(() => import('./pages/assessment/ExposureAssessmentPage'));
const PrivacyRightsAssessmentPage = lazy(() => import('./pages/assessment/PrivacyRightsAssessmentPage'));
const SecurityAssessmentPage = lazy(() => import('./pages/assessment/SecurityAssessmentPage'));
const AssessmentResultsPage = lazy(() => import('./pages/assessment/AssessmentResultsPage'));

// Core pages
const AboutPage = lazy(() => import('./pages/AboutPage'));
const FeaturesPage = lazy(() => import('./pages/FeaturesPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const PricingPage = lazy(() => import('./pages/PricingPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));
const HowItWorksPage = lazy(() => import('./pages/HowItWorksPage'));
const HelpCenterPage = lazy(() => import('./pages/HelpCenterPage'));
const PrivacyFocusPage = lazy(() => import('./pages/PrivacyFocusPage'));

// Africa regionalization pages (home is eager — see import above)
const AfricaCountriesPage = lazy(() => import('./pages/africa/AfricaCountriesPage'));
const AfricaCountryPage = lazy(() => import('./pages/africa/AfricaCountryPage'));
const ScamShieldAfricaPage = lazy(() => import('./pages/africa/ScamShieldAfricaPage'));
const AfricaPersonasPage = lazy(() => import('./pages/africa/AfricaPersonasPage'));
const AfricaActionCenterPage = lazy(() => import('./pages/africa/AfricaActionCenterPage'));
const AfricaSourcesPage = lazy(() => import('./pages/africa/AfricaSourcesPage'));
const AfricaPartnerPage = lazy(() => import('./pages/africa/AfricaPartnerPage'));

// Privacy journey related pages
const PrivacyActionCenterPage = lazy(() => import('./pages/PrivacyActionCenterPage'));
const PrivacyJourneyPage = lazy(() => import('./pages/PrivacyJourneyPage'));
const ThirtyDayRoadmapPage = lazy(() => import('./pages/ThirtyDayRoadmapPage'));
const PersonaSelectionPage = lazy(() => import('./pages/PersonaSelectionPage'));

// Persona pages
const CautiousParentPage = lazy(() => import('./pages/personas/CautiousParentPage'));
const PrivateIndividualPage = lazy(() => import('./pages/personas/PrivateIndividualPage'));
const OnlineShopperPage = lazy(() => import('./pages/personas/OnlineShopperPage'));
const SocialInfluencerPage = lazy(() => import('./pages/personas/SocialInfluencerPage'));
const PrivacyAdvocatePage = lazy(() => import('./pages/personas/PrivacyAdvocatePage'));
const EmployeePersonaPage = lazy(() => import('./pages/personas/EmployeePersonaPage'));

// Help pages
const ActionPlanTutorial = lazy(() => import('./pages/help/ActionPlanTutorial'));
const TestAssessmentPage = lazy(() => import('./pages/TestAssessmentPage'));
const GettingStartedGuide = lazy(() => import('./pages/help/GettingStartedGuide'));

// Resources related pages (ToolkitPage is eagerly loaded above)
const ResourcesPage = lazy(() => import('./pages/ResourcesPage'));
const GuidesPage = lazy(() => import('./pages/resources/GuidesPage'));
const ChecklistsPage = lazy(() => import('./pages/resources/ChecklistsPage'));
const ToolsPage = lazy(() => import('./pages/resources/ToolsPage'));
const ResourceGuidePage = lazy(() => import('./pages/ResourceGuidePage'));

// Blog related pages
const BlogPage = lazy(() => import('./pages/BlogPage'));
const PrivacyImportanceBlogPost = lazy(() => import('./pages/blog/PrivacyImportanceBlogPost'));
const DataProtectionLawsBlogPost = lazy(() => import('./pages/blog/DataProtectionLawsBlogPost'));
const PrivacyToolsSocialMediaBlogPost = lazy(() => import('./pages/blog/PrivacyToolsSocialMediaBlogPost'));
const ChildrenPrivacyProtectionBlogPost = lazy(() => import('./pages/blog/ChildrenPrivacyProtectionBlogPost'));
const HiddenCostFreeBlogPost = lazy(() => import('./pages/blog/HiddenCostFreeBlogPost'));
const PrivacyBrowsersComparisonBlogPost = lazy(() => import('./pages/blog/PrivacyBrowsersComparisonBlogPost'));
const PrivacyLawsBlogPost = lazy(() => import('./pages/blog/PrivacyLawsBlogPost'));
const WorkplacePrivacyBlogPost = lazy(() => import('./pages/blog/WorkplacePrivacyBlogPost'));

// Legal related pages
const PrivacyLawsPage = lazy(() => import('./pages/legal/PrivacyLawsPage'));
const GDPRPage = lazy(() => import('./pages/legal/GDPRPage'));
const GlobalPrivacyActPage = lazy(() => import('./pages/legal/GlobalPrivacyActPage'));
const USPrivacyPage = lazy(() => import('./pages/legal/USPrivacyPage'));
const EnforcementPage = lazy(() => import('./pages/legal/EnforcementPage'));
const PrivacyPolicyPage = lazy(() => import('./pages/legal/PrivacyPolicyPage'));
const TermsPage = lazy(() => import('./pages/legal/TermsPage'));
const CookiePolicyPage = lazy(() => import('./pages/legal/CookiePolicyPage'));
const AcceptableUsePolicyPage = lazy(() => import('./pages/legal/AcceptableUsePolicyPage'));

// Dashboard related pages (DashboardPage and DashboardHomePage are eagerly loaded above)
const ActionPlanPage = lazy(() => import('./pages/dashboard/ActionPlanPage'));
const HistoryPage = lazy(() => import('./pages/dashboard/HistoryPage'));
const ExposureCheckDashboardPage = lazy(() => import('./pages/dashboard/ExposureCheckDashboardPage'));
const RightsCheckupDashboardPage = lazy(() => import('./pages/dashboard/RightsCheckupDashboardPage'));
const CompleteAssessmentDashboardPage = lazy(() => import('./pages/dashboard/CompleteAssessmentDashboardPage'));
const ProfilePage = lazy(() => import('./pages/dashboard/ProfilePage'));
const SettingsPage = lazy(() => import('./pages/dashboard/SettingsPage'));
const HelpPage = lazy(() => import('./pages/dashboard/HelpPage'));
const NotificationsPage = lazy(() => import('./pages/dashboard/NotificationsPage'));

// Privacy tools
const PrivacyAssessmentTool = lazy(() => import('./pages/tools/PrivacyAssessmentTool'));
const PersonalDataInventory = lazy(() => import('./pages/tools/PersonalDataInventory'));
const PasswordStrengthChecker = lazy(() => import('./pages/tools/PasswordStrengthChecker'));

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Layout />}>
      {/* Legacy global marketing routes → Africa edition (stakeholder focus) */}
      {Object.entries(AFRICA_LEGACY_REDIRECTS).map(([from, to]) => (
        <Route key={from} path={from} element={<Navigate to={to} replace />} />
      ))}

      {/* ── Main ── */}
      <Route path="/" element={<AfricaHomePage />} />
      <Route path="/africa" element={<Navigate to="/" replace />} />
      <Route path="/global" element={<HomePage />} />

      {/* ── MVP (simplified persona-based flow) ── */}
      <Route path="/persona-selection" element={<PersonaSelection />} />
      <Route path="/cautions" element={<CautionFeed />} />
      <Route path="/simple-dashboard" element={<SimpleDashboard />} />

      {/* ── A/B Test — Parent Journey ─────────────────────────────
          /parent          → VariantRouter (variant-aware landing)
          /parent/onboarding → shared 5-step wizard
          /parent/dashboard  → family dashboard (nested)
          ──────────────────────────────────────────────────────── */}
      <Route path="/parent" element={<VariantRouter />} />
      <Route path="/parent/onboarding" element={<OnboardingWizard />} />
      <Route path="/parent/dashboard" element={<ParentDashboardPage />}>
        <Route index element={<ParentDashboardHomePage />} />
        <Route path="action-plan" element={<ActionPlanPage />} />
      </Route>

      {/* ── Africa Regional Edition ── */}
      <Route path="/africa" element={<AfricaHomePage />} />
      <Route path="/africa/countries" element={<AfricaCountriesPage />} />
      <Route path="/africa/countries/:countrySlug" element={<AfricaCountryPage />} />
      <Route path="/africa/scamshield" element={<ScamShieldAfricaPage />} />
      <Route path="/africa/personas/:countrySlug" element={<AfricaPersonasPage />} />
      <Route path="/africa/action-center/:countrySlug" element={<AfricaActionCenterPage />} />
      <Route path="/africa/sources" element={<AfricaSourcesPage />} />
      <Route path="/africa/partner" element={<AfricaPartnerPage />} />

      {/* ── Core pages ── */}
      <Route path="/about" element={<AboutPage />} />
      <Route path="/features" element={<FeaturesPage />} />
      <Route path="/how-it-works" element={<HowItWorksPage />} />
      <Route path="/help" element={<HelpCenterPage />} />
      <Route path="/help/action-plan" element={<ActionPlanTutorial />} />
      <Route path="/help/getting-started" element={<GettingStartedGuide />} />
      <Route path="/toolkit" element={<ToolkitPage />} />
      <Route path="/resources" element={<ResourcesPage />} />
      <Route path="/privacy-journey" element={<PrivacyJourneyPage />} />
      <Route path="/30-day-roadmap" element={<ThirtyDayRoadmapPage />} />

      {/* ── Privacy Focus and Personas ── */}
      <Route path="/privacy-focus" element={<PrivacyFocusPage />} />
      <Route path="/personas" element={<PersonaSelectionPage />} />
      <Route path="/personas/cautious-parent" element={<CautiousParentPage />} />
      <Route path="/personas/private-individual" element={<PrivateIndividualPage />} />
      <Route path="/personas/online-shopper" element={<OnlineShopperPage />} />
      <Route path="/personas/social-influencer" element={<SocialInfluencerPage />} />
      <Route path="/personas/privacy-advocate" element={<PrivacyAdvocatePage />} />
      <Route path="/personas/concerned-employee" element={<EmployeePersonaPage />} />

      {/* ── Assessment ── */}
      <Route path="/assessment" element={<AssessmentPage />} />
      <Route path="/assessment/exposure" element={<ExposureAssessmentPage />} />
      <Route path="/assessment/rights" element={<PrivacyRightsAssessmentPage />} />
      <Route path="/assessment/security" element={<SecurityAssessmentPage />} />
      <Route path="/assessment/results" element={<AssessmentResultsPage />} />

      {/* ── Test ── */}
      <Route path="/test-assessment" element={<TestAssessmentPage />} />

      {/* ── Privacy Action Center ── */}
      <Route path="/privacy-action-center" element={<PrivacyActionCenterPage />} />

      {/* ── Resources ── */}
      <Route path="/resources/guides" element={<GuidesPage />} />
      <Route path="/resources/guides/:guideId" element={<ResourceGuidePage type="guide" />} />
      <Route path="/resources/checklists" element={<ChecklistsPage />} />
      <Route path="/resources/checklists/:checklistId" element={<ResourceGuidePage type="checklist" />} />
      <Route path="/resources/tools" element={<ToolsPage />} />
      <Route path="/resources/tools/privacy-assessment" element={<PrivacyAssessmentTool />} />
      <Route path="/resources/tools/personal-data-inventory" element={<PersonalDataInventory />} />
      <Route path="/resources/tools/password-strength" element={<PasswordStrengthChecker />} />

      {/* ── Blog ── */}
      <Route path="/blog" element={<BlogPage />} />
      <Route path="/blog/privacy-importance" element={<PrivacyImportanceBlogPost />} />
      <Route path="/blog/data-protection-laws-2024" element={<DataProtectionLawsBlogPost />} />
      <Route path="/blog/privacy-tools-social-media" element={<PrivacyToolsSocialMediaBlogPost />} />
      <Route path="/blog/children-privacy-protection" element={<ChildrenPrivacyProtectionBlogPost />} />
      <Route path="/blog/hidden-cost-free-services" element={<HiddenCostFreeBlogPost />} />
      <Route path="/blog/privacy-browsers-comparison" element={<PrivacyBrowsersComparisonBlogPost />} />
      <Route path="/blog/privacy-laws-2025" element={<PrivacyLawsBlogPost />} />
      <Route path="/blog/workplace-privacy" element={<WorkplacePrivacyBlogPost />} />

      {/* ── Dashboard ── */}
      <Route path="/dashboard" element={<DashboardPage />}>
        <Route index element={<DashboardHomePage />} />
        <Route path="action-plan" element={<ActionPlanPage />} />
        <Route path="history" element={<HistoryPage />} />
        <Route path="exposure-check" element={<ExposureCheckDashboardPage />} />
        <Route path="rights-checkup" element={<RightsCheckupDashboardPage />} />
        <Route path="complete-assessment" element={<CompleteAssessmentDashboardPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="settings" element={<SettingsPage />} />
        <Route path="notifications" element={<NotificationsPage />} />
        <Route path="help" element={<HelpPage />} />
        <Route path="preferences" element={<Navigate to="/dashboard/settings" replace />} />
        <Route path="security" element={<Navigate to="/dashboard/settings" replace />} />
        <Route path="privacy" element={<Navigate to="/dashboard/settings" replace />} />
        <Route path="billing" element={<Navigate to="/pricing" replace />} />
        <Route path="data-export" element={<Navigate to="/dashboard/profile" replace />} />
        <Route path="account-deletion" element={<Navigate to="/dashboard/settings" replace />} />
      </Route>

      {/* ── Legal ── */}
      <Route path="/legal" element={<Navigate to="/privacy-laws" replace />} />
      <Route path="/privacy-laws" element={<PrivacyLawsPage />} />
      <Route path="/privacy-laws/gdpr" element={<GDPRPage />} />
      <Route path="/privacy-laws/global-privacy-act" element={<GlobalPrivacyActPage />} />
      <Route path="/privacy-laws/us-privacy" element={<USPrivacyPage />} />
      <Route path="/privacy-laws/enforcement" element={<EnforcementPage />} />
      <Route path="/privacy" element={<PrivacyPolicyPage />} />
      <Route path="/terms" element={<TermsPage />} />
      <Route path="/cookies" element={<CookiePolicyPage />} />
      <Route path="/acceptable-use" element={<AcceptableUsePolicyPage />} />

      {/* ── Misc ── */}
      <Route path="/pricing" element={<PricingPage />} />
      <Route path="/contact" element={<ContactPage />} />

      {/* ── 404 ── */}
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
