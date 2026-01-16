import mongoose, { Schema, Document } from "mongoose";

export interface IDepartment extends Document {
  name: string;
  description: string;
  email: string;

  createdAt: Date;
  updatedAt: Date;
}

const DepartmentSchema = new Schema<IDepartment>(
  {
    name: { type: String, required: true },
    description: { type: String },
    email: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

export default mongoose.model<IDepartment>("Department", DepartmentSchema);
