import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const cards = [
  { title: 'Status do Sistema', content: 'Todos os sistemas estão funcionando normalmente' },
  { title: 'Métricas de Uso', content: 'Dados carregados com sucesso '},
  { title: 'Notificações', content: 'Sem novas notificações' },
];

export default function Overview() {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {cards.map((card) => (
        <Card key={card.title} className="border-border">
          <CardHeader>
            <CardTitle className="text-base font-semibold text-foreground">{card.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">{card.content}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
