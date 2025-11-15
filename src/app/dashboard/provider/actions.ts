
'use server';

import { z } from 'zod';
import { checkFoodSpoilage } from '@/ai/flows/automated-photo-checks';

const createOfferFormSchema = z.object({
  foodName: z.string().min(2, { message: 'Food name must be at least 2 characters.' }),
  category: z.enum(['cooked', 'raw', 'packaged', 'bakery', 'other']),
  dietaryType: z.enum(['veg', 'non-veg']),
  quantity: z.string().min(1, { message: 'Please enter an estimated quantity.' }),
  quantityUnit: z.string().min(1, { message: 'Unit is required.' }),
  timeCooked: z.date({ required_error: 'Time cooked is required.' }),
  bestBefore: z.date({ required_error: 'A best before date is required.' }),
  foodCondition: z.string().min(1, { message: 'Food condition is required.' }),
  photo: z.instanceof(File).refine(file => file.size > 0, 'Photo is required.'),
  pickupAddress: z.string().min(5, { message: 'Pickup address is required.' }),
  landmark: z.string().min(3, { message: 'Landmark is required.' }),
  pickupTimeSlot: z.string().min(3, { message: 'Pickup time slot is required.' }),
  contactPerson: z.string().min(2, { message: 'Contact person name is required.' }),
  contactPhone: z.string().min(10, { message: 'A valid phone number is required.' }),
});

export async function createOffer(formData: FormData) {
  try {
    const photoFile = formData.get('photo');
    const bestBeforeDate = formData.get('bestBefore');
    const timeCookedDate = formData.get('timeCooked');

    const parsed = createOfferFormSchema.safeParse({
      foodName: formData.get('foodName'),
      category: formData.get('category'),
      dietaryType: formData.get('dietaryType'),
      quantity: formData.get('quantity'),
      quantityUnit: formData.get('quantityUnit'),
      timeCooked: timeCookedDate ? new Date(timeCookedDate.toString()) : undefined,
      bestBefore: bestBeforeDate ? new Date(bestBeforeDate.toString()) : undefined,
      foodCondition: formData.get('foodCondition'),
      photo: photoFile instanceof File ? photoFile : undefined,
      pickupAddress: formData.get('pickupAddress'),
      landmark: formData.get('landmark'),
      pickupTimeSlot: formData.get('pickupTimeSlot'),
      contactPerson: formData.get('contactPerson'),
      contactPhone: formData.get('contactPhone'),
    });

    if (!parsed.success) {
      console.error('Form validation failed:', parsed.error.flatten().fieldErrors);
      throw new Error('Invalid form data.');
    }

    const { photo, ...offerData } = parsed.data;

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
      ...offerData,
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
