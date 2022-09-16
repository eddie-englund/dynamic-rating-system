import Express from 'express';
import helmet from 'helmet';
import { initRoutes } from '@routes/router';
import { createLogger } from './util/create-logger';
import cors from 'cors';
import { finalErrorHandler } from 'middleware/final-error-handler'
import { connect } from '@db/db';

export const logger = createLogger();

export const initApp = async (): Promise<void> => {
  const app = Express()
  const ORIGINS = process.env.CORS_ORIGINS ? process.env.CORS_ORIGINS.split('|') : '*';

  app.use(helmet())
  app.use(cors({
    origin: ORIGINS,
    optionsSuccessStatus: 200,
    credentials: true
  }))

  await connect();
  initRoutes(app)
  app.use(finalErrorHandler)

  app.listen(8080, () => logger.info('Application has launched on port: 8080'))
}