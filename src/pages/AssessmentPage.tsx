import React from 'react';
import { Link } from 'react-router-dom';
import { Search, FileCheck, Shield, Clock, Info, ArrowRight, CheckCircle } from 'lucide-react';
import AfricaPageLayout from './africa/AfricaPageLayout';
import Section from '../components/common/Section';
import Card from '../components/common/Card';
import AfricaAssessmentBanner from '../components/africa/AfricaAssessmentBanner';

const assessments = [
  {
    id: 'exposure',
    title: 'Digital Exposure',
    description: 'Footprint, mobile money usage, OTP habits, and sharing risks — with Africa-focused questions.',
    icon: Search,
    duration: '10–15 min',
    path: '/assessment/exposure',
    features: ['Mobile money & OTP awareness', 'Platform exposure education', 'Personalized learning tips'],
  },
  {
    id: 'rights',
    title: 'Privacy Rights',
    description: 'Understand data subject rights with references to POPIA, NDPR, ODPC, and ECOWAS frameworks.',
    icon: FileCheck,
    duration: '5–10 min',
    path: '/assessment/rights',
    features: ['African law references', 'Complaint pathway awareness', 'Rights exercise habits'],
  },
  {
    id: 'security',
    title: 'Security Awareness',
    description: 'Passwords, devices, networks, plus mobile money PIN and WhatsApp scam hygiene.',
    icon: Shield,
    duration: '15–20 min',
    path: '/assessment/security',
    features: ['Mobile money PIN practices', 'WhatsApp scam scenarios', 'SIM registration check'],
  },
];

const AssessmentPage: React.FC = () => {
  return (
    <AfricaPageLayout
      title="Privacy Assessment"
      subtitle="Beta — localized for African digital life"
      description="Educational assessments to learn about exposure, rights, and security. Not legal advice — pair with your country profile for local law."
    >
      <Section>
        <AfricaAssessmentBanner />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {assessments.map((assessment) => {
            const Icon = assessment.icon;
            return (
              <Card key={assessment.id} className="p-6 h-full flex flex-col hover:border-accent transition-colors">
                <div className="flex items-start gap-3 mb-4">
                  <div className="p-3 bg-accent/10 rounded-lg">
                    <Icon className="h-7 w-7 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-primary dark:text-white">{assessment.title}</h3>
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mt-1">
                      <Clock className="h-4 w-4 mr-1" />
                      {assessment.duration}
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 flex-grow">{assessment.description}</p>
                <ul className="space-y-2 mb-5 text-sm text-gray-600 dark:text-gray-300">
                  {assessment.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  to={assessment.path}
                  className="inline-flex items-center justify-center w-full py-2.5 px-4 rounded-lg bg-accent text-white font-semibold hover:bg-accent-dark transition-colors"
                >
                  Start assessment
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Card>
            );
          })}
        </div>

        <Card className="p-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
          <div className="flex items-start gap-3">
            <Info className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-blue-800 dark:text-blue-200">
              These tools are for education only — not monitoring, automated removal, or legal representation.
              For step-by-step actions, use the{' '}
              <Link to="/africa/roadmap" className="font-semibold underline">
                Africa privacy roadmap
              </Link>{' '}
              or your{' '}
              <Link to="/africa/countries" className="font-semibold underline">
                country action center
              </Link>
              .
            </p>
          </div>
        </Card>
      </Section>
    </AfricaPageLayout>
  );
};

export default AssessmentPage;
