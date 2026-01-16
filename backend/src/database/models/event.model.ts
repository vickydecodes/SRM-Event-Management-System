import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IEvent extends Document {
  title: string;
  slug: string;

  description: string;
  images?: string[];

  organizers: {
    name: string;
    contact: string;
  }[];

  allowedDepartments: Types.ObjectId[];

  eventStartAt: Date;
  eventEndAt: Date;

  registrationStartAt: Date;
  registrationEndAt: Date;

  maxParticipants?: number;

  status: 'draft' | 'upcoming' | 'ongoing' | 'ended' | 'cancelled';

  ui: {
    visible: boolean;
    cta: string;
  };

  createdBy: Types.ObjectId;
  approvedBy?: Types.ObjectId;

  approvedAt?: Date;

  active: boolean;
  deleted: boolean;
  deletedAt?: Date;

  createdAt: Date;
  updatedAt: Date;
}

const EventSchema = new Schema<IEvent>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true },

    description: { type: String, required: true },

    images: [{ type: String }],

    organizers: [{ name: { type: String }, contact: { type: String } }],

    allowedDepartments: [{ type: Schema.Types.ObjectId, ref: 'Department', required: true }],

    eventStartAt: { type: Date, required: true },
    eventEndAt: { type: Date, required: true },

    registrationStartAt: { type: Date, required: true },
    registrationEndAt: { type: Date, required: true },

    maxParticipants: { type: Number },

    status: {
      type: String,
      enum: ['draft', 'upcoming', 'ongoing', 'ended', 'cancelled'],
      default: 'draft',
    },

    ui: {
      visible: false,
      cta: '',
    },
    
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    approvedBy: { type: Schema.Types.ObjectId, ref: 'User' },
    approvedAt: { type: Date },

    active: { type: Boolean, default: true },
    deleted: { type: Boolean, default: false },
    deletedAt: { type: Date },
  },
  { timestamps: true }
);

export default mongoose.model<IEvent>('Event', EventSchema);
