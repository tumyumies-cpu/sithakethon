
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="container py-12">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-4xl font-bold font-headline text-center">About Us</h1>
        <p className="mt-4 text-lg text-muted-foreground text-center">
          Learn more about our mission, our team, and our partners.
        </p>
        <div className="mt-8 prose lg:prose-xl max-w-none">
          <p>
            College campuses, hostels, and restaurants regularly generate surplus food, but there is no structured system to track excess quantities or quickly connect providers with NGOs or shelters that need it. This results in edible food being wasted while communities go hungry.
          </p>
          <p>
            PlatePal was founded to solve this problem. We are a trustworthy, easy-to-use platform that connects restaurants, hostels and campus messes with NGOs and volunteer drivers to redistribute surplus food fast, safely and transparently — with donation options and tokenized incentives.
          </p>
          <p>
            Content for this page is under construction.
          </p>
        </div>
      </div>
    </div>
  );
}
