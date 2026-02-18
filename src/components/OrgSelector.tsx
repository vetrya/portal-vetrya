import { useOrg } from '@/state/OrgContext';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export function OrgSelector() {
  const { orgId, organizations, selectOrg } = useOrg();

  // 🔥 Não exibe dropdown se houver 0 ou 1 organização
  if (!organizations || organizations.length <= 1) {
    return null;
  }

  return (
    <Select
      value={orgId ?? undefined}
      onValueChange={(value) => {
        const org = organizations.find((o) => o.id === value);
        if (org) {
          void selectOrg(org);
        }
      }}
    >
      <SelectTrigger className="w-48 border-border bg-background text-foreground">
        <SelectValue placeholder="Select organization" />
      </SelectTrigger>
      <SelectContent>
        {organizations.map((org) => (
          <SelectItem key={org.id} value={org.id}>
            {org.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
