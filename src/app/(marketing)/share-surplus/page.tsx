
import { CreateOfferForm } from '@/components/create-offer-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function ShareSurplusPage() {
  return (
    <div className="container py-12 md:py-16">
      <div className="mx-auto max-w-3xl">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline text-3xl">Share Surplus Food</CardTitle>
            <CardDescription>
              Thank you for making a difference! Please fill out the form below to list your surplus food.
              An NGO in need will be notified.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CreateOfferForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
