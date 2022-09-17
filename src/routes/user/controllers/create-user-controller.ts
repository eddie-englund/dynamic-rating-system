import { TypedRequestBody } from '../../../util/typed-request'
import { UserCreateSchema } from '../validators/create-user-validator'
import argon2 from 'argon2';
import { logger } from '../../../app';
import { Response } from 'express';
import { getCollections } from 'db/db';

export const createUser = async (req: TypedRequestBody<UserCreateSchema>, res: Response) => {
  const hashed = await argon2
    .hash(req.body.password)
    .catch(e => {
      logger.error(e)
      res
        .status(500)
        .send({ success: false, msg: "Password hashing failed, please try again." });
    })

  await getCollections().users.insertOne({
    username: req.body.username,
    password: hashed
  }).catch(e => {
    logger.error(e)
    res
      .status(500)
      .send({ success: false, msg: "Something went wrong when creating your user, please try again."})
  })

  return res.status(201).send()
}