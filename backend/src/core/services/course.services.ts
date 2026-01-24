import { dynamicFilter, FilterConfig } from '../constants/dynamicfilter.core.ts';
import Course, { ICourse } from '@db/models/course.model.js';

const courseFilterConfig = {
  searchable: ['name'],
  sortable: ['createdAt'],
  defaultSort: 'createdAt',
} satisfies FilterConfig<ICourse>;

export const create = async (data: any) => {
  const course = await new Course(data).save();
  return course;
};

export const getAll = async (queries: Record<string, any>, role?: string) => {
  return dynamicFilter(Course, courseFilterConfig, queries, {
    visibility: role === 'admin' ? 'all' : 'active-only'
  });
};

export const getById = async (id: string) => {
  const course = await Course.findById(id);
  return course;
};

export const update = async (id: string, data: any) => {
  return await Course.findByIdAndUpdate(id, data, { new: true });
};

export const remove = async (id: string) => {
  return await Course.findByIdAndUpdate(
    id,
    { active: false, deleted: true, deletedAt: new Date() },
    { new: true }
  );
};

export const retrieve = async (id: string) => {
  return await Course.findByIdAndUpdate(
    id,
    { active: true, deleted: false, deletedAt: null },
    { new: true }
  );
};

export const erase = async (id: string) => {
  return await Course.findByIdAndDelete(id);
};
