/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { randomUUID } from 'crypto';
import { logger } from 'app';
import { Request, Response } from 'express';

export const finalErrorHandler = (error: Error, req: Request, res: Response) => {
  const errorId = randomUUID();
  logger.error(`UNHANDELED ERROR ON ${req.route.path} GOT ERROR ${error.message} WITH ERROR ID ${errorId}`);
  return res
    .status(500)
    .send(`Something went horribly wrong on route ${req.route}, please provide the following ID to support ${errorId}`);
};
