
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

const deliveryHistory = [
    {
        id: "HIST-DRV-001",
        item: "Vegetable Biryani",
        provider: "The Grand Restaurant",
        ngo: "Helping Hands Foundation",
        date: "3 days ago",
        status: "Completed",
        tokens: 50,
    },
    {
        id: "HIST-DRV-002",
        item: "Fresh Vegetables",
        provider: "Local Farm Co-op",
        ngo: "Good Samaritan Shelter",
        date: "2 days ago",
        status: "Completed",
        tokens: 75,
    },
    {
        id: "HIST-DRV-003",
        item: "Idli & Sambar",
        provider: "Daily Breakfast",
        ngo: "City Food Bank",
        date: "2 days ago",
        status: "Rejected",
        tokens: 0,
    },
    {
        id: "HIST-DRV-004",
        item: "Surplus Bread & Pastries",
        provider: "City Bakery",
        ngo: "Good Samaritan Shelter",
        date: "1 day ago",
        status: "Completed",
        tokens: 40,
    },
];

const getStatusBadgeVariant = (status: string): "success" | "destructive" => {
    switch (status) {
        case "Completed":
            return "success";
        default:
            return "destructive";
    }
}

export default function HistoryPage() {
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
            {deliveryHistory.map((entry) => (
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
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
