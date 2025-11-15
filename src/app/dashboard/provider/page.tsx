
'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, PlusCircle, Package, Truck, CheckCircle2, Star } from "lucide-react";
import { CreateOfferDialog } from "@/components/create-offer-dialog";
import { useState } from "react";
import { useAppContext } from "@/context/app-context";
import { getStatusBadgeVariant } from "@/lib/utils";

const summaryStats = [
  { title: "Active Offers", value: "5", icon: Package, change: "+2 from last week" },
  { title: "Upcoming Pickups", value: "3", icon: Truck, change: "+1 from last week" },
  { title: "Meals Donated (Month)", value: "450", icon: CheckCircle2, change: "+50 from last month" },
  { title: "Tokens Earned", value: "1,200", icon: Star, change: "+200 from last month" },
];

export default function ProviderDashboardPage() {
  const [isCreateOfferOpen, setCreateOfferOpen] = useState(false);
  const { offers } = useAppContext();
  
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {summaryStats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div>
        <Card>
          <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle>Recent Surplus Offers</CardTitle>
              <CardDescription>
                Manage your food surplus listings and view their status.
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
                  <TableHead className="hidden sm:table-cell">Status</TableHead>
                  <TableHead className="hidden md:table-cell">Quantity</TableHead>
                  <TableHead className="hidden sm:table-cell">Expires</TableHead>
                  <TableHead>
                    <span className="sr-only">Actions</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {offers.slice(0, 5).map((offer) => (
                  <TableRow key={offer.id}>
                    <TableCell className="font-medium">{offer.item}</TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <Badge variant={getStatusBadgeVariant(offer.status)}>{offer.status}</Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">{offer.quantity} {offer.quantityUnit}</TableCell>
                    <TableCell className="hidden sm:table-cell">{offer.bestBefore}</TableCell>
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
      </div>
      <CreateOfferDialog open={isCreateOfferOpen} onOpenChange={setCreateOfferOpen} />
    </div>
  );
}
