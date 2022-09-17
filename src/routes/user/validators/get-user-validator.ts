import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';

const userGetSchema = z.object({
  id: z
    .string()
    .trim()
    .min(1)
    .max(128)
})

export type UserGetSchema = z.infer<typeof userGetSchema>

export const userGetValidator = async (req: Request, res: Response, next: NextFunction) => {
  const parse = await userGetSchema.safeParseAsync(req.params)
  if (!parse.success) return res
    .status(400)
    .send({ success: false, error: { ...parse.error } })
  req.params = parse.data
  next()
}