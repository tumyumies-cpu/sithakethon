'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAppContext } from '@/context/app-context';
import { useRouter } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MapPin, Phone, Truck } from 'lucide-react';
import Image from 'next/image';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';

const mockDrivers = [
  { id: 'DRV-01', name: 'Ravi Kumar', phone: '+91 98765 43210', avatar: 'https://picsum.photos/seed/driver1/100/100', distance: '2.1 km away', status: 'active' },
  { id: 'DRV-02', name: 'Sunita Sharma', phone: '+91 98765 43211', avatar: 'https://picsum.photos/seed/driver2/100/100', distance: '3.5 km away', status: 'active' },
  { id: 'DRV-03', name: 'Amit Patel', phone: '+91 98765 43212', avatar: 'https://picsum.photos/seed/driver3/100/100', distance: '4.8 km away', status: 'inactive' },
  { id: 'DRV-04', name: 'Priya Singh', phone: '+91 98765 43213', avatar: 'https://picsum.photos/seed/driver4/100/100', distance: '6.2 km away', status: 'active' },
];

function DriverScanner() {
    return (
        <div className="flex flex-col items-center justify-center gap-4 text-center">
            <div className="relative h-64 w-64">
                <div className="absolute inset-0 rounded-full bg-primary/10 animate-pulse"></div>
                <div className="absolute inset-4 rounded-full bg-primary/20 animate-pulse delay-200"></div>
                <div className="absolute inset-8 flex items-center justify-center rounded-full bg-background">
                    <Truck className="h-16 w-16 text-primary" />
                </div>
                {/* Scanner line */}
                <div className="absolute inset-0 h-full w-full rounded-full overflow-hidden">
                    <div className="absolute top-0 left-1/2 h-1/2 w-px bg-gradient-to-b from-primary/80 to-transparent animate-[spin_3s_linear_infinite]" style={{ transformOrigin: 'bottom center' }}></div>
                </div>
            </div>
            <h3 className="text-xl font-semibold">Scanning for Nearby Drivers...</h3>
            <p className="text-muted-foreground">This will just take a moment.</p>
        </div>
    )
}

export default function AssignDriverPage() {
    const [isScanning, setIsScanning] = useState(true);
    const { lastOrder, setLastOrder } = useAppContext();
    const router = useRouter();
    const { toast } = useToast();

    useEffect(() => {
        if (!lastOrder || Object.keys(lastOrder).length === 0) {
            router.replace('/dashboard/ngo/cart');
            return;
        }

        const scanTimeout = setTimeout(() => {
            setIsScanning(false);
        }, 3000);

        return () => clearTimeout(scanTimeout);
    }, [lastOrder, router]);
    
    const handleConfirmAssignments = () => {
        toast({
            title: "Drivers Assigned!",
            description: "All pickups have been assigned. You can track their progress in 'My Reservations'.",
        });
        setLastOrder({});
        router.push("/dashboard/ngo/reservations");
    }

    const availableDrivers = mockDrivers.filter(d => d.status === 'active');

    return (
        <Card>
            <CardHeader>
                <CardTitle>Assign Drivers for Pickup</CardTitle>
                <CardDescription>Match available drivers to each restaurant pickup in your order.</CardDescription>
            </CardHeader>
            <CardContent>
                {isScanning ? (
                    <DriverScanner />
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 space-y-6">
                            {Object.values(lastOrder).map(({ provider, items }) => (
                                <Card key={provider.name} className="bg-background/50">
                                    <CardHeader className="flex flex-row items-center gap-4 pb-4">
                                        <Image src={provider.logo} alt={provider.name} width={40} height={40} className="rounded-full" />
                                        <div>
                                            <CardTitle className="text-lg">{provider.name}</CardTitle>
                                            <CardDescription className="flex items-center gap-2">
                                                <MapPin size={14} /> {provider.location}
                                            </CardDescription>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="mb-4">
                                            <p className="font-medium text-sm mb-2">Items to be picked up:</p>
                                            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                                                {items.map(item => (
                                                    <li key={item.offer.id}>{item.offer.item} ({item.quantity} {item.offer.quantityUnit})</li>
                                                ))}
                                            </ul>
                                        </div>
                                        <Separator className="my-4"/>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">Assign Driver</label>
                                            <Select>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a driver..." />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {availableDrivers.map(driver => (
                                                        <SelectItem key={driver.id} value={driver.id}>
                                                            <div className="flex items-center gap-3">
                                                                <Avatar className="h-8 w-8">
                                                                    <AvatarImage src={driver.avatar} alt={driver.name} />
                                                                    <AvatarFallback>{driver.name.charAt(0)}</AvatarFallback>
                                                                </Avatar>
                                                                <div>
                                                                    <p className="font-medium">{driver.name}</p>
                                                                    <p className="text-xs text-muted-foreground">{driver.distance}</p>
                                                                </div>
                                                            </div>
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                        <div className="lg:col-span-1">
                             <Card className="sticky top-24">
                                <CardHeader>
                                    <CardTitle className="text-lg">Available Drivers</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {availableDrivers.map(driver => (
                                        <div key={driver.id} className="flex items-center gap-4">
                                            <Avatar>
                                                <AvatarImage src={driver.avatar} alt={driver.name} />
                                                <AvatarFallback>{driver.name.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <p className="font-semibold">{driver.name}</p>
                                                <p className="text-sm text-muted-foreground">{driver.distance}</p>
                                            </div>
                                        </div>
                                    ))}
                                    <Separator />
                                    <Button className="w-full" size="lg" onClick={handleConfirmAssignments}>Confirm Assignments</Button>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}