import { BasePermissions } from '@db/models/user';
import argon2 from 'argon2';
import { getCollections } from 'db/db';
import { NextFunction, Response } from 'express';
import { logger } from '../../../app';
import { TypedRequestBody } from '../../../util/typed-request';
import { UserCreateSchema } from '../validators/create-user-validator';

export const createUser = async (req: TypedRequestBody<UserCreateSchema>, res: Response, next: NextFunction) => {
  const hashed = await argon2
    .hash(req.body.password)
    .catch(e => {
      logger.error(e);
      return next(e)
    });

  if (!hashed) {
    res
      .status(500)
      .send({ success: false, msg: 'Password hashing failed, please try again.' });
  }

  await getCollections().users!.insertOne({
    username: req.body.username,
    password: hashed,
    permissions: BasePermissions
  }).catch(e => {
    logger.error(e);
    res
      .status(500)
      .send({ success: false, msg: 'Something went wrong when creating your user, please try again.' });
  });

  return res.status(201).send();
};
