
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
import Image from 'next/image';

const pickupHistory = [
    {
        id: "HIST-NGO-001",
        item: "Vegetable Biryani",
        provider: "The Grand Restaurant",
        providerLogo: "https://picsum.photos/seed/p-logo2/40/40",
        date: "3 days ago",
        quantity: "5 kg",
        status: "Delivered",
    },
    {
        id: "HIST-NGO-002",
        item: "Fresh Vegetables",
        provider: "Local Farm Co-op",
        providerLogo: "https://picsum.photos/seed/p-logo3/40/40",
        date: "2 days ago",
        quantity: "20 kg",
        status: "Delivered",
    },
    {
        id: "HIST-NGO-003",
        item: "Idli & Sambar",
        provider: "Daily Breakfast",
        providerLogo: "https://picsum.photos/seed/p-logo-generic/40/40",
        date: "2 days ago",
        quantity: "6 kg",
        status: "Delivered",
    },
    {
        id: "HIST-NGO-004",
        item: "Surplus Bread & Pastries",
        provider: "City Bakery",
        providerLogo: "https://picsum.photos/seed/p-logo1/40/40",
        date: "1 day ago",
        quantity: "8 kg",
        status: "Delivered",
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
        <CardTitle>NGO Pickup History</CardTitle>
        <CardDescription>
          A record of all your past completed food pickups.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Food Item</TableHead>
              <TableHead>Provider</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pickupHistory.map((entry) => (
              <TableRow key={entry.id}>
                <TableCell className="font-medium">{entry.item}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Image src={entry.providerLogo} alt={entry.provider} width={24} height={24} className="rounded-full" />
                    <span>{entry.provider}</span>
                  </div>
                </TableCell>
                <TableCell>{entry.date}</TableCell>
                <TableCell>{entry.quantity}</TableCell>
                <TableCell>
                  <Badge variant={getStatusBadgeVariant(entry.status)}>{entry.status}</Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
