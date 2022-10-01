import { Application } from 'express';
import { router as ratingRouter } from './rating/rating-router';
import userRouter from './user/user-router';
import { logger } from '../app';

export const initRoutes = (app: Application): void => {
  logger.info('Initalizing routes');

  app.get('/api', (_, res) => res.status(200).send({ success: true, message: 'Hearbeat confirmed ♥' }));

  app.use('/api/user', userRouter);
  app.use('/api/rating', ratingRouter);
};
