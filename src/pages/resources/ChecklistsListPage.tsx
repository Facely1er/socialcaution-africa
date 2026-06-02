import React from 'react';
import PageLayout from '../../components/layout/PageLayout';
import Section from '../../components/common/Section';
import ChecklistsList from '../../components/resources/ChecklistsList';
import ResourcesPageShell from '../../components/resources/ResourcesPageShell';

const ChecklistsListPage: React.FC = () => {
  return (
    <PageLayout
      title="All Privacy Checklists"
      subtitle="Complete Collection of Privacy Protection Checklists"
      description="Browse all available privacy protection checklists to ensure comprehensive coverage"
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

export default ChecklistsListPage;
