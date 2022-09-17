import { Application } from 'express';
import { logger } from '../app';
import { router as userRouter } from './user/user-router'

export const initRoutes = (app: Application): void => {
  logger.info('Initalizing routes')

  app.get('/api', (_, res) => res.status(200).send({ success: true, message: 'Hearbeat confirmed ♥' }))
  
  app.use('/api/user', userRouter)
}
