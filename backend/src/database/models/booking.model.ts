import mongoose, { Schema, Document } from "mongoose";

export interface IBooking extends Document {
  hall: mongoose.Types.ObjectId;
  department: mongoose.Types.ObjectId;

  name: string;
  fromDate: Date;
  toDate: Date;

  incharge: mongoose.Types.ObjectId;

  status: "pending" | "approved" | "rejected";

  active: boolean;
  deleted: boolean;
  deletedAt?: Date;
}

const BookingSchema: Schema = new Schema(
  {
    hall: {
      type: Schema.Types.ObjectId,
      ref: "Hall",
      required: true,
    },

    department: {
      type: Schema.Types.ObjectId,
      ref: "Department",
      required: true,
    },

    name: { type: String, required: true, trim: true },

    fromDate: { type: Date, required: true },
    toDate: { type: Date, required: true },

    fromTime: { type: String, required: true },
    toTime: { type: String, required: true },

    incharge: { type: Schema.Types.ObjectId, ref: "User", required: true },

    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },

    active: { type: Boolean, default: true },
    deleted: { type: Boolean, default: false },
    deletedAt: { type: Date },
  },
  { timestamps: true }
);

export default mongoose.model<IBooking>(
  "Booking",
  BookingSchema
);
