
'use client'

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Utensils, Wheat, Users, Truck, Download, Calendar as CalendarIcon, Lightbulb } from "lucide-react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Pie, PieChart, Cell } from "recharts";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { DateRange } from "react-day-picker";
import { addDays, format } from "date-fns";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Image from "next/image";

const summaryStats = [
  { title: "Total Food Picked Up", value: "850 kg", icon: Wheat, change: "+50kg this month" },
  { title: "Total Meals Distributed", value: "2,550", icon: Utensils, change: "+150 this month" },
  { title: "Beneficiaries Reached", value: "1,200", icon: Users, change: "+75 this month" },
  { title: "Completed Pickup Trips", value: "62", icon: Truck, change: "+8 this month" },
];

const foodCollectionData = [
  { date: "Mon", total: Math.floor(Math.random() * 50) + 20 },
  { date: "Tue", total: Math.floor(Math.random() * 50) + 20 },
  { date: "Wed", total: Math.floor(Math.random() * 50) + 20 },
  { date: "Thu", total: Math.floor(Math.random() * 50) + 20 },
  { date: "Fri", total: Math.floor(Math.random() * 50) + 20 },
  { date: "Sat", total: Math.floor(Math.random() * 50) + 20 },
  { date: "Sun", total: Math.floor(Math.random() * 50) + 20 },
];

const categoryData = [
  { name: 'Cooked Meals', value: 400, color: 'hsl(var(--chart-1))' },
  { name: 'Bakery', value: 300, color: 'hsl(var(--chart-2))' },
  { name: 'Raw Produce', value: 300, color: 'hsl(var(--chart-3))' },
  { name: 'Packaged Goods', value: 200, color: 'hsl(var(--chart-4))' },
];

const topRestaurants = [
    { name: "The Grand Restaurant", totalDonations: 250, numDonations: 15, avgQuantity: 16.7, logo: "https://picsum.photos/seed/p-logo2/40/40" },
    { name: "City Bakery", totalDonations: 180, numDonations: 25, avgQuantity: 7.2, logo: "https://picsum.photos/seed/p-logo1/40/40" },
    { name: "Spicy Delights", totalDonations: 120, numDonations: 10, avgQuantity: 12.0, logo: "https://picsum.photos/seed/p-logo4/40/40" },
    { name: "Local Farm Co-op", totalDonations: 95, numDonations: 5, avgQuantity: 19.0, logo: "https://picsum.photos/seed/p-logo3/40/40" },
];

const recentActivity = [
    { description: "Order #4567 picked up from City Bakery", time: "2 hours ago" },
    { description: "Driver Ravi Kumar assigned to pickup from Spicy Delights", time: "4 hours ago" },
    { description: "Reservation confirmed for 5kg of Paneer Masala", time: "5 hours ago" },
    { description: "Order #4566 delivered successfully", time: "Yesterday" },
];


export default function AnalyticsPage() {
   const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(2024, 0, 20),
    to: addDays(new Date(2024, 0, 20), 20),
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
            <h1 className="text-2xl font-bold font-headline">NGO Analytics Dashboard</h1>
            <p className="text-muted-foreground">Welcome back, Helping Hands Foundation!</p>
        </div>
        <div className="flex items-center gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="date"
                  variant={"outline"}
                  className={cn(
                    "w-[300px] justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date?.from ? (
                    date.to ? (
                      <>
                        {format(date.from, "LLL dd, y")} -{" "}
                        {format(date.to, "LLL dd, y")}
                      </>
                    ) : (
                      format(date.from, "LLL dd, y")
                    )
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="end">
                <Calendar
                  initialFocus
                  mode="range"
                  defaultMonth={date?.from}
                  selected={date}
                  onSelect={setDate}
                  numberOfMonths={2}
                />
              </PopoverContent>
            </Popover>
            <Button>
                <Download className="mr-2 h-4 w-4" />
                Download Report
            </Button>
        </div>
      </div>
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
            <CardTitle>Food Collected Over Time</CardTitle>
            <CardDescription>Total food collected (in KG) daily for the selected period.</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
             <ResponsiveContainer width="100%" height={350}>
                <BarChart data={foodCollectionData}>
                    <XAxis dataKey="date" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value} kg`}/>
                    <Tooltip cursor={{fill: 'hsl(var(--muted))'}} contentStyle={{backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))'}}/>
                    <Bar dataKey="total" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Food Categories</CardTitle>
            <CardDescription>Breakdown of collected food by category.</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
                <PieChart>
                    <Pie 
                        data={categoryData} 
                        dataKey="value" 
                        nameKey="name" 
                        cx="50%" 
                        cy="50%" 
                        outerRadius={80} 
                        labelLine={false}
                        label={({ name, percent, ...props }) => (
                            <text
                                {...props}
                                x={props.x}
                                y={props.y}
                                textAnchor={props.textAnchor}
                                dominantBaseline="central"
                                fill="hsl(var(--foreground))"
                                fontSize={12}
                                fontWeight={500}
                            >
                                {`${name} (${(percent * 100).toFixed(0)}%)`}
                            </text>
                        )}
                        >
                        {categoryData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                    </Pie>
                    <Tooltip contentStyle={{backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))'}}/>
                </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
         <Card>
            <CardHeader>
                <CardTitle>Top Contributing Restaurants</CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Restaurant</TableHead>
                            <TableHead>Total (kg)</TableHead>
                            <TableHead># Donations</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {topRestaurants.map(r => (
                            <TableRow key={r.name}>
                                <TableCell className="font-medium flex items-center gap-2">
                                     <Image src={r.logo} alt={r.name} width={24} height={24} className="rounded-full" />
                                    {r.name}
                                </TableCell>
                                <TableCell>{r.totalDonations}</TableCell>
                                <TableCell>{r.numDonations}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
         <Card>
            <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {recentActivity.map((activity, i) => (
                        <div key={i} className="flex items-start gap-3">
                            <div className="h-2 w-2 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                            <div>
                                <p className="text-sm font-medium">{activity.description}</p>
                                <p className="text-xs text-muted-foreground">{activity.time}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
      </div>

        <Card className="bg-primary/10 border-primary/20">
            <CardHeader className="flex-row gap-4 items-center">
                <Lightbulb className="w-8 h-8 text-primary"/>
                <div>
                    <CardTitle>AI-Powered Recommendation</CardTitle>
                    <CardDescription>Donations are highest on Fridays. Consider scheduling an extra driver for Friday evenings to maximize pickups.</CardDescription>
                </div>
            </CardHeader>
        </Card>

    </div>
  );
}
