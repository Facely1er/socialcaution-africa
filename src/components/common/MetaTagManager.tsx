import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface PageConfig {
  title: string;
  description: string;
  keywords: string;
  ogType: string;
}

const MetaTagManager = () => {
  const location = useLocation();

  useEffect(() => {
    const updateMetaTags = () => {
      const pathname = location.pathname;
      
      // Page-specific meta tag updates
      const pageConfigs: Record<string, PageConfig> = {
        '/': {
          title: 'SocialCaution Africa — Digital Trust & Safety',
          description:
            'Africa Edition: country-aware scam prevention, privacy rights, family protection, and SME digital trust across African countries.',
          keywords:
            'Africa digital safety, mobile money fraud, WhatsApp scams, data protection Africa, ScamShield, privacy rights',
          ogType: 'website',
        },
        '/assessment': {
          title: 'Privacy Assessment - Social Caution',
          description: 'Take a comprehensive privacy assessment to understand your digital privacy posture and get personalized recommendations.',
          keywords: 'privacy assessment, digital privacy evaluation, privacy test',
          ogType: 'article'
        },
        '/africa/countries': {
          title: 'Choose your country — SocialCaution Africa',
          description: 'Country-specific digital safety, privacy rights, and reporting guidance across Africa.',
          keywords: 'Africa countries, data protection, digital safety, privacy rights',
          ogType: 'website',
        },
        '/africa/scamshield': {
          title: 'ScamShield Africa — SocialCaution',
          description: 'Practical scam prevention for mobile money, WhatsApp fraud, and fake investment schemes.',
          keywords: 'Africa scams, mobile money fraud, WhatsApp scams, fraud prevention',
          ogType: 'website',
        },
        '/africa/partner': {
          title: 'National Partnership — SocialCaution Africa',
          description: 'Partnership tiers for national digital trust deployments across Africa.',
          keywords: 'Africa partnership, national edition, digital trust, ERMITS',
          ogType: 'website',
        },
        '/africa/sources': {
          title: 'Source Register — SocialCaution Africa',
          description: 'Official authority and law references for the Africa Edition.',
          keywords: 'Africa data protection authorities, source register, legal references',
          ogType: 'website',
        },
        '/dashboard': {
          title: 'Privacy Dashboard - Social Caution',
          description: 'Your personalized privacy control center with tailored recommendations, progress tracking, and improvement roadmap.',
          keywords: 'privacy dashboard, personalized privacy recommendations, privacy progress tracking',
          ogType: 'application'
        },
        '/resources': {
          title: 'Privacy Resources - Social Caution',
          description: 'Educational privacy content and guides tailored to your privacy persona and skill level.',
          keywords: 'privacy resources, privacy education, digital privacy guides, privacy learning',
          ogType: 'website'
        },
        '/tools': {
          title: 'Privacy Tools - Social Caution',
          description: 'Access advanced privacy tools and utilities personalized for your protection needs.',
          keywords: 'privacy tools, security utilities, personalized privacy toolkit',
          ogType: 'application'
        }
      };

      const config =
        pageConfigs[pathname] ??
        (pathname.startsWith('/africa/countries/')
          ? {
              title: 'Country profile — SocialCaution Africa',
              description: 'Digital trust profile with local laws, rights, risks, and reporting channels.',
              keywords: 'Africa country, data protection, privacy rights, reporting',
              ogType: 'website',
            }
          : pathname.startsWith('/africa/action-center/')
            ? {
                title: 'Your safety plan — SocialCaution Africa',
                description: 'Personalized digital safety and privacy action plan.',
                keywords: 'safety plan, privacy plan, Africa digital safety',
                ogType: 'website',
              }
            : pageConfigs['/']);

      // Update document title
      document.title = config.title;

      // Update meta tags
      const updateMeta = (name: string, content: string, property = false) => {
        const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`;
        let meta = document.querySelector(selector) as HTMLMetaElement;
        
        if (meta) {
          meta.setAttribute('content', content);
        } else {
          meta = document.createElement('meta');
          if (property) {
            meta.setAttribute('property', name);
          } else {
            meta.setAttribute('name', name);
          }
          meta.setAttribute('content', content);
          document.head.appendChild(meta);
        }
      };

      updateMeta('description', config.description);
      updateMeta('keywords', config.keywords);
      updateMeta('og:title', config.title, true);
      updateMeta('og:description', config.description, true);
      updateMeta('og:type', config.ogType, true);
      updateMeta('og:url', window.location.href, true);
      updateMeta('twitter:title', config.title, true);
      updateMeta('twitter:description', config.description, true);

      // Add structured data for SEO
      const structuredData = {
        "@context": "https://schema.org",
        "@type": config.ogType === 'application' ? 'WebApplication' : 'WebPage',
        "name": config.title,
        "description": config.description,
        "url": window.location.href,
        "dateModified": new Date().toISOString(),
        "publisher": {
          "@type": "Organization",
          "name": "Social Caution",
          "url": window.location.origin
        }
      };

      // Update or create structured data script
      let structuredScript = document.querySelector('#page-structured-data') as HTMLScriptElement;
      if (structuredScript) {
        structuredScript.textContent = JSON.stringify(structuredData, null, 2);
      } else {
        structuredScript = document.createElement('script');
        structuredScript.type = 'application/ld+json';
        structuredScript.id = 'page-structured-data';
        structuredScript.textContent = JSON.stringify(structuredData, null, 2);
        document.head.appendChild(structuredScript);
      }
    };

    updateMetaTags();
  }, [location.pathname]);

  return null;
};

export default MetaTagManager;

