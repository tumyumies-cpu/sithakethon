
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
import Image from 'next/image';
import { useAppContext } from "@/context/app-context";

const getStatusBadgeVariant = (status: string): "success" | "destructive" => {
    switch (status) {
        case "Delivered":
        case "Completed":
            return "success";
        default:
            return "destructive";
    }
}


export default function HistoryPage() {
  const { history, offers } = useAppContext();
  // Mocking current NGO name
  const ngoHistory = history.filter(h => h.ngo === 'Helping Hands Foundation');

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
            {ngoHistory.map((entry) => {
              const originalOffer = offers.find(o => o.item === entry.item && o.provider === entry.provider)
              return (
              <TableRow key={entry.id}>
                <TableCell className="font-medium">{entry.item}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Image src={originalOffer?.providerLogo || "https://picsum.photos/seed/generic/40/40"} alt={entry.provider} width={24} height={24} className="rounded-full" />
                    <span>{entry.provider}</span>
                  </div>
                </TableCell>
                <TableCell>{entry.date}</TableCell>
                <TableCell>{entry.quantity} {entry.quantityUnit}</TableCell>
                <TableCell>
                  <Badge variant={getStatusBadgeVariant(entry.status)}>{entry.status}</Badge>
                </TableCell>
              </TableRow>
            )})}
            {ngoHistory.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                  You have no pickup history yet.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
