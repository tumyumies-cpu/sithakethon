import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, XCircle } from 'lucide-react';

const problemPoints = [
  "Tons of edible food from restaurants & campuses go to waste daily.",
  "No easy way for providers to connect with local NGOs in real-time.",
  "Logistical challenges in coordinating quick and safe pickups.",
  "Lack of transparency and data on food redistribution efforts."
];

const solutionPoints = [
  "Post surplus food in under 60 seconds via our simple interface.",
  "NGOs discover and reserve food in real-time, preventing waste.",
  "Automated driver assignment and route suggestions for fast pickups.",
  "Full audit trail with photo evidence and impact tracking."
];

export default function ProblemSolution() {
  return (
    <section className="py-16 sm:py-24">
      <div className="container">
        <div className="grid gap-8 md:grid-cols-2 lg:gap-12">
          <Card className="border-destructive/30 bg-destructive/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-destructive font-headline">
                <XCircle className="h-8 w-8" />
                The Problem
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {problemPoints.map((point, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-destructive/50" />
                    <span className="text-muted-foreground">{point}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
          
          <Card className="border-primary/30 bg-primary/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-primary font-headline">
                <CheckCircle className="h-8 w-8" />
                The Solution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {solutionPoints.map((point, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
