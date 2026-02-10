import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const cards = [
  { title: 'System Status', content: 'All systems operational' },
  { title: 'Usage Metrics', content: 'Data loading from backend' },
  { title: 'Notifications', content: 'No new notifications' },
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
