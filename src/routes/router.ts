import { Application } from 'express';
import { logger } from '../app';

export const initRoutes = (app: Application): void => {
  logger.info('Initalizing routes')

  app.get('/api', (_, res) => res.status(200).send({ success: true, message: 'Hearbeat confirmed ♥'}))
}