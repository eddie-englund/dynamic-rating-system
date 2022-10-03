import { generateTokens } from '@util/generate-tokens';
import { JwtPayload } from '@util/typed-request';
import { logger } from 'app';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import ms from 'ms';

const returnObj = { success: false, msg: 'Invalid refresh token' };
const internalErrorObj = { success: false, msg: 'Something went wrong creating the tokens' };

export const loginWithRefreshToken = (req: Request, res: Response) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { refreshToken } = req.cookies;
  if (!refreshToken) {
    return res.status(400).send(returnObj);
  }

  try {
    const validToken = jwt.verify(refreshToken as string, process.env.JWT_SECRET) as JwtPayload;

    if (!validToken.userId || !validToken.permissions) {
      return res.status(500).send(internalErrorObj);
    }

    const tokens = generateTokens(validToken.userId, validToken.permissions);

    if (!tokens) {
      return res
        .status(500)
        .send({ success: false, msg: 'Something went wrong creating the tokens' });
    }

    return res
      .status(200)
      .cookie('refreshToken',
        tokens.refreshToken,
        {
          maxAge: ms('2 days'),
          secure: false
        })
      .send({
        success: true,
        accessToken: tokens.accessToken
      });
  } catch (e) {
    logger.error(e);
    return res.status(400).send(returnObj);
  }
};
