import React from 'react';
import { motion } from '../../lib/motion';
import { Check, Heart, Users, ShoppingBag, Camera, Shield, Briefcase, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Section from '../common/Section';
import Button from '../common/Button';
import SectionIconCircle from '../common/SectionIconCircle';
import { usePersona } from '../../hooks/usePersona';
import { PersonaType } from '../../core/types/personaTypes';

export const PrivacySolutionsCards: React.FC = () => {
  const navigate = useNavigate();
  const { setPersona } = usePersona();

  const selectPersonaAndGo = (personaType: PersonaType, path: string) => {
    setPersona(personaType);
    navigate(path);
  };
  
  const personas = [
    {
      id: 'cautious-parent',
      title: 'Cautious Parent',
      description: 'Protect your family\'s privacy online with child-safe settings and monitoring tools.',
      badge: 'Recommended',
      keyFocus: [],
      ctaText: 'Explore Solutions',
      icon: Heart,
      color: "border-blue-200 bg-blue-50 dark:bg-blue-900/20",
      path: "/personas/cautious-parent",
      recommended: true
    },
    {
      id: 'online-shopper',
      title: 'Online Shopper',
      description: 'Secure your financial information and protect yourself from identity theft while shopping online.',
      badge: 'Shopping',
      keyFocus: [],
      ctaText: 'Secure Shopping',
      icon: ShoppingBag,
      color: "border-emerald-200 bg-emerald-50 dark:bg-emerald-900/20",
      path: "/personas/online-shopper"
    },
    {
      id: 'private-individual',
      title: 'Private Individual',
      description: 'Maintain maximum privacy and control over your personal data across all platforms.',
      badge: 'Privacy',
      keyFocus: [],
      ctaText: 'Maximize Privacy',
      icon: Shield,
      color: "border-slate-200 bg-slate-50 dark:bg-slate-900/20",
      path: "/personas/private-individual"
    },
    {
      id: 'social-influencer',
      title: 'Social Influencer',
      description: 'Balance your public presence with personal privacy protection for you and your family.',
      badge: 'Social',
      keyFocus: [],
      ctaText: 'Protect Profile',
      icon: Camera,
      color: "border-pink-200 bg-pink-50 dark:bg-pink-900/20",
      path: "/personas/social-influencer"
    },
    {
      id: 'privacy-advocate',
      title: 'Privacy Advocate',
      description: 'Advanced tools and strategies for those who take privacy protection seriously.',
      badge: 'Advanced',
      keyFocus: [],
      ctaText: 'Advanced Tools',
      icon: Users,
      color: "border-purple-200 bg-purple-50 dark:bg-purple-900/20",
      path: "/personas/privacy-advocate"
    },
    {
      id: 'concerned-employee',
      title: 'Concerned Employee',
      description: 'Understand workplace monitoring, employee rights, and how to protect personal data on the job.',
      badge: 'Workplace',
      keyFocus: [],
      ctaText: 'Workplace Privacy',
      icon: Briefcase,
      color: "border-amber-200 bg-amber-50 dark:bg-amber-900/20",
      path: "/personas/concerned-employee"
    }
  ];

  return (
    <Section
      title="Start Here: Choose Your Privacy Persona"
      subtitle="Every journey begins with the profile that fits you. Pick a persona to unlock tailored assessments, alerts, and your 30-day protect roadmap."
      centered
      className="py-16 bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {personas.map((persona, index) => {
            const Icon = persona.icon;
            return (
              <motion.div
                key={persona.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className={`relative bg-white dark:bg-card rounded-xl border-2 ${persona.color} p-6 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer group ${
                  persona.recommended ? 'ring-2 ring-blue-500 ring-opacity-50' : ''
                }`}
                onClick={() => selectPersonaAndGo(persona.id as PersonaType, persona.path)}
              >
                {/* Badge */}
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    persona.recommended 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                  }`}>
                    {persona.badge}
                  </span>
                </div>

                {/* Icon */}
                <div className="text-center mb-3">
                  <SectionIconCircle
                    icon={Icon}
                    circleClassName={
                      persona.recommended
                        ? 'bg-blue-100 dark:bg-blue-900/30 group-hover:bg-blue-200 dark:group-hover:bg-blue-800/40 mx-auto transition-colors duration-300'
                        : 'bg-gray-100 dark:bg-gray-700 group-hover:bg-gray-200 dark:group-hover:bg-gray-600 mx-auto transition-colors duration-300'
                    }
                    iconClassName={
                      persona.recommended
                        ? 'text-blue-600 group-hover:text-blue-700'
                        : 'text-gray-600 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300'
                    }
                    className="mx-auto"
                  />
                </div>

                {/* Content */}
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-primary dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                    {persona.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                    {persona.description}
                  </p>
                </div>

                {/* Key Focus Areas */}
                <div className="mb-6">
                  <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3">
                    Problems We Solve
                  </p>
                  <ul className="space-y-3">
                    {persona.keyFocus.map((focus, focusIndex) => {
                      const isProblemSolution = focus.includes('PROBLEM:') && focus.includes('SOLUTION:');
                      if (isProblemSolution) {
                        const problem = focus.split('SOLUTION:')[0].replace('PROBLEM:', '').trim();
                        const solution = focus.split('SOLUTION:')[1]?.trim();
                        return (
                          <li key={focusIndex} className="space-y-2">
                            <div className="relative bg-gradient-to-r from-red-50 to-red-100/50 dark:from-red-900/20 dark:to-red-900/10 border-l-4 border-red-500 rounded-r-lg p-2.5 shadow-sm">
                              <div className="flex items-start gap-2">
                                <div className="flex-shrink-0 p-1 bg-red-500/10 rounded">
                                  <X className="h-3.5 w-3.5 text-red-600 dark:text-red-400" />
                                </div>
                                <p className="text-xs text-red-900 dark:text-red-100 font-medium leading-relaxed flex-1">
                                  {problem}
                                </p>
                              </div>
                            </div>
                            <div className="relative bg-gradient-to-r from-green-50 to-green-100/50 dark:from-green-900/20 dark:to-green-900/10 border-l-4 border-green-500 rounded-r-lg p-2.5 shadow-sm">
                              <div className="flex items-start gap-2">
                                <div className="flex-shrink-0 p-1 bg-green-500/10 rounded">
                                  <Check className="h-3.5 w-3.5 text-green-600 dark:text-green-400" />
                                </div>
                                <p className="text-xs text-green-900 dark:text-green-100 font-medium leading-relaxed flex-1">
                                  {solution}
                                </p>
                              </div>
                            </div>
                          </li>
                        );
                      }
                      return (
                        <li key={focusIndex} className="flex items-start">
                          <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-gray-600 dark:text-gray-300">{focus}</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                {/* CTA Button */}
                <div className="text-center">
                  <Button
                    variant={persona.recommended ? "primary" : "outline"}
                    className={`w-full transition-all duration-300 ${
                      persona.recommended 
                        ? 'bg-blue-500 hover:bg-blue-600 text-white border-blue-500' 
                        : 'text-text border-border hover:bg-card-hover dark:text-text dark:border-border dark:hover:bg-card-hover'
                    }`}
                    onClick={(e: React.MouseEvent) => {
                      e.stopPropagation();
                      selectPersonaAndGo(persona.id as PersonaType, persona.path);
                    }}
                  >
                    {persona.ctaText}
                  </Button>
                </div>
              </motion.div>
            );
          })}
        </div>
        
        {/* Additional CTA Section */}
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Not sure which solution fits you?
          </p>
          <Button
            variant="outline"
            onClick={() => navigate('/personas')}
            className="px-8 py-3 text-lg text-text border-border hover:bg-card-hover dark:text-text dark:border-border dark:hover:bg-card-hover transition-all duration-300"
          >
            Take Our Quiz
          </Button>
        </motion.div>
      </div>
    </Section>
  );
};