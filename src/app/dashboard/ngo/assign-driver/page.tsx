
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

// NOTE: This page is no longer used in the primary workflow but is kept for potential future use
// where an NGO might want to manually assign a specific driver. The primary flow now creates a task
// available to all drivers when an order is confirmed.
export default function AssignDriverPage() {
    const { drivers, addReservation } = useAppContext();
    const [isScanning, setIsScanning] = useState(true);
    const [selectedDrivers, setSelectedDrivers] = useState<Record<string, string[]>>({});
    const router = useRouter();
    const { toast } = useToast();
    
    // This page is deprecated, redirect to reservations
     useEffect(() => {
        router.replace('/dashboard/ngo/reservations');
    }, [router]);


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
    
    return (
        <Card>
            <CardHeader>
                <CardTitle>Notify Drivers for Pickup</CardTitle>
                <CardDescription>Select one or more available drivers to notify for each pickup. The first driver to accept will get the task.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="text-center py-12 text-muted-foreground">
                    This page is no longer in use. Tasks are now automatically created for all drivers.
                </div>
            </CardContent>
        </Card>
    );
}
