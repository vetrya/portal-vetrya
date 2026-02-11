import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { trackEvent } from '@/telemetry/telemetry';

export interface Organization {
  id: string;
  name: string;
}

interface OrgState {
  orgId: string | null;
  orgName: string | null;
  organizations: Organization[];
  selectOrg: (org: Organization) => void;
  loading: boolean;
}

const OrgContext = createContext<OrgState>({
  orgId: null,
  orgName: null,
  organizations: [],
  selectOrg: () => {},
  loading: true,
});

export function useOrg() {
  return useContext(OrgContext);
}

const MOCK_ORGS: Organization[] = [
  { id: 'org-1', name: 'Vetrya Corp' },
  { id: 'org-2', name: 'Acme Inc' },
];

export function OrgProvider({ children }: { children: ReactNode }) {
  const [orgId, setOrgId] = useState<string | null>(null);
  const [orgName, setOrgName] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('vetrya_org');

    if (stored) {
      try {
        const parsed = JSON.parse(stored) as Organization;
        setOrgId(parsed.id);
        setOrgName(parsed.name);
      } catch {
        localStorage.removeItem('vetrya_org');
      }
    }

    setLoading(false);
  }, []);

  const selectOrg = useCallback((org: Organization) => {
    setOrgId(org.id);
    setOrgName(org.name);
    localStorage.setItem('vetrya_org', JSON.stringify(org));
    trackEvent('organization_selected');
  }, []);

  return (
    <OrgContext.Provider
      value={{
        orgId,
        orgName,
        organizations: MOCK_ORGS,
        selectOrg,
        loading,
      }}
    >
      {children}
    </OrgContext.Provider>
  );
}
