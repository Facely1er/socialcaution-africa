import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Shield, ArrowRight, AlertTriangle, CheckCircle, Search, FileCheck,
} from 'lucide-react';
import PageLayout from '../../components/layout/PageLayout';
import Section from '../../components/common/Section';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import { useABTestStore } from '../../store/abTestStore';

const AssessmentResultsPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { results, type } = location.state || {};

  // Parent-journey awareness — used to surface family dashboard CTA
  const { familyProfile } = useABTestStore();
  const isParentJourney = familyProfile.completedOnboarding;

  if (!results) {
    return (
      <PageLayout
        title="No Results Found"
        subtitle="Please complete a privacy assessment to view your results."
        breadcrumbs={[
          { label: 'Assessment', path: '/assessment' },
          { label: 'Results', path: '/assessment/results' },
        ]}
      >
        <Section>
          <Card className="p-6 text-center">
            <AlertTriangle className="h-16 w-16 text-warning mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-primary mb-4">No Results Found</h2>
            <p className="text-gray-600 mb-6">
              Please complete a privacy assessment to view your results.
            </p>
            <Button variant="primary" onClick={() => navigate('/assessment')}>
              Take Assessment
            </Button>
          </Card>
        </Section>
      </PageLayout>
    );
  }

  const getAssessmentTitle = () => {
    switch (type) {
      case 'exposure': return 'Digital Exposure Assessment Results';
      case 'rights':   return 'Privacy Rights Assessment Results';
      case 'security': return 'Security Assessment Results';
      default:         return 'Assessment Results';
    }
  };

  const AssessmentIcon =
    type === 'exposure' ? Search : type === 'rights' ? FileCheck : Shield;

  const scoreDescription =
    results.overallScore >= 80 ? 'Excellent Privacy Protection'
    : results.overallScore >= 60 ? 'Good Privacy Practices'
    : 'Privacy Needs Attention';

  const scoreMessage =
    results.overallScore >= 80
      ? 'Your privacy practices are strong. Keep up the good work!'
      : results.overallScore >= 60
      ? 'You have good privacy practices with some room for improvement.'
      : 'Your privacy practices need significant improvement to better protect your data.';

  return (
    <PageLayout
      title={getAssessmentTitle()}
      breadcrumbs={[
        { label: 'Assessment', path: '/assessment' },
        { label: 'Results', path: '/assessment/results' },
      ]}
    >
      <Section>
        <div className="max-w-4xl mx-auto">
          {/* Overall Score */}
          <Card className="p-8 mb-6">
            <div className="text-center mb-8">
              <div className="relative w-32 h-32 mx-auto mb-4">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="45" fill="none" stroke="#e2e8f0" strokeWidth="10" />
                  <circle
                    cx="50" cy="50" r="45" fill="none"
                    stroke={
                      results.overallScore >= 80 ? '#4CAF50'
                      : results.overallScore >= 60 ? '#FFC107'
                      : '#F44336'
                    }
                    strokeWidth="10"
                    strokeDasharray={`${results.overallScore * 2.83} 283`}
                    transform="rotate(-90 50 50)"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center flex-col">
                  <span className="text-4xl font-bold">{results.overallScore}%</span>
                  <span className="text-sm text-gray-500">Overall Score</span>
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">{scoreDescription}</h3>
              <p className="text-gray-600">{scoreMessage}</p>
            </div>

            {results.categoryScores && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Object.entries(results.categoryScores).map(([category, score]) => (
                  <div key={category} className="bg-light-blue/10 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-primary">{category}</h4>
                      <Badge variant={Number(score) >= 80 ? 'success' : Number(score) >= 60 ? 'warning' : 'danger'}>
                        {score}%
                      </Badge>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          Number(score) >= 80 ? 'bg-success'
                          : Number(score) >= 60 ? 'bg-warning'
                          : 'bg-danger'
                        }`}
                        style={{ width: `${score}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>

          {/* Priority Areas */}
          {results.priorityAreas && results.priorityAreas.length > 0 && (
            <Card className="p-6 mb-6">
              <h3 className="text-xl font-semibold mb-6">Priority Areas for Improvement</h3>
              <div className="space-y-4">
                {results.priorityAreas.map((area: string, index: number) => (
                  <div key={index} className="flex items-start p-4 bg-light-blue/10 rounded-lg">
                    <AlertTriangle className="h-5 w-5 text-warning mt-1 mr-3" />
                    <div>
                      <h4 className="font-medium text-primary mb-1">{area}</h4>
                      <p className="text-sm text-gray-600">
                        This area requires attention to improve your overall privacy protection.
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Recommendations */}
          {results.recommendations && results.recommendations.length > 0 && (
            <Card className="p-6 mb-6">
              <h3 className="text-xl font-semibold mb-6">Recommendations</h3>
              <div className="space-y-4">
                {results.recommendations.map((rec: string, index: number) => (
                  <div key={index} className="flex items-start p-4 bg-light-blue/10 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-accent mt-1 mr-3" />
                    <p className="text-gray-600">{rec}</p>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Next Steps */}
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-6">Next Steps</h3>

            {/* Parent journey: family dashboard is the primary CTA */}
            {isParentJourney && (
              <div className="mb-6 p-5 bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-700 rounded-xl text-center">
                <Shield className="h-8 w-8 text-orange-500 mx-auto mb-3" />
                <h4 className="font-semibold text-orange-800 dark:text-orange-300 mb-1">
                  Your Family Dashboard is ready
                </h4>
                <p className="text-sm text-orange-700 dark:text-orange-400 mb-4">
                  Your score has been added to your family profile. View your personalised action plan and 30-day roadmap.
                </p>
                <Button
                  variant="primary"
                  onClick={() => navigate('/parent/dashboard')}
                  className="w-full sm:w-auto"
                >
                  <Shield className="mr-2 h-4 w-4" />
                  View your Family Dashboard
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            )}

            {/* Standard next-step cards (always shown) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-light-blue/10 p-4 rounded-lg">
                <div className="flex items-center mb-4">
                  <AssessmentIcon className="h-5 w-5 text-accent mr-2" />
                  <h4 className="font-medium text-primary">View Detailed Action Plan</h4>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  Get a personalised step-by-step plan to improve your privacy protection.
                </p>
                <Button
                  variant="primary"
                  onClick={() => navigate('/dashboard/action-plan')}
                  className="w-full"
                >
                  View Detailed Action Plan
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>

              <div className="bg-light-blue/10 p-4 rounded-lg">
                <div className="flex items-center mb-4">
                  <CheckCircle className="h-5 w-5 text-accent mr-2" />
                  <h4 className="font-medium text-primary">Take Another Assessment</h4>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  Complete additional assessments to get a comprehensive privacy profile.
                </p>
                <Button
                  variant="primary"
                  onClick={() => navigate('/assessment')}
                  className="w-full"
                >
                  More Assessments
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex justify-center">
              <Button variant="outline" onClick={() => navigate('/dashboard')}>
                Go to Dashboard
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </Card>
        </div>
      </Section>
    </PageLayout>
  );
};

export default AssessmentResultsPage;
