import React from 'react';
import PageLayout from '../../components/layout/PageLayout';
import Section from '../../components/common/Section';
import ChecklistsList from '../../components/resources/ChecklistsList';
import ResourcesPageShell from '../../components/resources/ResourcesPageShell';

const ChecklistsPage: React.FC = () => {
  return (
    <PageLayout
      title="Privacy Checklists"
      subtitle="Privacy Protection Checklists"
      description="Use these checklists to ensure you've covered all the essential privacy protection steps"
      showBreadcrumbs={false}
      heroBackground={false}
      backgroundType="resources"
    >
      <Section>
        <ResourcesPageShell>
          <ChecklistsList />
        </ResourcesPageShell>
      </Section>
    </PageLayout>
  );
};

export default ChecklistsPage;
