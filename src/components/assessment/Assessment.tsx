import React, { useState } from 'react';
import { motion } from 'framer-motion';
import QuestionView from './QuestionView';
import ResultsView from './ResultsView';
import StartScreen from './StartScreen';
import LoadingSpinner from '../common/LoadingSpinner';
import { questions } from '../../data/assessmentData';
import type { Answer, AssessmentResults, UserLevel } from '../../types/assessment';
import { useAssessmentStore } from '../../store/assessmentStore';
import { useAppModeStore } from '../../store/appModeStore';
import { useProgressStore } from '../../store/progressStore';
import apiService from '../../services/api';
import { isBackendEnabled } from '../../config/runtime';
import { useAuth } from '../auth/AuthContext';
import { AlertCircle, X, Shield } from 'lucide-react';

const Assessment: React.FC = () => {
  const [started, setStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, Answer>>({});
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [assessmentId, setAssessmentId] = useState<string | null>(null);
  const { setResults, results } = useAssessmentStore();
  const completeAssessmentProgress = useProgressStore((s) => s.completeAssessment);
  const { user } = useAuth();

  const startLocalAssessment = () => {
    setAssessmentId('local-assessment');
    setStarted(true);
  };

  const handleStart = async () => {
    try {
      setLoading(true);
      setError(null);

      if (isBackendEnabled() && user) {
        try {
          const response = await apiService.startAssessment('complete');
          if (response.status === 'success' && response.data) {
            setAssessmentId(response.data.assessment._id);
            setStarted(true);
            return;
          }
          throw new Error(response.message || 'Failed to start assessment');
        } catch (apiErr) {
          if (import.meta.env.DEV) {
            console.warn('[Assessment] Backend unavailable, using local mode.', apiErr);
          }
          startLocalAssessment();
          return;
        }
      }

      startLocalAssessment();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to start assessment');
    } finally {
      setLoading(false);
    }
  };

  const handleAnswer = async (answer: Answer) => {
    if (!assessmentId) return;

    try {
      setLoading(true);
      setError(null);
      
      if (isBackendEnabled() && user && assessmentId !== 'local-assessment') {
        try {
          await apiService.submitAnswer(assessmentId, {
            questionId: questions[currentQuestion].id,
            value: answer.value,
            score: answer.score,
            level: answer.level,
          });
        } catch (apiErr) {
          if (import.meta.env.DEV) {
            console.warn('[Assessment] Answer sync skipped (local mode).', apiErr);
          }
        }
      }

      // Store answer locally for both authenticated and non-authenticated users
      setAnswers(prev => ({
        ...prev,
        [questions[currentQuestion].id]: answer
      }));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit answer');
    } finally {
      setLoading(false);
    }
  };

  const handleNext = async () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      await completeAssessment();
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const handleBack = () => {
    setStarted(false);
    setCurrentQuestion(0);
    setAnswers({});
    setAssessmentId(null);
    setError(null);
  };

  const completeAssessment = async () => {
    if (!assessmentId) return;

    try {
      setLoading(true);
      setError(null);
      
      const finishWithLocalResults = () => {
        const localResults = calculateLocalResults(answers);
        useAppModeStore.getState().setMode('live');
        useAssessmentStore.getState().setScoreHistory([]);
        setResults(localResults, localResults.userLevel);
        completeAssessmentProgress();
        setShowResults(true);
      };

      if (isBackendEnabled() && user && assessmentId !== 'local-assessment') {
        try {
          const response = await apiService.completeAssessment(assessmentId);

          if (response.status === 'success' && response.data) {
            const { results, actionPlan } = response.data;

            const assessmentResults: AssessmentResults = {
              score: results.totalScore,
              maxScore: results.maxPossibleScore,
              percentage: results.percentage,
              actionPlan: actionPlan || [],
              userLevel: results.userLevel,
              categoryScores: results.categoryScores,
              assessmentType: 'complete',
            };

            useAppModeStore.getState().setMode('live');
            useAssessmentStore.getState().setScoreHistory([]);
            setResults(assessmentResults, results.userLevel);
            completeAssessmentProgress();
            setShowResults(true);
            return;
          }
          throw new Error(response.message || 'Failed to complete assessment');
        } catch (apiErr) {
          if (import.meta.env.DEV) {
            console.warn('[Assessment] Completing with local results.', apiErr);
          }
          finishWithLocalResults();
          return;
        }
      }

      finishWithLocalResults();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to complete assessment');
    } finally {
      setLoading(false);
    }
  };

  // Helper function to calculate results locally
  const calculateLocalResults = (answers: Record<string, Answer>): AssessmentResults => {
    let totalScore = 0;
    let maxScore = 0;
    const categoryScores: Record<string, { score: number; maxScore: number }> = {};

    questions.forEach(question => {
      const answer = answers[question.id];
      if (answer) {
        const questionScore = answer.score;
        const questionMaxScore = 5; // Assuming max score per question is 5
        
        totalScore += questionScore;
        maxScore += questionMaxScore;

        if (!categoryScores[question.category]) {
          categoryScores[question.category] = { score: 0, maxScore: 0 };
        }
        categoryScores[question.category].score += questionScore;
        categoryScores[question.category].maxScore += questionMaxScore;
      }
    });

    const percentage = maxScore > 0 ? Math.round((totalScore / maxScore) * 100) : 0;
    
    // Determine user level based on percentage
    let userLevel: UserLevel = 'beginner';
    if (percentage >= 80) userLevel = 'advanced';
    else if (percentage >= 60) userLevel = 'intermediate';

    // Generate basic action plan based on lowest scoring categories
    const actionPlan = Object.entries(categoryScores)
      .sort(([,a], [,b]) => (a.score / a.maxScore) - (b.score / b.maxScore))
      .slice(0, 3)
      .map(([category, _scores], index) => ({
        title: `Improve ${category}`,
        timeframe: '1-2 weeks',
        steps: [
          `Review your current ${category.toLowerCase()} practices`,
          `Identify areas for improvement`,
          `Implement recommended changes`
        ],
        resources: [
          {
            title: `${category} Guide`,
            url: `/resources/guides/${category.toLowerCase().replace(/\s+/g, '-')}`
          }
        ],
        icon: Shield,
        priority: index + 1,
        category: category,
        questionId: '',
        criticality: 3,
        complexity: 2
      }));

    const categoryScorePercentages = Object.fromEntries(
      Object.entries(categoryScores).map(([category, { score, maxScore: catMax }]) => [
        category,
        catMax > 0 ? Math.round((score / catMax) * 100) : 0,
      ])
    );

    return {
      score: totalScore,
      maxScore,
      percentage,
      actionPlan,
      userLevel,
      categoryScores: categoryScorePercentages,
      assessmentType: 'complete',
    };
  };

  const handleReset = () => {
    setAnswers({});
    setCurrentQuestion(0);
    setShowResults(false);
    setStarted(false);
    setAssessmentId(null);
    setError(null);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-start gap-3"
            >
              <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-red-800 dark:text-red-200 font-medium mb-1">Error</p>
                <p className="text-red-700 dark:text-red-300 text-sm">{error}</p>
              </div>
              <button
                type="button"
                onClick={() => setError(null)}
                className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-200 transition-colors"
                aria-label="Dismiss error"
              >
                <X className="h-4 w-4" />
              </button>
            </motion.div>
          )}
          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-4 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg flex items-center gap-3"
            >
              <LoadingSpinner size="sm" />
              <p className="text-blue-800 dark:text-blue-200">Processing your assessment...</p>
            </motion.div>
          )}
          {!started ? (
            <StartScreen onStart={handleStart} />
          ) : !showResults ? (
            <QuestionView
              question={questions[currentQuestion]}
              currentIndex={currentQuestion}
              totalQuestions={questions.length}
              answer={answers[questions[currentQuestion].id]}
              onAnswer={handleAnswer}
              onNext={handleNext}
              onPrevious={handlePrevious}
              onBack={handleBack}
            />
          ) : results ? (
            <ResultsView
              results={results}
              onReset={handleReset}
              onExport={() => {}}
            />
          ) : null}
      </motion.div>
    </div>
  );
};

export default Assessment;