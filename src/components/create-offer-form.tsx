
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
import { Separator } from './ui/separator';

const createOfferFormSchema = z.object({
  foodName: z.string().min(2, { message: 'Food name must be at least 2 characters.' }),
  category: z.enum(['cooked', 'raw', 'packaged', 'bakery', 'other'], { required_error: 'Please select a category.' }),
  dietaryType: z.enum(['veg', 'non-veg'], { required_error: 'Please select veg or non-veg.' }),
  quantity: z.preprocess(
    (a) => parseFloat(z.string().parse(a)),
    z.number().positive({ message: 'Quantity must be a positive number.' })
  ),
  timeCooked: z.date({ required_error: 'Time cooked is required.' }),
  bestBefore: z.date({ required_error: 'A best before date is required.' }),
  foodCondition: z.string().min(1, { message: 'Food condition is required.' }),
  photo: z.any().refine(file => file instanceof File && file.size > 0, 'Photo is required.'),
  pickupAddress: z.string().min(5, { message: 'Pickup address is required.' }),
  landmark: z.string().min(3, { message: 'Landmark is required.' }),
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
      quantity: 0,
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
  
  const handleDateChange = (field: any, date: Date | undefined) => {
    if (!date) return;
    const currentFieldValue = field.value || new Date();
    currentFieldValue.setFullYear(date.getFullYear());
    currentFieldValue.setMonth(date.getMonth());
    currentFieldValue.setDate(date.getDate());
    field.onChange(currentFieldValue);
  };
  
  const handleTimeChange = (field: any, time: string) => {
    const [hours, minutes] = time.split(':').map(Number);
    const newDate = field.value || new Date();
    newDate.setHours(hours);
    newDate.setMinutes(minutes);
    field.onChange(new Date(newDate));
  };


  async function onSubmit(data: CreateOfferFormValues) {
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (value instanceof Date) {
          formData.append(key, value.toISOString());
        } else if(key === 'quantity') {
          formData.append(key, String(value));
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 pr-1">
        <div className="space-y-4">
          <h4 className="font-medium text-lg">Food Details</h4>
          <FormField
            control={form.control}
            name="foodName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Food Name / Type</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Vegetable Biryani, Chapati, Sandwiches" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a food category" />
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
                  <FormLabel>Quantity (in kg)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="e.g., 5" {...field} onChange={e => field.onChange(e.target.value)} />
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
                  <FormLabel>Dietary Type</FormLabel>
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

        <Separator />

        <div className="space-y-4">
          <h4 className="font-medium text-lg">Safety & Time Information</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                            'w-full justify-start pl-3 text-left font-normal',
                            !field.value && 'text-muted-foreground'
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {field.value ? format(field.value, 'PPP p') : <span>Pick a date and time</span>}
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={(date) => handleDateChange(field, date)}
                        disabled={(date) => date > new Date() || date < new Date('2000-01-01')}
                        initialFocus
                      />
                      <div className="p-3 border-t border-border">
                        <Input 
                          type="time"
                          onChange={(e) => handleTimeChange(field, e.target.value)}
                          defaultValue={field.value ? format(field.value, 'HH:mm') : ''}
                        />
                      </div>
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
                            'w-full justify-start pl-3 text-left font-normal',
                            !field.value && 'text-muted-foreground'
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {field.value ? format(field.value, 'PPP p') : <span>Pick a date and time</span>}
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={(date) => handleDateChange(field, date)}
                        disabled={(date) => date < new Date()}
                        initialFocus
                      />
                       <div className="p-3 border-t border-border">
                        <Input 
                          type="time"
                          onChange={(e) => handleTimeChange(field, e.target.value)}
                          defaultValue={field.value ? format(field.value, 'HH:mm') : ''}
                        />
                      </div>
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
                   <FormDescription>
                    Describe the condition of the food (e.g., hot, cold, packed).
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
           <FormField
            control={form.control}
            name="photo"
            render={() => (
              <FormItem>
                <FormLabel>Food Photo</FormLabel>
                 <FormDescription>
                    Upload at least one clear photo of the food item.
                  </FormDescription>
                <FormControl>
                  <div className="relative">
                    <Input
                      type="file"
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      accept="image/*"
                      onChange={handlePhotoChange}
                      {...photoRef}
                    />
                    <div className="flex items-center justify-center w-full h-48 border-2 border-dashed rounded-lg text-muted-foreground bg-muted/50">
                      {photoPreview ? (
                        <Image src={photoPreview} alt="Preview" width={150} height={150} className="object-contain h-full p-2" />
                      ) : (
                        <div className="text-center">
                          <Upload className="mx-auto h-8 w-8" />
                          <p>Click or drag to upload a photo</p>
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

        <Separator />

        <div className="space-y-4">
          <h4 className="font-medium text-lg">Pickup Details</h4>
           <FormField
            control={form.control}
            name="pickupAddress"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Pickup Address</FormLabel>
                <FormControl>
                  <Textarea placeholder="Enter the full address for pickup" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="landmark"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Landmark</FormLabel>
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
                    <Input placeholder="e.g., 4:00 PM - 6:00 PM" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="contactPerson"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact Person</FormLabel>
                  <FormControl>
                    <Input placeholder="Name of person at pickup location" {...field} />
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
                    <Input type="tel" placeholder="Phone number for coordination" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Save and Create Offer
        </Button>
      </form>
    </Form>
  );
}
