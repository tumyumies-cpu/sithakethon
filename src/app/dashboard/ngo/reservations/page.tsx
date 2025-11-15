
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function ReservationsPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>My Reservations</CardTitle>
        <CardDescription>
          Track the status of your active food reservations and pickups.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">Reservations content is under construction.</p>
      </CardContent>
    </Card>
  );
}
