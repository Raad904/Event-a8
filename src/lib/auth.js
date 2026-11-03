import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

if (!process.env.MONGODB_URL) {
  throw new Error("MONGODB_URL is missing from environment variables");
}

const client = new MongoClient(process.env.MONGODB_URL);
const db = client.db("Event");

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client,
  }),

  emailAndPassword: {
    enabled: true,
  },
});