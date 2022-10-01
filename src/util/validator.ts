import { logger } from 'app';
import { Response, NextFunction } from 'express';
import { z, ZodTypeAny } from 'zod';
import { TypedJwtRequest } from './typed-request';

export const validator = <T extends ZodTypeAny>(validationSchema: T) => (
  req: TypedJwtRequest<z.infer<T>>,
  res: Response,
  next: NextFunction
) => validate<z.infer<T>, T>(req, res, next, validationSchema);

const validate = <T, J extends ZodTypeAny>(req: TypedJwtRequest<T>, res: Response, next: NextFunction, schema: J): void => {
  void schema.safeParseAsync(req.body)
    .then(parsed => {
      if (!parsed.success) {
        res
          .status(400)
          .send({ success: false, error: { ...parsed.error } });
        return;
      }
      req.body = parsed.data as z.infer<typeof schema>;
      next();
    })
    .catch(e => {
      logger.error(e);
      res
        .status(500)
        .send({
          success: false,
          error: 'Parsing request body errored out'
        });
    });
};
