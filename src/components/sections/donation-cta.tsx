
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Check } from 'lucide-react';

const csrPackages = [
  {
    name: 'Bronze Partner',
    price: '₹5,000',
    features: ['Sponsor 25 pickups', 'Logo on our partners page', 'Basic impact report'],
  },
  {
    name: 'Silver Partner',
    price: '₹15,000',
    features: ['Sponsor 75 pickups', 'Featured partner listing', 'Detailed quarterly reports'],
    popular: true,
  },
  {
    name: 'Gold Partner',
    price: '₹50,000',
    features: ['Sponsor 250 pickups', 'Co-branded social media post', 'Custom impact dashboard'],
  },
];

export default function DonationCta() {
  return (
    <section className="py-16 sm:py-24">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">
            Power Our Mission
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Your contribution funds the logistics, technology, and people that make every single pickup possible.
          </p>
        </div>

        <div className="mt-12 mx-auto max-w-md text-center">
             <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Fund a Pickup</CardTitle>
                    <CardDescription>₹200 covers one local pickup and helps feed ~20 people.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Button asChild size="lg" className="w-full">
                        <Link href="/donate">Donate Now</Link>
                    </Button>
                    <p className="mt-4 text-xs text-muted-foreground">One-time and recurring options available.</p>
                </CardContent>
             </Card>
        </div>

        <div className="mt-20 text-center">
            <h3 className="font-headline text-2xl font-bold tracking-tight">Corporate CSR Packages</h3>
            <p className="mt-2 text-muted-foreground">Partner with us to make a large-scale impact.</p>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {csrPackages.map((pkg) => (
            <Card key={pkg.name} className={pkg.popular ? 'border-primary' : ''}>
              <CardHeader>
                {pkg.popular && <p className="text-sm font-semibold text-primary">Most Popular</p>}
                <CardTitle className="font-headline">{pkg.name}</CardTitle>
                <p className="text-3xl font-bold">{pkg.price}<span className="text-sm font-normal text-muted-foreground">/month</span></p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {pkg.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm">
                      <Check className="h-4 w-4 text-primary" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button asChild className="mt-6 w-full" variant={pkg.popular ? 'default' : 'outline'}>
                  <Link href="/contact?subject=CSR">Contact Sales</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
