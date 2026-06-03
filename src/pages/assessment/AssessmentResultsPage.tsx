import React from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import {
  Shield,
  ArrowRight,
  AlertTriangle,
  CheckCircle,
  Search,
  FileCheck,
  MapPin,
  Map,
} from 'lucide-react';
import AfricaPageLayout from '../africa/AfricaPageLayout';
import Section from '../../components/common/Section';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';

const AssessmentResultsPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { results, type } = (location.state as { results?: Record<string, unknown>; type?: string }) || {};

  if (!results || typeof results.overallScore !== 'number') {
    return (
      <AfricaPageLayout
        title="No results"
        subtitle="Complete an assessment first"
        description="Your score is saved after you finish a security, exposure, or rights assessment."
      >
        <Section>
          <Card className="p-6 text-center">
            <AlertTriangle className="h-12 w-12 text-accent mx-auto mb-4" />
            <Button variant="primary" onClick={() => navigate('/assessment')}>
              Go to assessments
            </Button>
          </Card>
        </Section>
      </AfricaPageLayout>
    );
  }

  const overallScore = results.overallScore as number;
  const categoryScores = results.categoryScores as Record<string, number> | undefined;
  const priorityAreas = results.priorityAreas as string[] | undefined;
  const recommendations = results.recommendations as string[] | undefined;

  const getAssessmentTitle = () => {
    switch (type) {
      case 'exposure':
        return 'Digital exposure results';
      case 'rights':
        return 'Privacy rights results';
      case 'security':
        return 'Security assessment results';
      default:
        return 'Assessment results';
    }
  };

  const AssessmentIcon = type === 'exposure' ? Search : type === 'rights' ? FileCheck : Shield;

  const scoreDescription =
    overallScore >= 80
      ? 'Strong practices'
      : overallScore >= 60
        ? 'Good — room to improve'
        : 'Needs attention';

  const scoreMessage =
    overallScore >= 80
      ? 'Your habits align well with safer digital and mobile-money practices.'
      : overallScore >= 60
        ? 'You are on the right track; focus on the priority areas below.'
        : 'Prioritize scam prevention and your country’s reporting paths next.';

  return (
    <AfricaPageLayout title={getAssessmentTitle()} subtitle="Africa Edition — educational scores only">
      <Section>
        <div className="max-w-4xl mx-auto">
          <Card className="p-8 mb-6">
            <div className="text-center mb-8">
              <div className="relative w-32 h-32 mx-auto mb-4">
                <svg className="w-full h-full" viewBox="0 0 100 100" aria-hidden>
                  <circle cx="50" cy="50" r="45" fill="none" stroke="#e2e8f0" strokeWidth="10" />
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke={overallScore >= 80 ? '#4CAF50' : overallScore >= 60 ? '#FFC107' : '#F44336'}
                    strokeWidth="10"
                    strokeDasharray={`${overallScore * 2.83} 283`}
                    transform="rotate(-90 50 50)"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-4xl font-bold text-primary dark:text-white">{overallScore}%</span>
                  <span className="text-sm text-gray-500">Overall</span>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-primary dark:text-white mb-2">{scoreDescription}</h3>
              <p className="text-gray-600 dark:text-gray-300">{scoreMessage}</p>
            </div>

            {categoryScores && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {Object.entries(categoryScores).map(([category, score]) => (
                  <div key={category} className="p-4 rounded-lg border border-border bg-background-secondary/50">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-primary dark:text-white text-sm">{category}</h4>
                      <Badge
                        variant={Number(score) >= 80 ? 'success' : Number(score) >= 60 ? 'warning' : 'danger'}
                      >
                        {score}%
                      </Badge>
                    </div>
                    <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          Number(score) >= 80 ? 'bg-success' : Number(score) >= 60 ? 'bg-warning' : 'bg-danger'
                        }`}
                        style={{ width: `${score}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>

          {priorityAreas && priorityAreas.length > 0 && (
            <Card className="p-6 mb-6">
              <h3 className="text-xl font-semibold text-primary dark:text-white mb-4">Priority areas</h3>
              <ul className="space-y-3">
                {priorityAreas.map((area) => (
                  <li key={area} className="flex items-start gap-3 p-3 rounded-lg bg-accent/5">
                    <AlertTriangle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">{area}</span>
                  </li>
                ))}
              </ul>
            </Card>
          )}

          {recommendations && recommendations.length > 0 && (
            <Card className="p-6 mb-6">
              <h3 className="text-xl font-semibold text-primary dark:text-white mb-4">Recommendations</h3>
              <ul className="space-y-3">
                {recommendations.map((rec) => (
                  <li key={rec} className="flex items-start gap-3 p-3 rounded-lg border border-border">
                    <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-600 dark:text-gray-300">{rec}</span>
                  </li>
                ))}
              </ul>
            </Card>
          )}

          <Card className="p-6">
            <h3 className="text-xl font-semibold text-primary dark:text-white mb-4">Next steps</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">
              Turn your score into country-specific actions — not a generic dashboard.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="p-4 rounded-xl border border-border">
                <div className="flex items-center gap-2 mb-2">
                  <Map className="h-5 w-5 text-accent" />
                  <h4 className="font-semibold text-primary dark:text-white">Privacy roadmap</h4>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                  Mobile money PIN, SIM checks, and complaint paths tailored for Africa.
                </p>
                <Link to="/africa/roadmap">
                  <Button variant="primary" className="w-full">
                    Open roadmap
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
              <div className="p-4 rounded-xl border border-border">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="h-5 w-5 text-accent" />
                  <h4 className="font-semibold text-primary dark:text-white">Country profile</h4>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                  Laws, regulators, personas, and your action center by country.
                </p>
                <Link to="/africa/countries">
                  <Button variant="outline" className="w-full">
                    Choose country
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex flex-wrap gap-3 justify-center">
              <Button variant="outline" onClick={() => navigate('/assessment')}>
                <AssessmentIcon className="mr-2 h-4 w-4" />
                More assessments
              </Button>
              <Button variant="outline" onClick={() => navigate('/africa/scamshield')}>
                ScamShield
              </Button>
            </div>
          </Card>
        </div>
      </Section>
    </AfricaPageLayout>
  );
};

export default AssessmentResultsPage;
