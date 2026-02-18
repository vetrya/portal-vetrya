import { ReactNode } from "react";
import { useAuth } from "@/state/AuthContext";
import { redirectToLogin } from "@/services/auth";
import { Button } from "@/components/ui/button";
import { OrgSelectionScreen } from "@/components/OrgSelectionScreen";

export function AuthGate({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <p className="text-muted-foreground">Loading…</p>
      </div>
    );
  }

 if (!user) {
   const manualLogout = sessionStorage.getItem("manual_logout");

   if (manualLogout) {
     sessionStorage.removeItem("manual_logout");

     return (
       <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background p-6 text-center">
         <h1 className="text-foreground text-lg font-medium">You are signed out</h1>
         <Button onClick={redirectToLogin}>Log in</Button>
       </div>
     );
   }

   redirectToLogin();
   return null;
 }



  // 🔥 NOVO BLOCO — seleção obrigatória
  if (user.requires_org_selection) {
    return <OrgSelectionScreen />;
  }

  return <>{children}</>;
}
