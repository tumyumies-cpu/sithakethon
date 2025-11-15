import HowItWorks from "@/components/sections/how-it-works";

export default function HowItWorksPage() {
  return (
    <>
    <div className="container py-12 text-center">
         <h1 className="text-4xl font-bold font-headline">How PlatePal Works</h1>
         <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
         We built a full-stack Food Waste Redistribution Platform with dedicated interfaces for food providers, NGOs and volunteer drivers. Providers log surplus in real time, NGOs reserve items (even from multiple providers in a single cart), and drivers pick up and deliver. Every donation is timestamped and photo-evidenced for transparency — and stakeholders earn tokens and impact reports.
         </p>
    </div>
    <HowItWorks />
    </>
  );
}
