import Hall, { IHall } from '../../database/models/hall.model.ts';
import { dynamicFilter, FilterConfig } from '../constants/dynamicfilter.core.ts';

const hallFilterConfig = {
  searchable: ['name'],
  sortable: ['createdAt'],
  defaultSort: 'createdAt',
} satisfies FilterConfig<IHall>;

export const create = async (data: any) => new Hall(data).save();

export const getAll = async (queries: Record<string, any>, role?: string) =>
  Hall.find({});

export const getById = async (id: string) => Hall.findById(id);

export const update = async (id: string, data: any) =>
  Hall.findByIdAndUpdate(id, data, { new: true });

export const remove = async (id: string) =>
  Hall.findByIdAndUpdate(
    id,
    { active: false, deleted: true, deletedAt: new Date() },
    { new: true }
  );

export const erase = async (id: string) => Hall.findByIdAndDelete(id);
