
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Medal, ShieldCheck } from 'lucide-react';

const heroImage = {
    imageUrl: "https://images.unsplash.com/photo-1593113646773-ae28c645340d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHxmb29kJTIwZG9uYXRpb258ZW58MHx8fHwxNzYzOTk0ODgxfDA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "Hands holding a bowl of food, symbolizing donation and care.",
    imageHint: "food donation"
};

export default function Hero() {

  return (
    <section className="relative h-[90vh] min-h-[600px] w-full">
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
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
      <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-white">
        <div className="container max-w-4xl px-4">
          <Badge variant="secondary" className="mb-4 bg-white/20 text-white backdrop-blur-sm">
            Connecting Surplus to Need, Instantly.
          </Badge>
          <h1 className="font-headline text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Edible food should feed people — not landfills.
          </h1>
          <p className="mt-6 text-lg text-gray-200 md:text-xl">
            We match surplus food from restaurants, hostels and cafeterias to local NGOs, with real-time posting, secure pickup and traceable delivery.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" asChild>
              <Link href="/share-surplus">Share Surplus</Link>
            </Button>
            <Button size="lg" variant="secondary" asChild>
              <Link href="/register-ngo">Find Donations</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
