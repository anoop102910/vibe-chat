import mongoose from "mongoose";

const connection = {};

export const connect = async () => {
  try {
    if (connection.isConnected) return;
    console.log("process.env.MONGOURI", process.env.MONGOURI);
    const db = await mongoose.connect(process.env.MONGOURI);
    console.log("Connecting to MongoDB...");
    connection.isConnected = db.connections[0].readyState;
  } catch (error) {
    console.log(error)
    throw new Error(error);
  }
};