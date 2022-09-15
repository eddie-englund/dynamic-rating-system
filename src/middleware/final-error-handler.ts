import { logger } from 'app'
import { Request, Response, NextFunction } from 'express'
import { randomUUID } from 'crypto'

export const finalErrorHandler = (error: any, req: Request, res: Response, _: NextFunction) => {
  const errorId = randomUUID()
  logger.error(`UNHANDELED ERROR ON ${req.route} GOT ERROR ${error.message} WITH ERROR ID ${errorId}`)
  return res
    .status(500)
    .send(`Something went horribly wrong on route ${req.route}, please provide the following ID to support ${errorId}`)
}