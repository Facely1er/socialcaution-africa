import React from 'react';
import { Link } from 'react-router-dom';
import {
  Building2,
  Globe2,
  GraduationCap,
  Lock,
  Shield,
  ShieldCheck,
} from 'lucide-react';
import AfricaPageLayout from './africa/AfricaPageLayout';
import Section from '../components/common/Section';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import { designSystem } from '../styles/design-system';

const CREDENTIALS = ['CISSP', 'CISA', 'PMP', 'PMI-ACP'] as const;

const AboutPage: React.FC = () => (
  <AfricaPageLayout heroType="minimal" backgroundType="africa">
    <div className="bg-partner text-white -mt-px">
      <div className={`${designSystem.layout.contentShell} py-8 md:py-12`}>
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 text-white/90 font-semibold text-sm mb-5">
            <Globe2 className="h-4 w-4" aria-hidden />
            Africa Edition
          </div>
          <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4">
            About SocialCaution Africa
          </h1>
          <p className="text-base md:text-lg text-white/70 leading-relaxed max-w-2xl">
            Digital trust infrastructure built for African users — published by ERMITS Advisory LLC with
            national authority alignment and institutional partners.
          </p>
        </div>
      </div>
    </div>

    <Section>
      <Card className="p-6 md:p-8 mb-8">
        <div className="flex items-start gap-3 mb-4">
          <Building2 className="h-8 w-8 text-accent flex-shrink-0" aria-hidden />
          <div>
            <h2 className="font-display text-xl md:text-2xl font-bold text-primary dark:text-white">
              ERMITS Advisory LLC
            </h2>
            <p className="text-text-secondary dark:text-gray-300 mt-3 leading-relaxed">
              ERMITS Advisory designs and deploys privacy, cybersecurity, and digital trust programs for
              governments, regulators, NGOs, and enterprises. SocialCaution Africa is our regional edition:
              citizen-facing scam prevention, data protection awareness, and persona-based safety plans scoped
              to each country&apos;s laws and authorities.
            </p>
          </div>
        </div>
        <p className="text-sm text-text-secondary dark:text-gray-300 leading-relaxed">
          We combine advisory depth with deployable platforms — from co-branded awareness partnerships to
          full national white-label editions with local hosting and regulator integration.
        </p>
      </Card>

      <Card className="p-6 md:p-8 mb-8">
        <div className="flex items-start gap-3 mb-4">
          <Shield className="h-8 w-8 text-accent flex-shrink-0" aria-hidden />
          <div>
            <h2 className="font-display text-xl md:text-2xl font-bold text-primary dark:text-white">
              Program leadership
            </h2>
            <p className="text-text-secondary dark:text-gray-300 mt-3 leading-relaxed">
              The Africa Edition is led by <strong className="text-primary dark:text-white">Facely Kande</strong>,
              coordinating product direction, stakeholder engagement, and national partnership readiness across
              the continent.
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mb-4">
          {CREDENTIALS.map((credential) => (
            <span
              key={credential}
              className="font-mono text-xs font-medium px-2.5 py-1 rounded-md bg-primary/5 dark:bg-white/10 text-primary dark:text-white/85 border border-border/80"
            >
              {credential}
            </span>
          ))}
        </div>
        <p className="text-sm text-text-secondary dark:text-gray-300">
          For partnership briefings or national edition inquiries, visit{' '}
          <Link to="/africa/partner" className="text-accent font-semibold hover:underline">
            Partner With Us
          </Link>{' '}
          or{' '}
          <Link to="/contact" className="text-accent font-semibold hover:underline">
            contact ERMITS Advisory
          </Link>
          .
        </p>
      </Card>

      <Card className="p-6 md:p-8 mb-8">
        <div className="flex items-start gap-3 mb-4">
          <GraduationCap className="h-8 w-8 text-accent flex-shrink-0" aria-hidden />
          <div>
            <h2 className="font-display text-xl md:text-2xl font-bold text-primary dark:text-white">
              ESATIC partnership
            </h2>
            <p className="text-text-secondary dark:text-gray-300 mt-3 leading-relaxed">
              Côte d&apos;Ivoire deployments align with{' '}
              <strong className="text-primary dark:text-white">ESATIC</strong> (École Supérieure Africaine des
              TIC), an ITU Centre of Excellence, as the institutional technology partner for national digital
              trust initiatives. Country profiles on-platform reference ARTCI, ANSSI-CI, and other national
              authorities with maintained source registers.
            </p>
          </div>
        </div>
      </Card>

      <Card className="p-6 md:p-8 mb-8">
        <div className="flex items-start gap-3 mb-4">
          <Globe2 className="h-8 w-8 text-accent flex-shrink-0" aria-hidden />
          <div>
            <h2 className="font-display text-xl md:text-2xl font-bold text-primary dark:text-white">
              Why Africa
            </h2>
            <p className="text-text-secondary dark:text-gray-300 mt-3 leading-relaxed">
              Most privacy tools assume Western banking, email-first identity, and stable broadband. African
              users live on mobile money, WhatsApp commerce, USSD, and agent networks — with scams and data
              risks that look nothing like a generic GDPR checklist. Our mission is to meet people where they
              are: a clear answer to &ldquo;what risks do I face and what should I do about them?&rdquo; in under
              two minutes, without an account or assessment gate.
            </p>
          </div>
        </div>
        <ul className="space-y-2.5 text-sm text-text-secondary dark:text-gray-300">
          <li className="africa-list-item">Persona-first journeys — who you are before which country</li>
          <li className="africa-list-item">Country-local laws, regulators, and complaint paths</li>
          <li className="africa-list-item">Mobile-first, low-literacy-friendly design for real Android devices</li>
        </ul>
      </Card>

      <Card className="p-6 md:p-8 mb-10 border-l-4 border-l-journey">
        <div className="flex items-start gap-3">
          <Lock className="h-8 w-8 text-journey flex-shrink-0" aria-hidden />
          <div>
            <h2 className="font-display text-xl md:text-2xl font-bold text-primary dark:text-white mb-3">
              Privacy-first architecture
            </h2>
            <p className="text-text-secondary dark:text-gray-300 leading-relaxed mb-3">
              The Africa Edition is built for minimal data collection: no account required for core journeys,
              local-only modes where configured, and transparent source registers so users and institutions can
              verify authority links before formal use.
            </p>
            <p className="text-sm text-text-secondary dark:text-gray-400 flex items-start gap-2">
              <ShieldCheck className="h-4 w-4 text-journey flex-shrink-0 mt-0.5" aria-hidden />
              National editions can include local hosting options to support data sovereignty requirements.
            </p>
          </div>
        </div>
      </Card>

      <div className="flex flex-wrap gap-3 justify-center">
        <Link to="/">
          <Button>Start your plan</Button>
        </Link>
        <Link to="/africa/partner">
          <Button variant="outline">Partner with us</Button>
        </Link>
        <Link to="/contact">
          <Button variant="outline">Contact ERMITS Advisory</Button>
        </Link>
      </div>
    </Section>
  </AfricaPageLayout>
);

export default AboutPage;
