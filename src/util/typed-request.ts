import { Request } from 'express'
import { JwtPayload } from 'jsonwebtoken'

export interface TypedRequestBody<T> extends Request {
  body: T
}

export interface TypedJwtRequest<T> extends Request {
  body: T,
  jwt?: string | JwtPayload
}