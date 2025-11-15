
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function PickupsPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>My Pickups</CardTitle>
        <CardDescription>
          Manage your accepted pickups and view delivery details.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">My pickups content is under construction.</p>
      </CardContent>
    </Card>
  );
}
