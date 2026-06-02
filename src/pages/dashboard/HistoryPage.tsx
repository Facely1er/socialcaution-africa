import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Section from '../../components/common/Section';
import ScoreHistory from '../../components/dashboard/ScoreHistory';
import Card from '../../components/common/Card';
import { Shield, ArrowRight } from 'lucide-react';
import Button from '../../components/common/Button';
import { useAssessmentStore } from '../../store/assessmentStore';

const HistoryPage: React.FC = () => {
  const navigate = useNavigate();
  const { results, scoreHistory } = useAssessmentStore();

  const scoreHistoryChart = scoreHistory.length > 0
    ? scoreHistory.map((entry) => ({ date: entry.date, score: entry.score }))
    : results
      ? [{ date: new Date().toISOString().split('T')[0], score: results.percentage }]
      : [];

  const assessmentDetails = scoreHistory.length > 0
    ? [...scoreHistory].reverse().map((entry) => ({
        date: entry.date,
        type: entry.type,
        score: entry.score,
        improvements: results?.actionPlan?.slice(0, 3).map((item) => item.title) ?? [],
      }))
    : results
      ? [{
          date: new Date().toISOString().split('T')[0],
          type: 'Latest Assessment',
          score: results.percentage,
          improvements: results.actionPlan?.slice(0, 3).map((item) => item.title) ?? [],
        }]
      : [];

  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {results ? (
          <>
            <Section>
              <ScoreHistory data={scoreHistoryChart} />
            </Section>

            <Section>
              <h3 className="text-xl font-semibold text-primary dark:text-white mb-6">Assessment Details</h3>
              <div className="space-y-4">
                {assessmentDetails.map((assessment, index) => (
                  <Card key={index} className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="text-lg font-semibold text-primary dark:text-white">{assessment.type}</h4>
                        <p className="text-sm text-gray-500">{assessment.date}</p>
                      </div>
                      <div className="text-2xl font-bold text-accent">{assessment.score}%</div>
                    </div>
                    {assessment.improvements.length > 0 && (
                      <div>
                        <p className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">Recommended actions:</p>
                        <ul className="space-y-1">
                          {assessment.improvements.map((item, i) => (
                            <li key={i} className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
                              <Shield className="h-3 w-3 mr-2 text-accent" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </Card>
                ))}
              </div>
            </Section>
          </>
        ) : (
          <Section>
            <Card className="p-8 text-center">
              <Shield className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-primary dark:text-white mb-2">No assessment history yet</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-md mx-auto">
                Complete a privacy assessment to start tracking your progress here.
              </p>
              <Button variant="primary" onClick={() => navigate('/assessment')}>
                Start Assessment
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Card>
          </Section>
        )}
      </motion.div>
    </DashboardLayout>
  );
};

export default HistoryPage;
