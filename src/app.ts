import { connect } from '@db/db';
import { initRoutes } from '@routes/router';
import connectRedis, { RedisStore } from 'connect-redis';
import cors from 'cors';
import Express from 'express';
import session from 'express-session';
import helmet from 'helmet';
import Redis from 'ioredis';
import ms from 'ms';
import { createLogger } from './util/create-logger';

export const logger = createLogger();

export const initApp = async (): Promise<void> => {
  const app = Express();
  const ORIGINS = process.env.CORS_ORIGINS ? process.env.CORS_ORIGINS.split('|') : '*';
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
  const redisStore: RedisStore = connectRedis(session);

  const redisClient = new Redis(process.env.REDIS_URI);

  app.use(helmet());
  app.use(Express.json());
  app.use(
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    session({
      name: 'cookie-storage',
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
      store: new redisStore({ client: redisClient }),
      secret: process.env.COOKIE_SECRET,
      saveUninitialized: false,
      resave: false,
      cookie: {
        maxAge: ms('2 days'),
        sameSite: process.env.NODE_ENV === 'production',
        secure: process.env.NODE_ENV === 'production',
      }
    })
  );
  app.use(cors({
    origin: ORIGINS,
    optionsSuccessStatus: 200,
    credentials: true
  }));

  await connect();
  initRoutes(app);
  // app.use(finalErrorHandler);

  app.listen(8080, () => logger.info('Application has launched on port: 8080'));
};
