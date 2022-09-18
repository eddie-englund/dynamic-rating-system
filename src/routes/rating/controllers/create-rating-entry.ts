import { getCollections } from "@db/db";
import { TypedJwtRequest } from "@util/typed-request";
import { Response } from "express";

export const createRating = async (req: TypedJwtRequest<{}>, res: Response) => {
  const newRating = await getCollections().ratings.insertOne({
    rating: req.body.rating
  })
}