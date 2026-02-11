import { createContext, useCallback, useContext, useEffect, useState, ReactNode } from 'react';
import { fetchCurrentUser, logout as logoutService, UserProfile } from '@/services/auth';
import { trackEvent } from '@/telemetry/telemetry';

interface AuthState {
  user: UserProfile | null;
  loading: boolean;
  refresh: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthState>({
  user: null,
  loading: true,
  refresh: async () => {},
  logout: async () => {},
});

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    setLoading(true);

    try {
      const nextUser = await fetchCurrentUser();
      setUser(nextUser);
      trackEvent('login_success');
    } catch {
      // IMPORTANT: Never redirect from here.
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const logout = useCallback(async () => {
    trackEvent('logout');

    try {
      await logoutService();
    } finally {
      // Ensure local state is cleared even if the network fails.
      setUser(null);
      setLoading(false);
    }
  }, []);

  return <AuthContext.Provider value={{ user, loading, refresh, logout }}>{children}</AuthContext.Provider>;
}
