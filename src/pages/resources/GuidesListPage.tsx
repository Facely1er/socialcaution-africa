import React from 'react';
import PageLayout from '../../components/layout/PageLayout';
import Section from '../../components/common/Section';
import GuidesList from '../../components/resources/GuidesList';
import ResourcesPageShell from '../../components/resources/ResourcesPageShell';

const GuidesListPage: React.FC = () => {
  return (
    <PageLayout
      title="All Privacy Guides"
      subtitle="Complete Collection of Privacy Protection Guides"
      description="Browse all available privacy protection guides for comprehensive coverage"
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

export default GuidesListPage;