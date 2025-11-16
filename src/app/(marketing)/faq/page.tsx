
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
  {
    question: "What is PlatePal?",
    answer: "PlatePal is a platform that connects restaurants, hostels, and college messes with surplus food to NGOs who can distribute it to people in need."
  },
  {
    question: "How do I sign up as a food provider?",
    answer: "You can sign up by clicking the 'Share Surplus' button on our homepage and filling out the registration form. Our team will verify your details and get you onboarded."
  },
  {
    question: "Is there a cost to use PlatePal?",
    answer: "No, PlatePal is free to use for both food providers and NGOs. We operate on donations and corporate partnerships."
  },
  {
    question: "How is food safety handled?",
    answer: "Providers are required to follow local food safety guidelines. We also provide best practice guides and use photo verification to ensure quality."
  }
]


export default function FaqPage() {
  return (
    <div className="container py-12">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-4xl font-bold font-headline text-center">Frequently Asked Questions</h1>
        <div className="mt-8">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem value={`item-${index}`} key={index}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
}
