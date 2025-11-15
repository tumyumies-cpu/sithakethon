
'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
import { ArrowRight, CheckCircle2, Package, Search, Truck } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useAppContext } from "@/context/app-context";

const summaryStats = [
  { title: "Food Collected (Month)", value: "1,200 kg", icon: Package, change: "+150 kg from last month" },
  { title: "Pending Pickups", value: "8", icon: Truck, change: "3 new today" },
  { title: "Meals Served (est.)", value: "3,600", icon: CheckCircle2, change: "+450 from last month" },
];

export default function NgoDashboardPage() {
  const { offers } = useAppContext();
  const recentOffers = offers.filter(offer => offer.status === 'Active').slice(0, 3);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
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
              <CardTitle>Newly Available Food</CardTitle>
              <CardDescription>
                The latest surplus food offers available near you.
              </CardDescription>
            </div>
            <Button asChild>
                <Link href="/dashboard/ngo/browse">
                    Browse All Offers <Search className="ml-2 h-4 w-4" />
                </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Food Item</TableHead>
                  <TableHead>Provider</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Best Before</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentOffers.map((offer) => (
                  <TableRow key={offer.id}>
                    <TableCell className="font-medium">{offer.item}</TableCell>
                    <TableCell>
                        <div className="flex items-center gap-2">
                            <Image src={offer.providerLogo} alt={offer.provider} width={24} height={24} className="rounded-full" />
                            <span>{offer.provider}</span>
                        </div>
                    </TableCell>
                    <TableCell>{offer.quantity} {offer.quantityUnit}</TableCell>
                    <TableCell>{offer.bestBefore}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
