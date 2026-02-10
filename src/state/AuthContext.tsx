import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { fetchCurrentUser, redirectToLogin, UserProfile } from '@/services/auth';
import { trackEvent } from '@/telemetry/telemetry';

interface AuthState {
  user: UserProfile | null;
  loading: boolean;
}

const AuthContext = createContext<AuthState>({ user: null, loading: true });

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({ user: null, loading: true });

  useEffect(() => {
    fetchCurrentUser()
      .then((user) => {
        setState({ user, loading: false });
        trackEvent('login_success');
      })
      .catch(() => {
        redirectToLogin();
      });
  }, []);

  if (state.loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <p className="text-muted-foreground">Loading…</p>
      </div>
    );
  }

  return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>;
}
