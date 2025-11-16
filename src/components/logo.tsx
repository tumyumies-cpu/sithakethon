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
      <div className="rounded-full bg-primary/10 p-2 transition-colors group-hover:bg-primary/20">
        <HandHeart className="h-6 w-6 text-primary transition-transform group-hover:scale-110" />
      </div>
      <span>PlatePal</span>
    </Link>
  );
}
