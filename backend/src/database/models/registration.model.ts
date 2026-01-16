import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IEventRegistration extends Document {
  event: Types.ObjectId;

  status: 'draft' | 'pending' | 'approved' | 'rejected' | 'closed' | 'cancelled';

  participants: Types.ObjectId[];

  requestedBy: Types.ObjectId;
  approvedBy?: Types.ObjectId;
  approvedAt?: Date;
  rejectedReason?: string;

  active: boolean;
  deleted: boolean;
  deletedAt?: Date;

  createdAt: Date;
  updatedAt: Date;
}

const EventRegistrationSchema = new Schema<IEventRegistration>(
  {
    event: {
      type: Schema.Types.ObjectId,
      ref: 'event',
      required: true,
      index: true,
    },

    status: {
      type: String,
      enum: ['draft', 'pending', 'approved', 'rejected', 'closed', 'cancelled'],
      default: 'draft',
    },

    participants: [{ type: Schema.Types.ObjectId, ref: 'student' }],

    requestedBy: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },

    approvedBy: { type: Schema.Types.ObjectId, ref: 'user' },
    approvedAt: { type: Date },
    rejectedReason: { type: String },

    active: { type: Boolean, default: true },
    deleted: { type: Boolean, default: false },
    deletedAt: { type: Date },
  },
  { timestamps: true }
);

export default mongoose.model<IEventRegistration>('EventRegistration', EventRegistrationSchema);
