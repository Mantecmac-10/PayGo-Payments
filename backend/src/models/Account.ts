import mongoose, { Document, Schema, type ObjectId } from "mongoose";

export interface Iaccount extends Document {
  userId: Schema.Types.ObjectId;
  balance: number;
  updatedAt: Date;
}

const accoutSchema = new Schema<Iaccount>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    balance: {
      type: Number,
      required: true,
      default: 0,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model<Iaccount>("Account", accoutSchema);
