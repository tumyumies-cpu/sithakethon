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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const reservations = [
    {
        id: "RES-001",
        offerId: "OFF-001",
        item: "Vegetable Biryani",
        ngo: "Helping Hands Foundation",
        ngoAvatar: "https://picsum.photos/seed/ngo1/40/40",
        status: "Awaiting Pickup",
        driver: "Ravi Kumar",
        pickupTime: "Today, 4:30 PM",
    },
    {
        id: "RES-002",
        offerId: "OFF-003",
        item: "Mixed Dal & Rice",
        ngo: "City Food Bank",
        ngoAvatar: "https://picsum.photos/seed/ngo2/40/40",
        status: "Driver Assigned",
        driver: "Sunita Sharma",
        pickupTime: "Today, 6:00 PM",
    },
];

const getStatusBadgeVariant = (status: string): "default" | "secondary" | "outline" | "destructive" | "success" => {
    switch (status) {
        case "Awaiting Pickup":
            return "secondary";
        case "Driver Assigned":
            return "default";
        case "Picked Up":
            return "outline";
        case "Delivered":
            return "success";
        default:
            return "destructive";
    }
}

export default function ReservationsPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Reservations</CardTitle>
        <CardDescription>
          These are the active reservations for your surplus food offers.
        </CardDescription>
      </CardHeader>
      <CardContent>
         <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Item</TableHead>
              <TableHead>NGO</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Driver</TableHead>
              <TableHead>Pickup Time</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reservations.map((res) => (
              <TableRow key={res.id}>
                <TableCell className="font-medium">{res.item}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={res.ngoAvatar} alt={res.ngo} />
                      <AvatarFallback>{res.ngo.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span>{res.ngo}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={getStatusBadgeVariant(res.status)}>{res.status}</Badge>
                </TableCell>
                <TableCell>{res.driver}</TableCell>
                <TableCell>{res.pickupTime}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
