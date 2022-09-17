import { logger } from '../app'
import { Collection, Db, MongoClient } from 'mongodb'
import { User } from './models/user'

let db: Db

interface Collections {
  [key: string]: Collection<any>
}

export let collections: Collections = {}


export const connect = async () => {
  logger.info(`Initalizing connection to database ${process.env.MONGODB_NAME}`)
  const client = new MongoClient(process.env.MONGODB_URI)
  await client.connect()

  db = client.db(process.env.MONGODB_NAME)
  const ratingsCollection = db.collection('ratings')
  const usersCollection = db.collection<User>('users')

  collections.ratings = ratingsCollection;
  collections.users = usersCollection

  logger.info('Initalization of database successful')
}

export const getDB = (): Db => db
export const getCollections = (): Collections => collections