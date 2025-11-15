
'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAppContext } from '@/context/app-context';
import { useRouter } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MapPin, Truck } from 'lucide-react';
import Image from 'next/image';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { MultiSelect, type MultiSelectOption } from '@/components/ui/multi-select';
import { format } from 'date-fns';

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
    const { lastOrder, setLastOrder, drivers, addReservation } = useAppContext();
    const [isScanning, setIsScanning] = useState(true);
    const [selectedDrivers, setSelectedDrivers] = useState<Record<string, string[]>>({});
    const router = useRouter();
    const { toast } = useToast();

    // This effect ensures that we only show the page if there's an active order.
    // It also handles the scanning animation.
    useEffect(() => {
        const hasOrder = lastOrder && Object.keys(lastOrder).length > 0;
        
        if (!hasOrder) {
            router.replace('/dashboard/ngo/cart');
            return;
        }

        const scanTimeout = setTimeout(() => {
            setIsScanning(false);
        }, 3000);

        return () => clearTimeout(scanTimeout);

    }, [lastOrder, router]);
    
    const handleConfirmAssignments = () => {
        Object.entries(lastOrder).forEach(([providerName, orderGroup]) => {
            orderGroup.items.forEach(item => {
                const driverIds = selectedDrivers[providerName] || [];
                // For this demo, we'll just assign the first selected driver.
                // A real app might notify all and let the first accept.
                const assignedDriver = drivers.find(d => d.id === driverIds[0]);

                if (assignedDriver) {
                    addReservation({
                        id: `RES-${Date.now()}-${item.offer.id}`,
                        item: item.offer.item,
                        quantity: item.quantity,
                        quantityUnit: item.offer.quantityUnit,
                        provider: providerName,
                        providerLogo: orderGroup.provider.logo,
                        providerAddress: item.offer.location, // simplified
                        providerContact: { name: 'Provider Contact', phone: '999-999-9999' },
                        status: 'Awaiting Pickup',
                        pickupTime: `Today, ${format(new Date(), 'p')}`, // Simplified
                        ngo: 'Helping Hands Foundation', // Mocked
                        ngoAddress: 'Jayanagar, Bangalore', // Mocked
                        driverName: assignedDriver.name,
                        driverAvatar: assignedDriver.avatar,
                    });
                }
            });
        });

        toast({
            title: "Drivers Notified!",
            description: "All selected drivers have been notified. The first to accept will be assigned the pickup.",
        });
        setLastOrder({});
        router.push("/dashboard/ngo/reservations");
    }

    const availableDrivers = drivers
        .filter(d => d.status === 'active')
        .map(d => ({...d, distance: `${(Math.random() * 5 + 1).toFixed(1)} km away`})) // Add mock distance
        .sort((a,b) => parseFloat(a.distance) - parseFloat(b.distance));

    const driverOptions: MultiSelectOption[] = availableDrivers.map(driver => ({
        value: driver.id,
        label: (
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
        )
    }));
    
    const handleDriverSelection = (providerName: string, value: string[]) => {
        setSelectedDrivers(prev => ({...prev, [providerName]: value}));
    }
    
    const hasOrder = lastOrder && Object.keys(lastOrder).length > 0;
    
    if (!hasOrder) {
        // Render nothing or a loading spinner while redirecting
        return null;
    }


    return (
        <Card>
            <CardHeader>
                <CardTitle>Notify Drivers for Pickup</CardTitle>
                <CardDescription>Select one or more available drivers to notify for each pickup. The first driver to accept will get the task.</CardDescription>
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
                                            <label className="text-sm font-medium">Notify Drivers</label>
                                            <MultiSelect
                                                options={driverOptions}
                                                placeholder="Select drivers to notify..."
                                                emptyIndicator="No drivers available."
                                                onValueChange={(value) => handleDriverSelection(provider.name, value)}
                                            />
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                        <div className="lg:col-span-1">
                             <Card className="sticky top-24">
                                <CardHeader>
                                    <CardTitle className="text-lg">Summary</CardTitle>
                                    <CardDescription>Confirm to send out notifications for all pickups.</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {availableDrivers.slice(0, 3).map(driver => (
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
                                    {availableDrivers.length > 3 && <p className="text-sm text-muted-foreground">+ {availableDrivers.length-3} more drivers available</p>}
                                    <Separator />
                                    <Button className="w-full" size="lg" onClick={handleConfirmAssignments}>Confirm & Notify Drivers</Button>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
