import Student, { IStudent } from '@db/models/student.model.js';
import { dynamicFilter, FilterConfig } from '../constants/dynamicfilter.core.ts';

const StudentFilterConfig = {
  searchable: ['name'],
  sortable: ['createdAt'],
  defaultSort: 'createdAt',
} satisfies FilterConfig<IStudent>;

export const create = async (data: any) => {
  const student = await new Student(data).save();
  return student;
};

export const getAll = async (queries: Record<string, any>, role?: string) => {
  const students = await Student.find({});
  return students;
};

export const getById = async (id: string) => {
  const student = await Student.findById(id);
  return student;
};

export const update = async (id: string, data: any) => {
  const student = await Student.findByIdAndUpdate(id, data, { new: true });
  return student;
};

export const remove = async (id: string) => {
  return await Student.findByIdAndUpdate(
    id,
    { active: false, deleted: true, deletedAt: new Date() },
    { new: true }
  );
};

export const retrieve = async (id: string) => {
  return await Student.findByIdAndUpdate(
    id,
    { active: true, deleted: false, deletedAt: null },
    { new: true }
  );
};

export const erase = async (id: string) => {
  const student = await Student.findByIdAndDelete(id);
  return student;
};
