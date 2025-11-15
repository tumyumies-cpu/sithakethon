
'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { MoreHorizontal, PlusCircle } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { DriverFormDialog } from '@/components/driver-form-dialog';
import { Driver, useAppContext } from '@/context/app-context';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';


export default function ManageDriversPage() {
  const { drivers, setDrivers } = useAppContext();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);

  const handleAddNew = () => {
    setSelectedDriver(null);
    setDialogOpen(true);
  };

  const handleEdit = (driver: Driver) => {
    setSelectedDriver(driver);
    setDialogOpen(true);
  };

  const handleDelete = (driverId: string) => {
    setDrivers(prev => prev.filter(d => d.id !== driverId));
  };
  
  const handleToggleStatus = (driverId: string, currentStatus: 'active' | 'inactive') => {
    setDrivers(prev => prev.map(d => d.id === driverId ? {...d, status: currentStatus === 'active' ? 'inactive' : 'active'} : d))
  };

  const handleSaveDriver = (driverData: Driver) => {
    if (selectedDriver) {
      // Update existing driver
      setDrivers(prev => prev.map(d => d.id === driverData.id ? driverData : d));
    } else {
      // Add new driver
      setDrivers(prev => [...prev, { ...driverData, id: `DRV-0${prev.length + 1}` }]);
    }
  };

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Manage Drivers</CardTitle>
            <CardDescription>Add, edit, and manage your team of volunteer drivers.</CardDescription>
          </div>
          <Button onClick={handleAddNew}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add New Driver
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Driver</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Vehicle</TableHead>
                <TableHead className='text-center'>Status</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {drivers.map(driver => (
                <TableRow key={driver.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={driver.avatar} alt={driver.name} />
                        <AvatarFallback>{driver.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{driver.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>{driver.phone}</TableCell>
                  <TableCell>{driver.vehicleId}</TableCell>
                  <TableCell className='text-center'>
                    <div className='flex flex-col items-center gap-1'>
                        <Switch
                            checked={driver.status === 'active'}
                            onCheckedChange={() => handleToggleStatus(driver.id, driver.status)}
                            aria-label="Toggle driver status"
                        />
                         <Badge variant={driver.status === 'active' ? 'success' : 'secondary'}>
                            {driver.status}
                        </Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button aria-haspopup="true" size="icon" variant="ghost">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEdit(driver)}>Edit</DropdownMenuItem>
                         <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button variant="ghost" className="w-full justify-start text-sm font-normal px-2 py-1.5 text-red-600 hover:text-red-600 focus-visible:ring-red-500">
                                    Delete
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This action cannot be undone. This will permanently delete the driver from your records.
                                </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                    onClick={() => handleDelete(driver.id)}
                                    className="bg-red-600 hover:bg-red-700"
                                >
                                    Delete
                                </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <DriverFormDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        driver={selectedDriver}
        onSave={handleSaveDriver}
      />
    </>
  );
}
