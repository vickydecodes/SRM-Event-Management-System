import mongoose, { Schema, Document } from 'mongoose';

export interface IHall extends Document {
  name: string;
  description?: string;
  capacity: number;
  images: string[];

  active: boolean;
  deleted: boolean;
  deletedAt?: Date;

  createdAt: Date;
  updatedAt: Date;
}

const HallSchema = new Schema<IHall>(
  {
    name: { type: String, required: true, unique: true, trim: true },
    description: { type: String },
    capacity: { type: Number, required: true, min: 1 },
    images: [{ type: String }],

    active: { type: Boolean, default: true },
    deleted: { type: Boolean, default: false },
    deletedAt: { type: Date },
  },
  { timestamps: true }
);

export default mongoose.model<IHall>('Hall', HallSchema);
