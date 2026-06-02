/**
 * Variant A — Persona-First Landing Page
 *
 * Hero presents "Who best describes you?" with large persona cards.
 * The Cautious Parent card is featured/highlighted.
 * Selecting Cautious Parent → /parent/onboarding (shared wizard).
 * Other personas → /assessment (existing flow).
 */
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Shield, Users, ShoppingBag, Star, Lock, Briefcase,
  ArrowRight,
} from 'lucide-react';
import { trackABEvent } from '../../ab-test/config';
import { useABTestStore } from '../../store/abTestStore';

const personas = [
  {
    id: 'cautious-parent',
    icon: Users,
    title: 'Cautious Parent',
    subtitle: 'Protecting my family online',
    description:
      'Keep your children safe from online threats, monitor digital activity, and set healthy screen-time boundaries.',
    gradient: 'from-orange-500 to-amber-400',
    featured: true,
    route: '/parent/onboarding',
  },
  {
    id: 'private-individual',
    icon: Lock,
    title: 'Private Individual',
    subtitle: 'Controlling my digital footprint',
    description: 'Minimise data exposure and take back control of your personal information.',
    gradient: 'from-blue-500 to-indigo-500',
    featured: false,
    route: '/assessment',
  },
  {
    id: 'online-shopper',
    icon: ShoppingBag,
    title: 'Online Shopper',
    subtitle: 'Shopping safely and privately',
    description: 'Protect payment info and stay safe while purchasing online.',
    gradient: 'from-green-500 to-emerald-500',
    featured: false,
    route: '/assessment',
  },
  {
    id: 'social-influencer',
    icon: Star,
    title: 'Social Influencer',
    subtitle: 'Protecting my brand and content',
    description: 'Secure accounts and manage your public/private digital presence.',
    gradient: 'from-purple-500 to-pink-500',
    featured: false,
    route: '/assessment',
  },
  {
    id: 'privacy-advocate',
    icon: Shield,
    title: 'Privacy Advocate',
    subtitle: 'Advanced privacy protection',
    description: 'Access advanced tools, digital rights resources, and power-user strategies.',
    gradient: 'from-violet-500 to-purple-600',
    featured: false,
    route: '/assessment',
  },
  {
    id: 'concerned-employee',
    icon: Briefcase,
    title: 'Concerned Employee',
    subtitle: 'Safeguarding work and personal data',
    description: 'Understand your rights and protect your data in the workplace.',
    gradient: 'from-slate-500 to-gray-600',
    featured: false,
    route: '/assessment',
  },
];

export default function VariantALandingPage() {
  const navigate = useNavigate();
  const { setVariant } = useABTestStore();

  const handleSelect = (persona: (typeof personas)[number]) => {
    setVariant('A');
    trackABEvent('persona_selected', { persona_id: persona.id });
    navigate(persona.route);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 overflow-x-hidden">
      {/* ── Hero ── */}
      <section className="relative overflow-hidden pt-24 pb-16 px-4">
        <div className="absolute inset-0 pointer-events-none">
          {/* w-full + max-w prevents fixed px width from forcing horizontal scroll */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[800px] h-[400px] bg-orange-500/8 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/30 rounded-full px-4 py-1.5 mb-6">
              <Shield className="w-4 h-4 text-orange-400" />
              <span className="text-orange-400 text-sm font-medium">
                Personalised privacy journey — free assessment
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
              Who best describes{' '}
              <span className="text-orange-400">you?</span>
            </h1>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Select your profile and we'll create a tailored privacy protection plan — complete with an assessment, prioritised action steps, and a 30-day roadmap.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Persona Cards ── */}
      {/* pt-4 gives clearance for the absolute -top-3 featured badge */}
      <section className="max-w-6xl mx-auto px-4 pb-24 pt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {personas.map((persona, i) => {
            const Icon = persona.icon;
            return (
              <motion.button
                key={persona.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                onClick={() => handleSelect(persona)}
                className={[
                  'relative text-left rounded-2xl border p-6 transition-all duration-200 group',
                  'hover:scale-[1.02] hover:shadow-xl hover:shadow-black/30',
                  persona.featured
                    ? 'border-orange-400/60 bg-orange-500/8 ring-2 ring-orange-400/30'
                    : 'border-gray-700/50 bg-gray-800/40 hover:border-gray-600',
                ].join(' ')}
              >
                {persona.featured && (
                  <span className="absolute -top-3 left-5 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                    ⭐ Start here — Parents
                  </span>
                )}

                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${persona.gradient} flex items-center justify-center mb-4 shadow-lg`}
                >
                  <Icon className="w-6 h-6 text-white" />
                </div>

                <h3
                  className={`text-lg font-bold mb-1 ${
                    persona.featured ? 'text-orange-300' : 'text-white'
                  }`}
                >
                  {persona.title}
                </h3>
                <p className="text-sm text-gray-400 mb-3 font-medium">{persona.subtitle}</p>
                <p className="text-sm text-gray-500 leading-relaxed">{persona.description}</p>

                <div
                  className={`mt-5 inline-flex items-center gap-1.5 text-sm font-semibold transition-colors ${
                    persona.featured
                      ? 'text-orange-400 group-hover:text-orange-300'
                      : 'text-gray-500 group-hover:text-white'
                  }`}
                >
                  Get started <ArrowRight className="w-4 h-4" />
                </div>
              </motion.button>
            );
          })}
        </div>
      </section>
    </div>
  );
}
