/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express';
import { createRating } from './controllers/create-rating-entry';
import { ratingCreateValidator } from './validators/create-rating-validator';

export const router = Router();

router.post('/create', ratingCreateValidator, createRating);
