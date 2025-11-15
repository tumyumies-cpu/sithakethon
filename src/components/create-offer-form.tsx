
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

const createOfferFormSchema = z.object({
  foodItem: z.string().min(2, { message: 'Food item must be at least 2 characters.' }),
  foodType: z.enum(['cooked', 'packaged', 'produce', 'other']),
  weight: z.string().min(1, { message: 'Please enter an estimated weight.' }),
  bestBefore: z.date({ required_error: 'A best before date is required.' }),
  description: z.string().max(200, { message: 'Description cannot exceed 200 characters.' }).optional(),
  photo: z.any().refine(file => file instanceof File, 'Photo is required.'),
});

type CreateOfferFormValues = z.infer<typeof createOfferFormSchema>;

export function CreateOfferForm({ onSuccess }: { onSuccess?: () => void }) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  const form = useForm<CreateOfferFormValues>({
    resolver: zodResolver(createOfferFormSchema),
    defaultValues: {
      description: '',
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
    }
  };

  async function onSubmit(data: CreateOfferFormValues) {
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append('foodItem', data.foodItem);
      formData.append('foodType', data.foodType);
      formData.append('weight', data.weight);
      formData.append('bestBefore', data.bestBefore.toISOString());
      if (data.description) {
        formData.append('description', data.description);
      }
      formData.append('photo', data.photo);

      const result = await createOffer(formData);

      if (result.success) {
        toast({
          title: 'Offer Created Successfully!',
          description: `Your offer for "${data.foodItem}" has been listed. The AI check passed with ${result.aiCheck?.confidence.toFixed(2)} confidence.`,
        });
        onSuccess?.();
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="foodItem"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Food Item</FormLabel>
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
            name="foodType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Food Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="cooked">Cooked Meal</SelectItem>
                    <SelectItem value="packaged">Packaged</SelectItem>
                    <SelectItem value="produce">Fresh Produce</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="weight"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Weight</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., 5 kg" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="bestBefore"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Best Before Date</FormLabel>
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
                    disabled={(date) => date < new Date() || date < new Date('1900-01-01')}
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
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description (Optional)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Any extra details, like ingredients or allergens."
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="photo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Photo</FormLabel>
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

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Save and Create Offer
        </Button>
      </form>
    </Form>
  );
}
