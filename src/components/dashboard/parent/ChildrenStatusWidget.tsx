/**
 * ChildrenStatusWidget
 * Shows per-child status cards with age group, devices,
 * and a risk indicator derived from the age group.
 */
import { Smartphone, Monitor, Gamepad2, Tv, type LucideIcon } from 'lucide-react';
import { useABTestStore, type AgeGroup } from '../../../store/abTestStore';

const AGE_META: Record<AgeGroup, { label: string; badge: string }> = {
  preschool:  { label: '2–5 yrs',   badge: 'bg-blue-500/20 text-blue-300 border-blue-500/30' },
  elementary: { label: '6–11 yrs',  badge: 'bg-green-500/20 text-green-300 border-green-500/30' },
  teen:       { label: '12–17 yrs', badge: 'bg-purple-500/20 text-purple-300 border-purple-500/30' },
};

// Indicative risk per age group (before full assessment)
const AGE_RISK: Record<AgeGroup, { score: number; label: string; color: string }> = {
  preschool:  { score: 72, label: 'Low',    color: 'text-green-400' },
  elementary: { score: 55, label: 'Medium', color: 'text-amber-400' },
  teen:       { score: 38, label: 'High',   color: 'text-red-400' },
};

const DEVICE_ICON: Record<string, LucideIcon> = {
  phone:      Smartphone,
  tablet:     Monitor,
  laptop:     Monitor,
  gaming:     Gamepad2,
  'smart-tv': Tv,
};

export default function ChildrenStatusWidget() {
  const { familyProfile } = useABTestStore();
  const { children } = familyProfile;

  if (children.length === 0) {
    return (
      <div className="bg-gray-800/60 border border-gray-700/50 rounded-2xl p-6 flex flex-col items-center justify-center min-h-[160px]">
        <p className="text-gray-500 text-sm text-center">
          No children added yet.<br />
          <span className="text-gray-600">Complete onboarding to add children.</span>
        </p>
      </div>
    );
  }

  return (
    <div className="bg-gray-800/60 border border-gray-700/50 rounded-2xl p-6">
      <h3 className="text-base font-bold text-white mb-4">Children Status</h3>
      <div className="space-y-3">
        {children.map((child, idx) => {
          const age  = AGE_META[child.ageGroup];
          const risk = AGE_RISK[child.ageGroup];
          return (
            <div
              key={child.id}
              className="flex items-center gap-3 bg-gray-900/50 rounded-xl p-3.5"
            >
              {/* Avatar */}
              <div className="w-9 h-9 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-400 font-bold text-sm flex-shrink-0">
                {idx + 1}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span className="text-sm font-medium text-white">Child {idx + 1}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full border flex-shrink-0 ${age.badge}`}>
                    {age.label}
                  </span>
                </div>
                {/* min-w-0 on flex parent + truncate on text prevent device list overflow */}
                <div className="flex items-center gap-1.5 min-w-0">
                  {child.devices.slice(0, 3).map((d) => {
                    const Icon = DEVICE_ICON[d] ?? Smartphone;
                    return <Icon key={d} className="w-3.5 h-3.5 text-gray-600 flex-shrink-0" />;
                  })}
                  <span className="text-xs text-gray-600 ml-0.5 truncate">
                    {child.devices.join(', ')}
                  </span>
                </div>
              </div>

              {/* Risk */}
              <div className="text-right flex-shrink-0">
                <div className={`text-sm font-bold ${risk.color}`}>{risk.score}</div>
                <div className="text-xs text-gray-600">{risk.label} risk</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
