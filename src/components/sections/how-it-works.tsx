import Image from 'next/image';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const steps = {
  providers: [
    { title: "Post in 60 Seconds", description: "List surplus food with a simple form, including photos and pickup times." },
    { title: "NGO Reserves", description: "Get notified instantly when an NGO claims your food donation." },
    { title: "Driver Picks Up", description: "A volunteer driver is assigned for a safe and timely pickup." },
    { title: "Delivered & Tracked", description: "Confirm delivery and see your impact on your dashboard." },
  ],
  ngos: [
    { title: "Discover & Filter", description: "Find nearby food surplus in real-time. Filter by diet, distance, and more." },
    { title: "Reserve in Cart", description: "Add items from multiple providers to your cart and book in one go." },
    { title: "Assign Driver", description: "Assign a verified volunteer driver or use your own logistics." },
    { title: "Confirm & Log", description: "Confirm delivery with a photo and log beneficiaries to track impact." },
  ],
  drivers: [
    { title: "Toggle Availability", description: "Go online in the app when you're ready to accept pickups." },
    { title: "Accept a Job", description: "Get notified of nearby pickup requests and accept with a single tap." },
    { title: "Photo-verified Pickup", description: "Follow guided steps, including photo uploads, for a secure handover." },
    { title: "Deliver & Earn", description: "Complete the delivery and earn tokens for your valuable time." },
  ]
};

const images = {
  providers: PlaceHolderImages.find(img => img.id === 'how-it-works-provider'),
  ngos: PlaceHolderImages.find(img => img.id === 'how-it-works-ngo'),
  drivers: PlaceHolderImages.find(img => img.id === 'how-it-works-driver'),
};

const ctas = {
  providers: { href: "/providers", label: "Learn More for Providers" },
  ngos: { href: "/ngos", label: "Learn More for NGOs" },
  drivers: { href: "/drivers", label: "Learn More for Drivers" },
}

export default function HowItWorks() {
  return (
    <section className="bg-secondary py-16 sm:py-24">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">
            A Simple Process for Everyone
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Whether you're donating, distributing, or delivering, we make it seamless.
          </p>
        </div>

        <Tabs defaultValue="providers" className="mt-12">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="providers">For Providers</TabsTrigger>
            <TabsTrigger value="ngos">For NGOs</TabsTrigger>
            <TabsTrigger value="drivers">For Drivers</TabsTrigger>
          </TabsList>
          
          {(['providers', 'ngos', 'drivers'] as const).map(userType => (
            <TabsContent key={userType} value={userType}>
              <Card>
                <CardContent className="p-0">
                  <div className="grid md:grid-cols-2">
                    <div className="relative aspect-video md:aspect-auto">
                      {images[userType] && (
                        <Image
                          src={images[userType]!.imageUrl}
                          alt={images[userType]!.description}
                          fill
                          className="object-cover md:rounded-l-lg"
                          data-ai-hint={images[userType]!.imageHint}
                        />
                      )}
                    </div>
                    <div className="p-6 lg:p-8">
                      <ol className="space-y-6">
                        {steps[userType].map((step, index) => (
                          <li key={index} className="flex gap-4">
                            <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">
                              {index + 1}
                            </div>
                            <div>
                              <h4 className="font-semibold">{step.title}</h4>
                              <p className="mt-1 text-sm text-muted-foreground">{step.description}</p>
                            </div>
                          </li>
                        ))}
                      </ol>
                      <Button asChild className="mt-8 w-full md:w-auto">
                        <Link href={ctas[userType].href}>{ctas[userType].label}</Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}
