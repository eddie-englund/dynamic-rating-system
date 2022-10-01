import { ObjectId } from 'mongodb';

export interface Rating {
  _id?: ObjectId;
  authorId: ObjectId;
  rating: number;
  title: string;
  cast?: string[];
  imageUrl?: string;
  description?: string;
}
