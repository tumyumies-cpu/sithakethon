
'use client'

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Utensils, Handshake, Bike, Package, AlertTriangle, Users, Map } from "lucide-react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";

const summaryStats = [
  { title: "Total Providers", value: "85", icon: Utensils, change: "+5 this week" },
  { title: "Total NGOs", value: "120", icon: Handshake, change: "+8 this week" },
  { title: "Total Drivers", value: "250", icon: Bike, change: "+15 this week" },
  { title: "Food Rescued (KG)", value: "12,500", icon: Package, change: "+800kg this week" },
];

const initialChartData = [
  { date: "Mon", total: 0 },
  { date: "Tue", total: 0 },
  { date: "Wed", total: 0 },
  { date: "Thu", total: 0 },
  { date: "Fri", total: 0 },
  { date: "Sat", total: 0 },
  { date: "Sun", total: 0 },
];

const recentActivity = [
    { id: "ACT-001", description: "City Bakery created a new offer for 'Surplus Bread'", time: "2 min ago", type: "Offer" },
    { id: "ACT-002", description: "Driver Ravi Kumar picked up order #ORD-123", time: "15 min ago", type: "Pickup" },
    { id: "ACT-003", description: "NGO 'Helping Hands' registered and is awaiting approval", time: "30 min ago", type: "Registration" },
    { id: "ACT-004", description: "Order #ORD-122 marked as 'Delivered'", time: "45 min ago", type: "Delivery" },
];

const getBadgeVariantForActivity = (type: string) => {
    switch(type) {
        case "Offer": return "default";
        case "Pickup": return "secondary";
        case "Registration": return "outline";
        case "Delivery": return "success";
        default: return "secondary";
    }
}


export default function AdminPage() {
  const [chartData, setChartData] = useState(initialChartData);

  useEffect(() => {
    setChartData(initialChartData.map(d => ({...d, total: Math.floor(Math.random() * 200) + 100})));
  }, []);

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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Food Rescue Analytics</CardTitle>
            <CardDescription>Total food rescued (in KG) over the last 7 days.</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
             <ResponsiveContainer width="100%" height={350}>
                <BarChart data={chartData}>
                    <XAxis dataKey="date" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value} kg`}/>
                    <Tooltip cursor={{fill: 'hsl(var(--muted))'}} contentStyle={{backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))'}}/>
                    <Bar dataKey="total" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><AlertTriangle size={20}/> System Alerts</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground">3 new NGOs awaiting verification.</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Map size={20}/> Live Pickups</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="h-48 rounded-lg bg-muted flex items-center justify-center">
                        <p className="text-sm text-muted-foreground">Live map view coming soon</p>
                    </div>
                </CardContent>
            </Card>
        </div>
      </div>
      
      <Card>
        <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>A log of recent platform events.</CardDescription>
        </CardHeader>
        <CardContent>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Event</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Time</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {recentActivity.map(activity => (
                        <TableRow key={activity.id}>
                            <TableCell className="font-medium">{activity.description}</TableCell>
                            <TableCell>
                                <Badge variant={getBadgeVariantForActivity(activity.type)}>{activity.type}</Badge>
                            </TableCell>
                            <TableCell>{activity.time}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </CardContent>
      </Card>
    </div>
  );
}
