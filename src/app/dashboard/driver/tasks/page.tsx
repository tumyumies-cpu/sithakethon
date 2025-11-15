
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function TasksPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Available Tasks</CardTitle>
        <CardDescription>
          Browse and accept available pickup and delivery tasks.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">Available tasks content is under construction.</p>
      </CardContent>
    </Card>
  );
}
