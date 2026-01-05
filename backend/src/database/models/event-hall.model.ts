import mongoose, { Schema, Document } from "mongoose";

export interface IEventHall extends Document {
  name: string;
  code: string;
  capacity: number;
  allowedDepartments: mongoose.Types.ObjectId[];
  images?: string[];

  active: boolean;
  deleted: boolean;
  deletedAt?: Date;
}

const EventHallSchema: Schema = new Schema(
  {
    name: { type: String, required: true, trim: true },

    code: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
    },

    capacity: { type: Number, required: true },

    allowedDepartments: [
      { type: Schema.Types.ObjectId, ref: "Department" },
    ],

    images: [{ type: String }],

    active: { type: Boolean, default: true },
    deleted: { type: Boolean, default: false },
    deletedAt: { type: Date },
  },
  { timestamps: true }
);

EventHallSchema.pre("save", function (next) {
  const doc = this as unknown as IEventHall;
  if (doc.code) doc.code = doc.code.toUpperCase();
  next();
});

export default mongoose.model<IEventHall>(
  "EventHall",
  EventHallSchema
);
