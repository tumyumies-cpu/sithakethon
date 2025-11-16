
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function ContactPage() {
  return (
    <div className="container py-12">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-4xl font-bold font-headline">Contact Us</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Have questions? We'd love to hear from you.
        </p>
      </div>
      <div className="mt-8 mx-auto max-w-2xl">
         <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="first-name">First name</Label>
              <Input id="first-name" placeholder="John" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="last-name">Last name</Label>
              <Input id="last-name" placeholder="Doe" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="john@example.com" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea id="message" placeholder="Your message..." />
          </div>
          <Button type="submit" className="w-full">Send Message</Button>
        </div>
        <div className="mt-12">
          <h3 className="text-xl font-bold font-headline text-center">Our Offices</h3>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="text-center">
              <h4 className="font-semibold">Bangalore (HQ)</h4>
              <p className="text-muted-foreground text-sm">123 Foodie Lane<br/>Koramangala, Bangalore<br/>India</p>
            </div>
            <div className="text-center">
              <h4 className="font-semibold">Mumbai</h4>
              <p className="text-muted-foreground text-sm">456 Gourmet Street<br/>Bandra, Mumbai<br/>India</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
