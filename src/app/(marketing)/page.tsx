import Hero from '@/components/sections/hero';
import ProblemSolution from '@/components/sections/problem-solution';
import HowItWorks from '@/components/sections/how-it-works';
import Impact from '@/components/sections/impact';
import Features from '@/components/sections/features';
import DonationCta from '@/components/sections/donation-cta';
import Testimonials from '@/components/sections/testimonials';
import GetStarted from '@/components/sections/get-started';
import BlogSection from '@/components/sections/blog-section';

export default function Home() {
  return (
    <>
      <Hero />
      <ProblemSolution />
      <HowItWorks />
      <Impact />
      <Features />
      <Testimonials />
      <DonationCta />
      <GetStarted />
      <BlogSection />
    </>
  );
}
