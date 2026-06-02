/**
 * ParentDashboardHomePage
 * Assembles all parent-specific widgets into the dashboard home view.
 *
 * Layout (desktop):
 *   [FamilyOverviewWidget 2/3] [ChildrenStatusWidget 1/3]
 *   [ParentActionPlan 2/3]     [30-Day Roadmap CTA 1/3]
 *
 * If the assessment hasn't been completed a nudge banner prompts the user.
 */
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Calendar } from 'lucide-react';
import FamilyOverviewWidget from '../../components/dashboard/parent/FamilyOverviewWidget';
import ChildrenStatusWidget from '../../components/dashboard/parent/ChildrenStatusWidget';
import ParentActionPlan from '../../components/dashboard/parent/ParentActionPlan';
import { useABTestStore } from '../../store/abTestStore';
import { getABConfig, trackABEvent } from '../../ab-test/config';

export default function ParentDashboardHomePage() {
  const navigate = useNavigate();
  const { assessmentCompleted } = useABTestStore();
  const { variant } = getABConfig();

  const handleStartRoadmap = () => {
    trackABEvent('roadmap_cta_clicked', { variant, source: 'parent_dashboard_home' });
    navigate('/30-day-roadmap');
  };

  const handleStartAssessment = () => {
    trackABEvent('assessment_cta_clicked', { variant, source: 'parent_dashboard_nudge' });
    navigate('/assessment/exposure');
  };

  return (
    <div className="p-5 md:p-8 max-w-5xl mx-auto">
      {/* ── Page header ── */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Family Privacy Dashboard</h1>
        <p className="text-gray-400 text-sm mt-1">
          {assessmentCompleted
            ? "Here's your family's current privacy status and recommended actions."
            : 'Complete your assessment to see your full privacy picture.'}
        </p>
      </div>

      {/* ── Assessment nudge banner ── */}
      {!assessmentCompleted && (
        <div className="bg-orange-500/8 border border-orange-500/30 rounded-2xl p-4 mb-6 flex items-center justify-between gap-4 flex-wrap">
          <div>
            <p className="text-orange-300 font-medium text-sm">📋 Assessment pending</p>
            <p className="text-gray-400 text-xs mt-0.5">
              Complete the Family Privacy Checkup (~15 min) to get your personalised score and action plan.
            </p>
          </div>
          <button
            onClick={handleStartAssessment}
            className="flex-shrink-0 inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-400 text-white font-semibold text-sm py-2 px-4 rounded-xl transition-colors"
          >
            Start now <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* ── Top row ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-5">
        <div className="lg:col-span-2">
          <FamilyOverviewWidget />
        </div>
        <div>
          <ChildrenStatusWidget />
        </div>
      </div>

      {/* ── Bottom row ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2">
          <ParentActionPlan />
        </div>

        {/* 30-day roadmap CTA card */}
        <div className="bg-gradient-to-br from-orange-600 to-amber-500 rounded-2xl p-6 flex flex-col justify-between">
          <div>
            <Calendar className="w-8 h-8 text-white/80 mb-3" />
            <h3 className="text-white font-bold text-lg mb-2">30-Day Privacy Roadmap</h3>
            <p className="text-white/80 text-sm leading-relaxed">
              Daily tasks to systematically improve your family's privacy. 10 minutes a day — big results in a month.
            </p>
          </div>
          <button
            onClick={handleStartRoadmap}
            className="mt-5 bg-white/20 hover:bg-white/30 active:bg-white/10 text-white font-semibold text-sm py-2.5 px-4 rounded-xl transition-colors flex items-center gap-2"
          >
            <Calendar className="w-4 h-4" />
            Start the roadmap
          </button>
        </div>
      </div>

      {/* Dev variant indicator */}
      {import.meta.env.DEV && (
        <p className="text-xs text-gray-700 text-center mt-8">
          A/B Variant: <strong className="text-gray-500">{variant}</strong> —{' '}
          {variant === 'A' ? 'Persona-First' : 'Concern-First'}
        </p>
      )}
    </div>
  );
}
