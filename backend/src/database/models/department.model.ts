import mongoose, { Schema, Document } from "mongoose";

export interface IDepartment extends Document {
  name: string;
  email: string;
}

const DepartmentSchema = new Schema<IDepartment>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

export default mongoose.model<IDepartment>("Department", DepartmentSchema);
