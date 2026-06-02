import React from 'react';
import PageLayout from '../../components/layout/PageLayout';
import Section from '../../components/common/Section';
import GuidesList from '../../components/resources/GuidesList';
import ResourcesPageShell from '../../components/resources/ResourcesPageShell';

const GuidesPage: React.FC = () => {
  return (
    <PageLayout
      title="Privacy Guides"
      subtitle="Comprehensive Privacy Protection Guides"
      description="Step-by-step guides to help you protect your privacy and understand your rights"
      showBreadcrumbs={false}
      heroBackground={false}
      backgroundType="resources"
    >
      <Section>
        <ResourcesPageShell>
          <GuidesList />
        </ResourcesPageShell>
      </Section>
    </PageLayout>
  );
};

export default GuidesPage;
