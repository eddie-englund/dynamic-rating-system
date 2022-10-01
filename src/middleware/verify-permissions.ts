import { AdminPermissions, BasePermissions } from '@db/models/user';
import { TypedJwtRequest } from '@util/typed-request';
import { logger } from 'app';
import { Response, NextFunction } from 'express';

type ExpectedPerms = typeof AdminPermissions | typeof BasePermissions;
const noPermsObj = { success: false, msg: 'Insufficient permissions' };

export const makeVerifyPermissions = (expectedPermissions: ExpectedPerms) => (
  req: TypedJwtRequest<{}>,
  res: Response,
  next: NextFunction
) => verifyPermissions(req, res, next, expectedPermissions);

const verifyPermissions = (
  req: TypedJwtRequest<{}>,
  res: Response,
  next: NextFunction,
  expectedPermissions: ExpectedPerms
) => {
  const permissions = req.jwt?.permissions;

  if (!permissions || !req.jwt || !req.jwt.userId) {
    logger.debug('Permissions are missing from req object. Got:', permissions);
    return res
      .status(401)
      .send(noPermsObj);
  }

  let hasPerms = true;

  for (const permission of permissions) {
    if (!expectedPermissions.includes(permission)) {
      logger.debug(`User ${req.jwt.userId} has permission ${permission} but it is not included in ${expectedPermissions.toString()}`);
      hasPerms = false;
    }
  }

  if (!hasPerms) {
    return res
      .status(401)
      .send(noPermsObj);
  }

  next();
};
