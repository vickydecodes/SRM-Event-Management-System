import bcrypt from 'bcryptjs';
import mongoose, { Schema, Document } from 'mongoose';

export interface IStudent extends Document {
  name: string;
  email: string;
  password: string;
  contact: string;
  registerNumber: string;
  course: mongoose.Types.ObjectId;
  department: mongoose.Types.ObjectId;
  year: number;
}

const StudentSchema = new Schema<IStudent>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    contact: { type: String, required: true },
    registerNumber: { type: String, required: true, unique: true },
    department: {
      type: Schema.Types.ObjectId,
      ref: 'Department',
      required: true,
    },
    course: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
    year: { type: Number, required: true },
  },
  { timestamps: true }
);

StudentSchema.pre("validate", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 15);
  }
  next();
});

export default mongoose.model<IStudent>('Student', StudentSchema);
