import Link from 'next/link';
import { HandHeart } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn(
        'group flex items-center gap-2 text-xl font-bold font-headline text-primary',
        className
      )}
    >
      <Image src="/assets/logo.svg" alt="PlatePal Logo" width={32} height={32} />
      <span>PlatePal</span>
    </Link>
  );
}
