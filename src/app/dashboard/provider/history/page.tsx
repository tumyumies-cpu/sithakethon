
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useAppContext } from "@/context/app-context";

const getStatusBadgeVariant = (status: string): "success" | "destructive" => {
    switch (status) {
        case "Completed":
            return "success";
        default:
            return "destructive";
    }
}

export default function HistoryPage() {
  const { history } = useAppContext();
  // Mocking current provider name for demo
  const providerHistory = history.filter(h => h.provider === 'The Grand Restaurant');

  return (
    <Card>
      <CardHeader>
        <CardTitle>Donation History</CardTitle>
        <CardDescription>
          A record of all your past surplus food offers and their outcomes.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Item</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>NGO</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Meals Served (est.)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {providerHistory.map((entry) => (
              <TableRow key={entry.id}>
                <TableCell className="font-medium">{entry.item}</TableCell>
                <TableCell>
                  <Badge variant={getStatusBadgeVariant(entry.status)}>{entry.status}</Badge>
                </TableCell>
                <TableCell>{entry.ngo}</TableCell>
                <TableCell>{entry.date}</TableCell>
                <TableCell className="text-right">{Math.floor(entry.quantity * 2.5)}</TableCell>
              </TableRow>
            ))}
             {providerHistory.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                  You have no donation history yet.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
