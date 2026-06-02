import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Shield, ArrowRight, AlertTriangle } from 'lucide-react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Section from '../../components/common/Section';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import ActionPlan from '../../components/dashboard/ActionPlan';
import { useDashboardActionPlan } from '../../hooks/useDashboardActionPlan';
import { useAssessmentStore } from '../../store/assessmentStore';

const ActionPlanPage: React.FC = () => {
  const navigate = useNavigate();
  const tasks = useDashboardActionPlan();
  const { results } = useAssessmentStore();

  return (
    <DashboardLayout>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <Section>
          {!results || tasks.length === 0 ? (
            <Card className="p-8 text-center">
              <Shield className="h-12 w-12 text-accent mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-primary mb-2">No action plan yet</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
                Complete a privacy assessment to generate personalized action items based on your
                results.
              </p>
              <Button variant="primary" onClick={() => navigate('/assessment')}>
                Take Privacy Assessment
              </Button>
            </Card>
          ) : (
            <ActionPlan tasks={tasks} />
          )}

          <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card className="p-4">
              <div className="flex items-center mb-3">
                <Shield className="h-5 w-5 text-accent mr-2" />
                <h3 className="font-medium text-primary">Prioritize High Impact</h3>
              </div>
              <p className="text-sm text-gray-600">
                Focus on completing high-impact actions first to quickly improve your privacy
                protection.
              </p>
            </Card>

            <Card className="p-4">
              <div className="flex items-center mb-3">
                <AlertTriangle className="h-5 w-5 text-warning mr-2" />
                <h3 className="font-medium text-primary">Regular Updates</h3>
              </div>
              <p className="text-sm text-gray-600">
                New recommendations appear when you complete assessments or focused checkups from
                the dashboard.
              </p>
            </Card>

            <Card className="p-4">
              <div className="flex items-center mb-3">
                <ArrowRight className="h-5 w-5 text-accent mr-2" />
                <h3 className="font-medium text-primary">Track Progress</h3>
              </div>
              <p className="text-sm text-gray-600">
                Mark actions complete in your progress tracker to update completion counts on the
                dashboard home.
              </p>
            </Card>
          </div>
        </Section>
      </motion.div>
    </DashboardLayout>
  );
};

export default ActionPlanPage;
