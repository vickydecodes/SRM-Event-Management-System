import mongoose, { Schema, Document } from "mongoose";

export type UserRole = "admin" | "staff" | "student";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;

  role: UserRole;

  departmentId?: mongoose.Types.ObjectId;

  active: boolean;
  deleted: boolean;
  deletedAt?: Date;
}

const UserSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      select: false,
    },

    role: {
      type: String,
      enum: ["ADMIN", "DEPARTMENT", "STUDENT"],
      required: true,
    },

    departmentId: {
      type: Schema.Types.ObjectId,
      ref: "Department",
    },

    active: {
      type: Boolean,
      default: true,
    },

    deleted: {
      type: Boolean,
      default: false,
    },

    deletedAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

export default mongoose.model<IUser>("User", UserSchema);
