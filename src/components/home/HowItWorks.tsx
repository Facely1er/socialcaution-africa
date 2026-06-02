import React from 'react';
import { motion } from '../../lib/motion';
import { useNavigate } from 'react-router-dom';
import { Search, Lightbulb, Shield, LineChart, AlertCircle, Sparkles, Users } from 'lucide-react';
import Section from '../../components/common/Section';
import Button from '../../components/common/Button';
import SectionIconCircle from '../../components/common/SectionIconCircle';

export const HowItWorks: React.FC = () => {
  const navigate = useNavigate();
  const steps = [
    {
      id: 1,
      title: 'Choose',
      subtitle: 'Pick Your Persona',
      description: 'PROBLEM: Generic privacy advice doesn\'t fit your life. SOLUTION: Select the profile that matches your situation to unlock tailored guidance from day one.',
      microCopy: 'Your entry point',
      icon: Users,
      color: "bg-accent",
      timeline: '2 minutes'
    },
    {
      id: 2,
      title: 'Discover',
      subtitle: 'Assess Your Privacy',
      description: 'PROBLEM: You don\'t know where your data is exposed or how it\'s being used. SOLUTION: Persona-guided assessments reveal your digital footprint and vulnerabilities.',
      microCopy: 'Get started in minutes',
      icon: Search,
      color: "bg-warning",
      timeline: '5 minutes'
    },
    {
      id: 3,
      title: 'Learn',
      subtitle: 'Understand Your Rights',
      description: 'PROBLEM: Privacy laws are complex and hard to understand. SOLUTION: We explain your rights in simple terms and show you how to exercise them.',
      microCopy: 'Knowledge is power',
      icon: Lightbulb,
      color: "bg-primary",
      timeline: '15 minutes'
    },
    {
      id: 4,
      title: 'Protect',
      subtitle: 'Follow Your 30-Day Roadmap',
      description: 'PROBLEM: You don\'t know where to start improving your privacy. SOLUTION: Your persona\'s 30-day plan delivers daily actions through the Protect phase.',
      microCopy: 'Structured daily tasks',
      icon: Shield,
      color: "bg-success",
      timeline: '30 days'
    },
    {
      id: 5,
      title: 'Monitor',
      subtitle: 'Track Progress',
      description: 'PROBLEM: Privacy protection is an ongoing process, not a one-time fix. SOLUTION: Track your progress and get alerts about new privacy risks.',
      microCopy: 'Stay protected',
      icon: LineChart,
      color: "bg-primary",
      timeline: 'Ongoing'
    }
  ];

  return (
    <Section
      title="How SocialCaution Works"
      subtitle={
        <div className="space-y-2">
          <p className="text-xl text-accent font-semibold">Persona-first, then journey</p>
          <p className="text-gray-600 dark:text-white">Choose your profile, then progress through discovery, learning, your 30-day protect roadmap, and ongoing monitoring</p>
        </div>
      }
      centered
      className="bg-blue-50 dark:bg-gray-800 py-16"
    >
      <div className="max-w-6xl mx-auto">
        {/* Horizontal Timeline */}
        <div className="relative">
          {/* Connecting Line */}
          <div 
            className="absolute top-7 left-0 right-0 h-0.5 hidden lg:block how-it-works-timeline"
          />
          
          {/* Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-4">
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative text-center"
              >
                {/* Numbered Circle */}
                <div className="relative mb-4 w-fit mx-auto">
                  <SectionIconCircle
                    icon={step.icon}
                    circleClassName={`${step.color} shadow-lg`}
                    iconClassName="text-white"
                  />
                  <div className="absolute -top-1 -right-1 w-7 h-7 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center text-accent text-sm font-bold border-2 border-accent shadow-md">
                    {step.id}
                  </div>
                </div>

                {/* Content */}
                <div className="px-2">
                  <h3 className="text-xl font-bold text-primary dark:text-white mb-2">{step.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">{step.subtitle}</p>
                  
                  {/* Problem-Solution Display */}
                  {(() => {
                    const problemMatch = step.description.match(/PROBLEM:\s*(.+?)(?=\s*SOLUTION:|$)/i);
                    const solutionMatch = step.description.match(/SOLUTION:\s*(.+?)$/i);
                    const problem = problemMatch ? problemMatch[1].trim() : '';
                    const solution = solutionMatch ? solutionMatch[1].trim() : '';
                    
                    // Get color classes based on step
                    const colorClasses = {
                      1: { bg: 'bg-accent/10', border: 'border-accent/30', text: 'text-accent', icon: 'bg-accent/20' },
                      2: { bg: 'bg-warning/10', border: 'border-warning/30', text: 'text-warning', icon: 'bg-warning/20' },
                      3: { bg: 'bg-primary/10', border: 'border-primary/30', text: 'text-primary', icon: 'bg-primary/20' },
                      4: { bg: 'bg-success/10', border: 'border-success/30', text: 'text-success', icon: 'bg-success/20' },
                      5: { bg: 'bg-primary/10', border: 'border-primary/30', text: 'text-primary', icon: 'bg-primary/20' }
                    };
                    const colors = colorClasses[step.id as keyof typeof colorClasses] || colorClasses[1];
                    
                    return (
                      <div className="mb-3 space-y-3">
                        {problem && (
                          <div className={`relative ${colors.bg} ${colors.border} border-l-4 rounded-r-lg p-3`}>
                            <div className="flex items-start gap-2.5">
                              <div className={`flex-shrink-0 p-1.5 ${colors.icon} rounded-lg`}>
                                <AlertCircle className={`h-3.5 w-3.5 ${colors.text}`} />
                              </div>
                              <div className="flex-1">
                                <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">Challenge</p>
                                <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed">
                                  {problem}
                                </p>
                              </div>
                            </div>
                          </div>
                        )}
                        {solution && (
                          <div className={`relative ${colors.bg} ${colors.border} border-l-4 rounded-r-lg p-3`}>
                            <div className="flex items-start gap-2.5">
                              <div className={`flex-shrink-0 p-1.5 ${colors.icon} rounded-lg`}>
                                <Sparkles className={`h-3.5 w-3.5 ${colors.text}`} />
                              </div>
                              <div className="flex-1">
                                <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">Our Approach</p>
                                <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed font-medium">
                                  {solution}
                                </p>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })()}
                  
                  {step.timeline && (
                    <div className="text-xs text-accent font-medium mb-2 bg-accent/10 px-2 py-1 rounded-full inline-block">
                      {step.timeline}
                    </div>
                  )}
                  {step.microCopy && (
                    <p className="text-xs text-accent font-medium">{step.microCopy}</p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <Button
            variant="primary"
            className="text-lg px-8 py-4 group"
            onClick={() => navigate('/personas')}
          >
            Choose Your Persona
            <span className="inline-block transition-transform group-hover:translate-x-1 ml-2">→</span>
          </Button>
        </motion.div>
      </div>
    </Section>
  );
};