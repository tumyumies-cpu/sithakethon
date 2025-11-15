
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
import { useAppContext } from "@/context/app-context";
import { getStatusBadgeVariant } from "@/lib/utils";


export default function ReservationsPage() {
  const { reservations } = useAppContext();
  const ngoName = "Helping Hands Foundation"; // Mocked for now

  const ngoReservations = reservations.filter(r => r.ngo === ngoName);

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
            {ngoReservations.map((res) => (
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
                      <AvatarImage src={res.driverAvatar} alt={res.driverName} />
                      <AvatarFallback>{res.driverName.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span>{res.driverName}</span>
                  </div>
                </TableCell>
                <TableCell>{res.pickupTime}</TableCell>
                <TableCell>
                  <Badge variant={getStatusBadgeVariant(res.status)}>{res.status}</Badge>
                </TableCell>
              </TableRow>
            ))}
             {ngoReservations.length === 0 && (
                <TableRow>
                    <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                        You have no active reservations.
                    </TableCell>
                </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
