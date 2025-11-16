
'use client';

import { useEffect, useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAppContext } from '@/context/app-context';
import { useRouter } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MapPin, Truck, Users, CheckCircle } from 'lucide-react';
import Image from 'next/image';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { MultiSelect, type MultiSelectOption } from '@/components/ui/multi-select';
import Link from 'next/link';

function DriverScanner() {
    return (
        <div className="flex flex-col items-center justify-center gap-4 text-center py-12">
            <div className="relative h-48 w-48">
                <div className="absolute inset-0 rounded-full bg-primary/10 animate-pulse"></div>
                <div className="absolute inset-4 rounded-full bg-primary/20 animate-pulse [animation-delay:200ms]"></div>
                <div className="absolute inset-8 flex items-center justify-center rounded-full bg-background">
                    <Truck className="h-16 w-16 text-primary" />
                </div>
                <div className="absolute inset-0 h-full w-full rounded-full overflow-hidden">
                    <div className="absolute top-0 left-1/2 h-1/2 w-px bg-gradient-to-b from-primary/80 to-transparent animate-[spin_3s_linear_infinite]" style={{ transformOrigin: 'bottom center' }}></div>
                </div>
            </div>
            <h3 className="text-xl font-semibold mt-4">Scanning for Nearby Drivers...</h3>
            <p className="text-muted-foreground max-w-sm">Our system is finding the best-suited and closest available volunteer drivers for your pickup requests.</p>
        </div>
    )
}

export default function AssignDriverPage() {
    const { drivers, addTask, pendingOrder, setPendingOrder, user } = useAppContext();
    const [isScanning, setIsScanning] = useState(true);
    const [selectedDrivers, setSelectedDrivers] = useState<Record<string, string[]>>({});
    const router = useRouter();
    const { toast } = useToast();

     useEffect(() => {
        const timer = setTimeout(() => {
            setIsScanning(false);
        }, 2500); // Simulate scanning for 2.5 seconds
        return () => clearTimeout(timer);
    }, []);

    const availableDrivers = useMemo(() => drivers
        .filter(d => d.status === 'active')
        .map(d => ({...d, distance: `${(Math.random() * 5 + 1).toFixed(1)} km away`})) // Add mock distance
        .sort((a,b) => parseFloat(a.distance) - parseFloat(b.distance)), [drivers]);

    const driverOptions: MultiSelectOption[] = useMemo(() => availableDrivers.map(driver => ({
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
    })), [availableDrivers]);
    
    const handleDriverSelection = (providerName: string, value: string[]) => {
        setSelectedDrivers(prev => ({...prev, [providerName]: value}));
    };

    const handleConfirmAssignments = () => {
        if (!pendingOrder) return;
        
        // This is where you would normally iterate over `selectedDrivers` and notify them.
        // For our flow, we'll convert the pending order into available tasks.

        Object.values(pendingOrder).forEach(({ provider, items }) => {
            const newTask = {
                id: `TASK-${Date.now()}-${provider.name}`,
                provider: provider.name,
                providerLogo: provider.logo,
                pickupLocation: provider.location,
                distance: `${(Math.random() * 5 + 1).toFixed(1)} km`,
                items: items.map(item => ({
                    name: item.offer.item,
                    quantity: `${item.quantity} ${item.offer.quantityUnit}`,
                })),
                ngo: user.name === 'Jane Doe' ? 'Helping Hands Foundation' : user.name,
                pickupWindow: '4:00 PM - 5:00 PM', // This should come from the offer ideally
            };
            addTask(newTask);
        });

        toast({
            title: "Drivers Notified!",
            description: "The selected drivers have been notified. The first to accept will be assigned.",
        });

        setPendingOrder(null); // Clear the pending order
        router.push("/dashboard/ngo/reservations");
    };

    if (!pendingOrder && !isScanning) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>No Pending Pickups</CardTitle>
                    <CardDescription>There are no pickups waiting for driver assignment.</CardDescription>
                </CardHeader>
                <CardContent>
                     <Button asChild>
                        <Link href="/dashboard/ngo/cart">Back to Cart</Link>
                    </Button>
                </CardContent>
            </Card>
        )
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Assign Drivers for Pickup</CardTitle>
                <CardDescription>Select one or more available drivers to notify for each pickup. The first driver to accept will get the task.</CardDescription>
            </CardHeader>
            <CardContent>
                {isScanning ? (
                    <DriverScanner />
                ) : (
                    <div className="space-y-6">
                        {pendingOrder && Object.values(pendingOrder).map(({ provider, items }) => (
                             <Card key={provider.name} className="bg-muted/50">
                                <CardHeader className="flex flex-row items-center gap-4 pb-4">
                                     <Image src={provider.logo} alt={provider.name} width={40} height={40} className="rounded-full" />
                                    <div>
                                        <h3 className="font-semibold text-lg">{provider.name}</h3>
                                        <p className="text-sm text-muted-foreground flex items-center gap-2"><MapPin size={14} /> {provider.location}</p>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm font-medium mb-2">Items to be picked up:</p>
                                    <ul className="list-disc list-inside text-sm text-muted-foreground mb-4">
                                        {items.map(item => (
                                            <li key={item.offer.id}>{item.quantity} {item.offer.quantityUnit} of {item.offer.item}</li>
                                        ))}
                                    </ul>
                                    <Separator className="my-4" />
                                     <div>
                                        <p className="text-sm font-medium mb-2 flex items-center gap-2"><Users size={16}/> Select drivers to notify</p>
                                        <MultiSelect
                                            options={driverOptions}
                                            onValueChange={(value) => handleDriverSelection(provider.name, value)}
                                            defaultValue={selectedDrivers[provider.name] || []}
                                            placeholder="Select drivers..."
                                            className="w-full"
                                        />
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </CardContent>
            {!isScanning && pendingOrder && (
                 <CardFooter>
                    <Button 
                        className="w-full" 
                        size="lg" 
                        onClick={handleConfirmAssignments}
                        disabled={Object.values(selectedDrivers).every(drivers => drivers.length === 0)}
                    >
                        <CheckCircle className="mr-2" />
                        Notify Drivers & Confirm
                    </Button>
                </CardFooter>
            )}
        </Card>
    );
}
