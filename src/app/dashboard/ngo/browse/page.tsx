

'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Clock, ListFilter, MapPin, ShoppingCart, Tag, Weight } from "lucide-react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";

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
    quantity: "10 kg",
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
    quantity: "4 kg",
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
    quantity: "25 kg",
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
    quantity: "8 kg",
    timeCooked: "Today, 1:00 PM",
    bestBefore: "Today, 11:00 PM",
  },
];


export default function BrowseOffersPage() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="md:col-span-1">
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
                                <Label htmlFor="veg">Veg</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox id="non-veg" />
                                <Label htmlFor="non-veg">Non-Veg</Label>
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
            <div className="md:col-span-3 space-y-4">
                 <div className="flex justify-between items-center">
                    <p className="text-sm text-muted-foreground">Showing {offers.length} offers</p>
                     <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline">Sort by: Best Before</Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Best Before</DropdownMenuItem>
                        <DropdownMenuItem>Quantity</DropdownMenuItem>
                        <DropdownMenuItem>Recently Added</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                {offers.map(offer => (
                    <Card key={offer.id}>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div className="sm:col-span-1 relative">
                                <Image src={offer.foodPhoto} alt={offer.item} fill objectFit="cover" className="rounded-l-lg" />
                                <Badge className={`absolute top-2 left-2 ${offer.dietaryType === 'veg' ? 'bg-green-500' : 'bg-red-500'} text-white`}>{offer.dietaryType}</Badge>
                            </div>
                            <div className="sm:col-span-2">
                                <CardHeader>
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <CardTitle>{offer.item}</CardTitle>
                                            <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                                                <Image src={offer.providerLogo} alt={offer.provider} width={20} height={20} className="rounded-full" />
                                                <span>{offer.provider}</span>
                                            </div>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent className="grid grid-cols-2 gap-4 text-sm">
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                        <MapPin size={14} /> <span>{offer.location}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                        <Tag size={14} /> <span>{offer.category}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                        <Weight size={14} /> <span>{offer.quantity}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                        <Clock size={14} /> <span>Expires: {offer.bestBefore}</span>
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <Button className="w-full">
                                        <ShoppingCart size={16} className="mr-2"/>
                                        Add to Cart
                                    </Button>
                                </CardFooter>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
}