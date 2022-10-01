import { AdminPermissions } from '@db/models/user';
import { verifyJwt } from '@middleware/verify-jwt';
import { makeVerifyPermissions } from '@middleware/verify-permissions';
import { validator } from '@util/validator';
import { Router } from 'express';
import { createRating } from './controllers/create-rating-entry';
import { ratingCreateSchema } from './validators/create-rating-validator';

export const router = Router();

router.post(
  '/create',
  verifyJwt,
  makeVerifyPermissions(AdminPermissions),
  validator(ratingCreateSchema),
  createRating
);
