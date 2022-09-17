import { Request } from 'express'

export interface TypedRequestBody<T> extends Request {
  body: T
}

export interface TypedJwtRequest<T> extends Request {
  body: T,
  accessToken?: string
}