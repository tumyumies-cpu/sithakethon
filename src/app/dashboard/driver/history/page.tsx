
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
import { Star } from "lucide-react";
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
  const driverHistory = history.filter(h => h.driver === 'Sunita Sharma'); // Mocking current driver

  return (
    <Card>
      <CardHeader>
        <CardTitle>Driver Delivery History</CardTitle>
        <CardDescription>
          A record of all your completed and rejected tasks.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Food Item</TableHead>
              <TableHead>From</TableHead>
              <TableHead>To</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Tokens</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {driverHistory.map((entry) => (
              <TableRow key={entry.id}>
                <TableCell className="font-medium">{entry.item}</TableCell>
                <TableCell>{entry.provider}</TableCell>
                <TableCell>{entry.ngo}</TableCell>
                <TableCell>{entry.date}</TableCell>
                <TableCell>
                  <Badge variant={getStatusBadgeVariant(entry.status)}>{entry.status}</Badge>
                </TableCell>
                <TableCell className="text-right flex justify-end items-center gap-1">
                  {entry.tokens > 0 ? (
                    <>
                      {entry.tokens} <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                    </>
                  ): 'N/A'}
                </TableCell>
              </TableRow>
            ))}
             {driverHistory.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                  You have no delivery history yet.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
