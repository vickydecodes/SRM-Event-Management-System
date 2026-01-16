import Event, { IEvent } from '@db/models/event.model.js';
import { dynamicFilter, FilterConfig } from '../constants/dynamicfilter.core.ts';

const EventFilterConfig = {
  searchable: ['name'],
  sortable: ['createdAt'],
  defaultSort: 'createdAt',
} satisfies FilterConfig<IEvent>;

export const create = async (data: any) => {
  const event = await new Event(data).save();
  return event;
};

export const getAll = async (queries: Record<string, any>, role?: string) => {
  const events  = await Event.find({});
  return events;
};

export const getById = async (id: string) => {
  const event = await Event.findById(id);
  return event;
};

export const update = async (id: string, data: any) => {
  const event = await Event.findByIdAndUpdate(id, data, { new: true });
  return event;
};

export const remove = async (id: string) => {
  return await Event.findByIdAndUpdate(
    id,
    { active: false, deleted: true, deletedAt: new Date() },
    { new: true }
  );
};

export const retrieve = async (id: string) => {
  return await Event.findByIdAndUpdate(
    id,
    { active: true, deleted: false, deletedAt: null },
    { new: true }
  );
};

export const erase = async (id: string) => {
  const event = await Event.findByIdAndDelete(id);
  return event;
};
