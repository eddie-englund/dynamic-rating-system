import { z } from 'zod';

export const userGetSchema = z.object({
  id: z
    .string()
    .trim()
    .min(1)
    .max(128)
});

export type UserGetBody = z.infer<typeof userGetSchema>;
