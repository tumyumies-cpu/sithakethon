import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bot, Image as ImageIcon, Map, Sparkles, BadgeCheck } from 'lucide-react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const featureImage = PlaceHolderImages.find(img => img.id === 'feature-photo-check');

const features = [
  {
    icon: BarChart,
    title: 'Real-time Posts',
    description: 'Surplus food is listed the moment it becomes available, maximizing its chances of being claimed.',
  },
  {
    icon: ImageIcon,
    title: 'Photo Evidence',
    description: 'Mandatory photos for listings and deliveries ensure transparency and quality control.',
  },
  {
    icon: BadgeCheck,
    title: 'Verification System',
    description: 'All providers, NGOs, and drivers are manually verified to build a trusted community.',
  },
  {
    icon: Map,
    title: 'Driver Routing',
    description: 'Our system suggests efficient routes to speed up pickups and minimize travel time.',
  },
  {
    icon: Sparkles,
    title: 'Token Rewards',
    description: 'Earn tokens for donating, driving, and distributing. Redeem them for platform benefits.',
  },
  {
    icon: Bot,
    title: 'AI-Powered Matching',
    description: 'Smart algorithms prioritize urgent offers and match them with the nearest suitable NGOs and drivers.',
  },
];

export default function Features() {
  return (
    <section className="bg-secondary py-16 sm:py-24">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">
            A Platform Built for Trust and Speed
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            We've packed PlatePal with features to make food redistribution safe, fast, and transparent.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <Card key={feature.title} className="text-center">
              <CardHeader>
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="mt-4 font-headline">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 rounded-lg bg-card p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                    <h3 className="font-headline text-2xl font-bold text-primary">Automated Quality Checks</h3>
                    <p className="mt-4 text-muted-foreground">Our AI-powered image analysis helps flag potential food spoilage before it ever gets picked up, adding an extra layer of safety to the platform. Human verification remains key, but our tech provides a powerful first check.</p>
                </div>
                <div className="flex justify-center">
                    {featureImage && (
                        <Image 
                            src={featureImage.imageUrl} 
                            alt={featureImage.description}
                            width={200}
                            height={200}
                            className="rounded-lg"
                            data-ai-hint={featureImage.imageHint}
                        />
                    )}
                </div>
            </div>
        </div>

      </div>
    </section>
  );
}
