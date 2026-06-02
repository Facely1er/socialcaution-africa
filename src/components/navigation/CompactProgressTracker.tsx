import React from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { Target, Star, Shield, Users, BookOpen, ArrowRight } from 'lucide-react';
import { getPrivacyJourneyProgress } from '../../data/privacyJourneySteps';

const STEP_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  home: Star,
  personas: Users,
  assessment: Shield,
  dashboard: Target,
  resources: BookOpen,
  journey: ArrowRight,
};

interface CompactProgressTrackerProps {
  className?: string;
}

const CompactProgressTracker: React.FC<CompactProgressTrackerProps> = ({
  className = '',
}) => {
  const location = useLocation();
  const journeyProgress = getPrivacyJourneyProgress(location.pathname);

  if (!journeyProgress) return null;

  const { stepNumber, total, progress, currentStep } = journeyProgress;
  const StepIcon = STEP_ICONS[currentStep.id] ?? Target;

  return (
    <div
      className={`flex items-center gap-2 px-2 py-1 bg-accent/10 dark:bg-accent/20 rounded-md border border-accent/30 ${className}`}
      aria-label={`Privacy journey: step ${stepNumber} of ${total}, ${currentStep.title}`}
    >
      <StepIcon className="h-3.5 w-3.5 text-accent flex-shrink-0" aria-hidden="true" />
      <div className="w-12 sm:w-16 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden flex-shrink-0">
        <motion.div
          className="h-full bg-gradient-to-r from-accent to-primary rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
      <span className="text-xs font-semibold text-gray-900 dark:text-white tabular-nums whitespace-nowrap">
        Step {stepNumber} of {total}
      </span>
      <span className="hidden md:inline text-xs text-gray-500 dark:text-gray-400 truncate max-w-[8rem]">
        {currentStep.title}
      </span>
    </div>
  );
};

export default CompactProgressTracker;
