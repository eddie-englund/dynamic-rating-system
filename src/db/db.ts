import { logger } from '../app'
import { Collection, Db, MongoClient } from 'mongodb'

let db: Db

interface Collections {
  [key: string]: Collection
}

export let collections: Collections


export const connect = async () => {
  const client = new MongoClient(process.env.MONGODB_URI)

  await client.connect()

  db = client.db(process.env.MONGODB_NAME)
  const ratingsCollection = db.collection('Ratings')
  const usersCollection = db.collection('Users')

  collections.ratings = ratingsCollection;
  collections.users = usersCollection

  logger.info(`Connect to database ${process.env.MONGODB_NAME} successfully`)
}

export const getDB = (): Db => db
export const getCollections = (): Collections => collections