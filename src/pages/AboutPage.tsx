import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, Globe2, GraduationCap, Shield, Users } from 'lucide-react';
import AfricaPageLayout from './africa/AfricaPageLayout';
import Section from '../components/common/Section';
import Card from '../components/common/Card';
import Button from '../components/common/Button';

const AboutPage: React.FC = () => {
  return (
    <AfricaPageLayout
      title="About SocialCaution Africa"
      subtitle="Digital trust infrastructure for the continent"
      description="An ERMITS regional edition developed with institutional partners to make privacy, scam prevention, and data rights practical for African users."
    >
      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <Card className="p-6">
            <div className="flex items-start gap-3 mb-4">
              <Building2 className="h-8 w-8 text-accent flex-shrink-0" />
              <div>
                <h2 className="text-xl font-bold text-primary dark:text-white">ERMITS LLC</h2>
                <p className="text-gray-600 dark:text-gray-300 mt-2">
                  SocialCaution Africa is published by ERMITS LLC as a regional edition focused on
                  citizen-facing digital safety, data protection awareness, and institutional partnership
                  for national deployments.
                </p>
              </div>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              ERMITS combines privacy engineering, advisory services, and deployable platforms for
              governments, regulators, NGOs, and enterprises that need accountable digital trust programs.
            </p>
          </Card>

          <Card className="p-6">
            <div className="flex items-start gap-3 mb-4">
              <GraduationCap className="h-8 w-8 text-accent flex-shrink-0" />
              <div>
                <h2 className="text-xl font-bold text-primary dark:text-white">Institutional anchor</h2>
                <p className="text-gray-600 dark:text-gray-300 mt-2">
                  Côte d&apos;Ivoire deployments align with{' '}
                  <strong>ESATIC</strong> (École Supérieure Africaine des TIC), an ITU Centre of Excellence,
                  as the institutional technology partner for national digital trust initiatives.
                </p>
              </div>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Country profiles reference national authorities such as ARTCI, CDP Senegal, NITDA/NDPR,
              ODPC Kenya, and POPIA regulators — with source registers maintained on-platform.
            </p>
          </Card>
        </div>

        <Card className="p-6 md:p-8 mb-12">
          <div className="flex items-start gap-3 mb-4">
            <Users className="h-8 w-8 text-accent flex-shrink-0" />
            <h2 className="text-2xl font-bold text-primary dark:text-white">Leadership</h2>
          </div>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            The Africa Edition program is led by <strong>Facely Kande</strong>, coordinating product
            direction, stakeholder engagement, and national partnership readiness with ERMITS Advisory.
          </p>
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            For partnership briefings or national edition inquiries, use the contact page or the Partner
            With Us program.
          </p>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="p-6">
            <Shield className="h-7 w-7 text-accent mb-3" />
            <h3 className="font-bold text-primary dark:text-white mb-2">Safety first</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Scam prevention and mobile-first hygiene drive adoption; rights and complaint paths follow.
            </p>
          </Card>
          <Card className="p-6">
            <Globe2 className="h-7 w-7 text-accent mb-3" />
            <h3 className="font-bold text-primary dark:text-white mb-2">Country-local</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Laws, regulators, and personas are scoped per country — not a one-size Western privacy tour.
            </p>
          </Card>
          <Card className="p-6">
            <Building2 className="h-7 w-7 text-accent mb-3" />
            <h3 className="font-bold text-primary dark:text-white mb-2">Partnership-ready</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Tiered national and regional editions support NGOs, ministries, and pan-African bodies.
            </p>
          </Card>
        </div>

        <div className="flex flex-wrap gap-3 justify-center">
          <Link to="/africa/countries">
            <Button>Explore countries</Button>
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
};

export default AboutPage;
