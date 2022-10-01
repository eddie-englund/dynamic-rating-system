import { AdminPermissions, BasePermissions } from '@db/models/user';
import { TypedJwtRequest } from '@util/typed-request';
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

  if (!permissions) {
    return res
      .status(401)
      .send(noPermsObj);
  }

  let hasPerms = true;

  for (const permission of permissions) {
    if (!expectedPermissions.includes(permission)) hasPerms = false;
  }

  if (!hasPerms) {
    return res
      .status(401)
      .send(noPermsObj);
  }

  next();
};
