import { getCollections } from '@db/db';
import { TypedJwtRequest } from '@util/typed-request';
import { logger } from 'app';
import { Response } from 'express';
import { ObjectId } from 'mongodb';
import { RatingCreateSchema } from '../validators/create-rating-validator';

export const createRating = async (req: TypedJwtRequest<RatingCreateSchema>, res: Response) => {
  if (req.jwt?.userId) return res.status(400).send({ success: false, msg: 'Invalid login' });

  const newRating = await getCollections().ratings!.insertOne({
    title: req.body.title,
    description: req.body.description,
    rating: req.body.rating,
    cast: req.body.cast ?? [],
    imageUrl: req.body.imageUrl,
    authorId: new ObjectId(req.jwt?.userId)
  }).catch(e => {
    logger.error(e);
    return res
      .status(500)
      .send({ msg: 'Failed to create rating, please try again.', success: false });
  });

  //  if (!newRating) {
  //    return res
  //      .status(500)
  //      .send({ msg: 'Failed to create rating, please try again.', success: false });
  //  }

  console.log(newRating);
  return res.status(201).send({ success: true });
};
