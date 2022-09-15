import Express from 'express';
import helmet from 'helmet';
import { initRoutes } from 'routes/router';
import { createLogger } from './util/create-logger';
import cors from 'cors';
import { finalErrorHandler } from 'middleware/final-error-handler'

export const logger = createLogger();

export const initApp = async (): Promise<void> => {
  const app = Express()
  const ORIGINS = process.env.CORS_ORIGINS ? process.env.CORS_ORIGINS.split('|') : '*';
  const PORT = process.env.EXPRESS_PORT || 8080

  app.use(helmet())
  app.use(cors({
    origin: ORIGINS,
    optionsSuccessStatus: 200,
    credentials: true
  }))

  initRoutes(app)
  app.use(finalErrorHandler)

  app.listen(PORT, () => logger.info(`Application has launched on port: ${PORT}`))
}