import { getCollections } from "@db/db";
import { User } from "@db/models/user";
import { logger } from "app";
import { Request, Response } from "express";
import { ObjectId } from "mongodb";

export const getUser = async (req: Request, res: Response) => {
  const validMongoId = ObjectId.isValid(req.params.id);
  if (!validMongoId) return res
    .status(400)
    .send({ msg: "Invalid userId", success: false });
  
  console.log(req.params)
  
  const user = await getCollections().users
    .findOne({ _id: new ObjectId(req.params.id) })
    .catch(e => {
      logger.error(e)
      return res
        .status(400)
        .send({ success: false, msg: "No such user" })
    }) as User
  
  logger.info(`Returning user ${user}`)

  if (!user) return res
    .status(400)
    .send({ success: false, msg: "No such user" })
  
  return res
    .status(200)
    .send({ id: user._id, username: user.username })
}