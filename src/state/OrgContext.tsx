import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from "react";
import { apiRequest, setApiOrgId } from "@/services/api";
import { useAuth } from "@/state/AuthContext";

export interface Organization {
  id: string;
  name: string;
}

interface OrgState {
  orgId: string | null;
  organizations: Organization[];
  selectOrg: (org: Organization) => Promise<void>;
  loading: boolean;
}

const OrgContext = createContext<OrgState>({
  orgId: null,
  organizations: [],
  selectOrg: async () => {},
  loading: true,
});

export function useOrg() {
  return useContext(OrgContext);
}

export function OrgProvider({ children }: { children: ReactNode }) {
  const { user, refresh } = useAuth();

  const [orgId, setOrgIdState] = useState<string | null>(null);
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [loading, setLoading] = useState(true);

  // 🔥 Sincroniza org_id do backend
 useEffect(() => {
   if (!user) return;

   const initialize = async () => {
     setLoading(true);

     try {
       // 🔥 Sempre buscar organizações reais do usuário
       const data = await apiRequest<{ organizations: Organization[] }>(
         "/organizations"
       );

       setOrganizations(data.organizations);

       // Se já houver org definida no backend
       if (user.org_id) {
         setOrgIdState(user.org_id);
         setApiOrgId(user.org_id);
       }
     } catch (err) {
       console.error("Failed to initialize org context", err);
       setOrganizations([]);
     } finally {
       setLoading(false);
     } 
   };

  void initialize();
}, [user]);



  const loadOrganizations = async () => {
  setLoading(true);

  try {
    const data = await apiRequest<{ organizations: Organization[] }>(
      "/organizations"
    );
    setOrganizations(data.organizations);
  } catch (err) {
    console.error("Failed to load organizations", err);
    setOrganizations([]);
  } finally {
    setLoading(false);
  }
};


  const selectOrg = useCallback(
    async (org: Organization) => {
      await apiRequest("/select-organization", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ org_id: org.id }),
      });

      setOrgIdState(org.id);
      setApiOrgId(org.id);

      await refresh(); // 🔥 atualiza usuário
    },
    [refresh]
  );

  return (
    <OrgContext.Provider
      value={{
        orgId,
        organizations,
        selectOrg,
        loading,
      }}
    >
      {children}
    </OrgContext.Provider>
  );
}
