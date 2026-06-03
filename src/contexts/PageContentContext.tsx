import { createContext, useContext, type ReactNode } from 'react';

interface PageContentContextValue {
  /** True when rendered inside PageLayout's content shell (skip duplicate width/padding). */
  inPageShell: boolean;
}

const PageContentContext = createContext<PageContentContextValue>({ inPageShell: false });

export function PageContentProvider({
  inPageShell,
  children,
}: {
  inPageShell: boolean;
  children: ReactNode;
}) {
  return (
    <PageContentContext.Provider value={{ inPageShell }}>{children}</PageContentContext.Provider>
  );
}

export function usePageContentShell(): boolean {
  return useContext(PageContentContext).inPageShell;
}
