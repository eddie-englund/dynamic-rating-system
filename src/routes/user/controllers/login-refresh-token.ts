import { Request, Response } from 'express';

export const loginWithRefreshToken = (req: Request, res: Response) => {
  console.log(req.cookies);
  return res.status(200).send('success');
};
