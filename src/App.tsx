import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from '@/state/AuthContext';
import { AuthGate } from '@/components/AuthGate';
import { OrgProvider } from '@/state/OrgContext';
import { AppLayout } from '@/components/AppLayout';
import Overview from '@/pages/Overview';
import Dashboards from '@/pages/Dashboards';
import Account from '@/pages/Account';
import NotFound from '@/pages/NotFound';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <AuthProvider>
        <OrgProvider>
          <AuthGate>
            <Routes>
              <Route path="/" element={<Navigate to="/overview" replace />} />
              <Route element={<AppLayout />}>
                <Route path="/overview" element={<Overview />} />
                <Route path="/dashboards" element={<Dashboards />} />
                <Route path="/account" element={<Account />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AuthGate>
        </OrgProvider>
      </AuthProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
