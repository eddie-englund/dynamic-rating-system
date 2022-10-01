import { z } from 'zod';

export const userCreateSchema = z.object({
  username: z
    .string()
    .trim()
    .min(1)
    .max(64)
    .email(),
  password: z
    .string()
    .trim()
    .min(6)
    .max(256)
});

export type UserCreateBody = z.infer<typeof userCreateSchema>;
