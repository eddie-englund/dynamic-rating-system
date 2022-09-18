import { ObjectId } from "mongodb"

export type Rating = {
  _id?: ObjectId;
  authorId: ObjectId;
  rating: 1 | 1.5 | 2 | 2.5 | 3 | 3.5 | 4 | 4.5 | 5;
  title: string;
  cast?: string[];
  imageUrl?: string;
  description?: string;
}