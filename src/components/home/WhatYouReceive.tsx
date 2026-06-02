import React from 'react';
import { motion } from '../../lib/motion';
import { useNavigate } from 'react-router-dom';
import { BarChart3, FileText, CheckCircle } from 'lucide-react';
import Section from '../common/Section';
import Button from '../common/Button';
import SectionIconCircle from '../common/SectionIconCircle';

export const WhatYouReceive: React.FC = () => {
  const navigate = useNavigate();
  const deliverables = [
    {
      id: 1,
      title: 'Personal Privacy Score',
      description: 'Get a comprehensive score from 0-100 that shows how well you\'re protecting your privacy online.',
      icon: BarChart3,
      color: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
      details: [
        'Overall privacy rating',
        'Risk level assessment',
        'Comparison to benchmarks',
        'Improvement tracking'
      ]
    },
    {
      id: 2,
      title: 'Risk Assessment Report',
      description: 'Detailed analysis of your privacy vulnerabilities with specific recommendations for improvement.',
      icon: FileText,
      color: "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400",
      details: [
        'Vulnerability identification',
        'Risk prioritization',
        'Impact analysis',
        'Compliance check'
      ]
    },
    {
      id: 3,
      title: 'Customized Action Plan',
      description: 'Step-by-step guidance tailored to your specific privacy needs and risk profile.',
      icon: CheckCircle,
      color: "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400",
      details: [
        'Personalized recommendations',
        'Priority-based actions',
        'Progress tracking',
        'Ongoing support'
      ]
    }
  ];

  return (
    <Section
      title="What You'll Receive"
      subtitle="Comprehensive privacy insights and actionable recommendations"
      centered
      className="bg-white dark:bg-gray-900 py-16"
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {deliverables.map((deliverable, index) => {
            const Icon = deliverable.icon;
            return (
              <motion.div
                key={deliverable.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                {/* Icon */}
                <div className="mb-4">
                  <SectionIconCircle
                    icon={Icon}
                    circleClassName={`${deliverable.color} mx-auto`}
                    className="mx-auto"
                  />
                </div>

                {/* Content */}
                <div className="px-4">
                  <h3 className="text-xl font-bold text-primary dark:text-white mb-3">
                    {deliverable.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    {deliverable.description}
                  </p>

                  {/* Details List */}
                  <ul className="space-y-2 text-left">
                    {deliverable.details.map((detail, detailIndex) => (
                      <li key={detailIndex} className="flex items-start">
                        <div className="w-2 h-2 bg-accent rounded-full mt-2 mr-3 flex-shrink-0" />
                        <span className="text-sm text-gray-600 dark:text-gray-300">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 max-w-2xl mx-auto">
            <h4 className="text-lg font-semibold text-primary dark:text-white mb-2">
              Ready to Get Started?
            </h4>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Join thousands of users who have already improved their privacy protection.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button variant="primary" onClick={() => navigate('/assessment')}>
                Start Free Assessment
              </Button>
              <Button variant="outline" onClick={() => navigate('/assessment')}>
                View Sample Report
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </Section>
  );
};