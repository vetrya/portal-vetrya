import { LayoutDashboard, BarChart3, User, LogOut } from 'lucide-react';
import { NavLink } from '@/components/NavLink';
import { useAuth } from '@/state/AuthContext';
import logoWhite from '@/assets/logo-white.png';

const navItems = [
  { title: 'Visão Geral', path: '/overview', icon: LayoutDashboard },
  { title: 'Conta', path: '/account', icon: User },
];

export function AppSidebar() {
  const { logout } = useAuth();

  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-56 flex-col bg-sidebar text-sidebar-foreground">
      <div className="flex h-14 items-center px-6">
        <img src={logoWhite} alt="Vetrya" className="h-8 w-auto" />
      </div>

      <nav className="flex flex-1 flex-col gap-1 px-3 pt-4">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-sidebar-foreground/80"
            activeClassName="bg-sidebar-accent text-sidebar-accent-foreground font-medium"
          >
            <item.icon className="h-4 w-4" />
            <span>{item.title}</span>
          </NavLink>
        ))}

        <a
          href={`${import.meta.env.VITE_API_BASE_URL}/streamlit-entry`}
          className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
        >
          <BarChart3 className="h-4 w-4" />
          <span>Painéis de Controle</span>
        </a>

        <button
          onClick={logout}
          className="mt-auto flex items-center gap-3 rounded-md px-3 py-2 text-sm text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
        >
          <LogOut className="h-4 w-4" />
          <span>Desconectar</span>
        </button>
      </nav>
    </aside>
  );
}
