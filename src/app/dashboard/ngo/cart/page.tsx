
'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useAppContext, CartItem } from "@/context/app-context";
import { useToast } from "@/hooks/use-toast";
import { MapPin, X, ArrowLeft, Building, Truck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo } from "react";

export type GroupedOrder = Record<string, { provider: { name: string; logo: string; location: string; }; items: CartItem[]; }>;

export default function CartPage() {
    const { cart, setCart, offers, setOffers, setPendingOrder } = useAppContext();
    const { toast } = useToast();
    const router = useRouter();

    const handleRemoveFromCart = (offerId: string) => {
        setCart(cart.filter(item => item.offer.id !== offerId));
        toast({
            variant: "destructive",
            title: "Item Removed",
            description: "The item has been removed from your cart.",
        });
    };

    const handleConfirmPickup = () => {
        // Group items by provider
        const groupedByProvider = cart.reduce((acc, currentItem) => {
            const providerName = currentItem.offer.provider;
            if (!acc[providerName]) {
                acc[providerName] = {
                    provider: {
                        name: currentItem.offer.provider,
                        logo: currentItem.offer.providerLogo,
                        location: currentItem.offer.location
                    },
                    items: []
                };
            }
            acc[providerName].items.push(currentItem);
            return acc;
        }, {} as GroupedOrder);

        
        // Update offer quantities
        const updatedOffers = offers.map(originalOffer => {
            const cartItem = cart.find(item => item.offer.id === originalOffer.id);
            if (cartItem) {
                const newQuantity = originalOffer.quantity - cartItem.quantity;
                return { 
                    ...originalOffer, 
                    quantity: newQuantity,
                    status: newQuantity <= 0 ? 'Reserved' : originalOffer.status,
                };
            }
            return originalOffer;
        }).filter(offer => offer.quantity > 0); // Remove offers with 0 quantity

        setOffers(updatedOffers);

        // Set the pending order for the driver assignment page
        setPendingOrder(groupedByProvider);
        
        // Clear cart after all processing is done
        setCart([]);

        // Navigate to driver assignment page
        router.push("/dashboard/ngo/assign-driver");
    };

    const groupedByProvider = useMemo(() => {
        return cart.reduce((acc, currentItem) => {
            const providerName = currentItem.offer.provider;
            if (!acc[providerName]) {
                acc[providerName] = {
                    provider: {
                        name: currentItem.offer.provider,
                        logo: currentItem.offer.providerLogo,
                        location: currentItem.offer.location
                    },
                    items: []
                };
            }
            acc[providerName].items.push(currentItem);
            return acc;
        }, {} as GroupedOrder);
    }, [cart]);


    if (cart.length === 0) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Your Cart is Empty</CardTitle>
                    <CardDescription>Browse for surplus food to add items to your cart.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Button asChild>
                        <Link href="/dashboard/ngo/browse">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Browsing
                        </Link>
                    </Button>
                </CardContent>
            </Card>
        );
    }
    
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);


    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-6">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold font-headline">Your Pickup Cart</h1>
                    <Button variant="link" asChild>
                         <Link href="/dashboard/ngo/browse">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Continue Browsing
                        </Link>
                    </Button>
                </div>
                {Object.values(groupedByProvider).map(({ provider, items }) => (
                    <Card key={provider.name}>
                        <CardHeader className="flex flex-row items-center gap-4">
                            <Image src={provider.logo} alt={provider.name} width={40} height={40} className="rounded-full" />
                            <div>
                                <CardTitle className="text-lg">{provider.name}</CardTitle>
                                <CardDescription className="flex items-center gap-2">
                                    <MapPin size={14} /> {provider.location}
                                </CardDescription>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Item</TableHead>
                                        <TableHead>Quantity</TableHead>
                                        <TableHead className="text-right"></TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {items.map(({ offer, quantity }) => (
                                        <TableRow key={offer.id}>
                                            <TableCell className="font-medium">{offer.item}</TableCell>
                                            <TableCell>{quantity} {offer.quantityUnit}</TableCell>
                                            <TableCell className="text-right">
                                                <Button variant="ghost" size="icon" onClick={() => handleRemoveFromCart(offer.id)}>
                                                    <X className="h-4 w-4 text-muted-foreground" />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="md:col-span-1">
                <Card className="sticky top-24">
                    <CardHeader>
                        <CardTitle>Order Summary</CardTitle>
                        <CardDescription>Finalize your pickup request.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                         <div className="flex justify-between items-center">
                            <span className="text-muted-foreground">Total Providers</span>
                            <span className="font-semibold">{Object.keys(groupedByProvider).length}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-muted-foreground">Total Items</span>
                            <span className="font-semibold">{cart.length}</span>
                        </div>
                        <Separator />
                        <p className="text-xs text-muted-foreground">
                            Once confirmed, you will be asked to select drivers for this pickup.
                        </p>
                    </CardContent>
                    <CardFooter>
                        <Button className="w-full" size="lg" onClick={handleConfirmPickup}>
                            <Truck className="mr-2 h-4 w-4" />
                            Confirm & Select Drivers
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
}
