
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from 'next/image';

const reservations = [
    {
        id: "RES-NGO-001",
        item: "Surplus Bread & Pastries",
        provider: "City Bakery",
        providerLogo: "https://picsum.photos/seed/p-logo1/40/40",
        status: "Driver Assigned",
        driver: "Ravi Kumar",
        driverAvatar: "https://picsum.photos/seed/driver1/100/100",
        pickupTime: "Today, 4:00 PM",
    },
    {
        id: "RES-NGO-002",
        item: "Paneer Butter Masala",
        provider: "The Grand Restaurant",
        providerLogo: "https://picsum.photos/seed/p-logo2/40/40",
        status: "In Transit",
        driver: "Sunita Sharma",
        driverAvatar: "https://picsum.photos/seed/driver2/100/100",
        pickupTime: "Today, 6:00 PM",
    },
    {
        id: "RES-NGO-003",
        item: "Chicken Biryani",
        provider: "Spicy Delights",
        providerLogo: "https://picsum.photos/seed/p-logo4/40/40",
        status: "Awaiting Pickup",
        driver: "Priya Singh",
        driverAvatar: "https://picsum.photos/seed/driver4/100/100",
        pickupTime: "Today, 7:30 PM",
    },
];

const getStatusBadgeVariant = (status: string): "default" | "secondary" | "outline" | "success" => {
    switch (status) {
        case "Awaiting Pickup":
            return "secondary";
        case "Driver Assigned":
            return "default";
        case "In Transit":
            return "outline";
        case "Delivered":
            return "success";
        default:
            return "secondary";
    }
}

export default function ReservationsPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>My Reservations</CardTitle>
        <CardDescription>
          Track the status of your active food reservations and pickups.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Food Item</TableHead>
              <TableHead>Provider</TableHead>
              <TableHead>Driver</TableHead>
              <TableHead>Pickup Time</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reservations.map((res) => (
              <TableRow key={res.id}>
                <TableCell className="font-medium">{res.item}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Image src={res.providerLogo} alt={res.provider} width={24} height={24} className="rounded-full" />
                    <span>{res.provider}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={res.driverAvatar} alt={res.driver} />
                      <AvatarFallback>{res.driver.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span>{res.driver}</span>
                  </div>
                </TableCell>
                <TableCell>{res.pickupTime}</TableCell>
                <TableCell>
                  <Badge variant={getStatusBadgeVariant(res.status)}>{res.status}</Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
