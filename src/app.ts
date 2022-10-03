import { connect } from '@db/db';
import { initRoutes } from '@routes/router';
// import connectRedis, { RedisStore } from 'connect-redis';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import Express from 'express';
// import session from 'express-session';
import helmet from 'helmet';
// import Redis from 'ioredis';
// import ms from 'ms';
import { createLogger } from './util/create-logger';

export const logger = createLogger();

export const initApp = async (): Promise<void> => {
  const app = Express();
  const ORIGINS = process.env.CORS_ORIGINS ? process.env.CORS_ORIGINS.split('|') : '*';
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
  // const redisStore: RedisStore = connectRedis(session);

  // const redisClient = new Redis(process.env.REDIS_URI);

  app.use(helmet());
  app.use(Express.json({ limit: '100kb', strict: true, type: 'application/json' }));
  app.use(cors({
    origin: ORIGINS,
    optionsSuccessStatus: 200,
    credentials: true
  }));
  app.use(cookieParser());
  //  app.use(
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  //    session({
  //      name: 'refreshToken',
  //      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
  //      store: new redisStore({ client: redisClient }),
  //      secret: process.env.COOKIE_SECRET,
  //      saveUninitialized: false,
  //      resave: false,
  //      cookie: {
  //        maxAge: ms('2 days'),
  //        sameSite: process.env.NODE_ENV === 'production',
  //        secure: process.env.NODE_ENV === 'production',
  //    }
  //    })
  //  );

  await connect();
  initRoutes(app);
  // app.use(finalErrorHandler);

  app.listen(8080, () => logger.info('Application has launched on port: 8080'));
};
