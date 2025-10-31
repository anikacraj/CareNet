// dbConnec tto connec tot mongoose database
// import mongoose from "mongoose";

// export const dbConnect = async () => {
//   try {
//     await mongoose.connect(process.env.MONGO_URI!);

//     console.log("MongoDB connected");
//   } catch (error) {
//     console.log(error);
//   }
// };

"use server";
import mongoose from "mongoose";

type ConnectionObject = {
  isConnected?: number;
};

const connection: ConnectionObject = {};

export async function dbConnect(): Promise<void> {
  if (connection.isConnected) {
    console.log("Already connected to db!");
    return;
  }

  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI is not defined in the environment variables");
  }

  try {
    const db = await mongoose.connect(process.env.MONGO_URI, {
      dbName: process.env.DB_NAME, // Specify the exact database name here
    });
      connection.isConnected = db.connections[0].readyState;
      
    console.log("db connected successfully");
  } catch (error) {
    console.log("Connection error:", error);
    console.log("db connection failed:/");
  }
}

