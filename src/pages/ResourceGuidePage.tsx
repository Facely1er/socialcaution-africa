import React from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, AlertTriangle } from 'lucide-react';
import PageLayout from '../components/layout/PageLayout';
import Section from '../components/common/Section';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import GuideDisplay from '../components/guides/GuideDisplay';
import ChecklistDisplay from '../components/checklists/ChecklistDisplay';
import ResourcesPageShell from '../components/resources/ResourcesPageShell';
import { getGuide, getChecklist } from '../data/privacyResources';

interface ResourceGuidePageProps {
  type: 'guide' | 'checklist';
}

const ResourceGuidePage: React.FC<ResourceGuidePageProps> = ({ type }) => {
  const { guideId, checklistId } = useParams();
  const navigate = useNavigate();

  const resource =
    type === 'guide'
      ? getGuide(guideId)
      : getChecklist(checklistId);

  if (!resource) {
    return (
      <PageLayout
        title={type === 'guide' ? 'Guide Not Found' : 'Checklist Not Found'}
        subtitle="This resource is not available"
        showBreadcrumbs={false}
        heroBackground={false}
        backgroundType="resources"
      >
        <Section>
          <ResourcesPageShell>
            <Card className="p-6">
              <div className="text-center">
                <AlertTriangle className="h-12 w-12 text-warning mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-primary dark:text-white mb-4">
                  {type === 'guide' ? 'Guide Not Found' : 'Checklist Not Found'}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  This resource is not available. Browse the full catalog for guides and checklists we publish.
                </p>
                <Button
                  variant="primary"
                  onClick={() => navigate(type === 'guide' ? '/resources/guides' : '/resources/checklists')}
                  className="flex items-center justify-center mx-auto"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  {type === 'guide' ? 'Browse Guides' : 'Browse Checklists'}
                </Button>
              </div>
            </Card>
          </ResourcesPageShell>
        </Section>
      </PageLayout>
    );
  }

  const listPath = type === 'guide' ? '/resources/guides' : '/resources/checklists';
  const listLabel = type === 'guide' ? 'Privacy Guides' : 'Privacy Checklists';

  return (
    <PageLayout
      title={resource.title}
      subtitle={resource.description}
      showBreadcrumbs={false}
      heroBackground={false}
      backgroundType="resources"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Section>
          <ResourcesPageShell>
            <Button
              variant="outline"
              onClick={() => navigate(listPath)}
              className="mb-6"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to {listLabel}
            </Button>

            {type === 'guide' && 'sections' in resource && (
              <GuideDisplay guide={resource} />
            )}

            {type === 'checklist' && 'categories' in resource && (
              <ChecklistDisplay checklist={resource} />
            )}
          </ResourcesPageShell>
        </Section>
      </motion.div>
    </PageLayout>
  );
};

export default ResourceGuidePage;
