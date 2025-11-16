'use client';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function Hero() {
  return (
    <section className="relative h-[90vh] min-h-[600px] w-full">
      <Image
        src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Hands holding a bowl of food, symbolizing donation and care."
        fill
        className="object-cover"
        priority
        data-ai-hint="food donation"
      />
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
