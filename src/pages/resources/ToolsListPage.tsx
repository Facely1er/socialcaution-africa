import React from 'react';
import { Shield, FileText, Lock } from 'lucide-react';
import PageLayout from '../../components/layout/PageLayout';
import Section from '../../components/common/Section';
import Card from '../../components/common/Card';
import ResourcesPageShell from '../../components/resources/ResourcesPageShell';
import { Link } from 'react-router-dom';

const ToolsListPage: React.FC = () => {
  const tools = [
    {
      id: 'personal-data-inventory',
      title: 'Personal Data Inventory',
      description: 'Create a comprehensive inventory of your personal data to better understand what is collected and shared.',
      icon: FileText,
      path: '/resources/tools/personal-data-inventory',
      features: ['Data mapping', 'Sensitivity assessment', 'Export to PDF, CSV, or JSON']
    },
    {
      id: 'privacy-assessment',
      title: 'Privacy Assessment Tool',
      description: 'Assess your privacy protection level and get personalized recommendations.',
      icon: Shield,
      path: '/resources/tools/privacy-assessment',
      features: ['Privacy scoring', 'Detailed analysis', 'Personalized recommendations']
    },
    {
      id: 'password-strength',
      title: 'Password Strength Checker',
      description: 'Check and improve your password security with real-time client-side analysis.',
      icon: Lock,
      path: '/resources/tools/password-strength',
      features: ['Real-time strength analysis', 'Password generator', 'Check history saved locally']
    }
  ];

  return (
    <PageLayout
      title="Privacy Tools"
      subtitle="Interactive tools to help you protect and manage your privacy"
      description="Privacy tools that run in your browser — no simulated scans or fake results."
      heroBackground={false}
      backgroundType="toolkit"
      showBreadcrumbs={true}
      breadcrumbs={[
        { label: 'Resources', path: '/resources' },
        { label: 'Tools', path: '/resources/tools' }
      ]}
    >
      <Section>
        <ResourcesPageShell>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool) => {
            const Icon = tool.icon;
            return (
              <Link
                key={tool.id}
                to={tool.path}
                className="block"
              >
                <Card
                  animate
                  className="p-6 flex flex-col h-full hover:shadow-lg transition-all"
                >
                  <div className="flex items-center mb-4">
                    <div className="p-2 bg-accent/10 rounded-full mr-3">
                      <Icon className="h-5 w-5 text-accent" />
                    </div>
                    <h3 className="text-lg font-semibold text-text dark:text-white">{tool.title}</h3>
                  </div>
                  
                  <p className="text-text-secondary dark:text-gray-300 mb-4 flex-grow">{tool.description}</p>
                  
                  <ul className="space-y-2">
                    {tool.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-sm text-text-secondary dark:text-gray-300">
                        <div className="w-1.5 h-1.5 bg-accent rounded-full mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </Card>
              </Link>
            );
          })}
        </div>
        </ResourcesPageShell>
      </Section>
    </PageLayout>
  );
};

export default ToolsListPage;
