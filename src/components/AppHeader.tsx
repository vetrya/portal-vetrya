import { OrgSelector } from '@/components/OrgSelector';
import { useAuth } from '@/state/AuthContext';

interface AppHeaderProps {
  title: string;
}

export function AppHeader({ title }: AppHeaderProps) {
  const { user } = useAuth();

  return (
    <header className="fixed left-56 right-0 top-0 z-30 flex h-14 items-center justify-between border-b border-border bg-background px-6">
      <h1 className="text-lg font-semibold text-foreground">{title}</h1>
      <div className="flex items-center gap-4">
        <OrgSelector />
        {user && (
          <span className="text-sm text-muted-foreground">{user.name || user.email}</span>
        )}
      </div>
    </header>
  );
}
