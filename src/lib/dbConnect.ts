import mongoose from "mongoose";

type ConnectionObject = {
  isConnected?: number;
};

const connection: ConnectionObject = {};

const dbConnect = async (): Promise<void> => {
  //here void means dont care the returned datatype
  if (connection.isConnected) {
    console.log("Already Database is connected");
    return;
  }

  try {
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI is not defined in environment variables");
    }
    const db = await mongoose.connect(`${process.env.MONGODB_URI}`, {});
    
    connection.isConnected = db.connections[0].readyState;
  } catch (error) {
    console.error("Error occured while connecting to Database ", error);
  }
};

export default dbConnect;
