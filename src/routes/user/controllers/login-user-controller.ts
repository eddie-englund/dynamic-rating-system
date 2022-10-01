import { getCollections } from '@db/db';
import { TypedRequestBody } from '@util/typed-request';
import { logger } from 'app';
import argon2 from 'argon2';
import { Response } from 'express';
import jwt from 'jsonwebtoken';
import ms from 'ms';

const errorMsg = 'Invalid username or password.';

export const loginUser = async (req: TypedRequestBody<{ username: string; password: string }>, res: Response) => {
  try {
    const user = await getCollections()
      .users!
      .findOne({ username: req.body.username });

    if (!user) {
      return res
        .status(400)
        .send({ msg: errorMsg, success: false });
    }

    const validPassword = await argon2
      .verify(user.password, req.body.password)
      .catch(e => {
        logger.error(e);
        return res.status(400).send({ msg: errorMsg, success: false });
      });

    if (!validPassword) res.status(400).send({ msg: errorMsg, success: false });

    const accessToken = jwt.sign(
      {
        userId: user._id,
        permissions: user.permissions
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '5m',
      }
    );

    const refreshToken = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '2 days' }
    );

    return res
      .status(200)
      .cookie(
        'refreshToken',
        refreshToken,
        {
          maxAge: ms('2 days'),
          httpOnly: true,
          secure: false
        }
      )
      .send({
        sucess: true,
        accessToken,
        token_type: 'bearer',
        expires: ms('5m')
      });
  } catch (e) {
    logger.error(e);
    return res
      .status(400)
      .send({ msg: errorMsg, success: false });
  }
};
