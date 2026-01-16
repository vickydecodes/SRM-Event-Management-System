import Hall, { IHall } from '../../database/models/hall.model.ts';
import { dynamicFilter, FilterConfig } from '../constants/dynamicfilter.core.ts';

const hallFilterConfig = {
  searchable: ['name'],
  sortable: ['createdAt'],
  defaultSort: 'createdAt',
} satisfies FilterConfig<IHall>;

export const create = async (data: any) => {
  const hall = await new Hall(data).save();
  return hall;
};

export const getAll = async (queries: Record<string, any>, role?: string) => {
  const halls = await Hall.find({});
  return halls;
};

export const getById = async (id: string) => {
  const hall = await Hall.findById(id);
  return hall;
};

export const update = async (id: string, data: any) => {
  const hall = await Hall.findByIdAndUpdate(id, data, { new: true });
  return hall;
};

export const remove = async (id: string) => {
  return await Hall.findByIdAndUpdate(
    id,
    { active: false, deleted: true, deletedAt: new Date() },
    { new: true }
  );
};

export const retrieve = async (id: string) => {
  return await Hall.findByIdAndUpdate(
    id,
    { active: true, deleted: false, deletedAt: null },
    { new: true }
  );
};

export const erase = async (id: string) => {
  const hall = await Hall.findByIdAndDelete(id);
  return hall;
};
