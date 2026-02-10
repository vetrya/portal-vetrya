import { useAuth } from '@/state/AuthContext';
import { useOrg } from '@/state/OrgContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Account() {
  const { user } = useAuth();
  const { orgName } = useOrg();

  const fields = [
    { label: 'Name', value: user?.name || '—' },
    { label: 'Email', value: user?.email || '—' },
    { label: 'Auth Provider', value: user?.provider || '—' },
    { label: 'Current Organization', value: orgName || '—' },
  ];

  return (
    <Card className="max-w-lg border-border">
      <CardHeader>
        <CardTitle className="text-base font-semibold text-foreground">Account Information</CardTitle>
      </CardHeader>
      <CardContent>
        <dl className="space-y-4">
          {fields.map((f) => (
            <div key={f.label}>
              <dt className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{f.label}</dt>
              <dd className="mt-1 text-sm text-foreground">{f.value}</dd>
            </div>
          ))}
        </dl>
      </CardContent>
    </Card>
  );
}
