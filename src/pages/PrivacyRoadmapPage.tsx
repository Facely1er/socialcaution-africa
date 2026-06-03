import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Target,
  Calendar,
  TrendingUp,
  Clock,
  FileText,
  Users,
  Settings,
  BarChart3,
  Globe,
} from 'lucide-react';
import AfricaPageLayout from './africa/AfricaPageLayout';
import Section from '../components/common/Section';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import { africaRoadmapTasks } from '../data/africa/roadmapTasks';

const roadmapSteps = [
  {
    id: 'assessment',
    title: 'Initial assessment',
    description: 'Baseline your exposure, rights awareness, and security habits',
    icon: BarChart3,
    color: 'bg-blue-500',
    duration: '15 min',
  },
  {
    id: 'country',
    title: 'Country context',
    description: 'Open your country profile for law, regulator, and ScamShield paths',
    icon: Globe,
    color: 'bg-green-500',
    duration: '20 min',
  },
  {
    id: 'actions',
    title: 'Action center',
    description: 'Execute persona-specific tasks in the Digital Rights & Safety Action Center',
    icon: Settings,
    color: 'bg-yellow-500',
    duration: 'Variable',
  },
  {
    id: 'monitor',
    title: 'Review & repeat',
    description: 'Re-check scams, SIM registration, and complaint readiness quarterly',
    icon: TrendingUp,
    color: 'bg-purple-500',
    duration: 'Ongoing',
  },
];

const PrivacyRoadmapPage: React.FC = () => (
  <AfricaPageLayout
    title="Africa Privacy Roadmap"
    subtitle="Practical steps for African digital life"
    description="A structured plan focused on mobile money safety, scam prevention, and national data rights — not generic Western checklists."
  >
    <Section>
      <Card className="p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-6 items-center">
          <div className="md:w-1/2">
            <h2 className="text-2xl font-bold text-primary dark:text-white mb-4">Your privacy roadmap</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Start with assessments, align to your country&apos;s regulator, then move into ScamShield and the action
              center for your persona.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/assessment">
                <Button variant="primary">
                  Start with assessment
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/africa/countries">
                <Button variant="outline">Choose your country</Button>
              </Link>
            </div>
          </div>
          <div className="md:w-1/2">
            <Card className="p-4 bg-accent/5 border border-accent/20">
              <div className="flex items-start gap-3">
                <FileText className="h-5 w-5 text-accent flex-shrink-0" />
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  References ECOWAS, AU Malabo principles, and national laws (POPIA, NDPR, ODPC, CDP, ARTCI, etc.) via
                  country profiles — not EU-only framing.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </Card>

      <h2 className="text-2xl font-bold text-primary dark:text-white mb-6 text-center">Roadmap phases</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {roadmapSteps.map((step, index) => (
          <Card key={step.id} className="p-6">
            <div className="relative mb-4">
              <div className={`w-12 h-12 ${step.color} rounded-full flex items-center justify-center text-white`}>
                {React.createElement(step.icon, { className: 'h-6 w-6' })}
              </div>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-accent rounded-full flex items-center justify-center text-white text-xs font-bold">
                {index + 1}
              </div>
            </div>
            <h3 className="text-lg font-semibold text-primary dark:text-white mb-2">{step.title}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">{step.description}</p>
            <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
              <Clock className="h-3 w-3 mr-1" />
              {step.duration}
            </div>
          </Card>
        ))}
      </div>

      <h2 className="text-2xl font-bold text-primary dark:text-white mb-6 text-center">
        Recommended tasks (Africa Edition)
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
        {africaRoadmapTasks.map((task) => {
          const Icon = task.icon;
          return (
            <Card key={task.id} className="p-5">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-accent/10 rounded-lg">
                  <Icon className="h-5 w-5 text-accent" />
                </div>
                <div className="flex-grow">
                  <h3 className="font-semibold text-primary dark:text-white">{task.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 mb-2">{task.description}</p>
                  <span className="text-xs text-gray-500">{task.duration}</span>
                  {task.link && (
                    <div className="mt-3">
                      <Link to={task.link} className="text-sm text-accent font-semibold hover:underline">
                        Open guide →
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <Card className="p-6">
          <Target className="h-6 w-6 text-accent mb-3" />
          <h3 className="font-bold text-primary dark:text-white mb-2">Clear goals</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Prioritize scam prevention and mobile money hygiene before advanced privacy tooling.
          </p>
        </Card>
        <Card className="p-6">
          <Calendar className="h-6 w-6 text-accent mb-3" />
          <h3 className="font-bold text-primary dark:text-white mb-2">Realistic timing</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Tasks fit mobile-first users — short sessions, offline-friendly steps where possible.
          </p>
        </Card>
        <Card className="p-6">
          <TrendingUp className="h-6 w-6 text-accent mb-3" />
          <h3 className="font-bold text-primary dark:text-white mb-2">Track progress</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Revisit after major life events: new SIM, new mobile money account, or data breach news.
          </p>
        </Card>
        <Card className="p-6">
          <Users className="h-6 w-6 text-accent mb-3" />
          <h3 className="font-bold text-primary dark:text-white mb-2">Family & school</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Share ScamShield tips with household members and students using the same devices.
          </p>
        </Card>
      </div>

      <Card className="p-8 text-center">
        <h2 className="text-2xl font-bold text-primary dark:text-white mb-4">Ready to begin?</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-xl mx-auto">
          Take the security assessment first — it now includes mobile money and WhatsApp scam scenarios.
        </p>
        <Link to="/assessment/security">
          <Button variant="primary">
            Start security assessment
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </Link>
      </Card>
    </Section>
  </AfricaPageLayout>
);

export default PrivacyRoadmapPage;
