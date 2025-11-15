import Link from 'next/link';
import { HandHeart } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn(
        'group flex items-center gap-2 text-xl font-bold font-headline text-primary',
        className
      )}
    >
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground transition-colors group-hover:bg-primary/90">
        <HandHeart className="h-5 w-5" />
      </span>
      <span>PlatePal</span>
    </Link>
  );
}
