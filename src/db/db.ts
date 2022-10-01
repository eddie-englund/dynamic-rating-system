import { Collection, Db, MongoClient } from 'mongodb';
import { Rating } from './models/rating';
import { User } from './models/user';
import { logger } from '../app';

interface Collections {
  users?: Collection<User>;
  ratings?: Collection<Rating>;
}

export const collections: Collections = {};


export const connect = async () => {
  logger.info(`Initalizing connection to database ${process.env.MONGODB_NAME}`);
  const client = new MongoClient(process.env.MONGODB_URI);
  await client.connect();

  const db: Db = client.db(process.env.MONGODB_NAME);
  const ratingsCollection = db.collection<Rating>('ratings');
  const usersCollection = db.collection<User>('users');

  collections.ratings = ratingsCollection;
  collections.users = usersCollection;

  logger.info('Initalization of database successful');
};

export const getCollections = (): Collections => collections;
