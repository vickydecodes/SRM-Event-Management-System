import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IRegistration extends Document {
  event: Types.ObjectId;

  status: 'draft' | 'pending' | 'approved' | 'rejected' | 'closed' | 'cancelled';

  participants: Types.ObjectId[];

  requestedBy: Types.ObjectId;
  approvedBy?: Types.ObjectId;
  approvedAt?: Date;
  remarks?: string;
  rejectedReason?: string;

  active: boolean;
  deleted: boolean;
  deletedAt?: Date;

  createdAt: Date;
  updatedAt: Date;
}

const RegistrationSchema = new Schema<IRegistration>(
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
    remarks: { type: String },
    rejectedReason: { type: String },

    active: { type: Boolean, default: true },
    deleted: { type: Boolean, default: false },
    deletedAt: { type: Date },
  },
  { timestamps: true }
);

export default mongoose.model<IRegistration>('Registration', RegistrationSchema);
