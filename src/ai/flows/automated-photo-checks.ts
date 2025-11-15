'use server';

/**
 * @fileOverview An AI agent to check uploaded photos for possible spoilage.
 *
 * - checkFoodSpoilage - A function that handles the food spoilage check process.
 * - CheckFoodSpoilageInput - The input type for the checkFoodSpoilage function.
 * - CheckFoodSpoilageOutput - The return type for the checkFoodSpoilage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CheckFoodSpoilageInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      'A photo of food, as a data URI that must include a MIME type and use Base64 encoding. Expected format: \'data:<mimetype>;base64,<encoded_data>\'.' /* e.g. data:image/jpeg;base64,/9j/4AAQSkZJRgABA... */
    ),
});
export type CheckFoodSpoilageInput = z.infer<typeof CheckFoodSpoilageInputSchema>;

const CheckFoodSpoilageOutputSchema = z.object({
  isSpoiled: z
    .boolean()
    .describe('Whether the AI determines that the food in the photo is spoiled.'),
  confidence: z
    .number()
    .describe(
      'A confidence score between 0 and 1 indicating how sure the AI is about its spoilage determination.'
    ),
  reason: z
    .string()
    .describe('The reasoning behind the AI determination of spoilage or lack thereof.'),
});
export type CheckFoodSpoilageOutput = z.infer<typeof CheckFoodSpoilageOutputSchema>;

export async function checkFoodSpoilage(
  input: CheckFoodSpoilageInput
): Promise<CheckFoodSpoilageOutput> {
  return checkFoodSpoilageFlow(input);
}

const checkFoodSpoilagePrompt = ai.definePrompt({
  name: 'checkFoodSpoilagePrompt',
  input: {schema: CheckFoodSpoilageInputSchema},
  output: {schema: CheckFoodSpoilageOutputSchema},
  prompt: `You are a food safety expert. You will be given a photo of food and must determine if it shows signs of spoilage.

  Analyze the image and provide:

  1.  A boolean value for 'isSpoiled'. True if the image shows signs of spoilage; otherwise, false.
  2.  A 'confidence' score (0-1) representing the certainty of your spoilage determination.
  3.  A 'reason' explaining your determination.

  Here is the photo:
  {{media url=photoDataUri}}`,
});

const checkFoodSpoilageFlow = ai.defineFlow(
  {
    name: 'checkFoodSpoilageFlow',
    inputSchema: CheckFoodSpoilageInputSchema,
    outputSchema: CheckFoodSpoilageOutputSchema,
  },
  async input => {
    const {output} = await checkFoodSpoilagePrompt(input);
    return output!;
  }
);
