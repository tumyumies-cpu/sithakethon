
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { UtensilsCrossed, HeartHandshake, Bike } from 'lucide-react';

const ctas = [
  {
    icon: UtensilsCrossed,
    title: "I'm a Provider",
    description: "Have surplus food? Join our network of restaurants, hostels, and cafeterias.",
    href: "/signup?role=provider",
    buttonText: "Post Surplus Food"
  },
  {
    icon: HeartHandshake,
    title: "I'm an NGO",
    description: "Looking for food donations? Access a real-time supply of surplus food from your area.",
    href: "/signup?role=ngo",
    buttonText: "Claim Food"
  },
  {
    icon: Bike,
    title: "I'm a Driver",
    description: "Want to volunteer your time? Help us deliver food to those who need it most.",
    href: "/signup?role=driver",
    buttonText: "Join the Fleet"
  },
];

export default function GetStarted() {
  return (
    <section className="py-16 sm:py-24">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">
            Join the Movement
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            You can make a difference. Choose how you want to get involved.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {ctas.map((cta) => (
            <Card key={cta.title} className="flex flex-col text-center transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl">
              <CardHeader className="flex-1">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <cta.icon className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="mt-4 font-headline text-xl">{cta.title}</CardTitle>
                <CardDescription className="mt-2">{cta.description}</CardDescription>
              </CardHeader>
              <CardContent className="p-6 pt-0">
                <Button asChild className="w-full">
                  <Link href={cta.href}>{cta.buttonText}</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
