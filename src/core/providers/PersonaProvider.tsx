// src/core/providers/PersonaProvider.tsx
/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useEffect, useState, type FC, type ReactNode } from 'react';
import { PersonaType, JourneyPhase, type PersonaConfig, type PersonaContextType } from '../types/personaTypes';
import {
  reconcilePersonaStores,
  syncMainPersonaToDemo,
  isValidMainPersona
} from '../../utils/personaBridge';

export const PersonaContext = createContext<PersonaContextType | undefined>(undefined);

// Persona configurations
const personaConfigs: Record<PersonaType, PersonaConfig> = {
  [PersonaType.CAUTIOUS_PARENT]: {
    id: PersonaType.CAUTIOUS_PARENT,
    title: 'Cautious Parent',
    description: 'Navigating connected family life across Africa — managing children\'s exposure to social media, mobile money apps, and the online platforms they use daily.',
    primaryColor: 'blue-600',
    secondaryColor: 'green-500',
    icon: 'Heart',
    navigation: {
      primaryActions: [
        { label: 'Family Assessment', path: '/parent/family-assessment', icon: 'Users', description: 'Evaluate your family\'s privacy protection' },
        { label: 'Parental Controls', path: '/parent/controls', icon: 'Shield', description: 'Manage children\'s device settings' },
        { label: 'Child Safety', path: '/parent/safety', icon: 'Heart', description: 'Online safety tools and guides' },
        { label: 'Screen Time', path: '/parent/screen-time', icon: 'Clock', description: 'Monitor and manage screen time' }
      ],
      quickLinks: [
        { label: 'Emergency Lockdown', path: '/parent/emergency', icon: 'AlertTriangle' },
        { label: 'App Permissions', path: '/parent/app-permissions', icon: 'Settings' },
        { label: 'Safe Browsing Setup', path: '/parent/safe-browsing', icon: 'Globe' },
        { label: 'Privacy Talks Guide', path: '/parent/privacy-talks', icon: 'MessageSquare' }
      ]
    },
    dashboard: {
      widgets: ['FamilyOverview', 'ChildrenStatus', 'RecentActivity', 'ParentalControls', 'EducationalResources'],
      layout: 'family-focused'
    },
    assessments: [
      {
        id: 'family-privacy-checkup',
        title: 'Family Privacy Checkup',
        description: 'Review your family\'s digital safety — covering children\'s app permissions, social media exposure, and mobile money hygiene in an African household context.',
        estimatedTime: '15 minutes',
        priority: 'high'
      },
      {
        id: 'parental-controls-audit',
        title: 'Parental Controls Audit',
        description: 'Check and strengthen the settings controlling what your children can access and share on devices and platforms commonly used across Africa.',
        estimatedTime: '20 minutes',
        priority: 'medium'
      }
    ],
    onboarding: {
      steps: ['welcome-family', 'children-info', 'family-goals', 'initial-assessment', 'dashboard-tour'],
      estimatedTime: '10 minutes'
    }
  },

  [PersonaType.PRIVACY_ADVOCATE]: {
    id: PersonaType.PRIVACY_ADVOCATE,
    title: 'Privacy Advocate',
    description: 'Advanced understanding of digital rights and African data protection laws — equipped to assess your own exposure and support others in your community.',
    primaryColor: 'purple-600',
    secondaryColor: 'indigo-500',
    icon: 'Users',
    navigation: {
      primaryActions: [
        { label: 'Advanced Analytics', path: '/advocate/analytics', icon: 'BarChart', description: 'Comprehensive privacy metrics' },
        { label: 'Digital Rights Tracker', path: '/advocate/rights', icon: 'Scale', description: 'Monitor and exercise your rights' },
        { label: 'Privacy Tools', path: '/advocate/tools', icon: 'Wrench', description: 'Advanced privacy utilities' },
        { label: 'Community Hub', path: '/advocate/community', icon: 'Users', description: 'Connect with other advocates' }
      ],
      quickLinks: [
        { label: 'Data Export', path: '/advocate/data-export', icon: 'Download' },
        { label: 'Compliance Checker', path: '/advocate/compliance', icon: 'CheckCircle' },
        { label: 'Threat Monitor', path: '/advocate/threats', icon: 'Eye' },
        { label: 'Legislative Updates', path: '/advocate/legislation', icon: 'Gavel' }
      ]
    },
    dashboard: {
      widgets: ['AdvancedAnalytics', 'RightsTracker', 'ComplianceStatus', 'ThreatMonitoring', 'CommunityActivity'],
      layout: 'data-rich'
    },
    assessments: [
      {
        id: 'comprehensive-privacy-audit',
        title: 'Comprehensive Privacy Audit',
        description: 'A thorough review of your digital privacy posture, your rights under applicable African data protection laws, and how to exercise them.',
        estimatedTime: '30 minutes',
        priority: 'high'
      }
    ],
    onboarding: {
      steps: ['welcome-advocate', 'advanced-assessment', 'tool-preferences', 'community-setup', 'advocacy-goals'],
      estimatedTime: '15 minutes'
    }
  },

  [PersonaType.ONLINE_SHOPPER]: {
    id: PersonaType.ONLINE_SHOPPER,
    title: 'Online Shopper',
    description: 'Navigating African e-commerce platforms (Jumia, Jiji, local marketplaces) and mobile payment services with awareness of how they handle your data.',
    primaryColor: 'emerald-600',
    secondaryColor: 'teal-500',
    icon: 'ShoppingBag',
    navigation: {
      primaryActions: [
        { label: 'Shopping Safety', path: '/shopper/safety', icon: 'ShoppingBag', description: 'Safe online shopping practices' },
        { label: 'Payment Security', path: '/shopper/payments', icon: 'CreditCard', description: 'Protect your financial data' },
        { label: 'Account Audit', path: '/shopper/accounts', icon: 'User', description: 'Review shopping accounts' },
        { label: 'Data Tracking', path: '/shopper/tracking', icon: 'Eye', description: 'Monitor data collection' }
      ],
      quickLinks: [
        { label: 'Secure Checkout Tips', path: '/shopper/checkout-tips', icon: 'Lock' },
        { label: 'Coupon Safety', path: '/shopper/coupon-safety', icon: 'Tag' },
        { label: 'Review Management', path: '/shopper/reviews', icon: 'Star' },
        { label: 'Return Privacy', path: '/shopper/returns', icon: 'RotateCcw' }
      ]
    },
    dashboard: {
      widgets: ['ShoppingSafety', 'PaymentSecurity', 'AccountStatus', 'DataTracking', 'ShoppingTips'],
      layout: 'action-oriented'
    },
    assessments: [
      {
        id: 'shopping-privacy-checkup',
        title: 'Shopping Privacy Checkup',
        description: 'Review your data exposure across African e-commerce platforms and mobile payment services — what they collect, store, and share.',
        estimatedTime: '12 minutes',
        priority: 'high'
      }
    ],
    onboarding: {
      steps: ['welcome-shopper', 'shopping-habits', 'security-assessment', 'payment-setup', 'monitoring-preferences'],
      estimatedTime: '12 minutes'
    }
  },

  [PersonaType.SOCIAL_INFLUENCER]: {
    id: PersonaType.SOCIAL_INFLUENCER,
    title: 'Content Creator',
    description: 'Building an audience across African and global platforms while managing personal data exposure, account security, and the risks that come with visibility.',
    primaryColor: 'pink-600',
    secondaryColor: 'rose-500',
    icon: 'Camera',
    navigation: {
      primaryActions: [
        { label: 'Public vs Private', path: '/influencer/balance', icon: 'Scale', description: 'Balance visibility and privacy' },
        { label: 'Content Security', path: '/influencer/content', icon: 'Shield', description: 'Protect your content and brand' },
        { label: 'Audience Safety', path: '/influencer/audience', icon: 'Users', description: 'Manage audience interactions safely' },
        { label: 'Brand Protection', path: '/influencer/brand', icon: 'Award', description: 'Protect your personal brand' }
      ],
      quickLinks: [
        { label: 'Platform Settings', path: '/influencer/platforms', icon: 'Settings' },
        { label: 'Content Backup', path: '/influencer/backup', icon: 'Save' },
        { label: 'Harassment Tools', path: '/influencer/harassment', icon: 'Shield' },
        { label: 'Analytics Privacy', path: '/influencer/analytics', icon: 'BarChart' }
      ]
    },
    dashboard: {
      widgets: ['PublicPrivateBalance', 'ContentSecurity', 'AudienceManagement', 'BrandProtection', 'PlatformStatus'],
      layout: 'social-focused'
    },
    assessments: [
      {
        id: 'influencer-privacy-audit',
        title: 'Influencer Privacy Audit',
        description: 'Comprehensive review of your public-facing privacy settings',
        estimatedTime: '18 minutes',
        priority: 'high'
      }
    ],
    onboarding: {
      steps: ['welcome-influencer', 'platform-inventory', 'privacy-goals', 'audience-settings', 'brand-protection'],
      estimatedTime: '15 minutes'
    }
  },

  [PersonaType.PRIVATE_INDIVIDUAL]: {
    id: PersonaType.PRIVATE_INDIVIDUAL,
    title: 'Private Citizen',
    description: 'Managing personal data across social media, e-government services, and mobile banking — with limited visibility into what is collected and by whom.',
    primaryColor: 'slate-600',
    secondaryColor: 'gray-500',
    icon: 'Shield',
    navigation: {
      primaryActions: [
        { label: 'Privacy Audit', path: '/private/audit', icon: 'Search', description: 'Comprehensive privacy review' },
        { label: 'Data Control', path: '/private/data-control', icon: 'Database', description: 'Manage your personal data' },
        { label: 'Digital Footprint', path: '/private/footprint', icon: 'Footprints', description: 'Monitor your online presence' },
        { label: 'Security Settings', path: '/private/security', icon: 'Lock', description: 'Enhance account security' }
      ],
      quickLinks: [
        { label: 'Data Deletion', path: '/private/data-deletion', icon: 'Trash2' },
        { label: 'Account Cleanup', path: '/private/cleanup', icon: 'Broom' },
        { label: 'Monitoring Setup', path: '/private/monitoring', icon: 'Eye' },
        { label: 'Privacy Score', path: '/private/score', icon: 'Target' }
      ]
    },
    dashboard: {
      widgets: ['PrivacyScore', 'DigitalFootprint', 'DataControl', 'SecurityStatus', 'PrivacyInsights'],
      layout: 'privacy-first'
    },
    assessments: [
      {
        id: 'personal-privacy-audit',
        title: 'Personal Privacy Audit',
        description: 'Complete evaluation of your personal privacy protection',
        estimatedTime: '20 minutes',
        priority: 'high'
      }
    ],
    onboarding: {
      steps: ['welcome-private', 'privacy-assessment', 'data-inventory', 'security-review', 'monitoring-setup'],
      estimatedTime: '15 minutes'
    }
  },

  [PersonaType.CONCERNED_EMPLOYEE]: {
    id: PersonaType.CONCERNED_EMPLOYEE,
    title: 'SME Owner / Employee',
    description: 'Handling customer data, mobile payments, and device hygiene in a small or informal business — the most common digital work context across Africa.',
    primaryColor: 'orange-600',
    secondaryColor: 'amber-500',
    icon: 'AlertTriangle',
    navigation: {
      primaryActions: [
        { label: 'Workplace Privacy Audit', path: '/employee/audit', icon: 'Search', description: 'Assess your workplace privacy risks' },
        { label: 'Employee Rights', path: '/employee/rights', icon: 'Scale', description: 'Understand your data protection rights' },
        { label: 'Monitoring Check', path: '/employee/monitoring', icon: 'Eye', description: 'Check what your employer monitors' },
        { label: 'Data Protection', path: '/employee/data-protection', icon: 'Shield', description: 'Protect your personal data at work' }
      ],
      quickLinks: [
        { label: 'Policy Review', path: '/employee/policies', icon: 'FileText' },
        { label: 'Data Request', path: '/employee/data-request', icon: 'Download' },
        { label: 'Privacy Settings', path: '/employee/settings', icon: 'Settings' },
        { label: 'Legal Resources', path: '/employee/legal', icon: 'Gavel' }
      ]
    },
    dashboard: {
      widgets: ['WorkplacePrivacy', 'EmployeeRights', 'MonitoringStatus', 'DataProtection', 'PolicyCompliance'],
      layout: 'action-oriented'
    },
    assessments: [
      {
        id: 'workplace-privacy-assessment',
        title: 'Workplace Privacy Assessment',
        description: 'Comprehensive evaluation of your workplace privacy protection and rights',
        estimatedTime: '18 minutes',
        priority: 'high'
      },
      {
        id: 'employee-monitoring-check',
        title: 'Employee Monitoring Check',
        description: 'Understand what your employer monitors and your rights',
        estimatedTime: '12 minutes',
        priority: 'medium'
      }
    ],
    onboarding: {
      steps: ['welcome-employee', 'workplace-assessment', 'rights-education', 'monitoring-check', 'protection-setup'],
      estimatedTime: '12 minutes'
    }
  }
};

export const PersonaProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [persona, setPersonaState] = useState<PersonaType | null>(null);
  const [journeyPhase, setJourneyPhase] = useState<JourneyPhase>(JourneyPhase.DISCOVERY);

  useEffect(() => {
    try {
      const restored = reconcilePersonaStores();
      const savedPersona = restored ?? (localStorage.getItem('socialcaution-persona') as PersonaType);
      const savedPhase = localStorage.getItem('socialcaution-journey-phase') as JourneyPhase;

      if (isValidMainPersona(savedPersona)) {
        setPersonaState(savedPersona);
      }

      if (savedPhase && Object.values(JourneyPhase).includes(savedPhase)) {
        setJourneyPhase(savedPhase);
      }
    } catch (error) {
      console.error('PersonaProvider initialization error:', error);
    }
  }, []);

  const setPersona = (newPersona: PersonaType) => {
    try {
      setPersonaState(newPersona);
      localStorage.setItem('socialcaution-persona', newPersona);
      syncMainPersonaToDemo(newPersona);
      
      // Analytics tracking (you can replace with your analytics)
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'persona_selected', {
          persona: newPersona,
          timestamp: new Date().toISOString()
        });
      }
      
      // Auto-advance journey phase if this is first persona selection
      if (journeyPhase === JourneyPhase.DISCOVERY) {
        updateJourneyPhase(JourneyPhase.ASSESSMENT);
      }
    } catch (error) {
      console.error('PersonaProvider setPersona error:', error);
    }
  };

  const updateJourneyPhase = (phase: JourneyPhase) => {
    try {
      setJourneyPhase(phase);
      localStorage.setItem('socialcaution-journey-phase', phase);
      
      // Analytics tracking
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'journey_phase_entered', {
          phase,
          persona,
          timestamp: new Date().toISOString()
        });
      }
    } catch (error) {
      console.error('PersonaProvider updateJourneyPhase error:', error);
    }
  };

  const getPersonaConfig = (): PersonaConfig | null => {
    return persona ? personaConfigs[persona] : null;
  };

  const personaConfig = getPersonaConfig();
  const isPersonaSelected = Boolean(persona);

  const value: PersonaContextType = {
    persona,
    journeyPhase,
    personaConfig,
    setPersona,
    updateJourneyPhase,
    getPersonaConfig,
    isPersonaSelected
  };

  return (
    <PersonaContext.Provider value={value}>
      {children}
    </PersonaContext.Provider>
  );
};

// Export hooks, types, and constants for backward compatibility
export { usePersona, usePersonaConfig, usePersonaNavigation, usePersonaDashboard, useJourneyProgress } from '../../hooks/usePersona';
export { PersonaType, JourneyPhase } from '../types/personaTypes';
export type { PersonaConfig, NavigationItem, AssessmentConfig } from '../types/personaTypes';
export { personaConfigs };