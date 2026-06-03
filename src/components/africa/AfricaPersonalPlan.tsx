import React from 'react';
import { Link } from 'react-router-dom';
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  Landmark,
  ListChecks,
  MapPin,
  Shield,
  User,
} from 'lucide-react';
import Card from '../common/Card';
import Button from '../common/Button';
import type { AfricaCountry } from '../../data/africa/countries';
import type { AfricaPersona } from '../../data/africa/personas';
import type { AfricaActionRecommendation } from '../../data/africa/actions';
import { getPersonaVisual } from '../../data/africa/personaVisuals';

type AfricaPersonalPlanProps = {
  country: AfricaCountry;
  persona?: AfricaPersona;
  recommendations: AfricaActionRecommendation[];
};

const priorityLabel: Record<AfricaActionRecommendation['priority'], string> = {
  high: 'Do now',
  medium: 'This week',
  low: 'When you can',
};

const priorityDotClass: Record<AfricaActionRecommendation['priority'], string> = {
  high: 'plan-timeline-dot--high',
  medium: 'plan-timeline-dot--medium',
  low: 'plan-timeline-dot--low',
};

const priorityCardClass: Record<AfricaActionRecommendation['priority'], string> = {
  high: 'plan-step-card--high',
  medium: 'plan-step-card--medium',
  low: 'plan-step-card--low',
};

export default function AfricaPersonalPlan({ country, persona, recommendations }: AfricaPersonalPlanProps) {
  const visual = persona ? getPersonaVisual(persona.slug) : null;
  const PersonaIcon = visual?.Icon;
  const highPriorityCount = recommendations.filter((r) => r.priority === 'high').length;

  return (
    <div className="space-y-6 md:space-y-8">
      <div className={`plan-hero-card border-l-4 ${visual?.leftAccent ?? 'border-l-accent'}`}>
        <div className="flex flex-col sm:flex-row sm:items-start gap-4">
          {persona && PersonaIcon && visual ? (
            <div className={`w-14 h-14 rounded-xl ${visual.iconBg} flex items-center justify-center flex-shrink-0`}>
              <PersonaIcon className={`h-7 w-7 ${visual.iconColor}`} />
            </div>
          ) : (
            <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
              <Shield className="h-7 w-7 text-accent" />
            </div>
          )}
          <div className="flex-grow min-w-0">
            <p className="text-xs font-bold uppercase tracking-wide text-accent mb-1.5">Your personal safety plan</p>
            <h2 className="text-2xl md:text-3xl font-bold text-primary dark:text-white mb-2 leading-tight">
              {persona ? `${persona.label} in ${country.name}` : `Safety plan for ${country.name}`}
            </h2>
            <p className="text-sm text-text-secondary dark:text-gray-300 leading-relaxed">
              {persona
                ? persona.description
                : 'Choose a profile on the homepage to tailor risks and first actions to your situation.'}
            </p>
            {!persona && (
              <Link
                to="/"
                className="inline-flex items-center gap-1.5 mt-4 text-sm font-semibold text-accent hover:underline"
              >
                Choose my profile <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            )}
          </div>
        </div>

        <div className="plan-meta-strip">
          <span className="plan-meta-chip">
            <MapPin className="h-3.5 w-3.5" />
            {country.name}
          </span>
          {persona && (
            <span className="plan-meta-chip">
              <User className="h-3.5 w-3.5" />
              {persona.shortLabel}
            </span>
          )}
          <span className="plan-meta-chip">
            <ListChecks className="h-3.5 w-3.5" />
            {recommendations.length} steps · {highPriorityCount} urgent
          </span>
        </div>
      </div>

      {persona && (
        <>
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="h-5 w-5 text-danger" />
              <h3 className="text-lg font-bold text-primary dark:text-white">Risks to watch for</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {persona.priorityRisks.map((risk) => (
                <span key={risk} className="plan-risk-pill">
                  {risk}
                </span>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-bold text-primary dark:text-white mb-1">Do this first</h3>
            <p className="text-sm text-text-secondary dark:text-gray-400 mb-4">
              Start here before moving to the full action list below.
            </p>
            <ol className="plan-checklist">
              {persona.primaryActions.map((action, index) => (
                <li key={action} className="plan-checklist-item">
                  <span className="plan-checklist-num">{index + 1}</span>
                  <span className="text-sm text-text-secondary dark:text-gray-300 pt-0.5 leading-relaxed">
                    {action}
                  </span>
                </li>
              ))}
            </ol>
          </Card>
        </>
      )}

      <Card className="p-6">
        <h3 className="text-lg font-bold text-primary dark:text-white mb-1">Your action timeline</h3>
        <p className="text-sm text-text-secondary dark:text-gray-400 mb-6">
          Work through these in order — urgent items first.
        </p>
        <div className="plan-timeline">
          {recommendations.map((rec, index) => (
            <div key={rec.id} className="plan-timeline-item">
              <span className={`plan-timeline-dot ${priorityDotClass[rec.priority]}`} aria-hidden />
              <div className={`plan-step-card ${priorityCardClass[rec.priority]}`}>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="text-xs font-bold text-text-secondary dark:text-gray-400">
                    Step {index + 1}
                  </span>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
                      rec.priority === 'high'
                        ? 'bg-danger/10 text-danger'
                        : rec.priority === 'medium'
                          ? 'bg-warning/10 text-warning'
                          : 'bg-success/10 text-success'
                    }`}
                  >
                    {priorityLabel[rec.priority]}
                  </span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-background-secondary text-text-secondary capitalize">
                    {rec.type}
                  </span>
                </div>
                <h4 className="font-semibold text-primary dark:text-white mb-1">{rec.title}</h4>
                <p className="text-sm text-text-secondary dark:text-gray-300 leading-relaxed">{rec.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
        <Card className="p-6 border-l-4 border-l-accent">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="h-5 w-5 text-accent" />
            <h3 className="font-bold text-primary dark:text-white">If something goes wrong</h3>
          </div>
          <ul className="space-y-3 text-sm text-text-secondary dark:text-gray-300 mb-5">
            <li className="flex gap-2.5">
              <CheckCircle2 className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" />
              Preserve screenshots and transaction references before you report.
            </li>
            <li className="flex gap-2.5">
              <CheckCircle2 className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" />
              Contact your provider&apos;s fraud desk first for payment or account abuse.
            </li>
            <li className="flex gap-2.5">
              <CheckCircle2 className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" />
              Then use official reporting channels below.
            </li>
          </ul>
          <ul className="space-y-2">
            {country.reportingChannels.map((channel) => (
              <li key={channel} className="africa-list-item text-sm text-primary dark:text-white font-medium">
                {channel}
              </li>
            ))}
          </ul>
        </Card>

        <Card className="p-6 border-l-4 border-l-primary dark:border-l-accent">
          <div className="flex items-center gap-2 mb-4">
            <Landmark className="h-5 w-5 text-accent" />
            <h3 className="font-bold text-primary dark:text-white">Your rights in {country.name}</h3>
          </div>
          <p className="text-sm text-text-secondary dark:text-gray-300 mb-4 leading-relaxed">
            Under <strong className="text-primary dark:text-white">{country.law}</strong>, via{' '}
            {country.authority}.
          </p>
          <ul className="space-y-2 mb-5">
            {country.rights.map((right) => (
              <li key={right} className="africa-list-item text-sm text-text-secondary dark:text-gray-300">
                {right}
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-2">
            {country.authorityUrl && (
              <a href={country.authorityUrl} target="_blank" rel="noreferrer">
                <Button variant="outline" size="sm">
                  Authority site <ExternalLink className="ml-1 h-3.5 w-3.5" />
                </Button>
              </a>
            )}
            {country.cybercrimeReportingUrl && (
              <a href={country.cybercrimeReportingUrl} target="_blank" rel="noreferrer">
                <Button variant="outline" size="sm">
                  Report cybercrime <ExternalLink className="ml-1 h-3.5 w-3.5" />
                </Button>
              </a>
            )}
          </div>
        </Card>
      </div>

      <div className="flex flex-wrap gap-3 pt-2 border-t border-border/60">
        <Link to="/africa/scamshield">
          <Button variant="outline">Open ScamShield</Button>
        </Link>
        {persona ? (
          <Link to={`/africa/personas/start/${persona.slug}`}>
            <Button variant="outline">Change country or profile</Button>
          </Link>
        ) : (
          <Link to={`/africa/personas/${country.slug}`}>
            <Button variant="outline">Choose my profile</Button>
          </Link>
        )}
        <Link to={`/africa/countries/${country.slug}`}>
          <Button variant="outline">Full country profile</Button>
        </Link>
      </div>
    </div>
  );
}
