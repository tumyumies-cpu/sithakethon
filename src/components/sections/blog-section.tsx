
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ArrowRight } from 'lucide-react';

const posts = [
  {
    title: "How We Partnered with XYZ College to Eliminate Campus Food Waste",
    description: "A case study on our successful pilot program...",
    image: PlaceHolderImages.find(img => img.id === 'blog-1'),
    href: "/blog/post-1"
  },
  {
    title: "5 Tips for Restaurants to Safely Package Surplus Food",
    description: "Best practices for ensuring food safety during donation...",
    image: PlaceHolderImages.find(img => img.id === 'blog-2'),
    href: "/blog/post-2"
  },
  {
    title: "A Day in the Life of a PlatePal Volunteer Driver",
    description: "Meet Ravi, one of our star volunteers making a difference...",
    image: PlaceHolderImages.find(img => img.id === 'blog-3'),
    href: "/blog/post-3"
  },
];

export default function BlogSection() {
  return (
    <section className="bg-secondary py-16 sm:py-24">
      <div className="container">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">
              Latest Stories & News
            </h2>
            <p className="mt-2 text-lg text-muted-foreground">
              Read about our impact and get the latest updates.
            </p>
          </div>
          <Button variant="outline" asChild className="hidden sm:flex">
            <Link href="/blog">View All Posts <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Card key={post.title} className="flex flex-col">
              <CardHeader className="p-0">
                {post.image && (
                  <div className="relative aspect-video w-full">
                    <Image
                      src={post.image.imageUrl}
                      alt={post.title}
                      fill
                      className="rounded-t-lg object-cover"
                      data-ai-hint={post.image.imageHint}
                    />
                  </div>
                )}
                <div className="p-6 pb-0">
                  <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="flex-1 p-6 pt-2">
                <p className="text-sm text-muted-foreground line-clamp-3">{post.description}</p>
              </CardContent>
              <CardFooter className="p-6 pt-0">
                <Button variant="link" asChild className="p-0 h-auto">
                  <Link href={post.href}>Read More <ArrowRight className="ml-2 h-4 w-4" /></Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        <div className="mt-8 text-center sm:hidden">
            <Button variant="outline" asChild>
                <Link href="/blog">View All Posts <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
        </div>
      </div>
    </section>
  );
}
