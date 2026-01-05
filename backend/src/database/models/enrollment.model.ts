import mongoose, { Schema, Document } from "mongoose";

export interface IEnrollment extends Document {
  bookingId: mongoose.Types.ObjectId;
  studentId: mongoose.Types.ObjectId;

  active: boolean;
  deleted: boolean;
  deletedAt?: Date;
}

const EnrollmentSchema: Schema = new Schema(
  {
    bookingId: {
      type: Schema.Types.ObjectId,
      ref: "Booking",
      required: true,
    },

    studentId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    active: { type: Boolean, default: true },
    deleted: { type: Boolean, default: false },
    deletedAt: { type: Date },
  },
  { timestamps: true }
);

export default mongoose.model<IEnrollment>(
  "Enrollment",
  EnrollmentSchema
);
