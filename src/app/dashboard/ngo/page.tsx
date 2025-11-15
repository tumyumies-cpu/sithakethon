import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function NgoDashboardPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>NGO Dashboard</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">
          NGO dashboard content is under construction. Here you will be able to browse offers, manage your reservations, and coordinate pickups.
        </p>
      </CardContent>
    </Card>
  );
}
