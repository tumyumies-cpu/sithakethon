

'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ListFilter, MapPin, ShoppingCart, Tag, Weight, Clock, Info } from "lucide-react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";

const offers = [
  {
    id: "OFF-002",
    item: "Surplus Bread & Pastries",
    provider: "City Bakery",
    location: "Koramangala, Bangalore",
    providerLogo: "https://picsum.photos/seed/p-logo1/40/40",
    foodPhoto: "https://picsum.photos/seed/food1/600/400",
    dietaryType: "veg",
    category: "Bakery",
    quantity: 10,
    quantityUnit: "kg",
    timeCooked: "Today, 6:00 AM",
    bestBefore: "Today, 8:00 PM",
  },
  {
    id: "OFF-005",
    item: "Paneer Butter Masala",
    provider: "The Grand Restaurant",
    location: "Indiranagar, Bangalore",
    providerLogo: "https://picsum.photos/seed/p-logo2/40/40",
    foodPhoto: "https://picsum.photos/seed/food2/600/400",
    dietaryType: "veg",
    category: "Cooked",
    quantity: 4,
    quantityUnit: "kg",
    timeCooked: "Today, 12:00 PM",
    bestBefore: "Today, 10:00 PM",
  },
  {
    id: "OFF-006",
    item: "Fresh Vegetables",
    provider: "Local Farm Co-op",
    location: "HSR Layout, Bangalore",
    providerLogo: "https://picsum.photos/seed/p-logo3/40/40",
    foodPhoto: "https://picsum.photos/seed/food3/600/400",
    dietaryType: "veg",
    category: "Raw",
    quantity: 25,
    quantityUnit: "kg",
    timeCooked: "N/A",
    bestBefore: "In 2 days",
  },
  {
    id: "OFF-007",
    item: "Chicken Biryani",
    provider: "Spicy Delights",
    location: "Koramangala, Bangalore",
    providerLogo: "https://picsum.photos/seed/p-logo4/40/40",
    foodPhoto: "https://picsum.photos/seed/food4/600/400",
    dietaryType: "non-veg",
    category: "Cooked",
    quantity: 8,
    quantityUnit: "kg",
    timeCooked: "Today, 1:00 PM",
    bestBefore: "Today, 11:00 PM",
  },
];

type Offer = typeof offers[0];

export default function BrowseOffersPage() {
    const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);
    const [bookingQuantity, setBookingQuantity] = useState(1);

    const handleBookingQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!selectedOffer) return;
        const value = Math.max(1, Math.min(selectedOffer.quantity, Number(e.target.value)));
        setBookingQuantity(value);
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Filters Sidebar */}
            <div className="lg:col-span-1">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><ListFilter size={20} /> Filters</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="search">Search</Label>
                            <Input id="search" placeholder="Search by food or provider..." />
                        </div>
                        <div className="space-y-2">
                            <Label>Dietary Type</Label>
                            <div className="flex items-center space-x-2">
                                <Checkbox id="veg" />
                                <Label htmlFor="veg" className="font-normal">Veg</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox id="non-veg" />
                                <Label htmlFor="non-veg" className="font-normal">Non-Veg</Label>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="category">Category</Label>
                            <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="All Categories" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="cooked">Cooked</SelectItem>
                                    <SelectItem value="raw">Raw</SelectItem>
                                    <SelectItem value="packaged">Packaged</SelectItem>
                                    <SelectItem value="bakery">Bakery</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="location">Location</Label>
                            <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="All Locations" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="koramangala">Koramangala</SelectItem>
                                    <SelectItem value="indiranagar">Indiranagar</SelectItem>
                                    <SelectItem value="hsr">HSR Layout</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <Button className="w-full">Apply Filters</Button>
                    </CardContent>
                </Card>
            </div>

            {/* Offers Grid */}
            <div className="lg:col-span-3">
                 <div className="mb-4">
                    <p className="text-sm text-muted-foreground">Showing {offers.length} available offers</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                    {offers.map(offer => (
                        <Card key={offer.id} className="flex flex-col overflow-hidden hover:shadow-lg transition-shadow duration-300">
                            <div className="relative w-full h-48 cursor-pointer" onClick={() => setSelectedOffer(offer)}>
                                <Image src={offer.foodPhoto} alt={offer.item} fill objectFit="cover" className="transition-transform duration-300 group-hover:scale-105" />
                                <Badge className={`absolute top-2 left-2 capitalize text-white ${offer.dietaryType === 'veg' ? 'bg-green-600' : 'bg-red-600'}`}>{offer.dietaryType}</Badge>
                            </div>
                            <CardHeader>
                                <CardTitle className="truncate">{offer.item}</CardTitle>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground pt-1">
                                    <Image src={offer.providerLogo} alt={offer.provider} width={20} height={20} className="rounded-full" />
                                    <span className="truncate">{offer.provider}</span>
                                </div>
                            </CardHeader>
                            <CardContent className="flex-grow">
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <MapPin size={14} /> <span className="truncate">{offer.location}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                                    <Weight size={14} /> <span>{offer.quantity} {offer.quantityUnit} available</span>
                                </div>
                            </CardContent>
                            <CardFooter className="flex-col items-start gap-2">
                                <Button className="w-full" onClick={() => setSelectedOffer(offer)}>
                                    <ShoppingCart size={16} className="mr-2"/>
                                    Book Now
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>

             {/* Offer Details Dialog */}
            {selectedOffer && (
                <Dialog open={!!selectedOffer} onOpenChange={() => setSelectedOffer(null)}>
                    <DialogContent className="sm:max-w-3xl">
                        <DialogHeader>
                            <DialogTitle className="text-2xl font-headline">{selectedOffer.item}</DialogTitle>
                            <DialogDescription className="flex items-center gap-2 text-base">
                                <Image src={selectedOffer.providerLogo} alt={selectedOffer.provider} width={24} height={24} className="rounded-full" />
                                From {selectedOffer.provider} in {selectedOffer.location}
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
                            <div className="relative w-full aspect-square rounded-lg overflow-hidden">
                                <Image src={selectedOffer.foodPhoto} alt={selectedOffer.item} layout="fill" objectFit="cover" />
                            </div>
                            <div className="flex flex-col gap-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="flex items-center gap-2">
                                        <Badge className={`capitalize text-white ${selectedOffer.dietaryType === 'veg' ? 'bg-green-600' : 'bg-red-600'}`}>{selectedOffer.dietaryType}</Badge>
                                    </div>
                                    <div className="flex items-center gap-2 text-muted-foreground"><Tag size={16}/> {selectedOffer.category}</div>
                                    <div className="flex items-center gap-2 text-muted-foreground"><Weight size={16}/> {selectedOffer.quantity} {selectedOffer.quantityUnit} available</div>
                                    <div className="flex items-center gap-2 text-muted-foreground"><Clock size={16}/> Expires: {selectedOffer.bestBefore}</div>
                                </div>
                                <Separator />
                                <div>
                                    <h4 className="font-semibold mb-2">Request Food</h4>
                                    <p className="text-sm text-muted-foreground mb-4">
                                        Specify the quantity you need. The remaining amount will be available for other NGOs.
                                    </p>
                                    <div className="flex items-center gap-4">
                                        <Label htmlFor="quantity" className="text-nowrap">Quantity ({selectedOffer.quantityUnit})</Label>
                                        <Input 
                                            id="quantity" 
                                            type="number" 
                                            value={bookingQuantity}
                                            onChange={handleBookingQuantityChange}
                                            min="1" 
                                            max={selectedOffer.quantity} 
                                            className="w-24"
                                        />
                                    </div>
                                </div>
                                <Separator />
                                <Button size="lg" className="w-full">
                                    <ShoppingCart size={18} className="mr-2" />
                                    Add to Cart & Book
                                </Button>
                                <p className="text-xs text-center text-muted-foreground">
                                    You can add items from multiple providers to your cart before finalizing.
                                </p>
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>
            )}
        </div>
    );
}
    