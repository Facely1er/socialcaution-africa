import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion } from '../../lib/motion';
import type { AfricaPersona } from '../../data/africa/personas';
import { getPersonaVisual } from '../../data/africa/personaVisuals';

type PersonaCardProps = {
  persona: AfricaPersona;
  /** Dark hero variant — translucent cards on navy background */
  dark?: boolean;
  /** Override destination — defaults to persona-first country picker */
  to?: string;
  ctaLabel?: string;
};

export default function PersonaCard({
  persona,
  dark = false,
  to,
  ctaLabel = 'Get my plan',
}: PersonaCardProps) {
  const { Icon, iconBg, iconColor, cardBorder } = getPersonaVisual(persona.slug);
  const href = to ?? `/africa/personas/start/${persona.slug}`;

  const cardClasses = dark
    ? 'flex flex-col h-full p-5 rounded-2xl border bg-white/8 hover:bg-white/12 border-white/15 hover:border-white/30 transition-all duration-200 hover:shadow-lg group'
    : `flex flex-col h-full p-5 rounded-2xl border border-border bg-white dark:bg-card ${cardBorder} transition-all duration-200 hover:shadow-lg group`;

  const iconWrapClasses = dark
    ? 'w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-4'
    : `w-12 h-12 rounded-xl ${iconBg} flex items-center justify-center mb-4`;

  const titleClasses = dark
    ? 'font-bold text-white text-base mb-1.5 group-hover:text-accent transition-colors'
    : 'font-bold text-primary dark:text-white text-base mb-1.5 group-hover:text-accent transition-colors';

  const descClasses = dark
    ? 'text-sm text-white/65 mb-4 leading-relaxed flex-grow'
    : 'text-sm text-text-secondary dark:text-gray-300 mb-4 leading-relaxed flex-grow';

  const tagClasses = dark
    ? 'text-xs px-2.5 py-0.5 rounded-full bg-white/10 text-white/55'
    : 'text-xs px-2.5 py-0.5 rounded-full bg-background-secondary text-text-secondary dark:text-gray-400';

  const footerBorder = dark ? 'border-white/15' : 'border-border/60';

  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="h-full"
    >
      <Link to={href} className={cardClasses}>
        <div className={iconWrapClasses}>
          <Icon className={`h-6 w-6 ${iconColor}`} />
        </div>

        <h3 className={titleClasses}>{persona.label}</h3>

        <p className={descClasses}>{persona.description}</p>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {persona.priorityRisks.slice(0, 2).map((risk) => (
            <span key={risk} className={tagClasses}>
              {risk}
            </span>
          ))}
        </div>

        <div className={`mt-auto pt-3 border-t ${footerBorder} flex items-center text-sm font-semibold text-accent`}>
          {ctaLabel}{' '}
          <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </div>
      </Link>
    </motion.div>
  );
}
