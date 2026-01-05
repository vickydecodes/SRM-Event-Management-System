import mongoose, { Schema, Document } from "mongoose";

export interface IBooking extends Document {
  hallId: mongoose.Types.ObjectId;
  departmentId: mongoose.Types.ObjectId;

  eventName: string;
  fromDate: Date;
  toDate: Date;
  fromTime: string;
  toTime: string;

  inchargeName: string;
  inchargePhone: string;
  inchargeEmail: string;

  status: "PENDING" | "APPROVED" | "REJECTED";

  active: boolean;
  deleted: boolean;
  deletedAt?: Date;
}

const BookingSchema: Schema = new Schema(
  {
    hallId: {
      type: Schema.Types.ObjectId,
      ref: "EventHall",
      required: true,
    },

    departmentId: {
      type: Schema.Types.ObjectId,
      ref: "Department",
      required: true,
    },

    eventName: { type: String, required: true, trim: true },

    fromDate: { type: Date, required: true },
    toDate: { type: Date, required: true },

    fromTime: { type: String, required: true },
    toTime: { type: String, required: true },

    inchargeName: { type: String, required: true },
    inchargePhone: { type: String, required: true },
    inchargeEmail: {
      type: String,
      required: true,
      lowercase: true,
    },

    status: {
      type: String,
      enum: ["PENDING", "APPROVED", "REJECTED"],
      default: "PENDING",
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
