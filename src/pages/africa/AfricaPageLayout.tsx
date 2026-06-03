import PageLayout from '../../components/layout/PageLayout';
import type { ComponentProps } from 'react';

type PageLayoutProps = ComponentProps<typeof PageLayout>;

/** Shared layout defaults for all /africa stakeholder pages. */
export type AfricaPageLayoutProps = Omit<
  PageLayoutProps,
  'heroType' | 'showBreadcrumbs' | 'backgroundType'
> & {
  heroType?: PageLayoutProps['heroType'];
  backgroundType?: PageLayoutProps['backgroundType'];
  showBreadcrumbs?: boolean;
};

export default function AfricaPageLayout({
  heroType = 'minimal',
  showBreadcrumbs = false,
  backgroundType = 'africa',
  heroBackground = false,
  ...props
}: AfricaPageLayoutProps) {
  return (
    <PageLayout
      heroType={heroType}
      showBreadcrumbs={showBreadcrumbs}
      backgroundType={backgroundType}
      heroBackground={heroBackground}
      {...props}
    />
  );
}
