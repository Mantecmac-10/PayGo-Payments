import mongoose, { Document, Schema } from "mongoose";

export interface Iuser extends Document {
  username: string;
  email: string;
  password: string;
  firstName: string;
  LastName: string;
  createdAt: Date;
}

const userSchema = new Schema<Iuser>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    LastName: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model<Iuser>("User", userSchema);
