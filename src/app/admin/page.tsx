import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Admin Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">
          Admin dashboard content is under construction. This is a protected area for administrators.
        </p>
      </CardContent>
    </Card>
  );
}
