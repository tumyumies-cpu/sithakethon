
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function HistoryPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Driver Delivery History</CardTitle>
        <CardDescription>
          A record of all your completed deliveries.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">History content is under construction.</p>
      </CardContent>
    </Card>
  );
}
