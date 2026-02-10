import { useOrg, Organization } from '@/state/OrgContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export function OrgSelectionScreen() {
  const { organizations, selectOrg } = useOrg();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <Card className="w-full max-w-md border-border">
        <CardHeader>
          <CardTitle className="text-center text-foreground">Select Organization</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          {organizations.map((org: Organization) => (
            <Button
              key={org.id}
              variant="outline"
              className="w-full justify-start border-border text-foreground"
              onClick={() => selectOrg(org)}
            >
              {org.name}
            </Button>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
