//Made by Tommy Ho
//Global Comment: db.ts was made in order to create a connection to the MongoDB database and create a new collection under the name posts-collection
//Calls to this function may need to setup their own mongodb collection, since the current implementation is using our own personal databases.
import { MongoClient, Db, Collection } from "mongodb";
//Converts MONGO_URI to string
const MONGO_URI = process.env.MONGO_URI as string;
if (!MONGO_URI) {
  throw new Error("MONGO_URI environment variable is undefined");
}

const DB_NAME = "tasks";
export const POSTS_COLLECTION = "posts-collection";
let client: MongoClient | null = null;
let db: Db | null = null;
//Makes a connection to the MongoDB database
async function connect(): Promise<Db> {
  if (!client) {
    client = new MongoClient(MONGO_URI);
    await client.connect();
  }
  return client.db(DB_NAME);
}
//Creates a database and returns it when called
export default async function getCollection(
  collectionName: string
): Promise<Collection> {
  if (!db) {
    db = await connect();
  }
  return db.collection(collectionName);
}
