
'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle2,
  Package,
  Star,
  Truck,
  MapPin,
  Clock,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const summaryStats = [
  {
    title: "Total Pickups (Month)",
    value: "32",
    icon: Package,
    change: "+5 from last month",
  },
  {
    title: "Tokens Earned",
    value: "850",
    icon: Star,
    change: "+150 from last month",
  },
  {
    title: "On-time Rate",
    value: "98%",
    icon: CheckCircle2,
    change: "Excellent work!",
  },
];

const activeJob = {
    id: "RES-NGO-002",
    item: "Paneer Butter Masala",
    provider: "The Grand Restaurant",
    providerLogo: "https://picsum.photos/seed/p-logo2/40/40",
    status: "In Transit",
    pickupTime: "Today, 6:00 PM",
    destination: "Helping Hands Foundation",
};

export default function DriverDashboardPage() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Availability</CardTitle>
            <CardDescription>
              Go online to see and accept new pickup tasks.
            </CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            <Label htmlFor="availability-switch" className="text-muted-foreground">
              Offline
            </Label>
            <Switch id="availability-switch" defaultChecked />
            <Label htmlFor="availability-switch" className="font-medium">
              Online
            </Label>
          </div>
        </CardHeader>
      </Card>

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

      <Card>
        <CardHeader>
          <CardTitle>Current Active Job</CardTitle>
        </CardHeader>
        <CardContent>
          {activeJob ? (
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-lg border p-4">
              <div className="flex items-center gap-4">
                 <Image src={activeJob.providerLogo} alt={activeJob.provider} width={40} height={40} className="rounded-full hidden sm:block"/>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-semibold">{activeJob.item}</p>
                    <Badge variant="outline">{activeJob.status}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    From {activeJob.provider} <ArrowRight className="inline h-3 w-3"/> To {activeJob.destination}
                  </p>
                </div>
              </div>
              <Button asChild>
                <Link href="/dashboard/driver/pickups">
                  View Details <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          ) : (
             <div className="text-center py-8">
                <p className="text-muted-foreground mb-4">You have no active jobs.</p>
                 <Button asChild>
                    <Link href="/dashboard/driver/tasks">Browse Available Tasks</Link>
                 </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
