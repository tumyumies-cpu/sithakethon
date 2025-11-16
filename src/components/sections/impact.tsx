
'use client';

import { useState, useEffect, useRef } from 'react';
import { Package, Utensils, Handshake, MapPin } from 'lucide-react';
import InteractiveMap from '@/components/interactive-map';

const stats = [
  { value: 12500, label: 'KG of Food Saved', icon: Package },
  { value: 37500, label: 'Meals Served', icon: Utensils },
  { value: 250, label: 'NGOs Onboarded', icon: Handshake },
  { value: 15, label: 'Cities Live', icon: MapPin },
];

function AnimatedCounter({ to, duration = 2000 }: { to: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const start = 0;
  const startTime = useRef<number | null>(null);
  const animationFrameId = useRef<number | null>(null);
  const nodeRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const animate = (timestamp: number) => {
            if (!startTime.current) {
              startTime.current = timestamp;
            }
            const progress = timestamp - startTime.current;
            const percentage = Math.min(progress / duration, 1);
            const easedPercentage = percentage < 0.5 ? 2 * percentage * percentage : -1 + (4 - 2 * percentage) * percentage;
            const currentCount = Math.floor(easedPercentage * (to - start) + start);
            
            setCount(currentCount);

            if (progress < duration) {
              animationFrameId.current = requestAnimationFrame(animate);
            }
          };
          animationFrameId.current = requestAnimationFrame(animate);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    const currentNode = nodeRef.current;
    if (currentNode) {
      observer.observe(currentNode);
    }

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      if (currentNode) {
        observer.unobserve(currentNode);
      }
    };
  }, [to, duration, start]);

  return (
    <span ref={nodeRef} className="font-headline text-4xl font-bold tracking-tighter text-primary sm:text-5xl">
        {count.toLocaleString()}
    </span>
  );
}

export default function Impact() {
  return (
    <section className="py-16 sm:py-24">
      <div className="container">
        <div className="text-center">
            <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">
                Our Impact, in Real-Time
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
                Every donation creates a ripple effect of positive change across communities.
            </p>
        </div>
        <div className="mt-16 grid grid-cols-1 items-center gap-y-16 gap-x-8 lg:grid-cols-2">
            <div>
                <div className="grid grid-cols-2 gap-8">
                {stats.map((stat, index) => (
                    <div key={index} className="flex items-start gap-4">
                        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                            <stat.icon className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                            <AnimatedCounter to={stat.value} />
                            <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
                        </div>
                    </div>
                ))}
                </div>
            </div>
            <div className="aspect-[5/4] lg:aspect-auto rounded-lg bg-muted flex items-center justify-center overflow-hidden">
                <InteractiveMap />
            </div>
        </div>
      </div>
    </section>
  );
}
