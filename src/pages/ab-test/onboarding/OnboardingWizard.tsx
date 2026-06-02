/**
 * OnboardingWizard — shared 5-step wizard for both A/B variants.
 *
 * Step 0: Welcome (variant-aware framing)
 * Step 1: Children Info (ages + devices per child)
 * Step 2: Service / Platform Selection
 * Step 3: Family Privacy Goals (pick up to 3)
 * Step 4: Assessment Bridge (profile complete → start checkup)
 *
 * After step 4 the user is routed to /assessment/exposure.
 */
import { useState } from 'react';
import type { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, ArrowRight, Users, Shield, Target,
  CheckCircle2, Plus, Trash2,
} from 'lucide-react';
import { trackABEvent, getABConfig } from '../../../ab-test/config';
import { useABTestStore, type ChildProfile, type AgeGroup } from '../../../store/abTestStore';

// ─── Shared button primitives ────────────────────────────────────
interface BtnProps {
  onClick?: () => void;
  disabled?: boolean;
  children: ReactNode;
  className?: string;
}

const BtnPrimary = ({ onClick, disabled, children, className = '' }: BtnProps) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-400 active:bg-orange-600 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold px-6 py-3 rounded-xl transition-colors ${className}`}
  >
    {children}
  </button>
);

const BtnSecondary = ({ onClick, children, className = '' }: Omit<BtnProps, 'disabled'>) => (
  <button
    onClick={onClick}
    className={`flex items-center justify-center gap-2 bg-gray-700 hover:bg-gray-600 active:bg-gray-800 text-gray-300 font-semibold px-6 py-3 rounded-xl transition-colors ${className}`}
  >
    {children}
  </button>
);

// ─── Step 0: Welcome ──────────────────────────────────────────────
function WelcomeStep({ onNext }: { onNext: () => void }) {
  const { variant } = getABConfig();
  const { selectedConcerns } = useABTestStore();
  return (
    <div className="text-center max-w-xl mx-auto">
      <div className="w-20 h-20 bg-orange-500/10 border border-orange-500/30 rounded-2xl flex items-center justify-center mx-auto mb-6">
        <Users className="w-10 h-10 text-orange-400" />
      </div>
      <h2 className="text-3xl font-bold text-white mb-3">
        {variant === 'A'
          ? "Let's set up your family's protection"
          : "Great — let's get your family protected"}
      </h2>
      {variant === 'B' && selectedConcerns.length > 0 && (
        <p className="text-gray-400 mb-4 text-sm">
          Based on your concerns, we'll focus on{' '}
          <span className="text-orange-400 font-medium">
            {selectedConcerns
              .slice(0, 2)
              .map((c) => c.replace(/-/g, ' '))
              .join(', ')}
            {selectedConcerns.length > 2 ? ` +${selectedConcerns.length - 2} more` : ''}
          </span>
        </p>
      )}
      <p className="text-gray-400 mb-8 leading-relaxed text-sm">
        We'll ask a few quick questions about your family so we can personalise
        your privacy assessment and action plan. This takes about{' '}
        <strong className="text-white">10 minutes</strong>.
      </p>
      {/* 3-col preview grid — tight padding so it fits on narrow screens */}
      <div className="grid grid-cols-3 gap-2 mb-8 text-center">
        {[
          { label: 'Children info', icon: '👧' },
          { label: 'Platforms used', icon: '📱' },
          { label: 'Family goals',   icon: '🎯' },
        ].map((s) => (
          <div key={s.label} className="bg-gray-800/50 rounded-xl p-3 border border-gray-700/50">
            <div className="text-xl mb-1">{s.icon}</div>
            <div className="text-xs text-gray-400">{s.label}</div>
          </div>
        ))}
      </div>
      <BtnPrimary onClick={onNext} className="w-full max-w-sm mx-auto">
        Let's go <ArrowRight className="w-4 h-4" />
      </BtnPrimary>
    </div>
  );
}

// ─── Step 1: Children Info ─────────────────────────────────────────
const AGE_GROUPS: { value: AgeGroup; label: string; desc: string }[] = [
  { value: 'preschool',  label: '2–5 years',   desc: 'Preschool'  },
  { value: 'elementary', label: '6–11 years',  desc: 'Elementary' },
  { value: 'teen',       label: '12–17 years', desc: 'Teen'       },
];

const DEVICE_OPTIONS = [
  { id: 'phone',    label: '📱 Smartphone'    },
  { id: 'tablet',   label: '📟 Tablet'        },
  { id: 'laptop',   label: '💻 Laptop/PC'     },
  { id: 'gaming',   label: '🎮 Gaming console' },
  { id: 'smart-tv', label: '📺 Smart TV'      },
];

function ChildrenInfoStep({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  const { familyProfile, addChild, removeChild } = useABTestStore();
  const [ageGroup, setAgeGroup] = useState<AgeGroup>('elementary');
  const [devices,  setDevices]  = useState<string[]>([]);

  const toggleDevice = (id: string) =>
    setDevices((prev) => (prev.includes(id) ? prev.filter((d) => d !== id) : [...prev, id]));

  const handleAddChild = () => {
    if (devices.length === 0) return;
    const child: ChildProfile = { id: crypto.randomUUID(), ageGroup, devices, platforms: [] };
    addChild(child);
    setDevices([]);
    trackABEvent('child_added', { age_group: ageGroup, device_count: devices.length });
  };

  return (
    <div className="max-w-xl mx-auto">
      <h2 className="text-2xl font-bold text-white mb-2 text-center">Tell us about your children</h2>
      <p className="text-gray-400 text-sm text-center mb-6">
        Add each child separately so we can tailor the assessment.
      </p>

      {familyProfile.children.length > 0 && (
        <div className="mb-5 space-y-2">
          {familyProfile.children.map((child, idx) => (
            <div key={child.id} className="flex items-center justify-between bg-orange-500/10 border border-orange-500/25 rounded-xl px-4 py-3">
              <div className="min-w-0 flex-1">
                <span className="text-orange-300 font-medium text-sm">Child {idx + 1}</span>
                <span className="text-gray-400 text-xs ml-2">
                  {AGE_GROUPS.find((a) => a.value === child.ageGroup)?.label} · {child.devices.join(', ')}
                </span>
              </div>
              <button onClick={() => removeChild(child.id)} className="text-gray-600 hover:text-red-400 transition-colors flex-shrink-0 ml-2">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="bg-gray-800/40 border border-gray-700/50 rounded-2xl p-5 mb-5">
        <div className="mb-4">
          <label className="text-sm text-gray-400 mb-2 block font-medium">Age group</label>
          <div className="grid grid-cols-3 gap-2">
            {AGE_GROUPS.map((ag) => (
              <button
                key={ag.value}
                onClick={() => setAgeGroup(ag.value)}
                className={`rounded-xl px-3 py-2.5 text-sm font-medium border transition-all ${
                  ageGroup === ag.value
                    ? 'border-orange-500 bg-orange-500/15 text-orange-300'
                    : 'border-gray-700 text-gray-400 hover:border-gray-600'
                }`}
              >
                <div>{ag.desc}</div>
                <div className="text-xs opacity-60 mt-0.5">{ag.label}</div>
              </button>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <label className="text-sm text-gray-400 mb-2 block font-medium">Devices they use</label>
          <div className="flex flex-wrap gap-2">
            {DEVICE_OPTIONS.map((d) => (
              <button
                key={d.id}
                onClick={() => toggleDevice(d.id)}
                className={`rounded-lg px-3 py-1.5 text-sm border transition-all ${
                  devices.includes(d.id)
                    ? 'border-orange-500 bg-orange-500/15 text-orange-300'
                    : 'border-gray-700 text-gray-400 hover:border-gray-600'
                }`}
              >
                {d.label}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleAddChild}
          disabled={devices.length === 0}
          className="w-full flex items-center justify-center gap-2 border border-dashed border-gray-600 rounded-xl py-2.5 text-sm text-gray-400 hover:border-orange-500/50 hover:text-orange-400 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <Plus className="w-4 h-4" />
          Add {familyProfile.children.length > 0 ? 'another' : 'a'} child
        </button>
      </div>

      <div className="flex gap-3">
        <BtnSecondary onClick={onBack} className="flex-1">
          <ArrowLeft className="w-4 h-4" /> Back
        </BtnSecondary>
        <BtnPrimary onClick={onNext} disabled={familyProfile.children.length === 0} className="flex-1">
          Continue <ArrowRight className="w-4 h-4" />
        </BtnPrimary>
      </div>
    </div>
  );
}

// ─── Step 2: Service Selection ─────────────────────────────────────
const SERVICE_OPTIONS = [
  { id: 'youtube',     label: '▶️ YouTube'            },
  { id: 'tiktok',      label: '🎵 TikTok'             },
  { id: 'instagram',   label: '📸 Instagram'          },
  { id: 'snapchat',    label: '👻 Snapchat'           },
  { id: 'roblox',      label: '🧱 Roblox'             },
  { id: 'minecraft',   label: '⛏️ Minecraft'          },
  { id: 'discord',     label: '💬 Discord'            },
  { id: 'whatsapp',    label: '💚 WhatsApp'           },
  { id: 'google',      label: '🔍 Google'             },
  { id: 'school-apps', label: '🏫 School apps'       },
  { id: 'streaming',   label: '🎬 Streaming'          },
  { id: 'other',       label: '➕ Other'              },
];

function ServiceSelectionStep({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  const { familyProfile, updateFamilyProfile } = useABTestStore();
  const selected = familyProfile.selectedServices;

  const toggle = (id: string) => {
    const next = selected.includes(id) ? selected.filter((s) => s !== id) : [...selected, id];
    updateFamilyProfile({ selectedServices: next });
  };

  return (
    <div className="max-w-xl mx-auto">
      <h2 className="text-2xl font-bold text-white mb-2 text-center">
        Which platforms do your children use?
      </h2>
      <p className="text-gray-400 text-sm text-center mb-6">
        Select all that apply — we'll focus the assessment on these.
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 mb-6">
        {SERVICE_OPTIONS.map((s) => {
          const isSelected = selected.includes(s.id);
          return (
            <button
              key={s.id}
              onClick={() => toggle(s.id)}
              className={`rounded-xl px-3 py-3 text-sm font-medium border transition-all text-left flex items-center justify-between ${
                isSelected
                  ? 'border-orange-500 bg-orange-500/15 text-orange-300'
                  : 'border-gray-700 text-gray-400 bg-gray-800/40 hover:border-gray-600'
              }`}
            >
              <span>{s.label}</span>
              {isSelected && <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" />}
            </button>
          );
        })}
      </div>

      <div className="flex gap-3">
        <BtnSecondary onClick={onBack} className="flex-1">
          <ArrowLeft className="w-4 h-4" /> Back
        </BtnSecondary>
        <BtnPrimary onClick={onNext} disabled={selected.length === 0} className="flex-1">
          Continue <ArrowRight className="w-4 h-4" />
        </BtnPrimary>
      </div>
    </div>
  );
}

// ─── Step 3: Family Goals ──────────────────────────────────────────
const GOAL_OPTIONS = [
  { id: 'monitor-activity',  icon: '👁️', label: 'Monitor online activity',  desc: 'Know what my children are doing online'   },
  { id: 'parental-controls', icon: '🔒', label: 'Set parental controls',      desc: 'Block inappropriate content and apps'        },
  { id: 'screen-time',       icon: '⏱️', label: 'Manage screen time',         desc: 'Set healthy limits on device usage'           },
  { id: 'safe-social',       icon: '💬', label: 'Safe social media use',      desc: 'Teach safe habits on social platforms'        },
  { id: 'privacy-education', icon: '📚', label: 'Educate about privacy',      desc: "Help children understand online safety"       },
  { id: 'remove-data',       icon: '🗑️', label: 'Remove family data',         desc: 'Opt out of data broker databases'             },
];

function FamilyGoalsStep({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  const { familyProfile, updateFamilyProfile } = useABTestStore();
  const selected = familyProfile.goals;

  const toggle = (id: string) => {
    const next = selected.includes(id) ? selected.filter((g) => g !== id) : [...selected, id];
    updateFamilyProfile({ goals: next });
  };

  return (
    <div className="max-w-xl mx-auto">
      <h2 className="text-2xl font-bold text-white mb-2 text-center">
        What are your family's privacy goals?
      </h2>
      <p className="text-gray-400 text-sm text-center mb-6">
        Choose up to 3 — these shape your 30-day action plan.
      </p>

      <div className="space-y-2.5 mb-6">
        {GOAL_OPTIONS.map((goal) => {
          const isSelected  = selected.includes(goal.id);
          const maxReached  = selected.length >= 3 && !isSelected;
          return (
            <button
              key={goal.id}
              onClick={() => !maxReached && toggle(goal.id)}
              disabled={maxReached}
              className={`w-full flex items-center gap-4 rounded-xl border p-4 text-left transition-all ${
                isSelected
                  ? 'border-orange-500 bg-orange-500/10'
                  : maxReached
                  ? 'border-gray-800 opacity-40 cursor-not-allowed'
                  : 'border-gray-700/50 bg-gray-800/40 hover:border-gray-600'
              }`}
            >
              <span className="text-xl">{goal.icon}</span>
              <div className="flex-1 min-w-0">
                <div className={`font-medium text-sm ${isSelected ? 'text-orange-300' : 'text-white'}`}>
                  {goal.label}
                </div>
                <div className="text-xs text-gray-500 mt-0.5">{goal.desc}</div>
              </div>
              {isSelected && <CheckCircle2 className="w-5 h-5 text-orange-400 flex-shrink-0" />}
            </button>
          );
        })}
      </div>

      <div className="flex gap-3">
        <BtnSecondary onClick={onBack} className="flex-1">
          <ArrowLeft className="w-4 h-4" /> Back
        </BtnSecondary>
        <BtnPrimary onClick={onNext} disabled={selected.length === 0} className="flex-1">
          Continue <ArrowRight className="w-4 h-4" />
        </BtnPrimary>
      </div>
    </div>
  );
}

// ─── Step 4: Assessment Bridge ─────────────────────────────────────
function AssessmentBridgeStep({ onStart }: { onStart: () => void }) {
  const { familyProfile } = useABTestStore();
  const childCount = familyProfile.children.length;
  const goalCount  = familyProfile.goals.length;

  return (
    <div className="text-center max-w-xl mx-auto">
      <div className="w-20 h-20 bg-green-500/10 border border-green-500/30 rounded-2xl flex items-center justify-center mx-auto mb-5">
        <Shield className="w-10 h-10 text-green-400" />
      </div>
      <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/30 rounded-full px-4 py-1.5 mb-4">
        <CheckCircle2 className="w-4 h-4 text-green-400" />
        <span className="text-green-400 text-sm font-medium">Profile complete!</span>
      </div>
      <h2 className="text-2xl font-bold text-white mb-3">Your family profile is ready</h2>
      <p className="text-gray-400 mb-6 leading-relaxed text-sm">
        We've noted{' '}
        <strong className="text-white">{childCount} child{childCount !== 1 ? 'ren' : ''}</strong> and{' '}
        <strong className="text-white">{goalCount} goal{goalCount !== 1 ? 's' : ''}</strong>. Next,
        complete the <strong className="text-white">Family Privacy Checkup</strong> (~15 min) to get
        your family's privacy score.
      </p>

      {/* Collapses to single column on mobile to prevent overflow */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8 text-left">
        {[
          { label: 'Family score', sub: 'Privacy posture 0–100', icon: '📊' },
          { label: 'Risk areas',   sub: 'Ranked by severity',    icon: '⚠️'  },
          { label: '30-day plan',  sub: 'Daily action steps',    icon: '📅'  },
        ].map((item) => (
          <div key={item.label} className="bg-gray-800/40 border border-gray-700/50 rounded-xl p-3">
            <div className="text-xl mb-1">{item.icon}</div>
            <div className="text-sm font-medium text-white">{item.label}</div>
            <div className="text-xs text-gray-500 mt-0.5">{item.sub}</div>
          </div>
        ))}
      </div>

      <BtnPrimary onClick={onStart} className="mx-auto">
        <Target className="w-4 h-4" /> Start Family Privacy Checkup
      </BtnPrimary>
      <p className="text-gray-600 text-xs mt-3">About 15 minutes · You can save progress anytime</p>
    </div>
  );
}

// ─── Wizard Container ──────────────────────────────────────────────
const STEP_LABELS = ['Welcome', 'Children', 'Platforms', 'Goals', 'Ready'];

export default function OnboardingWizard() {
  const navigate = useNavigate();
  const { variant } = getABConfig();
  const { setOnboardingStep, updateFamilyProfile } = useABTestStore();
  const [step, setStep] = useState(0);

  const goNext = () => {
    const next = step + 1;
    setStep(next);
    setOnboardingStep(next);
    trackABEvent('onboarding_step_completed', { step, step_name: STEP_LABELS[step] });
  };

  const goBack = () => setStep((s) => Math.max(0, s - 1));

  const handleAssessmentStart = () => {
    updateFamilyProfile({ completedOnboarding: true });
    trackABEvent('onboarding_completed', { variant });
    navigate('/assessment/exposure');
  };

  const steps = [
    <WelcomeStep          key="welcome"    onNext={goNext} />,
    <ChildrenInfoStep     key="children"   onNext={goNext} onBack={goBack} />,
    <ServiceSelectionStep key="services"   onNext={goNext} onBack={goBack} />,
    <FamilyGoalsStep      key="goals"      onNext={goNext} onBack={goBack} />,
    <AssessmentBridgeStep key="bridge"     onStart={handleAssessmentStart} />,
  ];

  return (
    <div className="min-h-screen bg-gray-950 px-4 py-16 overflow-x-hidden">
      {/* Progress bar */}
      <div className="max-w-xl mx-auto mb-10">
        <div className="flex items-start justify-between mb-3">
          {STEP_LABELS.map((label, i) => (
            <div key={label} className="flex flex-col items-center gap-1" style={{ flex: 1 }}>
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all ${
                  i < step
                    ? 'bg-orange-500 border-orange-500 text-white'
                    : i === step
                    ? 'border-orange-500 text-orange-400 bg-transparent'
                    : 'border-gray-700 text-gray-600 bg-transparent'
                }`}
              >
                {i < step ? '✓' : i + 1}
              </div>
              <span className={`text-xs hidden sm:block ${i === step ? 'text-orange-400' : 'text-gray-600'}`}>
                {label}
              </span>
            </div>
          ))}
        </div>
        <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-orange-500 rounded-full"
            animate={{ width: `${(step / (STEP_LABELS.length - 1)) * 100}%` }}
            transition={{ type: 'spring', stiffness: 200 }}
          />
        </div>
      </div>

      {/* Step content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -24 }}
          transition={{ duration: 0.22 }}
        >
          {steps[step]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
