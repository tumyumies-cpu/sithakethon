
'use server';

import { z } from 'zod';
import { checkFoodSpoilage } from '@/ai/flows/automated-photo-checks';

const createOfferFormSchema = z.object({
  foodItem: z.string(),
  foodType: z.enum(['cooked', 'packaged', 'produce', 'other']),
  weight: z.string(),
  bestBefore: z.string(),
  description: z.string().optional(),
  photo: z.instanceof(File),
});

export async function createOffer(formData: FormData) {
  try {
    const parsed = createOfferFormSchema.safeParse({
      foodItem: formData.get('foodItem'),
      foodType: formData.get('foodType'),
      weight: formData.get('weight'),
      bestBefore: formData.get('bestBefore'),
      description: formData.get('description'),
      photo: formData.get('photo'),
    });

    if (!parsed.success) {
      throw new Error('Invalid form data.');
    }

    const { foodItem, foodType, weight, bestBefore, description, photo } = parsed.data;

    // Convert image to data URI for the AI check
    const photoBuffer = await photo.arrayBuffer();
    const photoDataUri = `data:${photo.type};base64,${Buffer.from(photoBuffer).toString('base64')}`;

    console.log('Running AI food spoilage check...');
    const aiCheck = await checkFoodSpoilage({ photoDataUri });

    if (aiCheck.isSpoiled && aiCheck.confidence > 0.75) {
      return {
        success: false,
        error: `AI Flagged for Spoilage: ${aiCheck.reason} (Confidence: ${aiCheck.confidence.toFixed(2)})`,
      };
    }

    console.log('AI check passed. Creating offer...');
    console.log({
      foodItem,
      foodType,
      weight,
      bestBefore,
      description,
      photo: {
        name: photo.name,
        size: photo.size,
        type: photo.type,
      },
      aiCheck,
    });
    
    // In a real app, you would save this data to your database.
    // For now, we just log it and return success.

    return { success: true, aiCheck };

  } catch (error: any) {
    console.error('Failed to create offer:', error);
    return { success: false, error: error.message || 'Failed to create offer.' };
  }
}
