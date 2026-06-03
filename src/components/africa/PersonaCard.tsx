import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion } from '../../lib/motion';
import type { AfricaPersona } from '../../data/africa/personas';
import { getPersonaVisual } from '../../data/africa/personaVisuals';

export default function PersonaCard({ persona }: { persona: AfricaPersona }) {
  const { Icon, iconBg, iconColor, cardBorder, leftAccent } = getPersonaVisual(persona.slug);

  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="h-full"
    >
      <Link
        to={`/africa/personas/start/${persona.slug}`}
        className={`flex flex-col h-full p-5 rounded-2xl border border-l-4 bg-white dark:bg-card transition-all duration-200 ${leftAccent} ${cardBorder} hover:shadow-lg group`}
      >
        <div className={`w-12 h-12 rounded-xl ${iconBg} flex items-center justify-center mb-4`}>
          <Icon className={`h-6 w-6 ${iconColor}`} />
        </div>

        <h3 className="font-bold text-primary dark:text-white text-base mb-1.5 group-hover:text-accent transition-colors">
          {persona.label}
        </h3>

        <p className="text-sm text-text-secondary dark:text-gray-300 mb-4 leading-relaxed flex-grow">
          {persona.description}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {persona.priorityRisks.slice(0, 2).map((risk) => (
            <span
              key={risk}
              className="text-xs px-2.5 py-0.5 rounded-full bg-background-secondary text-text-secondary dark:text-gray-400"
            >
              {risk}
            </span>
          ))}
        </div>

        <div className="mt-auto pt-3 border-t border-border/60 flex items-center text-sm font-semibold text-accent">
          Get my plan <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </div>
      </Link>
    </motion.div>
  );
}
