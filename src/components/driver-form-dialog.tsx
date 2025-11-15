
'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Driver } from '@/context/app-context';
import { useToast } from '@/hooks/use-toast';

const driverFormSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  phone: z.string().min(10, { message: 'Phone number must be at least 10 digits.' }),
  vehicleId: z.string().min(2, { message: 'Vehicle ID is required.' }),
});

type DriverFormValues = z.infer<typeof driverFormSchema>;

interface DriverFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  driver: Driver | null;
  onSave: (data: Driver) => void;
}

export function DriverFormDialog({ open, onOpenChange, driver, onSave }: DriverFormDialogProps) {
  const { toast } = useToast();

  const form = useForm<DriverFormValues>({
    resolver: zodResolver(driverFormSchema),
    defaultValues: {
      name: '',
      phone: '',
      vehicleId: '',
    },
  });

  useEffect(() => {
    if (driver) {
      form.reset(driver);
    } else {
      form.reset({ name: '', phone: '', vehicleId: '' });
    }
  }, [driver, open, form]);

  const handleSubmit = (data: DriverFormValues) => {
    const driverId = driver ? driver.id : `DRV-TEMP-${Date.now()}`;
    onSave({
      ...data,
      id: driverId,
      avatar: driver?.avatar || `https://picsum.photos/seed/${data.name.replace(/\s/g, '')}/100/100`,
      status: driver?.status || 'active',
    });
    toast({
      title: driver ? 'Driver Updated' : 'Driver Added',
      description: `${data.name} has been successfully ${driver ? 'updated' : 'added'}.`,
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{driver ? 'Edit Driver' : 'Add New Driver'}</DialogTitle>
          <DialogDescription>
            {driver ? "Update the driver's details below." : 'Fill in the details for the new driver.'}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 py-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Ravi Kumar" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input type="tel" placeholder="e.g., +91 98765 43210" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="vehicleId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Vehicle ID / License Plate</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., KA 01 AB 1234" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="button" variant="ghost" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit">Save Driver</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
