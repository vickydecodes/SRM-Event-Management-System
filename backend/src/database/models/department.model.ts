import mongoose, { Schema, Document } from "mongoose";

export interface IDepartment extends Document {
  name: string;
  code: string;
  contact?: string;
  active: boolean;
  deleted: boolean;
  deletedAt?: Date;
}

const DepartmentSchema: Schema = new Schema(
  {
    name: { type: String, required: true, trim: true },

    code: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    contact: { type: String },

    active: { type: Boolean, default: true },
    deleted: { type: Boolean, default: false },
    deletedAt: { type: Date },
  },
  { timestamps: true }
);

// DepartmentSchema.pre("save", function (next) {
//   const doc = this as unknown as IDepartment;
//   if (doc.code) doc.code = doc.code.toUpperCase();
//   next();
// });

export default mongoose.model<IDepartment>(
  "Department",
  DepartmentSchema
);
