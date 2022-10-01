import { BasePermissions } from '@db/models/user';
import argon2 from 'argon2';
import { getCollections } from 'db/db';
import { Response } from 'express';
import { logger } from '../../../app';
import { TypedJwtRequest } from '../../../util/typed-request';
import { UserCreateBody } from '../validators/create-user-validator';

export const createUser = async (req: TypedJwtRequest<UserCreateBody>, res: Response) => {
  try {
    const hashed = await argon2.hash(req.body.password);

    if (!hashed) {
      res
        .status(500)
        .send({ success: false, msg: 'Password hashing failed, please try again.' });
    }

    await getCollections().users!.insertOne({
      username: req.body.username,
      password: hashed,
      permissions: BasePermissions
    });

    return res.status(201).send();
  } catch (e) {
    logger.error(e);
    res
      .status(500)
      .send({ success: false, msg: 'Something went wrong when creating your user, please try again.' });
  }
};
