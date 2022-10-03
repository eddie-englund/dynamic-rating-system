import { logger } from 'app';
import jwt from 'jsonwebtoken';

interface Tokens {
  refreshToken: string;
  accessToken: string;
}

export const generateTokens = (userId: String, permissions: string[]): Tokens | undefined => {
  try {
    const accessToken = jwt.sign(
      {
        userId: userId,
        permissions: permissions
      },
      process.env.JWT_SECRET,
      { expiresIn: '5m' }
    );

    const refreshToken = jwt.sign(
      { userId: userId, permissions: permissions },
      process.env.JWT_SECRET,
      { expiresIn: '2 days' }
    );

    return { refreshToken, accessToken };
  } catch (e) {
    logger.error(e);
    return undefined;
  }
};
