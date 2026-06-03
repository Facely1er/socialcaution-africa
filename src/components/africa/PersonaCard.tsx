import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion } from '../../lib/motion';
import type { AfricaPersona } from '../../data/africa/personas';
import { getPersonaVisual } from '../../data/africa/personaVisuals';

export default function PersonaCard({ persona }: { persona: AfricaPersona }) {
  const { Icon, iconBg, iconColor, cardBorder } = getPersonaVisual(persona.slug);

  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <Link
        to={`/africa/personas/start/${persona.slug}`}
        className={`block p-5 rounded-xl border border-border bg-white dark:bg-card transition-all duration-200 h-full ${cardBorder} hover:shadow-md group`}
      >
        <div className={`w-11 h-11 rounded-xl ${iconBg} flex items-center justify-center mb-4`}>
          <Icon className={`h-5 w-5 ${iconColor}`} />
        </div>

        <h3 className="font-bold text-primary dark:text-white text-base mb-1 group-hover:text-accent transition-colors">
          {persona.label}
        </h3>

        <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 leading-relaxed">{persona.description}</p>

        <div className="flex flex-wrap gap-1.5">
          {persona.priorityRisks.slice(0, 2).map((risk) => (
            <span
              key={risk}
              className="text-xs px-2 py-0.5 rounded-full bg-gray-100 dark:bg-background-secondary text-gray-600 dark:text-gray-400"
            >
              {risk}
            </span>
          ))}
        </div>

        <div className="mt-4 flex items-center text-xs font-semibold text-accent opacity-0 group-hover:opacity-100 transition-opacity">
          Get my plan <ArrowRight className="ml-1 h-3 w-3" />
        </div>
      </Link>
    </motion.div>
  );
}
