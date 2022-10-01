import { Request } from 'express';

export interface JwtPayload {
  userId?: string | undefined;
  permissions?: string[] | undefined;
  iss?: string | undefined;
  sub?: string | undefined;
  aud?: string | string[] | undefined;
  exp?: number | undefined;
  nbf?: number | undefined;
  iat?: number | undefined;
  jti?: string | undefined;
}

export interface TypedRequestBody<T> extends Request {
  body: T;
}

export interface TypedJwtRequest<T> extends Request {
  body: T;
  jwt?: JwtPayload;
}
