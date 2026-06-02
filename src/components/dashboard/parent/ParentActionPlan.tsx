/**
 * ParentActionPlan
 * Five parent-specific action items, ordered by priority.
 * Each item can be checked off (persisted in local component state).
 * Clicking the arrow navigates to the relevant resource/tool/guide.
 */
import { useState, useRef, useEffect } from 'react';
import { CheckCircle2, Circle, ArrowRight, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { trackABEvent } from '../../../ab-test/config';
import styles from './ParentActionPlan.module.css';

type Priority = 'high' | 'medium' | 'low';

interface ActionItem {
  id: string;
  priority: Priority;
  title: string;
  description: string;
  timeEstimate: string;
  category: string;
  route: string;
}

const PARENT_ACTIONS: ActionItem[] = [
  {
    id: 'parental-controls',
    priority: 'high',
    title: 'Set up Parental Controls',
    description: 'Configure device-level parental controls on all your children\'s devices to filter content and set screen-time limits.',
    timeEstimate: '30 min',
    category: 'Device Safety',
    route: '/resources/guides/parental-controls',
  },
  {
    id: 'social-media-audit',
    priority: 'high',
    title: 'Audit Social Media Privacy Settings',
    description: 'Review and tighten the privacy settings on each platform your children use (TikTok, Instagram, Snapchat, etc.).',
    timeEstimate: '45 min',
    category: 'Social Media',
    route: '/blog/privacy-tools-social-media',
  },
  {
    id: 'privacy-talk',
    priority: 'medium',
    title: 'Have the Privacy Talk',
    description: 'Guide your children on what to share — and not share — online with age-appropriate conversation starters.',
    timeEstimate: '60 min',
    category: 'Education',
    route: '/blog/children-privacy-protection',
  },
  {
    id: 'remove-data',
    priority: 'medium',
    title: 'Map Family Personal Data',
    description: 'Use the personal data inventory tool to catalog where your family\'s information is stored and shared.',
    timeEstimate: '20 min',
    category: 'Data Privacy',
    route: '/resources/tools/personal-data-inventory',
  },
  {
    id: '30-day-roadmap',
    priority: 'low',
    title: 'Start Your 30-Day Privacy Roadmap',
    description: 'Follow a structured daily plan to systematically improve your family\'s privacy posture — 10 minutes a day.',
    timeEstimate: '10 min/day',
    category: 'Roadmap',
    route: '/30-day-roadmap',
  },
];

const PRIORITY_BADGE: Record<Priority, string> = {
  high:   'bg-red-500/10 text-red-400 border-red-500/30',
  medium: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
  low:    'bg-blue-500/10 text-blue-400 border-blue-500/30',
};

export default function ParentActionPlan() {
  const navigate = useNavigate();
  const [completed, setCompleted] = useState<Set<string>>(new Set());
  const progressRef = useRef<HTMLDivElement>(null);

  const toggle = (id: string) => {
    setCompleted((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
    trackABEvent('action_item_toggled', { action_id: id, completed: !completed.has(id) });
  };

  const completedCount = completed.size;
  const totalCount     = PARENT_ACTIONS.length;
  const progressPct    = (completedCount / totalCount) * 100;

  useEffect(() => {
    if (progressRef.current) {
      progressRef.current.style.setProperty('--progress-width', `${progressPct}%`);
    }
  }, [progressPct]);

  return (
    <div className="bg-gray-800/60 border border-gray-700/50 rounded-2xl p-6">
      {/* Header + progress */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-base font-bold text-white">Family Action Plan</h3>
        <span className="text-sm text-gray-500">{completedCount}/{totalCount} done</span>
      </div>
      <div className="h-1.5 bg-gray-700 rounded-full mb-5 overflow-hidden">
        <div
          ref={progressRef}
          className={`${styles.progressFill} h-full bg-orange-500 rounded-full transition-all duration-500`}
        />
      </div>

      {/* Actions */}
      <div className="space-y-3">
        {PARENT_ACTIONS.map((action) => {
          const isDone = completed.has(action.id);
          return (
            <div
              key={action.id}
              className={`flex items-start gap-3 rounded-xl p-4 border transition-all ${
                isDone
                  ? 'border-gray-700/30 bg-gray-800/20 opacity-60'
                  : 'border-gray-700/50 bg-gray-900/40'
              }`}
            >
              <button
                onClick={() => toggle(action.id)}
                className="mt-0.5 flex-shrink-0 transition-colors"
              >
                {isDone ? (
                  <CheckCircle2 className="w-5 h-5 text-green-400" />
                ) : (
                  <Circle className="w-5 h-5 text-gray-600 hover:text-orange-400" />
                )}
              </button>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span className={`text-sm font-semibold ${
                    isDone ? 'line-through text-gray-500' : 'text-white'
                  }`}>
                    {action.title}
                  </span>
                  <span className={`text-xs px-2 py-0.5 rounded-full border ${
                    PRIORITY_BADGE[action.priority]
                  }`}>
                    {action.priority}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mb-2 leading-relaxed">{action.description}</p>
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1 text-xs text-gray-600">
                    <Clock className="w-3 h-3" /> {action.timeEstimate}
                  </span>
                  <span className="text-xs text-gray-700">·</span>
                  <span className="text-xs text-gray-600">{action.category}</span>
                </div>
              </div>

              {!isDone && (
                <button
                  onClick={() => navigate(action.route)}
                  className="flex-shrink-0 p-1.5 text-gray-600 hover:text-orange-400 transition-colors mt-0.5"
                  title="Open resource"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
