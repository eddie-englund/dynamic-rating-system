import { TypedJwtRequest } from "@util/typed-request";
import { logger } from "app";
import { NextFunction, Response } from "express";
import jwt from 'jsonwebtoken';

export const verifyJwt = async (req: TypedJwtRequest<{}>, res: Response, next: NextFunction) => {
  const header = req.headers["authorization"];
  if (!header) return res
    .status(401)
    .send({ success: false, msg: "Unathorized" })
  
  const token = header.split(' ')[1];

  if (!token.length) return res
    .status(401)
    .send({ success: false, msg: "Unathorized" })
  
  try {
    const validToken = jwt.verify(token, process.env.JWT_SECRET)
    if (typeof validToken === 'string') throw new Error(`Invalid jwt token: ${token}`)
    req.jwt = validToken
    next()
  } catch (e) {
    logger.error(e)
    return res
      .status(401)
      .send({ success: false, msg: "Unathorized" })
  }
}