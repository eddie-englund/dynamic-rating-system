import { z } from 'zod';

export const ratingCreateSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1)
    .max(256),
  cast: z
    .array(
      z
        .string()
        .trim()
        .min(1)
        .max(128)
    )
    .optional(),
  rating: z
    .number()
    .min(1)
    .max(5),
  description: z
    .string()
    .trim()
    .min(1)
    .max(512)
    .optional(),
  imageUrl: z
    .string()
    .trim()
    .url()
    .min(1)
    .max(1024)
    .optional()
});

export type RatingCreateBody = z.infer<typeof ratingCreateSchema>;
