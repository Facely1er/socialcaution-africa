import React from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, ArrowRight, CheckCircle2, ExternalLink, Landmark, Shield } from 'lucide-react';
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

export default function AfricaPersonalPlan({ country, persona, recommendations }: AfricaPersonalPlanProps) {
  const visual = persona ? getPersonaVisual(persona.slug) : null;
  const PersonaIcon = visual?.Icon;

  return (
    <div className="space-y-6">
      <Card className="p-6 md:p-8 border-accent/30 bg-gradient-to-br from-accent/5 to-transparent">
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
            <p className="text-sm font-semibold text-accent mb-1">Your personal safety plan</p>
            <h2 className="text-2xl md:text-3xl font-bold text-primary dark:text-white mb-2">
              {persona ? `${persona.label} in ${country.name}` : `Safety plan for ${country.name}`}
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              {persona
                ? persona.description
                : 'Choose a profile on the homepage to tailor risks and first actions to your situation.'}
            </p>
            {!persona && (
              <Link to="/" className="inline-flex items-center gap-1 mt-3 text-sm font-semibold text-accent hover:underline">
                Choose my profile <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            )}
          </div>
        </div>
      </Card>

      {persona && (
        <>
          <Card className="p-6">
            <h3 className="text-lg font-bold text-primary dark:text-white mb-3">Risks to watch for</h3>
            <div className="flex flex-wrap gap-2">
              {persona.priorityRisks.map((risk) => (
                <span
                  key={risk}
                  className="text-sm px-3 py-1.5 rounded-full bg-gray-100 dark:bg-background-secondary text-gray-700 dark:text-gray-300"
                >
                  {risk}
                </span>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-bold text-primary dark:text-white mb-4">Do this first</h3>
            <ol className="space-y-3">
              {persona.primaryActions.map((action, index) => (
                <li key={action} className="flex gap-3 text-gray-700 dark:text-gray-300">
                  <span className="flex-shrink-0 w-7 h-7 rounded-full bg-accent/10 text-accent text-sm font-bold flex items-center justify-center">
                    {index + 1}
                  </span>
                  <span className="pt-0.5">{action}</span>
                </li>
              ))}
            </ol>
          </Card>
        </>
      )}

      <Card className="p-6">
        <h3 className="text-lg font-bold text-primary dark:text-white mb-4">Your next steps</h3>
        <ol className="space-y-4">
          {recommendations.map((rec, index) => (
            <li
              key={rec.id}
              className="p-4 rounded-xl border border-border bg-light-blue/5 dark:bg-background-secondary/50"
            >
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="text-xs font-bold text-accent">Step {index + 1}</span>
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
              </div>
              <h4 className="font-semibold text-primary dark:text-white mb-1">{rec.title}</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">{rec.description}</p>
            </li>
          ))}
        </ol>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="h-5 w-5 text-accent" />
            <h3 className="font-bold text-primary dark:text-white">If something goes wrong</h3>
          </div>
          <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300 mb-4">
            <li className="flex gap-2">
              <CheckCircle2 className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" />
              Preserve screenshots and transaction references before you report.
            </li>
            <li className="flex gap-2">
              <CheckCircle2 className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" />
              Contact your provider&apos;s fraud desk first for payment or account abuse.
            </li>
            <li className="flex gap-2">
              <CheckCircle2 className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" />
              Then use official reporting channels below.
            </li>
          </ul>
          <ul className="space-y-1 text-sm font-medium text-primary dark:text-white">
            {country.reportingChannels.map((channel) => (
              <li key={channel}>• {channel}</li>
            ))}
          </ul>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-2 mb-3">
            <Landmark className="h-5 w-5 text-accent" />
            <h3 className="font-bold text-primary dark:text-white">Your rights in {country.name}</h3>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
            Under <strong>{country.law}</strong>, via {country.authority}.
          </p>
          <ul className="space-y-1 text-sm text-gray-700 dark:text-gray-300 mb-4">
            {country.rights.map((right) => (
              <li key={right}>• {right}</li>
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

      <div className="flex flex-wrap gap-3 pt-2">
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
