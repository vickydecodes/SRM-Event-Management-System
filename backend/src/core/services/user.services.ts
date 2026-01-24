import User, { IUser } from '@db/models/user.model.js';
import { dynamicFilter, FilterConfig } from '../constants/dynamicfilter.core.ts';

const UserFilterConfig = {
  searchable: ['name'],
  sortable: ['createdAt'],
  defaultSort: 'createdAt',
} satisfies FilterConfig<IUser>;

export const create = async (data: any) => {
  const user = await new User({...data, password: "srm123"}).save();
  return user;
};

export const getAll = async (queries: Record<string, any>, role?: string) => {
  return dynamicFilter(User, UserFilterConfig, queries, {
    visibility: role === 'admin' ? 'all' : 'active-only'
  });
};

export const getById = async (id: string) => {
  const user = await User.findById(id);
  return user;
};

export const update = async (id: string, data: any) => {
  const user = await User.findByIdAndUpdate(id, data, { new: true });
  return user;
};

export const remove = async (id: string) => {
  return await User.findByIdAndUpdate(
    id,
    { active: false, deleted: true, deletedAt: new Date() },
    { new: true }
  );
};

export const retrieve = async (id: string) => {
  return await User.findByIdAndUpdate(
    id,
    { active: true, deleted: false, deletedAt: null },
    { new: true }
  );
};

export const erase = async (id: string) => {
  const user = await User.findByIdAndDelete(id);
  return user;
};
