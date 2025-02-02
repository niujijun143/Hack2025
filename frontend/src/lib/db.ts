import { MongoClient } from "mongodb";
// Replace the uri string with your connection string.
const client = new MongoClient(process.env.MONGODB_URI!);
export const db = client.db();