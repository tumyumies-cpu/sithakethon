import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Badge } from '@/components/ui/badge';
import { Medal, ShieldCheck } from 'lucide-react';

const heroImage = PlaceHolderImages.find(img => img.id === 'hero-background');

export default function Hero() {
  return (
    <section className="relative h-[80vh] min-h-[500px] w-full">
      {heroImage && (
        <Image
          src={heroImage.imageUrl}
          alt={heroImage.description}
          fill
          className="object-cover"
          priority
          data-ai-hint={heroImage.imageHint}
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
      <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-white">
        <div className="container max-w-4xl px-4">
          <h1 className="font-headline text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Edible food should feed people — not landfills.
          </h1>
          <p className="mt-6 text-lg text-gray-200 md:text-xl">
            We match surplus food from restaurants, hostels and cafeterias to local NGOs, with real-time posting, secure pickup and traceable delivery.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" asChild>
              <Link href="/auth/signup?role=provider">Post Surplus</Link>
            </Button>
            <Button size="lg" variant="secondary" asChild>
              <Link href="/ngos">I'm an NGO — Claim Food</Link>
            </Button>
          </div>
          <div className="mt-12 flex flex-wrap justify-center gap-4 text-sm">
            <Badge variant="secondary" className="gap-2 bg-white/20 text-white backdrop-blur-sm">
              <ShieldCheck className="h-4 w-4 text-primary" />
              Verified partners
            </Badge>
            <Badge variant="secondary" className="gap-2 bg-white/20 text-white backdrop-blur-sm">
              <Medal className="h-4 w-4 text-accent" />
              10,000+ kg redistributed
            </Badge>
          </div>
        </div>
      </div>
    </section>
  );
}
