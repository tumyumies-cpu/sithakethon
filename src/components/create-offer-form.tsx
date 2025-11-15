
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, Loader2, Upload } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { createOffer } from '@/app/dashboard/provider/actions';
import React, { useState } from 'react';
import Image from 'next/image';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';

const createOfferFormSchema = z.object({
  foodName: z.string().min(2, { message: 'Food name must be at least 2 characters.' }),
  category: z.enum(['cooked', 'raw', 'packaged', 'bakery', 'other'], { required_error: 'Please select a category.' }),
  dietaryType: z.enum(['veg', 'non-veg'], { required_error: 'Please select veg or non-veg.' }),
  quantity: z.string().min(1, { message: 'Please enter an estimated quantity.' }),
  timeCooked: z.date({ required_error: 'Time cooked is required.' }),
  bestBefore: z.date({ required_error: 'A best before date is required.' }),
  foodCondition: z.string().min(1, { message: 'Food condition is required.' }),
  photo: z.any().refine(file => file instanceof File && file.size > 0, 'Photo is required.'),
  pickupAddress: z.string().min(5, { message: 'Pickup address is required.' }),
  landmark: z.string().optional(),
  pickupTimeSlot: z.string().min(3, { message: 'Pickup time slot is required. e.g. 4 PM - 6 PM' }),
  contactPerson: z.string().min(2, { message: 'Contact person name is required.' }),
  contactPhone: z.string().min(10, { message: 'A valid phone number is required.' }),
});

type CreateOfferFormValues = z.infer<typeof createOfferFormSchema>;

export function CreateOfferForm({ onSuccess }: { onSuccess?: () => void }) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  const form = useForm<CreateOfferFormValues>({
    resolver: zodResolver(createOfferFormSchema),
    defaultValues: {
      foodName: '',
      quantity: '',
      foodCondition: '',
      pickupAddress: '',
      landmark: '',
      pickupTimeSlot: '',
      contactPerson: '',
      contactPhone: '',
    },
  });

  const photoRef = form.register('photo');

  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      form.setValue('photo', file);
      form.trigger('photo');
    }
  };

  async function onSubmit(data: CreateOfferFormValues) {
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (value instanceof Date) {
          formData.append(key, value.toISOString());
        } else if (value) {
          formData.append(key, value);
        }
      });
      
      const result = await createOffer(formData);

      if (result.success) {
        toast({
          title: 'Offer Created Successfully!',
          description: `Your offer for "${data.foodName}" has been listed. AI confidence: ${result.aiCheck?.confidence.toFixed(2)}.`,
        });
        onSuccess?.();
        form.reset();
        setPhotoPreview(null);
      } else {
        throw new Error(result.error || 'An unknown error occurred.');
      }
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: error.message || 'Could not create the offer.',
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <h4 className="font-medium">1. Food Details</h4>
          <FormField
            control={form.control}
            name="foodName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Food Name / Type</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Vegetable Biryani" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="cooked">Cooked</SelectItem>
                      <SelectItem value="raw">Raw</SelectItem>
                      <SelectItem value="packaged">Packaged</SelectItem>
                      <SelectItem value="bakery">Bakery</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quantity</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., 5 kg or 10 servings" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
              control={form.control}
              name="dietaryType"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Veg / Non-Veg</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex items-center space-x-4"
                    >
                      <FormItem className="flex items-center space-x-2 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="veg" />
                        </FormControl>
                        <FormLabel className="font-normal">Veg</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-2 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="non-veg" />
                        </FormControl>
                        <FormLabel className="font-normal">Non-Veg</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
        </div>

        <div className="space-y-4">
          <h4 className="font-medium">2. Safety & Time Information</h4>
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="timeCooked"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Time Cooked</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={'outline'}
                          className={cn(
                            'w-full pl-3 text-left font-normal',
                            !field.value && 'text-muted-foreground'
                          )}
                        >
                          {field.value ? format(field.value, 'PPP') : <span>Pick a date</span>}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => date > new Date() || date < new Date('2000-01-01')}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="bestBefore"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Best Before / Expiry</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={'outline'}
                          className={cn(
                            'w-full pl-3 text-left font-normal',
                            !field.value && 'text-muted-foreground'
                          )}
                        >
                          {field.value ? format(field.value, 'PPP') : <span>Pick a date</span>}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => date < new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
           <FormField
              control={form.control}
              name="foodCondition"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Food Condition</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Freshly cooked, well-packed" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
        </div>

        <div className="space-y-4">
          <h4 className="font-medium">3. Photo</h4>
          <FormField
            control={form.control}
            name="photo"
            render={() => (
              <FormItem>
                <FormLabel>Upload at least 1 photo</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type="file"
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      accept="image/*"
                      onChange={handlePhotoChange}
                      {...photoRef}
                    />
                    <div className="flex items-center justify-center w-full h-32 border-2 border-dashed rounded-lg text-muted-foreground">
                      {photoPreview ? (
                        <Image src={photoPreview} alt="Preview" width={100} height={100} className="object-contain h-full" />
                      ) : (
                        <div className="text-center">
                          <Upload className="mx-auto h-8 w-8" />
                          <p>Click to upload a photo</p>
                        </div>
                      )}
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-4">
          <h4 className="font-medium">4. Pickup Details</h4>
           <FormField
            control={form.control}
            name="pickupAddress"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Pickup Address</FormLabel>
                <FormControl>
                  <Textarea placeholder="Full address for pickup" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="landmark"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Landmark (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Near City Mall" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="pickupTimeSlot"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pickup Time Slot</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., 4 PM - 6 PM" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="contactPerson"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact Person</FormLabel>
                  <FormControl>
                    <Input placeholder="Name of person at pickup" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="contactPhone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact Phone</FormLabel>
                  <FormControl>
                    <Input type="tel" placeholder="Phone number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Save and Create Offer
        </Button>
      </form>
    </Form>
  );
}
