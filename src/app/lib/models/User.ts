import mongoose, { Schema, Document, models, model } from "mongoose";

// Define TypeScript interface for User
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
}

// Create Mongoose Schema
const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
}, { timestamps: true });

// Check if model already exists (to prevent overwriting in hot reload)
const User = models.User || model<IUser>("User", UserSchema);

export default User;
