
'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { MoreHorizontal, PlusCircle, User, Building, Bike } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Mock Data
const providers = [
  { id: 'PRO-001', name: 'The Grand Restaurant', contact: 'manager@grand.com', status: 'active', joined: '2023-01-15', avatar: 'https://picsum.photos/seed/p-logo2/100/100' },
  { id: 'PRO-002', name: 'City Bakery', contact: 'contact@citybakery.com', status: 'active', joined: '2023-02-20', avatar: 'https://picsum.photos/seed/p-logo1/100/100' },
  { id: 'PRO-003', name: 'Local Farm Co-op', contact: 'info@localfarm.coop', status: 'inactive', joined: '2023-03-10', avatar: 'https://picsum.photos/seed/p-logo3/100/100' },
];

const ngos = [
  { id: 'NGO-001', name: 'Helping Hands Foundation', contact: 'contact@helpinghands.org', status: 'active', joined: '2023-01-20', avatar: 'https://picsum.photos/seed/ngo1/100/100' },
  { id: 'NGO-002', name: 'Good Samaritan Shelter', contact: 'admin@goodsamaritan.org', status: 'active', joined: '2023-02-25', avatar: 'https://picsum.photos/seed/ngo-generic/100/100' },
];

const drivers = [
    { id: 'DRV-01', name: 'Ravi Kumar', phone: '+91 98765 43210', vehicleId: 'KA 01 AB 1234', status: 'active', avatar: 'https://picsum.photos/seed/driver1/100/100' },
    { id: 'DRV-02', name: 'Sunita Sharma', phone: '+91 98765 43211', vehicleId: 'MH 02 CD 5678', status: 'active', avatar: 'https://picsum.photos/seed/driver2/100/100' },
    { id: 'DRV-03', name: 'Amit Patel', phone: '+91 98765 43212', vehicleId: 'GJ 03 EF 9012', status: 'inactive', avatar: 'https://picsum.photos/seed/driver3/100/100' },
];

const UserTable = ({ users, type }: { users: any[], type: 'provider' | 'ngo' | 'driver' }) => {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>{type === 'driver' ? 'Driver' : 'Organization'}</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead className='text-center'>Status</TableHead>
                    <TableHead>{type === 'driver' ? 'Vehicle ID' : 'Joined Date'}</TableHead>
                    <TableHead><span className="sr-only">Actions</span></TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {users.map((user) => (
                <TableRow key={user.id}>
                    <TableCell>
                        <div className="flex items-center gap-3">
                            <Avatar>
                                <AvatarImage src={user.avatar} alt={user.name} />
                                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <span className="font-medium">{user.name}</span>
                        </div>
                    </TableCell>
                    <TableCell>{type === 'driver' ? user.phone : user.contact}</TableCell>
                    <TableCell className='text-center'>
                        <Badge variant={user.status === 'active' ? 'success' : 'secondary'}>{user.status}</Badge>
                    </TableCell>
                    <TableCell>{type === 'driver' ? user.vehicleId : user.joined}</TableCell>
                    <TableCell>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button aria-haspopup="true" size="icon" variant="ghost">
                                    <MoreHorizontal className="h-4 w-4" />
                                    <span className="sr-only">Toggle menu</span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem>Edit</DropdownMenuItem>
                                <DropdownMenuItem>Set as {user.status === 'active' ? 'Inactive' : 'Active'}</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </TableCell>
                </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}

export default function UsersPage() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Users & Organizations</CardTitle>
          <CardDescription>Manage providers, NGOs, and drivers on the platform.</CardDescription>
        </div>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add New
        </Button>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="providers">
            <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="providers"><Building className="mr-2"/> Providers</TabsTrigger>
                <TabsTrigger value="ngos"><User className="mr-2"/> NGOs</TabsTrigger>
                <TabsTrigger value="drivers"><Bike className="mr-2"/> Drivers</TabsTrigger>
            </TabsList>
            <TabsContent value="providers">
                <UserTable users={providers} type="provider" />
            </TabsContent>
            <TabsContent value="ngos">
                 <UserTable users={ngos} type="ngo" />
            </TabsContent>
            <TabsContent value="drivers">
                 <UserTable users={drivers} type="driver" />
            </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
