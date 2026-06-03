import React from 'react';
import { motion } from '../../lib/motion';
import { Globe, AlertTriangle, Smartphone, Scale } from 'lucide-react';
import Section from '../../components/common/Section';
import SectionIconCircle from '../../components/common/SectionIconCircle';

const FactsAndFigures: React.FC = () => {
  const stats = [
    {
      value: '54',
      label: 'Nations, One Platform',
      description: 'SocialCaution Africa is designed for use across all 54 African nations, with country-specific legal and regulatory content.',
      source: 'ERMITS Advisory',
      icon: Globe,
      color: 'bg-accent/10 text-accent'
    },
    {
      value: '43%',
      label: 'Mobile-Only Internet',
      description: 'An estimated 43% of African internet users access the web exclusively via mobile — making mobile-first design a privacy necessity, not a preference.',
      source: 'GSMA Mobile Economy Africa 2023',
      icon: Smartphone,
      color: 'bg-warning/10 text-warning'
    },
    {
      value: '38',
      label: 'African Data Protection Laws',
      description: 'As of 2024, 38 African countries have enacted or are developing national data protection legislation — rights most citizens are unaware of.',
      source: 'AU Data Policy Framework 2022',
      icon: Scale,
      color: 'bg-danger/10 text-danger'
    },
    {
      value: '$530M+',
      label: 'African Fintech Fraud Losses',
      description: 'Annual financial losses from mobile money fraud, SIM swap attacks, and digital scams affecting African users and small businesses.',
      source: 'Interpol Africa Cyberthreat Assessment 2023',
      icon: AlertTriangle,
      color: 'bg-success/10 text-success'
    }
  ];

  return (
    <Section
      title="Digital Privacy in Africa — The Real Picture"
      subtitle={
        <div className="space-y-3 max-w-3xl mx-auto">
          <p className="text-xl text-accent font-semibold">Why this matters here</p>
          <p className="text-gray-600 dark:text-gray-300">
            African digital life has distinct risks, contexts, and rights. These are the numbers that shape this platform.
          </p>
        </div>
      }
      centered
      className="section-gray py-8"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative bg-white dark:bg-card rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
            >
              <motion.div
                className={`absolute top-0 left-0 w-2 h-full ${
                  index === 0 ? 'bg-accent' :
                  index === 1 ? 'bg-warning' :
                  index === 2 ? 'bg-danger' :
                  'bg-success'
                } rounded-l-xl`}
                initial={{ height: 0 }}
                whileInView={{ height: '100%' }}
                transition={{ duration: 1, delay: 0.2 }}
                viewport={{ once: true }}
              />
              
              <div className="flex items-center gap-3 mb-3">
                <SectionIconCircle icon={Icon} circleClassName={stat.color} />
                <div className="text-2xl sm:text-3xl font-bold text-primary dark:text-white">
                  {stat.value}
                </div>
              </div>

              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
                {stat.label}
              </h3>

              <p className="text-gray-600 dark:text-gray-300 mb-3 text-sm">
                {stat.description}
              </p>

              <p className="text-xs text-gray-500 dark:text-gray-400 italic">
                {stat.source}
              </p>

              <motion.div
                className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-accent to-accent/50"
                initial={{ width: 0 }}
                whileInView={{ width: '100%' }}
                transition={{ duration: 1.5, delay: 0.5 }}
                viewport={{ once: true }}
              />
            </motion.div>
          );
        })}
      </div>

      <p className="text-center text-xs text-text-secondary dark:text-gray-400 mt-8 max-w-2xl mx-auto">
        Statistics are sourced from publicly available reports. Figures should be verified
        against current official sources before citation in formal documents.
      </p>
    </Section>
  );
};

export default FactsAndFigures;
