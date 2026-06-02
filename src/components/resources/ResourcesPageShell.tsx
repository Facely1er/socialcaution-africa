import React, { ReactNode } from 'react';
import ResourcesNav from '../navigation/ResourcesNav';

interface ResourcesPageShellProps {
  children: ReactNode;
}

/** Shared sidebar + content layout for all /resources/* catalog pages */
const ResourcesPageShell: React.FC<ResourcesPageShellProps> = ({ children }) => (
  <div className="layout-sidebar-row gap-4 lg:gap-8">
    <ResourcesNav />
    <div className="flex-1 min-w-0 w-full">{children}</div>
  </div>
);

export default ResourcesPageShell;
