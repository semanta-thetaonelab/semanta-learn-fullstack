
import mongoose from "mongoose";
const options: any = {};
const MONGODB_URL=process.env.MONGODB_URL;
export const dbConnect = async () => {
  try {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(MONGODB_URL || '', options);
      mongoose.set("debug", true);
      mongoose.pluralize(null);
    }
  } catch (error: any) {
    console.error("MongoDB connection error:", error.message);
    process.exit(1);
  }
};

dbConnect().then(console.log).catch(console.error);