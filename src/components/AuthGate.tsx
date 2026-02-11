import { ReactNode } from "react";
import { useAuth } from "@/state/AuthContext";
import { redirectToLogin } from "@/services/auth";
import { Button } from "@/components/ui/button";

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
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background p-6 text-center">
        <h1 className="text-foreground text-lg font-medium">You are signed out</h1>
        <p className="max-w-sm text-sm text-muted-foreground">
          Your session has ended. Click below to sign in again.
        </p>
        <Button onClick={redirectToLogin}>Log in</Button>
      </div>
    );
  }

  return <>{children}</>;
}
