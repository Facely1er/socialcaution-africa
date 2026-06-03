import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import PageLayout from '../../components/layout/PageLayout';
import Section from '../../components/common/Section';
import ExposureAssessment from '../../components/assessment/ExposureAssessment';
import Button from '../../components/common/Button';
import AfricaAssessmentBanner from '../../components/africa/AfricaAssessmentBanner';
import { useABTestStore } from '../../store/abTestStore';
import { trackABEvent } from '../../ab-test/config';
import { useAssessmentStore } from '../../store/assessmentStore';
import { useProgressStore } from '../../store/progressStore';
import { persistMiniAssessment, type MiniAssessmentResult } from '../../utils/dashboardData';

const ExposureAssessmentPage: React.FC = () => {
  const navigate = useNavigate();
  const { familyProfile, setPrivacyScore, setAssessmentCompleted } = useABTestStore();
  const setResults = useAssessmentStore((s) => s.setResults);
  const completeAssessmentProgress = useProgressStore((s) => s.completeAssessment);

  const handleComplete = (results: MiniAssessmentResult) => {
    persistMiniAssessment(
      results,
      'exposure',
      setResults,
      () => useAssessmentStore.getState().results
    );
    completeAssessmentProgress();

    // Hand off score to the A/B store when coming from parent onboarding
    if (familyProfile.completedOnboarding) {
      setPrivacyScore(results.overallScore);
      setAssessmentCompleted(true);
      trackABEvent('assessment_completed', { score: results.overallScore });
    }

    navigate('/assessment/results', { state: { results, type: 'exposure' } });
  };

  return (
    <PageLayout
      title="Digital Exposure Check"
      subtitle="Exposure check with mobile money and OTP scenarios (Africa Edition beta)"
      heroBackground={false}
      breadcrumbs={[
        { label: 'Assessment', path: '/assessment' },
        { label: 'Digital Exposure Check', path: '/assessment/exposure' },
      ]}
    >
      <Section>
        <div className="mb-8">
          <Button
            variant="outline"
            onClick={() => navigate('/assessment')}
            className="flex items-center"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Assessments
          </Button>
        </div>

        <AfricaAssessmentBanner />
        <ExposureAssessment onComplete={handleComplete} />
      </Section>
    </PageLayout>
  );
};

export default ExposureAssessmentPage;
