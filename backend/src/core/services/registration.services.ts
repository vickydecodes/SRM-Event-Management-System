import Registration, { IRegistration } from '@db/models/registration.model.js';
import { dynamicFilter, FilterConfig } from '../constants/dynamicfilter.core.ts';

const RegistrationFilterConfig = {
  searchable: ['name'],
  sortable: ['createdAt'],
  defaultSort: 'createdAt',
} satisfies FilterConfig<IRegistration>;

export const create = async (data: any) => {
  const payload = {
    event: data.event,
    requestedBy: data.requestedBy,
    status: "draft",
  }
  const registration = await new Registration(payload).save();
  return registration;
};

export const getAll = async (queries: Record<string, any>, role?: string) => {
  const registrations = await Registration.find({});
  return registrations;
};

export const getById = async (id: string) => {
  const registration = await Registration.findById(id);
  return registration;
};

export const update = async (id: string, data: any) => {
  const registration = await Registration.findByIdAndUpdate(id, data, { new: true });
  return registration;
};

export const remove = async (id: string) => {
  return await Registration.findByIdAndUpdate(
    id,
    { active: false, deleted: true, deletedAt: new Date() },
    { new: true }
  );
};

export const retrieve = async (id: string) => {
  return await Registration.findByIdAndUpdate(
    id,
    { active: true, deleted: false, deletedAt: null },
    { new: true }
  );
};

export const erase = async (id: string) => {
  const registration = await Registration.findByIdAndDelete(id);
  return registration;
};
