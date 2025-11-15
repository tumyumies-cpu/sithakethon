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

const history = [
    {
        id: "HIST-001",
        offerId: "OFF-004",
        item: "Idli & Sambar",
        status: "Delivered",
        ngo: "Good Samaritan Shelter",
        date: "2 days ago",
        meals: 30,
    },
    {
        id: "HIST-002",
        offerId: "OFF-003",
        item: "Mixed Dal & Rice",
        status: "Delivered",
        ngo: "City Food Bank",
        date: "1 day ago",
        meals: 40,
    },
     {
        id: "HIST-003",
        offerId: "OFF-00X",
        item: "Expired Sandwiches",
        status: "Expired",
        ngo: "N/A",
        date: "3 days ago",
        meals: 0,
    },
];

const getStatusBadgeVariant = (status: string): "success" | "destructive" => {
    switch (status) {
        case "Delivered":
            return "success";
        default:
            return "destructive";
    }
}

export default function HistoryPage() {
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
            {history.map((entry) => (
              <TableRow key={entry.id}>
                <TableCell className="font-medium">{entry.item}</TableCell>
                <TableCell>
                  <Badge variant={getStatusBadgeVariant(entry.status)}>{entry.status}</Badge>
                </TableCell>
                <TableCell>{entry.ngo}</TableCell>
                <TableCell>{entry.date}</TableCell>
                <TableCell className="text-right">{entry.meals}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
