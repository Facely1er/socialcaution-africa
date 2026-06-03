import React, { type ReactNode, type ElementType } from 'react';
import { motion } from 'framer-motion';
import PageLayout from '../layout/PageLayout';
import Section from '../common/Section';
import Card from '../common/Card';
import VerticalNav from './VerticalNav';
import InternationalReferenceNote from './InternationalReferenceNote';
import { designSystem } from '../../styles/design-system';

type LegalPageLayoutProps = {
  title: string;
  subtitle?: string;
  description?: string;
  children: ReactNode;
  /** Hub pages use sidebar nav + international reference note; policy pages use a single prose card. */
  variant?: 'hub' | 'policy';
  icon?: ElementType;
};

const LegalPageLayout: React.FC<LegalPageLayoutProps> = ({
  title,
  subtitle,
  description,
  children,
  variant = 'hub',
  icon: Icon,
}) => {
  if (variant === 'policy') {
    return (
      <PageLayout
        title={title}
        subtitle={subtitle}
        description={description}
        heroBackground={false}
        backgroundType="legal"
        heroType="minimal"
        showBreadcrumbs={false}
      >
        <Section>
          <Card className={`${designSystem.layout.proseColumn} p-6 md:p-8`}>{children}</Card>
        </Section>
      </PageLayout>
    );
  }

  return (
    <PageLayout
      title={title}
      subtitle={subtitle}
      description={description}
      heroBackground={false}
      backgroundType="legal"
      heroType="minimal"
      showBreadcrumbs={false}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Section>
          {Icon && (
            <div className="flex items-center gap-4 mb-6 md:hidden">
              <div className="p-3 bg-accent/10 rounded-full">
                <Icon className="h-7 w-7 text-accent" aria-hidden />
              </div>
              <p className="text-sm text-text-secondary dark:text-gray-400">International reference</p>
            </div>
          )}

          <InternationalReferenceNote />

          <div className="layout-sidebar-row">
            <VerticalNav />
            <div className="layout-sidebar-content">{children}</div>
          </div>
        </Section>
      </motion.div>
    </PageLayout>
  );
};

export default LegalPageLayout;
