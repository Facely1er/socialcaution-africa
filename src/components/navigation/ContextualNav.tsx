import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { 
  ArrowRight, 
  Clock, 
  Zap, 
  Shield, 
  BookOpen, 
  Users, 
  TrendingUp,
  Target,
  CheckCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';
interface QuickAction {
  id: string;
  title: string;
  description: string;
  path: string;
  icon: React.ComponentType<any>;
  color: string;
  priority: number;
  category: string;
}

interface ContextualNavProps {
  className?: string;
}

const DISMISS_KEY = 'contextual-nav-dismissed';

const ContextualNav: React.FC<ContextualNavProps> = ({ className = '' }) => {
  const location = useLocation();
  const [suggestedActions, setSuggestedActions] = useState<QuickAction[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDismissed, setIsDismissed] = useState(
    () => sessionStorage.getItem(DISMISS_KEY) === 'true'
  );
  const [hideOnScroll, setHideOnScroll] = useState(false);

  // Define quick actions based on context
  const quickActions: QuickAction[] = useMemo(() => [
    // Assessment actions
    {
      id: 'start-assessment',
      title: 'Start Privacy Assessment',
      description: 'Evaluate your privacy status',
      path: '/assessment',
      icon: Shield,
      color: 'text-accent',
      priority: 10,
      category: 'assessment'
    },
    {
      id: 'exposure-check',
      title: 'Check Digital Exposure',
      description: 'Analyze your online footprint',
      path: '/assessment/exposure',
      icon: Target,
      color: 'text-danger',
      priority: 9,
      category: 'assessment'
    },
    {
      id: 'rights-checkup',
      title: 'Privacy Rights Checkup',
      description: 'Understand your privacy rights',
      path: '/assessment/rights',
      icon: CheckCircle,
      color: 'text-success',
      priority: 8,
      category: 'assessment'
    },
    // Dashboard actions
    {
      id: 'view-dashboard',
      title: 'View Dashboard',
      description: 'See your privacy overview',
      path: '/dashboard',
      icon: TrendingUp,
      color: 'text-primary',
      priority: 7,
      category: 'dashboard'
    },
    {
      id: 'action-plan',
      title: 'View Action Plan',
      description: 'Track your privacy improvements',
      path: '/dashboard/action-plan',
      icon: Target,
      color: 'text-accent',
      priority: 6,
      category: 'dashboard'
    },
    // Persona actions
    {
      id: 'find-persona',
      title: 'Find Your Persona',
      description: 'Discover your privacy profile',
      path: '/personas',
      icon: Users,
      color: 'text-primary',
      priority: 8,
      category: 'persona'
    },
    {
      id: 'cautious-parent',
      title: 'Cautious Parent Profile',
      description: 'Family privacy protection',
      path: '/personas/cautious-parent',
      icon: Shield,
      color: 'text-danger',
      priority: 5,
      category: 'persona'
    },
    // Resource actions
    {
      id: 'privacy-guides',
      title: 'Privacy Guides',
      description: 'Learn privacy best practices',
      path: '/resources/guides',
      icon: BookOpen,
      color: 'text-success',
      priority: 6,
      category: 'resources'
    },
    {
      id: 'privacy-tools',
      title: 'Privacy Tools',
      description: 'Use privacy protection tools',
      path: '/resources/tools',
      icon: Zap,
      color: 'text-warning',
      priority: 5,
      category: 'resources'
    },
    // Journey actions
    {
      id: 'privacy-journey',
      title: 'Start Privacy Journey',
      description: 'Begin your privacy improvement',
      path: '/privacy-journey',
      icon: ArrowRight,
      color: 'text-accent',
      priority: 7,
      category: 'journey'
    },
    {
      id: '30-day-roadmap',
      title: '30-Day Roadmap',
      description: 'Follow a structured privacy plan',
      path: '/30-day-roadmap',
      icon: Clock,
      color: 'text-primary',
      priority: 6,
      category: 'journey'
    }
  ], []);

  // Get contextual actions based on current page
  const getContextualActions = useCallback((): QuickAction[] => {
    const currentPath = location.pathname;
    
    // Filter actions based on current context
    let filteredActions = quickActions;
    
    // If on assessment page, prioritize assessment actions
    if (currentPath.includes('/assessment')) {
      filteredActions = quickActions.filter(action => 
        action.category === 'assessment' || action.category === 'dashboard'
      );
    }
    // If on persona page, prioritize persona actions
    else if (currentPath.includes('/personas')) {
      filteredActions = quickActions.filter(action => 
        action.category === 'persona' || action.category === 'assessment'
      );
    }
    // If on dashboard, prioritize dashboard actions
    else if (currentPath.includes('/dashboard')) {
      filteredActions = quickActions.filter(action => 
        action.category === 'dashboard' || action.category === 'journey'
      );
    }
    // If on resources, prioritize resource actions
    else if (currentPath.includes('/resources')) {
      filteredActions = quickActions.filter(action => 
        action.category === 'resources' || action.category === 'tools'
      );
    }
    // If on home page, show most important actions
    else if (currentPath === '/') {
      filteredActions = quickActions.filter(action => 
        action.priority >= 7
      );
    }
    
    // Sort by priority and return top 4
    return filteredActions
      .sort((a, b) => b.priority - a.priority)
      .slice(0, 4);
  }, [location.pathname, quickActions]);

  // Update suggested actions when location changes
  useEffect(() => {
    setSuggestedActions(getContextualActions());
    setIsExpanded(false);
  }, [location.pathname, getContextualActions]);

  // Collapse while scrolling down to stay out of the way
  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setHideOnScroll(true);
        setIsExpanded(false);
      } else {
        setHideOnScroll(false);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDismiss = () => {
    setIsDismissed(true);
    setIsExpanded(false);
    sessionStorage.setItem(DISMISS_KEY, 'true');
  };

  if (suggestedActions.length === 0 || isDismissed) return null;

  return (
    <div
      className={`fixed bottom-20 md:bottom-4 right-4 z-40 hidden md:block transition-opacity duration-200 ${
        hideOnScroll ? 'opacity-0 pointer-events-none' : 'opacity-100'
      } ${className}`}
    >
      <AnimatePresence mode="wait">
        {isExpanded ? (
          <motion.div
            key="panel"
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="bg-white/95 dark:bg-card/95 backdrop-blur-sm rounded-lg shadow-md border border-border/70 p-2 w-max max-w-xs"
          >
            <div className="flex items-center justify-between gap-3 px-1 pb-1.5 mb-1 border-b border-border/50">
              <span className="text-[11px] font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                Quick actions
              </span>
              <div className="flex items-center gap-0.5">
                <button
                  onClick={() => setIsExpanded(false)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded p-0.5 text-sm leading-none"
                  aria-label="Collapse quick actions"
                  type="button"
                >
                  ×
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-0.5">
              {suggestedActions.map((action) => {
                const Icon = action.icon;
                return (
                  <Link
                    key={action.id}
                    to={action.path}
                    onClick={() => setIsExpanded(false)}
                    className="group flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-accent/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                    aria-label={`${action.title}: ${action.description}`}
                    title={action.description}
                  >
                    <Icon className={`h-3.5 w-3.5 flex-shrink-0 ${action.color}`} />
                    <span className="text-xs font-medium text-gray-800 dark:text-gray-200 group-hover:text-accent truncate">
                      {action.title}
                    </span>
                  </Link>
                );
              })}
            </div>

            <button
              onClick={handleDismiss}
              className="mt-1.5 w-full text-[10px] text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors py-0.5"
              type="button"
            >
              Don&apos;t show again
            </button>
          </motion.div>
        ) : (
          <motion.button
            key="trigger"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.2 }}
            onClick={() => setIsExpanded(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white/90 dark:bg-card/90 backdrop-blur-sm rounded-full shadow-md border border-border/70 text-xs font-medium text-gray-700 dark:text-gray-300 hover:border-accent/50 hover:text-accent transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            aria-label="Show quick actions"
            aria-expanded={false}
            type="button"
          >
            <Zap className="h-3.5 w-3.5 text-accent" />
            Quick actions
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ContextualNav;
