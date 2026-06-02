import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Section from '../../components/common/Section';
import ExposureAssessment from '../../components/assessment/ExposureAssessment';
import { useAssessmentStore } from '../../store/assessmentStore';
import { useProgressStore } from '../../store/progressStore';
import { persistMiniAssessment, type MiniAssessmentResult } from '../../utils/dashboardData';

const ExposureCheckDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const setResults = useAssessmentStore((s) => s.setResults);
  const completeAssessment = useProgressStore((s) => s.completeAssessment);

  const handleComplete = (results: MiniAssessmentResult) => {
    persistMiniAssessment(
      results,
      'exposure',
      setResults,
      () => useAssessmentStore.getState().results
    );
    completeAssessment();

    navigate('/dashboard', {
      state: {
        assessmentCompleted: true,
        assessmentType: 'exposure',
        results,
      },
    });
  };

  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Section>
          <ExposureAssessment onComplete={handleComplete} />
        </Section>
      </motion.div>
    </DashboardLayout>
  );
};

export default ExposureCheckDashboardPage;