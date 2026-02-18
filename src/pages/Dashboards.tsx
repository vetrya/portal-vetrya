import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ExternalLink } from 'lucide-react';

export default function Dashboards() {
  const handleOpen = () => {
    window.location.href = 'http://localhost:8000/streamlit-entry';
  };

  return (
    <Card className="max-w-md border-border">
      <CardHeader>
        <CardTitle className="text-base font-semibold text-foreground">
          Analytics Dashboard
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Button onClick={handleOpen} className="gap-2">
          <ExternalLink className="h-4 w-4" />
          Open Analytics Dashboard
        </Button>
      </CardContent>
    </Card>
  );
}
