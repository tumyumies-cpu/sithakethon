'use server';

/**
 * @fileOverview An AI-powered system that prioritizes urgent food offers and suggests nearby NGOs and drivers.
 *
 * - smartMatchingUrgentOffers - A function that handles the smart matching process.
 * - SmartMatchingUrgentOffersInput - The input type for the smartMatchingUrgentOffers function.
 * - SmartMatchingUrgentOffersOutput - The return type for the smartMatchingUrgentOffers function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SmartMatchingUrgentOffersInputSchema = z.object({
  foodOffers: z.array(
    z.object({
      offerId: z.string().describe('The ID of the food offer.'),
      foodType: z.string().describe('The type of food offered (e.g., cooked, packaged, produce).'),
      bestBefore: z.string().describe('The best before date and time of the food offer.'),
      pickupLocation: z.string().describe('The pickup location of the food offer.'),
    })
  ).describe('A list of food offers.'),
  ngos: z.array(
    z.object({
      ngoId: z.string().describe('The ID of the NGO.'),
      location: z.string().describe('The location of the NGO.'),
      foodPreferences: z.array(z.string()).describe('The food preferences of the NGO.'),
    })
  ).describe('A list of NGOs.'),
  drivers: z.array(
    z.object({
      driverId: z.string().describe('The ID of the driver.'),
      location: z.string().describe('The current location of the driver.'),
      availability: z.boolean().describe('The availability of the driver.'),
    })
  ).describe('A list of drivers.'),
});
export type SmartMatchingUrgentOffersInput = z.infer<typeof SmartMatchingUrgentOffersInputSchema>;

const SmartMatchingUrgentOffersOutputSchema = z.object({
  prioritizedOffers: z.array(
    z.object({
      offerId: z.string().describe('The ID of the prioritized food offer.'),
      suggestedNgos: z.array(z.string()).describe('A list of suggested NGOs for the offer.'),
      suggestedDrivers: z.array(z.string()).describe('A list of suggested drivers for the offer.'),
    })
  ).describe('A list of prioritized food offers with suggested NGOs and drivers.'),
});
export type SmartMatchingUrgentOffersOutput = z.infer<typeof SmartMatchingUrgentOffersOutputSchema>;

export async function smartMatchingUrgentOffers(input: SmartMatchingUrgentOffersInput): Promise<SmartMatchingUrgentOffersOutput> {
  return smartMatchingUrgentOffersFlow(input);
}

const prompt = ai.definePrompt({
  name: 'smartMatchingUrgentOffersPrompt',
  input: {schema: SmartMatchingUrgentOffersInputSchema},
  output: {schema: SmartMatchingUrgentOffersOutputSchema},
  prompt: `You are an AI assistant designed to prioritize urgent food offers and suggest nearby NGOs and drivers for efficient food distribution.\n
Prioritize the following food offers based on their urgency (bestBefore date) and suggest suitable NGOs based on their food preferences and proximity, and drivers based on their availability and location.\n\nFood Offers:\n{{#each foodOffers}}
  - Offer ID: {{offerId}}, Food Type: {{foodType}}, Best Before: {{bestBefore}}, Pickup Location: {{pickupLocation}}\n{{/each}}

NGOs:\n{{#each ngos}}
  - NGO ID: {{ngoId}}, Location: {{location}}, Food Preferences: {{foodPreferences}}\n{{/each}}

Drivers:\n{{#each drivers}}
  - Driver ID: {{driverId}}, Location: {{location}}, Availability: {{availability}}\n{{/each}}

Prioritized Offers (include offerId, suggestedNgos, suggestedDrivers):\n`,
});

const smartMatchingUrgentOffersFlow = ai.defineFlow(
  {
    name: 'smartMatchingUrgentOffersFlow',
    inputSchema: SmartMatchingUrgentOffersInputSchema,
    outputSchema: SmartMatchingUrgentOffersOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
