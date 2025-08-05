import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const dbUrl = process.env.DATABASE_URL;

export async function connectToDatabase() {
  try {
    console.log(dbUrl,"url of db")
    await mongoose.connect(dbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Connected to MongoDB via Mongoose",mongoose.connection.name);
  } catch (error) {
    console.error("Mongoose connection error:", error);
    throw error;
  }
}


