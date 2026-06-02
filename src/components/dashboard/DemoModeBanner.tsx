import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FlaskConical, X } from 'lucide-react';
import Button from '../common/Button';
import { useAppModeStore } from '../../store/appModeStore';
import { startFreshSession } from '../../services/demoState';

const DemoModeBanner: React.FC = () => {
  const mode = useAppModeStore((s) => s.mode);
  const navigate = useNavigate();

  if (mode !== 'demo') return null;

  const handleStartFresh = () => {
    startFreshSession();
    navigate('/assessment');
  };

  return (
    <div className="bg-amber-50 dark:bg-amber-950/40 border-b border-amber-200 dark:border-amber-800 px-4 py-2.5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
      <div className="flex items-start sm:items-center gap-2 min-w-0">
        <FlaskConical className="h-4 w-4 text-amber-700 dark:text-amber-400 shrink-0 mt-0.5 sm:mt-0" />
        <p className="text-sm text-amber-900 dark:text-amber-100">
          <span className="font-semibold">Demo mode</span>
          {' — '}
          Sample scores and history. Nothing you do here replaces a real assessment.
        </p>
      </div>
      <Button
        variant="outline"
        size="sm"
        className="shrink-0 border-amber-300 dark:border-amber-700 text-amber-900 dark:text-amber-100 hover:bg-amber-100 dark:hover:bg-amber-900/30"
        onClick={handleStartFresh}
      >
        <X className="h-4 w-4 mr-1.5" />
        Start fresh
      </Button>
    </div>
  );
};

export default DemoModeBanner;
