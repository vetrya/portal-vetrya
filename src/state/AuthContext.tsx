import { createContext, useContext, useEffect, useState, useCallback, ReactNode } from 'react';
import { fetchCurrentUser, redirectToLogin, logout as logoutService, UserProfile } from '@/services/auth';
import { trackEvent } from '@/telemetry/telemetry';

interface AuthState {
  user: UserProfile | null;
  loading: boolean;
  loggedOut: boolean;
  handleLogout: () => Promise<void>;
}

const AuthContext = createContext<AuthState>({ user: null, loading: true, loggedOut: false, handleLogout: async () => {} });

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<{ user: UserProfile | null; loading: boolean; loggedOut: boolean }>({
    user: null,
    loading: true,
    loggedOut: false,
  });

  useEffect(() => {
    // If user already logged out, don't try to fetch or redirect
    if (state.loggedOut) return;

    fetchCurrentUser()
      .then((user) => {
        setState({ user, loading: false, loggedOut: false });
        trackEvent('login_success');
      })
      .catch(() => {
        redirectToLogin();
      });
    // Only run on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogout = useCallback(async () => {
    trackEvent('logout');
    await logoutService();
    // Set loggedOut BEFORE clearing user to prevent re-fetch/redirect
    setState({ user: null, loading: false, loggedOut: true });
  }, []);

  if (state.loading && !state.loggedOut) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <p className="text-muted-foreground">Loading…</p>
      </div>
    );
  }

  if (state.loggedOut) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background">
        <p className="text-foreground text-lg font-medium">You have been logged out.</p>
        <button
          onClick={() => redirectToLogin()}
          className="rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground hover:bg-primary/90"
        >
          Log in again
        </button>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user: state.user, loading: state.loading, loggedOut: state.loggedOut, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
}
