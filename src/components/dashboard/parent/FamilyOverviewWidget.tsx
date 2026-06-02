/**
 * FamilyOverviewWidget
 * Displays the family's aggregate privacy score with a circular gauge,
 * risk level, and three quick-stat cards.
 */
import { Shield, TrendingUp, AlertTriangle } from 'lucide-react';
import { useABTestStore } from '../../../store/abTestStore';

function riskColor(score: number) {
  if (score >= 75) return 'text-green-400';
  if (score >= 50) return 'text-amber-400';
  return 'text-red-400';
}

function riskStroke(score: number) {
  if (score >= 75) return '#10b981';
  if (score >= 50) return '#f59e0b';
  return '#ef4444';
}

export default function FamilyOverviewWidget() {
  const { privacyScore, familyProfile } = useABTestStore();
  const score      = privacyScore ?? 0;
  const hasScore   = privacyScore !== null;
  const childCount = familyProfile.children.length;
  const riskLabel  = score >= 75 ? 'Low' : score >= 50 ? 'Medium' : 'High';

  return (
    <div className="bg-gray-800/60 border border-gray-700/50 rounded-2xl p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="min-w-0 flex-1">
          <h2 className="text-lg font-bold text-white">Family Privacy Overview</h2>
          <p className="text-sm text-gray-500 mt-0.5">
            {childCount > 0 ? `${childCount} child${childCount !== 1 ? 'ren' : ''} in profile` : 'No children added yet'}
          </p>
        </div>
        <div className="w-10 h-10 bg-orange-500/10 rounded-xl flex items-center justify-center flex-shrink-0 ml-3">
          <Shield className="w-5 h-5 text-orange-400" />
        </div>
      </div>

      {hasScore ? (
        <>
          {/* Score ring */}
          <div className="flex items-center gap-4 mb-5">
            <div className="relative w-24 h-24 flex-shrink-0">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                <circle cx="18" cy="18" r="15.9" fill="none" stroke="#1f2937" strokeWidth="3" />
                <circle
                  cx="18" cy="18" r="15.9" fill="none"
                  stroke={riskStroke(score)}
                  strokeWidth="3"
                  strokeDasharray={`${score} ${100 - score}`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className={`text-2xl font-bold ${riskColor(score)}`}>{score}</span>
                <span className="text-xs text-gray-500">/100</span>
              </div>
            </div>
            <div className="min-w-0 flex-1">
              <div className={`text-xl font-bold mb-1 ${riskColor(score)}`}>{riskLabel} Risk</div>
              <p className="text-sm text-gray-400 leading-relaxed">
                {score < 50
                  ? 'Several areas need immediate attention to protect your family.'
                  : score < 75
                  ? 'Some improvements recommended to strengthen protection.'
                  : "Your family's privacy is well-protected. Keep it up!"}
              </p>
            </div>
          </div>

          {/* Quick stats — reduced gap + min-w-0 so labels don't overflow */}
          <div className="grid grid-cols-3 gap-2">
            {[
              { label: 'Score',        value: score,                                   icon: TrendingUp,    color: 'text-blue-400'   },
              { label: 'Risk level',   value: riskLabel,                               icon: AlertTriangle, color: riskColor(score)  },
              { label: 'Actions due',  value: score < 50 ? 8 : score < 75 ? 5 : 2,   icon: Shield,        color: 'text-orange-400' },
            ].map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="bg-gray-900/50 rounded-xl p-2.5 text-center min-w-0">
                  <Icon className={`w-4 h-4 mx-auto mb-1 ${stat.color}`} />
                  <div className={`text-xs font-bold ${stat.color}`}>{stat.value}</div>
                  <div className="text-xs text-gray-600 mt-0.5 truncate">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        /* Pre-assessment placeholder */
        <div className="text-center py-6">
          <div className="w-16 h-16 bg-gray-700/50 rounded-full flex items-center justify-center mx-auto mb-3">
            <Shield className="w-8 h-8 text-gray-600" />
          </div>
          <p className="text-gray-500 text-sm mb-3">
            Complete the Family Privacy Checkup to see your score.
          </p>
          <div className="inline-block bg-gray-700/50 rounded-full px-4 py-1 text-xs text-gray-500">
            ~15 minutes
          </div>
        </div>
      )}
    </div>
  );
}
