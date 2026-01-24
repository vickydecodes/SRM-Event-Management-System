import mongoose, { Document, Schema } from 'mongoose';

export interface ICourse extends Document {
  name: string;
  code: string;
  description: string;
  department: mongoose.Types.ObjectId;
  duration: number;
}

const CourseSchema = new Schema<ICourse>(
  {
    name: { type: String, required: true },
    code: { type: String, required: true, unique: true },
    description: {type: String},
    department: {
      type: Schema.Types.ObjectId,
      ref: 'Department',
      required: true,
    },
    duration: { type: Number, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<ICourse>('Course', CourseSchema);
