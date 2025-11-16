
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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { Loader2, Upload } from 'lucide-react';
import React from 'react';
import { Separator } from '@/components/ui/separator';

const ngoRegistrationSchema = z.object({
  ngoName: z.string().min(3, { message: 'NGO name must be at least 3 characters.' }),
  registrationId: z.string().min(5, { message: 'Please enter a valid registration ID.' }),
  contactPerson: z.string().min(2, { message: 'Contact person name is required.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  phone: z.string().min(10, { message: 'A valid phone number is required.' }),
  address: z.string().min(10, { message: 'A full address is required.' }),
  city: z.string().min(2, { message: 'City is required.' }),
  about: z.string().min(20, { message: 'Please tell us a little about your organization (at least 20 characters).' }),
  documentation: z.any().optional(),
});

type NgoRegistrationValues = z.infer<typeof ngoRegistrationSchema>;

export default function RegisterNgoPage() {
  const { toast } = useToast();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const form = useForm<NgoRegistrationValues>({
    resolver: zodResolver(ngoRegistrationSchema),
  });

  async function onSubmit(data: NgoRegistrationValues) {
    setIsSubmitting(true);
    console.log('Submitting NGO Registration:', data);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    toast({
      title: 'Registration Submitted!',
      description: "Thank you! We've received your registration and will review it shortly. You will be notified via email upon approval.",
    });

    router.push('/');
    setIsSubmitting(false);
  }

  return (
    <div className="container py-12 md:py-16">
      <div className="mx-auto max-w-3xl">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline text-3xl">Register Your NGO</CardTitle>
            <CardDescription>
              Join our network to receive surplus food donations. Fill out the form below to get started.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                
                <div className="space-y-4">
                    <h4 className="font-medium text-lg">Organization Details</h4>
                    <FormField
                    control={form.control}
                    name="ngoName"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>NGO Name</FormLabel>
                        <FormControl>
                            <Input placeholder="e.g., Helping Hands Foundation" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name="registrationId"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>NGO Registration ID / Trust ID</FormLabel>
                        <FormControl>
                            <Input placeholder="Enter your official registration number" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                     <FormField
                    control={form.control}
                    name="about"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>About Your NGO</FormLabel>
                        <FormControl>
                            <Textarea placeholder="Briefly describe your mission and the community you serve." {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                </div>

                <Separator />

                <div className="space-y-4">
                    <h4 className="font-medium text-lg">Contact Information</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                        control={form.control}
                        name="contactPerson"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Contact Person</FormLabel>
                            <FormControl>
                                <Input placeholder="Full name of the contact" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                        <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Email Address</FormLabel>
                            <FormControl>
                                <Input type="email" placeholder="contact@yourngo.org" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                    </div>
                     <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                                <Input type="tel" placeholder="Primary contact number" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                </div>

                <Separator />

                <div className="space-y-4">
                    <h4 className="font-medium text-lg">Address Details</h4>
                     <FormField
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Full Address</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Enter the full operational address" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                    <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>City</FormLabel>
                            <FormControl>
                                <Input placeholder="e.g., Bangalore" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                </div>

                <Separator />
                
                 <div className="space-y-4">
                    <h4 className="font-medium text-lg">Verification Documents</h4>
                    <FormField
                        control={form.control}
                        name="documentation"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Upload Documents</FormLabel>
                            <FormDescription>
                                Please upload a copy of your NGO registration certificate or other identifying documents. (Optional)
                            </FormDescription>
                            <FormControl>
                            <Input type="file" className="pt-2" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                </div>


                <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                  {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Submit for Verification
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
