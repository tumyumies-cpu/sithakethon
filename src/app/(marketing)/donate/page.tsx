

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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { CreditCard, Heart, Loader2, User, Mail } from 'lucide-react';
import React from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

const donationSchema = z.object({
  name: z.string().min(2, { message: 'Please enter your name.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  amount: z.string().refine(val => !isNaN(parseFloat(val)) && parseFloat(val) > 0, { message: 'Please enter a valid amount.' }),
  cardNumber: z.string().regex(/^\d{16}$/, { message: 'Please enter a valid 16-digit card number.' }),
  expiryDate: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, { message: 'Use MM/YY format.' }),
  cvc: z.string().regex(/^\d{3,4}$/, { message: 'Enter a valid CVC.' }),
});

type DonationFormValues = z.infer<typeof donationSchema>;

export default function DonatePage() {
  const { toast } = useToast();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [selectedAmount, setSelectedAmount] = React.useState('200');

  const form = useForm<DonationFormValues>({
    resolver: zodResolver(donationSchema),
    defaultValues: {
      name: '',
      email: '',
      amount: '200',
    }
  });

  const handleAmountChange = (value: string) => {
    setSelectedAmount(value);
    if (value !== 'custom') {
      form.setValue('amount', value, { shouldValidate: true });
    }
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    form.setValue('amount', value, { shouldValidate: true });
  };
  
  React.useEffect(() => {
    if (selectedAmount !== 'custom') {
      form.setValue('amount', selectedAmount, { shouldValidate: true });
    } else {
       // Let the custom input handle the value
       form.setValue('amount', form.getValues('amount') || '', { shouldValidate: true });
    }
  }, [selectedAmount, form]);


  async function onSubmit(data: DonationFormValues) {
    setIsSubmitting(true);
    console.log('Processing Donation:', data);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    toast({
      title: 'Thank You for Your Generosity!',
      description: `Your donation of ₹${data.amount} has been successfully processed. A confirmation has been sent to ${data.email}.`,
    });

    router.push('/');
    setIsSubmitting(false);
  }

  return (
    <div className="container py-12 md:py-16">
      <div className="mx-auto max-w-2xl">
        <Card>
          <CardHeader className="text-center">
            <Heart className="mx-auto h-12 w-12 text-primary" />
            <CardTitle className="font-headline text-3xl mt-4">Support Our Mission</CardTitle>
            <CardDescription>
              Your contribution powers the technology and people that rescue food and feed communities.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                
                <FormField
                  control={form.control}
                  name="amount"
                  render={() => (
                    <FormItem className="space-y-4">
                      <FormLabel className="text-lg font-medium">Choose an Amount</FormLabel>
                      <FormControl>
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                          {['200', '500', '1000'].map((value) => (
                            <button
                              type="button"
                              key={value}
                              onClick={() => handleAmountChange(value)}
                              className={cn(
                                "flex flex-col items-center justify-between rounded-md border-2 p-4 cursor-pointer transition-colors",
                                selectedAmount === value
                                  ? "border-primary bg-primary/10"
                                  : "border-muted bg-popover hover:bg-accent hover:text-accent-foreground"
                              )}
                            >
                              ₹{value}
                            </button>
                          ))}
                          <button
                            type="button"
                            onClick={() => handleAmountChange('custom')}
                            className={cn(
                              "flex flex-col items-center justify-between rounded-md border-2 p-4 cursor-pointer transition-colors",
                              selectedAmount === 'custom'
                                ? "border-primary bg-primary/10"
                                : "border-muted bg-popover hover:bg-accent hover:text-accent-foreground"
                            )}
                          >
                            Custom
                          </button>
                        </div>
                      </FormControl>
                       {selectedAmount === 'custom' && (
                          <div className="pt-2">
                            <FormLabel>Custom Amount (₹)</FormLabel>
                            <FormControl>
                                <Input 
                                    type="number" 
                                    placeholder="Enter amount"
                                    onChange={handleCustomAmountChange}
                                    autoFocus
                                    className="mt-2"
                                />
                            </FormControl>
                          </div>
                      )}
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Separator />
                
                <div className="space-y-4">
                    <h4 className="font-medium text-lg">Your Details</h4>
                    <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input placeholder="John Doe" {...field} className="pl-10" />
                            </div>
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
                           <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input type="email" placeholder="john.doe@example.com" {...field} className="pl-10" />
                            </div>
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                </div>

                <Separator />

                <div className="space-y-4">
                  <h4 className="font-medium text-lg">Payment Details</h4>
                  <FormField
                    control={form.control}
                    name="cardNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Card Number</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input placeholder="0000 0000 0000 0000" {...field} className="pl-10" />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="expiryDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Expiry</FormLabel>
                          <FormControl>
                            <Input placeholder="MM/YY" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="cvc"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>CVC</FormLabel>
                          <FormControl>
                            <Input placeholder="123" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                   <FormDescription className="text-xs">
                        This is a mock payment portal for demonstration purposes. Do not enter real credit card details.
                    </FormDescription>
                </div>


                <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                  {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {isSubmitting ? 'Processing...' : `Donate ₹${form.watch('amount') || '0'}`}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
