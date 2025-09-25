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
    const db = await mongoose.connect(process.env.MONGODB_URI || "", {});
    connection.isConnected = db.connections[0].readyState;
  } catch (error) {
    console.error("Error occured while connecting to Database ", error);
  }
};

export default dbConnect;
