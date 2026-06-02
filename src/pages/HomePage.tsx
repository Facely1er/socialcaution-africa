import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from '../lib/motion';
import { AlertTriangle, Globe, MapPin, Users, ShoppingCart, Heart, Brain, Shield, UserSquare2, Target, ArrowRight, Smartphone, Scale } from 'lucide-react';
import Hero from '../components/home/Hero';
import PrivacyRiskTeaser from '../components/home/PrivacyRiskTeaser';
import { HowItWorks } from '../components/home/HowItWorks';
import { PrivacySolutionsCards } from '../components/home/PrivacySolutionsCards';
import { PrivacyAssessmentPreview } from '../components/home/PrivacyAssessmentPreview';
import { WhatYouReceive } from '../components/home/WhatYouReceive';
import FactsAndFigures from '../components/home/FactsAndFigures';
import { EssentialPrivacyToolkit } from '../components/home/EssentialPrivacyToolkit';
import { FAQSection } from '../components/home/FAQSection';
import { StayProtected } from '../components/home/StayProtected';
import PrivacyJourneyDemo from '../components/home/PrivacyJourneyDemo';
import ThirtyDayPlanPreview from '../components/home/ThirtyDayPlanPreview';
import { CtaSection } from '../components/home/CtaSection';
import PageLayout from '../components/layout/PageLayout';
import Section from '../components/common/Section';
import Card from '../components/common/Card';
import SectionIconCircle from '../components/common/SectionIconCircle';

const HomePage: React.FC = () => {
  // Data for the "Why It Matters" section
  const sectionContent = {
    title: 'Why Privacy Matters More Than Ever',
    subtitle: 'In today\'s digital world, your personal data is constantly being collected, analyzed, and monetized. Understanding the hidden costs of free services empowers you to make informed decisions about your digital life.',
    costTitle: 'The Hidden Cost of "Free"',
    costDescription: 'Every free service comes with a price - your personal data. Here\'s what you\'re really paying:',
    costItems: [
      { icon: Globe, problem: 'Every website you visit tracks your browsing habits', solution: 'Use privacy-focused browsers and ad blockers' },
      { icon: MapPin, problem: 'Your location is constantly monitored and stored', solution: 'Limit location sharing to essential apps only' },
      { icon: Users, problem: 'Social media platforms build detailed profiles of your interests', solution: 'Review and limit data sharing in privacy settings' },
      { icon: ShoppingCart, problem: 'Your purchase history is sold to advertisers', solution: 'Use private browsing and payment methods' },
      { icon: Heart, problem: 'Health apps share your medical data with third parties', solution: 'Read privacy policies and opt out when possible' },
      { icon: Brain, problem: 'Algorithms create psychological profiles to influence your behavior', solution: 'Limit social media usage and diversify your information sources' }
    ]
  };

  const whyItMattersItems = [
    {
      icon: Shield,
      title: 'Identity Protection',
      problem: 'Data breaches expose your personal information, leading to identity theft and financial fraud.',
      solution: 'Regular privacy assessments and strong security practices protect your identity.'
    },
    {
      icon: UserSquare2,
      title: 'Family Safety',
      problem: 'Children\'s data is collected without proper consent, creating long-term privacy risks.',
      solution: 'Parental controls and privacy education keep your family safe online.'
    },
    {
      icon: Target,
      title: 'Data Control',
      problem: 'You have little control over how your data is collected, used, and shared by companies.',
      solution: 'Understanding your rights and using privacy tools gives you back control.'
    }
  ];

  return (
    <PageLayout showBreadcrumbs={false}>
      {/* Hero Section */}
      <Hero />

      {/* Africa Edition visible entry point */}
      <Section
        title="SocialCaution Africa Edition"
        subtitle="A mobile-first digital trust, safety, scam prevention, and data-rights experience for African citizens, families, students, and small businesses."
        centered
        className="py-12 md:py-16 bg-gradient-to-br from-emerald-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-emerald-950 border-y border-emerald-200/60 dark:border-emerald-800/40"
      >
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6 border-emerald-200 dark:border-emerald-800/60">
            <SectionIconCircle icon={Globe} circleClassName="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300" />
            <h3 className="mt-4 text-lg font-bold text-primary dark:text-white">Country-aware guidance</h3>
            <p className="mt-2 text-sm text-text-secondary dark:text-gray-300">Start with Côte d&apos;Ivoire, Ghana, Kenya, Nigeria, or South Africa and route users to local laws, authorities, risks, and reporting channels.</p>
            <Link to="/africa/countries" className="mt-4 inline-flex items-center text-accent font-semibold hover:underline">Explore countries <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Card>
          <Card className="p-6 border-emerald-200 dark:border-emerald-800/60">
            <SectionIconCircle icon={Smartphone} circleClassName="bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300" />
            <h3 className="mt-4 text-lg font-bold text-primary dark:text-white">ScamShield Africa</h3>
            <p className="mt-2 text-sm text-text-secondary dark:text-gray-300">Visible launch module for mobile money fraud, WhatsApp scams, fake investment schemes, account takeover, and online seller risk.</p>
            <Link to="/africa/scamshield" className="mt-4 inline-flex items-center text-accent font-semibold hover:underline">Open ScamShield <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Card>
          <Card className="p-6 border-emerald-200 dark:border-emerald-800/60">
            <SectionIconCircle icon={Scale} circleClassName="bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300" />
            <h3 className="mt-4 text-lg font-bold text-primary dark:text-white">Rights & Safety Action Center</h3>
            <p className="mt-2 text-sm text-text-secondary dark:text-gray-300">Country and persona-aware actions connect privacy rights, scam response, family protection, and SME digital trust into one workflow.</p>
            <Link to="/africa" className="mt-4 inline-flex items-center text-accent font-semibold hover:underline">Start Africa journey <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Card>
        </div>
      </Section>

      {/* 1. Choose your persona — primary entry point */}
      <PrivacySolutionsCards />

      {/* 2. Why Privacy Matters More Than Ever */}
      <Section
        title={sectionContent.title}
        subtitle={sectionContent.subtitle}
        centered
        className="py-12 md:py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden"
      >
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-0 w-72 h-72 bg-blue-200/20 dark:bg-blue-500/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-200/20 dark:bg-purple-500/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
        </div>

        <div className="relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-12 md:mb-16">
            {whyItMattersItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100
                }}
                viewport={{ once: true }}
                whileHover={{ 
                  y: -8, 
                  scale: 1.02,
                  transition: { duration: 0.3 }
                }}
                className="group"
              >
                <Card className="p-8 h-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-2xl transition-all duration-300 group-hover:bg-white dark:group-hover:bg-gray-800">
                  <div className="flex flex-col items-center text-center">
                    <div className="mb-4">
                      <SectionIconCircle
                        icon={item.icon}
                        circleClassName="bg-accent/10 text-accent mx-auto"
                        className="mx-auto"
                      />
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-primary dark:text-white mb-4 group-hover:text-accent transition-colors duration-300">
                      {item.title}
                    </h3>
                    <div className="space-y-4">
                      <div className="relative bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 border-l-4 border-orange-500">
                        <div className="flex items-start gap-3">
                          <div className="flex-shrink-0 mt-0.5">
                            <div className="w-6 h-6 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
                              <AlertTriangle className="h-3.5 w-3.5 text-orange-600 dark:text-orange-400" />
                            </div>
                          </div>
                          <div className="flex-1">
                            <p className="text-xs font-semibold text-orange-600 dark:text-orange-400 uppercase tracking-wide mb-1">Challenge</p>
                            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                              {item.problem}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="relative bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 border-l-4 border-accent">
                        <div className="flex items-start gap-3">
                          <div className="flex-shrink-0 mt-0.5">
                            <div className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center">
                              <Shield className="h-3.5 w-3.5 text-accent" />
                            </div>
                          </div>
                          <div className="flex-1">
                            <p className="text-xs font-semibold text-accent uppercase tracking-wide mb-1">Solution</p>
                            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                              {item.solution}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
          
          <motion.div 
            className="max-w-5xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <Card className="p-8 bg-gradient-to-r from-warning/10 to-red-500/10 dark:from-warning/5 dark:to-red-500/5 border border-warning/30 dark:border-warning/20 shadow-xl">
              <div className="flex items-center gap-3 mb-4">
                <SectionIconCircle
                  icon={AlertTriangle}
                  circleClassName="bg-warning/20 text-warning"
                />
                <h3 className="text-xl font-bold text-primary dark:text-white">
                  {sectionContent.costTitle}
                </h3>
              </div>
              <p className="text-base md:text-lg text-text-secondary dark:text-gray-300 mb-6 leading-relaxed">
                {sectionContent.costDescription}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {sectionContent.costItems.map((item, index) => (
                      <motion.div
                        key={index}
                        className="group"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                        viewport={{ once: true }}
                      >
                        <div className="relative p-5 rounded-xl bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 hover:border-accent/50 dark:hover:border-accent/30 transition-all duration-300 hover:shadow-lg">
                          <div className="flex items-start gap-4">
                            <div className="p-3 bg-gradient-to-br from-accent/20 to-accent/10 rounded-xl flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                              <item.icon className="h-6 w-6 text-accent" />
                            </div>
                            <div className="flex-1 space-y-3">
                              <div className="flex items-start gap-2">
                                <span className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider flex-shrink-0 mt-0.5">Issue</span>
                                <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed flex-1">
                                  {item.problem}
                                </p>
                              </div>
                              <div className="flex items-center gap-2 text-accent/60">
                                <ArrowRight className="h-4 w-4 flex-shrink-0" />
                                <div className="h-px bg-gradient-to-r from-accent/30 to-transparent flex-1"></div>
                              </div>
                              <div className="flex items-start gap-2">
                                <span className="text-xs font-bold text-accent uppercase tracking-wider flex-shrink-0 mt-0.5">Fix</span>
                                <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed flex-1 font-medium">
                                  {item.solution}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
              </div>
            </Card>
          </motion.div>
        </div>
      </Section>

      {/* 3. The State of Privacy Today */}
      <FactsAndFigures />

      {/* 4. How SocialCaution Works */}
      <HowItWorks />

      {/* 5. 30-day roadmap — Protect phase after persona selection */}
      <ThirtyDayPlanPreview />

      {/* 6. Privacy assessment preview */}
      <PrivacyAssessmentPreview />

      {/* 7. What You'll Receive */}
      <WhatYouReceive />

      {/* 8. Your Privacy Journey */}
      <Section className="bg-light-blue dark:bg-background-secondary py-12 md:py-16">
        <PrivacyJourneyDemo />
      </Section>

      {/* 9. Essential Privacy Toolkit */}
      <EssentialPrivacyToolkit />

      {/* 10. Privacy Risk Exposure & Rights Action Center™ */}
      <PrivacyRiskTeaser />

      {/* 11. FAQ Section */}
      <FAQSection />

      {/* 12. Stay Protected */}
      <StayProtected />

      {/* 13. Take Control of Your Digital Privacy */}
      <CtaSection />
    </PageLayout>
  );
};

export default HomePage;