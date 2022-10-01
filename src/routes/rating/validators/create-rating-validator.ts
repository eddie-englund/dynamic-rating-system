import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';

const ratingCreateSchema = z.object({
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

export type RatingCreateSchema = z.infer<typeof ratingCreateSchema>;

export const ratingCreateValidator = async (req: Request, res: Response, next: NextFunction) => {
  const parse = await ratingCreateSchema.safeParseAsync(req.body);
  if (!parse.success) {
    return res
      .status(400)
      .send({ success: false, error: { ...parse.error } });
  }
  req.body = parse.data;
  next();
};
