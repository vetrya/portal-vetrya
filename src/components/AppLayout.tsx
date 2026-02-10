import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { AppSidebar } from '@/components/AppSidebar';
import { AppHeader } from '@/components/AppHeader';
import { useOrg } from '@/state/OrgContext';
import { OrgSelectionScreen } from '@/components/OrgSelectionScreen';
import { trackEvent } from '@/telemetry/telemetry';

const pageTitles: Record<string, string> = {
  '/overview': 'Overview',
  '/dashboards': 'Dashboards',
  '/account': 'Account',
};

export function AppLayout() {
  const { orgId, loading } = useOrg();
  const location = useLocation();

  useEffect(() => {
    trackEvent('page_view');
  }, [location.pathname]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <p className="text-muted-foreground">Loading organizations…</p>
      </div>
    );
  }

  if (!orgId) {
    return <OrgSelectionScreen />;
  }

  const title = pageTitles[location.pathname] || 'Vetrya';

  return (
    <div className="min-h-screen bg-background">
      <AppSidebar />
      <AppHeader title={title} />
      <main className="ml-56 mt-14 p-6">
        <Outlet />
      </main>
    </div>
  );
}
