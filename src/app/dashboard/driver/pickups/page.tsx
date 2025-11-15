
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { MapPin, Clock, Phone, ArrowRight, User, Package } from "lucide-react";
import Image from "next/image";
import Link from 'next/link';

const activePickups = [
    {
        id: "RES-NGO-002",
        item: "Paneer Butter Masala",
        provider: "The Grand Restaurant",
        providerLogo: "https://picsum.photos/seed/p-logo2/40/40",
        providerAddress: "123, 1st Main, Indiranagar, Bangalore",
        providerContact: { name: "Mr. Sharma", phone: "+91 9988776655" },
        status: "In Transit",
        pickupTime: "Today, 6:00 PM",
        ngo: "Helping Hands Foundation",
        ngoAddress: "456, 2nd Cross, Jayanagar, Bangalore"
    },
];

const getStatusBadgeVariant = (status: string): "default" | "secondary" | "outline" | "success" => {
    switch (status) {
        case "Awaiting Pickup":
            return "secondary";
        case "In Transit":
            return "outline";
        case "Delivered":
            return "success";
        default:
            return "secondary";
    }
}

export default function PickupsPage() {
  return (
    <div className="space-y-6">
        <Card>
            <CardHeader>
                <CardTitle>My Current Pickups</CardTitle>
                <CardDescription>
                Manage your accepted pickups and view delivery details.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
            {activePickups.length > 0 ? (
                activePickups.map(pickup => (
                <Card key={pickup.id} className="bg-background/50">
                    <CardHeader>
                        <div className="flex justify-between items-start">
                            <div>
                                <CardTitle>{pickup.item}</CardTitle>
                                <CardDescription>From: {pickup.provider}</CardDescription>
                            </div>
                            <Badge variant={getStatusBadgeVariant(pickup.status)}>{pickup.status}</Badge>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2 p-4 border rounded-lg">
                                <h4 className="font-semibold text-sm flex items-center gap-2"><MapPin size={16} /> Pickup From</h4>
                                <p className="font-medium">{pickup.provider}</p>
                                <p className="text-xs text-muted-foreground">{pickup.providerAddress}</p>
                                <Separator/>
                                 <p className="text-xs text-muted-foreground flex items-center gap-2"><User size={14}/> {pickup.providerContact.name}</p>
                                 <p className="text-xs text-muted-foreground flex items-center gap-2"><Phone size={14}/> {pickup.providerContact.phone}</p>
                            </div>
                             <div className="space-y-2 p-4 border rounded-lg">
                                <h4 className="font-semibold text-sm flex items-center gap-2"><ArrowRight size={16} /> Deliver To</h4>
                                <p className="font-medium">{pickup.ngo}</p>
                                <p className="text-xs text-muted-foreground">{pickup.ngoAddress}</p>
                            </div>
                        </div>
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-sm text-muted-foreground">
                            <div className="flex items-center gap-2"><Package size={14}/> {pickup.item}</div>
                            <div className="flex items-center gap-2"><Clock size={14}/> Pickup Window: {pickup.pickupTime}</div>
                        </div>
                    </CardContent>
                    <CardFooter className="flex-col sm:flex-row gap-2 justify-end bg-muted/50 p-4">
                        {pickup.status === "Awaiting Pickup" && <Button variant="outline">Navigate to Pickup</Button>}
                        {pickup.status === "Awaiting Pickup" && <Button>Mark as Picked Up</Button>}
                        {pickup.status === "In Transit" && <Button variant="outline">Navigate to NGO</Button>}
                        {pickup.status === "In Transit" && <Button>Mark as Delivered</Button>}
                    </CardFooter>
                </Card>
                ))
            ) : (
                <div className="text-center py-8">
                    <p className="text-muted-foreground mb-4">You have no active pickups.</p>
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
