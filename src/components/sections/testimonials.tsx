
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Anya Sharma',
    role: 'Manager, Green Leaf Cafe',
    quote: "PlatePal is a game-changer. We've reduced our food waste by over 80% and it feels great knowing our surplus is feeding people, not a landfill.",
    image: PlaceHolderImages.find(img => img.id === 'testimonial-1'),
  },
  {
    name: 'Rohan Mehta',
    role: 'Coordinator, Helping Hands NGO',
    quote: "The real-time notifications are incredible. We can now reliably source fresh food for our nightly distributions. The platform is so easy to use.",
    image: PlaceHolderImages.find(img => img.id === 'testimonial-2'),
  },
  {
    name: 'Priya Singh',
    role: 'Student Volunteer, XYZ College',
    quote: "Our college mess used to have so much extra food. With PlatePal, we've created a systematic way to donate it. It's an amazing initiative.",
    image: PlaceHolderImages.find(img => img.id === 'testimonial-3'),
  },
];

const partnerLogos = ['Partner A', 'Partner B', 'Partner C', 'Partner D', 'Partner E', 'Partner F'];

export default function Testimonials() {
  return (
    <section className="bg-secondary py-16 sm:py-24">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">
            Trusted by Our Community
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Hear from the restaurants, NGOs, and volunteers who make our mission possible.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.name}>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  {testimonial.image && (
                    <Image
                      src={testimonial.image.imageUrl}
                      alt={testimonial.name}
                      width={56}
                      height={56}
                      className="rounded-full"
                      data-ai-hint={testimonial.image.imageHint}
                    />
                  )}
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
                <div className="mt-4 flex">
                  {[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5 fill-accent text-accent" />)}
                </div>
                <blockquote className="mt-4 border-l-2 border-primary pl-4 text-muted-foreground">
                  {testimonial.quote}
                </blockquote>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16">
          <p className="text-center text-sm font-semibold uppercase text-muted-foreground tracking-wider">
            Proudly partnered with leading organizations
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
            {partnerLogos.map((logo, index) => (
              <p key={index} className="text-lg font-semibold text-muted-foreground/70">
                {logo}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
