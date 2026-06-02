import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, PlayCircle, ArrowRight } from 'lucide-react';
import Card from '../common/Card';
import Button from '../common/Button';
import { seedDemoState, startFreshSession } from '../../services/demoState';

interface DashboardStartFlowProps {
  onDemoLoaded?: () => void;
}

const DashboardStartFlow: React.FC<DashboardStartFlowProps> = ({ onDemoLoaded }) => {
  const navigate = useNavigate();

  const handleExploreDemo = () => {
    seedDemoState();
    onDemoLoaded?.();
  };

  const handleStartFresh = () => {
    startFreshSession();
    navigate('/assessment');
  };

  return (
    <Card className="p-6 sm:p-8 max-w-lg mx-auto text-center">
      <Sparkles className="h-12 w-12 text-accent mx-auto mb-4" />
      <h2 className="text-2xl font-bold text-text dark:text-text mb-2">
        Welcome to Your Privacy Dashboard
      </h2>
      <p className="text-text-secondary dark:text-text-secondary mb-6 text-sm sm:text-base">
        Explore a sample dashboard with realistic scores and tasks, or start fresh with your own privacy assessment.
      </p>

      <div className="flex flex-col gap-3">
        <Button variant="primary" className="w-full justify-center" onClick={handleExploreDemo}>
          <PlayCircle className="h-5 w-5 mr-2" />
          Explore Demo Dashboard
        </Button>
        <Button variant="outline" className="w-full justify-center" onClick={handleStartFresh}>
          Start Fresh — Take Assessment
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </div>

      <p className="text-xs text-text-secondary dark:text-text-secondary mt-4">
        Demo data is stored locally and can be cleared anytime.
      </p>
    </Card>
  );
};

export default DashboardStartFlow;
