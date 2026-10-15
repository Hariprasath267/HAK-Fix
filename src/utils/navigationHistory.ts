export function pushHistory(
  history: string[],
  newPage: string,
  currentPage: string
): string[] {
  if (newPage === currentPage) return history;
  // Keep last 30 items
  const updated = [...history, currentPage];
  return updated.slice(-30);
}

export function popHistory(
  history: string[],
  fallback = 'home'
): { previousPage: string; nextHistory: string[] } {
  if (!history || history.length === 0) {
    return { previousPage: fallback, nextHistory: [] };
  }
  const nextHistory = [...history];
  const previousPage = nextHistory.pop() || fallback;
  return { previousPage, nextHistory };
}

export function getBackLabel(targetPage?: string): string {
  switch (targetPage) {
    case 'home':
      return 'Back to Home';
    case 'services':
      return 'Back to Specialists';
    case 'my-bookings':
      return 'Back to Appointments';
    case 'provider-dashboard':
      return 'Back to Provider Hub';
    case 'admin-dashboard':
      return 'Back to Admin Desk';
    default:
      return 'Back';
  }
}
