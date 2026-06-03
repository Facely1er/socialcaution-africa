/** Whether a nav item should show as active for the current pathname. */
export function isEditionNavActive(pathname: string, path: string): boolean {
  if (path === '/') {
    return pathname === '/';
  }
  return pathname === path || pathname.startsWith(`${path}/`);
}
