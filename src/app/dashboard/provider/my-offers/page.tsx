
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
import { Button } from "@/components/ui/button";
import { MoreHorizontal, PlusCircle } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAppContext } from "@/context/app-context";
import { useState } from "react";
import { CreateOfferDialog } from "@/components/create-offer-dialog";
import { getStatusBadgeVariant } from "@/lib/utils";


export default function MyOffersPage() {
    const { offers } = useAppContext();
    const [isCreateOfferOpen, setCreateOfferOpen] = useState(false);

  return (
    <>
    <Card>
      <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <CardTitle>My Surplus Offers</CardTitle>
          <CardDescription>
            A list of all the food surplus offers you have created.
          </CardDescription>
        </div>
        <Button onClick={() => setCreateOfferOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Create New Offer
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Food Item</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Expires</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {offers.map((offer) => (
              <TableRow key={offer.id}>
                <TableCell className="font-medium">{offer.item}</TableCell>
                <TableCell>
                  <Badge variant={getStatusBadgeVariant(offer.status)}>{offer.status}</Badge>
                </TableCell>
                <TableCell>{offer.quantity} {offer.quantityUnit}</TableCell>
                <TableCell>{offer.bestBefore}</TableCell>
                <TableCell>{offer.createdAt}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button aria-haspopup="true" size="icon" variant="ghost">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Toggle menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View Details</DropdownMenuItem>
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuItem>Cancel</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
    <CreateOfferDialog open={isCreateOfferOpen} onOpenChange={setCreateOfferOpen} />
    </>
  );
}
