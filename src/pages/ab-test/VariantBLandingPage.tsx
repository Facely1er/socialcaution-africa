/**
 * Variant B — Concern-First Landing Page
 *
 * Hero presents "What concerns you most online?" with a multi-select
 * concern picker. Selecting parent-related concerns (child safety,
 * screen time, scams) auto-routes to /parent/onboarding. Other
 * selections route to /assessment.
 */
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Shield, Eye, Users, AlertTriangle, Database, Lock,
  Wifi, CreditCard, ArrowRight, CheckCircle2,
} from 'lucide-react';
import { trackABEvent } from '../../ab-test/config';
import { useABTestStore } from '../../store/abTestStore';

const concerns = [
  {
    id: 'child-safety',
    icon: Users,
    label: "My child's online safety",
    description: 'Protecting children from harmful content and predators',
    accent: 'orange',
    parentRelated: true,
  },
  {
    id: 'screen-time',
    icon: Eye,
    label: 'Screen time and app usage',
    description: 'Managing how much time children spend on devices',
    accent: 'amber',
    parentRelated: true,
  },
  {
    id: 'social-media',
    icon: Shield,
    label: 'Social media privacy',
    description: 'Who can see my posts, profile data, and location',
    accent: 'blue',
    parentRelated: false,
  },
  {
    id: 'data-brokers',
    icon: Database,
    label: 'My data being sold',
    description: 'Data brokers collecting and selling personal information',
    accent: 'purple',
    parentRelated: false,
  },
  {
    id: 'account-security',
    icon: Lock,
    label: 'Account and password security',
    description: 'Protecting my accounts from hacks and data breaches',
    accent: 'green',
    parentRelated: false,
  },
  {
    id: 'online-tracking',
    icon: Wifi,
    label: 'Being tracked online',
    description: 'Websites and apps monitoring my browsing behaviour',
    accent: 'teal',
    parentRelated: false,
  },
  {
    id: 'scams-phishing',
    icon: AlertTriangle,
    label: 'Scams and phishing',
    description: 'Fraudulent messages targeting me or my family',
    accent: 'red',
    parentRelated: true,
  },
  {
    id: 'payment-security',
    icon: CreditCard,
    label: 'Online payment security',
    description: 'Keeping financial details safe when shopping online',
    accent: 'indigo',
    parentRelated: false,
  },
];

// Tailwind class maps per accent colour
const selectedClasses: Record<string, string> = {
  orange: 'border-orange-500 bg-orange-500/10 text-orange-400',
  amber:  'border-amber-500  bg-amber-500/10  text-amber-400',
  blue:   'border-blue-500   bg-blue-500/10   text-blue-400',
  purple: 'border-purple-500 bg-purple-500/10 text-purple-400',
  green:  'border-green-500  bg-green-500/10  text-green-400',
  teal:   'border-teal-500   bg-teal-500/10   text-teal-400',
  red:    'border-red-500    bg-red-500/10    text-red-400',
  indigo: 'border-indigo-500 bg-indigo-500/10 text-indigo-400',
};

export default function VariantBLandingPage() {
  const navigate = useNavigate();
  const { setVariant, setSelectedConcerns } = useABTestStore();
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = (id: string) =>
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );

  const parentConcernsSelected = selected.some(
    (id) => concerns.find((c) => c.id === id)?.parentRelated
  );

  // Track first concern selected
  useEffect(() => {
    if (selected.length === 1) {
      trackABEvent('first_concern_selected', { concern_id: selected[0] });
    }
  }, [selected]);

  const handleContinue = () => {
    setVariant('B');
    setSelectedConcerns(selected);
    trackABEvent('concerns_submitted', {
      concern_count: selected.length,
      has_parent_concern: parentConcernsSelected,
      concerns: selected.join(','),
    });
    navigate(parentConcernsSelected ? '/parent/onboarding' : '/assessment');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 overflow-x-hidden">
      {/* ── Hero ── */}
      <section className="relative overflow-hidden pt-24 pb-12 px-4">
        <div className="absolute inset-0 pointer-events-none">
          {/* w-full + max-w prevents fixed px width from forcing horizontal scroll */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[700px] h-[400px] bg-blue-500/8 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-3xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/30 rounded-full px-4 py-1.5 mb-6">
              <Shield className="w-4 h-4 text-blue-400" />
              <span className="text-blue-400 text-sm font-medium">
                Free privacy assessment · No sign-up required
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
              What concerns you most{' '}
              <span className="text-blue-400">online?</span>
            </h1>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Select all that apply. We'll use your answers to build a personalised privacy assessment and a step-by-step action plan.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Concern Grid ── */}
      <section className="max-w-3xl mx-auto px-4 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {concerns.map((concern, i) => {
            const Icon = concern.icon;
            const isSelected = selected.includes(concern.id);
            return (
              <motion.button
                key={concern.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => toggle(concern.id)}
                className={[
                  'relative text-left rounded-xl border p-4 transition-all duration-150 flex items-start gap-4 hover:scale-[1.01]',
                  isSelected
                    ? selectedClasses[concern.accent]
                    : 'border-gray-700/50 bg-gray-800/40 text-gray-400 hover:border-gray-600',
                ].join(' ')}
              >
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    isSelected ? 'bg-white/10' : 'bg-gray-700/50'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-sm text-white mb-0.5">{concern.label}</div>
                  <div className="text-xs text-gray-500 leading-relaxed">{concern.description}</div>
                </div>
                <AnimatePresence>
                  {isSelected && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="flex-shrink-0 mt-0.5"
                    >
                      <CheckCircle2 className="w-5 h-5" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            );
          })}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="max-w-3xl mx-auto px-4 pb-24">
        <AnimatePresence>
          {selected.length > 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-center"
            >
              {parentConcernsSelected && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-orange-400 text-sm mb-4 font-medium"
                >
                  🛡️ Family concerns detected — we'll guide you through a dedicated family privacy setup.
                </motion.p>
              )}
              <button
                onClick={handleContinue}
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-semibold px-8 py-3.5 rounded-xl transition-colors text-base shadow-lg shadow-blue-900/30"
              >
                Build my privacy plan
                <ArrowRight className="w-5 h-5" />
              </button>
              <p className="text-gray-600 text-xs mt-3">
                {selected.length} concern{selected.length !== 1 ? 's' : ''} selected · Takes about 10–15 minutes
              </p>
            </motion.div>
          ) : (
            <p className="text-center text-gray-600 text-sm">
              Select at least one concern above to continue
            </p>
          )}
        </AnimatePresence>
      </section>
    </div>
  );
}
