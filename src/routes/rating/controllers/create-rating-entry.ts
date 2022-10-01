import { getCollections } from '@db/db';
import { TypedJwtRequest } from '@util/typed-request';
import { logger } from 'app';
import { Response } from 'express';
import { ObjectId } from 'mongodb';
import { RatingCreateBody } from '../validators/create-rating-validator';

const failedObj = {
  msg: 'Failed to create rating, please try again later.',
  success: false
};

export const createRating = async (req: TypedJwtRequest<RatingCreateBody>, res: Response) => {
  try {
    const newRating = await getCollections().ratings!.insertOne({
      title: req.body.title,
      description: req.body.description,
      rating: req.body.rating,
      cast: req.body.cast ?? [],
      imageUrl: req.body.imageUrl,
      authorId: new ObjectId(req.jwt?.userId)
    });

    if (!newRating.acknowledged) {
      return res
        .status(500)
        .send(failedObj);
    }

    return res.status(201).send({ success: true });
  } catch (e) {
    logger.error(e);
    return res
      .status(500)
      .send(failedObj);
  }
};
