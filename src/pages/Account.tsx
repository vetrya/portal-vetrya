import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface AccountData {
  name: string | null;
  email: string | null;
  auth_provider: string | null;
  org_name: string | null;
}

export default function Account() {
  const [data, setData] = useState<AccountData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/account`, {
      credentials: 'include',
    })
      .then((res) => {
        if (!res.ok) throw new Error('Erro ao buscar dados');
        return res.json();
      })
      .then((json) => {
        setData(json);
      })
      .catch(() => {
        setData(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p className="text-muted-foreground">Carregando informações da conta...</p>;
  }

  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle>Informações da Conta</CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        <div>
          <p className="text-sm font-medium text-muted-foreground uppercase">Nome</p>
          <p className="text-base">{data?.name || 'Não informado'}</p>
        </div>

        <div>
          <p className="text-sm font-medium text-muted-foreground uppercase">E-mail</p>
          <p className="text-base">{data?.email || 'Não informado'}</p>
        </div>

        <div>
          <p className="text-sm font-medium text-muted-foreground uppercase">
            Provedor de Autenticação
          </p>
          <p className="text-base">{data?.auth_provider || 'Não informado'}</p>
        </div>

        <div>
          <p className="text-sm font-medium text-muted-foreground uppercase">
            Empresa
          </p>
          <p className="text-base">{data?.org_name || 'Não informado'}</p>
        </div>
      </CardContent>
    </Card>
  );
}
